export interface Portal {
  name: string
  url: string
  hot: string
  desc: string
}

export interface PortalGroup {
  country: string
  items: Portal[]
}

export const PORTALS: PortalGroup[] = [
  {
    country: 'India',
    items: [
      {
        name: 'National Cyber Crime Reporting Portal',
        url: 'cybercrime.gov.in',
        hot: '1930',
        desc: 'File complaints for cyber fraud, online harassment, and financial crime. Operated by MHA. Available 24/7.',
      },
      {
        name: 'CERT-In Incident Reporting',
        url: 'cert-in.org.in',
        hot: '1800-11-4949',
        desc: 'Mandatory reporting for organizations under CERT-In rules — within 6 hours of detection.',
      },
      {
        name: 'Sanchar Saathi',
        url: 'sancharsaathi.gov.in',
        hot: '14422',
        desc: 'Block stolen phones, report fake SIMs and verify mobile connections issued in your name.',
      },
      {
        name: 'I4C — Indian Cyber Crime Coordination Centre',
        url: 'i4c.mha.gov.in',
        hot: '1930',
        desc: 'Central coordination body under MHA for cybercrime response across all states.',
      },
      {
        name: 'RBI Ombudsman — Financial Fraud',
        url: 'cms.rbi.org.in',
        hot: '14448',
        desc: 'For unauthorized bank transactions, UPI fraud, and digital payment disputes.',
      },
      {
        name: 'TRAI — Spam Call & SMS Reporting',
        url: 'sancharsaathi.gov.in/sfc/',
        hot: '1909',
        desc: 'Report unsolicited commercial calls, smishing, and fraudulent SMS under DND rules.',
      },
    ],
  },
  {
    country: 'India — State Cybercrime Cells',
    items: [
      { name: 'Maharashtra Cyber', url: 'maharashtracyber.gov.in', hot: '1930', desc: 'Maharashtra state cybercrime unit. Covers Mumbai, Pune, Nagpur.' },
      { name: 'Delhi Police Cybercrime Unit', url: 'cybercrime.delhipolice.gov.in', hot: '1930', desc: 'Delhi NCT cybercrime reporting and investigation.' },
      { name: 'Karnataka CID — Cybercrime', url: 'ksp.gov.in', hot: '1930', desc: 'Karnataka state CID cybercrime wing. Covers Bengaluru.' },
      { name: 'Tamil Nadu Cybercrime', url: 'cybercrime.tn.gov.in', hot: '1930', desc: 'Tamil Nadu police cybercrime division. Covers Chennai, Coimbatore.' },
      { name: 'Telangana Cybercrime', url: 'cybercrime.telangana.gov.in', hot: '1930', desc: 'Telangana state cybercrime bureau. Covers Hyderabad.' },
      { name: 'UP Police Cybercrime', url: 'upcop.gov.in', hot: '1930', desc: 'Uttar Pradesh Police Cyber Crime reporting.' },
      { name: 'Gujarat Cybercrime', url: 'gujarat.gov.in', hot: '1930', desc: 'Gujarat Police cybercrime division. Covers Ahmedabad, Surat, Vadodara.' },
      { name: 'Rajasthan Cybercrime', url: 'police.rajasthan.gov.in', hot: '1930', desc: 'Rajasthan Police cybercrime cell. Covers Jaipur, Jodhpur.' },
      { name: 'Punjab Cybercrime', url: 'punjabpolice.gov.in', hot: '1930', desc: 'Punjab Police State Cyber Crime Cell.' },
      { name: 'Haryana Cybercrime', url: 'haryanapolice.gov.in', hot: '1930', desc: 'Haryana Police cybercrime reporting unit.' },
      { name: 'West Bengal Cybercrime', url: 'wbpolice.gov.in', hot: '1930', desc: 'West Bengal Police cybercrime wing. Covers Kolkata.' },
      { name: 'Kerala Cybercrime', url: 'keralapolice.gov.in', hot: '1930', desc: 'Kerala Police Cyberdome and cybercrime unit.' },
      { name: 'Bihar Cybercrime', url: 'biharpolice.bih.nic.in', hot: '1930', desc: 'Bihar Police cybercrime unit. Covers Patna.' },
      { name: 'Madhya Pradesh Cybercrime', url: 'mppolice.gov.in', hot: '1930', desc: 'MP Police cybercrime helpline. Covers Bhopal, Indore.' },
      { name: 'Odisha Cybercrime', url: 'odishapolice.gov.in', hot: '1930', desc: 'Odisha Police cybercrime cell.' },
      { name: 'Jharkhand Cybercrime', url: 'jhpolice.gov.in', hot: '1930', desc: 'Jharkhand Police cybercrime division. Covers Ranchi.' },
      { name: 'Assam Cybercrime', url: 'assampolice.gov.in', hot: '1930', desc: 'Assam Police cybercrime cell. Covers Guwahati.' },
      { name: 'Himachal Pradesh Cybercrime', url: 'hppolice.gov.in', hot: '1930', desc: 'HP Police cybercrime cell. Covers Shimla.' },
      { name: 'Uttarakhand Cybercrime', url: 'uttarakhandpolice.uk.gov.in', hot: '1930', desc: 'Uttarakhand Police cybercrime unit. Covers Dehradun.' },
      { name: 'Goa Cybercrime', url: 'goapolice.gov.in', hot: '1930', desc: 'Goa Police cybercrime cell. Covers Panaji.' },
    ],
  },
  {
    country: 'United States',
    items: [
      {
        name: 'IC3 — Internet Crime Complaint Center',
        url: 'ic3.gov',
        hot: 'FBI',
        desc: 'FBI-operated portal for internet-enabled crime, BEC and investment fraud.',
      },
      {
        name: 'CISA — Report a Cyber Incident',
        url: 'cisa.gov/report',
        hot: '1-888-282-0870',
        desc: 'For incidents affecting critical infrastructure or federal systems.',
      },
      {
        name: 'FTC ReportFraud',
        url: 'reportfraud.ftc.gov',
        hot: '1-877-382-4357',
        desc: 'Consumer-facing reporting for scams and identity theft.',
      },
    ],
  },
  {
    country: 'United Kingdom',
    items: [
      {
        name: 'Action Fraud',
        url: 'actionfraud.police.uk',
        hot: '0300 123 2040',
        desc: 'National reporting centre for fraud and cyber crime.',
      },
      {
        name: 'NCSC Report a Cyber Attack',
        url: 'ncsc.gov.uk',
        hot: '—',
        desc: 'For organizational incidents and suspicious emails (report@phishing.gov.uk).',
      },
    ],
  },
  {
    country: 'Australia',
    items: [
      {
        name: 'ReportCyber (ACSC)',
        url: 'cyber.gov.au/report',
        hot: '1300 292 371',
        desc: 'Single point of contact for cyber incident reporting in Australia.',
      },
      {
        name: 'Scamwatch',
        url: 'scamwatch.gov.au',
        hot: '—',
        desc: 'Run by the ACCC. For scams targeting consumers.',
      },
    ],
  },
  {
    country: 'Europe',
    items: [
      {
        name: 'Europol — Report Cybercrime',
        url: 'europol.europa.eu',
        hot: '—',
        desc: 'Directs you to the right national reporting channel within the EU.',
      },
      {
        name: 'ENISA Resources',
        url: 'enisa.europa.eu',
        hot: '—',
        desc: 'EU agency guidance and CSIRT contacts.',
      },
    ],
  },
]

export const ALL_COUNTRIES = ['All', ...PORTALS.map(g => g.country)]
