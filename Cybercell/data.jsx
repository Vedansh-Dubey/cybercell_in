/* global Icons */

const SERVICES = [
  { id:'pentest', icon: Icons.bug, name:'Penetration Testing',
    short:'Adversary-simulated assessments of web, API, mobile, and cloud surfaces.',
    long:'A structured, ethical attack against your real systems. We chain misconfigurations, business-logic gaps and authentication weaknesses the way an attacker would — then document the path so you can close it.',
    tags:['Web','API','Mobile','Cloud'], duration:'2–6 weeks', delivery:'Report + retest' },
  { id:'vapt', icon: Icons.scan, name:'Vulnerability Assessment',
    short:'Broad-spectrum scanning, triage and remediation guidance.',
    long:'Authenticated and unauthenticated scanning across infrastructure, with manual validation to remove the noise. You get a ranked list, not a 400-page PDF.',
    tags:['Infra','Apps','Validated'], duration:'1–3 weeks', delivery:'Findings register' },
  { id:'consult', icon: Icons.briefcase, name:'Cybersecurity Consultancy',
    short:'Fractional security leadership for teams without a CISO.',
    long:'Strategy, policy, roadmap, vendor selection and board-level reporting. Engagement is monthly retainer — you get a senior partner, not a junior auditor.',
    tags:['Strategy','vCISO','Roadmap'], duration:'Ongoing', delivery:'Retainer' },
  { id:'ir', icon: Icons.alert, name:'Incident Response',
    short:'Calm, methodical containment when something has gone wrong.',
    long:'Triage, scoping, containment, eradication, recovery. 24-hour engagement window for active incidents; forensic timeline and lessons-learned report at close.',
    tags:['24h','Forensics','Containment'], duration:'Hours–weeks', delivery:'Timeline + report' },
  { id:'audit', icon: Icons.layers, name:'Security Audits',
    short:'Controls and posture reviews against ISO 27001, SOC 2 and CERT-In.',
    long:'Gap analysis against the framework that matters to your industry. We focus on practical remediation, not checkbox theatre.',
    tags:['ISO 27001','SOC 2','CERT-In'], duration:'3–8 weeks', delivery:'Audit dossier' },
  { id:'awareness', icon: Icons.brain, name:'Security Awareness Training',
    short:'Workshops and learning paths for employees and executives.',
    long:'Role-based modules — finance teams get wire-fraud and BEC, devs get secure coding, leadership gets risk and reporting. Live sessions or async curriculum.',
    tags:['Live','Async','Role-based'], duration:'1 day–quarterly', delivery:'Curriculum + certs' },
  { id:'osint', icon: Icons.fingerprint, name:'OSINT Investigations',
    short:'Open-source intelligence to surface impersonation, leaks and exposure.',
    long:'We map your organizational footprint across the open and surface web — leaked credentials, look-alike domains, exposed cloud buckets, executive impersonation.',
    tags:['Brand','Exec','Domain'], duration:'1–2 weeks', delivery:'Intel brief' },
  { id:'risk', icon: Icons.trending, name:'Digital Risk Assessment',
    short:'Holistic risk register for digital assets, vendors and data flows.',
    long:'Map what you have, where it sits, who touches it and what breaks if it leaks. Output is a prioritized register your leadership can actually act on.',
    tags:['Register','Vendors','Data'], duration:'2–4 weeks', delivery:'Risk register' },
  { id:'phish', icon: Icons.mail, name:'Phishing Simulation',
    short:'Realistic, kind phishing campaigns that teach instead of shame.',
    long:'Tailored lures, landing pages and just-in-time micro-lessons. Reporting on click-through, credential entry and report rates — no public name-and-shame.',
    tags:['Campaign','Just-in-time','Reporting'], duration:'Per campaign', delivery:'Campaign report' },
  { id:'personal', icon: Icons.user, name:'Personal Cyber Hygiene',
    short:'1:1 consultations for founders, journalists, families and execs.',
    long:'A private 90-minute session: device hardening, password and MFA setup, social media exposure, family safety plan. Practical, plain-language, zero judgement.',
    tags:['Private','Family','Travel'], duration:'90 min', delivery:'Hygiene plan' },
];

const NEWS = [
  { id:'n1', kind:'news', cat:'Threat Intelligence',
    title:'New ClickFix variant pivots to LinkedIn job lures, targets HR pipelines',
    excerpt:'Operators are shifting from generic CAPTCHA pages to bespoke recruiter portals, lowering suspicion among finance and HR users who expect external traffic.',
    source:'BleepingComputer', date:'May 14, 2026', read:'4 min', tags:['Phishing','Social engineering'] },
  { id:'n2', kind:'news', cat:'Malware',
    title:'RemcosRAT distribution rebounds after takedown, now signed with stolen EV certs',
    excerpt:'A 6-week lull ends with samples using extended-validation signatures lifted from a Korean software vendor.',
    source:'The Hacker News', date:'May 13, 2026', read:'3 min', tags:['Malware','Supply chain'] },
  { id:'n3', kind:'news', cat:'Privacy',
    title:'DPDP Act second draft adds explicit rules for AI training data consent',
    excerpt:'India\'s Data Protection Board signals enforcement priorities; organizations training models on Indian users must rework consent flows by Q4.',
    source:'MeitY', date:'May 11, 2026', read:'6 min', tags:['Regulation','India','AI'] },
  { id:'n4', kind:'news', cat:'Fraud',
    title:'Mule networks pivot to UPI lite for sub-2000 rupee transfers, evading thresholds',
    excerpt:'Cybercrime cells in three states report a 38% rise in micro-transfer chains over six weeks.',
    source:'I4C Bulletin', date:'May 10, 2026', read:'5 min', tags:['Fraud','UPI'] },
  { id:'n5', kind:'news', cat:'Awareness',
    title:'\"Digital arrest\" scam playbook circulates among regional call centres',
    excerpt:'A leaked training deck reveals scripts impersonating CBI and Mumbai Police, with rebuttals for common victim objections.',
    source:'Internal research', date:'May 8, 2026', read:'7 min', tags:['Scam','Awareness'] },
];

const BLOGS = [
  { id:'b1', kind:'blog', cat:'Awareness',
    title:'A field guide to recognising the \"digital arrest\" scam',
    excerpt:'The pattern is consistent enough that you can spot it in the first 60 seconds — if you know the four tells. Here\'s the playbook, in plain language.',
    author:'Vibhum Dubey', date:'May 12, 2026', read:'8 min',
    tags:['Awareness','Fraud','India'], featured: true },
  { id:'b2', kind:'blog', cat:'Privacy',
    title:'MFA without the friction: choosing the right second factor for your team',
    excerpt:'SMS, TOTP, push, passkey, hardware key — they aren\'t equivalent. A decision tree for picking what your users will actually use.',
    author:'Vibhum Dubey', date:'May 06, 2026', read:'10 min',
    tags:['MFA','Identity'] },
  { id:'b3', kind:'blog', cat:'Threat Intelligence',
    title:'What we found doing OSINT on 30 Indian SMBs (and what it means for yours)',
    excerpt:'Across a 30-org sample we mapped exposure in roughly an hour each. The patterns repeat — and most of them are cheap to fix.',
    author:'Vibhum Dubey', date:'Apr 28, 2026', read:'12 min',
    tags:['OSINT','SMB','Exposure'] },
  { id:'b4', kind:'blog', cat:'Awareness',
    title:'The 90-minute personal cyber hygiene routine, annotated',
    excerpt:'A walk-through of the exact agenda I run with private clients — what we change, what we ignore, and why.',
    author:'Vibhum Dubey', date:'Apr 19, 2026', read:'9 min',
    tags:['Personal','Hygiene'] },
  { id:'b5', kind:'blog', cat:'Malware',
    title:'A short, calm explainer on infostealers and credential markets',
    excerpt:'Why every leaked credential ends up in the same five places, and what you can actually do about it.',
    author:'Vibhum Dubey', date:'Apr 10, 2026', read:'7 min',
    tags:['Malware','Credentials'] },
];

const PORTALS = [
  { country:'India', items:[
    { name:'National Cyber Crime Reporting Portal', url:'cybercrime.gov.in', hot:'1930', desc:'File complaints for cyber fraud, online harassment, and financial crime. Operated by MHA.' },
    { name:'CERT-In Incident Reporting', url:'cert-in.org.in', hot:'1800-11-4949', desc:'Mandatory reporting for organizations under CERT-In rules — within 6 hours of detection.' },
    { name:'Sanchar Saathi', url:'sancharsaathi.gov.in', hot:'14422', desc:'Block stolen phones, report fake SIMs and verify mobile connections issued in your name.' },
  ]},
  { country:'United States', items:[
    { name:'IC3 — Internet Crime Complaint Center', url:'ic3.gov', hot:'FBI', desc:'FBI-operated portal for internet-enabled crime, BEC and investment fraud.' },
    { name:'CISA — Report a Cyber Incident', url:'cisa.gov/report', hot:'1-888-282-0870', desc:'For incidents affecting critical infrastructure or federal systems.' },
    { name:'FTC ReportFraud', url:'reportfraud.ftc.gov', hot:'1-877-382-4357', desc:'Consumer-facing reporting for scams and identity theft.' },
  ]},
  { country:'United Kingdom', items:[
    { name:'Action Fraud', url:'actionfraud.police.uk', hot:'0300 123 2040', desc:'National reporting centre for fraud and cyber crime.' },
    { name:'NCSC Report a Cyber Attack', url:'ncsc.gov.uk', hot:'—', desc:'For organizational incidents and suspicious emails (report@phishing.gov.uk).' },
  ]},
  { country:'Australia', items:[
    { name:'ReportCyber (ACSC)', url:'cyber.gov.au/report', hot:'1300 292 371', desc:'Single point of contact for cyber incident reporting in Australia.' },
    { name:'Scamwatch', url:'scamwatch.gov.au', hot:'—', desc:'Run by the ACCC. For scams targeting consumers.' },
  ]},
  { country:'Europe', items:[
    { name:'Europol — Report Cybercrime', url:'europol.europa.eu', hot:'—', desc:'Directs you to the right national reporting channel within the EU.' },
    { name:'ENISA Resources', url:'enisa.europa.eu', hot:'—', desc:'EU agency guidance and CSIRT contacts.' },
  ]},
];

const TRENDING = [
  '#ClickFix','#DigitalArrest','#DPDPAct','#UPIFraud','#Passkeys','#OSINT','#BEC','#Ransomware','#DeepfakeVoice','#SupplyChain'
];

window.SERVICES = SERVICES;
window.NEWS = NEWS;
window.BLOGS = BLOGS;
window.PORTALS = PORTALS;
window.TRENDING = TRENDING;
