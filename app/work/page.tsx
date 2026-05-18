"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { ContactSection } from "@/components/sections/contact-section"
import { CaseStudyGraphic, type CaseId } from "@/components/ui/case-study-graphic"
import { CountUp } from "@/components/ui/count-up"

type CaseStudy = {
  id: CaseId
  client: string
  subtitle?: string
  tag: string
  headline: string
  overview: string
  outcome: string
  deliverables: string[]
  metrics: { value: string; label: string }[]
  quote?: { text: string; author: string; company: string }
  liveLink?: { url: string; label: string }
}

const caseStudies: CaseStudy[] = [
  {
    id: "decamarx",
    client: "NYC Private Equity",
    subtitle: "Multi brand portfolio",
    tag: "Productised diagnostic · brand portfolio",
    headline: "A productised diagnostic for a multi brand portfolio.",
    overview:
      "A NYC private equity firm with multiple consumer brands needed one consistent lens for evaluating growth potential across the entire portfolio. We built DECAMARX, a productised brand growth diagnostic that translates patterns from four decades of cultural icons into commercial strategy. Productised once. Applied across every brand.",
    outcome:
      "DECAMARX runs as the portfolio's brand operating layer. Every brand assessed against the same eight cultural archetypes. Diagnostic outputs inform repositioning, capital allocation and creative direction. The system runs continuously and the IP belongs to them.",
    deliverables: [
      "DECAMARX diagnostic methodology built from scratch.",
      "Live deployed system inside the holdings group.",
      "Per brand diagnostic outputs across the portfolio.",
      "Annual refresh cadence and update workflow.",
    ],
    metrics: [
      { value: "100%", label: "Portfolio coverage" },
      { value: "8", label: "Archetypes" },
      { value: "40 yrs", label: "Pattern range" },
    ],
    liveLink: {
      url: "https://decamarxpartnership.2pt.ai",
      label: "See the live system",
    },
  },
  {
    id: "barker-beds",
    client: "Barker Beds",
    tag: "Retail Media · Owned Channel",
    headline: "A premium product made into a premium brand.",
    overview:
      "Barker Beds. A clinically validated premium dog bed in a $14.5B category. The product was strong. The brand experience was not. We rebuilt the commerce stack. Amazon ad architecture, Klaviyo retention engine, one source of truth across owned and paid.",
    outcome:
      "The system runs continuously. Acquisition costs dropped. AOV held at $270. The retention engine compounds every month.",
    deliverables: [
      "Amazon Ads restructure. Portfolios, campaigns, keyword architecture.",
      "Klaviyo retention engine with segmented flows and post purchase logic.",
      "Unified analytics across Amazon, Klaviyo and the owned site.",
      "Always on creative pipeline tied to category trends.",
    ],
    metrics: [
      { value: "$270", label: "AOV" },
      { value: "4.7★", label: "Rating" },
      { value: "$14.5B", label: "Category" },
    ],
  },
  {
    id: "harken",
    client: "Harken",
    subtitle: "Lil' Ones",
    tag: "Retail Media · Product Launch",
    headline: "Launching small products with outsized impact.",
    overview:
      "Launch Lil' Ones at Sprouts. Cut through a crowded shelf with a bite sized product. We built a dual channel retail media strategy across Instacart and Sprouts RTD. Designed for the moment of decision.",
    outcome:
      "10x revenue growth in the first window. 77% of buyers new to brand. Over a million high intent shoppers reached.",
    deliverables: [
      "Sponsored Products to win the most valuable search moments.",
      "Shoppable Display to secure category and homepage visibility.",
      "Shoppable Video to stop the scroll and spark trial.",
      "Multi format creative amplified across every Instacart placement.",
    ],
    metrics: [
      { value: "10x", label: "Revenue" },
      { value: "77%", label: "New to brand" },
      { value: "1M+", label: "Shoppers" },
    ],
    quote: {
      text: "We engineered a different type of campaign by combining the right targeting with the right creative. We proved that even the busiest shelf can make room for something new.",
      author: "Katie, Founder",
      company: "Harken",
    },
  },
  {
    id: "yamaha",
    client: "Yamaha",
    subtitle: "Genos 2",
    tag: "Global Product Launch",
    headline: "Taking a flagship product global.",
    overview:
      "Genos 2 is a Yamaha flagship. Premium price. Successor to one of their best selling keyboards. We built a content framework that travels. Adapts to every market and platform without losing the story or product credibility.",
    outcome:
      "Launched in six global markets with one story. Sell through ran above forecast. The framework now ships other Yamaha product lines.",
    deliverables: [
      "Platform agnostic content framework for global deployment.",
      "Story led creative communicating innovation and craft.",
      "Consumer demand alongside B2B seller acquisition.",
      "Globally aligned launch across the US, Europe and Japan.",
    ],
    metrics: [
      { value: "6", label: "Markets" },
      { value: "1", label: "Unified story" },
      { value: "100%", label: "Aligned launch" },
    ],
    quote: {
      text: "We built a system that allowed Yamaha to take a complex, high value product to market globally. We kept the story, positioning, and commercial objectives tightly connected.",
      author: "Marketing Manager",
      company: "Yamaha Corporation",
    },
  },
  {
    id: "dreamies",
    client: "Dreamies",
    subtitle: "by Mars Petcare",
    tag: "Content · Conversion",
    headline: "Category leadership, delivered.",
    overview:
      "Take Dreamies to the top of the UK cat treats category for Mars. We rebuilt the Amazon presence end to end. Precision media. Category leading content. Always on optimisation. Brand positioning that holds in a crowded aisle.",
    outcome:
      "#1 in category. Ad efficiency up 85%. Market share doubled. The system keeps running.",
    deliverables: [
      "Comprehensive Amazon Advertising strategy executed end to end.",
      "Category leading A+ Content and Brand Store builds.",
      "Data driven campaign optimisation on a continuous cadence.",
      "Competitive intelligence and market monitoring.",
    ],
    metrics: [
      { value: "2x", label: "Market share" },
      { value: "#1", label: "Category rank" },
      { value: "+85%", label: "Ad efficiency" },
    ],
    quote: {
      text: "2PT's expertise in Amazon and deep understanding of our category helped Dreamies achieve market leadership faster than we anticipated.",
      author: "Ecommerce Manager",
      company: "Mars Petcare",
    },
  },
]

export default function WorkPage() {
  return (
    <div className="bg-[var(--2pt-offwhite)] min-h-screen text-[var(--2pt-black)]">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex flex-col justify-center px-8 md:px-12 pt-28 pb-24">
        <Link
          href="/"
          className="absolute top-8 left-8 z-50 inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] uppercase text-[var(--2pt-black)]/60 hover:text-[var(--2pt-black)] transition-colors duration-500"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>

        <div className="max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-2.5 mb-12">
            <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full" />
            <span className="text-[10px] tracking-[0.3em] text-[var(--2pt-black)]/50 font-mono uppercase">
              Selected work
            </span>
          </div>

          <h1 className="text-[44px] sm:text-[56px] md:text-[80px] lg:text-[96px] font-medium tracking-[-0.025em] leading-[1.02] mb-16 max-w-5xl">
            <span className="block text-[var(--2pt-black)]">Production AI,</span>
            <span className="block text-[var(--2pt-black)]/55">shipped.</span>
          </h1>

          <p className="text-lg md:text-xl text-[var(--2pt-black)]/65 max-w-2xl leading-relaxed">
            Where we replaced an agency line item, retired a SaaS subscription, or rebuilt a marketing function around a deployed system.{" "}
            <span className="text-[var(--2pt-black)]">Each one runs in production.</span>
          </p>
        </div>
      </section>

      {/* Case studies — long-form editorial, alternating bg */}
      {caseStudies.map((study, index) => {
        const altBg = index % 2 === 1
        return (
          <section
            key={study.id}
            id={study.id}
            className={`relative px-8 md:px-12 py-32 md:py-48 border-t border-[var(--2pt-black)]/8 ${
              altBg ? "bg-[var(--2pt-white)]" : "bg-[var(--2pt-offwhite)]"
            }`}
          >
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="flex items-center gap-3 mb-12">
                <span className="text-[10px] tracking-[0.25em] text-[var(--2pt-black)]/40 font-mono uppercase">
                  Case 0{index + 1}
                </span>
                <div className="flex-1 h-px bg-[var(--2pt-black)]/10" />
                <span className="text-[10px] tracking-[0.25em] text-[var(--2pt-black)]/40 font-mono uppercase">
                  {study.tag}
                </span>
              </div>

              {/* Graphic */}
              <div className="relative aspect-[21/9] overflow-hidden mb-12 border border-[var(--2pt-black)]/8">
                <CaseStudyGraphic caseId={study.id} />
                <div className="absolute bottom-6 left-6 z-10">
                  <div className="bg-[var(--2pt-offwhite)]/95 backdrop-blur-sm px-4 py-2 inline-flex items-center gap-2.5 border border-[var(--2pt-black)]/8">
                    <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full" />
                    <span className="text-[11px] font-mono tracking-[0.18em] text-[var(--2pt-black)] uppercase">
                      {study.client}
                      {study.subtitle ? ` · ${study.subtitle}` : ""}
                    </span>
                  </div>
                </div>
              </div>

              {/* Headline */}
              <h2 className="text-[32px] sm:text-[42px] md:text-[56px] lg:text-[64px] font-medium tracking-[-0.025em] leading-[1.05] mb-16 max-w-4xl text-[var(--2pt-black)]">
                {study.headline}
              </h2>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-6 mb-20 pb-16 border-b border-[var(--2pt-black)]/10">
                {study.metrics.map((metric) => (
                  <div key={metric.label}>
                    <CountUp
                      value={metric.value}
                      className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[var(--2pt-black)] tracking-tight mb-3 tabular-nums"
                    />
                    <div className="text-[10px] sm:text-xs tracking-[0.2em] font-mono uppercase text-[var(--2pt-black)]/50">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Two-column overview + deliverables */}
              <div className="grid md:grid-cols-12 gap-10 md:gap-16">
                {/* Left: narrative */}
                <div className="md:col-span-7 space-y-12">
                  <div>
                    <div className="text-[10px] tracking-[0.25em] font-mono uppercase mb-4 text-[var(--2pt-black)]/40">
                      The brief
                    </div>
                    <p className="text-base md:text-[17px] leading-relaxed text-[var(--2pt-black)]/70">
                      {study.overview}
                    </p>
                  </div>

                  <div>
                    <div className="text-[10px] tracking-[0.25em] font-mono uppercase mb-4 text-[var(--2pt-black)]/40">
                      The outcome
                    </div>
                    <p className="text-base md:text-[17px] leading-relaxed text-[var(--2pt-black)]/70">
                      <span className="text-[var(--2pt-black)]">{study.outcome}</span>
                    </p>
                  </div>

                  {study.quote && (
                    <blockquote className="relative pt-8 border-t border-[var(--2pt-black)]/10">
                      <p className="text-lg md:text-xl leading-relaxed text-[var(--2pt-black)]/85 mb-4 max-w-xl">
                        &ldquo;{study.quote.text}&rdquo;
                      </p>
                      <footer className="text-[11px] font-mono tracking-[0.15em] uppercase text-[var(--2pt-black)]/50">
                        {study.quote.author} · {study.quote.company}
                      </footer>
                    </blockquote>
                  )}
                </div>

                {/* Right: deliverables */}
                <div className="md:col-span-5">
                  <div className="text-[10px] tracking-[0.25em] font-mono uppercase mb-6 text-[var(--2pt-black)]/40">
                    What we shipped
                  </div>
                  <ul className="space-y-5">
                    {study.deliverables.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-4 text-[15px] md:text-base leading-relaxed text-[var(--2pt-black)]/70"
                      >
                        <span className="font-mono text-[10px] tracking-wider text-[var(--2pt-black)]/40 mt-1.5 flex-shrink-0 w-6">
                          0{i + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {study.liveLink && (
                    <div className="mt-10 pt-8 border-t border-[var(--2pt-black)]/10">
                      <a
                        href={study.liveLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2.5 text-[11px] font-mono tracking-[0.18em] uppercase text-[var(--2pt-black)] hover:text-[var(--2pt-green)] transition-colors duration-500"
                      >
                        <span className="border-b border-[var(--2pt-black)] group-hover:border-[var(--2pt-green)] pb-0.5 transition-colors duration-500">
                          {study.liveLink.label}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-500" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* Closing — NDA banner */}
      <section className="relative py-32 md:py-48 px-8 md:px-12 bg-[var(--2pt-offwhite)] border-t border-[var(--2pt-black)]/8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2.5 mb-12">
            <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full" />
            <span className="text-[10px] tracking-[0.3em] text-[var(--2pt-black)]/50 font-mono uppercase">
              More in the pipeline
            </span>
          </div>

          <h2 className="text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-medium tracking-[-0.025em] leading-[1.05] max-w-4xl mb-12">
            <span className="block text-[var(--2pt-black)]">
              Most of the work we&rsquo;re proudest of
            </span>
            <span className="block text-[var(--2pt-black)]/55">
              is under NDA.
            </span>
          </h2>

          <p className="text-lg md:text-xl text-[var(--2pt-black)]/65 max-w-xl leading-relaxed mb-12">
            <span className="text-[var(--2pt-black)]">Ask us about it.</span>
          </p>

          <a
            href="#contact"
            className="group inline-flex items-center gap-3 text-sm font-mono tracking-[0.18em] uppercase text-[var(--2pt-black)] hover:text-[var(--2pt-green)] transition-colors duration-500"
          >
            <span className="border-b border-[var(--2pt-black)] group-hover:border-[var(--2pt-green)] pb-1 transition-colors duration-500">
              Tell us what you&rsquo;d ship
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
          </a>
        </div>
      </section>

      <ContactSection />
    </div>
  )
}
