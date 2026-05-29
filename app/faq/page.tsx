import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { FAQ, FAQ_CATEGORIES, type FAQItem } from "@/lib/faq"
import { TechGrid, GreenWash } from "@/components/ui/tech-grid"
import { FloatingNav } from "@/components/ui/floating-nav"

/**
 * /faq — long-form, server-rendered Q&A surface.
 *
 * Built for two distinct readers:
 *  1. A human buyer scanning the page in five seconds.
 *  2. A generative-AI search engine (ChatGPT, Claude, Perplexity, Gemini,
 *     Google AI Overviews) selecting one paragraph to cite.
 *
 * The page emits a FAQPage JSON-LD block scoped to /faq (the layout-level
 * block lives at the homepage; this one is canonical for /faq itself and
 * lets crawlers attribute Q&A rich-results to the correct URL).
 *
 * Copy is intentionally short and citable. Each <dd> stands on its own as
 * a 40–130-word answer to a single discovery query.
 */

const SITE_URL = "https://2pt.ai"
const PAGE_URL = `${SITE_URL}/faq`

export const metadata: Metadata = {
  title:
    "FAQ — embedded AI engineering for marketing, retail media, GEO, agentic AI",
  description:
    "Answers to the questions enterprise marketing teams ask when evaluating embedded AI engineering, production AI deployment, agentic AI for marketing, retail media AI and the Anthropic Claude Partner Network.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "article",
    url: PAGE_URL,
    title:
      "FAQ — embedded AI engineering, agentic AI for marketing, retail media AI",
    description:
      "Plain-English answers on how 2PT deploys production AI inside enterprise marketing functions, what it costs, how long it takes, and who owns the IP.",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ — Two Point Technologies",
    description:
      "Plain-English answers on embedded AI engineering for marketing.",
    images: ["/opengraph-image"],
  },
}

// FAQPage JSON-LD scoped to /faq itself.
const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${PAGE_URL}#faq`,
  url: PAGE_URL,
  inLanguage: "en-US",
  isPartOf: { "@id": `${SITE_URL}#website` },
  about: { "@id": `${SITE_URL}#organization` },
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    "@id": `${PAGE_URL}#${f.id}`,
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
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
      name: "FAQ",
      item: PAGE_URL,
    },
  ],
}

// Group FAQ items by category, preserving the order declared in FAQ_CATEGORIES
// (which doubles as the visual section order on the page).
function groupByCategory(items: FAQItem[]) {
  const seenCategoryLabels = new Set<string>()
  const sections: { label: string; items: FAQItem[] }[] = []
  for (const cat of FAQ_CATEGORIES) {
    if (seenCategoryLabels.has(cat.label)) continue
    seenCategoryLabels.add(cat.label)
    // Collect every FAQItem whose category maps to this label (handles the
    // platform+capability dual-mapping in FAQ_CATEGORIES).
    const categoriesForLabel = FAQ_CATEGORIES.filter((c) => c.label === cat.label).map(
      (c) => c.id,
    )
    const grouped = items.filter((i) => categoriesForLabel.includes(i.category))
    if (grouped.length > 0) sections.push({ label: cat.label, items: grouped })
  }
  return sections
}

export default function FAQPage() {
  const sections = groupByCategory(FAQ)

  return (
    <>
      <FloatingNav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [faqPageSchema, breadcrumbSchema],
          }),
        }}
      />
      <main className="relative min-h-screen bg-[var(--2pt-white)] text-[var(--2pt-black)]">
        <TechGrid opacity={0.45} />
        <GreenWash at="85% 12%" size="55% 45%" intensity={0.08} />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 pt-32 md:pt-44 pb-32 md:pb-48">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--2pt-green)]" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--2pt-black)]/55">
              <span className="text-[var(--2pt-black)]/30 mr-2">FAQ</span>
              Questions enterprise marketing teams ask
            </span>
          </div>

          {/* Title */}
          <header className="max-w-[920px] mb-16 md:mb-24">
            <h1 className="text-[44px] md:text-[80px] font-medium tracking-[-0.035em] leading-[0.98] text-[var(--2pt-black)]">
              <span className="block">Plain answers</span>
              <span className="block text-[var(--2pt-black)]/55">
                on embedded AI engineering
              </span>
              <span className="block">
                for{" "}
                <span className="text-[var(--2pt-green)]">marketing.</span>
              </span>
            </h1>
            <p className="mt-8 text-[15px] md:text-[17px] leading-relaxed text-[var(--2pt-black)]/65 max-w-[640px]">
              Buyers ask the same questions. We answer them once, in writing,
              for the team and for the language models that will one day cite
              this page on a buyer&rsquo;s behalf.
            </p>
          </header>

          {/* Section nav — anchor jumps */}
          <nav
            aria-label="FAQ categories"
            className="mb-20 md:mb-28 border-t border-b border-[var(--2pt-black)]/10 py-5"
          >
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-mono tracking-[0.18em] uppercase text-[var(--2pt-black)]/55">
              {sections.map((s) => (
                <li key={s.label}>
                  <a
                    href={`#${slugify(s.label)}`}
                    className="hover:text-[var(--2pt-black)] transition-colors duration-500"
                  >
                    {s.label}
                    <span className="ml-2 text-[var(--2pt-black)]/30 tabular-nums">
                      {s.items.length.toString().padStart(2, "0")}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sections */}
          <div className="space-y-24 md:space-y-32">
            {sections.map((s) => (
              <section
                key={s.label}
                id={slugify(s.label)}
                aria-labelledby={`heading-${slugify(s.label)}`}
              >
                <div className="flex items-baseline gap-3 mb-10 md:mb-14">
                  <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--2pt-green)]">
                    §
                  </span>
                  <h2
                    id={`heading-${slugify(s.label)}`}
                    className="text-[26px] md:text-[34px] font-medium tracking-[-0.025em] leading-[1.05] text-[var(--2pt-black)]"
                  >
                    {s.label}
                  </h2>
                </div>

                <dl className="divide-y divide-[var(--2pt-black)]/10 border-t border-[var(--2pt-black)]/10">
                  {s.items.map((item) => (
                    <div
                      key={item.id}
                      id={item.id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10 md:py-12 scroll-mt-32"
                    >
                      <dt className="md:col-span-5">
                        <h3 className="text-[19px] md:text-[22px] font-medium tracking-[-0.02em] leading-[1.2] text-[var(--2pt-black)]">
                          {item.question}
                        </h3>
                      </dt>
                      <dd className="md:col-span-7 text-[15px] md:text-[16px] leading-[1.65] text-[var(--2pt-black)]/72">
                        {item.answer}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
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
                  Still evaluating?
                </p>
                <h2 className="text-[34px] md:text-[52px] font-medium tracking-[-0.03em] leading-[1.02] text-[var(--2pt-black)]">
                  <span className="block">Bring us the problem.</span>
                  <span className="block text-[var(--2pt-black)]/55">
                    We&rsquo;ll bring the system.
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
                href="/glossary"
                className="hover:text-[var(--2pt-black)] transition-colors duration-500"
              >
                → Glossary
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

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}
