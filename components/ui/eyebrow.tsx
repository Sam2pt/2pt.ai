"use client"

/**
 * Eyebrow — the small mono label that opens every section.
 * Standardised so the rhythm at the top of each section reads identically.
 *
 *   <Eyebrow>Where we're going</Eyebrow>
 *
 *   <Eyebrow live>Live</Eyebrow>   ← green dot pulses
 */

import type { ReactNode } from "react"

export function Eyebrow({
  children,
  live = false,
  className = "",
}: {
  children: ReactNode
  live?: boolean
  className?: string
}) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span
        className={`w-1.5 h-1.5 rounded-full bg-[var(--2pt-green)] ${
          live ? "animate-pulse" : ""
        }`}
      />
      <span className="text-[10px] tracking-[0.3em] text-[var(--2pt-black)]/50 font-mono uppercase">
        {children}
      </span>
    </div>
  )
}
