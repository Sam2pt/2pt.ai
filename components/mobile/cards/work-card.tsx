"use client"

/**
 * WorkCard — mobile case-study preview card in the DeployConsole flow.
 *
 * Mirrors the desktop WorkPreview: masthead marker, byline, headline,
 * proof strip, live mesh vignette, big tap to /work. Sits between the
 * problem cards and the deploy-stages card so the mobile reader gets
 * a real piece of work between "here's what breaks" and "here's how
 * we ship a fix".
 */

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { useInView } from "@/components/mobile/use-in-view"

const ACCENT = "#22d3ee"

// 7 nodes around a circle for the mini symbiotic mesh.
const NODES = [
  { key: "NGT", angle: -90 },
  { key: "CLD", angle: -38 },
  { key: "VRE", angle: 14 },
  { key: "KLP", angle: 66 },
  { key: "PRR", angle: 118 },
  { key: "JNC", angle: 170 },
  { key: "MRD", angle: 222 },
]

function MiniMesh({ active }: { active: boolean }) {
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (!active) return
    const id = setInterval(() => setStep((s) => (s + 1) % NODES.length), 1600)
    return () => clearInterval(id)
  }, [active])

  const cx = 150
  const cy = 150
  const r = 100
  // Round to 2 decimals so SSR and client agree on the SVG coordinate strings.
  const round = (n: number) => Math.round(n * 100) / 100
  const pos = NODES.map((n) => {
    const rad = (n.angle * Math.PI) / 180
    return { x: round(cx + Math.cos(rad) * r), y: round(cy + Math.sin(rad) * r) }
  })
  const srcI = step
  const tgtI = (step + 3) % NODES.length
  const s = pos[srcI]
  const t = pos[tgtI]

  return (
    <svg viewBox="0 0 300 300" className="w-full h-full">
      {pos.map((a, i) =>
        pos.slice(i + 1).map((b, j) => (
          <line
            key={`${i}-${j}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={1}
          />
        )),
      )}
      {active ? (
        <g key={step}>
          <line
            x1={s.x}
            y1={s.y}
            x2={t.x}
            y2={t.y}
            stroke={ACCENT}
            strokeWidth={1}
            opacity={0.4}
          />
          <circle r="3" fill={ACCENT}>
            <animateMotion
              dur="1.4s"
              path={`M ${s.x} ${s.y} L ${t.x} ${t.y}`}
              fill="freeze"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.2;0.8;1"
              dur="1.4s"
              fill="freeze"
            />
          </circle>
        </g>
      ) : null}
      {NODES.map((n, i) => {
        const isSrc = i === srcI
        const isTgt = i === tgtI
        const color = isSrc || isTgt ? ACCENT : "rgba(255,255,255,0.4)"
        const size = isSrc ? 14 : isTgt ? 12 : 10
        return (
          <g key={n.key}>
            {isSrc && active ? (
              <circle cx={pos[i].x} cy={pos[i].y} r={size + 6} fill={ACCENT} opacity="0.15">
                <animate
                  attributeName="r"
                  values={`${size + 3};${size + 12};${size + 3}`}
                  dur="1.6s"
                  repeatCount="indefinite"
                />
              </circle>
            ) : null}
            <circle
              cx={pos[i].x}
              cy={pos[i].y}
              r={size}
              fill="rgba(10,10,10,1)"
              stroke={color}
              strokeWidth={1}
            />
            <text
              x={pos[i].x}
              y={pos[i].y + 3}
              textAnchor="middle"
              fill={color}
              fontSize={8}
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.1em"
            >
              {n.key}
            </text>
          </g>
        )
      })}
      <circle cx={cx} cy={cy} r={20} fill="rgba(10,10,10,1)" stroke={ACCENT} strokeWidth={1.2} />
      <text
        x={cx}
        y={cy + 3}
        textAnchor="middle"
        fill={ACCENT}
        fontSize={8}
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.2em"
      >
        CORE
      </text>
    </svg>
  )
}

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
            "radial-gradient(ellipse 65% 55% at 80% 30%, rgba(34,211,238,0.14) 0%, rgba(34,211,238,0.03) 40%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1.3px)",
          backgroundSize: "22px 22px",
          opacity: 0.35,
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 50% 50%, #000 30%, transparent 88%)",
          maskImage:
            "radial-gradient(ellipse 90% 80% at 50% 50%, #000 30%, transparent 88%)",
        }}
      />

      {/* Top masthead */}
      <div
        className={`relative z-10 pt-16 px-6 flex items-center gap-3 flex-wrap transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="text-[10px] font-mono tracking-[0.32em] uppercase text-white/70">
          Case study
        </span>
        <span className="text-white/25">/</span>
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
        className={`relative z-10 px-6 mt-6 text-[10px] font-mono tracking-[0.28em] uppercase text-white/45 transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "80ms" }}
      >
        For a New York venture firm
      </div>

      {/* Headline */}
      <h2
        className={`relative z-10 px-6 mt-3 text-[34px] font-semibold tracking-[-0.03em] leading-[1.02] text-white transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
        }`}
        style={{ transitionDelay: "160ms" }}
      >
        One brain across
        <br />
        <span className="text-white/50">the portfolio.</span>
      </h2>

      {/* Lead */}
      <p
        className={`relative z-10 px-6 mt-4 text-[14px] leading-[1.55] text-white/70 transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "240ms" }}
      >
        A central customer brain across a D2C portfolio. Deeper insight than
        any brand had on its own, with learning that can be shared with the
        fund or kept private.
      </p>

      {/* Mesh vignette */}
      <div
        className={`relative z-10 mt-5 mx-auto self-center aspect-square max-h-[240px] w-3/4 transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "320ms" }}
      >
        <MiniMesh active={visible} />
      </div>

      {/* Proof strip */}
      <div
        className={`relative z-10 px-6 mt-4 grid grid-cols-3 gap-4 transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "400ms" }}
      >
        {[
          { l: "Brands", v: "7" },
          { l: "Rollout", v: "8 wk" },
          { l: "Learning", v: "24/7" },
        ].map((m) => (
          <div key={m.l} className="border-t border-white/15 pt-2.5">
            <div className="text-[9px] font-mono tracking-[0.24em] uppercase text-white/40 mb-1">
              {m.l}
            </div>
            <div
              className="text-[24px] font-semibold tracking-[-0.02em] leading-[1] tabular-nums"
              style={{ color: ACCENT }}
            >
              {m.v}
            </div>
          </div>
        ))}
      </div>

      {/* Tap CTA */}
      <div
        className={`relative z-10 mt-auto pb-12 px-6 pt-6 transition-opacity duration-700 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: "480ms" }}
      >
        <Link
          href="/work"
          className="flex items-center justify-between gap-4 w-full pl-6 pr-5 py-[20px] bg-white text-black rounded-[14px] active:scale-[0.98] transition-transform duration-150"
          style={{
            boxShadow:
              "0 14px 36px -18px rgba(255,255,255,0.4), 0 2px 6px -2px rgba(255,255,255,0.12)",
          }}
        >
          <span className="flex flex-col items-start gap-1.5 min-w-0">
            <span className="text-[10px] font-mono tracking-[0.24em] uppercase opacity-55">
              Read the case
            </span>
            <span className="text-[15px] font-semibold tracking-[-0.015em] leading-tight">
              One brain across the portfolio
            </span>
          </span>
          <ArrowRight className="w-5 h-5 shrink-0" />
        </Link>
      </div>
    </section>
  )
}
