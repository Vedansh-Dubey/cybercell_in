export function Topology() {
  return (
    <div className="topology">
      <div className="halo" />
      <svg viewBox="0 0 400 400" aria-hidden="true">
        <defs>
          <radialGradient id="topo-rg" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="topo-lg" x1="0" x2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Hairline rings */}
        {([60, 110, 160] as const).map((r, i) => (
          <circle
            key={i}
            cx="200"
            cy="200"
            r={r}
            fill="none"
            stroke="rgba(148,163,184,0.18)"
            strokeDasharray={i === 1 ? '4 6' : undefined}
          />
        ))}

        {/* Inner ring with rotation */}
        <g style={{ transformOrigin: '200px 200px', animation: 'spin 60s linear infinite' }}>
          <circle cx="200" cy="200" r="160" fill="none" stroke="rgba(56,189,248,0.25)" strokeDasharray="2 8" />
        </g>

        {/* Crosshair */}
        <line x1="40" y1="200" x2="360" y2="200" stroke="rgba(148,163,184,0.10)" />
        <line x1="200" y1="40" x2="200" y2="360" stroke="rgba(148,163,184,0.10)" />

        {/* Connecting lines */}
        {([
          [200, 200, 70, 90], [200, 200, 330, 80], [200, 200, 340, 300],
          [200, 200, 70, 310], [200, 200, 200, 40], [200, 200, 60, 200],
        ] as [number, number, number, number][]).map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#topo-lg)" strokeWidth="1" />
        ))}

        {/* Nodes */}
        {([
          [70, 90, 3], [330, 80, 3], [340, 300, 3], [70, 310, 3],
          [200, 40, 2.5], [60, 200, 2.5], [340, 200, 2.5], [200, 360, 2.5],
        ] as [number, number, number][]).map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r + 3} fill="rgba(56,189,248,0.12)" />
            <circle cx={x} cy={y} r={r} fill="#38bdf8" />
          </g>
        ))}

        {/* Central shield */}
        <circle cx="200" cy="200" r="42" fill="url(#topo-rg)" />
        <path
          d="M200 168 L228 178 V206 C228 222 216 234 200 238 C184 234 172 222 172 206 V178 Z"
          fill="rgba(56,189,248,0.10)"
          stroke="#38bdf8"
          strokeWidth="1.4"
        />
        <path
          d="M188 204 L196 212 L212 196"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Scanning dot */}
        <g style={{ transformOrigin: '200px 200px', animation: 'spin 14s linear infinite' }}>
          <circle cx="360" cy="200" r="4" fill="#38bdf8">
            <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Frame ticks */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2
          const r1 = 184
          const r2 = i % 6 === 0 ? 176 : 180
          return (
            <line
              key={i}
              x1={200 + Math.cos(a) * r1}
              y1={200 + Math.sin(a) * r1}
              x2={200 + Math.cos(a) * r2}
              y2={200 + Math.sin(a) * r2}
              stroke="rgba(148,163,184,0.3)"
              strokeWidth="1"
            />
          )
        })}
      </svg>
    </div>
  )
}
