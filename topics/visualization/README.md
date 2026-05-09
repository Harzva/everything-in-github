# 数据可视化 (Visualization)

> GitHub 数据可视化和分析工具，包括贡献分析、语言统计、Stars 追踪、综合看板等。

## 贡献分析

| 工具 | Stars | 功能特点 |
|------|-------|---------|
| [github-readme-streak-stats](https://github.com/DenverCoder1/github-readme-streak-stats) | 6.8k | 连续贡献天数、总贡献数、最长连续记录 |
| [github-profile-3d-contrib](https://github.com/yoshi389111/github-profile-3d-contrib) | 1.6k | 3D 等距贡献图，多种主题 |
| [contribution-graph](https://github.com/cnshsliu/contribution-graph) | 0.5k | 自定义贡献图样式 |

## 语言统计

| 工具 | Stars | 功能特点 |
|------|-------|---------|
| [github-readme-stats](https://github.com/anuraghazra/github-readme-stats) | 79.3k | 语言使用比例、排名统计 |
| [github-profile-summary-cards](https://github.com/vn7n24fzkq/github-profile-summary-cards) | 3.5k | 语言统计、提交统计、主题统计 |

## Stars/Followers 追踪

| 工具 | Stars | 功能特点 |
|------|-------|---------|
| [star-history](https://github.com/star-history/star-history) | 9k | Stars 增长历史追踪，交互式图表 |
| [github-insights-dashboard](https://github.com/ozh/github-insights-dashboard) | 0.3k | 个人数据看板 |

## 综合数据看板

| 工具 | Stars | 功能特点 |
|------|-------|---------|
| [metrics](https://github.com/lowlighter/metrics) | 16.6k | 30+ 插件，等距3D贡献日历、雷达图、世界地图 |
| [HackerTab](https://github.com/huchenme/hacker-tab-extension) | 0.5k | Chrome 扩展，新标签页展示 |

## 活动追踪

| 工具 | Stars | 功能特点 |
|------|-------|---------|
| [waka-readme](https://github.com/athul/waka-readme) | 2.8k | WakaTime 编程时间统计 |
| [activity-box](https://github.com/JasonEtco/activity-box) | 0.8k | 最新活动展示 |

## 使用示例

### 语言统计卡片

```markdown
![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=YOUR_USERNAME&layout=compact&theme=dark)
```

### Star 历史图表

访问 [star-history.com](https://star-history.com/) 输入仓库地址查看 Stars 增长曲线。

### Metrics 综合看板

```markdown
![Metrics](https://metrics.lecoq.io/YOUR_USERNAME)
```

或使用 GitHub Actions 自动生成：

```yaml
- uses: lowlighter/metrics@latest
  with:
    token: ${{ secrets.METRICS_TOKEN }}
    base: header, activity, community, repositories
    plugin_isocalendar: yes
    plugin_languages: yes
    plugin_stars: yes
```
