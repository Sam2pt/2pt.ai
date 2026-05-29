"use client"

/**
 * DeployConsole — completely unique mobile experience.
 *
 * Vertical scroll-snap "console" of 10 full-viewport cards. Each card is
 * 100dvh, snap-aligned, and renders a single beat of the narrative. Native-
 * app pattern: swipe up to advance, page indicator on the right edge tracks
 * progress, each card has its own purpose-built animation triggered when it
 * enters view via IntersectionObserver.
 *
 *   01 Hero — deploy claim + live deploy log
 *   02 Clients — sequential brand name reveal
 *   03–07 Five problems — each with a unique mobile-native viz
 *   08 How we deploy — 4-stage vertical flow
 *   09 Contact — conversion + colophon
 *   10 Footer — minimal closer
 *
 * Uses dynamic viewport height (`100dvh`) so the cards lock correctly even
 * when mobile browser chrome shrinks/expands during scroll.
 */

import { useEffect, useRef, useState } from "react"
import { HeroCard } from "@/components/mobile/cards/hero-card"
import { ClientsCard } from "@/components/mobile/cards/clients-card"
import { ProblemCard, MOBILE_PROBLEMS } from "@/components/mobile/cards/problem-card"
import { ProductsCard } from "@/components/mobile/cards/products-card"
import { DeployStagesCard } from "@/components/mobile/cards/deploy-stages-card"
import { ContactCard } from "@/components/mobile/cards/contact-card"
import { FooterCard } from "@/components/mobile/cards/footer-card"
import { PageIndicator } from "@/components/mobile/page-indicator"

const CARD_COUNT = 1 + 1 + MOBILE_PROBLEMS.length + 1 + 1 + 1 + 1 // = 11

export function DeployConsole() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Track which card is in view via IntersectionObserver on each card.
  useEffect(() => {
    const root = scrollRef.current
    if (!root) return
    const cards = root.querySelectorAll<HTMLElement>("[data-card-index]")
    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the largest intersection ratio.
        let best: IntersectionObserverEntry | null = null
        for (const e of entries) {
          if (!e.isIntersecting) continue
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e
        }
        if (best) {
          const idx = Number(
            (best.target as HTMLElement).dataset.cardIndex || "0"
          )
          setActiveIndex(idx)
        }
      },
      {
        root,
        // Card is "active" when at least 60% of it is visible.
        threshold: [0, 0.25, 0.5, 0.6, 0.75, 1],
      }
    )
    cards.forEach((c) => obs.observe(c))
    return () => obs.disconnect()
  }, [])

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="h-[100dvh] overflow-y-scroll snap-y snap-mandatory bg-[var(--2pt-black)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [overscroll-behavior:contain]"
      >
        <HeroCard index={0} />
        <ClientsCard index={1} />
        {MOBILE_PROBLEMS.map((p, i) => (
          <ProblemCard key={p.label} index={2 + i} data={p} />
        ))}
        <ProductsCard index={2 + MOBILE_PROBLEMS.length} />
        <DeployStagesCard index={3 + MOBILE_PROBLEMS.length} />
        <ContactCard index={4 + MOBILE_PROBLEMS.length} />
        <FooterCard index={5 + MOBILE_PROBLEMS.length} />
      </div>

      {/* Page indicator — right edge of viewport, fixed position */}
      <PageIndicator total={CARD_COUNT} active={activeIndex} />
    </div>
  )
}
