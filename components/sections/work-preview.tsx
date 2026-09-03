"use client"

/**
 * WorkPreview — homepage "Selected work" section.
 *
 * Sticky-hold pattern (same DNA as WhatWeSolveCinematic). The
 * section pins for two viewports as the reader scrolls — first
 * viewport shows Case 01 (Lumen, cyan), second viewport shows
 * Case 02 (Yamaha, violet), crossfading between them. Header +
 * case picker sit above; each poster has its own live vignette,
 * headline, lead, proof strip and a subtle "Read the case" link.
 *
 * Adding a third case: extend CASES[], extend CASE_UI, and give
 * the outer container another viewport of height.
 */

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const CASE_UI = [
  {
    slug: "vc-portfolio-customer-intelligence",
    number: "01",
    year: "2026",
    accent: "#22d3ee",
    accentRgb: "34,211,238",
    accentSoft: "rgba(34,211,238,0.10)",
    caseLabel: "NY Venture · Portfolio",
    sectorPill: "Venture · D2C portfolio",
    byline: "For a New York venture firm",
    headlineA: "One brain.",
    headlineB: "Seven brands.",
    lead:
      "Shared customer insight across a NY venture firm's D2C portfolio. Every brand joins with the winning plays from the others already in hand.",
    metrics: [
      { l: "Brands", v: "7", u: "portfolio" },
      { l: "Rollout", v: "8", u: "weeks" },
      { l: "Learning", v: "24/7", u: "live" },
    ],
    vignetteKind: "mesh" as const,
    tickerLabel: "Shared plays streaming",
    ticker: [
      "[CLD] suggested → NGT, KLP, JNC",
      "[NGT] learned · winter reactivation cohort",
      "[VRE] learned · registry gifting split",
      "[KLP] suggested → CLD, MRD",
      "[MRD] learned · $65 shipping threshold",
    ],
    tools: ["Customer intelligence", "Marketing operations"],
  },
  {
    slug: "yamaha-global-geo",
    number: "02",
    year: "2026",
    accent: "#a78bfa",
    accentRgb: "167,139,250",
    accentSoft: "rgba(167,139,250,0.10)",
    caseLabel: "Yamaha · Music",
    sectorPill: "Education · Music · Global",
    byline: "For Yamaha Music",
    headlineA: "Cited in AI search.",
    headlineB: "Bidding on Google.",
    lead:
      "Search plus AI discovery for a global online music school. One system that runs across every engine and every locale, with an internal tool the team runs themselves.",
    metrics: [
      { l: "Locales", v: "3", u: "US · EU · JP" },
      { l: "Queries", v: "8.4k", u: "watched" },
      { l: "Response", v: "24h", u: "same day" },
    ],
    vignetteKind: "engines" as const,
    tickerLabel: "Overnight movement",
    ticker: [
      "[OPP] Skoove cited by ChatGPT · adult beginners",
      "[RISK] Simply Piano cited by Perplexity · kids EN",
      "[OPP] Flowkey cited by Google AIO · JP-JP",
      "[RISK] Yousician cited by Gemini · guitar EN",
      "[OPP] PianoAcademy cited by ChatGPT · DE-DE",
    ],
    tools: ["GEO + AEO", "Google Ads · organic"],
  },
]

const NODES = [
  { key: "NGT", angle: -90 },
  { key: "CLD", angle: -38 },
  { key: "VRE", angle: 14 },
  { key: "KLP", angle: 66 },
  { key: "PRR", angle: 118 },
  { key: "JNC", angle: 170 },
  { key: "MRD", angle: 222 },
]

const ENGINES = ["GPT", "Claude", "PRP", "GEM", "AIO"]

function Ticker({ lines, accent }: { lines: string[]; accent: string }) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (!lines.length) return
    const id = setInterval(() => setIdx((i) => (i + 1) % lines.length), 1800)
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
            color: i === 0 ? accent : "rgba(255,255,255,0.4)",
            animation: i === 0 ? "fadeInUp 500ms ease-out both" : undefined,
          }}
        >
          {line}
        </div>
      ))}
    </div>
  )
}

function MiniMesh({ active, accent }: { active: boolean; accent: string }) {
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
    const round = (v: number) => Math.round(v * 100) / 100
    return { x: round(cx + Math.cos(rad) * r), y: round(cy + Math.sin(rad) * r) }
  })
  const sourceIdx = step
  const targetIdx = (step + 3) % NODES.length
  const s = nodePos[sourceIdx]
  const t = nodePos[targetIdx]

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full">
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
      {active ? (
        <g key={step}>
          <line x1={s.x} y1={s.y} x2={t.x} y2={t.y} stroke={accent} strokeWidth={1} opacity={0.4} />
          <circle r="3.5" fill={accent}>
            <animateMotion dur="1.2s" path={`M ${s.x} ${s.y} L ${t.x} ${t.y}`} fill="freeze" />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="1.2s" fill="freeze" />
          </circle>
        </g>
      ) : null}
      {NODES.map((n, i) => {
        const isSource = i === sourceIdx
        const isTarget = i === targetIdx
        const color = isSource || isTarget ? accent : "rgba(255,255,255,0.4)"
        const size = isSource ? 18 : isTarget ? 15 : 12
        return (
          <g key={n.key}>
            {isSource && active ? (
              <circle cx={nodePos[i].x} cy={nodePos[i].y} r={size + 6} fill={accent} opacity="0.15">
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
      <circle cx={cx} cy={cy} r={26} fill="rgba(10,10,10,1)" stroke={accent} strokeWidth={1.2} />
      <text
        x={cx}
        y={cy + 3}
        textAnchor="middle"
        fill={accent}
        fontSize={9}
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.2em"
      >
        CORE
      </text>
    </svg>
  )
}

function EnginesVignette({ active, accent }: { active: boolean; accent: string }) {
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (!active) return
    const id = setInterval(() => setStep((s) => (s + 1) % ENGINES.length), 1600)
    return () => clearInterval(id)
  }, [active])

  const cx = 200
  const cy = 200
  const r = 130
  const enginePos = ENGINES.map((_, i) => {
    const angle = (i / ENGINES.length) * Math.PI * 2 - Math.PI / 2
    const round = (v: number) => Math.round(v * 100) / 100
    return { x: round(cx + Math.cos(angle) * r), y: round(cy + Math.sin(angle) * r) }
  })

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full">
      {/* Faint rings */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 4" />
      <circle cx={cx} cy={cy} r={r * 0.6} fill="none" stroke="rgba(255,255,255,0.04)" strokeDasharray="2 4" />

      {/* Center audit hub */}
      <circle cx={cx} cy={cy} r={32} fill="rgba(10,10,10,1)" stroke={accent} strokeWidth={1.2} />
      <text
        x={cx}
        y={cy - 3}
        textAnchor="middle"
        fill={accent}
        fontSize={10}
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.2em"
      >
        AUDIT
      </text>
      <text
        x={cx}
        y={cy + 10}
        textAnchor="middle"
        fill="rgba(255,255,255,0.4)"
        fontSize={7}
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.2em"
      >
        engine
      </text>

      {/* Engine nodes + traveling pulse to the active one */}
      {ENGINES.map((eng, i) => {
        const isActive = i === step
        const color = isActive ? accent : "rgba(255,255,255,0.4)"
        const p = enginePos[i]
        return (
          <g key={eng}>
            <line x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
            {isActive && active ? (
              <>
                <circle cx={p.x} cy={p.y} r={22} fill={accent} opacity="0.14">
                  <animate
                    attributeName="r"
                    values="18;30;18"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle r="3.5" fill={accent}>
                  <animateMotion dur="0.9s" path={`M ${cx} ${cy} L ${p.x} ${p.y}`} fill="freeze" />
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur="0.9s" fill="freeze" />
                </circle>
              </>
            ) : null}
            <circle cx={p.x} cy={p.y} r={isActive ? 20 : 16} fill="rgba(10,10,10,1)" stroke={color} strokeWidth={1} />
            <text
              x={p.x}
              y={p.y + 3}
              textAnchor="middle"
              fill={color}
              fontSize={9}
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.15em"
            >
              {eng}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

type CaseUi = (typeof CASE_UI)[number]

function CasePoster({
  ui,
  isActive,
  entered,
}: {
  ui: CaseUi
  isActive: boolean
  entered: boolean
}) {
  return (
    <Link
      href="/work"
      aria-label={`Read the ${ui.caseLabel} case`}
      aria-hidden={!isActive}
      tabIndex={isActive ? 0 : -1}
      className={`group absolute inset-0 block bg-[var(--2pt-black)] border border-white/12 overflow-hidden transition-opacity duration-700 ease-out ${
        isActive ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Accent wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 65% at 85% 25%, rgba(${ui.accentRgb},0.14) 0%, rgba(${ui.accentRgb},0.03) 40%, transparent 70%)`,
        }}
      />
      {/* Dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1.3px)",
          backgroundSize: "26px 26px",
          opacity: 0.45,
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 100% at 30% 50%, #000 30%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 100% 100% at 30% 50%, #000 30%, transparent 90%)",
        }}
      />

      {/* Masthead */}
      <div className="relative flex flex-wrap items-center justify-between gap-3 px-5 md:px-10 pt-6 md:pt-8 pb-4 md:pb-5 border-b border-white/8">
        <div className="flex items-center gap-4 md:gap-6">
          <span className="text-[10px] font-mono tracking-[0.32em] uppercase text-white/70">
            Case study
          </span>
          <span className="text-white/20">/</span>
          <span className="text-[10px] font-mono tracking-[0.28em] uppercase text-white/45">
            {ui.number} · {ui.year}
          </span>
          <span className="text-white/20 hidden sm:inline">/</span>
          <span className="hidden sm:inline text-[10px] font-mono tracking-[0.28em] uppercase text-white/45">
            {ui.sectorPill.split(" · ")[0]}
          </span>
        </div>
        <span
          className="flex items-center gap-1.5 text-[9px] font-mono tracking-[0.24em] uppercase"
          style={{ color: ui.accent }}
        >
          <span className="relative inline-flex w-1.5 h-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: ui.accent }}
            />
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-60"
              style={{ background: ui.accent }}
            />
          </span>
          Running in production
        </span>
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* LEFT — editorial */}
        <div className="lg:col-span-7 p-6 md:p-10 lg:p-14 lg:pr-10">
          <div className="text-[10px] font-mono tracking-[0.28em] uppercase text-white/45 mb-6">
            {ui.byline}
          </div>

          <h3
            className="font-semibold tracking-[-0.03em] leading-[1.02] text-white max-w-[16ch]"
            style={{ fontSize: "clamp(28px, 4.4vw, 48px)" }}
          >
            {ui.headlineA}
            <br />
            <span className="text-white/50">{ui.headlineB}</span>
          </h3>

          <p className="mt-6 md:mt-8 text-[15px] md:text-[16px] leading-[1.65] text-white/70 max-w-[54ch]">
            {ui.lead}
          </p>

          {/* Proof strip */}
          <div className="mt-9 md:mt-12 grid grid-cols-3 gap-5 md:gap-8 max-w-[520px]">
            {ui.metrics.map((m) => (
              <div key={m.l} className="border-t border-white/15 pt-3">
                <div className="text-[9px] font-mono tracking-[0.24em] uppercase text-white/40 mb-1.5">
                  {m.l}
                </div>
                <div
                  className="font-semibold tracking-[-0.02em] leading-[1] tabular-nums"
                  style={{
                    color: ui.accent,
                    fontSize: "clamp(24px, 2.8vw, 36px)",
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

          {/* CTA — subtle underline treatment, no filled hover */}
          <div className="mt-10 md:mt-14 inline-flex items-center gap-2 group/cta">
            <span
              className="text-[11px] font-mono tracking-[0.24em] uppercase text-white/70 group-hover:text-white transition-colors duration-500 border-b pb-1"
              style={{
                borderColor: `rgba(255,255,255,0.2)`,
              }}
            >
              Read the case
            </span>
            <ArrowUpRight
              className="w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500"
            />
          </div>
        </div>

        {/* RIGHT — live vignette */}
        <div className="lg:col-span-5 relative border-t lg:border-t-0 lg:border-l border-white/8 min-h-[320px] lg:min-h-[520px] flex flex-col">
          <div className="px-5 md:px-6 pt-5 pb-3 flex items-center justify-between text-[9px] font-mono tracking-[0.22em] uppercase text-white/45">
            <span>Live · {ui.vignetteKind === "mesh" ? "symbiotic mesh" : "audit engine"}</span>
            <span>{ui.vignetteKind === "mesh" ? "07 tenants" : "05 engines"}</span>
          </div>
          <div className="flex-1 flex items-center justify-center p-5 md:p-6">
            <div className="w-full max-w-[380px] aspect-square">
              {ui.vignetteKind === "mesh" ? (
                <MiniMesh active={isActive && entered} accent={ui.accent} />
              ) : (
                <EnginesVignette active={isActive && entered} accent={ui.accent} />
              )}
            </div>
          </div>
          <div className="px-5 md:px-6 pt-4 pb-6 border-t border-white/8">
            <div className="text-[9px] font-mono tracking-[0.24em] uppercase text-white/40 mb-2">
              {ui.tickerLabel}
            </div>
            <Ticker lines={ui.ticker} accent={ui.accent} />
          </div>
        </div>
      </div>

      {/* Colophon */}
      <div className="relative flex flex-wrap items-center justify-between gap-3 px-5 md:px-10 py-4 border-t border-white/10">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[9px] font-mono tracking-[0.22em] uppercase text-white/45">
          <span>{ui.tools.join(" · ")}</span>
        </div>
        <span className="text-[9px] font-mono tracking-[0.24em] uppercase text-white/55">
          /work#{ui.slug === "yamaha-global-geo" ? "case-yamaha" : "case-lumen"} →
        </span>
      </div>
    </Link>
  )
}

export function WorkPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const [entered, setEntered] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)

  // Scroll progress tracking: outer container is ~2 viewports tall so the
  // sticky-hold pins for the full length of the case reel. Split evenly
  // between the two cases.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const seen = Math.min(Math.max(-rect.top, 0), total)
      const progress = total > 0 ? seen / total : 0
      // Split cases at 45% so the second case doesn't start crossfading
      // right at the exit boundary
      const nextIdx = progress < 0.45 ? 0 : 1
      setActiveIdx((prev) => (prev === nextIdx ? prev : nextIdx))
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
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

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative bg-[var(--2pt-black)] text-[var(--2pt-white)]"
      style={{ height: `${100 * CASE_UI.length}dvh` }}
    >
      {/* Ambient depth on the whole scroll canvas */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 35%, transparent 70%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      <div className="sticky top-0 h-dvh flex flex-col justify-center px-6 md:px-12">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none transition-all duration-[900ms] ease-out"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 12% 18%, rgba(${CASE_UI[activeIdx].accentRgb},0.08) 0%, transparent 60%)`,
          }}
        />

        <div className="relative max-w-[1400px] w-full mx-auto flex flex-col justify-center py-10 md:py-16">
          {/* Section header + case picker */}
          <div className="flex items-end justify-between gap-6 mb-6 md:mb-8">
            <div
              className={`flex items-center gap-2.5 transition-opacity duration-1000 ${
                entered ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="relative inline-flex">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: CASE_UI[activeIdx].accent }}
                />
                <span
                  className="absolute inset-0 w-1.5 h-1.5 rounded-full animate-ping opacity-60"
                  style={{ background: CASE_UI[activeIdx].accent }}
                />
              </span>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/55">
                <span className="text-white/30 mr-2">IV.</span>
                Selected work
              </span>
            </div>

            {/* Case picker pills */}
            <div className="flex items-center gap-1.5">
              {CASE_UI.map((c, i) => {
                const isActive = i === activeIdx
                return (
                  <div
                    key={c.slug}
                    className="flex items-center gap-2 h-8 px-3 border transition-all duration-500"
                    style={{
                      borderColor: isActive ? c.accent : "rgba(255,255,255,0.15)",
                      background: isActive ? c.accentSoft : "transparent",
                      color: isActive ? c.accent : "rgba(255,255,255,0.5)",
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: isActive ? c.accent : "rgba(255,255,255,0.4)" }}
                    />
                    <span className="text-[10px] font-mono tracking-[0.2em] uppercase">
                      {c.number} · {c.caseLabel.split(" · ")[0]}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Poster stack — both posters absolutely positioned, crossfaded */}
          <div className="relative w-full min-h-[560px] md:min-h-[600px]">
            {CASE_UI.map((ui, i) => (
              <CasePoster
                key={ui.slug}
                ui={ui}
                isActive={i === activeIdx}
                entered={entered}
              />
            ))}
          </div>

          {/* Scroll hint — appears while the section is pinned */}
          <div
            className={`mt-5 flex items-center justify-center gap-3 text-[9px] font-mono tracking-[0.28em] uppercase text-white/35 transition-opacity duration-700 ${
              entered ? "opacity-100" : "opacity-0"
            }`}
          >
            <span
              className="w-1 h-1 rounded-full"
              style={{ background: CASE_UI[activeIdx].accent }}
            />
            <span>Scroll to case {String((activeIdx % CASE_UI.length) + 1).padStart(2, "0")} of {String(CASE_UI.length).padStart(2, "0")}</span>
            <span className="w-8 h-px bg-white/15" />
          </div>
        </div>
      </div>
    </section>
  )
}
