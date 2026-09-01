"use client"

/**
 * WorkCard — mobile case-study preview card in the DeployConsole flow.
 *
 * Trimmed to fit inside a 667px viewport (iPhone SE) without cropping.
 * The visual is a triptych of three "brand tenants" showing the same
 * dashboard core in three different brand skins — the case's central
 * "one brain, many faces" claim, made visible in a compact layout.
 */

import Link from "next/link"
import { ArrowRight } from "lucide-react"
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
}

const TENANTS: Tenant[] = [
  {
    name: "Nightingale",
    category: "Bedding",
    color: "#c8a97e",
    soft: "rgba(200,169,126,0.14)",
    font: "'Cormorant Garamond', ui-serif, Georgia, serif",
    metric: "38.4%",
    metricLabel: "Repeat",
  },
  {
    name: "Coldsmith",
    category: "Coffee",
    color: "#7dd3a1",
    soft: "rgba(125,211,161,0.16)",
    font: "'JetBrains Mono', ui-monospace, monospace",
    metric: "51.7%",
    metricLabel: "Sub. share",
  },
  {
    name: "Kelpwell",
    category: "Wellness",
    color: "#5ea9c7",
    soft: "rgba(94,169,199,0.16)",
    font: "'Inter', ui-sans-serif, system-ui",
    metric: "68.2%",
    metricLabel: "90-day comp",
  },
]

export function WorkCard({ index }: { index: number }) {
  const { ref, visible } = useInView<HTMLElement>(0.35)

  return (
    <section
      ref={ref}
      data-card-index={index}
      className="relative h-[100dvh] w-full snap-start overflow-hidden bg-[var(--2pt-black)] text-[var(--2pt-white)] flex flex-col"
    >
      {/* Ambient wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 80% 25%, rgba(34,211,238,0.14) 0%, rgba(34,211,238,0.03) 40%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1.3px)",
          backgroundSize: "22px 22px",
          opacity: 0.4,
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 50% 50%, #000 30%, transparent 88%)",
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 50%, #000 30%, transparent 88%)",
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

      {/* Byline */}
      <div
        className={`relative z-10 px-6 mt-5 text-[10px] font-mono tracking-[0.26em] uppercase text-white/45 transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "80ms" }}
      >
        For a New York venture firm
      </div>

      {/* Headline — tighter than before */}
      <h2
        className={`relative z-10 px-6 mt-3 text-[30px] font-semibold tracking-[-0.03em] leading-[1.05] text-white transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
        }`}
        style={{ transitionDelay: "160ms" }}
      >
        One brain across
        <br />
        <span className="text-white/50">the portfolio.</span>
      </h2>

      {/* Lead — trimmed to two lines */}
      <p
        className={`relative z-10 px-6 mt-3 text-[13px] leading-[1.55] text-white/65 transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "240ms" }}
      >
        Central customer brain, per-brand skin, opt-in shared learning.
      </p>

      {/* Same brain, many faces — visual triptych */}
      <div
        className={`relative z-10 mt-5 px-6 transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "320ms" }}
      >
        <div className="flex items-center gap-2 mb-3 text-[9px] font-mono tracking-[0.24em] uppercase text-white/40">
          <span>Same brain</span>
          <span className="flex-1 h-px bg-white/10" />
          <span>Many faces</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {TENANTS.map((t, i) => (
            <TenantMini key={t.name} tenant={t} visible={visible} delay={380 + i * 100} />
          ))}
        </div>
      </div>

      {/* Proof strip */}
      <div
        className={`relative z-10 px-6 mt-6 grid grid-cols-3 gap-4 transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "600ms" }}
      >
        {[
          { l: "Brands", v: "7" },
          { l: "Rollout", v: "8 wk" },
          { l: "Learning", v: "24/7" },
        ].map((m) => (
          <div key={m.l} className="border-t border-white/15 pt-2">
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

      {/* CTA */}
      <div
        className={`relative z-10 mt-auto pb-10 px-6 pt-5 transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "700ms" }}
      >
        <Link
          href="/work"
          className="flex items-center justify-between gap-4 w-full pl-5 pr-4 py-[18px] bg-white text-black rounded-[14px] active:scale-[0.98] transition-transform duration-150"
          style={{
            boxShadow:
              "0 12px 32px -18px rgba(255,255,255,0.35), 0 2px 6px -2px rgba(255,255,255,0.1)",
          }}
        >
          <span className="flex flex-col items-start gap-1 min-w-0">
            <span className="text-[10px] font-mono tracking-[0.24em] uppercase opacity-55">
              Read the case
            </span>
            <span className="text-[14px] font-semibold tracking-[-0.015em] leading-tight">
              One brain across the portfolio
            </span>
          </span>
          <ArrowRight className="w-5 h-5 shrink-0" />
        </Link>
      </div>
    </section>
  )
}

function TenantMini({
  tenant,
  visible,
  delay,
}: {
  tenant: Tenant
  visible: boolean
  delay: number
}) {
  return (
    <div
      className={`relative border overflow-hidden transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
      style={{
        borderColor: `${tenant.color}55`,
        background: tenant.soft,
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Top chrome — brand name in brand font */}
      <div
        className="px-2 py-1.5 border-b"
        style={{ borderColor: `${tenant.color}22` }}
      >
        <div
          className="text-[11px] leading-none truncate"
          style={{ fontFamily: tenant.font, color: tenant.color }}
        >
          {tenant.name}
        </div>
      </div>
      {/* Body — one metric */}
      <div className="px-2 py-2.5">
        <div
          className="text-[8px] font-mono tracking-[0.14em] uppercase mb-1 truncate"
          style={{ color: `${tenant.color}aa` }}
        >
          {tenant.metricLabel}
        </div>
        <div
          className="text-[20px] tabular-nums leading-none"
          style={{
            fontFamily: tenant.font,
            color: tenant.color,
            letterSpacing: "-0.02em",
          }}
        >
          {tenant.metric}
        </div>
        {/* Bar */}
        <div
          className="mt-2 h-[3px] w-full"
          style={{ background: `${tenant.color}22` }}
        >
          <div
            className="h-full transition-all duration-1000 ease-out"
            style={{
              width: visible ? "70%" : "0%",
              background: tenant.color,
              transitionDelay: `${delay + 300}ms`,
            }}
          />
        </div>
      </div>
    </div>
  )
}
