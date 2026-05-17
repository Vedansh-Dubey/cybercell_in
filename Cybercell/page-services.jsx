/* global React, Icons, useReveal, useHoverLight, SERVICES */

// ============== Per-service mini visuals ==============
function ServiceVisual({ id }) {
  // Each service id maps to a distinct animated SVG header
  const C = "#38bdf8";
  const Cd = "rgba(56,189,248,0.5)";
  const Cb = "rgba(148,163,184,0.25)";

  switch (id) {
    case 'pentest': // animated terminal bars (vuln scan rhythm)
      return (
        <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="vis-bars">
          {Array.from({length: 24}).map((_,i) => {
            const h = 18 + (i * 137) % 60;
            return <rect key={i} x={10 + i*12} y={120 - h} width="6" height={h}
              fill={i%4===0 ? C : Cd} style={{animationDelay:`${(i*0.07)%2}s`}}/>;
          })}
        </svg>
      );
    case 'vapt': // sweeping scanline
      return (
        <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="vis-scan">
          {/* host nodes */}
          {[[40,30],[90,60],[140,40],[200,70],[250,30],[260,90],[160,90],[60,90]].map(([x,y],i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="3" fill={i%3===0?C:Cd}/>
              <circle cx={x} cy={y} r="6" fill="none" stroke={Cb}/>
            </g>
          ))}
          {/* scan line */}
          <g className="scanline">
            <line x1="0" y1="10" x2="300" y2="10" stroke={C} strokeWidth="1" opacity="0.8"/>
            <rect x="0" y="0" width="300" height="20" fill="url(#scangrad)"/>
            <defs>
              <linearGradient id="scangrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={C} stopOpacity="0.35"/>
                <stop offset="1" stopColor={C} stopOpacity="0"/>
              </linearGradient>
            </defs>
          </g>
        </svg>
      );
    case 'consult': // layered planes
      return (
        <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="vis-flow">
          {[0,1,2].map(i => (
            <path key={i} className="f" d={`M0 ${50+i*18} Q75 ${30+i*18} 150 ${50+i*18} T300 ${50+i*18}`}
              stroke={i===1?C:Cd} fill="none" strokeWidth="1.4" style={{animationDelay:`${i*0.4}s`}}/>
          ))}
          {[60,150,240].map((x,i) => (
            <circle key={i} cx={x} cy={50+i*18} r="3.5" fill={C}/>
          ))}
        </svg>
      );
    case 'ir': // pulsing alert circles
      return (
        <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="vis-pulse">
          {[[80,60],[150,60],[220,60]].map(([x,y],i) => (
            <g key={i}>
              <circle className="p" cx={x} cy={y} r="10" fill="none" stroke={i===1?'#ef4444':Cd} strokeWidth="1.4" style={{animationDelay:`${i*0.5}s`}}/>
              <circle cx={x} cy={y} r="4" fill={i===1?'#ef4444':C}/>
            </g>
          ))}
          <line x1="0" y1="60" x2="300" y2="60" stroke={Cb} strokeDasharray="2 4"/>
        </svg>
      );
    case 'audit': // layers / stack
      return (
        <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="vis-orbit">
          <g className="o1" style={{transformOrigin:'150px 60px'}}>
            <polygon points="150,20 220,60 150,100 80,60" fill="none" stroke={Cd} strokeWidth="1"/>
          </g>
          <g className="o2" style={{transformOrigin:'150px 60px'}}>
            <polygon points="150,32 200,60 150,88 100,60" fill="none" stroke={C} strokeWidth="1.2"/>
          </g>
          <polygon points="150,48 175,60 150,72 125,60" fill={C} opacity="0.8"/>
          {[[150,20],[220,60],[150,100],[80,60]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="2.5" fill={C}/>
          ))}
        </svg>
      );
    case 'awareness': // brain / nodes (neural)
      return (
        <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="vis-flow">
          {/* edges */}
          {[[40,40,150,60],[40,80,150,60],[150,60,260,40],[150,60,260,80],[40,40,260,40],[40,80,260,80]].map(([x1,y1,x2,y2],i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={Cd} strokeWidth="0.8" strokeDasharray="2 3" className="f" style={{animationDelay:`${i*0.2}s`}}/>
          ))}
          {[[40,40],[40,80],[150,60],[260,40],[260,80]].map(([x,y],i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="6" fill="none" stroke={C} opacity="0.4"/>
              <circle cx={x} cy={y} r="3" fill={i===2?C:Cd}/>
            </g>
          ))}
        </svg>
      );
    case 'osint': // fingerprint arcs
      return (
        <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="vis-fingerprint">
          {[14,24,34,44,54].map((r,i) => (
            <ellipse key={i} cx="150" cy="60" rx={r*1.5} ry={r} fill="none" stroke={i===2?C:Cd}
              strokeWidth={i===2?1.2:0.8} className="arc" style={{animationDelay:`${i*0.3}s`}}/>
          ))}
          <line x1="150" y1="0" x2="150" y2="120" stroke={Cb} strokeDasharray="2 4"/>
        </svg>
      );
    case 'risk': // graph rising
      return (
        <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="vis-graph">
          {/* baseline */}
          <line x1="0" y1="100" x2="300" y2="100" stroke={Cb}/>
          {/* grid */}
          {[20,40,60,80].map(y => (
            <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="rgba(148,163,184,0.06)"/>
          ))}
          {/* area */}
          <path d="M0 90 L40 75 L80 80 L120 50 L160 60 L200 35 L240 45 L300 20 L300 120 L0 120 Z"
            fill="url(#riskg)" opacity="0.4"/>
          {/* line */}
          <path className="line" d="M0 90 L40 75 L80 80 L120 50 L160 60 L200 35 L240 45 L300 20"
            fill="none" stroke={C} strokeWidth="1.6"/>
          {/* dots */}
          {[[0,90],[40,75],[80,80],[120,50],[160,60],[200,35],[240,45],[300,20]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="2.5" fill={C}/>
          ))}
          <defs>
            <linearGradient id="riskg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={C} stopOpacity="0.5"/>
              <stop offset="1" stopColor={C} stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      );
    case 'phish': // envelope with phishing lure
      return (
        <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="vis-mail">
          {/* hook */}
          <g stroke={C} strokeWidth="1.4" fill="none">
            <path className="lure" d="M40 30 Q70 30 70 60 Q70 90 40 90"/>
            <line className="lure" x1="40" y1="30" x2="40" y2="20" style={{animationDelay:'0.2s'}}/>
          </g>
          {/* envelopes */}
          {[[120,40],[180,60],[240,40]].map(([x,y],i) => (
            <g key={i} className="env" style={{animationDelay:`${i*0.4}s`, transformOrigin:`${x+18}px ${y+12}px`}}>
              <rect x={x} y={y} width="36" height="24" rx="2" fill="none" stroke={i===1?C:Cd} strokeWidth="1.2"/>
              <path d={`M${x} ${y} L${x+18} ${y+14} L${x+36} ${y}`} fill="none" stroke={i===1?C:Cd} strokeWidth="1"/>
            </g>
          ))}
        </svg>
      );
    case 'personal': // person with shield
      return (
        <svg viewBox="0 0 300 120" preserveAspectRatio="none" className="vis-user">
          {/* concentric rings */}
          {[20,40,60].map((r,i) => (
            <circle key={i} cx="150" cy="60" r={r} fill="none" stroke={Cb} strokeDasharray={i===1?"3 5":"none"} className={i===1?"":""} style={i===1?{animation:'spin-cw 24s linear infinite', transformOrigin:'150px 60px'}:{}}/>
          ))}
          {/* user */}
          <circle cx="150" cy="46" r="8" fill={C}/>
          <path d="M132 78 Q150 60 168 78 L168 90 L132 90 Z" fill={C}/>
          {/* shield overlay */}
          <g className="lock" style={{transformOrigin:'150px 60px'}}>
            <path d="M150 18 L168 24 V40 Q168 52 150 58 Q132 52 132 40 V24 Z" fill="rgba(56,189,248,0.18)" stroke={C} strokeWidth="1.2"/>
            <path d="M143 38 L148 43 L157 33" fill="none" stroke={C} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        </svg>
      );
    default:
      return null;
  }
}

// ============== Services hero radar visual ==============
function ServicesHeroVisual() {
  const C = "#38bdf8";
  return (
    <div className="svc-hero-visual">
      <div className="sweep"></div>
      <svg viewBox="0 0 400 400">
        {/* concentric rings with labels */}
        {[70, 120, 170, 220].map((r, i) => (
          <circle key={i} cx="200" cy="200" r={r} fill="none" stroke="rgba(148,163,184,0.18)" strokeDasharray={i%2?"3 6":"none"}/>
        ))}
        {/* spokes */}
        {[0,45,90,135,180,225,270,315].map((deg, i) => {
          const a = (deg * Math.PI) / 180;
          return <line key={i} x1={200+Math.cos(a)*40} y1={200+Math.sin(a)*40} x2={200+Math.cos(a)*220} y2={200+Math.sin(a)*220} stroke="rgba(148,163,184,0.10)"/>;
        })}
        {/* 10 service nodes around */}
        {Array.from({length: 10}).map((_, i) => {
          const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
          const r = i % 3 === 0 ? 170 : i % 2 === 0 ? 130 : 210;
          const x = 200 + Math.cos(a) * r;
          const y = 200 + Math.sin(a) * r;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="14" fill="rgba(56,189,248,0.10)" stroke="rgba(56,189,248,0.30)"/>
              <circle cx={x} cy={y} r="3.5" fill={C}>
                <animate attributeName="opacity" values="1;0.4;1" dur={`${1.6 + (i%3)*0.4}s`} repeatCount="indefinite" begin={`${i*0.15}s`}/>
              </circle>
              <line x1="200" y1="200" x2={x} y2={y} stroke="rgba(56,189,248,0.15)" strokeDasharray="2 3"/>
            </g>
          );
        })}
        {/* center hub */}
        <circle cx="200" cy="200" r="40" fill="rgba(56,189,248,0.06)" stroke={C} strokeWidth="1.4"/>
        <circle cx="200" cy="200" r="32" fill="none" stroke="rgba(56,189,248,0.25)">
          <animate attributeName="r" values="32;48;32" dur="3.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.7;0;0.7" dur="3.5s" repeatCount="indefinite"/>
        </circle>
        <text x="200" y="196" textAnchor="middle" fill={C} fontFamily="JetBrains Mono" fontSize="10" letterSpacing="2">CYBERCELL</text>
        <text x="200" y="212" textAnchor="middle" fill="rgba(148,163,184,0.6)" fontFamily="JetBrains Mono" fontSize="8" letterSpacing="2">PRACTICE</text>
        {/* corner ticks */}
        {Array.from({length:36}).map((_, i) => {
          const a = (i/36) * Math.PI * 2;
          const r1 = 232, r2 = i%9===0 ? 222 : 228;
          return <line key={i} x1={200+Math.cos(a)*r1} y1={200+Math.sin(a)*r1} x2={200+Math.cos(a)*r2} y2={200+Math.sin(a)*r2} stroke="rgba(148,163,184,0.3)"/>;
        })}
        {/* readouts */}
        <g fontFamily="JetBrains Mono" fontSize="8" fill="rgba(148,163,184,0.6)" letterSpacing="1.5">
          <text x="20" y="20">RADAR · 360°</text>
          <text x="20" y="34">SWEEP · ACTIVE</text>
          <text x="280" y="20">NODES · 10</text>
          <text x="280" y="34">LAT · 24ms</text>
          <text x="20" y="385">UTC · 14:22:09</text>
          <text x="270" y="385">SIGNAL · NOMINAL</text>
        </g>
      </svg>
    </div>
  );
}

function ServicesPage({ setPage, openService, onReport }) {
  useReveal();
  const onCardMove = useHoverLight();
  const [filter, setFilter] = React.useState('all');

  const groups = {
    all: SERVICES,
    assess: SERVICES.filter(s => ['pentest','vapt','audit','risk'].includes(s.id)),
    react: SERVICES.filter(s => ['ir','osint'].includes(s.id)),
    aware: SERVICES.filter(s => ['awareness','phish','personal','consult'].includes(s.id)),
  };
  const list = groups[filter];

  return (
    <>
      {/* Hero with ambient orbs + radar */}
      <section className="page-header" style={{position:'relative', overflow:'hidden', paddingBottom:24}}>
        <div className="ambient-orb a"></div>
        <div className="ambient-orb b"></div>
        <div className="container" style={{position:'relative', zIndex:1}}>
          <div className="crumb reveal in">Services · 10 offerings</div>
          <div style={{display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:64, alignItems:'center', marginTop:14}} className="hero-inner">
            <div className="reveal in">
              <span className="eyebrow">The practice menu</span>
              <h1 className="display" style={{fontSize:'clamp(36px,5vw,68px)', marginTop:14}}>
                A focused menu of cybersecurity work.
              </h1>
              <p className="lede" style={{marginTop:18}}>
                Every service below is delivered by the same practitioner — no offshore back-office, no resold tooling, no ghost-written reports. Pick what fits; we'll talk through what doesn't.
              </p>
              <div style={{display:'flex', gap:10, marginTop:24, flexWrap:'wrap'}}>
                <button className="btn btn-primary btn-lg" onClick={() => setPage('contact')}>
                  Start a conversation <span className="arrow">→</span>
                </button>
                <button className="btn btn-ghost btn-lg" onClick={onReport}>Emergency?</button>
              </div>
              {/* Mini stats */}
              <div className="hero-meta" style={{marginTop:48}}>
                <div className="stat"><div className="num">10</div><div className="lbl">Service lines</div></div>
                <div className="stat"><div className="num">1</div><div className="lbl">Senior practitioner</div></div>
                <div className="stat"><div className="num">24h</div><div className="lbl">Incident window</div></div>
                <div className="stat"><div className="num">Fixed</div><div className="lbl">Scope · fee · dates</div></div>
              </div>
            </div>
            <div className="reveal in">
              <ServicesHeroVisual/>
            </div>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="section tight" style={{paddingTop:24}}>
        <div className="container">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:14, marginBottom:32}}>
            <div className="pill-row">
              {[['all','All ten'],['assess','Assessment'],['react','Response'],['aware','Awareness']].map(([k,l]) => (
                <div key={k} className={`pill ${filter===k?'active':''}`} onClick={() => setFilter(k)}>{l}</div>
              ))}
            </div>
            <div className="mono tiny" style={{display:'flex', gap:14, color:'var(--text-3)', alignItems:'center'}}>
              <span style={{display:'inline-flex', alignItems:'center', gap:6}}>
                <span style={{display:'inline-block', width:6, height:6, borderRadius:'50%', background:'var(--accent-glow)', boxShadow:'0 0 8px var(--accent-glow)', animation:'blink 1.6s ease-in-out infinite'}}></span>
                {list.length} services live
              </span>
              <span>Scope · fixed-fee · senior-led</span>
            </div>
          </div>

          <div className="services-grid">
            {list.map((s,i) => {
              const Ic = s.icon;
              return (
                <div key={s.id} className="card svc reveal" onMouseMove={onCardMove} onClick={() => openService(s)} style={{transitionDelay:`${i*40}ms`}}>
                  <div className="svc-vis">
                    <span className="lbl">SVC · {String(i+1).padStart(2,'0')}</span>
                    <span className="lbl-r"><span className="pulse-dot"></span>LIVE</span>
                    <ServiceVisual id={s.id}/>
                  </div>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                    <div className="icon-wrap" style={{marginBottom:14}}><Ic size={20}/></div>
                    <span className="mono tiny" style={{color:'var(--text-3)', marginTop:6}}>{s.duration}</span>
                  </div>
                  <h3 className="card">{s.name}</h3>
                  <p className="desc" style={{marginTop:8}}>{s.short}</p>
                  <div className="meta">
                    {s.tags.map(t => <span key={t} className="chip">{t}</span>)}
                  </div>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:18, paddingTop:18, borderTop:'1px solid var(--line)'}}>
                    <span className="mono tiny" style={{color:'var(--text-3)'}}>{s.delivery}</span>
                    <span className="learn" style={{margin:0}}>Open <Icons.arrow size={14}/></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Engagement model — animated timeline */}
      <section className="section" style={{position:'relative', overflow:'hidden'}}>
        <div className="ambient-orb b" style={{top:'40%', bottom:'auto', left:'auto', right:'-100px'}}></div>
        <div className="container" style={{position:'relative', zIndex:1}}>
          <div className="section-head">
            <div className="left reveal">
              <span className="eyebrow">How we work together</span>
              <h2 className="section">Four phases. Same practitioner the whole way through.</h2>
              <p className="lede">No handoffs between sales, scoping, delivery and closeout. The person you speak to first is the person you speak to last.</p>
            </div>
          </div>

          <div className="phase-timeline" style={{position:'relative'}}>
            <div className="rail"></div>
            <div className="services-grid" style={{gridTemplateColumns:'repeat(4, 1fr)'}}>
              {[
                {n:'01', t:'Conversation', d:'A 30-minute call to scope problem, context and constraints. No NDA needed yet, no slide deck.', meta:'~30 min'},
                {n:'02', t:'Engagement letter', d:'A short SOW: objectives, deliverables, dates, fees. Mutual NDA where relevant.', meta:'2–3 days'},
                {n:'03', t:'Work', d:'Weekly written updates. Findings shared as they emerge — no breach-day surprises.', meta:'1–6 weeks'},
                {n:'04', t:'Closeout & retest', d:'Final report, exec brief, and a retest window so you can confirm fixes landed.', meta:'2 weeks'},
              ].map((p,i)=>(
                <div key={i} className="reveal" style={{transitionDelay:`${i*80}ms`}}>
                  <div className="phase-node"></div>
                  <div className="card" onMouseMove={onCardMove}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <div className="mono" style={{fontSize:11, letterSpacing:'.14em', color:'var(--accent-glow)'}}>PHASE {p.n}</div>
                      <span className="mono tiny" style={{color:'var(--text-3)'}}>{p.meta}</span>
                    </div>
                    <h3 className="card" style={{marginTop:12}}>{p.t}</h3>
                    <p className="muted" style={{fontSize:14, marginTop:8}}>{p.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust band */}
      <section className="section tight" style={{paddingTop:0}}>
        <div className="container">
          <div className="card reveal" style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:0, padding:0, overflow:'hidden'}}>
            {[
              {t:'NDA', d:'Mutual NDAs before any sensitive material is shared.'},
              {t:'Fixed fee', d:'Most engagements scoped against an SOW — no surprises.'},
              {t:'Plain language', d:'Reports your leadership and your engineers both read.'},
              {t:'Retest included', d:'Two-week retest window after closeout, no extra fee.'},
            ].map((b,i) => (
              <div key={i} style={{padding:'28px 24px', borderRight: i<3 ? '1px solid var(--line)' : 'none'}}>
                <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:8}}>
                  <Icons.check size={16}/>
                  <div className="mono tiny" style={{color:'var(--accent-glow)', letterSpacing:'.12em', textTransform:'uppercase'}}>{b.t}</div>
                </div>
                <div className="muted" style={{fontSize:14}}>{b.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{paddingTop:48}}>
        <div className="container">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:64}} className="hero-inner">
            <div className="reveal">
              <span className="eyebrow">Frequently asked</span>
              <h2 className="section">A handful of clarifications.</h2>
              <p className="lede">If your question isn't here, it'll get a thoughtful answer over email within a working day.</p>
              <div style={{marginTop:24}}>
                <button className="btn btn-primary" onClick={() => setPage('contact')}>Ask a question <span className="arrow">→</span></button>
              </div>
            </div>
            <div className="reveal">
              <FaqList/>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FaqList() {
  const [open, setOpen] = React.useState(0);
  const faqs = [
    { q:'Do you work with individuals as well as organizations?', a:'Yes — personal cyber hygiene and family safety consultations are a regular part of the practice.' },
    { q:'Is everything covered by NDA?', a:'Yes. Mutual NDAs are signed before any sensitive material is shared. Findings are held under minimal-disclosure principles.' },
    { q:'How do fees work?', a:'Most engagements are fixed-fee against an SOW. Retainers are monthly. Incident response is hourly with a transparent cap.' },
    { q:'Will you work on-site?', a:'Remote-first across India and worldwide. On-site for sensitive workshops or assessments where physical access is required.' },
    { q:'Can you handle live incidents at short notice?', a:'Within the engagement window, yes. The first 24 hours of an active incident are billed at the standard rate, not an emergency premium.' },
  ];
  return (
    <div>
      {faqs.map((f,i)=>(
        <div key={i} className={`acc ${open===i?'open':''}`}>
          <div className="acc-head" onClick={() => setOpen(open===i?-1:i)}>
            <h4>{f.q}</h4>
            <span className="acc-toggle mono">+</span>
          </div>
          <div className="acc-body">{f.a}</div>
        </div>
      ))}
    </div>
  );
}

window.ServicesPage = ServicesPage;
