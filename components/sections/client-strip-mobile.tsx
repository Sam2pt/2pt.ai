"use client"

/**
 * ClientStripMobile — typographic dark band of client names, static.
 *
 * Matches the desktop ClientStrip's dark editorial treatment but laid out
 * as a 3-column grid (no marquee on mobile). No logo images, no background
 * compositing — just clean typographic credibility.
 */

const CLIENTS = [
  "Mars",
  "Yamaha",
  "Walmart",
  "Marriott",
  "NCR",
  "Pedigree",
  "Cesar",
  "Sprouts",
  "Instacart",
]

export function ClientStripMobile() {
  return (
    <section
      aria-label="Clients"
      className="relative bg-[var(--2pt-black)] text-[var(--2pt-white)]"
    >
      {/* Top hairline accent — green fade-in-fade-out */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(74,222,128,0.45), transparent)",
        }}
      />

      <div className="px-5 py-7">
        <div className="flex items-center gap-2 mb-5">
          <span className="relative inline-flex">
            <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full" />
            <span className="absolute inset-0 w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-ping opacity-60" />
          </span>
          <span className="text-[10px] tracking-[0.3em] text-[var(--2pt-white)]/65 font-mono uppercase">
            Deployed inside
          </span>
        </div>

        <ul className="grid grid-cols-3 gap-x-3 gap-y-3 list-none">
          {CLIENTS.map((name) => (
            <li
              key={name}
              className="text-[11px] font-mono tracking-[0.18em] uppercase text-[var(--2pt-white)]/85 leading-tight"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
