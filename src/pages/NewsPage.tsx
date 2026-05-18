import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchNewsPage } from '../lib/news'
import { NewsCard } from '../components/news/NewsCard'
import { NewsFilter } from '../components/news/NewsFilter'
import { NewsSkeleton } from '../components/ui/Skeleton'
import { EmptyState } from '../components/ui/EmptyState'
import { Icons } from '../components/ui/Icon'
import { buildMeta } from '../lib/seo'
import type { NewsItem } from '../types/news'

type Tab = 'all' | 'news' | 'blog'

const PAGE_SIZE = 30

export function NewsPage() {
  const [tab, setTab]           = useState<Tab>('all')
  const [category, setCategory] = useState('All')
  const [query, setQuery]       = useState('')
  const sentinelRef             = useRef<HTMLDivElement>(null)

  const meta = buildMeta({
    title: 'News — Cybercell',
    description: 'Latest threat intelligence, data breach reports, policy updates, and cybersecurity news curated by Cybercell.',
  })

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['news-infinite'],
    queryFn: ({ pageParam = 0 }) => fetchNewsPage(pageParam as number, PAGE_SIZE),
    initialPageParam: 0,
    getNextPageParam: (last) => last.hasMore ? last.page + 1 : undefined,
    staleTime: 5 * 60 * 1000,
  })

  // All items accumulated across pages
  const allItems: NewsItem[] = useMemo(
    () => data?.pages.flatMap(p => p.items) ?? [],
    [data],
  )

  // Filter on accumulated items
  const filtered = useMemo(() => {
    return allItems.filter(item => {
      if (tab === 'news' && item.source === 'Blog') return false
      if (tab === 'blog' && item.source !== 'Blog') return false
      const catMatch = category === 'All' || item.category.replace('-', ' ') === category
      const q = query.toLowerCase()
      const qMatch = !q || item.title.toLowerCase().includes(q) || item.excerpt.toLowerCase().includes(q) || item.source.toLowerCase().includes(q)
      return catMatch && qMatch
    })
  }, [allItems, tab, category, query])

  const categories = useMemo(() => {
    const set = new Set<string>()
    allItems.forEach(i => set.add(i.category.replace('-', ' ')))
    return ['All', ...Array.from(set).sort()]
  }, [allItems])

  // IntersectionObserver — load next page when sentinel enters viewport
  const onIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(onIntersect, { rootMargin: '200px' })
    observer.observe(el)
    return () => observer.disconnect()
  }, [onIntersect])

  const featured = filtered[0]
  const rest     = filtered.slice(1)

  const total = data?.pages[0]?.total ?? 0

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
          <span className="eyebrow">Threat intelligence</span>
          <h1 className="display" style={{ fontSize: 'clamp(28px, 4vw, 52px)', margin: '14px 0 16px' }}>
            What's happening in the threat landscape.
          </h1>
          <p className="lede" style={{ maxWidth: '52ch' }}>
            Curated from trusted sources. Filtered to what matters for organizations operating in India and globally.
          </p>
          {total > 0 && (
            <p className="mono tiny" style={{ color: 'var(--text-3)', marginTop: 12 }}>
              {total.toLocaleString()} articles in archive · updated twice daily
            </p>
          )}
        </div>
      </section>

      <section style={{ padding: '0 0 80px' }}>
        <div className="container">
          <NewsFilter
            tab={tab}
            onTabChange={setTab}
            category={category}
            onCategoryChange={setCategory}
            query={query}
            onQueryChange={setQuery}
            categories={categories}
          />

          {isLoading ? (
            <div className="news-grid">
              {[0, 1, 2, 3, 4, 5].map(i => <NewsSkeleton key={i} />)}
            </div>
          ) : isError ? (
            <EmptyState
              icon={<Icons.alert size={28} />}
              title="Feeds temporarily unavailable"
              description="News aggregation failed. Please try again in a moment."
              action={<button className="btn btn-ghost" onClick={() => window.location.reload()}>Retry</button>}
            />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={<Icons.search size={28} />}
              title="No results"
              description="Try a different filter or search term."
              action={
                <button className="btn btn-ghost" onClick={() => { setQuery(''); setCategory('All'); setTab('all') }}>
                  Clear filters
                </button>
              }
            />
          ) : (
            <>
              {featured && (
                <div style={{ marginBottom: 28 }}>
                  <NewsCard item={featured} index={0} featured />
                </div>
              )}
              {rest.length > 0 && (
                <div className="news-grid">
                  {rest.map((item, i) => (
                    <NewsCard key={item.id} item={item} index={i + 1} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Infinite scroll sentinel */}
          <div ref={sentinelRef} style={{ height: 1 }} />

          {isFetchingNextPage && (
            <div className="news-grid" style={{ marginTop: 20 }}>
              {[0, 1, 2].map(i => <NewsSkeleton key={i} />)}
            </div>
          )}

          {!hasNextPage && allItems.length > 0 && (
            <p className="muted" style={{ textAlign: 'center', padding: '32px 0 0', fontSize: 13 }}>
              You've reached the end · {total.toLocaleString()} articles loaded
            </p>
          )}
        </div>
      </section>
    </>
  )
}
