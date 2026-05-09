import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  BarChart3,
  Star,
  GitFork,
  CircleDot,
  Trophy,
  Clock,
  GitCommit,
  LayoutDashboard,
  Calendar,
  Code,
  Palette,
  Share2,
  Music,
  ChevronRight,
  PieChart,
  BarChart2,
} from 'lucide-react';
import { allRepos, type Repo } from '../data/repos';

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */
const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];
const easeSpring = [0.34, 1.56, 0.64, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: custom, ease: easeOutExpo },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: (stagger: number = 0.08) => ({
    transition: { staggerChildren: stagger },
  }),
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

/** Animated counter */
function AnimatedNumber({ target, duration = 1.2 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * target);
      setDisplay(start);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return <span ref={ref}>{display.toLocaleString()}</span>;
}

/** Glow orb background decoration */
function GlowOrb({ color, size, className }: { color: string; size: number; className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full ${className ?? ''}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(60px)',
        opacity: 0.15,
      }}
    />
  );
}

/** Repository card (shared style) */
function RepoCard({ repo }: { repo: Repo }) {
  const catColors: Record<string, string> = {
    achievements: '#F59E0B',
    profile: '#8B5CF6',
    actions: '#10B981',
    community: '#06B6D4',
    visualization: '#F43F5E',
  };
  const accent = catColors[repo.category] ?? '#8B5CF6';

  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group flex flex-col gap-3 rounded-xl p-5 transition-colors"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono text-sm" style={{ color: 'var(--accent-cyan)' }}>
          {repo.fullName}
        </span>
        <span
          className="flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
          style={{ backgroundColor: 'rgba(245,158,11,0.1)', color: 'var(--accent-amber)' }}
        >
          <Star className="h-3 w-3" />
          {repo.stars}
        </span>
      </div>
      <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
        {repo.description}
      </p>
      <div className="mt-auto flex items-center gap-4 text-xs" style={{ color: 'var(--text-tertiary)' }}>
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <CircleDot className="h-3 w-3" style={{ color: accent }} />
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

/* ------------------------------------------------------------------ */
/*  Hero mini bar chart (CSS animated)                                 */
/* ------------------------------------------------------------------ */
function MiniBarChart() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const bars = [45, 72, 55, 90, 65, 80, 38];
  const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.3, ease: easeOutExpo }}
      className="hidden rounded-xl p-5 md:block"
      style={{
        backgroundColor: 'var(--bg-glass)',
        border: '1px solid rgba(255,255,255,0.06)',
        width: 300,
        height: 180,
      }}
    >
      <div className="flex h-full flex-col justify-end">
        <div className="flex items-end justify-between gap-2" style={{ height: 120 }}>
          {bars.map((h, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <motion.div
                initial={{ height: 0 }}
                animate={isInView ? { height: h } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.5 + i * 0.08,
                  ease: easeOutExpo,
                }}
                className="w-full rounded-t"
                style={{
                  background: `linear-gradient(to top, var(--accent-rose), var(--accent-violet))`,
                  maxWidth: 28,
                  opacity: 0.85,
                }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between">
          {labels.map((l) => (
            <span key={l} className="flex-1 text-center text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
              {l}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 2: Contribution Analytics                                  */
/* ------------------------------------------------------------------ */
function ContributionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' });

  const streakFeatures = ['支持多种主题', '自定义日期范围', '与 README 集成'];
  const contrib3DFeatures = ['多种配色主题', '等距 3D 效果', '支持夜间模式', '自动化生成'];

  return (
    <section
      className="w-full"
      style={{ backgroundColor: 'var(--bg-secondary)', padding: 'clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem)' }}
    >
      <div className="mx-auto max-w-[1200px]" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold md:text-4xl" style={{ color: 'var(--text-primary)' }}>
            贡献分析
          </h2>
          <p className="mt-2 text-base" style={{ color: 'var(--text-secondary)' }}>
            追踪和可视化你的代码贡献活动
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Card 1: Streak Stats */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: easeOutExpo }}
            className="rounded-xl p-6 md:p-8"
            style={{
              backgroundColor: 'var(--bg-glass)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderLeft: '3px solid var(--accent-emerald)',
            }}
          >
            <div className="mb-4">
              <span className="font-mono text-sm" style={{ color: 'var(--accent-cyan)' }}>
                DenverCoder1/github-readme-streak-stats
              </span>
              <span className="ml-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                (6.8k Stars)
              </span>
              <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                在 README 中展示你的 GitHub 贡献连续天数
              </p>
            </div>

            {/* Preview */}
            <div
              className="mb-4 rounded-lg p-4"
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="flex items-center justify-around">
                <div className="text-center">
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    Current Streak
                  </div>
                  <div className="text-3xl font-bold" style={{ color: 'var(--accent-emerald)' }}>
                    <AnimatedNumber target={42} />
                  </div>
                  <div className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                    days
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    Longest Streak
                  </div>
                  <div className="text-3xl font-bold" style={{ color: 'var(--accent-amber)' }}>
                    <AnimatedNumber target={89} />
                  </div>
                  <div className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                    days
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    Total Contributions
                  </div>
                  <div className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                    <AnimatedNumber target={1847} />
                  </div>
                </div>
              </div>
              {/* Mini heatmap */}
              <div className="mt-3 flex justify-center gap-1">
                {Array.from({ length: 7 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8 + i * 0.03 }}
                    className="h-3 w-3 rounded-sm"
                    style={{
                      backgroundColor:
                        i % 3 === 0
                          ? 'var(--accent-emerald)'
                          : i % 3 === 1
                            ? 'rgba(16,185,129,0.5)'
                            : 'rgba(16,185,129,0.2)',
                    }}
                  />
                ))}
              </div>
            </div>

            <ul className="flex flex-wrap gap-2">
              {streakFeatures.map((f) => (
                <li
                  key={f}
                  className="rounded-full px-3 py-1 text-xs"
                  style={{ backgroundColor: 'rgba(16,185,129,0.1)', color: 'var(--accent-emerald)' }}
                >
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Card 2: 3D Contribution */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: easeOutExpo }}
            className="rounded-xl p-6 md:p-8"
            style={{
              backgroundColor: 'var(--bg-glass)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderLeft: '3px solid var(--accent-violet)',
            }}
          >
            <div className="mb-4">
              <span className="font-mono text-sm" style={{ color: 'var(--accent-cyan)' }}>
                yoshi389111/github-profile-3d-contrib
              </span>
              <span className="ml-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                (1.6k Stars)
              </span>
              <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                生成 3D 等距贡献图，支持多种配色主题
              </p>
            </div>

            {/* 3D grid preview */}
            <div
              className="mb-4 flex items-center justify-center rounded-lg p-4"
              style={{
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div
                className="grid grid-cols-6 gap-1"
                style={{ transform: 'rotateX(30deg) rotateZ(-10deg)', perspective: 400 }}
              >
                {Array.from({ length: 24 }).map((_, i) => {
                  const intensity = (i * 37 + 13) % 100;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.6 + i * 0.02 }}
                      className="h-5 w-5 rounded-sm"
                      style={{
                        backgroundColor:
                          intensity > 70
                            ? 'var(--accent-violet)'
                            : intensity > 40
                              ? 'rgba(139,92,246,0.6)'
                              : 'rgba(139,92,246,0.25)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <ul className="flex flex-wrap gap-2">
              {contrib3DFeatures.map((f) => (
                <li
                  key={f}
                  className="rounded-full px-3 py-1 text-xs"
                  style={{ backgroundColor: 'rgba(139,92,246,0.1)', color: 'var(--accent-violet)' }}
                >
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 3: Language Statistics                                     */
/* ------------------------------------------------------------------ */
function LanguageSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' });

  const segments = [
    { label: 'JavaScript', pct: 45, color: '#F59E0B' },
    { label: 'Python', pct: 30, color: '#3B82F6' },
    { label: 'TypeScript', pct: 25, color: '#06B6D4' },
  ];

  const tools = [
    {
      icon: PieChart,
      color: 'var(--accent-rose)',
      repo: 'anuraghazra/github-readme-stats',
      stars: '79.3k',
      desc: 'Top Languages 卡片 — 自动统计并展示你最常用的编程语言',
    },
    {
      icon: BarChart2,
      color: 'var(--accent-violet)',
      repo: 'github-profile-summary-cards',
      stars: '3.5k',
      desc: '语言分布饼图 + 提交时间热力图',
    },
  ];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)', padding: 'clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem)' }}
    >
      <GlowOrb color="rgba(244,63,94,0.3)" size={400} className="-left-40 top-0" />
      <div className="relative mx-auto max-w-[1000px]" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mb-10"
        >
          <h2 className="text-3xl font-bold md:text-4xl" style={{ color: 'var(--text-primary)' }}>
            语言统计
          </h2>
          <p className="mt-2 text-base" style={{ color: 'var(--text-secondary)' }}>
            分析你在 GitHub 上使用的编程语言分布
          </p>
        </motion.div>

        {/* Language stacked bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: easeOutExpo }}
          className="mb-8 rounded-xl p-6 md:p-8"
          style={{
            backgroundColor: 'var(--bg-glass)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="h-10 w-full overflow-hidden rounded-lg">
            <div className="flex h-full w-full">
              {segments.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${s.pct}%` } : {}}
                  transition={{
                    duration: 1,
                    delay: 0.3 + i * 0.2,
                    ease: easeOutExpo,
                  }}
                  className="flex items-center justify-center text-xs font-semibold"
                  style={{ backgroundColor: s.color, color: '#fff' }}
                >
                  {s.pct}%
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            {segments.map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tool list */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {tools.map((t) => (
            <motion.div
              key={t.repo}
              variants={staggerItem}
              className="flex items-start gap-4 rounded-xl p-5"
              style={{
                backgroundColor: 'var(--bg-glass)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <t.icon className="mt-0.5 h-8 w-8 shrink-0" style={{ color: t.color }} />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm" style={{ color: 'var(--accent-cyan)' }}>
                    {t.repo}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    ({t.stars} Stars)
                  </span>
                </div>
                <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {t.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 4: Activity Tracking                                       */
/* ------------------------------------------------------------------ */
function ActivitySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' });

  const cards = [
    {
      icon: Star,
      iconColor: 'var(--accent-amber)',
      repo: 'star-history',
      stars: '9k',
      desc: '可视化任何 GitHub 仓库的 Stars 增长历史，生成趋势图表',
      features: '任意仓库查询、时间范围筛选、嵌入图表',
      preview: 'line',
    },
    {
      icon: Clock,
      iconColor: 'var(--accent-cyan)',
      repo: 'waka-readme-stats',
      stars: '3.9k',
      desc: '通过 WakaTime 集成，展示你的编码时间统计',
      features: '编码时间追踪、语言使用时长、编辑器统计',
      preview: 'bar',
    },
    {
      icon: GitCommit,
      iconColor: 'var(--accent-violet)',
      repo: 'commit-pattern',
      name: '提交模式可视化',
      stars: '',
      desc: '分析你的提交习惯 — 最活跃时段、提交频率、代码节奏',
      features: '时段分析、频率统计、习惯追踪',
      preview: 'heatmap',
    },
  ];

  return (
    <section
      className="w-full"
      style={{ backgroundColor: 'var(--bg-secondary)', padding: 'clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem)' }}
    >
      <div className="mx-auto max-w-[1200px]" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold md:text-4xl" style={{ color: 'var(--text-primary)' }}>
            活动追踪
          </h2>
          <p className="mt-2 text-base" style={{ color: 'var(--text-secondary)' }}>
            追踪 Stars 增长、Follower 趋势和提交模式
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.repo}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: easeOutExpo }}
              className="rounded-xl p-6"
              style={{
                backgroundColor: 'var(--bg-glass)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <card.icon className="mb-3 h-10 w-10" style={{ color: card.iconColor }} />
              <div className="mb-2 flex items-center gap-2">
                <span className="font-mono text-sm" style={{ color: 'var(--accent-cyan)' }}>
                  {card.name ?? card.repo}
                </span>
                {card.stars && (
                  <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                    ({card.stars} Stars)
                  </span>
                )}
              </div>
              <p className="mb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {card.desc}
              </p>

              {/* Mini preview */}
              <div
                className="mb-4 rounded-lg p-3"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  height: 100,
                }}
              >
                {card.preview === 'line' && <MiniLineChart active={isInView} delay={i * 0.15} />}
                {card.preview === 'bar' && <MiniBarChartPreview active={isInView} delay={i * 0.15} />}
                {card.preview === 'heatmap' && <MiniHeatmap active={isInView} delay={i * 0.15} />}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {card.features.split('、').map((f) => (
                  <span
                    key={f}
                    className="rounded-full px-2 py-0.5 text-[10px]"
                    style={{
                      backgroundColor: `${card.iconColor}15`,
                      color: card.iconColor,
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MiniLineChart({ active, delay }: { active: boolean; delay: number }) {
  return (
    <svg viewBox="0 0 200 60" className="h-full w-full">
      <motion.path
        d="M 0 50 L 40 40 L 80 35 L 120 25 L 160 15 L 200 5"
        fill="none"
        stroke="var(--accent-amber)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={active ? { pathLength: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 + delay, ease: easeOutExpo }}
      />
      {[
        [0, 50],
        [40, 40],
        [80, 35],
        [120, 25],
        [160, 15],
        [200, 5],
      ].map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="3"
          fill="var(--accent-amber)"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 + delay + i * 0.05 }}
        />
      ))}
    </svg>
  );
}

function MiniBarChartPreview({ active, delay }: { active: boolean; delay: number }) {
  const heights = [30, 50, 35, 60, 45, 55, 25];
  return (
    <div className="flex h-full items-end justify-around">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={active ? { height: `${h}%` } : {}}
          transition={{
            duration: 0.4,
            delay: 0.5 + delay + i * 0.06,
            ease: easeOutExpo,
          }}
          className="w-3 rounded-t"
          style={{ backgroundColor: 'var(--accent-cyan)', opacity: 0.8 }}
        />
      ))}
    </div>
  );
}

function MiniHeatmap({ active, delay }: { active: boolean; delay: number }) {
  return (
    <div className="grid h-full grid-cols-5 place-content-center gap-1">
      {Array.from({ length: 15 }).map((_, i) => {
        const intensity = (i * 53 + 17) % 100;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 + delay + i * 0.03 }}
            className="h-3.5 w-3.5 rounded-sm"
            style={{
              backgroundColor:
                intensity > 70
                  ? 'var(--accent-violet)'
                  : intensity > 40
                    ? 'rgba(139,92,246,0.5)'
                    : 'rgba(139,92,246,0.2)',
            }}
          />
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 5: Dashboards                                              */
/* ------------------------------------------------------------------ */
function DashboardSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' });

  const plugins = [
    { icon: Calendar, name: '活动日历', color: 'var(--accent-rose)' },
    { icon: Code, name: '代码习惯', color: 'var(--accent-cyan)' },
    { icon: Trophy, name: '成就统计', color: 'var(--accent-amber)' },
    { icon: Palette, name: '主题分析', color: 'var(--accent-violet)' },
    { icon: Share2, name: '社交网络', color: 'var(--accent-emerald)' },
    { icon: Music, name: '音乐集成', color: 'var(--accent-rose)' },
  ];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)', padding: 'clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem)' }}
    >
      <GlowOrb color="rgba(139,92,246,0.3)" size={500} className="right-0 top-0" />
      <div className="relative mx-auto max-w-[1000px]" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mb-10"
        >
          <h2 className="text-3xl font-bold md:text-4xl" style={{ color: 'var(--text-primary)' }}>
            综合仪表盘
          </h2>
          <p className="mt-2 text-base" style={{ color: 'var(--text-secondary)' }}>
            一站式 GitHub 数据分析平台
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: easeOutExpo }}
          className="rounded-2xl p-6 md:p-10"
          style={{
            backgroundColor: 'var(--bg-glass)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="mb-6 flex items-start gap-4">
            <LayoutDashboard
              className="h-12 w-12 shrink-0"
              style={{
                color: 'var(--accent-rose)',
                filter: 'drop-shadow(0 0 12px rgba(244,63,94,0.3))',
              }}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm" style={{ color: 'var(--accent-cyan)' }}>
                  lowlighter/metrics
                </span>
                <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  (16.6k Stars)
                </span>
              </div>
              <p className="mt-1 max-w-xl text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                高度定制化的 GitHub 信息图表生成工具，30+ 插件覆盖代码习惯、活动日历、主题、成就等多种数据维度
              </p>
            </div>
          </div>

          {/* Plugin grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mb-6 grid grid-cols-3 gap-4 sm:grid-cols-6"
          >
            {plugins.map((p) => (
              <motion.div
                key={p.name}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.4, ease: easeSpring },
                  },
                }}
                className="flex flex-col items-center gap-2 rounded-xl p-4"
                style={{ backgroundColor: 'var(--bg-tertiary)' }}
              >
                <p.icon className="h-6 w-6" style={{ color: p.color }} />
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {p.name}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <a
            href="https://github.com/lowlighter/metrics/blob/master/source/plugins/README.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm transition-colors hover:opacity-80"
            style={{ color: 'var(--accent-rose)' }}
          >
            查看所有插件
            <ChevronRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Section 6: Related Repositories                                    */
/* ------------------------------------------------------------------ */
function ReposSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [activeTab, setActiveTab] = useState('全部');

  const tabs = ['全部', '贡献分析', '语言统计', '活动追踪', '仪表盘'];

  const tabCategoryMap: Record<string, string[]> = {
    全部: ['visualization', 'profile'],
    贡献分析: ['visualization'],
    语言统计: ['profile', 'visualization'],
    活动追踪: ['visualization', 'profile'],
    仪表盘: ['profile', 'visualization'],
  };

  // Build a comprehensive list of visualization-related repos
  const vizRepos: Repo[] = [
    ...allRepos.filter((r) => r.category === 'visualization' || r.category === 'profile'),
    {
      id: 101,
      name: 'star-history',
      owner: 'star-history',
      fullName: 'star-history/star-history',
      stars: '9k',
      starsNum: 9000,
      category: 'visualization',
      description: '可视化任何 GitHub 仓库的 Stars 增长历史',
      language: 'TypeScript',
    },
    {
      id: 102,
      name: 'waka-readme-stats',
      owner: 'anmol098',
      fullName: 'anmol098/waka-readme-stats',
      stars: '3.9k',
      starsNum: 3900,
      category: 'visualization',
      description: '通过 WakaTime 集成展示编码时间统计',
      language: 'Python',
    },
    {
      id: 103,
      name: 'github-profile-summary-cards',
      owner: 'vn7n24fzkq',
      fullName: 'vn7n24fzkq/github-profile-summary-cards',
      stars: '3.5k',
      starsNum: 3500,
      category: 'visualization',
      description: '语言分布饼图 + 提交时间热力图',
      language: 'TypeScript',
    },
  ];

  // Remove duplicates by fullName
  const uniqueRepos = vizRepos.filter(
    (repo, index, self) => index === self.findIndex((r) => r.fullName === repo.fullName)
  );

  const filteredRepos =
    activeTab === '全部'
      ? uniqueRepos
      : uniqueRepos.filter((r) => tabCategoryMap[activeTab]?.includes(r.category));

  return (
    <section
      className="w-full"
      style={{ backgroundColor: 'var(--bg-secondary)', padding: 'clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem)' }}
    >
      <div className="mx-auto max-w-[1200px]" ref={ref}>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="text-3xl font-bold md:text-4xl"
            style={{ color: 'var(--text-primary)' }}
          >
            全部仓库
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className="rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200"
                style={{
                  backgroundColor: activeTab === t ? 'rgba(139,92,246,0.15)' : 'var(--bg-glass)',
                  color: activeTab === t ? 'var(--text-primary)' : 'var(--text-secondary)',
                  border: `1px solid ${activeTab === t ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.06)'}`,
                }}
              >
                {t}
              </button>
            ))}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredRepos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */
export default function Visualization() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-[100dvh] w-full" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* ===== Section 1: Hero ===== */}
      <section
        className="relative flex w-full items-center overflow-hidden"
        style={{
          minHeight: '55vh',
          maxHeight: 450,
          padding: 'clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem)',
        }}
      >
        <GlowOrb color="rgba(244,63,94,0.3)" size={350} className="left-10 top-0" />
        <GlowOrb color="rgba(139,92,246,0.25)" size={300} className="right-20 bottom-0" />

        <div
          ref={heroRef}
          className="relative mx-auto flex w-full max-w-[1200px] items-center justify-between"
        >
          <div className="flex-1">
            <motion.span
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3 }}
              className="mb-4 block text-xs tracking-wide"
              style={{ color: 'var(--text-tertiary)' }}
            >
              首页 / 数据可视化
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1, ease: easeOutExpo }}
              className="font-black"
              style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
              }}
            >
              数据可视化
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2, ease: easeOutExpo }}
              className="mt-4 max-w-[500px] text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              将你的 GitHub 数据转化为美观的图表和可视化 — 贡献分析、语言统计、活动追踪、综合仪表盘
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3, ease: easeOutExpo }}
              className="mt-8 flex flex-wrap gap-8"
            >
              <div>
                <div className="text-2xl font-bold" style={{ color: 'var(--accent-rose)' }}>
                  <AnimatedNumber target={6} />+
                </div>
                <div className="mt-1 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  可视化工具
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: 'var(--accent-amber)' }}>
                  <AnimatedNumber target={79300} />
                </div>
                <div className="mt-1 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  最高 Stars
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: 'var(--accent-violet)' }}>
                  <AnimatedNumber target={4} />
                </div>
                <div className="mt-1 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  子分类
                </div>
              </div>
            </motion.div>
          </div>

          <MiniBarChart />
        </div>
      </section>

      {/* ===== Sections 2–6 ===== */}
      <ContributionSection />
      <LanguageSection />
      <ActivitySection />
      <DashboardSection />
      <ReposSection />
    </div>
  );
}
