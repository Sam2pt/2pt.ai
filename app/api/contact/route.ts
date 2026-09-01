/**
 * POST /api/contact — contact form submission handler.
 *
 * Delivery backends are selected by env var (checked in this order):
 *   1. RESEND_API_KEY        → sends via Resend (best deliverability)
 *   2. WEB3FORMS_ACCESS_KEY  → forwards via Web3Forms (fastest to set up)
 *
 * With no key set, the route responds 503 so we don't silently accept
 * submissions that go nowhere.
 *
 * === Sam — one-time setup (pick either) ===
 *
 * A) Web3Forms — 30 seconds, easiest:
 *    1. Go to https://web3forms.com/#start
 *    2. Enter your email (e.g. info@twopointtechnologies.com)
 *    3. Copy the Access Key from the confirmation email
 *    4. In Netlify → Site settings → Environment variables, add:
 *         WEB3FORMS_ACCESS_KEY = <the key>
 *    5. Trigger a deploy (any git push, or click Deploy in Netlify)
 *
 * B) Resend — the more polished option (from your own domain):
 *    1. Sign up at https://resend.com with sam@twopointtechnologies.com
 *    2. Add the DNS records they show for twopointtechnologies.com
 *    3. Create an API key
 *    4. In Netlify → Environment variables, add:
 *         RESEND_API_KEY = re_xxx
 *         RESEND_FROM     = "2pt <hello@twopointtechnologies.com>"  (optional)
 *         CONTACT_EMAIL_TO = info@twopointtechnologies.com          (optional)
 */

export const runtime = "nodejs"

type Payload = {
  name?: string
  company?: string
  email?: string
  message?: string
  "bot-field"?: string
}

const DEFAULT_TO = "info@twopointtechnologies.com"

export async function POST(req: Request) {
  let body: Payload
  try {
    body = (await req.json()) as Payload
  } catch {
    return jsonError("invalid_json", 400)
  }

  // Silent honeypot — pretend it worked, don't send.
  if (typeof body["bot-field"] === "string" && body["bot-field"].length > 0) {
    return Response.json({ ok: true })
  }

  const name = (body.name ?? "").trim()
  const email = (body.email ?? "").trim()
  const company = (body.company ?? "").trim()
  const message = (body.message ?? "").trim()

  if (!name || !email || !message) return jsonError("missing_required_fields", 400)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return jsonError("invalid_email", 400)
  if (message.length > 5000) return jsonError("message_too_long", 400)
  if (name.length > 200 || company.length > 200) {
    return jsonError("field_too_long", 400)
  }

  const to = process.env.CONTACT_EMAIL_TO ?? DEFAULT_TO
  const subject = `2pt.ai · new enquiry from ${name}${company ? ` (${company})` : ""}`

  if (process.env.RESEND_API_KEY) {
    return sendViaResend({
      key: process.env.RESEND_API_KEY,
      from: process.env.RESEND_FROM ?? "2pt.ai <onboarding@resend.dev>",
      to,
      subject,
      name,
      email,
      company,
      message,
    })
  }

  if (process.env.WEB3FORMS_ACCESS_KEY) {
    return sendViaWeb3Forms({
      key: process.env.WEB3FORMS_ACCESS_KEY,
      subject,
      name,
      email,
      company,
      message,
    })
  }

  // Dev fallback — log the submission so we can still see it in local console.
  if (process.env.NODE_ENV !== "production") {
    console.log("[/api/contact] no backend configured, dev log:", {
      to,
      subject,
      name,
      email,
      company,
      message,
    })
    return Response.json({ ok: true, note: "dev_logged_no_backend" })
  }

  return jsonError("email_backend_not_configured", 503)
}

function jsonError(error: string, status: number) {
  return Response.json({ ok: false, error }, { status })
}

async function sendViaResend(args: {
  key: string
  from: string
  to: string
  subject: string
  name: string
  email: string
  company: string
  message: string
}) {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${args.key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: args.from,
        to: [args.to],
        reply_to: args.email,
        subject: args.subject,
        text: renderPlain(args),
      }),
    })
    if (!res.ok) {
      const text = await res.text().catch(() => "")
      return Response.json(
        { ok: false, error: "resend_failed", status: res.status, body: text.slice(0, 400) },
        { status: 502 },
      )
    }
    return Response.json({ ok: true })
  } catch (err) {
    return Response.json(
      {
        ok: false,
        error: "resend_error",
        message: err instanceof Error ? err.message : "unknown",
      },
      { status: 502 },
    )
  }
}

async function sendViaWeb3Forms(args: {
  key: string
  subject: string
  name: string
  email: string
  company: string
  message: string
}) {
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: args.key,
        subject: args.subject,
        from_name: "2pt.ai contact form",
        name: args.name,
        email: args.email,
        company: args.company || "—",
        message: args.message,
        replyto: args.email,
      }),
    })
    const json = (await res.json().catch(() => ({}))) as {
      success?: boolean
      message?: string
    }
    if (!res.ok || !json.success) {
      return Response.json(
        {
          ok: false,
          error: "web3forms_failed",
          status: res.status,
          upstream: json.message,
        },
        { status: 502 },
      )
    }
    return Response.json({ ok: true })
  } catch (err) {
    return Response.json(
      {
        ok: false,
        error: "web3forms_error",
        message: err instanceof Error ? err.message : "unknown",
      },
      { status: 502 },
    )
  }
}

function renderPlain(args: {
  name: string
  email: string
  company: string
  message: string
}) {
  return [
    "New enquiry via 2pt.ai",
    "",
    `From:    ${args.name}`,
    `Email:   ${args.email}`,
    args.company ? `Company: ${args.company}` : null,
    "",
    "Message:",
    args.message,
    "",
    "—",
    "Sent from the contact form on 2pt.ai",
  ]
    .filter((line): line is string => line !== null)
    .join("\n")
}
