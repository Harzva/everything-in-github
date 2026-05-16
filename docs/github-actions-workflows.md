# GitHub Actions 工作流基础

> 面向本仓库维护者的 GitHub Actions 入门与排障手册。示例优先使用官方能力，参考 [GitHub Actions 文档](https://docs.github.com/en/actions)、[Workflow syntax](https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax) 与 [GitHub Skills](https://skills.github.com/)。

## 核心概念

| 概念 | 作用 | 常见写法 |
| --- | --- | --- |
| workflow | 一个自动化流程，保存在 `.github/workflows/*.yml` | `name: Deploy` |
| event | 触发 workflow 的事件 | `push`、`pull_request`、`schedule` |
| job | 一组在同一个 runner 上执行的步骤 | `jobs.build` |
| step | job 中的单个动作，可以运行命令或调用 action | `run: npm test` |
| action | 可复用的自动化单元 | `uses: actions/checkout@v4` |
| runner | 运行 job 的机器 | `runs-on: ubuntu-latest` |
| context | GitHub 提供的运行时信息 | `${{ github.ref }}` |
| secret | 仓库或组织里加密保存的敏感值 | `${{ secrets.MY_TOKEN }}` |

最小工作流：

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install
        run: npm ci

      - name: Build
        run: npm run build
```

## 常见触发事件对比

| 事件 | 适用场景 | 优点 | 注意事项 |
| --- | --- | --- | --- |
| `push` | 代码推送后自动验证或部署 | 最自然的 CI/CD 入口 | 用 `branches` 限定可信分支 |
| `pull_request` | PR 检查、测试、预览 | 适合保护主分支 | 来自 fork 的 PR 默认无法读取敏感 secrets |
| `workflow_dispatch` | 手动触发、带输入参数的维护任务 | 适合人工确认后执行 | 需要在 Actions 页面或 API/CLI 中主动触发 |
| `schedule` | 定时爬虫、定时同步、健康检查 | 不依赖代码变更 | 使用 UTC cron；公共仓库长期无活动可能被暂停 |
| `repository_dispatch` | 外部系统或另一个仓库触发当前仓库 | 适合 Hub/子仓库联动 | 需要对目标仓库有写权限的 token |

## workflow_dispatch 示例

```yaml
name: Manual Data Refresh

on:
  workflow_dispatch:
    inputs:
      reason:
        description: Why run this job?
        required: false
        type: string

jobs:
  refresh:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: echo "Manual refresh: ${{ inputs.reason }}"
```

## schedule 示例

```yaml
name: Nightly Check

on:
  schedule:
    - cron: "0 18 * * *"
  workflow_dispatch:

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - run: date -u
```

`schedule` 的 cron 使用 UTC。北京时间 02:00 对应 UTC 前一天 18:00。

## 权限与 token

`GITHUB_TOKEN` 是 GitHub Actions 为当前 workflow 自动注入的临时 token。它适合当前仓库内的 checkout、提交、创建 release、部署 Pages 等任务，但默认不应该被当作跨仓库自动化凭据。

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

当 workflow 需要写仓库内容时，显式声明最小权限：

```yaml
permissions:
  contents: write
```

跨仓库触发 `repository_dispatch` 时，源仓库的 `GITHUB_TOKEN` 通常没有目标仓库写权限。应使用目标仓库授权的 fine-grained PAT，并只授予目标仓库所需权限。

| token 类型 | 生命周期 | 典型用途 | 风险控制 |
| --- | --- | --- | --- |
| `GITHUB_TOKEN` | 单次 workflow 临时生成 | 当前仓库内 CI/CD | 用 `permissions` 最小化权限 |
| classic PAT | 用户长期 token | 兼容旧系统或多仓库脚本 | 权限粗，尽量少用 |
| fine-grained PAT | 用户创建，可限定仓库和权限 | 跨仓库 dispatch、只写某个仓库 | 推荐，设置过期时间和最小权限 |

## secrets 配置

1. 打开目标仓库的 `Settings -> Secrets and variables -> Actions`。
2. 选择 `New repository secret`。
3. 命名为语义化名称，例如 `HUB_DISPATCH_TOKEN`。
4. 值只填写 token 本身，不写引号、不写 `Bearer` 前缀。
5. workflow 中使用 `${{ secrets.HUB_DISPATCH_TOKEN }}`。

不要把 token、私钥路径、本机用户名、浏览器 cookie 写进仓库。示例文档只使用占位符。

## 常见排障

| 问题 | 排查方向 | 处理方式 |
| --- | --- | --- |
| workflow 没触发 | workflow 文件是否在默认分支；事件名和分支过滤是否匹配 | 先加 `workflow_dispatch` 手动跑一次 |
| `repository_dispatch` 返回 204 但没运行 | `event_type` 是否匹配 `types`；目标 workflow 是否在默认分支 | 对齐 `event_type: topic-updated` 与 `types: [topic-updated]` |
| API 返回 401/403 | token 无效、过期、权限不足或没有目标仓库访问权 | fine-grained PAT 选择目标仓库并授予 Contents write |
| secrets 读不到 | secret 配置在错误仓库/环境；fork PR 默认不能读取 | 检查仓库级、环境级 secret；不要在不可信 PR 中使用 |
| Pages 没部署 | Pages source、workflow 权限、`dist/` 路径或分支错误 | 检查 Pages 设置和 deploy workflow 日志 |
| GITHUB_TOKEN 提交后没有触发二次 workflow | GitHub 会限制 `GITHUB_TOKEN` 触发递归 workflow | 把 build/deploy 放在同一 workflow，或使用受控 PAT 触发明确事件 |
| schedule 没按北京时间跑 | cron 是 UTC | 按 UTC 换算，或在文档中标注本地时间 |

## 延伸阅读

- [GitHub Actions](https://docs.github.com/en/actions)
- [Workflow syntax for GitHub Actions](https://docs.github.com/actions/reference/workflows-and-actions/workflow-syntax)
- [Events that trigger workflows](https://docs.github.com/actions/learn-github-actions/events-that-trigger-workflows)
- [GitHub Skills](https://skills.github.com/)
