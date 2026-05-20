import type { NewsItem } from '../../types/news'
import { Icons } from '../ui/Icon'
import { SourceBadge } from './SourceBadge'
import { useHoverLight } from '../../hooks/useHoverLight'
import { formatDate } from '../../lib/utils'

interface NewsCardProps {
  item: NewsItem
  index?: number
  featured?: boolean
  showTypeChip?: boolean
}

const GLYPHS = [
  Icons.shield, Icons.lock,  Icons.bug,        Icons.fingerprint, Icons.network,
  Icons.brain,  Icons.alert, Icons.scan,        Icons.trending,    Icons.zap,
  Icons.layers, Icons.eye,   Icons.rss,         Icons.warning,     Icons.briefcase,
  Icons.globe,  Icons.book,  Icons.tag,         Icons.clock,       Icons.mail,
]

const SOURCE_THEMES: Record<string, { h: number; s: number }> = {
  'hackernews':   { h: 130, s: 65 },
  'inc42':        { h: 24,  s: 75 },
  'ettech':       { h: 210, s: 65 },
  'thehindu':     { h: 150, s: 55 },
  'medianama':    { h: 280, s: 60 },
  'gnews-cyber':  { h: 190, s: 60 },
  'gnews-ai':     { h: 260, s: 60 },
  'gnews-dpdp':   { h: 170, s: 55 },
  'bleeping':     { h: 205, s: 65 },
  'krebs':        { h: 215, s: 60 },
  'darkreading':  { h: 270, s: 60 },
  'securityweek': { h: 40,  s: 70 },
  'cyberscoop':   { h: 195, s: 65 },
  'therecord':    { h: 200, s: 60 },
  'helpnetsec':   { h: 230, s: 60 },
  'arstechnica':  { h: 0,   s: 65 },
  'newsapi':      { h: 200, s: 55 },
}

export function NewsCard({ item, index = 0, featured = false, showTypeChip = false }: NewsCardProps) {
  const onCardMove = useHoverLight()
  const GlyphIcon = GLYPHS[index % GLYPHS.length]
  const theme = SOURCE_THEMES[item.sourceSlug] ?? { h: 200, s: 55 }
  const { h, s } = theme

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`card news-card reveal ${featured ? 'featured' : ''}`}
      onMouseMove={onCardMove}
      style={{ transitionDelay: `${Math.min(index * 20, 120)}ms`, textDecoration: 'none', color: 'inherit', display: 'block' }}
      aria-label={item.title}
    >
      <div className="thumb">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt=""
            loading="lazy"
            decoding="async"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(800px 240px at 20% -20%, hsl(${h} ${s}% 55% / 0.28), transparent 60%), linear-gradient(135deg, #0e1a2c 0%, #0b1220 100%)`,
          }}>
            <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: `hsl(${h} ${s}% 65% / 0.35)` }}>
              <GlyphIcon size={featured ? 72 : 52} />
            </div>
            <div style={{ position: 'absolute', left: 14, top: 14, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)' }}>
              {item.source}
            </div>
          </div>
        )}
      </div>
      <div className="body">
        <div className="meta-row" style={{ marginBottom: 8 }}>
          {showTypeChip && <span className="chip">News</span>}
          <SourceBadge source={item.source} sourceSlug={item.sourceSlug} />
          <span>·</span>
          <span>{formatDate(item.date)}</span>
        </div>
        <h3 className="card">{item.title}</h3>
        <p className="excerpt">{item.excerpt}</p>
        <div className="meta-row" style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--line)' }}>
          <Icons.external size={12} />
          <span style={{ color: 'var(--accent-glow)', fontSize: 12 }}>Read original</span>
        </div>
      </div>
    </a>
  )
}
