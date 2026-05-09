import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import Layout from '../components/Layout';
import { allRepos } from '../data/repos';
import type { Repo } from '../data/repos';
import {
  GitBranch, Hammer, CheckCircle, Shield, Rocket,
  CheckCircle2, Settings, Tag, Globe, FileText, Clock,
  RefreshCw, Star, Code2, CircleDot, Bug
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

/* ─── Pipeline data ─── */
const pipelineStages = [
  { icon: GitBranch, label: '代码推送', color: '#8B5CF6', colorVar: 'var(--accent-violet)' },
  { icon: Hammer, label: '构建', color: '#10B981', colorVar: 'var(--accent-emerald)' },
  { icon: CheckCircle, label: '测试', color: '#06B6D4', colorVar: 'var(--accent-cyan)' },
  { icon: Shield, label: '检查', color: '#F59E0B', colorVar: 'var(--accent-amber)' },
  { icon: Rocket, label: '部署', color: '#F43F5E', colorVar: 'var(--accent-rose)' },
];

/* ─── CI/CD workflow cards ─── */
const cicdCards = [
  {
    icon: CheckCircle2, color: 'var(--accent-emerald)', colorHex: '#10B981',
    repo: 'super-linter/super-linter', stars: '10.2k',
    desc: '多语言代码检查工作流，支持 20+ 编程语言的 lint 规则',
    tags: ['lint', 'ci', 'multi-language'],
    code: `- uses: github/super-linter@v5\n  env:\n    DEFAULT_BRANCH: main`,
  },
  {
    icon: Settings, color: 'var(--accent-cyan)', colorHex: '#06B6D4',
    repo: 'actions/setup-node', stars: '4.8k',
    desc: '设置 Node.js 环境的官方 Action，支持版本缓存',
    tags: ['node', 'setup', 'official'],
  },
  {
    icon: Tag, color: 'var(--accent-violet)', colorHex: '#8B5CF6',
    repo: 'softprops/action-gh-release', stars: '5.6k',
    desc: '自动创建 GitHub Releases，支持附件上传和发布说明',
    tags: ['release', 'automation'],
  },
];

/* ─── Deployment cards ─── */
const deployCards = [
  {
    icon: Globe, color: 'var(--accent-emerald)', colorHex: '#10B981',
    repo: 'peaceiris/actions-gh-pages', stars: '5.3k',
    desc: '将构建产物自动部署到 GitHub Pages，支持自定义域名和 CNAME',
    features: ['支持任意分支部署', '自定义域名支持', 'Force Orphan 选项', '部署历史保留'],
  },
  {
    icon: Globe, color: 'var(--accent-cyan)', colorHex: '#06B6D4',
    repo: 'JamesIves/github-pages-deploy-action', stars: '4.6k',
    desc: '简化 GitHub Pages 部署流程，支持 SSH 和 Token 认证',
    features: ['SSH 和 Token 认证', '单文件夹部署', '清理旧文件选项', '详细日志输出'],
  },
];

/* ─── Automation tool cards ─── */
const automationCards = [
  {
    icon: Tag, color: 'var(--accent-amber)', colorHex: '#F59E0B',
    repo: 'actions/labeler', stars: '2.4k',
    desc: '根据文件路径自动为 PR 添加标签',
    useCase: '当 PR 修改了 src/ 目录下的文件时自动添加 frontend 标签',
  },
  {
    icon: FileText, color: 'var(--accent-violet)', colorHex: '#8B5CF6',
    repo: 'release-drafter/release-drafter', stars: '3.9k',
    desc: '自动根据合并的 PR 生成发布说明草稿',
    useCase: '按标签分类 PR，自动生成格式化的 Release Notes',
  },
  {
    icon: Clock, color: 'var(--accent-rose)', colorHex: '#F43F5E',
    repo: 'actions/stale', stars: '1.7k',
    desc: '自动标记和关闭长期不活跃的 Issue 和 PR',
    useCase: '30 天无活动的 Issue 自动标记为 stale，7 天后关闭',
  },
];

/* ─── Security cards ─── */
const securityCards = [
  {
    icon: Shield, color: 'var(--accent-emerald)', colorHex: '#10B981',
    name: 'github/codeql-action',
    desc: 'GitHub 官方的代码安全分析工具，自动检测漏洞和代码质量问题',
    features: '支持多种语言、自动 PR 修复建议、与 Security 面板集成',
  },
  {
    icon: RefreshCw, color: 'var(--accent-cyan)', colorHex: '#06B6D4',
    name: 'dependabot',
    desc: '自动监控和更新项目依赖，创建 PR 修复安全漏洞',
    features: '支持多种包管理器、自动合并选项、安全警报集成',
  },
];

/* ─── Filter tabs for repos ─── */
const filterTabs = ['全部', 'CI/CD', '部署', '管理', '安全'];

const categoryMap: Record<string, string[]> = {
  'CI/CD': ['super-linter', 'setup-node', 'action-gh-release'],
  '部署': ['actions-gh-pages', 'github-pages-deploy-action'],
  '管理': ['labeler', 'release-drafter', 'stale'],
  '安全': ['codeql-action', 'dependabot'],
};

function getFilteredRepos(tab: string): Repo[] {
  const actionsRepos = allRepos.filter(r => r.category === 'actions');
  if (tab === '全部') return actionsRepos;
  // For filtered tabs, return repos whose name includes any of the mapped keywords
  const keywords = categoryMap[tab] || [];
  return actionsRepos.filter(r =>
    keywords.some(kw => r.name.toLowerCase().includes(kw.toLowerCase()))
  );
}

/* ─── Glow Orb Component ─── */
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

/* ─── Repository Card ─── */
function RepoCard({ repo }: { repo: Repo }) {
  return (
    <motion.div
      {...staggerItem(30)}
      className="group flex flex-col gap-3 rounded-xl p-6 transition-all duration-200"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
      whileHover={{
        y: -2,
        borderColor: 'rgba(139,92,246,0.3)',
        transition: { duration: 0.2 },
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <a
          href={`https://github.com/${repo.fullName}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm transition-colors hover:text-[var(--accent-violet)]"
          style={{ color: 'var(--accent-cyan)' }}
        >
          {repo.fullName}
        </a>
        <span
          className="flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
          style={{ backgroundColor: 'rgba(245,158,11,0.1)', color: 'var(--accent-amber)' }}
        >
          <Star className="h-3 w-3" />
          {repo.stars}
        </span>
      </div>
      <p className="line-clamp-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
        {repo.description}
      </p>
      <div className="mt-auto flex items-center gap-3 pt-2 text-xs" style={{ color: 'var(--text-tertiary)' }}>
        {repo.language && (
          <span className="flex items-center gap-1">
            <CircleDot className="h-3 w-3" style={{ color: 'var(--accent-cyan)' }} />
            {repo.language}
          </span>
        )}
        {repo.forks && <span>Forks: {repo.forks}</span>}
        {repo.issues && (
          <span
            className="rounded-full px-2 py-0.5"
            style={{ backgroundColor: 'rgba(244,63,94,0.1)', color: 'var(--accent-rose)' }}
          >
            Issues: {repo.issues}
          </span>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════
   PAGE: Actions
   ═══════════════════════════════════ */
export default function Actions() {
  const [activeTab, setActiveTab] = useState('全部');
  const [expandedCode, setExpandedCode] = useState<number | null>(null);

  const filteredRepos = getFilteredRepos(activeTab);

  return (
    <Layout>
      {/* ═══════ SECTION 1: HERO ═══════ */}
      <section
        className="relative flex min-h-[380px] items-center overflow-hidden px-6 pt-16"
        style={{
          minHeight: '45vh',
          maxHeight: 420,
          padding: 'clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem)',
          backgroundColor: 'var(--bg-primary)',
        }}
      >
        <GlowOrb color="#10B981" className="-right-20 top-0" />
        <GlowOrb color="#06B6D4" className="left-1/4 bottom-0" />

        <div className="relative z-10 mx-auto w-full max-w-[1200px]">
          <motion.p
            className="mb-4 text-xs font-medium tracking-wider"
            style={{ color: 'var(--text-tertiary)' }}
            {...fadeUp(0)}
          >
            <Link to="/" className="transition-colors hover:text-[var(--accent-violet)]">首页</Link>
            {' / '}
            <span>自动化</span>
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
            自动化工作流
          </motion.h1>

          <motion.p
            className="mb-8 max-w-[560px] text-base leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
            {...fadeUp(0.2, 30)}
          >
            GitHub Actions 让自动化变得简单 — CI/CD、代码检查、自动部署、Issue 管理，一站式工作流工具箱
          </motion.p>

          <motion.div
            className="flex gap-10"
            {...fadeUp(0.3, 20)}
          >
            {[
              { num: '10+', label: '工作流模板', color: 'var(--accent-emerald)' },
              { num: '5', label: '子分类', color: 'var(--accent-cyan)' },
              { num: '50k+', label: '累计 Stars', color: 'var(--accent-amber)' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="text-2xl font-bold tabular-nums" style={{ color: s.color }}>{s.num}</span>
                <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Decorative workflow nodes — hidden on mobile */}
        <motion.div
          className="absolute right-[8%] top-1/2 hidden -translate-y-1/2 items-center gap-0 lg:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {['Build', 'Test', 'Deploy'].map((label, i) => (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{
                    border: '2px solid var(--accent-emerald)',
                    backgroundColor: 'var(--bg-glass)',
                  }}
                >
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: 'var(--accent-emerald)' }}
                  />
                </div>
                <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{label}</span>
              </div>
              {i < 2 && (
                <div
                  className="mx-3 h-[2px] w-12"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.2) 0, rgba(255,255,255,0.2) 4px, transparent 4px, transparent 8px)',
                    backgroundSize: '200% 100%',
                    animation: 'dashFlow 1s linear infinite',
                  }}
                />
              )}
            </div>
          ))}
        </motion.div>

        <style>{`
          @keyframes dashFlow {
            0% { background-position: 0 0; }
            100% { background-position: 16px 0; }
          }
        `}</style>
      </section>

      {/* ═══════ SECTION 2: WORKFLOW VISUAL ═══════ */}
      <section
        className="relative overflow-hidden px-6"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          padding: '80px clamp(1.5rem, 5vw, 4rem)',
        }}
      >
        <div className="mx-auto max-w-[1000px]">
          <motion.div
            className="rounded-xl p-10"
            style={{
              backgroundColor: 'var(--bg-glass)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
            {...fadeUp(0, 40)}
          >
            {/* Pipeline — horizontal desktop, vertical mobile */}
            <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-0">
              {pipelineStages.map((stage, i) => {
                const Icon = stage.icon;
                return (
                  <div key={stage.label} className="flex items-center">
                    <motion.div
                      className="flex w-[120px] flex-col items-center gap-2"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease: easeOutExpo, delay: i * 0.2 }}
                    >
                      <motion.div
                        className="flex h-14 w-14 items-center justify-center rounded-xl"
                        style={{
                          backgroundColor: `${stage.color}15`,
                          border: `1px solid ${stage.color}40`,
                        }}
                        initial={{ scale: 1 }}
                        whileInView={{ scale: [1, 1.15, 1] }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.2 + 0.4 }}
                      >
                        <Icon className="h-6 w-6" style={{ color: stage.color }} />
                      </motion.div>
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        {stage.label}
                      </span>
                    </motion.div>

                    {/* Connector */}
                    {i < pipelineStages.length - 1 && (
                      <>
                        {/* Horizontal connector (desktop) */}
                        <motion.div
                          className="mx-2 hidden h-[2px] w-16 overflow-hidden rounded-full md:block"
                          style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, ease: easeOutExpo, delay: i * 0.2 + 0.2 }}
                        >
                          <div
                            className="h-full w-full"
                            style={{
                              background: `repeating-linear-gradient(90deg, ${stage.color}60 0, ${stage.color}60 4px, transparent 4px, transparent 8px)`,
                              backgroundSize: '200% 100%',
                              animation: 'dashFlow 2s linear infinite',
                            }}
                          />
                        </motion.div>
                        {/* Vertical connector (mobile) */}
                        <motion.div
                          className="h-8 w-[2px] overflow-hidden rounded-full md:hidden"
                          style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, ease: easeOutExpo, delay: i * 0.2 + 0.2 }}
                        >
                          <div
                            className="h-full w-full"
                            style={{
                              background: `repeating-linear-gradient(180deg, ${stage.color}60 0, ${stage.color}60 4px, transparent 4px, transparent 8px)`,
                              backgroundSize: '100% 200%',
                              animation: 'dashFlowV 2s linear infinite',
                            }}
                          />
                        </motion.div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <style>{`
          @keyframes dashFlowV {
            0% { background-position: 0 0; }
            100% { background-position: 0 16px; }
          }
        `}</style>
      </section>

      {/* ═══════ SECTION 3: CI/CD WORKFLOWS ═══════ */}
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
              CI/CD 工作流
            </h2>
            <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
              代码检查、测试和构建工具
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            {...staggerContainer(0.1, 0)}
          >
            {cicdCards.map((card, idx) => {
              const Icon = card.icon;
              const isExpanded = expandedCode === idx;
              return (
                <motion.div
                  key={card.repo}
                  {...staggerItem(40)}
                  className="rounded-xl p-7 transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--bg-glass)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                  whileHover={{
                    y: -4,
                    boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
                    borderColor: `${card.colorHex}40`,
                  }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${card.colorHex}15` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: card.color }} />
                    </div>
                    <div>
                      <a
                        href={`https://github.com/${card.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-sm font-medium transition-colors hover:text-[var(--accent-violet)]"
                        style={{ color: 'var(--accent-cyan)' }}
                      >
                        {card.repo}
                      </a>
                      <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--accent-amber)' }}>
                        <Star className="h-3 w-3" />
                        {card.stars}
                      </div>
                    </div>
                  </div>

                  <p className="mb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {card.desc}
                  </p>

                  <div className="mb-3 flex flex-wrap gap-2">
                    {card.tags.map(tag => (
                      <span
                        key={tag}
                        className="rounded-full px-3 py-1 text-xs font-medium"
                        style={{ backgroundColor: `${card.colorHex}15`, color: card.color }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {card.code && (
                    <div>
                      <button
                        onClick={() => setExpandedCode(isExpanded ? null : idx)}
                        className="mb-2 text-xs font-medium transition-colors hover:text-[var(--accent-violet)]"
                        style={{ color: 'var(--text-tertiary)' }}
                      >
                        {isExpanded ? '收起代码' : '查看代码'}
                      </button>
                      {isExpanded && (
                        <motion.pre
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-x-auto rounded-lg p-3 font-mono text-xs leading-relaxed"
                          style={{
                            backgroundColor: 'var(--bg-primary)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          <code>{card.code}</code>
                        </motion.pre>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════ SECTION 4: DEPLOYMENT TOOLS ═══════ */}
      <section
        className="relative px-6"
        style={{
          padding: 'clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem)',
          backgroundColor: 'var(--bg-secondary)',
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
              部署工具
            </h2>
            <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
              自动化部署到 GitHub Pages 和其他平台
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-2"
            {...staggerContainer(0.15, 0)}
          >
            {deployCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.repo}
                  {...staggerItem(40)}
                  className="rounded-xl p-7 transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--bg-glass)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                  whileHover={{
                    y: -4,
                    boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
                    borderColor: `${card.colorHex}40`,
                  }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${card.colorHex}15` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: card.color }} />
                    </div>
                    <div>
                      <a
                        href={`https://github.com/${card.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-sm font-medium transition-colors hover:text-[var(--accent-violet)]"
                        style={{ color: 'var(--accent-cyan)' }}
                      >
                        {card.repo}
                      </a>
                      <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--accent-amber)' }}>
                        <Star className="h-3 w-3" />
                        {card.stars}
                      </div>
                    </div>
                  </div>

                  <p className="mb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {card.desc}
                  </p>

                  <motion.ul
                    className="flex flex-col gap-2"
                    {...staggerContainer(0.06, 0.3)}
                  >
                    {card.features.map(f => (
                      <motion.li
                        key={f}
                        {...staggerItem(10)}
                        className="flex items-center gap-2 text-sm"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: card.color }} />
                        {f}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════ SECTION 5: AUTOMATION & MANAGEMENT ═══════ */}
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
              自动化管理
            </h2>
            <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
              Issue、PR 和发布管理的自动化工具
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            {...staggerContainer(0.1, 0)}
          >
            {automationCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.repo}
                  {...staggerItem(40)}
                  className="rounded-xl p-7 transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--bg-glass)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                  whileHover={{
                    y: -4,
                    boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
                    borderColor: `${card.colorHex}40`,
                  }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${card.colorHex}15` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: card.color }} />
                    </div>
                    <div>
                      <a
                        href={`https://github.com/${card.repo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-sm font-medium transition-colors hover:text-[var(--accent-violet)]"
                        style={{ color: 'var(--accent-cyan)' }}
                      >
                        {card.repo}
                      </a>
                      <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--accent-amber)' }}>
                        <Star className="h-3 w-3" />
                        {card.stars}
                      </div>
                    </div>
                  </div>

                  <p className="mb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {card.desc}
                  </p>

                  <div
                    className="rounded-lg border p-3 text-xs italic leading-relaxed"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.02)',
                      borderColor: 'rgba(255,255,255,0.06)',
                      color: 'var(--text-tertiary)',
                    }}
                  >
                    {card.useCase}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════ SECTION 6: SECURITY & DEPENDENCIES ═══════ */}
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
              安全与依赖
            </h2>
            <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
              代码安全扫描和依赖自动更新
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 md:grid-cols-2"
            {...staggerContainer(0.15, 0)}
          >
            {securityCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.name}
                  {...staggerItem(40)}
                  className="rounded-xl p-7 transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--bg-glass)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                  whileHover={{
                    y: -4,
                    boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
                    borderColor: `${card.colorHex}40`,
                  }}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${card.colorHex}15` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: card.color }} />
                    </div>
                    <span
                      className="font-mono text-sm font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {card.name}
                    </span>
                  </div>

                  <p className="mb-4 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {card.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {card.features.split('、').map(f => (
                      <span
                        key={f}
                        className="rounded-full px-3 py-1 text-xs font-medium"
                        style={{ backgroundColor: `${card.colorHex}15`, color: card.color }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════ SECTION 7: RELATED REPOSITORIES ═══════ */}
      <section
        className="relative px-6"
        style={{
          padding: 'clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem)',
          backgroundColor: 'var(--bg-primary)',
        }}
      >
        <div className="mx-auto max-w-[1200px]">
          <motion.div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" {...fadeUp(0, 30)}>
            <h2
              className="font-bold"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}
            >
              全部仓库
            </h2>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
              {filterTabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200"
                  style={{
                    backgroundColor: activeTab === tab ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.04)',
                    color: activeTab === tab ? 'var(--accent-violet)' : 'var(--text-tertiary)',
                    border: `1px solid ${activeTab === tab ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.06)'}`,
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            key={activeTab}
            {...staggerContainer(0.08, 0)}
          >
            {filteredRepos.length > 0 ? (
              filteredRepos.map(repo => <RepoCard key={repo.id} repo={repo} />)
            ) : (
              <motion.p
                {...staggerItem()}
                className="col-span-full py-12 text-center text-sm"
                style={{ color: 'var(--text-tertiary)' }}
              >
                暂无该分类的仓库
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
