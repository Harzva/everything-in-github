# 自动化工作流 (Actions)

> GitHub Actions 工作流模板、CI/CD 工具、部署自动化、Issue/PR 管理工具集合。

## 工作流模板

### CI/CD 工作流

| 工具 | Stars | 功能特点 |
|------|-------|---------|
| [super-linter](https://github.com/super-linter/super-linter) | 10.2k | 多语言代码检查，支持 20+ 语言 |
| [setup-node](https://github.com/actions/setup-node) | 4.8k | 官方 Node.js 环境配置 |
| [setup-python](https://github.com/actions/setup-python) | 3.5k | 官方 Python 环境配置 |
| [cache](https://github.com/actions/cache) | 4.0k | 依赖缓存加速构建 |

### GitHub Pages 部署

| 工具 | Stars | 功能特点 |
|------|-------|---------|
| [actions-gh-pages](https://github.com/peaceiris/actions-gh-pages) | 5.3k | 部署到 GitHub Pages |
| [github-pages-deploy-action](https://github.com/JamesIves/github-pages-deploy-action) | 4.6k | 灵活的 Pages 部署 |

### Issue/PR 管理

| 工具 | Stars | 功能特点 |
|------|-------|---------|
| [labeler](https://github.com/actions/labeler) | 2.4k | 自动按文件路径打标签 |
| [release-drafter](https://github.com/release-drafter/release-drafter) | 3.9k | 自动起草 Release Notes |
| [stale](https://github.com/actions/stale) | 1.7k | 自动清理陈旧 Issue/PR |
| [auto-assign](https://github.com/kentaro-m/auto-assign-action) | 0.8k | 自动分配 Reviewer |

### 自动化工具

| 工具 | Stars | 功能特点 |
|------|-------|---------|
| [action-gh-release](https://github.com/softprops/action-gh-release) | 5.6k | 自动创建 GitHub Release |
| [blog-post-workflow](https://github.com/gautamkrishnar/blog-post-workflow) | 3.4k | README 自动同步博客文章 |
| [contributors-readme-chart](https://github.com/akhilmhdh/contributors-readme-chart) | 0.5k | 自动生成贡献者图表 |

### 安全与依赖

| 工具 | Stars | 功能特点 |
|------|-------|---------|
| [codeql-action](https://github.com/github/codeql-action) | 官方 | 代码安全分析 |
| [dependabot](https://github.com/dependabot) | 官方 | 自动依赖更新 |

## 工作流示例

### 完整的 CI/CD 工作流

```yaml
name: CI/CD
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
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 自动 Release 工作流

```yaml
name: Release
on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: softprops/action-gh-release@v2
        with:
          generate_release_notes: true
```
