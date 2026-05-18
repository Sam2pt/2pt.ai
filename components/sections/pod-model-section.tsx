"use client"

import { useRef, useEffect, useState } from "react"

const roles = [
  {
    title: "AI Engineer",
    owns: "Architecture and shipping",
    description:
      "Ex foundation lab or top tier ML engineer. The system runs because they make it run.",
  },
  {
    title: "Marketing Strategist",
    owns: "Category depth and operations",
    description:
      "Ten plus years inside the function. Translates how marketing actually operates into agentic systems.",
  },
  {
    title: "Data Engineer",
    owns: "Warehouse, pipelines, LLM ops",
    description:
      "Connects the model to the messy reality of enterprise data. Plumbing that makes the system trustworthy.",
  },
]

const specs = [
  { label: "Deployment window", value: "6 to 12 months" },
  { label: "Commercial", value: "Fixed price retainer" },
  { label: "First ship", value: "Working system in 6 weeks" },
  { label: "Outcome", value: "Tied to your KPI" },
]

export function PodModelSection() {
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
      id="how-we-deploy"
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
            <span className="text-[var(--2pt-black)]/30 mr-2">III.</span>How we deploy
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
            AI doesn&rsquo;t deploy itself.
          </span>
          <span
            className={`block text-[var(--2pt-black)]/55 transition-all duration-[1200ms] ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "350ms" }}
          >
            Three roles get it into production.
          </span>
        </h2>

        {/* Subhead */}
        <p
          className={`text-lg md:text-xl text-[var(--2pt-black)]/65 max-w-2xl leading-relaxed mb-20 md:mb-24 transition-all duration-[1200ms] ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "550ms" }}
        >
          Every system 2PT ships goes into production with a small embedded team. They build inside your stack, hand the system back when it runs,{" "}
          <span className="text-[var(--2pt-black)]">and the IP stays with you.</span>
        </p>

        {/* Pod-inside-team diagram — visual anchor for "embedded inside your org" */}
        <div
          className={`mb-20 md:mb-24 transition-all duration-[1500ms] ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "650ms" }}
        >
          <svg
            viewBox="0 0 800 220"
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-auto max-h-[260px]"
          >
            <defs>
              <radialGradient id="pod-center" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(170,250,205,1)" />
                <stop offset="60%" stopColor="rgba(74,222,128,0.85)" />
                <stop offset="100%" stopColor="rgba(74,222,128,0.4)" />
              </radialGradient>
            </defs>

            {/* Outer team boundary — wide dashed rectangle */}
            <rect
              x="80"
              y="30"
              width="640"
              height="160"
              fill="none"
              stroke="rgba(10,10,10,0.18)"
              strokeWidth="1"
              strokeDasharray="3 6"
              rx="2"
            />

            {/* Top-left team label */}
            <text x="80" y="20" className="font-mono" style={{ fontSize: "10px", letterSpacing: "2px", fill: "rgba(10,10,10,0.4)" }}>
              YOUR MARKETING ORG
            </text>

            {/* Satellite dots — your existing team members across the boundary */}
            {[
              [130, 70], [180, 60], [240, 90], [165, 130], [120, 160],
              [580, 75], [640, 95], [690, 135], [610, 165],
              [410, 50], [450, 175], [350, 65],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="2.5" fill="rgba(10,10,10,0.35)" />
            ))}

            {/* The pod — 3 nodes in a triangle, centered */}
            <g transform="translate(400, 110)">
              {/* Connecting lines (pod cohesion) */}
              <line x1="-50" y1="22" x2="50" y2="22" stroke="rgba(74,222,128,0.5)" strokeWidth="1.25" />
              <line x1="-50" y1="22" x2="0" y2="-44" stroke="rgba(74,222,128,0.5)" strokeWidth="1.25" />
              <line x1="50" y1="22" x2="0" y2="-44" stroke="rgba(74,222,128,0.5)" strokeWidth="1.25" />

              {/* Outer pod halo */}
              <circle cx="0" cy="0" r="68" fill="none" stroke="rgba(74,222,128,0.5)" strokeWidth="1" />

              {/* Hub orb (the system the pod ships) */}
              <circle cx="0" cy="0" r="10" fill="url(#pod-center)" />
              <circle cx="0" cy="0" r="3" fill="white" />

              {/* Three role nodes around it */}
              <circle cx="-50" cy="22" r="6" fill="rgba(250,250,250,1)" stroke="rgba(10,10,10,0.5)" strokeWidth="1.25" />
              <circle cx="50" cy="22" r="6" fill="rgba(250,250,250,1)" stroke="rgba(10,10,10,0.5)" strokeWidth="1.25" />
              <circle cx="0" cy="-44" r="6" fill="rgba(250,250,250,1)" stroke="rgba(10,10,10,0.5)" strokeWidth="1.25" />

              {/* Role labels */}
              <text x="-50" y="48" textAnchor="middle" className="font-mono" style={{ fontSize: "9px", letterSpacing: "1.5px", fill: "rgba(10,10,10,0.55)" }}>
                AI ENG
              </text>
              <text x="50" y="48" textAnchor="middle" className="font-mono" style={{ fontSize: "9px", letterSpacing: "1.5px", fill: "rgba(10,10,10,0.55)" }}>
                DATA ENG
              </text>
              <text x="0" y="-56" textAnchor="middle" className="font-mono" style={{ fontSize: "9px", letterSpacing: "1.5px", fill: "rgba(10,10,10,0.55)" }}>
                STRATEGIST
              </text>
            </g>

            {/* Pulsing live indicator on the pod */}
            <circle
              cx="400"
              cy="110"
              r="78"
              fill="none"
              stroke="rgba(74,222,128,0.4)"
              strokeWidth="1"
              className="animate-pulse"
              style={{ animationDuration: "3s" }}
            />

            {/* Pod label */}
            <text x="400" y="210" textAnchor="middle" className="font-mono" style={{ fontSize: "10px", letterSpacing: "2.5px", fill: "rgba(74,222,128,1)" }}>
              2PT POD
            </text>
          </svg>
        </div>

        {/* Role cards — three columns, hairline divided */}
        <div className="grid md:grid-cols-3 border-t border-[var(--2pt-black)]/10">
          {roles.map((role, i) => (
            <div
              key={role.title}
              className={`py-12 md:py-16 ${
                i > 0 ? "md:border-l border-[var(--2pt-black)]/10 md:pl-10" : "md:pr-10"
              } transition-all duration-[1200ms] ease-out ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${750 + i * 180}ms` }}
            >
              {/* Role number */}
              <div className="flex items-center gap-2.5 mb-6">
                <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full" />
                <span className="text-[10px] tracking-[0.25em] text-[var(--2pt-black)]/40 font-mono uppercase">
                  Role 0{i + 1}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-[var(--2pt-black)] mb-3">
                {role.title}
              </h3>

              {/* What they own */}
              <div className="text-sm font-mono text-[var(--2pt-green)] tracking-wide mb-6">
                {role.owns}
              </div>

              {/* Description */}
              <p className="text-[15px] text-[var(--2pt-black)]/65 leading-relaxed">
                {role.description}
              </p>
            </div>
          ))}
        </div>

        {/* Specs strip — at-a-glance facts about the engagement */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--2pt-black)]/10 border border-[var(--2pt-black)]/10 mt-20 md:mt-24">
          {specs.map((spec, i) => (
            <div
              key={spec.label}
              className={`bg-[var(--2pt-offwhite)] p-6 md:p-7 transition-all duration-[1200ms] ease-out ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${1400 + i * 120}ms` }}
            >
              <div className="text-[10px] tracking-[0.25em] text-[var(--2pt-green)] font-mono uppercase mb-2">
                {spec.label}
              </div>
              <div className="text-sm md:text-base text-[var(--2pt-black)] font-medium leading-snug">
                {spec.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
