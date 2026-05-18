import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { Icons } from './Icon'

interface ModalProps {
  onClose: () => void
  children: ReactNode
  title?: string
  subtitle?: string
}

export function Modal({ onClose, children, title, subtitle }: ModalProps) {
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
      <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-inner" onClick={e => e.stopPropagation()}>
          {(title || subtitle) && (
            <div className="modal-header">
              <div>
                {subtitle && (
                  <div className="mono tiny" style={{ color: 'var(--accent-glow)', marginBottom: 2 }}>
                    {subtitle}
                  </div>
                )}
                {title && <h3 className="card">{title}</h3>}
              </div>
              <button className="x-btn" onClick={onClose} aria-label="Close modal">
                <Icons.close size={14} />
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
    </>
  )
}
