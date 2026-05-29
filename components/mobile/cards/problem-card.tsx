"use client"

/**
 * ProblemCard — full-bleed white card, one of five problems.
 *
 * Each problem has its own purpose-built mobile-native visualization
 * rendered between the title and the story footer:
 *
 *   efficiency  → vertical channel ledger with live $$ ticks + anomaly
 *   segments    → cascading stacked segment bars with growth %
 *   bidding     → centred bid amount that pulses on every win
 *   creative    → swipe-able variant card stack with promote/skip
 *   compliance  → row-by-row scanning bots with progress
 *
 * The viz only runs while the card is in view. Each problem card uses the
 * full viewport height with the problem number huge at the top to give
 * each one cover-level weight.
 */

import { useEffect, useState } from "react"
import { useInView } from "@/components/mobile/use-in-view"

export type ProblemKind =
  | "efficiency"
  | "segments"
  | "bidding"
  | "creative"
  | "compliance"

export type MobileProblem = {
  label: string
  index: string
  title: string
  question: string
  story: string
  kind: ProblemKind
}

export const MOBILE_PROBLEMS: MobileProblem[] = [
  {
    label: "I",
    index: "01",
    title: "Monitoring efficiency",
    question: "Where is spend leaking?",
    story: "Today: $14,200 of waste caught and reallocated.",
    kind: "efficiency",
  },
  {
    label: "II",
    index: "02",
    title: "Monitoring growth",
    question: "Which segments are driving it?",
    story: "Top segment driving 31% of incremental growth.",
    kind: "segments",
  },
  {
    label: "III",
    index: "03",
    title: "Driving growth",
    question: "How do we move the metric?",
    story: "1,284 bid auctions running this minute.",
    kind: "bidding",
  },
  {
    label: "IV",
    index: "04",
    title: "Creative optimisation",
    question: "Which creative actually wins?",
    story: "312 variants scored today. 47 promoted to live spend.",
    kind: "creative",
  },
  {
    label: "V",
    index: "05",
    title: "Consistency and compliance",
    question: "Will legal kill this before it ships?",
    story: "12,847 assets scanned today. 142 flagged.",
    kind: "compliance",
  },
]

export function ProblemCard({
  index,
  data,
}: {
  index: number
  data: MobileProblem
}) {
  const { ref, visible } = useInView<HTMLElement>(0.5)
  const total = MOBILE_PROBLEMS.length

  return (
    <section
      ref={ref}
      data-card-index={index}
      className="relative h-[100dvh] w-full snap-start overflow-hidden bg-[var(--2pt-white)] text-[var(--2pt-black)] flex flex-col"
    >
      {/* Faint dot-grid texture so the white isn't plain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(rgba(5,5,5,0.32) 1px, transparent 1.5px)",
          backgroundSize: "30px 30px",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 50%, #000 30%, transparent 80%)",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 50%, #000 30%, transparent 80%)",
        }}
      />
      {/* Soft green accent per card, positioned distinctively */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 55% 45% at ${
            index % 2 === 0 ? "85% 15%" : "15% 85%"
          }, rgba(74,222,128,0.10) 0%, transparent 60%)`,
        }}
      />

      {/* Top — index counter + problem number */}
      <div className="relative z-10 pt-16 px-6 flex items-baseline justify-between">
        <div className="flex items-baseline gap-3">
          <span
            className="text-[64px] font-bold tabular-nums tracking-[-0.05em] leading-none text-[var(--2pt-green)]"
            style={{
              transition:
                "opacity 700ms cubic-bezier(0.16,1,0.3,1) 120ms, transform 700ms cubic-bezier(0.16,1,0.3,1) 120ms",
            }}
          >
            {data.index}
          </span>
          <span className="text-[10px] font-mono tracking-[0.28em] uppercase text-[var(--2pt-black)]/45 tabular-nums">
            / 0{total}
          </span>
        </div>
        <span className="text-[10px] font-mono tracking-[0.28em] uppercase text-[var(--2pt-black)]/35">
          Problem {data.label}
        </span>
      </div>

      {/* Title + question */}
      <div className="relative z-10 px-6 mt-4">
        <h2
          className="text-[36px] font-bold tracking-[-0.035em] leading-[0.96] text-[var(--2pt-black)] mb-4"
          style={{
            transition:
              "opacity 800ms cubic-bezier(0.16,1,0.3,1) 220ms, transform 800ms cubic-bezier(0.16,1,0.3,1) 220ms",
          }}
        >
          {data.title}
        </h2>
        <p
          className="text-[15px] text-[var(--2pt-black)]/60 leading-snug"
          style={{
            transition: "opacity 800ms ease-out 380ms",
          }}
        >
          {data.question}
        </p>
      </div>

      {/* The viz — flex-1 to fill remaining space */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-4 min-h-0">
        <Viz kind={data.kind} visible={visible} />
      </div>

      {/* Bottom — story line */}
      <div className="relative z-10 pb-12 px-6 border-t border-[var(--2pt-black)]/8 pt-4">
        <div className="flex items-start gap-2.5">
          <span className="w-1 h-1 bg-[var(--2pt-green)] rounded-full mt-2 shrink-0 animate-pulse" />
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-mono tracking-[0.28em] uppercase text-[var(--2pt-black)]/40">
              Recent
            </span>
            <span className="text-[13px] text-[var(--2pt-black)]/85 italic leading-snug">
              {data.story}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ====================== Per-problem visualizations ====================== */

function Viz({ kind, visible }: { kind: ProblemKind; visible: boolean }) {
  switch (kind) {
    case "efficiency":
      return <EfficiencyViz visible={visible} />
    case "segments":
      return <SegmentsViz visible={visible} />
    case "bidding":
      return <BiddingViz visible={visible} />
    case "creative":
      return <CreativeViz visible={visible} />
    case "compliance":
      return <ComplianceViz visible={visible} />
  }
}

/* ─── 01: Efficiency — vertical channel ledger ─── */

const CHANNELS = [
  { name: "Amazon Ads", base: 12_400, trend: 4.2 },
  { name: "Walmart", base: 8_200, trend: 1.9 },
  { name: "Instacart", base: 6_800, trend: -0.6 },
  { name: "Meta", base: 14_600, trend: 6.7 },
]

function useNow() {
  const [t, setT] = useState(0)
  useEffect(() => {
    let raf = 0
    const tick = () => {
      setT(performance.now())
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  return t
}

function EfficiencyViz({ visible }: { visible: boolean }) {
  const now = useNow()
  return (
    <div className="w-full flex flex-col gap-2.5">
      {CHANNELS.map((c, i) => {
        const live = c.base * (1 + Math.sin(now / 700 + i * 1.7) * 0.05)
        const anomaly =
          ((now / 1000 + i * 1.2) % 6) > 5 &&
          ((now / 1000 + i * 1.2) % 6) <= 5.5
        return (
          <div
            key={c.name}
            className="grid grid-cols-[1.2fr_1fr_0.5fr] items-center gap-2 px-3 py-3 bg-[var(--2pt-black)]/[0.03] border border-[var(--2pt-black)]/8 rounded-[6px]"
            
          >
            <span className="text-[13px] font-medium text-[var(--2pt-black)]/85 truncate">
              {c.name}
            </span>
            <span className="text-[14px] font-mono tabular-nums text-[var(--2pt-black)] text-right">
              ${Math.round(live).toLocaleString()}
            </span>
            <span className="flex items-center justify-end gap-1">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: anomaly
                    ? "rgb(225,90,90)"
                    : c.trend >= 0
                      ? "var(--2pt-green)"
                      : "rgba(10,10,10,0.25)",
                }}
              />
              <span
                className="text-[10px] font-mono tabular-nums"
                style={{
                  color: anomaly
                    ? "rgb(200,70,70)"
                    : c.trend >= 0
                      ? "var(--2pt-green)"
                      : "rgba(10,10,10,0.5)",
                }}
              >
                {c.trend >= 0 ? "▲" : "▼"} {Math.abs(c.trend).toFixed(1)}%
              </span>
            </span>
          </div>
        )
      })}
    </div>
  )
}

/* ─── 02: Segments — vertical stacked bars cascading ─── */

const SEGMENTS = [
  { name: "New parents", share: 0.92, growth: 47 },
  { name: "High-LTV repeats", share: 0.78, growth: 31 },
  { name: "Q4 acquisition", share: 0.61, growth: 19 },
  { name: "Pet owners", share: 0.44, growth: 12 },
  { name: "Premium tier", share: 0.22, growth: -3 },
]

function SegmentsViz({ visible }: { visible: boolean }) {
  return (
    <div className="w-full flex flex-col gap-3">
      {SEGMENTS.map((s, i) => {
        const isTop = i === 0
        const isCooling = s.growth < 0
        const color = isTop
          ? "var(--2pt-green)"
          : isCooling
            ? "rgba(200,70,70,0.55)"
            : "rgba(10,10,10,0.55)"
        return (
          <div
            key={s.name}
            className="flex flex-col gap-1.5"
            
          >
            <div className="flex items-baseline justify-between">
              <span className="text-[13px] font-medium text-[var(--2pt-black)]/85 truncate pr-2">
                {s.name}
              </span>
              <span
                className="text-[13px] font-medium tabular-nums tracking-tight shrink-0"
                style={{ color }}
              >
                {s.growth >= 0 ? "+" : ""}
                {s.growth}%
              </span>
            </div>
            <div className="h-1.5 bg-[var(--2pt-black)]/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${s.share * 100}%`,
                  backgroundColor: color,
                  transition: `width 900ms cubic-bezier(0.16,1,0.3,1) ${
                    420 + i * 90
                  }ms`,
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ─── 03: Bidding — centred pulse with bid amount ─── */

function BiddingViz({ visible }: { visible: boolean }) {
  const now = useNow()
  const bid = (2.40 + Math.sin(now / 800) * 0.6).toFixed(2)
  const wins = 8 + Math.floor((now / 1000) % 24)
  const winnerPhase = Math.sin(now / 350)
  const winning = winnerPhase > 0.6

  return (
    <div className="w-full flex flex-col items-center gap-7">
      {/* Bid display */}
      <div
        className="text-center"
        style={{
          transition: "opacity 700ms ease-out 280ms",
        }}
      >
        <div className="text-[10px] font-mono tracking-[0.28em] uppercase text-[var(--2pt-black)]/45 mb-2">
          Winning bid
        </div>
        <div
          className="text-[72px] font-bold tabular-nums tracking-[-0.05em] leading-none text-[var(--2pt-black)] transition-colors duration-200"
          style={{
            color: winning ? "var(--2pt-green)" : undefined,
          }}
        >
          ${bid}
        </div>
      </div>

      {/* Spectrum bars */}
      <div className="flex items-end gap-1 h-20 w-full">
        {Array.from({ length: 18 }).map((_, i) => {
          const phase = (now / 380 + i * 0.32) % (Math.PI * 2)
          const h = 0.25 + 0.65 * Math.abs(Math.sin(phase))
          const isWinner =
            i ===
            Math.floor(
              (Math.sin(now / 600) * 0.5 + 0.5) * 17
            )
          return (
            <div
              key={i}
              className="flex-1 rounded-[1px]"
              style={{
                height: `${h * 100}%`,
                backgroundColor: isWinner
                  ? "var(--2pt-green)"
                  : `rgba(10,10,10,${0.08 + h * 0.18})`,
                transition:
                  "height 120ms ease-out, background-color 200ms ease-out",
              }}
            />
          )
        })}
      </div>

      {/* Counters */}
      <div className="grid grid-cols-2 gap-6 w-full text-center">
        <div>
          <div className="text-[9px] font-mono tracking-[0.28em] uppercase text-[var(--2pt-black)]/40 mb-1">
            Wins / min
          </div>
          <div className="text-[24px] font-bold tabular-nums text-[var(--2pt-green)] leading-none">
            {wins}
          </div>
        </div>
        <div>
          <div className="text-[9px] font-mono tracking-[0.28em] uppercase text-[var(--2pt-black)]/40 mb-1">
            Bids / sec
          </div>
          <div className="text-[24px] font-bold tabular-nums text-[var(--2pt-black)] leading-none">
            {(21 + Math.sin(now / 1700) * 3).toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── 04: Creative — swipeable variant card stack ─── */

const VARIANTS = [
  { id: "V-03", label: "Carousel · usage", score: 8.9, ship: true },
  { id: "V-05", label: "Video · explainer", score: 7.7, ship: false },
  { id: "V-01", label: "Hero · benefit", score: 7.3, ship: false },
]

function CreativeViz({ visible }: { visible: boolean }) {
  return (
    <div className="w-full relative h-[260px] flex items-center justify-center">
      {VARIANTS.map((v, i) => {
        const offset = i * 10
        const scale = 1 - i * 0.04
        return (
          <div
            key={v.id}
            className="absolute inset-x-6 bg-[var(--2pt-white)] border rounded-[12px] p-4 flex flex-col gap-3"
            style={{
              borderColor: v.ship
                ? "rgba(74,222,128,0.65)"
                : "rgba(10,10,10,0.10)",
              boxShadow: v.ship
                ? "0 14px 36px -18px rgba(74,222,128,0.45), 0 2px 6px -2px rgba(10,10,10,0.08)"
                : "0 14px 36px -18px rgba(10,10,10,0.20), 0 2px 6px -2px rgba(10,10,10,0.06)",
              transform: visible
                ? `translateY(${offset - 30}px) scale(${scale})`
                : `translateY(${offset + 20}px) scale(${scale})`,
              opacity: visible ? 1 - i * 0.15 : 0,
              zIndex: VARIANTS.length - i,
              transition: `transform 800ms cubic-bezier(0.16,1,0.3,1) ${
                240 + i * 100
              }ms, opacity 700ms ease-out ${240 + i * 100}ms`,
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-[var(--2pt-black)]/45">
                {v.id}
              </span>
              {v.ship && (
                <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-[var(--2pt-green)]">
                  Ship
                </span>
              )}
            </div>
            <div className="text-[18px] font-bold tracking-[-0.025em] text-[var(--2pt-black)]">
              {v.label}
            </div>
            <div className="flex items-baseline gap-1.5">
              <span
                className="text-[36px] font-bold tabular-nums leading-none"
                style={{
                  color: v.ship ? "var(--2pt-green)" : "var(--2pt-black)",
                }}
              >
                {v.score.toFixed(1)}
              </span>
              <span className="text-[11px] font-mono text-[var(--2pt-black)]/40">
                / 10
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-1">
              {["Brand", "Hook", "CTR"].map((dim, j) => (
                <div key={dim} className="flex flex-col gap-1">
                  <span className="text-[8px] font-mono tracking-wider uppercase text-[var(--2pt-black)]/40">
                    {dim}
                  </span>
                  <div className="h-0.5 bg-[var(--2pt-black)]/[0.08] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(v.score / 10) * (0.9 - j * 0.05) * 100}%`,
                        backgroundColor: v.ship
                          ? "var(--2pt-green)"
                          : "rgba(10,10,10,0.55)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ─── 05: Compliance — scanning bots ─── */

const BOTS = [
  { id: "sent", name: "Sentiment", color: "var(--2pt-green)" },
  { id: "intent", name: "Intent", color: "var(--2pt-green)" },
  { id: "brand", name: "Brand voice", color: "var(--2pt-green)" },
  { id: "claims", name: "Claims", color: "rgb(225,90,90)" },
  { id: "pii", name: "PII redact", color: "var(--2pt-green)" },
  { id: "image", name: "Image safety", color: "var(--2pt-green)" },
]

function ComplianceViz({ visible }: { visible: boolean }) {
  const now = useNow()
  return (
    <div className="w-full flex flex-col gap-2">
      {BOTS.map((b, i) => {
        const cycle = ((now / 1000 + i * 0.55) % 3.6) / 2.4
        const scanning = cycle < 1
        const pct = scanning ? Math.min(100, Math.round(cycle * 100)) : 100
        return (
          <div
            key={b.id}
            className="relative grid grid-cols-[1fr_auto] items-center gap-3 px-3 py-2.5 bg-[var(--2pt-black)]/[0.025] border border-[var(--2pt-black)]/8 rounded-[6px] overflow-hidden"
            
          >
            {/* Progress fill */}
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 transition-[width] duration-200"
              style={{
                width: `${pct}%`,
                backgroundColor: `${b.color === "rgb(225,90,90)" ? "rgba(225,90,90,0.07)" : "rgba(74,222,128,0.07)"}`,
              }}
            />
            <span className="relative z-10 flex items-center gap-2 text-[13px] font-medium text-[var(--2pt-black)]/85">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{
                  backgroundColor: scanning
                    ? "var(--2pt-green)"
                    : b.color === "rgb(225,90,90)"
                      ? "rgb(225,90,90)"
                      : "var(--2pt-green)",
                }}
              />
              {b.name}
            </span>
            <span
              className="relative z-10 text-[10px] font-mono tabular-nums uppercase tracking-[0.18em]"
              style={{ color: scanning ? "rgba(10,10,10,0.45)" : b.color }}
            >
              {scanning ? `${pct}%` : b.color === "rgb(225,90,90)" ? "Flag" : "Pass"}
            </span>
          </div>
        )
      })}
    </div>
  )
}
