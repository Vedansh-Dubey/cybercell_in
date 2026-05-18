import { Resend } from 'npm:resend'

const ALLOWED_ORIGINS = ['https://cybercell.in', 'http://localhost:5173']

function cors(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
}

Deno.serve(async (req) => {
  const origin = req.headers.get('origin')

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: cors(origin) })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: cors(origin) })
  }

  try {
    const body = await req.json()
    const { name, email, subject, message } = body

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...cors(origin), 'Content-Type': 'application/json' },
      })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { ...cors(origin), 'Content-Type': 'application/json' },
      })
    }

    const resend = new Resend(Deno.env.get('RESEND_API_KEY'))
    const toEmail = Deno.env.get('CONTACT_EMAIL') ?? 'vibhum@cybercell.in'

    await resend.emails.send({
      from: 'Cybercell Contact <noreply@cybercell.in>',
      to: toEmail,
      replyTo: email,
      subject: `[Cybercell] ${subject ?? 'General enquiry'} — from ${name}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
          <div style="background:#0b0f17;padding:24px 32px;border-radius:8px 8px 0 0">
            <span style="color:#38bdf8;font-family:monospace;font-size:13px;letter-spacing:.1em">CYBERCELL · CONTACT FORM</span>
          </div>
          <div style="padding:32px;background:#fff;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;border-top:none">
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
              <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;width:100px">From</td><td style="padding:8px 0;font-weight:500">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#1d9bf0">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#6b7280;font-size:13px">Subject</td><td style="padding:8px 0">${subject ?? 'General enquiry'}</td></tr>
            </table>
            <div style="background:#f9fafb;border-radius:6px;padding:20px;white-space:pre-wrap;font-size:14px;line-height:1.7;color:#374151">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
          </div>
          <p style="color:#9ca3af;font-size:11px;text-align:center;margin-top:16px">Sent via cybercell.in contact form</p>
        </div>
      `,
    })

    await resend.emails.send({
      from: 'Vibhum Dubey · Cybercell <noreply@cybercell.in>',
      to: email,
      subject: `We've received your message — Cybercell`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
          <div style="background:#0b0f17;padding:24px 32px;border-radius:8px 8px 0 0">
            <span style="color:#38bdf8;font-family:monospace;font-size:13px;letter-spacing:.1em">CYBERCELL.IN</span>
          </div>
          <div style="padding:32px;background:#fff;border-radius:0 0 8px 8px;border:1px solid #e5e7eb;border-top:none">
            <p style="margin:0 0 16px;font-size:16px;font-weight:600;color:#0b0f17">Hi ${name},</p>
            <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#374151">Thank you for reaching out. Your message has been received and we will get back to you within <strong>1–2 business days</strong>.</p>
            <p style="margin:0 0 24px;font-size:14px;line-height:1.7;color:#374151">For urgent security matters, you can also reach us directly at <a href="mailto:vibhum@cybercell.in" style="color:#1d9bf0">vibhum@cybercell.in</a> with subject as <strong>URGENT: &lt;your concern&gt;</strong>.</p>
            <div style="background:#f9fafb;border-radius:6px;padding:16px 20px;border-left:3px solid #1d9bf0">
              <p style="margin:0 0 4px;font-size:12px;color:#6b7280;letter-spacing:.05em">YOUR MESSAGE</p>
              <p style="margin:0;font-size:13px;line-height:1.7;color:#374151;white-space:pre-wrap">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
            </div>
          </div>
          <p style="color:#9ca3af;font-size:11px;text-align:center;margin-top:16px">Cybercell.in · Cybersecurity Expert</p>
        </div>
      `,
    })

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...cors(origin), 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('send-contact error:', err)
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { ...cors(origin), 'Content-Type': 'application/json' },
    })
  }
})
