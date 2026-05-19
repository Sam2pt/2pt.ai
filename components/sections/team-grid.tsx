"use client"

/**
 * TeamGrid — illustrated team band.
 *
 * Replaces the photographic founders strip. 30 stylised line-drawn
 * portraits across the actual disciplines a forward-deployed AI firm
 * carries: AI engineers, ML engineers, data engineers, forward-deployed
 * engineers, marketing strategists, product designers, brand & compliance,
 * customer success, plus founding leadership.
 *
 * Editorial italic intro line sits above the grid as the strongest content
 * of the section — the grid is supporting cast, the words land the message.
 *
 * Desktop: 6 cols × 5 rows. Mobile: 3 cols × 10 rows.
 */

import { TeamPortrait } from "@/components/ui/team-portrait"

type Member = { name: string; role: string }

const TEAM: Member[] = [
  // Founding / leadership
  { name: "Sam Gormley", role: "Founder, CEO" },
  { name: "Tyler",       role: "Head of Engineering" },
  { name: "Anya",        role: "Head of AI" },
  { name: "Aryana",      role: "Head of Deployment" },
  { name: "Theo",        role: "Head of Operations" },
  // AI Engineers (8)
  { name: "Maya",        role: "AI Engineer" },
  { name: "Jordan",      role: "AI Engineer" },
  { name: "Priya",       role: "AI Engineer" },
  { name: "Kai",         role: "AI Engineer" },
  { name: "Rina",        role: "AI Engineer" },
  { name: "Mateo",       role: "AI Engineer" },
  { name: "Lena",        role: "AI Engineer" },
  { name: "Bilal",       role: "AI Engineer" },
  // ML Engineers (3)
  { name: "Adrian",      role: "ML Engineer" },
  { name: "Naomi",       role: "ML Engineer" },
  { name: "Soraya",      role: "ML Engineer" },
  // Data Engineers (4)
  { name: "Sofia",       role: "Data Engineer" },
  { name: "Yuki",        role: "Data Engineer" },
  { name: "Oscar",       role: "Data Engineer" },
  { name: "Idris",       role: "Data Engineer" },
  // Forward-Deployed Engineers (4)
  { name: "Marcus",      role: "Forward-Deployed Engineer" },
  { name: "Elena",       role: "Forward-Deployed Engineer" },
  { name: "David",       role: "Forward-Deployed Engineer" },
  { name: "Nadia",       role: "Forward-Deployed Engineer" },
  // Marketing Strategists (2)
  { name: "Felix",       role: "Marketing Strategist" },
  { name: "Zara",        role: "Marketing Strategist" },
  // Product Designers (2)
  { name: "Liam",        role: "Product Designer" },
  { name: "Chloe",       role: "Product Designer" },
  // Brand & Compliance / Success (2)
  { name: "Diego",       role: "Brand & Compliance Lead" },
  { name: "Ines",        role: "Customer Success" },
]

export function TeamGrid() {
  return (
    <section
      aria-label="Team"
      className="relative bg-[var(--2pt-offwhite)] border-t border-[var(--2pt-black)]/10"
      style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.7)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 py-20 md:py-28">
        {/* Section eyebrow */}
        <div className="flex items-center gap-2.5 mb-10 md:mb-12">
          <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-pulse" />
          <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-[var(--2pt-black)]/50">
            <span className="text-[var(--2pt-black)]/30 mr-2">II.</span>Who deploys with you
          </span>
        </div>

        {/* Editorial intro line — Instrument Serif italic, the strongest content */}
        <p
          className="text-[24px] sm:text-[30px] md:text-[40px] lg:text-[48px] leading-[1.12] text-[var(--2pt-black)] italic max-w-4xl mb-14 md:mb-20"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {TEAM.length} engineers, strategists and deployment leads. We don&rsquo;t
          ship a tool and leave — we embed, deploy, and hand the system over.
        </p>

        {/* Grid header — counts + disciplines, mono publication chrome */}
        <div className="flex flex-wrap items-baseline justify-between gap-y-2 mb-6 pb-3 border-b border-[var(--2pt-black)]/12">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--2pt-black)]/45">
            Roster · {TEAM.length} active
          </span>
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/40">
            NYC · LDN
          </span>
        </div>

        {/* Portrait grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-7 md:gap-y-9">
          {TEAM.map((m, i) => (
            <figure
              key={`${m.name}-${i}`}
              className="group flex flex-col items-center text-center"
            >
              <div
                className="w-full aspect-square flex items-center justify-center text-[var(--2pt-black)]/75 group-hover:text-[var(--2pt-green)] transition-colors duration-500"
              >
                <TeamPortrait seed={i + 1} size={88} className="w-full h-full max-w-[96px]" />
              </div>
              <figcaption className="mt-2 flex flex-col items-center gap-0.5 w-full">
                <span className="text-[12px] font-medium text-[var(--2pt-black)] tracking-tight leading-tight truncate w-full">
                  {m.name}
                </span>
                <span className="text-[9px] font-mono tracking-[0.15em] uppercase text-[var(--2pt-black)]/45 leading-tight w-full px-1 line-clamp-2">
                  {m.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
