import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchNewsPage } from '../lib/news'
import { getAllPosts } from '../lib/blog'
import { NewsCard } from '../components/news/NewsCard'
import { BlogFeaturedCard } from '../components/news/BlogFeaturedCard'
import { NewsFilter } from '../components/news/NewsFilter'
import { NewsSkeleton } from '../components/ui/Skeleton'
import { EmptyState } from '../components/ui/EmptyState'
import { Icons } from '../components/ui/Icon'
import { buildMeta } from '../lib/seo'
import type { NewsItem } from '../types/news'
import type { BlogPost } from '../types/blog'

type Tab = 'all' | 'news' | 'blog'

const PAGE_SIZE = 30

export function NewsPage() {
  const [tab, setTab] = useState<Tab>('all')
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const sentinelRef = useRef<HTMLDivElement>(null)

  const meta = buildMeta({
    title: 'News & Blog — Cybercell',
    description: 'Latest threat intelligence, research, and analysis from Cybercell — curated news and original blog posts by Vibhum Dubey.',
  })

  useEffect(() => {
    getAllPosts().then(setBlogs).catch(() => {})
  }, [])

  const { data, isLoading, isError, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['news-infinite'],
    queryFn: ({ pageParam = 0 }) => fetchNewsPage(pageParam as number, PAGE_SIZE),
    initialPageParam: 0,
    getNextPageParam: (last) => last.hasMore ? last.page + 1 : undefined,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })

  const allNewsItems: NewsItem[] = useMemo(
    () => data?.pages.flatMap(p => p.items) ?? [],
    [data],
  )

  const visibleBlogs = tab === 'news' ? [] : blogs
  const visibleNews  = tab === 'blog' ? [] : allNewsItems

  // Interleave: first 2 blogs lead, then every 3 news items → 1 blog (blog index 2, 3, 4…)
  const interleaved = useMemo(() => {
    type Item = { type: 'blog'; post: BlogPost } | { type: 'news'; item: NewsItem }
    const result: Item[] = []

    // First 2 blogs always at the top
    visibleBlogs.slice(0, 2).forEach(post => result.push({ type: 'blog', post }))

    // Remaining blogs interleaved: one after every 3 news items
    const extraBlogs = visibleBlogs.slice(2)
    let newsIdx = 0
    let extraBlogIdx = 0

    while (newsIdx < visibleNews.length || extraBlogIdx < extraBlogs.length) {
      // Add 3 news items
      for (let i = 0; i < 3 && newsIdx < visibleNews.length; i++, newsIdx++) {
        result.push({ type: 'news', item: visibleNews[newsIdx] })
      }
      // Then 1 extra blog (if any remain)
      if (extraBlogIdx < extraBlogs.length) {
        result.push({ type: 'blog', post: extraBlogs[extraBlogIdx++] })
      }
    }

    return result
  }, [visibleBlogs, visibleNews])

  const onIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) fetchNextPage()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(onIntersect, { rootMargin: '200px' })
    observer.observe(el)
    return () => observer.disconnect()
  }, [onIntersect])

  const total = data?.pages[0]?.total ?? 0
  const hasContent = visibleBlogs.length > 0 || visibleNews.length > 0

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
      </Helmet>

      <section className="page-header news-header">
        {/* Atmospheric intercept-feed — bleeds off right */}
        <div className="news-header-bg" aria-hidden="true">
          <svg viewBox="0 0 560 300" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMid meet">
            <defs>
              <linearGradient id="nh-fade" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="black" />
                <stop offset="30%" stopColor="white" />
                <stop offset="100%" stopColor="white" />
              </linearGradient>
              <mask id="nh-mask">
                <rect width="560" height="300" fill="url(#nh-fade)" />
              </mask>
              <linearGradient id="nh-line-fade" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(56,189,248,0)" />
                <stop offset="40%" stopColor="rgba(56,189,248,0.25)" />
                <stop offset="100%" stopColor="rgba(56,189,248,0.08)" />
              </linearGradient>
            </defs>

            {/* Horizontal scan lines — intercept aesthetic */}
            {[40, 72, 104, 136, 168, 200, 232, 264].map((y, i) => (
              <line key={i} x1="0" y1={y} x2="560" y2={y}
                stroke="url(#nh-line-fade)" strokeWidth={i === 4 ? 1.5 : 0.7}
                mask="url(#nh-mask)"
                opacity={i === 4 ? 0.9 : 0.5} />
            ))}

            {/* Monospaced data rows — styled like intercepted log lines */}
            {([
              [120, 55,  '0xA3F1', 'CVE-2025-4471 · RCE in OpenSSH · CVSS 9.8',    0.28],
              [120, 87,  '0xB22C', 'APT41 lateral movement observed · IN-CERT',     0.22],
              [120, 119, '0xC019', 'Phishing campaign targeting BFSI sector · active', 0.26],
              [120, 151, '0xD8A0', 'Supply chain compromise · npm pkg hijacked',    0.20],
              [120, 183, '0xE551', 'Zero-day in Ivanti Connect Secure · patch now', 0.24],
              [120, 215, '0xF3B2', 'DDoS amplification via misconfigured DNS',      0.18],
              [120, 247, '0x1A4D', 'Credential stuffing · 2.3M accounts at risk',   0.16],
            ] as [number,number,string,string,number][]).map(([x, y, id, label, op], i) => (
              <g key={i} mask="url(#nh-mask)">
                <text x={x - 72} y={y} fontFamily="monospace" fontSize="8.5"
                  fill={`rgba(56,189,248,${op + 0.08})`} letterSpacing="1">{id}</text>
                <text x={x} y={y} fontFamily="monospace" fontSize="8.5"
                  fill={`rgba(148,163,184,${op})`} letterSpacing="0.6">{label}</text>
              </g>
            ))}

            {/* Vertical cursor line — active scan */}
            <line x1="112" y1="30" x2="112" y2="270"
              stroke="rgba(56,189,248,0.30)" strokeWidth="1" strokeDasharray="3 4"
              mask="url(#nh-mask)" />

            {/* Pulse dots — live indicators */}
            {[55, 87, 119, 151].map((y, i) => (
              <circle key={i} cx="108" cy={y - 3} r="2.5"
                fill="rgba(56,189,248,0.7)"
                mask="url(#nh-mask)"
                className={`svc-blink-${i}`} />
            ))}

            {/* Header row */}
            <text x="120" y="24" fontFamily="monospace" fontSize="7.5"
              fill="rgba(56,189,248,0.35)" letterSpacing="2"
              mask="url(#nh-mask)">ID{'      '}SIGNAL{'                                           '}SEVERITY</text>
            <line x1="112" y1="29" x2="540" y2="29"
              stroke="rgba(56,189,248,0.15)" strokeWidth="0.8"
              mask="url(#nh-mask)" />
          </svg>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="eyebrow">Threat intelligence &amp; research</span>
          <h1 className="display" style={{ fontSize: 'clamp(28px, 4vw, 52px)', margin: '14px 0 16px' }}>
            News &amp; perspectives.
          </h1>
          <p className="lede" style={{ maxWidth: '52ch' }}>
            Original research and curated threat intelligence — filtered to what matters for India and beyond.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          <NewsFilter tab={tab} onTabChange={setTab} />

          {isLoading && visibleBlogs.length === 0 ? (
            <div className="news-grid">
              {[0, 1, 2, 3, 4, 5].map(i => <NewsSkeleton key={i} />)}
            </div>
          ) : isError && visibleBlogs.length === 0 ? (
            <EmptyState
              icon={<Icons.alert size={28} />}
              title="Feeds temporarily unavailable"
              description="News aggregation failed. Please try again in a moment."
              action={<button className="btn btn-ghost btn-sm" onClick={() => window.location.reload()}>Retry</button>}
            />
          ) : !hasContent ? (
            <EmptyState
              icon={<Icons.search size={28} />}
              title="No results"
              description="Switch to a different tab."
              action={<button className="btn btn-ghost btn-sm" onClick={() => setTab('all')}>Show all</button>}
            />
          ) : (
            <div className="news-grid">
              {interleaved.map((entry, i) =>
                entry.type === 'blog'
                  ? <BlogFeaturedCard key={entry.post.slug} post={entry.post} index={i} />
                  : <NewsCard key={entry.item.id} item={entry.item} index={i} />
              )}
            </div>
          )}

          <div ref={sentinelRef} style={{ height: 1 }} />

          {isFetchingNextPage && (
            <div className="news-grid" style={{ marginTop: 20 }}>
              {[0, 1, 2].map(i => <NewsSkeleton key={i} />)}
            </div>
          )}

          {!hasNextPage && allNewsItems.length > 0 && tab !== 'blog' && (
            <p className="muted" style={{ textAlign: 'center', padding: '32px 0 0', fontSize: 13 }}>
              You've reached the end · {total.toLocaleString()} news items loaded
            </p>
          )}
        </div>
      </section>
    </>
  )
}
