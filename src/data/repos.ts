export interface Repo {
  id: number;
  name: string;
  owner: string;
  fullName: string;
  stars: string;
  starsNum: number;
  category: string;
  description: string;
  language?: string;
  forks?: string;
  issues?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  accent: string;
  accentColor: string;
  glowColor: string;
  count: string;
  link: string;
}

export const categories: Category[] = [
  {
    id: 'achievements',
    name: '成就徽章',
    description: '解锁全部 9 个成就徽章的完整指南，包含 Quickdraw、YOLO、Starstruck 等',
    icon: 'Trophy',
    accent: 'amber',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245,158,11,0.2)',
    count: '3 个核心仓库',
    link: '/achievements',
  },
  {
    id: 'profile',
    name: '个人资料',
    description: 'README 生成器、统计卡片、3D 贡献图、奖杯展示等美化工具',
    icon: 'User',
    accent: 'violet',
    accentColor: '#8B5CF6',
    glowColor: 'rgba(139,92,246,0.2)',
    count: '8+ 个工具',
    link: '/profile',
  },
  {
    id: 'actions',
    name: '自动化',
    description: 'CI/CD 工作流模板、Pages 部署、Issue 管理、自动化发布工具',
    icon: 'Zap',
    accent: 'emerald',
    accentColor: '#10B981',
    glowColor: 'rgba(16,185,129,0.2)',
    count: '10+ 个工作流',
    link: '/actions',
  },
  {
    id: 'community',
    name: '社区活动',
    description: 'Hacktoberfest、Trending 追踪、开源赞助、教育资源',
    icon: 'Users',
    accent: 'cyan',
    accentColor: '#06B6D4',
    glowColor: 'rgba(6,182,212,0.2)',
    count: '5 个子分类',
    link: '/community',
  },
  {
    id: 'visualization',
    name: '数据可视化',
    description: '贡献分析、提交模式可视化、语言统计、Stars 追踪工具',
    icon: 'BarChart3',
    accent: 'rose',
    accentColor: '#F43F5E',
    glowColor: 'rgba(244,63,94,0.2)',
    count: '6+ 个工具',
    link: '/visualization',
  },
];

export const featuredRepos: Repo[] = [
  {
    id: 1,
    name: 'github-readme-stats',
    owner: 'anuraghazra',
    fullName: 'anuraghazra/github-readme-stats',
    stars: '79.3k',
    starsNum: 79300,
    category: 'profile',
    description: '动态生成 GitHub 统计卡片',
    language: 'JavaScript',
    forks: '24.1k',
    issues: '3.2k',
  },
  {
    id: 2,
    name: 'github-profile-trophy',
    owner: 'ryo-ma',
    fullName: 'ryo-ma/github-profile-trophy',
    stars: '6.5k',
    starsNum: 6500,
    category: 'profile',
    description: '在 README 中展示 GitHub 奖杯',
    language: 'TypeScript',
    forks: '892',
    issues: '156',
  },
  {
    id: 3,
    name: 'super-linter',
    owner: 'super-linter',
    fullName: 'super-linter/super-linter',
    stars: '10.2k',
    starsNum: 10200,
    category: 'actions',
    description: '多语言代码检查工作流',
    language: 'Shell',
    forks: '1.1k',
    issues: '289',
  },
  {
    id: 4,
    name: 'github-profile-3d-contrib',
    owner: 'yoshi389111',
    fullName: 'yoshi389111/github-profile-3d-contrib',
    stars: '1.6k',
    starsNum: 1600,
    category: 'visualization',
    description: '生成 3D 贡献图',
    language: 'Python',
    forks: '218',
    issues: '45',
  },
  {
    id: 5,
    name: 'actions-gh-pages',
    owner: 'peaceiris',
    fullName: 'peaceiris/actions-gh-pages',
    stars: '5.3k',
    starsNum: 5300,
    category: 'actions',
    description: 'GitHub Pages 部署 Action',
    language: 'TypeScript',
    forks: '892',
    issues: '178',
  },
  {
    id: 6,
    name: 'Get-Github-Achievements',
    owner: '4xmen',
    fullName: '4xmen/Get-Github-Achievements',
    stars: '1.3k',
    starsNum: 1300,
    category: 'achievements',
    description: '多语言成就获取指南',
    language: 'Markdown',
    forks: '312',
    issues: '28',
  },
];

export const allRepos: Repo[] = [
  ...featuredRepos,
  {
    id: 7,
    name: 'metrics',
    owner: 'lowlighter',
    fullName: 'lowlighter/metrics',
    stars: '14.5k',
    starsNum: 14500,
    category: 'profile',
    description: '令人惊叹的 GitHub 个人资料生成器，包含 40+ 种插件',
    language: 'JavaScript',
    forks: '2.8k',
    issues: '342',
  },
  {
    id: 8,
    name: 'github-readme-streak-stats',
    owner: 'DenverCoder1',
    fullName: 'DenverCoder1/github-readme-streak-stats',
    stars: '4.8k',
    starsNum: 4800,
    category: 'profile',
    description: '在 README 中展示 GitHub 连续贡献记录',
    language: 'PHP',
    forks: '756',
    issues: '89',
  },
  {
    id: 9,
    name: 'github-achievements',
    owner: 'arndom',
    fullName: 'arndom/github-achievements',
    stars: '892',
    starsNum: 892,
    category: 'achievements',
    description: 'GitHub 成就徽章获取攻略指南',
    language: 'Markdown',
    forks: '156',
    issues: '12',
  },
  {
    id: 10,
    name: 'github-readme-activity-graph',
    owner: 'Ashutosh00710',
    fullName: 'Ashutosh00710/github-readme-activity-graph',
    stars: '2.1k',
    starsNum: 2100,
    category: 'visualization',
    description: '动态更新 README 贡献图',
    language: 'TypeScript',
    forks: '312',
    issues: '56',
  },
  {
    id: 11,
    name: 'awesome-github-profile-readme',
    owner: 'abhisheknaiidu',
    fullName: 'abhisheknaiidu/awesome-github-profile-readme',
    stars: '23.5k',
    starsNum: 23500,
    category: 'profile',
    description: '精选 GitHub 个人资料 README 集合',
    language: 'Markdown',
    forks: '4.2k',
    issues: '234',
  },
  {
    id: 12,
    name: 'release-please-action',
    owner: 'googleapis',
    fullName: 'googleapis/release-please-action',
    stars: '3.2k',
    starsNum: 3200,
    category: 'actions',
    description: '自动管理版本发布和 CHANGELOG',
    language: 'TypeScript',
    forks: '523',
    issues: '134',
  },
];

export const platformStats = {
  totalRepos: 70,
  categories: 5,
  totalStars: 110000,
  achievements: 9,
};
