"use client"

/**
 * YamahaWorkCard — mobile case-study preview for Yamaha Music.
 *
 * Editorial cover treatment, no tap-through. The live hero visual
 * cycles a "now auditing" panel through the five AI engines Yamaha's
 * shoppers actually query, each with its own sample query, citation
 * state, and competitor if the brand isn't cited. Purple accent
 * distinguishes it from the cyan Lumen card in the same scroll flow.
 */

import { useEffect, useState } from "react"
import { useInView } from "@/components/mobile/use-in-view"

const ACCENT = "#a78bfa"

type EngineAudit = {
  engine: string
  short: string
  query: string
  cited: boolean
  winner?: string
  locale: string
}

const AUDITS: EngineAudit[] = [
  {
    engine: "ChatGPT",
    short: "GPT",
    query: "best online music school for adults",
    cited: false,
    winner: "Skoove",
    locale: "en-US",
  },
  {
    engine: "Perplexity",
    short: "PRP",
    query: "online piano lessons for kids",
    cited: true,
    locale: "en-US",
  },
  {
    engine: "Gemini",
    short: "GEM",
    query: "online klavier lernen für kinder",
    cited: true,
    locale: "de-DE",
  },
  {
    engine: "Claude",
    short: "CLA",
    query: "learn guitar online beginner",
    cited: false,
    winner: "Yousician",
    locale: "en-US",
  },
  {
    engine: "Google AIO",
    short: "AIO",
    query: "オンライン ピアノ 教室",
    cited: false,
    winner: "Flowkey",
    locale: "ja-JP",
  },
]

const CYCLE_MS = 2600

export function YamahaWorkCard({ index }: { index: number }) {
  const { ref, visible } = useInView<HTMLElement>(0.35)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!visible) return
    const id = setInterval(() => setActive((a) => (a + 1) % AUDITS.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [visible])

  const audit = AUDITS[active]

  return (
    <section
      ref={ref}
      data-card-index={index}
      className="relative h-[100dvh] w-full snap-start overflow-hidden bg-[var(--2pt-black)] text-[var(--2pt-white)] flex flex-col"
    >
      {/* Ambient — violet spotlight anchoring the hero */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1.3px)",
          backgroundSize: "22px 22px",
          opacity: 0.45,
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 50% 50%, #000 30%, transparent 88%)",
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 50%, #000 30%, transparent 88%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none transition-all duration-[2000ms] ease-out"
        style={{
          background:
            "radial-gradient(ellipse 65% 45% at 20% 20%, rgba(167,139,250,0.18) 0%, rgba(167,139,250,0.04) 40%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 85% 80%, rgba(240,171,252,0.10) 0%, rgba(240,171,252,0.02) 40%, transparent 65%)",
        }}
      />

      {/* Masthead */}
      <div
        className={`relative z-10 pt-14 px-6 flex items-center gap-2 flex-wrap transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/70">
          Case study
        </span>
        <span className="text-white/25 text-[10px]">/</span>
        <span className="text-[10px] font-mono tracking-[0.28em] uppercase text-white/45">
          02 · 2026
        </span>
        <span
          className="ml-auto flex items-center gap-1.5 text-[9px] font-mono tracking-[0.24em] uppercase"
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
      </div>

      {/* Hero */}
      <div className="relative z-10 px-6 mt-12">
        <div
          className={`text-[9px] font-mono tracking-[0.28em] uppercase text-white/45 mb-3 transition-opacity duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "80ms" }}
        >
          For Yamaha Music
        </div>
        <h2
          className={`text-[38px] font-semibold tracking-[-0.03em] leading-[1.02] text-white transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
          style={{ transitionDelay: "160ms" }}
        >
          Cited in AI search.
          <br />
          <span
            className="inline-block relative"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Bidding on Google.
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 right-0 h-[2px] origin-left"
              style={{
                background: `linear-gradient(90deg, ${ACCENT}, transparent)`,
                transform: visible ? "scaleX(1)" : "scaleX(0)",
                transition:
                  "transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 720ms",
              }}
            />
          </span>
        </h2>
        <p
          className={`mt-3 text-[13px] leading-[1.55] text-white/65 transition-opacity duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "240ms" }}
        >
          Search plus AI discovery for a global online music school. One
          system across every engine and every locale.
        </p>
      </div>

      {/* Live engine audit — cycles through 5 engines */}
      <div
        className={`relative z-10 mx-6 mt-6 transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "400ms" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span className="text-[9px] font-mono tracking-[0.24em] uppercase text-white/40">
            Now auditing · engine {String(active + 1).padStart(2, "0")} / 05
          </span>
        </div>

        <div
          key={audit.engine}
          className="relative border overflow-hidden"
          style={{
            borderColor: `${ACCENT}55`,
            background: `linear-gradient(180deg, rgba(167,139,250,0.10) 0%, rgba(0,0,0,0.35) 100%)`,
            animation: "fadeInUp 500ms cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          {/* Chrome */}
          <div
            className="flex items-center justify-between px-4 py-2.5 border-b"
            style={{ borderColor: `${ACCENT}22` }}
          >
            <div className="flex items-baseline gap-2">
              <span
                className="text-[14px] font-medium"
                style={{ color: ACCENT, letterSpacing: "-0.01em" }}
              >
                {audit.engine}
              </span>
              <span
                className="text-[9px] font-mono uppercase tracking-[0.2em]"
                style={{ color: `${ACCENT}88` }}
              >
                · {audit.locale}
              </span>
            </div>
            <span
              className="text-[9px] font-mono tracking-[0.2em] uppercase"
              style={{ color: `${ACCENT}bb` }}
            >
              Query · live
            </span>
          </div>

          {/* Query + verdict */}
          <div className="px-4 py-4">
            <div
              className="text-[9px] font-mono tracking-[0.22em] uppercase mb-2"
              style={{ color: `${ACCENT}99` }}
            >
              Auditing
            </div>
            <div
              className="text-[15px] leading-[1.35] text-white mb-4"
              style={{ letterSpacing: "-0.005em" }}
            >
              &ldquo;{audit.query}&rdquo;
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 border text-[10px] font-mono tracking-[0.14em] uppercase"
                style={{
                  borderColor: audit.cited
                    ? `${ACCENT}77`
                    : "rgba(240,171,252,0.6)",
                  color: audit.cited ? ACCENT : "#f0abfc",
                  background: audit.cited
                    ? "rgba(167,139,250,0.10)"
                    : "rgba(240,171,252,0.06)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: audit.cited ? ACCENT : "#f0abfc",
                  }}
                />
                {audit.cited ? "Yamaha cited" : "Gap · not cited"}
              </span>
              {!audit.cited && audit.winner ? (
                <span className="text-[11px] text-white/55">
                  Winning:{" "}
                  <span className="text-white/85">{audit.winner}</span>
                </span>
              ) : null}
            </div>
          </div>

          <div
            className="px-4 py-2 border-t flex items-center justify-between text-[8px] font-mono tracking-[0.22em] uppercase"
            style={{
              borderColor: `${ACCENT}22`,
              color: `${ACCENT}88`,
            }}
          >
            <span>engine · audit</span>
            <span>route · {audit.short.toLowerCase()}</span>
          </div>
        </div>

        {/* Engine tick row */}
        <div className="mt-4 flex items-center gap-1.5">
          {AUDITS.map((_, i) => {
            const isActive = i === active
            return (
              <span
                key={i}
                className="h-[3px] flex-1 transition-all duration-500"
                style={{
                  background: isActive ? ACCENT : "rgba(255,255,255,0.14)",
                  opacity: isActive ? 1 : 0.6,
                }}
              />
            )
          })}
        </div>
      </div>

      {/* Ambient status — competitor movement */}
      <div
        className={`relative z-10 mx-6 mt-5 flex items-center gap-3 text-[10px] font-mono tracking-[0.14em] text-white/50 transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "520ms" }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: ACCENT }}
        />
        <span className="uppercase tracking-[0.22em]">Competitors</span>
        <span className="flex-1 h-px bg-white/8" />
        <span className="tabular-nums" style={{ color: ACCENT }}>
          5 watched · 24 / 7
        </span>
      </div>

      {/* Proof strip */}
      <div
        className={`relative z-10 px-6 mt-auto pb-12 pt-5 transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "560ms" }}
      >
        <div className="mx-6 pt-5 border-t border-white/8 grid grid-cols-3 gap-3 -mx-6 px-6">
          {[
            { l: "Locales", v: "3" },
            { l: "Queries", v: "8.4k" },
            { l: "Response", v: "Same day" },
          ].map((m) => (
            <div key={m.l}>
              <div className="text-[9px] font-mono tracking-[0.22em] uppercase text-white/40 mb-1">
                {m.l}
              </div>
              <div
                className="text-[22px] font-semibold tracking-[-0.02em] leading-[1] tabular-nums"
                style={{ color: ACCENT }}
              >
                {m.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
