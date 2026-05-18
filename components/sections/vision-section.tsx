"use client"

import { useRef, useEffect, useState } from "react"

const phases = [
  {
    phase: "1st Era",
    era: "1960s",
    name: "Mass Media",
    description: "TV, print, radio. Reach over relevance.",
  },
  {
    phase: "2nd Era",
    era: "1990s",
    name: "Direct Response",
    description: "Mail, telemarketing, response measurement.",
  },
  {
    phase: "3rd Era",
    era: "2010s",
    name: "Digital & Social",
    description: "Targeting at scale. Attribution dashboards.",
  },
  {
    phase: "4th Era",
    era: "Now",
    name: "Deployed AI",
    description: "Production systems running marketing operations.",
    active: true,
  },
]

// Horizontal positions for each milestone on the timeline (viewBox %)
const milestoneXs = [10, 38, 62, 90]

export function VisionSection() {
  const ref = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="vision"
      className="relative bg-[var(--2pt-white)] text-[var(--2pt-black)] py-32 md:py-48 px-8 md:px-12 border-y border-[var(--2pt-black)]/8 overflow-hidden"
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
            <span className="text-[var(--2pt-black)]/30 mr-2">VI.</span>Where we&rsquo;re going
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
            Marketing has had three eras.
          </span>
          <span
            className={`block text-[var(--2pt-black)]/55 transition-all duration-[1200ms] ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "350ms" }}
          >
            The fourth is deployed.
          </span>
        </h2>

        {/* Body */}
        <p
          className={`text-lg md:text-xl text-[var(--2pt-black)]/65 max-w-2xl leading-relaxed mb-24 md:mb-32 transition-all duration-[1200ms] ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "550ms" }}
        >
          Each era was defined by a new substrate. Broadcast. Then response. Then data.{" "}
          <span className="text-[var(--2pt-black)]">The fourth is software that does the work itself.</span>
        </p>

        {/* Horizontal era timeline */}
        <div className="relative mb-20 md:mb-24">
          <svg
            viewBox="0 0 1000 180"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-auto"
          >
            <defs>
              <linearGradient id="era-line" x1="0" x2="1" y1="0.5" y2="0.5">
                <stop offset="0%" stopColor="rgba(10,10,10,0.10)" />
                <stop offset="65%" stopColor="rgba(10,10,10,0.35)" />
                <stop offset="100%" stopColor="rgba(74,222,128,0.85)" />
              </linearGradient>
              <radialGradient id="era-active" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(170,250,205,1)" />
                <stop offset="55%" stopColor="rgba(74,222,128,0.9)" />
                <stop offset="100%" stopColor="rgba(74,222,128,0.4)" />
              </radialGradient>
            </defs>

            {/* Faint dotted axis */}
            <line
              x1="20"
              y1="100"
              x2="980"
              y2="100"
              stroke="rgba(10,10,10,0.08)"
              strokeWidth="1"
              strokeDasharray="2 6"
            />

            {/* Solid timeline that animates from past to present */}
            <line
              x1={`${milestoneXs[0] * 10}`}
              y1="100"
              x2={`${milestoneXs[milestoneXs.length - 1] * 10}`}
              y2="100"
              stroke="url(#era-line)"
              strokeWidth="1.5"
              style={{
                transition: "stroke-dashoffset 2.4s ease-out",
                strokeDasharray: 800,
                strokeDashoffset: isInView ? 0 : 800,
                transitionDelay: "800ms",
              }}
            />

            {/* Milestones — orbs grow in size and weight from past → present */}
            {milestoneXs.map((xPct, i) => {
              const cx = xPct * 10
              const phase = phases[i]
              const isActive = phase.active
              const radius = 12 + i * 4 // 12, 16, 20, 24 — growing
              return (
                <g
                  key={i}
                  style={{
                    opacity: isInView ? 1 : 0,
                    transition: "opacity 700ms ease-out",
                    transitionDelay: `${1100 + i * 250}ms`,
                  }}
                >
                  {/* Era label above */}
                  <text
                    x={cx}
                    y="42"
                    textAnchor="middle"
                    className="font-mono fill-[rgba(10,10,10,0.45)]"
                    style={{ fontSize: "11px", letterSpacing: "2.5px" }}
                  >
                    {phase.era.toUpperCase()}
                  </text>

                  {/* Pulse halo on active */}
                  {isActive && (
                    <circle
                      cx={cx}
                      cy="100"
                      r={radius + 14}
                      fill="none"
                      stroke="rgba(74,222,128,0.5)"
                      strokeWidth="1"
                      className="animate-pulse"
                      style={{ animationDuration: "2.5s" }}
                    />
                  )}

                  {/* Orb */}
                  <circle
                    cx={cx}
                    cy="100"
                    r={radius}
                    fill={isActive ? "url(#era-active)" : "rgba(250,250,250,1)"}
                    stroke={isActive ? "rgba(74,222,128,0.9)" : "rgba(10,10,10,0.35)"}
                    strokeWidth={isActive ? "1.5" : "1"}
                  />

                  {/* Inner dot */}
                  <circle
                    cx={cx}
                    cy="100"
                    r={isActive ? "4" : "2"}
                    fill={isActive ? "white" : "rgba(10,10,10,0.55)"}
                  />

                  {/* Era number + name below */}
                  <text
                    x={cx}
                    y="148"
                    textAnchor="middle"
                    className={
                      isActive
                        ? "fill-[var(--2pt-black)] font-medium"
                        : "fill-[rgba(10,10,10,0.6)] font-medium"
                    }
                    style={{ fontSize: "16px", letterSpacing: "-0.01em" }}
                  >
                    {phase.name}
                  </text>
                  <text
                    x={cx}
                    y="168"
                    textAnchor="middle"
                    className="font-mono fill-[rgba(10,10,10,0.4)]"
                    style={{ fontSize: "10px", letterSpacing: "2px" }}
                  >
                    {phase.phase.toUpperCase()}
                  </text>
                </g>
              )
            })}

            {/* Arrow head at the end */}
            <g
              style={{
                opacity: isInView ? 1 : 0,
                transition: "opacity 700ms ease-out",
                transitionDelay: "2200ms",
              }}
            >
              <path
                d="M 938 95 L 950 100 L 938 105"
                fill="none"
                stroke="rgba(74,222,128,0.9)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>

        {/* Era descriptions — small grid below */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 pt-12 border-t border-[var(--2pt-black)]/10">
          {phases.map((phase, i) => (
            <div
              key={i}
              className={`transition-all duration-[1200ms] ease-out ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${2400 + i * 150}ms` }}
            >
              <div
                className={`text-[10px] tracking-[0.25em] font-mono uppercase mb-3 ${
                  phase.active
                    ? "text-[var(--2pt-green)]"
                    : "text-[var(--2pt-black)]/40"
                }`}
              >
                {phase.era}
              </div>
              <p className="text-sm text-[var(--2pt-black)]/65 leading-relaxed">
                {phase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
