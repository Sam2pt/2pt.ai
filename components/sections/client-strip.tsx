"use client"

/**
 * ClientStrip — typographic dark band of client names.
 *
 * A black band that matches the masthead at the bottom of the page so the
 * brand identity stays consistent top-to-bottom. No logo images — every
 * brand rendered in uppercase tabular mono typography. White-on-black,
 * slow marquee, soft black fades on either side.
 *
 * Reads as "deployed inside these names" without ever fighting a logo
 * background. Bulletproof, distinctive, editorial.
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

// Duplicate the list once so the marquee loops seamlessly (the keyframe
// translates by -50%).
const ROW = [...CLIENTS, ...CLIENTS]

export function ClientStrip() {
  return (
    <section
      aria-label="Clients"
      className="relative bg-[var(--2pt-black)] text-[var(--2pt-white)] overflow-hidden"
    >
      {/* Top hairline accent — green fade-in-fade-out, ties the band to the
          rest of the brand chrome */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(74,222,128,0.45), transparent)",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-8 md:px-12 py-6 md:py-7 flex items-center gap-8 md:gap-12">
        {/* Left credential label */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="relative inline-flex">
            <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full" />
            <span className="absolute inset-0 w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-ping opacity-60" />
          </span>
          <span className="text-[10px] tracking-[0.3em] text-[var(--2pt-white)]/65 font-mono uppercase whitespace-nowrap">
            Deployed inside
          </span>
        </div>

        {/* Marquee — wide soft fades to the band's own black so names enter
            and exit cleanly */}
        <div className="relative flex-1 overflow-hidden animate-marquee-pause">
          <div
            className="pointer-events-none absolute top-0 bottom-0 left-0 w-24 md:w-40 z-10"
            style={{
              background:
                "linear-gradient(to right, var(--2pt-black) 0%, var(--2pt-black) 25%, transparent 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute top-0 bottom-0 right-0 w-24 md:w-40 z-10"
            style={{
              background:
                "linear-gradient(to left, var(--2pt-black) 0%, var(--2pt-black) 25%, transparent 100%)",
            }}
          />

          <ul className="flex items-center gap-x-10 md:gap-x-16 animate-marquee w-max list-none">
            {ROW.map((name, i) => (
              <li
                key={`${name}-${i}`}
                className="text-[13px] md:text-[15px] font-mono tracking-[0.22em] uppercase text-[var(--2pt-white)]/85 hover:text-[var(--2pt-green)] transition-colors duration-500 whitespace-nowrap tabular-nums"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
