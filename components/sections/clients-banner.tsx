"use client"

import { useEffect, useRef, useState } from "react"
import { ClientMark, type ClientMarkVariant } from "@/components/ui/client-mark"

type Client = {
  name: string
  domain: string
  variant: ClientMarkVariant
}

const clients: Client[] = [
  { name: "Mars", domain: "mars.com", variant: 0 },
  { name: "Yamaha", domain: "yamaha.com", variant: 1 },
  { name: "Walmart", domain: "walmart.com", variant: 2 },
  { name: "Marriott", domain: "marriott.com", variant: 3 },
  { name: "NCR", domain: "ncr.com", variant: 4 },
  { name: "Pedigree", domain: "pedigree.com", variant: 0 },
  { name: "Cesar", domain: "cesar.com", variant: 1 },
  { name: "Sprouts", domain: "sprouts.com", variant: 2 },
  { name: "Instacart", domain: "instacart.com", variant: 3 },
  { name: "Jolly Pets", domain: "jollypets.com", variant: 4 },
]

const LOGO_TOKEN =
  process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN || "pk_X-1ZO13GSgeOoUrIuJ6GMQ"

const LOAD_TIMEOUT_MS = 4000

// Duplicate the list so the marquee can scroll seamlessly:
// the first set ends, the second set starts, then it loops to start.
const marqueeRow = [...clients, ...clients]

export function ClientsBanner() {
  const [failed, setFailed] = useState<Set<string>>(new Set())

  const markAsFailed = (name: string) => {
    setFailed((prev) => {
      if (prev.has(name)) return prev
      const next = new Set(prev)
      next.add(name)
      return next
    })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      clients.forEach((c) => {
        const img = document.querySelector<HTMLImageElement>(
          `img[data-client="${c.name}"]`
        )
        if (img && (!img.complete || !img.naturalWidth)) markAsFailed(c.name)
      })
    }, LOAD_TIMEOUT_MS)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative py-24 md:py-32 bg-[var(--2pt-offwhite)] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-[var(--2pt-black)]/10" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-[var(--2pt-black)]/10" />

      <div className="max-w-6xl mx-auto px-8 md:px-12 relative z-10 mb-16">
        <div className="flex items-center justify-center">
          <span className="text-[10px] tracking-[0.3em] text-[var(--2pt-black)]/50 font-mono uppercase">
            Trusted by enterprise marketing organisations
          </span>
        </div>
      </div>

      {/* Marquee — pauses on hover via .animate-marquee-pause wrapper */}
      <div className="relative overflow-hidden animate-marquee-pause">
        {/* Edge fades — soft fade-out at the left and right of the marquee */}
        <div
          className="pointer-events-none absolute top-0 bottom-0 left-0 w-32 z-10"
          style={{
            background:
              "linear-gradient(to right, var(--2pt-offwhite) 0%, transparent 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute top-0 bottom-0 right-0 w-32 z-10"
          style={{
            background:
              "linear-gradient(to left, var(--2pt-offwhite) 0%, transparent 100%)",
          }}
        />

        <div className="flex items-start gap-x-20 md:gap-x-28 lg:gap-x-32 animate-marquee w-max">
          {marqueeRow.map((client, i) => {
            const hasFailed = failed.has(client.name)
            return (
              <div
                key={`${client.name}-${i}`}
                className="group flex flex-col items-center gap-4 min-w-[100px]"
              >
                <div className="h-10 md:h-12 flex items-center justify-center">
                  {hasFailed ? (
                    <div className="w-[40px] h-[40px] md:w-[48px] md:h-[48px] transition-transform duration-700 ease-out group-hover:rotate-[15deg]">
                      <ClientMark variant={client.variant} />
                    </div>
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      data-client={client.name}
                      src={`https://img.logo.dev/${client.domain}?token=${LOGO_TOKEN}&size=128&format=png`}
                      alt={`${client.name} logo`}
                      onError={() => markAsFailed(client.name)}
                      onLoad={(e) => {
                        if (!e.currentTarget.naturalWidth) markAsFailed(client.name)
                      }}
                      className="h-full w-auto max-w-[120px] object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0 mix-blend-multiply"
                    />
                  )}
                </div>
                <span className="text-xs md:text-sm font-medium tracking-tight text-[var(--2pt-black)]/55 group-hover:text-[var(--2pt-black)]/85 transition-colors duration-700">
                  {client.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
