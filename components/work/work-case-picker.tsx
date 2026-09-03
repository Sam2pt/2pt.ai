"use client"

/**
 * WorkCasePicker — top-of-page picker that jumps between the two
 * live case studies on /work. Sits above both cases so a reader
 * landing on /work can pick which one to read without having to
 * scroll past the first one. Active state follows the reader as
 * they scroll from one case section into the next.
 */

import { useEffect, useState } from "react"

type Item = {
  id: string
  number: string
  label: string
  accent: string
  accentSoft: string
}

const ITEMS: Item[] = [
  {
    id: "case-lumen",
    number: "01",
    label: "NY Venture · Portfolio",
    accent: "#22d3ee",
    accentSoft: "rgba(34,211,238,0.10)",
  },
  {
    id: "case-yamaha",
    number: "02",
    label: "Yamaha · Music",
    accent: "#a78bfa",
    accentSoft: "rgba(167,139,250,0.10)",
  },
]

export function WorkCasePicker() {
  const [active, setActive] = useState(ITEMS[0].id)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0,
      },
    )
    ITEMS.forEach((it) => {
      const el = document.getElementById(it.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <nav
      aria-label="Case study selector"
      className="mb-4 md:mb-6 flex flex-wrap items-center gap-3 border-b border-white/8 pb-3"
    >
      <span className="text-[10px] font-mono tracking-[0.32em] uppercase text-white/45 mr-2">
        Read
      </span>
      {ITEMS.map((it) => {
        const isActive = active === it.id
        return (
          <button
            key={it.id}
            type="button"
            onClick={() => scrollTo(it.id)}
            className="flex items-center gap-2.5 h-9 px-4 border transition-all duration-500 group"
            style={{
              borderColor: isActive ? it.accent : "rgba(255,255,255,0.15)",
              background: isActive ? it.accentSoft : "transparent",
              color: isActive ? it.accent : "rgba(255,255,255,0.55)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full transition-all duration-500"
              style={{
                background: isActive ? it.accent : "rgba(255,255,255,0.35)",
              }}
            />
            <span className="text-[10px] font-mono tracking-[0.22em] uppercase">
              {it.number} · {it.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
