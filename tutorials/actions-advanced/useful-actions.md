# 常用 Actions 推荐

参考来源：[GitHub Docs 入门](https://docs.github.com/zh/get-started)。

## 官方常用 Action

| Action | 用途 |
| --- | --- |
| `actions/checkout` | 检出仓库代码 |
| `actions/setup-node` | 安装 Node.js |
| `actions/setup-python` | 安装 Python |
| `actions/cache` | 缓存依赖 |
| `github/codeql-action` | 安全扫描 |

## 选择建议

1. 优先使用官方或高维护度 Action。
2. 固定主版本，例如 `@v4`。
3. 对会使用 secret 的 workflow 保持最小权限。
4. 复杂部署先在测试仓库验证。

---

> 相关教程：[CI/CD 实战](ci-cd-pipeline.md)
