"use client"

/**
 * CaseStrip — sticky top bar of case pills.
 *
 * Replaces the prev/next chevron pattern. Six pills, one per case, each
 * carrying an accent dot in the case's own colour. The pill matching the
 * case currently in view fills in; clicking any other pill smooth-scrolls
 * to that case's section.
 *
 * Mobile: pills become a horizontal flickable strip (overflow-x-scroll,
 * snap-x) so a thumb can swipe across the catalogue.
 *
 * Lives under the FloatingNav, sticky to `top-12`. Uses an
 * IntersectionObserver on `[data-case-slug]` anchors to track which case
 * is most in view.
 */

import { useEffect, useRef, useState } from "react"
import { CASES } from "@/lib/cases"

const ACCENT_HEX: Record<string, string> = {
  green: "#4ade80",
  cyan: "#22d3ee",
  lime: "#bef264",
  emerald: "#34d399",
}

export function CaseStrip({
  activeSlug,
  /** Render each pill as a Link rather than an anchor button.
   *  Used on /work/[slug] where there's only one case in the DOM and
   *  the pills should route to a different page. */
  asLinks = false,
}: {
  activeSlug?: string
  asLinks?: boolean
}) {
  const [observed, setObserved] = useState<string | null>(activeSlug ?? null)
  const stripRef = useRef<HTMLDivElement>(null)

  // Observe case sections to update active pill as user scrolls.
  useEffect(() => {
    if (asLinks) return // no observer needed on standalone case page
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-case-slug]"),
    )
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the most intersection area near the top of the viewport.
        let best: IntersectionObserverEntry | null = null
        for (const e of entries) {
          if (!e.isIntersecting) continue
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e
        }
        if (best) {
          const slug = (best.target as HTMLElement).dataset.caseSlug
          if (slug) setObserved(slug)
        }
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [asLinks])

  // Keep active pill scrolled into view on mobile.
  useEffect(() => {
    const strip = stripRef.current
    if (!strip || !observed) return
    const pill = strip.querySelector<HTMLElement>(
      `[data-pill-slug="${observed}"]`,
    )
    if (!pill) return
    const stripBox = strip.getBoundingClientRect()
    const pillBox = pill.getBoundingClientRect()
    if (pillBox.left < stripBox.left || pillBox.right > stripBox.right) {
      pill.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
    }
  }, [observed])

  const active = observed ?? CASES[0].slug

  return (
    <div
      className="sticky z-40"
      style={{
        top: 48,
        background: "var(--2pt-black)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 28px -16px rgba(0,0,0,0.6)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <div
          ref={stripRef}
          className="flex items-center gap-1.5 md:gap-2 overflow-x-auto overflow-y-hidden py-3 -mx-2 px-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {CASES.map((c, i) => {
            const isActive = c.slug === active
            const accent = ACCENT_HEX[c.accent]
            const content = (
              <span
                className={`relative inline-flex items-center gap-2 md:gap-2.5 px-3 md:px-3.5 h-10 md:h-9 rounded-[3px] border transition-all duration-300 snap-start whitespace-nowrap shrink-0 ${
                  isActive
                    ? "text-[var(--2pt-white)]"
                    : "text-[var(--2pt-white)]/65 hover:text-[var(--2pt-white)]"
                }`}
                style={{
                  borderColor: isActive ? `${accent}66` : "rgba(255,255,255,0.14)",
                  background: isActive ? `${accent}14` : "rgba(255,255,255,0.02)",
                  boxShadow: isActive
                    ? `0 0 22px -10px ${accent}AA, inset 0 0 0 0.5px ${accent}44`
                    : undefined,
                }}
              >
                {/* Accent dot */}
                <span
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: 6,
                    height: 6,
                    background: accent,
                    opacity: isActive ? 1 : 0.55,
                    boxShadow: isActive ? `0 0 8px 1px ${accent}99` : undefined,
                  }}
                />
                {/* Index — hidden on small screens to free up tap space */}
                <span className="hidden md:inline text-[9px] font-mono tracking-[0.2em] uppercase tabular-nums text-[var(--2pt-white)]/40">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                {/* Client wordmark */}
                <span className="text-[13px] md:text-[13px] font-medium tracking-tight">
                  {c.brand ?? c.client}
                </span>
              </span>
            )
            const commonProps = {
              "data-pill-slug": c.slug,
              key: c.slug,
              "aria-current": isActive ? ("page" as const) : undefined,
            }
            if (asLinks) {
              return (
                <a href={`/work/${c.slug}`} {...commonProps}>
                  {content}
                </a>
              )
            }
            return (
              <a
                href={`#${c.slug}`}
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById(c.slug)
                  if (!el) return
                  const y =
                    el.getBoundingClientRect().top + window.scrollY - 96
                  window.scrollTo({ top: y, behavior: "smooth" })
                  history.replaceState(null, "", `#${c.slug}`)
                }}
                {...commonProps}
              >
                {content}
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
