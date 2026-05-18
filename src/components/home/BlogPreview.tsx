import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAllPosts } from '../../lib/blog'
import type { BlogPost } from '../../types/blog'
import { BlogCard } from '../blog/BlogCard'
import { CardSkeleton } from '../ui/Skeleton'
import { Icons } from '../ui/Icon'

export function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllPosts().then(all => {
      setPosts(all.slice(0, 3))
      setLoading(false)
    })
  }, [])

  if (!loading && posts.length === 0) return null

  return (
    <section style={{ padding: '80px 0', background: 'linear-gradient(180deg, transparent, rgba(11,15,23,0.6))' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <span className="eyebrow">Insight &amp; analysis</span>
            <h2 className="section" style={{ margin: '10px 0 0' }}>Perspectives from the practice.</h2>
          </div>
          <Link to="/blog" className="btn btn-ghost" style={{ gap: 6 }}>
            All articles <Icons.arrow size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="article-grid">
            {[0, 1, 2].map(i => <CardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="article-grid">
            {posts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
