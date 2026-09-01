"use client"

/**
 * ContactCTA — client-side button that opens the global ContactModal.
 *
 * Drop-in replacement for the mailto anchors that were sprinkled across
 * the site. Server components can use this without going client-side
 * themselves. Preserves the arrow lucide + brand hover treatment used
 * everywhere else so it looks identical to the anchors it replaces.
 */

import type { ReactNode } from "react"
import { ArrowUpRight, ArrowRight } from "lucide-react"
import { openContactModal } from "@/components/ui/contact-modal"

type Variant = "light" | "dark" | "ghost-white" | "ghost-dark"

const VARIANTS: Record<Variant, string> = {
  light:
    "bg-white text-black hover:bg-[var(--2pt-green)] hover:text-[var(--2pt-black)]",
  dark:
    "bg-[var(--2pt-black)] text-[var(--2pt-white)] hover:bg-[var(--2pt-green)] hover:text-[var(--2pt-black)]",
  "ghost-white":
    "border border-white/30 text-white hover:border-[var(--2pt-green)] hover:bg-[var(--2pt-green)] hover:text-[var(--2pt-black)]",
  "ghost-dark":
    "border border-[var(--2pt-black)]/25 text-[var(--2pt-black)] hover:border-[var(--2pt-green)] hover:bg-[var(--2pt-green)]",
}

export function ContactCTA({
  children,
  variant = "light",
  arrow = "up-right",
  className = "",
  height = "h-12",
}: {
  children: ReactNode
  variant?: Variant
  arrow?: "up-right" | "right"
  className?: string
  height?: string
}) {
  const Arrow = arrow === "up-right" ? ArrowUpRight : ArrowRight
  return (
    <button
      type="button"
      onClick={() => openContactModal()}
      className={`hover-plate group inline-flex items-center gap-3 px-5 ${height} transition-colors duration-500 ${VARIANTS[variant]} ${className}`}
    >
      <span className="text-[11px] font-mono tracking-[0.22em] uppercase">
        {children}
      </span>
      <Arrow className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" />
    </button>
  )
}
