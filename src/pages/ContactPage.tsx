import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { ContactForm } from '../components/contact/ContactForm'
import { Toast } from '../components/ui/Toast'
import { Icons } from '../components/ui/Icon'
import { buildMeta } from '../lib/seo'

interface ContactPageProps {
  onReport: () => void
}

export function ContactPage({ onReport }: ContactPageProps) {
  const [toast, setToast] = useState<string | null>(null)
  const meta = buildMeta({
    title: 'Contact — Cybercell',
    description: 'Get in touch with Cybercell. Security assessments, incident support, awareness training, or just a conversation about your risk surface.',
  })

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
      </Helmet>

      <section className="page-header">
        <div className="container">
          <span className="eyebrow">Get in touch</span>
          <h1 className="display" style={{ fontSize: 'clamp(28px, 4vw, 52px)', margin: '14px 0 16px' }}>
            Let's talk.
          </h1>
          <p className="lede" style={{ maxWidth: '48ch' }}>
            Whether it's an assessment, incident support, or just a question — the right place to start is a conversation.
          </p>
        </div>
      </section>

      <section style={{ padding: '0 0 64px' }}>
        <div className="container">
          <div className="contact-grid">
            {/* Left column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <ContactForm onSuccess={msg => setToast(msg)} />

              {/* Emergency card */}
              <div
                className="card flat"
                style={{ borderColor: 'rgba(239,68,68,0.25)', background: 'rgba(239,68,68,0.04)', padding: 24 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 10px #ef4444', flexShrink: 0 }} aria-hidden="true" />
                  <h4 style={{ margin: 0, fontSize: 15, color: '#fca5a5' }}>Victim of cyber fraud?</h4>
                </div>
                <p className="muted" style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
                  If money has been transferred or credentials compromised, time is critical. Use our emergency directory to reach the right authority immediately.
                </p>
                <button
                  className="btn btn-danger-soft btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={onReport}
                >
                  <Icons.alert size={14} /> Open emergency directory
                </button>
              </div>
            </div>

            {/* Right column — contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Bio card */}
              <div className="card" style={{ padding: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 20 }}>
                  {/* Photo with glowing gradient ring */}
                  <div style={{
                    width: 88,
                    height: 88,
                    borderRadius: '50%',
                    padding: 2,
                    background: 'linear-gradient(135deg, var(--accent), var(--accent-glow))',
                    flexShrink: 0,
                    boxShadow: '0 0 28px rgba(56,189,248,0.25)',
                  }}>
                    <div style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      background: '#0b0f17',
                    }}>
                      <img
                        src="/vibhum-dubey.png"
                        alt="Vibhum Dubey"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center top',
                          filter: 'contrast(1.05) brightness(0.92) saturate(0.85)',
                          display: 'block',
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 16 }}>Vibhum Dubey</div>
                    <div className="mono tiny" style={{ color: 'var(--text-3)', marginTop: 3 }}>Cybersecurity Expert · Ethical Hacker · Bug Bounty Hunter</div>
                  </div>
                </div>
                <p className="muted" style={{ fontSize: 13, lineHeight: 1.65, marginBottom: 16 }}>
                  Penetration testing specialist and ethical hacker with deep expertise in red teaming, vulnerability assessment, advanced threat analytics (ATA), and cyber threat hunting (CTH). Recognized by Pepperfry and Acko Insurance for contributions to information security.
                </p>

                {/* Achievements */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
                  {[
                    { icon: <Icons.shield size={11} />, label: 'Recognized · Pepperfry' },
                    { icon: <Icons.shield size={11} />, label: 'Recognized · Acko Insurance' },
                    { icon: <Icons.brain size={11} />, label: 'Plenary Speaker · NFSU' },
                    { icon: <Icons.bug size={11} />, label: 'Bug Bounty Hunter' },
                  ].map(({ icon, label }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--accent-glow)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
                      {icon} {label}
                    </div>
                  ))}
                </div>

                {/* Expertise */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 20 }}>
                  {['Penetration Testing', 'Red Teaming', 'Vulnerability Assessment', 'Threat Hunting', 'Advanced Threat Analytics', 'OSINT'].map((skill, i, arr) => (
                    <span key={skill} style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>
                      {skill}{i < arr.length - 1 ? ' /' : ''}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                    <Icons.mail size={14} style={{ color: 'var(--accent-glow)', flexShrink: 0 }} />
                    <a href="mailto:vibhum@cybercell.in" style={{ color: 'var(--accent-glow)', textDecoration: 'none' }}>vibhum@cybercell.in</a>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                    <Icons.clock size={14} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
                    <span className="muted">Replies within one working day · IST (UTC+5:30)</span>
                  </div>
                </div>
              </div>

              {/* What to expect */}
              <div className="card flat" style={{ padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                  <Icons.clock size={14} style={{ color: 'var(--accent-glow)', flexShrink: 0 }} />
                  <h4 style={{ margin: 0, fontSize: 14, color: 'var(--text)' }}>What happens after you send</h4>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {[
                    {
                      icon: <Icons.check size={13} />,
                      title: 'Instant acknowledgement',
                      detail: 'An auto-reply lands in your inbox immediately with a reference ID — so you know it arrived.',
                    },
                    {
                      icon: <Icons.user size={13} />,
                      title: 'Read by Vibhum, personally',
                      detail: 'No ticket queue, no assistant. Every message is reviewed by the same person who will work your engagement.',
                    },
                    {
                      icon: <Icons.send size={13} />,
                      title: 'Reply within one working day',
                      detail: 'Usually within a few hours during IST business hours. Active incidents are escalated immediately — use the emergency directory for those.',
                    },
                    {
                      icon: <Icons.phone size={13} />,
                      title: 'Call if it makes more sense',
                      detail: 'If your situation needs a conversation, a calendar link is included in the reply — no back-and-forth to find a time.',
                    },
                  ].map((step, i, arr) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        gap: 14,
                        paddingBottom: i < arr.length - 1 ? 16 : 0,
                        marginBottom: i < arr.length - 1 ? 16 : 0,
                        borderBottom: i < arr.length - 1 ? '1px solid var(--line)' : 'none',
                      }}
                    >
                      <div style={{
                        width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                        background: 'rgba(29,155,240,0.1)', border: '1px solid rgba(56,189,248,0.15)',
                        display: 'grid', placeItems: 'center', color: 'var(--accent-glow)',
                        marginTop: 2,
                      }}>
                        {step.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>{step.title}</div>
                        <div className="muted" style={{ fontSize: 12, lineHeight: 1.65 }}>{step.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a
                  href="https://in.linkedin.com/in/vibhum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm"
                >
                  <Icons.linkedin size={14} /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </>
  )
}
