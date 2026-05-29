"use client"

/**
 * ContactCard — conversion CTA on a dark canvas with a giant tappable
 * email button. Three live counters across the bottom that animate up
 * once the card is in view.
 */

import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { useInView } from "@/components/mobile/use-in-view"

export function ContactCard({ index }: { index: number }) {
  const { ref, visible } = useInView<HTMLElement>(0.5)

  // Three counters that animate up when visible.
  const [systems, setSystems] = useState(0)
  const [years, setYears] = useState(0)
  const [cities, setCities] = useState(0)

  useEffect(() => {
    if (!visible) return
    const animate = (target: number, set: (n: number) => void, duration = 900) => {
      const start = performance.now()
      let raf = 0
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / duration)
        const eased = 1 - Math.pow(1 - p, 3)
        set(Math.round(target * eased))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(raf)
    }
    const c1 = animate(48, setSystems, 1100)
    const c2 = animate(9, setYears, 900)
    const c3 = animate(2, setCities, 800)
    return () => {
      c1?.()
      c2?.()
      c3?.()
    }
  }, [visible])

  return (
    <section
      ref={ref}
      data-card-index={index}
      className="relative h-[100dvh] w-full snap-start overflow-hidden bg-[var(--2pt-black)] text-[var(--2pt-white)] flex flex-col"
    >
      {/* Green wash anchor */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 30% 70%, rgba(74,222,128,0.18) 0%, rgba(74,222,128,0.05) 35%, transparent 65%)",
        }}
      />

      {/* Top eyebrow */}
      <div className="relative z-10 pt-16 px-6 flex items-center gap-2.5">
        <span className="relative inline-flex">
          <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full" />
          <span className="absolute inset-0 w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-ping opacity-60" />
        </span>
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--2pt-white)]/55">
          <span className="text-[var(--2pt-white)]/30 mr-2">III.</span>Deploy with us
        </span>
      </div>

      {/* Headline */}
      <div className="relative z-10 px-6 mt-10">
        <h2
          className="text-[36px] font-bold tracking-[-0.035em] leading-[1.0] mb-5"
          style={{
            transition: "opacity 800ms ease-out 180ms, transform 800ms cubic-bezier(0.16,1,0.3,1) 180ms",
          }}
        >
          <span className="block text-[var(--2pt-white)]">
            See what your future
          </span>
          <span className="block text-[var(--2pt-white)]/55">
            marketing function looks like.
          </span>
        </h2>
        <p
          className="text-[14px] text-[var(--2pt-white)]/65 leading-relaxed"
          style={{
            transition: "opacity 800ms ease-out 420ms",
          }}
        >
          We modernize the marketing function for the AI decade. Embedded engineers, deployed systems, owned by you.
        </p>
      </div>

      {/* Tap-to-email CTA — big, satisfying, native-app-feeling */}
      <div className="relative z-10 px-6 mt-10">
        <a
          href="mailto:info@twopointtechnologies.com"
          className="group flex items-center justify-between gap-4 w-full pl-6 pr-5 py-[22px] bg-[var(--2pt-green)] text-[var(--2pt-black)] rounded-[14px] active:scale-[0.98] transition-transform duration-150"
          style={{
            transition: "opacity 700ms ease-out 600ms, transform 700ms cubic-bezier(0.16,1,0.3,1) 600ms",
            boxShadow:
              "0 14px 36px -18px rgba(74,222,128,0.55), 0 2px 6px -2px rgba(74,222,128,0.18)",
          }}
        >
          <span className="flex flex-col items-start gap-1.5 min-w-0">
            <span className="text-[10px] font-mono tracking-[0.24em] uppercase opacity-65">
              Get in touch
            </span>
            <span className="text-[15px] font-bold tracking-[-0.015em] leading-tight truncate max-w-full">
              info@twopointtechnologies.com
            </span>
          </span>
          <ArrowRight className="w-5 h-5 shrink-0" />
        </a>
      </div>

      {/* Counters at the bottom */}
      <div className="relative z-10 mt-auto pb-12 px-6">
        <div className="grid grid-cols-3 gap-3 border-y border-[var(--2pt-white)]/10 py-5">
          {[
            { label: "Systems running", value: systems },
            { label: "Years operating", value: years },
            { label: "Cities", value: cities, pad: 2 },
          ].map((c) => (
            <div key={c.label} className="flex flex-col">
              <span className="text-[9px] font-mono tracking-[0.22em] uppercase text-[var(--2pt-white)]/45 mb-2 leading-tight">
                {c.label}
              </span>
              <span className="text-[28px] font-bold tabular-nums tracking-[-0.025em] leading-none text-[var(--2pt-white)]">
                {c.pad ? String(c.value).padStart(c.pad, "0") : c.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
