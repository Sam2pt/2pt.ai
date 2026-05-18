"use client"

import { useRef, useEffect, useState } from "react"
import { SystemMark, type SystemMarkVariant } from "@/components/ui/system-mark"

/**
 * WhatWeBuildSection — the missing "would you build my thing?" beat.
 *
 * Five categories of systems we ship, in plain language.
 * Buyer scans, self-identifies, knows within 30 seconds whether
 * 2PT is in the right shape for their problem.
 */

type System = {
  number: string
  title: string
  description: string
  mark: SystemMarkVariant
}

const systems: System[] = [
  {
    number: "01",
    title: "Monitoring efficiency",
    description:
      "Spend efficiency intelligence. Agents that watch every channel, every campaign and every retailer. Flag anomalies. Surface waste. Suggest reallocation. The leak finder runs continuously, not quarterly.",
    mark: 1,
  },
  {
    number: "02",
    title: "Monitoring growth",
    description:
      "Unified growth visibility across cohorts, channels, surfaces and AI workflows. One source of truth for the question every board asks: where is growth actually coming from?",
    mark: 0,
  },
  {
    number: "03",
    title: "Driving growth",
    description:
      "Retail media autopilot. Agents that trade bids and ship creative variants across Amazon, Walmart and Instacart. The system moves the metric while your team focuses on the briefs that matter.",
    mark: 4,
  },
  {
    number: "04",
    title: "Creative optimisation",
    description:
      "Generative creative pipelines tied to your retail media platforms. Ship variants at the pace the algorithms reward. Brand voice baked in, not bolted on.",
    mark: 2,
  },
  {
    number: "05",
    title: "Consistency and compliance",
    description:
      "Brand voice and compliance layer. Enforces tone, regulatory standards and market specific rules across every piece of creative output. From DM triage to global launch.",
    mark: 3,
  },
]

export function WhatWeBuildSection() {
  const ref = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="what-we-solve"
      className="relative bg-[var(--2pt-offwhite)] text-[var(--2pt-black)] py-32 md:py-48 px-8 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div
          className={`flex items-center gap-2.5 mb-12 transition-opacity duration-1000 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full" />
          <span className="text-[10px] tracking-[0.3em] text-[var(--2pt-black)]/50 font-mono uppercase">
            <span className="text-[var(--2pt-black)]/30 mr-2">I.</span>What we solve
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-medium tracking-[-0.025em] leading-[1.05] max-w-5xl mb-12">
          <span
            className={`block text-[var(--2pt-black)] transition-all duration-[1200ms] ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            Marketing has five hard
          </span>
          <span
            className={`block text-[var(--2pt-black)]/55 transition-all duration-[1200ms] ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "350ms" }}
          >
            operational problems.
          </span>
        </h2>

        {/* Subhead */}
        <p
          className={`text-lg md:text-xl text-[var(--2pt-black)]/65 max-w-2xl leading-relaxed mb-20 md:mb-24 transition-all duration-[1200ms] ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "550ms" }}
        >
          Each one gets its own system.{" "}
          <span className="text-[var(--2pt-black)]">Live, embedded inside your team, and the IP stays with you.</span>
        </p>

        {/* Five-row directory of systems */}
        <div className="border-t border-[var(--2pt-black)]/10">
          {systems.map((system, i) => (
            <div
              key={system.number}
              className={`group grid md:grid-cols-12 gap-6 md:gap-10 py-10 md:py-14 border-b border-[var(--2pt-black)]/10 transition-all duration-[1200ms] ease-out ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${750 + i * 130}ms` }}
            >
              {/* Number + mark */}
              <div className="md:col-span-2 flex md:flex-col items-start gap-4 md:gap-5">
                <span className="text-[11px] font-mono tracking-[0.25em] text-[var(--2pt-green)] uppercase pt-1">
                  {system.number}
                </span>
                <div className="w-[52px] h-[52px] md:w-[60px] md:h-[60px] transition-transform duration-700 ease-out group-hover:rotate-[10deg]">
                  <SystemMark variant={system.mark} />
                </div>
              </div>

              {/* Title */}
              <div className="md:col-span-4">
                <h3 className="text-xl md:text-2xl lg:text-[28px] font-medium tracking-tight text-[var(--2pt-black)] leading-snug">
                  {system.title}
                </h3>
              </div>

              {/* Description */}
              <div className="md:col-span-6">
                <p className="text-[15px] md:text-base text-[var(--2pt-black)]/65 leading-relaxed">
                  {system.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
