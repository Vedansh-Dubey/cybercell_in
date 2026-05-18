import { useState } from 'react'
import { Drawer } from '../ui/Drawer'
import { Icons } from '../ui/Icon'
import { PORTALS, ALL_COUNTRIES } from '../../data/portals'
import { Chip } from '../ui/Chip'

interface EmergencyDrawerProps {
  onClose: () => void
}

export function EmergencyDrawer({ onClose }: EmergencyDrawerProps) {
  const [query, setQuery] = useState('')
  const [country, setCountry] = useState('All')

  const filteredGroups = PORTALS
    .filter(g => country === 'All' || g.country === country)
    .map(g => ({
      ...g,
      items: g.items.filter(item =>
        !query || (item.name + ' ' + item.desc + ' ' + item.url).toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter(g => g.items.length > 0)

  return (
    <Drawer
      onClose={onClose}
      subtitle={
        <Chip variant="danger">
          <span
            style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--danger)', boxShadow: '0 0 8px var(--danger)' }}
            aria-hidden="true"
          />
          Emergency directory
        </Chip>
      }
      title="Cyber fraud — official portals"
    >
      {/* First steps warning */}
      <div
        className="card flat"
        style={{ borderColor: 'rgba(245,158,11,0.30)', background: 'rgba(245,158,11,0.06)', marginBottom: 18 }}
        role="alert"
      >
        <h4 style={{ margin: 0, fontSize: 14, color: '#fbbf24' }}>If it's happening right now</h4>
        <ol style={{ margin: '10px 0 0 18px', padding: 0, fontSize: 13, color: 'var(--text-2)', lineHeight: 1.7 }}>
          <li>Stop talking. End the call.</li>
          <li>Do not pay, share OTPs, screen-share or install anything.</li>
          <li>Note the time, number, and any reference IDs.</li>
          <li>Call your country's hotline (below) within 24 hours.</li>
        </ol>
      </div>

      {/* Search */}
      <div className="search" style={{ marginBottom: 12 }}>
        <Icons.search size={14} aria-hidden="true" />
        <input
          placeholder="Search portals…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Search emergency portals"
        />
      </div>

      {/* Country filter */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }} role="group" aria-label="Filter by country">
        {ALL_COUNTRIES.map(c => (
          <button
            key={c}
            className={`pill ${country === c ? 'active' : ''}`}
            onClick={() => setCountry(c)}
            style={{ fontSize: 12, padding: '6px 12px' }}
            aria-pressed={country === c}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Portal list */}
      {filteredGroups.map(group => (
        <div key={group.country} style={{ marginBottom: 24 }}>
          <h5
            style={{
              margin: '0 0 10px',
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              color: 'var(--text-3)',
            }}
          >
            {group.country}
          </h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {group.items.map(item => (
              <div key={item.url} className="card flat" style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, color: 'var(--text)', fontWeight: 500 }}>{item.name}</div>
                    <div className="mono tiny" style={{ color: 'var(--accent-glow)', marginTop: 4 }}>{item.url}</div>
                  </div>
                  {item.hot && item.hot !== '—' && (
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div className="mono tiny" style={{ color: 'var(--text-3)' }}>Hotline</div>
                      <div style={{ fontSize: 14, fontFamily: 'var(--font-mono)', color: '#fca5a5' }}>{item.hot}</div>
                    </div>
                  )}
                </div>
                <p className="muted" style={{ fontSize: 12, marginTop: 10, lineHeight: 1.55 }}>{item.desc}</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <a
                    href={`https://${item.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost btn-sm"
                    style={{ padding: '6px 12px', fontSize: 12 }}
                  >
                    Open portal <Icons.external size={12} />
                  </a>
                  {item.hot && item.hot !== '—' && (
                    <a
                      href={`tel:${item.hot}`}
                      className="btn btn-danger-soft btn-sm"
                      style={{ padding: '6px 12px', fontSize: 12 }}
                    >
                      <Icons.phone size={12} /> Call {item.hot}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div
        className="mono tiny"
        style={{ color: 'var(--text-3)', textAlign: 'center', padding: '18px 0 0', borderTop: '1px solid var(--line)' }}
      >
        Directory maintained by Cybercell · Last verified May 2026
      </div>
    </Drawer>
  )
}
