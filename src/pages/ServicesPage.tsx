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
      <section className="page-header">
        <div className="container">
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
