import { Link } from 'react-router-dom'
import { Icons } from '../ui/Icon'

export function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          {/* Brand column */}
          <div>
            <Link to="/" className="brand" style={{ marginBottom: 18, display: 'inline-flex' }}>
              <div className="brand-mark">
                <Icons.shield size={16} style={{ color: '#38bdf8' }} />
              </div>
              <div className="brand-name">
                cybercell<span className="dot">.</span>in
              </div>
            </Link>
            <p className="muted" style={{ fontSize: 14, maxWidth: '34ch' }}>
              Ethical hacking, penetration testing, and threat intelligence — operated by Vibhum Dubey. Proactive security for organizations that can't afford to be reactive.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
              {(
                [
                  ['https://linkedin.com/in/vibhum', Icons.linkedin, 'LinkedIn'],
                  ['mailto:vibhum@cybercell.in', Icons.mail, 'Email'],
                ] as const
              ).map(([href, Ic, label]) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    width: 36,
                    height: 36,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: 10,
                    border: '1px solid var(--line-2)',
                    color: 'var(--text-2)',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'color .2s, border-color .2s',
                  }}
                >
                  <Ic size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Practice column */}
          <div>
            <h5
              style={{
                fontSize: 12,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-3)',
                margin: '0 0 14px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
              }}
            >
              Practice
            </h5>
            <Link to="/services" className="footer-link" style={{ display: 'block', color: 'var(--text-2)', fontSize: 14, textDecoration: 'none', padding: '6px 0' }}>All services</Link>
            <Link to="/services" style={{ display: 'block', color: 'var(--text-2)', fontSize: 14, textDecoration: 'none', padding: '6px 0' }}>Penetration testing</Link>
            <Link to="/services" style={{ display: 'block', color: 'var(--text-2)', fontSize: 14, textDecoration: 'none', padding: '6px 0' }}>Incident response</Link>
            <Link to="/services" style={{ display: 'block', color: 'var(--text-2)', fontSize: 14, textDecoration: 'none', padding: '6px 0' }}>OSINT investigations</Link>
            <Link to="/services" style={{ display: 'block', color: 'var(--text-2)', fontSize: 14, textDecoration: 'none', padding: '6px 0' }}>Awareness training</Link>
          </div>

          {/* Resources column */}
          <div>
            <h5
              style={{
                fontSize: 12,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-3)',
                margin: '0 0 14px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
              }}
            >
              Resources
            </h5>
            <Link to="/news" style={{ display: 'block', color: 'var(--text-2)', fontSize: 14, textDecoration: 'none', padding: '6px 0' }}>News feed</Link>
            <Link to="/blog" style={{ display: 'block', color: 'var(--text-2)', fontSize: 14, textDecoration: 'none', padding: '6px 0' }}>Blog</Link>
            <Link to="/news" style={{ display: 'block', color: 'var(--text-2)', fontSize: 14, textDecoration: 'none', padding: '6px 0' }}>Threat intel</Link>
            <Link to="/contact" style={{ display: 'block', color: 'var(--text-2)', fontSize: 14, textDecoration: 'none', padding: '6px 0' }}>Report cyber fraud</Link>
            <Link to="/contact" style={{ display: 'block', color: 'var(--text-2)', fontSize: 14, textDecoration: 'none', padding: '6px 0' }}>Emergency contacts</Link>
          </div>

          {/* Contact column */}
          <div>
            <h5
              style={{
                fontSize: 12,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-3)',
                margin: '0 0 14px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
              }}
            >
              Contact
            </h5>
            <a href="mailto:vibhum@cybercell.in" style={{ display: 'block', color: 'var(--text-2)', fontSize: 14, textDecoration: 'none', padding: '6px 0' }}>vibhum@cybercell.in</a>
            <span style={{ display: 'block', color: 'var(--text-2)', fontSize: 14, padding: '6px 0' }}>+91 — on request</span>
            <span style={{ display: 'block', color: 'var(--text-2)', fontSize: 14, padding: '6px 0' }}>India · Remote worldwide</span>
            <Link to="/contact" style={{ display: 'block', color: 'var(--text-2)', fontSize: 14, textDecoration: 'none', padding: '6px 0' }}>Book a consult</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="mono">© {new Date().getFullYear()} · Cybercell · Operated by Vibhum Dubey</div>
          <div className="mono" style={{ display: 'flex', gap: 18 }}>
            <span>
              <span
                style={{
                  display: 'inline-block',
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#22c55e',
                  marginRight: 8,
                  boxShadow: '0 0 8px #22c55e',
                }}
                aria-hidden="true"
              />
              All systems operational
            </span>
            <span>v2.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
