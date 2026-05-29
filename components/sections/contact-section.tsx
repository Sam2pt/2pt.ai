"use client"

import { useRef, useEffect, useState } from "react"
import { ArrowRight, ArrowUpRight } from "lucide-react"

export function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true)
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    setTime(new Date())
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const fmt = (tz: "America/New_York" | "Europe/London") =>
    time
      ? time.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: tz,
        })
      : "··:··"

  return (
    <section ref={ref} id="contact" className="relative">
      {/* CONVERSION — light hook at the top */}
      <div className="relative bg-[var(--2pt-white)] text-[var(--2pt-black)] py-32 md:py-48 px-8 md:px-12 border-t border-[var(--2pt-black)]/8">
        <div className="max-w-6xl mx-auto">
          {/* Eyebrow */}
          <div
            className={`flex items-center gap-2.5 mb-12 transition-opacity duration-1000 ${
              isInView ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-pulse" />
            <span className="text-[10px] tracking-[0.3em] text-[var(--2pt-black)]/50 font-mono uppercase">
              <span className="text-[var(--2pt-black)]/30 mr-2">III.</span>Deploy with us
            </span>
          </div>

          {/* Headline — invitation to see the future state, not a transaction */}
          <h2 className="text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-medium tracking-[-0.025em] leading-[1.05] max-w-5xl mb-12">
            <span
              className={`block text-[var(--2pt-black)] transition-all duration-[1200ms] ease-out ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "150ms" }}
            >
              See what your future
            </span>
            <span
              className={`block text-[var(--2pt-black)]/55 transition-all duration-[1200ms] ease-out ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "350ms" }}
            >
              marketing function looks like.
            </span>
          </h2>

          {/* Body — modernization thesis: we rebuild the marketing function for the AI decade */}
          <p
            className={`text-lg md:text-xl text-[var(--2pt-black)]/65 max-w-2xl leading-relaxed mb-12 transition-all duration-[1200ms] ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "550ms" }}
          >
            We modernize the marketing function for the AI decade. Embedded engineers, deployed systems, owned by you.{" "}
            <span className="text-[var(--2pt-black)]">Book a call. We&rsquo;ll show you what&rsquo;s already running for teams like yours.</span>
          </p>

          {/* CTA */}
          <div
            className={`transition-all duration-[1200ms] ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "750ms" }}
          >
            <a
              href="mailto:info@twopointtechnologies.com"
              className="group inline-flex items-center gap-3 text-[11px] sm:text-sm font-mono tracking-[0.12em] sm:tracking-[0.18em] uppercase text-[var(--2pt-black)] hover:text-[var(--2pt-green)] transition-colors duration-500 break-all"
            >
              <span className="border-b border-[var(--2pt-black)] group-hover:border-[var(--2pt-green)] pb-1 transition-colors duration-500">
                info@twopointtechnologies.com
              </span>
              <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform duration-500" />
            </a>
          </div>
        </div>
      </div>

      {/* MASTHEAD — full-bleed dark closer. Editorial / publication back cover.
          Top edge shadow + thin green hairline above so it reads as a deliberate
          layer landing on the conversion block rather than a flat colour swap. */}
      <div
        className="relative bg-[var(--2pt-black)] text-[var(--2pt-white)] overflow-hidden"
        style={{
          boxShadow:
            "0 -1px 0 rgba(74,222,128,0.25), 0 -18px 36px -18px rgba(10,10,10,0.18)",
        }}
      >
        {/* Faint dot grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Ambient drifting orb */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] -translate-x-1/2 -translate-y-1/2 animate-drift animate-morph"
            style={{
              background:
                "radial-gradient(circle at 45% 50%, rgba(74,222,128,0.18) 0%, rgba(74,222,128,0.05) 50%, transparent 75%)",
              filter: "blur(10px)",
            }}
          />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-8 md:px-12 py-24 md:py-32">
          {/* Top — masthead label + live clocks */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-20 md:mb-24 pb-8 border-b border-[var(--2pt-white)]/10">
            <div className="flex items-center gap-3">
              <span className="text-[10px] tracking-[0.3em] text-[var(--2pt-white)]/45 font-mono uppercase">
                Two Point Technologies · Edition 001
              </span>
            </div>
            <div className="flex items-center gap-5 font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--2pt-white)]/45">
              <span className="flex items-center gap-1.5">
                <span className="text-[var(--2pt-white)]/35">NYC</span>
                <span className="text-[var(--2pt-white)] tabular-nums">{fmt("America/New_York")}</span>
              </span>
              <span className="w-px h-3 bg-[var(--2pt-white)]/15" />
              <span className="flex items-center gap-1.5">
                <span className="text-[var(--2pt-white)]/35">LDN</span>
                <span className="text-[var(--2pt-white)] tabular-nums">{fmt("Europe/London")}</span>
              </span>
            </div>
          </div>

          {/* Oversized wordmark — the masthead title */}
          <div className="mb-16 md:mb-20">
            <h3
              className="font-medium leading-[0.86] text-[var(--2pt-white)] whitespace-nowrap"
              style={{
                fontSize: "clamp(46px, 13.2vw, 196px)",
                letterSpacing: "-0.055em",
              }}
            >
              Two Point
              <br />
              Technologies<span className="text-[var(--2pt-green)]">.</span>
            </h3>
          </div>

          {/* Live broadcast band — three ticking counters */}
          <div className="grid grid-cols-3 gap-px bg-[var(--2pt-white)]/10 border-y border-[var(--2pt-white)]/10 mb-16 md:mb-20">
            <div className="bg-[var(--2pt-black)] py-7 px-6">
              <div className="flex items-center gap-1.5 mb-2.5">
                <span className="w-1 h-1 bg-[var(--2pt-green)] rounded-full animate-pulse" />
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--2pt-white)]/45">
                  Systems running now
                </span>
              </div>
              <div className="text-3xl md:text-4xl font-medium text-[var(--2pt-white)] tabular-nums tracking-tight">
                {47 + Math.floor((time?.getSeconds() ?? 0) / 14)}
              </div>
            </div>
            <div className="bg-[var(--2pt-black)] py-7 px-6">
              <div className="flex items-center gap-1.5 mb-2.5">
                <span className="w-1 h-1 bg-[var(--2pt-green)] rounded-full animate-pulse" />
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--2pt-white)]/45">
                  Years operating
                </span>
              </div>
              <div className="text-3xl md:text-4xl font-medium text-[var(--2pt-white)] tabular-nums tracking-tight">
                {new Date().getFullYear() - 2017}
              </div>
            </div>
            <div className="bg-[var(--2pt-black)] py-7 px-6">
              <div className="flex items-center gap-1.5 mb-2.5">
                <span className="w-1 h-1 bg-[var(--2pt-green)] rounded-full animate-pulse" />
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--2pt-white)]/45">
                  Cities deployed
                </span>
              </div>
              <div className="text-3xl md:text-4xl font-medium text-[var(--2pt-white)] tabular-nums tracking-tight">
                02
              </div>
            </div>
          </div>

          {/* Publication colophon — single column on mobile so long values
              (email, address) get full width without collisions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 pb-12 border-b border-[var(--2pt-white)]/10">
            {/* New York */}
            <div>
              <div className="text-[10px] tracking-[0.3em] text-[var(--2pt-green)] font-mono uppercase mb-4">
                New York
              </div>
              <div className="text-base text-[var(--2pt-white)] leading-relaxed">447 Broadway</div>
              <div className="text-sm text-[var(--2pt-white)]/55 leading-relaxed">NY 10013</div>
            </div>

            {/* London */}
            <div>
              <div className="text-[10px] tracking-[0.3em] text-[var(--2pt-green)] font-mono uppercase mb-4">
                London
              </div>
              <div className="text-base text-[var(--2pt-white)] leading-relaxed">45 Fitzroy Street</div>
              <div className="text-sm text-[var(--2pt-white)]/55 leading-relaxed">Fitzrovia W1D 3BW</div>
            </div>

            {/* Contact */}
            <div>
              <div className="text-[10px] tracking-[0.3em] text-[var(--2pt-green)] font-mono uppercase mb-4">
                Contact
              </div>
              <a
                href="mailto:info@twopointtechnologies.com"
                className="block text-sm sm:text-base text-[var(--2pt-white)] hover:text-[var(--2pt-green)] transition-colors duration-500 leading-relaxed break-all"
              >
                info@twopointtechnologies.com
              </a>
            </div>

            {/* Partnership */}
            <div>
              <div className="text-[10px] tracking-[0.3em] text-[var(--2pt-green)] font-mono uppercase mb-4">
                Partnership
              </div>
              <a
                href="https://www.anthropic.com/partners"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-base text-[var(--2pt-white)] hover:text-[var(--2pt-green)] transition-colors duration-500"
              >
                Anthropic
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" />
              </a>
              <div className="text-sm text-[var(--2pt-white)]/55 leading-relaxed">
                Claude Partner Network
              </div>
            </div>
          </div>

          {/* Reference strip — cross-links to evergreen pages */}
          <nav
            aria-label="Reference"
            className="pt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] tracking-[0.28em] font-mono uppercase text-[var(--2pt-white)]/45"
          >
            <a
              href="/faq"
              className="hover:text-[var(--2pt-green)] transition-colors duration-500"
            >
              FAQ
            </a>
            <a
              href="/glossary"
              className="hover:text-[var(--2pt-green)] transition-colors duration-500"
            >
              Glossary
            </a>
            <a
              href="/llms.txt"
              className="hover:text-[var(--2pt-green)] transition-colors duration-500"
            >
              llms.txt
            </a>
          </nav>

          {/* Colophon strip — print-style detail bar */}
          <div className="pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="flex items-center gap-5">
              <span className="text-xl font-semibold italic text-[var(--2pt-white)] tracking-tight">
                2pt
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[var(--2pt-white)]/40 font-mono uppercase">
                &copy; {new Date().getFullYear()} Two Point Technologies · All rights reserved
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-pulse" />
              <span className="text-[10px] tracking-[0.3em] text-[var(--2pt-white)]/45 font-mono uppercase">
                Founded 2017 · Always deploying
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
