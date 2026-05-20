import type { Service } from '../../data/services'
import { Icons } from '../ui/Icon'
import { ServiceVisual } from './ServiceVisual'
import { useHoverLight } from '../../hooks/useHoverLight'

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

interface ServiceCardProps {
  service: Service
  index: number
  showVisual?: boolean
}

export function ServiceCard({ service, index, showVisual = false }: ServiceCardProps) {
  const onCardMove = useHoverLight()
  const Ic = ICON_MAP[service.id] ?? (p => <Icons.shield {...p} />)

  return (
    <div
      className="card svc reveal"
      onMouseMove={onCardMove}
      style={{ transitionDelay: `${index * 40}ms`, cursor: 'default' }}
    >
      {showVisual && (
        <div className="svc-vis">
          <span className="lbl">SVC · {String(index + 1).padStart(2, '0')}</span>
          <span className="lbl-r">
            <span className="pulse-dot" />
            LIVE
          </span>
          <ServiceVisual id={service.id} />
        </div>
      )}

      <div className="icon-wrap" style={{ marginBottom: showVisual ? 14 : 18 }}>
        <Ic size={20} />
      </div>

      <h3 className="card" style={{ marginTop: 6 }}>{service.name}</h3>
      <p className="desc" style={{ marginTop: 8 }}>{service.short}</p>

      <div className="meta">
        {service.tags.slice(0, 3).map((t, i, arr) => (
          <span key={t} className="chip">{t}{i < arr.length - 1 ? ' /' : ''}</span>
        ))}
      </div>

    </div>
  )
}
