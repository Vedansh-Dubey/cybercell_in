import { Helmet } from 'react-helmet-async'
import { Hero } from '../components/home/Hero'
import { StatsBar } from '../components/home/StatsBar'
import { ServicesPreview } from '../components/home/ServicesPreview'
import { CombinedPreview } from '../components/home/CombinedPreview'
import { Icons } from '../components/ui/Icon'
import { buildMeta, organizationSchema } from '../lib/seo'

interface HomePageProps {
  onReport: () => void
}

export function HomePage({ onReport }: HomePageProps) {
  const meta = buildMeta({
    title: 'Cybercell — Independent Cybersecurity Practice · India',
    description: 'Cybercell is run by Vibhum Dubey — ethical hacker, bug bounty hunter, and penetration testing specialist with expertise in red teaming, advanced threat analytics, and cyber threat hunting. Recognized by Pepperfry and Acko Insurance.',
  })

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      </Helmet>

      <Hero onReport={onReport} />
      <StatsBar />
      <ServicesPreview />
      <CombinedPreview />

      {/* CTA banner */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="cta-banner reveal">
            <span className="eyebrow" style={{ color: 'var(--accent-glow)' }}>Start here</span>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 38px)', margin: '12px 0 16px', fontWeight: 600 }}>
              Have a security concern? Just reach out.
            </h2>
            <p className="muted" style={{ maxWidth: '52ch', marginBottom: 28 }}>
              You don't need a formal brief or a defined scope. Describe the situation and we'll take it from there — no sales process, no obligation.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="/contact" className="btn btn-primary btn-lg">
                Get in touch <Icons.arrow size={16} />
              </a>
              <button className="btn btn-danger-soft btn-lg" onClick={onReport}>
                <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 8px #ef4444' }} aria-hidden="true" />
                Report cyber fraud
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
