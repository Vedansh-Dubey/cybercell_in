/* global React, Icons, useReveal, useHoverLight, PORTALS */

function ContactPage({ onReport, onToast }) {
  useReveal();
  const onCardMove = useHoverLight();
  const [form, setForm] = React.useState({ name:'', email:'', subject:'General enquiry', message:'' });
  const [errs, setErrs] = React.useState({});
  const [status, setStatus] = React.useState('idle'); // idle | loading | ok | err

  const update = (k, v) => { setForm(f => ({...f, [k]: v})); setErrs(e => ({...e, [k]: undefined})); };

  const submit = async () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'A valid email keeps the reply chain working.';
    if (form.message.trim().length < 12) e.message = 'A line or two of context speeds up the reply.';
    setErrs(e);
    if (Object.keys(e).length) return;
    setStatus('loading');
    await new Promise(r => setTimeout(r, 1100));
    setStatus('ok');
    onToast('Message sent — you\'ll hear back within one working day.');
    setForm({ name:'', email:'', subject:'General enquiry', message:'' });
    setTimeout(() => setStatus('idle'), 1500);
  };

  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="crumb reveal in">Contact · Practice · Vibhum Dubey</div>
          <div style={{display:'grid', gridTemplateColumns:'1.3fr 1fr', gap:64, marginTop:14}} className="hero-inner">
            <div className="reveal in">
              <h1 className="display" style={{fontSize:'clamp(36px,5vw,68px)'}}>A direct line, not a ticket queue.</h1>
            </div>
            <div className="reveal in">
              <p className="lede">Messages arrive in a single inbox read by one person. Replies are typically within a working day; for active incidents, faster.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{paddingTop:24}}>
        <div className="container">
          <div style={{display:'grid', gridTemplateColumns:'1.1fr 1fr', gap:48, alignItems:'start'}} className="hero-inner">

            {/* LEFT — Form */}
            <div className="card reveal" style={{padding:36}} onMouseMove={onCardMove}>
              <span className="eyebrow">Send a message</span>
              <h2 className="section" style={{fontSize:'clamp(22px,2.4vw,30px)', margin:'12px 0 8px'}}>Tell us what's on your mind.</h2>
              <p className="muted" style={{fontSize:14, marginBottom:24}}>Nothing here is sent over plain HTTP. Fields are validated client-side; replies come from a real human.</p>

              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
                <div className={`field ${errs.name?'bad':form.name?'ok':''}`}>
                  <label>Name</label>
                  <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your name"/>
                  {errs.name && <span className="err">{errs.name}</span>}
                </div>
                <div className={`field ${errs.email?'bad':form.email?'ok':''}`}>
                  <label>Email</label>
                  <input value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@domain.com"/>
                  {errs.email && <span className="err">{errs.email}</span>}
                </div>
              </div>

              <div className="field" style={{marginTop:14}}>
                <label>Subject</label>
                <select value={form.subject} onChange={e => update('subject', e.target.value)}>
                  <option>General enquiry</option>
                  <option>Project / engagement</option>
                  <option>Incident — active</option>
                  <option>Awareness training</option>
                  <option>Personal hygiene consultation</option>
                  <option>Press or speaking</option>
                </select>
              </div>

              <div className={`field ${errs.message?'bad':form.message?'ok':''}`} style={{marginTop:14}}>
                <label>Message</label>
                <textarea value={form.message} onChange={e => update('message', e.target.value)} placeholder="A couple of lines on what you're trying to do, who's involved, and any deadlines."/>
                {errs.message && <span className="err">{errs.message}</span>}
              </div>

              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:22, gap:14, flexWrap:'wrap'}}>
                <div className="mono tiny" style={{color:'var(--text-3)', display:'flex', alignItems:'center', gap:8}}>
                  <Icons.lock size={12}/> End-to-end via TLS · GPG key available on request
                </div>
                <button className="btn btn-primary btn-lg" onClick={submit} disabled={status==='loading'}>
                  {status === 'loading' ? <>
                    <span className="skel" style={{display:'inline-block', width:14, height:14, borderRadius:'50%'}}></span>
                    Sending…
                  </> : status === 'ok' ? <>
                    <Icons.check size={16}/> Sent
                  </> : <>
                    Send message <Icons.send size={16}/>
                  </>}
                </button>
              </div>
            </div>

            {/* RIGHT — contact details */}
            <div style={{display:'flex', flexDirection:'column', gap:16}}>
              <div className="card reveal" onMouseMove={onCardMove}>
                <div style={{display:'flex', gap:16, alignItems:'center'}}>
                  <div style={{width:64, height:64, borderRadius:'50%', background:'linear-gradient(135deg, rgba(29,155,240,0.35), rgba(56,189,248,0.10))', border:'1px solid rgba(56,189,248,0.35)', display:'grid', placeItems:'center', fontFamily:'var(--font-mono)', fontSize:20}}>VD</div>
                  <div>
                    <div style={{fontSize:18, fontWeight:500}}>Vibhum Dubey</div>
                    <div className="mono tiny" style={{color:'var(--text-2)', marginTop:4}}>Cybersecurity Practitioner · Cybercell.in</div>
                  </div>
                </div>
                <p className="muted" style={{fontSize:14, marginTop:16}}>
                  Founder and sole practitioner. Reaches every message personally.
                </p>
                <div style={{display:'grid', gap:10, marginTop:18}}>
                  {[
                    {ic:Icons.mail, t:'hello@cybercell.in', sub:'Primary'},
                    {ic:Icons.phone, t:'+91 — shared on engagement', sub:'No cold calls, please'},
                    {ic:Icons.globe, t:'cybercell.in', sub:'India · Remote worldwide'},
                  ].map(({ic:Ic,t,sub},i)=>(
                    <div key={i} style={{display:'flex', gap:14, alignItems:'center', padding:'12px 0', borderTop: i?'1px solid var(--line)':'none'}}>
                      <div style={{width:32, height:32, borderRadius:8, border:'1px solid var(--line-2)', display:'grid', placeItems:'center', color:'var(--accent-glow)'}}><Ic size={14}/></div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:14}}>{t}</div>
                        <div className="mono tiny" style={{color:'var(--text-3)'}}>{sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{display:'flex', gap:8, marginTop:14, paddingTop:14, borderTop:'1px solid var(--line)'}}>
                  {[Icons.github, Icons.linkedin, Icons.twitter].map((Ic,i) => (
                    <div key={i} style={{width:36, height:36, display:'grid', placeItems:'center', borderRadius:10, border:'1px solid var(--line-2)', color:'var(--text-2)', cursor:'pointer'}}>
                      <Ic size={16}/>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card reveal" style={{background:'linear-gradient(180deg, rgba(239,68,68,0.08), rgba(17,24,39,0.45))', borderColor:'rgba(239,68,68,0.30)'}} onMouseMove={onCardMove}>
                <span className="chip danger" style={{marginBottom:14}}>
                  <span style={{display:'inline-block', width:8, height:8, borderRadius:'50%', background:'var(--danger)', boxShadow:'0 0 8px var(--danger)'}}></span>
                  Cyber fraud · Emergency
                </span>
                <h3 className="card">Are you a victim of cyber fraud?</h3>
                <p className="muted" style={{fontSize:14, marginTop:8}}>
                  Open the verified portal directory — national hotlines, official reporting URLs, and step-by-step guidance for the first 24 hours.
                </p>
                <button className="btn btn-danger-soft btn-lg" style={{marginTop:18, width:'100%', justifyContent:'center'}} onClick={onReport}>
                  Open emergency portals <Icons.arrow size={16}/>
                </button>
              </div>

              <div className="card reveal" onMouseMove={onCardMove}>
                <h3 className="card">Working hours</h3>
                <div style={{display:'grid', gridTemplateColumns:'1fr auto', gap:'10px 20px', marginTop:14, fontSize:14}}>
                  <span className="muted">Mon — Fri</span><span className="mono">09:00 — 19:00 IST</span>
                  <span className="muted">Saturday</span><span className="mono">11:00 — 15:00 IST</span>
                  <span className="muted">Sunday</span><span className="mono">Closed (incidents only)</span>
                  <span className="muted">Incidents</span><span className="mono" style={{color:'var(--accent-glow)'}}>24 / 7 within window</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ============== Emergency Portals Drawer ==============
function EmergencyDrawer({ onClose }) {
  const [q, setQ] = React.useState('');
  const [country, setCountry] = React.useState('All');

  const items = PORTALS.flatMap(g => g.items.map(i => ({...i, country:g.country})))
    .filter(i => country==='All' || i.country===country)
    .filter(i => !q || (i.name + ' ' + i.desc + ' ' + i.url).toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <div className="scrim" onClick={onClose}></div>
      <div className="drawer">
        <div className="drawer-header">
          <div>
            <span className="chip danger"><span style={{display:'inline-block',width:6,height:6,borderRadius:'50%',background:'var(--danger)',boxShadow:'0 0 8px var(--danger)'}}></span>Emergency directory</span>
            <h3 className="card" style={{marginTop:10}}>Cyber fraud — official portals</h3>
          </div>
          <button className="x-btn" onClick={onClose}><Icons.close size={14}/></button>
        </div>
        <div className="drawer-body">
          {/* First steps */}
          <div className="card flat" style={{borderColor:'rgba(245,158,11,0.30)', background:'rgba(245,158,11,0.06)', marginBottom:18}}>
            <h4 style={{margin:0, fontSize:14, color:'#fbbf24'}}>If it's happening right now</h4>
            <ol style={{margin:'10px 0 0 18px', padding:0, fontSize:13, color:'var(--text-2)', lineHeight:1.7}}>
              <li>Stop talking. End the call.</li>
              <li>Do not pay, share OTPs, screen-share or install anything.</li>
              <li>Note the time, number, and any reference IDs.</li>
              <li>Call your country's hotline (below) within 24 hours.</li>
            </ol>
          </div>

          {/* Filters */}
          <div className="search" style={{marginBottom:12}}>
            <Icons.search size={14}/>
            <input placeholder="Search portals…" value={q} onChange={e => setQ(e.target.value)}/>
          </div>
          <div style={{display:'flex', flexWrap:'wrap', gap:6, marginBottom:18}}>
            {['All', ...PORTALS.map(g => g.country)].map(c => (
              <div key={c} className={`pill ${country===c?'active':''}`} onClick={() => setCountry(c)} style={{fontSize:12, padding:'6px 12px'}}>{c}</div>
            ))}
          </div>

          {/* Grouped list */}
          {PORTALS.filter(g => country==='All' || g.country===country).map(group => {
            const groupItems = group.items.filter(i => !q || (i.name + ' ' + i.desc + ' ' + i.url).toLowerCase().includes(q.toLowerCase()));
            if (!groupItems.length) return null;
            return (
              <div key={group.country} style={{marginBottom:24}}>
                <h5 style={{margin:'0 0 10px', fontSize:11, fontFamily:'var(--font-mono)', letterSpacing:'.14em', textTransform:'uppercase', color:'var(--text-3)'}}>
                  {group.country}
                </h5>
                <div style={{display:'flex', flexDirection:'column', gap:10}}>
                  {groupItems.map(it => (
                    <div key={it.url} className="card flat" style={{padding:16}}>
                      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:10}}>
                        <div style={{flex:1}}>
                          <div style={{fontSize:14, color:'var(--text)', fontWeight:500}}>{it.name}</div>
                          <div className="mono tiny" style={{color:'var(--accent-glow)', marginTop:4}}>{it.url}</div>
                        </div>
                        {it.hot && it.hot !== '—' && (
                          <div style={{textAlign:'right'}}>
                            <div className="mono tiny" style={{color:'var(--text-3)'}}>Hotline</div>
                            <div style={{fontSize:14, fontFamily:'var(--font-mono)', color:'#fca5a5'}}>{it.hot}</div>
                          </div>
                        )}
                      </div>
                      <p className="muted" style={{fontSize:12, marginTop:10, lineHeight:1.55}}>{it.desc}</p>
                      <div style={{display:'flex', gap:8, marginTop:12}}>
                        <button className="btn btn-ghost btn-sm" style={{padding:'6px 12px', fontSize:12}}>
                          Open portal <Icons.external size={12}/>
                        </button>
                        {it.hot && it.hot !== '—' && (
                          <button className="btn btn-danger-soft btn-sm" style={{padding:'6px 12px', fontSize:12}}>
                            <Icons.phone size={12}/> Call {it.hot}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="mono tiny" style={{color:'var(--text-3)', textAlign:'center', padding:'18px 0 0', borderTop:'1px solid var(--line)'}}>
            Directory maintained by Cybercell · Last verified 12 May 2026
          </div>
        </div>
      </div>
    </>
  );
}

// ============== Service Modal ==============
function ServiceModal({ service, onClose, goContact }) {
  const Ic = service.icon;
  return (
    <>
      <div className="scrim" onClick={onClose}></div>
      <div className="modal" onClick={onClose}>
        <div className="modal-inner" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <div style={{display:'flex', alignItems:'center', gap:14}}>
              <div className="icon-wrap" style={{margin:0}}><Ic size={20}/></div>
              <div>
                <div className="mono tiny" style={{color:'var(--accent-glow)'}}>Service detail</div>
                <h3 className="card" style={{marginTop:2}}>{service.name}</h3>
              </div>
            </div>
            <button className="x-btn" onClick={onClose}><Icons.close size={14}/></button>
          </div>
          <div className="modal-body">
            <p style={{fontSize:17, color:'var(--text)', lineHeight:1.6}}>{service.long}</p>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:14, margin:'28px 0'}}>
              <div className="card flat">
                <div className="mono tiny" style={{color:'var(--text-3)'}}>Typical duration</div>
                <div style={{fontSize:16, marginTop:6, fontWeight:500}}>{service.duration}</div>
              </div>
              <div className="card flat">
                <div className="mono tiny" style={{color:'var(--text-3)'}}>Deliverable</div>
                <div style={{fontSize:16, marginTop:6, fontWeight:500}}>{service.delivery}</div>
              </div>
              <div className="card flat">
                <div className="mono tiny" style={{color:'var(--text-3)'}}>Engagement</div>
                <div style={{fontSize:16, marginTop:6, fontWeight:500}}>Fixed-fee SOW</div>
              </div>
            </div>
            <h4 style={{fontSize:13, color:'var(--text-3)', fontFamily:'var(--font-mono)', letterSpacing:'.14em', textTransform:'uppercase', margin:'24px 0 14px'}}>What's typically included</h4>
            <ul style={{margin:0, padding:0, listStyle:'none', display:'flex', flexDirection:'column', gap:10}}>
              {[
                'Pre-engagement scoping call and engagement letter',
                'Weekly written status, escalations as needed',
                'Findings shared continuously, not at end-of-project',
                'Final report — technical and executive versions',
                'Two-week retest window after closeout',
              ].map((t,i) => (
                <li key={i} style={{display:'flex', gap:10, color:'var(--text-2)', fontSize:14}}>
                  <Icons.check size={16}/> {t}
                </li>
              ))}
            </ul>
            <div style={{display:'flex', gap:10, marginTop:24, flexWrap:'wrap'}}>
              {service.tags.map(t => <span key={t} className="chip">{t}</span>)}
            </div>
          </div>
          <div style={{padding:'18px 26px', borderTop:'1px solid var(--line)', display:'flex', justifyContent:'space-between', alignItems:'center', gap:12, flexWrap:'wrap'}}>
            <div className="mono tiny" style={{color:'var(--text-3)'}}>Want a tailored scope? Start a conversation.</div>
            <div style={{display:'flex', gap:10}}>
              <button className="btn btn-ghost btn-sm" onClick={onClose}>Close</button>
              <button className="btn btn-primary btn-sm" onClick={() => { onClose(); goContact(); }}>
                Discuss this service <Icons.arrow size={14}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

window.ContactPage = ContactPage;
window.EmergencyDrawer = EmergencyDrawer;
window.ServiceModal = ServiceModal;
