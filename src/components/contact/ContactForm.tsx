import { useState, useRef } from 'react'
import { Icons } from '../ui/Icon'
import { useHoverLight } from '../../hooks/useHoverLight'

interface ContactFormProps {
  onSuccess: (message: string) => void
}

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

type SubmitStatus = 'idle' | 'loading' | 'ok' | 'error' | 'cooldown'

// Must stay in sync with server-side LIMITS in send-contact/index.ts
const LIMITS = {
  name:    { min: 2,   max: 100 },
  email:   { min: 5,   max: 254 },
  subject: { max: 120 },
  message: { min: 12,  max: 4000 },
} as const

const COOLDOWN_MS = 30_000 // 30 s between submissions

const SUBJECTS = [
  'General enquiry',
  'Project / engagement',
  'Incident — active',
  'Awareness training',
  'Personal hygiene consultation',
  'Press or speaking',
]

export function ContactForm({ onSuccess }: ContactFormProps) {
  const onCardMove = useHoverLight()
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: 'General enquiry',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const lastSubmitRef = useRef<number>(0)

  const update = (key: keyof FormState, value: string) => {
    // Hard-cap input length as the user types
    const max = key === 'name' ? LIMITS.name.max
      : key === 'email'   ? LIMITS.email.max
      : key === 'subject' ? LIMITS.subject.max
      : LIMITS.message.max
    setForm(f => ({ ...f, [key]: value.slice(0, max) }))
    setErrors(e => ({ ...e, [key]: undefined }))
  }

  const validate = (): boolean => {
    const e: FormErrors = {}
    const name    = form.name.trim()
    const email   = form.email.trim()
    const message = form.message.trim()

    if (name.length < LIMITS.name.min)
      e.name = `Name must be at least ${LIMITS.name.min} characters.`
    else if (name.length > LIMITS.name.max)
      e.name = `Name must be at most ${LIMITS.name.max} characters.`

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = 'A valid email keeps the reply chain working.'
    else if (email.length > LIMITS.email.max)
      e.email = `Email address is too long.`

    if (message.length < LIMITS.message.min)
      e.message = 'A line or two of context speeds up the reply.'
    else if (message.length > LIMITS.message.max)
      e.message = `Message must be at most ${LIMITS.message.max} characters.`

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async () => {
    // Client-side cooldown — prevents accidental double-sends and spam
    const now = Date.now()
    if (now - lastSubmitRef.current < COOLDOWN_MS) {
      setStatus('cooldown')
      setTimeout(() => setStatus('idle'), COOLDOWN_MS - (now - lastSubmitRef.current))
      return
    }

    if (!validate()) return
    setStatus('loading')
    lastSubmitRef.current = Date.now()

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Configuration missing')
      }

      const res = await fetch(`${supabaseUrl}/functions/v1/send-contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          name:    form.name.trim(),
          email:   form.email.trim(),
          subject: form.subject,
          message: form.message.trim(),
        }),
      })

      if (!res.ok) throw new Error('Send failed')

      setStatus('ok')
      onSuccess("Message sent — you'll hear back within one working day.")
      setForm({ name: '', email: '', subject: 'General enquiry', message: '' })
      setTimeout(() => setStatus('idle'), 2000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const msgLen    = form.message.length
  const msgNearMax = msgLen > LIMITS.message.max * 0.85

  return (
    <div className="card reveal contact-form-card" style={{ padding: 'clamp(18px, 4vw, 36px)' }} onMouseMove={onCardMove}>
      <span className="eyebrow">Send a message</span>
      <h2 className="section" style={{ fontSize: 'clamp(22px, 2.4vw, 30px)', margin: '12px 0 8px' }}>
        Tell us what's on your mind.
      </h2>
      <p className="muted" style={{ fontSize: 14, marginBottom: 24 }}>
        Nothing here is sent over plain HTTP. Replies come from a real human.
      </p>

      <div className="form-row-2">
        <div className={`field ${errors.name ? 'bad' : form.name ? 'ok' : ''}`}>
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            value={form.name}
            onChange={e => update('name', e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            maxLength={LIMITS.name.max}
          />
          {errors.name && <span className="err" role="alert">{errors.name}</span>}
        </div>
        <div className={`field ${errors.email ? 'bad' : form.email ? 'ok' : ''}`}>
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            type="email"
            value={form.email}
            onChange={e => update('email', e.target.value)}
            placeholder="you@domain.com"
            autoComplete="email"
            maxLength={LIMITS.email.max}
          />
          {errors.email && <span className="err" role="alert">{errors.email}</span>}
        </div>
      </div>

      <div className="field" style={{ marginTop: 14 }}>
        <label htmlFor="contact-subject">Subject</label>
        <select
          id="contact-subject"
          value={form.subject}
          onChange={e => update('subject', e.target.value)}
        >
          {SUBJECTS.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className={`field ${errors.message ? 'bad' : form.message ? 'ok' : ''}`} style={{ marginTop: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <label htmlFor="contact-message">Message</label>
          <span
            className="mono tiny"
            style={{
              color: msgNearMax ? (msgLen >= LIMITS.message.max ? 'var(--danger, #ef4444)' : '#fbbf24') : 'var(--text-3)',
              transition: 'color .2s',
            }}
          >
            {msgLen}/{LIMITS.message.max}
          </span>
        </div>
        <textarea
          id="contact-message"
          value={form.message}
          onChange={e => update('message', e.target.value)}
          placeholder="A couple of lines on what you're trying to do, who's involved, and any deadlines."
          maxLength={LIMITS.message.max}
        />
        {errors.message && <span className="err" role="alert">{errors.message}</span>}
      </div>

      <div className="contact-submit-row">
        <div className="mono tiny" style={{ color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icons.lock size={12} aria-hidden="true" /> End-to-end via TLS · GPG key available on request
        </div>
        <button
          className="btn btn-primary btn-lg contact-submit-btn"
          onClick={submit}
          disabled={status === 'loading' || status === 'cooldown'}
          aria-live="polite"
        >
          {status === 'loading' ? (
            <>
              <span className="skel" style={{ display: 'inline-block', width: 14, height: 14, borderRadius: '50%' }} aria-hidden="true" />
              Sending…
            </>
          ) : status === 'ok' ? (
            <><Icons.check size={16} aria-hidden="true" /> Sent</>
          ) : status === 'cooldown' ? (
            <><Icons.clock size={16} aria-hidden="true" /> Please wait…</>
          ) : status === 'error' ? (
            <><Icons.alert size={16} aria-hidden="true" /> Error — try again</>
          ) : (
            <>Send message <Icons.send size={16} aria-hidden="true" /></>
          )}
        </button>
      </div>
    </div>
  )
}
