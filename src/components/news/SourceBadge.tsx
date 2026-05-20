import { SOURCE_COLORS } from '../../data/newsSources'

interface SourceBadgeProps {
  source: string
  sourceSlug?: string
}

export function SourceBadge({ source, sourceSlug }: SourceBadgeProps) {
  const color = sourceSlug ? (SOURCE_COLORS[sourceSlug] ?? '#94a3b8') : '#94a3b8'

  return (
    <span
      className="chip"
      style={{ color }}
    >
      {source}
    </span>
  )
}
