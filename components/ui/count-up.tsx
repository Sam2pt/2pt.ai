"use client"

import { useEffect, useRef, useState } from "react"

/**
 * CountUp — animates a numeric value from 0 to target when the element
 * scrolls into view. Preserves any non-numeric prefix/suffix in the source
 * string (e.g. "$270" → "$" + 0..270, "10x" → 0..10 + "x", "4.7★" → 0..4.7 + "★").
 *
 * For values we can't parse (e.g. "Always-on", "Mars", "Multi-cat") we just
 * render the original string, no animation.
 */

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

function parseValue(raw: string): { prefix: string; number: number; suffix: string; decimals: number } | null {
  // Match: optional leading non-digit, the number (with optional decimal and +/k/M/B notation), trailing non-digit
  const m = raw.match(/^([^0-9.\-]*)([-+]?\d+(?:\.\d+)?)(.*)$/)
  if (!m) return null
  const number = parseFloat(m[2])
  if (Number.isNaN(number)) return null
  const decimals = m[2].includes(".") ? (m[2].split(".")[1]?.length ?? 0) : 0
  return { prefix: m[1] ?? "", number, suffix: m[3] ?? "", decimals }
}

export function CountUp({
  value,
  durationMs = 1600,
  className = "",
}: {
  value: string
  durationMs?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const parsed = parseValue(value)
  const [current, setCurrent] = useState<number>(parsed ? 0 : 0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!parsed || !ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true)
      },
      { threshold: 0.4 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [parsed, started])

  useEffect(() => {
    if (!parsed || !started) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs)
      setCurrent(parsed.number * easeOut(t))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [parsed, started, durationMs])

  if (!parsed) {
    return <span ref={ref} className={className}>{value}</span>
  }

  const display = parsed.decimals > 0
    ? current.toFixed(parsed.decimals)
    : Math.round(current).toString()

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      {display}
      {parsed.suffix}
    </span>
  )
}
