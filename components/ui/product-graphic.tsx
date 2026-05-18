"use client"

/**
 * Product imagery — outline-arty mode (see BRAND.md §9).
 *
 * Richer compositions with subtle motion. Each product has one element
 * that animates (scan line, rotating wedge, flowing curves) to convey
 * "this is live / running / generating."
 */

export type ProductId = "cheddar" | "slice" | "whisk"

const INK = "rgba(10,10,10,0.45)"
const INK_FAINT = "rgba(10,10,10,0.18)"
const INK_GHOST = "rgba(10,10,10,0.07)"
const GREEN = "rgba(74,222,128,1)"
const GREEN_LINE = "rgba(74,222,128,0.8)"
const GREEN_SOFT = "rgba(74,222,128,0.18)"

export function ProductGraphic({ productId }: { productId: ProductId }) {
  return (
    <div className="relative w-full h-full bg-[var(--2pt-white)] overflow-hidden">
      {/* Shared faint dot-grid bg */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(10,10,10,0.07) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="absolute inset-0">
        {productId === "cheddar" && <CheddarComposition />}
        {productId === "slice" && <SliceComposition />}
        {productId === "whisk" && <WhiskComposition />}
      </div>
    </div>
  )
}

/* ---------------------- Cheddar — lens with live scan ---------------------- */

function CheddarComposition() {
  return (
    <>
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <radialGradient id="cheddar-wash" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={GREEN_SOFT} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Wash */}
        <rect x="0" y="0" width="400" height="300" fill="url(#cheddar-wash)" />

        {/* Cross axes */}
        <line x1="200" y1="40" x2="200" y2="260" stroke={INK_FAINT} strokeWidth="1" strokeDasharray="2 5" />
        <line x1="40" y1="150" x2="360" y2="150" stroke={INK_FAINT} strokeWidth="1" strokeDasharray="2 5" />

        {/* Three concentric lenses */}
        <ellipse cx="200" cy="150" rx="160" ry="36" fill="none" stroke={INK_GHOST} strokeWidth="1" />
        <ellipse cx="200" cy="150" rx="130" ry="30" fill="none" stroke={INK_FAINT} strokeWidth="1" />
        <ellipse cx="200" cy="150" rx="100" ry="22" fill="none" stroke={INK} strokeWidth="1.25" />
        {/* Active lens — green */}
        <ellipse cx="200" cy="150" rx="68" ry="16" fill="none" stroke={GREEN_LINE} strokeWidth="1.75" />

        {/* Center node */}
        <circle cx="200" cy="150" r="4" fill={GREEN} />
        <circle cx="200" cy="150" r="11" fill="none" stroke={GREEN_LINE} strokeWidth="1" className="animate-pulse" style={{ animationDuration: "2.5s" }} />

        {/* Corner ticks for "scanner viewport" feel */}
        <path d="M 40 60 L 40 50 L 50 50" fill="none" stroke={INK_FAINT} strokeWidth="1" />
        <path d="M 360 60 L 360 50 L 350 50" fill="none" stroke={INK_FAINT} strokeWidth="1" />
        <path d="M 40 240 L 40 250 L 50 250" fill="none" stroke={INK_FAINT} strokeWidth="1" />
        <path d="M 360 240 L 360 250 L 350 250" fill="none" stroke={INK_FAINT} strokeWidth="1" />
      </svg>

      {/* Animated scan line (HTML/CSS for cleaner animation) */}
      <div
        className="absolute inset-x-[10%] h-px bg-[var(--2pt-green)]/60 animate-scan-line"
        style={{ animationDuration: "5s", boxShadow: "0 0 8px rgba(74,222,128,0.5)" }}
      />
    </>
  )
}

/* ---------------------- Slice — compass wedge ---------------------- */

function SliceComposition() {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <radialGradient id="slice-wash" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={GREEN_SOFT} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id="slice-fill" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(74,222,128,0.4)" />
          <stop offset="100%" stopColor="rgba(74,222,128,0.05)" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="400" height="300" fill="url(#slice-wash)" />

      {/* Three concentric circles */}
      <circle cx="200" cy="150" r="120" fill="none" stroke={INK_GHOST} strokeWidth="1" />
      <circle cx="200" cy="150" r="92" fill="none" stroke={INK_FAINT} strokeWidth="1" />
      <circle cx="200" cy="150" r="64" fill="none" stroke={INK_FAINT} strokeWidth="1" />

      {/* The wedge — filled gradient + green outline */}
      <path
        d="M 200 150 L 200 30 A 120 120 0 0 1 304 90 L 200 150 Z"
        fill="url(#slice-fill)"
        stroke={GREEN_LINE}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />

      {/* Slow-rotating tick marker — pure decoration */}
      <g
        className="animate-rotate-slow"
        style={{ transformOrigin: "200px 150px", animationDuration: "30s" }}
      >
        <line x1="200" y1="20" x2="200" y2="32" stroke={INK} strokeWidth="1.5" />
      </g>

      {/* 12 compass ticks */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180
        const x1 = 200 + Math.cos(angle) * 124
        const y1 = 150 + Math.sin(angle) * 124
        const x2 = 200 + Math.cos(angle) * 132
        const y2 = 150 + Math.sin(angle) * 132
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK_FAINT} strokeWidth="1" />
        )
      })}

      {/* Center node */}
      <circle cx="200" cy="150" r="4" fill={GREEN} />
    </svg>
  )
}

/* ---------------------- Whisk — flowing variants ---------------------- */

function WhiskComposition() {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <radialGradient id="whisk-wash" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={GREEN_SOFT} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="400" height="300" fill="url(#whisk-wash)" />

      {/* Baseline */}
      <line x1="20" y1="265" x2="380" y2="265" stroke={INK_FAINT} strokeWidth="1" />

      {/* Vertical tick markers along baseline */}
      {[40, 100, 160, 220, 280, 340].map((x) => (
        <line key={x} x1={x} y1="265" x2={x} y2="270" stroke={INK_FAINT} strokeWidth="0.75" />
      ))}

      {/* Five parallel S-curves — variants generated */}
      <path
        d="M 40 240 C 130 240, 130 90, 210 90 S 290 240, 370 90"
        fill="none"
        stroke={INK_GHOST}
        strokeWidth="1"
      />
      <path
        d="M 40 230 C 130 230, 130 80, 210 80 S 290 230, 370 80"
        fill="none"
        stroke={INK_FAINT}
        strokeWidth="1"
      />
      <path
        d="M 40 220 C 130 220, 130 70, 210 70 S 290 220, 370 70"
        fill="none"
        stroke={INK_FAINT}
        strokeWidth="1.25"
      />
      <path
        d="M 40 210 C 130 210, 130 60, 210 60 S 290 210, 370 60"
        fill="none"
        stroke={INK}
        strokeWidth="1.5"
      />
      {/* Current variant — green */}
      <path
        d="M 40 200 C 130 200, 130 50, 210 50 S 290 200, 370 50"
        fill="none"
        stroke={GREEN_LINE}
        strokeWidth="2"
      />

      {/* Leading-edge green node with pulse halo */}
      <circle
        cx="370"
        cy="50"
        r="14"
        fill="none"
        stroke={GREEN_LINE}
        strokeWidth="1"
        className="animate-pulse"
        style={{ animationDuration: "2.5s" }}
      />
      <circle cx="370" cy="50" r="5" fill={GREEN} />
    </svg>
  )
}
