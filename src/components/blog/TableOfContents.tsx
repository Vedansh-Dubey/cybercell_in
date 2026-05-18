import { useState, useEffect } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  headings: Heading[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '0px 0px -80% 0px' }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav aria-label="Table of contents">
      <h5
        style={{
          fontSize: 11,
          fontFamily: 'var(--font-mono)',
          letterSpacing: '.12em',
          textTransform: 'uppercase',
          color: 'var(--text-3)',
          margin: '0 0 12px',
        }}
      >
        On this page
      </h5>
      {headings.map(heading => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          className={activeId === heading.id ? 'active' : ''}
          style={{
            display: 'block',
            color: activeId === heading.id ? 'var(--accent-glow)' : 'var(--text-2)',
            padding: '6px 0',
            fontSize: 13,
            cursor: 'pointer',
            textDecoration: 'none',
            borderLeft: `1px solid ${activeId === heading.id ? 'var(--accent-glow)' : 'var(--line)'}`,
            paddingLeft: heading.level === 2 ? 12 : 20,
            marginLeft: -1,
            transition: 'color .2s, border-color .2s',
          }}
          onClick={e => {
            e.preventDefault()
            document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  )
}
