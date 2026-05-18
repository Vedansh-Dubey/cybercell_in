import type { SVGProps } from 'react'

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
}

const I = ({ children, size = 20, ...rest }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest}
  >
    {children}
  </svg>
)

export const Icons = {
  shield: (p: IconProps) => <I {...p}><path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z"/></I>,
  lock:   (p: IconProps) => <I {...p}><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></I>,
  scan:   (p: IconProps) => <I {...p}><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><path d="M4 12h16"/></I>,
  bug:    (p: IconProps) => <I {...p}><rect x="7" y="8" width="10" height="12" rx="5"/><path d="M9 8V6a3 3 0 1 1 6 0v2M5 13H3M5 17H3M5 9H3M21 13h-2M21 17h-2M21 9h-2"/></I>,
  brain:  (p: IconProps) => <I {...p}><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 3 3V4z"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 3V4z"/></I>,
  alert:  (p: IconProps) => <I {...p}><path d="M12 3l10 18H2L12 3z"/><path d="M12 10v4M12 18h.01"/></I>,
  check:  (p: IconProps) => <I {...p}><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></I>,
  arrow:  (p: IconProps) => <I {...p}><path d="M5 12h14M13 5l7 7-7 7"/></I>,
  arrowUp:(p: IconProps) => <I {...p}><path d="M7 17L17 7M9 7h8v8"/></I>,
  search: (p: IconProps) => <I {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></I>,
  mail:   (p: IconProps) => <I {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 7 9-7"/></I>,
  phone:  (p: IconProps) => <I {...p}><path d="M22 16.92V21a1 1 0 0 1-1.1 1A19 19 0 0 1 2 4.1 1 1 0 0 1 3 3h4.1a1 1 0 0 1 1 .8l1 4a1 1 0 0 1-.3 1L7 10.5a16 16 0 0 0 6.5 6.5l1.7-1.7a1 1 0 0 1 1-.3l4 1a1 1 0 0 1 .8 1z"/></I>,
  globe:  (p: IconProps) => <I {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a13 13 0 0 1 0 18 13 13 0 0 1 0-18z"/></I>,
  github: (p: IconProps) => <I {...p}><path d="M9 19c-4 1.5-4-2-6-2m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.7 4.7 0 0 0-1.3-3.2 4.4 4.4 0 0 0-.1-3.2s-1-.3-3.4 1.2a11.6 11.6 0 0 0-6 0C7.2 2.8 6.2 3.1 6.2 3.1a4.4 4.4 0 0 0-.1 3.2A4.7 4.7 0 0 0 4.8 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></I>,
  linkedin:(p: IconProps) => <I {...p}><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v8M8 7v.01M12 18v-5a2 2 0 0 1 4 0v5M12 13v5"/></I>,
  twitter:(p: IconProps) => <I {...p}><path d="M22 5.8a8 8 0 0 1-2.4.7 4 4 0 0 0 1.8-2.2 8 8 0 0 1-2.6 1A4 4 0 0 0 12 9a11 11 0 0 1-8-4s-4 9 5 13a12 12 0 0 1-7 2c9 5 20 0 20-12V7l2-2-.2.8z"/></I>,
  clock:  (p: IconProps) => <I {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></I>,
  tag:    (p: IconProps) => <I {...p}><path d="M20 12L12 20l-9-9V3h8l9 9z"/><circle cx="7.5" cy="7.5" r="1.5"/></I>,
  user:   (p: IconProps) => <I {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></I>,
  trending:(p: IconProps) => <I {...p}><path d="M3 17l6-6 4 4 8-8"/><path d="M17 7h4v4"/></I>,
  filter: (p: IconProps) => <I {...p}><path d="M3 5h18l-7 8v6l-4-2v-4L3 5z"/></I>,
  book:   (p: IconProps) => <I {...p}><path d="M4 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H4V4z"/><path d="M20 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7V4z"/></I>,
  fingerprint:(p: IconProps) => <I {...p}><path d="M12 11v3a4 4 0 0 1-4 4M12 11v3a8 8 0 0 0 .5 2.8M8 13a4 4 0 0 1 8 0M5 11a7 7 0 0 1 14 0v3M12 7a4 4 0 0 0-4 4"/></I>,
  network:(p: IconProps) => <I {...p}><circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v3M5 17l5-5M19 17l-5-5"/></I>,
  menu:   (p: IconProps) => <I {...p}><path d="M4 7h16M4 12h16M4 17h16"/></I>,
  close:  (p: IconProps) => <I {...p}><path d="M6 6l12 12M18 6L6 18"/></I>,
  layers: (p: IconProps) => <I {...p}><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5M3 17l9 5 9-5"/></I>,
  zap:    (p: IconProps) => <I {...p}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></I>,
  sliders:(p: IconProps) => <I {...p}><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></I>,
  external:(p: IconProps) => <I {...p}><path d="M14 3h7v7M21 3l-9 9M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"/></I>,
  send:   (p: IconProps) => <I {...p}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></I>,
  briefcase:(p: IconProps) => <I {...p}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M2 13h20"/></I>,
  share:  (p: IconProps) => <I {...p}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></I>,
  copy:   (p: IconProps) => <I {...p}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></I>,
  rss:    (p: IconProps) => <I {...p}><path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></I>,
  eye:    (p: IconProps) => <I {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></I>,
  info:   (p: IconProps) => <I {...p}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></I>,
  warning:(p: IconProps) => <I {...p}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></I>,
  calendar:(p: IconProps) => <I {...p}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/></I>,
  refresh:(p: IconProps) => <I {...p}><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></I>,
}

export type IconName = keyof typeof Icons
