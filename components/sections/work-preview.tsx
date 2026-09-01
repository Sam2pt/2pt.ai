"use client"

/**
 * WorkPreview — homepage "Now Playing" section.
 *
 * Single dramatic preview of the current selected work. Live status,
 * headline claim, hero outcome, mini symbiotic-learning vignette that
 * teases the case, per-case ticker of activity, click-through to /work.
 *
 * Rebuilds when the case list grows again — currently tuned for a
 * one-case reel with room on the right for the animated mesh.
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

  const cx = 180
  const cy = 180
  const r = 110
  const nodePos = NODES.map((n) => {
    const rad = (n.angle * Math.PI) / 180
    return { x: cx + Math.cos(rad) * r, y: cy + Math.sin(rad) * r }
  })
  const sourceIdx = step
  const targetIdx = (step + 3) % NODES.length
  const source = nodePos[sourceIdx]
  const target = nodePos[targetIdx]

  return (
    <svg viewBox="0 0 360 360" className="w-full h-full">
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
          <circle r="3" fill={ACCENT}>
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
        const color = isSource || isTarget ? ACCENT : "rgba(255,255,255,0.35)"
        const size = isSource ? 16 : isTarget ? 13 : 10
        return (
          <g key={n.key}>
            {isSource && active ? (
              <circle cx={nodePos[i].x} cy={nodePos[i].y} r={size + 6} fill={ACCENT} opacity="0.15">
                <animate
                  attributeName="r"
                  values={`${size + 3};${size + 12};${size + 3}`}
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
              fontSize={8}
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              {n.key}
            </text>
          </g>
        )
      })}

      {/* Center */}
      <circle cx={cx} cy={cy} r={22} fill="rgba(10,10,10,1)" stroke={ACCENT} strokeWidth={1.2} />
      <text
        x={cx}
        y={cy + 3}
        textAnchor="middle"
        fill={ACCENT}
        fontSize={8}
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
      className="relative bg-[var(--2pt-black)] text-[var(--2pt-white)] py-24 md:py-32 px-6 md:px-12"
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
            "radial-gradient(ellipse 60% 50% at 12% 18%, rgba(34,211,238,0.10) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <div
              className={`flex items-center gap-2.5 mb-5 transition-opacity duration-1000 ${
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
                Now playing
              </span>
              <span className="ml-3 text-[10px] font-mono tracking-[0.2em] text-white/30 tabular-nums">
                rt {runtime}
              </span>
            </div>
            <h2
              className={`text-[28px] md:text-[44px] font-medium tracking-[-0.03em] leading-[1.02] text-white transition-all duration-1000 ${
                entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: "120ms" }}
            >
              Selected work.
            </h2>
            <p
              className={`mt-3 text-[13px] md:text-[14px] leading-[1.55] text-white/55 max-w-[480px] transition-opacity duration-1000 ${
                entered ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "240ms" }}
            >
              One engagement, running live. Read the full case at /work.
            </p>
          </div>

          <Link
            href="/work"
            className={`hidden md:inline-flex group items-center gap-2 text-[11px] font-mono tracking-[0.24em] uppercase text-white/65 hover:text-[var(--2pt-green)] transition-colors duration-500 ${
              entered ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "320ms" }}
          >
            Read the case
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" />
          </Link>
        </div>

        {/* Single hero poster */}
        <Link
          href="/work"
          className={`group relative block border border-white/12 overflow-hidden transition-all duration-700 ease-out hover:border-white/25 ${
            entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: "440ms",
          }}
        >
          {/* Accent wash */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 70% at 85% 30%, rgba(34,211,238,0.16) 0%, rgba(34,211,238,0.04) 40%, transparent 70%)",
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
              opacity: 0.55,
              WebkitMaskImage:
                "radial-gradient(ellipse 100% 100% at 30% 50%, #000 30%, transparent 90%)",
              maskImage:
                "radial-gradient(ellipse 100% 100% at 30% 50%, #000 30%, transparent 90%)",
            }}
          />
          {/* Right rule */}
          <div
            aria-hidden
            className="absolute right-0 top-8 bottom-8 w-px"
            style={{
              background: `linear-gradient(to bottom, transparent, ${ACCENT}, transparent)`,
              opacity: 0.5,
            }}
          />

          {/* Top strip */}
          <div className="relative flex items-center justify-between px-5 md:px-8 pt-6 pb-3 border-b border-white/8">
            <span className="text-[10px] font-mono tracking-[0.28em] uppercase text-white/40">
              01 / 01
            </span>
            <span className="flex items-center gap-3">
              <span className="text-[9px] font-mono tracking-[0.22em] uppercase text-white/45">
                {c.sector.split(" · ").slice(0, 2).join(" · ")}
              </span>
              <span
                className="flex items-center gap-1.5 text-[9px] font-mono tracking-[0.22em] uppercase"
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
                Live
              </span>
            </span>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-12 gap-0">
            {/* Left column — headline + claim + outcome + ticker */}
            <div className="md:col-span-7 p-6 md:p-10 lg:p-14">
              <div className="text-[10px] font-mono tracking-[0.28em] uppercase text-white/45 mb-4">
                {c.client}
              </div>
              <h3 className="text-[30px] md:text-[46px] lg:text-[58px] font-medium tracking-[-0.035em] leading-[1] text-white max-w-[16ch]">
                One customer brain.
                <br />
                <span className="text-white/50">Seven faces.</span>
              </h3>

              <div className="mt-8 md:mt-10 grid grid-cols-2 gap-6 max-w-[420px]">
                <div>
                  <div className="text-[9px] font-mono tracking-[0.28em] uppercase text-white/45 mb-2">
                    Brands live
                  </div>
                  <div
                    className="text-[54px] md:text-[68px] font-medium tracking-[-0.04em] leading-[0.95] tabular-nums"
                    style={{ color: ACCENT }}
                  >
                    7
                  </div>
                </div>
                <div>
                  <div className="text-[9px] font-mono tracking-[0.28em] uppercase text-white/45 mb-2">
                    Rollout
                  </div>
                  <div
                    className="text-[54px] md:text-[68px] font-medium tracking-[-0.04em] leading-[0.95] tabular-nums"
                    style={{ color: ACCENT }}
                  >
                    8<span className="text-[28px] md:text-[36px] text-white/45 ml-1">wk</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 md:mt-10 pt-5 border-t border-white/8">
                <div className="text-[9px] font-mono tracking-[0.24em] uppercase text-white/40 mb-2">
                  Mesh · live suggestions
                </div>
                <StatusTicker slug={c.slug} />
              </div>
            </div>

            {/* Right column — mini mesh vignette */}
            <div className="md:col-span-5 relative border-t md:border-t-0 md:border-l border-white/8 min-h-[280px] md:min-h-[420px] flex items-center justify-center p-6 md:p-8">
              <div className="w-full max-w-[380px] aspect-square">
                <MiniMesh active={entered} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative flex items-center justify-between px-5 md:px-8 py-4 border-t border-white/10">
            <span className="text-[9px] font-mono tracking-[0.24em] uppercase text-white/55">
              {c.tools.slice(0, 2).join(" · ")}
            </span>
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.24em] uppercase text-white/75 group-hover:text-[var(--2pt-green)] transition-colors duration-500"
            >
              Read the case
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </Link>

        {/* Mobile footer link */}
        <div className="mt-8 md:hidden">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.24em] uppercase text-white/75 hover:text-[var(--2pt-green)] transition-colors duration-500"
          >
            Read the case
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
