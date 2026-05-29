"use client"

/**
 * ProductsCard. Mobile Deploy Console card.
 *
 * Three productised systems we've already shipped: Chedder, Lumen, Conduit.
 * Stacked vertically as three tap-targets. Each tile has wordmark + one-
 * line description + green status dot + arrow. Light canvas to match the
 * desktop product surface.
 */

import { ArrowUpRight } from "lucide-react"

const PRODUCTS = [
  {
    id: "chedder",
    wordmark: "Chedder",
    category: "Generative engine audit",
    body: "See where AI search cites you. And where it doesn't.",
  },
  {
    id: "lumen",
    wordmark: "Lumen",
    category: "Customer intelligence",
    body: "Score every segment in real time. Watch growth move.",
  },
  {
    id: "conduit",
    wordmark: "Conduit",
    category: "Marketing-ops plumbing",
    body: "Wire your stack. Plug-and-play marketing ops.",
  },
]

export function ProductsCard({ index }: { index: number }) {
  return (
    <section
      data-card-index={index}
      className="relative h-[100dvh] w-full snap-start overflow-hidden bg-[var(--2pt-white)] text-[var(--2pt-black)] flex flex-col"
    >
      {/* Green wash anchor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 10% 12%, rgba(74,222,128,0.10) 0%, transparent 65%)",
        }}
      />

      {/* Top eyebrow */}
      <div className="relative z-10 pt-14 px-6 flex items-center gap-2.5">
        <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full" />
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--2pt-black)]/55">
          <span className="text-[var(--2pt-black)]/30 mr-2">III.</span>
          The product suite
        </span>
      </div>

      {/* Intro */}
      <div className="relative z-10 px-6 mt-5">
        <h2 className="text-[24px] font-bold tracking-[-0.03em] leading-[1.05] text-[var(--2pt-black)]">
          Three systems
          <br />
          we&rsquo;ve already shipped.
        </h2>
        <p className="mt-3 text-[12.5px] text-[var(--2pt-black)]/60 leading-[1.5] max-w-[34ch]">
          Productised patterns we deploy and customise inside engagements.
        </p>
      </div>

      {/* Product tiles */}
      <div className="relative z-10 flex-1 min-h-0 px-6 mt-6 pb-6 flex flex-col gap-3">
        {PRODUCTS.map((p, i) => (
          <a
            key={p.id}
            href="#contact"
            className="group relative flex-1 min-h-0 flex flex-col justify-between border border-[var(--2pt-black)]/12 rounded-[10px] px-4 py-4 bg-[var(--2pt-white)] active:scale-[0.99] transition-transform duration-150"
            style={{
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.5) inset, 0 1px 2px rgba(10,10,10,0.03)",
            }}
          >
            {/* Top. Index + status */}
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono tracking-[0.24em] uppercase text-[var(--2pt-black)]/35 tabular-nums">
                {(i + 1).toString().padStart(2, "0")} /
                {PRODUCTS.length.toString().padStart(2, "0")}
              </span>
              <span className="flex items-center gap-1.5 text-[9px] font-mono tracking-[0.24em] uppercase text-[var(--2pt-green)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--2pt-green)]" />
                Live
              </span>
            </div>

            {/* Wordmark */}
            <div className="flex items-end justify-between">
              <div>
                <div className="text-[26px] font-bold tracking-[-0.035em] leading-none text-[var(--2pt-black)]">
                  {p.wordmark}
                  <span className="text-[var(--2pt-green)]">.</span>
                </div>
                <div className="mt-1.5 text-[9px] font-mono tracking-[0.22em] uppercase text-[var(--2pt-black)]/50">
                  {p.category}
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 shrink-0 text-[var(--2pt-black)]/45 group-hover:text-[var(--2pt-green)] transition-colors duration-300" />
            </div>

            {/* Body */}
            <p className="text-[12px] leading-[1.4] text-[var(--2pt-black)]/65 line-clamp-2">
              {p.body}
            </p>
          </a>
        ))}
      </div>

      {/* Bottom. Footer line */}
      <div className="relative z-10 pb-10 px-6 flex items-center justify-between text-[10px] font-mono tracking-[0.28em] uppercase text-[var(--2pt-black)]/45 border-t border-[var(--2pt-black)]/8 pt-4">
        <span>Productised systems</span>
        <span className="text-[var(--2pt-green)] tabular-nums">
          {PRODUCTS.length.toString().padStart(2, "0")} shipped
        </span>
      </div>
    </section>
  )
}
