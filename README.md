<div align="center">

# Everything in GitHub

**GitHub 资源综合收集仓库 — 成就徽章 · 个人资料 · 自动化 · 社区活动 · 数据可视化**

[![Website](https://img.shields.io/badge/GitHub%20Pages-在线预览-8B5CF6?style=for-the-badge&logo=github)](https://harzva.github.io/everything-in-github)
[![Repos](https://img.shields.io/badge/收录仓库-70+-10B981?style=for-the-badge&logo=github)](https://github.com/Harzva/everything-in-github)
[![Stars](https://img.shields.io/badge/总%20Stars-200k+-F59E0B?style=for-the-badge&logo=github)](https://github.com/Harzva/everything-in-github)

</div>

---

## 项目简介

欢迎来到 **Everything in GitHub** — 一个全面收集 GitHub 生态资源的综合仓库。无论你是想解锁 GitHub 成就徽章、美化个人资料、设置 CI/CD 自动化工作流，还是追踪开源社区动态，这里都有你需要的资源和指南。

### 收录范围

- **70+ 精选仓库** 覆盖 5 大主题维度
- **累计 200k+ Stars** 的精选工具集合
- **详细功能说明** 和可视化展示
- **中文文档** 和分类索引

---

## 主题分类

| 分类 | 徽章 | 收录数量 | 说明 |
|------|------|---------|------|
| [成就徽章](topics/achievements/README.md) | 🏆 | 9 个可获取徽章 + 2 个已退役 | GitHub Achievements 完整指南 |
| [个人资料](topics/profile/README.md) | 👤 | 15+ 个工具 | README 生成器、统计卡片、3D 贡献图 |
| [自动化](topics/actions/README.md) | ⚡ | 15+ 个 Actions | CI/CD 工作流、部署工具、Issue 管理 |
| [社区活动](topics/community/README.md) | 🌐 | 14+ 个资源 | Hacktoberfest、Trending、Sponsor |
| [数据可视化](topics/visualization/README.md) | 📊 | 18+ 个工具 | 贡献分析、语言统计、数据看板 |

---

## 快速导航

### 成就徽章 Achievements
解锁全部 9 个 GitHub 成就徽章的完整指南：

| 徽章 | 名称 | 获取方式 | 等级 |
|------|------|----------|------|
| ⚡ | Quickdraw | 5 分钟内关闭 Issue/PR | 一次性 |
| 😅 | YOLO | 合并未经审查的 PR | 一次性 |
| 💖 | Public Sponsor | 通过 GitHub Sponsors 赞助 | 一次性 |
| 🌟 | Starstruck | 仓库获得 16+ Stars | 4 级 |
| 🦈 | Pull Shark | 合并 PR | 4 级 |
| 🧠 | Galaxy Brain | Discussion 回答被采纳 | 4 级 |
| 🤝 | Pair Extraordinaire | 共同作者的 PR 被合并 | 4 级 |

[查看完整成就指南 →](topics/achievements/README.md)

### 个人资料 Profile

| 工具 | Stars | 功能 |
|------|-------|------|
| [github-readme-stats](https://github.com/anuraghazra/github-readme-stats) | 79.3k | 多种统计卡片 |
| [github-profile-readme-generator](https://github.com/rahuldkjain/github-profile-readme-generator) | 24.2k | README 生成器 |
| [metrics](https://github.com/lowlighter/metrics) | 16.6k | 综合信息图(30+插件) |
| [github-readme-streak-stats](https://github.com/DenverCoder1/github-readme-streak-stats) | 6.8k | 连续贡献记录 |
| [github-profile-trophy](https://github.com/ryo-ma/github-profile-trophy) | 6.5k | 奖杯展示 |
| [github-profile-3d-contrib](https://github.com/yoshi389111/github-profile-3d-contrib) | 1.6k | 3D 贡献图 |

[查看更多 Profile 工具 →](topics/profile/README.md)

### 自动化 Actions

| 工具 | Stars | 功能 |
|------|-------|------|
| [super-linter](https://github.com/super-linter/super-linter) | 10.2k | 多语言代码检查 |
| [action-gh-release](https://github.com/softprops/action-gh-release) | 5.6k | 自动发布 |
| [actions-gh-pages](https://github.com/peaceiris/actions-gh-pages) | 5.3k | Pages 部署 |
| [setup-node](https://github.com/actions/setup-node) | 4.8k | Node.js 环境 |
| [release-drafter](https://github.com/release-drafter/release-drafter) | 3.9k | Release Notes |

[查看更多 Actions 工具 →](topics/actions/README.md)

---

## GitHub Pages 网站

本项目包含一个精美的 GitHub Pages 网站，提供：

- **主题分类导航** — 5 大主题，结构化浏览
- **搜索/筛选功能** — 按类别、Stars、语言筛选
- **徽章/图标预览** — 可视化展示所有工具效果
- **响应式设计** — 完美适配桌面和移动设备
- **暗色科技主题** — 沉浸式的浏览体验

👉 **[在线预览](https://harzva.github.io/everything-in-github)**

---

## 目录结构

```
everything-in-github/
├── README.md                          # 主文档
├── data/
│   └── repos.json                     # 完整仓库数据
├── topics/
│   ├── achievements/
│   │   └── README.md                  # 成就徽章指南
│   ├── profile/
│   │   └── README.md                  # 个人资料工具
│   ├── actions/
│   │   └── README.md                  # 自动化工作流
│   ├── community/
│   │   └── README.md                  # 社区活动
│   └── visualization/
│       └── README.md                  # 数据可视化
├── website/                           # 网站源码
│   ├── src/                           # React 源码
│   ├── dist/                          # 构建产物
│   └── public/                        # 静态资源
└── .github/
    └── workflows/
        └── pages.yml                  # GitHub Pages 部署
```

---

## 贡献指南

欢迎提交 Pull Request 补充更多优质仓库！请确保：

1. 仓库与 GitHub 生态相关
2. 提供简要的功能描述
3. 标明所属主题分类

---

## 数据来源

所有仓库信息均来自 GitHub 公开 API 和官方文档，调研时间：2025年5月。

---

<div align="center">

**Made with ❤️ for the GitHub Community**

[查看 GitHub 仓库](https://github.com/Harzva/everything-in-github) · [在线预览](https://harzva.github.io/everything-in-github)

</div>
