import type { NewsItem, NewsSource } from '../types/news'
import { deduplicateByTitle } from './utils'

function xmlText(el: Element | null, tag: string): string {
  return el?.querySelector(tag)?.textContent?.trim() ?? ''
}

function parseRssDate(dateStr: string): string {
  try {
    return new Date(dateStr).toISOString().split('T')[0]
  } catch {
    return new Date().toISOString().split('T')[0]
  }
}

export async function fetchRssFeed(source: NewsSource): Promise<NewsItem[]> {
  const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(source.url)}&count=20`

  try {
    const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(8000) })
    if (!res.ok) throw new Error(`RSS fetch failed: ${res.status}`)
    const json = await res.json()

    if (json.status !== 'ok' || !Array.isArray(json.items)) return []

    return json.items.slice(0, 20).map((item: Record<string, string>, i: number): NewsItem => ({
      id: `${source.slug}-${i}-${Date.now()}`,
      title: item.title ?? '',
      excerpt: stripHtml(item.description ?? item.content ?? '').slice(0, 280),
      url: item.link ?? '',
      source: source.name,
      sourceSlug: source.slug,
      date: parseRssDate(item.pubDate ?? ''),
      category: source.category,
      tags: [],
      imageUrl: item.enclosure ?? item.thumbnail ?? undefined,
    }))
  } catch {
    return []
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

export async function fetchMultipleFeeds(sources: NewsSource[]): Promise<{
  items: NewsItem[]
  errors: string[]
}> {
  const results = await Promise.allSettled(sources.map(s => fetchRssFeed(s)))
  const items: NewsItem[] = []
  const errors: string[] = []

  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      items.push(...result.value)
    } else {
      errors.push(sources[i].name)
    }
  })

  return {
    items: deduplicateByTitle(items).sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ),
    errors,
  }
}
