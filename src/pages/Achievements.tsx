import { useState, useRef } from 'react';
import { Link } from 'react-router';
import { motion, useInView } from 'framer-motion';
import {
  Trophy,
  Zap,
  Flame,
  Heart,
  Star,
  Users,
  GitPullRequest,
  Lightbulb,
  Code,
  Rocket,
  Snowflake,
  ChevronDown,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
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
/*  Data                                                              */
/* ------------------------------------------------------------------ */

interface BadgeData {
  name: string;
  icon: React.ElementType;
  color: string;
  tier: number | null;
  difficulty: string | null;
  retired: boolean;
  description: string;
  steps?: string[];
  proTip?: string;
}

const badges: BadgeData[] = [
  {
    name: 'Quickdraw',
    icon: Zap,
    color: '#F59E0B',
    tier: null,
    difficulty: 'Easy',
    retired: false,
    description: '在创建 Issue 或 PR 后 5 分钟内关闭它',
    steps: [
      '打开任意 GitHub 仓库的 Issue 页面',
      '创建一个新的 Issue',
      '在 5 分钟内关闭该 Issue',
      '成就自动解锁',
    ],
    proTip: '可以创建一个测试 Issue 然后立即关闭它来快速获得这个徽章',
  },
  {
    name: 'YOLO',
    icon: Flame,
    color: '#F43F5E',
    tier: null,
    difficulty: 'Medium',
    retired: false,
    description: '合并一个未经审查的 Pull Request',
    steps: [
      '创建一个 Pull Request',
      '不使用审查功能直接合并代码',
      '成就自动解锁',
    ],
    proTip: '建议在自己的仓库中使用，避免在团队项目中造成问题',
  },
  {
    name: 'Public Sponsor',
    icon: Heart,
    color: '#EC4899',
    tier: null,
    difficulty: 'Easy',
    retired: false,
    description: '通过 GitHub Sponsors 赞助开源开发者',
    steps: [
      '前往 GitHub Sponsors 页面',
      '选择一位开源开发者',
      '完成赞助流程',
      '成就自动解锁',
    ],
    proTip: '每月最低 5 美元即可解锁此成就',
  },
  {
    name: 'Starstruck',
    icon: Star,
    color: '#F59E0B',
    tier: 4,
    difficulty: 'Hard',
    retired: false,
    description: '拥有一个仓库获得大量 Stars',
  },
  {
    name: 'Pair Extraordinaire',
    icon: Users,
    color: '#06B6D4',
    tier: 3,
    difficulty: 'Hard',
    retired: false,
    description: '与他人合著多个 Pull Request',
  },
  {
    name: 'Pull Shark',
    icon: GitPullRequest,
    color: '#3B82F6',
    tier: 3,
    difficulty: 'Medium',
    retired: false,
    description: '合并多个 Pull Request',
  },
  {
    name: 'Galaxy Brain',
    icon: Lightbulb,
    color: '#8B5CF6',
    tier: 2,
    difficulty: 'Hard',
    retired: false,
    description: '在 Discussion 中获得多个被接受的答案',
  },
  {
    name: 'Heart On Your Sleeve',
    icon: Heart,
    color: '#F43F5E',
    tier: null,
    difficulty: 'Testing',
    retired: false,
    description: '对某个内容做出反应 (目前仍在测试中)',
  },
  {
    name: 'Open Sourcerer',
    icon: Code,
    color: '#10B981',
    tier: null,
    difficulty: 'Testing',
    retired: false,
    description: '在多个公共仓库中提交代码 (目前仍在测试中)',
  },
  {
    name: 'Mars 2020 Contributor',
    icon: Rocket,
    color: '#F97316',
    tier: null,
    difficulty: null,
    retired: true,
    description: '为 Mars 2020 Helicopter Mission 做出贡献 (已退役)',
  },
  {
    name: 'Arctic Code Vault Contributor',
    icon: Snowflake,
    color: '#3B82F6',
    tier: null,
    difficulty: null,
    retired: true,
    description: '为 Arctic Code Vault 项目做出贡献 (已退役)',
  },
];

interface TierInfo {
  name: string;
  requirement: string;
}

interface TierAchievements {
  badge: string;
  icon: React.ElementType;
  color: string;
  tiers: TierInfo[];
}

const tierAchievements: TierAchievements[] = [
  {
    badge: 'Starstruck',
    icon: Star,
    color: '#F59E0B',
    tiers: [
      { name: 'Bronze', requirement: '16 stars' },
      { name: 'Silver', requirement: '128 stars' },
      { name: 'Gold', requirement: '512 stars' },
      { name: 'Diamond', requirement: '4096 stars' },
    ],
  },
  {
    badge: 'Pair Extraordinaire',
    icon: Users,
    color: '#06B6D4',
    tiers: [
      { name: 'Bronze', requirement: '1 次合著' },
      { name: 'Silver', requirement: '10 次合著' },
      { name: 'Gold', requirement: '50 次合著' },
    ],
  },
  {
    badge: 'Pull Shark',
    icon: GitPullRequest,
    color: '#3B82F6',
    tiers: [
      { name: 'Bronze', requirement: '2 个合并' },
      { name: 'Silver', requirement: '16 个合并' },
      { name: 'Gold', requirement: '128 个合并' },
    ],
  },
  {
    badge: 'Galaxy Brain',
    icon: Lightbulb,
    color: '#8B5CF6',
    tiers: [
      { name: 'Bronze', requirement: '2 个答案' },
      { name: 'Silver', requirement: '8 个答案' },
    ],
  },
];

const filterTabs = ['全部', '可获取', '已退役', '有等级'];

const relatedRepos = allRepos.filter(
  (r) => r.category === 'achievements',
);

/* Add additional repos mentioned in design */
const additionalRepos = [
  {
    id: 101,
    name: 'GitHub-Achievements',
    owner: 'drknzz',
    fullName: 'drknzz/GitHub-Achievements',
    stars: '2.9k',
    starsNum: 2900,
    category: 'achievements',
    description: '最热门的完整徽章列表',
    language: 'Markdown',
    forks: '312',
    issues: '28',
  },
  {
    id: 102,
    name: 'github-achievement',
    owner: 'U7P4L-IN',
    fullName: 'U7P4L-IN/github-achievement',
    stars: '40',
    starsNum: 40,
    category: 'achievements',
    description: '带本地图片的完整成就列表',
    language: 'Markdown',
    forks: '12',
    issues: '2',
  },
];

const allRelatedRepos = [...relatedRepos, ...additionalRepos];

/* ------------------------------------------------------------------ */
/*  Count-up hook                                                     */
/* ------------------------------------------------------------------ */

function useCountUp(target: number, duration = 1.5, enabled = true) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useState(() => {
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
  });

  return count;
}

/* ------------------------------------------------------------------ */
/*  Section wrapper with in-view trigger                              */
/* ------------------------------------------------------------------ */

function SectionReveal({
  children,
  className = '',
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={staggerContainer(0.08)}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 1 — Hero                                                  */
/* ------------------------------------------------------------------ */

function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: 'min(50vh, 400px)',
        backgroundColor: 'var(--bg-primary)',
        padding: 'clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem)',
        paddingTop: 'calc(64px + clamp(2rem, 5vh, 4rem))',
      }}
    >
      {/* Ambient amber glow orbs */}
      <div
        className="pointer-events-none absolute right-20 top-20 h-64 w-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-10 left-1/3 h-80 w-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Decorative Trophy */}
      <motion.div
        className="pointer-events-none absolute right-[10%] top-1/2 hidden md:block"
        style={{ translateY: '-50%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Trophy
            size={200}
            style={{ color: 'rgba(245,158,11,0.05)' }}
            strokeWidth={1}
          />
        </motion.div>
      </motion.div>

      <div className="relative mx-auto max-w-[700px]" style={{ paddingLeft: 'clamp(1.5rem, 5vw, 4rem)' }}>
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
          <span>成就徽章</span>
        </motion.div>

        {/* Title */}
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
          GitHub 成就徽章
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.2 }}
          className="mt-4 max-w-[560px]"
          style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}
        >
          解锁全部 9 个可获取成就徽章，查看退役徽章，以及获取每个徽章的详细指南
        </motion.p>

        {/* Stats Row */}
        <motion.div
          className="mt-8 flex gap-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.08, 0.3)}
        >
          <motion.div variants={fadeSlideUp(0, 20)}>
            <div className="text-2xl font-bold" style={{ color: 'var(--accent-amber)' }}>9</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.02em', color: 'var(--text-tertiary)' }}>
              可获取徽章
            </div>
          </motion.div>
          <motion.div variants={fadeSlideUp(0, 20)}>
            <div className="text-2xl font-bold" style={{ color: 'var(--text-muted)' }}>2</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.02em', color: 'var(--text-tertiary)' }}>
              已退役徽章
            </div>
          </motion.div>
          <motion.div variants={fadeSlideUp(0, 20)}>
            <div className="text-2xl font-bold" style={{ color: 'var(--accent-violet)' }}>3</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.02em', color: 'var(--text-tertiary)' }}>
              核心指南仓库
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 2 — Achievement Gallery                                   */
/* ------------------------------------------------------------------ */

function BadgeCard({
  badge,
  index,
  featured,
}: {
  badge: BadgeData;
  index: number;
  featured: boolean;
}) {
  const Icon = badge.icon;

  const difficultyColor =
    badge.difficulty === 'Easy'
      ? 'var(--accent-emerald)'
      : badge.difficulty === 'Medium'
        ? 'var(--accent-amber)'
        : badge.difficulty === 'Hard'
          ? 'var(--accent-rose)'
          : badge.difficulty === 'Testing'
            ? 'var(--text-muted)'
            : 'var(--text-muted)';

  return (
    <motion.div
      variants={fadeSlideUp(0, 40)}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className={`group relative flex flex-col gap-4 overflow-hidden ${featured ? 'md:col-span-2' : ''}`}
      style={{
        backgroundColor: 'var(--bg-tertiary)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '12px',
        padding: '24px',
        transition: 'border-color 0.3s, background-color 0.3s',
        opacity: badge.retired ? 0.6 : 1,
      }}
    >
      <div className="flex items-start gap-4">
        {/* Badge Visual */}
        <motion.div
          className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl"
          style={{
            background: `linear-gradient(135deg, ${badge.color}33 0%, ${badge.color}11 100%)`,
            border: `1px solid ${badge.color}22`,
            boxShadow: `0 0 20px ${badge.color}15`,
          }}
          whileHover={{ scale: 1.1, transition: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] } }
        >
          <Icon size={32} style={{ color: badge.color }} />
        </motion.div>

        <div className="flex flex-col gap-1">
          <h3
            className="text-lg font-bold"
            style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}
          >
            {badge.name}
          </h3>
          {badge.retired && (
            <span
              className="w-fit rounded-full px-2 py-0.5 text-xs font-medium"
              style={{ backgroundColor: 'rgba(100,116,139,0.15)', color: 'var(--text-muted)' }}
            >
              已退役
            </span>
          )}
        </div>
      </div>

      <p
        className="line-clamp-2 flex-1"
        style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}
      >
        {badge.description}
      </p>

      <div className="flex items-center justify-between">
        {badge.tier && (
          <div className="flex items-center gap-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < badge.tier! ? badge.color : 'transparent'}
                style={{ color: i < badge.tier! ? badge.color : 'var(--text-muted)' }}
              />
            ))}
          </div>
        )}
        {!badge.tier && <div />}
        {badge.difficulty && (
          <span
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: `${difficultyColor}15`,
              color: difficultyColor,
            }}
          >
            {badge.difficulty}
          </span>
        )}
      </div>
    </motion.div>
  );
}

function AchievementGallery() {
  const [activeTab, setActiveTab] = useState('全部');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  const filtered =
    activeTab === '全部'
      ? badges
      : activeTab === '可获取'
        ? badges.filter((b) => !b.retired)
        : activeTab === '已退役'
          ? badges.filter((b) => b.retired)
          : badges.filter((b) => b.tier !== null);

  const featuredBadges = ['Starstruck', 'Pull Shark', 'Galaxy Brain'];

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
            成就徽章一览
          </motion.h2>
          <motion.p
            variants={fadeSlideUp(0.1)}
            className="mt-3"
            style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}
          >
            9 个可获取徽章 + 2 个已退役徽章
          </motion.p>

          {/* Filter tabs */}
          <motion.div variants={fadeSlideUp(0.15)} className="mt-6 flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="rounded-full px-4 py-2 text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor:
                    activeTab === tab ? 'var(--accent-violet)' : 'var(--bg-tertiary)',
                  color: activeTab === tab ? '#fff' : 'var(--text-secondary)',
                }}
              >
                {tab}
              </button>
            ))}
          </motion.div>
        </motion.div>

        {/* Badge Grid */}
        <motion.div
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer(0.06, 0.2)}
        >
          {filtered.map((badge, i) => (
            <BadgeCard
              key={badge.name}
              badge={badge}
              index={i}
              featured={featuredBadges.includes(badge.name)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 3 — Tier Progressions                                     */
/* ------------------------------------------------------------------ */

function TierProgressionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  return (
    <section
      style={{
        backgroundColor: 'var(--bg-primary)',
        padding: 'clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <div className="mx-auto max-w-[1000px]" ref={ref}>
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
            等级进阶
          </motion.h2>
          <motion.p
            variants={fadeSlideUp(0.1)}
            className="mt-3"
            style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}
          >
            从铜到钻石，逐步解锁更高级别的成就
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-10 flex flex-col gap-6"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer(0.15, 0.2)}
        >
          {tierAchievements.map((ta) => {
            const Icon = ta.icon;
            return (
              <motion.div
                key={ta.badge}
                variants={fadeSlideUp(0, 40)}
                className="flex flex-col gap-4 overflow-hidden md:flex-row"
                style={{
                  backgroundColor: 'var(--bg-glass)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '20px',
                  padding: '32px',
                }}
              >
                {/* Badge info */}
                <div className="flex flex-shrink-0 items-center gap-4 md:w-48">
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-xl"
                    style={{
                      background: `linear-gradient(135deg, ${ta.color}33 0%, ${ta.color}11 100%)`,
                      boxShadow: `0 0 20px ${ta.color}20`,
                    }}
                  >
                    <Icon size={28} style={{ color: ta.color }} />
                  </div>
                  <div>
                    <div className="font-bold" style={{ color: 'var(--text-primary)' }}>
                      {ta.badge}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                      x{ta.tiers.length} 等级
                    </div>
                  </div>
                </div>

                {/* Tier row */}
                <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
                  {ta.tiers.map((tier, i) => (
                    <motion.div
                      key={tier.name}
                      variants={{
                        hidden: { opacity: 0, scale: 0.9 },
                        visible: {
                          opacity: 1,
                          scale: 1,
                          transition: { delay: i * 0.1, duration: 0.4, ease: easeOutExpo },
                        },
                      }}
                      className="flex flex-col items-center gap-2 rounded-xl p-3 text-center"
                      style={{
                        backgroundColor: `${ta.color}10`,
                        border: `1px solid ${ta.color}25`,
                      }}
                    >
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-lg text-xs font-bold"
                        style={{
                          backgroundColor: `${ta.color}20`,
                          color: ta.color,
                        }}
                      >
                        {tier.name.charAt(0)}
                      </div>
                      <div
                        className="text-xs font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {tier.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                        {tier.requirement}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 4 — Acquisition Guide                                     */
/* ------------------------------------------------------------------ */

function AcquisitionGuide() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  const guideBadges = badges.filter((b) => !b.retired && b.steps);

  return (
    <section
      style={{
        backgroundColor: 'var(--bg-secondary)',
        padding: 'clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <div className="mx-auto max-w-[800px]" ref={ref}>
        <motion.div
          className="text-center"
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
            获取指南
          </motion.h2>
          <motion.p
            variants={fadeSlideUp(0.1)}
            className="mt-3"
            style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}
          >
            一步步教你解锁每个成就徽章
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-10"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer(0.05, 0.15)}
        >
          <AccordionPrimitive.Root type="single" collapsible>
            {guideBadges.map((badge) => {
              const Icon = badge.icon;
              const difficultyColor =
                badge.difficulty === 'Easy'
                  ? 'var(--accent-emerald)'
                  : badge.difficulty === 'Medium'
                    ? 'var(--accent-amber)'
                    : badge.difficulty === 'Hard'
                      ? 'var(--accent-rose)'
                      : 'var(--text-muted)';

              return (
                <motion.div key={badge.name} variants={fadeSlideUp(0, 20)}>
                  <AccordionPrimitive.Item
                    value={badge.name}
                    style={{ borderBottom: '1px solid var(--border-subtle)' }}
                  >
                    <AccordionPrimitive.Header>
                      <AccordionPrimitive.Trigger
                        className="group flex w-full items-center justify-between py-4 text-left transition-colors"
                        style={{
                          color: 'var(--text-primary)',
                          fontSize: '1.125rem',
                          fontWeight: 600,
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={20} style={{ color: badge.color }} />
                          <span>{badge.name}</span>
                          {badge.difficulty && (
                            <span
                              className="rounded-full px-2 py-0.5 text-xs font-medium"
                              style={{
                                backgroundColor: `${difficultyColor}15`,
                                color: difficultyColor,
                              }}
                            >
                              {badge.difficulty}
                            </span>
                          )}
                        </div>
                        <ChevronDown
                          size={18}
                          className="transition-transform duration-200 group-data-[state=open]:rotate-180"
                          style={{ color: 'var(--text-tertiary)' }}
                        />
                      </AccordionPrimitive.Trigger>
                    </AccordionPrimitive.Header>
                    <AccordionPrimitive.Content
                      className="overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
                    >
                      <div className="pb-5" style={{ paddingLeft: '2rem' }}>
                        <p
                          className="mb-4"
                          style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}
                        >
                          {badge.description}
                        </p>
                        {badge.steps && (
                          <ol className="flex list-none flex-col gap-2">
                            {badge.steps.map((step, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <span
                                  className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold"
                                  style={{
                                    backgroundColor: 'var(--accent-amber)',
                                    color: '#0A0A0F',
                                  }}
                                >
                                  {i + 1}
                                </span>
                                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                                  {step}
                                </span>
                              </li>
                            ))}
                          </ol>
                        )}
                        {badge.proTip && (
                          <div
                            className="mt-4 rounded-lg p-3 italic"
                            style={{
                              borderLeft: '3px solid var(--accent-amber)',
                              backgroundColor: 'var(--bg-tertiary)',
                              fontSize: '0.8125rem',
                              color: 'var(--text-secondary)',
                            }}
                          >
                            <span className="font-semibold" style={{ color: 'var(--accent-amber)' }}>
                              Pro 提示:
                            </span>{' '}
                            {badge.proTip}
                          </div>
                        )}
                      </div>
                    </AccordionPrimitive.Content>
                  </AccordionPrimitive.Item>
                </motion.div>
              );
            })}
          </AccordionPrimitive.Root>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 5 — Related Repositories                                  */
/* ------------------------------------------------------------------ */

function RepoCard({ repo }: { repo: (typeof allRepos)[number] | (typeof additionalRepos)[number] }) {
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
        transition: 'border-color 0.2s, background-color 0.2s',
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
      <div className="flex items-start justify-between">
        <a
          href={`https://github.com/${repo.fullName}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm transition-colors hover:text-[var(--accent-violet)]"
          style={{ color: 'var(--accent-cyan)' }}
        >
          {repo.fullName}
        </a>
      </div>
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
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: 'var(--accent-violet)' }}
            />
            {repo.language}
          </span>
        )}
        {repo.forks && (
          <span> Forks: {repo.forks}</span>
        )}
      </div>
    </motion.div>
  );
}

function RelatedRepositories() {
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
            相关资源
          </motion.h2>
          <motion.p
            variants={fadeSlideUp(0.1)}
            className="mt-3"
            style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-secondary)' }}
          >
            获取更多成就徽章的工具和指南
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer(0.08, 0.2)}
        >
          {allRelatedRepos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </motion.div>

        {/* Highlights callout */}
        <motion.div
          variants={fadeSlideUp(0.2, 20)}
          className="mt-8 rounded-xl p-5"
          style={{
            backgroundColor: 'var(--bg-glass)',
            borderLeft: '3px solid var(--accent-amber)',
          }}
        >
          <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            此外还有 <strong style={{ color: 'var(--accent-amber)' }}>Highlights</strong>{' '}
            徽章：Pro、Developer Program Member、Security Bug Bounty Hunter、GitHub Campus Expert
            — 这些需要通过 GitHub 官方程序获得
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                         */
/* ------------------------------------------------------------------ */

export default function Achievements() {
  return (
    <Layout>
      <HeroSection />
      <AchievementGallery />
      <TierProgressionSection />
      <AcquisitionGuide />
      <RelatedRepositories />
    </Layout>
  );
}
