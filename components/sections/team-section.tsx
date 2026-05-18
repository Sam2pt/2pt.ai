"use client"

import { useRef, useEffect, useState } from "react"

type Location = {
  city: string
  country: string
  timezone: string
  address: string
  postal: string
}

const locations: Location[] = [
  {
    city: "New York",
    country: "USA",
    timezone: "EST",
    address: "447 Broadway",
    postal: "NY 10013",
  },
  {
    city: "London",
    country: "UK",
    timezone: "GMT",
    address: "45 Fitzroy Street",
    postal: "Fitzrovia W1D 3BW",
  },
]

export function TeamSection() {
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

  const getLocalTime = (tz: string) => {
    if (!time) return "··:··"
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: tz === "EST" ? "America/New_York" : "Europe/London",
    }
    return time.toLocaleTimeString("en-US", options)
  }

  return (
    <section
      ref={ref}
      id="team"
      className="relative bg-[var(--2pt-offwhite)] text-[var(--2pt-black)] py-32 md:py-48 px-8 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div
          className={`flex items-center gap-2.5 mb-12 transition-opacity duration-1000 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full" />
          <span className="text-[10px] tracking-[0.3em] text-[var(--2pt-black)]/50 font-mono uppercase">
            <span className="text-[var(--2pt-black)]/30 mr-2">VIII.</span>Two cities · One firm
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-medium tracking-[-0.025em] leading-[1.05] max-w-5xl mb-12">
          <span
            className={`block text-[var(--2pt-black)] transition-all duration-[1200ms] ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            Operating across the two
          </span>
          <span
            className={`block text-[var(--2pt-black)]/55 transition-all duration-[1200ms] ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "350ms" }}
          >
            largest marketing markets.
          </span>
        </h2>

        {/* Body */}
        <p
          className={`text-lg md:text-xl text-[var(--2pt-black)]/65 max-w-2xl leading-relaxed mb-20 md:mb-24 transition-all duration-[1200ms] ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "550ms" }}
        >
          Pods in New York and London. On the ground in the two cities where enterprise marketing budgets get decided.
        </p>

        {/* Locations — two clean columns */}
        <div className="grid md:grid-cols-2 border-t border-[var(--2pt-black)]/10">
          {locations.map((loc, i) => (
            <div
              key={loc.city}
              className={`py-12 md:py-16 ${
                i > 0 ? "md:border-l border-[var(--2pt-black)]/10 md:pl-12" : "md:pr-12"
              } transition-all duration-[1200ms] ease-out ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${700 + i * 200}ms` }}
            >
              <div className="flex items-baseline gap-4 mb-6">
                <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-[var(--2pt-black)]">
                  {loc.city}
                </h3>
                <span className="text-xs font-mono text-[var(--2pt-black)]/40 tracking-wider">
                  {loc.country}
                </span>
              </div>

              <div className="flex items-center gap-2.5 mb-8">
                <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-pulse" />
                <span className="text-base font-mono text-[var(--2pt-black)]/70">
                  {getLocalTime(loc.timezone)}
                </span>
                <span className="text-[10px] font-mono text-[var(--2pt-black)]/40 tracking-wider uppercase">
                  {loc.timezone}
                </span>
              </div>

              <div className="text-[15px] text-[var(--2pt-black)]/65 leading-relaxed">
                <div>{loc.address}</div>
                <div className="text-[var(--2pt-black)]/45">{loc.postal}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Careers line */}
        <div
          className={`mt-20 md:mt-24 transition-all duration-[1200ms] ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "1100ms" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <span className="text-base text-[var(--2pt-black)]/70">
              Want to join the team?
            </span>
            <a
              href="mailto:careers@twopointtechnologies.com"
              className="group inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.18em] uppercase text-[var(--2pt-black)] hover:text-[var(--2pt-green)] transition-colors duration-500"
            >
              <span className="border-b border-[var(--2pt-black)] group-hover:border-[var(--2pt-green)] pb-0.5 transition-colors duration-500">
                careers@twopointtechnologies.com
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
