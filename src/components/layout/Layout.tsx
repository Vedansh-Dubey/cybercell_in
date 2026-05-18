import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { useReveal } from '../../hooks/useReveal'

interface LayoutProps {
  children: ReactNode
  onReport: () => void
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export function Layout({ children, onReport }: LayoutProps) {
  useReveal()
  return (
    <>
      <ScrollToTop />
      <div className="bg-atmosphere" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />
      <div className="app">
        <Navbar onReport={onReport} />
        <main id="main-content" style={{ flex: 1, position: 'relative', zIndex: 1 }}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
