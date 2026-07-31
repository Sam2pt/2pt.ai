import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { CASES, CASES_BY_SLUG } from "@/lib/cases"
import { FloatingNav } from "@/components/ui/floating-nav"
import { CaseSection } from "@/components/work/case-section"
import { CaseStrip } from "@/components/work/case-strip"

/**
 * /work/[slug] — case study page in the tech-runbook layout.
 *
 * Layout:
 *   [ top runbook strip ]   case 02/06 · live · slug · 2026 q2
 *   [ hero, 60/40 split ]   wordmark · title · console lines · tags
 *                              |   signature motion vignette
 *   [ engagement footer ]   "An engagement with X · YYYY · ..."
 *   [ prev / next ]
 *   [ CTA ]
 *
 * Prose Problem/Approach/System bodies stay in the data file so the
 * JSON-LD Article schema still surfaces depth to AI search engines, but
 * the visible page alludes to the work rather than detailing it.
 */

const SITE_URL = "https://2pt.ai"

const ACCENT_TO_COLOR: Record<string, string> = {
  green: "var(--2pt-green)",
  cyan: "#22d3ee",
  lime: "#bef264",
  emerald: "#34d399",
}

const ACCENT_TO_HEX: Record<string, string> = {
  green: "#4ade80",
  cyan: "#22d3ee",
  lime: "#bef264",
  emerald: "#34d399",
}

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const c = CASES_BY_SLUG.get(slug)
  if (!c) return { title: "Work — Two Point Technologies" }
  const url = `${SITE_URL}/work/${c.slug}`
  return {
    title: `${c.client}${c.brand ? " · " + c.brand : ""}. ${c.title}`,
    description: c.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${c.client}${c.brand ? " · " + c.brand : ""}. ${c.title}`,
      description: c.summary,
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${c.client}. ${c.title}`,
      description: c.summary,
      images: ["/opengraph-image"],
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const c = CASES_BY_SLUG.get(slug)
  if (!c) notFound()

  const url = `${SITE_URL}/work/${c.slug}`
  const accent = ACCENT_TO_COLOR[c.accent]
  const accentHex = ACCENT_TO_HEX[c.accent]

  // Prev / next cases for the footer link
  const idx = CASES.findIndex((x) => x.slug === c.slug)
  const prev = idx > 0 ? CASES[idx - 1] : null
  const next = idx < CASES.length - 1 ? CASES[idx + 1] : null

  // JSON-LD still emits the long-form prose for AI search engines.
  const caseSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#case`,
    name: c.title,
    headline: c.title,
    description: c.summary,
    about: { "@type": "Organization", name: c.client },
    creator: { "@id": `${SITE_URL}#organization` },
    publisher: { "@id": `${SITE_URL}#organization` },
    url,
    datePublished: c.year,
    inLanguage: "en-US",
    keywords: [...c.tools, ...c.tags].join(", "),
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: `${c.client}${c.brand ? " · " + c.brand : ""}. ${c.title}`,
    description: c.summary,
    articleBody: [c.problem, c.approach, c.system].join("\n\n"),
    url,
    mainEntityOfPage: url,
    image: `${SITE_URL}/opengraph-image`,
    author: { "@id": `${SITE_URL}#sam-gormley` },
    publisher: { "@id": `${SITE_URL}#organization` },
    inLanguage: "en-US",
    datePublished: c.year,
    articleSection: c.sector,
    keywords: [...c.tools, ...c.tags].join(", "),
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
        item: `${SITE_URL}/work`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: c.client,
        item: url,
      },
    ],
  }

  return (
    <>
      <FloatingNav forceDark />
      <CaseStrip activeSlug={c.slug} asLinks />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [caseSchema, articleSchema, breadcrumb],
          }),
        }}
      />
      <main className="relative min-h-screen bg-[var(--2pt-black)] text-[var(--2pt-white)] overflow-hidden">
        {/* Ambient layers — same vocabulary as the dark hero */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 35%, transparent 70%, rgba(0,0,0,0.4) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1.4px)",
            backgroundSize: "30px 30px",
            opacity: 0.45,
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 25%, #000 30%, transparent 85%)",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 25%, #000 30%, transparent 85%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 55% 45% at 85% 18%, ${accentHex}1F 0%, transparent 60%)`,
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pt-20 md:pt-24 pb-32 md:pb-44">
          <CaseSection
            case={c}
            caseIndex={idx + 1}
            total={CASES.length}
            withDivider={false}
          />


          {/* CTA */}
          <section
            aria-label="Talk to us"
            className="mt-24 md:mt-32 border-t border-[var(--2pt-white)]/10 pt-12 md:pt-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
          >
            <h2 className="md:col-span-7 text-[26px] md:text-[36px] font-medium tracking-[-0.025em] leading-[1.1] text-[var(--2pt-white)]">
              Want a system like this inside your stack?
            </h2>
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
          </section>
        </div>
      </main>
    </>
  )
}
