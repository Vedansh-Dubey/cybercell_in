import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icons } from '../ui/Icon'

interface NavbarProps {
  onReport: () => void
}

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/news', label: 'News & Blogs' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar({ onReport }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="container nav-inner">
        <Link to="/" className="brand" aria-label="Cybercell home">
          <div className="brand-mark" aria-hidden="true">
            <Icons.shield size={16} style={{ color: '#38bdf8' }} />
          </div>
          <div className="brand-name">
            cybercell<span className="dot">.</span>in
          </div>
        </Link>

        <div className="nav-links">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link ${location.pathname === to ? 'active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="nav-right">
          <button
            className="btn btn-danger-soft btn-sm"
            onClick={onReport}
            aria-label="Open emergency cyber fraud reporting"
          >
            <span
              style={{
                display: 'inline-block',
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#ef4444',
                boxShadow: '0 0 8px #ef4444',
              }}
              aria-hidden="true"
            />
            Report fraud
          </button>
          <Link to="/contact" className="btn btn-primary btn-sm hide-mobile">
            Book consult <span className="arrow">→</span>
          </Link>
          <button
            className="hamburger"
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <Icons.close size={18} /> : <Icons.menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div style={{ borderTop: '1px solid var(--line-2)', background: 'rgba(11,15,23,0.95)' }}>
          <div className="container" style={{ padding: '8px 18px 18px' }}>
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link ${location.pathname === to ? 'active' : ''}`}
                style={{ padding: '13px 4px', borderBottom: '1px solid var(--line)', display: 'block', fontSize: 15 }}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="btn btn-primary"
              style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}
            >
              Book consult <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
