export type NewsCategory =
  | 'threat-intel'
  | 'data-breach'
  | 'policy'
  | 'awareness'
  | 'tools'
  | 'india'
  | 'malware'
  | 'fraud'
  | 'privacy'

export interface NewsItem {
  id: string
  title: string
  excerpt: string
  url: string
  source: string
  sourceSlug: string
  date: string
  category: NewsCategory
  tags: string[]
  imageUrl?: string
}

export interface NewsSource {
  name: string
  slug: string
  url: string
  category: NewsCategory
  color: string
}
