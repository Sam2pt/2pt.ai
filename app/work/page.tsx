import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { CASES } from "@/lib/cases"
import { FloatingNav } from "@/components/ui/floating-nav"
import { LumenCase } from "@/components/work/lumen-case"

/**
 * /work — single deep case study.
 *
 * The portfolio currently shows one live piece: the NY venture firm's
 * customer-intelligence rollout. Other engagements sit soft-deleted in
 * lib/cases.ts (enabled: false) awaiting client permission. When more
 * come back on, this page needs to route between them again.
 */

const SITE_URL = "https://2pt.ai"
const PAGE_URL = `${SITE_URL}/work`
const LUMEN_SLUG = "vc-portfolio-customer-intelligence"

export const metadata: Metadata = {
  title:
    "Work — one customer brain, seven faces · Two Point Technologies",
  description:
    "Selected case study: a shared customer-intelligence engine deployed across a New York venture firm's D2C portfolio in eight weeks. Per-brand skins, per-role framings, cross-brand suggestions.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    title: "Work — Two Point Technologies",
    description:
      "Production AI deployed inside enterprise marketing teams.",
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

const lumen = CASES.find((c) => c.slug === LUMEN_SLUG)

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
    { "@type": "ListItem", position: 1, name: "Two Point Technologies", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Work", item: PAGE_URL },
  ],
}

const articleSchema = lumen
  ? {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${PAGE_URL}#article`,
      headline: `${lumen.client}. ${lumen.title}`,
      description: lumen.summary,
      articleBody: [lumen.problem, lumen.approach, lumen.system].join("\n\n"),
      url: PAGE_URL,
      mainEntityOfPage: PAGE_URL,
      image: `${SITE_URL}/opengraph-image`,
      author: { "@id": `${SITE_URL}#sam-gormley` },
      publisher: { "@id": `${SITE_URL}#organization` },
      inLanguage: "en-US",
      datePublished: lumen.year,
      articleSection: lumen.sector,
      keywords: [...lumen.tools, ...lumen.tags].join(", "),
    }
  : null

export default function WorkIndexPage() {
  if (!lumen) return null
  return (
    <>
      <FloatingNav forceDark />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [collection, breadcrumb, articleSchema].filter(Boolean),
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
        <div
          aria-hidden
          className="fixed inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 85% 18%, rgba(34,211,238,0.10) 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 pt-6 md:pt-10 pb-24 md:pb-32">
          <LumenCase
            c={{
              slug: lumen.slug,
              client: lumen.client,
              sector: lumen.sector,
              year: lumen.year,
              title: lumen.title,
            }}
          />

          {/* Final CTA */}
          <section
            aria-label="Talk to us"
            className="mt-24 md:mt-32 border-t border-white/12 pt-16 md:pt-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
              <div className="md:col-span-7">
                <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/45 mb-4">
                  Portfolio you want a brain across?
                </p>
                <h2 className="text-[30px] md:text-[46px] font-medium tracking-[-0.03em] leading-[1.05] text-white">
                  <span className="block">Bring us the problem.</span>
                  <span className="block text-white/55">
                    We&rsquo;ll bring the system.
                  </span>
                </h2>
              </div>
              <div className="md:col-span-5 flex md:justify-end">
                <a
                  href="mailto:info@twopointtechnologies.com"
                  className="group inline-flex items-center gap-3 px-5 h-12 bg-white text-black hover:bg-[var(--2pt-green)] transition-colors duration-500"
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
