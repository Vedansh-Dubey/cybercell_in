import type { ReactNode } from 'react'
import { Icons } from './Icon'

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
}

export function EmptyState({
  title = 'Nothing here yet',
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="card text-center py-16 flex flex-col items-center gap-4">
      <div className="text-[var(--text-3)] opacity-60">
        {icon ?? <Icons.search size={40} />}
      </div>
      <h3 className="card" style={{ marginTop: 8 }}>{title}</h3>
      {description && (
        <p className="muted" style={{ fontSize: 14, maxWidth: '32ch', margin: 0 }}>
          {description}
        </p>
      )}
      {action}
    </div>
  )
}
