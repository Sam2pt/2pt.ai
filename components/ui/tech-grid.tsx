"use client"

/**
 * TechGrid — faint engineering dot-grid background.
 *
 * A blueprint-style dot lattice rendered behind a section's content. Very
 * low opacity so it reads as texture, not pattern — gives a pure-white page
 * a sense of structure / "technical canvas" without darkening it.
 *
 * Optional radial mask fades the grid out toward the edges so it never
 * collides with content at the section boundary.
 *
 * Render inside any `position: relative` parent; pointer-events disabled.
 */

export function TechGrid({
  cell = 30,
  dot = 1,
  opacity = 0.5,
  mask = true,
  className = "",
}: {
  cell?: number
  dot?: number
  opacity?: number
  mask?: boolean
  className?: string
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        opacity,
        backgroundImage:
          "radial-gradient(rgba(5,5,5,0.34) " + dot + "px, transparent " + (dot + 0.5) + "px)",
        backgroundSize: `${cell}px ${cell}px`,
        ...(mask
          ? {
              WebkitMaskImage:
                "radial-gradient(ellipse 75% 65% at 50% 45%, #000 35%, transparent 80%)",
              maskImage:
                "radial-gradient(ellipse 75% 65% at 50% 45%, #000 35%, transparent 80%)",
            }
          : {}),
      }}
    />
  )
}

/**
 * GreenWash — a single soft green radial glow, positionable per section so
 * the brand colour recurs as a quiet accent beyond the hero.
 */
export function GreenWash({
  at = "80% 30%",
  size = "60% 55%",
  intensity = 0.1,
  className = "",
}: {
  at?: string
  size?: string
  intensity?: number
  className?: string
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        background: `radial-gradient(ellipse ${size} at ${at}, rgba(74,222,128,${intensity}) 0%, rgba(74,222,128,${intensity * 0.35}) 35%, transparent 68%)`,
      }}
    />
  )
}
