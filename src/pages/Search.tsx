import { useState, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router';
import {
  Search,
  X,
  Star,
  GitFork,
  CircleDot,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  SearchX,
  Check,
} from 'lucide-react';
import { allRepos, type Repo } from '../data/repos';

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */
const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];
const easeSpring = [0.34, 1.56, 0.64, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/*  Extended repo data — add repos mentioned in design that are not   */
/*  in allRepos, and normalize category names for display             */
/* ------------------------------------------------------------------ */

const categoryDisplayNames: Record<string, string> = {
  achievements: '成就徽章',
  profile: '个人资料',
  actions: '自动化',
  community: '社区',
  visualization: '可视化',
};

const categoryColors: Record<string, string> = {
  achievements: '#F59E0B',
  profile: '#8B5CF6',
  actions: '#10B981',
  community: '#06B6D4',
  visualization: '#F43F5E',
};

const extraRepos: Repo[] = [
  {
    id: 201,
    name: 'GitHub-Achievements',
    owner: 'drknzz',
    fullName: 'drknzz/GitHub-Achievements',
    stars: '2.9k',
    starsNum: 2900,
    category: 'achievements',
    description: '全面的 GitHub 成就徽章获取指南与攻略',
    language: 'Markdown',
  },
  {
    id: 202,
    name: 'github-achievement',
    owner: 'U7P4L-IN',
    fullName: 'U7P4L-IN/github-achievement',
    stars: '40',
    starsNum: 40,
    category: 'achievements',
    description: 'GitHub 成就徽章收集工具',
    language: 'Python',
  },
  {
    id: 203,
    name: 'github-profile-readme-generator',
    owner: 'rahuldkjain',
    fullName: 'rahuldkjain/github-profile-readme-generator',
    stars: '24.2k',
    starsNum: 24200,
    category: 'profile',
    description: '可视化生成 GitHub Profile README',
    language: 'JavaScript',
  },
  {
    id: 204,
    name: 'github-profile-views-counter',
    owner: 'antonkomarev',
    fullName: 'antonkomarev/github-profile-views-counter',
    stars: '4.9k',
    starsNum: 4900,
    category: 'profile',
    description: '追踪 GitHub 个人资料页面访问次数',
    language: 'PHP',
  },
  {
    id: 205,
    name: 'blog-post-workflow',
    owner: 'gautamkrishnar',
    fullName: 'gautamkrishnar/blog-post-workflow',
    stars: '3.4k',
    starsNum: 3400,
    category: 'profile',
    description: '自动将最新博客文章同步到 GitHub Profile',
    language: 'TypeScript',
  },
  {
    id: 206,
    name: 'action-gh-release',
    owner: 'softprops',
    fullName: 'softprops/action-gh-release',
    stars: '5.6k',
    starsNum: 5600,
    category: 'actions',
    description: 'GitHub Action 用于上传资源并创建发布',
    language: 'Rust',
  },
  {
    id: 207,
    name: 'setup-node',
    owner: 'actions',
    fullName: 'actions/setup-node',
    stars: '4.8k',
    starsNum: 4800,
    category: 'actions',
    description: '设置 Node.js 环境的 GitHub Action',
    language: 'TypeScript',
  },
  {
    id: 208,
    name: 'release-drafter',
    owner: 'release-drafter',
    fullName: 'release-drafter/release-drafter',
    stars: '3.9k',
    starsNum: 3900,
    category: 'actions',
    description: '自动起草发布说明的 GitHub Action',
    language: 'JavaScript',
  },
  {
    id: 209,
    name: 'github-pages-deploy-action',
    owner: 'JamesIves',
    fullName: 'JamesIves/github-pages-deploy-action',
    stars: '4.6k',
    starsNum: 4600,
    category: 'actions',
    description: '自动部署到 GitHub Pages 的 Action',
    language: 'TypeScript',
  },
  {
    id: 210,
    name: 'labeler',
    owner: 'actions',
    fullName: 'actions/labeler',
    stars: '2.4k',
    starsNum: 2400,
    category: 'actions',
    description: '根据文件路径自动添加 PR 标签',
    language: 'TypeScript',
  },
  {
    id: 211,
    name: 'stale',
    owner: 'actions',
    fullName: 'actions/stale',
    stars: '1.7k',
    starsNum: 1700,
    category: 'actions',
    description: '标记和关闭闲置 issue 和 PR',
    language: 'TypeScript',
  },
  {
    id: 212,
    name: 'codeql-action',
    owner: 'github',
    fullName: 'github/codeql-action',
    stars: '1.2k',
    starsNum: 1200,
    category: 'actions',
    description: 'GitHub CodeQL 代码安全分析 Action',
    language: 'TypeScript',
  },
  {
    id: 213,
    name: 'awesome-hacktoberfest',
    owner: 'OtacilioN',
    fullName: 'OtacilioN/awesome-hacktoberfest',
    stars: '864',
    starsNum: 864,
    category: 'community',
    description: 'Hacktoberfest 参与指南和精选仓库列表',
    language: 'Markdown',
  },
  {
    id: 214,
    name: 'Awesome-GitHub-Repositories',
    owner: 'avinash201199',
    fullName: 'avinash201199/Awesome-GitHub-Repositories',
    stars: '513',
    starsNum: 513,
    category: 'community',
    description: '精选的 GitHub 仓库合集',
    language: 'Markdown',
  },
  {
    id: 215,
    name: 'oss-fund-directory',
    owner: 'oss-fund',
    fullName: 'oss-fund/directory',
    stars: '85',
    starsNum: 85,
    category: 'community',
    description: '开源项目资金目录',
    language: 'JavaScript',
  },
  {
    id: 216,
    name: 'github-trending-archive',
    owner: 'antonkomarev',
    fullName: 'antonkomarev/github-trending-archive',
    stars: '37',
    starsNum: 37,
    category: 'community',
    description: 'GitHub Trending 历史归档',
    language: 'PHP',
  },
  {
    id: 217,
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
    id: 218,
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
    id: 219,
    name: 'github-profile-summary-cards',
    owner: 'vn7n24fzkq',
    fullName: 'vn7n24fzkq/github-profile-summary-cards',
    stars: '3.5k',
    starsNum: 3500,
    category: 'visualization',
    description: '语言分布饼图 + 提交时间热力图',
    language: 'TypeScript',
  },
  {
    id: 220,
    name: 'metrics',
    owner: 'lowlighter',
    fullName: 'lowlighter/metrics',
    stars: '16.6k',
    starsNum: 16600,
    category: 'profile',
    description: '高度定制化的 GitHub 信息图表生成工具，30+ 插件',
    language: 'JavaScript',
  },
  {
    id: 221,
    name: 'github-readme-stats',
    owner: 'anuraghazra',
    fullName: 'anuraghazra/github-readme-stats',
    stars: '79.3k',
    starsNum: 79300,
    category: 'visualization',
    description: '动态生成 GitHub 统计卡片和 Top Languages 卡片',
    language: 'JavaScript',
  },
];

const reposDB = [...allRepos, ...extraRepos];
// deduplicate
const uniqueRepos = reposDB.filter(
  (repo, index, self) => index === self.findIndex((r) => r.fullName === repo.fullName)
);

/* ------------------------------------------------------------------ */
/*  Filter types                                                       */
/* ------------------------------------------------------------------ */
type CategoryFilter = 'all' | 'achievements' | 'profile' | 'actions' | 'community' | 'visualization';
type StarsFilter = 'all' | '1k' | '5k' | '10k' | '50k';
type SortOption = 'default' | 'stars-desc' | 'stars-asc' | 'name-asc' | 'name-desc';
type LanguageFilter = string; // 'all' | language name

const PAGE_SIZE = 12;

/* ------------------------------------------------------------------ */
/*  Repository Card                                                    */
/* ------------------------------------------------------------------ */
function RepoCard({ repo }: { repo: Repo }) {
  const accent = categoryColors[repo.category] ?? '#8B5CF6';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: easeOutExpo }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group flex flex-col gap-3 rounded-xl p-5"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="break-all font-mono text-sm" style={{ color: 'var(--accent-cyan)' }}>
          {repo.fullName}
        </span>
        <span
          className="flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
          style={{ backgroundColor: 'rgba(245,158,11,0.1)', color: 'var(--accent-amber)' }}
        >
          <Star className="h-3 w-3" />
          {repo.stars}
        </span>
      </div>
      <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
        {repo.description}
      </p>
      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 text-xs" style={{ color: 'var(--text-tertiary)' }}>
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
        <span
          className="rounded-full px-2 py-0.5 text-[10px]"
          style={{ backgroundColor: `${accent}18`, color: accent }}
        >
          {categoryDisplayNames[repo.category] ?? repo.category}
        </span>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Checkbox component                                                  */
/* ------------------------------------------------------------------ */
function CheckboxItem({
  checked,
  onChange,
  label,
  dotColor,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  dotColor?: string;
}) {
  return (
    <button
      onClick={onChange}
      className="flex w-full items-center gap-2.5 py-1.5 text-left transition-colors"
    >
      <div
        className="flex h-4 w-4 shrink-0 items-center justify-center rounded transition-colors"
        style={{
          backgroundColor: checked ? 'var(--accent-violet)' : 'var(--bg-tertiary)',
          border: `1px solid ${checked ? 'var(--accent-violet)' : 'rgba(255,255,255,0.1)'}`,
        }}
      >
        {checked && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
      </div>
      {dotColor && (
        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: dotColor }} />
      )}
      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Radio component                                                     */
/* ------------------------------------------------------------------ */
function RadioItem({
  selected,
  onChange,
  label,
}: {
  selected: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onChange}
      className="flex w-full items-center gap-2.5 py-1.5 text-left transition-colors"
    >
      <div
        className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
        style={{
          border: `2px solid ${selected ? 'var(--accent-violet)' : 'rgba(255,255,255,0.15)'}`,
        }}
      >
        {selected && (
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--accent-violet)' }} />
        )}
      </div>
      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{label}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Filter Sidebar                                                      */
/* ------------------------------------------------------------------ */
function FilterSidebar({
  category,
  setCategory,
  stars,
  setStars,
  sort,
  setSort,
  language,
  setLanguage,
  onClear,
}: {
  category: CategoryFilter;
  setCategory: (v: CategoryFilter) => void;
  stars: StarsFilter;
  setStars: (v: StarsFilter) => void;
  sort: SortOption;
  setSort: (v: SortOption) => void;
  language: LanguageFilter;
  setLanguage: (v: LanguageFilter) => void;
  onClear: () => void;
}) {
  const categories: { id: CategoryFilter; label: string; color: string }[] = [
    { id: 'all', label: '全部', color: '' },
    { id: 'achievements', label: '成就徽章', color: '#F59E0B' },
    { id: 'profile', label: '个人资料', color: '#8B5CF6' },
    { id: 'actions', label: '自动化', color: '#10B981' },
    { id: 'community', label: '社区', color: '#06B6D4' },
    { id: 'visualization', label: '可视化', color: '#F43F5E' },
  ];

  const languages = [
    { id: 'all', label: '全部', color: '' },
    { id: 'JavaScript', label: 'JavaScript', color: '#F59E0B' },
    { id: 'Python', label: 'Python', color: '#3B82F6' },
    { id: 'TypeScript', label: 'TypeScript', color: '#06B6D4' },
    { id: 'PHP', label: 'PHP', color: '#777BB4' },
    { id: 'Rust', label: 'Rust', color: '#DEA584' },
    { id: 'Shell', label: 'Shell', color: '#89E051' },
    { id: 'Markdown', label: 'Markdown', color: '#083FA1' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          筛选
        </h4>
        <button
          onClick={onClear}
          className="text-xs transition-colors hover:opacity-80"
          style={{ color: 'var(--accent-violet)' }}
        >
          清除全部
        </button>
      </div>

      {/* Category filter */}
      <div>
        <span className="mb-2 block text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>
          分类
        </span>
        <div className="flex flex-col">
          {categories.map((c) => (
            <CheckboxItem
              key={c.id}
              checked={category === c.id}
              onChange={() => setCategory(c.id)}
              label={c.label}
              dotColor={c.color || undefined}
            />
          ))}
        </div>
      </div>

      {/* Stars filter */}
      <div>
        <span className="mb-2 block text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>
          Stars
        </span>
        <div className="flex flex-col">
          {(['all', '1k', '5k', '10k', '50k'] as StarsFilter[]).map((s) => (
            <RadioItem
              key={s}
              selected={stars === s}
              onChange={() => setStars(s)}
              label={s === 'all' ? '全部' : `${s}+`}
            />
          ))}
        </div>
      </div>

      {/* Sort */}
      <div>
        <span className="mb-2 block text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>
          排序
        </span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="w-full rounded-lg px-3 py-2 text-sm outline-none transition-colors"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid rgba(255,255,255,0.06)',
            color: 'var(--text-secondary)',
          }}
        >
          <option value="default">默认</option>
          <option value="stars-desc">Stars 最多</option>
          <option value="stars-asc">Stars 最少</option>
          <option value="name-asc">名称 A-Z</option>
          <option value="name-desc">名称 Z-A</option>
        </select>
      </div>

      {/* Language filter */}
      <div>
        <span className="mb-2 block text-xs font-medium" style={{ color: 'var(--text-tertiary)' }}>
          主要语言
        </span>
        <div className="flex flex-col">
          {languages.map((l) => (
            <CheckboxItem
              key={l.id}
              checked={language === l.id}
              onChange={() => setLanguage(l.id)}
              label={l.label}
              dotColor={l.color || undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile filter drawer                                               */
/* ------------------------------------------------------------------ */
function MobileFilterDrawer({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={onClose}
          />
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.3, ease: easeOutExpo }}
            className="fixed left-0 top-0 z-50 h-full w-[300px] overflow-y-auto p-6"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <button
              onClick={onClose}
              className="mb-6 flex items-center gap-1 text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              <X className="h-4 w-4" />
              关闭
            </button>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Empty State                                                        */
/* ------------------------------------------------------------------ */
function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: easeOutExpo }}
      className="flex flex-col items-center py-20"
    >
      <SearchX className="mb-4 h-16 w-16" style={{ color: 'var(--text-muted)' }} />
      <h3 className="mb-2 text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
        没有找到匹配的结果
      </h3>
      <p className="mb-6 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
        尝试调整筛选条件或搜索其他关键词
      </p>
      <button
        onClick={onClear}
        className="rounded-full px-6 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
        style={{ backgroundColor: 'var(--accent-violet)', color: 'var(--text-primary)' }}
      >
        清除全部筛选
      </button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pagination                                                         */
/* ------------------------------------------------------------------ */
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="mt-10 flex items-center justify-center gap-2"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors disabled:cursor-not-allowed"
        style={{
          backgroundColor: 'var(--bg-tertiary)',
          color: currentPage === 1 ? 'var(--text-muted)' : 'var(--text-secondary)',
        }}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors"
          style={{
            backgroundColor: p === currentPage ? 'var(--accent-violet)' : 'var(--bg-tertiary)',
            color: p === currentPage ? 'var(--text-primary)' : 'var(--text-secondary)',
          }}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors disabled:cursor-not-allowed"
        style={{
          backgroundColor: 'var(--bg-tertiary)',
          color: currentPage === totalPages ? 'var(--text-muted)' : 'var(--text-secondary)',
        }}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Search Page                                                   */
/* ------------------------------------------------------------------ */
export default function Search() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  // State
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [stars, setStars] = useState<StarsFilter>('all');
  const [sort, setSort] = useState<SortOption>('default');
  const [language, setLanguage] = useState<LanguageFilter>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Category chips
  const chipCategories = [
    { id: 'all' as CategoryFilter, label: '全部' },
    { id: 'achievements' as CategoryFilter, label: '成就徽章' },
    { id: 'profile' as CategoryFilter, label: '个人资料' },
    { id: 'actions' as CategoryFilter, label: '自动化' },
    { id: 'community' as CategoryFilter, label: '社区' },
    { id: 'visualization' as CategoryFilter, label: '可视化' },
  ];

  // Filter and sort
  const filteredRepos = useMemo(() => {
    let result = [...uniqueRepos];

    // Search query
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.owner.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.fullName.toLowerCase().includes(q)
      );
    }

    // Category
    if (category !== 'all') {
      result = result.filter((r) => r.category === category);
    }

    // Stars
    if (stars !== 'all') {
      const threshold = parseInt(stars) * 1000;
      result = result.filter((r) => r.starsNum >= threshold);
    }

    // Language
    if (language !== 'all') {
      result = result.filter((r) => r.language === language);
    }

    // Sort
    switch (sort) {
      case 'stars-desc':
        result.sort((a, b) => b.starsNum - a.starsNum);
        break;
      case 'stars-asc':
        result.sort((a, b) => a.starsNum - b.starsNum);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return result;
  }, [query, category, stars, sort, language]);

  const totalPages = Math.ceil(filteredRepos.length / PAGE_SIZE);
  const paginatedRepos = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredRepos.slice(start, start + PAGE_SIZE);
  }, [filteredRepos, currentPage]);

  // Active filter tags
  const activeFilters: { label: string; onRemove: () => void }[] = [];
  if (category !== 'all') {
    activeFilters.push({
      label: categoryDisplayNames[category] ?? category,
      onRemove: () => setCategory('all'),
    });
  }
  if (stars !== 'all') {
    activeFilters.push({
      label: `${stars}+ Stars`,
      onRemove: () => setStars('all'),
    });
  }
  if (language !== 'all') {
    activeFilters.push({
      label: language,
      onRemove: () => setLanguage('all'),
    });
  }
  if (sort !== 'default') {
    const sortLabels: Record<string, string> = {
      'stars-desc': 'Stars 最多',
      'stars-asc': 'Stars 最少',
      'name-asc': '名称 A-Z',
      'name-desc': '名称 Z-A',
    };
    activeFilters.push({
      label: sortLabels[sort] ?? sort,
      onRemove: () => setSort('default'),
    });
  }

  const clearAll = useCallback(() => {
    setQuery('');
    setCategory('all');
    setStars('all');
    setSort('default');
    setLanguage('all');
    setCurrentPage(1);
  }, []);

  // Reset page when filters change
  const handleCategoryChange = (c: CategoryFilter) => {
    setCategory(c);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-[100dvh] w-full" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* ===== Section 1: Hero ===== */}
      <section
        ref={heroRef}
        className="relative flex w-full flex-col items-center justify-center overflow-hidden"
        style={{
          minHeight: '35vh',
          maxHeight: 350,
          padding: 'clamp(2rem, 6vh, 4rem) clamp(1.5rem, 5vw, 4rem)',
        }}
      >
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <div className="relative w-full max-w-[700px] text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3 }}
            className="mb-4 block text-xs tracking-wide"
            style={{ color: 'var(--text-tertiary)' }}
          >
            首页 / 搜索
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1, ease: easeOutExpo }}
            className="text-3xl font-bold md:text-4xl"
            style={{ color: 'var(--text-primary)', marginTop: 16 }}
          >
            搜索仓库
          </motion.h2>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: easeOutExpo }}
            className="mt-8 flex w-full items-center gap-2 rounded-full px-4"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid rgba(255,255,255,0.06)',
              height: 56,
            }}
          >
            <Search className="h-5 w-5 shrink-0" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="搜索仓库、工具或主题..."
              className="flex-1 bg-transparent text-base outline-none"
              style={{ color: 'var(--text-primary)' }}
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  setCurrentPage(1);
                }}
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
              >
                <X className="h-3 w-3" style={{ color: 'var(--text-muted)' }} />
              </button>
            )}
            <button
              className="shrink-0 rounded-full px-5 py-2 text-sm font-medium"
              style={{ backgroundColor: 'var(--accent-violet)', color: 'var(--text-primary)' }}
            >
              搜索
            </button>
          </motion.div>

          {/* Category chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="mt-6 flex flex-wrap justify-center gap-2.5"
          >
            {chipCategories.map((chip, i) => (
              <motion.button
                key={chip.id}
                initial={{ opacity: 0, y: 10 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.05, duration: 0.3 }}
                onClick={() => handleCategoryChange(chip.id)}
                className="rounded-full px-4 py-2 text-xs font-medium transition-all duration-200"
                style={{
                  backgroundColor:
                    category === chip.id ? 'rgba(139,92,246,0.15)' : 'var(--bg-glass)',
                  color: category === chip.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                  border: `1px solid ${
                    category === chip.id ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.06)'
                  }`,
                }}
              >
                {chip.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Quick stats */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-5 text-xs"
            style={{ color: 'var(--text-tertiary)' }}
          >
            共收录 70+ 仓库
          </motion.p>
        </div>
      </section>

      {/* ===== Section 2: Filter Sidebar + Results ===== */}
      <section
        className="w-full"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          padding: '40px clamp(1.5rem, 5vw, 4rem)',
        }}
      >
        <div className="mx-auto flex max-w-[1200px] gap-8">
          {/* Desktop Sidebar */}
          <motion.aside
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="hidden w-[280px] shrink-0 md:block"
          >
            <div
              className="sticky top-24 rounded-xl p-5"
              style={{
                backgroundColor: 'var(--bg-glass)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <FilterSidebar
                category={category}
                setCategory={setCategory}
                stars={stars}
                setStars={setStars}
                sort={sort}
                setSort={setSort}
                language={language}
                setLanguage={setLanguage}
                onClear={clearAll}
              />
            </div>
          </motion.aside>

          {/* Mobile filter toggle */}
          <MobileFilterDrawer isOpen={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)}>
            <FilterSidebar
              category={category}
              setCategory={(c) => {
                setCategory(c);
                setCurrentPage(1);
              }}
              stars={stars}
              setStars={(s) => {
                setStars(s);
                setCurrentPage(1);
              }}
              sort={sort}
              setSort={setSort}
              language={language}
              setLanguage={(l) => {
                setLanguage(l);
                setCurrentPage(1);
              }}
              onClear={clearAll}
            />
          </MobileFilterDrawer>

          {/* Results area */}
          <div className="min-w-0 flex-1">
            {/* Mobile filter button + results header */}
            <div className="mb-6 flex items-center justify-between gap-4">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm md:hidden"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: 'var(--text-secondary)',
                }}
              >
                <SlidersHorizontal className="h-4 w-4" />
                筛选
              </button>
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                找到 {filteredRepos.length} 个结果
              </span>
            </div>

            {/* Active filter tags */}
            {activeFilters.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 flex flex-wrap gap-2"
              >
                {activeFilters.map((f) => (
                  <motion.button
                    key={f.label}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2, ease: easeSpring }}
                    onClick={f.onRemove}
                    className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: 'rgba(139,92,246,0.1)',
                      color: 'var(--accent-violet)',
                    }}
                  >
                    {f.label}
                    <X className="h-3 w-3 transition-colors hover:text-[var(--accent-rose)]" />
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Results grid */}
            {filteredRepos.length === 0 ? (
              <EmptyState onClear={clearAll} />
            ) : (
              <>
                <motion.div
                  layout
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                  <AnimatePresence mode="popLayout">
                    {paginatedRepos.map((repo) => (
                      <RepoCard key={repo.id} repo={repo} />
                    ))}
                  </AnimatePresence>
                </motion.div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
