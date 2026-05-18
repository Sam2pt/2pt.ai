"use client"

/**
 * Site-wide grain overlay.
 *
 * Renders an SVG turbulence filter as a fixed full-viewport layer.
 * Adds subtle film-like texture across every surface without
 * affecting interaction (pointer-events: none) or readability
 * (very low opacity).
 *
 * One DOM node, no animation, no JS — pure decoration.
 */

export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] mix-blend-multiply opacity-[0.045]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.7 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        backgroundSize: "240px 240px",
      }}
    />
  )
}
