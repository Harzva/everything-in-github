# CodeQL 代码扫描

参考来源：[GitHub Docs 入门](https://docs.github.com/zh/get-started)。

## CodeQL 是什么？

CodeQL 用查询分析代码中的安全问题，适合在 Pull Request 和 main 分支上持续扫描。

## 基础 workflow

```yaml
name: CodeQL

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 2 * * 1'

jobs:
  analyze:
    runs-on: ubuntu-latest
    permissions:
      security-events: write
      contents: read
    steps:
      - uses: actions/checkout@v4
      - uses: github/codeql-action/init@v3
        with:
          languages: javascript-typescript
      - uses: github/codeql-action/analyze@v3
```

## 建议

- PR 扫描用于阻止新漏洞进入主分支。
- 定时扫描用于发现依赖或查询更新带来的新问题。
- 安全告警要结合上下文判断，不要机械关闭。

---

> 相关教程：[密钥管理](secrets-management.md)
