import { Icons } from '../ui/Icon'

type NewsTab = 'all' | 'news' | 'blog'

interface NewsFilterProps {
  tab: NewsTab
  onTabChange: (tab: NewsTab) => void
  category: string
  onCategoryChange: (cat: string) => void
  query: string
  onQueryChange: (q: string) => void
  categories: string[]
}

export function NewsFilter({
  tab,
  onTabChange,
  category,
  onCategoryChange,
  query,
  onQueryChange,
  categories,
}: NewsFilterProps) {
  return (
    <div>
      <div className="news-filter-row">
        <div className="tabs" role="tablist">
          {([['all', 'All'], ['news', 'News'], ['blog', 'Blog']] as [NewsTab, string][]).map(([k, l]) => (
            <button
              key={k}
              role="tab"
              aria-selected={tab === k}
              className={`tab ${tab === k ? 'active' : ''}`}
              onClick={() => onTabChange(k)}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="search" style={{ minWidth: 0, maxWidth: 380, flex: 1 }}>
          <Icons.search size={16} aria-hidden="true" />
          <input
            placeholder="Search articles, tags…"
            value={query}
            onChange={e => onQueryChange(e.target.value)}
            aria-label="Search articles"
          />
          {query && (
            <button
              onClick={() => onQueryChange('')}
              style={{ background: 'none', border: 'none', color: 'var(--text-3)', cursor: 'pointer', padding: 0 }}
              aria-label="Clear search"
            >
              <Icons.close size={14} />
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }} role="group" aria-label="Filter by category">
        {categories.map(c => (
          <button
            key={c}
            className={`pill ${category === c ? 'active' : ''}`}
            style={{ border: '1px solid', borderColor: category === c ? 'rgba(56,189,248,0.25)' : 'var(--line)' }}
            onClick={() => onCategoryChange(c)}
            aria-pressed={category === c}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}
