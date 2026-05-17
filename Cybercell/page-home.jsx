/* global React, Icons, Cover, Topology, useReveal, useHoverLight, SERVICES, NEWS, BLOGS */

function HomePage({ setPage, onReport, openArticle, openService }) {
  useReveal();
  const onCardMove = useHoverLight();
  const featured = BLOGS[0];

  return (
    <>
      {/* ======= HERO ======= */}
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="reveal in">
              <span className="eyebrow">Independent cybersecurity practice · India</span>
              <h1 className="display">
                Calm, expert guidance for a noisier internet.
              </h1>
              <p className="lede" style={{fontSize:18, maxWidth:'56ch'}}>
                Cybercell is a boutique cybersecurity practice run by <span style={{color:'var(--text)'}}>Vibhum Dubey</span> — offering assessments, awareness, OSINT and incident support to organizations and individuals who want a senior partner, not a portal.
              </p>
              <div className="hero-actions">
                <button className="btn btn-primary btn-lg" onClick={() => setPage('services')}>
                  Explore services <span className="arrow">→</span>
                </button>
                <button className="btn btn-ghost btn-lg" onClick={() => setPage('news')}>
                  Latest threat news
                </button>
                <button className="btn btn-danger-soft btn-lg" onClick={onReport}>
                  <span style={{display:'inline-block', width:6, height:6, borderRadius:'50%', background:'#ef4444', boxShadow:'0 0 8px #ef4444'}}></span>
                  Report cyber fraud
                </button>
              </div>
              <div className="hero-meta">
                <div className="stat">
                  <div className="num">9 yrs</div>
                  <div className="lbl">Practice experience</div>
                </div>
                <div className="stat">
                  <div className="num">120+</div>
                  <div className="lbl">Engagements delivered</div>
                </div>
                <div className="stat">
                  <div className="num">24 h</div>
                  <div className="lbl">Incident response window</div>
                </div>
                <div className="stat">
                  <div className="num">0</div>
                  <div className="lbl">Public name-and-shame</div>
                </div>
              </div>
            </div>
            <div className="reveal in">
              <Topology/>
            </div>
          </div>
        </div>
      </section>

      {/* ======= ABOUT / MISSION ======= */}
      <section className="section">
        <div className="container">
          <div style={{display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:64, alignItems:'start'}} className="about-grid">
            <div className="reveal">
              <span className="eyebrow">Practice</span>
              <h2 className="section">A practice, not a platform.</h2>
              <p className="lede" style={{fontSize:18}}>
                Cybercell is not a SaaS vendor and not a marketplace. It is a single, senior security practitioner who works in small, focused engagements — and treats discretion as part of the deliverable.
              </p>
              <p className="muted" style={{marginTop:18}}>
                The work is split across three quiet specialisms: assessments and audits for organizations who want to know where they actually stand; awareness and hygiene for the people inside them; and OSINT and incident support when something has already happened.
              </p>
              <div style={{display:'flex', gap:10, marginTop:24, flexWrap:'wrap'}}>
                <span className="chip"><Icons.check size={12}/> Expert-led</span>
                <span className="chip"><Icons.check size={12}/> Privacy-first</span>
                <span className="chip"><Icons.check size={12}/> No vendor lock-in</span>
                <span className="chip"><Icons.check size={12}/> Plain language</span>
              </div>
            </div>
            <div className="reveal" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
              {[
                {ic:Icons.shield, t:'Trust-led', d:'Engagement letters, NDAs, and a fixed senior point of contact for every project.'},
                {ic:Icons.brain,  t:'Intelligence-driven', d:'Decisions grounded in current threat-actor behaviour, not vendor marketing.'},
                {ic:Icons.lock,   t:'Privacy-respecting', d:'Findings and identifiers held under minimal-disclosure principles.'},
                {ic:Icons.zap,    t:'Pragmatic', d:'Recommendations sized to your team and budget — not the ones that bill the most.'},
              ].map(({ic:Ic,t,d},i)=>(
                <div key={i} className="card" onMouseMove={onCardMove}>
                  <div className="icon-wrap"><Ic size={20}/></div>
                  <h3 className="card">{t}</h3>
                  <p className="muted" style={{fontSize:14, marginTop:8}}>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======= WHY AWARENESS MATTERS ======= */}
      <section className="section tight" style={{borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)'}}>
        <div className="container">
          <div className="section-head">
            <div className="left reveal">
              <span className="eyebrow">Why awareness matters</span>
              <h2 className="section">Most breaches don't start in code. They start in a tab.</h2>
              <p className="lede">The defensive layer most organizations under-invest in is the human one. The numbers haven't moved much in a decade — but the cost has.</p>
            </div>
          </div>
          <div className="stats-grid reveal">
            {[
              {big:'82', unit:'%', t:'of breaches involve a human element', src:'Verizon DBIR'},
              {big:'4.9', unit:'M $', t:'average cost of a data breach in 2025', src:'IBM Cost of a Data Breach'},
              {big:'1', unit:' / 36', t:'mobile devices show high-risk indicators', src:'Lookout Mobile Threat Report'},
              {big:'38', unit:'%', t:'rise in mule-network fraud, India · 2026 YTD', src:'I4C bulletin'},
            ].map((s,i)=>(
              <div key={i} className="card stat-card" onMouseMove={onCardMove}>
                <div className="big">{s.big}<span className="unit">{s.unit}</span></div>
                <div style={{fontSize:14, color:'var(--text-2)', maxWidth:'24ch'}}>{s.t}</div>
                <div className="tiny mono" style={{marginTop:14, paddingTop:14, borderTop:'1px solid var(--line)'}}>Source · {s.src}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= SERVICES PREVIEW ======= */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="left reveal">
              <span className="eyebrow">Services · preview</span>
              <h2 className="section">A small, deliberate menu of work.</h2>
              <p className="lede">Each engagement is scoped, fixed-fee where possible, and delivered by the same practitioner from kickoff to closeout.</p>
            </div>
            <button className="btn btn-ghost reveal" onClick={() => setPage('services')}>
              All ten services <span className="arrow">→</span>
            </button>
          </div>
          <div className="services-grid">
            {SERVICES.slice(0, 6).map((s,i) => {
              const Ic = s.icon;
              return (
                <div key={s.id} className="card svc reveal" onMouseMove={onCardMove} onClick={() => openService(s)} style={{transitionDelay:`${i*40}ms`}}>
                  <div className="icon-wrap"><Ic size={20}/></div>
                  <span className="mono tiny" style={{color:'var(--text-3)'}}>0{i+1} · {s.duration}</span>
                  <h3 className="card" style={{marginTop:6}}>{s.name}</h3>
                  <p className="desc">{s.short}</p>
                  <div className="meta">
                    {s.tags.slice(0,3).map(t => <span key={t} className="chip">{t}</span>)}
                  </div>
                  <div className="learn">Learn more <Icons.arrow size={14}/></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======= NEWS PREVIEW ======= */}
      <section className="section" style={{paddingTop:0}}>
        <div className="container">
          <div className="section-head">
            <div className="left reveal">
              <span className="eyebrow">Threat news</span>
              <h2 className="section">What's actually moving this week.</h2>
              <p className="lede">A curated feed of the threat-intel and policy items worth knowing about — without the breach-of-the-day churn.</p>
            </div>
            <button className="btn btn-ghost reveal" onClick={() => setPage('news')}>Full feed <span className="arrow">→</span></button>
          </div>
          <div className="news-grid">
            <div className="card news-card featured reveal" onMouseMove={onCardMove} onClick={() => openArticle(NEWS[0])}>
              <div className="thumb">
                <Cover label="01 · External · BleepingComputer" hue={210} glyph={<Icons.alert size={64}/>}/>
              </div>
              <div className="body">
                <div className="meta-row">
                  <span className="chip accent">{NEWS[0].cat}</span>
                  <span>{NEWS[0].source}</span>
                  <span>·</span>
                  <span>{NEWS[0].date}</span>
                </div>
                <h3 className="card">{NEWS[0].title}</h3>
                <p className="excerpt">{NEWS[0].excerpt}</p>
              </div>
            </div>
            {NEWS.slice(1,3).map((n,i) => (
              <div key={n.id} className="card news-card reveal" onMouseMove={onCardMove} onClick={() => openArticle(n)} style={{transitionDelay:`${i*60}ms`}}>
                <div className="thumb">
                  <Cover label={`0${i+2} · External · ${n.source}`} hue={i===0?260:185} glyph={i===0?<Icons.bug size={48}/>:<Icons.lock size={48}/>}/>
                </div>
                <div className="body">
                  <div className="meta-row">
                    <span className="chip">{n.cat}</span>
                    <span>·</span>
                    <span>{n.read}</span>
                  </div>
                  <h3 className="card">{n.title}</h3>
                  <p className="excerpt">{n.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= BLOGS PREVIEW ======= */}
      <section className="section" style={{paddingTop:0}}>
        <div className="container">
          <div className="section-head">
            <div className="left reveal">
              <span className="eyebrow">Writing</span>
              <h2 className="section">Field notes from the practice.</h2>
              <p className="lede">Long-form pieces — mostly about what people do wrong, calmly, and how to do it right.</p>
            </div>
            <button className="btn btn-ghost reveal" onClick={() => setPage('news')}>Read all <span className="arrow">→</span></button>
          </div>
          <div className="news-grid">
            <div className="card news-card featured reveal" onMouseMove={onCardMove} onClick={() => openArticle(featured)}>
              <div className="thumb">
                <Cover label={`Internal · Cybercell Field Notes`} hue={195} glyph={<Icons.book size={64}/>}/>
              </div>
              <div className="body">
                <div className="meta-row">
                  <span className="chip ok">Featured · Internal</span>
                  <span>{featured.author}</span>
                  <span>·</span>
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.read}</span>
                </div>
                <h3 className="card">{featured.title}</h3>
                <p className="excerpt">{featured.excerpt}</p>
                <div style={{display:'flex', gap:6, marginTop:14}}>
                  {featured.tags.map(t => <span key={t} className="chip">#{t}</span>)}
                </div>
              </div>
            </div>
            {BLOGS.slice(1,3).map((b,i) => (
              <div key={b.id} className="card news-card reveal" onMouseMove={onCardMove} onClick={() => openArticle(b)}>
                <div className="thumb">
                  <Cover label={`Internal · Field Notes`} hue={i===0?170:230} glyph={i===0?<Icons.fingerprint size={48}/>:<Icons.network size={48}/>}/>
                </div>
                <div className="body">
                  <div className="meta-row">
                    <span className="chip">{b.cat}</span>
                    <span>·</span>
                    <span>{b.read}</span>
                  </div>
                  <h3 className="card">{b.title}</h3>
                  <p className="excerpt">{b.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= CTA BANNER ======= */}
      <section style={{padding:'24px 0 96px'}}>
        <div className="container">
          <div className="cta-banner reveal">
            <div>
              <span className="chip danger"><span className="pulse"></span>Emergency support</span>
              <h2 className="section" style={{marginTop:14, fontSize:'clamp(26px, 3vw, 38px)'}}>
                Are you, or someone you know, the victim of cyber fraud?
              </h2>
              <p className="lede" style={{marginTop:6}}>
                Don't pay anything. Don't share more details. Open the emergency drawer for verified national portals and hotlines — or get a same-day call from the practice.
              </p>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:10}}>
              <button className="btn btn-danger-soft btn-lg" onClick={onReport}>
                Open emergency portals <Icons.arrow size={16}/>
              </button>
              <button className="btn btn-ghost btn-lg" onClick={() => setPage('contact')}>
                Contact Vibhum directly
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

window.HomePage = HomePage;
