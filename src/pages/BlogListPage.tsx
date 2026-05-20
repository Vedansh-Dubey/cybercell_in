import { useState, useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { getAllPosts } from '../lib/blog'
import type { BlogPost } from '../types/blog'
import { BlogCard } from '../components/blog/BlogCard'
import { CardSkeleton } from '../components/ui/Skeleton'
import { EmptyState } from '../components/ui/EmptyState'
import { Icons } from '../components/ui/Icon'
import { buildMeta } from '../lib/seo'

export function BlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState('All')
  const meta = buildMeta({ title: 'Blog — Cybercell', description: 'Insight and analysis from the Cybercell practice. Security research, awareness guides, threat breakdowns, and practitioner perspectives.' })

  useEffect(() => {
    getAllPosts().then(all => {
      setPosts(all)
      setLoading(false)
    })
  }, [])

  const allTags = useMemo(() => {
    const set = new Set<string>()
    posts.forEach(p => p.tags.forEach(t => set.add(t)))
    return ['All', ...Array.from(set).sort()]
  }, [posts])

  const filtered = useMemo(() => {
    return posts.filter(p => {
      const matchTag = tag === 'All' || p.tags.includes(tag)
      const q = query.toLowerCase()
      const matchQ = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q))
      return matchTag && matchQ
    })
  }, [posts, tag, query])

  const featured = filtered.find(p => p.featured) ?? filtered[0]
  const rest = filtered.filter(p => p !== featured)

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
      </Helmet>

      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Insight &amp; analysis</span>
          <h1 className="display" style={{ fontSize: 'clamp(28px, 4vw, 52px)', margin: '14px 0 18px' }}>
            Perspectives from the practice.
          </h1>
          <p className="lede" style={{ maxWidth: '52ch', marginBottom: 32 }}>
            Security research, awareness guides, threat breakdowns, and practitioner perspectives — written by Vibhum Dubey.
          </p>
          <div className="search" style={{ maxWidth: 400 }}>
            <Icons.search size={14} aria-hidden="true" />
            <input
              placeholder="Search articles, tags…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label="Search articles"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                style={{ background: 'none', border: 'none', color: 'var(--text-3)', cursor: 'pointer', padding: 0 }}
                aria-label="Clear search"
              >
                <Icons.close size={14} />
              </button>
            )}
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          <div className="pill-row" style={{ marginBottom: 40 }} role="group" aria-label="Filter by tag">
            {allTags.map(t => (
              <button
                key={t}
                className={`pill ${tag === t ? 'active' : ''}`}
                onClick={() => setTag(t)}
                aria-pressed={tag === t}
              >
                {t}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="blog-grid">
              {[0, 1, 2, 3, 4, 5].map(i => <CardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={<Icons.book size={28} />}
              title="No articles found"
              description="Try a different tag or search term."
              action={<button className="btn btn-ghost btn-sm" onClick={() => { setQuery(''); setTag('All') }}>Clear filters</button>}
            />
          ) : (
            <>
              {featured && (
                <div style={{ marginBottom: 32 }}>
                  <BlogCard post={featured} index={0} featured />
                </div>
              )}
              {rest.length > 0 && (
                <div className="blog-grid">
                  {rest.map((post, i) => (
                    <BlogCard key={post.slug} post={post} index={i + 1} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
