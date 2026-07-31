"use client"

/**
 * ClientLogo — renders a client mark on the work surfaces.
 *
 * Two render modes:
 *   1. If the case has a `logoPath` and the asset loads, show the asset.
 *      On dark surfaces we apply `invert + brightness(0)` so any logo
 *      (regardless of source colour) reads as a white mark on black.
 *   2. If the asset is missing or fails to load, fall back to a
 *      typographic wordmark in Geist Medium so the surface still has
 *      a strong mark while the SVG file gets sourced.
 *
 * Drop assets at: public/logos/work/{file}.svg (or .png).
 * The path is whatever's set on the case's `logoPath` field.
 */

import { useState } from "react"
import type { CaseStudy } from "@/lib/cases"

export function ClientLogo({
  case: c,
  variant = "dark",
  height = 28,
  className = "",
  accent,
}: {
  case: CaseStudy
  /** "dark" inverts the source to white. "light" leaves the source as-is. */
  variant?: "dark" | "light"
  /** Logo target height in pixels. Width scales to maintain aspect. */
  height?: number
  className?: string
  /** Accent colour for the trailing period in the typographic fallback. */
  accent?: string
}) {
  // Default to "not loaded" so the typographic fallback paints first.
  // When the asset successfully loads in the browser it takes over.
  // If the file is missing or the path is unset, the fallback stays.
  const [loaded, setLoaded] = useState(false)

  const wordmark = c.brand ?? c.client
  const hasPath = Boolean(c.logoPath)

  return (
    <span
      className={`relative inline-flex items-center ${className}`}
      style={{ height, minWidth: 1 }}
    >
      {/* Probe / final image. Hidden until it loads cleanly. */}
      {hasPath ? (
        <img
          src={c.logoPath}
          alt={`${c.client}${c.brand ? " · " + c.brand : ""}`}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(false)}
          style={{
            height,
            width: "auto",
            maxWidth: "100%",
            display: loaded ? "block" : "none",
            filter:
              variant === "dark"
                ? "brightness(0) invert(1)"
                : undefined,
          }}
        />
      ) : null}

      {/* Typographic wordmark fallback. Stays visible until an asset loads. */}
      {!loaded ? (
        <span
          className="inline-flex items-baseline font-medium tracking-[-0.035em] leading-none"
          style={{
            fontSize: height * 1.05,
            color:
              variant === "dark"
                ? "var(--2pt-white)"
                : "var(--2pt-black)",
          }}
        >
          {wordmark}
          <span
            className="ml-[1px]"
            style={{ color: accent ?? "var(--2pt-green)" }}
          >
            .
          </span>
        </span>
      ) : null}
    </span>
  )
}
