"use client"

import { useRef, useEffect, useState } from "react"

const pillars = [
  {
    number: "01",
    text: "We ship live systems.",
    description:
      "Every engagement ends with production AI running inside your business. Software that does the work. Code in production from week one.",
  },
  {
    number: "02",
    text: "Our pods live inside your team.",
    description:
      "Six to twelve months on the ground. Engineers and strategists who join your team, report to your VP, and build alongside you.",
  },
  {
    number: "03",
    text: "You buy the outcome.",
    description:
      "Fixed price. Tied to an operational KPI you actually care about. We get paid when the metric moves. Skin in the game from day one.",
  },
  {
    number: "04",
    text: "You keep the system.",
    description:
      "Every engagement produces IP that belongs to you. The strongest of it becomes platform we run with the next client. Capability that compounds.",
  },
]

export function ProblemSection() {
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
            The Gap
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-medium tracking-[-0.025em] leading-[1.05] max-w-5xl mb-16">
          <span
            className={`block text-[var(--2pt-black)] transition-all duration-[1200ms] ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            Every CMO bought ChatGPT seats.
          </span>
          <span
            className={`block text-[var(--2pt-black)]/55 transition-all duration-[1200ms] ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "350ms" }}
          >
            The next move is shipping to production.
          </span>
        </h2>

        {/* Subhead */}
        <p
          className={`text-lg md:text-xl text-[var(--2pt-black)]/65 max-w-2xl leading-relaxed mb-20 md:mb-24 transition-all duration-[1200ms] ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "550ms" }}
        >
          The space between &ldquo;we use AI&rdquo; and &ldquo;AI runs our marketing&rdquo; is the biggest opportunity in enterprise marketing.{" "}
          <span className="text-[var(--2pt-black)]">2PT builds in it.</span>
        </p>

        {/* Pillars — minimal hairline grid */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16 pt-16 border-t border-[var(--2pt-black)]/10">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.number}
              className={`transition-all duration-[1200ms] ease-out ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${700 + index * 150}ms` }}
            >
              <div className="text-[10px] tracking-[0.25em] text-[var(--2pt-black)]/40 font-mono uppercase mb-4">
                {pillar.number}
              </div>
              <h3 className="text-2xl md:text-[28px] font-medium tracking-tight text-[var(--2pt-black)] mb-4">
                {pillar.text}
              </h3>
              <p className="text-[15px] md:text-base text-[var(--2pt-black)]/60 leading-relaxed max-w-md">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
