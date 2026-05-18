import matter from 'gray-matter'
import type { BlogPost, BlogFrontmatter } from '../types/blog'
import { filenameToSlug } from './utils'

// Vite glob import — all markdown files in /content/blogs/
const modules = import.meta.glob('/content/blogs/*.md', { query: '?raw', import: 'default', eager: false })

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = []

  for (const [path, loader] of Object.entries(modules)) {
    const raw = await (loader as () => Promise<string>)()
    const { data, content } = matter(raw)
    const slug = filenameToSlug(path)

    posts.push({
      ...(data as BlogFrontmatter),
      slug,
      content,
    })
  }

  // Sort newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const path = `/content/blogs/${slug}.md`
  const loader = modules[path]
  if (!loader) return null

  const raw = await (loader as () => Promise<string>)()
  const { data, content } = matter(raw)

  return {
    ...(data as BlogFrontmatter),
    slug,
    content,
  }
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
