"use client"

/**
 * SystemMark — bolder iconography for the "What we solve" rows.
 *
 * Filled green where the previous version used hairline outlines.
 * Thicker strokes (2.5–3px). Chunkier geometry with more visual weight.
 * Reads as "system" instead of "engineering sketch."
 */

export type SystemMarkVariant = 0 | 1 | 2 | 3 | 4

const INK = "rgba(10,10,10,0.88)"
const INK_SOFT = "rgba(10,10,10,0.18)"
const INK_FILL = "rgba(10,10,10,0.08)"
const GREEN = "rgba(74,222,128,1)"
const GREEN_DEEP = "rgba(54,200,108,1)"

export function SystemMark({ variant }: { variant: SystemMarkVariant }) {
  return (
    <div className="w-full h-full">
      {variant === 0 && <MarkAscending />}
      {variant === 1 && <MarkScan />}
      {variant === 2 && <MarkVariants />}
      {variant === 3 && <MarkConvergence />}
      {variant === 4 && <MarkConstellation />}
    </div>
  )
}

/* 0 — Ascending bars (Monitoring growth) */
function MarkAscending() {
  return (
    <svg viewBox="0 0 60 60" className="w-full h-full">
      <defs>
        <linearGradient id="bar-green" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={GREEN} />
          <stop offset="100%" stopColor={GREEN_DEEP} />
        </linearGradient>
      </defs>
      <rect x="6" y="49" width="48" height="3" fill={INK} />
      <rect x="9" y="36" width="7" height="13" fill={INK_FILL} stroke={INK} strokeWidth="1.5" />
      <rect x="20" y="28" width="7" height="21" fill={INK_FILL} stroke={INK} strokeWidth="1.5" />
      <rect x="31" y="18" width="7" height="31" fill={INK_FILL} stroke={INK} strokeWidth="1.5" />
      <rect x="42" y="6" width="7" height="43" fill="url(#bar-green)" stroke={GREEN_DEEP} strokeWidth="1.5" />
    </svg>
  )
}

/* 1 — Concentric scan (Monitoring efficiency) */
function MarkScan() {
  return (
    <svg viewBox="0 0 60 60" className="w-full h-full">
      <line x1="30" y1="4" x2="30" y2="14" stroke={INK_SOFT} strokeWidth="2" strokeLinecap="round" />
      <line x1="30" y1="46" x2="30" y2="56" stroke={INK_SOFT} strokeWidth="2" strokeLinecap="round" />
      <line x1="4" y1="30" x2="14" y2="30" stroke={INK_SOFT} strokeWidth="2" strokeLinecap="round" />
      <line x1="46" y1="30" x2="56" y2="30" stroke={INK_SOFT} strokeWidth="2" strokeLinecap="round" />
      <circle cx="30" cy="30" r="22" fill="none" stroke={INK} strokeWidth="2" />
      <circle cx="30" cy="30" r="14" fill="none" stroke={GREEN_DEEP} strokeWidth="2.5" />
      <circle cx="30" cy="30" r="6" fill={GREEN} />
    </svg>
  )
}

/* 2 — Diverging variants (Creative optimisation) */
function MarkVariants() {
  return (
    <svg viewBox="0 0 60 60" className="w-full h-full">
      <circle cx="10" cy="30" r="6" fill={GREEN} stroke={GREEN_DEEP} strokeWidth="1.5" />
      <line x1="16" y1="30" x2="48" y2="14" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="30" x2="48" y2="30" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="30" x2="48" y2="46" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <rect x="48" y="11" width="6" height="6" fill={INK_FILL} stroke={INK} strokeWidth="1.5" />
      <rect x="48" y="27" width="6" height="6" fill={INK_FILL} stroke={INK} strokeWidth="1.5" />
      <rect x="48" y="43" width="6" height="6" fill={INK_FILL} stroke={INK} strokeWidth="1.5" />
    </svg>
  )
}

/* 3 — Convergence (Consistency and compliance) */
function MarkConvergence() {
  return (
    <svg viewBox="0 0 60 60" className="w-full h-full">
      <rect x="4" y="8" width="6" height="6" fill={INK_FILL} stroke={INK} strokeWidth="1.5" />
      <rect x="4" y="20" width="6" height="6" fill={INK_FILL} stroke={INK} strokeWidth="1.5" />
      <rect x="4" y="34" width="6" height="6" fill={INK_FILL} stroke={INK} strokeWidth="1.5" />
      <rect x="4" y="46" width="6" height="6" fill={INK_FILL} stroke={INK} strokeWidth="1.5" />
      <line x1="10" y1="11" x2="44" y2="30" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="10" y1="23" x2="44" y2="30" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="10" y1="37" x2="44" y2="30" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="10" y1="49" x2="44" y2="30" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="50" cy="30" r="8" fill={GREEN} stroke={GREEN_DEEP} strokeWidth="1.5" />
    </svg>
  )
}

/* 4 — Agent constellation (Driving growth) */
function MarkConstellation() {
  return (
    <svg viewBox="0 0 60 60" className="w-full h-full">
      <line x1="30" y1="30" x2="12" y2="12" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="30" x2="48" y2="14" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="30" x2="48" y2="46" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="30" x2="12" y2="48" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <rect x="8" y="8" width="8" height="8" fill={INK_FILL} stroke={INK} strokeWidth="1.5" />
      <rect x="44" y="10" width="8" height="8" fill={INK_FILL} stroke={INK} strokeWidth="1.5" />
      <rect x="44" y="42" width="8" height="8" fill={INK_FILL} stroke={INK} strokeWidth="1.5" />
      <rect x="8" y="44" width="8" height="8" fill={INK_FILL} stroke={INK} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="9" fill={GREEN} stroke={GREEN_DEEP} strokeWidth="1.5" />
    </svg>
  )
}
