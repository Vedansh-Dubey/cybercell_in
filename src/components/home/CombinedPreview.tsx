import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllPosts } from '../../lib/blog'
import { fetchAllNews } from '../../lib/news'
import type { BlogPost } from '../../types/blog'
import { BlogCard } from '../blog/BlogCard'
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
  })

  useEffect(() => {
    getAllPosts().then(all => {
      setPosts(all.slice(0, 3))
      setBlogLoading(false)
    })
  }, [])

  const newsItems = (newsData?.items ?? []).slice(0, 3)
  const isLoading = blogLoading || newsLoading
  const hasContent = posts.length > 0 || newsItems.length > 0

  if (!isLoading && !hasContent) return null

  return (
    <section style={{ padding: '80px 0', background: 'linear-gradient(180deg, transparent, rgba(11,15,23,0.6))' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="eyebrow">Insight &amp; intelligence</span>
            <h2 className="section" style={{ margin: '10px 0 0' }}>Perspectives from the practice.</h2>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link to="/blog" className="btn btn-ghost btn-sm" style={{ gap: 6 }}>
              All articles <Icons.arrow size={14} />
            </Link>
            <Link to="/news" className="btn btn-ghost btn-sm" style={{ gap: 6 }}>
              All news <Icons.arrow size={14} />
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="article-grid">
            {[0, 1, 2, 3, 4, 5].map(i => <NewsSkeleton key={i} />)}
          </div>
        ) : (
          <div className="article-grid">
            {posts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
            {newsItems.map((item, i) => (
              <NewsCard key={item.id} item={item} index={i} showTypeChip />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
