import { useNavigate } from 'react-router-dom'
import type { Service } from '../../data/services'
import { Icons } from '../ui/Icon'

interface ServiceModalProps {
  service: Service
  onClose: () => void
}

const ICON_MAP: Record<string, (p: { size?: number }) => JSX.Element> = {
  pentest: p => <Icons.bug {...p} />,
  vapt: p => <Icons.scan {...p} />,
  consult: p => <Icons.briefcase {...p} />,
  ir: p => <Icons.alert {...p} />,
  audit: p => <Icons.layers {...p} />,
  awareness: p => <Icons.brain {...p} />,
  osint: p => <Icons.fingerprint {...p} />,
  risk: p => <Icons.trending {...p} />,
  phish: p => <Icons.mail {...p} />,
  personal: p => <Icons.user {...p} />,
}

export function ServiceModal({ service, onClose }: ServiceModalProps) {
  const navigate = useNavigate()
  const Ic = ICON_MAP[service.id] ?? (p => <Icons.shield {...p} />)

  return (
    <>
      <div className="scrim" onClick={onClose} aria-hidden="true" />
      <div className="modal" role="dialog" aria-modal="true" aria-label={service.name} onClick={onClose}>
        <div className="modal-inner" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div className="icon-wrap" style={{ margin: 0 }}>
                <Ic size={20} />
              </div>
              <div>
                <div className="mono tiny" style={{ color: 'var(--accent-glow)' }}>Service detail</div>
                <h3 className="card" style={{ marginTop: 2 }}>{service.name}</h3>
              </div>
            </div>
            <button className="x-btn" onClick={onClose} aria-label="Close">
              <Icons.close size={14} />
            </button>
          </div>

          <div className="modal-body">
            <p style={{ fontSize: 17, color: 'var(--text)', lineHeight: 1.6 }}>{service.long}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, margin: '28px 0' }}>
              {[
                { label: 'Typical duration', value: service.duration },
                { label: 'Deliverable', value: service.delivery },
                { label: 'Engagement', value: 'Fixed-fee SOW' },
              ].map(({ label, value }) => (
                <div key={label} className="card flat">
                  <div className="mono tiny" style={{ color: 'var(--text-3)' }}>{label}</div>
                  <div style={{ fontSize: 16, marginTop: 6, fontWeight: 500 }}>{value}</div>
                </div>
              ))}
            </div>

            <h4
              style={{
                fontSize: 13,
                color: 'var(--text-3)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                margin: '24px 0 14px',
              }}
            >
              What's typically included
            </h4>

            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'Pre-engagement scoping call and engagement letter',
                'Weekly written status, escalations as needed',
                'Findings shared continuously, not at end-of-project',
                'Final report — technical and executive versions',
                'Two-week retest window after closeout',
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', gap: 10, color: 'var(--text-2)', fontSize: 14 }}>
                  <Icons.check size={16} style={{ flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', gap: 6, marginTop: 24, flexWrap: 'wrap' }}>
              {service.tags.map((t, i, arr) => (
                <span key={t} className="chip">{t}{i < arr.length - 1 ? ' /' : ''}</span>
              ))}
            </div>
          </div>

          <div
            style={{
              padding: '18px 26px',
              borderTop: '1px solid var(--line)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <div className="mono tiny" style={{ color: 'var(--text-3)' }}>
              Want a tailored scope? Start a conversation.
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-ghost btn-sm" onClick={onClose}>Close</button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => { onClose(); navigate('/contact') }}
              >
                Discuss this service <span className="arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
