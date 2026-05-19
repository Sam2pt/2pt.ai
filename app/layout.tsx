import React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Grain } from "@/components/ui/grain"
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
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light",
}

// ─────────────────────────────────────────────────────────────────────────────
// Structured data — multi-schema JSON-LD.
//
// 1. Organization — who we are, where we are, what we do.
// 2. ProfessionalService — purchasable services + areaServed.
// 3. Person — Sam Gormley founder/CEO.
// 4. WebSite — site search metadata for AI search engines.
// 5. FAQ — common buyer questions, answered. Boosts FAQ rich results
//    and citation rate in Claude / ChatGPT / Perplexity.
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does Two Point Technologies do?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Two Point Technologies (2PT) is an embedded AI engineering firm for marketing, advertising and communications. We deploy production AI systems inside enterprise marketing teams through forward-deployed pods of AI engineers, marketing strategists and data engineers. The system is the product the client buys, runs and owns.",
      },
    },
    {
      "@type": "Question",
      name: "How does 2PT deploy AI inside a marketing function?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Every engagement runs through four stages: Diagnose (strategy & diagnostics — we map the marketing function and write a roadmap), Build (custom deployment — embedded engineers build the AI system inside your stack), Deploy (enterprise integration — wired into retail media, CRM, brand and creative workflows), and Transfer (adoption & transfer — your team takes ownership and we hand the system off).",
      },
    },
    {
      "@type": "Question",
      name: "What problems does 2PT solve for marketing teams?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Five recurring problems every enterprise marketing function has: monitoring efficiency (catching spend waste), monitoring growth (which audience segments are driving it), driving growth (24/7 retail media bidding across Amazon, Walmart, Instacart), creative optimisation (scoring every variant against brand fit, hook and CTR before it ships), and consistency & compliance (six bots running brand voice, sentiment, intent, claims, PII and image safety checks on every asset).",
      },
    },
    {
      "@type": "Question",
      name: "Is 2PT a Claude / Anthropic partner?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. 2PT is a member of the Anthropic Claude Partner Network. Engagements use Claude as the foundation model layer for production agentic systems deployed inside enterprise marketing organisations.",
      },
    },
    {
      "@type": "Question",
      name: "Where is 2PT located?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Two Point Technologies has offices in New York (447 Broadway, NY 10013) and London (45 Fitzroy Street, Fitzrovia W1D 3BW). The firm was founded in 2017 by Sam Gormley.",
      },
    },
    {
      "@type": "Question",
      name: "Who owns the systems 2PT builds?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "The client. Every system 2PT deploys is built bespoke inside the client's stack, and the IP belongs to the client. 2PT documents, trains the in-house team and hands the system off at the end of the engagement. There is no subscription lock-in.",
      },
    },
  ],
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
                faqSchema,
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
