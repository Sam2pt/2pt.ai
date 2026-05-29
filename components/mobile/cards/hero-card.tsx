"use client"

/**
 * HeroCard — full-bleed black cover with the deploy claim.
 *
 * Behind the headline: a slowly-cycling fake deploy log streams lines as
 * if you're watching a CI/CD pipeline run inside someone's marketing
 * function. Numbers tick, system names appear, statuses flip. Very
 * brand-on: "we ship live software inside marketing teams."
 *
 * Headline animates in word-by-word once the card is in view.
 * Swipe-up cue at the bottom.
 */

import { useEffect, useState } from "react"
import { useInView } from "@/components/mobile/use-in-view"

const LOG_TEMPLATES = [
  "[ok] retail-media-bidder/amazon.us deployed",
  "[ok] segment-scorer/q4-cohort built",
  "[ok] creative-scorer.brand-fit promoted v-03",
  "[ok] compliance.sentiment scanned 2,847 assets",
  "[ok] efficiency.anomaly caught $14,200 waste",
  "[run] bid-loop walmart.us · 21 bids/s",
  "[run] segment-watch · 6 cohorts active",
  "[promote] hero·carousel·usage → 8.9 score",
  "[scan] dm·nyc-promo · pass",
  "[transfer] system handover · 14% complete",
  "[deploy] node.nyc-447 healthy · 42ms p95",
  "[deploy] node.ldn-45 healthy · 38ms p95",
]

export function HeroCard({ index }: { index: number }) {
  const { ref, visible } = useInView<HTMLElement>(0.5)
  // Streaming log lines. New line appears every ~700ms once visible.
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    if (!visible) return
    let i = 0
    const id = setInterval(() => {
      setLogs((prev) => {
        const next = [
          ...prev,
          LOG_TEMPLATES[i % LOG_TEMPLATES.length],
        ].slice(-9)
        return next
      })
      i++
    }, 700)
    return () => clearInterval(id)
  }, [visible])

  return (
    <section
      ref={ref}
      data-card-index={index}
      className="relative h-[100dvh] w-full snap-start overflow-hidden bg-[var(--2pt-black)] text-[var(--2pt-white)]"
    >
      {/* Green wash anchor */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 50% at 80% 75%, rgba(74,222,128,0.20) 0%, rgba(74,222,128,0.06) 35%, transparent 65%)",
        }}
      />

      {/* Background log stream — monospace, very faint */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-32 px-6 font-mono text-[10px] leading-[1.7] uppercase tracking-[0.1em] text-[var(--2pt-white)]/[0.18] pointer-events-none"
      >
        {logs.map((line, i) => (
          <div
            key={`${line}-${i}`}
            style={{
              opacity: 0.3 + (i / logs.length) * 0.7,
              animation: "fadeInUp 600ms cubic-bezier(0.16,1,0.3,1) both",
            }}
          >
            {line}
          </div>
        ))}
      </div>

      {/* Top chrome — LIVE + edition */}
      <div className="relative z-10 pt-14 px-6 flex items-center justify-between text-[10px] font-mono tracking-[0.28em] uppercase">
        <span className="flex items-center gap-1.5 text-[var(--2pt-green)]">
          <span className="relative inline-flex">
            <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full" />
            <span className="absolute inset-0 w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-ping opacity-60" />
          </span>
          Live
        </span>
        <span className="text-[var(--2pt-white)]/45">2pt · vol I</span>
      </div>

      {/* Anthropic partner credibility chip — sits just under the masthead
          strip so it lands in the first viewport beat. */}
      <div className="relative z-10 mt-5 px-6">
        <a
          href="https://www.anthropic.com/partners"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--2pt-white)]/15 bg-[var(--2pt-white)]/[0.04] backdrop-blur-sm"
        >
          <span className="w-1 h-1 rounded-full bg-[var(--2pt-green)]" />
          <span className="text-[9px] font-mono tracking-[0.22em] uppercase text-[var(--2pt-white)]/75">
            Anthropic Partner
          </span>
        </a>
      </div>

      {/* Headline */}
      <div className="relative z-10 mt-14 px-6">
        <div className="text-[10px] font-mono tracking-[0.28em] uppercase text-[var(--2pt-white)]/45 mb-7">
          Runtime report
        </div>
        <h1 className="text-[44px] font-bold tracking-[-0.05em] leading-[0.94] text-[#fff]!">
          {["We", "deploy", "production", "AI"].map((w, i) => (
            <span
              key={i}
              className="inline-block"
              
            >
              {w}
              {i < 3 ? " " : ""}
            </span>
          ))}
          <br />
          {["inside", "marketing", "teams."].map((w, i) => (
            <span
              key={i}
              className="inline-block text-[var(--2pt-green)]"
              
            >
              {w}
              {i < 2 ? " " : ""}
            </span>
          ))}
        </h1>
      </div>

      {/* Swipe-up cue */}
      <div
        className="absolute bottom-10 inset-x-0 z-10 flex flex-col items-center gap-2 text-[10px] font-mono tracking-[0.28em] uppercase text-[var(--2pt-white)]/55"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 1200ms ease-out 1400ms",
        }}
      >
        <span>Swipe</span>
        <span
          className="block w-px h-6"
          style={{
            background:
              "linear-gradient(to bottom, var(--2pt-green), transparent)",
            animation: "fadeIn 1.4s ease-in-out infinite alternate",
          }}
        />
      </div>
    </section>
  )
}
