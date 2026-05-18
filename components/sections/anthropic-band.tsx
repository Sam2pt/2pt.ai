"use client"

import { useRef, useEffect, useState } from "react"
import { ArrowUpRight } from "lucide-react"

/**
 * AnthropicBand — a small credibility moment right after the hero.
 *
 * Modelled on Tomoro's "acquired by OpenAI" beat. The institutional
 * partnership gets its own breath: not a footnote, not a section.
 * Reduced padding so it reads as a band, not a full beat.
 */

export function AnthropicBand() {
  const ref = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true)
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="relative bg-[var(--2pt-offwhite)] text-[var(--2pt-black)] py-16 md:py-24 px-8 md:px-12 border-y border-[var(--2pt-black)]/10"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-12 gap-6 md:gap-10 items-center">
          {/* Left: eyebrow + headline */}
          <div className="md:col-span-8">
            <div
              className={`flex items-center gap-2.5 mb-5 transition-opacity duration-1000 ${
                isInView ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-pulse" />
              <span className="text-[10px] tracking-[0.3em] text-[var(--2pt-black)]/50 font-mono uppercase">
                Strategic partnership
              </span>
            </div>

            <h2 className="text-[28px] sm:text-[34px] md:text-[44px] lg:text-[52px] font-medium tracking-[-0.025em] leading-[1.05]">
              <span
                className={`transition-all duration-[1200ms] ease-out ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
                style={{ transitionDelay: "150ms" }}
              >
                We build with{" "}
                <span className="text-[var(--2pt-green)]">Anthropic</span>.
              </span>
            </h2>

            <p
              className={`mt-4 text-base md:text-[17px] text-[var(--2pt-black)]/55 leading-relaxed max-w-2xl transition-all duration-[1200ms] ease-out ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: "350ms" }}
            >
              Member of the Claude Partner Network. Production AI built on the foundation model layer that wins.
            </p>
          </div>

          {/* Right: CTA — visit Anthropic partner network */}
          <div
            className={`md:col-span-4 md:justify-self-end transition-all duration-[1200ms] ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
            style={{ transitionDelay: "550ms" }}
          >
            <a
              href="https://www.anthropic.com/partners"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 text-[11px] font-mono tracking-[0.18em] uppercase text-[var(--2pt-black)] hover:text-[var(--2pt-green)] transition-colors duration-500"
            >
              <span className="border-b border-[var(--2pt-black)] group-hover:border-[var(--2pt-green)] pb-0.5 transition-colors duration-500">
                Claude Partner Network
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
