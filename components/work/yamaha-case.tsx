"use client"

/**
 * YamahaCase — bespoke long-scroll case study for Yamaha Music.
 *
 * Same seven-beat spine as LumenCase, tuned around search + AI
 * discovery for the online music school launch across US / EU / JP.
 *
 *   1. Hero            — headline + live counters
 *   2. Setup           — three regions, two search systems, one launch
 *   3. Core            — one audit engine, every question shoppers ask
 *   4. Locale toggle   — same audit, three locales, different truth
 *   5. Discipline tabs — organic AI, paid Google, schema, content
 *   6. Live monitor    — competitor citation feed with opportunity flags
 *   7. Outcomes        — the numbers + Head of Marketing quote
 *
 * All animation timers gated on IntersectionObserver so nothing burns
 * CPU when the section is off-screen.
 */

import { Fragment, useEffect, useRef, useState } from "react"

type CaseData = {
  slug: string
  client: string
  brand?: string
  sector: string
  year: string
  title: string
}

// Purple / violet accent that pairs with the dark canvas.
const ACCENT = "#a78bfa"

// ── util ─────────────────────────────────────────────────────────────

function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, inView]
}

function BeatLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
      <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/55">
        <span className="text-white/30 mr-2">{n}.</span>
        {label}
      </span>
    </div>
  )
}

// ── BEAT 1 · hero ────────────────────────────────────────────────────

function BeatHero({ c }: { c: CaseData }) {
  const [ref, inView] = useInView(0.2)
  const [now, setNow] = useState<Date | null>(null)
  const [locales, setLocales] = useState(0)
  const [queries, setQueries] = useState(0)

  useEffect(() => {
    if (!inView) return
    setNow(new Date())
    const clock = setInterval(() => setNow(new Date()), 1000)
    let l = 0
    let q = 0
    const grow = setInterval(() => {
      l = Math.min(3, l + 1)
      q = Math.min(8412, q + 240)
      setLocales(l)
      setQueries(q)
      if (l === 3 && q >= 8412) clearInterval(grow)
    }, 60)
    return () => {
      clearInterval(clock)
      clearInterval(grow)
    }
  }, [inView])

  const rt = now
    ? `${now.getUTCHours().toString().padStart(2, "0")}:${now
        .getUTCMinutes()
        .toString()
        .padStart(2, "0")}:${now.getUTCSeconds().toString().padStart(2, "0")}Z`
    : "··:··:··Z"

  return (
    <section ref={ref} className="relative pt-8 md:pt-12 pb-16 md:pb-24">
      {/* Runbook strip */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-mono tracking-[0.24em] uppercase text-white/45 mb-10 md:mb-14">
        <span className="flex items-center gap-2 text-white/70">
          <span className="relative inline-flex w-1.5 h-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-60"
              style={{ background: ACCENT }}
            />
          </span>
          Live
        </span>
        <span className="text-white/25">·</span>
        <span>Case 02 / 02</span>
        <span className="text-white/25">·</span>
        <span>{c.year}</span>
        <span className="text-white/25">·</span>
        <span>
          {c.client}
          {c.brand ? ` · ${c.brand}` : ""}
        </span>
        <span className="text-white/25">·</span>
        <span className="tabular-nums">rt {rt}</span>
      </div>

      {/* HUGE title */}
      <h1
        className={`text-[36px] sm:text-[52px] md:text-[74px] lg:text-[92px] font-semibold tracking-[-0.04em] leading-[0.95] text-white transition-all duration-1000 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        Cited in AI search.
        <br />
        <span className="text-white/50">Bidding on Google.</span>
      </h1>

      {/* Sub-line */}
      <p
        className={`mt-8 md:mt-12 max-w-[780px] text-[15px] md:text-[18px] leading-[1.55] text-white/70 transition-opacity duration-1000 ${
          inView ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "260ms" }}
      >
        Yamaha&rsquo;s global online music school launched in three regions at
        once. We ran the deep research, did the manual audit legwork, then
        automated keyword analysis, wired live competitor monitoring, and
        built the internal tool the marketing team now runs themselves.
      </p>

      {/* Live counters row */}
      <div
        className={`mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 transition-opacity duration-1000 ${
          inView ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "500ms" }}
      >
        {[
          { l: "Locales live", v: locales.toString(), sub: "US · EU · JP" },
          { l: "Queries watched", v: queries.toLocaleString(), sub: "and growing" },
          { l: "AI engines audited", v: "5", sub: "GPT · Claude · Perp · Gem · AIO" },
          { l: "Response time", v: "Same day", sub: "opportunity to action" },
        ].map((m) => (
          <div key={m.l} className="border-t border-white/15 pt-4">
            <div className="text-[9px] font-mono tracking-[0.28em] uppercase text-white/45 mb-2">
              {m.l}
            </div>
            <div
              className="text-[28px] md:text-[36px] font-semibold tracking-[-0.02em] leading-[1] tabular-nums"
              style={{ color: ACCENT }}
            >
              {m.v}
            </div>
            <div className="mt-1 text-[10px] font-mono tracking-[0.16em] uppercase text-white/35">
              {m.sub}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── BEAT 2 · setup ──────────────────────────────────────────────────

function BeatSetup() {
  const [ref, inView] = useInView(0.25)
  return (
    <section ref={ref} className="relative py-20 md:py-28 border-t border-white/8">
      <BeatLabel n="02" label="Setup" />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        <h2
          className={`md:col-span-7 text-[24px] md:text-[34px] lg:text-[40px] font-semibold tracking-[-0.02em] leading-[1.15] text-white transition-all duration-1000 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          Three regions.
          <br />
          <span className="text-white/50">Two search systems. One launch.</span>
        </h2>
        <div
          className={`md:col-span-5 space-y-4 text-[14px] md:text-[15px] leading-[1.65] text-white/65 transition-opacity duration-1000 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "220ms" }}
        >
          <p>
            Parents were searching Google in one register (piano lessons for
            kids, online music school). Adult learners were asking ChatGPT and
            Perplexity for the best online music school. The brand needed to
            show up in both, in three languages, at launch.
          </p>
          <p>
            A human SEO team can handle one region in one language at a time.
            The platform reality required all three at speed, and it needed to
            keep running after we handed the keys back.
          </p>
          <p className="text-white/45 text-[13px] italic">
            The constraint was two things at once: depth of coverage across
            markets, and a system the in-house team could actually run.
          </p>
        </div>
      </div>
    </section>
  )
}

// ── BEAT 3 · core ───────────────────────────────────────────────────

function BeatCore() {
  const [ref, inView] = useInView(0.25)
  return (
    <section ref={ref} className="relative py-20 md:py-28 border-t border-white/8">
      <BeatLabel n="03" label="Core" />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
        <div className="md:col-span-5 order-2 md:order-1">
          <h2 className="text-[22px] md:text-[30px] font-semibold tracking-[-0.02em] leading-[1.15] text-white">
            One audit engine.
            <br />
            <span className="text-white/50">Every question shoppers ask.</span>
          </h2>
          <p className="mt-5 text-[14px] md:text-[15px] leading-[1.65] text-white/65 max-w-[440px]">
            The engine runs continuously against every AI search engine and
            every paid keyword. Same queries, every day, in every market.
          </p>
          <ul className="mt-8 space-y-3 text-[12px] font-mono tracking-[0.06em] text-white/55">
            <li className="flex items-start gap-3">
              <span className="text-white/25 mt-0.5">›</span>
              ChatGPT · Claude · Perplexity · Gemini · Google AIO
            </li>
            <li className="flex items-start gap-3">
              <span className="text-white/25 mt-0.5">›</span>
              Google Ads · Google Search Console
            </li>
            <li className="flex items-start gap-3">
              <span className="text-white/25 mt-0.5">›</span>
              Yamaha CMS · Schema layer
            </li>
            <li className="flex items-start gap-3">
              <span className="text-white/25 mt-0.5">›</span>
              AI translation pipeline (en · de · fr · ja)
            </li>
          </ul>
        </div>

        <div className="md:col-span-7 order-1 md:order-2">
          <div className="relative aspect-[4/3] md:aspect-[5/4]">
            <HubSpokeDiagram active={inView} />
          </div>
        </div>
      </div>
    </section>
  )
}

const CORE_SPOKES = [
  "ChatGPT",
  "Claude",
  "Perplexity",
  "Gemini",
  "Google AIO",
  "Google Ads",
  "CMS",
]

function HubSpokeDiagram({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 500 400" className="w-full h-full">
      <defs>
        <radialGradient id="hub-glow-y" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.35" />
          <stop offset="70%" stopColor={ACCENT} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="250" cy="200" r="80" fill="url(#hub-glow-y)" />

      {CORE_SPOKES.map((label, i) => {
        const angle = (i / CORE_SPOKES.length) * Math.PI * 2 - Math.PI / 2
        const x = Math.round((250 + Math.cos(angle) * 175) * 100) / 100
        const y = Math.round((200 + Math.sin(angle) * 145) * 100) / 100
        return (
          <g key={i}>
            <line
              x1={250}
              y1={200}
              x2={x}
              y2={y}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth={1}
            />
            {active ? (
              <circle r="3" fill={ACCENT}>
                <animateMotion
                  dur={`${3 + (i % 3) * 0.5}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.4}s`}
                  path={`M 250 200 L ${x} ${y}`}
                />
                <animate
                  attributeName="opacity"
                  values="0;1;0"
                  dur={`${3 + (i % 3) * 0.5}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.4}s`}
                />
              </circle>
            ) : null}
            <rect
              x={x - 40}
              y={y - 11}
              width={80}
              height={22}
              rx={11}
              fill="rgba(10,10,10,1)"
              stroke={ACCENT}
              strokeWidth={1}
            />
            <text
              x={x}
              y={y + 3.5}
              textAnchor="middle"
              fill={ACCENT}
              fontSize={9}
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.05em"
            >
              {label}
            </text>
          </g>
        )
      })}

      <circle cx="250" cy="200" r="38" fill="rgba(10,10,10,1)" stroke={ACCENT} strokeWidth={1.5} />
      <text
        x="250"
        y="197"
        textAnchor="middle"
        fill="white"
        fontSize={9}
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.15em"
      >
        AUDIT
      </text>
      <text
        x="250"
        y="212"
        textAnchor="middle"
        fill="rgba(255,255,255,0.5)"
        fontSize={7}
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.15em"
      >
        engine
      </text>
    </svg>
  )
}

// ── BEAT 4 · locale toggle (interactive) ────────────────────────────

type Locale = {
  key: string
  name: string
  flag: string
  language: string
  primary: string
  soft: string
  query: string
  citation: "cited" | "gap"
  winner: string
  fix: string
  cpc: string
}

const LOCALES: Locale[] = [
  {
    key: "us",
    name: "United States",
    flag: "US",
    language: "en-US",
    primary: "#a78bfa",
    soft: "rgba(167,139,250,0.10)",
    query: "best online music school for adults",
    citation: "gap",
    winner: "Skoove",
    fix: "Add HowTo schema on lesson-plan pages · adult-learner testimonial block",
    cpc: "$3.42 CPC",
  },
  {
    key: "eu",
    name: "Germany",
    flag: "DE",
    language: "de-DE",
    primary: "#c4b5fd",
    soft: "rgba(196,181,253,0.10)",
    query: "online klavier lernen für kinder",
    citation: "cited",
    winner: "—",
    fix: "Translate US winning brief · pair with Google Ads exact-match",
    cpc: "€1.80 CPC",
  },
  {
    key: "jp",
    name: "Japan",
    flag: "JP",
    language: "ja-JP",
    primary: "#f0abfc",
    soft: "rgba(240,171,252,0.10)",
    query: "オンライン ピアノ レッスン 初心者",
    citation: "gap",
    winner: "Flowkey (Perplexity)",
    fix: "Course schema in ja-JP · site:yamaha.com JSON-LD refresh",
    cpc: "¥210 CPC",
  },
]

function BeatLocale() {
  const [ref, inView] = useInView(0.2)
  const [active, setActive] = useState(0)
  const loc = LOCALES[active]

  const [autoAdvance, setAutoAdvance] = useState(true)
  useEffect(() => {
    if (!inView || !autoAdvance) return
    const id = setInterval(() => setActive((a) => (a + 1) % LOCALES.length), 4500)
    return () => clearInterval(id)
  }, [inView, autoAdvance])

  return (
    <section ref={ref} className="relative py-20 md:py-28 border-t border-white/8">
      <BeatLabel n="04" label="Same audit · three locales" />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
        <div className="md:col-span-4">
          <h2 className="text-[22px] md:text-[30px] font-semibold tracking-[-0.02em] leading-[1.15] text-white">
            One audit.
            <br />
            <span className="text-white/50">Three locales, three truths.</span>
          </h2>
          <p className="mt-5 text-[14px] md:text-[15px] leading-[1.65] text-white/65 max-w-[420px]">
            Flick through the markets. Same audit engine, different query
            demand, different competitors, different fixes to close each gap.
          </p>
          <p className="mt-4 text-[11px] font-mono tracking-[0.16em] uppercase text-white/35">
            {autoAdvance ? "auto-cycling · tap to lock" : "locked · tap another to change"}
          </p>
        </div>

        <div className="md:col-span-8">
          {/* Locale pills */}
          <div
            className="flex gap-2 mb-5 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 no-scrollbar"
            style={{ scrollbarWidth: "none" }}
          >
            {LOCALES.map((l, i) => {
              const isActive = i === active
              return (
                <button
                  key={l.key}
                  type="button"
                  onClick={() => {
                    setActive(i)
                    setAutoAdvance(false)
                  }}
                  className="snap-start shrink-0 h-11 px-4 border transition-all duration-300"
                  style={{
                    borderColor: isActive ? l.primary : "rgba(255,255,255,0.15)",
                    background: isActive ? l.soft : "transparent",
                    color: isActive ? l.primary : "rgba(255,255,255,0.55)",
                  }}
                >
                  <span className="flex items-center gap-2.5 text-[11px] font-mono tracking-[0.16em] uppercase">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: l.primary }}
                    />
                    {l.flag} · {l.language}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Locale audit panel */}
          <LocaleAuditPanel loc={loc} />
        </div>
      </div>
    </section>
  )
}

function LocaleAuditPanel({ loc }: { loc: Locale }) {
  const cited = loc.citation === "cited"
  return (
    <div
      key={loc.key}
      className="relative border overflow-hidden"
      style={{
        borderColor: `${loc.primary}44`,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.4) 100%)",
        animation: "skinFade 500ms ease-out",
      }}
    >
      {/* Chrome */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ borderColor: `${loc.primary}22`, background: loc.soft }}
      >
        <div className="text-[13px]" style={{ color: loc.primary, letterSpacing: "0.02em" }}>
          {loc.name}
          <span className="ml-2 opacity-50 text-[10px] uppercase tracking-[0.2em]">
            {loc.language}
          </span>
        </div>
        <div
          className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.22em]"
          style={{ color: `${loc.primary}aa` }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: loc.primary }} />
          Audit live
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
        {/* Left — the query being audited */}
        <div
          className="md:col-span-3 p-5 md:p-7 border-b md:border-b-0 md:border-r"
          style={{ borderColor: `${loc.primary}18` }}
        >
          <div
            className="text-[10px] font-mono tracking-[0.24em] uppercase mb-3"
            style={{ color: `${loc.primary}88` }}
          >
            Sample audited query
          </div>
          <div
            className="text-[18px] md:text-[22px] leading-[1.3] mb-6 text-white"
            style={{ letterSpacing: "-0.01em" }}
          >
            &ldquo;{loc.query}&rdquo;
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div
                className="text-[10px] font-mono tracking-[0.24em] uppercase mb-2"
                style={{ color: `${loc.primary}88` }}
              >
                AI citation
              </div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 border text-[11px] font-mono tracking-[0.16em] uppercase"
                style={{
                  borderColor: cited ? `${loc.primary}77` : "rgba(240,171,252,0.5)",
                  color: cited ? loc.primary : "#f0abfc",
                  background: cited ? loc.soft : "rgba(240,171,252,0.08)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: cited ? loc.primary : "#f0abfc",
                  }}
                />
                {cited ? "Yamaha cited" : "Gap · not cited"}
              </div>
              {!cited ? (
                <div className="mt-3 text-[12px] text-white/60">
                  Winning:{" "}
                  <span className="text-white/85">{loc.winner}</span>
                </div>
              ) : null}
            </div>

            <div>
              <div
                className="text-[10px] font-mono tracking-[0.24em] uppercase mb-2"
                style={{ color: `${loc.primary}88` }}
              >
                Google Ads
              </div>
              <div
                className="text-[16px] font-mono tabular-nums"
                style={{ color: loc.primary, letterSpacing: "-0.01em" }}
              >
                {loc.cpc}
              </div>
              <div className="mt-1 text-[10px] font-mono tracking-[0.14em] text-white/45">
                paired to fill the gap
              </div>
            </div>
          </div>
        </div>

        {/* Right — suggested fix */}
        <div className="md:col-span-2 p-5 md:p-7">
          <div
            className="text-[10px] font-mono tracking-[0.24em] uppercase mb-3"
            style={{ color: `${loc.primary}88` }}
          >
            Suggested fix
          </div>
          <p className="text-[13px] leading-[1.55] text-white/80">
            {loc.fix}
          </p>
          <button
            type="button"
            className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 border transition-colors text-[10px] font-mono tracking-[0.18em] uppercase cursor-default"
            style={{
              borderColor: `${loc.primary}55`,
              color: loc.primary,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: loc.primary }}
            />
            Route to CMS
          </button>
        </div>
      </div>

      <div
        className="px-4 py-2 border-t flex items-center justify-between text-[9px] font-mono tracking-[0.18em] uppercase"
        style={{
          borderColor: `${loc.primary}18`,
          color: `${loc.primary}88`,
        }}
      >
        <span>engine · audit</span>
        <span>locale · {loc.language}</span>
      </div>
    </div>
  )
}

// ── BEAT 5 · discipline tabs (interactive) ──────────────────────────

type Discipline = {
  key: string
  name: string
  headline: string
  frame: string
  cards: { label: string; value: string; delta: string; note: string }[]
}

const DISCIPLINES: Discipline[] = [
  {
    key: "ai",
    name: "Organic · AI citation",
    headline: "Where the brand shows up when shoppers ask ChatGPT.",
    frame: "AI search · live",
    cards: [
      {
        label: "Queries cited",
        value: "62.4%",
        delta: "▲ 8.1 pt / 30d",
        note: "Yamaha in top 3 answers",
      },
      {
        label: "Engines watched",
        value: "5",
        delta: "GPT · Claude · Perp · Gem · AIO",
        note: "Continuous audit",
      },
      {
        label: "Gap → fix cycle",
        value: "Same day",
        delta: "Auto-briefed",
        note: "Content team sees the brief in Notion",
      },
    ],
  },
  {
    key: "sem",
    name: "Paid · Google Ads",
    headline: "Paid reinforces the queries we haven't earned yet.",
    frame: "SEM · daily",
    cards: [
      {
        label: "Gap coverage",
        value: "94%",
        delta: "▲ 12 pt / 30d",
        note: "Uncited queries backed by paid",
      },
      {
        label: "Blended CPA",
        value: "$18.40",
        delta: "▼ 6.2%",
        note: "Long-tail cheaper than head",
      },
      {
        label: "Locale spend split",
        value: "US 48 / EU 34 / JP 18",
        delta: "auto-rebalanced weekly",
        note: "Follows citation gaps",
      },
    ],
  },
  {
    key: "schema",
    name: "Schema · content",
    headline: "The technical fixes that make AI cite you.",
    frame: "Content ops",
    cards: [
      {
        label: "Pages with Course schema",
        value: "412",
        delta: "▲ 87 / 30d",
        note: "en · de · fr · ja",
      },
      {
        label: "HowTo blocks published",
        value: "128",
        delta: "▲ 22 / 30d",
        note: "Per lesson plan",
      },
      {
        label: "Localised briefs shipped",
        value: "63",
        delta: "▲ 18 / 30d",
        note: "Translated + brand-checked",
      },
    ],
  },
]

function BeatDiscipline() {
  const [ref, inView] = useInView(0.2)
  const [active, setActive] = useState(0)
  const disc = DISCIPLINES[active]

  return (
    <section ref={ref} className="relative py-20 md:py-28 border-t border-white/8">
      <BeatLabel n="05" label="Search + AI discovery · one system" />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
        <div className="md:col-span-4">
          <h2 className="text-[22px] md:text-[30px] font-semibold tracking-[-0.02em] leading-[1.15] text-white">
            Organic AI.
            <br />
            <span className="text-white/50">
              Paid Google. One strategy.
            </span>
          </h2>
          <p className="mt-5 text-[14px] md:text-[15px] leading-[1.65] text-white/65 max-w-[420px]">
            The same query universe drives every discipline. Where AI cites
            Yamaha organically, paid can dial back. Where it doesn&rsquo;t,
            paid moves in and the content brief queues for next week.
          </p>
        </div>

        <div className="md:col-span-8">
          {/* Discipline pills */}
          <div
            className="flex gap-2 mb-6 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0"
            style={{ scrollbarWidth: "none" }}
          >
            {DISCIPLINES.map((d, i) => {
              const isActive = i === active
              return (
                <button
                  key={d.key}
                  type="button"
                  onClick={() => setActive(i)}
                  className="snap-start shrink-0 h-11 px-4 border transition-all duration-300"
                  style={{
                    borderColor: isActive ? ACCENT : "rgba(255,255,255,0.15)",
                    background: isActive ? "rgba(167,139,250,0.10)" : "transparent",
                    color: isActive ? ACCENT : "rgba(255,255,255,0.55)",
                  }}
                >
                  <span className="text-[11px] font-mono tracking-[0.16em] uppercase">
                    {d.name}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Framed view */}
          <div
            key={disc.key}
            className="relative border border-white/12 overflow-hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.35) 100%)",
              animation: "skinFade 500ms ease-out",
            }}
          >
            <div className="px-5 md:px-7 py-6 md:py-8 border-b border-white/8">
              <div className="text-[10px] font-mono tracking-[0.24em] uppercase text-white/40 mb-3">
                {disc.frame}
              </div>
              <h3 className="text-[20px] md:text-[26px] font-semibold tracking-[-0.02em] leading-[1.2] text-white max-w-[36ch]">
                {disc.headline}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3">
              {disc.cards.map((card, i) => (
                <div
                  key={card.label}
                  className={`p-5 md:p-6 border-white/8 ${
                    i > 0 ? "border-t md:border-t-0 md:border-l" : ""
                  }`}
                >
                  <div className="text-[9px] font-mono tracking-[0.28em] uppercase text-white/45 mb-3">
                    {card.label}
                  </div>
                  <div
                    className="text-[30px] md:text-[38px] font-semibold tracking-[-0.02em] leading-[1] tabular-nums"
                    style={{ color: ACCENT }}
                  >
                    {card.value}
                  </div>
                  <div className="mt-2 text-[11px] font-mono tracking-[0.12em] text-white/55">
                    {card.delta}
                  </div>
                  <div className="mt-3 text-[12px] leading-[1.5] text-white/60">
                    {card.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── BEAT 6 · live competitor monitor ────────────────────────────────

type Event = {
  competitor: string
  engine: string
  query: string
  verdict: "opportunity" | "risk"
}

const COMPETITORS = ["Skoove", "Simply Piano", "Flowkey", "PianoAcademy", "Yousician"]
const ENGINES = ["ChatGPT", "Perplexity", "Gemini", "Google AIO", "Claude"]
const EVENTS: Event[] = [
  { competitor: "Skoove", engine: "ChatGPT", query: "best online music school for adults", verdict: "opportunity" },
  { competitor: "Simply Piano", engine: "Perplexity", query: "learn piano app kids", verdict: "risk" },
  { competitor: "Flowkey", engine: "Google AIO", query: "online music lessons japan", verdict: "opportunity" },
  { competitor: "Yousician", engine: "Gemini", query: "guitar lessons online beginner", verdict: "risk" },
  { competitor: "Skoove", engine: "Claude", query: "piano fingering technique", verdict: "opportunity" },
  { competitor: "PianoAcademy", engine: "ChatGPT", query: "beste online klavierschule", verdict: "opportunity" },
  { competitor: "Flowkey", engine: "Perplexity", query: "オンライン ピアノ 教室", verdict: "risk" },
]

function BeatMonitor() {
  const [ref, inView] = useInView(0.25)
  const [step, setStep] = useState(0)
  const [log, setLog] = useState<{ id: number; text: string; badge: string; verdict: Event["verdict"] }[]>([])
  const seqRef = useRef(0)

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => {
      setStep((s) => (s + 1) % EVENTS.length)
    }, 3200)
    return () => clearInterval(id)
  }, [inView])

  useEffect(() => {
    if (!inView) return
    const e = EVENTS[step]
    const seq = ++seqRef.current
    setLog((l) =>
      [
        {
          id: seq,
          text: `${e.competitor} cited by ${e.engine} for "${e.query}"`,
          badge: e.verdict === "opportunity" ? "OPP" : "RISK",
          verdict: e.verdict,
        },
        ...l,
      ].slice(0, 5),
    )
  }, [step, inView])

  const currentEvent = EVENTS[step]

  return (
    <section ref={ref} className="relative py-20 md:py-28 border-t border-white/8">
      <BeatLabel n="06" label="Competitor monitor · live" />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
        <div className="md:col-span-4">
          <h2 className="text-[22px] md:text-[30px] font-semibold tracking-[-0.02em] leading-[1.15] text-white">
            Watch competitors move.
            <br />
            <span className="text-white/50">Respond the same day.</span>
          </h2>
          <p className="mt-5 text-[14px] md:text-[15px] leading-[1.65] text-white/65 max-w-[420px]">
            The audit engine watches every competitor across every AI engine
            and every locale. When one of them starts getting cited for a
            query Yamaha targets, the system flags it as an opportunity or a
            risk and briefs the fix.
          </p>
          <p className="mt-3 text-[13px] leading-[1.55] text-white/50 max-w-[420px]">
            The marketing team opens the tool every morning and sees the
            overnight movement.
          </p>
        </div>

        <div className="md:col-span-8">
          <div className="relative border border-white/12 bg-black/40">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.22em] uppercase text-white/55">
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
                monitor · streaming
              </div>
              <div className="text-[9px] font-mono tracking-[0.22em] uppercase text-white/35">
                05 competitors · 05 engines
              </div>
            </div>

            {/* Competitor grid — rows × engines */}
            <div className="p-4 md:p-6">
              <div className="grid grid-cols-[110px_repeat(5,1fr)] gap-[3px] text-[9px] font-mono tracking-[0.14em] uppercase">
                <div />
                {ENGINES.map((eng) => (
                  <div
                    key={eng}
                    className="px-2 py-1 text-center text-white/45 truncate"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    {eng.split(" ")[0]}
                  </div>
                ))}
                {COMPETITORS.map((comp) => (
                  <Fragment key={comp}>
                    <div
                      className="px-2 py-1 text-white/60 truncate"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      {comp}
                    </div>
                    {ENGINES.map((eng) => {
                      const isHot =
                        currentEvent.competitor === comp && currentEvent.engine === eng
                      // Static pseudo-random cell state (deterministic from names)
                      const seed = (comp.length * eng.length) % 4
                      const filled = seed >= 2
                      return (
                        <div
                          key={`${comp}-${eng}`}
                          className="relative h-7 flex items-center justify-center transition-all duration-500"
                          style={{
                            background: isHot
                              ? `${ACCENT}44`
                              : filled
                                ? "rgba(255,255,255,0.05)"
                                : "rgba(255,255,255,0.015)",
                            border: isHot
                              ? `1px solid ${ACCENT}`
                              : "1px solid transparent",
                          }}
                        >
                          {filled ? (
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{
                                background: isHot ? ACCENT : "rgba(255,255,255,0.35)",
                              }}
                            />
                          ) : null}
                          {isHot ? (
                            <span
                              className="absolute inset-0 rounded-sm animate-ping"
                              style={{ background: `${ACCENT}33` }}
                            />
                          ) : null}
                        </div>
                      )
                    })}
                  </Fragment>
                ))}
              </div>
            </div>

            {/* Currently playing */}
            <div className="border-t border-white/10 px-4 md:px-5 py-4">
              <div className="text-[9px] font-mono tracking-[0.24em] uppercase text-white/40 mb-2">
                Latest event
              </div>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span
                  className="text-[10px] font-mono tracking-[0.14em] px-2 py-1 border uppercase"
                  style={{
                    borderColor:
                      currentEvent.verdict === "opportunity"
                        ? `${ACCENT}55`
                        : "rgba(240,171,252,0.5)",
                    color:
                      currentEvent.verdict === "opportunity" ? ACCENT : "#f0abfc",
                  }}
                >
                  {currentEvent.verdict === "opportunity" ? "Opportunity" : "Risk"}
                </span>
                <span className="text-[13px] md:text-[15px] text-white leading-[1.4]">
                  <span className="text-white/85">{currentEvent.competitor}</span>{" "}
                  cited by{" "}
                  <span className="text-white/85">{currentEvent.engine}</span>{" "}
                  for &ldquo;{currentEvent.query}&rdquo;
                </span>
              </div>
            </div>

            {/* Log */}
            <div className="border-t border-white/10 px-4 md:px-5 py-3 min-h-[124px]">
              <div className="text-[9px] font-mono tracking-[0.24em] uppercase text-white/40 mb-2">
                Overnight movement
              </div>
              <div className="space-y-1 font-mono text-[10px] tracking-[0.05em] leading-[1.6]">
                {log.map((line, i) => (
                  <div
                    key={line.id}
                    className="flex gap-3"
                    style={{
                      opacity: 1 - i * 0.16,
                      color: i === 0 ? ACCENT : "rgba(255,255,255,0.55)",
                    }}
                  >
                    <span
                      className="shrink-0"
                      style={{
                        color: line.verdict === "opportunity" ? ACCENT : "#f0abfc",
                      }}
                    >
                      [{line.badge}]
                    </span>
                    <span className="truncate">{line.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── BEAT 7 · outcomes + quote ───────────────────────────────────────

function BeatOutcomes() {
  const [ref, inView] = useInView(0.3)
  const items = [
    { l: "Locales covered", v: "US · EU · JP", sub: "en · de · fr · ja" },
    { l: "Query universe", v: "8,400+", sub: "watched continuously" },
    { l: "AI engines audited", v: "5", sub: "GPT · Claude · Perp · Gem · AIO" },
    { l: "Response time", v: "Same day", sub: "opportunity to action" },
    { l: "Ownership", v: "In-house", sub: "team runs the tool" },
    { l: "Audit cadence", v: "24 / 7", sub: "continuous" },
  ]
  return (
    <section ref={ref} className="relative py-20 md:py-28 border-t border-white/8">
      <BeatLabel n="07" label="Outcomes" />
      <h2
        className={`text-[24px] md:text-[34px] lg:text-[40px] font-semibold tracking-[-0.02em] leading-[1.15] text-white max-w-[900px] transition-all duration-1000 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        Search plus AI discovery.
        <br />
        <span className="text-white/50">
          Running continuously in every market.
        </span>
      </h2>

      <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10 md:gap-y-14">
        {items.map((m, i) => (
          <div
            key={m.l}
            className={`border-t border-white/15 pt-4 transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
            }`}
            style={{ transitionDelay: `${140 + i * 80}ms` }}
          >
            <div className="text-[9px] font-mono tracking-[0.28em] uppercase text-white/45 mb-2">
              {m.l}
            </div>
            <div
              className="text-[28px] md:text-[36px] font-semibold tracking-[-0.02em] leading-[1] tabular-nums"
              style={{ color: ACCENT }}
            >
              {m.v}
            </div>
            <div className="mt-2 text-[11px] font-mono tracking-[0.14em] uppercase text-white/45">
              {m.sub}
            </div>
          </div>
        ))}
      </div>

      <figure
        className="mt-16 md:mt-20 border-l-2 pl-5 md:pl-8"
        style={{ borderColor: ACCENT }}
      >
        <blockquote
          className="font-semibold tracking-[-0.02em] leading-[1.2] text-white max-w-[820px]"
          style={{ fontSize: "clamp(22px, 2.6vw, 32px)" }}
        >
          &ldquo;We used to guess what parents were asking AI about music
          school. Now we see it live, in every market, and our team runs the
          system themselves.&rdquo;
        </blockquote>
        <figcaption className="mt-5 flex items-center gap-3 text-[10px] font-mono tracking-[0.24em] uppercase text-white/50">
          <span
            className="w-6 h-px"
            style={{ background: ACCENT }}
          />
          Head of Global Marketing, Yamaha Music School
        </figcaption>
      </figure>
    </section>
  )
}

// ── BEAT NAV · sticky mini-rail ─────────────────────────────────────

const BEATS = [
  { id: "y-hero", label: "Hero" },
  { id: "y-setup", label: "Setup" },
  { id: "y-core", label: "Core" },
  { id: "y-locale", label: "Locales" },
  { id: "y-disc", label: "Disciplines" },
  { id: "y-monitor", label: "Monitor" },
  { id: "y-out", label: "Outcomes" },
]

function BeatNav() {
  const [active, setActive] = useState("y-hero")

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
      },
    )
    BEATS.forEach((b) => {
      const el = document.getElementById(b.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <>
      {/* Sticky pill row — sticks only within this case's section
          so the Lumen nav hands off cleanly when the reader arrives. */}
      <nav
        aria-label="Yamaha case navigation"
        className="sticky top-12 z-30 -mx-6 md:-mx-10 lg:-mx-16 bg-[var(--2pt-black)]/95 border-b border-white/10"
        style={{ backdropFilter: "blur(8px)" }}
      >
        <div
          className="flex gap-2 overflow-x-auto px-4 py-2.5 no-scrollbar"
          style={{ scrollbarWidth: "none" }}
        >
          {BEATS.map((b, i) => {
            const isActive = active === b.id
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => scrollTo(b.id)}
                className="shrink-0 h-8 px-3 border transition-all duration-300"
                style={{
                  borderColor: isActive ? ACCENT : "rgba(255,255,255,0.15)",
                  background: isActive
                    ? "rgba(167,139,250,0.10)"
                    : "transparent",
                  color: isActive ? ACCENT : "rgba(255,255,255,0.55)",
                }}
              >
                <span className="text-[10px] font-mono tracking-[0.16em] uppercase">
                  {String(i + 1).padStart(2, "0")} · {b.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}

// ── main ────────────────────────────────────────────────────────────

export function YamahaCase({ c }: { c: CaseData }) {
  return (
    <>
      <BeatNav />
      <div className="relative">
        <div id="y-hero" className="scroll-mt-28">
          <BeatHero c={c} />
        </div>
        <div id="y-setup" className="scroll-mt-28">
          <BeatSetup />
        </div>
        <div id="y-core" className="scroll-mt-28">
          <BeatCore />
        </div>
        <div id="y-locale" className="scroll-mt-28">
          <BeatLocale />
        </div>
        <div id="y-disc" className="scroll-mt-28">
          <BeatDiscipline />
        </div>
        <div id="y-monitor" className="scroll-mt-28">
          <BeatMonitor />
        </div>
        <div id="y-out" className="scroll-mt-28">
          <BeatOutcomes />
        </div>
      </div>
    </>
  )
}
