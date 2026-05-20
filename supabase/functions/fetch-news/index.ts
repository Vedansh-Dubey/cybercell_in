import { createClient } from 'npm:@supabase/supabase-js@2'
import { XMLParser } from 'npm:fast-xml-parser'

const ALLOWED_ORIGINS = ['https://cybercell.in', 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175']
const DEFAULT_PAGE_SIZE = 30
const REFRESH_INTERVAL_MS = 12 * 60 * 60 * 1000 // 12 hours

function cors(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface Article {
  url: string
  title: string
  excerpt: string
  source: string
  source_slug: string
  published_at: string
  category: string
  tags: string[]
  image_url?: string
}

// ─── RSS Feeds ────────────────────────────────────────────────────────────────

const RSS_FEEDS = [
  { name: 'The Hacker News',  slug: 'hackernews',   url: 'https://feeds.feedburner.com/TheHackersNews',                                                                                                    category: 'threat-intel', fetchOG: true,  priority: 1 },
  { name: 'Inc42',            slug: 'inc42',         url: 'https://inc42.com/feed/',                                                                                                                        category: 'india',        fetchOG: true,  priority: 2 },
  { name: 'ET Tech',          slug: 'ettech',        url: 'https://economictimes.indiatimes.com/tech/rss.cms',                                                                                              category: 'india',        fetchOG: true,  priority: 3 },
  { name: 'The Hindu Tech',   slug: 'thehindu',      url: 'https://www.thehindu.com/sci-tech/technology/feeder/default.rss',                                                                               category: 'india',        fetchOG: true,  priority: 3 },
  { name: 'Medianama',        slug: 'medianama',     url: 'https://medianama.com/feed/',                                                                                                                   category: 'india',        fetchOG: true,  priority: 3 },
  { name: 'India Cyber News', slug: 'gnews-cyber',   url: 'https://news.google.com/rss/search?q=cybersecurity+OR+%22cyber+fraud%22+OR+%22data+breach%22+india&hl=en-IN&gl=IN&ceid=IN:en',                category: 'india',        fetchOG: false, priority: 3 },
  { name: 'India AI & Tech',  slug: 'gnews-ai',      url: 'https://news.google.com/rss/search?q=%22artificial+intelligence%22+OR+deepfake+OR+%22AI+threat%22+india+tech&hl=en-IN&gl=IN&ceid=IN:en',     category: 'india',        fetchOG: false, priority: 3 },
  { name: 'India Privacy',    slug: 'gnews-dpdp',    url: 'https://news.google.com/rss/search?q=DPDP+OR+%22digital+arrest%22+OR+%22UPI+fraud%22+OR+%22cyber+crime%22+india&hl=en-IN&gl=IN&ceid=IN:en',  category: 'india',        fetchOG: false, priority: 3 },
  { name: 'Bleeping Computer',slug: 'bleeping',      url: 'https://www.bleepingcomputer.com/feed/',                                                                                                        category: 'threat-intel', fetchOG: true,  priority: 4 },
  { name: 'Krebs on Security',slug: 'krebs',         url: 'https://krebsonsecurity.com/feed/',                                                                                                             category: 'threat-intel', fetchOG: true,  priority: 4 },
  { name: 'Dark Reading',     slug: 'darkreading',   url: 'https://www.darkreading.com/rss.xml',                                                                                                           category: 'threat-intel', fetchOG: true,  priority: 4 },
  { name: 'SecurityWeek',     slug: 'securityweek',  url: 'https://feeds.feedburner.com/securityweek',                                                                                                    category: 'threat-intel', fetchOG: true,  priority: 4 },
  { name: 'CyberScoop',       slug: 'cyberscoop',    url: 'https://cyberscoop.com/feed/',                                                                                                                  category: 'threat-intel', fetchOG: true,  priority: 4 },
  { name: 'The Record',       slug: 'therecord',     url: 'https://therecord.media/feed',                                                                                                                  category: 'threat-intel', fetchOG: true,  priority: 4 },
  { name: 'Help Net Security',slug: 'helpnetsec',    url: 'https://www.helpnetsecurity.com/feed/',                                                                                                         category: 'threat-intel', fetchOG: true,  priority: 4 },
  { name: 'Ars Technica Sec', slug: 'arstechnica',   url: 'https://feeds.arstechnica.com/arstechnica/security',                                                                                           category: 'threat-intel', fetchOG: true,  priority: 4 },
]

// ─── Parsing helpers ──────────────────────────────────────────────────────────

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  isArray: (name) => name === 'item' || name === 'entry',
})

function parseDate(str: string | undefined): string {
  if (!str) return new Date().toISOString().split('T')[0]
  try { return new Date(str).toISOString().split('T')[0] } catch { return new Date().toISOString().split('T')[0] }
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>').replace(/&quot;/gi, '"').replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ').trim()
}

function cleanGNewsTitle(title: string): string {
  return title.replace(/\s+-\s+[^-]+$/, '').trim()
}

function extractImage(item: Record<string, unknown>): string | undefined {
  const media = item['media:content'] as Record<string, unknown> | undefined
  if (media?.['@_url']) return String(media['@_url'])
  const enc = item['enclosure'] as Record<string, unknown> | undefined
  if (enc?.['@_url'] && String(enc['@_url']).match(/\.(jpg|jpeg|png|webp)/i)) return String(enc['@_url'])
  const thumb = item['media:thumbnail'] as Record<string, unknown> | undefined
  if (thumb?.['@_url']) return String(thumb['@_url'])
  const desc = String(item['description'] ?? item['content:encoded'] ?? '')
  const imgMatch = desc.match(/<img[^>]+src=["']([^"']+)["']/i)
  if (imgMatch?.[1] && !imgMatch[1].includes('pixel') && !imgMatch[1].includes('spacer')) return imgMatch[1]
  return undefined
}

function isSafeUrl(url: string): boolean {
  try {
    const u = new URL(url)
    if (u.protocol !== 'https:') return false
    const h = u.hostname
    // Block loopback, link-local, and private IP ranges (RFC 1918 + APIPA + metadata endpoints)
    if (/^(localhost|127\.|0\.0\.0\.0|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|169\.254\.|::1$|\[::1\])/.test(h)) return false
    return true
  } catch { return false }
}

async function fetchOGImage(url: string): Promise<string | undefined> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(2500),
      headers: { 'User-Agent': 'cybercell.in/1.0 (+https://cybercell.in)' },
      redirect: 'error',
    })
    if (!res.ok) return undefined
    const html = await res.text()
    const match =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ??
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i) ??
      html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i) ??
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i)
    const imgUrl = match?.[1]
    if (imgUrl && isSafeUrl(imgUrl)) return imgUrl
    return undefined
  } catch { return undefined }
}

async function fetchRSSFeed(feed: typeof RSS_FEEDS[0]): Promise<Article[]> {
  try {
    const res = await fetch(feed.url, {
      signal: AbortSignal.timeout(7000),
      headers: { 'User-Agent': 'cybercell.in/1.0 (+https://cybercell.in)' },
      redirect: 'follow',
    })
    if (!res.ok) return []
    const xml = await res.text()
    const parsed = xmlParser.parse(xml)

    const items = [
      ...(parsed?.rss?.channel?.item ?? []),
      ...(parsed?.feed?.entry ?? []),
    ] as Record<string, unknown>[]

    const articles = items.slice(0, 15).map((item): Article | null => {
      const link = item['link']
      const url = typeof link === 'string'
        ? link
        : String((link as Record<string, unknown>)?.['@_href'] ?? '')
      if (!url) return null

      const rawTitle = stripHtml(String(item['title'] ?? ''))
      const title = feed.slug.startsWith('gnews-') ? cleanGNewsTitle(rawTitle) : rawTitle
      if (!title || title.length < 10) return null

      const desc = item['description'] ?? item['summary'] ?? item['content:encoded'] ?? ''
      const excerpt = stripHtml(String(desc)).slice(0, 300)
      const pubDate = String(item['pubDate'] ?? item['published'] ?? item['updated'] ?? '')

      const gnSource = item['source']
      const source = gnSource
        ? (typeof gnSource === 'string' ? gnSource : String((gnSource as Record<string, unknown>)['#text'] ?? feed.name))
        : feed.name

      return {
        url: url.trim(),
        title,
        excerpt,
        source,
        source_slug: feed.slug,
        published_at: parseDate(pubDate),
        category: feed.category,
        tags: [],
        image_url: extractImage(item),
      }
    }).filter((a): a is Article => a !== null && !a.url.includes('github.com'))

    if (feed.fetchOG) {
      const noImage = articles.filter(a => !a.image_url && isSafeUrl(a.url)).slice(0, 5)
      if (noImage.length > 0) {
        const ogImages = await Promise.all(noImage.map(a => fetchOGImage(a.url)))
        noImage.forEach((a, i) => { if (ogImages[i]) a.image_url = ogImages[i] })
      }
    }

    return articles
  } catch { return [] }
}

async function fetchNewsAPI(key: string): Promise<Article[]> {
  if (!key) return []
  const from = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  const query = '(India AND (cyber OR fraud OR "data breach" OR hacking OR ransomware OR phishing OR UPI OR CERT)) OR (cybersecurity AND (AI OR "artificial intelligence" OR deepfake OR "zero day" OR ransomware)) OR "cyber fraud India" OR "DPDP Act"'
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=30&from=${from}&apiKey=${key}`
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
    const json = await res.json()
    if (!res.ok || json.status !== 'ok' || !Array.isArray(json.articles)) return []
    return json.articles
      .filter((a: Record<string, unknown>) => !String(a.url ?? '').includes('github.com'))
      .map((a: Record<string, unknown>): Article => ({
        url: String(a.url ?? '').trim(),
        title: String(a.title ?? ''),
        excerpt: String(a.description ?? '').slice(0, 300),
        source: (a.source as Record<string, string>)?.name ?? 'NewsAPI',
        source_slug: 'newsapi',
        published_at: parseDate(String(a.publishedAt ?? '')),
        category: 'threat-intel',
        tags: [],
        image_url: a.urlToImage ? String(a.urlToImage) : undefined,
      }))
  } catch { return [] }
}

// ─── Core fetch & store ───────────────────────────────────────────────────────

async function refreshNews(supabase: ReturnType<typeof createClient>) {
  const [rssResults, newsApiArticles] = await Promise.all([
    Promise.all(RSS_FEEDS.map(fetchRSSFeed)),
    fetchNewsAPI(Deno.env.get('NEWSAPI_KEY') ?? ''),
  ])

  const fresh = [...rssResults.flat(), ...newsApiArticles]
    .filter(a => a.title.length > 10 && a.url.length > 10)

  if (fresh.length === 0) return

  // DB UNIQUE constraint on url handles all dedup — duplicates are silently ignored
  await supabase
    .from('news_articles')
    .upsert(fresh, { onConflict: 'url', ignoreDuplicates: true })
}

// ─── Main handler ─────────────────────────────────────────────────────────────

// ─── Pagination limits ────────────────────────────────────────────────────────
const MAX_PAGE = 50   // prevents deep-offset DB scans

Deno.serve(async (req) => {
  const origin = req.headers.get('origin')

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: cors(origin) })
  }

  // ── Auth: require valid Supabase anon key ──────────────────────────────────
  const expectedKey = Deno.env.get('SUPABASE_ANON_KEY')
  const authHeader  = req.headers.get('Authorization') ?? ''
  const callerKey   = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
  if (!expectedKey || callerKey !== expectedKey) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...cors(origin), 'Content-Type': 'application/json' },
    })
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  // Check when news was last fetched
  const { data: latest } = await supabase
    .from('news_articles')
    .select('fetched_at')
    .order('fetched_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  const lastFetch = latest?.fetched_at ? new Date(latest.fetched_at) : null
  const ageMs = lastFetch ? Date.now() - lastFetch.getTime() : Infinity
  const isStale = ageMs > REFRESH_INTERVAL_MS

  if (isStale) {
    if (!lastFetch) {
      // First ever run — wait so we return populated data immediately
      await refreshNews(supabase)
    } else {
      // Stale but has data — refresh in background, return current rows instantly
      // EdgeRuntime.waitUntil keeps the task alive after the response is sent
      try {
        EdgeRuntime.waitUntil(refreshNews(supabase))
      } catch {
        refreshNews(supabase).catch(() => {})
      }
    }
  }

  // Paginate from DB
  const reqUrl = new URL(req.url)
  const page   = Math.min(Math.max(0, parseInt(reqUrl.searchParams.get('page')  ?? '0')), MAX_PAGE)
  const limit  = Math.min(Math.max(1, parseInt(reqUrl.searchParams.get('limit') ?? String(DEFAULT_PAGE_SIZE))), 100)
  const offset = page * limit

  const { data, count, error } = await supabase
    .from('news_articles')
    .select('*', { count: 'exact' })
    .order('published_at', { ascending: false })
    .order('fetched_at',   { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error('fetch-news DB error:', error.message)
    return new Response(JSON.stringify({ status: 'error', message: 'Failed to load articles' }), {
      status: 500,
      headers: { ...cors(origin), 'Content-Type': 'application/json' },
    })
  }

  const total = count ?? 0
  const articles = (data ?? []).map(row => ({
    id:         row.id,
    title:      row.title,
    excerpt:    row.excerpt,
    url:        row.url,
    source:     row.source,
    sourceSlug: row.source_slug,
    date:       row.published_at,
    category:   row.category,
    tags:       row.tags ?? [],
    imageUrl:   row.image_url,
  }))

  return new Response(JSON.stringify({
    status:  'ok',
    articles,
    page,
    total,
    hasMore:   offset + limit < total,
    lastFetch: lastFetch?.toISOString() ?? null,
    refreshed: isStale,
  }), {
    headers: { ...cors(origin), 'Content-Type': 'application/json' },
  })
})
