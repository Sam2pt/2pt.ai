"use client"

/**
 * Sparkline — tiny inline trend chart.
 *
 * Renders a series of values as a normalised line + filled area + endpoint dot
 * inside a compact viewBox. Use for "last 8 hours" / "last 30 days" micro-
 * indicators next to numbers in the cinematic widgets.
 *
 *   <Sparkline values={[3,4,5,4,6,7,8]} width={48} height={14} />
 *
 * Deterministic — no internal state, no animation, just SVG.
 */

export type SparklineProps = {
  values: number[]
  width?: number
  height?: number
  color?: string
  fillOpacity?: number
  strokeWidth?: number
  showDot?: boolean
  className?: string
}

export function Sparkline({
  values,
  width = 56,
  height = 14,
  color = "currentColor",
  fillOpacity = 0.12,
  strokeWidth = 1.2,
  showDot = true,
  className = "",
}: SparklineProps) {
  if (values.length < 2) return null

  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const padding = 1.5

  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * (width - padding * 2) + padding
    const y =
      height - padding - ((v - min) / range) * (height - padding * 2)
    return { x, y }
  })

  const linePath = pts
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ")

  const areaPath = `${linePath} L ${pts[pts.length - 1].x.toFixed(1)} ${height} L ${pts[0].x.toFixed(1)} ${height} Z`

  const last = pts[pts.length - 1]

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
      aria-hidden
    >
      <path d={areaPath} fill={color} fillOpacity={fillOpacity} />
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {showDot && (
        <circle cx={last.x} cy={last.y} r={1.6} fill={color} />
      )}
    </svg>
  )
}

/**
 * Deterministic pseudo-random series — used to generate believable-looking
 * sparkline data per row without storing real history. Same seed = same
 * shape across renders (so the chart doesn't flicker).
 */
export function seededSeries(seed: number, length = 10, base = 0.5, amplitude = 0.35): number[] {
  const out: number[] = []
  let s = seed
  for (let i = 0; i < length; i++) {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    const norm = (s / 0x7fffffff - 0.5) * 2 // -1..1
    out.push(base + norm * amplitude)
  }
  return out
}
