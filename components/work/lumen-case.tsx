"use client"

/**
 * LumenCase — bespoke long-scroll case study for the NY VC portfolio
 * customer-intelligence engagement. Seven beats stacked vertically:
 *
 *   1. Hero            — headline claim + live counters
 *   2. Setup           — the portfolio problem
 *   3. Core            — one engine, seven tenants (SVG hub-and-spoke)
 *   4. Skinnable       — interactive: same dashboard, four brand skins
 *   5. Per-person      — interactive: same data, three role framings
 *   6. Symbiotic       — live vignette: experiment propagates across brands
 *   7. Outcomes        — the numbers
 *
 * All timers gated on IntersectionObserver so nothing burns CPU off-screen.
 * Mobile-first: interactive toggles are flick-scroll pill rows with snap;
 * the SVG diagrams scale down cleanly at 375px.
 */

import { useEffect, useMemo, useRef, useState } from "react"

type CaseData = {
  slug: string
  client: string
  sector: string
  year: string
  title: string
}

const ACCENT = "#22d3ee"

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
  const [tenants, setTenants] = useState(0)
  const [experiments, setExperiments] = useState(0)

  useEffect(() => {
    if (!inView) return
    setNow(new Date())
    const clock = setInterval(() => setNow(new Date()), 1000)
    // Count-up to real values
    let t = 0
    let e = 0
    const grow = setInterval(() => {
      t = Math.min(7, t + 1)
      e = Math.min(2847, e + 89)
      setTenants(t)
      setExperiments(e)
      if (t === 7 && e >= 2847) clearInterval(grow)
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
    <section ref={ref} className="relative pt-16 md:pt-24 pb-20 md:pb-28">
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
        <span>Case 01 / 01</span>
        <span className="text-white/25">·</span>
        <span>{c.year}</span>
        <span className="text-white/25">·</span>
        <span>{c.client}</span>
        <span className="text-white/25">·</span>
        <span className="tabular-nums">rt {rt}</span>
      </div>

      {/* HUGE title */}
      <h1
        className={`text-[36px] sm:text-[52px] md:text-[74px] lg:text-[92px] font-semibold tracking-[-0.04em] leading-[0.95] text-white transition-all duration-1000 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        One brain across
        <br />
        <span className="text-white/50">the portfolio.</span>
      </h1>

      {/* Sub-line */}
      <p
        className={`mt-8 md:mt-12 max-w-[780px] text-[15px] md:text-[18px] leading-[1.55] text-white/70 transition-opacity duration-1000 ${
          inView ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "260ms" }}
      >
        A New York venture firm asked us to build a central customer brain
        across their D2C portfolio. Every brand gets the deepest view of their
        own customer they&rsquo;ve ever had, and chooses per experiment whether
        to share the learning with the rest of the portfolio or keep it in
        house. Rolled in eight weeks.
      </p>

      {/* Live counters row */}
      <div
        className={`mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 transition-opacity duration-1000 ${
          inView ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "500ms" }}
      >
        {[
          { l: "Brands live", v: tenants.toString(), sub: "portfolio" },
          { l: "Rollout", v: "8", sub: "weeks" },
          { l: "Experiments logged", v: experiments.toLocaleString(), sub: "since launch" },
          { l: "Cross-brand plays", v: "Continuous", sub: "mesh active" },
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
          A portfolio of brands.
          <br />
          <span className="text-white/50">
            No shared brain. No shared learning.
          </span>
        </h2>
        <div
          className={`md:col-span-5 space-y-4 text-[14px] md:text-[15px] leading-[1.65] text-white/65 transition-opacity duration-1000 ${
            inView ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "220ms" }}
        >
          <p>
            Every brand in the portfolio was building its own view of the
            customer. Different tools, different definitions, different
            dashboards. When one brand cracked a retention loop, the others
            paid to learn it again from scratch.
          </p>
          <p>
            Founders got siloed reports. Marketers got dashboards that ignored
            their day-to-day. The fund saw retrospective decks instead of a
            live picture.
          </p>
          <p className="text-white/45 text-[13px] italic">
            The constraint was not data. It was a central brain the whole
            portfolio could share, that still felt native inside each brand.
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
            One brain.
            <br />
            <span className="text-white/50">Every brand plugs in.</span>
          </h2>
          <p className="mt-5 text-[14px] md:text-[15px] leading-[1.65] text-white/65 max-w-[440px]">
            The intelligence sits in the middle. Every brand plugs in their
            own stack and gets their own tenant on the same shared brain.
          </p>
          <ul className="mt-8 space-y-3 text-[12px] font-mono tracking-[0.06em] text-white/55">
            <li className="flex items-start gap-3">
              <span className="text-white/25 mt-0.5">›</span>
              Shopify · Recharge · Klaviyo · Segment
            </li>
            <li className="flex items-start gap-3">
              <span className="text-white/25 mt-0.5">›</span>
              Meta · TikTok · Google Ads
            </li>
            <li className="flex items-start gap-3">
              <span className="text-white/25 mt-0.5">›</span>
              Zendesk · Gorgias · Notion
            </li>
            <li className="flex items-start gap-3">
              <span className="text-white/25 mt-0.5">›</span>
              Foundation-model layer
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

function HubSpokeDiagram({ active }: { active: boolean }) {
  const spokes = 7
  return (
    <svg viewBox="0 0 500 400" className="w-full h-full">
      <defs>
        <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.35" />
          <stop offset="70%" stopColor={ACCENT} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Hub glow */}
      <circle cx="250" cy="200" r="80" fill="url(#hub-glow)" />

      {/* Spokes */}
      {Array.from({ length: spokes }).map((_, i) => {
        const angle = (i / spokes) * Math.PI * 2 - Math.PI / 2
        const x = Math.round((250 + Math.cos(angle) * 170) * 100) / 100
        const y = Math.round((200 + Math.sin(angle) * 140) * 100) / 100
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
            {/* Traveling pulse — only when in view */}
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

            {/* Node */}
            <circle cx={x} cy={y} r={12} fill="rgba(10,10,10,1)" stroke={ACCENT} strokeWidth={1} />
            <text
              x={x}
              y={y + 4}
              textAnchor="middle"
              fill={ACCENT}
              fontSize={10}
              fontFamily="ui-monospace, monospace"
            >
              0{i + 1}
            </text>
          </g>
        )
      })}

      {/* Hub */}
      <circle cx="250" cy="200" r="34" fill="rgba(10,10,10,1)" stroke={ACCENT} strokeWidth={1.5} />
      <text
        x="250"
        y="197"
        textAnchor="middle"
        fill="white"
        fontSize={9}
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.15em"
      >
        CORE
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

// ── BEAT 4 · skinnable (interactive) ────────────────────────────────

type BrandSkin = {
  key: string
  name: string
  category: string
  primary: string
  soft: string
  font: string
  voice: string
  metric: { label: string; value: string; delta: string }
  cohorts: { name: string; pct: number }[]
}

const SKINS: BrandSkin[] = [
  {
    key: "nightingale",
    name: "Nightingale",
    category: "Bedding · sleep",
    primary: "#c8a97e",
    soft: "rgba(200,169,126,0.12)",
    font: "'Cormorant Garamond', ui-serif, Georgia, serif",
    voice: "Slow, warm, considered.",
    metric: { label: "Repeat sleepers", value: "38.4%", delta: "+2.1 pt / 30d" },
    cohorts: [
      { name: "Insomnia buyers", pct: 62 },
      { name: "Gift purchases", pct: 41 },
      { name: "Winter refresh", pct: 33 },
      { name: "Bundle buyers", pct: 28 },
    ],
  },
  {
    key: "coldsmith",
    name: "Coldsmith",
    category: "Cold-brew coffee",
    primary: "#7dd3a1",
    soft: "rgba(125,211,161,0.14)",
    font: "'JetBrains Mono', ui-monospace, monospace",
    voice: "Direct, technical, brewer-first.",
    metric: { label: "Subscription share", value: "51.7%", delta: "+4.0 pt / 30d" },
    cohorts: [
      { name: "Morning ritual", pct: 71 },
      { name: "Office bulk", pct: 44 },
      { name: "Gift & sampler", pct: 22 },
      { name: "Weekend batch", pct: 39 },
    ],
  },
  {
    key: "verre",
    name: "Verre",
    category: "Glassware · table",
    primary: "#f5f1e8",
    soft: "rgba(245,241,232,0.10)",
    font: "'Playfair Display', ui-serif, Georgia, serif",
    voice: "Editorial, spare, gallery.",
    metric: { label: "Set attach rate", value: "2.3×", delta: "+0.4 / 30d" },
    cohorts: [
      { name: "Registry", pct: 58 },
      { name: "Editorial referral", pct: 33 },
      { name: "Set collectors", pct: 47 },
      { name: "Trade & designer", pct: 19 },
    ],
  },
  {
    key: "kelpwell",
    name: "Kelpwell",
    category: "Supplements · wellness",
    primary: "#5ea9c7",
    soft: "rgba(94,169,199,0.14)",
    font: "'Inter', ui-sans-serif, system-ui",
    voice: "Clinical, plain, evidence-led.",
    metric: { label: "90-day compliance", value: "68.2%", delta: "+3.4 pt / 30d" },
    cohorts: [
      { name: "Post-workout stack", pct: 54 },
      { name: "Immunity refill", pct: 46 },
      { name: "First-order trial", pct: 71 },
      { name: "Gifting", pct: 12 },
    ],
  },
]

function BeatSkinnable() {
  const [ref, inView] = useInView(0.2)
  const [active, setActive] = useState(0)
  const skin = SKINS[active]

  // Auto-rotate the skin every 4.5s until the user interacts, then stop.
  const [autoAdvance, setAutoAdvance] = useState(true)
  useEffect(() => {
    if (!inView || !autoAdvance) return
    const id = setInterval(() => setActive((a) => (a + 1) % SKINS.length), 4500)
    return () => clearInterval(id)
  }, [inView, autoAdvance])

  return (
    <section ref={ref} className="relative py-20 md:py-28 border-t border-white/8">
      <BeatLabel n="04" label="Same brain · four faces" />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
        <div className="md:col-span-4">
          <h2 className="text-[22px] md:text-[30px] font-semibold tracking-[-0.02em] leading-[1.15] text-white">
            One brain.
            <br />
            <span className="text-white/50">Native inside every brand.</span>
          </h2>
          <p className="mt-5 text-[14px] md:text-[15px] leading-[1.65] text-white/65 max-w-[420px]">
            Flick through the tenants. Chrome, type, tone and colour switch;
            the underlying brain stays the same. Every brand opens what feels
            like a product built for them.
          </p>
          <p className="mt-4 text-[11px] font-mono tracking-[0.16em] uppercase text-white/35">
            {autoAdvance ? "auto-cycling · tap to lock" : "locked · tap another to change"}
          </p>
        </div>

        <div className="md:col-span-8">
          {/* Pill row — flickable on mobile with snap */}
          <div
            className="flex gap-2 mb-5 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0 no-scrollbar"
            style={{ scrollbarWidth: "none" }}
          >
            {SKINS.map((s, i) => {
              const isActive = i === active
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => {
                    setActive(i)
                    setAutoAdvance(false)
                  }}
                  className="snap-start shrink-0 h-11 px-4 border transition-all duration-300"
                  style={{
                    borderColor: isActive ? s.primary : "rgba(255,255,255,0.15)",
                    background: isActive ? s.soft : "transparent",
                    color: isActive ? s.primary : "rgba(255,255,255,0.55)",
                  }}
                >
                  <span className="flex items-center gap-2.5 text-[11px] font-mono tracking-[0.16em] uppercase">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: s.primary }}
                    />
                    {s.name}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Skinned dashboard mock */}
          <SkinnedDashboard skin={skin} />
        </div>
      </div>
    </section>
  )
}

function SkinnedDashboard({ skin }: { skin: BrandSkin }) {
  return (
    <div
      key={skin.key}
      className="relative border overflow-hidden"
      style={{
        borderColor: `${skin.primary}44`,
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.4) 100%)",
        animation: "skinFade 500ms ease-out",
      }}
    >
      {/* Faux chrome bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{
          borderColor: `${skin.primary}22`,
          background: skin.soft,
        }}
      >
        <div
          className="text-[13px]"
          style={{ fontFamily: skin.font, color: skin.primary, letterSpacing: "0.02em" }}
        >
          {skin.name}
          <span className="ml-2 opacity-50 text-[10px] uppercase tracking-[0.2em]">
            {skin.category}
          </span>
        </div>
        <div
          className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.22em]"
          style={{ color: `${skin.primary}aa` }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: skin.primary }} />
          Tenant live
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
        {/* Left: hero metric */}
        <div
          className="md:col-span-2 p-5 md:p-7 border-b md:border-b-0 md:border-r"
          style={{ borderColor: `${skin.primary}18` }}
        >
          <div
            className="text-[10px] font-mono tracking-[0.24em] uppercase mb-3"
            style={{ color: `${skin.primary}88` }}
          >
            {skin.metric.label}
          </div>
          <div
            className="text-[42px] md:text-[52px] leading-[0.95] tabular-nums"
            style={{ fontFamily: skin.font, color: skin.primary, letterSpacing: "-0.03em" }}
          >
            {skin.metric.value}
          </div>
          <div
            className="mt-2 text-[11px] font-mono tracking-[0.14em]"
            style={{ color: `${skin.primary}bb` }}
          >
            ▲ {skin.metric.delta}
          </div>
          <div
            className="mt-8 text-[12px] leading-[1.55]"
            style={{ fontFamily: skin.font, color: "rgba(255,255,255,0.55)" }}
          >
            Voice guide. {skin.voice}
          </div>
        </div>

        {/* Right: cohorts */}
        <div className="md:col-span-3 p-5 md:p-7">
          <div
            className="text-[10px] font-mono tracking-[0.24em] uppercase mb-4"
            style={{ color: `${skin.primary}88` }}
          >
            Cohorts this week
          </div>
          <div className="space-y-3">
            {skin.cohorts.map((co) => (
              <div key={co.name} className="grid grid-cols-[1fr_auto] gap-4 items-center">
                <div>
                  <div
                    className="text-[12px] mb-1"
                    style={{ fontFamily: skin.font, color: "white" }}
                  >
                    {co.name}
                  </div>
                  <div className="h-[3px] w-full bg-white/8 overflow-hidden">
                    <div
                      className="h-full transition-all duration-700"
                      style={{
                        width: `${co.pct}%`,
                        background: skin.primary,
                      }}
                    />
                  </div>
                </div>
                <div
                  className="text-[11px] font-mono tabular-nums"
                  style={{ color: `${skin.primary}dd` }}
                >
                  {co.pct}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer status bar */}
      <div
        className="px-4 py-2 border-t flex items-center justify-between text-[9px] font-mono tracking-[0.18em] uppercase"
        style={{
          borderColor: `${skin.primary}18`,
          color: `${skin.primary}88`,
        }}
      >
        <span>engine · core</span>
        <span>skin · {skin.key}</span>
      </div>
    </div>
  )
}

// ── BEAT 5 · per-role (interactive) ─────────────────────────────────

type Role = {
  key: string
  name: string
  headline: string
  frame: string
  cards: { label: string; value: string; delta: string; note: string }[]
}

const ROLES: Role[] = [
  {
    key: "marketer",
    name: "Growth marketer",
    headline: "Which cohort is worth another dollar today?",
    frame: "Working view · daily",
    cards: [
      {
        label: "CAC · new customer",
        value: "$38.20",
        delta: "▼ 4.1% w/w",
        note: "Best cohort: post-recipe visit",
      },
      {
        label: "Payback · 30-day",
        value: "72%",
        delta: "▲ 6 pt",
        note: "TikTok winning creative pack",
      },
      {
        label: "Repeat within 45d",
        value: "31.4%",
        delta: "▲ 1.8 pt",
        note: "Nightingale winter cohort",
      },
    ],
  },
  {
    key: "founder",
    name: "Founder",
    headline: "Am I building a business, or renting an audience?",
    frame: "Weekly review",
    cards: [
      {
        label: "Weeks of runway · organic",
        value: "18.4",
        delta: "▲ 1.6 wk",
        note: "Owned traffic share climbing",
      },
      {
        label: "Contribution margin",
        value: "34.7%",
        delta: "▲ 0.9 pt",
        note: "Bundle mix improving",
      },
      {
        label: "NPS 90-day rolling",
        value: "58",
        delta: "▲ 4",
        note: "Post-purchase flow rework",
      },
    ],
  },
  {
    key: "board",
    name: "Board / GP",
    headline: "Is this brand pulling its weight in the fund?",
    frame: "Monthly · portfolio-relative",
    cards: [
      {
        label: "Contribution to fund IRR",
        value: "1.42×",
        delta: "▲ 0.06×",
        note: "Top quartile of cohort",
      },
      {
        label: "Rank in portfolio · growth",
        value: "3 / 12",
        delta: "▲ 1 rank",
        note: "Vs. prior month",
      },
      {
        label: "Follow-on signal",
        value: "Green",
        delta: "Sustained",
        note: "Three cycles of clean growth",
      },
    ],
  },
]

function BeatPerRole() {
  const [ref, inView] = useInView(0.2)
  const [active, setActive] = useState(0)
  const role = ROLES[active]

  return (
    <section ref={ref} className="relative py-20 md:py-28 border-t border-white/8">
      <BeatLabel n="05" label="Same data · three lenses" />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
        <div className="md:col-span-4">
          <h2 className="text-[22px] md:text-[30px] font-semibold tracking-[-0.02em] leading-[1.15] text-white">
            The marketer, the founder,
            <br />
            <span className="text-white/50">and the board see it differently.</span>
          </h2>
          <p className="mt-5 text-[14px] md:text-[15px] leading-[1.65] text-white/65 max-w-[420px]">
            Same underlying data. Each role gets it framed for the decision
            they actually make. Nobody scrolls past somebody else&rsquo;s view.
          </p>
        </div>

        <div className="md:col-span-8">
          {/* Role pills */}
          <div
            className="flex gap-2 mb-6 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0"
            style={{ scrollbarWidth: "none" }}
          >
            {ROLES.map((r, i) => {
              const isActive = i === active
              return (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => setActive(i)}
                  className="snap-start shrink-0 h-11 px-4 border transition-all duration-300"
                  style={{
                    borderColor: isActive ? ACCENT : "rgba(255,255,255,0.15)",
                    background: isActive ? "rgba(34,211,238,0.10)" : "transparent",
                    color: isActive ? ACCENT : "rgba(255,255,255,0.55)",
                  }}
                >
                  <span className="text-[11px] font-mono tracking-[0.16em] uppercase">
                    {r.name}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Framed view */}
          <div
            key={role.key}
            className="relative border border-white/12 overflow-hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.35) 100%)",
              animation: "skinFade 500ms ease-out",
            }}
          >
            <div className="px-5 md:px-7 py-6 md:py-8 border-b border-white/8">
              <div className="text-[10px] font-mono tracking-[0.24em] uppercase text-white/40 mb-3">
                {role.frame}
              </div>
              <h3 className="text-[20px] md:text-[26px] font-medium tracking-[-0.02em] leading-[1.2] text-white max-w-[36ch]">
                {role.headline}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3">
              {role.cards.map((card, i) => (
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

// ── BEAT 6 · symbiotic learning (live vignette) ─────────────────────

type Play = {
  source: string
  play: string
  targets: number[]
}

// Nodes laid out around a circle. 7 brands.
const NODES = [
  { key: "nightingale", label: "Nightingale", short: "NGT" },
  { key: "coldsmith", label: "Coldsmith", short: "CLD" },
  { key: "verre", label: "Verre", short: "VRE" },
  { key: "kelpwell", label: "Kelpwell", short: "KLP" },
  { key: "prairie", label: "Prairie", short: "PRR" },
  { key: "junco", label: "Junco", short: "JNC" },
  { key: "meridian", label: "Meridian", short: "MRD" },
]

const PLAYS: Play[] = [
  { source: "coldsmith", play: "Day-3 upsell in post-purchase flow", targets: [0, 3, 5] },
  { source: "nightingale", play: "Winter refresh cohort · reactivation", targets: [2, 4] },
  { source: "kelpwell", play: "Trial-to-subscription framing test", targets: [1, 6] },
  { source: "verre", play: "Registry gifting split-test", targets: [0, 4, 6] },
  { source: "junco", play: "SMS-first winback on 45-day silence", targets: [1, 3, 5] },
  { source: "meridian", play: "Bundled shipping threshold at $65", targets: [0, 1, 2, 5] },
]

function BeatSymbiotic() {
  const [ref, inView] = useInView(0.25)
  const [step, setStep] = useState(0)
  const [log, setLog] = useState<{ id: number; text: string; brand: string }[]>([])
  const logSeqRef = useRef(0)

  useEffect(() => {
    if (!inView) return
    const id = setInterval(() => {
      setStep((s) => (s + 1) % PLAYS.length)
    }, 3600)
    return () => clearInterval(id)
  }, [inView])

  useEffect(() => {
    if (!inView) return
    const p = PLAYS[step]
    const sourceNode = NODES.find((n) => n.key === p.source)
    if (!sourceNode) return
    const seq = ++logSeqRef.current
    setLog((l) =>
      [
        {
          id: seq,
          text: `learned · ${p.play}`,
          brand: sourceNode.short,
        },
        ...l,
      ].slice(0, 6),
    )
    const t = setTimeout(() => {
      const targetNames = p.targets
        .map((i) => NODES[i]?.short)
        .filter(Boolean)
        .join(", ")
      const nextSeq = ++logSeqRef.current
      setLog((l) =>
        [
          {
            id: nextSeq,
            text: `suggested → ${targetNames}`,
            brand: sourceNode.short,
          },
          ...l,
        ].slice(0, 6),
      )
    }, 1400)
    return () => clearTimeout(t)
  }, [step, inView])

  const current = PLAYS[step]
  const sourceIdx = NODES.findIndex((n) => n.key === current.source)

  // Compute node positions on a circle
  const cx = 250
  const cy = 220
  const r = 150
  const nodePos = NODES.map((_, i) => {
    const angle = (i / NODES.length) * Math.PI * 2 - Math.PI / 2
    const round = (n: number) => Math.round(n * 100) / 100
    return { x: round(cx + Math.cos(angle) * r), y: round(cy + Math.sin(angle) * r) }
  })

  return (
    <section ref={ref} className="relative py-20 md:py-28 border-t border-white/8">
      <BeatLabel n="06" label="Portfolio learning · opt in per brand" />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
        <div className="md:col-span-4">
          <h2 className="text-[22px] md:text-[30px] font-semibold tracking-[-0.02em] leading-[1.15] text-white">
            Share the learning
            <br />
            <span className="text-white/50">or keep it in house.</span>
          </h2>
          <p className="mt-5 text-[14px] md:text-[15px] leading-[1.65] text-white/65 max-w-[420px]">
            Every brand chooses per experiment whether the learning stays
            private or joins the portfolio pool. When a shared experiment
            lands, the central brain matches the audience shape against every
            other brand and surfaces the winning play as a suggestion where
            it&rsquo;s likely to work.
          </p>
          <p className="mt-3 text-[13px] leading-[1.55] text-white/50 max-w-[420px]">
            The data never travels. Only the plays do, and only the ones a
            brand chose to share.
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
                mesh · streaming
              </div>
              <div className="text-[9px] font-mono tracking-[0.22em] uppercase text-white/35">
                07 tenants
              </div>
            </div>

            {/* SVG mesh */}
            <div className="relative aspect-[5/4] md:aspect-[5/3]">
              <svg viewBox="0 0 500 440" className="w-full h-full">
                {/* All inter-node faint lines */}
                {NODES.map((_, i) =>
                  NODES.slice(i + 1).map((_, j) => {
                    const jj = i + 1 + j
                    return (
                      <line
                        key={`${i}-${jj}`}
                        x1={nodePos[i].x}
                        y1={nodePos[i].y}
                        x2={nodePos[jj].x}
                        y2={nodePos[jj].y}
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth={1}
                      />
                    )
                  }),
                )}

                {/* Active source → target highlights */}
                {inView &&
                  current.targets.map((tIdx) => {
                    const s = nodePos[sourceIdx]
                    const t = nodePos[tIdx]
                    return (
                      <g key={`beam-${sourceIdx}-${tIdx}-${step}`}>
                        <line
                          x1={s.x}
                          y1={s.y}
                          x2={t.x}
                          y2={t.y}
                          stroke={ACCENT}
                          strokeWidth={1}
                          opacity={0.5}
                        />
                        <circle r="3.5" fill={ACCENT}>
                          <animateMotion
                            dur="1.6s"
                            begin="0.2s"
                            fill="freeze"
                            path={`M ${s.x} ${s.y} L ${t.x} ${t.y}`}
                          />
                          <animate
                            attributeName="opacity"
                            values="0;1;1;0"
                            keyTimes="0;0.2;0.85;1"
                            dur="1.6s"
                            begin="0.2s"
                            fill="freeze"
                          />
                        </circle>
                      </g>
                    )
                  })}

                {/* Nodes */}
                {NODES.map((n, i) => {
                  const isSource = i === sourceIdx
                  const isTarget = current.targets.includes(i)
                  const nodeColor =
                    isSource || isTarget ? ACCENT : "rgba(255,255,255,0.4)"
                  const nodeSize = isSource ? 22 : isTarget ? 18 : 14
                  return (
                    <g key={n.key}>
                      {isSource ? (
                        <circle
                          cx={nodePos[i].x}
                          cy={nodePos[i].y}
                          r={nodeSize + 8}
                          fill={ACCENT}
                          opacity="0.15"
                        >
                          <animate
                            attributeName="r"
                            values={`${nodeSize + 4};${nodeSize + 14};${nodeSize + 4}`}
                            dur="1.6s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      ) : null}
                      <circle
                        cx={nodePos[i].x}
                        cy={nodePos[i].y}
                        r={nodeSize}
                        fill="rgba(10,10,10,1)"
                        stroke={nodeColor}
                        strokeWidth={isSource ? 1.5 : 1}
                      />
                      <text
                        x={nodePos[i].x}
                        y={nodePos[i].y + 3}
                        textAnchor="middle"
                        fill={nodeColor}
                        fontSize={9}
                        fontFamily="ui-monospace, monospace"
                        letterSpacing="0.1em"
                      >
                        {n.short}
                      </text>
                    </g>
                  )
                })}

                {/* Center label */}
                <text
                  x={cx}
                  y={cy - 4}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.35)"
                  fontSize={9}
                  fontFamily="ui-monospace, monospace"
                  letterSpacing="0.2em"
                >
                  ENGINE
                </text>
                <text
                  x={cx}
                  y={cy + 10}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.25)"
                  fontSize={7}
                  fontFamily="ui-monospace, monospace"
                  letterSpacing="0.2em"
                >
                  match · route
                </text>
                <circle
                  cx={cx}
                  cy={cy}
                  r={30}
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeDasharray="2 3"
                />
              </svg>
            </div>

            {/* Currently playing */}
            <div className="border-t border-white/10 px-4 md:px-5 py-4">
              <div className="text-[9px] font-mono tracking-[0.24em] uppercase text-white/40 mb-2">
                Current play
              </div>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span
                  className="text-[11px] font-mono tracking-[0.14em] px-2 py-1 border"
                  style={{ borderColor: `${ACCENT}55`, color: ACCENT }}
                >
                  {NODES[sourceIdx]?.short}
                </span>
                <span className="text-[14px] md:text-[16px] text-white leading-[1.4]">
                  {current.play}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {current.targets.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] font-mono tracking-[0.18em] uppercase px-2 py-1 border border-white/15 text-white/65"
                  >
                    → {NODES[t]?.short}
                  </span>
                ))}
              </div>
            </div>

            {/* Log */}
            <div className="border-t border-white/10 px-4 md:px-5 py-3 min-h-[124px]">
              <div className="text-[9px] font-mono tracking-[0.24em] uppercase text-white/40 mb-2">
                Suggestion log
              </div>
              <div className="space-y-1 font-mono text-[10px] tracking-[0.05em] leading-[1.6]">
                {log.map((line, i) => (
                  <div
                    key={line.id}
                    className="flex gap-3"
                    style={{
                      opacity: 1 - i * 0.13,
                      color: i === 0 ? ACCENT : "rgba(255,255,255,0.55)",
                    }}
                  >
                    <span className="text-white/35 shrink-0">[{line.brand}]</span>
                    <span>{line.text}</span>
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

// ── BEAT 7 · outcomes ────────────────────────────────────────────────

function BeatOutcomes() {
  const [ref, inView] = useInView(0.3)
  const items = [
    { l: "Brands live", v: "7", sub: "portfolio" },
    { l: "Rollout window", v: "8 wk", sub: "brief → last tenant handed over" },
    { l: "Engineers embedded", v: "1 per brand", sub: "for the eight weeks" },
    { l: "Cross-brand plays", v: "Continuous", sub: "mesh runs 24 / 7" },
    { l: "Experiments logged", v: "2.8k+", sub: "and counting" },
    { l: "Ownership", v: "Each brand", sub: "post-handover" },
  ]
  return (
    <section ref={ref} className="relative py-20 md:py-28 border-t border-white/8">
      <BeatLabel n="07" label="Outcomes" />
      <h2
        className={`text-[24px] md:text-[34px] lg:text-[40px] font-semibold tracking-[-0.02em] leading-[1.15] text-white max-w-[820px] transition-all duration-1000 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        Central brain. Native feel.
        <br />
        <span className="text-white/50">
          Learning that compounds across the whole portfolio.
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

      {/* CMO pull quote — voice of the client, anonymised */}
      <figure
        className="mt-16 md:mt-20 border-l-2 pl-5 md:pl-8"
        style={{ borderColor: ACCENT }}
      >
        <blockquote
          className="font-medium tracking-[-0.02em] leading-[1.2] text-white max-w-[820px]"
          style={{ fontSize: "clamp(22px, 2.6vw, 32px)" }}
        >
          &ldquo;We&rsquo;ve never had this level of detail about our
          customers. And we get to choose what travels to the rest of the
          fund. The plays go, our data stays with us. It has changed how we
          run growth.&rdquo;
        </blockquote>
        <figcaption className="mt-5 flex items-center gap-3 text-[10px] font-mono tracking-[0.24em] uppercase text-white/50">
          <span
            className="w-6 h-px"
            style={{ background: ACCENT }}
          />
          Chief Marketing Officer, portfolio brand
        </figcaption>
      </figure>
    </section>
  )
}

// ── BEAT NAV · sticky mini-rail ─────────────────────────────────────

const BEATS = [
  { id: "b-hero", label: "Hero" },
  { id: "b-setup", label: "Setup" },
  { id: "b-core", label: "Core" },
  { id: "b-skin", label: "Skinnable" },
  { id: "b-role", label: "Per-role" },
  { id: "b-sym", label: "Symbiotic" },
  { id: "b-out", label: "Outcomes" },
]

function BeatNav() {
  const [active, setActive] = useState("b-hero")

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
      {/* Desktop: vertical rail, fixed on the left. Only shows on very wide
          viewports so it never collides with the content column. */}
      <nav
        aria-label="Case section navigation"
        className="hidden 2xl:block fixed left-6 top-1/2 -translate-y-1/2 z-30"
      >
        <ol className="space-y-3">
          {BEATS.map((b, i) => {
            const isActive = active === b.id
            return (
              <li key={b.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(b.id)}
                  className="group flex items-center gap-3"
                >
                  <span
                    className="w-8 h-px transition-all duration-500"
                    style={{
                      background: isActive
                        ? ACCENT
                        : "rgba(255,255,255,0.2)",
                      width: isActive ? "32px" : "16px",
                    }}
                  />
                  <span
                    className="text-[9px] font-mono tracking-[0.22em] uppercase transition-colors duration-300"
                    style={{
                      color: isActive
                        ? ACCENT
                        : "rgba(255,255,255,0.35)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")} · {b.label}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </nav>

      {/* Sticky pill row — every breakpoint except very wide (which gets the rail) */}
      <nav
        aria-label="Case section navigation"
        className="2xl:hidden sticky top-12 z-30 -mx-6 md:-mx-10 lg:-mx-16 bg-[var(--2pt-black)]/95 border-b border-white/10"
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
                    ? "rgba(34,211,238,0.10)"
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

export function LumenCase({ c }: { c: CaseData }) {
  return (
    <>
      <BeatNav />
      <div className="relative">
        <div id="b-hero" className="scroll-mt-28">
          <BeatHero c={c} />
        </div>
        <div id="b-setup" className="scroll-mt-28">
          <BeatSetup />
        </div>
        <div id="b-core" className="scroll-mt-28">
          <BeatCore />
        </div>
        <div id="b-skin" className="scroll-mt-28">
          <BeatSkinnable />
        </div>
        <div id="b-role" className="scroll-mt-28">
          <BeatPerRole />
        </div>
        <div id="b-sym" className="scroll-mt-28">
          <BeatSymbiotic />
        </div>
        <div id="b-out" className="scroll-mt-28">
          <BeatOutcomes />
        </div>
      </div>

      <style>{`
        @keyframes skinFade {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  )
}
