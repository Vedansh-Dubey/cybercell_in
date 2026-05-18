export interface SeoMeta {
  title: string
  description: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  canonicalUrl?: string
  articleDate?: string
  articleAuthor?: string
  articleTags?: string[]
}

const SITE_NAME = 'Cybercell.in'
const SITE_URL = 'https://cybercell.in'
const DEFAULT_OG_IMAGE = '/og-default.png'
const DEFAULT_DESCRIPTION =
  'Cybercell is operated by Vibhum Dubey — ethical hacker, bug bounty hunter, and penetration testing specialist. Expert in red teaming, advanced threat analytics, cyber threat hunting, and vulnerability assessment.'

export function buildMeta(partial: Partial<SeoMeta> & { title: string }): SeoMeta {
  return {
    title: `${partial.title} · ${SITE_NAME}`,
    description: partial.description ?? DEFAULT_DESCRIPTION,
    ogTitle: partial.ogTitle ?? partial.title,
    ogDescription: partial.ogDescription ?? partial.description ?? DEFAULT_DESCRIPTION,
    ogImage: partial.ogImage ?? DEFAULT_OG_IMAGE,
    ogType: partial.ogType ?? 'website',
    canonicalUrl: partial.canonicalUrl ?? SITE_URL,
    articleDate: partial.articleDate,
    articleAuthor: partial.articleAuthor,
    articleTags: partial.articleTags,
  }
}

export function buildBlogMeta(post: {
  title: string
  excerpt: string
  date: string
  author: string
  tags: string[]
  coverImage?: string
  slug: string
}): SeoMeta {
  return buildMeta({
    title: post.title,
    description: post.excerpt,
    ogType: 'article',
    ogImage: post.coverImage ?? DEFAULT_OG_IMAGE,
    canonicalUrl: `${SITE_URL}/blog/${post.slug}`,
    articleDate: post.date,
    articleAuthor: post.author,
    articleTags: post.tags,
  })
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Cybercell.in',
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  founder: {
    '@type': 'Person',
    name: 'Vibhum Dubey',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@cybercell.in',
    contactType: 'customer service',
  },
}

export function buildArticleSchema(post: {
  title: string
  excerpt: string
  date: string
  author: string
  slug: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    url: `${SITE_URL}/blog/${post.slug}`,
  }
}
