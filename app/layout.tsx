import React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Grain } from "@/components/ui/grain"
import { FAQ } from "@/lib/faq"
import { GLOSSARY } from "@/lib/glossary"
import "./globals.css"

// ─────────────────────────────────────────────────────────────────────────────
// Fonts — exposed as CSS variables so Tailwind utilities (font-sans, font-mono)
// resolve correctly.
// ─────────────────────────────────────────────────────────────────────────────

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
})

// ─────────────────────────────────────────────────────────────────────────────
// Brand constants — single source of truth for SEO / GEO surfaces.
// ─────────────────────────────────────────────────────────────────────────────

const SITE_URL = "https://2pt.ai"
const SITE_NAME = "2PT"
const ORG_NAME = "Two Point Technologies"
const TAGLINE = "We deploy production AI inside marketing teams."
const SUMMARY =
  "Two Point Technologies is the embedded AI engineering firm for marketing, advertising and communications. We deploy production AI inside enterprise marketing teams through forward-deployed pods of AI engineers, marketing strategists and data engineers. The system is the product; the client owns it."
const SHORT_SUMMARY =
  "The embedded AI engineering firm for marketing. We deploy production AI inside enterprise marketing teams. The system is the product."

// ─────────────────────────────────────────────────────────────────────────────
// Metadata — comprehensive, market-leading. Includes title template, OG,
// Twitter, robots directives, canonical, alternates, format detection.
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | The embedded AI engineering firm for marketing`,
    template: `%s | ${SITE_NAME} — ${ORG_NAME}`,
  },
  description: SHORT_SUMMARY,
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    // Service category
    "AI deployment for marketing",
    "embedded AI engineering",
    "production AI for marketing",
    "marketing AI consultancy",
    "enterprise AI for marketing",
    "AI engineering firm",
    "forward-deployed engineering",
    // What we solve
    "retail media optimisation",
    "agentic AI for marketing",
    "marketing efficiency AI",
    "creative scoring AI",
    "brand compliance AI",
    "AI for retail media",
    "audience segment AI",
    // GEO / AI search adjacents
    "generative engine optimisation",
    "GEO for marketing",
    "AI search visibility",
    "Claude for marketing",
    // Categorical
    "AI-native marketing operations",
    "marketing function modernization",
    "marketing transformation AI",
    "embedded AI pods",
  ],
  authors: [{ name: ORG_NAME, url: SITE_URL }],
  creator: ORG_NAME,
  publisher: ORG_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
    languages: { "en-US": SITE_URL, "en-GB": SITE_URL },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${TAGLINE}`,
    description: SHORT_SUMMARY,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${ORG_NAME} — ${TAGLINE}`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@twopointtech",
    creator: "@twopointtech",
    title: `${SITE_NAME} — ${TAGLINE}`,
    description: SHORT_SUMMARY,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
    shortcut: "/favicon.png",
  },
  category: "Technology",
  classification: "AI Engineering Firm for Marketing",
  other: {
    // Hint to AI search engines that an llms.txt exists for richer ingestion
    "llms-txt": `${SITE_URL}/llms.txt`,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light",
}

// ─────────────────────────────────────────────────────────────────────────────
// Structured data — multi-schema JSON-LD combined into a single @graph.
//
// 1. Organization        — who we are, addresses, knowsAbout, services catalog.
// 2. ProfessionalService — purchasable service + areaServed (US / UK / EU).
// 3. WebSite             — site identity for AI search engines.
// 4. Person              — Sam Gormley standalone entity (founder/CEO).
// 5. ProfessionalService — New York office (LocalBusiness shape).
// 6. ProfessionalService — London office (LocalBusiness shape).
// 7. HowTo               — Diagnose → Build → Deploy → Transfer engagement.
// 8. Article             — homepage explainer on embedded AI engineering.
// 9. FAQPage             — entire FAQ corpus from lib/faq.ts.
// 10. DefinedTermSet     — entire glossary from lib/glossary.ts.
//
// Coverage is deliberately wide so the page is citable across SEO rich
// results, FAQ rich results, knowledge-panel entity surfaces, AI search
// (Claude / ChatGPT / Perplexity / Gemini), and "what is X" GEO queries.
// ─────────────────────────────────────────────────────────────────────────────

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}#organization`,
  name: ORG_NAME,
  alternateName: ["2PT", "Two Point Tech", "TwoPoint Technologies"],
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  image: `${SITE_URL}/opengraph-image`,
  description: SUMMARY,
  slogan: TAGLINE,
  foundingDate: "2017",
  founder: {
    "@type": "Person",
    "@id": `${SITE_URL}#founder`,
    name: "Sam Gormley",
    jobTitle: "Founder & CEO",
    affiliation: { "@type": "Organization", name: ORG_NAME },
  },
  numberOfEmployees: { "@type": "QuantitativeValue", value: 30 },
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "447 Broadway",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10013",
      addressCountry: "US",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "45 Fitzroy Street",
      addressLocality: "London",
      postalCode: "W1D 3BW",
      addressCountry: "GB",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "info@twopointtechnologies.com",
    availableLanguage: ["English"],
    areaServed: ["US", "GB", "EU"],
  },
  sameAs: [
    "https://www.linkedin.com/company/two-point-technologies",
    "https://www.anthropic.com/partners",
  ],
  knowsAbout: [
    "Embedded AI engineering",
    "Production AI deployment",
    "Marketing function modernization",
    "Retail media optimisation",
    "Agentic AI for marketing",
    "Creative scoring and optimisation",
    "Brand voice and compliance AI",
    "Audience segmentation AI",
    "Forward-deployed engineering",
    "AI-native marketing operations",
    "Generative engine optimisation",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Engagement Model",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Strategy & diagnostics",
          description:
            "We map the marketing function: where systems break, where AI lands, what to ship first. You leave with a roadmap your CFO can read.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom deployment",
          description:
            "Embedded engineers build the AI system inside your stack. Production-grade from day one. No demos. No pilots that go nowhere.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Enterprise integration",
          description:
            "Wired into retail media, CRM, brand and creative workflows. The system runs alongside your team and starts moving the metric.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Adoption & transfer",
          description:
            "Your team takes ownership. We document, train, hand off. The system stays. We don't sell you a subscription you can't switch off.",
        },
      },
    ],
  },
}

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}#service`,
  name: `${ORG_NAME} — embedded AI engineering`,
  provider: { "@id": `${SITE_URL}#organization` },
  serviceType: "AI engineering and deployment for marketing",
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Place", name: "European Union" },
  ],
  audience: {
    "@type": "BusinessAudience",
    audienceType:
      "Enterprise marketing organisations, CMOs, CGOs, eCommerce leaders, brand portfolio operators",
  },
  url: SITE_URL,
  description: SUMMARY,
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  url: SITE_URL,
  name: SITE_NAME,
  publisher: { "@id": `${SITE_URL}#organization` },
  inLanguage: "en-US",
}

// FAQPage — derived from the canonical FAQ corpus in lib/faq.ts.
// Emitting the entire 29-question corpus (rather than a hand-picked 6) widens
// the surface area for FAQ rich results and AI-search citations.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}#faq`,
  url: `${SITE_URL}/faq`,
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
}

// HowTo — codifies the 4-stage engagement model as a discoverable how-to.
// Targets "how to deploy AI inside a marketing team" queries on AI search.
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "@id": `${SITE_URL}#how-to-deploy`,
  name: "How to deploy production AI inside an enterprise marketing function",
  description:
    "The four-stage embedded engagement model 2PT uses to deploy production AI inside enterprise marketing functions.",
  totalTime: "P9M",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "USD",
    value: "Six- to seven-figure fixed-fee engagement",
  },
  supply: [
    { "@type": "HowToSupply", name: "Client marketing stack access" },
    { "@type": "HowToSupply", name: "Retail media, CRM and brand workflow APIs" },
    { "@type": "HowToSupply", name: "Foundation model access (Anthropic Claude)" },
  ],
  tool: [
    { "@type": "HowToTool", name: "Claude foundation models" },
    { "@type": "HowToTool", name: "Embedded engineering pod" },
  ],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Diagnose — strategy & diagnostics",
      text:
        "Map the marketing function: where systems break, where AI lands, what to ship first. Output is a roadmap the CFO can read. Typical duration 2–4 weeks.",
      url: `${SITE_URL}/#deploy`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Build — custom deployment",
      text:
        "Embedded engineers build the AI system inside the client's stack. Production-grade from day one. No demos. No pilots. Typical duration 6–12 weeks.",
      url: `${SITE_URL}/#deploy`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Deploy — enterprise integration",
      text:
        "System is wired into retail media, CRM, brand and creative workflows. Runs alongside the team and starts moving the metric. Typical duration 2–4 weeks.",
      url: `${SITE_URL}/#deploy`,
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Transfer — adoption & transfer",
      text:
        "The client's team takes ownership. We document, train, hand off. No subscription lock-in. The IP belongs to the client.",
      url: `${SITE_URL}/#deploy`,
    },
  ],
}

// LocalBusiness × 2 — discoverable for "AI agency New York" / "AI agency London".
const nyOfficeSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}#office-ny`,
  name: `${ORG_NAME} — New York`,
  parentOrganization: { "@id": `${SITE_URL}#organization` },
  url: `${SITE_URL}#offices`,
  image: `${SITE_URL}/opengraph-image`,
  telephone: "+1-212-000-0000",
  priceRange: "$$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "447 Broadway",
    addressLocality: "New York",
    addressRegion: "NY",
    postalCode: "10013",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.7211,
    longitude: -74.0009,
  },
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "Canada" },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
}

const londonOfficeSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}#office-london`,
  name: `${ORG_NAME} — London`,
  parentOrganization: { "@id": `${SITE_URL}#organization` },
  url: `${SITE_URL}#offices`,
  image: `${SITE_URL}/opengraph-image`,
  telephone: "+44-20-0000-0000",
  priceRange: "$$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "45 Fitzroy Street",
    addressLocality: "London",
    postalCode: "W1D 3BW",
    addressCountry: "GB",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 51.5223,
    longitude: -0.1399,
  },
  areaServed: [
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Place", name: "European Union" },
  ],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
}

// Person — standalone Sam Gormley node for entity disambiguation.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}#sam-gormley`,
  name: "Sam Gormley",
  givenName: "Sam",
  familyName: "Gormley",
  jobTitle: "Founder & CEO",
  worksFor: { "@id": `${SITE_URL}#organization` },
  affiliation: { "@id": `${SITE_URL}#organization` },
  url: SITE_URL,
  sameAs: ["https://www.linkedin.com/in/samgormley"],
  knowsAbout: [
    "Embedded AI engineering",
    "Production AI deployment",
    "Marketing function modernization",
    "Forward-deployed engineering",
    "Retail media optimisation",
    "Agentic AI for marketing",
  ],
}

// Article — frames the homepage as a citable explainer on embedded AI
// engineering for marketing. Helps Claude / ChatGPT / Perplexity treat the
// page as an authoritative source on the category itself.
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${SITE_URL}#homepage-article`,
  headline:
    "Embedded AI engineering for marketing: how Two Point Technologies deploys production AI inside enterprise marketing teams",
  description: SUMMARY,
  url: SITE_URL,
  mainEntityOfPage: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  author: { "@id": `${SITE_URL}#sam-gormley` },
  publisher: { "@id": `${SITE_URL}#organization` },
  inLanguage: "en-US",
  datePublished: "2026-01-15",
  dateModified: new Date().toISOString().split("T")[0],
  articleSection: "AI engineering for marketing",
  keywords: [
    "embedded AI engineering",
    "production AI",
    "marketing function modernization",
    "agentic AI for marketing",
    "retail media AI",
    "GEO",
    "forward-deployed engineering",
    "Claude Partner Network",
  ].join(", "),
  about: [
    { "@id": `${SITE_URL}#organization` },
    { "@id": `${SITE_URL}#service` },
  ],
}

// DefinedTermSet — emits the glossary corpus as a navigable set of terms.
// Each DefinedTerm is structured so LLMs can cite an authoritative definition
// of the underlying concept (embedded AI engineering, GEO, agentic AI, etc.).
const definedTermSetSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "@id": `${SITE_URL}#glossary`,
  name: "Two Point Technologies — Glossary",
  description:
    "A glossary of terms used by Two Point Technologies and the embedded AI engineering category — embedded AI engineering, GEO, production AI, retail media AI, agentic AI for marketing.",
  url: `${SITE_URL}/glossary`,
  inDefinedTermSet: { "@id": `${SITE_URL}#glossary` },
  hasDefinedTerm: GLOSSARY.map((t) => ({
    "@type": "DefinedTerm",
    "@id": `${SITE_URL}/glossary#${t.id}`,
    name: t.term,
    alternateName: t.alsoKnownAs,
    description: t.shortDef,
    url: `${SITE_URL}/glossary#${t.id}`,
    inDefinedTermSet: `${SITE_URL}#glossary`,
  })),
}

// ─────────────────────────────────────────────────────────────────────────────
// Root layout
// ─────────────────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${geist.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <link rel="canonical" href={SITE_URL} />
        <link rel="alternate" type="application/llms.txt" href="/llms.txt" />
        {/* Structured data — combined into a single @graph for cleaner indexing */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                organizationSchema,
                professionalServiceSchema,
                websiteSchema,
                personSchema,
                nyOfficeSchema,
                londonOfficeSchema,
                howToSchema,
                articleSchema,
                faqSchema,
                definedTermSetSchema,
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-[var(--2pt-offwhite)] text-[var(--2pt-black)]">
        <Grain />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
