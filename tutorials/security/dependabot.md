# Dependabot 配置指南

> Dependabot 是 GitHub 的自动依赖更新工具，帮你保持依赖项最新和安全。

## 什么是 Dependabot？

Dependabot 提供两个核心功能：
- **Dependabot Alerts** — 检测依赖项中的安全漏洞
- **Dependabot Updates** — 自动创建 PR 更新依赖项

## 启用 Dependabot

### 1. 开启 Alerts
```
Settings → Code security and analysis → Dependabot alerts → Enable
```

### 2. 配置自动更新
创建 `.github/dependabot.yml`：

```yaml
version: 2
updates:
  # npm 依赖
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
    open-pull-requests-limit: 10
    reviewers:
      - "your-username"
    labels:
      - "dependencies"
      - "dependabot"

  # Python pip
  - package-ecosystem: "pip"
    directory: "/"
    schedule:
      interval: "weekly"

  # GitHub Actions
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "monthly"
```

## 支持的包管理器

| 生态系统 | 配置文件 |
|---------|---------|
| npm/yarn | `package.json` |
| pip | `requirements.txt` |
| Maven | `pom.xml` |
| Gradle | `build.gradle` |
| Bundler | `Gemfile` |
| Go modules | `go.mod` |
| Docker | `Dockerfile` |
| GitHub Actions | `.github/workflows/*.yml` |

## 高级配置

### 分组更新
```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    groups:
      dev-dependencies:
        patterns:
          - "@types/*"
          - "eslint*"
          - "prettier*"
```

### 忽略特定版本
```yaml
ignore:
  - dependency-name: "lodash"
    versions: ["4.17.0", "4.17.1"]
  - dependency-name: "express"
    update-types: ["version-update:semver-major"]
```

### 自动合并（结合 Actions）
```yaml
# .github/workflows/auto-merge.yml
name: Auto-merge Dependabot PRs
on: pull_request
jobs:
  dependabot:
    runs-on: ubuntu-latest
    if: github.actor == 'dependabot[bot]'
    steps:
      - name: Enable auto-merge
        run: gh pr merge --auto --merge "$PR_URL"
        env:
          PR_URL: ${{ github.event.pull_request.html_url }}
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

> [← Actions 教程](../actions-advanced/first-workflow.md) | [→ Copilot 教程](../copilot/getting-started.md)
