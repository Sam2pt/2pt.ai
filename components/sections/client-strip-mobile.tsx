"use client"

/**
 * ClientStripMobile — static credential band for mobile.
 *
 * No marquee. 3×3 grid of client logos with names underneath. Each cell
 * has an explicit off-white background so the mix-blend-mode:darken trick
 * works (drops white logo canvases against the page) without depending on
 * the parent's stacking context.
 */

import { useEffect, useState } from "react"

type Client = { name: string; domain: string }

const CLIENTS: Client[] = [
  { name: "Mars",       domain: "mars.com" },
  { name: "Yamaha",     domain: "yamaha.com" },
  { name: "Walmart",    domain: "walmart.com" },
  { name: "Marriott",   domain: "marriott.com" },
  { name: "NCR",        domain: "ncr.com" },
  { name: "Pedigree",   domain: "pedigree.com" },
  { name: "Cesar",      domain: "cesar.com" },
  { name: "Sprouts",    domain: "sprouts.com" },
  { name: "Instacart",  domain: "instacart.com" },
]

const LOGO_TOKEN =
  process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN || "pk_X-1ZO13GSgeOoUrIuJ6GMQ"

const LOAD_TIMEOUT_MS = 4000

export function ClientStripMobile() {
  const [failed, setFailed] = useState<Set<string>>(new Set())

  const markFailed = (name: string) =>
    setFailed((prev) => {
      if (prev.has(name)) return prev
      const next = new Set(prev)
      next.add(name)
      return next
    })

  useEffect(() => {
    const t = setTimeout(() => {
      CLIENTS.forEach((c) => {
        const img = document.querySelector<HTMLImageElement>(
          `img[data-client-mobile="${c.name}"]`
        )
        if (img && (!img.complete || !img.naturalWidth)) markFailed(c.name)
      })
    }, LOAD_TIMEOUT_MS)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      aria-label="Clients"
      className="relative bg-[var(--2pt-offwhite)] border-b border-[var(--2pt-black)]/10"
    >
      <div className="px-5 py-7">
        <div className="flex items-center gap-2 mb-5">
          <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full" />
          <span className="text-[10px] tracking-[0.3em] text-[var(--2pt-black)]/55 font-mono uppercase">
            Deployed inside
          </span>
        </div>

        <div className="grid grid-cols-3 gap-x-3 gap-y-5">
          {CLIENTS.map((c) => {
            const isFailed = failed.has(c.name)
            return (
              <div
                key={c.name}
                className="flex flex-col items-center justify-end gap-2 bg-[var(--2pt-offwhite)]"
              >
                <div className="h-8 flex items-center justify-center w-full">
                  {isFailed ? (
                    <span className="text-[14px] font-medium text-[var(--2pt-black)]/75 tracking-tight">
                      {c.name}
                    </span>
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      data-client-mobile={c.name}
                      src={`https://img.logo.dev/${c.domain}?token=${LOGO_TOKEN}&size=128&format=png&greyscale=true`}
                      alt={`${c.name} logo`}
                      onError={() => markFailed(c.name)}
                      onLoad={(e) => {
                        if (!e.currentTarget.naturalWidth) markFailed(c.name)
                      }}
                      className="max-h-full w-auto max-w-[72px] object-contain opacity-70"
                      style={{
                        mixBlendMode: "darken",
                        filter: "grayscale(1) contrast(1.05)",
                      }}
                    />
                  )}
                </div>
                <span className="text-[9px] tracking-[0.18em] font-mono uppercase text-[var(--2pt-black)]/45 leading-none">
                  {c.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
