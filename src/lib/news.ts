import type { NewsItem } from '../types/news'

const CACHE_KEY = 'cc_news_p0'
const CACHE_TTL = 5 * 60 * 1000 // 5 min client-side cache for page 0

interface CacheEntry {
  items: NewsItem[]
  timestamp: number
}

function readCache(): CacheEntry | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const entry: CacheEntry = JSON.parse(raw)
    if (Date.now() - entry.timestamp > CACHE_TTL) return null
    return entry
  } catch { return null }
}

function writeCache(items: NewsItem[]): void {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ items, timestamp: Date.now() }))
  } catch { /* quota exceeded */ }
}

export interface NewsPage {
  items: NewsItem[]
  page: number
  total: number
  hasMore: boolean
}

export async function fetchNewsPage(page = 0, limit = 30): Promise<NewsPage> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  if (!supabaseUrl) return { items: [], page, total: 0, hasMore: false }

  // Serve page 0 from sessionStorage cache
  if (page === 0) {
    const cached = readCache()
    if (cached) return { items: cached.items, page: 0, total: cached.items.length, hasMore: true }
  }

  try {
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
    const res = await fetch(
      `${supabaseUrl}/functions/v1/fetch-news?page=${page}&limit=${limit}`,
      {
        signal: AbortSignal.timeout(12000),
        headers: supabaseKey ? { Authorization: `Bearer ${supabaseKey}` } : {},
      },
    )
    if (!res.ok) return { items: [], page, total: 0, hasMore: false }

    const json = await res.json()
    if (json.status !== 'ok' || !Array.isArray(json.articles)) {
      return { items: [], page, total: 0, hasMore: false }
    }

    const items: NewsItem[] = (json.articles as NewsItem[]).filter(a => a.title && a.url)

    if (page === 0) writeCache(items)

    return { items, page, total: json.total ?? items.length, hasMore: json.hasMore ?? false }
  } catch {
    return { items: [], page, total: 0, hasMore: false }
  }
}

// Kept for CombinedPreview (homepage) — just fetches first page
export async function fetchAllNews(): Promise<{ items: NewsItem[]; errors: string[] }> {
  const result = await fetchNewsPage(0, 6)
  return { items: result.items, errors: [] }
}
