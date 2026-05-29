"use client"

/**
 * ClientsCard — black full-bleed card. Brand names cascade in vertically
 * when the card comes into view, with a thin green hairline rule between
 * each. Reads as a credit roll / who-we-deploy-inside list.
 */

import { useInView } from "@/components/mobile/use-in-view"

const CLIENTS = [
  "Mars",
  "Yamaha",
  "Walmart",
  "Marriott",
  "NCR",
  "Pedigree",
  "Cesar",
  "Sprouts",
  "Instacart",
]

export function ClientsCard({ index }: { index: number }) {
  const { ref, visible } = useInView<HTMLElement>(0.45)

  return (
    <section
      ref={ref}
      data-card-index={index}
      className="relative h-[100dvh] w-full snap-start overflow-hidden bg-[var(--2pt-black)] text-[var(--2pt-white)] flex flex-col"
    >
      {/* Top eyebrow */}
      <div className="pt-16 px-6 flex items-center gap-2.5">
        <span className="relative inline-flex">
          <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full" />
          <span className="absolute inset-0 w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-ping opacity-60" />
        </span>
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--2pt-white)]/55">
          Deployed inside
        </span>
      </div>

      {/* Roll of names — flex-1 fills the space between eyebrow and footer
          with safe top/bottom padding so the first row never collides with
          the "Deployed inside" eyebrow on smaller phones. */}
      <div className="flex-1 min-h-0 flex flex-col justify-center px-6 pt-10 pb-6 overflow-hidden">
        {CLIENTS.map((name, i) => (
          <div
            key={name}
            className="flex items-center justify-between py-[10px] border-b border-[var(--2pt-white)]/8 last:border-b-0"
          >
            <span className="text-[22px] font-bold tracking-[-0.025em] text-[var(--2pt-white)] leading-none">
              {name}
            </span>
            <span className="text-[9px] font-mono tracking-[0.22em] uppercase text-[var(--2pt-white)]/35 tabular-nums">
              {String(i + 1).padStart(2, "0")} / {CLIENTS.length}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom — small print */}
      <div className="pb-12 px-6 text-[10px] font-mono tracking-[0.28em] uppercase text-[var(--2pt-white)]/40 flex items-center justify-between">
        <span>{CLIENTS.length} active deployments</span>
        <span className="text-[var(--2pt-green)]">NYC · LDN</span>
      </div>
    </section>
  )
}
