interface ServiceVisualProps {
  id: string
}

const C = '#38bdf8'
const Cd = 'rgba(56,189,248,0.5)'
const Cb = 'rgba(148,163,184,0.25)'

export function ServiceVisual({ id }: ServiceVisualProps) {
  switch (id) {
    case 'pentest':
      return (
        <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="vis-bars" aria-hidden="true">
          {Array.from({ length: 24 }).map((_, i) => {
            const h = 18 + (i * 137) % 60
            return (
              <rect
                key={i}
                x={10 + i * 12}
                y={120 - h}
                width="6"
                height={h}
                fill={i % 4 === 0 ? C : Cd}
                style={{ animationDelay: `${(i * 0.07) % 2}s` }}
              />
            )
          })}
        </svg>
      )

    case 'vapt':
      return (
        <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="vis-scan" aria-hidden="true">
          {[[40, 30], [90, 60], [140, 40], [200, 70], [250, 30], [260, 90], [160, 90], [60, 90]].map(
            ([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="3" fill={i % 3 === 0 ? C : Cd} />
                <circle cx={x} cy={y} r="6" fill="none" stroke={Cb} />
              </g>
            )
          )}
          <g className="scanline">
            <defs>
              <linearGradient id="scangrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={C} stopOpacity="0.35" />
                <stop offset="1" stopColor={C} stopOpacity="0" />
              </linearGradient>
            </defs>
            <line x1="0" y1="10" x2="300" y2="10" stroke={C} strokeWidth="1" opacity="0.8" />
            <rect x="0" y="0" width="300" height="20" fill="url(#scangrad)" />
          </g>
        </svg>
      )

    case 'consult':
      return (
        <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="vis-flow" aria-hidden="true">
          {[0, 1, 2].map(i => (
            <path
              key={i}
              className="f"
              d={`M0 ${50 + i * 18} Q75 ${30 + i * 18} 150 ${50 + i * 18} T300 ${50 + i * 18}`}
              stroke={i === 1 ? C : Cd}
              fill="none"
              strokeWidth="1.4"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          ))}
          {[60, 150, 240].map((x, i) => (
            <circle key={i} cx={x} cy={50 + i * 18} r="3.5" fill={C} />
          ))}
        </svg>
      )

    case 'ir':
      return (
        <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="vis-pulse" aria-hidden="true">
          {[[80, 60], [150, 60], [220, 60]].map(([x, y], i) => (
            <g key={i}>
              <circle
                className="p"
                cx={x}
                cy={y}
                r="10"
                fill="none"
                stroke={i === 1 ? '#ef4444' : Cd}
                strokeWidth="1.4"
                style={{ animationDelay: `${i * 0.5}s` }}
              />
              <circle cx={x} cy={y} r="4" fill={i === 1 ? '#ef4444' : C} />
            </g>
          ))}
          <line x1="0" y1="60" x2="300" y2="60" stroke={Cb} strokeDasharray="2 4" />
        </svg>
      )

    case 'audit':
      return (
        <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="vis-orbit" aria-hidden="true">
          <g className="o1" style={{ transformOrigin: '150px 60px' }}>
            <polygon points="150,20 220,60 150,100 80,60" fill="none" stroke={Cd} strokeWidth="1" />
          </g>
          <g className="o2" style={{ transformOrigin: '150px 60px' }}>
            <polygon points="150,32 200,60 150,88 100,60" fill="none" stroke={C} strokeWidth="1.2" />
          </g>
          <polygon points="150,48 175,60 150,72 125,60" fill={C} opacity="0.8" />
          {[[150, 20], [220, 60], [150, 100], [80, 60]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.5" fill={C} />
          ))}
        </svg>
      )

    case 'awareness':
      return (
        <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="vis-flow" aria-hidden="true">
          {[[40, 40, 150, 60], [40, 80, 150, 60], [150, 60, 260, 40], [150, 60, 260, 80], [40, 40, 260, 40], [40, 80, 260, 80]].map(
            ([x1, y1, x2, y2], i) => (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={Cd}
                strokeWidth="0.8"
                strokeDasharray="2 3"
                className="f"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            )
          )}
          {[[40, 40], [40, 80], [150, 60], [260, 40], [260, 80]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="6" fill="none" stroke={C} opacity="0.4" />
              <circle cx={x} cy={y} r="3" fill={i === 2 ? C : Cd} />
            </g>
          ))}
        </svg>
      )

    case 'osint':
      return (
        <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="vis-fingerprint" aria-hidden="true">
          {[14, 24, 34, 44, 54].map((r, i) => (
            <ellipse
              key={i}
              cx="150"
              cy="60"
              rx={r * 1.5}
              ry={r}
              fill="none"
              stroke={i === 2 ? C : Cd}
              strokeWidth={i === 2 ? 1.2 : 0.8}
              className="arc"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
          <line x1="150" y1="0" x2="150" y2="120" stroke={Cb} strokeDasharray="2 4" />
        </svg>
      )

    case 'risk':
      return (
        <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="vis-graph" aria-hidden="true">
          <defs>
            <linearGradient id="riskg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={C} stopOpacity="0.5" />
              <stop offset="1" stopColor={C} stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="100" x2="300" y2="100" stroke={Cb} />
          {[20, 40, 60, 80].map(y => (
            <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="rgba(148,163,184,0.06)" />
          ))}
          <path
            d="M0 90 L40 75 L80 80 L120 50 L160 60 L200 35 L240 45 L300 20 L300 120 L0 120 Z"
            fill="url(#riskg)"
            opacity="0.4"
          />
          <path
            className="line"
            d="M0 90 L40 75 L80 80 L120 50 L160 60 L200 35 L240 45 L300 20"
            fill="none"
            stroke={C}
            strokeWidth="1.6"
          />
          {[[0, 90], [40, 75], [80, 80], [120, 50], [160, 60], [200, 35], [240, 45], [300, 20]].map(
            ([x, y], i) => <circle key={i} cx={x} cy={y} r="2.5" fill={C} />
          )}
        </svg>
      )

    case 'phish':
      return (
        <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="vis-mail" aria-hidden="true">
          <g stroke={C} strokeWidth="1.4" fill="none">
            <path className="lure" d="M40 30 Q70 30 70 60 Q70 90 40 90" />
            <line className="lure" x1="40" y1="30" x2="40" y2="20" style={{ animationDelay: '0.2s' }} />
          </g>
          {[[120, 40], [180, 60], [240, 40]].map(([x, y], i) => (
            <g
              key={i}
              className="env"
              style={{ animationDelay: `${i * 0.4}s`, transformOrigin: `${x + 18}px ${y + 12}px` }}
            >
              <rect x={x} y={y} width="36" height="24" rx="2" fill="none" stroke={i === 1 ? C : Cd} strokeWidth="1.2" />
              <path d={`M${x} ${y} L${x + 18} ${y + 14} L${x + 36} ${y}`} fill="none" stroke={i === 1 ? C : Cd} strokeWidth="1" />
            </g>
          ))}
        </svg>
      )

    case 'personal':
      return (
        <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="vis-user" aria-hidden="true">
          {[20, 40, 60].map((r, i) => (
            <circle
              key={i}
              cx="150"
              cy="60"
              r={r}
              fill="none"
              stroke={Cb}
              strokeDasharray={i === 1 ? '3 5' : undefined}
              style={i === 1 ? { animation: 'spin-cw 24s linear infinite', transformOrigin: '150px 60px' } : {}}
            />
          ))}
          <circle cx="150" cy="46" r="8" fill={C} />
          <path d="M132 78 Q150 60 168 78 L168 90 L132 90 Z" fill={C} />
          <g className="lock" style={{ transformOrigin: '150px 60px' }}>
            <path
              d="M150 18 L168 24 V40 Q168 52 150 58 Q132 52 132 40 V24 Z"
              fill="rgba(56,189,248,0.18)"
              stroke={C}
              strokeWidth="1.2"
            />
            <path d="M143 38 L148 43 L157 33" fill="none" stroke={C} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      )

    default:
      return null
  }
}
