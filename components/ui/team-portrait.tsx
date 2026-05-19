"use client"

/**
 * TeamPortrait — parametric line-drawn portrait.
 *
 * A single SVG renders a stylised editorial illustration. Variations come
 * from three switchable paths (hair / accessory / face), seeded by the
 * caller so each team member gets a deterministic, distinct look.
 *
 * 8 hair × 3 accessory × 3 face = 72 unique combinations. The drawings are
 * deliberately abstract — single-line outlines on the page colour, no skin
 * tone, no detailed features — so they read as a unified illustration set.
 */

const HAIR_VARIANTS: string[] = [
  // 0 — short crop
  "M 22 28 Q 40 14 58 28",
  // 1 — flat-top
  "M 22 28 L 22 18 L 58 18 L 58 28",
  // 2 — long sides
  "M 22 28 Q 40 14 58 28 M 22 28 L 20 60 M 58 28 L 60 60",
  // 3 — bun on top
  "M 22 28 Q 40 16 58 28 M 36 14 a 5 5 0 1 1 0.01 0",
  // 4 — curls (three small arcs)
  "M 24 26 a 4 4 0 0 1 8 0 M 36 22 a 4 4 0 0 1 8 0 M 48 26 a 4 4 0 0 1 8 0",
  // 5 — swept side
  "M 22 28 L 22 14 Q 36 8 52 16 L 58 24",
  // 6 — cap / hat
  "M 18 26 L 18 22 L 62 22 L 62 26 M 14 26 L 22 26",
  // 7 — long straight (shoulder length)
  "M 22 28 Q 40 12 58 28 M 22 28 L 18 64 M 58 28 L 62 64",
]

const ACCESSORY_VARIANTS: (string | null)[] = [
  null,
  // glasses (two circles + bridge)
  "M 30 37 a 4 4 0 1 0 0.01 0 M 46 37 a 4 4 0 1 0 0.01 0 M 34 37 L 42 37",
  // earring (small circle on right side)
  "M 58 42 a 1 1 0 1 0 0.01 0",
]

const FACE_VARIANTS: (string | null)[] = [
  null,
  // small beard (arc under chin)
  "M 30 47 Q 40 56 50 47",
  // moustache (small line)
  "M 34 44 Q 40 47 46 44",
]

export type TeamPortraitProps = {
  seed: number
  size?: number
  className?: string
}

export function TeamPortrait({ seed, size = 80, className = "" }: TeamPortraitProps) {
  const hair = HAIR_VARIANTS[seed % HAIR_VARIANTS.length]
  const accessory = ACCESSORY_VARIANTS[Math.floor(seed * 0.7) % ACCESSORY_VARIANTS.length]
  const face = FACE_VARIANTS[Math.floor(seed * 0.41) % FACE_VARIANTS.length]
  // Tiny per-person nudge in head position so they don't all sit identically
  const tilt = ((seed * 17) % 5) - 2

  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        transform={`rotate(${tilt} 40 40)`}
      >
        {/* shoulders */}
        <path d="M 8 78 Q 40 56 72 78" />
        {/* neck */}
        <path d="M 32 56 L 32 64 M 48 56 L 48 64" />
        {/* head */}
        <circle cx="40" cy="36" r="18" />
        {/* hair */}
        <path d={hair} />
        {/* accessory (glasses / earring) */}
        {accessory && <path d={accessory} />}
        {/* face detail (beard / moustache) */}
        {face && <path d={face} />}
      </g>
    </svg>
  )
}
