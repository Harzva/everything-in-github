# repository_dispatch 跨仓库触发教程

> 本文用 Just-DDL 作为真实案例：子专题仓库定时更新数据，完成后调用 Hub 仓库的 `repository_dispatch`，Hub 再同步所有子专题数据、构建并部署 GitHub Pages。案例来源于 Codex 会话 `codex://threads/019e1ff1-0f1b-7a41-bfd8-2c0348179139` 中进行的 Just-DDL 任务。

官方参考：

- [Events that trigger workflows: repository_dispatch](https://docs.github.com/actions/learn-github-actions/events-that-trigger-workflows#repository_dispatch)
- [Create a repository dispatch event](https://docs.github.com/en/rest/repos/repos#create-a-repository-dispatch-event)
- [Workflow syntax for GitHub Actions](https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax)

## 一句话理解

`repository_dispatch` 是一个给仓库发送自定义事件的 REST API。外部系统、脚本、另一个仓库的 GitHub Actions 都可以调用它：

```text
POST /repos/{owner}/{repo}/dispatches
```

目标仓库中的 workflow 监听这个事件：

```yaml
on:
  repository_dispatch:
    types: [topic-updated]
```

当 API 请求里的 `event_type` 等于 `topic-updated` 时，目标仓库 workflow 被触发。

## Just-DDL 架构

```text
Just-DDL 子专题仓库
  .github/workflows/update-data.yml
  crawler 抓取最新信息
  更新 data/items.json
  提交变更
  POST /repos/Just-Agent/just-ddl/dispatches
        event_type: topic-updated
        client_payload.topic: ddl

Just-Agent/just-ddl Hub 仓库
  .github/workflows/sync-topic-data.yml
  on.repository_dispatch.types: [topic-updated]
  拉取所有子专题 data/items.json
  合并到站点数据
  npm run build
  部署 GitHub Pages
```

这个模式适合“多个子仓库独立更新，Hub 汇总发布”的知识库、导航站、数据看板、Awesome list、专题聚合站。

## 为什么跨仓库需要 token

`repository_dispatch` 会在目标仓库创建一个事件，所以调用方必须对目标仓库有写权限。子仓库的 `GITHUB_TOKEN` 只代表子仓库 workflow 的临时权限，通常不能写 `Just-Agent/just-ddl` 这个 Hub 仓库。

推荐做法：

1. 创建 fine-grained PAT。
2. Resource owner 选择 Hub 仓库所在账号或组织。
3. Repository access 只选择 `Just-Agent/just-ddl`。
4. Repository permissions 至少给 `Contents: Read and write`。
5. 设置过期时间。
6. 将 token 保存到子仓库 secret，例如 `HUB_DISPATCH_TOKEN`。

不要把 PAT 写进 YAML、README、shell 历史或日志。

## 子仓库 update-data.yml

完整可复制示例见 [`../examples/just-ddl-repository-dispatch/topic-update-data.yml`](../examples/just-ddl-repository-dispatch/topic-update-data.yml)。

```yaml
name: Update topic data

on:
  schedule:
    - cron: "0 */6 * * *"
  workflow_dispatch:
    inputs:
      reason:
        description: Reason for manual refresh
        required: false
        type: string

permissions:
  contents: write

jobs:
  update-data:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout topic repository
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Run Just-DDL crawler
        run: npm run crawl

      - name: Commit data changes
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "chore(data): update Just-DDL items"
          file_pattern: data/items.json

      - name: Notify Just-DDL hub
        env:
          HUB_DISPATCH_TOKEN: ${{ secrets.HUB_DISPATCH_TOKEN }}
        run: |
          test -n "$HUB_DISPATCH_TOKEN"
          curl -fsSL \
            -X POST \
            -H "Accept: application/vnd.github+json" \
            -H "Authorization: Bearer $HUB_DISPATCH_TOKEN" \
            -H "X-GitHub-Api-Version: 2026-03-10" \
            https://api.github.com/repos/Just-Agent/just-ddl/dispatches \
            -d '{
              "event_type": "topic-updated",
              "client_payload": {
                "topic": "ddl",
                "source_repo": "${{ github.repository }}",
                "source_sha": "${{ github.sha }}",
                "data_file": "data/items.json"
              }
            }'
```

## Hub 仓库 sync-topic-data.yml

完整可复制示例见 [`../examples/just-ddl-repository-dispatch/hub-sync-topic-data.yml`](../examples/just-ddl-repository-dispatch/hub-sync-topic-data.yml)。

```yaml
name: Sync topic data

on:
  repository_dispatch:
    types: [topic-updated]
  workflow_dispatch:

permissions:
  contents: write
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  sync-build-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout hub
        uses: actions/checkout@v4

      - name: Show dispatch payload
        run: |
          echo "event_type=${{ github.event.action }}"
          echo "topic=${{ github.event.client_payload.topic }}"
          echo "source_repo=${{ github.event.client_payload.source_repo }}"

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Sync all topic data
        run: npm run sync:topics

      - name: Build Pages site
        run: npm run build

      - name: Configure Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

## API 调用示例

### curl

```bash
curl -fsSL \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $HUB_DISPATCH_TOKEN" \
  -H "X-GitHub-Api-Version: 2026-03-10" \
  https://api.github.com/repos/Just-Agent/just-ddl/dispatches \
  -d '{
    "event_type": "topic-updated",
    "client_payload": {
      "topic": "ddl",
      "source_repo": "Just-Agent/just-ddl-topic",
      "data_file": "data/items.json"
    }
  }'
```

成功时 API 返回 `204 No Content`。

### gh api

```bash
GH_TOKEN="$HUB_DISPATCH_TOKEN" gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2026-03-10" \
  /repos/Just-Agent/just-ddl/dispatches \
  -f event_type=topic-updated \
  -f client_payload[topic]=ddl \
  -f client_payload[source_repo]=Just-Agent/just-ddl-topic \
  -f client_payload[data_file]=data/items.json
```

## client_payload 设计建议

| 字段 | 示例 | 用途 |
| --- | --- | --- |
| `topic` | `ddl` | Hub 判断哪个子专题更新 |
| `source_repo` | `${{ github.repository }}` | 追踪来源 |
| `source_sha` | `${{ github.sha }}` | 追踪触发版本 |
| `data_file` | `data/items.json` | Hub 知道同步哪个文件 |
| `run_id` | `${{ github.run_id }}` | 回查源 workflow 日志 |

`event_type` 最长 100 个字符。`client_payload` 最多 10 个顶层属性，整体负载应小于 64 KB。payload 不应包含 token、cookie、私有 URL 或本机路径。

## 排障清单

| 现象 | 可能原因 | 修复 |
| --- | --- | --- |
| curl/gh 返回 401 | token 缺失、过期、格式错误 | 检查 secret 名称，确认 header 是 `Authorization: Bearer ...` |
| 返回 403 | token 没有目标仓库写权限 | fine-grained PAT 选择 `Just-Agent/just-ddl` 并授予 Contents write |
| 返回 404 | 目标仓库名错误，或 token 无权看到目标仓库 | 核对 `Just-Agent/just-ddl`，确认 token owner 能访问 |
| 返回 204 但 Hub 没跑 | Hub workflow 不在默认分支；`types` 和 `event_type` 不一致 | workflow 放到默认分支，并保持 `topic-updated` 一致 |
| Hub 跑了但 payload 为空 | 读取字段名写错 | 使用 `${{ toJson(github.event.client_payload) }}` 临时打印 |
| Hub 同步旧数据 | 子仓库提交和 dispatch 顺序错误 | 先提交 `data/items.json`，再 dispatch |
| Pages 不更新 | build 产物路径、Pages 权限、部署分支配置错误 | 检查 `permissions`、`dist`、Pages 设置和部署日志 |
| 二次 workflow 没触发 | `GITHUB_TOKEN` 触发的 push 可能不会再触发其他 workflow | 在同一个 workflow 里完成 build/deploy，或使用明确的 dispatch/PAT |

## 和其他触发方式怎么选

- 子仓库自己定时更新：用 `schedule`。
- 人工立即刷新：加 `workflow_dispatch`。
- 子仓库更新后通知 Hub：用 `repository_dispatch`。
- Hub 仓库代码变更后部署：用 `push`。
- 外部系统需要推送事件到 GitHub：用 `repository_dispatch` 或 `workflow_dispatch` API。

## 相关文件

- [GitHub Actions 工作流基础](./github-actions-workflows.md)
- [Git 工作流 Playbook](./git-workflow-playbook.md)
- [Just-DDL repository_dispatch 示例](../examples/just-ddl-repository-dispatch/README.md)
