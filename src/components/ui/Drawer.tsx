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
    const scrollY = window.scrollY
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollY)
    }
  }, [onClose])

  return (
    <>
      <div className="scrim" onClick={onClose} aria-hidden="true" />
      <div className="drawer" role="dialog" aria-modal="true">
        <div className="drawer-header">
          <div>
            {subtitle && <div style={{ marginBottom: 8 }}>{subtitle}</div>}
            {title && (
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.2 }}>
                {title}
              </h3>
            )}
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close panel">
            <Icons.close size={16} />
          </button>
        </div>
        <div className="drawer-body">{children}</div>
      </div>
    </>
  )
}
