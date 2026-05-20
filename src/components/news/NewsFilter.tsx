type NewsTab = 'all' | 'news' | 'blog'

interface NewsFilterProps {
  tab: NewsTab
  onTabChange: (tab: NewsTab) => void
}

export function NewsFilter({ tab, onTabChange }: NewsFilterProps) {
  return (
    <div className="tabs" role="tablist" style={{ marginBottom: 32 }}>
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
  )
}
