"use client"

/**
 * SectionRail — sticky editorial chapter indicator on the left side.
 *
 * Shows where the reader is in the document like a printed publication
 * masthead: "II / IX · DEPLOY". Updates as sections enter the viewport.
 * Hidden on mobile (too crowded) and during the hero (so it doesn't
 * compete with the opening).
 */

import { useEffect, useState } from "react"

type Chapter = { id: string; numeral: string; label: string }

const CHAPTERS: Chapter[] = [
  { id: "what-we-solve", numeral: "I",   label: "Solve" },
  { id: "how-it-works",  numeral: "II",  label: "Deploy" },
  { id: "products",      numeral: "III", label: "Products" },
  { id: "contact",       numeral: "IV",  label: "Contact" },
]

export function SectionRail() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // One scroll handler — derives both visibility and active chapter from
    // scroll position. The "activation line" sits 35% from the top of the
    // viewport. Whichever chapter section is currently crossing that line
    // is the active chapter. Falls back to the most recently passed chapter
    // if there's a gap between sections.
    const handleScroll = () => {
      const sy = window.scrollY
      const activationY = sy + window.innerHeight * 0.35

      setIsVisible(sy > window.innerHeight * 0.7)

      let current: number | null = null
      for (let i = 0; i < CHAPTERS.length; i++) {
        const el = document.getElementById(CHAPTERS[i].id)
        if (!el) continue
        const top = el.offsetTop
        const bottom = top + el.offsetHeight
        if (activationY >= top && activationY < bottom) {
          current = i
          break
        }
      }
      // Fallback — pick the last chapter whose top is above the activation
      // line, so the rail still reads something between sections.
      if (current === null) {
        let best = -1
        for (let i = 0; i < CHAPTERS.length; i++) {
          const el = document.getElementById(CHAPTERS[i].id)
          if (el && el.offsetTop <= activationY) best = i
        }
        if (best >= 0) current = best
      }
      setActiveIndex(current)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const active = activeIndex != null ? CHAPTERS[activeIndex] : null
  const progress = activeIndex != null ? (activeIndex + 1) / CHAPTERS.length : 0

  // Don't render at all during the hero — avoids the opacity-transition gotcha.
  if (!isVisible || !active) return null

  return (
    <div
      aria-hidden
      data-section-rail
      className="hidden lg:flex fixed left-6 xl:left-8 z-40 flex-col items-start gap-4 pointer-events-none"
      style={{
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      {/* Progress rail — thin vertical line with a green segment indicating position */}
      <div className="relative w-px h-32 bg-[var(--2pt-black)]/15">
        <div
          className="absolute top-0 left-0 w-px bg-[var(--2pt-green)] transition-all duration-700 ease-out"
          style={{ height: `${progress * 100}%` }}
        />
      </div>

      {/* Label */}
      <div className="flex items-baseline gap-2 -ml-0.5">
        <span className="text-[10px] font-mono tracking-[0.25em] text-[var(--2pt-black)]/45 uppercase tabular-nums">
          {active?.numeral ?? ""}
          <span className="text-[var(--2pt-black)]/20"> / {CHAPTERS[CHAPTERS.length - 1].numeral}</span>
        </span>
      </div>
      <div className="text-[12px] font-medium tracking-tight text-[var(--2pt-black)]/80 -mt-2">
        {active?.label ?? ""}
      </div>
    </div>
  )
}
