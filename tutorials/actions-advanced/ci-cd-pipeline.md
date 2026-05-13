# CI/CD 实战

参考来源：[GitHub Docs 入门](https://docs.github.com/zh/get-started)。

## 目标

每次 push 或 Pull Request 时自动安装依赖、运行测试、构建产物，并在 main 分支通过后部署。

## Node 项目示例

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
```

## 推荐拆分

| 阶段 | 目的 |
| --- | --- |
| install | 锁定依赖，保证可复现 |
| lint | 捕获格式和静态错误 |
| test | 验证核心行为 |
| build | 确认可发布 |
| deploy | 只在可信分支执行 |

---

> 相关教程：[首个工作流](first-workflow.md)
