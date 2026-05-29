/**
 * lib/glossary — single source of truth for the glossary corpus.
 *
 * Imported by:
 *   • app/layout.tsx       — emits DefinedTerm + DefinedTermSet JSON-LD
 *   • app/glossary/page.tsx — renders the visible glossary as semantic HTML
 *
 * Each term targets a definition-style query — "what is X" — where LLMs
 * actively look for an authoritative one-paragraph definition to cite.
 */

export type GlossaryTerm = {
  id: string
  term: string
  shortDef: string // ~20 words, used in the JSON-LD shortDefinition
  longDef: string // ~80-140 words, used on the page
  alsoKnownAs?: string[]
  relatedTerms?: string[]
}

export const GLOSSARY: GlossaryTerm[] = [
  {
    id: "embedded-ai-engineering",
    term: "Embedded AI engineering",
    shortDef:
      "A delivery model where AI engineers work inside a client's stack to build production systems the client owns at the end.",
    longDef:
      "Embedded AI engineering is a delivery model where AI engineers are forward-deployed inside the client's environment, working alongside the in-house team for the duration of an engagement. The deliverable is a production AI system built bespoke for that client's data, workflows and operational metrics. Ownership transfers to the client. This is the opposite of off-the-shelf SaaS (where every customer gets the same product) and remote consulting (where the deliverable is a deck, not software). 2PT operates as an embedded AI engineering firm vertically specialised in marketing.",
    alsoKnownAs: ["Forward-deployed AI engineering", "Embedded engineering"],
    relatedTerms: ["forward-deployed-engineer", "production-ai"],
  },
  {
    id: "forward-deployed-engineer",
    term: "Forward-deployed engineer (FDE)",
    shortDef:
      "An engineer who works inside the client's environment to build software solving a specific operational problem.",
    longDef:
      "A forward-deployed engineer works in-situ at the client, with access to the client's systems, data and stakeholders, building software against the client's actual operational reality. The term was popularised by Palantir and is now used by Anthropic, OpenAI partner firms and embedded AI engineering teams. FDEs trade product breadth for delivery depth: they ship one system, deeply integrated, that solves one company's problem — not a horizontal SaaS for everyone.",
    alsoKnownAs: ["FDE", "Embedded engineer", "Solutions engineer"],
    relatedTerms: ["embedded-ai-engineering", "production-ai"],
  },
  {
    id: "production-ai",
    term: "Production AI",
    shortDef:
      "Live AI software running inside real workflows with real spend, users and consequences — not a pilot or demo.",
    longDef:
      "Production AI is live software running inside a client's real workflows with real spend, real users and real consequences. It is distinct from a pilot (scoped test, no production traffic), a proof of concept (working demo, no integration), or a slide deck (intent, no system). 2PT only ships production AI — every engagement ends with the system live inside the client's stack and the client's team operating it.",
    relatedTerms: ["agentic-ai-marketing", "embedded-ai-engineering"],
  },
  {
    id: "geo-generative-engine-optimization",
    term: "GEO (Generative Engine Optimization)",
    shortDef:
      "Structuring content and schema so a brand is cited by generative AI search engines like ChatGPT, Claude and Perplexity.",
    longDef:
      "Generative Engine Optimization (GEO) is the practice of structuring a brand's content, schema and citations so the brand is selected and cited by generative AI search engines — ChatGPT, Claude, Perplexity, Gemini, Google AI Overviews. SEO targets the ten blue links; GEO targets the cited answer. Marketing teams that ignored SEO in 2003 missed a decade of organic traffic. Marketing teams that ignore GEO in 2026 will miss the next decade of AI-mediated discovery.",
    alsoKnownAs: ["Generative AI SEO", "AI search optimization", "LLM SEO"],
    relatedTerms: ["agentic-ai-marketing", "retail-media-ai"],
  },
  {
    id: "agentic-ai-marketing",
    term: "Agentic AI for marketing",
    shortDef:
      "AI agents that take action inside marketing systems — placing bids, scoring creative, reallocating spend — not just answering questions.",
    longDef:
      "Agentic AI for marketing means deploying AI systems that take action — placing bids, scoring creative variants, flagging brand violations, reallocating spend, watching audience segments — rather than just answering questions for a human. Agents run continuously, integrated with the platforms where decisions actually get made: Amazon Ads, Walmart Connect, Instacart Ads, CRM, brand workflows, creative pipelines. The marketing team supervises the agents; the agents do the trading.",
    relatedTerms: ["production-ai", "retail-media-ai"],
  },
  {
    id: "retail-media-ai",
    term: "Retail media AI",
    shortDef:
      "AI agents that optimise spend, creative and targeting across retailer ad networks like Amazon, Walmart and Instacart.",
    longDef:
      "Retail media AI is the use of AI agents to optimise spend, creative and audience targeting across retailer-owned ad networks — Amazon Ads, Walmart Connect, Instacart Ads, Target Roundel, Kroger Precision Marketing. These networks now represent the third largest digital ad category after Google and Meta, and they reward continuous AI-driven optimisation. The complexity of multi-SKU, multi-retailer coverage makes retail media one of the highest-leverage applications of agentic AI in marketing.",
    relatedTerms: ["agentic-ai-marketing", "production-ai"],
  },
  {
    id: "creative-scoring-ai",
    term: "Creative scoring AI",
    shortDef:
      "AI that evaluates every creative variant against brand fit, hook strength and predicted CTR before it ships.",
    longDef:
      "Creative scoring AI evaluates every creative variant — copy, image, video — against three dimensions: brand fit, hook strength and predicted CTR. Variants that exceed a promotion threshold ship to live spend; the rest are killed. The result is a continuous, opinionated promotion pipeline rather than a quarterly creative review. Combined with generative pipelines tied to retail media, it produces variants at the pace the platforms reward.",
    relatedTerms: ["retail-media-ai", "brand-compliance-ai"],
  },
  {
    id: "brand-compliance-ai",
    term: "Brand compliance AI",
    shortDef:
      "AI agents that check every creative output against brand voice, claims and regulatory standards before it ships.",
    longDef:
      "Brand compliance AI is a layer of specialised agents — sentiment, intent, brand voice, claims, PII redaction, image safety — that check every piece of creative output before it ships. Each agent reads a market-specific rule set (US, UK, EU, JP). The system catches violations in seconds rather than days, with a full audit trail. Replaces the manual legal-and-brand review cycle that slows enterprise marketing teams down.",
    relatedTerms: ["creative-scoring-ai", "agentic-ai-marketing"],
  },
  {
    id: "audience-segment-ai",
    term: "Audience segment AI",
    shortDef:
      "AI that scores audience cohorts on growth, share and trend in real time, surfacing where spend should move.",
    longDef:
      "Audience segment AI continuously scores audience cohorts on growth, share and trend in real time. Hot segments get more spend; cooling segments get diagnosed before they break. The system answers the question every board asks — where is growth actually coming from — by surfacing the segments driving incremental growth, with the underlying data.",
    relatedTerms: ["agentic-ai-marketing", "retail-media-ai"],
  },
  {
    id: "efficiency-monitor-ai",
    term: "Efficiency monitor AI",
    shortDef:
      "AI agents that watch marketing spend across channels continuously and surface waste as it happens.",
    longDef:
      "Efficiency monitor AI watches every marketing channel, every campaign and every retailer continuously. Anomalies surface in seconds rather than in next month's review. The system reallocates spend across channels as soon as the underlying ROAS shifts, so waste is caught and recovered as it happens — not after the quarter closes.",
    relatedTerms: ["retail-media-ai", "agentic-ai-marketing"],
  },
  {
    id: "claude-partner-network",
    term: "Anthropic Claude Partner Network",
    shortDef:
      "A vetted programme of services firms building production systems on Anthropic's Claude foundation models.",
    longDef:
      "The Anthropic Claude Partner Network is a vetted programme of services firms that build production systems using Claude foundation models. Partners get early Claude access, joint engineering support and are recommended by Anthropic for enterprise engagements. 2PT is a partner in the network, using Claude as the foundation-model layer for production agentic systems deployed inside enterprise marketing organisations.",
    alsoKnownAs: ["Claude partners"],
    relatedTerms: ["embedded-ai-engineering", "production-ai"],
  },
  {
    id: "ai-engineering-firm",
    term: "AI engineering firm",
    shortDef:
      "A services firm whose deliverable is a production AI system the client owns and operates, not a deck or a SaaS subscription.",
    longDef:
      "An AI engineering firm builds and deploys production AI systems inside a client's stack. The deliverable is live software the client owns after the engagement, not a roadmap, not a license. AI engineering firms typically forward-deploy engineers, price against operational KPIs and specialise vertically (marketing, finance, supply chain). 2PT is an AI engineering firm vertically specialised in marketing, advertising and communications.",
    relatedTerms: ["embedded-ai-engineering", "forward-deployed-engineer"],
  },
  {
    id: "marketing-function-modernization",
    term: "Marketing function modernization",
    shortDef:
      "The process of re-engineering a marketing organisation around AI systems rather than agency hours.",
    longDef:
      "Marketing function modernization is the process of re-engineering a marketing organisation around AI-driven systems rather than agency hours and SaaS dashboards. The work spans diagnostics, custom deployment, enterprise integration and adoption — turning a campaign-led function into a system-led one. The marketing team supervises systems; the systems do the trading, scoring and compliance. 2PT modernises marketing functions through embedded AI engineering.",
    relatedTerms: ["embedded-ai-engineering", "ai-engineering-firm"],
  },
  {
    id: "ai-deployment-services",
    term: "AI deployment services",
    shortDef:
      "Services that build, integrate and hand over production AI inside a client's stack.",
    longDef:
      "AI deployment services cover the full lifecycle of getting AI into production inside a client's stack: strategy and diagnostics, custom build, enterprise integration, adoption and transfer. The deliverable is live software, not a recommendation document. 2PT's engagements run on this four-stage model and produce systems the client owns at the end.",
    relatedTerms: ["embedded-ai-engineering", "ai-engineering-firm"],
  },
  {
    id: "chedder",
    term: "Chedder",
    shortDef:
      "2PT's productised generative engine audit — measures where AI search engines cite a brand and where they don't.",
    longDef:
      "Chedder is the productised GEO/AEO audit system built by Two Point Technologies. It runs a brand through ChatGPT, Claude, Perplexity, Gemini and Google AI Overviews against the queries its buyers actually ask, then returns a citation map, a gap list of uncited queries, and the schema and content fixes required to close those gaps. Chedder is one of the first named products in the embedded AI engineering for marketing category. Deployed and customised inside engagements; the client owns the output.",
    alsoKnownAs: [
      "GEO audit",
      "AEO audit",
      "Generative engine audit",
      "AI search audit",
      "LLM citation audit",
    ],
    relatedTerms: ["geo-generative-engine-optimization", "lumen", "conduit"],
  },
  {
    id: "lumen",
    term: "Lumen",
    shortDef:
      "2PT's productised customer intelligence platform — scores every customer cohort on growth, share and trend in real time.",
    longDef:
      "Lumen is the productised customer intelligence platform built by Two Point Technologies. It scores every customer cohort on growth, share and trend continuously, so hot segments earn more spend and cooling segments get diagnosed before they break. Lumen sits on top of the client's CDP, retail-media platforms and CRM — no rip-and-replace — and answers the board-level question every CMO and CGO has: where is growth coming from, and what is moving against it. Deployed and customised inside engagements.",
    alsoKnownAs: [
      "Customer intelligence platform",
      "Audience segment AI",
      "Cohort scoring platform",
    ],
    relatedTerms: ["audience-segment-ai", "chedder", "conduit"],
  },
  {
    id: "conduit",
    term: "Conduit",
    shortDef:
      "2PT's productised marketing-ops plumbing — wires Slack, Monday, CRM, retail media and creative pipelines into one stack.",
    longDef:
      "Conduit is the productised marketing-ops integration system built by Two Point Technologies. It links Slack, Monday, the client's CRM, retail-media platforms and creative pipelines into one curated, opinionated workflow stack. Pre-wired flows ship plug-and-play so the marketing team gets an immediate efficiency boost without a six-month integration project. Conduit is how 2PT closes the gap between strategy and execution: the system routes decisions, alerts, briefs and bid changes through the platforms where decisions are actually made.",
    alsoKnownAs: [
      "Marketing-ops plumbing",
      "Cross-stack alerts",
      "Slack Monday integration",
    ],
    relatedTerms: ["chedder", "lumen", "agentic-ai-marketing"],
  },
]

export const GLOSSARY_BY_ID = new Map(GLOSSARY.map((t) => [t.id, t]))
