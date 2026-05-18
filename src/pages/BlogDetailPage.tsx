import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPostBySlug, getRelatedPosts, extractHeadings } from '../lib/blog'
import type { BlogPost } from '../types/blog'
import { ReadingProgress } from '../components/blog/ReadingProgress'
import { TableOfContents } from '../components/blog/TableOfContents'
import { RelatedArticles } from '../components/blog/RelatedArticles'
import { Cover } from '../components/blog/Cover'
import { CardSkeleton } from '../components/ui/Skeleton'
import { Icons } from '../components/ui/Icon'
import { buildBlogMeta, buildArticleSchema } from '../lib/seo'
import { formatDate } from '../lib/utils'

const GLYPHS = [Icons.alert, Icons.bug, Icons.lock, Icons.fingerprint, Icons.network, Icons.brain, Icons.shield]
const HUES = [190, 220, 260, 170, 230, 200, 195]

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null | undefined>(undefined)
  const [related, setRelated] = useState<BlogPost[]>([])

  useEffect(() => {
    if (!slug) return
    getPostBySlug(slug).then(async p => {
      setPost(p ?? null)
      if (p) {
        const rel = await getRelatedPosts(p.slug, p.tags, 3)
        setRelated(rel)
      }
    })
  }, [slug])

  if (post === null) return <Navigate to="/blog" replace />

  if (post === undefined) {
    return (
      <div className="container" style={{ padding: '80px 0' }}>
        <CardSkeleton />
      </div>
    )
  }

  const headings = extractHeadings(post.content)
  const meta = buildBlogMeta(post)
  const articleSchema = buildArticleSchema(post)
  const postIndex = Math.abs(post.slug.charCodeAt(0)) % GLYPHS.length
  const Glyph = GLYPHS[postIndex]
  const hue = HUES[postIndex]

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
        <meta property="og:type" content="article" />
        {meta.ogImage && <meta property="og:image" content={meta.ogImage} />}
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <ReadingProgress />

      <div className="container" style={{ padding: '48px 0 80px' }}>
        {/* Back */}
        <Link to="/blog" className="btn btn-ghost btn-sm" style={{ marginBottom: 32, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Icons.arrow size={14} style={{ transform: 'rotate(180deg)' }} /> Back to blog
        </Link>

        <div className="blog-detail-grid">
          {/* Left: TOC */}
          <aside className="toc-aside">
            {headings.length > 1 && <TableOfContents headings={headings} />}
          </aside>

          {/* Center: Article */}
          <article style={{ maxWidth: 720 }}>
            {/* Cover */}
            <div style={{ marginBottom: 32, borderRadius: 12, overflow: 'hidden', aspectRatio: '16/7', position: 'relative' }}>
              <Cover
                coverImage={post.coverImage}
                hue={hue}
                glyph={<Glyph size={48} />}
                label={`Blog · ${post.tags[0] ?? 'Article'}`}
              />
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {post.tags.map(t => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>

            <h1 style={{ fontSize: 'clamp(24px, 3.5vw, 42px)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', margin: '0 0 16px' }}>
              {post.title}
            </h1>

            <div className="mono tiny" style={{ color: 'var(--text-3)', display: 'flex', gap: 16, marginBottom: 40, flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icons.user size={12} /> {post.author}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icons.calendar size={12} /> {formatDate(post.date)}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icons.clock size={12} /> {post.readingTime} min read
              </span>
            </div>

            {/* Body */}
            <div className="prose">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Share */}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginTop: 48, paddingTop: 24, borderTop: '1px solid var(--line)' }}>
              <span className="muted" style={{ fontSize: 13 }}>Share:</span>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                title="Copy link"
              >
                <Icons.copy size={13} /> Copy link
              </button>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm"
              >
                <Icons.twitter size={13} /> X / Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm"
              >
                <Icons.linkedin size={13} /> LinkedIn
              </a>
            </div>
          </article>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: 72, borderTop: '1px solid var(--line)', paddingTop: 48 }}>
            <h3 className="section" style={{ marginBottom: 24 }}>Related articles</h3>
            <RelatedArticles posts={related} />
          </div>
        )}
      </div>
    </>
  )
}
