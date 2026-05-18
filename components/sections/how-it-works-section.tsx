"use client"

import { useRef, useEffect, useState } from "react"

const phases = [
  {
    index: "01",
    title: "Foundation",
    window: "Weeks 1 to 6",
    description:
      "Pod embeds. We audit your operations and data, pick the target system, and ship a working POC on a contained surface. Supervised mode. Real data. A safe sandbox to prove the system.",
    deliverable: "Working POC on real data",
  },
  {
    index: "02",
    title: "Production",
    window: "Weeks 7 to 20",
    description:
      "Full integrations land. The agent runs 24/7. Supervised, then auto execute with guardrails. Prototype to production. Your KPI starts to move.",
    deliverable: "Live system. KPI moving.",
  },
  {
    index: "03",
    title: "Compound",
    window: "Weeks 21 to 52",
    description:
      "Optimise. Expand to new channels and brands. Transfer the build to your team. Harvest the IP into platform. Each next deployment costs less.",
    deliverable: "Owned system. Compounding ROI.",
  },
]

// Positions along the SVG track (in viewBox % terms)
const milestoneXs = [12, 50, 88]

export function HowItWorksSection() {
  const ref = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true)
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="how-it-works"
      className="relative bg-[var(--2pt-offwhite)] text-[var(--2pt-black)] py-32 md:py-48 px-8 md:px-12 overflow-hidden"
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
            <span className="text-[var(--2pt-black)]/30 mr-2">II.</span>How we work
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
            Foundation. Production.
          </span>
          <span
            className={`block text-[var(--2pt-black)]/55 transition-all duration-[1200ms] ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "350ms" }}
          >
            Compound.
          </span>
        </h2>

        {/* Subhead */}
        <p
          className={`text-lg md:text-xl text-[var(--2pt-black)]/65 max-w-xl leading-relaxed mb-24 md:mb-32 transition-all duration-[1200ms] ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "550ms" }}
        >
          One twelve month engagement. Three phases.{" "}
          <span className="text-[var(--2pt-black)]">A system you own at the end of it.</span>
        </p>

        {/* Horizontal journey track */}
        <div className="relative mb-20 md:mb-24">
          <svg
            viewBox="0 0 1000 140"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-auto"
          >
            <defs>
              <linearGradient id="journey-line" x1="0" x2="1" y1="0.5" y2="0.5">
                <stop offset="0%" stopColor="rgba(10,10,10,0.10)" />
                <stop offset="50%" stopColor="rgba(10,10,10,0.30)" />
                <stop offset="100%" stopColor="rgba(74,222,128,0.65)" />
              </linearGradient>
              <radialGradient id="journey-orb" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(170,250,205,1)" />
                <stop offset="60%" stopColor="rgba(74,222,128,0.85)" />
                <stop offset="100%" stopColor="rgba(74,222,128,0.4)" />
              </radialGradient>
            </defs>

            {/* Faint horizontal axis behind the track */}
            <line
              x1="20"
              y1="70"
              x2="980"
              y2="70"
              stroke="rgba(10,10,10,0.08)"
              strokeWidth="1"
              strokeDasharray="2 6"
            />

            {/* The journey line — animates as the section enters view */}
            <line
              x1={`${milestoneXs[0] * 10}`}
              y1="70"
              x2={`${milestoneXs[2] * 10}`}
              y2="70"
              stroke="url(#journey-line)"
              strokeWidth="1.5"
              style={{
                transition: "stroke-dasharray 2s ease-out, stroke-dashoffset 2s ease-out",
                strokeDasharray: 760,
                strokeDashoffset: isInView ? 0 : 760,
                transitionDelay: "800ms",
              }}
            />

            {/* Milestones */}
            {milestoneXs.map((xPct, i) => {
              const cx = xPct * 10
              const isLast = i === milestoneXs.length - 1
              return (
                <g
                  key={i}
                  style={{
                    opacity: isInView ? 1 : 0,
                    transition: "opacity 700ms ease-out",
                    transitionDelay: `${1100 + i * 250}ms`,
                  }}
                >
                  {/* Phase number above */}
                  <text
                    x={cx}
                    y="28"
                    textAnchor="middle"
                    className="font-mono fill-[rgba(10,10,10,0.45)]"
                    style={{ fontSize: "11px", letterSpacing: "2.5px" }}
                  >
                    PHASE {phases[i].index}
                  </text>

                  {/* Outer ring */}
                  <circle
                    cx={cx}
                    cy="70"
                    r="22"
                    fill={isLast ? "url(#journey-orb)" : "rgba(245,245,245,1)"}
                    stroke={isLast ? "rgba(74,222,128,0.9)" : "rgba(10,10,10,0.30)"}
                    strokeWidth="1.25"
                  />

                  {/* Inner dot */}
                  <circle
                    cx={cx}
                    cy="70"
                    r="4"
                    fill={isLast ? "rgba(255,255,255,0.95)" : "rgba(74,222,128,1)"}
                  />

                  {/* Week label below */}
                  <text
                    x={cx}
                    y="120"
                    textAnchor="middle"
                    className="font-mono fill-[rgba(10,10,10,0.55)]"
                    style={{ fontSize: "12px", letterSpacing: "1.5px" }}
                  >
                    {phases[i].window}
                  </text>
                </g>
              )
            })}

            {/* Arrowhead at end */}
            <g
              style={{
                opacity: isInView ? 1 : 0,
                transition: "opacity 700ms ease-out",
                transitionDelay: "1900ms",
              }}
            >
              <path
                d="M 895 65 L 905 70 L 895 75"
                fill="none"
                stroke="rgba(74,222,128,0.9)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>

        {/* Phase content — 3 rich columns */}
        <div className="grid md:grid-cols-3 gap-px bg-[var(--2pt-black)]/10">
          {phases.map((phase, i) => (
            <div
              key={i}
              className={`bg-[var(--2pt-offwhite)] p-8 md:p-10 transition-all duration-[1200ms] ease-out ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${2100 + i * 200}ms` }}
            >
              <div className="text-[10px] tracking-[0.25em] text-[var(--2pt-black)]/40 font-mono uppercase mb-3">
                Phase {phase.index}
              </div>
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-[var(--2pt-black)] mb-2">
                {phase.title}
              </h3>
              <div className="text-sm font-mono text-[var(--2pt-green)] tracking-wide mb-6">
                {phase.window}
              </div>
              <p className="text-[15px] text-[var(--2pt-black)]/65 leading-relaxed mb-8">
                {phase.description}
              </p>

              {/* Deliverable footer */}
              <div className="pt-5 border-t border-[var(--2pt-black)]/10 flex items-center gap-2.5">
                <span className="w-1 h-1 bg-[var(--2pt-green)] rounded-full" />
                <span className="text-[11px] font-mono tracking-wide text-[var(--2pt-black)]/55">
                  {phase.deliverable}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
