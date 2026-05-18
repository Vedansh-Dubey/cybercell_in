import { Link } from 'react-router-dom'
import type { BlogPost } from '../../types/blog'
import { Icons } from '../ui/Icon'
import { Cover } from './Cover'
import { useHoverLight } from '../../hooks/useHoverLight'
import { formatDate } from '../../lib/utils'

interface BlogCardProps {
  post: BlogPost
  index?: number
  featured?: boolean
}

const GLYPHS = [Icons.book, Icons.fingerprint, Icons.network, Icons.brain, Icons.shield, Icons.lock]
const HUES = [195, 170, 230, 200, 185, 215]

export function BlogCard({ post, index = 0, featured = false }: BlogCardProps) {
  const onCardMove = useHoverLight()
  const GlyphIcon = GLYPHS[index % GLYPHS.length]
  const hue = HUES[index % HUES.length]

  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`card news-card reveal ${featured ? 'featured' : ''}`}
      onMouseMove={onCardMove}
      style={{ transitionDelay: `${index * 40}ms`, textDecoration: 'none', color: 'inherit' }}
    >
      <div className="thumb">
        <Cover
          label="Internal · Field Notes"
          hue={hue}
          glyph={<GlyphIcon size={featured ? 64 : 48} />}
          coverImage={post.coverImage}
        />
      </div>
      <div className="body">
        <div className="meta-row" style={{ marginBottom: 8 }}>
          {post.featured && <span className="chip ok">Featured</span>}
          <span className="chip accent">Blog</span>
          <span>·</span>
          <span>{post.readingTime} min read</span>
        </div>
        <h3 className="card">{post.title}</h3>
        <p className="excerpt">{post.excerpt}</p>
        <div className="meta-row" style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line)' }}>
          <Icons.user size={12} />
          <span>{post.author}</span>
          <span>·</span>
          <span>{formatDate(post.date)}</span>
        </div>
        {post.tags.length > 0 && (
          <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
            {post.tags.slice(0, 3).map(t => (
              <span key={t} className="chip">#{t}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
