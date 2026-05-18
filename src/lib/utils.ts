import { format, parseISO } from 'date-fns'

export function formatDate(dateStr: string, fmt = 'MMM d, yyyy'): string {
  try {
    return format(parseISO(dateStr), fmt)
  } catch {
    return dateStr
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function filenameToSlug(filename: string): string {
  return filename.replace(/\.md$/, '').split('/').pop() ?? filename
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length).trimEnd() + '…'
}

export function deduplicateByTitle<T extends { title: string; url?: string }>(items: T[]): T[] {
  const seen = new Set<string>()
  return items.filter(item => {
    const key = item.url ?? item.title.toLowerCase().slice(0, 60)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}
