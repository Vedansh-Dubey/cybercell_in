export interface Service {
  id: string
  name: string
  short: string
  long: string
  tags: string[]
  group: 'assess' | 'react' | 'aware'
}

export const SERVICES: Service[] = [
  {
    id: 'pentest',
    name: 'Penetration Testing',
    short: 'Simulated adversarial testing of web, API, mobile, and cloud surfaces.',
    long: 'Ethical, structured testing that looks at your systems the way an attacker would — chaining misconfigurations, logic gaps, and authentication weaknesses to find real exposure. Scope and depth are always shaped around what you actually have.',
    tags: ['Web', 'API', 'Mobile', 'Cloud'],
    group: 'assess',
  },
  {
    id: 'vapt',
    name: 'Vulnerability Assessment',
    short: 'Identifying and triaging weaknesses across your infrastructure and applications.',
    long: "Broad-spectrum scanning with manual validation to cut through the noise. The goal is a clear picture of what's exposed and what matters — not an overwhelming automated report.",
    tags: ['Infrastructure', 'Applications', 'Triage'],
    group: 'assess',
  },
  {
    id: 'consult',
    name: 'Security Advisory',
    short: 'A thinking partner for security decisions — strategy, policy, and direction.',
    long: 'Whether you need help thinking through a security architecture, reviewing a vendor, or figuring out where to start — this is a collaborative conversation, not a consulting engagement with a slide deck at the end.',
    tags: ['Strategy', 'Advisory', 'Direction'],
    group: 'aware',
  },
  {
    id: 'ir',
    name: 'Incident Response',
    short: 'Calm, methodical support when something has gone wrong.',
    long: "If you've had a breach, a ransomware hit, or something that just feels off — reach out. The focus is containment, understanding what happened, and helping you stabilize. Available for active incidents.",
    tags: ['Active incidents', 'Forensics', 'Containment'],
    group: 'react',
  },
  {
    id: 'audit',
    name: 'Security Reviews',
    short: 'Reviewing your controls, posture, and practices — honestly.',
    long: "Not a checkbox audit. A genuine look at how your security controls hold up in practice. Useful before a major deployment, after an incident, or when something doesn't feel right about your current setup.",
    tags: ['Controls', 'Posture', 'Practices'],
    group: 'assess',
  },
  {
    id: 'awareness',
    name: 'Security Awareness',
    short: 'Helping your team understand the threats they actually face.',
    long: 'Practical sessions for employees, leadership, or specific teams — on phishing, social engineering, safe practices, and spotting the signs of compromise. Not a compliance exercise. Aimed at building real awareness.',
    tags: ['Training', 'Workshops', 'Teams'],
    group: 'aware',
  },
  {
    id: 'osint',
    name: 'OSINT & Exposure Mapping',
    short: "Finding what's publicly visible about you or your organization.",
    long: "Mapping your digital footprint across open sources — leaked credentials, look-alike domains, exposed cloud assets, executive impersonation, and data that shouldn't be public. Useful for due diligence and risk awareness.",
    tags: ['Brand', 'Exposure', 'Intelligence'],
    group: 'react',
  },
  {
    id: 'risk',
    name: 'Digital Risk Assessment',
    short: 'Understanding your risk surface before someone else finds it for you.',
    long: 'A collaborative look at your digital assets, data flows, and third-party dependencies — identifying where your real exposure lies and helping you prioritize what to address first.',
    tags: ['Risk', 'Assets', 'Third parties'],
    group: 'assess',
  },
  {
    id: 'phish',
    name: 'Phishing Simulation',
    short: 'Testing whether your team can spot a phishing attempt — without shaming anyone.',
    long: "Realistic simulated campaigns that measure awareness and build it at the same time. The goal is to help people learn, not to catch them out. Always tailored to your organization's context.",
    tags: ['Simulation', 'Awareness', 'No blame'],
    group: 'aware',
  },
  {
    id: 'personal',
    name: 'Personal Cyber Safety',
    short: 'One-on-one guidance for individuals, founders, executives, and families.',
    long: 'A private conversation about your personal digital exposure — devices, accounts, social media, family safety. No jargon, no judgement. Practical steps you can actually follow.',
    tags: ['Personal', 'Family', 'Executives'],
    group: 'aware',
  },
]

export const TRUST_BANDS = [
  { t: 'No fixed packages', d: "Every situation is different. We don't fit your problem into a predefined box." },
  { t: 'Start with a conversation', d: "Reach out with whatever you have — a concern, a question, or an incident. We'll take it from there." },
  { t: 'Plain language', d: "No jargon, no unnecessary complexity. You'll always know what's happening and why it matters." },
  { t: 'Discretion guaranteed', d: 'Everything shared stays between us. Mutual NDAs where relevant, always handled with care.' },
]
