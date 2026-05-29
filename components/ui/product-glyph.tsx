"use client"

/**
 * ProductGlyph — official marks for the 2pt Suite.
 *
 *  • ChedderGlyph — the gold cheddar-wedge mark from chedder.2pt.ai.
 *  • LumenGlyph   — the radial-glow + petal-starburst mark from lumen.2pt.ai.
 *  • ConduitGlyph — sister mark designed to live alongside Lumen: a
 *    halo wrapper, a central diamond hub, four satellite nodes connected
 *    by glowing wires. Iridescent green-to-cyan to read as "future-appy".
 *
 * All three render inside ProductIconTile (periodic-table element style:
 * atomic number top-left, glyph centre, monogram bottom-right).
 *
 * Gradient ids are scoped with React.useId() so multiple instances of the
 * same glyph on a page don't collide.
 */

import React from "react"

// ──────────────────────────────────────────────────────────────────────
// 01 · Chedder — scan-ring mark.
//
// Same family vocabulary as Lumen + Conduit: outer halo wrapper, central
// iridescent green-to-cyan element. The mark expresses what Chedder does:
// concentric scan rings probe AI search, a bright "citation hit" dot
// lights up at the perimeter. Sister to Lumen's halo + petal mark.
// ──────────────────────────────────────────────────────────────────────

export function ChedderGlyph({ className = "" }: { className?: string }) {
  const uid = React.useId().replace(/:/g, "")
  const haloId = `chedder-halo-${uid}`
  const ringId = `chedder-ring-${uid}`
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Halo wrapper — matches Lumen + Conduit */}
        <radialGradient id={haloId} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#9bf7c6" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#15e07a" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#15e07a" stopOpacity="0" />
        </radialGradient>
        {/* Ring stroke gradient */}
        <linearGradient id={ringId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#15e07a" />
        </linearGradient>
      </defs>

      {/* Halo */}
      <circle cx="16" cy="16" r="15" fill={`url(#${haloId})`} />

      {/* Concentric scan rings — three thin arcs around the centre */}
      <g
        fill="none"
        stroke={`url(#${ringId})`}
        strokeLinecap="round"
      >
        <circle cx="16" cy="16" r="10.5" strokeWidth="1" opacity="0.45" />
        <circle cx="16" cy="16" r="7.2" strokeWidth="1.1" opacity="0.7" />
        <circle cx="16" cy="16" r="4" strokeWidth="1.3" opacity="0.9" />
      </g>

      {/* Citation "hit" dot — a green ping sitting on the outer ring,
          top-right of centre. Reads as "we found a citation here". */}
      <circle
        cx="23.4"
        cy="8.6"
        r="2.2"
        fill="#15e07a"
        opacity="0.95"
      />
      <circle
        cx="23.4"
        cy="8.6"
        r="3.6"
        fill="#15e07a"
        opacity="0.2"
      />

      {/* Central bright core — keeps parity with Lumen + Conduit's
          central white spark. */}
      <circle cx="16" cy="16" r="1.6" fill="#ffffff" />
    </svg>
  )
}

// ──────────────────────────────────────────────────────────────────────
// 02 · Lumen — official mark from lumen.2pt.ai
// ──────────────────────────────────────────────────────────────────────

export function LumenGlyph({ className = "" }: { className?: string }) {
  const uid = React.useId().replace(/:/g, "")
  const cGrad = `lumen-core-${uid}`
  const gGrad = `lumen-glow-${uid}`
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={cGrad} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="34%" stopColor="#9bf7c6" />
          <stop offset="100%" stopColor="#15e07a" />
        </radialGradient>
        <radialGradient id={gGrad} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#15e07a" stopOpacity="0.6" />
          <stop offset="68%" stopColor="#15e07a" stopOpacity="0.13" />
          <stop offset="100%" stopColor="#15e07a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="16" r="15" fill={`url(#${gGrad})`} />
      <g fill="#15e07a" opacity="0.55">
        <path
          d="M16 13.6 L14.85 8 L16 4.5 L17.15 8 Z"
          transform="rotate(45 16 16)"
        />
        <path
          d="M16 13.6 L14.85 8 L16 4.5 L17.15 8 Z"
          transform="rotate(135 16 16)"
        />
        <path
          d="M16 13.6 L14.85 8 L16 4.5 L17.15 8 Z"
          transform="rotate(225 16 16)"
        />
        <path
          d="M16 13.6 L14.85 8 L16 4.5 L17.15 8 Z"
          transform="rotate(315 16 16)"
        />
      </g>
      <path
        transform="translate(4 4)"
        d="M12 0c1.15 7.6 3.25 9.7 12 11-8.75 1.3-10.85 3.4-12 12-1.15-8.6-3.25-10.7-12-12 8.75-1.3 10.85-3.4 12-11z"
        fill={`url(#${cGrad})`}
      />
      <circle cx="16" cy="16" r="1.7" fill="#ffffff" />
    </svg>
  )
}

// ──────────────────────────────────────────────────────────────────────
// 03 · Conduit — sister mark to Lumen. Halo wrapper + diamond hub +
// four satellite nodes connected by glowing wires. Iridescent cyan-to-
// green gradient for the "future-appy" feel.
// ──────────────────────────────────────────────────────────────────────

export function ConduitGlyph({ className = "" }: { className?: string }) {
  const uid = React.useId().replace(/:/g, "")
  const haloId = `conduit-halo-${uid}`
  const hubId = `conduit-hub-${uid}`
  const wireId = `conduit-wire-${uid}`
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Outer halo — matches Lumen's halo wrapper */}
        <radialGradient id={haloId} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#15e07a" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#15e07a" stopOpacity="0" />
        </radialGradient>
        {/* Hub core — iridescent diamond gradient */}
        <linearGradient id={hubId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#9bf7c6" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        {/* Wire — soft glowing line */}
        <linearGradient id={wireId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#15e07a" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      {/* Halo */}
      <circle cx="16" cy="16" r="15" fill={`url(#${haloId})`} />

      {/* Wires — four glowing lines from hub to satellites */}
      <g
        stroke={`url(#${wireId})`}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.85"
        fill="none"
      >
        <line x1="16" y1="16" x2="16" y2="5" />
        <line x1="16" y1="16" x2="27" y2="16" />
        <line x1="16" y1="16" x2="16" y2="27" />
        <line x1="16" y1="16" x2="5" y2="16" />
      </g>

      {/* Satellite nodes */}
      <g>
        <circle cx="16" cy="5" r="2" fill="#15e07a" opacity="0.9" />
        <circle cx="27" cy="16" r="2" fill="#22d3ee" opacity="0.9" />
        <circle cx="16" cy="27" r="2" fill="#15e07a" opacity="0.9" />
        <circle cx="5" cy="16" r="2" fill="#22d3ee" opacity="0.9" />
      </g>

      {/* Central diamond hub */}
      <g>
        <rect
          x="11.5"
          y="11.5"
          width="9"
          height="9"
          rx="1.2"
          transform="rotate(45 16 16)"
          fill={`url(#${hubId})`}
          stroke="#ffffff"
          strokeOpacity="0.6"
          strokeWidth="0.6"
        />
        {/* Inner spark — keeps parity with Lumen's central white dot */}
        <circle cx="16" cy="16" r="1.6" fill="#ffffff" />
      </g>
    </svg>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Registry
// ──────────────────────────────────────────────────────────────────────

export const PRODUCT_GLYPHS = {
  chedder: { Glyph: ChedderGlyph, mono: "Ch" },
  lumen: { Glyph: LumenGlyph, mono: "Lu" },
  conduit: { Glyph: ConduitGlyph, mono: "Co" },
} as const

export type ProductId = keyof typeof PRODUCT_GLYPHS

/**
 * ProductIconTile — square tile that displays only the product glyph.
 *
 * Earlier versions carried an atomic-number badge in the top-left and a
 * monogram badge in the bottom-right (periodic-table element style). Both
 * have been stripped so the glyph reads on its own — the surrounding
 * card chrome already carries the index, name, and slug.
 *
 * The `atomic` prop is kept on the type for backward compatibility but
 * is not rendered.
 */
export function ProductIconTile({
  id,
  size = 44,
  variant = "light",
  className = "",
}: {
  id: ProductId
  /** Deprecated. Kept for prop compatibility; no longer rendered. */
  atomic?: string
  size?: number
  variant?: "light" | "dark"
  className?: string
}) {
  const { Glyph } = PRODUCT_GLYPHS[id]
  const isDark = variant === "dark"
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-[8px] ${className}`}
      style={{
        width: size,
        height: size,
        background: isDark ? "var(--2pt-black)" : "var(--2pt-white)",
        color: isDark ? "var(--2pt-white)" : "var(--2pt-black)",
        border: isDark
          ? "1px solid rgba(255,255,255,0.10)"
          : "1px solid rgba(10,10,10,0.12)",
        boxShadow: isDark
          ? "0 1px 0 rgba(255,255,255,0.06) inset, 0 2px 6px -2px rgba(10,10,10,0.35)"
          : "0 1px 0 rgba(255,255,255,0.6) inset, 0 2px 6px -2px rgba(10,10,10,0.08)",
      }}
    >
      <Glyph className="w-[72%] h-[72%]" />
    </div>
  )
}
