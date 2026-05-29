import { HeroSection } from "@/components/sections/hero-section"
import { ClientStrip } from "@/components/sections/client-strip"
import { WhatWeSolveCinematic } from "@/components/sections/what-we-solve-cinematic"
import { ProductsSuite } from "@/components/sections/products-suite"
import { HowWeDeploy } from "@/components/sections/how-we-deploy"
import { ContactSection } from "@/components/sections/contact-section"
import { DeployConsole } from "@/components/mobile/deploy-console"
import { NoiseBackground } from "@/components/ui/noise-background"
import { FloatingNav } from "@/components/ui/floating-nav"

export default function Home() {
  return (
    <>
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
          <ProductsSuite />
          <HowWeDeploy />
          <ContactSection />
        </div>
        <div className="md:hidden">
          <DeployConsole />
        </div>
      </main>
    </>
  )
}
