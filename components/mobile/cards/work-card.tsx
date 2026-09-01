"use client"

/**
 * WorkCard — mobile case-study preview card in the DeployConsole flow.
 *
 * Editorial cover treatment. The card IS the preview — no tap-through
 * to a full case study on mobile. Reads as a piece of magazine cover art:
 * big headline, a "now showing" live tenant reveal that cycles the seven
 * portfolio brands through the same core panel every ~2.4s (proving the
 * "one brain, many faces" claim by doing it, not describing it), and a
 * tight proof strip at the bottom.
 */

import { useEffect, useState } from "react"
import { useInView } from "@/components/mobile/use-in-view"

const ACCENT = "#22d3ee"

type Tenant = {
  name: string
  category: string
  color: string
  soft: string
  font: string
  metric: string
  metricLabel: string
  short: string
}

const TENANTS: Tenant[] = [
  {
    name: "Nightingale",
    category: "Bedding · sleep",
    color: "#c8a97e",
    soft: "rgba(200,169,126,0.14)",
    font: "'Cormorant Garamond', ui-serif, Georgia, serif",
    metric: "38.4%",
    metricLabel: "Repeat sleepers",
    short: "NGT",
  },
  {
    name: "Coldsmith",
    category: "Cold-brew coffee",
    color: "#7dd3a1",
    soft: "rgba(125,211,161,0.16)",
    font: "'JetBrains Mono', ui-monospace, monospace",
    metric: "51.7%",
    metricLabel: "Subscription share",
    short: "CLD",
  },
  {
    name: "Verre",
    category: "Glassware",
    color: "#f5f1e8",
    soft: "rgba(245,241,232,0.10)",
    font: "'Playfair Display', ui-serif, Georgia, serif",
    metric: "2.3×",
    metricLabel: "Set attach rate",
    short: "VRE",
  },
  {
    name: "Kelpwell",
    category: "Supplements",
    color: "#5ea9c7",
    soft: "rgba(94,169,199,0.16)",
    font: "'Inter', ui-sans-serif, system-ui",
    metric: "68.2%",
    metricLabel: "90-day compliance",
    short: "KLP",
  },
  {
    name: "Prairie",
    category: "Skincare",
    color: "#e0a893",
    soft: "rgba(224,168,147,0.14)",
    font: "'Cormorant Garamond', ui-serif, Georgia, serif",
    metric: "44.1%",
    metricLabel: "Refill rate",
    short: "PRR",
  },
  {
    name: "Junco",
    category: "Kitchenware",
    color: "#9db5c7",
    soft: "rgba(157,181,199,0.14)",
    font: "'Inter', ui-sans-serif, system-ui",
    metric: "3.1×",
    metricLabel: "Bundle lift",
    short: "JNC",
  },
  {
    name: "Meridian",
    category: "Apparel · outdoor",
    color: "#b8c48c",
    soft: "rgba(184,196,140,0.14)",
    font: "'JetBrains Mono', ui-monospace, monospace",
    metric: "62%",
    metricLabel: "Second-order",
    short: "MRD",
  },
]

const CYCLE_MS = 2400

export function WorkCard({ index }: { index: number }) {
  const { ref, visible } = useInView<HTMLElement>(0.35)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!visible) return
    const id = setInterval(() => setActive((a) => (a + 1) % TENANTS.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [visible])

  const tenant = TENANTS[active]

  return (
    <section
      ref={ref}
      data-card-index={index}
      className="relative h-[100dvh] w-full snap-start overflow-hidden bg-[var(--2pt-black)] text-[var(--2pt-white)] flex flex-col"
    >
      {/* Layered ambient — dot grid + brand-tinted wash that follows the
          active tenant. The wash colour shift is what makes the card feel
          alive as the tenant cycles. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1.3px)",
          backgroundSize: "22px 22px",
          opacity: 0.45,
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 50% 50%, #000 30%, transparent 88%)",
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 50%, #000 30%, transparent 88%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none transition-all duration-[2400ms] ease-out"
        style={{
          background: `radial-gradient(ellipse 75% 55% at 50% 70%, ${tenant.color}22 0%, ${tenant.color}08 35%, transparent 65%)`,
        }}
      />
      {/* Cyan spotlight anchoring the headline */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 15% 20%, rgba(34,211,238,0.14) 0%, rgba(34,211,238,0.03) 40%, transparent 65%)",
        }}
      />

      {/* Masthead */}
      <div
        className={`relative z-10 pt-14 px-6 flex items-center gap-2 flex-wrap transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/70">
          Case study
        </span>
        <span className="text-white/25 text-[10px]">/</span>
        <span className="text-[10px] font-mono tracking-[0.28em] uppercase text-white/45">
          01 · 2026
        </span>
        <span
          className="ml-auto flex items-center gap-1.5 text-[9px] font-mono tracking-[0.24em] uppercase"
          style={{ color: ACCENT }}
        >
          <span className="relative inline-flex w-1.5 h-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: ACCENT }}
            />
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-60"
              style={{ background: ACCENT }}
            />
          </span>
          Live
        </span>
      </div>

      {/* Hero headline — kinetic, editorial */}
      <div className="relative z-10 px-6 mt-12">
        <div
          className={`text-[9px] font-mono tracking-[0.28em] uppercase text-white/45 mb-3 transition-opacity duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "80ms" }}
        >
          For a New York venture firm
        </div>
        <h2
          className={`text-[44px] font-semibold tracking-[-0.035em] leading-[0.98] text-white transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
          style={{ transitionDelay: "160ms" }}
        >
          One brain.
          <br />
          <span
            className="inline-block relative"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Seven faces.
            <span
              aria-hidden
              className="absolute -bottom-1 left-0 right-0 h-[2px] origin-left"
              style={{
                background: `linear-gradient(90deg, ${ACCENT}, transparent)`,
                transform: visible ? "scaleX(1)" : "scaleX(0)",
                transition:
                  "transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 720ms",
              }}
            />
          </span>
        </h2>
      </div>

      {/* Live tenant reveal — the card that morphs through 7 brands.
          Fills a good chunk of the middle so it reads as the hero visual. */}
      <div
        className={`relative z-10 mx-6 mt-8 transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "400ms" }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span className="text-[9px] font-mono tracking-[0.24em] uppercase text-white/40">
            Now showing · tenant {String(active + 1).padStart(2, "0")} / 07
          </span>
        </div>

        <div
          key={tenant.name}
          className="relative border overflow-hidden"
          style={{
            borderColor: `${tenant.color}55`,
            background: `linear-gradient(180deg, ${tenant.soft} 0%, rgba(0,0,0,0.35) 100%)`,
            animation: "fadeInUp 500ms cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          {/* Chrome — brand wordmark in brand font */}
          <div
            className="flex items-center justify-between px-4 py-2.5 border-b"
            style={{ borderColor: `${tenant.color}22` }}
          >
            <div
              className="text-[15px] leading-none"
              style={{ fontFamily: tenant.font, color: tenant.color }}
            >
              {tenant.name}
              <span
                className="ml-2 opacity-55 text-[9px] uppercase tracking-[0.2em]"
                style={{ fontFamily: "ui-monospace, monospace" }}
              >
                {tenant.category}
              </span>
            </div>
            <span
              className="text-[9px] font-mono tracking-[0.2em] uppercase"
              style={{ color: `${tenant.color}bb` }}
            >
              Tenant · live
            </span>
          </div>

          {/* Metric */}
          <div className="px-4 py-5">
            <div
              className="text-[9px] font-mono tracking-[0.22em] uppercase mb-2"
              style={{ color: `${tenant.color}99` }}
            >
              {tenant.metricLabel}
            </div>
            <div
              className="text-[52px] leading-[0.95] tabular-nums"
              style={{
                fontFamily: tenant.font,
                color: tenant.color,
                letterSpacing: "-0.03em",
              }}
            >
              {tenant.metric}
            </div>
            {/* Progress bar echoes the metric visually */}
            <div className="mt-4 h-[3px] w-full bg-white/6 overflow-hidden">
              <div
                className="h-full transition-all duration-[1800ms] ease-out"
                style={{
                  width: "72%",
                  background: tenant.color,
                }}
              />
            </div>
          </div>

          {/* Footer — the "same core" nod */}
          <div
            className="px-4 py-2 border-t flex items-center justify-between text-[8px] font-mono tracking-[0.22em] uppercase"
            style={{
              borderColor: `${tenant.color}22`,
              color: `${tenant.color}88`,
            }}
          >
            <span>engine · core</span>
            <span>skin · {tenant.short.toLowerCase()}</span>
          </div>
        </div>

        {/* Tenant tick row — all 7 dots so the reader sees the cycle position */}
        <div className="mt-4 flex items-center gap-1.5">
          {TENANTS.map((t, i) => {
            const isActive = i === active
            return (
              <span
                key={t.name}
                className="h-[3px] flex-1 transition-all duration-500"
                style={{
                  background: isActive ? t.color : "rgba(255,255,255,0.14)",
                  opacity: isActive ? 1 : 0.6,
                }}
              />
            )
          })}
        </div>
      </div>

      {/* Mesh line — reminds the reader that plays travel across tenants */}
      <div
        className={`relative z-10 mx-6 mt-6 flex items-center gap-3 text-[10px] font-mono tracking-[0.14em] text-white/50 transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "520ms" }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: ACCENT }}
        />
        <span className="uppercase tracking-[0.22em]">Shared plays</span>
        <span className="flex-1 h-px bg-white/8" />
        <span
          className="tabular-nums"
          style={{ color: ACCENT }}
        >
          47 / week
        </span>
      </div>

      {/* Proof strip — grounds the card at the bottom */}
      <div
        className={`relative z-10 px-6 mt-auto pb-12 pt-5 transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "560ms" }}
      >
        <div className="mx-6 pt-5 border-t border-white/8 grid grid-cols-3 gap-3 -mx-6 px-6">
          {[
            { l: "Brands", v: "7" },
            { l: "Rollout", v: "8 wk" },
            { l: "Learning", v: "24/7" },
          ].map((m) => (
            <div key={m.l}>
              <div className="text-[9px] font-mono tracking-[0.22em] uppercase text-white/40 mb-1">
                {m.l}
              </div>
              <div
                className="text-[22px] font-semibold tracking-[-0.02em] leading-[1] tabular-nums"
                style={{ color: ACCENT }}
              >
                {m.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
