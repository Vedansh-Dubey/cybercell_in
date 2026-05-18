import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchAllNews } from '../../lib/news'
import { NewsCard } from '../news/NewsCard'
import { NewsSkeleton } from '../ui/Skeleton'
import { Icons } from '../ui/Icon'

export function NewsPreview() {
  const { data, isLoading } = useQuery({
    queryKey: ['news'],
    queryFn: fetchAllNews,
    staleTime: 5 * 60 * 1000,
  })

  const preview = (data?.items ?? []).slice(0, 3)

  return (
    <section style={{ padding: '80px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="eyebrow">Threat intelligence</span>
            <h2 className="section" style={{ margin: '10px 0 0' }}>Latest from the threat landscape.</h2>
          </div>
          <Link to="/news" className="btn btn-ghost" style={{ gap: 6 }}>
            All news <Icons.arrow size={14} />
          </Link>
        </div>

        {isLoading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {[0, 1, 2].map(i => <NewsSkeleton key={i} />)}
          </div>
        ) : preview.length > 0 ? (
          <div className="news-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {preview.map((item, i: number) => (
              <NewsCard key={item.id} item={item} index={i} />
            ))}
          </div>
        ) : (
          <p className="muted" style={{ textAlign: 'center', padding: '40px 0' }}>News feeds temporarily unavailable.</p>
        )}
      </div>
    </section>
  )
}
