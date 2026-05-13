# Copilot Chat

参考来源：[GitHub Docs 入门](https://docs.github.com/zh/get-started)。

## 适合 Copilot Chat 的问题

- 解释陌生代码。
- 生成测试用例。
- 定位构建错误。
- 根据现有风格补一个组件。
- 总结 Pull Request 变更。

## 示例

```text
请解释 src/pages/Tutorials.tsx 中快速导航为什么没有切换 tab，并给出最小修复。
```

```text
请为这个函数补 3 个测试：正常输入、空输入、非法输入。
```

```text
这个 GitHub Actions 日志报 403，可能缺什么权限？
```

## 工作方式

1. 先让 Copilot 解释问题。
2. 再要求给最小修改。
3. 本地运行测试或构建。
4. 再让 Copilot 帮忙补测试或文档。

---

> 相关教程：[提示词技巧](prompt-engineering.md)
