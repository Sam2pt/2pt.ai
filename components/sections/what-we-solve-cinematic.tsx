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
import { Sparkline, seededSeries } from "@/components/ui/sparkline"
import { CornerCrops } from "@/components/ui/corner-crops"

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
          {/* LEFT — text. Keyed by panelIndex so the whole text column
              remounts on panel change, re-firing the staggered word-by-word
              reveal animations. */}
          <div key={`text-${panelIndex}`} className="lg:col-span-5">
            <div
              className="text-[10px] tracking-[0.3em] font-mono uppercase text-[var(--2pt-green)] mb-6"
              style={{
                animation:
                  "fadeInUp 600ms cubic-bezier(0.16,1,0.3,1) 0ms both",
              }}
            >
              Problem {current.label}
            </div>
            <h2 className="text-[40px] sm:text-[52px] md:text-[60px] lg:text-[68px] font-medium tracking-[-0.025em] leading-[0.98] text-[var(--2pt-black)] mb-8">
              {current.title.split(" ").flatMap((w, i, arr) => [
                <span
                  key={`w-${i}`}
                  className="inline-block"
                  style={{
                    animation: `fadeInUp 800ms cubic-bezier(0.16,1,0.3,1) ${
                      120 + i * 110
                    }ms both`,
                  }}
                >
                  {w}
                </span>,
                i < arr.length - 1 ? " " : null,
              ])}
            </h2>
            <p
              className="text-lg md:text-xl text-[var(--2pt-black)] leading-relaxed mb-5"
              style={{
                animation:
                  "fadeInUp 800ms cubic-bezier(0.16,1,0.3,1) 380ms both",
              }}
            >
              {current.line}
            </p>
            <p
              className="text-base md:text-[17px] text-[var(--2pt-black)]/60 leading-relaxed max-w-md mb-8"
              style={{
                animation:
                  "fadeInUp 800ms cubic-bezier(0.16,1,0.3,1) 480ms both",
              }}
            >
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
  { name: "Amazon Ads",      base: 12_400, trend:  +4.2, seed: 7 },
  { name: "Walmart Connect", base:  8_200, trend:  +1.9, seed: 23 },
  { name: "Instacart Ads",   base:  6_800, trend:  -0.6, seed: 41 },
  { name: "Meta",            base: 14_600, trend:  +6.7, seed: 59 },
  { name: "Google",          base: 11_900, trend:  +2.3, seed: 71 },
  { name: "TikTok",          base:  7_300, trend: -2.4, seed: 89 },
]

function EfficiencyMotion({ p }: { p: number }) {
  const now = useNow()
  void p

  // ms-precision timestamp (HH:MM:SS.mmm) — reads as a real telemetry feed
  const t = new Date()
  const stamp = `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}:${String(t.getSeconds()).padStart(2, "0")}.${String(t.getMilliseconds()).padStart(3, "0")}`

  // Scan beam — soft green horizontal sweep travelling top→bottom every ~5s
  const scanCycle = (now / 5000) % 1

  return (
    <div
      className="absolute inset-0 border border-[var(--2pt-black)]/8 rounded-[10px] p-6 md:p-7 flex flex-col gap-2 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(248,249,250,1) 100%)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.8) inset, 0 14px 36px -18px rgba(10,10,10,0.20), 0 2px 6px -2px rgba(10,10,10,0.06)",
      }}
    >
      <CornerCrops />
      {/* Top gradient rule — signals "powered/live" */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(74,222,128,0.55), transparent)",
        }}
      />

      {/* Scan beam — subtle horizontal green band sweeping down the panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 h-12 z-0"
        style={{
          top: `${scanCycle * 100}%`,
          transform: "translateY(-50%)",
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(74,222,128,0.06) 50%, transparent 100%)",
          opacity: 0.7,
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between pb-3 border-b border-[var(--2pt-black)]/10 mb-1">
        <div className="flex items-center gap-2.5">
          <span className="relative inline-flex">
            <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full" />
            <span className="absolute inset-0 w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-ping opacity-60" />
          </span>
          <span className="text-[10px] tracking-[0.25em] font-mono uppercase text-[var(--2pt-black)]/65">
            Efficiency monitor
          </span>
          <span className="hidden md:inline text-[9px] font-mono tracking-[0.18em] uppercase text-[var(--2pt-green)] border border-[var(--2pt-green)]/30 px-1.5 py-px rounded-[3px]">
            Live
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--2pt-black)]/45 tabular-nums">
          {stamp}
        </span>
      </div>

      {/* Column header row */}
      <div className="relative z-10 grid grid-cols-[1.4fr_0.9fr_0.6fr_0.6fr_0.9fr] items-center gap-x-3 pb-1.5 text-[9px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/35">
        <span>Channel</span>
        <span className="text-right">Spend</span>
        <span className="text-right">Δ 24h</span>
        <span className="text-center">Trend</span>
        <span className="text-right">Status</span>
      </div>

      {CHANNELS.map((c, i) => {
        const ticker = Math.sin(now / 700 + i * 1.7) * 0.05
        const liveSpend = c.base * (1 + ticker)
        const cycle = ((now / 1000 + i * 1.2) % 6)
        const anomaly = cycle > 5
        const resolved = cycle > 5.5
        const liveTrend = c.trend + Math.sin(now / 1800 + i) * 0.4
        const trendUp = liveTrend >= 0
        // Sparkline data — stable seeded series, slightly perturbed by the
        // continuous tick so it breathes per row
        const series = seededSeries(c.seed, 10, 0.5, 0.32).map(
          (v, k) => v + Math.sin(now / 1200 + i + k * 0.6) * 0.04
        )

        return (
          <div
            key={c.name}
            className="relative z-10 grid grid-cols-[1.4fr_0.9fr_0.6fr_0.6fr_0.9fr] items-center gap-x-3 text-[13px] py-[3px]"
          >
            {/* Channel */}
            <span className="text-[var(--2pt-black)]/80 font-medium truncate">
              {c.name}
            </span>
            {/* Spend */}
            <span className="font-mono tabular-nums text-[var(--2pt-black)] text-right">
              ${Math.round(liveSpend).toLocaleString()}
            </span>
            {/* Δ 24h */}
            <span
              className="font-mono tabular-nums text-[11px] text-right transition-colors duration-300"
              style={{
                color: trendUp ? "var(--2pt-green)" : "rgb(200,70,70)",
              }}
            >
              {trendUp ? "▲" : "▼"} {Math.abs(liveTrend).toFixed(1)}%
            </span>
            {/* Sparkline */}
            <span className="flex items-center justify-center text-[var(--2pt-black)]/55">
              <Sparkline
                values={series}
                width={48}
                height={12}
                strokeWidth={1}
                color={trendUp ? "var(--2pt-green)" : "rgb(200,70,70)"}
                fillOpacity={0.10}
              />
            </span>
            {/* Status */}
            <span className="flex items-center justify-end gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
                style={{
                  backgroundColor:
                    anomaly && !resolved
                      ? "rgb(225,90,90)"
                      : resolved
                        ? "var(--2pt-green)"
                        : "rgba(10,10,10,0.22)",
                }}
              />
              <span
                className="text-[9px] font-mono tracking-[0.18em] uppercase transition-colors duration-300 tabular-nums"
                style={{
                  color:
                    anomaly && !resolved
                      ? "rgb(200,70,70)"
                      : resolved
                        ? "var(--2pt-green)"
                        : "rgba(10,10,10,0.40)",
                }}
              >
                {anomaly && !resolved
                  ? "Anomaly"
                  : resolved
                    ? "Resolved"
                    : "Nominal"}
              </span>
            </span>
          </div>
        )
      })}

      {/* Footer — 3 micro stats, mono numerics */}
      <div className="relative z-10 mt-auto pt-3 border-t border-[var(--2pt-black)]/10 grid grid-cols-3 gap-3">
        <div className="flex flex-col">
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/40">
            Anomalies today
          </span>
          <span className="text-[15px] font-medium text-[var(--2pt-black)] tabular-nums">
            {Math.floor((now / 1000) % 17) + 12}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/40">
            Waste reallocated
          </span>
          <span className="text-[15px] font-medium text-[var(--2pt-green)] tabular-nums">
            ${(14_200 + Math.floor((now / 1500) % 220)).toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/40">
            Latency p95
          </span>
          <span className="text-[15px] font-medium text-[var(--2pt-black)] tabular-nums">
            {(42 + Math.sin(now / 2200) * 6).toFixed(0)}<span className="text-[10px] text-[var(--2pt-black)]/40 ml-0.5">ms</span>
          </span>
        </div>
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
  share: number
  growth: number
  delta7d: number
  seed: number
}

const SEGMENTS: Segment[] = [
  { name: "New parents",      descriptor: "25-34 · urban",        share: 0.92, growth: 47,  delta7d: +6.2, seed: 13 },
  { name: "High-LTV repeats", descriptor: "subscribers · annual", share: 0.78, growth: 31,  delta7d: +3.8, seed: 29 },
  { name: "Q4 acquisition",   descriptor: "promo · winter",       share: 0.61, growth: 19,  delta7d: +1.4, seed: 47 },
  { name: "Pet owners",       descriptor: "premium tier",         share: 0.44, growth: 12,  delta7d: +0.5, seed: 61 },
  { name: "Lapsed buyers",    descriptor: "winback · 90d",        share: 0.30, growth: 4,   delta7d: -0.3, seed: 83 },
  { name: "Premium tier",     descriptor: "VIP · concierge",      share: 0.22, growth: -3,  delta7d: -1.7, seed: 97 },
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
    <div
      className="absolute inset-0 border border-[var(--2pt-black)]/8 rounded-[10px] p-6 md:p-8 flex flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(248,249,250,1) 100%)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.8) inset, 0 14px 36px -18px rgba(10,10,10,0.20), 0 2px 6px -2px rgba(10,10,10,0.06)",
      }}
    >
      <CornerCrops />
      {/* Top gradient rule */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(74,222,128,0.55), transparent)",
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--2pt-black)]/10 mb-3">
        <div className="flex items-center gap-2.5">
          <span className="relative inline-flex">
            <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full" />
            <span className="absolute inset-0 w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-ping opacity-60" />
          </span>
          <span className="text-[10px] tracking-[0.25em] font-mono uppercase text-[var(--2pt-black)]/65">
            Growth by segment
          </span>
          <span className="hidden md:inline text-[9px] font-mono tracking-[0.18em] uppercase text-[var(--2pt-black)]/45 border border-[var(--2pt-black)]/15 px-1.5 py-px rounded-[3px]">
            Last 30d
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--2pt-black)]/45 tabular-nums">
          {SEGMENTS.length} segments tracked
        </span>
      </div>

      {/* Column headers */}
      <div className="hidden sm:grid grid-cols-12 gap-3 pb-2 text-[9px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/35">
        <span className="col-span-4">Segment</span>
        <span className="col-span-3 text-right">Share</span>
        <span className="col-span-2 text-center">30d trend</span>
        <span className="col-span-2 text-right">Growth</span>
        <span className="col-span-1 text-right">7d Δ</span>
      </div>

      {/* Segment rows */}
      <div className="flex-1 flex flex-col justify-center gap-2.5">
        {live.map((s, i) => {
          const reveal = Math.max(0, Math.min(1, (autoP - i * 0.08) * 2.2))
          const isTop = i === 0
          const isCooling = s.growth < 0
          const trendUp = s.delta7d >= 0
          const accent = isCooling
            ? "rgb(200,70,70)"
            : isTop
              ? "var(--2pt-green)"
              : "rgba(10,10,10,0.55)"
          // Sparkline — seeded series tilted up/down by overall trend
          const trendBias = s.growth / 100
          const series = seededSeries(s.seed, 12, 0.5, 0.22).map(
            (v, k) =>
              v +
              trendBias * (k / 11) * 0.6 +
              Math.sin(now / 1600 + i + k * 0.5) * 0.03
          )

          return (
            <div
              key={s.name}
              className="grid grid-cols-7 sm:grid-cols-12 items-center gap-2 sm:gap-3"
            >
              {/* Name + descriptor */}
              <div className="col-span-3 sm:col-span-4 flex flex-col min-w-0">
                <span className="text-[12px] sm:text-[13px] font-medium text-[var(--2pt-black)]/85 truncate">
                  {s.name}
                </span>
                <span className="text-[9px] font-mono tracking-[0.18em] uppercase text-[var(--2pt-black)]/40 truncate">
                  {s.descriptor}
                </span>
              </div>

              {/* Share bar */}
              <div className="col-span-2 sm:col-span-3 h-2.5 relative bg-[var(--2pt-offwhite)]/60 border border-[var(--2pt-black)]/8 rounded-[2px] overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 transition-[width] duration-300 ease-out"
                  style={{
                    width: `${s.share * reveal * 100}%`,
                    backgroundColor: accent,
                  }}
                />
                {isTop && (
                  <div
                    className="absolute top-0 bottom-0 w-px bg-[var(--2pt-green)] animate-pulse"
                    style={{ left: `${s.share * reveal * 100}%` }}
                  />
                )}
              </div>

              {/* 30d sparkline — sm+ only */}
              <div className="hidden sm:flex col-span-2 items-center justify-center">
                <Sparkline
                  values={series}
                  width={64}
                  height={14}
                  strokeWidth={1.1}
                  color={accent}
                  fillOpacity={0.10}
                />
              </div>

              {/* Growth % */}
              <div className="col-span-1 sm:col-span-2 text-right">
                <span
                  className="text-[13px] sm:text-[14px] font-medium tabular-nums tracking-tight transition-colors duration-300"
                  style={{ color: accent }}
                >
                  {s.growth >= 0 ? "+" : ""}
                  {s.growthLive.toFixed(1)}%
                </span>
              </div>

              {/* 7d delta */}
              <div className="col-span-1 flex items-center justify-end gap-0.5">
                <span
                  className="text-[10px] font-mono tabular-nums"
                  style={{
                    color: trendUp
                      ? "var(--2pt-green)"
                      : "rgb(200,70,70)",
                  }}
                >
                  {trendUp ? "▲" : "▼"} {Math.abs(s.delta7d).toFixed(1)}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer — three micro stats */}
      <div className="mt-3 pt-3 border-t border-[var(--2pt-black)]/10 grid grid-cols-3 gap-3">
        <div className="flex flex-col">
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/40">
            Top segment share
          </span>
          <span className="text-[15px] font-medium text-[var(--2pt-green)] tabular-nums">
            {topShare}<span className="text-[10px] text-[var(--2pt-black)]/40 ml-0.5">%</span>
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/40">
            Cohorts scored / hr
          </span>
          <span className="text-[15px] font-medium text-[var(--2pt-black)] tabular-nums">
            {(412 + Math.floor((now / 1800) % 24)).toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/40">
            Reallocating
          </span>
          <span className="text-[15px] font-medium text-[var(--2pt-green)] tabular-nums flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-pulse" />
            Live
          </span>
        </div>
      </div>
    </div>
  )
}

/* ====================== Motion graphic 3 — Driving growth ====================== */

function DrivingMotion({ p }: { p: number }) {
  const now = useNow()
  void p

  // 24 bars — spectrum-analyser feel
  const N = 24
  const bars = Array.from({ length: N }, (_, i) => {
    const phase = (now / 380 + i * 0.32) % (Math.PI * 2)
    const swell = 0.25 + 0.65 * Math.abs(Math.sin(phase))
    const noise = Math.sin((now / 90 + i * 4.2)) * 0.04
    return { i, h: Math.max(0.05, Math.min(1, swell + noise)) }
  })

  // Winner — highest bar, recomputed each tick
  const winnerIdx = bars.reduce((a, b) => (b.h > a.h ? b : a)).i
  const bidAmount = (2.40 + Math.sin(now / 800) * 0.6).toFixed(4)
  const wins = Math.floor((now / 1000) % 24) + 8
  const latency = (18 + Math.sin(now / 1100) * 4).toFixed(1)
  const winRate = (62 + Math.sin(now / 2400) * 5).toFixed(1)
  const bidsPerSec = (21 + Math.sin(now / 1700) * 3).toFixed(1)

  return (
    <div
      className="absolute inset-0 border border-[var(--2pt-black)]/8 rounded-[10px] p-6 md:p-8 flex flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(248,249,250,1) 100%)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.8) inset, 0 14px 36px -18px rgba(10,10,10,0.20), 0 2px 6px -2px rgba(10,10,10,0.06)",
      }}
    >
      <CornerCrops />
      {/* Top gradient rule */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(74,222,128,0.55), transparent)",
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[var(--2pt-black)]/10">
        <div className="flex items-center gap-2.5">
          <span className="relative inline-flex">
            <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full" />
            <span className="absolute inset-0 w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-ping opacity-60" />
          </span>
          <span className="text-[10px] tracking-[0.25em] font-mono uppercase text-[var(--2pt-black)]/65">
            Bid auction
          </span>
          <span className="text-[9px] font-mono tracking-[0.18em] uppercase text-[var(--2pt-black)]/45 border border-[var(--2pt-black)]/15 px-1.5 py-px rounded-[3px]">
            Amazon Ads
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--2pt-black)]/45 tabular-nums">
          {bidsPerSec} bids/s
        </span>
      </div>

      {/* Live bid display */}
      <div className="flex items-baseline justify-between py-6">
        <div>
          <div className="text-[10px] tracking-[0.25em] font-mono uppercase text-[var(--2pt-black)]/40 mb-1">
            Winning bid
          </div>
          <div className="text-4xl md:text-5xl font-medium text-[var(--2pt-black)] tabular-nums tracking-tight">
            ${bidAmount}
          </div>
          <div className="mt-1 text-[10px] font-mono tabular-nums text-[var(--2pt-black)]/45">
            <span className="text-[var(--2pt-green)]">▲</span> +{(0.04 + Math.sin(now / 2100) * 0.02).toFixed(3)} vs avg
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] tracking-[0.25em] font-mono uppercase text-[var(--2pt-black)]/40 mb-1">
            Wins this minute
          </div>
          <div className="text-3xl md:text-4xl font-medium text-[var(--2pt-green)] tabular-nums tracking-tight">
            {wins}
          </div>
          <div className="mt-1 text-[10px] font-mono tabular-nums text-[var(--2pt-black)]/45">
            Win rate <span className="text-[var(--2pt-black)]/80">{winRate}%</span>
          </div>
        </div>
      </div>

      {/* Spectrum bars */}
      <div className="flex-1 flex items-end gap-[3px] md:gap-1">
        {bars.map((b) => {
          const isWinner = b.i === winnerIdx
          return (
            <div
              key={b.i}
              className="flex-1 transition-[height,background-color] duration-150 ease-out rounded-[1px]"
              style={{
                height: `${b.h * 100}%`,
                backgroundColor: isWinner
                  ? "var(--2pt-green)"
                  : `rgba(10,10,10,${0.10 + b.h * 0.15})`,
              }}
            />
          )
        })}
      </div>

      {/* Footer — three micro stats */}
      <div className="mt-4 pt-3 border-t border-[var(--2pt-black)]/10 grid grid-cols-3 gap-3">
        <div className="flex flex-col">
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/40">
            Auction latency
          </span>
          <span className="text-[15px] font-medium text-[var(--2pt-black)] tabular-nums">
            {latency}<span className="text-[10px] text-[var(--2pt-black)]/40 ml-0.5">ms</span>
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/40">
            Bids today
          </span>
          <span className="text-[15px] font-medium text-[var(--2pt-black)] tabular-nums">
            {(1_847_200 + Math.floor((now / 200) % 800)).toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/40">
            System status
          </span>
          <span className="text-[15px] font-medium text-[var(--2pt-green)] tabular-nums flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-pulse" />
            Trading
          </span>
        </div>
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
    <div
      className="absolute inset-0 border border-[var(--2pt-black)]/8 rounded-[10px] p-6 md:p-8 flex flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(248,249,250,1) 100%)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.8) inset, 0 14px 36px -18px rgba(10,10,10,0.20), 0 2px 6px -2px rgba(10,10,10,0.06)",
      }}
    >
      <CornerCrops />
      {/* Top gradient rule */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(74,222,128,0.55), transparent)",
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--2pt-black)]/10 mb-3">
        <div className="flex items-center gap-2.5">
          <span className="relative inline-flex">
            <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full" />
            <span className="absolute inset-0 w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-ping opacity-60" />
          </span>
          <span className="text-[10px] tracking-[0.25em] font-mono uppercase text-[var(--2pt-black)]/65">
            Creative scoring
          </span>
          <span className="hidden md:inline text-[9px] font-mono tracking-[0.18em] uppercase text-[var(--2pt-green)] border border-[var(--2pt-green)]/30 px-1.5 py-px rounded-[3px]">
            Live
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--2pt-black)]/45 tabular-nums">
          {(48 + Math.floor((now / 1200) % 12))}/hr · threshold 7.5
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
                      {/* Score fill */}
                      <div
                        className="absolute inset-y-0 left-0 transition-[width] duration-500 ease-out"
                        style={{
                          width: `${d.value * 100}%`,
                          backgroundColor: isWinner
                            ? "var(--2pt-green)"
                            : "rgba(10,10,10,0.55)",
                        }}
                      />
                      {/* Promotion threshold tick (7.5/10 = 75%) */}
                      <div
                        aria-hidden
                        className="absolute top-[-2px] bottom-[-2px] w-px bg-[var(--2pt-green)]/60"
                        style={{ left: "75%" }}
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

      {/* Footer — three micro stats */}
      <div className="mt-3 pt-3 border-t border-[var(--2pt-black)]/10 grid grid-cols-3 gap-3">
        <div className="flex flex-col">
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/40">
            Scored today
          </span>
          <span className="text-[15px] font-medium text-[var(--2pt-black)] tabular-nums">
            {variantsScoredToday.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/40">
            Promoted
          </span>
          <span className="text-[15px] font-medium text-[var(--2pt-green)] tabular-nums">
            {promotedToday}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/40">
            Promotion rate
          </span>
          <span className="text-[15px] font-medium text-[var(--2pt-black)] tabular-nums">
            {((promotedToday / variantsScoredToday) * 100).toFixed(1)}<span className="text-[10px] text-[var(--2pt-black)]/40 ml-0.5">%</span>
          </span>
        </div>
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
    <div
      className="absolute inset-0 border border-[var(--2pt-black)]/8 rounded-[10px] p-6 md:p-8 flex flex-col overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(248,249,250,1) 100%)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.8) inset, 0 14px 36px -18px rgba(10,10,10,0.20), 0 2px 6px -2px rgba(10,10,10,0.06)",
      }}
    >
      <CornerCrops />
      {/* Top gradient rule */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(74,222,128,0.55), transparent)",
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--2pt-black)]/10 mb-3">
        <div className="flex items-center gap-2.5">
          <span className="relative inline-flex">
            <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full" />
            <span className="absolute inset-0 w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-ping opacity-60" />
          </span>
          <span className="text-[10px] tracking-[0.25em] font-mono uppercase text-[var(--2pt-black)]/65">
            Compliance bots
          </span>
          <span className="hidden md:inline text-[9px] font-mono tracking-[0.18em] uppercase text-[var(--2pt-green)] border border-[var(--2pt-green)]/30 px-1.5 py-px rounded-[3px]">
            6 / 6 online
          </span>
        </div>
        <span className="text-[10px] font-mono text-[var(--2pt-black)]/45 tabular-nums">
          Queue {Math.max(0, 47 - Math.floor((now / 800) % 20))} · {(8.4 + Math.sin(now / 1900) * 1.2).toFixed(1)} scans/s
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

      {/* Footer — three micro stats */}
      <div className="mt-3 pt-3 border-t border-[var(--2pt-black)]/10 grid grid-cols-3 gap-3">
        <div className="flex flex-col">
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/40">
            Scanned today
          </span>
          <span className="text-[15px] font-medium text-[var(--2pt-black)] tabular-nums">
            {scannedToday.toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/40">
            Flagged
          </span>
          <span className="text-[15px] font-medium text-[var(--2pt-green)] tabular-nums">
            {flaggedToday}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/40">
            Avg scan time
          </span>
          <span className="text-[15px] font-medium text-[var(--2pt-black)] tabular-nums">
            {(118 + Math.sin(now / 2400) * 12).toFixed(0)}<span className="text-[10px] text-[var(--2pt-black)]/40 ml-0.5">ms</span>
          </span>
        </div>
      </div>
    </div>
  )
}
