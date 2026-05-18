export interface BlogFrontmatter {
  title: string
  excerpt: string
  date: string
  author: string
  tags: string[]
  coverImage?: string
  featured?: boolean
  readingTime: number
}

export interface BlogPost extends BlogFrontmatter {
  slug: string
  content: string
}
