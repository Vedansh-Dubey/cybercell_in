import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger-soft'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  as?: 'button' | 'a'
  href?: string
}

export function Button({
  variant = 'ghost',
  size = 'md',
  className,
  children,
  as: Tag = 'button',
  ...rest
}: ButtonProps) {
  const cls = cn(
    'btn',
    variant === 'primary' && 'btn-primary',
    variant === 'ghost' && 'btn-ghost',
    variant === 'danger-soft' && 'btn-danger-soft',
    size === 'sm' && 'btn-sm',
    size === 'lg' && 'btn-lg',
    className
  )

  if (Tag === 'a') {
    return (
      <a className={cls} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  )
}
