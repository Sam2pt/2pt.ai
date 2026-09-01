"use client"

/**
 * ContactModal — real contact form, replaces the fragile mailto links.
 *
 * Uses Netlify Forms (the site deploys to Netlify). At build time
 * Netlify parses the SSR HTML for `<form name="contact" data-netlify>`,
 * registers the form, and captures submissions to the account's
 * Forms dashboard (with email notifications configurable there).
 *
 * The modal listens for a global `contact:open` event so any CTA
 * anywhere on the site can open it via `openContactModal()` without
 * threading callbacks. A hidden marker form is rendered in the SSR
 * output so Netlify's parser sees it even before the modal is opened.
 */

import { useEffect, useState, type FormEvent } from "react"
import { X, ArrowUpRight } from "lucide-react"

const FORM_NAME = "contact"
const OPEN_EVENT = "contact:open"

export function openContactModal() {
  if (typeof window === "undefined") return
  window.dispatchEvent(new Event(OPEN_EVENT))
}

type SubmitState = "idle" | "submitting" | "sent" | "error"

export function ContactModal() {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<SubmitState>("idle")
  const [errorMsg, setErrorMsg] = useState<string>()

  useEffect(() => {
    const onOpen = () => {
      setOpen(true)
      setState("idle")
    }
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_EVENT, onOpen)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState("submitting")
    setErrorMsg(undefined)
    const form = e.currentTarget
    const data = new FormData(form)

    // Silent honeypot — if the bot field is filled, pretend we sent it.
    if ((data.get("bot-field") ?? "").toString().length > 0) {
      setState("sent")
      form.reset()
      return
    }

    const body = new URLSearchParams()
    body.set("form-name", FORM_NAME)
    data.forEach((value, key) => {
      if (typeof value === "string") body.append(key, value)
    })

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      })
      if (!res.ok) throw new Error(`Server responded ${res.status}`)
      setState("sent")
      form.reset()
    } catch (err) {
      setState("error")
      setErrorMsg(err instanceof Error ? err.message : "unknown error")
    }
  }

  return (
    <>
      {/* Netlify build-time detection form — hidden from users. Fields must
          match the visible form so submissions validate. Kept in a static
          shape (no state, no dynamic values) so Netlify's parser can see it. */}
      <form
        name={FORM_NAME}
        data-netlify="true"
        netlify-honeypot="bot-field"
        hidden
        aria-hidden="true"
      >
        <input name="name" />
        <input name="company" />
        <input name="email" type="email" />
        <textarea name="message" />
        <input name="bot-field" />
      </form>

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        aria-hidden={!open}
        className={`fixed inset-0 z-[100] flex items-start md:items-center justify-center transition-opacity duration-300 ease-out ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          type="button"
          aria-label="Close contact form"
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
          tabIndex={open ? 0 : -1}
        />

        <div
          className={`relative w-full max-w-[560px] mx-4 md:mx-6 my-4 md:my-0 transition-transform duration-300 ease-out ${
            open ? "translate-y-0" : "translate-y-3"
          }`}
        >
          <div className="bg-[var(--2pt-black)] border border-white/15 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6),0_0_0_1px_rgba(74,222,128,0.06)]">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 px-6 md:px-8 pt-6 pb-4 border-b border-white/10">
              <div>
                <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--2pt-green)] mb-2 flex items-center gap-2">
                  <span className="relative inline-flex w-1.5 h-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--2pt-green)]" />
                    <span className="absolute inset-0 rounded-full bg-[var(--2pt-green)] animate-ping opacity-60" />
                  </span>
                  Deploy with us
                </div>
                <h2
                  id="contact-modal-title"
                  className="text-[20px] md:text-[24px] font-medium tracking-[-0.02em] leading-[1.2] text-white"
                >
                  Tell us what you&rsquo;re trying to solve.
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="shrink-0 -mt-1 -mr-2 p-2 text-white/60 hover:text-white transition-colors duration-200"
                tabIndex={open ? 0 : -1}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            {state === "sent" ? (
              <div className="px-6 md:px-8 py-8">
                <p className="text-[16px] md:text-[18px] leading-[1.5] text-white">
                  Thanks. We&rsquo;ll come back to you within one business day.
                </p>
                <p className="mt-4 text-[13px] leading-[1.55] text-white/55">
                  If it&rsquo;s urgent, email{" "}
                  <a
                    href="mailto:info@twopointtechnologies.com"
                    className="text-white/85 underline underline-offset-4 hover:text-[var(--2pt-green)] transition-colors"
                  >
                    info@twopointtechnologies.com
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-8 inline-flex items-center gap-2 px-4 h-11 bg-[var(--2pt-green)] text-[var(--2pt-black)] hover:brightness-95 transition"
                >
                  <span className="text-[11px] font-mono tracking-[0.22em] uppercase">
                    Close
                  </span>
                </button>
              </div>
            ) : (
              <form
                name={FORM_NAME}
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="px-6 md:px-8 py-6 space-y-5"
              >
                <input type="hidden" name="form-name" value={FORM_NAME} />
                <p hidden aria-hidden="true">
                  <label>
                    Leave this empty:
                    <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ContactField
                    label="Name"
                    name="name"
                    autoComplete="name"
                    required
                  />
                  <ContactField
                    label="Company"
                    name="company"
                    autoComplete="organization"
                  />
                </div>
                <ContactField
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
                <ContactArea
                  label="What are you trying to solve?"
                  name="message"
                  required
                  rows={4}
                  placeholder="A few lines is plenty. What's the problem, the shape of your team, and any deadline we should know about."
                />

                {state === "error" ? (
                  <div className="text-[12px] leading-[1.5] text-[#f4a5a5] font-mono">
                    Send failed{errorMsg ? ` (${errorMsg})` : ""}. Please email{" "}
                    <a
                      href="mailto:info@twopointtechnologies.com"
                      className="underline"
                    >
                      info@twopointtechnologies.com
                    </a>{" "}
                    directly.
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2 h-12 bg-white text-black hover:bg-[var(--2pt-green)] transition-colors duration-500 disabled:opacity-60"
                >
                  <span className="text-[11px] font-mono tracking-[0.22em] uppercase">
                    {state === "submitting" ? "Sending…" : "Send"}
                  </span>
                  {state !== "submitting" ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : null}
                </button>

                <p className="text-[10px] font-mono tracking-[0.22em] uppercase text-white/40 text-center">
                  Or email info@twopointtechnologies.com
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

function ContactField({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  autoComplete?: string
}) {
  return (
    <label className="block">
      <span className="block text-[10px] font-mono tracking-[0.22em] uppercase text-white/50 mb-1.5">
        {label}
        {required ? <span className="text-[var(--2pt-green)] ml-0.5">*</span> : null}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full h-11 px-3 bg-white/[0.04] border border-white/15 focus:border-[var(--2pt-green)] focus:bg-white/[0.06] outline-none text-white text-[14px] transition-colors"
      />
    </label>
  )
}

function ContactArea({
  label,
  name,
  required = false,
  rows = 4,
  placeholder,
}: {
  label: string
  name: string
  required?: boolean
  rows?: number
  placeholder?: string
}) {
  return (
    <label className="block">
      <span className="block text-[10px] font-mono tracking-[0.22em] uppercase text-white/50 mb-1.5">
        {label}
        {required ? <span className="text-[var(--2pt-green)] ml-0.5">*</span> : null}
      </span>
      <textarea
        name={name}
        required={required}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 bg-white/[0.04] border border-white/15 focus:border-[var(--2pt-green)] focus:bg-white/[0.06] outline-none text-white text-[14px] leading-[1.5] transition-colors resize-none"
      />
    </label>
  )
}
