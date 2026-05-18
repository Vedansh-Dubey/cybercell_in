import { Link } from 'react-router-dom'
import { Topology } from '../layout/Topology'
import { Icons } from '../ui/Icon'

interface HeroProps {
  onReport: () => void
}

export function Hero({ onReport }: HeroProps) {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="container">
        <div className="hero-inner">
          <div className="reveal in">
            <span className="eyebrow">Cybersecurity awareness · India</span>
            <h1 className="display" id="hero-heading">
              The threat landscape is real. Are you prepared?
            </h1>
            <p className="lede" style={{ fontSize: 18, maxWidth: '56ch' }}>
              Cyber fraud, data breaches, phishing, and ransomware affect individuals and
              organizations every day. Understanding your digital risk is the first step to
              staying protected — and it starts with the right guidance.
            </p>
            <div className="hero-actions">
              <Link to="/services" className="btn btn-primary btn-lg">
                How we can help <span className="arrow">→</span>
              </Link>
              <Link to="/news" className="btn btn-ghost btn-lg">
                Latest threat news
              </Link>
              <button className="btn btn-danger-soft btn-lg" onClick={onReport}>
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
                Report cyber fraud
              </button>
            </div>
          </div>
          <div className="reveal in">
            <Topology />
          </div>
        </div>
      </div>
    </section>
  )
}
