"use client"

/**
 * CaseHero — the case page hero in the same vocabulary as the home hero.
 *
 * Top masthead strip → chip row → HUGE word-by-word title → live data
 * band → full-width signature vignette → tags. Uses each case's own
 * accent (green/cyan/lime/emerald) rather than the homepage green so the
 * page feels owned by the engagement.
 *
 * Lives below /work/[slug]'s server-rendered JSON-LD. The page.tsx
 * shell renders the static breadcrumb + footer + nav + CTA; this client
 * component handles the animated bits.
 */

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import type { CaseStudy } from "@/lib/cases"
import { CaseVignette } from "@/components/work/case-vignette"

/**
 * inView gate — fire `inView=true` once the hero is at least 15%
 * visible. Drives the word-by-word reveal so the animation plays on
 * scroll-in (great for the long-scroll /work page) rather than firing
 * for all four heroes on initial mount, and pauses the runtime clock
 * for off-screen cases.
 */
function useHeroInView() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return { ref, inView }
}

const ACCENT_HEX: Record<CaseStudy["accent"], string> = {
  green: "#4ade80",
  cyan: "#22d3ee",
  lime: "#bef264",
  emerald: "#34d399",
}

// Per-case live-band tuples. Each becomes a column in the live data band
// below the headline (matches the home hero's "today" band feel).
const LIVE_BANDS: Record<
  string,
  Array<{ label: string; value: string; pulse?: boolean }>
> = {
  "yamaha-global-geo": [
    { label: "Markets live", value: "US · EU · JP" },
    { label: "Queries audited / day", value: "412", pulse: true },
    { label: "AI engines covered", value: "5", pulse: true },
    { label: "Schema fixes shipped", value: "118", pulse: true },
  ],
  "amazon-generative-creative": [
    { label: "Variants / week", value: "1,284", pulse: true },
    { label: "Brand-fit pass rate", value: "92%", pulse: true },
    { label: "Live SKUs", value: "42" },
    { label: "Brief → live", value: "Hours" },
  ],
  "kyndryl-marketing-ops": [
    { label: "Regions live", value: "Americas · EMEA · APAC" },
    { label: "Decisions / day", value: "1,840", pulse: true },
    { label: "Strategy scenarios", value: "6", pulse: true },
    { label: "Cycle compression", value: "Days → minutes" },
  ],
  "dreamies-content-conversion": [
    { label: "Cohorts personalised", value: "12", pulse: true },
    { label: "Modules / week", value: "84", pulse: true },
    { label: "Time to publish", value: "Minutes" },
    { label: "Compliance pass", value: "Continuous" },
  ],
  "harken-retail-media": [
    { label: "Networks live", value: "AMZN · WMT · ICA" },
    { label: "Bids / min", value: "1,284", pulse: true },
    { label: "Anomalies caught / day", value: "42", pulse: true },
    { label: "Spend rerouted", value: "Real-time" },
  ],
  "clifford-chance-video-production": [
    { label: "Office coverage", value: "Global" },
    { label: "Briefs routed / week", value: "67", pulse: true },
    { label: "Locales auto-captioned", value: "9", pulse: true },
    { label: "Review cycle", value: "Compressed" },
  ],
}

export function CaseHero({
  case: c,
  caseIndex,
  total,
}: {
  case: CaseStudy
  caseIndex: number
  total: number
}) {
  const { ref, inView } = useHeroInView()
  const [loaded, setLoaded] = useState(false)
  const [time, setTime] = useState<Date | null>(null)

  // Fire the word-by-word reveal once this hero scrolls into view (so on
  // /work, each case animates as the user arrives at it rather than all
  // four animating at once on mount).
  useEffect(() => {
    if (!inView || loaded) return
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [inView, loaded])

  // Runtime clock — only ticks while the hero is in view.
  useEffect(() => {
    if (!inView) return
    setTime(new Date())
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [inView])

  const accent = ACCENT_HEX[c.accent]
  const accentVar = `var(--2pt-${c.accent === "green" ? "green" : "white"})`
  const buildStamp = time
    ? `${time.getFullYear()}.${String(time.getMonth() + 1).padStart(2, "0")}.${String(time.getDate()).padStart(2, "0")}`
    : "—"
  const runtimeClock = time
    ? `${String(time.getHours()).padStart(2, "0")}:${String(time.getMinutes()).padStart(2, "0")}:${String(time.getSeconds()).padStart(2, "0")}`
    : "··:··:··"

  const indexLabel = `${caseIndex.toString().padStart(2, "0")} / ${total.toString().padStart(2, "0")}`
  const liveBand = LIVE_BANDS[c.slug] ?? []

  // Split title into words for word-by-word reveal.
  const titleWords = c.title.split(/(\s+)/) // keep spaces as separators

  return (
    <div ref={ref}>
      {/* TOP MASTHEAD STRIP — case-accent LIVE pulse, index, slug, year.
          Mirrors the home hero's chiseled border-y strip. */}
      <div
        className="relative z-10 border-y border-[var(--2pt-white)]/12"
        style={{
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.04), 0 -1px 0 rgba(255,255,255,0.04)",
        }}
      >
        <div className="flex items-center justify-between gap-4 py-3.5 text-[10px] font-mono tracking-[0.2em] uppercase">
          <div className="flex items-center gap-4 md:gap-6 text-[var(--2pt-white)]/55 min-w-0">
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 hover:text-[var(--2pt-white)] transition-colors duration-300 shrink-0"
            >
              <ArrowLeft className="w-3 h-3" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <span className="flex items-center gap-1.5 shrink-0" style={{ color: accent }}>
              <span className="relative inline-flex">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: accent }}
                />
                <span
                  className="absolute inset-0 w-1.5 h-1.5 rounded-full animate-ping opacity-60"
                  style={{ background: accent }}
                />
              </span>
              Live
            </span>
            <span className="hidden md:inline text-[var(--2pt-white)]/55 truncate">
              {c.slug}
            </span>
            <span className="md:hidden text-[var(--2pt-white)]/55 truncate">
              case {indexLabel}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-5 text-[var(--2pt-white)]/55 shrink-0">
            <span>case {indexLabel}</span>
            <span className="text-[var(--2pt-white)]/20">·</span>
            <span>
              rt{" "}
              <span className="text-[var(--2pt-white)] tabular-nums">
                {runtimeClock}
              </span>
            </span>
            <span className="text-[var(--2pt-white)]/20">·</span>
            <span>{c.year}</span>
          </div>
          <span className="md:hidden text-[var(--2pt-white)]/55 shrink-0 tabular-nums">
            {c.year}
          </span>
        </div>
      </div>

      {/* HERO BODY */}
      <div className="pt-12 md:pt-16 pb-10 md:pb-14">
        {/* Chip row — client chip + runtime report eyebrow + build.
            The client name lives here (and in the top masthead strip).
            The title below carries the hero, not the wordmark. */}
        <div
          className={`flex flex-wrap items-center gap-x-4 gap-y-2.5 mb-8 md:mb-10 transition-opacity duration-1000 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "80ms" }}
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border bg-[var(--2pt-white)]/[0.04] backdrop-blur-sm"
            style={{ borderColor: `${accent}33` }}
          >
            <span
              className="w-1 h-1 rounded-full"
              style={{ background: accent }}
            />
            <span
              className="text-[10px] font-mono tracking-[0.22em] uppercase"
              style={{ color: accent }}
            >
              {c.client}
              {c.brand ? ` · ${c.brand}` : ""}
            </span>
          </span>
          <span className="text-[10px] font-mono tracking-[0.28em] uppercase text-[var(--2pt-white)]/45">
            {c.sector}
          </span>
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--2pt-white)]/45 hidden md:inline">
            Runtime report
          </span>
          <span className="text-[10px] font-mono tracking-[0.2em] text-[var(--2pt-white)]/25 tabular-nums hidden md:inline">
            build {buildStamp}
          </span>
        </div>

        {/* HUGE word-by-word headline — title becomes the cover */}
        <h1 className="mb-10 md:mb-14">
          <span
            className="block text-[52px] sm:text-[80px] md:text-[104px] lg:text-[128px] font-bold tracking-[-0.05em] leading-[0.94] text-[var(--2pt-white)] max-w-[16ch]"
          >
            {titleWords.flatMap((w, i) => {
              if (/^\s+$/.test(w)) return [<span key={`s-${i}`}> </span>]
              return [
                <span
                  key={`w-${i}`}
                  className={`inline-block transition-all duration-[1100ms] ease-out ${
                    loaded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-[0.6em]"
                  }`}
                  style={{ transitionDelay: `${180 + i * 70}ms` }}
                >
                  {w}
                </span>,
              ]
            })}
          </span>
        </h1>

        {/* LIVE TODAY band — 4-column ticking data, same as the home hero */}
        {liveBand.length ? (
          <div
            className={`grid grid-cols-2 md:grid-cols-4 border-y border-[var(--2pt-white)]/12 transition-opacity duration-[1400ms] ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "1100ms" }}
          >
            {liveBand.map((d, i) => (
              <div
                key={i}
                className={`py-5 md:py-7 px-2 md:px-0 ${
                  i > 0
                    ? "md:border-l border-[var(--2pt-white)]/12 md:pl-8"
                    : "md:pr-8"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <span
                    className={`w-1 h-1 rounded-full ${
                      d.pulse ? "animate-pulse" : ""
                    }`}
                    style={{
                      background: d.pulse ? accent : "rgba(255,255,255,0.3)",
                    }}
                  />
                  <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-[var(--2pt-white)]/55 truncate">
                    {d.label}
                  </span>
                </div>
                <div
                  className="text-[18px] md:text-[22px] lg:text-[26px] font-medium text-[var(--2pt-white)] tabular-nums tracking-tight leading-none"
                >
                  {d.value}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* FULL-WIDTH VIGNETTE — the signature motion piece */}
      <div
        className={`relative mb-10 md:mb-14 transition-all duration-1000 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "1300ms" }}
      >
        <div className="aspect-[4/5] sm:aspect-[16/10] md:aspect-[21/8] lg:aspect-[21/7] w-full">
          <CaseVignette case={c} />
        </div>
      </div>

      {/* TAGS — the work, alluded to */}
      <div
        className={`flex flex-wrap gap-2 mb-12 md:mb-16 transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "1500ms" }}
      >
        {c.tags.map((t) => (
          <span
            key={t}
            className="inline-flex items-center px-3 py-1.5 text-[10px] md:text-[11px] font-mono tracking-[0.18em] uppercase text-[var(--2pt-white)]/80 border border-[var(--2pt-white)]/15 bg-[var(--2pt-white)]/[0.03] rounded-sm"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
