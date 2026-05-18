# Cybercell.in — Claude Code Context

## Project Overview
Production website for **Cybercell.in** — a premium independent cybersecurity consultancy operated by a single expert, **Vibhum Dubey**.

**Design philosophy:** Premium · Modern · Trustworthy · Calm · Intelligent · Security-focused · Boutique consultancy  
**Forbidden:** Hacker aesthetics, Matrix effects, green terminal spam, neon cyberpunk, startup SaaS clichés

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Styling | TailwindCSS v3 (custom token extensions) |
| Routing | React Router v6 |
| Animations | Framer Motion + CSS keyframes for SVGs |
| Blog | GitHub Markdown (`/content/blogs/*.md`) via `import.meta.glob` |
| News | RSS + NewsAPI (free tier, `VITE_NEWSAPI_KEY`) |
| Email | Resend via Supabase Edge Function |
| Icons | Custom SVG icon component (`src/components/ui/Icon.tsx`) |
| SEO | react-helmet-async |
| Search | Fuse.js |
| Data fetching | @tanstack/react-query |

## Folder Structure
```
/
├── content/blogs/          # Markdown blog posts (add .md → push → live)
├── public/                 # Static assets (Cybercell.ico, CNAME)
├── src/
│   ├── components/
│   │   ├── ui/             # Primitives: Button, Card, Chip, Modal, Drawer, Skeleton, Icon, Toast
│   │   ├── layout/         # Navbar, Footer, Layout, Topology (SVG network visual)
│   │   ├── blog/           # BlogCard, BlogGrid, ArticleReader, TOC, ReadingProgress, RelatedArticles
│   │   ├── news/           # NewsCard, NewsGrid, SourceBadge, NewsFilter
│   │   ├── home/           # Hero, ServicesPreview, StatsBar, NewsPreview, BlogPreview
│   │   ├── services/       # ServiceCard, ServiceVisual (10 SVG animations), ServiceModal, Timeline, FaqList
│   │   └── contact/        # ContactForm, EmergencyDrawer
│   ├── pages/              # Route components (lazy-loaded)
│   ├── hooks/              # useReveal, useHoverLight, useSearch, useReadingProgress
│   ├── lib/                # blog.ts, news.ts, rss.ts, seo.ts, utils.ts
│   ├── data/               # services.ts, portals.ts, newsSources.ts, faq.ts
│   ├── types/              # blog.ts, news.ts
│   └── styles/globals.css  # Tailwind directives + CSS keyframes
├── supabase/functions/send-contact/  # Resend email edge function
├── vercel.json             # SPA rewrite rules
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Routes
| Path | Page |
|------|------|
| `/` | HomePage |
| `/services` | ServicesPage |
| `/blog` | BlogListPage |
| `/blog/:slug` | BlogDetailPage |
| `/news` | NewsPage |
| `/contact` | ContactPage |
| `*` | Redirect to `/` |

## Design System (Tailwind custom tokens)
See `DESIGN_SYSTEM.md`. Core colors:
- `bg.DEFAULT` = `#0b0f17` (deep dark background)
- `accent.DEFAULT` = `#1d9bf0` (cyan/blue primary)
- `accent.glow` = `#38bdf8` (bright cyan)
- `surface.DEFAULT` = `#111827` (card/panel background)
- Font: Space Grotesk (display), JetBrains Mono (mono)

## Blog System
Add `.md` file to `/content/blogs/` with this frontmatter:
```yaml
---
title: "Post Title"
excerpt: "One paragraph summary"
date: "2025-05-18"
author: "Vibhum Dubey"
tags: ["phishing", "awareness"]
coverImage: "/blog-covers/post-slug.jpg"
featured: true
readingTime: 5
---
```
Push to GitHub → Vercel auto-deploys → post is live.

**Automation:** GitHub Actions can generate and commit `.md` files — the Vite build picks them up automatically.

## Environment Variables
```
VITE_NEWSAPI_KEY=          # NewsAPI free tier key
VITE_SUPABASE_URL=         # Supabase project URL
VITE_SUPABASE_ANON_KEY=    # Supabase anon key
```
Supabase secrets (not in .env):
```
RESEND_API_KEY=            # Resend email sending
CONTACT_EMAIL=             # Destination for contact form
```

## Key Conventions
- All components in TypeScript
- No `any` types
- No CSS-in-JS (Tailwind classes only, extend tokens in config)
- Framer Motion for page-level animations; CSS keyframes for SVG micro-animations
- `useReveal` hook for scroll-triggered fade-in on all `.reveal` elements
- `useHoverLight` hook for cursor-tracking radial glow on cards
- Slugs derived from filename: `my-post.md` → `/blog/my-post`
- Route-based code splitting via `React.lazy` + `Suspense`
