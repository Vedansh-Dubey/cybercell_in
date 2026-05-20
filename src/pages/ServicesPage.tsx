import { Helmet } from 'react-helmet-async'
import { SERVICES, TRUST_BANDS } from '../data/services'
import { ServiceCard } from '../components/services/ServiceCard'
import { FaqList } from '../components/services/FaqList'
import { Icons } from '../components/ui/Icon'
import { Link } from 'react-router-dom'
import { buildMeta } from '../lib/seo'

export function ServicesPage() {
  const meta = buildMeta({
    title: 'Areas of Help — Cybercell',
    description: 'Cybercell helps with penetration testing, red teaming, vulnerability assessment, threat hunting, incident response, OSINT, and more. Not a fixed service catalogue — reach out and we\'ll figure out what fits.',
  })

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
      </Helmet>

      {/* Hero */}
      <section className="page-header svc-header">
        {/* Atmospheric threat-graph — bleeds off right edge */}
        <div className="svc-header-bg" aria-hidden="true">
          <svg viewBox="0 0 600 340" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMid meet">
            <defs>
              <radialGradient id="sh-fade" cx="70%" cy="50%" r="60%">
                <stop offset="0%" stopColor="rgba(29,155,240,0.0)" />
                <stop offset="100%" stopColor="rgba(29,155,240,0.0)" />
              </radialGradient>
              <mask id="sh-mask">
                <rect width="600" height="340" fill="url(#sh-fade-mask)" />
              </mask>
              <linearGradient id="sh-fade-mask" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="black" />
                <stop offset="35%" stopColor="white" />
                <stop offset="100%" stopColor="white" />
              </linearGradient>
            </defs>

            {/* Node positions: a sparse organic graph */}
            {/* Edges first */}
            {[
              [490,170, 390,90], [490,170, 395,240], [490,170, 560,100],
              [490,170, 560,250], [390,90, 300,60], [390,90, 280,140],
              [395,240, 280,200], [395,240, 310,290], [560,100, 580,60],
              [560,250, 575,285], [300,60, 210,80], [280,140, 210,80],
              [280,140, 210,190], [280,200, 210,190], [280,200, 220,270],
              [310,290, 220,270], [210,80, 130,110], [210,190, 130,110],
              [210,190, 140,230], [220,270, 140,230],
            ].map(([x1,y1,x2,y2], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="rgba(56,189,248,0.15)" strokeWidth="1"
                mask="url(#sh-mask)" />
            ))}

            {/* Nodes */}
            {([
              [490,170, 8, 0], [390,90, 5, 1], [395,240, 5, 2],
              [560,100, 4, 3], [560,250, 4, 4], [300,60, 5, 5],
              [280,140, 5, 0], [280,200, 5, 1], [310,290, 4, 2],
              [210,80, 6, 3], [210,190, 6, 4], [220,270, 4, 5],
              [130,110, 5, 0], [140,230, 4, 1], [580,60, 3, 2],
              [575,285, 3, 3],
            ] as [number,number,number,number][]).map(([cx,cy,r,bi], i) => (
              <g key={i} mask="url(#sh-mask)">
                <circle cx={cx} cy={cy} r={r + 5}
                  fill="rgba(11,15,23,0)" stroke="rgba(56,189,248,0.18)" strokeWidth="1" />
                <circle cx={cx} cy={cy} r={r}
                  fill="rgba(11,15,23,0.9)" stroke="rgba(56,189,248,0.5)" strokeWidth="1.2" />
                <circle cx={cx} cy={cy} r={r * 0.45}
                  fill="rgba(56,189,248,0.65)"
                  className={`svc-blink-${bi}`} />
              </g>
            ))}

            {/* Central hub — bigger, glowing */}
            <g mask="url(#sh-mask)">
              <circle cx="490" cy="170" r="28"
                fill="rgba(29,155,240,0.06)" stroke="rgba(56,189,248,0.22)" strokeWidth="1" strokeDasharray="5 7"
                className="svc-ring-slow" style={{ transformOrigin: '490px 170px' }} />
              <circle cx="490" cy="170" r="18"
                fill="rgba(29,155,240,0.10)" stroke="rgba(56,189,248,0.40)" strokeWidth="1.2" />
              <circle cx="490" cy="170" r="8"
                fill="rgba(56,189,248,0.20)" />
              <circle cx="490" cy="170" r="3.5"
                fill="rgba(56,189,248,0.90)" className="svc-blink-0" />
              {/* Sweep arm on hub */}
              <line x1="490" y1="170" x2="490" y2="148"
                stroke="rgba(56,189,248,0.55)" strokeWidth="1.5" strokeLinecap="round"
                className="svc-sweep-arm" style={{ transformOrigin: '490px 170px' }} />
            </g>

            {/* Mono labels */}
            {([
              [500, 145, 'NODE-01'], [360, 82, 'SCAN'], [368, 255, 'RECON'],
              [290, 48, 'TARGET'], [265, 133, 'PIVOT'],
            ] as [number,number,string][]).map(([x,y,t], i) => (
              <text key={i} x={x} y={y} fontFamily="monospace" fontSize="7.5"
                fill="rgba(56,189,248,0.30)" letterSpacing="1.2" mask="url(#sh-mask)">{t}</text>
            ))}
          </svg>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="eyebrow">How we can help</span>
          <h1 className="display" style={{ fontSize: 'clamp(32px, 5vw, 60px)', maxWidth: '18ch', margin: '14px 0 18px' }}>
            Not a service catalogue. A conversation.
          </h1>
          <p className="lede" style={{ maxWidth: '54ch' }}>
            Cybercell doesn't operate on fixed packages or predefined deliverables. If you have a security concern — big or small — reach out and we'll figure out together what actually makes sense for your situation.
          </p>
        </div>
      </section>

      {/* Areas grid */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{ marginBottom: 32 }}>
            <span className="eyebrow">Areas we work in</span>
            <p className="muted" style={{ fontSize: 14, marginTop: 10, maxWidth: '60ch' }}>
              These are broad areas we're comfortable working in — not rigid service offerings. The scope, depth, and approach for any engagement is always shaped around your specific context.
            </p>
          </div>
          <div className="services-grid">
            {SERVICES.map((service, i) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={i}
                showVisual
              />
            ))}
          </div>
        </div>
      </section>

      {/* How it starts */}
      <section style={{ padding: '60px 0', borderTop: '1px solid var(--line)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {TRUST_BANDS.map(band => (
              <div key={band.t} className="card reveal" style={{ padding: 24 }}>
                <h4 style={{ margin: '0 0 8px', fontSize: 15 }}>{band.t}</h4>
                <p className="muted" style={{ fontSize: 13, lineHeight: 1.6 }}>{band.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — reach out */}
      <section style={{ padding: '60px 0', borderTop: '1px solid var(--line)' }}>
        <div className="container" style={{ maxWidth: 680, textAlign: 'center' }}>
          <span className="eyebrow">Start here</span>
          <h2 className="section" style={{ margin: '14px 0 16px' }}>Not sure what you need?</h2>
          <p className="muted" style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
            That's completely fine. Most people who reach out don't have a scoped brief ready — they just have a concern. Describe the situation and we'll take it from there.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg">
            Get in touch <Icons.arrow size={16} />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--line)' }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="eyebrow">Questions</span>
            <h2 className="section" style={{ margin: '12px 0 0' }}>Frequently asked.</h2>
          </div>
          <FaqList />
        </div>
      </section>
    </>
  )
}
