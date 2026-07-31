/**
 * CaseSection — one engagement, rendered as a self-contained chapter.
 *
 * Used twice:
 *   1. On `/work` — four CaseSections stack as a long-scroll magazine,
 *      with the CaseStrip up top acting as the channel selector.
 *   2. On `/work/[slug]` — a single CaseSection sits as the canonical
 *      page for sharing / deep links / per-case SEO.
 *
 * Each section anchors on `id={slug}` and tags itself with
 * `data-case-slug` so the CaseStrip's IntersectionObserver can update
 * the URL hash + the active pill as the user scrolls.
 *
 * The plaque footer (italic serif attribution) provides the visual
 * pause between cases when stacked.
 */

import type { CaseStudy } from "@/lib/cases"
import { CaseHero } from "@/components/work/case-hero"

const ACCENT_HEX: Record<CaseStudy["accent"], string> = {
  green: "#4ade80",
  cyan: "#22d3ee",
  lime: "#bef264",
  emerald: "#34d399",
}

export function CaseSection({
  case: c,
  caseIndex,
  total,
  /** When true, draws the hairline divider at the bottom (between cases). */
  withDivider = true,
}: {
  case: CaseStudy
  caseIndex: number
  total: number
  withDivider?: boolean
}) {
  const accent = ACCENT_HEX[c.accent]
  return (
    <section
      id={c.slug}
      data-case-slug={c.slug}
      aria-labelledby={`${c.slug}-heading`}
      className="relative scroll-mt-32 pt-12 md:pt-20"
      style={{
        // Faint per-case ambient halo at the section's top-right.
        background:
          `radial-gradient(ellipse 55% 45% at 88% 14%, ${accent}1A 0%, transparent 60%)`,
      }}
    >
      <CaseHero case={c} caseIndex={caseIndex} total={total} />

      {/* Plaque footer — quiet attribution, italic serif. Acts as the
          chapter break between stacked cases. */}
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-[var(--2pt-white)]/10 pt-6 text-[12px] md:text-[13px] text-[var(--2pt-white)]/55 italic font-[var(--font-serif)]">
        <span>An engagement with</span>
        <span
          className="text-[var(--2pt-white)] not-italic font-medium"
          style={{ fontFamily: "var(--font-sans)" }}
          id={`${c.slug}-heading`}
        >
          {c.client}
          {c.brand ? ` · ${c.brand}` : ""}
        </span>
        <span className="text-[var(--2pt-white)]/30">·</span>
        <span>{c.year}</span>
        <span className="text-[var(--2pt-white)]/30">·</span>
        <span>Marketing services. AI-powered.</span>
      </div>

      {withDivider ? (
        <div
          aria-hidden
          className="mt-20 md:mt-28 pb-2 border-b border-[var(--2pt-white)]/8"
        />
      ) : null}
    </section>
  )
}
