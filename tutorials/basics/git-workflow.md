# Git 工作流

参考来源：[GitHub Docs 入门](https://docs.github.com/zh/get-started)、[菜鸟教程：Github 简明教程](https://www.runoob.com/w3cnote/git-guide.html)。

## 推荐流程

```text
main -> feature branch -> commit -> push -> pull request -> review -> merge
```

## 命令示例

```bash
git checkout main
git pull origin main
git checkout -b feature/search
git add .
git commit -m "feat: add search"
git push -u origin feature/search
```

## 分支建议

| 分支 | 用途 |
| --- | --- |
| `main` | 稳定可发布版本 |
| `feature/*` | 新功能 |
| `fix/*` | Bug 修复 |
| `docs/*` | 文档变更 |

---

> 相关教程：[Pull Request 指南](../collaboration/pull-requests.md)
