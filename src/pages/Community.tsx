import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import Layout from '../components/Layout';
import {
  Leaf, BookOpen, Star, BarChart3, CheckCircle2, TrendingUp,
  Globe, Heart, GraduationCap, List, ArrowRight, ExternalLink
} from 'lucide-react';

/* ─── Animation presets ─── */
const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = (delay = 0, y = 40) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: easeOutExpo, delay },
});

const staggerContainer = (stagger = 0.1, delay = 0) => ({
  initial: 'hidden',
  whileInView: 'visible' as const,
  viewport: { once: true, amount: 0.15 },
  variants: {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  },
});

const staggerItem = (y = 40) => ({
  variants: {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } },
  },
});

/* ─── Count-up hook ─── */
function useCountUp(end: number, duration = 1500, startOnView = true) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (startOnView && ref.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasStarted.current) {
            hasStarted.current = true;
            const startTime = performance.now();
            const animate = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(eased * end));
              if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [end, duration, startOnView]);

  return { count, ref };
}

/* ─── Glow Orb ─── */
function GlowOrb({ color, className }: { color: string; className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-[100px] ${className || ''}`}
      style={{
        background: color,
        opacity: 0.08,
        width: 400,
        height: 400,
      }}
    />
  );
}

/* ─── Mock trending data ─── */
const mockTrending = [
  { rank: 1, repo: 'facebook/react', lang: 'TypeScript', stars: '+245' },
  { rank: 2, repo: 'vercel/next.js', lang: 'TypeScript', stars: '+198' },
  { rank: 3, repo: 'rust-lang/rust', lang: 'Rust', stars: '+156' },
  { rank: 4, repo: 'oven-sh/bun', lang: 'Zig', stars: '+132' },
  { rank: 5, repo: 'tailwindlabs/tailwindcss', lang: 'TypeScript', stars: '+121' },
];

const hacktoberfestRepos = [
  { name: 'OtacilioN/awesome-hacktoberfest', stars: 864 },
  { name: 'avinash201199/Hacktoberfest2025', stars: 342 },
  { name: 'avinash201199/Awesome-GitHub-Repositories', stars: 513 },
];

const studentBenefits = [
  '免费 .me 域名',
  'Heroku、AWS、Azure 额度',
  'JetBrains 全家桶',
  'GitHub Pro 会员',
  'Figma、Canva 专业版',
];

/* ═══════════════════════════════════
   PAGE: Community
   ═══════════════════════════════════ */
export default function Community() {
  const sponsorsCount = useCountUp(130, 1500);
  const studentCount = useCountUp(45, 1500);

  return (
    <Layout>
      {/* ═══════ SECTION 1: HERO ═══════ */}
      <section
        className="relative flex min-h-[420px] items-center overflow-hidden px-6 pt-16"
        style={{
          minHeight: '50vh',
          maxHeight: 420,
          padding: 'clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem)',
          backgroundColor: 'var(--bg-primary)',
        }}
      >
        <GlowOrb color="#06B6D4" className="-left-20 top-0" />
        <GlowOrb color="#F59E0B" className="right-0 bottom-0" />

        <div className="relative z-10 mx-auto w-full max-w-[1200px]">
          <motion.p
            className="mb-4 text-xs font-medium tracking-wider"
            style={{ color: 'var(--text-tertiary)' }}
            {...fadeUp(0)}
          >
            <Link to="/" className="transition-colors hover:text-[var(--accent-violet)]">首页</Link>
            {' / '}
            <span>社区活动</span>
          </motion.p>

          <motion.h1
            className="mb-4 font-black tracking-tight"
            style={{
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
            }}
            {...fadeUp(0.1, 30)}
          >
            社区与活动
          </motion.h1>

          <motion.p
            className="mb-8 max-w-[560px] text-base leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
            {...fadeUp(0.2, 30)}
          >
            加入全球最大的开发者社区 — 参与开源活动、追踪热门项目、获取教育资源、支持开源生态
          </motion.p>

          <motion.div className="flex gap-10" {...fadeUp(0.3, 20)}>
            {[
              { num: '5', label: '子分类', color: 'var(--accent-cyan)' },
              { num: '$130M+', label: 'GitHub Sponsors 投资', color: 'var(--accent-emerald)' },
              { num: '351', label: 'Hacktoberfest 贡献者', color: 'var(--accent-amber)' },
            ].map(s => (
              <div key={s.label} className="flex flex-col">
                <span className="text-2xl font-bold tabular-nums" style={{ color: s.color }}>{s.num}</span>
                <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ SECTION 2: HACKTOBERFEST ═══════ */}
      <section
        className="relative overflow-hidden px-6"
        style={{
          padding: 'clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem)',
          background: 'linear-gradient(180deg, var(--bg-secondary) 0%, rgba(245,158,11,0.03) 100%)',
        }}
      >
        <div className="mx-auto max-w-[1200px]">
          {/* Section Header */}
          <motion.div className="mb-12 flex items-center gap-3" {...fadeUp(0, 30)}>
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{
                backgroundColor: 'rgba(245,158,11,0.15)',
                boxShadow: '0 0 30px rgba(245,158,11,0.25)',
              }}
            >
              <Leaf className="h-6 w-6" style={{ color: 'var(--accent-amber)' }} />
            </div>
            <div>
              <h2
                className="font-bold"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                }}
              >
                Hacktoberfest
              </h2>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                每年十月全球最大的开源贡献活动
              </p>
            </div>
          </motion.div>

          {/* 3 Info Cards */}
          <motion.div
            className="mb-12 grid gap-6 md:grid-cols-3"
            {...staggerContainer(0.12, 0)}
          >
            {/* Card 1: How to participate */}
            <motion.div
              {...staggerItem(40)}
              className="rounded-xl p-6 transition-all duration-300"
              style={{
                backgroundColor: 'var(--bg-glass)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              whileHover={{ y: -4, borderColor: 'rgba(245,158,11,0.2)' }}
            >
              <BookOpen className="mb-3 h-8 w-8" style={{ color: 'var(--accent-amber)' }} />
              <h3 className="mb-2 text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                如何参与
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                注册 Hacktoberfest → 寻找标有 hacktoberfest 的 Issue → 提交 PR → 完成 4 个 PR 获得奖励
              </p>
            </motion.div>

            {/* Card 2: Recommended repos */}
            <motion.div
              {...staggerItem(40)}
              className="rounded-xl p-6 transition-all duration-300"
              style={{
                backgroundColor: 'var(--bg-glass)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              whileHover={{ y: -4, borderColor: 'rgba(245,158,11,0.2)' }}
            >
              <Star className="mb-3 h-8 w-8" style={{ color: 'var(--accent-amber)' }} />
              <h3 className="mb-2 text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                推荐仓库
              </h3>
              <div className="flex flex-col gap-2">
                {hacktoberfestRepos.map(r => (
                  <a
                    key={r.name}
                    href={`https://github.com/${r.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between font-mono text-xs transition-colors hover:text-[var(--accent-violet)]"
                    style={{ color: 'var(--accent-cyan)' }}
                  >
                    <span>{r.name}</span>
                    <span className="flex items-center gap-1 shrink-0" style={{ color: 'var(--accent-amber)' }}>
                      <Star className="h-3 w-3" />
                      {r.stars}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Card 3: Stats */}
            <motion.div
              {...staggerItem(40)}
              className="rounded-xl p-6 transition-all duration-300"
              style={{
                backgroundColor: 'var(--bg-glass)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              whileHover={{ y: -4, borderColor: 'rgba(245,158,11,0.2)' }}
            >
              <BarChart3 className="mb-3 h-8 w-8" style={{ color: 'var(--accent-amber)' }} />
              <h3 className="mb-4 text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                活动数据
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { num: '351', label: '活跃贡献者' },
                  { num: '10万+', label: '年度 PR' },
                  { num: '150+', label: '参与国家' },
                ].map(s => (
                  <div key={s.label} className="flex flex-col">
                    <span className="text-xl font-bold tabular-nums" style={{ color: 'var(--accent-amber)' }}>
                      {s.num}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* PR Progress Visual */}
          <motion.div
            className="mx-auto flex max-w-[300px] flex-col items-center gap-4"
            {...fadeUp(0.4, 20)}
          >
            <div className="flex w-full items-center justify-between">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="flex items-center">
                  <motion.div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: i < 2 ? 'var(--accent-emerald)' : 'var(--bg-tertiary)',
                      border: `1px solid ${i < 2 ? 'var(--accent-emerald)' : 'rgba(255,255,255,0.06)'}`,
                    }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.8 + i * 0.2 }}
                  >
                    {i < 2 ? (
                      <CheckCircle2 className="h-5 w-5" style={{ color: '#fff' }} />
                    ) : (
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{i + 1}</span>
                    )}
                  </motion.div>
                  {i < 3 && (
                    <div
                      className="mx-1 h-[2px] w-8 sm:w-12"
                      style={{
                        backgroundColor: i < 1 ? 'var(--accent-emerald)' : 'rgba(255,255,255,0.06)',
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-xs" style={{ color: 'var(--text-tertiary)' }}>
              完成 4 个 PR 即可获得奖励
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══════ SECTION 3: TRENDING & DISCOVER ═══════ */}
      <section
        className="relative px-6"
        style={{
          padding: 'clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem)',
          backgroundColor: 'var(--bg-primary)',
        }}
      >
        <div className="mx-auto max-w-[1200px]">
          <motion.div className="mb-12" {...fadeUp(0, 30)}>
            <h2
              className="mb-2 font-bold"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}
            >
              热门追踪
            </h2>
            <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
              发现 trending 仓库和开发者
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Trending Cards — 2/3 width */}
            <motion.div
              className="flex flex-col gap-6 lg:col-span-2"
              {...staggerContainer(0.15, 0)}
            >
              {/* Card 1: GitHub Trending Archive */}
              <motion.div
                {...staggerItem(40)}
                className="rounded-xl p-7 transition-all duration-300"
                style={{
                  backgroundColor: 'var(--bg-glass)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                whileHover={{ y: -4, borderColor: 'rgba(6,182,212,0.2)' }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: 'rgba(6,182,212,0.15)' }}
                  >
                    <TrendingUp className="h-5 w-5" style={{ color: 'var(--accent-cyan)' }} />
                  </div>
                  <div>
                    <a
                      href="https://github.com/antonkomarev/github-trending-archive"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm font-medium transition-colors hover:text-[var(--accent-violet)]"
                      style={{ color: 'var(--accent-cyan)' }}
                    >
                      antonkomarev/github-trending-archive
                    </a>
                    <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--accent-amber)' }}>
                      <Star className="h-3 w-3" />
                      37
                    </div>
                  </div>
                </div>
                <p className="mb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  归档 GitHub Trending 页面数据，追踪历史热门仓库
                </p>
                <div className="flex flex-wrap gap-2">
                  {['每日 Trending 数据备份', '多语言分类', '历史趋势分析'].map(f => (
                    <span
                      key={f}
                      className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium"
                      style={{ backgroundColor: 'rgba(6,182,212,0.1)', color: 'var(--accent-cyan)' }}
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      {f}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Card 2: Trendshift.io */}
              <motion.div
                {...staggerItem(40)}
                className="rounded-xl p-7 transition-all duration-300"
                style={{
                  backgroundColor: 'var(--bg-glass)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                whileHover={{ y: -4, borderColor: 'rgba(139,92,246,0.2)' }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: 'rgba(139,92,246,0.15)' }}
                  >
                    <Globe className="h-5 w-5" style={{ color: 'var(--accent-violet)' }} />
                  </div>
                  <div>
                    <span
                      className="font-mono text-sm font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Trendshift.io
                    </span>
                    <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                      第三方平台
                    </div>
                  </div>
                </div>
                <p className="mb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  第三方 GitHub 趋势追踪平台，提供更丰富的筛选和可视化功能
                </p>
                <div className="flex flex-wrap gap-2">
                  {['实时趋势追踪', '开发者排名', '仓库增长分析'].map(f => (
                    <span
                      key={f}
                      className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium"
                      style={{ backgroundColor: 'rgba(139,92,246,0.1)', color: 'var(--accent-violet)' }}
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      {f}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Mini Trending Preview — 1/3 width */}
            <motion.div
              className="rounded-xl p-5"
              style={{
                backgroundColor: 'var(--bg-glass)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.3 }}
            >
              <p className="mb-4 text-xs font-medium tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                今日 Trending
              </p>
              <motion.div
                className="flex flex-col gap-3"
                {...staggerContainer(0.06, 0.4)}
              >
                {mockTrending.map(row => (
                  <motion.div
                    key={row.rank}
                    {...staggerItem(10)}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="w-5 text-right font-mono text-xs tabular-nums" style={{ color: 'var(--text-muted)' }}>
                      {row.rank}
                    </span>
                    <span className="flex-1 truncate font-mono text-xs" style={{ color: 'var(--accent-cyan)' }}>
                      {row.repo}
                    </span>
                    <span
                      className="hidden h-2 w-2 rounded-full sm:block"
                      style={{ backgroundColor: row.lang === 'Rust' ? '#dea584' : row.lang === 'Zig' ? '#ec915c' : '#3178c6' }}
                    />
                    <span className="text-xs tabular-nums" style={{ color: 'var(--accent-amber)' }}>
                      {row.stars}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 4: OPEN SOURCE SPONSORSHIP ═══════ */}
      <section
        className="relative px-6"
        style={{
          padding: 'clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem)',
          backgroundColor: 'var(--bg-secondary)',
        }}
      >
        <div className="mx-auto max-w-[1000px]">
          <motion.div className="mb-10" {...fadeUp(0, 30)}>
            <h2
              className="mb-2 font-bold"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}
            >
              开源赞助
            </h2>
            <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
              支持开源项目，获得可持续的开源生态
            </p>
          </motion.div>

          {/* Sponsors Highlight Card */}
          <motion.div
            className="mb-8 rounded-xl p-8 md:p-10"
            style={{
              background: 'linear-gradient(135deg, var(--bg-glass) 0%, rgba(16,185,129,0.03) 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderLeft: '3px solid var(--accent-emerald)',
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            <div className="grid gap-8 md:grid-cols-2">
              {/* Left Column */}
              <div>
                <Heart
                  className="mb-4 h-12 w-12"
                  style={{ color: 'var(--accent-rose)', filter: 'drop-shadow(0 0 12px rgba(244,63,94,0.3))' }}
                />
                <h3 className="mb-2 text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  GitHub Sponsors
                </h3>
                <div className="mb-4 flex items-baseline gap-2">
                  <span
                    ref={sponsorsCount.ref}
                    className="text-3xl font-bold tabular-nums"
                    style={{ color: 'var(--accent-emerald)' }}
                  >
                    ${sponsorsCount.count}M+
                  </span>
                  <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>累计投资</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  GitHub 官方开源赞助平台，让开发者直接从社区获得资金支持
                </p>
              </div>

              {/* Right Column */}
              <div className="flex flex-col justify-between">
                <div>
                  <h4 className="mb-3 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    赞助方式
                  </h4>
                  <ul className="mb-6 flex flex-col gap-2">
                    {['个人开发者', '开源组织', '企业赞助'].map(item => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--accent-emerald)' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="https://github.com/sponsors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm font-medium transition-colors hover:opacity-80"
                  style={{ color: 'var(--accent-emerald)' }}
                >
                  了解更多
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Funding Directory Card */}
          <motion.div
            className="rounded-xl p-6 transition-all duration-300"
            style={{
              backgroundColor: 'var(--bg-glass)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.3 }}
            whileHover={{ y: -2, borderColor: 'rgba(139,92,246,0.2)' }}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <a
                  href="https://github.com/oss-fund/directory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm font-medium transition-colors hover:text-[var(--accent-violet)]"
                  style={{ color: 'var(--accent-cyan)' }}
                >
                  oss-fund/directory
                </a>
                <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--accent-amber)' }}>
                  <Star className="h-3 w-3" />
                  85
                </div>
              </div>
              <p className="max-w-[400px] text-sm" style={{ color: 'var(--text-secondary)' }}>
                开源项目资金资源目录，包含 grant、赞助和捐赠平台
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ SECTION 5: EDUCATION ═══════ */}
      <section
        className="relative px-6"
        style={{
          padding: 'clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem)',
          backgroundColor: 'var(--bg-primary)',
        }}
      >
        <div className="mx-auto max-w-[1000px]">
          <motion.div className="mb-10" {...fadeUp(0, 30)}>
            <h2
              className="mb-2 font-bold"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}
            >
              教育资源
            </h2>
            <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
              免费工具和课程，助力开发者成长
            </p>
          </motion.div>

          {/* Student Pack Card */}
          <motion.div
            className="rounded-xl p-8 md:p-10"
            style={{
              backgroundColor: 'var(--bg-glass)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
          >
            <div className="flex flex-col gap-8 md:flex-row md:items-start">
              {/* Left: Icon */}
              <div className="flex shrink-0 items-start justify-center">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: 'rgba(139,92,246,0.15)',
                    boxShadow: '0 0 40px rgba(139,92,246,0.2)',
                  }}
                >
                  <GraduationCap className="h-8 w-8" style={{ color: 'var(--accent-violet)' }} />
                </div>
              </div>

              {/* Right: Content */}
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  GitHub Student Developer Pack
                </h3>
                <div className="mb-4 flex items-baseline gap-2">
                  <span
                    ref={studentCount.ref}
                    className="text-3xl font-bold tabular-nums"
                    style={{ color: 'var(--accent-violet)' }}
                  >
                    ${studentCount.count},000+
                  </span>
                  <span className="text-sm" style={{ color: 'var(--text-tertiary)' }}>免费资源价值</span>
                </div>
                <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  面向学生的免费开发工具包，包含域名、云服务器、IDE、设计工具等
                </p>

                {/* Benefits */}
                <motion.ul
                  className="mb-6 grid gap-2 sm:grid-cols-2"
                  {...staggerContainer(0.08, 0.3)}
                >
                  {studentBenefits.map(b => (
                    <motion.li
                      key={b}
                      {...staggerItem(15)}
                      className="flex items-center gap-2 text-sm"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: 'var(--accent-violet)' }} />
                      {b}
                    </motion.li>
                  ))}
                </motion.ul>

                <a
                  href="https://education.github.com/pack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:opacity-90"
                  style={{
                    backgroundColor: 'rgba(139,92,246,0.15)',
                    color: 'var(--accent-violet)',
                    border: '1px solid rgba(139,92,246,0.3)',
                  }}
                >
                  申请 Student Pack
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ SECTION 6: AWESOME COLLECTIONS ═══════ */}
      <section
        className="relative px-6"
        style={{
          padding: '60px clamp(1.5rem, 5vw, 4rem)',
          backgroundColor: 'var(--bg-secondary)',
        }}
      >
        <div className="mx-auto max-w-[1000px]">
          <motion.div className="mb-10" {...fadeUp(0, 30)}>
            <h2
              className="mb-2 font-bold"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}
            >
              精选集合
            </h2>
            <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
              社区维护的优质资源列表
            </p>
          </motion.div>

          <motion.div
            className="rounded-xl p-7 transition-all duration-300"
            style={{
              backgroundColor: 'var(--bg-glass)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            whileHover={{ y: -4, borderColor: 'rgba(245,158,11,0.2)' }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: 'rgba(245,158,11,0.15)' }}
              >
                <List className="h-5 w-5" style={{ color: 'var(--accent-amber)' }} />
              </div>
              <div>
                <a
                  href="https://github.com/avinash201199/Awesome-GitHub-Repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm font-medium transition-colors hover:text-[var(--accent-violet)]"
                  style={{ color: 'var(--accent-cyan)' }}
                >
                  avinash201199/Awesome-GitHub-Repositories
                </a>
                <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--accent-amber)' }}>
                  <Star className="h-3 w-3" />
                  513
                </div>
              </div>
            </div>
            <p className="mb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              精心整理的 GitHub 优质仓库集合，涵盖开发工具、学习资源、开源项目
            </p>
            <div className="flex flex-wrap gap-2">
              {['awesome', 'collection', 'community'].map(tag => (
                <span
                  key={tag}
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{ backgroundColor: 'rgba(245,158,11,0.1)', color: 'var(--accent-amber)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
