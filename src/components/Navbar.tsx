import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Trophy, User, Zap, Users, BarChart3, Search, Menu, X, Github, BookOpen } from 'lucide-react';

const navLinks = [
  { to: '/', label: '首页' },
  { to: '/tutorials', label: '教程' },
  { to: '/achievements', label: '成就徽章' },
  { to: '/profile', label: '个人资料' },
  { to: '/actions', label: '自动化' },
  { to: '/community', label: '社区' },
  { to: '/visualization', label: '可视化' },
];

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(18,18,26,0.9)' : 'rgba(18,18,26,0.6)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 text-[var(--text-primary)]">
            <Github className="h-6 w-6" style={{ color: 'var(--accent-violet)' }} />
            <span className="text-base font-bold tracking-tight">Everything in GitHub</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative px-3 py-2 text-sm font-medium transition-colors duration-150"
                  style={{
                    color: isActive ? 'var(--accent-violet)' : 'var(--text-secondary)',
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                      style={{ backgroundColor: 'var(--accent-violet)' }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              to="/search"
              className="hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-[var(--text-secondary)] transition-colors duration-150 hover:text-[var(--text-primary)] md:flex"
              style={{ border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <Search className="h-4 w-4" />
              <span>搜索</span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="flex items-center justify-center rounded-lg p-2 text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)] md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6"
          style={{
            backgroundColor: 'rgba(10,10,15,0.98)',
            backdropFilter: 'blur(24px)',
          }}
        >
          {navLinks.map((link, i) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className="text-2xl font-medium transition-all duration-300"
                style={{
                  color: isActive ? 'var(--accent-violet)' : 'var(--text-primary)',
                  animationDelay: `${i * 60}ms`,
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            to="/search"
            className="mt-4 flex items-center gap-2 text-xl font-medium text-[var(--text-secondary)]"
          >
            <Search className="h-5 w-5" />
            搜索
          </Link>
        </div>
      )}
    </>
  );
}
