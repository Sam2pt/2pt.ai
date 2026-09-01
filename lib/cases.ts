/**
 * lib/cases — single source of truth for the case-study corpus.
 *
 * Voice: each engagement reads as marketing services delivery, with AI
 * underneath. No internal 2pt product names (Chedder, Lumen, Conduit)
 * appear in the case copy; capability language replaces them so the
 * page positions the work, not the tooling.
 *
 * Imported by:
 *   • components/sections/work-preview.tsx — homepage 3-up reel
 *   • app/work/page.tsx                     — index filmstrip
 *   • app/work/[slug]/page.tsx              — long-form case page
 *   • app/sitemap.ts                        — route registration
 *   • app/layout.tsx                        — JSON-LD CreativeWork nodes
 *
 * Order in this array drives the order on the index page. The three
 * marked `featured: true` are the ones that appear on the homepage reel.
 */

export type ToolTag =
  | "GEO + AEO"
  | "Retail media"
  | "Creative"
  | "Brand compliance"
  | "Marketing operations"
  | "Workflow"
  | "Customer intelligence"

export type CaseStudy = {
  slug: string
  client: string
  /** Optional sub-brand or product line, e.g. "Dreamies". */
  brand?: string
  sector: string
  year: string
  /** Used in the index + homepage reel as the headline claim. */
  title: string
  /** One-line outcome that lives next to the title on the index. */
  lead: string
  /** ~30 word index summary. */
  summary: string
  /** Long-form body for the case page (problem). ~120 words. */
  problem: string
  /** Long-form body for the case page (approach). ~180 words. */
  approach: string
  /** Long-form body for the case page (system + integration). ~80 words. */
  system: string
  /** 2-3 hard outcome statements. */
  outcomes: { label: string; value: string; note?: string }[]
  /** Stack badges shown in a tabular list. */
  stack: string[]
  /** Capability tags. Drives the index filter row and the per-card chip. */
  tools: ToolTag[]
  /** Pulled onto the homepage reel. */
  featured: boolean
  /** Visual accent for the poster — drives the gradient on dark cards. */
  accent: "green" | "cyan" | "lime" | "emerald"
  /**
   * Short categorical chips for the runbook case page. These allude to
   * the work without spelling it out. Aim for 4-6 per case, kebab-cased
   * single phrases.
   */
  tags: string[]
  /**
   * Soft-delete switch. Defaults to true. Set to false to hide a case
   * everywhere (homepage reel, /work index, CaseStrip, static routes,
   * sitemap, JSON-LD) without losing the data — useful when a client
   * hasn't yet given permission to publish the case.
   */
  enabled?: boolean
  /**
   * Optional path to a client logo asset under /public.
   * Convention: /logos/work/{slug-or-client}.svg
   * Falls back to a typographic wordmark when omitted.
   */
  logoPath?: string
}

const ALL_CASES: CaseStudy[] = [
  {
    slug: "vc-portfolio-customer-intelligence",
    client: "A New York venture firm",
    sector: "Venture · D2C portfolio · Customer intelligence",
    year: "2026",
    title: "One customer brain, seven faces.",
    lead: "Automated customer intelligence rolled across a D2C portfolio in eight weeks.",
    summary:
      "A NY venture firm's D2C portfolio brands got one shared customer-intelligence system with per-brand skins, per-role framings, and cross-brand learning that surfaces as suggested experiments in every tenant.",
    problem:
      "A New York venture firm holds a growing D2C portfolio. Every brand has its own commerce stack, its own audience shape, its own CX language, and its own dashboards. Each portfolio company was building customer intelligence in isolation, and the fund had no way to see what one brand had already proved before another one paid to learn it. Founders got siloed views, marketers got dashboards that ignored their day-to-day, and the fund saw retrospective decks instead of a live picture. The constraint was not data. It was a shared brain that could still look and feel like each brand.",
    approach:
      "We deployed a single customer-intelligence engine and wrapped it in per-brand skins so every portfolio company opens their own tenant and sees their own product. Same core, different chrome, different voice. On top of that we built per-role framings so the same data lands differently for a marketer, a founder and a board member. Every tenant can also spin experiments. Cohort tests, price tests, creative tests, funnel tests. When one brand's experiment lands a result, the engine matches the audience shape against the other tenants and surfaces the winning experiment as a suggested play in the tenants where it is likely to work. The fund sees the full mesh; each brand sees only their own tenant plus the incoming suggestions. Rolled out to seven brands in eight weeks with embedded engineers alongside each brand's growth lead.",
    system:
      "One customer-intelligence engine, seven skinned tenants. Integrated with each brand's commerce, CDP, ad and support stack. Cross-brand suggestion layer runs continuously. Each brand owns their tenant post-handover.",
    outcomes: [
      { label: "Brands live", value: "7" },
      { label: "Rollout window", value: "8 weeks" },
      { label: "Suggested experiments / week", value: "Continuous" },
      { label: "Cross-brand suggestion hit-rate", value: "Compounding" },
    ],
    stack: [
      "Shopify · Recharge · Klaviyo",
      "Segment · Rudderstack",
      "Meta · TikTok · Google Ads",
      "Zendesk · Gorgias",
      "Foundation-model layer",
      "Per-brand tenant fabric",
    ],
    tools: ["Customer intelligence", "Marketing operations"],
    featured: true,
    accent: "cyan",
    tags: [
      "portfolio-scale",
      "multi-tenant",
      "per-brand-skinning",
      "per-role-framing",
      "cross-brand-suggestions",
      "eight-week-rollout",
    ],
  },

  {
    slug: "amazon-generative-creative",
    client: "Amazon",
    sector: "Retail media · CPG",
    year: "2026",
    title: "Generative creative at retail media scale.",
    lead: "Variant velocity 3× without losing brand fit.",
    summary:
      "AI-generated creative paired with shot photography, scored on brand fit, hook strength and predicted CTR before shipping to Amazon Ads.",
    problem:
      "CPG brands operating across Amazon Ads need thousands of creative variants every week. Multi-SKU, multi-format, multi-locale. Human creative teams can't keep pace with the platform's appetite for fresh assets, and the legacy review cycle adds days between brief and live spend. The platform rewards velocity, but velocity without brand discipline trashes the equity. The constraint is brand fit at speed.",
    approach:
      "We delivered an AI-powered creative service inside the client's marketing function. Generative layouts blend with shot product photography, and every variant runs through an AI scoring layer that evaluates brand fit, hook strength and predicted CTR against the client's historical winners. Variants that exceed a promotion threshold ship straight to Amazon Ads; the rest are killed before a human has to look at them. An AI brand-compliance layer reads the brand voice rule set and flags any claim or imagery that drifts from category guardrails, so legal sign-off becomes a backstop rather than a bottleneck. The result is a continuous, opinionated promotion pipeline rather than a quarterly creative review.",
    system:
      "Built bespoke inside the client's marketing stack. Runs alongside Amazon Ads API, the brand's DAM and the existing creative review tools. The client owns the IP and operates the system after handover.",
    outcomes: [
      { label: "Variant velocity", value: "3×", note: "illustrative" },
      { label: "CTR uplift", value: "+18%", note: "illustrative" },
      { label: "Time from brief to live", value: "Hours, not days" },
    ],
    stack: [
      "Amazon Ads API",
      "Foundation-model creative pipeline",
      "Internal DAM",
      "Brand voice rule set",
      "AI creative scoring layer",
    ],
    tools: ["Creative", "Brand compliance", "Retail media"],
    featured: true,
    accent: "green",
    tags: [
      "generative-creative",
      "creative-scoring",
      "brand-compliance",
      "amazon-ads",
      "multi-sku",
      "continuous-pipeline",
    ],
    enabled: false,
  },

  {
    slug: "yamaha-global-geo",
    client: "Yamaha",
    sector: "Education · Music · Global",
    year: "2026",
    title: "GEO and SEM for a global online school.",
    lead: "Cited in AI search across three locales at launch.",
    summary:
      "Online school launched across US, EU and Japan. AI-driven GEO audit ran in three languages, AI translation localised every fix, paid reinforced the gaps.",
    problem:
      "Yamaha's online music school launched across three global regions in the same window. US, EU and Japan. The brand needed visibility in three languages and two search categories at once: classical SEO for parents Googling lessons, and generative engine optimisation for shoppers asking ChatGPT, Perplexity, Gemini and Google AI Overviews for the best online music school. Three locales, two search systems, one launch deadline. Human SEO teams could handle one region in one language; the platform reality required all three at speed.",
    approach:
      "We delivered an AI-powered GEO and SEM service against the exact queries Yamaha's buyers ask AI search engines in each locale. For each region the work surfaced where the brand showed up in AI answers, where AI was sending shoppers instead, and the specific schema and content fixes required to close the gaps. AI translation pipelines ported every fix into French, German and Japanese with brand-voice constraints applied per market. SEM was paired alongside the gap list so the paid programme reinforced the queries the brand wasn't yet winning organically. The service runs continuously, so as ChatGPT and Perplexity update their indices the audit re-runs and the team sees new gaps before they cost enrolment.",
    system:
      "Built inside Yamaha's marketing stack, integrated with the brand's CMS, schema layer and paid-search platform. Localisation layer runs across three markets. The brand team owns and operates the system post-handover.",
    outcomes: [
      { label: "Locales covered", value: "US · EU · JP" },
      { label: "AI citation rate", value: "+ illustrative", note: "TBC" },
      { label: "Enrolment uplift", value: "TBC" },
    ],
    stack: [
      "AI-driven generative engine audit",
      "ChatGPT · Claude · Perplexity · Gemini · Google AIO",
      "Brand CMS",
      "Schema layer",
      "Paid search",
      "AI translation pipeline",
    ],
    tools: ["GEO + AEO", "Marketing operations"],
    featured: true,
    accent: "cyan",
    tags: [
      "multi-locale-geo",
      "ai-translation",
      "schema-discipline",
      "continuous-audit",
      "three-markets",
      "launch-window",
    ],
    enabled: false,
  },

  {
    slug: "kyndryl-marketing-ops",
    client: "Kyndryl",
    sector: "IT services · B2B · Global",
    year: "2026",
    title: "AI for Kyndryl marketing operations.",
    lead: "Planning cycles compressed, decisions move at the speed of the stack.",
    summary:
      "An AI workflow layer wired Slack, Monday, planning tools and the strategy stack into one operating fabric. AI agents scored options, modelled scenarios, surfaced where to lean in.",
    problem:
      "Kyndryl is a global IT services firm with a marketing function spread across timezones and systems. Workflow, planning and strategy lived in tools that didn't talk to each other. Decisions slowed because the data didn't move. By the time a regional team had visibility on what another region was doing, the window to act had closed. The constraint wasn't insight, it was throughput.",
    approach:
      "We built the marketing function a connective AI-driven operating layer. Workflow routing wired Slack, Monday, the planning stack and the strategy tooling into one fabric, so decisions, briefs and bid changes move through the platforms where they actually get made. On top of the routing layer we deployed AI strategy agents that score planning options against historical performance, model scenarios for each region, and surface where the marketing team should lean in. The team supervises the agents; the agents do the modelling. Adoption was deliberate: the service was rolled out region by region with embedded engineers alongside the in-house team, so by handover the AI was already part of the operating rhythm.",
    system:
      "Custom AI workflow and strategy layer, integrated with Slack, Monday, the client's planning stack, and the strategy tooling. AI agents run continuously. Owned and operated by the in-house team post-handover.",
    outcomes: [
      { label: "Planning cycle time", value: "↓ illustrative" },
      { label: "Decision throughput", value: "↑ illustrative" },
      { label: "Operating cost", value: "TBC" },
    ],
    stack: [
      "Slack",
      "Monday",
      "Planning stack",
      "AI strategy agents",
      "AI workflow routing",
    ],
    tools: ["Marketing operations", "Workflow"],
    featured: true,
    accent: "emerald",
    tags: [
      "ai-workflow-routing",
      "strategy-agents",
      "scenario-modelling",
      "cross-stack",
      "global-ops",
      "embedded-rollout",
    ],
    enabled: false,
  },

  {
    slug: "dreamies-content-conversion",
    client: "Mars",
    brand: "Dreamies",
    sector: "CPG · Pet · DTC",
    year: "2025",
    title: "Content built to convert.",
    lead: "Brand site rebuilt around conversion, AI-personalised by cohort.",
    summary:
      "The Dreamies brand site became a conversion surface, not a brochure. AI-personalised content by cohort, AI compliance reviewing every asset, faster path to live.",
    problem:
      "The Dreamies brand site looked great and converted poorly. It was built as a brand showcase rather than a working acquisition surface. Pet parents arriving from social, search and retail-media touched the same generic page regardless of intent. The category is high-frequency and low-deliberation, and the site wasn't built for the shopper journey it was actually receiving.",
    approach:
      "We rebuilt the brand experience around conversion. AI-personalised content surfaces the right benefit for the right pet parent based on referral context, prior interaction and brand-known segment signal. An AI creative-scoring layer evaluates every new module against brand fit and hook strength before it ships. An AI brand-compliance layer reads every claim and image against the regional rule set so legal review compresses into seconds. The service runs continuously rather than as a launch project, so the site gets sharper every week the agents see traffic.",
    system:
      "Built inside the Mars marketing stack with deep integration to the brand DAM, creative review and CDP. Runs continuously post-launch.",
    outcomes: [
      { label: "Conversion uplift", value: "TBC" },
      { label: "Time to publish", value: "Days → minutes" },
      { label: "Brand review cycle", value: "Compressed end to end" },
    ],
    stack: [
      "Mars brand DAM",
      "AI creative scoring",
      "AI brand compliance",
      "CDP",
      "Foundation-model layer",
    ],
    tools: ["Creative", "Brand compliance"],
    featured: true,
    accent: "lime",
    tags: [
      "conversion-first",
      "cohort-personalisation",
      "creative-scoring",
      "brand-compliance",
      "continuous-publish",
      "dtc-pet",
    ],
    enabled: false,
  },

  {
    slug: "harken-retail-media",
    client: "Harken",
    sector: "Retail media · CPG",
    year: "2025",
    title: "Retail media dominance.",
    lead: "AI-managed bidding across the major retailer networks at scale.",
    summary:
      "Retail media bidding ran continuously across Amazon, Walmart and Instacart. The AI traded the spend, the team focused on the briefs that actually needed a human.",
    problem:
      "Harken needed to dominate retail media across the major networks. Amazon, Walmart, Instacart and category-specific retailers. The complexity of multi-SKU, multi-retailer coverage made manual bid management infeasible. Each network has its own API, its own auction dynamics and its own creative requirements, and the windows to move spend are measured in minutes, not days.",
    approach:
      "We delivered an AI-driven retail media service that runs continuously against each platform's API, placing thousands of bids per minute based on real-time price, conversion probability and inventory signals. The AI trades the spend so the team can focus on the briefs and creative that actually need a human. An AI efficiency monitor sits alongside the bidder and watches for waste in real time; anomalies surface in seconds, not in next month's report. Spend reallocates across networks as soon as the underlying ROAS shifts, so leakage is caught and recovered as it happens.",
    system:
      "Custom retail-media bidding system deployed inside Harken's marketing stack. Integrated with Amazon Ads, Walmart Connect, Instacart Ads and the client's BI layer.",
    outcomes: [
      { label: "Networks covered", value: "Amazon · Walmart · Instacart" },
      { label: "Spend efficiency", value: "↑ illustrative" },
      { label: "ROAS volatility", value: "↓ illustrative" },
    ],
    stack: [
      "Amazon Ads API",
      "Walmart Connect API",
      "Instacart Ads API",
      "AI efficiency monitor",
      "Foundation-model layer",
    ],
    tools: ["Retail media"],
    featured: true,
    accent: "green",
    tags: [
      "multi-network-bidding",
      "live-spend-routing",
      "ai-efficiency-monitor",
      "amazon-walmart-instacart",
      "roas-volatility",
      "continuous-trade",
    ],
    enabled: false,
  },

  {
    slug: "clifford-chance-video-production",
    client: "Clifford Chance",
    sector: "Legal · Internal communications",
    year: "2025",
    title: "Clifford Chance. Production workflows for a global video series.",
    lead: "Internal video series, every office, every sector, faster end to end.",
    summary:
      "Backend production workflows rebuilt around AI for an internal video series that ran across every office and introduced sectors for the first time across the firm.",
    problem:
      "Clifford Chance was producing an internal video series that ran across every office globally and introduced sectors to the firm for the first time. Production touched every region, every language, every brand discipline and every legal review layer. The backend workflow, briefing, shooting, editing, localising, reviewing, publishing, was the bottleneck. The format demanded consistency at scale; the existing workflow couldn't deliver both.",
    approach:
      "We rebuilt the production workflow around an AI-driven backend. Briefs are routed and tracked through an AI workflow layer that wires the production tools into one flow. Generative agents handle the heavy lifting around captioning, localisation and rough-cut assembly so the human team focuses on creative judgement. An AI brand-and-legal compliance layer reads every cut against the firm's voice and risk constraints before it goes to review. The result is a production pipeline that runs at firm-wide scale without the firm-wide back-and-forth, and a series that launched on time across every office.",
    system:
      "Custom production-ops workflow inside the firm's existing video and review stack. Integrated with the brief routing, captioning, localisation and brand review surfaces. Operated by the in-house production team.",
    outcomes: [
      { label: "Office coverage", value: "Global" },
      { label: "Sectors introduced", value: "Firm-wide first" },
      { label: "Production cycle", value: "Compressed end to end" },
    ],
    stack: [
      "AI workflow routing",
      "AI generative captioning",
      "Localisation pipeline",
      "AI brand and legal review",
      "Foundation-model layer",
    ],
    tools: ["Workflow", "Brand compliance"],
    featured: false,
    accent: "cyan",
    tags: [
      "ai-workflow-routing",
      "generative-captioning",
      "localisation-pipeline",
      "brand-and-legal-review",
      "global-offices",
      "firm-wide-launch",
    ],
    enabled: false,
  },
]

/** Visible cases — soft-deleted entries (`enabled: false`) drop out. */
export const CASES: CaseStudy[] = ALL_CASES.filter(
  (c) => c.enabled !== false,
)
export const CASES_BY_SLUG = new Map(CASES.map((c) => [c.slug, c]))
export const FEATURED_CASES = CASES.filter((c) => c.featured)

/**
 * Capability filter chips for the index page.
 * "All" is implied at index 0 in the UI layer.
 */
export const CASE_TOOL_FILTERS: ToolTag[] = [
  "GEO + AEO",
  "Retail media",
  "Creative",
  "Brand compliance",
  "Marketing operations",
  "Workflow",
]
