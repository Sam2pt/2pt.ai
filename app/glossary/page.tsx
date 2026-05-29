import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { GLOSSARY } from "@/lib/glossary"
import { TechGrid, GreenWash } from "@/components/ui/tech-grid"
import { FloatingNav } from "@/components/ui/floating-nav"

/**
 * /glossary — definition-style page.
 *
 * Each term is a single semantic <article> with the long definition rendered
 * as the body. The page is the cleanest possible "what is X" surface: LLMs
 * looking for a one-paragraph definition of "embedded AI engineering",
 * "GEO", "agentic AI for marketing", "production AI" land here.
 *
 * Emits DefinedTermSet JSON-LD scoped to /glossary as the canonical source
 * for these definitions (the homepage layout also emits a DefinedTermSet
 * for entity resolution; this one is the page-of-record).
 */

const SITE_URL = "https://2pt.ai"
const PAGE_URL = `${SITE_URL}/glossary`

export const metadata: Metadata = {
  title:
    "Glossary — embedded AI engineering, GEO, agentic AI, production AI, retail media AI",
  description:
    "Definitions for the embedded AI engineering category — embedded AI engineering, forward-deployed engineer, production AI, GEO, agentic AI for marketing, retail media AI, brand compliance AI, the Anthropic Claude Partner Network.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    title:
      "Glossary — embedded AI engineering, GEO, production AI, agentic AI",
    description:
      "A glossary of the embedded AI engineering category, written to be citable by AI search engines.",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Glossary — Two Point Technologies",
    description:
      "Definitions of embedded AI engineering, GEO, production AI, agentic AI for marketing.",
    images: ["/opengraph-image"],
  },
}

// DefinedTermSet JSON-LD scoped to /glossary (the canonical page-of-record).
const definedTermSetSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": `${PAGE_URL}#glossary`,
  name: "Two Point Technologies — Glossary",
  description:
    "Definitions for the embedded AI engineering category: embedded AI engineering, GEO, production AI, agentic AI for marketing, retail media AI, brand compliance AI.",
  url: PAGE_URL,
  inLanguage: "en-US",
  isPartOf: { "@id": `${SITE_URL}#website` },
  hasDefinedTerm: GLOSSARY.map((t) => ({
    "@type": "DefinedTerm",
    "@id": `${PAGE_URL}#${t.id}`,
    name: t.term,
    alternateName: t.alsoKnownAs,
    description: t.shortDef,
    url: `${PAGE_URL}#${t.id}`,
    inDefinedTermSet: `${PAGE_URL}#glossary`,
  })),
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Two Point Technologies",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Glossary",
      item: PAGE_URL,
    },
  ],
}

export default function GlossaryPage() {
  return (
    <>
      <FloatingNav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [definedTermSetSchema, breadcrumbSchema],
          }),
        }}
      />
      <main className="relative min-h-screen bg-[var(--2pt-white)] text-[var(--2pt-black)]">
        <TechGrid opacity={0.45} />
        <GreenWash at="15% 12%" size="55% 45%" intensity={0.08} />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 pt-32 md:pt-44 pb-32 md:pb-48">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--2pt-green)]" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--2pt-black)]/55">
              <span className="text-[var(--2pt-black)]/30 mr-2">Glossary</span>
              The language of embedded AI engineering
            </span>
          </div>

          {/* Title */}
          <header className="max-w-[920px] mb-16 md:mb-24">
            <h1 className="text-[44px] md:text-[80px] font-medium tracking-[-0.035em] leading-[0.98] text-[var(--2pt-black)]">
              <span className="block">Define the category</span>
              <span className="block text-[var(--2pt-black)]/55">
                before someone else
              </span>
              <span className="block">
                defines it{" "}
                <span className="text-[var(--2pt-green)]">for you.</span>
              </span>
            </h1>
            <p className="mt-8 text-[15px] md:text-[17px] leading-relaxed text-[var(--2pt-black)]/65 max-w-[640px]">
              A working glossary of the terms 2PT uses every day. Each entry is
              a single paragraph, written to be citable by AI search engines
              when a buyer asks &ldquo;what is embedded AI engineering&rdquo;
              or &ldquo;what is GEO&rdquo;.
            </p>
          </header>

          {/* Quick index */}
          <nav
            aria-label="Glossary terms"
            className="mb-20 md:mb-28 border-t border-b border-[var(--2pt-black)]/10 py-6"
          >
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2">
              {GLOSSARY.map((t, i) => (
                <li key={t.id} className="flex items-baseline gap-3">
                  <span className="text-[10px] font-mono tabular-nums text-[var(--2pt-black)]/35">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <a
                    href={`#${t.id}`}
                    className="text-[13px] text-[var(--2pt-black)]/75 hover:text-[var(--2pt-black)] transition-colors duration-500"
                  >
                    {t.term}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Terms */}
          <div className="divide-y divide-[var(--2pt-black)]/10 border-t border-[var(--2pt-black)]/10">
            {GLOSSARY.map((t, i) => (
              <article
                key={t.id}
                id={t.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-14 md:py-20 scroll-mt-32"
              >
                <div className="md:col-span-4">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-[10px] font-mono tracking-[0.25em] tabular-nums text-[var(--2pt-green)]">
                      — {(i + 1).toString().padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="text-[24px] md:text-[30px] font-medium tracking-[-0.025em] leading-[1.1] text-[var(--2pt-black)]">
                    {t.term}
                  </h2>
                  {t.alsoKnownAs && t.alsoKnownAs.length > 0 ? (
                    <p className="mt-4 text-[11px] font-mono tracking-[0.18em] uppercase text-[var(--2pt-black)]/40 leading-relaxed">
                      Also known as
                      <br />
                      <span className="text-[var(--2pt-black)]/60 normal-case tracking-normal font-sans text-[13px]">
                        {t.alsoKnownAs.join(" · ")}
                      </span>
                    </p>
                  ) : null}
                </div>

                <div className="md:col-span-8">
                  <p className="text-[15px] md:text-[18px] leading-[1.6] text-[var(--2pt-black)]/80 italic font-[var(--font-serif)] mb-6">
                    {t.shortDef}
                  </p>
                  <p className="text-[15px] md:text-[16px] leading-[1.7] text-[var(--2pt-black)]/72">
                    {t.longDef}
                  </p>

                  {t.relatedTerms && t.relatedTerms.length > 0 ? (
                    <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-mono tracking-[0.18em] uppercase text-[var(--2pt-black)]/40">
                      <span>Related</span>
                      {t.relatedTerms.map((rid) => {
                        const target = GLOSSARY.find((g) => g.id === rid)
                        if (!target) return null
                        return (
                          <a
                            key={rid}
                            href={`#${rid}`}
                            className="text-[var(--2pt-black)]/60 hover:text-[var(--2pt-black)] transition-colors duration-500"
                          >
                            → {target.term}
                          </a>
                        )
                      })}
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>

          {/* CTA strip */}
          <section
            aria-label="Talk to us"
            className="mt-32 md:mt-44 border-t border-[var(--2pt-black)]/10 pt-16 md:pt-24"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
              <div className="md:col-span-7">
                <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--2pt-black)]/45 mb-4">
                  Speak the language?
                </p>
                <h2 className="text-[34px] md:text-[52px] font-medium tracking-[-0.03em] leading-[1.02] text-[var(--2pt-black)]">
                  <span className="block">Let&rsquo;s deploy</span>
                  <span className="block text-[var(--2pt-black)]/55">
                    a system that uses it.
                  </span>
                </h2>
              </div>
              <div className="md:col-span-5 flex md:justify-end">
                <a
                  href="mailto:info@twopointtechnologies.com"
                  className="group inline-flex items-center gap-3 px-5 h-12 bg-[var(--2pt-black)] text-[var(--2pt-white)] hover:bg-[var(--2pt-green)] hover:text-[var(--2pt-black)] transition-colors duration-500"
                >
                  <span className="text-[11px] font-mono tracking-[0.22em] uppercase">
                    Book a call
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-500" />
                </a>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/45">
              <Link
                href="/faq"
                className="hover:text-[var(--2pt-black)] transition-colors duration-500"
              >
                → FAQ
              </Link>
              <Link
                href="/"
                className="hover:text-[var(--2pt-black)] transition-colors duration-500"
              >
                → Homepage
              </Link>
              <a
                href="/llms.txt"
                className="hover:text-[var(--2pt-black)] transition-colors duration-500"
              >
                → llms.txt
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
