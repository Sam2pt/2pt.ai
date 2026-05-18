"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

const navItems = [
  { label: "Solve", href: "/#what-we-solve" },
  { label: "Talk", href: "/#contact" },
]

export function FloatingNav() {
  const [time, setTime] = useState<Date | null>(null)

  // Live clock — updates every second. Renders nothing server-side.
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
    <nav
      aria-label="Primary"
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Bar */}
      <div className="relative bg-[var(--2pt-offwhite)]/85 backdrop-blur-xl border-b border-[var(--2pt-black)]/10">
        {/* Top hairline accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--2pt-green)]/40 to-transparent" />

        <div className="max-w-[1400px] mx-auto flex md:grid md:grid-cols-3 items-center justify-between px-5 md:px-8 h-12">
          {/* LEFT — brand lockup (TwoPointMark + wordmark) + system status */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="group inline-flex items-center transition-opacity duration-500 hover:opacity-80"
            >
              <span className="text-base font-semibold italic text-[var(--2pt-black)] tracking-tight group-hover:text-[var(--2pt-green)] transition-colors duration-500">
                2pt
              </span>
            </a>
            <span className="w-px h-4 bg-[var(--2pt-black)]/15" />
            <div className="hidden md:flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-pulse" />
              <span className="text-[10px] tracking-[0.25em] text-[var(--2pt-black)]/55 font-mono uppercase">
                System online
              </span>
            </div>
          </div>

          {/* CENTRE — nav. Hover one and the siblings dim, classic editorial */}
          <div className="nav-cluster flex items-center justify-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-item group relative px-3 py-2 text-[11px] font-mono tracking-[0.18em] uppercase text-[var(--2pt-black)]/65 hover:text-[var(--2pt-black)] transition-[color,opacity] duration-500"
              >
                <span className="relative z-10 inline-flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[var(--2pt-green)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {item.label}
                </span>
                <span className="absolute bottom-1 left-3 right-3 h-px bg-[var(--2pt-green)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </a>
            ))}
          </div>

          {/* RIGHT — live timezones + CTA */}
          <div className="flex items-center justify-end gap-5">
            <div className="hidden lg:flex items-center gap-3 font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--2pt-black)]/45">
              <span className="flex items-center gap-1.5">
                <span className="text-[var(--2pt-black)]/35">NYC</span>
                <span className="text-[var(--2pt-black)] tabular-nums">{fmt("America/New_York")}</span>
              </span>
              <span className="w-px h-3 bg-[var(--2pt-black)]/15" />
              <span className="flex items-center gap-1.5">
                <span className="text-[var(--2pt-black)]/35">LDN</span>
                <span className="text-[var(--2pt-black)] tabular-nums">{fmt("Europe/London")}</span>
              </span>
            </div>
            {/* CTA — hidden on mobile (the centre TALK link does the same job
                without crowding the narrow viewport) */}
            <a
              href="#contact"
              className="hidden md:inline-flex group items-center gap-2 px-4 h-8 bg-[var(--2pt-black)] text-[var(--2pt-white)] hover:bg-[var(--2pt-green)] hover:text-[var(--2pt-black)] transition-colors duration-500 whitespace-nowrap"
            >
              <span className="text-[10px] font-mono tracking-[0.22em] uppercase">
                Deploy with us
              </span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-500" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
