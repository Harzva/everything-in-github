# Jekyll 主题使用

参考来源：[GitHub Docs 入门](https://docs.github.com/zh/get-started)。

## 适用场景

如果你的 GitHub Pages 是 Markdown 文档站，Jekyll 可以把 Markdown 渲染成静态网站，并通过主题快速获得导航、排版和代码高亮。

## 基础文件

```text
.
├── _config.yml
├── index.md
└── README.md
```

## 配置主题

在 `_config.yml` 中声明主题：

```yaml
theme: minima
title: My GitHub Pages
description: A documentation site hosted on GitHub Pages
```

提交后到仓库的 **Settings -> Pages** 查看构建状态。

## 常见页面

| 文件 | 作用 |
| --- | --- |
| `index.md` | 首页 |
| `about.md` | 关于页 |
| `_posts/` | 博客文章 |
| `_config.yml` | 站点配置 |

---

> 相关教程：[快速部署个人网站](quickstart.md)
