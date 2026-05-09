import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router';
import {
  BarChart3,
  Flame,
  Trophy,
  Eye,
  Layout,
  Rss,
  Star,
  Github,
  Users,
  GitFork,
  Check,
  Copy,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Code,
  TrendingUp,
  Activity,
} from 'lucide-react';
import Layout from '../components/Layout';
import { allRepos } from '../data/repos';

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                 */
/* ------------------------------------------------------------------ */

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

function fadeSlideUp(delay = 0, y = 30) {
  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOutExpo, delay },
    },
  };
}

function staggerContainer(stagger = 0.08, delay = 0) {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Count-up hook                                                     */
/* ------------------------------------------------------------------ */

function useCountUp(target: number, duration = 1.5, enabled = true) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * target));
      if (p < 1) frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, enabled]);

  return count;
}

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const profileRepos = [
  {
    id: 1,
    name: 'github-readme-stats',
    owner: 'anuraghazra',
    fullName: 'anuraghazra/github-readme-stats',
    stars: '79.3k',
    starsNum: 79300,
    category: '统计卡片',
    subcategory: 'stats',
    description: '动态生成 GitHub 统计卡片',
    language: 'JavaScript',
    forks: '24.1k',
    issues: '3.2k',
  },
  {
    id: 8,
    name: 'github-readme-streak-stats',
    owner: 'DenverCoder1',
    fullName: 'DenverCoder1/github-readme-streak-stats',
    stars: '6.8k',
    starsNum: 6800,
    category: '统计卡片',
    subcategory: 'stats',
    description: '在 README 中展示 GitHub 连续贡献记录',
    language: 'PHP',
    forks: '756',
    issues: '89',
  },
  {
    id: 2,
    name: 'github-profile-trophy',
    owner: 'ryo-ma',
    fullName: 'ryo-ma/github-profile-trophy',
    stars: '6.5k',
    starsNum: 6500,
    category: '统计卡片',
    subcategory: 'trophy',
    description: '在 README 中展示 GitHub 奖杯',
    language: 'TypeScript',
    forks: '892',
    issues: '156',
  },
  {
    id: 11,
    name: 'github-profile-readme-generator',
    owner: 'rahuldkjain',
    fullName: 'rahuldkjain/github-profile-readme-generator',
    stars: '24.2k',
    starsNum: 24200,
    category: '生成器',
    subcategory: 'generator',
    description: 'GitHub Profile README Generator — 图形化界面生成个性化资料',
    language: 'JavaScript',
    forks: '4.2k',
    issues: '234',
  },
  {
    id: 7,
    name: 'metrics',
    owner: 'lowlighter',
    fullName: 'lowlighter/metrics',
    stars: '16.6k',
    starsNum: 16600,
    category: '生成器',
    subcategory: 'generator',
    description: '30+ 插件的定制化 GitHub 信息图表生成器',
    language: 'JavaScript',
    forks: '2.8k',
    issues: '342',
  },
  {
    id: 4,
    name: 'github-profile-3d-contrib',
    owner: 'yoshi389111',
    fullName: 'yoshi389111/github-profile-3d-contrib',
    stars: '1.6k',
    starsNum: 1600,
    category: '3D 图',
    subcategory: '3d',
    description: '生成 3D 等距贡献图，支持多种主题',
    language: 'Python',
    forks: '218',
    issues: '45',
  },
];

// Additional repos not in allRepos
const extraProfileRepos = [
  {
    id: 201,
    name: 'github-profile-views-counter',
    owner: 'antonkomarev',
    fullName: 'antonkomarev/github-profile-views-counter',
    stars: '4.9k',
    starsNum: 4900,
    category: '其他',
    subcategory: 'views',
    description: '追踪你的 GitHub 个人资料被查看的次数',
    language: 'PHP',
    forks: '312',
    issues: '45',
  },
  {
    id: 202,
    name: 'github-profile-summary-cards',
    owner: 'vn7n24fzkq',
    fullName: 'vn7n24fzkq/github-profile-summary-cards',
    stars: '3.5k',
    starsNum: 3500,
    category: '统计卡片',
    subcategory: 'summary',
    description: '自动生成 profile 摘要卡片，包含语言统计、提交时间分布等',
    language: 'TypeScript',
    forks: '189',
    issues: '34',
  },
  {
    id: 203,
    name: 'blog-post-workflow',
    owner: 'gautamkrishnar',
    fullName: 'gautamkrishnar/blog-post-workflow',
    stars: '3.4k',
    starsNum: 3400,
    category: '其他',
    subcategory: 'blog',
    description: '自动将最新博客文章同步到 GitHub Profile',
    language: 'TypeScript',
    forks: '234',
    issues: '67',
  },
  {
    id: 204,
    name: 'github-readme-activity-graph',
    owner: 'Ashutosh00710',
    fullName: 'Ashutosh00710/github-readme-activity-graph',
    stars: '2.1k',
    starsNum: 2100,
    category: '统计卡片',
    subcategory: 'activity',
    description: '动态更新 README 贡献图',
    language: 'TypeScript',
    forks: '312',
    issues: '56',
  },
  {
    id: 205,
    name: 'awesome-github-profile-readme',
    owner: 'abhisheknaiidu',
    fullName: 'abhisheknaiidu/awesome-github-profile-readme',
    stars: '23.5k',
    starsNum: 23500,
    category: '生成器',
    subcategory: 'generator',
    description: '精选 GitHub 个人资料 README 集合',
    language: 'Markdown',
    forks: '4.2k',
    issues: '234',
  },
];

const allProfileRepos = [...profileRepos, ...extraProfileRepos];

const filterTabs = ['全部', '统计卡片', '生成器', '3D 图', '其他'];

const trophyData = [
  { icon: Star, color: '#F59E0B', rank: 'SS' },
  { icon: Trophy, color: '#8B5CF6', rank: 'S' },
  { icon: Flame, color: '#F43F5E', rank: 'A' },
  { icon: Activity, color: '#10B981', rank: 'B' },
  { icon: TrendingUp, color: '#06B6D4', rank: 'C' },
  { icon: Code, color: '#F97316', rank: 'A' },
];

/* ------------------------------------------------------------------ */
/*  Section 1 — Hero                                                  */
/* ------------------------------------------------------------------ */

function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: 'min(60vh, 500px)',
        backgroundColor: 'var(--bg-primary)',
        padding: 'clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem)',
        paddingTop: 'calc(64px + clamp(2rem, 5vh, 4rem))',
      }}
    >
      {/* Ambient violet glow orbs */}
      <div
        className="pointer-events-none absolute -right-20 top-20 h-80 w-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="pointer-events-none absolute left-10 top-1/2 h-64 w-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="relative mx-auto flex max-w-[1200px] flex-col items-center gap-12 lg:flex-row">
        {/* Left — text */}
        <div className="flex-1">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
            style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.02em', color: 'var(--text-tertiary)' }}
          >
            <Link to="/" className="transition-colors hover:text-[var(--accent-violet)]">
              首页
            </Link>
            <span>/</span>
            <span>个人资料</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.1 }}
            className="mt-4 font-black"
            style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
            }}
          >
            个人资料工具
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.2 }}
            className="mt-4 max-w-[500px]"
            style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}
          >
            美化你的 GitHub 个人主页 — 统计卡片、3D 贡献图、奖杯展示、README 生成器，一站式工具集合
          </motion.p>

          {/* Stats Row */}
          <motion.div
            className="mt-8 flex gap-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.08, 0.3)}
          >
            <motion.div variants={fadeSlideUp(0, 20)}>
              <div className="text-2xl font-bold" style={{ color: 'var(--accent-violet)' }}>8+</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.02em', color: 'var(--text-tertiary)' }}>
                工具数量
              </div>
            </motion.div>
            <motion.div variants={fadeSlideUp(0, 20)}>
              <div className="text-2xl font-bold" style={{ color: 'var(--accent-amber)' }}>79.3k</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.02em', color: 'var(--text-tertiary)' }}>
                最高 Stars
              </div>
            </motion.div>
            <motion.div variants={fadeSlideUp(0, 20)}>
              <div className="text-2xl font-bold" style={{ color: 'var(--accent-cyan)' }}>6</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.02em', color: 'var(--text-tertiary)' }}>
                子分类
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right — Profile Preview Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.3 }}
          className="hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '320px',
              backgroundColor: 'var(--bg-glass)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '20px',
              padding: '24px',
              backdropFilter: 'blur(24px)',
            }}
          >
            {/* Avatar row */}
            <div className="flex items-center gap-3">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)',
                  boxShadow: '0 0 20px rgba(139,92,246,0.3)',
                }}
              >
                <Github size={28} style={{ color: '#fff' }} />
              </div>
              <div>
                <div className="font-mono text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  @your-username
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                  Full-stack developer & open source enthusiast
                </div>
              </div>
            </div>

            {/* Mini stats */}
            <div className="mt-4 flex gap-4">
              {['1.2k Followers', '500 Following', '5.6k Stars'].map((s) => (
                <div
                  key={s}
                  className="rounded-lg px-2.5 py-1.5 text-center"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    fontSize: '0.6875rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {s}
                </div>
              ))}
            </div>

            {/* Pinned repos mini-grid */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {['awesome-project', 'cool-lib', 'dev-tools', 'my-app'].map((repo) => (
                <div
                  key={repo}
                  className="rounded-lg p-2"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: 'var(--accent-violet)' }}
                    />
                    <span
                      className="font-mono text-xs"
                      style={{ color: 'var(--accent-cyan)' }}
                    >
                      {repo}
                    </span>
                  </div>
                  <div className="mt-1 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    <span className="flex items-center gap-1">
                      <Star size={10} style={{ color: 'var(--accent-amber)' }} /> {Math.floor(Math.random() * 500 + 50)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 2 — Stats Cards Showcase                                  */
/* ------------------------------------------------------------------ */

function CountUp({ target, duration = 1.5 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(target, duration, inView);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

function StatsCardsShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const [codeOpen, setCodeOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const markdownCode = `<!-- GitHub Stats Card -->
![GitHub Stats](https://github-readme-stats.vercel.app/api?username=YOUR_USERNAME&show_icons=true&theme=dark)

<!-- Streak Stats -->
![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=YOUR_USERNAME&theme=dark)

<!-- Profile Trophy -->
![Trophy](https://github-profile-trophy.vercel.app/?username=YOUR_USERNAME&theme=darkhub)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      style={{
        backgroundColor: 'var(--bg-secondary)',
        padding: 'clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <div className="mx-auto max-w-[1200px]" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer()}
        >
          <motion.h2
            variants={fadeSlideUp()}
            className="font-bold"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            统计卡片
          </motion.h2>
          <motion.p
            variants={fadeSlideUp(0.1)}
            className="mt-3"
            style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}
          >
            在 README 中展示你的 GitHub 统计数据
          </motion.p>
        </motion.div>

        {/* Stats Cards Grid */}
        <motion.div
          className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer(0.1, 0.2)}
        >
          {/* Card 1 — GitHub Stats */}
          <motion.div
            variants={fadeSlideUp(0, 40)}
            className="flex flex-col gap-5"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              borderLeft: '3px solid var(--accent-violet)',
              borderRadius: '12px',
              padding: '24px',
            }}
          >
            <div className="flex items-center gap-2">
              <BarChart3 size={20} style={{ color: 'var(--accent-violet)' }} />
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                GitHub Stats
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { label: 'Total Stars', value: 1234, icon: Star },
                { label: 'Total Commits', value: 567, icon: Activity },
                { label: 'Total PRs', value: 89, icon: GitFork },
                { label: 'Issues', value: 45, icon: Code },
                { label: 'Contributed to', value: 12, icon: Users },
              ].map((stat) => {
                const StatIcon = stat.icon;
                return (
                  <div key={stat.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <StatIcon size={14} style={{ color: 'var(--text-tertiary)' }} />
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {stat.label}
                      </span>
                    </div>
                    <span
                      className="font-mono font-semibold"
                      style={{ color: 'var(--accent-violet)' }}
                    >
                      <CountUp target={stat.value} />
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Language bars */}
            <div className="mt-2 flex flex-col gap-2">
              {[
                { lang: 'JavaScript', pct: 45, color: '#F59E0B' },
                { lang: 'Python', pct: 30, color: '#3B82F6' },
                { lang: 'TypeScript', pct: 25, color: '#06B6D4' },
              ].map((lang) => (
                <div key={lang.lang} className="flex items-center gap-2">
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', width: '70px' }}>
                    {lang.lang}
                  </span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${lang.pct}%` } : { width: 0 }}
                      transition={{ duration: 1, ease: easeOutExpo, delay: 0.5 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{lang.pct}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 2 — Streak Stats */}
          <motion.div
            variants={fadeSlideUp(0.1, 40)}
            className="flex flex-col gap-5"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              borderLeft: '3px solid var(--accent-emerald)',
              borderRadius: '12px',
              padding: '24px',
            }}
          >
            <div className="flex items-center gap-2">
              <Flame size={20} style={{ color: 'var(--accent-emerald)' }} />
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                Streak Stats
              </span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Current Streak</div>
              <div className="text-5xl font-black" style={{ color: 'var(--accent-emerald)' }}>
                <CountUp target={42} />
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>days</div>
            </div>

            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="text-xl font-bold" style={{ color: 'var(--accent-amber)' }}>
                  <CountUp target={89} />
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Longest</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  <CountUp target={1847} />
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Total</div>
              </div>
            </div>

            {/* Heatmap strip */}
            <div className="mt-2 flex justify-center gap-1">
              {Array.from({ length: 7 }).map((_, i) => {
                const intensities = ['#10B98122', '#10B98144', '#10B98166', '#10B98188', '#10B981AA', '#10B981CC', '#10B981'];
                return (
                  <div
                    key={i}
                    className="h-5 w-5 rounded-sm"
                    style={{ backgroundColor: intensities[i] }}
                  />
                );
              })}
            </div>
          </motion.div>

          {/* Card 3 — Profile Trophy */}
          <motion.div
            variants={fadeSlideUp(0.2, 40)}
            className="flex flex-col gap-5"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              borderLeft: '3px solid var(--accent-amber)',
              borderRadius: '12px',
              padding: '24px',
            }}
          >
            <div className="flex items-center gap-2">
              <Trophy size={20} style={{ color: 'var(--accent-amber)' }} />
              <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                Profile Trophy
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {trophyData.map((t, i) => {
                const TIcon = t.icon;
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-1.5 rounded-lg py-3"
                    style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                  >
                    <TIcon size={24} style={{ color: t.color }} />
                    <span className="text-xs font-bold" style={{ color: t.color }}>
                      {t.rank}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="text-center" style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
              Total Rank: <strong style={{ color: 'var(--accent-amber)' }}>S+</strong>
            </div>
          </motion.div>
        </motion.div>

        {/* Code Accordion */}
        <motion.div
          variants={fadeSlideUp(0.3, 20)}
          className="mt-8"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <button
            onClick={() => setCodeOpen(!codeOpen)}
            className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <Code size={16} />
            {codeOpen ? '收起 Markdown 代码' : '复制 Markdown 代码'}
            {codeOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {codeOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-3 overflow-hidden rounded-xl"
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>markdown</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 rounded px-2 py-1 text-xs transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-violet)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; }}
                >
                  {copied ? <Check size={12} /> : <Copy size={12} />}
                  {copied ? '已复制' : '复制'}
                </button>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {markdownCode}
              </pre>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 3 — README Generators                                     */
/* ------------------------------------------------------------------ */

function GeneratorCard({
  repo,
  features,
  preview,
  delay = 0,
}: {
  repo: {
    fullName: string;
    stars: string;
    description: string;
  };
  features: string[];
  preview: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      variants={fadeSlideUp(delay, 50)}
      className="flex flex-col gap-6 overflow-hidden lg:flex-row"
      style={{
        backgroundColor: 'var(--bg-glass)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '20px',
        padding: '32px',
      }}
    >
      {/* Left — Info */}
      <div className="flex flex-1 flex-col gap-4">
        <a
          href={`https://github.com/${repo.fullName}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm transition-colors hover:text-[var(--accent-violet)]"
          style={{ color: 'var(--accent-cyan)' }}
        >
          {repo.fullName}
        </a>
        <div className="flex items-center gap-1.5" style={{ fontSize: '0.75rem', color: 'var(--accent-amber)' }}>
          <Star size={13} />
          <span>{repo.stars}</span>
        </div>
        <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          {repo.description}
        </p>
        <ul className="flex flex-col gap-2">
          {features.map((f, i) => (
            <motion.li
              key={f}
              className="flex items-center gap-2"
              style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.06, duration: 0.4, ease: easeOutExpo }}
              viewport={{ once: true }}
            >
              <Check size={14} style={{ color: 'var(--accent-emerald)' }} />
              {f}
            </motion.li>
          ))}
        </ul>
        <a
          href={`https://github.com/${repo.fullName}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex w-fit items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all"
          style={{
            backgroundColor: 'var(--accent-violet)',
            color: '#fff',
          }}
        >
          访问仓库
          <ExternalLink size={14} />
        </a>
      </div>

      {/* Right — Preview */}
      <div
        className="flex flex-1 items-center justify-center rounded-xl"
        style={{
          backgroundColor: 'var(--bg-glass)',
          border: '1px solid var(--border-subtle)',
          minHeight: '200px',
        }}
      >
        {preview}
      </div>
    </motion.div>
  );
}

function ReadmeGenerators() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  return (
    <section
      style={{
        backgroundColor: 'var(--bg-primary)',
        padding: 'clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <div className="mx-auto max-w-[1200px]" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer()}
        >
          <motion.h2
            variants={fadeSlideUp()}
            className="font-bold"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            README 生成器
          </motion.h2>
          <motion.p
            variants={fadeSlideUp(0.1)}
            className="mt-3"
            style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}
          >
            快速生成个性化的 GitHub 个人资料页
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-10 flex flex-col gap-8"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer(0.15, 0.2)}
        >
          <GeneratorCard
            repo={{ fullName: 'rahuldkjain/github-profile-readme-generator', stars: '24.2k', description: 'GitHub Profile README Generator 是星标最多的 profile 生成工具，提供图形化界面选择技能图标、社交链接、GitHub 统计等' }}
            features={['图形化配置界面', '150+ 技能图标', '自动生成 Markdown', '实时预览']}
            preview={
              <div className="flex flex-col gap-3 p-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-24 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }} />
                  <div className="h-4 w-16 rounded" style={{ backgroundColor: 'var(--accent-violet)' }} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {['JavaScript', 'Python', 'React', 'Node.js', 'Go'].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-2.5 py-1 text-xs"
                      style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-2 rounded-lg p-3" style={{ backgroundColor: 'var(--bg-primary)', fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                  &lt;!-- 自动生成的 README 预览 --&gt;
                </div>
              </div>
            }
          />

          <GeneratorCard
            repo={{ fullName: 'lowlighter/metrics', stars: '16.6k', description: 'lowlighter/metrics 提供 30+ 插件的定制化信息图表，包括代码习惯、活动日历、主题等' }}
            features={['30+ 可插拔插件', '高度定制化', '自动化生成', '多种输出格式']}
            delay={0.15}
            preview={
              <div className="flex flex-col gap-2 p-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: 'var(--accent-emerald)' }} />
                  <div className="h-3 w-32 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }} />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: 'var(--accent-cyan)' }} />
                  <div className="h-3 w-24 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }} />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: 'var(--accent-violet)' }} />
                  <div className="h-3 w-28 rounded" style={{ backgroundColor: 'var(--bg-tertiary)' }} />
                </div>
                <div className="mt-2 flex gap-1">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-6 w-4 rounded-sm"
                      style={{
                        backgroundColor: i > 6 ? `rgba(16,185,129,${0.2 + (i - 6) * 0.12})` : 'var(--bg-tertiary)',
                      }}
                    />
                  ))}
                </div>
              </div>
            }
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 4 — 3D Contribution Graph                                 */
/* ------------------------------------------------------------------ */

function ContributionGraph3D() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  // Generate isometric grid
  const gridSize = 12;
  const squares = Array.from({ length: gridSize * gridSize }, (_, i) => {
    const x = i % gridSize;
    const y = Math.floor(i / gridSize);
    const dist = Math.sqrt((x - gridSize / 2) ** 2 + (y - gridSize / 2) ** 2);
    const intensity = Math.max(0, 1 - dist / (gridSize / 2));
    return { x, y, intensity };
  });

  return (
    <section
      className="relative"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        padding: 'clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      {/* Circuit pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(139,92,246,0.3) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative mx-auto max-w-[1000px]" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer()}
        >
          <motion.h2
            variants={fadeSlideUp()}
            className="font-bold"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            3D 贡献图
          </motion.h2>
          <motion.p
            variants={fadeSlideUp(0.1)}
            className="mt-3"
            style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}
          >
            将你的 GitHub 贡献历史转化为炫酷的 3D 可视化
          </motion.p>
        </motion.div>

        {/* 3D Demo */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: easeOutExpo } },
          }}
          className="mx-auto mt-10"
          style={{
            maxWidth: '600px',
            height: '300px',
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px',
            padding: '24px',
            perspective: '800px',
            overflow: 'hidden',
          }}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <div
            style={{
              transform: 'rotateX(55deg) rotateZ(-25deg)',
              transformStyle: 'preserve-3d',
              display: 'grid',
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              gap: '3px',
              width: '100%',
              height: '100%',
            }}
          >
            {squares.map((sq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.008, duration: 0.3 }}
                className="rounded-sm"
                style={{
                  backgroundColor: `rgba(16,185,129,${0.15 + sq.intensity * 0.7})`,
                  aspectRatio: '1',
                  boxShadow: sq.intensity > 0.5 ? `0 0 6px rgba(16,185,129,${sq.intensity * 0.3})` : 'none',
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Tool Info */}
        <motion.div
          className="mx-auto mt-8 flex max-w-[600px] flex-col gap-4 sm:flex-row"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer(0.1, 0.4)}
        >
          {[
            {
              name: 'yoshi389111/github-profile-3d-contrib',
              stars: '1.6k',
              desc: '生成 3D 等距贡献图，支持多种主题',
            },
            {
              name: 'github/gh-skyline',
              stars: '官方',
              desc: 'GitHub 官方 3D 打印工具，可生成实体模型',
            },
          ].map((tool) => (
            <motion.div
              key={tool.name}
              variants={fadeSlideUp(0, 20)}
              className="flex flex-1 items-center gap-3 rounded-xl p-4"
              style={{
                backgroundColor: 'var(--bg-glass)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: 'var(--bg-tertiary)' }}
              >
                <Activity size={18} style={{ color: 'var(--accent-emerald)' }} />
              </div>
              <div className="min-w-0">
                <div className="truncate font-mono text-xs" style={{ color: 'var(--accent-cyan)' }}>
                  {tool.name}
                </div>
                <div className="flex items-center gap-2" style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                  <Star size={11} style={{ color: 'var(--accent-amber)' }} />
                  {tool.stars}
                  <span className="truncate">{tool.desc}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 5 — Trophy & Extras                                       */
/* ------------------------------------------------------------------ */

function TrophyExtras() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  const tools = [
    {
      icon: Trophy,
      color: 'var(--accent-amber)',
      repo: 'ryo-ma/github-profile-trophy',
      stars: '6.5k',
      description: '在 README 中展示 GitHub 奖杯，根据你的活动自动计算等级',
      preview: (
        <div className="grid grid-cols-2 gap-2">
          {trophyData.slice(0, 4).map((t, i) => {
            const TIcon = t.icon;
            return (
              <div key={i} className="flex items-center gap-1.5 rounded p-1.5" style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}>
                <TIcon size={14} style={{ color: t.color }} />
                <span className="text-xs font-bold" style={{ color: t.color }}>{t.rank}</span>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      icon: Eye,
      color: 'var(--accent-cyan)',
      repo: 'antonkomarev/github-profile-views-counter',
      stars: '4.9k',
      description: '追踪你的 GitHub 个人资料被查看的次数',
      preview: (
        <div
          className="rounded-lg px-4 py-2 text-center"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <span className="font-mono text-lg font-bold" style={{ color: 'var(--accent-cyan)' }}>1,234</span>
          <span className="ml-1.5" style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>views</span>
        </div>
      ),
    },
    {
      icon: Layout,
      color: 'var(--accent-violet)',
      repo: 'vn7n24fzkq/github-profile-summary-cards',
      stars: '3.5k',
      description: '自动生成 profile 摘要卡片，包含语言统计、提交时间分布等',
      preview: (
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded p-2 text-center" style={{ backgroundColor: 'rgba(139,92,246,0.1)' }}>
            <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Commits</div>
            <div className="font-mono text-sm font-bold" style={{ color: 'var(--accent-violet)' }}>1,847</div>
          </div>
          <div className="rounded p-2 text-center" style={{ backgroundColor: 'rgba(6,182,212,0.1)' }}>
            <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Repos</div>
            <div className="font-mono text-sm font-bold" style={{ color: 'var(--accent-cyan)' }}>42</div>
          </div>
        </div>
      ),
    },
    {
      icon: Rss,
      color: 'var(--accent-emerald)',
      repo: 'gautamkrishnar/blog-post-workflow',
      stars: '3.4k',
      description: '自动将最新博客文章同步到 GitHub Profile',
      preview: (
        <div className="flex flex-col gap-1.5">
          {['How to Build X', 'Understanding Y', 'Tips for Z'].map((title, i) => (
            <div key={i} className="flex items-center gap-2">
              <Rss size={10} style={{ color: 'var(--accent-emerald)' }} />
              <span className="truncate text-xs" style={{ color: 'var(--text-secondary)' }}>{title}</span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <section
      style={{
        backgroundColor: 'var(--bg-primary)',
        padding: 'clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <div className="mx-auto max-w-[1200px]" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer()}
        >
          <motion.h2
            variants={fadeSlideUp()}
            className="font-bold"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            更多装饰工具
          </motion.h2>
          <motion.p
            variants={fadeSlideUp(0.1)}
            className="mt-3"
            style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}
          >
            奖杯展示、访问计数器和其他美化小部件
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer(0.08, 0.2)}
        >
          {tools.map((tool) => {
            const ToolIcon = tool.icon;
            return (
              <motion.div
                key={tool.repo}
                variants={fadeSlideUp(0, 30)}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="flex flex-col gap-4"
                style={{
                  backgroundColor: 'var(--bg-glass)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '24px',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(139,92,246,0.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${tool.color}15` }}
                  >
                    <ToolIcon size={24} style={{ color: tool.color }} />
                  </div>
                  <div className="flex-1">
                    <a
                      href={`https://github.com/${tool.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm transition-colors hover:text-[var(--accent-violet)]"
                      style={{ color: 'var(--accent-cyan)' }}
                    >
                      {tool.repo}
                    </a>
                    <div className="flex items-center gap-1" style={{ fontSize: '0.75rem', color: 'var(--accent-amber)' }}>
                      <Star size={11} />
                      {tool.stars}
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                  {tool.description}
                </p>
                <div className="mt-auto pt-2">{tool.preview}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 6 — Related Repositories                                  */
/* ------------------------------------------------------------------ */

function RepoCard({ repo }: { repo: (typeof allProfileRepos)[number] }) {
  return (
    <motion.div
      variants={fadeSlideUp(0, 30)}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="flex flex-col gap-3"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '12px',
        padding: '24px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-glow)';
        e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
        e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
      }}
    >
      <a
        href={`https://github.com/${repo.fullName}`}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-sm transition-colors hover:text-[var(--accent-violet)]"
        style={{ color: 'var(--accent-cyan)' }}
      >
        {repo.fullName}
      </a>
      <p className="line-clamp-2 flex-1" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
        {repo.description}
      </p>
      <div className="flex items-center gap-4" style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
        <span className="flex items-center gap-1">
          <Star size={13} style={{ color: 'var(--accent-amber)' }} />
          {repo.stars}
        </span>
        {repo.language && (
          <span className="flex items-center gap-1">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: 'var(--accent-violet)' }} />
            {repo.language}
          </span>
        )}
        {repo.forks && <span>Forks: {repo.forks}</span>}
      </div>
    </motion.div>
  );
}

function RelatedRepositories() {
  const [activeTab, setActiveTab] = useState('全部');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  const filtered =
    activeTab === '全部'
      ? allProfileRepos
      : allProfileRepos.filter((r) => r.category === activeTab);

  return (
    <section
      style={{
        backgroundColor: 'var(--bg-secondary)',
        padding: 'clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <div className="mx-auto max-w-[1200px]" ref={ref}>
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer()}
        >
          <motion.h2
            variants={fadeSlideUp()}
            className="font-bold"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
            }}
          >
            全部仓库
          </motion.h2>

          <motion.div variants={fadeSlideUp(0.1)} className="mt-6 flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="rounded-full px-4 py-2 text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: activeTab === tab ? 'var(--accent-violet)' : 'var(--bg-tertiary)',
                  color: activeTab === tab ? '#fff' : 'var(--text-secondary)',
                }}
              >
                {tab}
              </button>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          key={activeTab}
          className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer(0.06, 0.15)}
        >
          {filtered.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                         */
/* ------------------------------------------------------------------ */

export default function Profile() {
  return (
    <Layout>
      <HeroSection />
      <StatsCardsShowcase />
      <ReadmeGenerators />
      <ContributionGraph3D />
      <TrophyExtras />
      <RelatedRepositories />
    </Layout>
  );
}
