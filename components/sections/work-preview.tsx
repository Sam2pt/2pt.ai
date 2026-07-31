"use client"

/**
 * WorkPreview — homepage "Now Playing" reel.
 *
 * Three featured case studies as dramatic poster cards: huge wordmark,
 * single supporting claim, an outcome metric rendered at hero scale,
 * and a small per-case "running" status ticker so each card feels alive
 * rather than static. Ambient motion: a slow diagonal scan beam drifts
 * across each card, and the right-edge accent rule pulses.
 *
 * No external imagery. Each card carries a unique accent gradient (per
 * case.accent) so the row reads as three distinct works inside one
 * editorial system.
 */

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { FEATURED_CASES, type CaseStudy } from "@/lib/cases"
import { ClientLogo } from "@/components/ui/client-logo"

const ACCENTS: Record<
  CaseStudy["accent"],
  { wash: string; underline: string; rgba: string }
> = {
  green: {
    wash:
      "radial-gradient(ellipse 75% 60% at 80% 80%, rgba(74,222,128,0.28) 0%, rgba(74,222,128,0.08) 35%, transparent 65%)",
    underline: "var(--2pt-green)",
    rgba: "74,222,128",
  },
  cyan: {
    wash:
      "radial-gradient(ellipse 75% 60% at 80% 80%, rgba(34,211,238,0.26) 0%, rgba(34,211,238,0.07) 35%, transparent 65%)",
    underline: "#22d3ee",
    rgba: "34,211,238",
  },
  lime: {
    wash:
      "radial-gradient(ellipse 75% 60% at 80% 80%, rgba(190,242,100,0.24) 0%, rgba(190,242,100,0.06) 35%, transparent 65%)",
    underline: "#bef264",
    rgba: "190,242,100",
  },
  emerald: {
    wash:
      "radial-gradient(ellipse 75% 60% at 80% 80%, rgba(52,211,153,0.28) 0%, rgba(52,211,153,0.08) 35%, transparent 65%)",
    underline: "#34d399",
    rgba: "52,211,153",
  },
}

// Per-case status streams. Each case gets its own small ticker so the
// card surfaces what the work is actually doing in production. Stylised
// as deploy-log lines — same vocabulary as the hero deploy log.
const TICKERS: Record<string, string[]> = {
  "amazon-generative-creative": [
    "[promote] hero·variant·07 → 8.9 score",
    "[ok] brand-fit pass · 1,284 variants today",
    "[ship] amazon·us · 42 SKUs · live",
    "[run] creative-pipeline · 18 promotions / hr",
    "[kill] hero·variant·11 → 4.2 score",
    "[ok] compliance·voice pass · jp-JP",
  ],
  "yamaha-global-geo": [
    "[cited] best online music school → en-US",
    "[gap] music lessons for kids → de-DE",
    "[ok] schema·course·v2 pushed → 412 pages",
    "[cited] online piano lessons → ja-JP",
    "[run] perplexity audit · 4 markets",
    "[fix] meta·hreflang · fr-FR · resolved",
  ],
  "kyndryl-marketing-ops": [
    "[brief] q3-launch·apac → routed",
    "[scored] go-to-market·v3 → 0.86 fit",
    "[ok] slack ↔ monday relay · 412 ops",
    "[modelled] scenario·eu·q3 · 8 variants",
    "[run] strategy·agent · 6 cohorts active",
    "[brief] americas·brand·refresh → routed",
  ],
}

function StatusTicker({ slug, accent }: { slug: string; accent: string }) {
  const lines = TICKERS[slug] ?? []
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (!lines.length) return
    const id = setInterval(() => setIdx((i) => (i + 1) % lines.length), 1400)
    return () => clearInterval(id)
  }, [lines.length])
  if (!lines.length) return null
  // Render two stacked lines: the just-fired one + the next one queued.
  const visible = [lines[idx], lines[(idx + 1) % lines.length]]
  return (
    <div className="font-mono text-[10px] uppercase tracking-[0.1em] leading-[1.7] text-[var(--2pt-white)]/35 space-y-0.5 min-h-[36px]">
      {visible.map((line, i) => (
        <div
          key={`${line}-${idx}-${i}`}
          style={{
            opacity: i === 0 ? 0.85 : 0.4,
            color:
              i === 0 ? accent : "rgba(255,255,255,0.35)",
            animation: i === 0 ? "fadeInUp 500ms ease-out both" : undefined,
          }}
        >
          {line}
        </div>
      ))}
    </div>
  )
}

export function WorkPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const [entered, setEntered] = useState(false)
  const [now, setNow] = useState<Date | null>(null)

  // Live clock for the section eyebrow (matches the hero runtime feel).
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

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative bg-[var(--2pt-black)] text-[var(--2pt-white)] py-24 md:py-32 px-8 md:px-12 border-t border-b border-[var(--2pt-black)]"
    >
      {/* Ambient depth — same vocabulary as the dark hero */}
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
        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div
              className={`flex items-center gap-2.5 mb-5 transition-opacity duration-1000 ${
                entered ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="relative inline-flex">
                <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full" />
                <span className="absolute inset-0 w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-ping opacity-60" />
              </span>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--2pt-white)]/55">
                <span className="text-[var(--2pt-white)]/30 mr-2">IV.</span>
                Now playing
              </span>
              <span className="ml-3 text-[10px] font-mono tracking-[0.2em] text-[var(--2pt-white)]/30 tabular-nums">
                rt {runtime}
              </span>
            </div>
            <h2
              className={`text-[28px] md:text-[44px] font-medium tracking-[-0.03em] leading-[1.02] text-[var(--2pt-white)] transition-all duration-1000 ${
                entered
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: "120ms" }}
            >
              Selected work.
            </h2>
            <p
              className={`mt-3 text-[13px] md:text-[14px] leading-[1.55] text-[var(--2pt-white)]/55 max-w-[480px] transition-opacity duration-1000 ${
                entered ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: "240ms" }}
            >
              Three engagements running in production. Full catalogue
              lives at /work.
            </p>
          </div>

          <Link
            href="/work"
            className={`hidden md:inline-flex group items-center gap-2 text-[11px] font-mono tracking-[0.24em] uppercase text-[var(--2pt-white)]/65 hover:text-[var(--2pt-green)] transition-colors duration-500 ${
              entered ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "320ms" }}
          >
            View all cases
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" />
          </Link>
        </div>

        {/* Triptych of posters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {FEATURED_CASES.map((c, i) => {
            const accent = ACCENTS[c.accent]
            const headlineOutcome = c.outcomes[0]
            return (
              <Link
                key={c.slug}
                href={`/work/${c.slug}`}
                className={`group relative flex flex-col bg-[var(--2pt-black)] border border-[var(--2pt-white)]/12 overflow-hidden transition-all duration-700 ease-out hover:border-[var(--2pt-white)]/25 hover:-translate-y-1 ${
                  entered
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay: `${440 + i * 160}ms`,
                  minHeight: 520,
                  boxShadow: `0 0 0 0 transparent`,
                }}
              >
                {/* Per-card accent wash */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none transition-opacity duration-700 ease-out"
                  style={{ background: accent.wash }}
                />

                {/* Subtle dot grid behind content */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1.4px)",
                    backgroundSize: "26px 26px",
                    opacity: 0.65,
                    WebkitMaskImage:
                      "radial-gradient(ellipse 90% 90% at 50% 50%, #000 30%, transparent 90%)",
                    maskImage:
                      "radial-gradient(ellipse 90% 90% at 50% 50%, #000 30%, transparent 90%)",
                  }}
                />

                {/* Slow diagonal scan beam — the ambient life */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none overflow-hidden"
                >
                  <div
                    className="absolute -inset-x-10 h-[40%] animate-scan-line"
                    style={{
                      top: "-20%",
                      background: `linear-gradient(180deg, transparent 0%, rgba(${accent.rgba},0.08) 50%, transparent 100%)`,
                      animationDuration: `${7 + i * 0.8}s`,
                    }}
                  />
                </div>

                {/* Right-edge accent rule */}
                <div
                  aria-hidden
                  className="absolute right-0 top-8 bottom-8 w-px transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(to bottom, transparent, ${accent.underline}, transparent)`,
                    opacity: 0.5,
                  }}
                />

                {/* Top strip — index + sector + Live ticker */}
                <div className="relative flex items-center justify-between px-5 pt-5 pb-3">
                  <span className="text-[10px] font-mono tracking-[0.28em] uppercase text-[var(--2pt-white)]/40">
                    {(i + 1).toString().padStart(2, "0")} /
                    {FEATURED_CASES.length.toString().padStart(2, "0")}
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="text-[9px] font-mono tracking-[0.22em] uppercase text-[var(--2pt-white)]/45">
                      {c.sector.split(" · ")[0]}
                    </span>
                    <span
                      className="flex items-center gap-1.5 text-[9px] font-mono tracking-[0.22em] uppercase"
                      style={{ color: accent.underline }}
                    >
                      <span
                        className="relative inline-flex w-1.5 h-1.5"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: accent.underline }}
                        />
                        <span
                          className="absolute inset-0 rounded-full animate-ping opacity-60"
                          style={{ background: accent.underline }}
                        />
                      </span>
                      Live
                    </span>
                  </span>
                </div>

                {/* Wordmark — dominant */}
                <div className="relative px-5 pt-6">
                  <ClientLogo
                    case={c}
                    variant="dark"
                    height={60}
                    accent={accent.underline}
                  />
                  {c.brand ? (
                    <div className="mt-2 text-[9px] font-mono tracking-[0.24em] uppercase text-[var(--2pt-white)]/40">
                      by {c.client}
                    </div>
                  ) : null}
                </div>

                {/* Claim */}
                <div className="relative px-5 pt-5">
                  <h3 className="text-[17px] md:text-[18px] font-medium tracking-[-0.02em] leading-[1.25] text-[var(--2pt-white)] max-w-[26ch]">
                    {c.title}
                  </h3>
                </div>

                {/* HERO outcome — the visual anchor */}
                <div className="relative px-5 pt-7 pb-5">
                  <div className="text-[9px] font-mono tracking-[0.24em] uppercase text-[var(--2pt-white)]/45 mb-2">
                    {headlineOutcome.label}
                  </div>
                  <div
                    className="text-[64px] md:text-[78px] font-medium tracking-[-0.04em] leading-[0.95] tabular-nums"
                    style={{ color: accent.underline }}
                  >
                    {headlineOutcome.value}
                  </div>
                </div>

                {/* Per-case status ticker — pushes card to feel alive */}
                <div className="relative mt-auto mx-5 mb-5 pt-4 border-t border-[var(--2pt-white)]/8">
                  <StatusTicker slug={c.slug} accent={accent.underline} />
                </div>

                {/* Footer — tool tag + CTA */}
                <div className="relative flex items-center justify-between px-5 py-4 border-t border-[var(--2pt-white)]/10">
                  <span className="text-[9px] font-mono tracking-[0.24em] uppercase text-[var(--2pt-white)]/55">
                    {c.tools.slice(0, 2).join(" · ")}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.24em] uppercase text-[var(--2pt-white)]/75 group-hover:text-[var(--2pt-green)] transition-colors duration-500">
                    Read the case
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Mobile footer link — desktop has it inline in the header */}
        <div className="mt-8 md:hidden">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.24em] uppercase text-[var(--2pt-white)]/75 hover:text-[var(--2pt-green)] transition-colors duration-500"
          >
            View all cases
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
