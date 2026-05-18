"use client"

import { useRef, useEffect, useState } from "react"

/**
 * ThesisBanner — full-bleed dark interruption section.
 *
 * Visual rhythm device. Light sections stack, then this drops — black canvas,
 * oversized green statement, then back to light. Creates the punctuation
 * moment the page needed.
 */

export function ThesisBanner() {
  const ref = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true)
      },
      { threshold: 0.25 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const viewportH = window.innerHeight
      const progress = Math.max(0, Math.min(1, 1 - rect.top / viewportH))
      setScrollProgress(progress)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      ref={ref}
      id="thesis"
      className="relative bg-[var(--2pt-black)] text-[var(--2pt-white)] py-40 md:py-56 px-8 md:px-12 overflow-hidden"
    >
      {/* Ambient morphing green orb that drifts as you scroll past */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "50%",
          top: "50%",
          width: "75vw",
          height: "75vw",
          maxWidth: "800px",
          maxHeight: "800px",
          transform: `translate(-50%, -50%) scale(${0.7 + scrollProgress * 0.5})`,
          background:
            "radial-gradient(circle at 45% 50%, rgba(74,222,128,0.28) 0%, rgba(74,222,128,0.10) 45%, transparent 70%)",
          filter: "blur(12px)",
          opacity: 0.6 + scrollProgress * 0.4,
          transition: "opacity 0.4s ease-out",
        }}
      />

      {/* Faint dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div
          className={`flex items-center gap-2.5 mb-16 transition-opacity duration-1000 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-pulse" />
          <span className="text-[10px] tracking-[0.3em] text-[var(--2pt-white)]/55 font-mono uppercase">
            <span className="text-[var(--2pt-white)]/35 mr-2">VII.</span>The thesis
          </span>
        </div>

        {/* Display headline — oversized, green second line */}
        <h2 className="font-medium tracking-[-0.03em] leading-[0.98] mb-16 md:mb-20">
          <span
            className={`block text-[44px] sm:text-[64px] md:text-[88px] lg:text-[112px] text-[var(--2pt-white)] transition-all duration-[1400ms] ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            Marketing gets rebuilt every decade.
          </span>
          <span
            className={`block text-[52px] sm:text-[72px] md:text-[104px] lg:text-[128px] text-[var(--2pt-green)] transition-all duration-[1400ms] ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            We&rsquo;re building this one.
          </span>
        </h2>

        {/* Three short supporting beats */}
        <div className="grid md:grid-cols-3 gap-x-10 gap-y-6 max-w-4xl">
          {[
            { label: "01", text: "Software you license is rent. Systems you deploy are equity." },
            { label: "02", text: "The firms that own capability outrun the ones that rent it." },
            { label: "03", text: "This decade rewards builders. Last decade rewarded buyers." },
          ].map((beat, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 transition-all duration-[1200ms] ease-out ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${700 + i * 180}ms` }}
            >
              <span className="text-[10px] tracking-[0.25em] text-[var(--2pt-green)] font-mono uppercase pt-1.5">
                {beat.label}
              </span>
              <p className="text-[15px] md:text-base text-[var(--2pt-white)]/70 leading-relaxed">
                {beat.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
