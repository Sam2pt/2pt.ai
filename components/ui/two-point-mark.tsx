"use client"

/**
 * TwoPointMark — the brand's recurring system mark.
 *
 * Two green dots connected by a hairline. Literal reading of "Two Point":
 * two endpoints, one connection. Used in nav chrome, footers, loaders and
 * anywhere the wordmark feels too heavy.
 *
 * Variants:
 *   default — two solid dots + connecting line, optional pulse
 *   stacked — dots arranged vertically (for compact contexts)
 *   live    — left dot pulses to indicate live status
 */

type Variant = "default" | "stacked" | "live"

export function TwoPointMark({
  variant = "default",
  className = "",
  size = 20,
}: {
  variant?: Variant
  className?: string
  size?: number
}) {
  if (variant === "stacked") {
    return (
      <svg
        viewBox="0 0 14 24"
        width={size * 0.6}
        height={size}
        className={className}
        aria-hidden
      >
        <circle cx="7" cy="4" r="3" fill="var(--2pt-green)" />
        <line
          x1="7"
          y1="8"
          x2="7"
          y2="16"
          stroke="var(--2pt-green)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="7" cy="20" r="3" fill="var(--2pt-green)" />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 28 8"
      width={size * 1.6}
      height={size * 0.5}
      className={className}
      aria-hidden
    >
      <circle
        cx="4"
        cy="4"
        r="3"
        fill="var(--2pt-green)"
        className={variant === "live" ? "animate-pulse" : ""}
        style={variant === "live" ? { animationDuration: "1.6s" } : undefined}
      />
      <line
        x1="8"
        y1="4"
        x2="20"
        y2="4"
        stroke="var(--2pt-green)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="24" cy="4" r="3" fill="var(--2pt-green)" />
    </svg>
  )
}
