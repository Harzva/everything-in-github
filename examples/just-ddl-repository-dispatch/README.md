# Just-DDL repository_dispatch 示例

这个目录保存 Just-DDL 跨仓库自动化的可复制模板：

| 文件 | 放置位置 | 用途 |
| --- | --- | --- |
| [`topic-update-data.yml`](./topic-update-data.yml) | 子专题仓库 `.github/workflows/update-data.yml` | 定时运行 crawler，更新 `data/items.json`，通知 Hub |
| [`hub-sync-topic-data.yml`](./hub-sync-topic-data.yml) | Hub 仓库 `.github/workflows/sync-topic-data.yml` | 监听 `repository_dispatch`，同步专题数据并部署 Pages |
| [`dispatch-curl.sh`](./dispatch-curl.sh) | 本地或 CI 脚本 | 用 curl 手动发送 dispatch |
| [`dispatch-gh.sh`](./dispatch-gh.sh) | 本地或 CI 脚本 | 用 GitHub CLI 手动发送 dispatch |

## 使用步骤

1. 在 Hub 仓库 `Just-Agent/just-ddl` 中添加 `hub-sync-topic-data.yml`。
2. 在子专题仓库中添加 `topic-update-data.yml`。
3. 创建 fine-grained PAT，只授权 `Just-Agent/just-ddl`，授予 Contents read/write。
4. 在子专题仓库 `Settings -> Secrets and variables -> Actions` 新增 `HUB_DISPATCH_TOKEN`。
5. 确认子专题仓库存在 `npm run crawl`，Hub 仓库存在 `npm run sync:topics` 和 `npm run build`。
6. 先手动运行子专题 `workflow_dispatch`，再观察 Hub 的 `sync-topic-data.yml` 是否被触发。

## API 事件约定

```json
{
  "event_type": "topic-updated",
  "client_payload": {
    "topic": "ddl",
    "source_repo": "Just-Agent/just-ddl-topic",
    "source_sha": "commit-sha",
    "data_file": "data/items.json"
  }
}
```

更多解释见 [repository_dispatch 跨仓库触发教程](../../docs/github-actions-repository-dispatch.md)。
