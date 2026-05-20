import type { BlogPost, BlogFrontmatter } from '../types/blog'
import { filenameToSlug } from './utils'

const modules = import.meta.glob('/content/blogs/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

function parseFrontmatter(raw: string): { data: BlogFrontmatter; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/m)
  if (!match) return { data: {} as BlogFrontmatter, content: raw }

  const yaml = match[1]
  const content = match[2]
  const data: Record<string, unknown> = {}

  for (const line of yaml.split('\n')) {
    const colon = line.indexOf(':')
    if (colon === -1) continue
    const key = line.slice(0, colon).trim()
    const val = line.slice(colon + 1).trim()

    if (val.startsWith('[')) {
      data[key] = val
        .slice(1, -1)
        .split(',')
        .map(s => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    } else if (val === 'true') {
      data[key] = true
    } else if (val === 'false') {
      data[key] = false
    } else if (/^\d+$/.test(val)) {
      data[key] = parseInt(val, 10)
    } else {
      data[key] = val.replace(/^["']|["']$/g, '')
    }
  }

  return { data: data as unknown as BlogFrontmatter, content }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = Object.entries(modules).map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw)
    return { ...data, slug: filenameToSlug(path), content } as BlogPost
  })
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const path = `/content/blogs/${slug}.md`
  const raw = modules[path]
  if (!raw) return null
  const { data, content } = parseFrontmatter(raw)
  return { ...data, slug, content } as BlogPost
}

export async function getFeaturedPost(): Promise<BlogPost | null> {
  const posts = await getAllPosts()
  return posts.find(p => p.featured) ?? posts[0] ?? null
}

export async function getRelatedPosts(slug: string, tags: string[], limit = 3): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts
    .filter(p => p.slug !== slug)
    .sort((a, b) => {
      const aMatch = a.tags.filter(t => tags.includes(t)).length
      const bMatch = b.tags.filter(t => tags.includes(t)).length
      return bMatch - aMatch
    })
    .slice(0, limit)
}

export function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm
  const headings: { id: string; text: string; level: number }[] = []
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    headings.push({ id, text, level })
  }
  return headings
}
