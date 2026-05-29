"use client"

/**
 * ProductsSuite. Desktop section. Three productised systems we ship
 * inside engagements: Chedder (GEO/AEO audit), Lumen (customer
 * intelligence), Conduit (cross-stack marketing-ops plumbing).
 *
 * Visual language matches the cinematic widgets in WhatWeSolveCinematic:
 * light canvas, dot-grid texture, corner crop marks, a tiny live data
 * vignette per card, single green accent. All three cards visible at
 * once as a triptych. No auto-cycle.
 *
 * The frame: these are productised patterns we deploy and customise
 * inside engagements. The system is still the product the client owns.
 */

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { TechGrid, GreenWash } from "@/components/ui/tech-grid"
import { CornerCrops } from "@/components/ui/corner-crops"

// ──────────────────────────────────────────────────────────────────────
// Shared scaffolding for each product card
// ──────────────────────────────────────────────────────────────────────

type Product = {
  id: string
  wordmark: string
  category: string
  headline: string
  body: string
  status: string
}

const PRODUCTS: Product[] = [
  {
    id: "chedder",
    wordmark: "Chedder",
    category: "Generative engine audit",
    headline: "Where AI search cites you. Where it doesn't.",
    body:
      "Chedder runs your brand against the queries your buyers ask ChatGPT, Claude, Perplexity, Gemini and Google AI Overviews. You see what gets cited, what gets missed, and the schema work to fix it.",
    status: "Production · GEO + AEO",
  },
  {
    id: "lumen",
    wordmark: "Lumen",
    category: "Customer intelligence",
    headline: "Watch where growth is actually coming from.",
    body:
      "Lumen scores every cohort on growth, share and trend in real time. Hot segments get more spend. Cooling ones get diagnosed before they break. The board question gets a live answer.",
    status: "Production · CDP-aware",
  },
  {
    id: "conduit",
    wordmark: "Conduit",
    category: "Marketing-ops plumbing",
    headline: "Your marketing stack, finally talking to itself.",
    body:
      "Conduit links Slack, Monday, your CRM, retail media and creative pipelines. Opinionated workflows ship pre-wired. The team is faster on day one, not six months in.",
    status: "Production · Plug & play",
  },
]

// ──────────────────────────────────────────────────────────────────────
// Per-product live vignettes. Small, deliberately quiet animations
// that signal "this is a real running system" without becoming busy.
// ──────────────────────────────────────────────────────────────────────

function ChedderVignette() {
  // 5 LLM queries, each shows a citation pass/fail with a tiny bar of
  // citation rate. Cycles which query is "currently being audited".
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1600)
    return () => clearInterval(id)
  }, [])
  const rows = [
    { q: "best ai agency for marketing", cited: true, score: 84 },
    { q: "claude partner agencies", cited: false, score: 32 },
    { q: "embedded ai engineering", cited: true, score: 92 },
  ]
  const active = tick % rows.length
  return (
    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--2pt-black)]/80 space-y-2">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[var(--2pt-black)]/55">LLM citation audit</span>
        <span className="text-[var(--2pt-green)] tabular-nums">
          {rows.filter((r) => r.cited).length}/{rows.length} cited
        </span>
      </div>
      {rows.map((r, i) => (
        <div
          key={r.q}
          className="grid grid-cols-[1fr_auto_auto] items-center gap-3 transition-opacity duration-500"
          style={{ opacity: i === active ? 1 : 0.55 }}
        >
          <span className="truncate normal-case tracking-normal font-sans text-[11px] text-[var(--2pt-black)]/75">
            &ldquo;{r.q}&rdquo;
          </span>
          <span
            className="tabular-nums"
            style={{
              color: r.cited ? "var(--2pt-green)" : "rgba(10,10,10,0.35)",
            }}
          >
            {r.score.toString().padStart(2, "0")}
          </span>
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: r.cited
                ? "var(--2pt-green)"
                : "rgba(10,10,10,0.18)",
            }}
          />
        </div>
      ))}
    </div>
  )
}

function LumenVignette() {
  // 4 customer segments scoring continuously
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1100)
    return () => clearInterval(id)
  }, [])
  const segments = [
    { name: "High-LTV new", score: 88 + ((tick * 2) % 5), trend: "up" as const },
    { name: "Single SKU", score: 42 - ((tick * 2) % 6), trend: "down" as const },
    { name: "Promo-sensitive", score: 64 + ((tick * 4) % 7), trend: "up" as const },
  ]
  return (
    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--2pt-black)]/80 space-y-2.5">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[var(--2pt-black)]/55">Cohort signal</span>
        <span className="text-[var(--2pt-green)] tabular-nums">live</span>
      </div>
      {segments.map((s) => (
        <div key={s.name} className="space-y-1">
          <div className="flex items-baseline justify-between">
            <span className="normal-case tracking-normal font-sans text-[11px] text-[var(--2pt-black)]/75">
              {s.name}
            </span>
            <span
              className="tabular-nums"
              style={{
                color:
                  s.trend === "up"
                    ? "var(--2pt-green)"
                    : "rgba(10,10,10,0.45)",
              }}
            >
              {s.score} {s.trend === "up" ? "↗" : "↘"}
            </span>
          </div>
          <div className="h-[3px] w-full bg-[var(--2pt-black)]/8 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--2pt-green)] transition-[width] duration-700 ease-out"
              style={{
                width: `${Math.max(8, Math.min(100, s.score))}%`,
                opacity: s.trend === "up" ? 1 : 0.4,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function ConduitVignette() {
  // A flow line: Slack → Monday → CRM → Retail media
  // A traveller pulse cycles through the four nodes.
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 900)
    return () => clearInterval(id)
  }, [])
  const nodes = ["Slack", "Monday", "CRM", "Retail media"]
  const active = tick % nodes.length
  return (
    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--2pt-black)]/80">
      <div className="flex items-baseline justify-between mb-3">
        <span className="text-[var(--2pt-black)]/55">Cross-stack relay</span>
        <span className="text-[var(--2pt-green)] tabular-nums">
          {(tick * 7) % 1000} ops / hr
        </span>
      </div>

      {/*
        Rail row. Each node owns a grid column. The dot for that node
        sits at the column centre and is absolutely positioned within the
        column so its size can change without pushing siblings. The rail
        is a single absolute element spanning column-centre 0 to
        column-centre (n-1), so it always lines up with the dot centres.
      */}
      <div
        className="relative grid grid-cols-4 h-3 mb-2"
        style={{ ["--cols" as string]: nodes.length }}
      >
        {/* Base rail — inset to start at the centre of col 0 and end at
            the centre of col (n-1). That inset is exactly half a column. */}
        <div
          aria-hidden
          className="absolute top-1/2 -translate-y-1/2 h-px bg-[var(--2pt-black)]/15"
          style={{
            left: `calc(100% / (var(--cols) * 2))`,
            right: `calc(100% / (var(--cols) * 2))`,
          }}
        />
        {/* Active progress overlay — same left anchor, width grows in
            steps of (column width) to land exactly on each dot centre. */}
        <div
          aria-hidden
          className="absolute top-1/2 -translate-y-1/2 h-px bg-[var(--2pt-green)] transition-[width] duration-700 ease-out"
          style={{
            left: `calc(100% / (var(--cols) * 2))`,
            width: `calc((100% / var(--cols)) * ${active})`,
          }}
        />
        {nodes.map((n, i) => {
          const isPast = i <= active
          const isActive = i === active
          return (
            <div key={n} className="relative">
              <span
                className="absolute left-1/2 top-1/2 rounded-full transition-all duration-500"
                style={{
                  width: isActive ? 12 : 8,
                  height: isActive ? 12 : 8,
                  transform: "translate(-50%, -50%)",
                  background: isPast
                    ? "var(--2pt-green)"
                    : "rgba(10,10,10,0.18)",
                  boxShadow: isActive
                    ? "0 0 10px 2px rgba(74,222,128,0.45)"
                    : undefined,
                }}
              />
            </div>
          )
        })}
      </div>

      {/* Labels — same 4-col grid, each label centred under its dot */}
      <div className="grid grid-cols-4">
        {nodes.map((n, i) => (
          <span
            key={n}
            className="tracking-[0.16em] text-[9px] normal-case font-mono text-center"
            style={{
              color:
                i === active
                  ? "var(--2pt-black)"
                  : "rgba(10,10,10,0.5)",
            }}
          >
            {n}
          </span>
        ))}
      </div>

      <div className="mt-4 space-y-1 text-[10px] text-[var(--2pt-black)]/55 normal-case tracking-normal font-sans">
        <div>→ Slack #brand-launches → Monday item</div>
        <div>→ CRM cohort → retail-media bid raised</div>
      </div>
    </div>
  )
}

const VIGNETTES: Record<string, () => React.JSX.Element> = {
  chedder: ChedderVignette,
  lumen: LumenVignette,
  conduit: ConduitVignette,
}

// ──────────────────────────────────────────────────────────────────────
// Section
// ──────────────────────────────────────────────────────────────────────

export function ProductsSuite() {
  const sectionRef = useRef<HTMLElement>(null)
  const [entered, setEntered] = useState(false)

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
      { threshold: 0.18 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative bg-[var(--2pt-white)] text-[var(--2pt-black)] py-20 md:py-28 px-8 md:px-12 border-t border-[var(--2pt-black)]/8"
    >
      <TechGrid opacity={0.5} />
      <GreenWash at="80% 25%" size="55% 45%" intensity={0.09} />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Header. Compact: eyebrow + single-line headline + tucked subhead */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-14">
          <div className="max-w-[720px]">
            <div
              className={`flex items-center gap-2.5 mb-5 transition-opacity duration-1000 ${
                entered ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full" />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--2pt-black)]/55">
                <span className="text-[var(--2pt-black)]/30 mr-2">III.</span>
                The product suite
              </span>
            </div>

            <h2
              className={`text-[28px] md:text-[40px] font-medium tracking-[-0.03em] leading-[1.05] text-[var(--2pt-black)] transition-all duration-1000 ${
                entered
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: "120ms" }}
            >
              Three things we&rsquo;ve already built.
            </h2>
          </div>

          <p
            className={`text-[13px] md:text-[14px] leading-[1.55] text-[var(--2pt-black)]/60 max-w-[360px] transition-opacity duration-1000 ${
              entered ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "320ms" }}
          >
            Patterns we hit in every engagement. We turned them into
            systems. You get them on day one, then we tailor.
          </p>
        </div>

        {/* Triptych */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {PRODUCTS.map((p, i) => {
            const Viz = VIGNETTES[p.id]
            return (
              <article
                key={p.id}
                className={`group relative flex flex-col bg-[var(--2pt-white)] border border-[var(--2pt-black)]/10 transition-all duration-700 ease-out ${
                  entered
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: `${500 + i * 160}ms`,
                  boxShadow:
                    "0 1px 0 rgba(255,255,255,0.6) inset, 0 1px 2px rgba(10,10,10,0.03)",
                }}
              >
                <CornerCrops />

                {/* Header bar. Compact */}
                <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-[var(--2pt-black)]/8">
                  <span className="text-[9px] font-mono tracking-[0.28em] uppercase text-[var(--2pt-black)]/35">
                    {(i + 1).toString().padStart(2, "0")} /
                    {PRODUCTS.length.toString().padStart(2, "0")}
                  </span>
                  <span className="flex items-center gap-1.5 text-[9px] font-mono tracking-[0.22em] uppercase text-[var(--2pt-green)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--2pt-green)] animate-pulse" />
                    Live
                  </span>
                </div>

                {/* Wordmark + category */}
                <div className="px-5 pt-5">
                  <div className="text-[28px] font-medium tracking-[-0.035em] leading-none text-[var(--2pt-black)]">
                    {p.wordmark}
                    <span className="text-[var(--2pt-green)]">.</span>
                  </div>
                  <div className="mt-2.5 text-[9px] font-mono tracking-[0.24em] uppercase text-[var(--2pt-black)]/55">
                    {p.category}
                  </div>
                </div>

                {/* Headline + body */}
                <div className="px-5 pt-4">
                  <h3 className="text-[15px] font-medium tracking-[-0.015em] leading-[1.25] text-[var(--2pt-black)]">
                    {p.headline}
                  </h3>
                  <p className="mt-2 text-[12px] leading-[1.5] text-[var(--2pt-black)]/65">
                    {p.body}
                  </p>
                </div>

                {/* Vignette */}
                <div className="mt-4 mx-5 mb-4 p-4 rounded-[2px] border border-[var(--2pt-black)]/8 bg-[var(--2pt-black)]/[0.015] flex-1">
                  <Viz />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-5 pb-4 pt-2 border-t border-[var(--2pt-black)]/8 mt-auto">
                  <span className="text-[9px] font-mono tracking-[0.22em] uppercase text-[var(--2pt-black)]/55">
                    {p.status}
                  </span>
                  <a
                    href={`#contact`}
                    className="inline-flex items-center gap-1.5 text-[9px] font-mono tracking-[0.24em] uppercase text-[var(--2pt-black)]/75 hover:text-[var(--2pt-green)] transition-colors duration-500"
                  >
                    Deploy
                    <ArrowUpRight className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
