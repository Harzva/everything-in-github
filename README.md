<div align="center">

# Everything in GitHub

GitHub 知识地图与开源资源导航：把成就徽章、Profile 美化、Actions 自动化、Pages 教程、官方认证与精选工具放在一个可浏览的网站里。

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-online-2ea44f?style=for-the-badge&logo=github)](https://harzva.github.io/everything-in-github/#/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=111)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?style=for-the-badge&logo=vite&logoColor=fff)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?style=for-the-badge&logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)

[在线预览](https://harzva.github.io/everything-in-github/#/) ·
[徽章墙](https://harzva.github.io/everything-in-github/#/badges) ·
[成就指南](https://harzva.github.io/everything-in-github/#/achievements) ·
[教程索引](./tutorials/README.md)

</div>

<p align="center">
  <img src="./public/hero-og-bg.jpg" width="900" alt="Everything in GitHub preview" />
</p>

## 项目亮点

Everything in GitHub 是一个面向 GitHub 学习者、开源维护者和 Profile 玩家整理的导航型网站。它不是只放链接的 awesome list，而是把资源按实际使用场景组织成可浏览、可搜索、可学习的知识地图。

| 模块 | 内容 | 入口 |
| --- | --- | --- |
| 成就徽章 | 9 个可获取成就、2 个退役成就、等级要求与获取指南 | [`#/achievements`](https://harzva.github.io/everything-in-github/#/achievements) |
| 徽章墙 | GitHub Achievements、Highlights、官方认证、Profile Trophy 展示 | [`#/badges`](https://harzva.github.io/everything-in-github/#/badges) |
| Profile 美化 | README 生成器、统计卡片、3D 贡献图、奖杯展示 | [`#/profile`](https://harzva.github.io/everything-in-github/#/profile) |
| Actions 自动化 | CI/CD、Pages 部署、Release、Issue 管理、安全扫描工具 | [`#/actions`](https://harzva.github.io/everything-in-github/#/actions) |
| 教程体系 | GitHub 入门、协作、Pages、Actions、安全、Copilot、认证学习路径 | [`#/tutorials`](https://harzva.github.io/everything-in-github/#/tutorials) |
| 搜索筛选 | 按主题、语言、Star 数筛选 GitHub 生态仓库 | [`#/search`](https://harzva.github.io/everything-in-github/#/search) |

## 真实徽章资源

网站中的成就徽章已经从纯图标占位升级为真实徽章图片资源，并保留图标回退，避免图片加载失败时页面空白。

<p align="center">
  <img src="./public/achievement-badges/quickdraw.png" width="84" alt="Quickdraw" />
  <img src="./public/achievement-badges/yolo.png" width="84" alt="YOLO" />
  <img src="./public/achievement-badges/public-sponsor.png" width="84" alt="Public Sponsor" />
  <img src="./public/achievement-badges/starstruck.png" width="84" alt="Starstruck" />
  <img src="./public/achievement-badges/pull-shark.png" width="84" alt="Pull Shark" />
  <img src="./public/achievement-badges/galaxy-brain.png" width="84" alt="Galaxy Brain" />
</p>

徽章图片来源于公开社区资源 [`drknzz/GitHub-Achievements`](https://github.com/drknzz/GitHub-Achievements)，项目内页面会以本地 `public/achievement-badges/` 资源渲染，部署后不依赖远程图片热链。

## 内容规模

| 类型 | 当前规模 |
| --- | ---: |
| 主题分类 | 5 个 |
| 收录仓库 | 70+ |
| GitHub 官方认证 | 5 种 |
| 系统教程 | 20+ 篇 |
| 学习路径 | 4 条 |
| 本地真实徽章图片 | 23 张 |

## 快速运行

```bash
npm ci
npm run dev
```

默认开发地址：

```text
http://127.0.0.1:3000/
```

生产构建：

```bash
npm run build
```

## GitHub Pages 部署

仓库已包含 GitHub Actions 工作流：

```text
.github/workflows/deploy.yml
```

推送到 `main` 后会执行：

1. 安装 Node.js 20
2. 使用 `npm ci` 安装锁定依赖
3. 运行 `npm run build`
4. 将 `dist/` 发布到 `gh-pages` 分支

当前 Pages 入口：

```text
https://harzva.github.io/everything-in-github/#/
```

## 项目结构

```text
.
├── data/                         # 教程与仓库数据
├── public/
│   ├── achievement-badges/       # 真实 GitHub 成就徽章图片
│   └── *.jpg / *.png / *.mp4     # 页面视觉资源
├── src/
│   ├── components/               # 布局与 UI 组件
│   ├── data/                     # 前端仓库分类数据
│   ├── pages/                    # Home、Badges、Achievements、Tutorials 等页面
│   └── main.tsx                  # HashRouter 入口
├── topics/                       # 主题资源 Markdown
├── tutorials/                    # 系统教程 Markdown
└── .github/workflows/deploy.yml  # Pages 自动部署
```

## 资源来源

- GitHub 官方文档：[GitHub Docs](https://docs.github.com/zh)
- 官方认证：[GitHub Certifications](https://docs.github.com/zh/get-started/showcase-your-expertise-with-github-certifications/about-github-certifications)
- GitHub 学习平台：[GitHub Learn](https://learn.github.com/)
- 成就徽章图片参考：[`drknzz/GitHub-Achievements`](https://github.com/drknzz/GitHub-Achievements)
- 中文 GitHub 教程参考：[`xirong/my-git`](https://github.com/xirong/my-git)

## 维护说明

欢迎继续补充 GitHub 生态工具和教程。新增资源时建议同时更新：

- [`data/repos.json`](./data/repos.json)
- [`src/data/repos.ts`](./src/data/repos.ts)
- 对应的 [`topics/`](./topics/) 或 [`tutorials/`](./tutorials/) Markdown 页面

<div align="center">

Made for GitHub learners and open-source builders.

[在线预览](https://harzva.github.io/everything-in-github/#/) · [GitHub 仓库](https://github.com/Harzva/everything-in-github)

</div>
