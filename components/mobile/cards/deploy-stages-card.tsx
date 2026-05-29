"use client"

/**
 * DeployStagesCard — vertical timeline of the 4-stage engagement model.
 *
 * Diagnose → Build → Deploy → Transfer rendered as a vertical flow with a
 * green pulse that travels through the stages once the card is in view.
 * Each stage card scales in sequentially. The active stage gets a heavier
 * visual treatment so the eye knows where the "play head" currently is.
 */

import { useEffect, useState } from "react"
import { useInView } from "@/components/mobile/use-in-view"

const STAGES = [
  {
    index: "01",
    name: "Diagnose",
    discipline: "Strategy & diagnostics",
    body:
      "We map the marketing function: where systems break, where AI lands.",
  },
  {
    index: "02",
    name: "Build",
    discipline: "Custom deployment",
    body:
      "Embedded engineers build the AI system inside your stack. Production from day one.",
  },
  {
    index: "03",
    name: "Deploy",
    discipline: "Enterprise integration",
    body:
      "Wired into retail media, CRM, brand and creative workflows.",
  },
  {
    index: "04",
    name: "Transfer",
    discipline: "Adoption & transfer",
    body:
      "Your team takes ownership. We document, train, hand off.",
  },
]

const CYCLE_MS = 3200

export function DeployStagesCard({ index }: { index: number }) {
  const { ref, visible } = useInView<HTMLElement>(0.5)
  const [active, setActive] = useState(0)

  // Auto-cycle while in view.
  useEffect(() => {
    if (!visible) return
    const id = setInterval(() => {
      setActive((i) => (i + 1) % STAGES.length)
    }, CYCLE_MS)
    return () => clearInterval(id)
  }, [visible])

  return (
    <section
      ref={ref}
      data-card-index={index}
      className="relative h-[100dvh] w-full snap-start overflow-hidden bg-[var(--2pt-white)] text-[var(--2pt-black)] flex flex-col"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 90% 15%, rgba(74,222,128,0.10) 0%, transparent 65%)",
        }}
      />

      {/* Top eyebrow */}
      <div className="relative z-10 pt-16 px-6 flex items-center gap-2.5">
        <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-pulse" />
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--2pt-black)]/50">
          <span className="text-[var(--2pt-black)]/30 mr-2">II.</span>How we deploy
        </span>
      </div>

      {/* Intro */}
      <div className="relative z-10 px-6 mt-6">
        <h2 className="text-[28px] font-bold tracking-[-0.035em] leading-[1.05] text-[var(--2pt-black)]">
          Every engagement runs through the same four stages.
        </h2>
      </div>

      {/* Stage timeline */}
      <div className="relative z-10 flex-1 px-6 pt-8 pb-6 flex flex-col gap-3 min-h-0 overflow-hidden">
        {/* Vertical connecting rail behind nodes */}
        <div
          aria-hidden
          className="absolute left-[2.05rem] top-[7rem] bottom-[3.5rem] w-px bg-[var(--2pt-black)]/12"
        />
        <div
          aria-hidden
          className="absolute left-[2.05rem] top-[7rem] w-px bg-[var(--2pt-green)] transition-[height] duration-[1200ms] ease-out"
          style={{
            height: `calc((100% - 10.5rem) * ${(active + 1) / STAGES.length})`,
          }}
        />

        {STAGES.map((s, i) => {
          const isActive = i === active
          const isPast = i < active
          return (
            <div
              key={s.index}
              className="relative flex items-start gap-4 py-2.5"
              
            >
              {/* Node dot */}
              <div className="relative shrink-0 z-10 w-4 h-4 ml-2 mt-1 flex items-center justify-center">
                <span
                  className="block rounded-full transition-all duration-500"
                  style={{
                    width: isActive ? 10 : 7,
                    height: isActive ? 10 : 7,
                    backgroundColor:
                      isActive || isPast
                        ? "var(--2pt-green)"
                        : "rgba(10,10,10,0.18)",
                    boxShadow: isActive
                      ? "0 0 14px 3px rgba(74,222,128,0.45)"
                      : undefined,
                  }}
                />
                {isActive && (
                  <span
                    className="absolute inset-0 m-auto rounded-full animate-ping"
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: "rgba(74,222,128,0.55)",
                    }}
                  />
                )}
              </div>

              {/* Stage text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span
                    className="text-[10px] font-mono tracking-[0.25em] tabular-nums"
                    style={{
                      color: isActive
                        ? "var(--2pt-green)"
                        : isPast
                          ? "rgba(74,222,128,0.55)"
                          : "rgba(10,10,10,0.35)",
                    }}
                  >
                    — {s.index}
                  </span>
                </div>
                <div
                  className="text-[22px] font-bold tracking-[-0.025em] leading-[1.05] transition-colors duration-500"
                  style={{
                    color: isActive
                      ? "var(--2pt-black)"
                      : "rgba(10,10,10,0.55)",
                  }}
                >
                  {s.name}
                </div>
                <div
                  className="text-[11px] italic mt-0.5 transition-colors duration-500"
                  style={{
                    color: isActive
                      ? "rgba(10,10,10,0.65)"
                      : "rgba(10,10,10,0.40)",
                  }}
                >
                  {s.discipline}
                </div>
                {isActive && (
                  <p
                    className="text-[13px] text-[var(--2pt-black)]/70 leading-snug mt-2"
                    style={{ animation: "fadeIn 500ms ease-out both" }}
                  >
                    {s.body}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom — auto-cycle status */}
      <div className="relative z-10 pb-12 px-6 flex items-center justify-between text-[10px] font-mono tracking-[0.28em] uppercase text-[var(--2pt-black)]/45 border-t border-[var(--2pt-black)]/8 pt-4">
        <span>Engagement model</span>
        <span className="text-[var(--2pt-green)] tabular-nums">
          Stage {STAGES[active].index} active
        </span>
      </div>
    </section>
  )
}
