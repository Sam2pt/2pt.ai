"use client"

/**
 * ClientStrip — slim validation band between hero and cinematic.
 *
 * Single thin band. Mono "Deployed inside" label on the left, marquee of
 * client logos scrolling slowly. Reads as a credential line in a newspaper.
 */

import { useEffect, useState } from "react"
import { ClientMark, type ClientMarkVariant } from "@/components/ui/client-mark"

type Client = { name: string; domain: string; variant: ClientMarkVariant }

const CLIENTS: Client[] = [
  { name: "Mars",       domain: "mars.com",      variant: 0 },
  { name: "Yamaha",     domain: "yamaha.com",    variant: 1 },
  { name: "Walmart",    domain: "walmart.com",   variant: 2 },
  { name: "Marriott",   domain: "marriott.com",  variant: 3 },
  { name: "NCR",        domain: "ncr.com",       variant: 4 },
  { name: "Pedigree",   domain: "pedigree.com",  variant: 0 },
  { name: "Cesar",      domain: "cesar.com",     variant: 1 },
  { name: "Sprouts",    domain: "sprouts.com",   variant: 2 },
  { name: "Instacart",  domain: "instacart.com", variant: 3 },
]

const LOGO_TOKEN =
  process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN || "pk_X-1ZO13GSgeOoUrIuJ6GMQ"

const LOAD_TIMEOUT_MS = 4000
const ROW = [...CLIENTS, ...CLIENTS]

export function ClientStrip() {
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
          `img[data-client-strip="${c.name}"]`
        )
        if (img && (!img.complete || !img.naturalWidth)) markFailed(c.name)
      })
    }, LOAD_TIMEOUT_MS)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      aria-label="Clients"
      className="relative bg-[var(--2pt-offwhite)] border-b border-[var(--2pt-black)]/10 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-5 flex items-center gap-8 md:gap-10">
        {/* Left credential label */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full" />
          <span className="text-[10px] tracking-[0.3em] text-[var(--2pt-black)]/55 font-mono uppercase whitespace-nowrap">
            Deployed inside
          </span>
        </div>

        {/* Marquee — soft fades on each side */}
        <div className="relative flex-1 overflow-hidden animate-marquee-pause">
          <div
            className="pointer-events-none absolute top-0 bottom-0 left-0 w-16 z-10"
            style={{
              background:
                "linear-gradient(to right, var(--2pt-offwhite) 0%, transparent 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute top-0 bottom-0 right-0 w-16 z-10"
            style={{
              background:
                "linear-gradient(to left, var(--2pt-offwhite) 0%, transparent 100%)",
            }}
          />

          <div className="flex items-center gap-x-12 md:gap-x-16 animate-marquee w-max bg-[var(--2pt-offwhite)]">
            {ROW.map((c, i) => {
              const failedLogo = failed.has(c.name)
              return (
                <div key={`${c.name}-${i}`} className="group flex items-center gap-3 min-w-fit">
                  <div className="h-6 flex items-center">
                    {failedLogo ? (
                      <div className="w-5 h-5 opacity-70">
                        <ClientMark variant={c.variant} />
                      </div>
                    ) : (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        data-client-strip={c.name}
                        src={`https://img.logo.dev/${c.domain}?token=${LOGO_TOKEN}&size=128&format=png&greyscale=true`}
                        alt={`${c.name} logo`}
                        onError={() => markFailed(c.name)}
                        onLoad={(e) => {
                          if (!e.currentTarget.naturalWidth) markFailed(c.name)
                        }}
                        className="h-full w-auto max-w-[80px] object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          // mix-blend-mode: darken keeps the darker of source vs
                          // background per pixel — so white (or near-white) logo
                          // canvases drop out entirely against the off-white page,
                          // while the dark logo mark survives. Bulletproof for
                          // any logo regardless of background.
                          mixBlendMode: "darken",
                          filter: "grayscale(1) contrast(1.05)",
                        }}
                      />
                    )}
                  </div>
                  <span className="text-[11px] tracking-[0.05em] font-medium text-[var(--2pt-black)]/55 whitespace-nowrap">
                    {c.name}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
