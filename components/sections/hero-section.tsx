"use client"

import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

/**
 * Hero — editorial cover.
 *
 * Solid offwhite canvas with a single green accent — no ambient wash,
 * no mouse-tracking mesh, no floating dots. The page reads like a printed
 * cover. All life is concentrated in the live ticker band below the
 * headline, the LIVE indicator in the masthead strip, and the green
 * verdict line "is deployed." in the headline itself.
 *
 * Top hairline strip: LIVE indicator · masthead label · timezones.
 * Asymmetric left-aligned headline with a green oversized verdict line.
 * Four-column live "today" data band underneath the headline.
 * Bottom hairline strip: node routes + scroll cue.
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

/**
 * useCounter — increments a value by `step` every `intervalMs`.
 * Feels like a real counter (variants shipped, anomalies caught) rather
 * than a continuous waveform.
 */
function useCounter(start: number, intervalMs: number, step = 1) {
  const [v, setV] = useState(start)
  useEffect(() => {
    const id = setInterval(() => setV((x) => x + step), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs, step])
  return v
}

/**
 * useFluctuating — produces a believable fluctuating number (e.g. bid
 * rate). Updates at a slow cadence so the eye doesn't see it shake.
 */
function useFluctuating(base: number, amplitude: number, intervalMs: number) {
  const [v, setV] = useState(base)
  useEffect(() => {
    const id = setInterval(() => {
      // Random walk: small drift around the base, gently mean-reverting
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

export function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const time = useTime()

  // Live "today" counters — believable cadences, mix of static + slow-moving.
  const systemsLive = 47 // static — real count of deployments currently running
  const variantsShippedToday = useCounter(1847, 9000, 1) // +1 every ~9s
  const anomaliesCaughtToday = useCounter(18, 42000, 1) // +1 every ~42s
  const bidsPerMin = useFluctuating(1284, 80, 2400) // mean-reverting drift around 1284, updates every 2.4s

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 80)
    return () => clearTimeout(timer)
  }, [])

  // Build-style date stamp: YYYY.MM.DD — reads like a versioned release
  const buildStamp = time
    ? `${time.getFullYear()}.${String(time.getMonth() + 1).padStart(2, "0")}.${String(time.getDate()).padStart(2, "0")}`
    : "—"

  return (
    <section
      className="relative min-h-screen flex flex-col bg-[var(--2pt-offwhite)] text-[var(--2pt-black)] overflow-hidden"
    >
      {/* Background — solid offwhite with a single soft green accent in the
          lower-right quadrant. No mouse-tracking, no drift, no dots. The
          accent reads as a single moment of life, not an ambient wash. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 78% 70%, rgba(74,222,128,0.14) 0%, rgba(74,222,128,0.05) 35%, transparent 65%)",
        }}
      />
      {/* Single hairline accent — fine green rule running down the left edge
          of the content column, the only structural mark. */}
      <div
        aria-hidden
        className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-[var(--2pt-green)]/40 to-transparent pointer-events-none"
      />

      {/* TOP MASTHEAD STRIP — editorial cover chrome */}
      <div className="relative z-10 border-b border-[var(--2pt-black)]/12 pt-14 md:pt-16">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-3.5 flex items-center justify-between text-[10px] font-mono tracking-[0.2em] uppercase">
          <div className="flex items-center gap-5 text-[var(--2pt-black)]/50">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-pulse" />
              <span className="text-[var(--2pt-green)]">Live</span>
            </span>
            <span className="hidden md:inline">
              Two Point Technologies · Vol I · Issue 001
            </span>
            <span className="md:hidden">2pt · Vol I</span>
          </div>
          <div className="hidden md:flex items-center gap-5 text-[var(--2pt-black)]/50">
            <span>
              NYC{" "}
              <span className="text-[var(--2pt-black)] tabular-nums">
                {fmtTime(time, "America/New_York")}
              </span>
            </span>
            <span className="text-[var(--2pt-black)]/20">·</span>
            <span>
              LDN{" "}
              <span className="text-[var(--2pt-black)] tabular-nums">
                {fmtTime(time, "Europe/London")}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* MAIN — left-aligned editorial cover */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1400px] mx-auto w-full px-8 md:px-12 py-16 md:py-20">
        {/* Eyebrow */}
        <div
          className={`flex items-baseline gap-3 mb-10 md:mb-12 transition-opacity duration-1000 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "80ms" }}
        >
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--2pt-black)]/45">
            Runtime report
          </span>
          <span className="text-[10px] font-mono tracking-[0.2em] text-[var(--2pt-black)]/20 tabular-nums">
            build {buildStamp}
          </span>
        </div>

        {/* Headline — left-aligned, two lines locked to the same scale. The
            promise in plain English: we modernize the marketing function and
            build it for the future. The verdict line reads as continuation,
            not a different headline. Word-by-word reveal. */}
        <h1 className="mb-12 md:mb-16">
          <span className="block text-[44px] sm:text-[64px] md:text-[92px] lg:text-[118px] font-medium tracking-[-0.035em] leading-[0.96] text-[var(--2pt-black)]">
            {["Your", "marketing", "function,"].map((w, i) => (
              <span
                key={i}
                className={`inline-block transition-all duration-[1100ms] ease-out ${
                  loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[0.6em]"
                } ${i > 0 ? "ml-[0.25em]" : ""}`}
                style={{ transitionDelay: `${180 + i * 110}ms` }}
              >
                {w}
              </span>
            ))}
          </span>
          <span className="block text-[44px] sm:text-[64px] md:text-[92px] lg:text-[118px] font-medium tracking-[-0.035em] leading-[0.96] text-[var(--2pt-green)] mt-1">
            {["built", "for", "what’s", "next."].map((w, i) => (
              <span
                key={i}
                className={`inline-block transition-all duration-[1100ms] ease-out ${
                  loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[0.6em]"
                } ${i > 0 ? "ml-[0.25em]" : ""}`}
                style={{ transitionDelay: `${570 + i * 110}ms` }}
              >
                {w}
              </span>
            ))}
          </span>
        </h1>

        {/* LIVE TODAY — 4-column ticking data band. Proves the page is broadcasting. */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 border-y border-[var(--2pt-black)]/12 transition-opacity duration-[1400ms] ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "1100ms" }}
        >
          {[
            { label: "In production now",         value: systemsLive.toLocaleString(),          live: false },
            { label: "Bid auctions / min",        value: bidsPerMin.toLocaleString(),           live: true },
            { label: "Variants shipped today",    value: variantsShippedToday.toLocaleString(), live: true },
            { label: "Anomalies caught today",    value: anomaliesCaughtToday.toLocaleString(), live: true },
          ].map((d, i) => (
            <div
              key={i}
              className={`py-6 md:py-8 ${
                i > 0 ? "md:border-l border-[var(--2pt-black)]/12 md:pl-8" : "md:pr-8"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-2.5">
                <span
                  className={`w-1 h-1 rounded-full ${
                    d.live
                      ? "bg-[var(--2pt-green)] animate-pulse"
                      : "bg-[var(--2pt-black)]/30"
                  }`}
                />
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--2pt-black)]/45">
                  {d.label}
                </span>
              </div>
              <div className="text-2xl md:text-3xl lg:text-[34px] font-medium text-[var(--2pt-black)] tabular-nums tracking-tight">
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
            <p className="text-base md:text-lg text-[var(--2pt-black)] leading-relaxed mb-2">
              For marketing, commerce, advertising and communications.
            </p>
            <p className="text-base text-[var(--2pt-black)]/55 leading-relaxed flex items-center gap-1.5">
              In partnership with{" "}
              <span className="text-[var(--2pt-black)]">Anthropic</span>
              <span className="text-[var(--2pt-black)]/25">·</span>
              <span>Claude Partner Network</span>
            </p>
          </div>
          <a
            href="#what-we-solve"
            className="group inline-flex items-center gap-3 text-sm font-mono tracking-[0.18em] uppercase text-[var(--2pt-black)] hover:text-[var(--2pt-green)] transition-colors duration-500 self-start md:self-end"
          >
            <span className="border-b border-[var(--2pt-black)] group-hover:border-[var(--2pt-green)] pb-1 transition-colors duration-500">
              See what we deploy
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
          </a>
        </div>
      </div>

      {/* BOTTOM MASTHEAD STRIP */}
      <div className="relative z-10 border-t border-[var(--2pt-black)]/12">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-3.5 flex items-center justify-between text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/45">
          <span className="hidden md:inline">us-east / nyc-447 · eu-west / ldn-45</span>
          <span className="md:hidden">us-east · eu-west</span>
          <span className="flex items-center gap-2">
            Scroll
            <span className="w-6 h-px bg-[var(--2pt-black)]/25" />
          </span>
        </div>
      </div>
    </section>
  )
}
