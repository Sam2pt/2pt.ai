"use client"

/**
 * WhatWeSolveMobile — five problems as plain stacked cards for mobile.
 *
 * No sticky pinning, no scroll-scrubbed motion graphics, no auto-running
 * widgets. Each problem is a card with: number, title, the question we
 * answer, the body, and a "recent" footnote with a concrete number.
 *
 * The desktop cinematic (WhatWeSolveCinematic) renders on md+; this
 * component renders below md.
 */

const PROBLEMS = [
  {
    label: "I",
    title: "Monitoring efficiency",
    line: "Where is spend leaking?",
    body: "An efficiency agent watches every channel, every campaign, every retailer. Anomalies surface in seconds, not in next month's report.",
    story: "Today: $14,200 of waste caught and reallocated.",
  },
  {
    label: "II",
    title: "Monitoring growth",
    line: "Which segments are actually driving it?",
    body: "Every segment scored on growth, share and trend in real time. Hot segments get more spend. Cooling segments get diagnosed before they break.",
    story: "Top segment driving 31% of incremental growth.",
  },
  {
    label: "III",
    title: "Driving growth",
    line: "How do we actually move the metric?",
    body: "A bidding system that runs 24/7 across Amazon, Walmart and Instacart. The agent trades the spend so your team focuses on the briefs that matter.",
    story: "1,284 bid auctions running this minute.",
  },
  {
    label: "IV",
    title: "Creative optimisation",
    line: "Which creative actually wins?",
    body: "Every variant scored against brand fit, hook strength and predicted CTR before it ships. Winners promoted, losers killed.",
    story: "312 variants scored today. 47 promoted to live spend.",
  },
  {
    label: "V",
    title: "Consistency and compliance",
    line: "Will legal kill this before it ships?",
    body: "Six bots run on every piece of creative output. Sentiment, intent, brand voice, claims, PII, image safety. Continuous. Auditable.",
    story: "12,847 assets scanned today. 142 flagged before they shipped.",
  },
]

export function WhatWeSolveMobile() {
  return (
    <section
      id="what-we-solve"
      className="relative bg-[var(--2pt-offwhite)] text-[var(--2pt-black)]"
    >
      {/* Section eyebrow — touches on five recurring problems, then signals
          the bespoke engagement work that sits beyond them */}
      <div className="px-5 pt-12 pb-8 border-b border-[var(--2pt-black)]/10">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-pulse" />
          <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-[var(--2pt-black)]/50">
            <span className="text-[var(--2pt-black)]/30 mr-2">I.</span>What we solve
          </span>
        </div>
        <p className="text-[15px] text-[var(--2pt-black)]/65 leading-relaxed mb-7">
          Recurring problems we ship systems against, plus bespoke
          engagements across four service tracks:
        </p>
        <div className="flex flex-col gap-2.5 text-[13px] text-[var(--2pt-black)]/85">
          {[
            "Strategy & diagnostics",
            "Custom deployment",
            "Enterprise integration",
            "Adoption & transfer",
          ].map((service, i) => (
            <div key={service} className="flex items-baseline gap-3">
              <span className="text-[9px] font-mono tracking-[0.2em] text-[var(--2pt-green)] tabular-nums w-6 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{service}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Problem cards */}
      <div className="divide-y divide-[var(--2pt-black)]/10">
        {PROBLEMS.map((p, i) => (
          <article key={p.label} className="px-5 py-10">
            {/* Eyebrow: problem number + index */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-[var(--2pt-green)]">
                Problem {p.label}
              </span>
              <span className="text-[10px] font-mono tracking-[0.2em] text-[var(--2pt-black)]/40 tabular-nums">
                {String(i + 1).padStart(2, "0")} / 0{PROBLEMS.length}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-[32px] font-medium tracking-[-0.025em] leading-[1.0] text-[var(--2pt-black)] mb-5">
              {p.title}
            </h2>

            {/* The question */}
            <p className="text-[17px] text-[var(--2pt-black)] leading-snug mb-4">
              {p.line}
            </p>

            {/* The body */}
            <p className="text-[14px] text-[var(--2pt-black)]/65 leading-relaxed mb-6">
              {p.body}
            </p>

            {/* Recent footnote */}
            <div className="flex items-baseline gap-2.5 pt-5 border-t border-[var(--2pt-black)]/12">
              <span className="w-1 h-1 bg-[var(--2pt-green)] rounded-full shrink-0 translate-y-[-2px]" />
              <span className="text-[9px] tracking-[0.25em] font-mono uppercase text-[var(--2pt-black)]/45 shrink-0">
                Recent
              </span>
              <span className="text-[12px] text-[var(--2pt-black)]/85 italic leading-snug">
                {p.story}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
