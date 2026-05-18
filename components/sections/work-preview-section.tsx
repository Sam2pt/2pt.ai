"use client"

import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { useRef } from "react"
import { useInView } from "@/hooks/use-scroll-animation"
import { CaseStudyGraphic, type CaseId } from "@/components/ui/case-study-graphic"
import { CountUp } from "@/components/ui/count-up"

type WorkItem = {
  caseId: CaseId
  client: string
  tag: string
  description: string
  stats: { value: string; label: string }[]
  href: string
}

const workItems: WorkItem[] = [
  {
    caseId: "decamarx",
    client: "NYC Private Equity",
    tag: "Productised diagnostic · brand portfolio",
    description:
      "A NYC PE firm with multiple consumer brands. We built DECAMARX, a productised brand growth diagnostic that turns four decades of cultural pattern recognition into commercial strategy. Productised once. Applied across every brand.",
    stats: [
      { value: "100%", label: "Portfolio coverage" },
      { value: "8", label: "Archetypes" },
      { value: "Annual", label: "Cadence" },
    ],
    href: "/work/decamarx",
  },
  {
    caseId: "harken",
    client: "Harken",
    tag: "Retail Media · Product Launch",
    description:
      "Launched Lil' Ones at Sprouts. Dual channel retail media across Instacart and Sprouts RTD. Built for the moment of decision.",
    stats: [
      { value: "10x", label: "Revenue" },
      { value: "77%", label: "New to brand" },
      { value: "1M+", label: "Shoppers" },
    ],
    href: "/work/harken",
  },
  {
    caseId: "yamaha",
    client: "Yamaha",
    tag: "Global Product Launch",
    description:
      "Five year partnership. Multi market commerce. AI creative production. The pivot from hardware to services.",
    stats: [
      { value: "5 yrs", label: "Relationship" },
      { value: "Global", label: "Footprint" },
      { value: "Multi cat", label: "Coverage" },
    ],
    href: "/work/yamaha",
  },
  {
    caseId: "dreamies",
    client: "Dreamies",
    tag: "Content · Conversion",
    description:
      "Content built to convert across owned and retail media channels for one of Mars Petcare's most loved brands.",
    stats: [
      { value: "Mars", label: "Portfolio" },
      { value: "UK + EU", label: "Footprint" },
      { value: "Always on", label: "Cadence" },
    ],
    href: "/work/dreamies",
  },
]

export function WorkPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { threshold: 0.1 })

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-48 px-8 md:px-12 bg-[var(--2pt-offwhite)] text-[var(--2pt-black)]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={`flex items-center gap-2.5 mb-12 transition-opacity duration-1000 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full" />
          <span className="text-[10px] tracking-[0.3em] text-[var(--2pt-black)]/50 font-mono uppercase">
            Selected work
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-medium tracking-[-0.025em] leading-[1.05] max-w-4xl mb-12">
          <span
            className={`block text-[var(--2pt-black)] transition-all duration-[1200ms] ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            Production AI,
          </span>
          <span
            className={`block text-[var(--2pt-black)]/55 transition-all duration-[1200ms] ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "350ms" }}
          >
            shipped.
          </span>
        </h2>

        {/* Subhead */}
        <p
          className={`text-lg md:text-xl text-[var(--2pt-black)]/65 max-w-2xl leading-relaxed mb-20 md:mb-24 transition-all duration-[1200ms] ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "550ms" }}
        >
          Where we replaced an agency line item, retired a SaaS subscription, or rebuilt a marketing function around a deployed system.
        </p>

        {/* Case study grid */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-14">
          {workItems.map((item, index) => (
            <Link
              key={item.client}
              href={item.href}
              className={`group relative block transition-all duration-[1200ms] ease-out ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${700 + index * 150}ms` }}
            >
              {/* Graphic */}
              <div className="relative aspect-[4/3] overflow-hidden mb-6 border border-[var(--2pt-black)]/8 transition-transform duration-[1500ms] ease-out group-hover:scale-[1.01]">
                <CaseStudyGraphic caseId={item.caseId} />
                <div className="absolute top-4 right-4 w-9 h-9 bg-[var(--2pt-offwhite)]/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-2 group-hover:translate-x-0 z-10">
                  <ArrowUpRight className="w-4 h-4 text-[var(--2pt-black)]" />
                </div>
              </div>

              {/* Content */}
              <div>
                <div className="text-[10px] tracking-[0.25em] text-[var(--2pt-black)]/40 font-mono uppercase mb-3">
                  {item.tag}
                </div>
                <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-[var(--2pt-black)] mb-3 group-hover:text-[var(--2pt-green)] transition-colors duration-500">
                  {item.client}
                </h3>
                <p className="text-[15px] text-[var(--2pt-black)]/65 leading-relaxed mb-6 max-w-md">
                  {item.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[var(--2pt-black)]/10">
                  {item.stats.map((stat) => (
                    <div key={stat.label}>
                      <CountUp
                        value={stat.value}
                        className="block text-xl md:text-2xl font-medium text-[var(--2pt-black)] mb-1 tabular-nums"
                      />
                      <div className="text-[10px] tracking-[0.15em] text-[var(--2pt-black)]/40 font-mono uppercase">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div
          className={`mt-20 md:mt-24 transition-all duration-[1200ms] ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "1300ms" }}
        >
          <Link
            href="/work"
            className="group inline-flex items-center gap-3 text-sm font-mono tracking-[0.18em] uppercase text-[var(--2pt-black)] hover:text-[var(--2pt-green)] transition-colors duration-500"
          >
            <span className="border-b border-[var(--2pt-black)] group-hover:border-[var(--2pt-green)] pb-1 transition-colors duration-500">
              See all case studies
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
          </Link>
        </div>
      </div>
    </section>
  )
}
