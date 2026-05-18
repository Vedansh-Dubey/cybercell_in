# Cybercell.in — Design System

## Colors

All colors are defined as Tailwind custom tokens in `tailwind.config.ts`.

```typescript
colors: {
  bg: {
    DEFAULT: '#0b0f17',   // page background
    deep: '#070a11',      // deepest dark (footer gradient target)
  },
  surface: {
    DEFAULT: '#111827',   // card / panel
    alt: '#1f2937',       // elevated surface
    glass: 'rgba(17, 24, 39, 0.55)',  // glassmorphism overlay
  },
  accent: {
    DEFAULT: '#1d9bf0',   // primary CTA, links
    glow: '#38bdf8',      // bright cyan (eyebrow, icons)
    dim: 'rgba(29, 155, 240, 0.14)',  // icon-wrap backgrounds
  },
  line: {
    DEFAULT: 'rgba(148, 163, 184, 0.10)',  // subtle dividers
    strong: 'rgba(148, 163, 184, 0.18)',   // card borders, nav border
  },
  text: {
    DEFAULT: '#f8fafc',  // primary
    2: '#94a3b8',        // secondary / muted
    3: '#64748b',        // tertiary / meta
  },
  status: {
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
  }
}
```

## Typography

```typescript
fontFamily: {
  display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  mono: ['"JetBrains Mono"', 'ui-monospace', '"SF Mono"', 'Menlo', 'monospace'],
}
```

### Type Scale (semantic classes via @layer components)
| Class | Size | Weight | Use |
|-------|------|--------|-----|
| `.eyebrow` | 11px mono uppercase | 400 | Section labels |
| `h1.display` | clamp(40px, 6.4vw, 84px) | 500 | Hero headings |
| `h2.section` | clamp(28px, 3.4vw, 44px) | 500 | Section headings |
| `h3.card` | 19px | 500 | Card headings |
| `.lede` | 17px | 400 | Section subtext |
| `.mono.tiny` | 11-12px | 400 | Meta labels |

## Shadows
```
shadow-soft: 0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 40px -20px rgba(0,0,0,0.6)
shadow-glow: 0 0 0 1px rgba(56,189,248,0.18), 0 30px 80px -30px rgba(29,155,240,0.45)
```

## Spacing & Layout
- Max content width: `1240px`
- Container padding: `28px` (horizontal), `18px` on mobile
- Section padding: `96px 0` (tight: `64px 0`)
- Card padding: `28px` (flat variant: `22px`)

## Components

### Button variants
```
btn-primary: accent bg, dark text, glow shadow
btn-ghost: transparent, line-strong border, hover → accent tint
btn-danger-soft: danger tint bg, danger border, fecaca text
btn-sm: 8px/14px padding, 13px font
btn-lg: 16px/24px padding, 15px font
```

### Card
Background: `linear-gradient(180deg, rgba(31,41,55,0.45), rgba(17,24,39,0.45))`  
Border: `1px solid line.strong`  
Border-radius: `20px`  
Hover: border → `rgba(56,189,248,0.35)`, `translateY(-2px)`, radial glow follows cursor (`useHoverLight`)

### Chip / Badge
```
default: slate tint bg, line border, mono 11px
.chip.accent: accent text, accent tint bg
.chip.danger: red text, danger tint
.chip.warn: amber text
.chip.ok: green text
```

### Pill navigation (filter row)
Horizontal scrollable row of pill buttons. Active state: accent tint bg + border.

## Animation Keyframes (in globals.css)

| Name | Description | Duration |
|------|-------------|----------|
| `breath` | Halo opacity pulse | 6s |
| `spin` | SVG ring rotation | 60s/14s |
| `orbit-dot` | Dot orbiting center | 14s |
| `pulse-ring` | Expanding ring fade | 1.6s |
| `sweep` | Radar conic sweep | 6s |
| `sweep-h` | Horizontal light sweep | 4s |
| `blink` | Pulse dot opacity | 1.6s |
| `ping` | Ripple expand + fade | 2s |
| `float-y` | Gentle up/down | 3-4s |
| `dash` | SVG stroke-dashoffset | 4-6s |
| `drawline` | Line chart draw | 4s |
| `lure` | Phishing hook swing | 5s |
| `barscan` | Bar chart height pulse | 2.4s |
| `scanline` | Y-axis sweep | 2.6s |
| `fadein` | Opacity 0→1 | 0.2s |
| `slideup` | Y+opacity modal enter | 0.25s |
| `drawerin` | X+opacity drawer enter | 0.25s |
| `shimmer` | Skeleton loading | 1.5s |
| `spin-cw` | Clockwise rotation | varies |
| `spin-ccw` | Counter-clockwise | varies |

## Atmospheric Background
```css
/* Fixed, non-interactive, z-index: 0 */
.bg-atmosphere: dual radial gradients (accent top-right, glow bottom-left)
.bg-grid: 56px grid, radial mask (top-center visible only)
```

## Scroll Reveal
All elements with `.reveal` class fade in + slide up (`translateY(14px)→0`) when entering viewport.  
Use `useReveal()` hook in each page component.  
Add `style={{ transitionDelay: `${i*40}ms` }}` for staggered grids.

## Responsive Breakpoints
| Breakpoint | Layout changes |
|------------|---------------|
| `< 980px` | Hero 1-col, nav hamburger, grids 2-col, footer 2-col |
| `< 620px` | All grids 1-col, container padding 18px, h1 44px max |
