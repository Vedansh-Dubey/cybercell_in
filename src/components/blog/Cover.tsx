import type { ReactNode } from 'react'

interface CoverProps {
  label?: string
  hue?: number
  glyph?: ReactNode
  coverImage?: string
}

export function Cover({ label, hue = 200, glyph, coverImage }: CoverProps) {
  if (coverImage) {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    )
  }

  return (
    <div
      className="cover"
      style={{
        backgroundImage: `radial-gradient(700px 200px at 20% -20%, oklch(0.65 0.18 ${hue} / 0.30), transparent 60%), linear-gradient(135deg, oklch(0.18 0.04 ${hue}), oklch(0.12 0.03 ${hue + 10}))`,
      }}
    >
      <div className="grid-overlay" />
      {glyph && <div className="glyph" aria-hidden="true">{glyph}</div>}
      {label && <div className="label">{label}</div>}
    </div>
  )
}
