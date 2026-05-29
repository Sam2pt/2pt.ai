"use client"

/**
 * DeployStagesCard — static vertical list of the 4-stage engagement model.
 *
 * Diagnose → Build → Deploy → Transfer. All four rendered at once, all body
 * copy on screen, no auto-cycle, no pulsing play head. The vertical rail is
 * a single absolute element anchored to the column of dot centres so the
 * line and the dots can't drift out of alignment.
 *
 * Replaces the previous animated version that auto-played slowly and had a
 * dynamic rail-height calculation that visually mismatched the dot column.
 */

const STAGES = [
  {
    index: "01",
    name: "Diagnose",
    discipline: "Strategy & diagnostics",
    body:
      "We map the marketing function. Where systems break, where AI lands.",
  },
  {
    index: "02",
    name: "Build",
    discipline: "Custom deployment",
    body:
      "Embedded engineers build the system inside your stack. Production from day one.",
  },
  {
    index: "03",
    name: "Deploy",
    discipline: "Enterprise integration",
    body:
      "Wired into retail media, CRM, brand and creative workflows.",
  },
  {
    index: "04",
    name: "Transfer",
    discipline: "Adoption & transfer",
    body: "Your team takes ownership. We document, train, hand off.",
  },
]

export function DeployStagesCard({ index }: { index: number }) {
  return (
    <section
      data-card-index={index}
      className="relative h-[100dvh] w-full snap-start overflow-hidden bg-[var(--2pt-white)] text-[var(--2pt-black)] flex flex-col"
    >
      {/* Soft green wash, top-right anchor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 90% 15%, rgba(74,222,128,0.10) 0%, transparent 65%)",
        }}
      />

      {/* Top eyebrow */}
      <div className="relative z-10 pt-14 px-6 flex items-center gap-2.5">
        <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full" />
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--2pt-black)]/55">
          <span className="text-[var(--2pt-black)]/30 mr-2">II.</span>How we deploy
        </span>
      </div>

      {/* Intro */}
      <div className="relative z-10 px-6 mt-5">
        <h2 className="text-[24px] font-bold tracking-[-0.03em] leading-[1.05] text-[var(--2pt-black)]">
          Every engagement runs through the same four stages.
        </h2>
      </div>

      {/*
        Stage list.

        The rail is a single absolutely-positioned line that sits at the
        same x-coordinate as the dot centres. Because the dots live in a
        w-4 (1rem) flex column at the start of each row, their centres are
        at left = 0.5rem from the list's left edge. The rail uses the same
        offset, so the two can't drift apart as the viewport changes height.
      */}
      <div className="relative z-10 flex-1 min-h-0 px-6 mt-6 pb-10">
        <div className="relative h-full">
          {/* Rail — base hairline */}
          <div
            aria-hidden
            className="absolute left-[0.5rem] top-3 bottom-3 w-px bg-[var(--2pt-black)]/15"
          />
          {/* Rail — green accent on top, fades toward the bottom */}
          <div
            aria-hidden
            className="absolute left-[0.5rem] top-3 w-px h-[calc(100%-1.5rem)] bg-gradient-to-b from-[var(--2pt-green)] via-[var(--2pt-green)]/40 to-transparent opacity-70"
          />

          <ol className="relative h-full flex flex-col justify-between">
            {STAGES.map((s) => (
              <li key={s.index} className="relative flex items-start gap-4">
                {/* Dot — w-4 column. The 9px dot is centred inside the 1rem
                    column, so its centre sits at 0.5rem from the list edge
                    — exactly where the rail is drawn. */}
                <span className="relative shrink-0 w-4 h-4 mt-1 flex items-center justify-center">
                  <span
                    className="block w-[9px] h-[9px] rounded-full bg-[var(--2pt-green)]"
                    style={{
                      boxShadow: "0 0 0 3px var(--2pt-white)",
                    }}
                  />
                </span>

                {/* Stage text */}
                <div className="flex-1 min-w-0 pb-1">
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span className="text-[10px] font-mono tracking-[0.25em] tabular-nums text-[var(--2pt-green)]">
                      — {s.index}
                    </span>
                  </div>
                  <div className="text-[20px] font-bold tracking-[-0.025em] leading-[1.05] text-[var(--2pt-black)]">
                    {s.name}
                  </div>
                  <div className="text-[11px] italic mt-0.5 text-[var(--2pt-black)]/55">
                    {s.discipline}
                  </div>
                  <p className="text-[12.5px] text-[var(--2pt-black)]/70 leading-[1.45] mt-1.5 max-w-[30ch]">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Bottom — engagement model footer */}
      <div className="relative z-10 pb-10 px-6 flex items-center justify-between text-[10px] font-mono tracking-[0.28em] uppercase text-[var(--2pt-black)]/45 border-t border-[var(--2pt-black)]/8 pt-4">
        <span>Engagement model</span>
        <span className="text-[var(--2pt-green)] tabular-nums">
          {STAGES.length.toString().padStart(2, "0")} stages
        </span>
      </div>
    </section>
  )
}
