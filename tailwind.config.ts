import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0b0f17',
          deep: '#070a11',
        },
        surface: {
          DEFAULT: '#111827',
          alt: '#1f2937',
          glass: 'rgba(17, 24, 39, 0.55)',
        },
        accent: {
          DEFAULT: '#1d9bf0',
          glow: '#38bdf8',
          dim: 'rgba(29, 155, 240, 0.14)',
        },
        line: {
          DEFAULT: 'rgba(148, 163, 184, 0.10)',
          strong: 'rgba(148, 163, 184, 0.18)',
        },
        text: {
          DEFAULT: '#f8fafc',
          2: '#94a3b8',
          3: '#64748b',
        },
        status: {
          success: '#22c55e',
          warning: '#f59e0b',
          danger: '#ef4444',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', '"SF Mono"', 'Menlo', 'monospace'],
      },
      maxWidth: {
        content: '1240px',
      },
      boxShadow: {
        soft: '0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 40px -20px rgba(0,0,0,0.6)',
        glow: '0 0 0 1px rgba(56,189,248,0.18), 0 30px 80px -30px rgba(29,155,240,0.45)',
        'glow-sm': '0 0 0 1px rgba(56,189,248,0.18), 0 8px 24px -8px rgba(29,155,240,0.35)',
      },
      borderRadius: {
        card: '20px',
        chip: '999px',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#d6dde7',
            fontSize: '17px',
            lineHeight: '1.75',
            maxWidth: '68ch',
            '--tw-prose-headings': '#f8fafc',
            '--tw-prose-code': '#38bdf8',
            '--tw-prose-bold': '#f8fafc',
            '--tw-prose-links': '#38bdf8',
            '--tw-prose-quotes': '#f8fafc',
            '--tw-prose-quote-borders': '#1d9bf0',
            '--tw-prose-hr': 'rgba(148, 163, 184, 0.10)',
            'h2': {
              fontSize: '28px',
              marginTop: '48px',
              letterSpacing: '-0.02em',
            },
            'h3': {
              fontSize: '20px',
              marginTop: '32px',
            },
            'code': {
              background: 'rgba(56,189,248,0.10)',
              border: '1px solid rgba(148, 163, 184, 0.18)',
              padding: '1px 6px',
              borderRadius: '5px',
              fontSize: '14px',
              fontFamily: '"JetBrains Mono", ui-monospace',
              color: '#38bdf8',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            'blockquote': {
              borderLeftColor: '#1d9bf0',
              borderLeftWidth: '2px',
              paddingLeft: '18px',
              fontStyle: 'italic',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
}

export default config
