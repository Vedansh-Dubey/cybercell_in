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
                  className="footer-social-btn"
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
            <Link to="/services" className="footer-link">All services</Link>
            <Link to="/services" className="footer-link">Penetration testing</Link>
            <Link to="/services" className="footer-link">Incident response</Link>
            <Link to="/services" className="footer-link">OSINT investigations</Link>
            <Link to="/services" className="footer-link">Awareness training</Link>
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
            <Link to="/news" className="footer-link">News feed</Link>
            <Link to="/blog" className="footer-link">Blog</Link>
            <Link to="/news" className="footer-link">Threat intel</Link>
            <Link to="/contact" className="footer-link">Report cyber fraud</Link>
            <Link to="/contact" className="footer-link">Emergency contacts</Link>
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
            <a href="mailto:vibhum@cybercell.in" className="footer-link">vibhum@cybercell.in</a>
            <span className="footer-link" style={{ cursor: 'default' }}>+91 — on request</span>
            <span className="footer-link" style={{ cursor: 'default' }}>India · Remote worldwide</span>
            <Link to="/contact" className="footer-link">Book a consult</Link>
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
