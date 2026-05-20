import { Link } from 'react-router-dom'
import type { BlogPost } from '../../types/blog'
import { Icons } from '../ui/Icon'
import { useHoverLight } from '../../hooks/useHoverLight'
import { formatDate } from '../../lib/utils'

interface BlogFeaturedCardProps {
  post: BlogPost
  index?: number
}

const HUES = [195, 170, 215, 200]

export function BlogFeaturedCard({ post, index = 0 }: BlogFeaturedCardProps) {
  const onCardMove = useHoverLight()
  const hue = HUES[index % HUES.length]

  return (
    <Link
      to={`/news/${post.slug}`}
      className="card news-card reveal"
      onMouseMove={onCardMove}
      style={{ transitionDelay: `${Math.min(index * 20, 120)}ms`, textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <div className="thumb">
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt=""
            loading="lazy"
            decoding="async"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(800px 240px at 20% -20%, hsl(${hue} 65% 55% / 0.28), transparent 60%), linear-gradient(135deg, #0e1a2c 0%, #0b1220 100%)`,
          }}>
            <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: `hsl(${hue} 65% 65% / 0.35)` }}>
              <Icons.book size={52} />
            </div>
          </div>
        )}
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <span className="chip ok" style={{ backdropFilter: 'blur(8px)', background: 'rgba(16,185,129,0.15)' }}>
            Featured
          </span>
        </div>
      </div>
      <div className="body">
        <div className="meta-row" style={{ marginBottom: 8 }}>
          <span className="chip accent" style={{ maxWidth: 140, overflow: 'hidden' }}>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: 'block', minWidth: 0 }}>Cybercell Research</span>
          </span>
          <span>·</span>
          <span>{post.readingTime} min read</span>
          <span>·</span>
          <span>{formatDate(post.date)}</span>
        </div>
        <h3 className="card">{post.title}</h3>
        <p className="excerpt">{post.excerpt}</p>
        <div className="meta-row" style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line)' }}>
          <Icons.user size={12} />
          <span>{post.author}</span>
          <span style={{ marginLeft: 'auto', color: 'var(--accent-glow)', fontSize: 12, display: 'flex', gap: 4, alignItems: 'center' }}>
            Read article <Icons.arrow size={12} />
          </span>
        </div>
        {post.tags.length > 0 && (
          <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
            {post.tags.slice(0, 4).map(t => (
              <span key={t} className="chip">#{t}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
