/* global React, Icons */

// ============== Cover / Topology / Reveal ==============
function Cover({ label, hue = 200, glyph }) {
  return (
    <div className="cover" style={{
      backgroundImage: `radial-gradient(700px 200px at 20% -20%, oklch(0.65 0.18 ${hue} / 0.30), transparent 60%), linear-gradient(135deg, oklch(0.18 0.04 ${hue}), oklch(0.12 0.03 ${hue+10}))`
    }}>
      <div className="grid"></div>
      <div className="glyph">{glyph}</div>
      <div className="label">{label}</div>
    </div>
  );
}

function Topology() {
  // Abstract network: central shield, orbiting nodes, animated dot, hairlines
  return (
    <div className="topology">
      <div className="halo"></div>
      <svg viewBox="0 0 400 400">
        <defs>
          <radialGradient id="rg" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0"/>
          </radialGradient>
          <linearGradient id="lg" x1="0" x2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0"/>
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0"/>
          </linearGradient>
        </defs>
        {/* Hairline rings */}
        {[60, 110, 160].map((r,i) => (
          <circle key={i} cx="200" cy="200" r={r} fill="none" stroke="rgba(148,163,184,0.18)" strokeDasharray={i===1?"4 6":"none"}/>
        ))}
        {/* Inner ring with rotation */}
        <g style={{ transformOrigin: "200px 200px", animation: "spin 60s linear infinite" }}>
          <circle cx="200" cy="200" r="160" fill="none" stroke="rgba(56,189,248,0.25)" strokeDasharray="2 8"/>
        </g>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        {/* Crosshair */}
        <line x1="40" y1="200" x2="360" y2="200" stroke="rgba(148,163,184,0.10)"/>
        <line x1="200" y1="40" x2="200" y2="360" stroke="rgba(148,163,184,0.10)"/>
        {/* Connecting lines */}
        {[
          [200,200, 70,90], [200,200, 330,80], [200,200, 340,300],
          [200,200, 70,310], [200,200, 200,40], [200,200, 60,200],
        ].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#lg)" strokeWidth="1"/>
        ))}
        {/* Nodes */}
        {[
          [70,90,3],[330,80,3],[340,300,3],[70,310,3],[200,40,2.5],[60,200,2.5],[340,200,2.5],[200,360,2.5]
        ].map(([x,y,r],i)=>(
          <g key={i}>
            <circle cx={x} cy={y} r={r+3} fill="rgba(56,189,248,0.12)"/>
            <circle cx={x} cy={y} r={r} fill="#38bdf8"/>
          </g>
        ))}
        {/* Central shield */}
        <circle cx="200" cy="200" r="42" fill="url(#rg)"/>
        <path d="M200 168 L228 178 V206 C228 222 216 234 200 238 C184 234 172 222 172 206 V178 Z"
              fill="rgba(56,189,248,0.10)" stroke="#38bdf8" strokeWidth="1.4"/>
        <path d="M188 204 L196 212 L212 196" fill="none" stroke="#38bdf8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Scanning dot */}
        <g style={{ transformOrigin: "200px 200px", animation: "spin 14s linear infinite" }}>
          <circle cx="360" cy="200" r="4" fill="#38bdf8">
            <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite"/>
          </circle>
        </g>
        {/* Frame ticks */}
        {Array.from({length:24}).map((_,i)=>{
          const a = (i/24)*Math.PI*2;
          const r1 = 184, r2 = i%6===0?176:180;
          const x1 = 200+Math.cos(a)*r1, y1 = 200+Math.sin(a)*r1;
          const x2 = 200+Math.cos(a)*r2, y2 = 200+Math.sin(a)*r2;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(148,163,184,0.3)" strokeWidth="1"/>;
        })}
      </svg>
    </div>
  );
}

// Use hook for scroll reveal
function useReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -10% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

// ============== Card hover-light effect ==============
function useHoverLight() {
  return (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
}

// ============== Navbar ==============
function Navbar({ page, setPage, onReport }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const go = (p) => { setPage(p); setMobileOpen(false); window.scrollTo({top:0, behavior:'instant'}); };
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <div className="brand" onClick={() => go('home')}>
          <div className="brand-mark">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
          </div>
          <div className="brand-name">cybercell<span className="dot">.</span>in</div>
        </div>
        <div className="nav-links">
          {[['home','Home'],['services','Services'],['news','News & Blogs'],['contact','Contact']].map(([k,l]) => (
            <div key={k} className={`nav-link ${page===k?'active':''}`} onClick={() => go(k)}>{l}</div>
          ))}
        </div>
        <div className="nav-right">
          <button className="btn btn-danger-soft btn-sm" onClick={onReport}>
            <span style={{display:'inline-block', width:6, height:6, borderRadius:'50%', background:'#ef4444', boxShadow:'0 0 8px #ef4444'}}></span>
            Report fraud
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => go('contact')}>
            Book consult <span className="arrow">→</span>
          </button>
          <button className="hamburger" onClick={() => setMobileOpen(v=>!v)} aria-label="Menu">
            {mobileOpen ? <Icons.close size={18}/> : <Icons.menu size={18}/>}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div style={{borderTop:'1px solid var(--line-2)', background:'rgba(11,15,23,0.95)'}}>
          <div className="container" style={{padding:'14px 28px'}}>
            {[['home','Home'],['services','Services'],['news','News & Blogs'],['contact','Contact']].map(([k,l]) => (
              <div key={k} className="nav-link" style={{padding:'12px 0', borderBottom:'1px solid var(--line)'}} onClick={() => go(k)}>{l}</div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

// ============== Footer ==============
function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{marginBottom:18}}>
              <div className="brand-mark">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z"/>
                </svg>
              </div>
              <div className="brand-name">cybercell<span className="dot">.</span>in</div>
            </div>
            <p className="muted" style={{fontSize:14, maxWidth:'34ch'}}>
              An independent cybersecurity practice. Calm, intelligent guidance for people and organizations who take digital safety seriously.
            </p>
            <div style={{display:'flex', gap:8, marginTop:18}}>
              {[['github',Icons.github],['linkedin',Icons.linkedin],['twitter',Icons.twitter],['mail',Icons.mail]].map(([k,Ic])=>(
                <div key={k} style={{width:36, height:36, display:'grid', placeItems:'center', borderRadius:10, border:'1px solid var(--line-2)', color:'var(--text-2)', cursor:'pointer'}}>
                  <Ic size={16}/>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h5>Practice</h5>
            <a onClick={() => setPage('services')}>All services</a>
            <a onClick={() => setPage('services')}>Penetration testing</a>
            <a onClick={() => setPage('services')}>Incident response</a>
            <a onClick={() => setPage('services')}>OSINT investigations</a>
            <a onClick={() => setPage('services')}>Awareness training</a>
          </div>
          <div>
            <h5>Resources</h5>
            <a onClick={() => setPage('news')}>News feed</a>
            <a onClick={() => setPage('news')}>Blog</a>
            <a onClick={() => setPage('news')}>Threat intel</a>
            <a onClick={() => setPage('contact')}>Report cyber fraud</a>
            <a onClick={() => setPage('contact')}>Emergency contacts</a>
          </div>
          <div>
            <h5>Contact</h5>
            <a>hello@cybercell.in</a>
            <a>+91 — on request</a>
            <a>India · Remote worldwide</a>
            <a onClick={() => setPage('contact')}>Book a consult</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="mono">© 2026 · Cybercell · Operated by Vibhum Dubey</div>
          <div className="mono" style={{display:'flex', gap:18}}>
            <span><span style={{display:'inline-block',width:6,height:6,borderRadius:'50%',background:'#22c55e',marginRight:8,boxShadow:'0 0 8px #22c55e'}}></span>All systems operational</span>
            <span>v1.4.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

window.Cover = Cover;
window.Topology = Topology;
window.useReveal = useReveal;
window.useHoverLight = useHoverLight;
window.Navbar = Navbar;
window.Footer = Footer;
