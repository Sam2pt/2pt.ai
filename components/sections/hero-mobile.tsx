"use client"

/**
 * HeroMobile — stripped editorial hero for mobile.
 *
 * No mouse-mesh, no drift orb, no floating dots, no ticking counters.
 * Just clean stacked content: top hairline strip, eyebrow with build stamp,
 * headline, partnership line, a static 2×2 stat grid, and a CTA.
 *
 * The desktop hero (HeroSection) renders on md+ via a Tailwind swap in
 * app/page.tsx; this component renders below md.
 */

import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

function useTime() {
  const [t, setT] = useState<Date | null>(null)
  useEffect(() => {
    setT(new Date())
    const i = setInterval(() => setT(new Date()), 60_000)
    return () => clearInterval(i)
  }, [])
  return t
}

export function HeroMobile() {
  const time = useTime()

  const buildStamp = time
    ? `${time.getFullYear()}.${String(time.getMonth() + 1).padStart(2, "0")}.${String(time.getDate()).padStart(2, "0")}`
    : "—"

  // Static stats — same labels as desktop, no live tick to keep the page calm
  const stats = [
    { label: "In production", value: "47" },
    { label: "Bid auctions / min", value: "1,284" },
    { label: "Variants shipped today", value: "1,847" },
    { label: "Anomalies caught today", value: "18" },
  ]

  return (
    <section className="relative bg-[var(--2pt-offwhite)] text-[var(--2pt-black)] pt-14">
      {/* Top hairline strip — masthead chrome */}
      <div className="relative border-b border-[var(--2pt-black)]/12">
        <div className="px-5 py-3.5 flex items-center justify-between text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/50">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-pulse" />
              <span className="text-[var(--2pt-green)]">Live</span>
            </span>
            <span>2pt · Vol I</span>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="px-5 py-10">
        {/* Eyebrow */}
        <div className="flex items-baseline gap-2 mb-8">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--2pt-black)]/45">
            Runtime report
          </span>
          <span className="text-[10px] font-mono tracking-[0.18em] text-[var(--2pt-black)]/25 tabular-nums">
            build {buildStamp}
          </span>
        </div>

        {/* Headline — service-explicit, deploy-verb forward. Same scale on
            both lines. Green verdict line says where the systems go. */}
        <h1 className="mb-8">
          <span className="block text-[44px] font-bold tracking-[-0.05em] leading-[0.94] text-[var(--2pt-black)]">
            We deploy production AI
          </span>
          <span className="block text-[44px] font-bold tracking-[-0.05em] leading-[0.94] text-[var(--2pt-green)] mt-1">
            inside marketing teams.
          </span>
        </h1>

        {/* Body */}
        <p className="text-[15px] text-[var(--2pt-black)]/75 leading-relaxed mb-2">
          We modernize the marketing function for the AI decade.
        </p>
        <p className="text-[14px] text-[var(--2pt-black)]/55 leading-relaxed mb-10">
          In partnership with <span className="text-[var(--2pt-black)]">Anthropic</span>{" "}
          <span className="text-[var(--2pt-black)]/25">·</span> Claude Partner Network
        </p>

        {/* Static stat band — 2×2 grid */}
        <div className="grid grid-cols-2 border-y border-[var(--2pt-black)]/12">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-5 ${i % 2 === 0 ? "pr-4 border-r border-[var(--2pt-black)]/10" : "pl-4"} ${i >= 2 ? "border-t border-[var(--2pt-black)]/10" : ""}`}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <span className="w-1 h-1 rounded-full bg-[var(--2pt-black)]/30" />
                <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/45">
                  {s.label}
                </span>
              </div>
              <div className="text-2xl font-medium text-[var(--2pt-black)] tabular-nums tracking-tight">
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10">
          <a
            href="#what-we-solve"
            className="group inline-flex items-center gap-3 text-[12px] font-mono tracking-[0.18em] uppercase text-[var(--2pt-black)]"
          >
            <span className="border-b border-[var(--2pt-black)] pb-1">
              See what we deploy
            </span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Bottom hairline strip — node route + scroll cue */}
      <div className="border-t border-[var(--2pt-black)]/12">
        <div className="px-5 py-3 flex items-center justify-between text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/45">
          <span>us-east · eu-west</span>
          <span className="flex items-center gap-2">
            Scroll
            <span className="w-6 h-px bg-[var(--2pt-black)]/25" />
          </span>
        </div>
      </div>
    </section>
  )
}
