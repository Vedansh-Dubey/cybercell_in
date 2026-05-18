const STATS = [
  { num: '82%', label: 'of breaches involve a human element', source: 'Verizon DBIR 2024' },
  { num: '194 days', label: 'average time to identify a breach', source: 'IBM Cost of a Data Breach 2024' },
  { num: '₹11,333 Cr', label: 'lost to cyber fraud in India (2023)', source: 'MHA Annual Report' },
  { num: '3.5M', label: 'unfilled cybersecurity jobs globally', source: 'ISC2 Workforce Study' },
]

export function StatsBar() {
  return (
    <section style={{ padding: '60px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>
          {STATS.map(({ num, label, source }) => (
            <div key={num} className="reveal" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1 }}>
                {num}
              </div>
              <div style={{ fontSize: 14, color: 'var(--text-2)', margin: '8px 0 6px', lineHeight: 1.45 }}>{label}</div>
              <div className="mono tiny" style={{ color: 'var(--text-3)' }}>{source}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
