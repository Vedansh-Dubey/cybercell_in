import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPostBySlug } from '../lib/blog'
import type { BlogPost } from '../types/blog'
import { Icons } from '../components/ui/Icon'
import { formatDate } from '../lib/utils'

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    getPostBySlug(slug)
      .then(p => { setPost(p); setLoading(false) })
      .catch(() => setLoading(false))
  }, [slug])

  if (loading) return (
    <div style={{ padding: '80px 28px', maxWidth: 760, margin: '0 auto', color: 'var(--text-3)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
      Loading…
    </div>
  )

  if (!post) return (
    <div style={{ padding: '80px 28px', maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ color: 'var(--text-3)' }}>Article not found.</p>
      <button className="btn btn-ghost" style={{ marginTop: 16 }} onClick={() => navigate('/news')}>
        ← Back to News &amp; Blog
      </button>
    </div>
  )

  return (
    <>
      <Helmet>
        <title>{post.title} — Cybercell</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        {post.coverImage && <meta property="og:image" content={`https://cybercell.in${post.coverImage}`} />}
        <meta property="og:type" content="article" />
      </Helmet>

      {/* Narrow centred column for everything */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 clamp(16px, 5vw, 24px) clamp(64px, 10vw, 96px)' }}>

        {/* Back link */}
        <div style={{ padding: 'clamp(20px, 5vw, 32px) 0 clamp(16px, 4vw, 24px)' }}>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => navigate('/news')}
            style={{ gap: 6 }}
          >
            <Icons.arrow size={13} style={{ transform: 'rotate(180deg)' }} />
            Back to News &amp; Blog
          </button>
        </div>

        {/* Chips */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          <span className="chip ok">Featured</span>
          <span className="chip accent">Cybercell Research</span>
          <span className="chip">{post.readingTime} min read</span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 16px', color: 'var(--text-1)' }}>
          {post.title}
        </h1>

        {/* Excerpt */}
        <p style={{ fontSize: 'clamp(15px, 2.2vw, 18px)', color: 'var(--text-2)', lineHeight: 1.6, margin: '0 0 20px' }}>
          {post.excerpt}
        </p>

        {/* Byline */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 13, color: 'var(--text-3)', fontFamily: 'var(--font-mono)', flexWrap: 'wrap' }}>
          <Icons.user size={12} />
          <span>{post.author}</span>
          <span>·</span>
          <span>{formatDate(post.date)}</span>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', margin: '16px 0 0' }}>
            {post.tags.map(t => <span key={t} className="chip">#{t}</span>)}
          </div>
        )}

        {/* Cover image — below header so it doesn't dominate */}
        {post.coverImage && (
          <div style={{ margin: '32px 0', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line)' }}>
            <img
              src={post.coverImage}
              alt=""
              style={{ width: '100%', display: 'block', objectFit: 'cover' }}
            />
          </div>
        )}

        {/* Divider */}
        <div style={{ borderTop: '1px solid var(--line)', margin: post.coverImage ? '0 0 40px' : '32px 0 40px' }} />

        {/* Article body */}
        <div className="blog-prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 64, paddingTop: 32, borderTop: '1px solid var(--line)' }}>
          <button className="btn btn-ghost btn-sm" onClick={() => navigate('/news')} style={{ gap: 6 }}>
            <Icons.arrow size={13} style={{ transform: 'rotate(180deg)' }} />
            Back to News &amp; Blog
          </button>
        </div>
      </div>
    </>
  )
}
