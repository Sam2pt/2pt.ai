import type { Metadata } from "next"
import Link from "next/link"
import { FloatingNav } from "@/components/ui/floating-nav"
import { TechGrid, GreenWash } from "@/components/ui/tech-grid"

/**
 * /playbook — private-link doc surfacing the 2pt operating model.
 *
 * Sam shares the URL directly (talks, emails, DMs). Not linked from
 * the site nav, excluded from the sitemap, robots noindex so it does
 * not appear in search results. Voice is deliberately dry and factual:
 * this is an operating manual, not marketing copy.
 */

const SITE_URL = "https://2pt.ai"
const PAGE_URL = `${SITE_URL}/playbook`

export const metadata: Metadata = {
  title: "The 2pt Playbook",
  description:
    "How Two Point Technologies builds and deploys production AI inside marketing functions. Private document.",
  alternates: { canonical: PAGE_URL },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

// Section index for the sticky rail + in-text anchors. Keep IDs short
// so the fragment URLs Sam might screenshot in a talk stay readable.
const SECTIONS: { id: string; label: string }[] = [
  { id: "what", label: "What we build" },
  { id: "how", label: "How we work" },
  { id: "stages", label: "Four stages" },
  { id: "different", label: "What is different" },
  { id: "seeing", label: "How we see it" },
  { id: "usable", label: "Made usable" },
  { id: "lose", label: "Where teams lose" },
  { id: "bring", label: "What you bring" },
  { id: "stack", label: "Stack" },
  { id: "commercial", label: "Commercial" },
  { id: "contact", label: "Contact" },
]

export default function PlaybookPage() {
  return (
    <>
      <FloatingNav />

      <main className="relative min-h-screen bg-[var(--2pt-white)] text-[var(--2pt-black)]">
        <TechGrid opacity={0.35} />
        <GreenWash at="88% 12%" size="45% 40%" intensity={0.06} />

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 pt-28 md:pt-40 pb-32 md:pb-48">
          {/* Masthead */}
          <header className="mb-14 md:mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--2pt-green)]" />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--2pt-black)]/55">
                The 2pt Playbook · Vol I
              </span>
            </div>
            <h1 className="text-[36px] md:text-[56px] lg:text-[64px] font-semibold tracking-[-0.025em] leading-[1.02] text-[var(--2pt-black)] max-w-[920px]">
              How we build and deploy production AI inside marketing.
            </h1>
            <p className="mt-6 md:mt-8 text-[15px] md:text-[17px] leading-[1.65] text-[var(--2pt-black)]/70 max-w-[720px]">
              Two Point Technologies is an embedded AI engineering firm for
              marketing, advertising and communications. This is the operating
              model. Private document, not for distribution.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-mono tracking-[0.22em] uppercase text-[var(--2pt-black)]/40">
              <span>Draft · Sep 2026</span>
              <span className="hidden md:inline">·</span>
              <span>NYC · LDN</span>
              <span className="hidden md:inline">·</span>
              <span>Read time · ~ 7 min</span>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Section index (sticky rail on desktop) */}
            <aside className="lg:col-span-3 order-2 lg:order-1">
              <nav
                aria-label="Playbook contents"
                className="lg:sticky lg:top-24"
              >
                <div className="text-[10px] font-mono tracking-[0.28em] uppercase text-[var(--2pt-black)]/40 mb-4">
                  Contents
                </div>
                <ol className="space-y-2">
                  {SECTIONS.map((s, i) => (
                    <li key={s.id} className="flex items-baseline gap-3">
                      <span className="text-[10px] font-mono tabular-nums text-[var(--2pt-black)]/35 w-4">
                        {(i + 1).toString().padStart(2, "0")}
                      </span>
                      <a
                        href={`#${s.id}`}
                        className="text-[13px] leading-[1.4] text-[var(--2pt-black)]/75 hover:text-[var(--2pt-black)] transition-colors duration-300"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            {/* Body */}
            <article className="lg:col-span-9 order-1 lg:order-2 max-w-[760px]">
              <Section id="what" number="01" title="What we build">
                <P>
                  Production AI systems inside enterprise marketing functions.
                  Not decks. Not pilots. Not proofs of concept. Live software
                  that runs on real spend, real users and real consequences,
                  and that the client owns after handover.
                </P>
                <P>
                  A production system for us means: integrated into the
                  client&rsquo;s stack, running against real traffic, monitored
                  in-house, and operated by the client&rsquo;s team once the
                  engagement ends.
                </P>
              </Section>

              <Section id="how" number="02" title="How we work">
                <P>
                  Forward-deployed pods. Every engagement is delivered by a
                  small team of AI engineers, marketing strategists and data
                  engineers who sit inside the client organisation for the
                  duration of the work. Standard pod is three to five people.
                </P>
                <List>
                  <Item>
                    <strong>In-situ:</strong> the pod works from inside the
                    client&rsquo;s systems, not from Slack DMs. Access to the
                    CDP, ad platforms, DAM, CRM and analytics is set up in
                    week one.
                  </Item>
                  <Item>
                    <strong>Weekly ship:</strong> every Friday there is a
                    working artifact in production, in review, or on the
                    deploy queue. No monthly-status-update culture.
                  </Item>
                  <Item>
                    <strong>Named counterparts:</strong> every pod member has
                    a named counterpart on the client team. Handover is
                    person to person, not team to team.
                  </Item>
                  <Item>
                    <strong>One backlog:</strong> the pod and the client team
                    share a single backlog. Priority is set by the client
                    weekly.
                  </Item>
                </List>
              </Section>

              <Section id="stages" number="03" title="The four stages">
                <P>
                  Every engagement runs the same four stages. End-to-end is
                  roughly six months. Longer engagements repeat the cycle
                  against a second system.
                </P>
                <Stage
                  n="01"
                  name="Diagnose"
                  length="2 weeks"
                  body="We map the marketing function. Where systems break, where AI lands, what to ship first. Deliverable is a written diagnosis and a scoped build plan. If the diagnosis says do not build, we do not build."
                />
                <Stage
                  n="02"
                  name="Build"
                  length="8 – 12 weeks"
                  body="Embedded engineers build the system inside the client stack. Production-grade from day one, no scratch prototypes that need re-writing. First integration lands in week three."
                />
                <Stage
                  n="03"
                  name="Deploy"
                  length="4 weeks"
                  body="Wired into the retail media, CRM, brand workflows and creative pipelines the system needs to run against. Runs alongside the client team while the numbers stabilise."
                />
                <Stage
                  n="04"
                  name="Transfer"
                  length="2 – 3 weeks"
                  body="Client team takes ownership. Documentation, runbooks and named on-call rotation are handed over. We leave. The client owns the software, the operating knowledge and the roadmap."
                />
              </Section>

              <Section id="different" number="04" title="What is different">
                <P>Four things separate this from a normal consulting or SaaS engagement.</P>
                <List>
                  <Item>
                    <strong>Pilots that ship.</strong> We run pilots. What we
                    do not run is pilots that never make it to production.
                    Every pilot has a named deploy path and an owner at the
                    client, agreed before it starts.
                  </Item>
                  <Item>
                    <strong>No seat licenses.</strong> Fixed engagement fee.
                    Client owns the resulting IP and operating knowledge.
                    No per-user pricing trailing behind the work.
                  </Item>
                  <Item>
                    <strong>Decks are working documents, not deliverables.</strong>
                    They exist to align a room. The deliverable is running
                    software.
                  </Item>
                  <Item>
                    <strong>Integrate rather than replace.</strong> The
                    system runs inside the platforms the team already uses.
                    We do not ship another dashboard for the team to log
                    into.
                  </Item>
                </List>
              </Section>

              <Section id="seeing" number="05" title="How we see it">
                <P>
                  Some of the arguments we make out loud, so a client knows
                  what they are signing up for.
                </P>
                <List>
                  <Item>
                    <strong>Hard is not the same word as dead.</strong> When
                    a channel or a model gets called dead, look at the number
                    it produced that year. DTC has been declared dead three
                    times in six years while US e-commerce hit $1.234
                    trillion. Most declared-dead things are declared hard
                    with a stronger adjective.
                  </Item>
                  <Item>
                    <strong>What breaks in an era is usually the money, not
                    the model.</strong> Cheap ads, cheap capital, and
                    &ldquo;we&rsquo;ll sort margin later&rdquo; do not
                    survive a rate cycle. That is not a channel dying, it is
                    a subsidy ending. The channel is now a normal business
                    that has to be good at things.
                  </Item>
                  <Item>
                    <strong>You can no longer win with one perfect ad.</strong>
                    In 2012 the country was in four feeds and sent things to
                    each other. That room is gone. Feeds are personalised at
                    scale, so reach is now assembled from many small
                    audiences. Creative volume is a structural requirement,
                    not a fashion.
                  </Item>
                  <Item>
                    <strong>Retail media is the biggest new surface with the
                    worst creative in it.</strong> Amazon, Walmart, Instacart,
                    Kroger. The ad, the shelf and the till are the same
                    system, so the job is disambiguation, not persuasion.
                    Most brands upload a product cut-out and a headline
                    written by whoever had the file open. There is real
                    room to move here.
                  </Item>
                  <Item>
                    <strong>Targeting is a solved problem. Creative is the
                    leverage.</strong> Advantage+, Performance Max, broad by
                    default. Anyone can target. Not anyone can make great
                    stories. NCSolutions and Nielsen put creative at 49% of
                    incremental sales and targeting at 11%. Most marketing
                    orgs invest in the reverse ratio.
                  </Item>
                  <Item>
                    <strong>Forty versions of one ad is still one ad.</strong>
                    Fatigue is not solved by cutdowns. Four reasons to buy is
                    four experiments; forty aspect ratios is one experiment.
                    Diversity of idea beats diversity of format.
                  </Item>
                  <Item>
                    <strong>Not all your traffic is a person.</strong> Bot
                    and crawler traffic is a meaningful share of the top of
                    every funnel. Model it and price it out of the media
                    plan.
                  </Item>
                  <Item>
                    <strong>Attribution is overrated. Watch the P&L.</strong>
                    Last-click, MMM, MTA, incrementality tests: all useful,
                    none of them decide the year. Cash into the business
                    minus cash out of it does. Trust the bank statement.
                  </Item>
                  <Item>
                    <strong>Owned systems beat rented ones.</strong> A tool
                    someone else operates for you is a tool you cannot
                    change. A system your team runs is a system that gets
                    better every week. This is why every engagement ends in
                    ownership.
                  </Item>
                </List>
              </Section>

              <Section id="usable" number="06" title="Made usable">
                <P>
                  Four operational templates from the talk. Take them, use
                  them, edit them. They are meant to be marked up, not
                  admired.
                </P>

                <SubHead>The concept-vs-execution test structure</SubHead>
                <P>
                  Ad performance drops. Team responds by making twenty
                  cutdowns of the same idea. Two months in you have forty
                  files and no answer to what is or is not working. The
                  problem is not effort; it is that forty executions of one
                  concept is one experiment.
                </P>
                <P>
                  <strong>The distinction.</strong> Concept is the reason
                  someone should buy this. Execution is the way that reason
                  gets shown. Swap aspect ratio, model, colour, music: that
                  is execution. Swap the reason to buy (new benefit, new
                  pain, new audience): that is concept.
                </P>
                <Steps>
                  <Item>
                    Pick three to five concepts. Genuinely different reasons
                    to buy. Not different tones or angles of the same
                    reason.
                  </Item>
                  <Item>
                    Cut each to the same production standard. Same duration,
                    same format bundle, same production spend. If one is
                    hero-shot and one is UGC, that is a production
                    difference, not a concept test.
                  </Item>
                  <Item>
                    Run them in a single campaign, budget split evenly,
                    broad targeting. Let the platform pick.
                  </Item>
                  <Item>
                    Read the winner on the outcome you actually care about.
                    Revenue, first-order LTV, subscribes. Not CTR, not
                    thumbstop.
                  </Item>
                  <Item>
                    Kill the losers. Do not iterate them. Take the winning
                    concept and produce five to ten executions of it. Now
                    you can iterate.
                  </Item>
                </Steps>
                <RuleOfThumb>
                  If you cannot describe the difference between two ads
                  without watching them, they are the same ad. If two ads
                  pitch the same concept and one has a dog in it, that is
                  one concept and one experiment.
                </RuleOfThumb>

                <SubHead>The traffic-quality checklist</SubHead>
                <P>
                  Not all your traffic is a person. Bots, crawlers,
                  click-farm traffic, incidental clicks. Any funnel that
                  treats every session as human overstates the top and
                  understates the bottom.
                </P>
                <P className="text-[13px] uppercase tracking-[0.16em] text-[var(--2pt-black)]/50 font-mono">
                  Screening
                </P>
                <Steps>
                  <Item>
                    Sessions under two seconds with zero events. Flag as
                    automated.
                  </Item>
                  <Item>
                    Sessions from datacenter ASNs (AWS, GCP, Azure,
                    DigitalOcean, Hetzner). Flag.
                  </Item>
                  <Item>
                    Headless-browser user-agent strings (HeadlessChrome,
                    PhantomJS, Puppeteer, Playwright). Flag.
                  </Item>
                  <Item>
                    Multiple sessions per second from a single IP. Flag.
                  </Item>
                  <Item>
                    Traffic spikes at unusual hours in unusual geographies.
                    Investigate before including.
                  </Item>
                  <Item>
                    GA4 bot filter is on. Meta and Google Conversions API
                    server-side firing is configured with event
                    deduplication.
                  </Item>
                  <Item>
                    Referrer-spam domain list is filtered at ingest.
                  </Item>
                </Steps>
                <P className="text-[13px] uppercase tracking-[0.16em] text-[var(--2pt-black)]/50 font-mono">
                  Do this once
                </P>
                <P>
                  Cut a &ldquo;verified human&rdquo; segment. Re-run last
                  quarter&rsquo;s CAC and conversion rate against that
                  segment only. That is the number to plan against, not the
                  gross one.
                </P>
                <P className="text-[13px] uppercase tracking-[0.16em] text-[var(--2pt-black)]/50 font-mono">
                  Do this weekly
                </P>
                <P>
                  Compare humans-only sessions to platform-reported clicks.
                  Track the ratio. A drift in that ratio is your early signal
                  for creative fatigue, spam-farm exposure, or platform
                  reporting change.
                </P>

                <SubHead>The retail media creative checklist</SubHead>
                <P>
                  The retail media buyer is not in a persuasion job. They
                  came for cold brew, they are choosing which cold brew.
                  Different job, different assets. Most brands upload a
                  product cutout and a headline written by whoever had the
                  file open.
                </P>
                <P className="text-[13px] uppercase tracking-[0.16em] text-[var(--2pt-black)]/50 font-mono">
                  Per SKU
                </P>
                <Steps>
                  <Item>Hero image is the product in use, not a cutout on white.</Item>
                  <Item>
                    Above the fold reads brand, category, one
                    differentiator. In that order.
                  </Item>
                  <Item>
                    Star rating and review count are visible on the tile,
                    not two clicks in.
                  </Item>
                  <Item>Bundle or multi-pack option is shown, not buried.</Item>
                  <Item>
                    Copy is localised per market. US, UK, CA, AU are not the
                    same market. Write four scripts, not one.
                  </Item>
                  <Item>
                    Sponsored Brands headline reads as a shelf sign, not a
                    tagline.
                  </Item>
                  <Item>
                    Sponsored Display retargets cart-abandoners, not
                    category-browsers.
                  </Item>
                  <Item>DSP audience is seeded from purchase, not view.</Item>
                  <Item>
                    Video has an on-screen answer to &ldquo;why this
                    one&rdquo; in the first three seconds. Sound-off.
                  </Item>
                  <Item>
                    Feed is clean: correct GTIN, correct category, correct
                    pack size, correct price.
                  </Item>
                </Steps>
                <RuleOfThumb>
                  If your retail-media ad works as a static thumbnail with
                  the sound off and no motion, it works. If it needs the
                  video to make sense, it does not.
                </RuleOfThumb>
                <P className="text-[13px] uppercase tracking-[0.16em] text-[var(--2pt-black)]/50 font-mono">
                  Weekly job
                </P>
                <P>
                  Pick three ASINs or item numbers. Look at the top-selling
                  competitor for each search term you buy. Note what they
                  show that you do not. Ship one experiment per SKU per
                  week. That is fifty-two experiments a year off one hour on
                  a Monday.
                </P>

                <SubHead>The reported-vs-cash reporting template</SubHead>
                <P>
                  Every platform reports revenue. Every platform reports it
                  slightly differently. What decides the year is the cash in
                  the bank, not the numbers on the dashboards.
                </P>
                <ReconTable />
                <P className="text-[13px] uppercase tracking-[0.16em] text-[var(--2pt-black)]/50 font-mono">
                  Read the delta, not the number
                </P>
                <P>
                  A steady delta is fine. That is the platform&rsquo;s
                  systematic overcount versus your ledger, and it is stable
                  by design. A widening delta is a signal to look:
                  attribution model change on the platform, fraud, a shift
                  in refund cycle, or a real reporting bug.
                </P>
                <P className="text-[13px] uppercase tracking-[0.16em] text-[var(--2pt-black)]/50 font-mono">
                  Monthly job
                </P>
                <P>
                  Trend the delta as a percentage. If it moves more than
                  five points month to month, someone finds out why before
                  the next plan is written.
                </P>
                <RuleOfThumb>
                  If the CFO&rsquo;s revenue number and the CMO&rsquo;s
                  revenue number are more than ten percent apart, one team
                  is planning against fiction. Fix it before either budget
                  conversation.
                </RuleOfThumb>
              </Section>

              <Section id="lose" number="07" title="Where marketing teams lose">
                <P>
                  Four failure patterns we see repeatedly. If any of these look
                  familiar, that is where the work should start.
                </P>
                <List>
                  <Item>
                    <strong>Pilot purgatory.</strong> A pilot runs for six
                    months, produces good numbers, and never makes it to
                    production because nobody owns the deploy path.
                  </Item>
                  <Item>
                    <strong>Model tourism.</strong> Eight foundation models
                    trialled inside a year, none in production. Model
                    procurement is not model deployment.
                  </Item>
                  <Item>
                    <strong>The vendor bench.</strong> Five SaaS tools at $50k
                    a year each with overlapping capabilities. Consolidation
                    beats accumulation.
                  </Item>
                  <Item>
                    <strong>The strategy off-site.</strong> A recommendation
                    is not a shipped system. A workshop is not a deployment.
                    Ideas without an owner die on the Q3 slide.
                  </Item>
                </List>
              </Section>

              <Section id="bring" number="08" title="What the client needs to bring">
                <P>
                  Three things must be in place before we start. These are
                  non-negotiable; without them the model does not work.
                </P>
                <List>
                  <Item>
                    <strong>A named operational metric.</strong> Something we
                    move. ROAS, CAC, retention, share of AI citations,
                    creative velocity. Not &ldquo;modernisation&rdquo;.
                  </Item>
                  <Item>
                    <strong>Access.</strong> Read and write in the systems the
                    work touches. Read-only kills the engagement.
                  </Item>
                  <Item>
                    <strong>An in-house owner.</strong> A named person on the
                    client team who runs the system after transfer. If nobody
                    on the client side signs up for that seat, the engagement
                    does not finish.
                  </Item>
                </List>
              </Section>

              <Section id="stack" number="09" title="Stack">
                <P>
                  We are model-agnostic in principle and Claude-first in
                  practice through the Anthropic Claude Partner Network.
                  Systems get wired into the platforms the client already
                  runs on, not new ones.
                </P>
                <StackGroup title="Foundation models">
                  Claude 4 / 5 family (primary via the Claude Partner Network);
                  OpenAI GPT-5 / Sora; Google Gemini 2 / Imagen / Veo; xAI
                  Grok; Meta Llama; open-weights (Mistral, Qwen, DeepSeek)
                  where a workload needs local inference. Routing is per
                  task, not per vendor.
                </StackGroup>
                <StackGroup title="Retail media">
                  Amazon Ads (Sponsored Products, Brands, Display, DSP,
                  Marketing Cloud), Walmart Connect, Instacart Ads, Target
                  Roundel, Kroger Precision Marketing, Sam&rsquo;s Club MAP,
                  Albertsons Media Collective, DoorDash Ads, Uber Ads.
                </StackGroup>
                <StackGroup title="Paid media">
                  Google Ads (Search, Performance Max, YouTube), DV360, Meta
                  (Advantage+, Reels, Shops), TikTok Ads, Reddit, LinkedIn,
                  Pinterest, Apple Search Ads, Snap, The Trade Desk. Bid and
                  budget agents integrate at API level, not via Zapier.
                </StackGroup>
                <StackGroup title="Search + AI discovery">
                  ChatGPT (with SearchGPT), Claude, Perplexity, Gemini,
                  Google AI Overviews, Bing Copilot, You.com. We audit
                  citation coverage per market and per query intent, and
                  route content and schema fixes through the brand CMS.
                </StackGroup>
                <StackGroup title="Commerce + retention">
                  Shopify Plus, BigCommerce, Salesforce Commerce Cloud,
                  Adobe Commerce. Klaviyo, Attentive, Iterable, Braze,
                  Postscript, Recharge. Loyalty via Yotpo, Smile,
                  LoyaltyLion, Talon.One.
                </StackGroup>
                <StackGroup title="Customer data">
                  Segment, Rudderstack, mParticle, Snowplow. Native CDP
                  builds on Snowflake or BigQuery when a warehouse-first
                  approach is right. Reverse-ETL through Hightouch or Census.
                </StackGroup>
                <StackGroup title="Analytics + measurement">
                  GA4, Amplitude, Mixpanel, PostHog. Warehouse-native BI on
                  Snowflake, BigQuery, Databricks. Media mix and
                  incrementality via Robyn, Meridian, Recast, or bespoke
                  builds. Server-side event capture via Snowplow, Jitsu, or
                  the platforms&rsquo; Conversions APIs.
                </StackGroup>
                <StackGroup title="Creative + content">
                  Adobe Creative Cloud + Firefly, Figma, Runway, ElevenLabs,
                  Descript. Brand DAM via Bynder, Frontify, Brandfolder or
                  Air. Product feeds via Feedonomics or Productsup. Video
                  captioning + localisation via bespoke pipelines on
                  Whisper / GPT / Claude.
                </StackGroup>
                <StackGroup title="Brand + legal compliance">
                  Voice, claims, regulatory and PII checks run as a scoring
                  layer alongside creative generation. Rule sets loaded per
                  market (US, UK, EU, APAC), audit trail retained.
                </StackGroup>
                <StackGroup title="Ops + collaboration">
                  Slack, Monday, Notion, Linear, Jira, Asana. Automation
                  through native APIs, Temporal, and n8n where a workflow
                  needs to run outside the client stack. GitHub for source
                  and CI.
                </StackGroup>
                <StackGroup title="Infrastructure">
                  AWS-first (Bedrock, Lambda, ECS, RDS, S3), Google Cloud
                  (Vertex, Cloud Run), Azure OpenAI where the client is
                  standardised there. Vector search via pgvector, Pinecone,
                  Weaviate. Observability through Datadog, Grafana, or the
                  platform-native tooling.
                </StackGroup>
              </Section>

              <Section id="commercial" number="10" title="Commercial">
                <List>
                  <Item>
                    <strong>Engagement fee, fixed scope.</strong> Priced
                    against operational KPI improvement, not headcount.
                  </Item>
                  <Item>
                    <strong>No perpetual licenses.</strong> Client owns the
                    IP and operating knowledge at handover.
                  </Item>
                  <Item>
                    <strong>Success-linked bands</strong> against the named
                    operational metric where the client wants them.
                  </Item>
                  <Item>
                    <strong>Legal:</strong> standard MSA plus per-engagement
                    SOW. Data processing agreement with SCCs where the work
                    crosses jurisdictions.
                  </Item>
                </List>
              </Section>

              <Section id="contact" number="11" title="Contact">
                <P>
                  If you want us to look at the shape of your marketing
                  function, the fastest route is the contact form on the
                  main site: <Link href="/" className="underline underline-offset-4 hover:text-[var(--2pt-green)] transition-colors">2pt.ai</Link>.
                  Otherwise email{" "}
                  <a
                    href="mailto:info@twopointtechnologies.com"
                    className="underline underline-offset-4 hover:text-[var(--2pt-green)] transition-colors"
                  >
                    info@twopointtechnologies.com
                  </a>.
                </P>
                <P>
                  Selected case studies live at{" "}
                  <Link
                    href="/work"
                    className="underline underline-offset-4 hover:text-[var(--2pt-green)] transition-colors"
                  >
                    /work
                  </Link>
                  , FAQ at{" "}
                  <Link
                    href="/faq"
                    className="underline underline-offset-4 hover:text-[var(--2pt-green)] transition-colors"
                  >
                    /faq
                  </Link>
                  , glossary at{" "}
                  <Link
                    href="/glossary"
                    className="underline underline-offset-4 hover:text-[var(--2pt-green)] transition-colors"
                  >
                    /glossary
                  </Link>
                  .
                </P>
              </Section>

              {/* Colophon */}
              <footer className="mt-24 pt-8 border-t border-[var(--2pt-black)]/10 text-[10px] font-mono tracking-[0.22em] uppercase text-[var(--2pt-black)]/40 flex flex-wrap items-center justify-between gap-3">
                <span>Two Point Technologies · MMXXVI</span>
                <span>Private · not for distribution</span>
              </footer>
            </article>
          </div>
        </div>
      </main>
    </>
  )
}

// ── section primitives ─────────────────────────────────────────────

function Section({
  id,
  number,
  title,
  children,
}: {
  id: string
  number: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 mb-14 md:mb-20"
    >
      <div className="flex items-baseline gap-3 mb-4">
        <span className="text-[10px] font-mono tracking-[0.28em] tabular-nums text-[var(--2pt-green)]">
          — {number}
        </span>
      </div>
      <h2
        id={`${id}-title`}
        className="text-[24px] md:text-[30px] font-semibold tracking-[-0.02em] leading-[1.15] text-[var(--2pt-black)] mb-5 md:mb-6"
      >
        {title}
      </h2>
      <div className="space-y-4 md:space-y-5">{children}</div>
    </section>
  )
}

function P({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const base = "text-[15px] md:text-[16px] leading-[1.7] text-[var(--2pt-black)]/78"
  return <p className={className ?? base}>{children}</p>
}

function SubHead({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-8 mb-3 text-[18px] md:text-[20px] font-semibold tracking-[-0.015em] leading-[1.2] text-[var(--2pt-black)]">
      {children}
    </h3>
  )
}

function Steps({ children }: { children: React.ReactNode }) {
  return (
    <ol className="space-y-3 md:space-y-4 pl-0 border-l border-[var(--2pt-black)]/10 counter-reset-[step]">
      {children}
    </ol>
  )
}

function RuleOfThumb({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 border-l-2 border-[var(--2pt-green)] pl-4 md:pl-5 py-1">
      <div className="text-[10px] font-mono tracking-[0.24em] uppercase text-[var(--2pt-green)] mb-2">
        Rule of thumb
      </div>
      <p className="text-[14px] md:text-[15px] leading-[1.65] text-[var(--2pt-black)]/78">
        {children}
      </p>
    </div>
  )
}

function ReconTable() {
  const rows = [
    "Google Ads",
    "Meta",
    "TikTok",
    "Amazon Ads",
    "Walmart Connect",
    "Retail media DSP",
    "Organic + direct",
    "Total revenue",
    "Ad spend (billed)",
    "Net cash",
  ]
  return (
    <div className="my-6 border border-[var(--2pt-black)]/12 overflow-hidden">
      <div className="grid grid-cols-[1.4fr_1fr_1fr_0.9fr] bg-[var(--2pt-black)]/[0.04]">
        {["Line", "Reported", "Cash", "Delta"].map((h) => (
          <div
            key={h}
            className="px-3 md:px-4 py-2.5 text-[10px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/55 border-r border-[var(--2pt-black)]/8 last:border-r-0"
          >
            {h}
          </div>
        ))}
      </div>
      {rows.map((r, i) => {
        const isTotal = r === "Total revenue" || r === "Net cash"
        return (
          <div
            key={r}
            className={`grid grid-cols-[1.4fr_1fr_1fr_0.9fr] border-t border-[var(--2pt-black)]/8 ${
              isTotal ? "bg-[var(--2pt-black)]/[0.02]" : ""
            }`}
          >
            <div
              className={`px-3 md:px-4 py-2.5 text-[13px] md:text-[14px] border-r border-[var(--2pt-black)]/8 ${
                isTotal
                  ? "font-semibold text-[var(--2pt-black)]"
                  : "text-[var(--2pt-black)]/75"
              }`}
            >
              {r}
            </div>
            {[0, 1, 2].map((c) => (
              <div
                key={c}
                className="px-3 md:px-4 py-2.5 border-r border-[var(--2pt-black)]/8 last:border-r-0"
              >
                {/* left blank on purpose — this is a template to be filled in */}
                <span className="text-[var(--2pt-black)]/25 text-[13px] font-mono">·</span>
              </div>
            ))}
          </div>
        )
      })}
      <div className="px-3 md:px-4 py-2 border-t border-[var(--2pt-black)]/8 bg-[var(--2pt-black)]/[0.04] text-[10px] font-mono tracking-[0.18em] uppercase text-[var(--2pt-black)]/45">
        Reconcile weekly · trend the delta monthly
      </div>
    </div>
  )
}

function List({ children }: { children: React.ReactNode }) {
  return (
    <ul className="space-y-3 md:space-y-4 pl-0 border-l border-[var(--2pt-black)]/10">
      {children}
    </ul>
  )
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li className="pl-5 md:pl-6 text-[14px] md:text-[15px] leading-[1.65] text-[var(--2pt-black)]/78">
      {children}
    </li>
  )
}

function StackGroup({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-6 pt-4 md:pt-5 border-t border-[var(--2pt-black)]/10 first:border-t-0 first:pt-0">
      <div className="text-[11px] font-mono tracking-[0.2em] uppercase text-[var(--2pt-black)]/55 md:pt-1">
        {title}
      </div>
      <p className="text-[14px] md:text-[15px] leading-[1.65] text-[var(--2pt-black)]/72">
        {children}
      </p>
    </div>
  )
}

function Stage({
  n,
  name,
  length,
  body,
}: {
  n: string
  name: string
  length: string
  body: string
}) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-4 md:gap-6 pt-4 md:pt-5 border-t border-[var(--2pt-black)]/10 first:border-t-0 first:pt-0">
      <div className="text-[10px] font-mono tracking-[0.28em] tabular-nums text-[var(--2pt-green)] pt-1">
        {n}
      </div>
      <div>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
          <span className="text-[16px] md:text-[18px] font-semibold tracking-[-0.015em] text-[var(--2pt-black)]">
            {name}
          </span>
          <span className="text-[11px] font-mono tracking-[0.18em] uppercase text-[var(--2pt-black)]/45">
            {length}
          </span>
        </div>
        <p className="text-[14px] md:text-[15px] leading-[1.65] text-[var(--2pt-black)]/70">
          {body}
        </p>
      </div>
    </div>
  )
}
