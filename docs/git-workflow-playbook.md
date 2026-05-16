# Git 工作流 Playbook

> 本文记录维护本仓库文档、教程和示例时推荐的 Git 工作流。Git 基础可参考 [Pro Git Book](https://git-scm.com/book/en/v2)。

## 基础原则

1. 先同步默认分支，再新建任务分支。
2. 每次改动只解决一个主题。
3. 文档、示例、README 入口一起更新。
4. 提交前跑本地检查。
5. 不提交 token、私钥、`.env`、本机路径或截图中的敏感信息。

## 推荐流程

```bash
git status
git pull --ff-only
git switch -c docs/actions-repository-dispatch

# edit files

git diff --check
git status --short
git add docs examples README.md
git commit -m "docs: add repository dispatch tutorial"
git push -u origin docs/actions-repository-dispatch
```

## 文档变更检查

```bash
git diff --check
rg -n "HUB_DISPATCH_TOKEN|YOUR_TOKEN|ghp_|github_pat_" docs examples README.md
```

`HUB_DISPATCH_TOKEN` 是 secret 名称，可以出现在文档中；真实 token 值不能出现。

## YAML 示例检查

复制示例到真实仓库前，至少检查：

| 项目 | 检查点 |
| --- | --- |
| 仓库名 | `Just-Agent/just-ddl` 是否是目标 Hub 仓库 |
| event_type | 子仓库发送的 `topic-updated` 是否和 Hub `types` 一致 |
| secrets | 子仓库是否配置 `HUB_DISPATCH_TOKEN` |
| permissions | 写内容需要 `contents: write`，Pages 部署需要 `pages: write` 和 `id-token: write` |
| 构建命令 | `npm run crawl`、`npm run sync:topics`、`npm run build` 是否真实存在 |
| 数据路径 | 子专题是否实际生成 `data/items.json` |

## PR 描述模板

```markdown
## What changed

- Added repository_dispatch tutorial
- Added Just-DDL workflow examples
- Updated README entry

## Checks

- [ ] `git diff --check`
- [ ] Markdown local links checked
- [ ] No real token or local secret path committed
```

## 常见回滚方式

如果某个文档提交有问题，优先用新提交修复：

```bash
git switch main
git pull --ff-only
git revert <bad-commit-sha>
```

不要在多人协作分支上随意 `git reset --hard` 或强推。
