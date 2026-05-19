"use client"

/**
 * CornerCrops — editorial viewfinder corner brackets.
 *
 * Four thin L-shaped marks at the corners of a panel, like print crop marks
 * or a camera viewfinder. Adds a "framed by precision instrument" feel
 * without competing with content.
 *
 * Render inside any `position: relative` parent. Pointer-events disabled.
 */

export function CornerCrops({
  size = 12,
  thickness = 1,
  inset = 8,
  color = "var(--2pt-green)",
  opacity = 0.5,
  className = "",
}: {
  size?: number
  thickness?: number
  inset?: number
  color?: string
  opacity?: number
  className?: string
}) {
  const armStyle = (orientation: "v" | "h") => ({
    position: "absolute" as const,
    backgroundColor: color,
    opacity,
    ...(orientation === "v"
      ? { width: thickness, height: size }
      : { width: size, height: thickness }),
  })

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      {/* Top-left */}
      <div style={{ ...armStyle("v"), top: inset, left: inset }} />
      <div style={{ ...armStyle("h"), top: inset, left: inset }} />
      {/* Top-right */}
      <div style={{ ...armStyle("v"), top: inset, right: inset }} />
      <div style={{ ...armStyle("h"), top: inset, right: inset }} />
      {/* Bottom-left */}
      <div
        style={{
          ...armStyle("v"),
          bottom: inset,
          left: inset,
        }}
      />
      <div style={{ ...armStyle("h"), bottom: inset, left: inset }} />
      {/* Bottom-right */}
      <div
        style={{
          ...armStyle("v"),
          bottom: inset,
          right: inset,
        }}
      />
      <div style={{ ...armStyle("h"), bottom: inset, right: inset }} />
    </div>
  )
}
