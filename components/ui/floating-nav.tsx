"use client"

import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

const navItems = [
  { label: "Solve", href: "/#what-we-solve" },
  { label: "Talk", href: "/#contact" },
]

/**
 * FloatingNav — scroll-aware frosted bar.
 *
 * Over the dark hero (first viewport) the bar renders dark-on-dark with
 * white type. Once the user scrolls past the hero into the white sections
 * below, the bar fades to its original light frosted treatment. The
 * transition is a single CSS variable swap so it stays cheap.
 *
 * `forceDark` opts a page out of the scroll-aware light flip. Use it on
 * pages whose canvas stays dark all the way down (case studies, /work).
 */
export function FloatingNav({
  forceDark = false,
}: {
  forceDark?: boolean
}) {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    if (forceDark) {
      setDark(true)
      return
    }
    const onScroll = () => {
      const threshold = window.innerHeight * 0.7
      setDark(window.scrollY < threshold)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [forceDark])

  // Palette swap per variant. Colors are wired via inline style so the
  // border, background and text crossfade together over 500ms.
  const palette = dark
    ? {
        bg: "rgba(10,10,10,0.55)",
        border: "rgba(255,255,255,0.12)",
        text: "var(--2pt-white)",
        textMuted: "rgba(255,255,255,0.65)",
        ctaBg: "var(--2pt-white)",
        ctaText: "var(--2pt-black)",
        shadow:
          "0 1px 0 rgba(255,255,255,0.05) inset, 0 6px 24px -12px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.25)",
      }
    : {
        bg: "rgba(255,255,255,0.65)",
        border: "rgba(10,10,10,0.08)",
        text: "var(--2pt-black)",
        textMuted: "rgba(10,10,10,0.65)",
        ctaBg: "var(--2pt-black)",
        ctaText: "var(--2pt-white)",
        shadow:
          "0 1px 0 rgba(255,255,255,0.6) inset, 0 6px 24px -12px rgba(10,10,10,0.18), 0 1px 2px rgba(10,10,10,0.04)",
      }

  return (
    <nav
      aria-label="Primary"
      className="hidden md:block fixed top-0 left-0 right-0 z-50"
    >
      <div
        className="relative backdrop-blur-2xl backdrop-saturate-150 border-b transition-[background-color,border-color,box-shadow] duration-500 ease-out"
        style={{
          backgroundColor: palette.bg,
          borderColor: palette.border,
          boxShadow: palette.shadow,
        }}
      >
        {/* Top hairline accent — green rule along the top edge */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--2pt-green)]/40 to-transparent" />

        <div className="max-w-[1400px] mx-auto flex md:grid md:grid-cols-3 items-center justify-between px-5 md:px-8 h-12">
          {/* LEFT — brand */}
          <div className="flex items-center">
            <a
              href="#"
              className="group inline-flex items-center transition-opacity duration-500 hover:opacity-80"
            >
              <span
                className="text-base font-semibold italic tracking-tight group-hover:text-[var(--2pt-green)] transition-colors duration-500"
                style={{ color: palette.text }}
              >
                2pt
              </span>
            </a>
          </div>

          {/* CENTRE — nav */}
          <div className="nav-cluster flex items-center justify-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-item group relative px-3 py-2 text-[11px] font-mono tracking-[0.18em] uppercase transition-[color,opacity] duration-500"
                style={{ color: palette.textMuted }}
              >
                <span className="relative z-10 inline-flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[var(--2pt-green)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {item.label}
                </span>
                <span className="absolute bottom-1 left-3 right-3 h-px bg-[var(--2pt-green)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </a>
            ))}
          </div>

          {/* RIGHT — CTA */}
          <div className="flex items-center justify-end">
            <a
              href="#contact"
              className="hidden md:inline-flex group items-center gap-2 px-4 h-8 hover:bg-[var(--2pt-green)] hover:text-[var(--2pt-black)]! transition-colors duration-500 whitespace-nowrap"
              style={{
                backgroundColor: palette.ctaBg,
                color: palette.ctaText,
              }}
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
