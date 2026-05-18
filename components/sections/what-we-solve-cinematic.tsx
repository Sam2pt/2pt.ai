"use client"

/**
 * WhatWeSolveCinematic — the killer chapter.
 *
 * 500vh tall outer container. Inner content is position: sticky, so the
 * viewport pins for 5 viewport-heights of scroll. As the user scrolls,
 * the content cycles through five operational problems, each with a
 * bespoke motion graphic that VISUALLY EMBODIES the solution.
 *
 * The motion of the site IS the demonstration. Scroll = system running.
 */

import { useEffect, useRef, useState } from "react"

const PROBLEMS = [
  {
    label: "I",
    title: "Monitoring efficiency",
    line: "Where is spend leaking?",
    body: "An efficiency agent watches every channel, every campaign, every retailer. Anomalies surface in seconds, not in next month's report.",
    story: "Today: $14,200 of waste caught and reallocated.",
  },
  {
    label: "II",
    title: "Monitoring growth",
    line: "Which segments are actually driving it?",
    body: "Every segment scored on growth, share and trend in real time. Hot segments get more spend. Cooling segments get diagnosed before they break. The question every board asks, answered live.",
    story: "Top segment driving 31% of incremental growth.",
  },
  {
    label: "III",
    title: "Driving growth",
    line: "How do we actually move the metric?",
    body: "A bidding system that runs 24/7 across Amazon, Walmart and Instacart. The agent trades the spend so your team focuses on the briefs that matter.",
    story: "1,284 bid auctions running this minute.",
  },
  {
    label: "IV",
    title: "Creative optimisation",
    line: "Which creative actually wins?",
    body: "Every variant scored against brand fit, hook strength and predicted CTR before it ships. Winners promoted, losers killed. Generative pipelines feed the algorithms what they reward.",
    story: "312 variants scored today. 47 promoted to live spend.",
  },
  {
    label: "V",
    title: "Consistency and compliance",
    line: "Will legal kill this before it ships?",
    body: "Six bots run on every piece of creative output. Sentiment, intent, brand voice, claims, PII, image safety. Continuous. Auditable. From DM triage to global launch.",
    story: "12,847 assets scanned today. 142 flagged before they shipped.",
  },
]

const N = PROBLEMS.length

/* ====================== Continuous animation clock ====================== */

function useNow() {
  const [now, setNow] = useState(0)
  useEffect(() => {
    let raf = 0
    const tick = () => {
      setNow(performance.now())
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  return now
}

/**
 * useAutoProgress — runs from 0 to 1 over `durationMs` once on mount.
 * Used by motion graphics so they "play through" their narrative when
 * a panel enters the viewport, instead of staying pinned to scroll
 * progress (which leaves panels half-empty).
 */
function useAutoProgress(durationMs: number) {
  const [v, setV] = useState(0)
  useEffect(() => {
    const start = performance.now()
    let raf = 0
    const tick = () => {
      const elapsed = performance.now() - start
      const t = Math.min(1, elapsed / durationMs)
      // Smooth ease-out
      setV(1 - Math.pow(1 - t, 3))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [durationMs])
  return v
}

/* ====================== Section component ====================== */

export function WhatWeSolveCinematic() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handle = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight
      const scrolled = -rect.top
      setProgress(Math.max(0, Math.min(1, scrolled / total)))
    }
    window.addEventListener("scroll", handle, { passive: true })
    handle()
    return () => window.removeEventListener("scroll", handle)
  }, [])

  // Map global progress (0-1) to current panel index and within-panel progress
  const rawIndex = progress * N
  const panelIndex = Math.min(N - 1, Math.floor(rawIndex))
  const panelProgress = Math.min(1, rawIndex - panelIndex)
  const current = PROBLEMS[panelIndex]

  return (
    <section
      ref={sectionRef}
      id="what-we-solve"
      className="relative bg-[var(--2pt-offwhite)]"
      style={{ height: `${N * 65}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        {/* Top bar — eyebrow + progress dots + counter */}
        <div className="relative z-10 grid grid-cols-3 items-center max-w-[1400px] mx-auto w-full px-8 md:px-12 pt-24 md:pt-28">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full" />
            <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-[var(--2pt-black)]/50">
              <span className="text-[var(--2pt-black)]/30 mr-2">I.</span>What we solve
            </span>
          </div>

          {/* Center: progress dots */}
          <div className="flex items-center justify-center gap-2.5">
            {PROBLEMS.map((_, i) => {
              const active = i === panelIndex
              return (
                <span
                  key={i}
                  className="block rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: active ? 18 : 6,
                    height: 6,
                    backgroundColor: active
                      ? "var(--2pt-green)"
                      : i < panelIndex
                        ? "rgba(10,10,10,0.35)"
                        : "rgba(10,10,10,0.15)",
                  }}
                />
              )
            })}
          </div>

          {/* Right: counter */}
          <div className="text-right">
            <span className="text-[10px] font-mono tracking-[0.2em] text-[var(--2pt-black)]/45 tabular-nums">
              {String(panelIndex + 1).padStart(2, "0")} / 0{N}
            </span>
          </div>
        </div>

        {/* In-panel scroll progress — thin line under the top bar, fills as you scroll through THIS panel */}
        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-8 md:px-12 mt-3 h-px bg-[var(--2pt-black)]/8">
          <div
            className="h-full bg-[var(--2pt-green)] transition-[width] duration-200 ease-out"
            style={{ width: `${panelProgress * 100}%` }}
          />
        </div>

        {/* Main grid — text left, motion graphic right */}
        <div className="relative z-10 flex-1 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center max-w-[1400px] mx-auto w-full px-8 md:px-12 py-10">
          {/* LEFT — text */}
          <div className="lg:col-span-5">
            <div className="text-[10px] tracking-[0.3em] font-mono uppercase text-[var(--2pt-green)] mb-6">
              Problem {current.label}
            </div>
            <h2 className="text-[40px] sm:text-[52px] md:text-[64px] lg:text-[76px] font-medium tracking-[-0.025em] leading-[0.95] text-[var(--2pt-black)] mb-8">
              {current.title}
            </h2>
            <p className="text-lg md:text-xl text-[var(--2pt-black)] leading-relaxed mb-5">
              {current.line}
            </p>
            <p className="text-base md:text-[17px] text-[var(--2pt-black)]/60 leading-relaxed max-w-md mb-8">
              {current.body}
            </p>

            {/* Narrative caption — small live-feeling headline as if from a ticker */}
            <div className="inline-flex items-center gap-2.5 pt-5 border-t border-[var(--2pt-black)]/15 max-w-md">
              <span className="w-1 h-1 bg-[var(--2pt-green)] rounded-full animate-pulse shrink-0" />
              <span className="text-[10px] tracking-[0.25em] font-mono uppercase text-[var(--2pt-black)]/45 shrink-0">
                Recent
              </span>
              <span className="text-[13px] text-[var(--2pt-black)]/85 italic">
                {current.story}
              </span>
            </div>
          </div>

          {/* RIGHT — motion graphic */}
          <div className="lg:col-span-7 h-[420px] md:h-[520px] relative">
            <div
              key={panelIndex}
              className="absolute inset-0"
              style={{
                opacity: 1,
                animation: "fadeIn 600ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {panelIndex === 0 && <EfficiencyMotion p={panelProgress} />}
              {panelIndex === 1 && <GrowthMotion p={panelProgress} />}
              {panelIndex === 2 && <DrivingMotion p={panelProgress} />}
              {panelIndex === 3 && <CreativeMotion p={panelProgress} />}
              {panelIndex === 4 && <ComplianceMotion p={panelProgress} />}
            </div>
          </div>
        </div>

        {/* Bottom: scroll hint */}
        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-8 md:px-12 pb-10 flex items-center gap-3">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--2pt-black)]/35">
            {panelIndex < N - 1 ? "Keep scrolling" : "End of chapter"}
          </span>
          <span className="w-8 h-px bg-[var(--2pt-black)]/15" />
        </div>
      </div>
    </section>
  )
}

/* ====================== Motion graphic 1 — Monitoring efficiency ====================== */

const CHANNELS = [
  { name: "Amazon Ads",      base: 12_400 },
  { name: "Walmart Connect", base:  8_200 },
  { name: "Instacart Ads",   base:  6_800 },
  { name: "Meta",            base: 14_600 },
  { name: "Google",          base: 11_900 },
  { name: "TikTok",          base:  7_300 },
]

function EfficiencyMotion({ p }: { p: number }) {
  const now = useNow()
  void p // panel renders fully on entry — scroll only drives the narrative pace below

  return (
    <div className="absolute inset-0 bg-[var(--2pt-white)] border border-[var(--2pt-black)]/10 p-6 md:p-8 flex flex-col gap-3 overflow-hidden">
      {/* Mini header */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--2pt-black)]/10 mb-2">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-pulse" />
          <span className="text-[10px] tracking-[0.25em] font-mono uppercase text-[var(--2pt-black)]/60">
            Live · efficiency monitor
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--2pt-black)]/40 tabular-nums">
          {new Date().toISOString().slice(11, 19)}
        </span>
      </div>

      {CHANNELS.map((c, i) => {
        // Continuous tick — sine wave, plus an occasional anomaly burst
        const ticker = Math.sin((now / 700) + i * 1.7) * 0.05
        const liveSpend = c.base * (1 + ticker)
        // Anomaly: every ~6 seconds for ~1 second per channel (phased)
        const cycle = ((now / 1000 + i * 1.2) % 6)
        const anomaly = cycle > 5
        const resolved = cycle > 5.5
        const roas = (2.4 + Math.sin((now / 900) + i) * 0.4).toFixed(2)

        return (
          <div
            key={c.name}
            className="grid grid-cols-12 items-center gap-3 text-[13px]"
          >
            <span className="col-span-4 text-[var(--2pt-black)]/75 font-medium">{c.name}</span>
            <span className="col-span-3 font-mono tabular-nums text-[var(--2pt-black)] text-right">
              ${Math.round(liveSpend).toLocaleString()}
            </span>
            <span className="col-span-2 font-mono tabular-nums text-[var(--2pt-black)]/65 text-right">
              {roas}×
            </span>
            <span className="col-span-3 flex items-center justify-end gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
                style={{
                  backgroundColor: anomaly && !resolved
                    ? "rgb(225, 90, 90)"
                    : resolved
                      ? "var(--2pt-green)"
                      : "rgba(10,10,10,0.25)",
                }}
              />
              <span
                className="text-[10px] font-mono tracking-wider uppercase transition-colors duration-300"
                style={{
                  color: anomaly && !resolved
                    ? "rgb(200, 70, 70)"
                    : resolved
                      ? "var(--2pt-green)"
                      : "rgba(10,10,10,0.4)",
                }}
              >
                {anomaly && !resolved ? "Anomaly" : resolved ? "Reallocated" : "Nominal"}
              </span>
            </span>
          </div>
        )
      })}

      {/* Footer summary */}
      <div className="mt-auto pt-3 border-t border-[var(--2pt-black)]/10 flex items-center justify-between">
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/40">
          Anomalies caught today
        </span>
        <span className="text-[15px] font-medium text-[var(--2pt-black)] tabular-nums">
          {Math.floor((now / 1000) % 17) + 12}
        </span>
      </div>
    </div>
  )
}

/* ====================== Motion graphic 2 — Monitoring growth (by segment) ====================== */

/**
 * GrowthMotion — audience-segment performance view.
 *
 * Six audience segments listed as rows. Each row shows the segment name,
 * an animated growth bar (drawing left to right on panel entry), the
 * period-over-period growth percentage, and a status tag (Hot, Steady,
 * Cooling). Sorted by growth descending, with the top segment highlighted
 * in green as the priority cohort. Footer summarises the share of
 * incremental growth coming from the top segment.
 */

type Segment = {
  name: string
  descriptor: string
  share: number // 0-1 — width of the bar
  growth: number // % growth
}

const SEGMENTS: Segment[] = [
  { name: "New parents",      descriptor: "25-34 · urban",       share: 0.92, growth: 47 },
  { name: "High-LTV repeats", descriptor: "subscribers · annual", share: 0.78, growth: 31 },
  { name: "Q4 acquisition",   descriptor: "promo · winter",      share: 0.61, growth: 19 },
  { name: "Pet owners",       descriptor: "premium tier",        share: 0.44, growth: 12 },
  { name: "Lapsed buyers",    descriptor: "winback · 90d",       share: 0.30, growth: 4 },
  { name: "Premium tier",     descriptor: "VIP · concierge",     share: 0.22, growth: -3 },
]

function GrowthMotion({ p }: { p: number }) {
  void p
  const now = useNow()
  const autoP = useAutoProgress(1600)

  // Live tweak on growth numbers so they breathe (very small, never changes sign)
  const live = SEGMENTS.map((s, i) => ({
    ...s,
    growthLive: s.growth + Math.sin(now / 2400 + i * 1.3) * 0.4,
  }))

  // Total growth contribution from the top segment (for the footer line)
  const topShare = Math.round(
    (live[0].share / live.reduce((a, b) => a + b.share, 0)) * 100
  )

  return (
    <div className="absolute inset-0 bg-[var(--2pt-white)] border border-[var(--2pt-black)]/10 p-6 md:p-8 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--2pt-black)]/10 mb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-pulse" />
          <span className="text-[10px] tracking-[0.25em] font-mono uppercase text-[var(--2pt-black)]/60">
            Growth by segment · last 30d
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--2pt-black)]/40 tabular-nums">
          {SEGMENTS.length} segments
        </span>
      </div>

      {/* Segment rows */}
      <div className="flex-1 flex flex-col justify-center gap-2.5">
        {live.map((s, i) => {
          // Stagger bar reveal so the rows draw in top to bottom
          const reveal = Math.max(0, Math.min(1, (autoP - i * 0.08) * 2.2))
          const isTop = i === 0
          const isCooling = s.growth < 0
          const status = isCooling ? "Cooling" : s.growth >= 25 ? "Hot" : "Steady"

          return (
            <div key={s.name} className="grid grid-cols-12 items-center gap-2 sm:gap-3">
              {/* Name + descriptor */}
              <div className="col-span-5 sm:col-span-4 flex flex-col min-w-0">
                <span className="text-[12px] sm:text-[13px] font-medium text-[var(--2pt-black)]/85 truncate">
                  {s.name}
                </span>
                <span className="text-[9px] font-mono tracking-[0.18em] uppercase text-[var(--2pt-black)]/40 truncate">
                  {s.descriptor}
                </span>
              </div>

              {/* Bar */}
              <div className="col-span-4 sm:col-span-5 h-3 relative bg-[var(--2pt-offwhite)]/60 border border-[var(--2pt-black)]/8">
                <div
                  className="absolute inset-y-0 left-0 transition-[width] duration-300 ease-out"
                  style={{
                    width: `${s.share * reveal * 100}%`,
                    backgroundColor: isTop
                      ? "var(--2pt-green)"
                      : isCooling
                        ? "rgba(200,70,70,0.45)"
                        : "rgba(10,10,10,0.55)",
                  }}
                />
                {isTop && (
                  <div
                    className="absolute top-0 bottom-0 w-px bg-[var(--2pt-green)] animate-pulse"
                    style={{ left: `${s.share * reveal * 100}%` }}
                  />
                )}
              </div>

              {/* Growth % */}
              <div className="col-span-3 sm:col-span-2 text-right">
                <span
                  className="text-[13px] sm:text-[14px] font-medium tabular-nums tracking-tight transition-colors duration-300"
                  style={{
                    color: isCooling
                      ? "rgb(200,70,70)"
                      : isTop
                        ? "var(--2pt-green)"
                        : "var(--2pt-black)",
                  }}
                >
                  {s.growth >= 0 ? "+" : ""}
                  {s.growthLive.toFixed(1)}%
                </span>
              </div>

              {/* Status tag — mobile shows just the dot; sm+ shows label */}
              <div className="col-span-0 sm:col-span-1 flex items-center justify-end gap-1">
                <span
                  className="w-1 h-1 rounded-full"
                  style={{
                    backgroundColor: isCooling
                      ? "rgb(200,70,70)"
                      : isTop
                        ? "var(--2pt-green)"
                        : "rgba(10,10,10,0.35)",
                  }}
                />
                <span
                  className="hidden sm:inline text-[9px] font-mono tracking-wider uppercase"
                  style={{
                    color: isCooling
                      ? "rgb(200,70,70)"
                      : isTop
                        ? "var(--2pt-green)"
                        : "rgba(10,10,10,0.45)",
                  }}
                >
                  {status}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-[var(--2pt-black)]/10 flex items-center justify-between">
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/40">
          Top segment driving
          <span className="text-[var(--2pt-green)] ml-2 tabular-nums">
            {topShare}%
          </span>
          <span className="ml-1 text-[var(--2pt-black)]/40">of incremental growth</span>
        </span>
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-green)]">
          Reallocating spend
        </span>
      </div>
    </div>
  )
}

/* ====================== Motion graphic 3 — Driving growth ====================== */

function DrivingMotion({ p }: { p: number }) {
  // Bidding auction — bars rise and fall, one wins green per cycle
  const now = useNow()
  const bars = Array.from({ length: 8 }, (_, i) => {
    const phase = (now / 600 + i * 0.45) % (Math.PI * 2)
    const h = 0.3 + 0.6 * Math.abs(Math.sin(phase))
    return { i, h }
  })
  // Winning bar = the tallest right now
  const winnerIdx = bars.reduce((a, b) => (b.h > a.h ? b : a)).i
  const bidAmount = (2.40 + Math.sin(now / 800) * 0.6).toFixed(2)
  const wins = Math.floor((now / 1000) % 24) + 8

  return (
    <div className="absolute inset-0 bg-[var(--2pt-white)] border border-[var(--2pt-black)]/10 p-6 md:p-8 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[var(--2pt-black)]/10">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-pulse" />
          <span className="text-[10px] tracking-[0.25em] font-mono uppercase text-[var(--2pt-black)]/60">
            Bid auction · Amazon Ads
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--2pt-black)]/40 tabular-nums">
          24h
        </span>
      </div>

      {/* Live bid display */}
      <div className="flex items-baseline justify-between py-6">
        <div>
          <div className="text-[10px] tracking-[0.25em] font-mono uppercase text-[var(--2pt-black)]/40 mb-1">
            Winning bid
          </div>
          <div className="text-4xl md:text-5xl font-medium text-[var(--2pt-black)] tabular-nums">
            ${bidAmount}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] tracking-[0.25em] font-mono uppercase text-[var(--2pt-black)]/40 mb-1">
            Wins this minute
          </div>
          <div className="text-3xl font-medium text-[var(--2pt-green)] tabular-nums">{wins}</div>
        </div>
      </div>

      {/* Bars */}
      <div className="flex-1 flex items-end gap-2 md:gap-3">
        {bars.map((b) => {
          const isWinner = b.i === winnerIdx
          return (
            <div key={b.i} className="flex-1 flex flex-col items-stretch justify-end h-full gap-2">
              <div
                className="w-full transition-all duration-200 ease-out"
                style={{
                  height: `${b.h * 100}%`,
                  backgroundColor: isWinner ? "var(--2pt-green)" : "rgba(10,10,10,0.12)",
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-[var(--2pt-black)]/10 flex items-center justify-between">
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/40">
          Continuous · 24/7 bidding
        </span>
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-green)]">
          System trading
        </span>
      </div>
    </div>
  )
}

/* ====================== Motion graphic 4 — Creative optimisation ====================== */

/**
 * CreativeMotion — a creative-scoring panel.
 *
 * Six creative variants on a grid. Each is being scored against three
 * dimensions (Brand fit, Hook strength, Predicted CTR). A small score bar
 * fills under each dimension as the score is computed; once a variant
 * finishes scoring, a composite score (0-10) appears. The top scorer is
 * promoted as the WINNER and tagged "ship". Numbers tick believably; cycles
 * are staggered so the panel is always alive.
 */

const VARIANTS = [
  { id: "V-01", label: "Hero · benefit", base: { brand: 0.78, hook: 0.65, ctr: 0.72 } },
  { id: "V-02", label: "Hero · pricing", base: { brand: 0.55, hook: 0.78, ctr: 0.58 } },
  { id: "V-03", label: "Carousel · usage", base: { brand: 0.92, hook: 0.85, ctr: 0.88 } },
  { id: "V-04", label: "Carousel · proof", base: { brand: 0.70, hook: 0.45, ctr: 0.62 } },
  { id: "V-05", label: "Video · explainer", base: { brand: 0.82, hook: 0.72, ctr: 0.75 } },
  { id: "V-06", label: "Static · launch", base: { brand: 0.68, hook: 0.80, ctr: 0.70 } },
]

function CreativeMotion({ p }: { p: number }) {
  void p
  const now = useNow()

  // Compute scores with tiny live jitter so they breathe (never crossing the
  // winner threshold). All variants are always shown as scored — the panel's
  // job is to communicate "scoring is happening", not to play a staged reveal.
  const scored = VARIANTS.map((v) => {
    const total = (v.base.brand + v.base.hook + v.base.ctr) / 3
    const live = total + Math.sin(now / 2200 + v.base.brand * 10) * 0.01
    return { ...v, total: Math.max(0, Math.min(1, live)) }
  })
  const winnerIdx = scored.reduce((best, cur, i) => (cur.total > scored[best].total ? i : best), 0)

  // Per-variant "currently being re-scored" pulse — one variant at a time gets
  // a re-evaluation pulse, cycling through them. Gives the panel constant motion.
  const rescoringIdx = Math.floor(now / 1400) % VARIANTS.length

  // Live counters in the footer
  const variantsScoredToday = 312 + Math.floor(now / 4200)
  const promotedToday = 47 + Math.floor(now / 38000)

  return (
    <div className="absolute inset-0 bg-[var(--2pt-white)] border border-[var(--2pt-black)]/10 p-6 md:p-8 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--2pt-black)]/10 mb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-pulse" />
          <span className="text-[10px] tracking-[0.25em] font-mono uppercase text-[var(--2pt-black)]/60">
            Creative scoring · live
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--2pt-black)]/40 tabular-nums">
          {VARIANTS.length} / {VARIANTS.length} scored
        </span>
      </div>

      {/* Grid of variants — 2 cols on mobile (cards stay readable), 3 on sm+ */}
      <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {scored.map((v, i) => {
          const isWinner = i === winnerIdx
          const isRescoring = i === rescoringIdx
          const dims = [
            { label: "Brand", value: v.base.brand },
            { label: "Hook", value: v.base.hook },
            { label: "CTR", value: v.base.ctr },
          ]

          return (
            <div
              key={v.id}
              className="relative border bg-[var(--2pt-offwhite)]/30 p-3 flex flex-col transition-colors duration-300"
              style={{
                borderColor: isWinner
                  ? "rgba(74,222,128,0.65)"
                  : "rgba(10,10,10,0.10)",
                boxShadow: isWinner ? "inset 0 0 0 1px rgba(74,222,128,0.35)" : undefined,
              }}
            >
              {/* Top: variant id + label */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/45 tabular-nums">
                    {v.id}
                  </span>
                  {isRescoring && (
                    <span className="w-1 h-1 bg-[var(--2pt-green)] rounded-full animate-pulse" />
                  )}
                </div>
                {isWinner && (
                  <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-green)]">
                    Ship
                  </span>
                )}
              </div>

              {/* Stylised creative preview — a small abstract composition unique per variant */}
              <div className="h-12 mb-3 bg-[var(--2pt-white)] border border-[var(--2pt-black)]/8 flex items-center justify-center overflow-hidden relative">
                <svg viewBox="0 0 60 40" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                  {/* Different abstract pattern per variant */}
                  {i === 0 && (
                    <>
                      <rect x="4" y="6" width="22" height="28" fill="rgba(10,10,10,0.15)" />
                      <rect x="30" y="10" width="26" height="6" fill="rgba(10,10,10,0.25)" />
                      <rect x="30" y="20" width="20" height="3" fill="rgba(10,10,10,0.12)" />
                      <rect x="30" y="26" width="18" height="3" fill="rgba(10,10,10,0.12)" />
                    </>
                  )}
                  {i === 1 && (
                    <>
                      <rect x="6" y="8" width="48" height="4" fill="rgba(10,10,10,0.2)" />
                      <circle cx="14" cy="22" r="6" fill="rgba(74,222,128,0.45)" />
                      <rect x="24" y="18" width="30" height="3" fill="rgba(10,10,10,0.15)" />
                      <rect x="24" y="24" width="24" height="3" fill="rgba(10,10,10,0.12)" />
                    </>
                  )}
                  {i === 2 && (
                    <>
                      <rect x="4" y="6" width="16" height="28" fill="rgba(10,10,10,0.18)" />
                      <rect x="22" y="6" width="16" height="28" fill="rgba(10,10,10,0.12)" />
                      <rect x="40" y="6" width="16" height="28" fill="rgba(10,10,10,0.18)" />
                    </>
                  )}
                  {i === 3 && (
                    <>
                      <rect x="6" y="6" width="48" height="20" fill="rgba(10,10,10,0.12)" />
                      <circle cx="14" cy="32" r="3" fill="rgba(10,10,10,0.25)" />
                      <circle cx="22" cy="32" r="3" fill="rgba(10,10,10,0.25)" />
                      <circle cx="30" cy="32" r="3" fill="rgba(10,10,10,0.25)" />
                    </>
                  )}
                  {i === 4 && (
                    <>
                      <rect x="4" y="4" width="52" height="32" fill="rgba(10,10,10,0.10)" />
                      <polygon points="22,12 22,28 36,20" fill="rgba(74,222,128,0.7)" />
                    </>
                  )}
                  {i === 5 && (
                    <>
                      <rect x="4" y="4" width="52" height="32" fill="rgba(10,10,10,0.08)" />
                      <rect x="10" y="12" width="40" height="3" fill="rgba(10,10,10,0.25)" />
                      <rect x="10" y="18" width="30" height="3" fill="rgba(10,10,10,0.18)" />
                      <rect x="10" y="26" width="14" height="6" fill="rgba(74,222,128,0.55)" />
                    </>
                  )}
                </svg>
              </div>

              {/* Composite score — big number */}
              <div className="flex items-baseline gap-1.5 mb-2">
                <span
                  className="text-[22px] font-medium tabular-nums tracking-tight transition-colors duration-300"
                  style={{ color: isWinner ? "var(--2pt-green)" : "var(--2pt-black)" }}
                >
                  {(v.total * 10).toFixed(1)}
                </span>
                <span className="text-[10px] font-mono text-[var(--2pt-black)]/35 tabular-nums">
                  / 10
                </span>
              </div>

              {/* Three score bars */}
              <div className="flex flex-col gap-1 mt-auto">
                {dims.map((d) => (
                  <div key={d.label} className="flex items-center gap-2">
                    <span className="text-[8px] font-mono tracking-wider uppercase text-[var(--2pt-black)]/40 w-9 shrink-0">
                      {d.label}
                    </span>
                    <div className="flex-1 h-1 bg-[var(--2pt-black)]/8 relative overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 transition-[width] duration-500 ease-out"
                        style={{
                          width: `${d.value * 100}%`,
                          backgroundColor: isWinner
                            ? "var(--2pt-green)"
                            : "rgba(10,10,10,0.55)",
                        }}
                      />
                    </div>
                    <span className="text-[8px] font-mono tabular-nums text-[var(--2pt-black)]/55 w-6 text-right">
                      {(d.value * 10).toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-[var(--2pt-black)]/10 flex items-center justify-between">
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/40">
          Scored today
          <span className="text-[var(--2pt-black)]/75 ml-2 tabular-nums">
            {variantsScoredToday.toLocaleString()}
          </span>
        </span>
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/40">
          Promoted
          <span className="text-[var(--2pt-green)] ml-2 tabular-nums">
            {promotedToday}
          </span>
        </span>
      </div>
    </div>
  )
}

/* ====================== Motion graphic 5 — Consistency and compliance ====================== */

/**
 * ComplianceMotion — a stack of compliance bots running live.
 *
 * Six bots scan every piece of creative output in parallel: sentiment, intent,
 * brand voice, claims/regulatory, PII redaction, image safety. Each bot is its
 * own row with a pulsing scan bar that sweeps across, an item it is currently
 * inspecting, and a verdict (pass / flag / pass). The cadence is staggered so
 * the panel always feels alive — at any moment, two or three bots are mid-scan
 * and one has just returned a verdict.
 */

const BOTS = [
  { id: "sentiment", name: "Sentiment", queue: ["DM · NYC promo", "Email · Q3 launch", "Caption · IG hero", "Display · CA market"] },
  { id: "intent",    name: "Intent",    queue: ["CTA · checkout flow", "Landing · pricing", "Search ad · brand term", "Email · winback"] },
  { id: "brand",     name: "Brand voice", queue: ["Long copy · about page", "Hero headline", "Footer microcopy", "Push notif"] },
  { id: "claims",    name: "Claims",    queue: ["Product spec · v2", "Comparison table", "Pricing footnote", "Health disclaimer"] },
  { id: "pii",       name: "PII redact", queue: ["Testimonial draft", "Support reply", "Case study quote", "Beta signup"] },
  { id: "image",     name: "Image safety", queue: ["Hero asset · banner", "Carousel · slide 3", "Thumbnail · video", "Stock · lifestyle"] },
]

function ComplianceMotion({ p }: { p: number }) {
  void p
  const now = useNow()

  // Total items scanned today — a steady counter that climbs while the panel is open
  const scannedToday = 12_847 + Math.floor(now / 900)
  const flaggedToday = 142 + Math.floor(now / 6800)

  return (
    <div className="absolute inset-0 bg-[var(--2pt-white)] border border-[var(--2pt-black)]/10 p-6 md:p-8 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--2pt-black)]/10 mb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-pulse" />
          <span className="text-[10px] tracking-[0.25em] font-mono uppercase text-[var(--2pt-black)]/60">
            Compliance bots · running
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--2pt-black)]/40 tabular-nums">
          6 / 6 online
        </span>
      </div>

      {/* Bot rows */}
      <div className="flex-1 flex flex-col gap-1.5">
        {BOTS.map((bot, i) => {
          // Each bot runs a 3.6s cycle, phased so they never sync up
          const cycle = ((now / 1000 + i * 0.55) % 3.6)
          const scanning = cycle < 2.4
          const scanPos = scanning ? cycle / 2.4 : 1 // 0 → 1 across the scan bar
          const verdictPhase = cycle >= 2.4 && cycle < 3.4
          // Pick a deterministic flag every Nth item so it doesn't feel rigged
          const itemIdx = Math.floor((now / 3600 + i * 1.3)) % bot.queue.length
          const item = bot.queue[itemIdx]
          const flagged = (Math.floor((now / 3600 + i * 1.3)) + i) % 11 === 0

          return (
            <div
              key={bot.id}
              className="relative grid grid-cols-12 items-center gap-3 px-3 py-2 border border-[var(--2pt-black)]/8 bg-[var(--2pt-offwhite)]/40 overflow-hidden"
            >
              {/* Scan sweep — green hairline traveling left to right while scanning */}
              {scanning && (
                <div
                  className="absolute top-0 bottom-0 w-px bg-[var(--2pt-green)] opacity-60"
                  style={{ left: `${scanPos * 100}%` }}
                />
              )}
              {/* Faint completed-fill behind the scan bar */}
              {scanning && (
                <div
                  className="absolute top-0 bottom-0 left-0 bg-[var(--2pt-green)]/[0.06]"
                  style={{ width: `${scanPos * 100}%` }}
                />
              )}

              {/* Bot name + status dot */}
              <div className="col-span-5 sm:col-span-3 flex items-center gap-2 relative z-10 min-w-0">
                <span
                  className="w-1.5 h-1.5 rounded-full transition-colors duration-300 shrink-0"
                  style={{
                    backgroundColor: scanning
                      ? "var(--2pt-green)"
                      : flagged
                        ? "rgb(225,90,90)"
                        : "rgba(10,10,10,0.35)",
                  }}
                />
                <span className="text-[12px] font-medium text-[var(--2pt-black)]/80 truncate">
                  {bot.name}
                </span>
              </div>

              {/* Currently scanning item — hidden on smallest screens (status alone tells the story) */}
              <div className="hidden sm:block sm:col-span-6 relative z-10 min-w-0">
                <span className="text-[11px] font-mono text-[var(--2pt-black)]/55 tracking-wide truncate block">
                  {scanning ? `scanning · ${item}` : flagged ? `flagged · ${item}` : `passed · ${item}`}
                </span>
              </div>

              {/* Verdict / progress text */}
              <div className="col-span-7 sm:col-span-3 flex items-center justify-end gap-1.5 relative z-10">
                <span
                  className="text-[10px] font-mono tracking-[0.2em] uppercase transition-colors duration-300"
                  style={{
                    color: scanning
                      ? "rgba(10,10,10,0.45)"
                      : flagged
                        ? "rgb(200,70,70)"
                        : "var(--2pt-green)",
                  }}
                >
                  {scanning ? `${Math.round(scanPos * 100)}%` : flagged ? "Flag" : "Pass"}
                </span>
                {verdictPhase && (
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{
                      backgroundColor: flagged ? "rgb(200,70,70)" : "var(--2pt-green)",
                      animation: "fadeIn 300ms ease-out",
                    }}
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer summary */}
      <div className="mt-3 pt-3 border-t border-[var(--2pt-black)]/10 flex items-center justify-between">
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/40">
          Scanned today
          <span className="text-[var(--2pt-black)]/75 ml-2 tabular-nums">
            {scannedToday.toLocaleString()}
          </span>
        </span>
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/40">
          Flagged
          <span className="text-[var(--2pt-green)] ml-2 tabular-nums">
            {flaggedToday}
          </span>
        </span>
      </div>
    </div>
  )
}
