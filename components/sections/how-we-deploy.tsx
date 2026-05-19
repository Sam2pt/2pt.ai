"use client"

/**
 * HowWeDeploy — four-stage engagement strip with active-stage flow.
 *
 * Visual flow line above the grid with a green pulse that travels from
 * stage 1 → 4 every ~16 seconds, looping. The active stage gets a
 * heightened visual treatment (full-saturation numeral, pulsing dot,
 * elevated card). Hover any stage to pause the auto-cycle and focus it.
 *
 * On scroll into view, the four stages reveal in sequence (one every
 * 180ms) so the page introduces them as a flow, not a wall.
 *
 * Mobile: motion is preserved but the cards stack vertically; the flow
 * line becomes a small vertical accent on the left of each stage.
 */

import { useEffect, useRef, useState } from "react"
import { TechGrid, GreenWash } from "@/components/ui/tech-grid"

type Stage = {
  index: string
  name: string
  discipline: string
  body: string
}

const STAGES: Stage[] = [
  {
    index: "01",
    name: "Diagnose",
    discipline: "Strategy & diagnostics",
    body:
      "We map the marketing function: where systems break, where AI lands, what to ship first. You leave with a roadmap your CFO can read.",
  },
  {
    index: "02",
    name: "Build",
    discipline: "Custom deployment",
    body:
      "Embedded engineers build the AI system inside your stack. Production-grade from day one. No demos. No pilots that go nowhere.",
  },
  {
    index: "03",
    name: "Deploy",
    discipline: "Enterprise integration",
    body:
      "Wired into retail media, CRM, brand and creative workflows. The system runs alongside your team and starts moving the metric.",
  },
  {
    index: "04",
    name: "Transfer",
    discipline: "Adoption & transfer",
    body:
      "Your team takes ownership. We document, train, hand off. The system stays. We don't sell you a subscription you can't switch off.",
  },
]

const CYCLE_MS = 4000 // Each stage stays active this long
const REVEAL_STAGGER_MS = 180

export function HowWeDeploy() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hasEntered, setHasEntered] = useState(false)
  const [autoIndex, setAutoIndex] = useState(0)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  // Reveal-on-scroll — fire once when the section first enters the viewport
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setHasEntered(true)
            obs.disconnect()
            break
          }
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Auto-cycle the active stage. Pauses when the user hovers any card.
  useEffect(() => {
    if (hoveredIdx !== null) return
    const id = setInterval(() => {
      setAutoIndex((i) => (i + 1) % STAGES.length)
    }, CYCLE_MS)
    return () => clearInterval(id)
  }, [hoveredIdx])

  const activeIdx = hoveredIdx ?? autoIndex

  return (
    <section
      ref={sectionRef}
      aria-label="How we deploy"
      className="relative bg-[var(--2pt-offwhite)] border-t border-[var(--2pt-black)]/10"
      style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.7)" }}
    >
      {/* Technical dot-grid + soft green wash — texture for the white canvas */}
      <TechGrid cell={32} opacity={0.5} />
      <GreenWash at="15% 80%" size="55% 55%" intensity={0.07} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 py-20 md:py-28">
        {/* Section eyebrow */}
        <div className="flex items-center gap-2.5 mb-8 md:mb-10">
          <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-pulse" />
          <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-[var(--2pt-black)]/50">
            <span className="text-[var(--2pt-black)]/30 mr-2">II.</span>How we deploy
          </span>
        </div>

        {/* Intro line — Geist sans, declarative not decorative */}
        <p className="text-[24px] sm:text-[30px] md:text-[40px] lg:text-[48px] font-medium tracking-[-0.025em] leading-[1.08] text-[var(--2pt-black)] max-w-4xl mb-14 md:mb-20">
          Every engagement runs through the same four stages.{" "}
          <span className="text-[var(--2pt-black)]/45">
            Diagnose. Build. Deploy. Transfer.
          </span>
        </p>

        {/* Publication detail bar */}
        <div className="flex items-baseline justify-between gap-y-2 mb-6 pb-3 border-b border-[var(--2pt-black)]/12">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--2pt-black)]/45">
            Engagement model · 4 stages
          </span>
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-green)] tabular-nums">
            Stage {STAGES[activeIdx].index} active
          </span>
        </div>

        {/* Flow line — connects the four stages with a traveling green pulse.
            Desktop only; mobile uses a left-edge accent on each card. */}
        <div className="relative hidden lg:block mt-2 mb-6">
          {/* Horizontal track */}
          <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--2pt-black)]/12" />
          {/* Filled progress — grows from left to right with the active stage */}
          <div
            className="absolute top-1/2 left-0 h-px bg-[var(--2pt-green)] transition-[width] duration-[2400ms] ease-in-out"
            style={{
              width: `${((activeIdx + 1) / STAGES.length) * 100}%`,
              opacity: hasEntered ? 1 : 0,
            }}
          />
          {/* Stage node dots */}
          <div className="relative grid grid-cols-4">
            {STAGES.map((_, i) => {
              const reached = i <= activeIdx
              const isActive = i === activeIdx
              return (
                <div key={i} className="flex justify-center">
                  <div className="relative">
                    <span
                      className="block w-2.5 h-2.5 rounded-full transition-colors duration-500"
                      style={{
                        backgroundColor: reached
                          ? "var(--2pt-green)"
                          : "rgba(10,10,10,0.18)",
                      }}
                    />
                    {isActive && (
                      <>
                        <span
                          className="absolute inset-0 rounded-full animate-ping"
                          style={{
                            backgroundColor: "var(--2pt-green)",
                            opacity: 0.45,
                          }}
                        />
                        <span
                          className="absolute -inset-1.5 rounded-full border border-[var(--2pt-green)]/40"
                        />
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Stage grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--2pt-black)]/8 mt-0 lg:mt-2">
          {STAGES.map((stage, i) => {
            const isActive = i === activeIdx
            const isPast = i < activeIdx
            return (
              <article
                key={stage.index}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group relative bg-[var(--2pt-offwhite)] flex flex-col px-5 md:px-7 py-9 md:py-11 transition-all duration-500 ease-out cursor-default"
                style={{
                  // Subtle lift + lighter background on the active card
                  backgroundColor: isActive
                    ? "var(--2pt-white)"
                    : "var(--2pt-offwhite)",
                  boxShadow: isActive
                    ? "0 1px 0 rgba(255,255,255,0.8) inset, 0 18px 40px -22px rgba(10,10,10,0.20), 0 2px 6px -2px rgba(74,222,128,0.10)"
                    : "none",
                  opacity: hasEntered ? 1 : 0,
                  transform: hasEntered ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: hasEntered
                    ? `${i * REVEAL_STAGGER_MS}ms`
                    : "0ms",
                  transitionProperty: "opacity, transform, background-color, box-shadow",
                }}
              >
                {/* Mobile-only left accent rail */}
                <span
                  aria-hidden
                  className="lg:hidden absolute left-0 top-9 bottom-9 w-px transition-colors duration-500"
                  style={{
                    backgroundColor: isActive
                      ? "var(--2pt-green)"
                      : isPast
                        ? "rgba(74,222,128,0.35)"
                        : "rgba(10,10,10,0.10)",
                  }}
                />

                {/* Numeric chrome */}
                <div className="flex items-baseline justify-between mb-5">
                  <span
                    className="text-[11px] font-mono tracking-[0.25em] tabular-nums transition-colors duration-500"
                    style={{
                      color: isActive
                        ? "var(--2pt-green)"
                        : isPast
                          ? "rgba(74,222,128,0.6)"
                          : "rgba(10,10,10,0.35)",
                    }}
                  >
                    — {stage.index}
                  </span>
                  <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/25 tabular-nums">
                    Stage {stage.index} / 04
                  </span>
                </div>

                {/* Stage name */}
                <h3
                  className="text-[34px] md:text-[40px] lg:text-[46px] font-medium tracking-[-0.025em] leading-[1.0] mb-3 transition-colors duration-500"
                  style={{
                    color: isActive
                      ? "var(--2pt-black)"
                      : "rgba(10,10,10,0.6)",
                  }}
                >
                  {stage.name}
                </h3>

                {/* Discipline label — italic Geist (no serif) */}
                <p
                  className="text-[14px] md:text-[15px] italic mb-4 transition-colors duration-500"
                  style={{
                    color: isActive
                      ? "var(--2pt-black)/70"
                      : "rgba(10,10,10,0.40)",
                  }}
                >
                  {stage.discipline}
                </p>

                {/* Body */}
                <p
                  className="text-[13px] md:text-[14px] leading-relaxed transition-colors duration-500"
                  style={{
                    color: isActive
                      ? "rgba(10,10,10,0.75)"
                      : "rgba(10,10,10,0.55)",
                  }}
                >
                  {stage.body}
                </p>

                {/* Hover hint — invisible until hover, subtle */}
                <span
                  className="mt-auto pt-8 text-[9px] font-mono tracking-[0.25em] uppercase text-[var(--2pt-green)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                >
                  Focused
                </span>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
