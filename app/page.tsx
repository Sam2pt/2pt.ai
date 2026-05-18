import { HeroSection } from "@/components/sections/hero-section"
import { ClientStrip } from "@/components/sections/client-strip"
import { WhatWeSolveCinematic } from "@/components/sections/what-we-solve-cinematic"
import { ContactSection } from "@/components/sections/contact-section"
import { HeroMobile } from "@/components/sections/hero-mobile"
import { ClientStripMobile } from "@/components/sections/client-strip-mobile"
import { WhatWeSolveMobile } from "@/components/sections/what-we-solve-mobile"
import { ContactMobile } from "@/components/sections/contact-mobile"
import { CursorGlow } from "@/components/ui/cursor-glow"
import { NoiseBackground } from "@/components/ui/noise-background"
import { FloatingNav } from "@/components/ui/floating-nav"

export default function Home() {
  return (
    <>
      <CursorGlow />
      <NoiseBackground />
      <FloatingNav />
      <main className="min-h-screen [overflow-x:clip]">
        {/*
          Two completely separate experiences swapped by viewport.

          DESKTOP (md+) — the cinematic editorial experience. Sticky
          scroll, motion graphics, marquee, oversized typography.

          MOBILE (< md) — stripped, matter-of-fact, straight down the
          middle. No sticky pinning, no motion graphics, no marquee.
          Every problem becomes a card. Every section reads top to
          bottom in one column.
        */}
        <div className="hidden md:contents">
          <HeroSection />
          <ClientStrip />
          <WhatWeSolveCinematic />
          <ContactSection />
        </div>
        <div className="md:hidden">
          <HeroMobile />
          <ClientStripMobile />
          <WhatWeSolveMobile />
          <ContactMobile />
        </div>
      </main>
    </>
  )
}
