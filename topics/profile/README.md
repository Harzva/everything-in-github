# 个人资料工具 (Profile)

> 美化 GitHub 个人资料的各种工具，包括 README 生成器、统计卡片、3D 贡献图、奖杯展示等。

## 工具分类

### README 生成器

| 工具 | Stars | 功能特点 |
|------|-------|---------|
| [github-profile-readme-generator](https://github.com/rahuldkjain/github-profile-readme-generator) | 24.2k | 图形化界面，表单填写生成精美 README |
| [metrics](https://github.com/lowlighter/metrics) | 16.6k | 30+ 插件，SVG/Markdown/PDF/JSON 输出 |

### 统计卡片

| 工具 | Stars | 功能特点 |
|------|-------|---------|
| [github-readme-stats](https://github.com/anuraghazra/github-readme-stats) | 79.3k | 语言统计、stars 统计、commits 统计，30+ 主题 |
| [github-readme-streak-stats](https://github.com/DenverCoder1/github-readme-streak-stats) | 6.8k | 连续贡献记录，火焰图标 |
| [github-profile-summary-cards](https://github.com/vn7n24fzkq/github-profile-summary-cards) | 3.5k | 个人资料摘要卡片 |

### 3D 贡献图

| 工具 | Stars | 功能特点 |
|------|-------|---------|
| [github-profile-3d-contrib](https://github.com/yoshi389111/github-profile-3d-contrib) | 1.6k | 3D 等距贡献图，多种渲染模式 |
| [github-contribution-graph](https://github.com/hendrasob/github-contribution-graph) | 0.3k | 自定义贡献图样式 |
| [github/skyline](https://github.com/github/gh-skyline) | 官方 | 将贡献图转为 3D 打印模型 |

### 奖杯与成就展示

| 工具 | Stars | 功能特点 |
|------|-------|---------|
| [github-profile-trophy](https://github.com/ryo-ma/github-profile-trophy) | 6.5k | 游戏化成就系统，等级制 |
| [github-profile-views-counter](https://github.com/antonkomarev/github-profile-views-counter) | 4.9k | 个人资料访问量计数 |

### 其他工具

| 工具 | Stars | 功能特点 |
|------|-------|---------|
| [blog-post-workflow](https://github.com/gautamkrishnar/blog-post-workflow) | 3.4k | README 中自动展示最新博客文章 |
| [waka-readme](https://github.com/athul/waka-readme) | 2.8k | WakaTime 编程时间统计 |
| [readme-typing-svg](https://github.com/DenverCoder1/readme-typing-svg) | 4.5k | 打字机动画效果 |

## 使用示例

### GitHub Stats 卡片

```markdown
![Anurag's GitHub stats](https://github-readme-stats.vercel.app/api?username=YOUR_USERNAME&show_icons=true&theme=radical)
```

### 连续贡献记录

```markdown
![GitHub Streak](https://streak-stats.demolab.com/?user=YOUR_USERNAME&theme=dark)
```

### 3D 贡献图

使用 GitHub Actions 自动每日生成 3D 贡献图：

```yaml
- uses: yoshi389111/github-profile-3d-contrib@latest
  with:
    username: YOUR_USERNAME
```

### 奖杯展示

```markdown
![trophy](https://github-profile-trophy.vercel.app/?username=YOUR_USERNAME&theme=darkhub)
```
