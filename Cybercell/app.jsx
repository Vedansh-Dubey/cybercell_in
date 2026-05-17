/* global React, ReactDOM, Navbar, Footer, HomePage, ServicesPage, NewsPage, ArticlePage, ContactPage, EmergencyDrawer, ServiceModal, Icons, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakToggle, TweakSlider */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#1d9bf0",
  "glow": "#38bdf8",
  "showGrid": true,
  "density": "comfortable",
  "heroStyle": "topology",
  "cornerStyle": "soft"
}/*EDITMODE-END*/;

function App() {
  const [page, setPage] = React.useState('home');
  const [reportOpen, setReportOpen] = React.useState(false);
  const [activeService, setActiveService] = React.useState(null);
  const [article, setArticle] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweaks to root
  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--accent', t.accent);
    r.style.setProperty('--accent-glow', t.glow);
    const dim = t.accent + '24'; // approx 14% alpha
    r.style.setProperty('--accent-dim', `${hexAlpha(t.accent, 0.14)}`);
    if (t.density === 'compact') {
      r.style.setProperty('--maxw', '1180px');
      document.body.style.setProperty('--section-pad', '72px');
    } else {
      r.style.setProperty('--maxw', '1240px');
    }
    const rad = t.cornerStyle === 'sharp' ? '4px' : t.cornerStyle === 'pill' ? '28px' : '14px';
    const radLg = t.cornerStyle === 'sharp' ? '8px' : t.cornerStyle === 'pill' ? '32px' : '20px';
    r.style.setProperty('--radius', rad);
    r.style.setProperty('--radius-lg', radLg);
    document.querySelector('.bg-grid').style.opacity = t.showGrid ? '1' : '0';
  }, [t]);

  const onToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  const openArticle = (a) => { setArticle(a); window.scrollTo({top:0, behavior:'instant'}); };
  const closeArticle = () => { setArticle(null); window.scrollTo({top:0, behavior:'instant'}); };

  // Esc closes drawer/modal
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (activeService) setActiveService(null);
        else if (reportOpen) setReportOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeService, reportOpen]);

  let pageEl;
  if (article) {
    pageEl = <ArticlePage article={article} back={closeArticle} openArticle={openArticle}/>;
  } else if (page === 'home') {
    pageEl = <HomePage setPage={setPage} onReport={() => setReportOpen(true)} openArticle={openArticle} openService={setActiveService}/>;
  } else if (page === 'services') {
    pageEl = <ServicesPage setPage={setPage} openService={setActiveService} onReport={() => setReportOpen(true)}/>;
  } else if (page === 'news') {
    pageEl = <NewsPage openArticle={openArticle} onReport={() => setReportOpen(true)}/>;
  } else if (page === 'contact') {
    pageEl = <ContactPage onReport={() => setReportOpen(true)} onToast={onToast}/>;
  }

  return (
    <>
      <div className="bg-atmosphere"></div>
      <div className="bg-grid"></div>
      <div className="app">
        <Navbar page={article ? page : page} setPage={(p) => { setArticle(null); setPage(p); }} onReport={() => setReportOpen(true)}/>
        <main style={{flex:1}}>{pageEl}</main>
        <Footer setPage={(p) => { setArticle(null); setPage(p); window.scrollTo({top:0}); }}/>
      </div>

      {reportOpen && <EmergencyDrawer onClose={() => setReportOpen(false)}/>}
      {activeService && <ServiceModal service={activeService} onClose={() => setActiveService(null)} goContact={() => setPage('contact')}/>}

      {toast && (
        <div className="toast">
          <Icons.check size={16}/> {toast}
        </div>
      )}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Brand color">
          <TweakColor label="Accent" value={t.accent} onChange={(v) => setTweak({ accent: v, glow: v })}
            options={['#1d9bf0','#3b82f6','#22c55e','#f59e0b','#a855f7','#ef4444']}/>
        </TweakSection>
        <TweakSection label="Surface">
          <TweakToggle label="Cyber grid background" value={t.showGrid} onChange={(v) => setTweak('showGrid', v)}/>
          <TweakRadio label="Density" value={t.density} onChange={(v) => setTweak('density', v)} options={[
            { value:'comfortable', label:'Cozy' },
            { value:'compact', label:'Compact' },
          ]}/>
          <TweakRadio label="Corners" value={t.cornerStyle} onChange={(v) => setTweak('cornerStyle', v)} options={[
            { value:'sharp', label:'Sharp' },
            { value:'soft', label:'Soft' },
            { value:'pill', label:'Round' },
          ]}/>
        </TweakSection>
        <TweakSection label="Navigate">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
            <button className="btn btn-ghost btn-sm" onClick={() => { setArticle(null); setPage('home'); window.scrollTo({top:0}); }}>Home</button>
            <button className="btn btn-ghost btn-sm" onClick={() => { setArticle(null); setPage('services'); window.scrollTo({top:0}); }}>Services</button>
            <button className="btn btn-ghost btn-sm" onClick={() => { setArticle(null); setPage('news'); window.scrollTo({top:0}); }}>News & Blogs</button>
            <button className="btn btn-ghost btn-sm" onClick={() => { setArticle(null); setPage('contact'); window.scrollTo({top:0}); }}>Contact</button>
          </div>
          <button className="btn btn-danger-soft btn-sm" style={{width:'100%', justifyContent:'center', marginTop:8}} onClick={() => setReportOpen(true)}>
            Open emergency drawer
          </button>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

function hexAlpha(hex, a) {
  const n = parseInt(hex.replace('#',''), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
