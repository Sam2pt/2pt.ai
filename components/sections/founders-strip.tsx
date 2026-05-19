"use client"

/**
 * FoundersStrip — a small, editorial founders / team band.
 *
 * Three B&W portraits in a row with names + roles. Sits between the
 * cinematic chapter and the contact section as a trust signal — real
 * humans, not abstract motion. Photos are already monochrome / square
 * crops so they read as a deliberate set.
 *
 * Desktop: 3 across. Mobile: stacks 2 → 1 depending on width.
 */

import Image from "next/image"

const FOUNDERS = [
  {
    name: "Sam Gormley",
    role: "Founder, CEO",
    src: "/images/team/sam.jpg",
  },
  {
    name: "Tyler",
    role: "Engineering",
    src: "/images/team/tyler.jpg",
  },
  {
    name: "Aryana",
    role: "Operations",
    src: "/images/team/aryana.jpg",
  },
]

export function FoundersStrip() {
  return (
    <section
      aria-label="Founders"
      className="relative bg-[var(--2pt-offwhite)] border-t border-[var(--2pt-black)]/10"
      style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.7)" }}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-20 md:py-28">
        {/* Section eyebrow */}
        <div className="flex items-center gap-2.5 mb-10 md:mb-14">
          <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-pulse" />
          <span className="text-[10px] tracking-[0.3em] font-mono uppercase text-[var(--2pt-black)]/50">
            <span className="text-[var(--2pt-black)]/30 mr-2">II.</span>Behind every deployment
          </span>
        </div>

        {/* Intro line — editorial italic */}
        <p
          className="text-[22px] md:text-[28px] lg:text-[34px] leading-[1.15] text-[var(--2pt-black)]/85 italic max-w-3xl mb-12 md:mb-16"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          We don&rsquo;t ship a tool and leave. Embedded engineers, deployed
          systems, owned by the client.
        </p>

        {/* Founders grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {FOUNDERS.map((f) => (
            <figure
              key={f.name}
              className="group relative bg-[var(--2pt-white)] border border-[var(--2pt-black)]/8 rounded-[10px] overflow-hidden"
              style={{
                boxShadow:
                  "0 1px 0 rgba(255,255,255,0.8) inset, 0 14px 36px -18px rgba(10,10,10,0.20), 0 2px 6px -2px rgba(10,10,10,0.06)",
              }}
            >
              {/* Portrait — square crop */}
              <div className="relative aspect-square overflow-hidden bg-[var(--2pt-offwhite)]">
                <Image
                  src={f.src}
                  alt={`${f.name} — ${f.role}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                  style={{ filter: "grayscale(1) contrast(1.02)" }}
                />
                {/* Subtle bottom vignette so the caption row reads cleanly */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(255,255,255,0.85) 0%, transparent 100%)",
                  }}
                />
              </div>

              {/* Caption */}
              <figcaption className="px-5 py-4 flex items-center justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-[14px] font-medium text-[var(--2pt-black)] tracking-tight leading-tight">
                    {f.name}
                  </span>
                  <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-[var(--2pt-black)]/45 leading-tight mt-1">
                    {f.role}
                  </span>
                </div>
                <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full" />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
