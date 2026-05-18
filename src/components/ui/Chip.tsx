import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface ChipProps {
  children: ReactNode
  variant?: 'default' | 'accent' | 'danger' | 'warn' | 'ok'
  className?: string
  onClick?: () => void
}

export function Chip({ children, variant = 'default', className, onClick }: ChipProps) {
  return (
    <span
      className={cn(
        'chip',
        variant === 'accent' && 'accent',
        variant === 'danger' && 'danger',
        variant === 'warn' && 'warn',
        variant === 'ok' && 'ok',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </span>
  )
}
