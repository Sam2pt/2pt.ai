import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { CASES } from "@/lib/cases"
import { FloatingNav } from "@/components/ui/floating-nav"
import { CaseStrip } from "@/components/work/case-strip"
import { CaseSection } from "@/components/work/case-section"

/**
 * /work — long-scroll magazine.
 *
 * Every enabled case stacks as a self-contained chapter. The CaseStrip
 * sticky at the top doubles as a channel selector: clicking a pill
 * smooth-scrolls into that case's section and the URL hash updates via
 * IntersectionObserver as the user scrolls.
 *
 * Per-case URLs (/work/[slug]) still exist as canonical entries for
 * sharing and SEO — they render the same CaseSection in isolation.
 */

const SITE_URL = "https://2pt.ai"
const PAGE_URL = `${SITE_URL}/work`

export const metadata: Metadata = {
  title:
    "Work — embedded AI engineering inside Yamaha, Mars, Harken, Clifford Chance",
  description:
    "Selected case studies from Two Point Technologies. Production AI deployed inside enterprise marketing teams across Yamaha GEO, Mars Dreamies, Harken retail media, and Clifford Chance video production.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    title: "Work — Two Point Technologies",
    description:
      "Production AI deployed inside enterprise marketing teams. Selected case studies.",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Work — Two Point Technologies",
    description:
      "Production AI deployed inside enterprise marketing teams.",
    images: ["/opengraph-image"],
  },
}

const collection = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${PAGE_URL}#collection`,
  url: PAGE_URL,
  name: "Two Point Technologies — Selected Work",
  description:
    "Case studies of production AI systems deployed by Two Point Technologies inside enterprise marketing functions.",
  isPartOf: { "@id": `${SITE_URL}#website` },
  hasPart: CASES.map((c) => ({
    "@type": "CreativeWork",
    "@id": `${SITE_URL}/work/${c.slug}#case`,
    name: c.title,
    about: c.client,
    url: `${SITE_URL}/work/${c.slug}`,
    datePublished: c.year,
  })),
}

const breadcrumb = {
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
      name: "Work",
      item: PAGE_URL,
    },
  ],
}

export default function WorkIndexPage() {
  return (
    <>
      <FloatingNav forceDark />
      <CaseStrip />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [collection, breadcrumb],
          }),
        }}
      />
      <main className="relative min-h-screen bg-[var(--2pt-black)] text-[var(--2pt-white)] overflow-hidden">
        {/* Ambient layers — set once at the page level so the magazine
            feels like one continuous canvas as you scroll between cases. */}
        <div
          aria-hidden
          className="fixed inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.025) 0%, transparent 35%, transparent 70%, rgba(0,0,0,0.4) 100%)",
          }}
        />
        <div
          aria-hidden
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1.4px)",
            backgroundSize: "30px 30px",
            opacity: 0.4,
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 30%, #000 30%, transparent 88%)",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 30%, #000 30%, transparent 88%)",
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pt-12 md:pt-16 pb-32 md:pb-44">
          {/* Editorial intro — quick set-up, no big hero. The first case
              starts almost immediately so the reel can breathe. */}
          <header className="mb-2 md:mb-4">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--2pt-green)]" />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--2pt-white)]/55">
                <span className="text-[var(--2pt-white)]/30 mr-2">IV.</span>
                Selected work · {CASES.length.toString().padStart(2, "0")} engagements live
              </span>
            </div>
            <p className="sr-only">
              <span>
                Long-scroll catalogue of Two Point Technologies case studies.
              </span>
            </p>
          </header>

          {/* The magazine — every case stacks as a full chapter. The last
              one drops its bottom divider since the CTA follows. */}
          {CASES.map((c, i) => (
            <CaseSection
              key={c.slug}
              case={c}
              caseIndex={i + 1}
              total={CASES.length}
              withDivider={i < CASES.length - 1}
            />
          ))}

          {/* Final CTA — closes the reel */}
          <section
            aria-label="Talk to us"
            className="mt-24 md:mt-32 border-t border-[var(--2pt-white)]/12 pt-16 md:pt-24"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
              <div className="md:col-span-7">
                <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--2pt-white)]/45 mb-4">
                  See yours here next?
                </p>
                <h2 className="text-[34px] md:text-[52px] font-medium tracking-[-0.03em] leading-[1.02] text-[var(--2pt-white)]">
                  <span className="block">Bring us the problem.</span>
                  <span className="block text-[var(--2pt-white)]/55">
                    We&rsquo;ll bring the system.
                  </span>
                </h2>
              </div>
              <div className="md:col-span-5 flex md:justify-end">
                <a
                  href="mailto:info@twopointtechnologies.com"
                  className="group inline-flex items-center gap-3 px-5 h-12 bg-[var(--2pt-white)] text-[var(--2pt-black)] hover:bg-[var(--2pt-green)] transition-colors duration-500"
                >
                  <span className="text-[11px] font-mono tracking-[0.22em] uppercase">
                    Get in touch
                  </span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" />
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
