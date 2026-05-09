import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Trophy, User, Zap, Users, BarChart3, Star, GitFork, ChevronDown,
  ArrowRight, Search, ExternalLink, Github, BookOpen
} from 'lucide-react';
import Layout from '../components/Layout';
import { categories, featuredRepos, allRepos, type Repo } from '../data/repos';

const ParticleField = lazy(() => import('../components/ParticleField'));

/* ───────── easing presets ───────── */
const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ───────── Animation variants ───────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo, delay: d } }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOutExpo } },
};

/* ───────── Icon map ───────── */
const iconMap: Record<string, React.ElementType> = {
  Trophy, User, Zap, Users, BarChart3,
};

/* ───────── Category colors ───────── */
const accentMap: Record<string, string> = {
  amber: '#F59E0B',
  violet: '#8B5CF6',
  emerald: '#10B981',
  cyan: '#06B6D4',
  rose: '#F43F5E',
};

/* ───────── Language dot colors ───────── */
const langColors: Record<string, string> = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Python: '#3776AB',
  PHP: '#777BB4',
  Shell: '#89E051',
  Markdown: '#083FA1',
};

/* ───────── CountUp hook ───────── */
function useCountUp(end: number, duration = 1500, start = 0) {
  const [count, setCount] = useState(start);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, end, duration, start]);

  return { count, ref };
}

/* ═══════════════════════════════════
   Section 1: Hero
   ═══════════════════════════════════ */
function HeroSection() {
  return (
    <section
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Particle Field Background */}
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>

      {/* Background image fallback layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/hero-og-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-[900px] flex-col items-center px-6 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.2 }}
          className="mb-6 inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold"
          style={{
            backgroundColor: 'rgba(139,92,246,0.1)',
            border: '1px solid rgba(139,92,246,0.2)',
            color: 'var(--accent-violet)',
          }}
        >
          GitHub 资源大全
        </motion.div>

        {/* Headline Line 1 */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.4 }}
          className="text-5xl font-black leading-[1.05] tracking-[-0.03em] sm:text-6xl md:text-7xl"
          style={{ color: 'var(--text-primary)' }}
        >
          发现 GitHub 的
        </motion.h1>

        {/* Headline Line 2 with gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.6 }}
          className="gradient-hero-text mt-1 text-5xl font-black leading-[1.05] tracking-[-0.03em] sm:text-6xl md:text-7xl"
        >
          无限可能
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.9 }}
          className="mt-6 max-w-[640px] text-base leading-relaxed sm:text-lg"
          style={{ color: 'var(--text-secondary)', letterSpacing: '0.01em' }}
        >
          精心收录 70+ 优质仓库，涵盖成就徽章、个人资料美化、自动化工作流、社区活动与数据可视化工具
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: easeOutExpo, delay: 1.2 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#categories"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
            style={{
              backgroundColor: 'var(--accent-violet)',
              boxShadow: 'var(--glow-violet)',
            }}
          >
            开始探索
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            to="/tutorials"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base font-semibold transition-all duration-300 hover:scale-[1.02]"
            style={{
              backgroundColor: 'transparent',
              border: '1px solid rgba(255,255,255,0.06)',
              color: 'var(--text-secondary)',
            }}
          >
            学习教程
          </Link>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
            style={{
              backgroundColor: 'transparent',
              border: '1px solid rgba(255,255,255,0.06)',
              color: 'var(--text-muted)',
            }}
          >
            仓库列表
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.3 }}
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-6 w-6" style={{ color: 'var(--text-muted)' }} />
          </motion.div>
          <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            向下滚动
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════
   Section 2: Theme Categories
   ═══════════════════════════════════ */
function CategoryCard({ category, index }: { category: typeof categories[0]; index: number }) {
  const Icon = (iconMap[category.icon] || Star) as React.ElementType<{ className?: string; style?: React.CSSProperties; size?: number }>;
  const accentColor = accentMap[category.accent] || category.accentColor;

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.45, 0.05, 0.55, 0.95] as [number, number, number, number] }}
    >
      <Link
        to={category.link}
        className="group flex flex-col gap-4 rounded-[20px] p-8 transition-all duration-300"
        style={{
          backgroundColor: 'var(--bg-glass)',
          border: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(12px)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${accentColor}4D`;
          e.currentTarget.style.boxShadow = `inset 0 0 40px ${category.glowColor}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <Icon
          className="h-12 w-12"
          style={{ color: accentColor }}
        />
        <h3
          className="text-xl font-bold tracking-[-0.01em]"
          style={{ color: 'var(--text-primary)' }}
        >
          {category.name}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {category.description}
        </p>
        <div className="flex items-center justify-between">
          <span
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: `${accentColor}1A`,
              color: accentColor,
            }}
          >
            {category.count}
          </span>
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            style={{ color: 'var(--text-tertiary)' }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

function CategoriesSection() {
  return (
    <section
      id="categories"
      className="relative bg-grid-pattern py-24 sm:py-32"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mb-16 text-center"
        >
          <h2
            className="text-3xl font-bold tracking-[-0.02em] sm:text-4xl"
            style={{ color: 'var(--text-primary)' }}
          >
            五大主题分类
          </h2>
          <p className="mt-4 text-base" style={{ color: 'var(--text-secondary)' }}>
            从成就徽章到数据可视化，全面覆盖 GitHub 生态
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5"
        >
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════
   Section 3: Featured Repositories
   ═══════════════════════════════════ */
const tabLabels: Record<string, string> = {
  all: '全部',
  achievements: '成就徽章',
  profile: '个人资料',
  actions: '自动化',
  community: '社区',
  visualization: '可视化',
};

function RepoCard({ repo }: { repo: Repo }) {
  const catColor = accentMap[categories.find(c => c.id === repo.category)?.accent || 'violet'];

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-3 rounded-xl p-6 transition-colors duration-200"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
        e.currentTarget.style.borderColor = 'var(--border-glow)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <a
          href={`https://github.com/${repo.fullName}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm font-medium transition-colors hover:underline"
          style={{ color: 'var(--accent-cyan)' }}
        >
          {repo.fullName}
        </a>
        <span
          className="flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs"
          style={{
            backgroundColor: 'rgba(245,158,11,0.1)',
            color: 'var(--accent-amber)',
          }}
        >
          <Star className="h-3 w-3" />
          {repo.stars}
        </span>
      </div>

      {/* Description */}
      <p
        className="line-clamp-2 text-sm leading-relaxed"
        style={{ color: 'var(--text-secondary)' }}
      >
        {repo.description}
      </p>

      {/* Bottom row */}
      <div className="mt-auto flex items-center gap-4 pt-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
        {repo.language && (
          <span className="flex items-center gap-1">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: langColors[repo.language] || '#94A3B8' }}
            />
            {repo.language}
          </span>
        )}
        {repo.forks && (
          <span className="flex items-center gap-1">
            <GitFork className="h-3 w-3" />
            {repo.forks}
          </span>
        )}
      </div>
    </motion.div>
  );
}

function FeaturedReposSection() {
  const [activeTab, setActiveTab] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = activeTab === 'all'
    ? featuredRepos
    : featuredRepos.filter(r => r.category === activeTab);

  const displayRepos = allRepos
    .filter(r => activeTab === 'all' || r.category === activeTab)
    .slice(0, visibleCount);

  return (
    <section
      className="py-24 sm:py-32"
      style={{
        background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)',
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h2
              className="text-3xl font-bold tracking-[-0.02em] sm:text-4xl"
              style={{ color: 'var(--text-primary)' }}
            >
              精选仓库
            </h2>
            <p className="mt-2 text-base" style={{ color: 'var(--text-secondary)' }}>
              每个分类中最受欢迎和实用的工具
            </p>
          </div>
          <Link
            to="/search"
            className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-[var(--accent-violet)]"
            style={{ color: 'var(--text-tertiary)' }}
          >
            查看全部
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mb-8 flex gap-0 overflow-x-auto border-b"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          {Object.entries(tabLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setActiveTab(key); setVisibleCount(6); }}
              className="relative whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors duration-200"
              style={{
                color: activeTab === key ? 'var(--text-primary)' : 'var(--text-tertiary)',
              }}
            >
              {label}
              {activeTab === key && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                  style={{ backgroundColor: 'var(--accent-violet)' }}
                  transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] as [number, number, number, number] }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Repository Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={staggerContainer}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {displayRepos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Load More */}
        {visibleCount < allRepos.filter(r => activeTab === 'all' || r.category === activeTab).length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 flex justify-center"
          >
            <button
              onClick={() => setVisibleCount(v => v + 3)}
              className="rounded-full px-6 py-3 text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-violet)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
              }}
            >
              加载更多
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════
   Section 4: Statistics Dashboard
   ═══════════════════════════════════ */
function StatBlock({ value, suffix, label, color, delay = 0 }: {
  value: number; suffix: string; label: string; color: string; delay?: number;
}) {
  const { count, ref } = useCountUp(value, 1500);

  return (
    <motion.div
      variants={fadeUp}
      custom={delay}
      className="relative flex flex-col items-center text-center"
      ref={ref}
    >
      {/* Glow orb */}
      <div
        className="pointer-events-none absolute h-[200px] w-[200px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}14 0%, transparent 70%)`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'glowDrift 15s ease-in-out infinite',
        }}
      />
      <span
        className="relative text-4xl font-black tabular-nums sm:text-5xl"
        style={{ color }}
      >
        {count}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.7 }}
        >
          {suffix}
        </motion.span>
      </span>
      <span className="relative mt-2 text-xs font-medium tracking-[0.02em]" style={{ color: 'var(--text-tertiary)' }}>
        {label}
      </span>
    </motion.div>
  );
}

function StatsSection() {
  return (
    <section
      className="bg-grid-pattern py-24 sm:py-32"
      style={{
        backgroundColor: 'var(--bg-primary)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="mx-auto max-w-[1000px] px-6">
        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.1 }}
          className="mb-16 h-px w-full origin-center"
          style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
        />

        {/* Stats grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-2 gap-10 sm:gap-12 lg:grid-cols-4"
        >
          <StatBlock value={70} suffix="+" label="收录仓库" color="#8B5CF6" delay={0} />
          <StatBlock value={5} suffix="" label="主题分类" color="#06B6D4" delay={0.1} />
          <StatBlock value={110} suffix="k+" label="累计 Stars" color="#10B981" delay={0.2} />
          <StatBlock value={9} suffix="" label="可获取成就徽章" color="#F59E0B" delay={0.3} />
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════
   Section 5: How It Works
   ═══════════════════════════════════ */
const steps = [
  {
    num: '01',
    icon: Search,
    color: '#8B5CF6',
    title: '浏览分类',
    desc: '通过五大主题分类快速找到你感兴趣的 GitHub 资源',
  },
  {
    num: '02',
    icon: Star,
    color: '#06B6D4',
    title: '发现工具',
    desc: '查看仓库详情、Stars 数、使用示例和视觉效果预览',
  },
  {
    num: '03',
    icon: ExternalLink,
    color: '#10B981',
    title: '应用到项目',
    desc: '点击直达 GitHub 仓库，将工具集成到你的项目中',
  },
];

function HowItWorksSection() {
  return (
    <section
      className="py-24 sm:py-32"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="mx-auto max-w-[1000px] px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mb-16 text-center"
        >
          <h2
            className="text-3xl font-bold tracking-[-0.02em] sm:text-4xl"
            style={{ color: 'var(--text-primary)' }}
          >
            如何使用
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="relative grid grid-cols-1 gap-10 sm:grid-cols-3"
        >
          {/* Dotted lines (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-[60px] hidden h-0 border-t-2 border-dashed sm:block"
            style={{ borderColor: 'rgba(255,255,255,0.06)', marginLeft: '15%', marginRight: '15%' }}
          />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                variants={staggerItem}
                className="relative flex flex-col items-center text-center"
              >
                <span
                  className="mb-3 text-5xl font-black"
                  style={{ color: step.color, opacity: 0.4 }}
                >
                  {step.num}
                </span>
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${step.color}1A` }}
                >
                  <Icon className="h-6 w-6" style={{ color: step.color }} />
                </div>
                <h4
                  className="mb-2 text-lg font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {step.title}
                </h4>
                <p
                  className="max-w-[280px] text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════
   Section 6: CTA Banner
   ═══════════════════════════════════ */
function CTASection() {
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24"
      style={{
        background: 'linear-gradient(180deg, var(--bg-primary) 0%, rgba(139,92,246,0.03) 100%)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, transparent 60%)',
          animation: 'glowPulse 6s ease-in-out infinite',
        }}
      />

      <div className="relative mx-auto max-w-[800px] px-6 text-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="text-3xl font-bold tracking-[-0.02em] sm:text-4xl"
          style={{ color: 'var(--text-primary)' }}
        >
          想要贡献更多资源？
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          custom={0.15}
          className="mx-auto mt-4 max-w-[560px] text-base leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          这个网站本身就是一个开源项目。欢迎提交 Pull Request，分享你发现的优质 GitHub 工具！
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          custom={0.3}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="https://github.com/everything-in-github/everything-in-github"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
            style={{
              backgroundColor: 'var(--accent-violet)',
              boxShadow: 'var(--glow-violet)',
            }}
          >
            <Github className="h-4 w-4" />
            在 GitHub 上查看
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
            style={{
              backgroundColor: 'transparent',
              border: '1px solid rgba(255,255,255,0.06)',
              color: 'var(--text-secondary)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-violet)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
          >
            提交资源
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════
   Main Home Page
   ═══════════════════════════════════ */
export default function Home() {
  return (
    <Layout>
      <style>{`
        @keyframes glowDrift {
          0%, 100% { transform: translate(-50%, -50%) translateX(0) translateY(0); }
          25% { transform: translate(-50%, -50%) translateX(15px) translateY(-10px); }
          50% { transform: translate(-50%, -50%) translateX(-10px) translateY(5px); }
          75% { transform: translate(-50%, -50%) translateX(5px) translateY(10px); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.06; }
          50% { opacity: 0.1; }
        }
      `}</style>
      <HeroSection />
      <CategoriesSection />
      <FeaturedReposSection />
      <StatsSection />
      <HowItWorksSection />
      <CTASection />
    </Layout>
  );
}
