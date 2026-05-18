import { useState } from 'react'
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

type SubmitStatus = 'idle' | 'loading' | 'ok' | 'error'

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

  const update = (key: keyof FormState, value: string) => {
    setForm(f => ({ ...f, [key]: value }))
    setErrors(e => ({ ...e, [key]: undefined }))
  }

  const validate = (): boolean => {
    const e: FormErrors = {}
    if (!form.name.trim()) e.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'A valid email keeps the reply chain working.'
    if (form.message.trim().length < 12) e.message = 'A line or two of context speeds up the reply.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async () => {
    if (!validate()) return
    setStatus('loading')

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
        body: JSON.stringify(form),
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

  return (
    <div className="card reveal" style={{ padding: 36 }} onMouseMove={onCardMove}>
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
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          value={form.message}
          onChange={e => update('message', e.target.value)}
          placeholder="A couple of lines on what you're trying to do, who's involved, and any deadlines."
        />
        {errors.message && <span className="err" role="alert">{errors.message}</span>}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 22, gap: 14, flexWrap: 'wrap' }}>
        <div className="mono tiny" style={{ color: 'var(--text-3)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icons.lock size={12} aria-hidden="true" /> End-to-end via TLS · GPG key available on request
        </div>
        <button
          className="btn btn-primary btn-lg"
          onClick={submit}
          disabled={status === 'loading'}
          aria-live="polite"
        >
          {status === 'loading' ? (
            <>
              <span className="skel" style={{ display: 'inline-block', width: 14, height: 14, borderRadius: '50%' }} aria-hidden="true" />
              Sending…
            </>
          ) : status === 'ok' ? (
            <><Icons.check size={16} aria-hidden="true" /> Sent</>
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
