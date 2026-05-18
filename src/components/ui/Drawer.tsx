import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { Icons } from './Icon'

interface DrawerProps {
  onClose: () => void
  children: ReactNode
  title?: ReactNode
  subtitle?: ReactNode
}

export function Drawer({ onClose, children, title, subtitle }: DrawerProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <>
      <div className="scrim" onClick={onClose} aria-hidden="true" />
      <div className="drawer" role="dialog" aria-modal="true">
        <div className="drawer-header">
          <div>
            {subtitle && <div style={{ marginBottom: 8 }}>{subtitle}</div>}
            {title && <h3 className="card">{title}</h3>}
          </div>
          <button className="x-btn" onClick={onClose} aria-label="Close panel">
            <Icons.close size={14} />
          </button>
        </div>
        <div className="drawer-body">{children}</div>
      </div>
    </>
  )
}
