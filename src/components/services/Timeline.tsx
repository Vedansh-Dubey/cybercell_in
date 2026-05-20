import { ENGAGEMENT_PHASES } from '../../data/services'
import { useHoverLight } from '../../hooks/useHoverLight'

export function Timeline() {
  const onCardMove = useHoverLight()

  return (
    <div className="phase-timeline" style={{ position: 'relative' }}>
      <div className="rail" />
      <div className="phase-grid">
        {ENGAGEMENT_PHASES.map((phase: typeof ENGAGEMENT_PHASES[number], i: number) => (
          <div key={i} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="phase-node" />
            <div className="card" onMouseMove={onCardMove}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="mono" style={{ fontSize: 11, letterSpacing: '.14em', color: 'var(--accent-glow)' }}>
                  PHASE {phase.n}
                </div>
                <span className="mono tiny" style={{ color: 'var(--text-3)' }}>{phase.meta}</span>
              </div>
              <h3 className="card" style={{ marginTop: 12 }}>{phase.t}</h3>
              <p className="muted" style={{ fontSize: 14, marginTop: 8 }}>{phase.d}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
