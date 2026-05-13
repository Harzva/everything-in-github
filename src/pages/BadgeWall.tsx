import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy, Zap, Heart, Star, GitPullRequest, Lightbulb, Users, Code,
  Rocket, Snowflake, Github, GraduationCap, Shield, Settings, Bot,
  Crown, Target, Award, Flame, Sparkles, Crown as CrownIcon,
  Copy, Check
} from 'lucide-react';
import Layout from '../components/Layout';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const achievements = [
  { id: 'quickdraw', name: 'Quickdraw', icon: Zap, image: './achievement-badges/quickdraw.png', color: '#F59E0B', bg: '#FEF3C7', desc: '5分钟内关闭Issue/PR', rarity: '常见', year: '2022' },
  { id: 'yolo', name: 'YOLO', icon: Flame, image: './achievement-badges/yolo.png', color: '#EF4444', bg: '#FEE2E2', desc: '合并未经审查的PR', rarity: '常见', year: '2022' },
  { id: 'sponsor', name: 'Public Sponsor', icon: Heart, image: './achievement-badges/public-sponsor.png', color: '#EC4899', bg: '#FCE7F3', desc: '通过GitHub Sponsors赞助', rarity: '稀有', year: '2022' },
  { id: 'starstruck', name: 'Starstruck', icon: Star, image: './achievement-badges/starstruck.png', color: '#8B5CF6', bg: '#EDE9FE', desc: '仓库获得16+ Stars', rarity: '史诗', year: '2022', tiers: ['x1', 'x2', 'x3', 'x4'] },
  { id: 'pull-shark', name: 'Pull Shark', icon: GitPullRequest, image: './achievement-badges/pull-shark.png', color: '#06B6D4', bg: '#CFFAFE', desc: '合并Pull Request', rarity: '稀有', year: '2022', tiers: ['x1', 'x2', 'x3', 'x4'] },
  { id: 'galaxy-brain', name: 'Galaxy Brain', icon: Lightbulb, image: './achievement-badges/galaxy-brain.png', color: '#10B981', bg: '#D1FAE5', desc: 'Discussion回答被采纳', rarity: '史诗', year: '2022', tiers: ['x1', 'x2', 'x3', 'x4'] },
  { id: 'pair-extraordinaire', name: 'Pair Extraordinaire', icon: Users, image: './achievement-badges/pair-extraordinaire.png', color: '#F97316', bg: '#FFEDD5', desc: '共同作者的PR被合并', rarity: '传说', year: '2022', tiers: ['x1', 'x2', 'x3', 'x4'] },
  { id: 'heart-sleeve', name: 'Heart On Your Sleeve', icon: Heart, image: './achievement-badges/heart-on-your-sleeve.png', color: '#E11D48', bg: '#FFE4E6', desc: '用❤️回应GitHub内容', rarity: '测试中', year: '2024', beta: true },
  { id: 'open-sourcerer', name: 'Open Sourcerer', icon: Code, image: './achievement-badges/open-sourcerer.png', color: '#6366F1', bg: '#E0E7FF', desc: '在多个公共仓库合并PR', rarity: '测试中', year: '2024', beta: true },
];

const retired = [
  { id: 'mars', name: 'Mars 2020', icon: Rocket, image: './achievement-badges/mars-2020.png', color: '#991B1B', bg: '#FECACA', desc: 'NASA火星2020直升机任务', year: '2020', retired: true },
  { id: 'arctic', name: 'Arctic Code Vault', icon: Snowflake, image: './achievement-badges/arctic-code-vault.png', color: '#1E40AF', bg: '#BFDBFE', desc: '2020北极代码库存档', year: '2020', retired: true },
];

const highlights = [
  { name: 'Pro', icon: Crown, color: '#F59E0B', desc: 'GitHub Pro订阅用户' },
  { name: 'Developer Program', icon: Code, color: '#10B981', desc: '开发者计划成员' },
  { name: 'Security Bounty', icon: Shield, color: '#EF4444', desc: '安全漏洞赏金猎人' },
  { name: 'Campus Expert', icon: GraduationCap, color: '#8B5CF6', desc: 'GitHub校园专家' },
  { name: 'Advisory Credit', icon: Shield, color: '#06B6D4', desc: '安全建议被采纳' },
  { name: 'Sponsors', icon: Heart, color: '#EC4899', desc: 'GitHub Sponsors赞助者' },
  { name: 'Star', icon: Star, color: '#F59E0B', desc: '仓库被收藏者' },
  { name: 'Maintainer', icon: Settings, color: '#6366F1', desc: '项目维护者' },
];

const certifications = [
  { name: 'Foundations', icon: GraduationCap, color: '#10B981', level: '入门级', code: 'GHFC', price: '$99', duration: '100分钟', desc: '协作、Git基础、仓库工作', link: 'https://learn.github.com/credentials' },
  { name: 'Actions', icon: Zap, color: '#F59E0B', level: '中级', code: 'GHAC', price: '$99', duration: '100分钟', desc: '工作流自动化、CI/CD', link: 'https://learn.github.com/credentials' },
  { name: 'Security', icon: Shield, color: '#EF4444', level: '高级', code: 'GHSC', price: '$99', duration: '100分钟', desc: 'CodeQL、Secret Scanning', link: 'https://learn.github.com/credentials' },
  { name: 'Admin', icon: Settings, color: '#06B6D4', level: '中级', code: 'GHAD', price: '$99', duration: '100分钟', desc: '组织管理、权限控制', link: 'https://learn.github.com/credentials' },
  { name: 'Copilot', icon: Bot, color: '#EC4899', level: '中级', code: 'GHCP', price: '$99', duration: '100分钟', desc: 'AI编程、Responsible AI', link: 'https://learn.github.com/credentials' },
];

const profileTrophies = [
  { name: 'MultiTasker', icon: Zap, color: '#F59E0B', level: 'SSS', desc: '使用多种语言' },
  { name: 'Commits', icon: Code, color: '#10B981', level: 'S', desc: '大量代码提交' },
  { name: 'PullRequest', icon: GitPullRequest, color: '#06B6D4', level: 'A', desc: '活跃PR贡献者' },
  { name: 'Reviews', icon: Star, color: '#8B5CF6', level: 'B', desc: '代码审查专家' },
  { name: 'Issues', icon: Target, color: '#EF4444', level: 'C', desc: 'Bug猎手' },
  { name: 'Repository', icon: Trophy, color: '#F97316', level: 'SS', desc: '仓库收集者' },
  { name: 'Followers', icon: Users, color: '#EC4899', level: 'S', desc: '社区影响力' },
  { name: 'AllSuperRank', icon: CrownIcon, color: '#F59E0B', level: 'SSS', desc: '全能王者' },
  { name: 'Joined2020', icon: Github, color: '#6366F1', level: 'A', desc: '早期用户' },
  { name: ' AncientAccount', icon: Award, color: '#8B5CF6', level: 'S', desc: '资深用户' },
  { name: 'Organizations', icon: Users, color: '#10B981', level: 'B', desc: '组织成员' },
  { name: 'Stars', icon: Star, color: '#F59E0B', level: 'SS', desc: 'Star收集者' },
];

/* ------------------------------------------------------------------ */
/*  Components                                                         */
/* ------------------------------------------------------------------ */

interface BadgeWallItem {
  name: string;
  icon: React.ElementType<{ size?: number; style?: React.CSSProperties; className?: string }>;
  color: string;
  desc: string;
  image?: string;
  rarity?: string;
  beta?: boolean;
  retired?: boolean;
  level?: string;
  tiers?: string[];
}

function BadgeCard({ item, index, type = 'achievement' }: { item: BadgeWallItem; index: number; type?: string }) {
  const Icon = item.icon;
  const [copied, setCopied] = useState(false);

  const copyBadge = () => {
    const text = type === 'achievement'
      ? `GitHub Achievement: ${item.name}\n${item.desc}\n获取方式: ${item.desc}`
      : `${item.name} - ${item.desc}`;
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.08, y: -8, transition: { duration: 0.2 } }}
      className="group relative cursor-pointer"
      onClick={copyBadge}
    >
      {/* Glow effect */}
      <div
        className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"
        style={{ background: `radial-gradient(circle, ${item.color}30 0%, transparent 70%)` }}
      />

      <div
        className="relative flex flex-col items-center p-5 rounded-2xl border border-white/5 transition-all duration-300 group-hover:border-white/10"
        style={{ background: `linear-gradient(135deg, ${item.color}08 0%, rgba(10,10,15,0.95) 100%)` }}
      >
        {/* Icon container */}
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
          style={{ background: `linear-gradient(135deg, ${item.color}20 0%, ${item.color}08 100%)`, boxShadow: `0 4px 20px ${item.color}15` }}
        >
          {'image' in item && item.image ? (
            <img
              src={item.image}
              alt={`${item.name} badge`}
              className="h-14 w-14 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)]"
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
                const fallback = event.currentTarget.nextElementSibling as HTMLElement | null;
                if (fallback) fallback.style.display = 'block';
              }}
            />
          ) : null}
          <Icon size={28} style={{ color: item.color, display: 'image' in item && item.image ? 'none' : 'block' }} />
        </div>

        {/* Name */}
        <div className="text-sm font-bold text-white/90 text-center mb-1">{item.name}</div>

        {/* Description */}
        <div className="text-[11px] text-white/40 text-center leading-tight mb-2">{item.desc}</div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 justify-center">
          {item.rarity && (
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
              style={{ background: item.color + '15', color: item.color }}
            >
              {item.rarity}
            </span>
          )}
          {item.beta && (
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-purple-500/15 text-purple-400">
              BETA
            </span>
          )}
          {item.retired && (
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-red-500/15 text-red-400">
              已退役
            </span>
          )}
          {item.level && (
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
              style={{ background: item.color + '15', color: item.color }}
            >
              {item.level}
            </span>
          )}
        </div>

        {/* Tier badges */}
        {item.tiers && (
          <div className="flex gap-1 mt-2">
            {item.tiers.map((tier: string) => (
              <span
                key={tier}
                className="text-[9px] px-1.5 py-0.5 rounded font-bold"
                style={{ background: item.color + '20', color: item.color }}
              >
                {tier}
              </span>
            ))}
          </div>
        )}

        {/* Copy indicator */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} className="text-white/30" />}
        </div>
      </div>
    </motion.div>
  );
}

function seededParticle(index: number) {
  const seed = Math.sin(index * 999) * 10000;
  const fraction = seed - Math.floor(seed);
  return fraction < 0 ? fraction + 1 : fraction;
}

function FloatingParticle({ color, index }: { color: string; index: number }) {
  const randomX = seededParticle(index) * 100;
  const randomDelay = seededParticle(index + 17) * 5;
  const randomDuration = 3 + seededParticle(index + 31) * 4;
  const drift = (seededParticle(index + 47) - 0.5) * 100;

  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full pointer-events-none"
      style={{
        background: color,
        left: `${randomX}%`,
        bottom: '-10px',
        boxShadow: `0 0 6px ${color}60`,
      }}
      animate={{
        y: [0, -800],
        opacity: [0, 0.8, 0],
        x: [0, drift],
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function BadgeWall() {
  const [activeTab, setActiveTab] = useState<'achievements' | 'highlights' | 'certifications' | 'trophies'>('achievements');

  const tabs = [
    { id: 'achievements' as const, label: '成就徽章', count: achievements.length + retired.length, color: '#F59E0B' },
    { id: 'highlights' as const, label: 'Highlights', count: highlights.length, color: '#8B5CF6' },
    { id: 'certifications' as const, label: '官方认证', count: certifications.length, color: '#10B981' },
    { id: 'trophies' as const, label: 'Profile Trophy', count: profileTrophies.length, color: '#EC4899' },
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'achievements': return { items: [...achievements, ...retired], title: 'GitHub 成就徽章墙', subtitle: '9个可获取 + 2个已退役的成就徽章' };
      case 'highlights': return { items: highlights, title: 'Highlights 徽章墙', subtitle: '展示在 GitHub Profile 上的特殊徽章' };
      case 'certifications': return { items: certifications, title: '官方认证徽章墙', subtitle: 'GitHub 官方推出的5种专业认证' };
      case 'trophies': return { items: profileTrophies, title: 'Profile Trophy 墙', subtitle: 'github-profile-trophy 项目的奖杯徽章' };
    }
  };

  const current = getCurrentData();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ minHeight: '35vh', display: 'flex', alignItems: 'center' }}>
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(139,92,246,0.06) 50%, rgba(236,72,153,0.08) 100%)' }} />
          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 15 }).map((_, i) => (
              <FloatingParticle key={i} index={i} color={['#F59E0B', '#8B5CF6', '#10B981', '#06B6D4', '#EC4899'][i % 5]} />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 text-xs text-white/40 mb-4">
              <a href="#/" className="hover:text-white/60 transition-colors">首页</a>
              <span>/</span>
              <span className="text-amber-400">徽章墙</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ background: 'linear-gradient(135deg, #F59E0B, #8B5CF6, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Badge & Icon Wall
            </h1>
            <p className="text-lg text-white/50 max-w-xl">
              GitHub 成就徽章、Highlights、官方认证、Profile Trophy 的可视化展示墙
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-6 justify-center">
          {[
            { label: '成就徽章', value: '11', color: '#F59E0B' },
            { label: 'Highlights', value: '8', color: '#8B5CF6' },
            { label: '官方认证', value: '5', color: '#10B981' },
            { label: 'Trophies', value: '12', color: '#EC4899' },
            { label: '总计', value: '36+', color: '#06B6D4' },
          ].map(stat => (
            <div key={stat.label} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: stat.color }} />
              <span className="text-xs text-white/40">{stat.label}</span>
              <span className="text-sm font-bold" style={{ color: stat.color }}>{stat.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="sticky top-[72px] z-40 border-b border-white/5" style={{ background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-7xl mx-auto px-6 flex gap-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative px-5 py-3.5 text-sm font-semibold whitespace-nowrap transition-all duration-200"
              style={{
                color: activeTab === tab.id ? tab.color : 'rgba(255,255,255,0.4)',
              }}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-x-0 bottom-0 h-0.5"
                  style={{ background: tab.color }}
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
              {tab.label}
              <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: activeTab === tab.id ? tab.color + '15' : 'rgba(255,255,255,0.05)', color: activeTab === tab.id ? tab.color : 'rgba(255,255,255,0.3)' }}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Badge Wall */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Section header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-1">{current.title}</h2>
            <p className="text-sm text-white/40">{current.subtitle} · 点击徽章可复制信息</p>
          </div>

          {/* Badge grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {current.items.map((item, i) => (
              <BadgeCard key={`${activeTab}-${item.name}-${i}`} item={item} index={i} type={activeTab === 'achievements' ? 'achievement' : 'badge'} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Preview Section - How to use */}
      <section className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-2xl font-bold mb-2">如何在 Profile 展示</h2>
          <p className="text-sm text-white/40 mb-6">将这些徽章添加到你的 GitHub Profile README 中</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Code preview */}
            <div className="rounded-xl border border-white/5 overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                <div className="w-3 h-3 rounded-full bg-green-500/20" />
                <span className="text-xs text-white/30 ml-2">README.md</span>
              </div>
              <div className="p-4 font-mono text-xs leading-relaxed text-white/60 overflow-x-auto">
                <div className="text-green-400/60">{'# My GitHub Achievements'}</div>
                <div className="mt-2" />
                <div className="text-purple-400/60">{'## Trophies'}</div>
                <div className="text-white/50">{'![trophy](https://github-profile-trophy.vercel.app/?username=YOUR_NAME&theme=darkhub)'}</div>
                <div className="mt-2" />
                <div className="text-purple-400/60">{'## Stats'}</div>
                <div className="text-white/50">{'![stats](https://github-readme-stats.vercel.app/api?username=YOUR_NAME&show_icons=true)'}</div>
                <div className="mt-2" />
                <div className="text-purple-400/60">{'## Certifications'}</div>
                <div className="text-white/50">{'<!-- Add your GitHub certification badges here -->'}</div>
              </div>
            </div>

            {/* Quick links */}
            <div className="flex flex-col gap-3">
              {[
                { label: 'GitHub Learn', url: 'https://learn.github.com/', desc: '官方学习平台（推荐）', color: '#F59E0B' },
                { label: 'GitHub Credentials', url: 'https://learn.github.com/credentials', desc: '官方认证和徽章', color: '#EC4899' },
                { label: 'GitHub Profile Trophy', url: 'https://github.com/ryo-ma/github-profile-trophy', desc: '在 Profile 展示奖杯墙', color: '#8B5CF6' },
                { label: 'GitHub README Stats', url: 'https://github.com/anuraghazra/github-readme-stats', desc: '统计卡片和语言分析', color: '#10B981' },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/5 transition-all duration-200 hover:border-white/10"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = link.color + '08'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: link.color + '15' }}>
                    <Sparkles size={18} style={{ color: link.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{link.label}</div>
                    <div className="text-xs text-white/40">{link.desc}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Marquee - scrolling badges */}
      <section className="py-8 overflow-hidden border-t border-white/5" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="flex gap-6 animate-marquee whitespace-nowrap">
          {[...achievements, ...highlights].map((item, i) => {
            const Icon = item.icon;
            const image = ('image' in item ? item.image : undefined) as string | undefined;
            return (
              <div
                key={`m-${i}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5"
                style={{ background: item.color + '08' }}
              >
                {image ? (
                  <img src={image} alt="" className="h-5 w-5 object-contain" loading="lazy" />
                ) : (
                  <Icon size={14} style={{ color: item.color }} />
                )}
                <span className="text-xs font-medium text-white/60">{item.name}</span>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
