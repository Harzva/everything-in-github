# GitHub Pages 快速部署指南

> 5 分钟搭建你的个人网站或项目文档站。

## 什么是 GitHub Pages？

GitHub Pages 是 GitHub 提供的免费静态网站托管服务：
- **免费** — 完全免费，无流量限制
- **自动部署** — push 代码自动更新网站
- **自定义域名** — 支持绑定自己的域名
- **Jekyll 支持** — 内置静态网站生成器

## 快速开始（3种方式）

### 方式一：从 README 自动部署

最简单的方式，不需要额外配置：

1. 创建一个名为 `你的用户名.github.io` 的仓库
2. 添加 `README.md` 文件
3. 访问 `https://你的用户名.github.io`

### 方式二：使用 Jekyll 主题

1. 进入仓库 **Settings** → **Pages**
2. 在 **Build and deployment** 中选择 **Deploy from a branch**
3. 选择分支和根目录
4. 点击 **Choose a theme** 选择主题

### 方式三：自定义部署（React/Vue 等）

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 项目网站 vs 个人网站

| 类型 | 仓库名 | URL | 说明 |
|------|--------|-----|------|
| **个人网站** | `用户名.github.io` | `用户名.github.io` | 只能一个 |
| **项目网站** | 任意 | `用户名.github.io/仓库名` | 可多个 |

## 绑定自定义域名

1. 在仓库根目录创建 `CNAME` 文件
2. 文件内容填写你的域名：`www.yourdomain.com`
3. 在域名服务商添加 DNS 记录：
   - A 记录指向 `185.199.108.153`
   - 或 CNAME 记录指向 `用户名.github.io`

## 推荐 Jekyll 主题

| 主题 | 特点 | 适合 |
|------|------|------|
| **Minimal** | 简洁干净 | 个人博客 |
| **Cayman** | 现代化设计 | 项目文档 |
| **Hacker** | 终端风格 | 技术文档 |
| **Slate** | 专业文档 | API 文档 |

## 常见问题

**Q: 网站更新后多久生效？**
A: 通常 1-5 分钟，最长不超过 30 分钟。

**Q: 支持 HTTPS 吗？**
A: 支持，GitHub 自动提供 SSL 证书。

**Q: 可以商用吗？**
A: 可以，但建议查看 [GitHub 服务条款](https://docs.github.com/zh/site-policy)。

---

> [← 协作工作流](../collaboration/pull-requests.md) | [→ Actions 自动化](../actions-advanced/first-workflow.md)
