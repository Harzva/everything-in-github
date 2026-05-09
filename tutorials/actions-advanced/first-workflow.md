# 你的第一个 GitHub Actions 工作流

> GitHub Actions 是 GitHub 提供的 CI/CD 平台，可以自动化你的开发工作流。

## 什么是 GitHub Actions？

Actions 允许你在 GitHub 仓库中自动化任务：
- **持续集成** — 自动运行测试
- **持续部署** — 自动发布代码
- **自动化任务** — Issue 管理、标签添加等

## 核心概念

| 术语 | 说明 |
|------|------|
| **Workflow** | 工作流文件，定义自动化任务 |
| **Event** | 触发工作流的事件（push、PR 等） |
| **Job** | 一组步骤的集合 |
| **Step** | 单个任务单元 |
| **Action** | 可复用的脚本单元 |

## Hello World 工作流

创建 `.github/workflows/hello.yml`：

```yaml
name: Hello World

on: [push]

jobs:
  say-hello:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Say Hello
        run: echo "Hello, GitHub Actions!"
      
      - name: Show current date
        run: date
```

## 常用触发事件

```yaml
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 0 * * *'  # 每天午夜
  workflow_dispatch:  # 手动触发
```

## 实用工作流示例

### 自动运行测试

```yaml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm test
```

### 自动部署到 Pages

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 自动添加标签

```yaml
name: Labeler
on: [pull_request]
jobs:
  label:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/labeler@v4
        with:
          repo-token: "${{ secrets.GITHUB_TOKEN }}"
```

## 精选 Actions

| Actions | 用途 |  Stars  |
|---------|------|--------|
| [actions/checkout](https://github.com/actions/checkout) | 检出代码 | 官方 |
| [actions/setup-node](https://github.com/actions/setup-node) | 设置 Node.js | 官方 |
| [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages) | 部署到 Pages | 5.3k |
| [softprops/action-gh-release](https://github.com/softprops/action-gh-release) | 创建 Release | 5.6k |

---

> [← GitHub Pages](../github-pages/quickstart.md) | [→ 安全教程](../security/dependabot.md)
