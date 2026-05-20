import { Resend } from 'npm:resend'
import { createClient } from 'npm:@supabase/supabase-js@2'

const ALLOWED_ORIGINS = ['https://cybercell.in', 'https://www.cybercell.in', 'http://localhost:5173']

// ─── Field length limits ───────────────────────────────────────────────────────
const LIMITS = {
  name:    { min: 2,  max: 100 },
  email:   { min: 5,  max: 254 }, // RFC 5321 max
  subject: { min: 0,  max: 120 },
  message: { min: 12, max: 4000 },
} as const

// ─── Max raw body size (16 KB) — guards against oversized payloads ─────────────
const MAX_BODY_BYTES = 16_384

// ─── Rate limit: max submissions per IP per window ────────────────────────────
const RATE_LIMIT_MAX    = 5
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour in ms

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function cors(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
}

function json(body: unknown, status: number, origin: string | null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors(origin), 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin')

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: cors(origin) })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: cors(origin) })
  }

  // ── IP-based rate limit ──────────────────────────────────────────────────────
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim()
           ?? req.headers.get('x-real-ip')
           ?? 'unknown'

  const supabaseUrl         = Deno.env.get('SUPABASE_URL')!
  const supabaseServiceKey  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const db = createClient(supabaseUrl, supabaseServiceKey)

  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW).toISOString()
  const { count, error: countError } = await db
    .from('contact_rate_limit')
    .select('*', { count: 'exact', head: true })
    .eq('ip', ip)
    .gte('submitted_at', windowStart)

  if (countError) {
    console.error('Rate limit check failed:', countError.message)
    return json({ error: 'Internal error' }, 500, origin)
  }

  if ((count ?? 0) >= RATE_LIMIT_MAX) {
    return json({ error: 'Too many requests — try again later.' }, 429, origin)
  }

  // ── Body size guard ──────────────────────────────────────────────────────────
  const contentLength = parseInt(req.headers.get('content-length') ?? '0', 10)
  if (contentLength > MAX_BODY_BYTES) {
    return json({ error: 'Payload too large' }, 413, origin)
  }

  try {
    // Read with a hard size cap regardless of content-length header
    const rawBytes = await req.arrayBuffer()
    if (rawBytes.byteLength > MAX_BODY_BYTES) {
      return json({ error: 'Payload too large' }, 413, origin)
    }

    const body = JSON.parse(new TextDecoder().decode(rawBytes))
    const { name, email, message } = body
    const subject: string = typeof body.subject === 'string' ? body.subject : 'General enquiry'

    // ── Required field presence ────────────────────────────────────────────────
    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return json({ error: 'Missing required fields' }, 400, origin)
    }

    const trimName    = name.trim()
    const trimEmail   = email.trim()
    const trimSubject = subject.trim()
    const trimMessage = message.trim()

    if (!trimName || !trimEmail || !trimMessage) {
      return json({ error: 'Missing required fields' }, 400, origin)
    }

    // ── Field length validation ────────────────────────────────────────────────
    if (trimName.length < LIMITS.name.min || trimName.length > LIMITS.name.max) {
      return json({ error: `Name must be ${LIMITS.name.min}–${LIMITS.name.max} characters` }, 400, origin)
    }
    if (trimEmail.length < LIMITS.email.min || trimEmail.length > LIMITS.email.max) {
      return json({ error: `Email must be ${LIMITS.email.min}–${LIMITS.email.max} characters` }, 400, origin)
    }
    if (trimSubject.length > LIMITS.subject.max) {
      return json({ error: `Subject must be at most ${LIMITS.subject.max} characters` }, 400, origin)
    }
    if (trimMessage.length < LIMITS.message.min || trimMessage.length > LIMITS.message.max) {
      return json({ error: `Message must be ${LIMITS.message.min}–${LIMITS.message.max} characters` }, 400, origin)
    }

    // ── Email format ───────────────────────────────────────────────────────────
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimEmail)) {
      return json({ error: 'Invalid email' }, 400, origin)
    }

    // ── Subject allowlist (reject anything not in the predefined list) ─────────
    const ALLOWED_SUBJECTS = [
      'General enquiry',
      'Project / engagement',
      'Incident — active',
      'Awareness training',
      'Personal hygiene consultation',
      'Press or speaking',
    ]
    const resolvedSubject = ALLOWED_SUBJECTS.includes(trimSubject) ? trimSubject : 'General enquiry'

    const resend   = new Resend(Deno.env.get('RESEND_API_KEY'))
    const toEmail  = Deno.env.get('CONTACT_EMAIL') ?? 'vibhum@cybercell.in'

    const safeName    = escapeHtml(trimName)
    const safeEmail   = escapeHtml(trimEmail)
    const safeSubject = escapeHtml(resolvedSubject)
    const safeMessage = escapeHtml(trimMessage)

    await resend.emails.send({
      from: 'Cybercell Contact <noreply@cybercell.in>',
      to: toEmail,
      replyTo: trimEmail,
      subject: `[Cybercell] ${safeSubject} — from ${safeName}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
          <div style="background:#0b0f17;padding:24px 32px;border-radius:8px 8px 0 0">
            <span style="color:#38bdf8;font-family:monospace;font-size:13px;letter-spacing:.1em">CYBERCELL · CONTACT FORM</span>
          </div>
          <div style="padding:32px;background:#fff;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;border-top:none">
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
              <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;width:100px">From</td><td style="padding:8px 0;font-weight:500">${safeName}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Email</td><td style="padding:8px 0"><a href="mailto:${safeEmail}" style="color:#1d9bf0">${safeEmail}</a></td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Subject</td><td style="padding:8px 0">${safeSubject}</td></tr>
            </table>
            <div style="background:#f9fafb;border-radius:6px;padding:20px;white-space:pre-wrap;font-size:14px;line-height:1.7;color:#374151">${safeMessage}</div>
          </div>
          <p style="color:#9ca3af;font-size:11px;text-align:center;margin-top:16px">Sent via cybercell.in contact form</p>
        </div>
      `,
    })

    await resend.emails.send({
      from: 'Vibhum Dubey · Cybercell <noreply@cybercell.in>',
      to: trimEmail,
      subject: `We've received your message — Cybercell`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
          <div style="background:#0b0f17;padding:24px 32px;border-radius:8px 8px 0 0">
            <span style="color:#38bdf8;font-family:monospace;font-size:13px;letter-spacing:.1em">CYBERCELL.IN</span>
          </div>
          <div style="padding:32px;background:#fff;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;border-top:none">
            <p style="margin:0 0 16px;font-size:16px;font-weight:600;color:#0b0f17">Hi ${safeName},</p>
            <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#374151">Thank you for reaching out. Your message has been received and we will get back to you within <strong>1–2 business days</strong>.</p>
            <p style="margin:0 0 24px;font-size:14px;line-height:1.7;color:#374151">For urgent security matters, you can also reach us directly at <a href="mailto:vibhum@cybercell.in" style="color:#1d9bf0">vibhum@cybercell.in</a> with subject as <strong>URGENT: &lt;your concern&gt;</strong>.</p>
            <div style="background:#f9fafb;border-radius:6px;padding:16px 20px;border-left:3px solid #1d9bf0">
              <p style="margin:0 0 4px;font-size:12px;color:#6b7280;letter-spacing:.05em">YOUR MESSAGE</p>
              <p style="margin:0;font-size:13px;line-height:1.7;color:#374151;white-space:pre-wrap">${safeMessage}</p>
            </div>
          </div>
          <p style="color:#9ca3af;font-size:11px;text-align:center;margin-top:16px">Cybercell.in · Cybersecurity Expert</p>
        </div>
      `,
    })

    // ── Record submission for rate limiting ──────────────────────────────────
    await db.from('contact_rate_limit').insert({ ip })

    return json({ ok: true }, 200, origin)
  } catch {
    return json({ error: 'Internal error' }, 500, origin)
  }
})
