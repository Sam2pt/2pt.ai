"use client"

/**
 * WorkPreview — homepage "Now Playing" section.
 *
 * A single editorial case-study feature — treated like a magazine
 * cover placed inside the homepage. Reads as a proper case study
 * preview (label, headline, byline, lead, proof metrics, CTA) with
 * the live mesh vignette playing as the cover art. Clicking anywhere
 * on the feature routes to the full case at /work.
 *
 * Rebuilds when the case list grows again — tuned for a one-feature
 * reel today; adding a second case means adding a second feature
 * below this one (or converting to a two-up layout).
 */

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { FEATURED_CASES } from "@/lib/cases"

const ACCENT = "#22d3ee"

const TICKERS: Record<string, string[]> = {
  "vc-portfolio-customer-intelligence": [
    "[CLD] learned · day-3 upsell post-purchase",
    "[CLD] suggested → NGT, KLP, JNC",
    "[NGT] learned · winter reactivation cohort",
    "[NGT] suggested → VRE, PRR",
    "[KLP] learned · trial-to-sub framing test",
    "[KLP] suggested → CLD, MRD",
    "[VRE] learned · registry gifting split",
    "[VRE] suggested → NGT, PRR, MRD",
    "[MRD] learned · $65 shipping threshold",
    "[MRD] suggested → NGT, CLD, VRE, JNC",
  ],
}

const NODES = [
  { key: "NGT", angle: -90 },
  { key: "CLD", angle: -38 },
  { key: "VRE", angle: 14 },
  { key: "KLP", angle: 66 },
  { key: "PRR", angle: 118 },
  { key: "JNC", angle: 170 },
  { key: "MRD", angle: 222 },
]

function StatusTicker({ slug }: { slug: string }) {
  const lines = TICKERS[slug] ?? []
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (!lines.length) return
    const id = setInterval(() => setIdx((i) => (i + 1) % lines.length), 1600)
    return () => clearInterval(id)
  }, [lines.length])
  if (!lines.length) return null
  const visible = [
    lines[idx],
    lines[(idx + 1) % lines.length],
    lines[(idx + 2) % lines.length],
  ]
  return (
    <div className="font-mono text-[10px] uppercase tracking-[0.08em] leading-[1.8] space-y-0.5 min-h-[64px]">
      {visible.map((line, i) => (
        <div
          key={`${line}-${idx}-${i}`}
          style={{
            opacity: i === 0 ? 0.9 : i === 1 ? 0.5 : 0.3,
            color: i === 0 ? ACCENT : "rgba(255,255,255,0.4)",
            animation: i === 0 ? "fadeInUp 500ms ease-out both" : undefined,
          }}
        >
          {line}
        </div>
      ))}
    </div>
  )
}

function MiniMesh({ active }: { active: boolean }) {
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (!active) return
    const id = setInterval(() => setStep((s) => (s + 1) % NODES.length), 1400)
    return () => clearInterval(id)
  }, [active])

  const cx = 200
  const cy = 200
  const r = 130
  const nodePos = NODES.map((n) => {
    const rad = (n.angle * Math.PI) / 180
    return { x: cx + Math.cos(rad) * r, y: cy + Math.sin(rad) * r }
  })
  const sourceIdx = step
  const targetIdx = (step + 3) % NODES.length
  const source = nodePos[sourceIdx]
  const target = nodePos[targetIdx]

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full">
      {/* Faint inter-node lines */}
      {nodePos.map((a, i) =>
        nodePos.slice(i + 1).map((b, j) => (
          <line
            key={`${i}-${j}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={1}
          />
        )),
      )}

      {/* Active beam */}
      {active ? (
        <g key={step}>
          <line
            x1={source.x}
            y1={source.y}
            x2={target.x}
            y2={target.y}
            stroke={ACCENT}
            strokeWidth={1}
            opacity={0.4}
          />
          <circle r="3.5" fill={ACCENT}>
            <animateMotion
              dur="1.2s"
              path={`M ${source.x} ${source.y} L ${target.x} ${target.y}`}
              fill="freeze"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.2;0.8;1"
              dur="1.2s"
              fill="freeze"
            />
          </circle>
        </g>
      ) : null}

      {/* Nodes */}
      {NODES.map((n, i) => {
        const isSource = i === sourceIdx
        const isTarget = i === targetIdx
        const color = isSource || isTarget ? ACCENT : "rgba(255,255,255,0.4)"
        const size = isSource ? 18 : isTarget ? 15 : 12
        return (
          <g key={n.key}>
            {isSource && active ? (
              <circle cx={nodePos[i].x} cy={nodePos[i].y} r={size + 6} fill={ACCENT} opacity="0.15">
                <animate
                  attributeName="r"
                  values={`${size + 3};${size + 14};${size + 3}`}
                  dur="1.4s"
                  repeatCount="indefinite"
                />
              </circle>
            ) : null}
            <circle
              cx={nodePos[i].x}
              cy={nodePos[i].y}
              r={size}
              fill="rgba(10,10,10,1)"
              stroke={color}
              strokeWidth={1}
            />
            <text
              x={nodePos[i].x}
              y={nodePos[i].y + 3}
              textAnchor="middle"
              fill={color}
              fontSize={9}
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              {n.key}
            </text>
          </g>
        )
      })}

      {/* Center */}
      <circle cx={cx} cy={cy} r={26} fill="rgba(10,10,10,1)" stroke={ACCENT} strokeWidth={1.2} />
      <text
        x={cx}
        y={cy + 3}
        textAnchor="middle"
        fill={ACCENT}
        fontSize={9}
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.2em"
      >
        CORE
      </text>
    </svg>
  )
}

export function WorkPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const [entered, setEntered] = useState(false)
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) {
            setEntered(true)
            io.disconnect()
            break
          }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const runtime = now
    ? `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`
    : "··:··:··"

  const c = FEATURED_CASES[0]
  if (!c) return null

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative bg-[var(--2pt-black)] text-[var(--2pt-white)] py-24 md:py-36 px-6 md:px-12"
    >
      {/* Ambient depth */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 35%, transparent 70%, rgba(0,0,0,0.35) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1.4px)",
          backgroundSize: "30px 30px",
          opacity: 0.5,
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 45%, #000 30%, transparent 85%)",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 45%, #000 30%, transparent 85%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 12% 18%, rgba(74,222,128,0.10) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Section eyebrow — a clean editorial "issue" marker */}
        <div className="flex items-center justify-between gap-6 mb-10 md:mb-14">
          <div
            className={`flex items-center gap-2.5 transition-opacity duration-1000 ${
              entered ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="relative inline-flex">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: ACCENT }}
              />
              <span
                className="absolute inset-0 w-1.5 h-1.5 rounded-full animate-ping opacity-60"
                style={{ background: ACCENT }}
              />
            </span>
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/55">
              <span className="text-white/30 mr-2">IV.</span>
              Selected work
            </span>
            <span className="ml-3 text-[10px] font-mono tracking-[0.2em] text-white/30 tabular-nums hidden sm:inline">
              rt {runtime}
            </span>
          </div>

          <Link
            href="/work"
            className={`hidden md:inline-flex group items-center gap-2 text-[11px] font-mono tracking-[0.24em] uppercase text-white/65 hover:text-[var(--2pt-green)] transition-colors duration-500 ${
              entered ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "320ms" }}
          >
            View selected work
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" />
          </Link>
        </div>

        {/* Editorial feature — the case study preview */}
        <Link
          href="/work"
          aria-label={`Read the full case study — ${c.title}`}
          className={`group relative block bg-[var(--2pt-black)] border border-white/12 overflow-hidden transition-all duration-700 ease-out hover:border-white/25 ${
            entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: "440ms",
          }}
        >
          {/* Accent wash top-right */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 55% 65% at 85% 25%, rgba(34,211,238,0.15) 0%, rgba(34,211,238,0.03) 40%, transparent 70%)",
            }}
          />
          {/* Dot grid */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1.4px)",
              backgroundSize: "26px 26px",
              opacity: 0.5,
              WebkitMaskImage:
                "radial-gradient(ellipse 100% 100% at 30% 50%, #000 30%, transparent 90%)",
              maskImage:
                "radial-gradient(ellipse 100% 100% at 30% 50%, #000 30%, transparent 90%)",
            }}
          />
          {/* Slow scan beam — signals live */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none overflow-hidden"
          >
            <div
              className="absolute -inset-x-10 h-[35%] animate-scan-line"
              style={{
                top: "-20%",
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(34,211,238,0.06) 50%, transparent 100%)",
                animationDuration: "9s",
              }}
            />
          </div>

          {/* Masthead — reads unmistakably as a case study cover */}
          <div className="relative flex flex-wrap items-center justify-between gap-3 px-5 md:px-10 pt-6 md:pt-8 pb-4 md:pb-5 border-b border-white/8">
            <div className="flex items-center gap-4 md:gap-6">
              <span className="text-[10px] font-mono tracking-[0.32em] uppercase text-white/70">
                Case study
              </span>
              <span className="text-white/20">/</span>
              <span className="text-[10px] font-mono tracking-[0.28em] uppercase text-white/45">
                01 · 2026 Q3
              </span>
              <span className="text-white/20 hidden sm:inline">/</span>
              <span className="hidden sm:inline text-[10px] font-mono tracking-[0.28em] uppercase text-white/45">
                {c.sector.split(" · ")[0]}
              </span>
            </div>
            <span
              className="flex items-center gap-1.5 text-[9px] font-mono tracking-[0.24em] uppercase"
              style={{ color: ACCENT }}
            >
              <span className="relative inline-flex w-1.5 h-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: ACCENT }}
                />
                <span
                  className="absolute inset-0 rounded-full animate-ping opacity-60"
                  style={{ background: ACCENT }}
                />
              </span>
              Running in production
            </span>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* LEFT — editorial column */}
            <div className="lg:col-span-7 p-6 md:p-10 lg:p-14 lg:pr-10">
              {/* Byline */}
              <div className="text-[10px] font-mono tracking-[0.28em] uppercase text-white/45 mb-6">
                For {c.client}
              </div>

              {/* Editorial headline — fluid across breakpoints */}
              <h3
                className="font-medium tracking-[-0.038em] leading-[0.95] text-white max-w-[15ch]"
                style={{
                  fontSize: "clamp(34px, 5.6vw, 64px)",
                }}
              >
                One customer brain.
                <br />
                <span className="text-white/50">Seven faces.</span>
              </h3>

              {/* Lead */}
              <p className="mt-6 md:mt-8 text-[15px] md:text-[16px] leading-[1.65] text-white/70 max-w-[52ch]">
                A New York venture firm asked us to build shared customer
                intelligence across their D2C portfolio. Same engine, seven
                tenants, each in its own skin. Rolled in eight weeks.
                What one brand learns, the others get offered as a play.
              </p>

              {/* Proof strip */}
              <div className="mt-9 md:mt-12 grid grid-cols-3 gap-5 md:gap-8 max-w-[520px]">
                {[
                  { l: "Brands", v: "7", u: "portfolio" },
                  { l: "Rollout", v: "8", u: "weeks" },
                  { l: "Learning", v: "24/7", u: "live" },
                ].map((m) => (
                  <div key={m.l} className="border-t border-white/15 pt-3">
                    <div className="text-[9px] font-mono tracking-[0.24em] uppercase text-white/40 mb-1.5">
                      {m.l}
                    </div>
                    <div
                      className="font-medium tracking-[-0.03em] leading-[1] tabular-nums"
                      style={{
                        color: ACCENT,
                        fontSize: "clamp(30px, 3.5vw, 44px)",
                      }}
                    >
                      {m.v}
                    </div>
                    <div className="mt-1.5 text-[10px] font-mono tracking-[0.14em] uppercase text-white/40">
                      {m.u}
                    </div>
                  </div>
                ))}
              </div>

              {/* Read the case — obvious CTA */}
              <div
                className="mt-10 md:mt-14 inline-flex items-center gap-3 px-5 h-11 border border-white/30 group-hover:border-[var(--2pt-green)] group-hover:bg-[var(--2pt-green)] group-hover:text-[var(--2pt-black)] transition-colors duration-500"
                style={{ color: "var(--2pt-white)" }}
              >
                <span className="text-[11px] font-mono tracking-[0.22em] uppercase">
                  Read the case
                </span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" />
              </div>
            </div>

            {/* RIGHT — live mesh vignette */}
            <div className="lg:col-span-5 relative border-t lg:border-t-0 lg:border-l border-white/8 min-h-[320px] lg:min-h-[520px] flex flex-col">
              {/* Vignette label */}
              <div className="px-5 md:px-6 pt-5 pb-3 flex items-center justify-between text-[9px] font-mono tracking-[0.22em] uppercase text-white/45">
                <span>Live · symbiotic mesh</span>
                <span>07 tenants</span>
              </div>
              {/* Mesh */}
              <div className="flex-1 flex items-center justify-center p-5 md:p-6">
                <div className="w-full max-w-[380px] aspect-square">
                  <MiniMesh active={entered} />
                </div>
              </div>
              {/* Suggestion log */}
              <div className="px-5 md:px-6 pt-4 pb-6 border-t border-white/8">
                <div className="text-[9px] font-mono tracking-[0.24em] uppercase text-white/40 mb-2">
                  Suggestions streaming
                </div>
                <StatusTicker slug={c.slug} />
              </div>
            </div>
          </div>

          {/* Colophon footer — categorical tags */}
          <div className="relative flex flex-wrap items-center justify-between gap-3 px-5 md:px-10 py-4 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[9px] font-mono tracking-[0.22em] uppercase text-white/45">
              <span>{c.tools.join(" · ")}</span>
            </div>
            <span className="text-[9px] font-mono tracking-[0.24em] uppercase text-white/55">
              /work/vc-portfolio →
            </span>
          </div>
        </Link>

        {/* Mobile CTA row */}
        <div className="mt-6 md:hidden flex justify-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.24em] uppercase text-white/75 hover:text-[var(--2pt-green)] transition-colors duration-500"
          >
            View selected work
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
