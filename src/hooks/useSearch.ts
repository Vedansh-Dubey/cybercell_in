import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'

interface UseSearchOptions<T> {
  keys: string[]
  threshold?: number
}

export function useSearch<T>(items: T[], options: UseSearchOptions<T>) {
  const [query, setQuery] = useState('')

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: options.keys,
        threshold: options.threshold ?? 0.3,
        includeScore: true,
      }),
    [items, options.keys, options.threshold]
  )

  const results = useMemo(() => {
    if (!query.trim()) return items
    return fuse.search(query).map(r => r.item)
  }, [query, fuse, items])

  return { query, setQuery, results }
}
