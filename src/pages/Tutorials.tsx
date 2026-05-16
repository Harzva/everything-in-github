import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, Users, Globe, Zap, Shield, Bot, GraduationCap,
  ChevronRight, ExternalLink, MapPin, Clock, Star, FileText
} from 'lucide-react';
import Layout from '../components/Layout';
import tutorialsData from '../../data/tutorials.json';

const categoryIcons: Record<string, React.ElementType> = {
  BookOpen, Users, Globe, Zap, Shield, Bot, GraduationCap
};

export default function Tutorials() {
  type TutorialTab = 'overview' | 'tutorials' | 'certifications' | 'paths' | 'external';
  const [activeTab, setActiveTab] = useState<TutorialTab>('overview');

  const tabs = [
    { id: 'overview' as const, label: '总览', icon: BookOpen },
    { id: 'tutorials' as const, label: '教程', icon: FileText },
    { id: 'certifications' as const, label: '认证', icon: GraduationCap },
    { id: 'paths' as const, label: '学习路径', icon: MapPin },
    { id: 'external' as const, label: '外部资源', icon: ExternalLink },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '40vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(139,92,246,0.1) 50%, rgba(6,182,212,0.1) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', padding: '80px 24px 40px', width: '100%' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              <a href="#/" style={{ color: 'var(--text-muted)' }}>首页</a>
              <ChevronRight size={12} />
              <span style={{ color: 'var(--accent)' }}>教程</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '12px' }}>
              GitHub 知识地图
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '640px', lineHeight: 1.7 }}>
              从入门使用到官方认证的系统化学习路径。基于 GitHub 官方 Certifications 文档与社区指南整理。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section style={{ position: 'sticky', top: '72px', zIndex: 40, background: 'rgba(10,10,15,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', gap: '4px', overflowX: 'auto' }}>
          {tabs.map(tab => (
            <button
              type="button"
              key={tab.id}
              data-tab={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 20px',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: activeTab === tab.id ? 'var(--accent)' : 'var(--text-muted)',
                borderBottom: `2px solid ${activeTab === tab.id ? 'var(--accent)' : 'transparent'}`,
                background: 'none',
                border: 'none',
                borderBottomWidth: 2,
                borderBottomStyle: 'solid',
                borderBottomColor: activeTab === tab.id ? 'var(--accent)' : 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                transition: 'color 0.2s',
              }}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px 80px' }}>
        {activeTab === 'overview' && <OverviewTab onNavigate={setActiveTab} />}
        {activeTab === 'tutorials' && <TutorialsTab />}
        {activeTab === 'certifications' && <CertificationsTab />}
        {activeTab === 'paths' && <PathsTab />}
        {activeTab === 'external' && <ExternalTab />}
      </section>
    </Layout>
  );
}

/* ===== Overview Tab ===== */
function OverviewTab({ onNavigate }: { onNavigate: (tab: 'tutorials' | 'certifications' | 'paths' | 'external') => void }) {
  const stats = [
    { label: '官方认证', value: '5 种', color: '#10B981', icon: GraduationCap },
    { label: '使用教程', value: '20+ 篇', color: '#8B5CF6', icon: BookOpen },
    { label: '学习路径', value: '4 条', color: '#F59E0B', icon: MapPin },
    { label: '外部资源', value: '10+', color: '#06B6D4', icon: ExternalLink },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '48px' }}>
        {stats.map(s => (
          <div key={s.label} style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', textAlign: 'center' }}>
            <s.icon size={24} style={{ color: s.color, marginBottom: '8px' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Learning Flow */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px' }}>学习流程</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
          {['探索GitHub', '加入GitHub', '项目托管', '协作工作流', 'GitHub Pages', '扩展生态'].map((step, i) => (
            <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(139,92,246,0.2)', color: '#8B5CF6', fontSize: '0.75rem', fontWeight: 700 }}>{i + 1}</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{step}</span>
              {i < 5 && <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px' }}>快速导航</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: '16px' }}>
          {[
            { title: '官方认证体系', desc: '5 种 GitHub 官方认证详解', icon: GraduationCap, color: '#10B981', action: 'certifications' as const },
            { title: '使用教程', desc: '从入门到进阶的系统化教程', icon: BookOpen, color: '#8B5CF6', action: 'tutorials' as const },
            { title: '学习路径', desc: '4 条推荐学习路线', icon: MapPin, color: '#F59E0B', action: 'paths' as const },
            { title: '外部资源', desc: '社区精选教程和官方文档', icon: ExternalLink, color: '#06B6D4', action: 'external' as const },
          ].map(card => (
            <button
              type="button"
              key={card.title}
              data-tab={card.action}
              onClick={() => onNavigate(card.action)}
              style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = card.color + '40'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <card.icon size={24} style={{ color: card.color, marginBottom: '12px' }} />
              <div style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>{card.title}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{card.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '48px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px' }}>参考来源</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '16px' }}>
          {tutorialsData.referenceSources.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', color: 'var(--text-primary)', textDecoration: 'none' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <strong style={{ fontSize: '0.95rem' }}>{source.name}</strong>
                <ExternalLink size={14} style={{ color: 'var(--accent)' }} />
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{source.description}</span>
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ===== Tutorials Tab ===== */
function TutorialsTab() {
  const [activeCategory, setActiveCategory] = useState(0);
  const { categories } = tutorialsData;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '32px' }}>
        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {categories.map((cat, i) => {
            const Icon = categoryIcons[cat.icon] || BookOpen;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: activeCategory === i ? cat.color + '15' : 'transparent',
                  border: 'none',
                  color: activeCategory === i ? cat.color : 'var(--text-secondary)',
                  fontWeight: activeCategory === i ? 700 : 500,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left',
                }}
              >
                <Icon size={16} />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {(() => {
              const Icon = categoryIcons[categories[activeCategory].icon] || BookOpen;
              return <Icon size={20} style={{ color: categories[activeCategory].color }} />;
            })()}
            {categories[activeCategory].name}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {categories[activeCategory].tutorials.map((t, i) => {
              const isInternal = 'route' in t;
              const href = isInternal ? String(t.route) : `https://github.com/Harzva/everything-in-github/blob/main/${t.file}`;

              return (
                <motion.a
                  key={t.name}
                  href={href}
                  target={isInternal ? undefined : '_blank'}
                  rel={isInternal ? undefined : 'noopener noreferrer'}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    background: isInternal ? categories[activeCategory].color + '10' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isInternal ? categories[activeCategory].color + '35' : 'rgba(255,255,255,0.05)'}`,
                    borderRadius: '12px',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = categories[activeCategory].color + '60'; e.currentTarget.style.background = categories[activeCategory].color + '14'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = isInternal ? categories[activeCategory].color + '35' : 'rgba(255,255,255,0.05)'; e.currentTarget.style.background = isInternal ? categories[activeCategory].color + '10' : 'rgba(255,255,255,0.03)'; }}
                >
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '4px' }}>{t.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.description}</div>
                    {'source' in t && (
                      <div style={{ fontSize: '0.7rem', color: categories[activeCategory].color, marginTop: '6px' }}>参考：{t.source}</div>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '0.7rem', padding: '4px 10px', borderRadius: '20px', background: categories[activeCategory].color + '15', color: categories[activeCategory].color }}>{isInternal ? 'HTML' : 'MD'}</span>
                    <ExternalLink size={14} style={{ color: 'var(--text-muted)' }} />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ===== Certifications Tab ===== */
function CertificationsTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ marginBottom: '24px' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          GitHub 提供 5 种专业认证，展示你在 GitHub 技术与工作流方面的专业能力。
          <a href="https://docs.github.com/zh/get-started/showcase-your-expertise-with-github-certifications/about-github-certifications" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', marginLeft: '8px' }}>官方文档 →</a>
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px' }}>
        {tutorialsData.certifications.map((cert, i) => {
          const Icon = categoryIcons[cert.icon] || GraduationCap;
          return (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', borderLeft: `3px solid ${cert.color}` }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: cert.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} style={{ color: cert.color }} />
                </div>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 700 }}>{cert.name}</div>
                  <div style={{ fontSize: '0.7rem', color: cert.color, fontWeight: 600 }}>{cert.level}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {cert.duration}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={12} /> {cert.price}</span>
                <span style={{ fontFamily: 'monospace', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)' }}>{cert.code}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                {cert.scope.map(s => (
                  <span key={s} style={{ fontSize: '0.7rem', padding: '3px 10px', borderRadius: '20px', background: cert.color + '10', color: cert.color + 'cc' }}>{s}</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <a href={`https://github.com/Harzva/everything-in-github/blob/main/${cert.tutorialFile}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', padding: '8px 16px', borderRadius: '8px', background: cert.color + '15', color: cert.color, textDecoration: 'none', fontWeight: 600 }}>
                  查看教程
                </a>
                <a href={cert.officialLink} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.75rem', padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  官方文档 <ExternalLink size={10} />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ===== Paths Tab ===== */
function PathsTab() {
  const pathColors = ['#10B981', '#8B5CF6', '#F59E0B', '#EF4444'];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {tutorialsData.learningPaths.map((path, i) => (
          <div key={path.id} style={{ padding: '24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', borderLeft: `3px solid ${pathColors[i]}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>{path.name}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{path.description}</p>
              </div>
              <span style={{ fontSize: '0.75rem', padding: '6px 14px', borderRadius: '20px', background: pathColors[i] + '15', color: pathColors[i], fontWeight: 600 }}>
                {path.duration}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {path.steps.map((step, j) => {
                const stepLabel = 'day' in step ? step.day : 'week' in step ? step.week : step.phase;
                return (
                  <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: pathColors[i], minWidth: '50px' }}>{stepLabel}</span>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{step.topic}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {step.items.join(' / ')}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ===== External Tab ===== */
function ExternalTab() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {tutorialsData.externalResources.map((res, i) => (
          <motion.a
            key={res.name}
            href={res.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '12px',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#06B6D440'; e.currentTarget.style.background = '#06B6D408'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
          >
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '4px' }}>{res.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{res.description}</div>
              <div style={{ fontSize: '0.7rem', color: '#8B5CF6', marginTop: '4px' }}>by {res.author}</div>
            </div>
            <ExternalLink size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
