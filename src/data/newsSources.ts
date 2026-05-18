import type { NewsSource } from '../types/news'

export const NEWS_SOURCES: NewsSource[] = [
  // India-first sources
  {
    name: 'The Hacker News',
    slug: 'hackernews',
    url: 'https://feeds.feedburner.com/TheHackersNews',
    category: 'threat-intel',
    color: '#22c55e',
  },
  {
    name: 'Bleeping Computer',
    slug: 'bleeping',
    url: 'https://www.bleepingcomputer.com/feed/',
    category: 'threat-intel',
    color: '#38bdf8',
  },
  {
    name: 'Krebs on Security',
    slug: 'krebs',
    url: 'https://krebsonsecurity.com/feed/',
    category: 'threat-intel',
    color: '#1d9bf0',
  },
  {
    name: 'Dark Reading',
    slug: 'darkreading',
    url: 'https://www.darkreading.com/rss.xml',
    category: 'threat-intel',
    color: '#8b5cf6',
  },
  {
    name: 'SecurityWeek',
    slug: 'securityweek',
    url: 'https://feeds.feedburner.com/securityweek',
    category: 'threat-intel',
    color: '#f59e0b',
  },
  {
    name: 'Schneier on Security',
    slug: 'schneier',
    url: 'https://www.schneier.com/feed/atom/',
    category: 'policy',
    color: '#94a3b8',
  },
]

export const SOURCE_COLORS: Record<string, string> = Object.fromEntries(
  NEWS_SOURCES.map(s => [s.slug, s.color])
)

export const TRENDING_TAGS = [
  '#ClickFix',
  '#DigitalArrest',
  '#DPDPAct',
  '#UPIFraud',
  '#Passkeys',
  '#OSINT',
  '#BEC',
  '#Ransomware',
  '#DeepfakeVoice',
  '#SupplyChain',
  '#AIThreats',
  '#ZeroDay',
]
