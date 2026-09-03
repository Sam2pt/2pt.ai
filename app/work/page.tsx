import type { Metadata } from "next"
import Link from "next/link"
import { CASES } from "@/lib/cases"
import { FloatingNav } from "@/components/ui/floating-nav"
import { ContactCTA } from "@/components/ui/contact-cta"
import { LumenCase } from "@/components/work/lumen-case"
import { YamahaCase } from "@/components/work/yamaha-case"
import { WorkCasePicker } from "@/components/work/work-case-picker"

/**
 * /work — long-scroll case-study magazine.
 *
 * Every enabled case renders as a full spread with its own beat nav
 * that sticky-hands-off as the reader scrolls between cases. Add a
 * case by dropping its component under the previous one and wrapping
 * it in its own <section> so sticky positioning stays scoped.
 */

const SITE_URL = "https://2pt.ai"
const PAGE_URL = `${SITE_URL}/work`
const LUMEN_SLUG = "vc-portfolio-customer-intelligence"
const YAMAHA_SLUG = "yamaha-global-geo"

export const metadata: Metadata = {
  title:
    "Work · one brain, seven brands + search and AI discovery · Two Point Technologies",
  description:
    "Selected case studies: a shared customer brain across a New York venture firm's D2C portfolio, and search plus AI discovery for Yamaha's global online music school.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    title: "Work · Two Point Technologies",
    description:
      "Production AI deployed inside enterprise marketing teams.",
    images: ["/opengraph-image"],
  },
}

const lumen = CASES.find((c) => c.slug === LUMEN_SLUG)
const yamaha = CASES.find((c) => c.slug === YAMAHA_SLUG)

const collection = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${PAGE_URL}#collection`,
  url: PAGE_URL,
  name: "Two Point Technologies · Selected Work",
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
    { "@type": "ListItem", position: 1, name: "Two Point Technologies", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Work", item: PAGE_URL },
  ],
}

function articleFor(
  c: NonNullable<typeof lumen>,
  anchor: string,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${PAGE_URL}#${anchor}`,
    headline: `${c.client}${c.brand ? " · " + c.brand : ""}. ${c.title}`,
    description: c.summary,
    articleBody: [c.problem, c.approach, c.system].join("\n\n"),
    url: `${PAGE_URL}#${anchor}`,
    mainEntityOfPage: PAGE_URL,
    image: `${SITE_URL}/opengraph-image`,
    author: { "@id": `${SITE_URL}#sam-gormley` },
    publisher: { "@id": `${SITE_URL}#organization` },
    inLanguage: "en-US",
    datePublished: c.year,
    articleSection: c.sector,
    keywords: [...c.tools, ...c.tags].join(", "),
  }
}

export default function WorkIndexPage() {
  if (!lumen) return null
  const articles = [
    articleFor(lumen, "article-lumen"),
    yamaha ? articleFor(yamaha, "article-yamaha") : null,
  ].filter(Boolean)

  return (
    <>
      <FloatingNav forceDark />

      {/* Scroll-driven progress rail. Fills as the reader moves through
          the whole magazine. Uses modern animation-timeline: scroll(). */}
      <div
        aria-hidden
        className="fixed top-12 left-0 right-0 z-40 h-[2px] bg-[var(--2pt-white)]/6"
      >
        <div
          className="scroll-progress h-full origin-left"
          style={{
            background:
              "linear-gradient(90deg, transparent, #22d3ee 30%, #a78bfa 70%, transparent)",
          }}
        />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [collection, breadcrumb, ...articles],
          }),
        }}
      />

      <main className="relative min-h-screen bg-[var(--2pt-black)] text-[var(--2pt-white)] [overflow-x:clip]">
        {/* Ambient layers */}
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
              "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1.4px)",
            backgroundSize: "30px 30px",
            opacity: 0.4,
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 30%, #000 30%, transparent 88%)",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 30%, #000 30%, transparent 88%)",
          }}
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 pt-20 md:pt-24 pb-24 md:pb-32">
          <WorkCasePicker />

          {/* Case 01 — Lumen. No section-level wash: accent identity is
              carried by the beat-pill nav and the cyan metric numerals. */}
          <section
            aria-labelledby="case-lumen-title"
            id="case-lumen"
            className="relative"
          >
            <span id="case-lumen-title" className="sr-only">
              Case 01. {lumen.client}. {lumen.title}
            </span>
            <LumenCase
              c={{
                slug: lumen.slug,
                client: lumen.client,
                sector: lumen.sector,
                year: lumen.year,
                title: lumen.title,
              }}
            />
          </section>

          {/* Case-to-case transition — kept tight so the sticky beat-nav
              from Case 01 finishes handing off before Case 02's begins. */}
          {yamaha ? (
            <div className="relative mt-8 md:mt-12 mb-4 md:mb-6 flex items-center gap-4">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#a78bfa" }}
              />
              <span className="text-[10px] font-mono tracking-[0.32em] uppercase text-white/55">
                Case 02 · next
              </span>
              <span className="flex-1 h-px bg-white/10" />
              <span className="text-[10px] font-mono tracking-[0.28em] uppercase text-white/40">
                {yamaha.client} · {yamaha.brand ?? ""}
              </span>
            </div>
          ) : null}

          {/* Case 02 — Yamaha. Same treatment as Case 01. */}
          {yamaha ? (
            <section
              aria-labelledby="case-yamaha-title"
              id="case-yamaha"
              className="relative"
            >
              <span id="case-yamaha-title" className="sr-only">
                Case 02. {yamaha.client}. {yamaha.title}
              </span>
              <YamahaCase
                c={{
                  slug: yamaha.slug,
                  client: yamaha.client,
                  brand: yamaha.brand,
                  sector: yamaha.sector,
                  year: yamaha.year,
                  title: yamaha.title,
                }}
              />
            </section>
          ) : null}

          {/* Final CTA */}
          <section
            aria-label="Talk to us"
            className="mt-24 md:mt-32 border-t border-white/12 pt-16 md:pt-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
              <div className="md:col-span-7">
                <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/45 mb-4">
                  Want work like this on your stack?
                </p>
                <h2 className="text-[30px] md:text-[46px] font-semibold tracking-[-0.025em] leading-[1.08] text-white">
                  <span className="block">Bring us the problem.</span>
                  <span className="block text-white/55">
                    We&rsquo;ll bring the system.
                  </span>
                </h2>
              </div>
              <div className="md:col-span-5 flex md:justify-end">
                <ContactCTA variant="light">Get in touch</ContactCTA>
              </div>
            </div>
          </section>

          {/* Colophon */}
          <footer className="mt-16 md:mt-20 pt-6 border-t border-white/8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] font-mono tracking-[0.22em] uppercase text-white/45">
                <Link
                  href="/"
                  className="hover:text-white transition-colors duration-300"
                >
                  → Home
                </Link>
                <Link
                  href="/#what-we-solve"
                  className="hover:text-white transition-colors duration-300"
                >
                  → What we solve
                </Link>
                <Link
                  href="/faq"
                  className="hover:text-white transition-colors duration-300"
                >
                  → FAQ
                </Link>
                <Link
                  href="/glossary"
                  className="hover:text-white transition-colors duration-300"
                >
                  → Glossary
                </Link>
                <a
                  href="mailto:info@twopointtechnologies.com"
                  className="hover:text-white transition-colors duration-300"
                >
                  → info@twopointtechnologies.com
                </a>
              </div>
              <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30">
                Two Point Technologies · MMXXVI
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  )
}
