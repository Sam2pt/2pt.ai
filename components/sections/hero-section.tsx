"use client"

import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

/**
 * Hero — editorial cover, dark canvas edition.
 *
 * Switched from white/offwhite to a black canvas with white type and a
 * single green accent, matching the mobile DeployConsole hero card. The
 * background carries a slowly-streaming faint "deploy log" of lines so
 * the page feels like a control plane watching real systems, not a
 * static brochure. The headline keeps the word-by-word reveal and the
 * live data band is preserved underneath.
 *
 * Top strip: LIVE indicator · masthead label · timezones.
 * Anthropic Partner chip just below the strip.
 * Headline: "We deploy production AI" + green verdict line "inside marketing teams."
 * Live "today" 4-column data band.
 * Subhead + CTA + Anthropic mention.
 * Bottom strip: node routes + scroll cue.
 */

function useTime() {
  const [t, setT] = useState<Date | null>(null)
  useEffect(() => {
    setT(new Date())
    const i = setInterval(() => setT(new Date()), 1000)
    return () => clearInterval(i)
  }, [])
  return t
}

function useCounter(start: number, intervalMs: number, step = 1) {
  const [v, setV] = useState(start)
  useEffect(() => {
    const id = setInterval(() => setV((x) => x + step), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs, step])
  return v
}

function useFluctuating(base: number, amplitude: number, intervalMs: number) {
  const [v, setV] = useState(base)
  useEffect(() => {
    const id = setInterval(() => {
      setV((prev) => {
        const drift = (Math.random() - 0.5) * amplitude * 0.4
        const pull = (base - prev) * 0.15
        return Math.round(prev + drift + pull)
      })
    }, intervalMs)
    return () => clearInterval(id)
  }, [base, amplitude, intervalMs])
  return v
}

const fmtTime = (t: Date | null, tz: "America/New_York" | "Europe/London") =>
  t
    ? t.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: tz,
      })
    : "··:··"

// Faint streaming deploy log — same vocabulary as the mobile hero card.
// Lines cycle in the background so the page feels alive.
const LOG_TEMPLATES = [
  "[ok] retail-media-bidder/amazon.us deployed",
  "[ok] segment-scorer/q4-cohort built",
  "[ok] creative-scorer.brand-fit promoted v-03",
  "[ok] compliance.sentiment scanned 2,847 assets",
  "[ok] efficiency.anomaly caught $14,200 waste",
  "[run] bid-loop walmart.us · 21 bids/s",
  "[run] segment-watch · 6 cohorts active",
  "[promote] hero·carousel·usage → 8.9 score",
  "[scan] dm·nyc-promo · pass",
  "[transfer] system handover · 14% complete",
  "[deploy] node.nyc-447 healthy · 42ms p95",
  "[deploy] node.ldn-45 healthy · 38ms p95",
  "[ok] chedder.audit batch_47 · 88% cited",
  "[ok] lumen.cohorts refreshed · 1.4M scored",
]

export function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const time = useTime()

  // Live counters
  const systemsLive = 47
  const variantsShippedToday = useCounter(1847, 9000, 1)
  const anomaliesCaughtToday = useCounter(18, 42000, 1)
  const bidsPerMin = useFluctuating(1284, 80, 2400)

  // Streaming deploy log — one line every ~900ms once mounted, kept to 18.
  const [logs, setLogs] = useState<string[]>([])
  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      setLogs((prev) =>
        [...prev, LOG_TEMPLATES[i % LOG_TEMPLATES.length]].slice(-18),
      )
      i++
    }, 900)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  const buildStamp = time
    ? `${time.getFullYear()}.${String(time.getMonth() + 1).padStart(2, "0")}.${String(time.getDate()).padStart(2, "0")}`
    : "—"

  return (
    <section className="relative min-h-screen flex flex-col bg-[var(--2pt-black)] text-[var(--2pt-white)] overflow-hidden">
      {/* Green wash anchor — bottom-right, mirrors the mobile hero */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 82% 75%, rgba(74,222,128,0.20) 0%, rgba(74,222,128,0.06) 35%, transparent 65%)",
        }}
      />

      {/* Second wash — small green halo top-left so the canvas isn't dead-flat */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 35% at 12% 18%, rgba(74,222,128,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Streaming deploy log — faint mono lines running along the right
          edge as background texture. Same trick as the mobile hero, scaled
          wider for the desktop canvas. */}
      <div
        aria-hidden
        className="hidden lg:block absolute right-10 top-32 bottom-32 w-[420px] xl:w-[520px] font-mono text-[11px] leading-[1.85] uppercase tracking-[0.08em] text-[var(--2pt-white)]/[0.10] pointer-events-none overflow-hidden text-right"
      >
        {logs.map((line, i) => (
          <div
            key={`${line}-${i}`}
            style={{
              opacity: 0.25 + (i / logs.length) * 0.75,
              animation: "fadeInUp 600ms cubic-bezier(0.16,1,0.3,1) both",
            }}
          >
            {line}
          </div>
        ))}
      </div>

      {/* Single hairline accent — green rule down the left edge */}
      <div
        aria-hidden
        className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-[var(--2pt-green)]/55 to-transparent pointer-events-none"
      />

      {/* TOP MASTHEAD STRIP */}
      <div
        className="relative z-10 border-b border-[var(--2pt-white)]/12 pt-14 md:pt-16"
        style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.04)" }}
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-3.5 flex items-center justify-between text-[10px] font-mono tracking-[0.2em] uppercase">
          <div className="flex items-center gap-5 text-[var(--2pt-white)]/55">
            <span className="flex items-center gap-1.5">
              <span className="relative inline-flex">
                <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full" />
                <span className="absolute inset-0 w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-ping opacity-60" />
              </span>
              <span className="text-[var(--2pt-green)]">Live</span>
            </span>
            <span className="hidden md:inline">
              Two Point Technologies · Vol I · Issue 001
            </span>
            <span className="md:hidden">2pt · Vol I</span>
          </div>
          <div className="hidden md:flex items-center gap-5 text-[var(--2pt-white)]/55">
            <span>
              NYC{" "}
              <span className="text-[var(--2pt-white)] tabular-nums">
                {fmtTime(time, "America/New_York")}
              </span>
            </span>
            <span className="text-[var(--2pt-white)]/20">·</span>
            <span>
              LDN{" "}
              <span className="text-[var(--2pt-white)] tabular-nums">
                {fmtTime(time, "Europe/London")}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* MAIN — left-aligned cover */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1400px] mx-auto w-full px-8 md:px-12 py-16 md:py-20">
        {/* Anthropic Partner chip + eyebrow row */}
        <div
          className={`flex flex-wrap items-center gap-x-5 gap-y-3 mb-10 md:mb-12 transition-opacity duration-1000 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "80ms" }}
        >
          <a
            href="https://www.anthropic.com/partners"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--2pt-white)]/15 bg-[var(--2pt-white)]/[0.04] backdrop-blur-sm hover:border-[var(--2pt-green)]/40 transition-colors duration-500"
          >
            <span className="w-1 h-1 rounded-full bg-[var(--2pt-green)]" />
            <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-[var(--2pt-white)]/75">
              Anthropic Partner
            </span>
          </a>
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--2pt-white)]/45">
            Runtime report
          </span>
          <span className="text-[10px] font-mono tracking-[0.2em] text-[var(--2pt-white)]/20 tabular-nums">
            build {buildStamp}
          </span>
        </div>

        {/* Kicker — positioning frame in Instrument Serif italic. Sits
            between the chip row and the headline so the page lands both
            beats (what we are + what we do) without crowding. */}
        <p
          className={`mb-6 md:mb-8 max-w-[820px] text-[20px] sm:text-[24px] md:text-[28px] leading-[1.2] tracking-[-0.01em] italic font-[var(--font-serif)] text-[var(--2pt-white)]/70 transition-all duration-1000 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
          style={{ transitionDelay: "120ms" }}
        >
          Expert marketing services. With engineering depth.
        </p>

        {/* Headline — service-explicit, deploy-verb forward */}
        <h1 className="mb-10 md:mb-14">
          <span className="block text-[52px] sm:text-[80px] md:text-[112px] lg:text-[140px] font-bold tracking-[-0.05em] leading-[0.92] text-[var(--2pt-white)]">
            {["We", "deploy", "production", "AI"].flatMap((w, i, arr) => [
              <span
                key={`w-${i}`}
                className={`inline-block transition-all duration-[1100ms] ease-out ${
                  loaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-[0.6em]"
                }`}
                style={{ transitionDelay: `${180 + i * 110}ms` }}
              >
                {w}
              </span>,
              i < arr.length - 1 ? " " : null,
            ])}
          </span>
          <span className="block text-[52px] sm:text-[80px] md:text-[112px] lg:text-[140px] font-bold tracking-[-0.05em] leading-[0.92] text-[var(--2pt-green)] mt-1">
            {["inside", "marketing", "teams."].flatMap((w, i, arr) => [
              <span
                key={`w-${i}`}
                className={`inline-block transition-all duration-[1100ms] ease-out ${
                  loaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-[0.6em]"
                }`}
                style={{ transitionDelay: `${620 + i * 110}ms` }}
              >
                {w}
              </span>,
              i < arr.length - 1 ? " " : null,
            ])}
          </span>
        </h1>

        {/* LIVE TODAY — 4-column ticking data band */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 border-y border-[var(--2pt-white)]/12 transition-opacity duration-[1400ms] ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "1100ms" }}
        >
          {[
            {
              label: "In production now",
              value: systemsLive.toLocaleString(),
              live: false,
            },
            {
              label: "Bid auctions / min",
              value: bidsPerMin.toLocaleString(),
              live: true,
            },
            {
              label: "Variants shipped today",
              value: variantsShippedToday.toLocaleString(),
              live: true,
            },
            {
              label: "Anomalies caught today",
              value: anomaliesCaughtToday.toLocaleString(),
              live: true,
            },
          ].map((d, i) => (
            <div
              key={i}
              className={`py-6 md:py-8 ${
                i > 0
                  ? "md:border-l border-[var(--2pt-white)]/12 md:pl-8"
                  : "md:pr-8"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-2.5">
                <span
                  className={`w-1 h-1 rounded-full ${
                    d.live
                      ? "bg-[var(--2pt-green)] animate-pulse"
                      : "bg-[var(--2pt-white)]/30"
                  }`}
                />
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--2pt-white)]/55">
                  {d.label}
                </span>
              </div>
              <div className="text-2xl md:text-3xl lg:text-[34px] font-medium text-[var(--2pt-white)] tabular-nums tracking-tight">
                {d.value}
              </div>
            </div>
          ))}
        </div>

        {/* Subhead + CTA row */}
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-8 mt-12 md:mt-16 transition-opacity duration-[1400ms] ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "1300ms" }}
        >
          <div className="max-w-2xl">
            <p className="text-base md:text-lg text-[var(--2pt-white)] leading-relaxed mb-2">
              For marketing, commerce, advertising and communications.
            </p>
            <p className="text-base text-[var(--2pt-white)]/55 leading-relaxed flex items-center gap-1.5">
              In partnership with{" "}
              <span className="text-[var(--2pt-white)]">Anthropic</span>
              <span className="text-[var(--2pt-white)]/25">·</span>
              <span>Claude Partner Network</span>
            </p>
          </div>
          <a
            href="#what-we-solve"
            className="group inline-flex items-center gap-3 text-sm font-mono tracking-[0.18em] uppercase text-[var(--2pt-white)] hover:text-[var(--2pt-green)] transition-colors duration-500 self-start md:self-end"
          >
            <span className="border-b border-[var(--2pt-white)] group-hover:border-[var(--2pt-green)] pb-1 transition-colors duration-500">
              See what we deploy
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
          </a>
        </div>
      </div>

      {/* BOTTOM MASTHEAD STRIP */}
      <div
        className="relative z-10 border-t border-[var(--2pt-white)]/12"
        style={{ boxShadow: "0 -1px 0 rgba(255,255,255,0.04)" }}
      >
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-3.5 flex items-center justify-between text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-white)]/45">
          <span className="hidden md:inline">
            us-east / nyc-447 · eu-west / ldn-45
          </span>
          <span className="md:hidden">us-east · eu-west</span>
          <span className="flex items-center gap-2">
            Scroll
            <span className="w-6 h-px bg-[var(--2pt-white)]/25" />
          </span>
        </div>
      </div>
    </section>
  )
}
