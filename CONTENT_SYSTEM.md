# Content System

## Blog (GitHub Markdown)

### Adding a post
1. Create `/content/blogs/your-post-slug.md`
2. Add frontmatter (schema below)
3. Write markdown body
4. `git push` → Vercel redeploys → post is live at `/blog/your-post-slug`

### Frontmatter schema
```yaml
---
title: "Post Title"
excerpt: "One paragraph summary shown in cards and OpenGraph"
date: "2025-05-18"          # ISO date string
author: "Vibhum Dubey"
tags: ["phishing", "awareness"]
coverImage: "/blog-covers/your-post-slug.jpg"   # optional, Place in public/blog-covers/
featured: true               # optional, shows in hero position
readingTime: 5               # minutes
---
```

### Slug derivation
Filename → slug: `my-post-title.md` → `/blog/my-post-title`  
Use kebab-case filenames. No spaces.

### Automation
GitHub Actions can auto-generate posts:
1. Action calls AI API (Claude/GPT) to generate `.md` content
2. Action commits file to `/content/blogs/`
3. Vercel webhook triggers → new build → post live

Sample action trigger: `on: schedule: - cron: '0 9 * * MON'` (weekly)

## News System

### Sources (`src/data/newsSources.ts`)
Add/remove RSS feeds by editing the `NEWS_SOURCES` array.

```typescript
{ name: 'Krebs on Security', url: 'https://krebsonsecurity.com/feed/', category: 'threat-intel' }
```

### Categories
Normalized to: `threat-intel | data-breach | policy | awareness | tools | india`

### NewsAPI
- Key: `VITE_NEWSAPI_KEY` environment variable
- Query: `cybersecurity OR "data breach" OR "cyber attack" OR "india cyber"`
- Free tier: 100 requests/day
- Cached in sessionStorage with timestamp (5 min TTL)

### Deduplication
Fuse.js title similarity (threshold 0.2) + URL matching removes cross-source duplicates.

## Emergency Portals (`src/data/portals.ts`)
Grouped by country. India section covers all state-level cybercrime cells.  
Update `lastVerified` date when reviewing entries.

## Static Data
- Services: `src/data/services.ts`
- FAQ: `src/data/faq.ts`
- Trending tags: `src/data/trending.ts`
