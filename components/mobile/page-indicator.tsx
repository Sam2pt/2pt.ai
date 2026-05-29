"use client"

/**
 * PageIndicator — right-edge vertical dot stack showing snap position.
 *
 * Dots adapt their color to the active card's tone — they assume a light
 * track (because the masthead/contact/hero cards are dark) and fade for
 * "ahead" cards. The active dot is enlarged + green.
 */

export function PageIndicator({
  total,
  active,
}: {
  total: number
  active: number
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-3 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2"
    >
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === active
        const isPassed = i < active
        return (
          <span
            key={i}
            className="block rounded-full transition-all duration-500 ease-out"
            style={{
              width: isActive ? 4 : 3,
              height: isActive ? 16 : 3,
              backgroundColor: isActive
                ? "var(--2pt-green)"
                : isPassed
                  ? "rgba(255,255,255,0.45)"
                  : "rgba(255,255,255,0.18)",
              boxShadow: isActive
                ? "0 0 8px 1px rgba(74,222,128,0.55)"
                : undefined,
            }}
          />
        )
      })}
    </div>
  )
}
