"use client"

/**
 * ContactMobile — stripped contact section for mobile.
 *
 * Light conversion block on top with headline + body + email CTA.
 * Dark colophon at the bottom: static counters (no animated orb), a clean
 * single-column stack of locations / contact / partnership, and the
 * "Always deploying" footer line. No oversized wordmark.
 */

import { ArrowRight, ArrowUpRight } from "lucide-react"

export function ContactMobile() {
  return (
    <section id="contact" className="relative">
      {/* CONVERSION — light hook at the top */}
      <div className="relative bg-[var(--2pt-white)] text-[var(--2pt-black)] px-5 py-16 border-t border-[var(--2pt-black)]/8">
        <div className="flex items-center gap-2 mb-8">
          <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-pulse" />
          <span className="text-[10px] tracking-[0.3em] text-[var(--2pt-black)]/50 font-mono uppercase">
            <span className="text-[var(--2pt-black)]/30 mr-2">III.</span>Deploy with us
          </span>
        </div>

        <h2 className="text-[32px] font-medium tracking-[-0.025em] leading-[1.05] mb-8">
          <span className="block text-[var(--2pt-black)]">See what your future</span>
          <span className="block text-[var(--2pt-black)]/55">marketing function looks like.</span>
        </h2>

        <p className="text-[15px] text-[var(--2pt-black)]/65 leading-relaxed mb-8">
          We modernize the marketing function for the AI decade. Embedded engineers,
          deployed systems, owned by you.{" "}
          <span className="text-[var(--2pt-black)]">
            Book a call. We&rsquo;ll show you what&rsquo;s already running for teams like
            yours.
          </span>
        </p>

        <a
          href="mailto:info@twopointtechnologies.com"
          className="inline-flex items-center gap-2.5 text-[12px] font-mono tracking-[0.12em] uppercase text-[var(--2pt-black)] break-all"
        >
          <span className="border-b border-[var(--2pt-black)] pb-1">
            info@twopointtechnologies.com
          </span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0" />
        </a>
      </div>

      {/* MASTHEAD — dark closer. Single column on mobile; no oversized wordmark. */}
      <div className="relative bg-[var(--2pt-black)] text-[var(--2pt-white)]">
        <div className="px-5 py-12">
          {/* Header label */}
          <div className="flex items-center justify-between mb-12 pb-6 border-b border-[var(--2pt-white)]/10">
            <span className="text-[10px] tracking-[0.3em] text-[var(--2pt-white)]/45 font-mono uppercase">
              Two Point Tech · Ed. 001
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-pulse" />
              <span className="text-[10px] tracking-[0.25em] text-[var(--2pt-white)]/45 font-mono uppercase">
                Live
              </span>
            </span>
          </div>

          {/* Stats — 3 across, smaller numbers than desktop */}
          <div className="grid grid-cols-3 gap-px bg-[var(--2pt-white)]/10 border-y border-[var(--2pt-white)]/10 mb-12">
            <div className="bg-[var(--2pt-black)] py-5 px-3">
              <div className="text-[8px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-white)]/45 mb-2 leading-tight">
                Systems running
              </div>
              <div className="text-2xl font-medium text-[var(--2pt-white)] tabular-nums">
                47
              </div>
            </div>
            <div className="bg-[var(--2pt-black)] py-5 px-3">
              <div className="text-[8px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-white)]/45 mb-2 leading-tight">
                Years operating
              </div>
              <div className="text-2xl font-medium text-[var(--2pt-white)] tabular-nums">
                {new Date().getFullYear() - 2017}
              </div>
            </div>
            <div className="bg-[var(--2pt-black)] py-5 px-3">
              <div className="text-[8px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-white)]/45 mb-2 leading-tight">
                Cities deployed
              </div>
              <div className="text-2xl font-medium text-[var(--2pt-white)] tabular-nums">
                02
              </div>
            </div>
          </div>

          {/* Colophon — single-column stack on mobile */}
          <div className="flex flex-col gap-8 pb-10 border-b border-[var(--2pt-white)]/10">
            <div>
              <div className="text-[10px] tracking-[0.3em] text-[var(--2pt-green)] font-mono uppercase mb-3">
                New York
              </div>
              <div className="text-[14px] text-[var(--2pt-white)] leading-relaxed">447 Broadway</div>
              <div className="text-[12px] text-[var(--2pt-white)]/55 leading-relaxed">NY 10013</div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.3em] text-[var(--2pt-green)] font-mono uppercase mb-3">
                London
              </div>
              <div className="text-[14px] text-[var(--2pt-white)] leading-relaxed">45 Fitzroy Street</div>
              <div className="text-[12px] text-[var(--2pt-white)]/55 leading-relaxed">Fitzrovia W1D 3BW</div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.3em] text-[var(--2pt-green)] font-mono uppercase mb-3">
                Contact
              </div>
              <a
                href="mailto:info@twopointtechnologies.com"
                className="block text-[14px] text-[var(--2pt-white)] break-all leading-relaxed"
              >
                info@twopointtechnologies.com
              </a>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.3em] text-[var(--2pt-green)] font-mono uppercase mb-3">
                Partnership
              </div>
              <a
                href="https://www.anthropic.com/partners"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[14px] text-[var(--2pt-white)]"
              >
                Anthropic
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <div className="text-[12px] text-[var(--2pt-white)]/55 leading-relaxed">
                Claude Partner Network
              </div>
            </div>
          </div>

          {/* Footer strip */}
          <div className="pt-6 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-lg font-semibold italic text-[var(--2pt-white)] tracking-tight">
                2pt
              </span>
              <span className="text-[9px] tracking-[0.22em] text-[var(--2pt-white)]/40 font-mono uppercase">
                &copy; {new Date().getFullYear()} Two Point Technologies
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-pulse" />
              <span className="text-[9px] tracking-[0.25em] text-[var(--2pt-white)]/45 font-mono uppercase">
                Founded 2017 · Always deploying
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
