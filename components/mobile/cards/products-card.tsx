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
import { ProductIconTile, type ProductId } from "@/components/ui/product-glyph"

const PRODUCTS = [
  {
    id: "chedder",
    wordmark: "Chedder",
    category: "Generative engine audit · DTC",
    body: "The complete GEO audit for DTC brands.",
    url: "https://chedder.2pt.ai",
    status: "Live" as const,
  },
  {
    id: "lumen",
    wordmark: "Lumen",
    category: "Customer intelligence",
    body: "Watch where growth is actually coming from.",
    url: "https://lumen.2pt.ai",
    status: "Live" as const,
  },
  {
    id: "conduit",
    wordmark: "Conduit",
    category: "Marketing-ops plumbing",
    body: "Your marketing stack, finally talking to itself.",
    url: "#contact",
    status: "Soon" as const,
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
          The 2pt Suite · Ed. 01
        </span>
      </div>

      {/* Intro */}
      <div className="relative z-10 px-6 mt-5">
        <h2 className="text-[24px] font-bold tracking-[-0.03em] leading-[1.05] text-[var(--2pt-black)]">
          Three systems
          <br />
          we&rsquo;ve shipped this quarter.
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
            href={p.url}
            target={p.url.startsWith("http") ? "_blank" : undefined}
            rel={p.url.startsWith("http") ? "noopener noreferrer" : undefined}
            className="group relative flex-1 min-h-0 flex flex-col justify-between border border-[var(--2pt-black)]/12 rounded-[10px] px-4 py-4 bg-[var(--2pt-white)] active:scale-[0.99] transition-transform duration-150"
            style={{
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.5) inset, 0 1px 2px rgba(10,10,10,0.03)",
            }}
          >
            {/* Icon tile + wordmark lockup */}
            <div className="flex items-start gap-3">
              <ProductIconTile
                id={p.id as ProductId}
                size={46}
                atomic={(i + 1).toString().padStart(2, "0")}
              />
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="text-[22px] font-bold tracking-[-0.035em] leading-none text-[var(--2pt-black)]">
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

            {/* Metadata footer */}
            <div className="flex items-center justify-between text-[8px] font-mono tracking-[0.24em] uppercase text-[var(--2pt-black)]/35">
              <span>
                2pt/{p.id} · v.{(i + 1).toString().padStart(2, "0")}
              </span>
              <span
                className="flex items-center gap-1"
                style={{
                  color:
                    p.status === "Live"
                      ? "var(--2pt-green)"
                      : "rgba(10,10,10,0.5)",
                }}
              >
                <span
                  className="w-1 h-1 rounded-full"
                  style={{
                    background:
                      p.status === "Live"
                        ? "var(--2pt-green)"
                        : "rgba(10,10,10,0.3)",
                  }}
                />
                {p.status}
              </span>
            </div>
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
