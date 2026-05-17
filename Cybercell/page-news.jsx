/* global React, Icons, Cover, useReveal, useHoverLight, NEWS, BLOGS, TRENDING */

function NewsPage({ openArticle, onReport }) {
  useReveal();
  const onCardMove = useHoverLight();
  const [tab, setTab] = React.useState('all'); // all | news | blogs
  const [cat, setCat] = React.useState('All');
  const [q, setQ] = React.useState('');
  const [page, setPage] = React.useState(1);

  const all = React.useMemo(() => {
    let pool = [];
    if (tab === 'all' || tab === 'news') pool = pool.concat(NEWS);
    if (tab === 'all' || tab === 'blogs') pool = pool.concat(BLOGS);
    return pool;
  }, [tab]);

  const filtered = all.filter(x => {
    if (cat !== 'All' && x.cat !== cat) return false;
    if (q && !(x.title + ' ' + (x.excerpt||'')).toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  const featured = BLOGS[0];

  const cats = ['All','Threat Intelligence','Malware','Privacy','Fraud','Awareness'];

  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="crumb reveal in">News · Blogs · Threat intelligence</div>
          <h1 className="display reveal in" style={{fontSize:'clamp(36px,5vw,68px)', marginTop:14}}>
            What we're watching, what we've written.
          </h1>
          <p className="lede reveal in" style={{maxWidth:'62ch', marginTop:8}}>
            A combined feed of curated external news and original field notes from the practice. Quiet, consistent, daily.
          </p>
        </div>
      </section>

      {/* Featured hero */}
      <section className="section tight" style={{paddingTop:24}}>
        <div className="container">
          <div className="card reveal" style={{padding:0, overflow:'hidden', display:'grid', gridTemplateColumns:'1.2fr 1fr', gap:0}} onMouseMove={onCardMove}>
            <div style={{position:'relative', minHeight:380}}>
              <Cover label="Featured · Field Notes" hue={205} glyph={<Icons.book size={84}/>}/>
            </div>
            <div style={{padding:'44px 44px 40px', display:'flex', flexDirection:'column', justifyContent:'center'}}>
              <div style={{display:'flex', gap:8, marginBottom:16}}>
                <span className="chip accent">Featured</span>
                <span className="chip">Internal · Blog</span>
                <span className="chip">{featured.cat}</span>
              </div>
              <h2 className="section" style={{marginTop:0, fontSize:'clamp(24px,2.6vw,34px)'}}>{featured.title}</h2>
              <p className="lede" style={{marginTop:6}}>{featured.excerpt}</p>
              <div style={{display:'flex', gap:14, marginTop:24, fontSize:13, color:'var(--text-3)', fontFamily:'var(--font-mono)'}}>
                <span>{featured.author}</span><span>·</span>
                <span>{featured.date}</span><span>·</span>
                <span>{featured.read} read</span>
              </div>
              <div style={{marginTop:24}}>
                <button className="btn btn-primary" onClick={() => openArticle(featured)}>Read article <span className="arrow">→</span></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{paddingTop:24}}>
        <div className="container">
          {/* Top controls */}
          <div style={{display:'flex', flexWrap:'wrap', gap:14, justifyContent:'space-between', alignItems:'center', marginBottom:16}}>
            <div className="tabs">
              {[['all','All'],['news','News'],['blogs','Blogs']].map(([k,l]) => (
                <div key={k} className={`tab ${tab===k?'active':''}`} onClick={() => setTab(k)}>{l}</div>
              ))}
            </div>
            <div className="search" style={{minWidth:280, maxWidth:380, flex:1}}>
              <Icons.search size={16}/>
              <input placeholder="Search articles, tags…" value={q} onChange={e => setQ(e.target.value)} />
              <kbd>⌘K</kbd>
            </div>
          </div>

          <div style={{display:'flex', flexWrap:'wrap', gap:8, marginBottom:32}}>
            {cats.map(c => (
              <div key={c} className={`pill ${cat===c?'active':''}`} style={{border:'1px solid', borderColor: cat===c?'rgba(56,189,248,0.25)':'var(--line)'}} onClick={() => setCat(c)}>{c}</div>
            ))}
          </div>

          {/* Grid + Sidebar */}
          <div style={{display:'grid', gridTemplateColumns:'1fr 280px', gap:32}} className="article-grid">
            <div>
              {filtered.length === 0 ? (
                <div className="card" style={{textAlign:'center', padding:60}}>
                  <Icons.search size={32}/>
                  <h3 className="card" style={{marginTop:14}}>No matches</h3>
                  <p className="muted" style={{fontSize:14, marginTop:6}}>Try a different query or category.</p>
                </div>
              ) : (
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
                  {filtered.map((x,i) => (
                    <ArticleCard key={x.id} x={x} i={i} onClick={() => openArticle(x)} onMove={onCardMove}/>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div style={{display:'flex', justifyContent:'center', marginTop:40}}>
                <div className="pager">
                  <button>‹</button>
                  {[1,2,3,4].map(n => <button key={n} className={n===page?'active':''} onClick={() => setPage(n)}>{n}</button>)}
                  <button>›</button>
                </div>
              </div>
            </div>

            <aside style={{display:'flex', flexDirection:'column', gap:18, position:'sticky', top:92, alignSelf:'start'}}>
              <div className="card flat">
                <h5 style={{fontSize:11, letterSpacing:'.14em', textTransform:'uppercase', color:'var(--text-3)', margin:'0 0 14px', fontFamily:'var(--font-mono)'}}>Trending</h5>
                <div style={{display:'flex', flexWrap:'wrap', gap:6}}>
                  {TRENDING.map(t => <span key={t} className="chip" style={{cursor:'pointer'}} onClick={() => setQ(t.replace('#',''))}>{t}</span>)}
                </div>
              </div>
              <div className="card flat" style={{background:'linear-gradient(180deg, rgba(29,155,240,0.08), rgba(17,24,39,0.45))', borderColor:'rgba(56,189,248,0.25)'}}>
                <span className="eyebrow">Newsletter</span>
                <h3 className="card" style={{marginTop:10}}>Quiet weekly briefing.</h3>
                <p className="muted" style={{fontSize:13, marginTop:6}}>A short Friday email — three items worth knowing, one practical action.</p>
                <div className="search" style={{marginTop:14}}>
                  <Icons.mail size={14}/>
                  <input placeholder="you@domain.com"/>
                </div>
                <button className="btn btn-primary btn-sm" style={{marginTop:10, width:'100%', justifyContent:'center'}}>Subscribe</button>
              </div>
              <div className="card flat">
                <h5 style={{fontSize:11, letterSpacing:'.14em', textTransform:'uppercase', color:'var(--text-3)', margin:'0 0 14px', fontFamily:'var(--font-mono)'}}>Emergency</h5>
                <p className="muted" style={{fontSize:13, marginBottom:14}}>Victim of cyber fraud? Open the verified portal directory.</p>
                <button className="btn btn-danger-soft btn-sm" style={{width:'100%', justifyContent:'center'}} onClick={onReport}>
                  Open portals
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

function ArticleCard({ x, i, onClick, onMove }) {
  const isNews = x.kind === 'news';
  const hues = [190, 220, 260, 170, 230, 200, 195];
  const glyphs = [Icons.alert, Icons.bug, Icons.lock, Icons.fingerprint, Icons.network, Icons.brain, Icons.shield];
  const G = glyphs[i % glyphs.length];
  return (
    <div className="card news-card reveal" onMouseMove={onMove} onClick={onClick} style={{transitionDelay:`${i*30}ms`}}>
      <div className="thumb">
        <Cover label={isNews ? `External · ${x.source}` : 'Internal · Field Notes'} hue={hues[i % hues.length]} glyph={<G size={48}/>}/>
      </div>
      <div className="body">
        <div className="meta-row" style={{marginBottom:8}}>
          <span className={`chip ${isNews?'':'accent'}`}>{isNews ? 'News' : 'Blog'}</span>
          <span className="chip">{x.cat}</span>
          <span>·</span>
          <span>{x.read}</span>
        </div>
        <h3 className="card">{x.title}</h3>
        <p className="excerpt">{x.excerpt}</p>
        <div className="meta-row" style={{marginTop:14, paddingTop:14, borderTop:'1px solid var(--line)'}}>
          <span>{isNews ? x.source : x.author}</span>
          <span>·</span>
          <span>{x.date}</span>
        </div>
      </div>
    </div>
  );
}

// ============== Article reader ==============
function ArticlePage({ article, back, openArticle }) {
  useReveal();
  const [active, setActive] = React.useState(0);
  const sections = ['Overview','The four tells','What to do in the moment','For your team','Closing thoughts'];

  const related = (BLOGS.concat(NEWS)).filter(x => x.id !== article.id).slice(0, 3);
  const isNews = article.kind === 'news';

  return (
    <>
      <section className="page-header" style={{paddingBottom:24}}>
        <div className="container">
          <div className="crumb reveal in" style={{display:'flex', gap:10, alignItems:'center'}}>
            <span style={{cursor:'pointer', color:'var(--accent-glow)'}} onClick={back}>← Back to feed</span>
            <span>/</span>
            <span>{isNews ? 'News' : 'Blog'}</span>
            <span>/</span>
            <span>{article.cat}</span>
          </div>
          <h1 className="display reveal in" style={{fontSize:'clamp(32px, 4.4vw, 60px)', marginTop:18}}>{article.title}</h1>
          <div className="reveal in" style={{display:'flex', gap:14, fontSize:13, color:'var(--text-3)', fontFamily:'var(--font-mono)', marginTop:14, flexWrap:'wrap'}}>
            <span>{isNews ? article.source : article.author}</span><span>·</span>
            <span>{article.date}</span><span>·</span>
            <span>{article.read} read</span>
            {isNews && <><span>·</span><a className="mono" style={{color:'var(--accent-glow)', textDecoration:'none', display:'inline-flex', gap:6, alignItems:'center'}}>Original source <Icons.external size={12}/></a></>}
          </div>
        </div>
      </section>

      <section className="section" style={{paddingTop:24}}>
        <div className="container">
          <div className="card" style={{padding:0, overflow:'hidden', marginBottom:48, position:'relative'}}>
            <div style={{aspectRatio:'16/6', position:'relative'}}>
              <Cover label={`${article.cat} · ${article.kind === 'news' ? 'External' : 'Internal'}`} hue={205} glyph={<Icons.book size={96}/>}/>
            </div>
          </div>

          <div className="article-grid">
            <aside>
              <h5>On this page</h5>
              {sections.map((s,i) => (
                <a key={i} className={active===i?'active':''} onClick={() => setActive(i)}>{s}</a>
              ))}
              <h5 style={{marginTop:32}}>Share</h5>
              <div style={{display:'flex', gap:8}}>
                {[Icons.twitter, Icons.linkedin, Icons.mail].map((Ic, i) => (
                  <div key={i} style={{width:34, height:34, display:'grid', placeItems:'center', borderRadius:8, border:'1px solid var(--line-2)', color:'var(--text-2)', cursor:'pointer'}}>
                    <Ic size={14}/>
                  </div>
                ))}
              </div>
            </aside>

            <div className="prose">
              <p style={{fontSize:19, color:'var(--text)'}}>{article.excerpt}</p>
              <h2>Overview</h2>
              <p>The pattern is consistent enough that you can spot it in the first sixty seconds of contact — provided you know what to listen for. This piece walks through the playbook the practice has assembled from working live cases since early 2024, structured so anyone in a finance, HR or executive seat can use it without further training.</p>
              <p>The framing matters: this is not about hardening your devices. It is about recognising a social-engineering script and ending the call. The technical surface is almost incidental.</p>
              <blockquote>
                The most expensive line in every digital-arrest case we've seen begins the same way: <em>"I was made to feel like I had no other option."</em>
              </blockquote>
              <h2>The four tells</h2>
              <p>Across roughly forty calls reviewed in 2025-26, four signals show up reliably enough to qualify as a checklist.</p>
              <ul>
                <li><strong>Urgency framed as legal jeopardy.</strong> The caller asserts a warrant, an FIR, or a customs intercept — and frames silence as obstruction.</li>
                <li><strong>Pressure to switch channels.</strong> A pivot to WhatsApp, Skype or Zoom, away from a recorded telco line, is almost always present.</li>
                <li><strong>Isolation requests.</strong> "Don't tell anyone, this is sealed." This is the single most diagnostic line.</li>
                <li><strong>Money movement.</strong> An eventual ask to <code>self-transfer</code> funds to a "secure RBI account" for verification.</li>
              </ul>
              <h2>What to do in the moment</h2>
              <p>End the call. There is no penalty for hanging up on an impersonator. If the caller is genuine — and they are not — the agency will contact you through a non-time-pressured channel.</p>
              <p>Note the time and the number. Open the National Cyber Crime Reporting Portal, file a complaint, and call 1930 within the first 24 hours. Do not pay anything; do not share OTPs, Aadhaar numbers, or screen-share.</p>
              <h2>For your team</h2>
              <p>If you run a finance or HR team, the highest-leverage thing you can do this quarter is a 30-minute briefing built around these four tells, followed by a single live simulation. The cost of one prevented incident pays for years of awareness work.</p>
              <h2>Closing thoughts</h2>
              <p>The technical infrastructure behind these calls is mundane. The reason they work is psychological pressure applied at speed. The defence is also psychological: <em>nobody legitimate behaves this way</em>. Internalise that, and the rest follows.</p>
              <hr/>
              <p className="muted">— Vibhum Dubey, Cybercell field notes</p>
            </div>

            <aside>
              <h5>Related</h5>
              <div style={{display:'flex', flexDirection:'column', gap:14, marginTop:6}}>
                {related.map(r => (
                  <div key={r.id} onClick={() => openArticle(r)} style={{cursor:'pointer'}}>
                    <span className="chip" style={{fontSize:10}}>{r.cat}</span>
                    <div style={{fontSize:14, color:'var(--text)', marginTop:6, lineHeight:1.35}}>{r.title}</div>
                    <div className="mono tiny" style={{color:'var(--text-3)', marginTop:4}}>{r.read}</div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

window.NewsPage = NewsPage;
window.ArticlePage = ArticlePage;
