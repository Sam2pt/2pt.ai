"use client"

/**
 * CaseVignette — the signature motion piece for each case page.
 *
 * Each vignette renders inside the case hero's full-width slot and shows
 * the actual work happening, not a stylised gesture at it. The visual
 * vocabulary is shared (dark canvas, dot grid, scan beam, mono labels,
 * accent-coloured live indicators) so the six cases read as one system.
 */

import { useEffect, useRef, useState } from "react"
import type { CaseStudy } from "@/lib/cases"

/**
 * useInView — fire `inView=true` once the element is at least 10%
 * visible, fire false when it's fully out of frame again.
 *
 * Used by every vignette so its setInterval can pause when the user
 * scrolls past it on the /work long-scroll page. With four vignettes
 * stacked, this saves four continuous timers worth of CPU on every
 * off-screen case.
 */
function useInView<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting && entry.intersectionRatio >= threshold)
      },
      { threshold: [0, threshold, 0.5, 1] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return { ref, inView }
}

const ACCENT_HEX: Record<CaseStudy["accent"], string> = {
  green: "#4ade80",
  cyan: "#22d3ee",
  lime: "#bef264",
  emerald: "#34d399",
}

export function CaseVignette({ case: c }: { case: CaseStudy }) {
  const accent = ACCENT_HEX[c.accent]
  switch (c.slug) {
    case "yamaha-global-geo":
      return <YamahaConstellation accent={accent} />
    case "amazon-generative-creative":
      return <AmazonScoringWall accent={accent} />
    case "kyndryl-marketing-ops":
      return <KyndrylWorkflowHub accent={accent} />
    case "dreamies-content-conversion":
      return <DreamiesCohortScorer accent={accent} />
    case "harken-retail-media":
      return <HarkenBidTriptych accent={accent} />
    case "clifford-chance-video-production":
      return <CliffordPipeline accent={accent} />
    default:
      return <AmbientVignette accent={accent} />
  }
}

// ─────────────────────────────────────────────────────────────────────
// Shared frame — every vignette sits inside this shell so the chrome
// (border, dot grid, scan beam, top/bottom mono bars) is consistent.
// ─────────────────────────────────────────────────────────────────────

function VignetteFrame({
  accent,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  children,
  outerRef,
}: {
  accent: string
  topLeft: React.ReactNode
  topRight: React.ReactNode
  bottomLeft: React.ReactNode
  bottomRight: React.ReactNode
  children: React.ReactNode
  outerRef?: React.Ref<HTMLDivElement>
}) {
  return (
    <div
      ref={outerRef}
      className="relative w-full h-full border border-[var(--2pt-white)]/12 overflow-hidden bg-[var(--2pt-black)]"
    >
      {/* Ambient dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1.4px)",
          backgroundSize: "22px 22px",
          opacity: 0.55,
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 90% at 50% 50%, #000 30%, transparent 92%)",
          maskImage:
            "radial-gradient(ellipse 90% 90% at 50% 50%, #000 30%, transparent 92%)",
        }}
      />
      {/* Accent radial */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 85%, ${accent}1F 0%, transparent 65%)`,
        }}
      />
      {/* Slow scan beam */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -inset-x-10 h-[35%] animate-scan-line"
          style={{
            top: "-15%",
            background: `linear-gradient(180deg, transparent 0%, ${accent}1A 50%, transparent 100%)`,
            animationDuration: "9s",
          }}
        />
      </div>

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 md:px-5 pt-3.5 pb-2.5 border-b border-[var(--2pt-white)]/8 font-mono text-[9px] tracking-[0.24em] uppercase">
        <span className="text-[var(--2pt-white)]/55">{topLeft}</span>
        <span style={{ color: accent }} className="tabular-nums">
          {topRight}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 md:px-5 py-4 h-[calc(100%-72px)]">
        {children}
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-between px-4 md:px-5 py-2.5 border-t border-[var(--2pt-white)]/8 font-mono text-[9px] tracking-[0.22em] uppercase">
        <span className="text-[var(--2pt-white)]/45">{bottomLeft}</span>
        <span style={{ color: accent }} className="tabular-nums">
          {bottomRight}
        </span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────
// 1 · Yamaha — three-locale citation constellation
// ─────────────────────────────────────────────────────────────────────

const YAMAHA_LOCALES = [
  {
    label: "US",
    lang: "en-US",
    queries: [
      "best online music school",
      "kids piano lessons online",
      "music school free trial",
      "learn music from home",
      "best beginner piano course",
    ],
    cited: [0, 2, 4],
  },
  {
    label: "EU",
    lang: "de-DE",
    queries: [
      "musikschule online",
      "klavier lernen online",
      "online music lessons kinder",
      "klavierunterricht zuhause",
      "beste musikschule app",
    ],
    cited: [0, 3],
  },
  {
    label: "JP",
    lang: "ja-JP",
    queries: [
      "オンライン 音楽教室",
      "ピアノ レッスン 子供",
      "オンライン 楽器 体験",
      "音楽 学校 自宅",
      "ピアノ アプリ 初心者",
    ],
    cited: [1, 2, 4],
  },
]

function YamahaConstellation({ accent }: { accent: string }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => setTick((t) => t + 1), 1200)
    return () => clearInterval(id)
  }, [inView])
  const queryCount = YAMAHA_LOCALES[0].queries.length
  const citedTotal = YAMAHA_LOCALES.reduce((n, l) => n + l.cited.length, 0)
  const queryTotal = YAMAHA_LOCALES.reduce((n, l) => n + l.queries.length, 0)

  return (
    <VignetteFrame
      outerRef={ref}
      accent={accent}
      topLeft="live audit · 3 markets"
      topRight={`${citedTotal}/${queryTotal} cited`}
      bottomLeft="continuous · re-runs on index update"
      bottomRight={`${(tick * 7) % 100}ms p95`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3 h-full overflow-y-auto sm:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {YAMAHA_LOCALES.map((locale) => {
          const active = tick % queryCount
          return (
            <div key={locale.label} className="space-y-2">
              <div className="flex items-baseline justify-between pb-2 border-b border-[var(--2pt-white)]/8">
                <span
                  className="text-[15px] font-medium tracking-tight"
                  style={{ color: accent }}
                >
                  {locale.label}
                </span>
                <span className="text-[8px] font-mono tracking-[0.22em] uppercase text-[var(--2pt-white)]/35">
                  {locale.lang}
                </span>
              </div>
              <ul className="space-y-1.5">
                {locale.queries.map((q, qi) => {
                  const isCited = locale.cited.includes(qi)
                  const isActive = qi === active
                  return (
                    <li
                      key={q}
                      className="flex items-start gap-2 text-[10px] leading-snug font-mono transition-opacity duration-500"
                      style={{
                        opacity: isActive ? 1 : 0.55,
                        color: isActive
                          ? "var(--2pt-white)"
                          : "rgba(255,255,255,0.6)",
                      }}
                    >
                      <span
                        className="mt-1 shrink-0 rounded-full transition-all duration-500"
                        style={{
                          width: isActive ? 6 : 4,
                          height: isActive ? 6 : 4,
                          background: isCited
                            ? accent
                            : "rgba(255,255,255,0.2)",
                          boxShadow:
                            isActive && isCited
                              ? `0 0 8px 1px ${accent}99`
                              : undefined,
                        }}
                      />
                      <span className="truncate">{q}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </VignetteFrame>
  )
}

// ─────────────────────────────────────────────────────────────────────
// 2 · Amazon — creative scoring wall (4×3 variant tiles)
// ─────────────────────────────────────────────────────────────────────

type VariantState = {
  id: string
  score: number
  status: "queued" | "scoring" | "promoted" | "killed"
  // 3 small "creative bars" so each tile looks visually distinct
  bars: [number, number, number]
}

function makeVariants(): VariantState[] {
  const tiles: VariantState[] = []
  // Deterministic seed so SSR + first paint match before the timer kicks in.
  for (let i = 0; i < 12; i++) {
    const score = 5 + ((i * 17) % 50) / 10 // 5.0 → 9.9
    const seed = (i + 1) * 31
    tiles.push({
      id: `v-${i.toString().padStart(2, "0")}`,
      score: Math.round(score * 10) / 10,
      status: i < 4 ? "promoted" : i < 8 ? "scoring" : "killed",
      bars: [
        30 + (seed % 50),
        20 + ((seed * 3) % 60),
        40 + ((seed * 7) % 40),
      ],
    })
  }
  return tiles
}

function AmazonScoringWall({ accent }: { accent: string }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [tiles, setTiles] = useState<VariantState[]>(makeVariants)
  const [tick, setTick] = useState(0)
  const [promotedToday, setPromotedToday] = useState(247)

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => {
      setTick((t) => t + 1)
      setTiles((prev) => {
        // Rotate one tile through scoring → verdict on each tick.
        const idx = tick % prev.length
        const newScore = Math.round((5 + Math.random() * 4.5) * 10) / 10
        const next = [...prev]
        const status: VariantState["status"] =
          newScore >= 7.5 ? "promoted" : newScore <= 5.5 ? "killed" : "scoring"
        next[idx] = {
          ...next[idx],
          score: newScore,
          status,
          bars: [
            20 + Math.floor(Math.random() * 60),
            20 + Math.floor(Math.random() * 60),
            20 + Math.floor(Math.random() * 60),
          ],
        }
        if (status === "promoted") setPromotedToday((p) => p + 1)
        return next
      })
    }, 800)
    return () => clearInterval(id)
  }, [tick, inView])

  const activeIdx = tick % tiles.length

  return (
    <VignetteFrame
      outerRef={ref}
      accent={accent}
      topLeft="creative scoring · brand fit"
      topRight={`${promotedToday} promoted today`}
      bottomLeft="threshold 7.5 · auto-ship to amazon ads"
      bottomRight="92% pass"
    >
      <div className="grid grid-cols-4 grid-rows-3 gap-2 h-full">
        {tiles.map((t, i) => {
          const isActive = i === activeIdx
          const isPromoted = t.status === "promoted"
          const isKilled = t.status === "killed"
          const isScoring = t.status === "scoring"
          return (
            <div
              key={t.id}
              className="relative border rounded-[2px] p-2 flex flex-col justify-between transition-colors duration-500 overflow-hidden"
              style={{
                borderColor: isActive
                  ? accent
                  : isPromoted
                    ? `${accent}55`
                    : "rgba(255,255,255,0.10)",
                background: isPromoted
                  ? `${accent}14`
                  : isKilled
                    ? "rgba(255,255,255,0.02)"
                    : "rgba(255,255,255,0.025)",
                opacity: isKilled ? 0.45 : 1,
                boxShadow: isActive ? `0 0 18px -4px ${accent}AA` : undefined,
              }}
            >
              {/* Top — id + status icon */}
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-mono tracking-[0.18em] uppercase text-[var(--2pt-white)]/45">
                  {t.id}
                </span>
                <span
                  className="text-[10px] leading-none"
                  style={{
                    color: isPromoted
                      ? accent
                      : isKilled
                        ? "rgba(255,255,255,0.3)"
                        : "rgba(255,255,255,0.5)",
                  }}
                >
                  {isPromoted ? "✓" : isKilled ? "×" : "·"}
                </span>
              </div>
              {/* Middle — three "creative bars" simulating a layout */}
              <div className="flex-1 flex flex-col justify-center gap-1 my-1">
                {t.bars.map((w, bi) => (
                  <div
                    key={bi}
                    className="h-[3px] rounded-full transition-all duration-700"
                    style={{
                      width: `${w}%`,
                      background: isPromoted
                        ? accent
                        : isKilled
                          ? "rgba(255,255,255,0.18)"
                          : "rgba(255,255,255,0.35)",
                      opacity: isActive ? 1 : 0.65,
                    }}
                  />
                ))}
              </div>
              {/* Bottom — score */}
              <div className="flex items-baseline justify-between">
                <span
                  className="text-[11px] font-mono tabular-nums"
                  style={{
                    color: isPromoted
                      ? accent
                      : isKilled
                        ? "rgba(255,255,255,0.35)"
                        : "var(--2pt-white)",
                  }}
                >
                  {t.score.toFixed(1)}
                </span>
                <span className="text-[7px] font-mono tracking-[0.18em] uppercase text-[var(--2pt-white)]/35">
                  {isScoring ? "score" : t.status}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </VignetteFrame>
  )
}

// ─────────────────────────────────────────────────────────────────────
// 3 · Kyndryl — workflow hub-and-spoke
// ─────────────────────────────────────────────────────────────────────

const KYNDRYL_SPOKES = [
  { label: "Slack", angle: -90, sub: "briefs" },
  { label: "Monday", angle: 30, sub: "tasks" },
  { label: "CRM", angle: 150, sub: "accounts" },
]

function KyndrylWorkflowHub({ accent }: { accent: string }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [tick, setTick] = useState(0)
  const [decisions, setDecisions] = useState(1840)
  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => {
      setTick((t) => t + 1)
      setDecisions((d) => d + 1 + Math.floor(Math.random() * 2))
    }, 950)
    return () => clearInterval(id)
  }, [inView])
  const activeSpoke = tick % KYNDRYL_SPOKES.length
  const direction = Math.floor(tick / KYNDRYL_SPOKES.length) % 2 // 0 in, 1 out

  // Hub geometry — center of viewport
  const cx = 50 // percentage
  const cy = 50
  const radius = 36 // percentage

  return (
    <VignetteFrame
      outerRef={ref}
      accent={accent}
      topLeft="workflow routing · strategy agent"
      topRight={`${decisions.toLocaleString()} decisions today`}
      bottomLeft="cycle 3.2s · cross-stack"
      bottomRight="6 scenarios live"
    >
      <div className="relative w-full h-full">
        {/* SVG layer for the connecting lines */}
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          {KYNDRYL_SPOKES.map((s, i) => {
            const rad = (s.angle * Math.PI) / 180
            const x = cx + Math.cos(rad) * radius
            const y = cy + Math.sin(rad) * radius
            const isActive = i === activeSpoke
            return (
              <line
                key={s.label}
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke={isActive ? accent : "rgba(255,255,255,0.18)"}
                strokeWidth={isActive ? 0.6 : 0.3}
                strokeLinecap="round"
                style={{ transition: "stroke 600ms ease, stroke-width 600ms ease" }}
              />
            )
          })}
          {/* Travelling pulse on the active spoke */}
          {(() => {
            const s = KYNDRYL_SPOKES[activeSpoke]
            const rad = (s.angle * Math.PI) / 180
            const ex = cx + Math.cos(rad) * radius
            const ey = cy + Math.sin(rad) * radius
            const startX = direction === 0 ? ex : cx
            const startY = direction === 0 ? ey : cy
            const endX = direction === 0 ? cx : ex
            const endY = direction === 0 ? cy : ey
            return (
              <circle r={1.2} fill={accent}>
                <animate
                  attributeName="cx"
                  from={startX}
                  to={endX}
                  dur="0.9s"
                  repeatCount="1"
                />
                <animate
                  attributeName="cy"
                  from={startY}
                  to={endY}
                  dur="0.9s"
                  repeatCount="1"
                />
              </circle>
            )
          })()}
        </svg>

        {/* Spoke labels */}
        {KYNDRYL_SPOKES.map((s, i) => {
          const rad = (s.angle * Math.PI) / 180
          const x = cx + Math.cos(rad) * radius
          const y = cy + Math.sin(rad) * radius
          const isActive = i === activeSpoke
          return (
            <div
              key={s.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div
                className="flex flex-col items-center transition-all duration-500"
                style={{ opacity: isActive ? 1 : 0.55 }}
              >
                <span
                  className="rounded-full mb-1.5 transition-all duration-500"
                  style={{
                    width: isActive ? 12 : 8,
                    height: isActive ? 12 : 8,
                    background: isActive ? accent : "rgba(255,255,255,0.35)",
                    boxShadow: isActive
                      ? `0 0 14px 2px ${accent}88`
                      : undefined,
                  }}
                />
                <span
                  className="text-[11px] font-medium tracking-tight"
                  style={{
                    color: isActive ? "var(--2pt-white)" : "rgba(255,255,255,0.7)",
                  }}
                >
                  {s.label}
                </span>
                <span className="text-[8px] font-mono tracking-[0.22em] uppercase text-[var(--2pt-white)]/40 mt-0.5">
                  {s.sub}
                </span>
              </div>
            </div>
          )
        })}

        {/* Hub node */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          style={{ left: `${cx}%`, top: `${cy}%` }}
        >
          <div
            className="relative rounded-full flex items-center justify-center mb-1.5"
            style={{
              width: 56,
              height: 56,
              background: `${accent}1F`,
              border: `1px solid ${accent}66`,
              boxShadow: `0 0 24px -2px ${accent}55`,
            }}
          >
            <div
              className="rounded-full"
              style={{ width: 8, height: 8, background: accent }}
            />
            <div
              className="absolute inset-0 rounded-full border animate-ping"
              style={{ borderColor: `${accent}33` }}
            />
          </div>
          <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-[var(--2pt-white)]/75">
            Strategy
          </span>
          <span className="text-[8px] font-mono tracking-[0.22em] uppercase text-[var(--2pt-white)]/40">
            ai agents · 6
          </span>
        </div>

        {/* Direction indicator at bottom-left */}
        <div
          className="absolute left-0 bottom-1 font-mono text-[9px] tracking-[0.22em] uppercase"
          style={{ color: `${accent}` }}
        >
          {direction === 0
            ? `${KYNDRYL_SPOKES[activeSpoke].label} → strategy`
            : `strategy → ${KYNDRYL_SPOKES[activeSpoke].label}`}
        </div>
      </div>
    </VignetteFrame>
  )
}

// ─────────────────────────────────────────────────────────────────────
// 4 · Dreamies — cohort scorer
// ─────────────────────────────────────────────────────────────────────

const DREAMIES_COHORTS = [
  {
    label: "New pet parent",
    bars: [40, 55, 48, 60, 72, 78],
    convBase: 4.2,
  },
  {
    label: "Lapsed buyer",
    bars: [25, 28, 22, 30, 35, 42],
    convBase: 2.1,
  },
  {
    label: "Premium subscriber",
    bars: [60, 65, 72, 80, 86, 92],
    convBase: 7.8,
  },
  {
    label: "Promo-sensitive",
    bars: [35, 38, 40, 48, 52, 58],
    convBase: 3.4,
  },
]

function DreamiesCohortScorer({ accent }: { accent: string }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [tick, setTick] = useState(0)
  const [shipped, setShipped] = useState(84)
  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => {
      setTick((t) => t + 1)
      if (Math.random() > 0.6) setShipped((s) => s + 1)
    }, 1100)
    return () => clearInterval(id)
  }, [inView])
  const activeRow = tick % DREAMIES_COHORTS.length

  return (
    <VignetteFrame
      outerRef={ref}
      accent={accent}
      topLeft="cohort personalisation · live"
      topRight="12 cohorts running"
      bottomLeft="modules · scored · shipped"
      bottomRight={`${shipped} this week`}
    >
      <div className="grid grid-rows-4 gap-2 h-full">
        {DREAMIES_COHORTS.map((cohort, i) => {
          const isActive = i === activeRow
          const conv = (
            cohort.convBase +
            (isActive ? ((tick * 0.07) % 0.6) : 0)
          ).toFixed(1)
          return (
            <div
              key={cohort.label}
              className="relative grid grid-cols-12 gap-3 items-center px-3 py-2 border rounded-[2px] transition-all duration-500"
              style={{
                borderColor: isActive ? `${accent}55` : "rgba(255,255,255,0.10)",
                background: isActive
                  ? `${accent}10`
                  : "rgba(255,255,255,0.02)",
                opacity: isActive ? 1 : 0.7,
              }}
            >
              {/* Label */}
              <div className="col-span-5">
                <div className="text-[11px] font-medium leading-tight text-[var(--2pt-white)]">
                  {cohort.label}
                </div>
                <div className="text-[9px] font-mono tracking-[0.18em] uppercase text-[var(--2pt-white)]/40 mt-0.5">
                  {isActive ? "personalising" : "scored"}
                </div>
              </div>
              {/* Sparkline */}
              <div className="col-span-4 flex items-end gap-[3px] h-8">
                {cohort.bars.map((h, bi) => {
                  const isLast = bi === cohort.bars.length - 1
                  return (
                    <span
                      key={bi}
                      className="flex-1 rounded-sm transition-all duration-500"
                      style={{
                        height: `${h}%`,
                        background:
                          isActive && isLast
                            ? accent
                            : isLast
                              ? `${accent}99`
                              : "rgba(255,255,255,0.25)",
                        boxShadow:
                          isActive && isLast
                            ? `0 0 10px 1px ${accent}66`
                            : undefined,
                      }}
                    />
                  )
                })}
              </div>
              {/* Conv % */}
              <div className="col-span-3 text-right">
                <div
                  className="text-[16px] font-medium tabular-nums tracking-tight"
                  style={{ color: accent }}
                >
                  {conv}%
                </div>
                <div className="text-[9px] font-mono tracking-[0.18em] uppercase text-[var(--2pt-white)]/40 mt-0.5">
                  conv
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </VignetteFrame>
  )
}

// ─────────────────────────────────────────────────────────────────────
// 5 · Harken — bid triptych (AMZN · WMT · ICA)
// ─────────────────────────────────────────────────────────────────────

const HARKEN_NETWORKS = [
  { label: "AMZN", short: "amazon-ads" },
  { label: "WMT", short: "walmart-connect" },
  { label: "ICA", short: "instacart-ads" },
]

const HARKEN_SKUS = [
  "SKU-2384",
  "SKU-1709",
  "SKU-4012",
  "SKU-3128",
  "SKU-2055",
  "SKU-9182",
  "SKU-6611",
]

type Bid = { sku: string; amount: number; result: "win" | "lose" }

function makeBids(seed: number): Bid[] {
  const bids: Bid[] = []
  for (let i = 0; i < 5; i++) {
    const s = (seed * 13 + i * 7) % HARKEN_SKUS.length
    bids.push({
      sku: HARKEN_SKUS[s],
      amount: 0.18 + ((seed * 11 + i * 5) % 90) / 100,
      result: ((seed * 17 + i * 3) % 5) >= 2 ? "win" : "lose",
    })
  }
  return bids
}

function HarkenBidTriptych({ accent }: { accent: string }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [tick, setTick] = useState(0)
  const [bidsPerMin, setBidsPerMin] = useState(1284)
  const [networks, setNetworks] = useState<Bid[][]>(() =>
    HARKEN_NETWORKS.map((_, i) => makeBids(i + 1)),
  )

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => {
      setTick((t) => t + 1)
      setBidsPerMin(
        1200 + Math.floor(Math.sin(Date.now() / 4000) * 60) + Math.floor(Math.random() * 30),
      )
      setNetworks((prev) =>
        prev.map((col, ni) => {
          // Push a new bid at the top, drop the last.
          const seed = tick * (ni + 1) + Math.floor(Math.random() * 100)
          const newBid: Bid = {
            sku: HARKEN_SKUS[seed % HARKEN_SKUS.length],
            amount: 0.22 + (seed % 90) / 100,
            result: Math.random() > 0.4 ? "win" : "lose",
          }
          return [newBid, ...col.slice(0, 4)]
        }),
      )
    }, 900)
    return () => clearInterval(id)
  }, [tick, inView])

  const activeCol = tick % HARKEN_NETWORKS.length

  return (
    <VignetteFrame
      outerRef={ref}
      accent={accent}
      topLeft="retail media · live trading"
      topRight={`${bidsPerMin.toLocaleString()} bids / min`}
      bottomLeft="auto-route on roas shift"
      bottomRight="efficiency 38ms p95"
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 h-full overflow-y-auto sm:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {HARKEN_NETWORKS.map((net, ni) => {
          const isActive = ni === activeCol
          return (
            <div key={net.label} className="flex flex-col">
              <div className="flex items-baseline justify-between pb-2 mb-2 border-b border-[var(--2pt-white)]/8">
                <span
                  className="text-[14px] font-medium tracking-tight"
                  style={{
                    color: isActive ? accent : "var(--2pt-white)",
                  }}
                >
                  {net.label}
                </span>
                <span className="text-[8px] font-mono tracking-[0.22em] uppercase text-[var(--2pt-white)]/40">
                  {net.short}
                </span>
              </div>
              <ul className="space-y-1.5">
                {networks[ni].map((bid, bi) => {
                  const isWin = bid.result === "win"
                  const isLatest = bi === 0 && isActive
                  return (
                    <li
                      key={`${ni}-${bi}-${bid.sku}-${tick}`}
                      className="grid grid-cols-[1fr_auto_auto] items-center gap-2 text-[10px] font-mono transition-opacity duration-500"
                      style={{
                        opacity: 1 - bi * 0.15,
                        color: isLatest
                          ? "var(--2pt-white)"
                          : "rgba(255,255,255,0.65)",
                      }}
                    >
                      <span className="truncate tracking-[0.1em] uppercase">
                        {bid.sku}
                      </span>
                      <span
                        className="tabular-nums"
                        style={{
                          color: isWin
                            ? accent
                            : "rgba(255,255,255,0.4)",
                        }}
                      >
                        ${bid.amount.toFixed(2)}
                      </span>
                      <span
                        className="text-[8px] tracking-[0.18em] uppercase"
                        style={{
                          color: isWin
                            ? accent
                            : "rgba(255,255,255,0.35)",
                        }}
                      >
                        {isWin ? "↑ win" : "— miss"}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </VignetteFrame>
  )
}

// ─────────────────────────────────────────────────────────────────────
// 6 · Clifford Chance — production pipeline (5 stages)
// ─────────────────────────────────────────────────────────────────────

const CC_STAGES = [
  { key: "brief", label: "Brief" },
  { key: "edit", label: "Edit" },
  { key: "localise", label: "Localise" },
  { key: "review", label: "Review" },
  { key: "publish", label: "Publish" },
]

const CC_OFFICES = ["LDN", "NYC", "TOK", "FRA", "SGP", "HKG", "DXB"]

type Brief = { id: string; office: string; stage: number }

function CliffordPipeline({ accent }: { accent: string }) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [briefs, setBriefs] = useState<Brief[]>(() => [
    { id: "br-218", office: "LDN", stage: 0 },
    { id: "br-217", office: "NYC", stage: 2 },
    { id: "br-216", office: "TOK", stage: 3 },
  ])
  const [tick, setTick] = useState(0)
  const [inFlight, setInFlight] = useState(67)

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => {
      setTick((t) => t + 1)
      setBriefs((prev) => {
        // Advance each brief; if it falls off the end, recycle with a new id.
        return prev.map((b, i) => {
          const next = b.stage + 1
          if (next >= CC_STAGES.length) {
            return {
              id: `br-${(218 + tick + i).toString()}`,
              office: CC_OFFICES[(tick + i * 3) % CC_OFFICES.length],
              stage: 0,
            }
          }
          return { ...b, stage: next }
        })
      })
      if (Math.random() > 0.55) setInFlight((n) => n + 1)
    }, 1300)
    return () => clearInterval(id)
  }, [tick, inView])

  // Per-stage counts (deterministic visual filler so each stage has weight)
  const stageCounts = [14, 18, 11, 16, 8].map((n, i) =>
    Math.max(1, n + ((tick + i) % 3)),
  )

  return (
    <VignetteFrame
      outerRef={ref}
      accent={accent}
      topLeft="production pipeline · global"
      topRight={`${inFlight} briefs in flight`}
      bottomLeft="12 offices · 9 locales · ai captions"
      bottomRight="review p95 4h"
    >
      <div className="relative h-full">
        {/* Rail */}
        <div
          aria-hidden
          className="absolute left-0 right-0 h-px bg-[var(--2pt-white)]/15"
          style={{ top: "50%" }}
        />
        <div
          aria-hidden
          className="absolute h-px"
          style={{
            top: "50%",
            left: 0,
            width: `${((briefs[0].stage + 1) / CC_STAGES.length) * 100}%`,
            background: `linear-gradient(to right, ${accent}99, transparent)`,
          }}
        />

        {/* Stages */}
        <div className="relative grid grid-cols-5 h-full">
          {CC_STAGES.map((stage, si) => {
            const hasBrief = briefs.some((b) => b.stage === si)
            return (
              <div
                key={stage.key}
                className="relative flex flex-col items-center justify-between py-3"
              >
                {/* Stage count above rail */}
                <div className="text-center">
                  <div className="text-[10px] font-mono tracking-[0.22em] uppercase text-[var(--2pt-white)]/45">
                    {stage.label}
                  </div>
                  <div
                    className="text-[20px] font-medium tabular-nums leading-none mt-1"
                    style={{
                      color: hasBrief ? accent : "rgba(255,255,255,0.7)",
                    }}
                  >
                    {stageCounts[si]}
                  </div>
                </div>

                {/* Dot on rail */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span
                    className="block rounded-full transition-all duration-500"
                    style={{
                      width: hasBrief ? 10 : 6,
                      height: hasBrief ? 10 : 6,
                      background: hasBrief ? accent : "rgba(255,255,255,0.3)",
                      boxShadow: hasBrief
                        ? `0 0 12px 1px ${accent}99`
                        : undefined,
                    }}
                  />
                </div>

                {/* Brief cards below the rail */}
                <div className="text-center min-h-[36px] flex flex-col items-center gap-1">
                  {briefs
                    .filter((b) => b.stage === si)
                    .map((b) => (
                      <div
                        key={`${b.id}-${b.office}`}
                        className="inline-flex items-center gap-1.5 px-2 py-1 border rounded-sm"
                        style={{
                          borderColor: `${accent}55`,
                          background: `${accent}14`,
                        }}
                      >
                        <span
                          className="text-[8px] font-mono tracking-[0.22em] uppercase"
                          style={{ color: accent }}
                        >
                          {b.office}
                        </span>
                        <span className="text-[8px] font-mono tracking-[0.18em] uppercase text-[var(--2pt-white)]/70">
                          {b.id}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </VignetteFrame>
  )
}

// ─────────────────────────────────────────────────────────────────────
// Fallback ambient — only used if a slug doesn't match. Kept lean.
// ─────────────────────────────────────────────────────────────────────

function AmbientVignette({ accent }: { accent: string }) {
  return (
    <VignetteFrame
      accent={accent}
      topLeft="system · running"
      topRight="live"
      bottomLeft="continuous"
      bottomRight="steady"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full border animate-ping"
              style={{
                width: 80 + i * 70,
                height: 80 + i * 70,
                borderColor: `${accent}55`,
                animationDelay: `${i * 0.6}s`,
                animationDuration: "2.8s",
              }}
            />
          ))}
          <div
            className="relative rounded-full"
            style={{
              width: 14,
              height: 14,
              background: accent,
              boxShadow: `0 0 22px 3px ${accent}88`,
            }}
          />
        </div>
      </div>
    </VignetteFrame>
  )
}
