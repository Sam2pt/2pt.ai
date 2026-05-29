/**
 * ProductGlyph — geometric mark for each product in the 2PT Suite.
 *
 * Visual language is shared so the three glyphs read as a family:
 *  • 24×24 viewBox, 1.5px stroke, currentColor outlines, single green accent.
 *  • Each glyph encodes the product's function in one geometric idea —
 *    Chedder = concentric citation radar, Lumen = stacked cohort signal,
 *    Conduit = connected nodes / relay path.
 *
 * Rendered inside an "app icon" tile by callers (ProductIconTile below)
 * so the family lockup feels like Adobe Creative Suite app icons.
 */

import React from "react"

const STROKE = "currentColor"
const SW = 1.6

export function ChedderGlyph({ className = "" }: { className?: string }) {
  // Concentric radar circles with one cited "hit" dot at the top-right.
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="none"
      stroke={STROKE}
      strokeWidth={SW}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" opacity="0.35" />
      <circle cx="12" cy="12" r="6" opacity="0.6" />
      <circle cx="12" cy="12" r="3" />
      {/* hit dot — the "cited" signal */}
      <circle cx="18.3" cy="5.7" r="1.6" fill="var(--2pt-green)" stroke="none" />
    </svg>
  )
}

export function LumenGlyph({ className = "" }: { className?: string }) {
  // Four stacked horizontal bars at varying lengths — cohort meter.
  // Active bar is green to signal "live scoring".
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="none"
      stroke={STROKE}
      strokeWidth={SW}
      strokeLinecap="round"
    >
      <line x1="4" y1="6" x2="14" y2="6" opacity="0.45" />
      <line
        x1="4"
        y1="10"
        x2="20"
        y2="10"
        stroke="var(--2pt-green)"
        strokeWidth={SW + 0.4}
      />
      <line x1="4" y1="14" x2="11" y2="14" opacity="0.45" />
      <line x1="4" y1="18" x2="17" y2="18" opacity="0.55" />
    </svg>
  )
}

export function ConduitGlyph({ className = "" }: { className?: string }) {
  // Four nodes wired together with a routing path. Active node is green.
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="none"
      stroke={STROKE}
      strokeWidth={SW}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Routing path */}
      <path d="M5 6 L5 12 L12 12 L12 18 L19 18" opacity="0.7" />
      {/* Nodes */}
      <circle cx="5" cy="6" r="1.6" fill="currentColor" stroke="none" />
      <circle
        cx="12"
        cy="12"
        r="2"
        fill="var(--2pt-green)"
        stroke="none"
      />
      <circle cx="19" cy="18" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  )
}

export const PRODUCT_GLYPHS = {
  chedder: { Glyph: ChedderGlyph, mono: "Ch" },
  lumen: { Glyph: LumenGlyph, mono: "Lu" },
  conduit: { Glyph: ConduitGlyph, mono: "Co" },
} as const

export type ProductId = keyof typeof PRODUCT_GLYPHS

/**
 * ProductIconTile — square "app icon" tile combining the geometric glyph
 * with a 2-letter monogram in the corner. The Adobe Creative Suite move.
 *
 * Variants:
 *  • "light" (default) — white fill, black glyph, green dot. The face used
 *    inside light cards.
 *  • "dark" — black fill, white glyph, green dot. Useful in family lockups
 *    or hover states.
 */
export function ProductIconTile({
  id,
  size = 44,
  variant = "light",
  className = "",
}: {
  id: ProductId
  size?: number
  variant?: "light" | "dark"
  className?: string
}) {
  const { Glyph, mono } = PRODUCT_GLYPHS[id]
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
      <Glyph className="w-[60%] h-[60%]" />
      {/* Monogram badge — bottom-right corner */}
      <span
        className="absolute font-mono tabular-nums leading-none"
        style={{
          right: 4,
          bottom: 3,
          fontSize: Math.max(8, Math.round(size * 0.2)),
          letterSpacing: "0.04em",
          color: isDark
            ? "rgba(255,255,255,0.6)"
            : "rgba(10,10,10,0.55)",
        }}
      >
        {mono}
      </span>
    </div>
  )
}
