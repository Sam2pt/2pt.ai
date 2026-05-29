"use client"

/**
 * FooterCard — minimal closing card. Wordmark, address colophon, copyright,
 * "always deploying" footer line. Black canvas to match the contact card.
 */

import { ArrowUpRight } from "lucide-react"

export function FooterCard({ index }: { index: number }) {
  return (
    <section
      data-card-index={index}
      className="relative h-[100dvh] w-full snap-start overflow-hidden bg-[var(--2pt-black)] text-[var(--2pt-white)] flex flex-col"
    >
      {/* Top — masthead label */}
      <div className="pt-16 px-6 flex items-center justify-between text-[10px] font-mono tracking-[0.28em] uppercase text-[var(--2pt-white)]/45">
        <span>Two Point Tech · Ed. 001</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-pulse" />
          <span>Live</span>
        </span>
      </div>

      {/* Centered wordmark */}
      <div className="flex-1 flex flex-col justify-center px-6">
        <h3 className="text-[52px] font-bold tracking-[-0.055em] leading-[0.88] text-[var(--2pt-white)] mb-10">
          Two Point
          <br />
          Technologies
          <span className="text-[var(--2pt-green)]">.</span>
        </h3>

        {/* Colophon — 2 column */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-6">
          <div>
            <div className="text-[10px] tracking-[0.28em] uppercase font-mono text-[var(--2pt-green)] mb-2">
              New York
            </div>
            <div className="text-[14px] text-[var(--2pt-white)] leading-snug">
              447 Broadway
            </div>
            <div className="text-[11px] text-[var(--2pt-white)]/55 leading-snug">
              NY 10013
            </div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.28em] uppercase font-mono text-[var(--2pt-green)] mb-2">
              London
            </div>
            <div className="text-[14px] text-[var(--2pt-white)] leading-snug">
              45 Fitzroy Street
            </div>
            <div className="text-[11px] text-[var(--2pt-white)]/55 leading-snug">
              Fitzrovia W1D 3BW
            </div>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.28em] uppercase font-mono text-[var(--2pt-green)] mb-2">
              Contact
            </div>
            <a
              href="mailto:info@twopointtechnologies.com"
              className="text-[13px] text-[var(--2pt-white)] break-all leading-snug"
            >
              info@twopointtechnologies.com
            </a>
          </div>
          <div>
            <div className="text-[10px] tracking-[0.28em] uppercase font-mono text-[var(--2pt-green)] mb-2">
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
            <div className="text-[11px] text-[var(--2pt-white)]/55 leading-snug">
              Claude Partner Network
            </div>
          </div>
        </div>
      </div>

      {/* Reference links */}
      <nav
        aria-label="Reference"
        className="px-6 pt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-mono tracking-[0.28em] uppercase text-[var(--2pt-white)]/45"
      >
        <a href="/faq" className="hover:text-[var(--2pt-green)]">
          FAQ
        </a>
        <a href="/glossary" className="hover:text-[var(--2pt-green)]">
          Glossary
        </a>
        <a href="/llms.txt" className="hover:text-[var(--2pt-green)]">
          llms.txt
        </a>
      </nav>

      {/* Bottom footer line */}
      <div className="pb-12 px-6 flex flex-col gap-2 border-t border-[var(--2pt-white)]/10 pt-5 mt-3">
        <div className="flex items-center gap-3">
          <span className="text-base italic font-semibold text-[var(--2pt-white)] tracking-tight">
            2pt
          </span>
          <span className="text-[9px] font-mono tracking-[0.22em] uppercase text-[var(--2pt-white)]/40">
            &copy; {new Date().getFullYear()} Two Point Technologies
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full animate-pulse" />
          <span className="text-[9px] font-mono tracking-[0.28em] uppercase text-[var(--2pt-white)]/55">
            Founded 2017 · Always deploying
          </span>
        </div>
      </div>
    </section>
  )
}
