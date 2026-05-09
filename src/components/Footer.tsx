import { Link } from 'react-router';
import { Github, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="w-full"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo + Tagline */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 text-[var(--text-primary)]">
              <Github className="h-5 w-5" style={{ color: 'var(--accent-violet)' }} />
              <span className="font-bold">Everything in GitHub</span>
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              探索 GitHub 的无限可能
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm transition-colors hover:text-[var(--accent-violet)]"
              style={{ color: 'var(--text-tertiary)' }}
            >
              <Github className="h-4 w-4" />
              GitHub 官网
            </a>
          </div>

          {/* Column 2: Category Navigation */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              分类导航
            </h4>
            <Link to="/achievements" className="text-sm transition-colors hover:text-[var(--text-primary)]" style={{ color: 'var(--text-secondary)' }}>
              成就徽章
            </Link>
            <Link to="/profile" className="text-sm transition-colors hover:text-[var(--text-primary)]" style={{ color: 'var(--text-secondary)' }}>
              个人资料
            </Link>
            <Link to="/actions" className="text-sm transition-colors hover:text-[var(--text-primary)]" style={{ color: 'var(--text-secondary)' }}>
              自动化
            </Link>
            <Link to="/community" className="text-sm transition-colors hover:text-[var(--text-primary)]" style={{ color: 'var(--text-secondary)' }}>
              社区
            </Link>
            <Link to="/visualization" className="text-sm transition-colors hover:text-[var(--text-primary)]" style={{ color: 'var(--text-secondary)' }}>
              可视化
            </Link>
          </div>

          {/* Column 3: Resources */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              资源链接
            </h4>
            <a
              href="#"
              className="flex items-center gap-1 text-sm transition-colors hover:text-[var(--text-primary)]"
              style={{ color: 'var(--text-secondary)' }}
            >
              关于项目
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="#"
              className="flex items-center gap-1 text-sm transition-colors hover:text-[var(--text-primary)]"
              style={{ color: 'var(--text-secondary)' }}
            >
              贡献指南
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://docs.github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm transition-colors hover:text-[var(--text-primary)]"
              style={{ color: 'var(--text-secondary)' }}
            >
              GitHub 官方文档
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://docs.github.com/en/rest"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm transition-colors hover:text-[var(--text-primary)]"
              style={{ color: 'var(--text-secondary)' }}
            >
              API 参考
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          {/* Column 4: Stats */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              统计数据
            </h4>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--text-secondary)' }}>收录仓库</span>
                <span className="font-semibold" style={{ color: 'var(--accent-violet)' }}>70+</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--text-secondary)' }}>Stars 总数</span>
                <span className="font-semibold" style={{ color: 'var(--accent-emerald)' }}>110k+</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: 'var(--text-secondary)' }}>最后更新</span>
                <span style={{ color: 'var(--text-tertiary)' }}>2025-01</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 flex flex-col items-center justify-between gap-2 border-t pt-6 text-center text-xs sm:flex-row sm:text-left"
          style={{ borderColor: 'rgba(255,255,255,0.06)', color: 'var(--text-tertiary)' }}
        >
          <span>2025 Everything in GitHub</span>
          <span>
            Made with <span style={{ color: 'var(--accent-rose)' }}>&hearts;</span> for the GitHub community
          </span>
        </div>
      </div>
    </footer>
  );
}
