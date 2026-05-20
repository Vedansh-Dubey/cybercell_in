import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllPosts } from '../../lib/blog'
import { fetchAllNews } from '../../lib/news'
import type { BlogPost } from '../../types/blog'
import { BlogFeaturedCard } from '../news/BlogFeaturedCard'
import { NewsCard } from '../news/NewsCard'
import { NewsSkeleton } from '../ui/Skeleton'
import { Icons } from '../ui/Icon'

export function CombinedPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [blogLoading, setBlogLoading] = useState(true)

  const { data: newsData, isLoading: newsLoading } = useQuery({
    queryKey: ['news'],
    queryFn: fetchAllNews,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })

  useEffect(() => {
    getAllPosts()
      .then(all => setPosts(all.slice(0, 2)))
      .catch(() => {})
      .finally(() => setBlogLoading(false))
  }, [])

  const newsItems = (newsData?.items ?? []).slice(0, 4)

  if (blogLoading) {
    return (
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ marginBottom: 40 }}>
            <span className="eyebrow">Insight &amp; intelligence</span>
            <h2 className="section" style={{ margin: '10px 0 0' }}>Perspectives from the practice.</h2>
          </div>
          <div className="news-grid">
            {[0, 1, 2, 3, 4, 5].map(i => <NewsSkeleton key={i} />)}
          </div>
        </div>
      </section>
    )
  }

  if (posts.length === 0 && newsItems.length === 0 && !newsLoading) return null

  return (
    <section style={{ padding: '80px 0', background: 'linear-gradient(180deg, transparent, rgba(11,15,23,0.6))' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="eyebrow">Insight &amp; intelligence</span>
            <h2 className="section" style={{ margin: '10px 0 0' }}>Perspectives from the practice.</h2>
          </div>
          <Link to="/news" className="btn btn-ghost btn-sm" style={{ gap: 6 }}>
            All news &amp; blog <Icons.arrow size={14} />
          </Link>
        </div>

        <div className="news-grid">
          {posts.map((post, i) => (
            <BlogFeaturedCard key={post.slug} post={post} index={i} />
          ))}
          {newsLoading
            ? [0, 1, 2, 3].map(i => <NewsSkeleton key={`ns-${i}`} />)
            : newsItems.map((item, i) => (
                <NewsCard key={item.id} item={item} index={i} />
              ))
          }
        </div>
      </div>
    </section>
  )
}
