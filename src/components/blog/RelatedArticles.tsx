import { Link } from 'react-router-dom'
import type { BlogPost } from '../../types/blog'
import { formatDate } from '../../lib/utils'

interface RelatedArticlesProps {
  posts: BlogPost[]
}

export function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (posts.length === 0) return null

  return (
    <aside>
      <h5
        style={{
          fontSize: 11,
          fontFamily: 'var(--font-mono)',
          letterSpacing: '.12em',
          textTransform: 'uppercase',
          color: 'var(--text-3)',
          margin: '0 0 12px',
        }}
      >
        Related
      </h5>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {posts.map(post => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            style={{ textDecoration: 'none', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 6 }}>
              {post.tags.slice(0, 2).map(t => (
                <span key={t} className="chip" style={{ fontSize: 10 }}>{t}</span>
              ))}
            </div>
            <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.35 }}>{post.title}</div>
            <div className="mono tiny" style={{ color: 'var(--text-3)', marginTop: 4 }}>
              {post.readingTime} min · {formatDate(post.date)}
            </div>
          </Link>
        ))}
      </div>
    </aside>
  )
}
