export interface Service {
  id: string
  name: string
  short: string
  long: string
  tags: string[]
  group: 'assess' | 'react' | 'aware'
  duration: string
  delivery: string
}

export const SERVICES: Service[] = [
  {
    id: 'pentest',
    name: 'Penetration Testing',
    short: 'Simulated adversarial testing of web, API, mobile, and cloud surfaces.',
    long: 'Ethical, structured testing that looks at your systems the way an attacker would — chaining misconfigurations, logic gaps, and authentication weaknesses to find real exposure. Scope and depth are always shaped around what you actually have.',
    tags: ['Web', 'API', 'Mobile', 'Cloud'],
    group: 'assess',
    duration: '1–3 weeks',
    delivery: 'Technical + executive report',
  },
  {
    id: 'vapt',
    name: 'Vulnerability Assessment',
    short: 'Identifying and triaging weaknesses across your infrastructure and applications.',
    long: "Broad-spectrum scanning with manual validation to cut through the noise. The goal is a clear picture of what's exposed and what matters — not an overwhelming automated report.",
    tags: ['Infrastructure', 'Applications', 'Triage'],
    group: 'assess',
    duration: '3–5 days',
    delivery: 'Prioritised findings report',
  },
  {
    id: 'consult',
    name: 'Security Advisory',
    short: 'A thinking partner for security decisions — strategy, policy, and direction.',
    long: 'Whether you need help thinking through a security architecture, reviewing a vendor, or figuring out where to start — this is a collaborative conversation, not a consulting engagement with a slide deck at the end.',
    tags: ['Strategy', 'Advisory', 'Direction'],
    group: 'aware',
    duration: 'Ongoing / retainer',
    delivery: 'Written recommendations',
  },
  {
    id: 'ir',
    name: 'Incident Response',
    short: 'Calm, methodical support when something has gone wrong.',
    long: "If you've had a breach, a ransomware hit, or something that just feels off — reach out. The focus is containment, understanding what happened, and helping you stabilize. Available for active incidents.",
    tags: ['Active incidents', 'Forensics', 'Containment'],
    group: 'react',
    duration: 'As needed',
    delivery: 'Incident report + remediation plan',
  },
  {
    id: 'audit',
    name: 'Security Reviews',
    short: 'Reviewing your controls, posture, and practices — honestly.',
    long: "Not a checkbox audit. A genuine look at how your security controls hold up in practice. Useful before a major deployment, after an incident, or when something doesn't feel right about your current setup.",
    tags: ['Controls', 'Posture', 'Practices'],
    group: 'assess',
    duration: '1–2 weeks',
    delivery: 'Review report + action plan',
  },
  {
    id: 'awareness',
    name: 'Security Awareness',
    short: 'Helping your team understand the threats they actually face.',
    long: 'Practical sessions for employees, leadership, or specific teams — on phishing, social engineering, safe practices, and spotting the signs of compromise. Not a compliance exercise. Aimed at building real awareness.',
    tags: ['Training', 'Workshops', 'Teams'],
    group: 'aware',
    duration: 'Half-day to 2 days',
    delivery: 'Workshop + materials',
  },
  {
    id: 'osint',
    name: 'OSINT & Exposure Mapping',
    short: "Finding what's publicly visible about you or your organization.",
    long: "Mapping your digital footprint across open sources — leaked credentials, look-alike domains, exposed cloud assets, executive impersonation, and data that shouldn't be public. Useful for due diligence and risk awareness.",
    tags: ['Brand', 'Exposure', 'Intelligence'],
    group: 'react',
    duration: '2–5 days',
    delivery: 'Exposure report',
  },
  {
    id: 'risk',
    name: 'Digital Risk Assessment',
    short: 'Understanding your risk surface before someone else finds it for you.',
    long: 'A collaborative look at your digital assets, data flows, and third-party dependencies — identifying where your real exposure lies and helping you prioritize what to address first.',
    tags: ['Risk', 'Assets', 'Third parties'],
    group: 'assess',
    duration: '1–2 weeks',
    delivery: 'Risk register + priorities',
  },
  {
    id: 'phish',
    name: 'Phishing Simulation',
    short: 'Testing whether your team can spot a phishing attempt — without shaming anyone.',
    long: "Realistic simulated campaigns that measure awareness and build it at the same time. The goal is to help people learn, not to catch them out. Always tailored to your organization's context.",
    tags: ['Simulation', 'Awareness', 'No blame'],
    group: 'aware',
    duration: '1–4 weeks',
    delivery: 'Campaign results + debrief',
  },
  {
    id: 'personal',
    name: 'Personal Cyber Safety',
    short: 'One-on-one guidance for individuals, founders, executives, and families.',
    long: 'A private conversation about your personal digital exposure — devices, accounts, social media, family safety. No jargon, no judgement. Practical steps you can actually follow.',
    tags: ['Personal', 'Family', 'Executives'],
    group: 'aware',
    duration: '1–2 hours',
    delivery: 'Action checklist',
  },
]

export const ENGAGEMENT_PHASES = [
  { n: '01', t: 'Scoping', d: 'We align on objectives, constraints, and what success looks like before any work starts.', meta: 'Day 1–2' },
  { n: '02', t: 'Execution', d: 'Active testing or delivery — with ongoing communication, not silence until the end.', meta: 'Week 1–3' },
  { n: '03', t: 'Reporting', d: 'Clear findings with context — technical depth where needed, plain language throughout.', meta: 'Final week' },
  { n: '04', t: 'Closeout', d: 'Walkthrough of findings, answers to questions, and a retest window for remediated issues.', meta: 'Post-delivery' },
]

export const TRUST_BANDS = [
  { t: 'No fixed packages', d: "Every situation is different. We don't fit your problem into a predefined box." },
  { t: 'Start with a conversation', d: "Reach out with whatever you have — a concern, a question, or an incident. We'll take it from there." },
  { t: 'Plain language', d: "No jargon, no unnecessary complexity. You'll always know what's happening and why it matters." },
  { t: 'Discretion guaranteed', d: 'Everything shared stays between us. Mutual NDAs where relevant, always handled with care.' },
]
