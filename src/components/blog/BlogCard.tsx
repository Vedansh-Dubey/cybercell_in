import { Link } from 'react-router-dom'
import type { BlogPost } from '../../types/blog'
import { Cover } from './Cover'
import { Icons } from '../ui/Icon'
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
        <div className="meta-row" style={{ marginBottom: 10 }}>
          {post.featured && <span style={{ color: '#86efac', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Featured</span>}
          {post.featured && <span style={{ color: 'var(--text-3)' }}>·</span>}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{post.readingTime} min read</span>
        </div>
        <h3 className="card">{post.title}</h3>
        <p className="excerpt">{post.excerpt}</p>
        <div className="meta-row" style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>{post.author}</span>
          <span style={{ color: 'var(--text-3)' }}>·</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>{formatDate(post.date)}</span>
          {post.tags.length > 0 && (
            <>
              <span style={{ color: 'var(--text-3)' }}>·</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {post.tags.slice(0, 2).join(', ')}
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}
