import { useEffect } from 'react'
import { Icons } from './Icon'

interface ToastProps {
  message: string
  onDismiss: () => void
  duration?: number
}

export function Toast({ message, onDismiss, duration = 3200 }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, duration)
    return () => clearTimeout(t)
  }, [onDismiss, duration])

  return (
    <div className="toast" role="status" aria-live="polite">
      <Icons.check size={16} style={{ color: '#22c55e', flexShrink: 0 }} />
      <span>{message}</span>
    </div>
  )
}
