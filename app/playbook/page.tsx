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
                    <strong>We do not run pilots.</strong> Every engagement
                    ships to production. Commercial structure fails if it
                    does not.
                  </Item>
                  <Item>
                    <strong>We do not license seats.</strong> Fixed engagement
                    fee. Client owns the resulting IP. No per-user pricing
                    trailing behind the work.
                  </Item>
                  <Item>
                    <strong>We do not deliver decks.</strong> Decks are
                    internal working documents. The deliverable is running
                    software.
                  </Item>
                  <Item>
                    <strong>We integrate rather than replace.</strong> The
                    system runs inside the platforms the team already uses.
                    We do not ship another dashboard for the team to log
                    into.
                  </Item>
                </List>
              </Section>

              <Section id="lose" number="05" title="Where marketing teams lose">
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

              <Section id="bring" number="06" title="What the client needs to bring">
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

              <Section id="stack" number="07" title="Stack">
                <P>
                  Foundation model layer is Anthropic&rsquo;s Claude via the
                  Claude Partner Network for most engagements. Other models
                  where a workload demands it. Systems integrate with:
                </P>
                <List>
                  <Item>
                    <strong>Retail media:</strong> Amazon Ads, Walmart
                    Connect, Instacart Ads, Target Roundel, Kroger Precision
                  </Item>
                  <Item>
                    <strong>Paid:</strong> Google Ads, Meta, TikTok, DV360
                  </Item>
                  <Item>
                    <strong>Customer data:</strong> Segment, Rudderstack,
                    mParticle, native CDP builds
                  </Item>
                  <Item>
                    <strong>Ops:</strong> Slack, Monday, Notion, Linear,
                    Jira, brand DAMs
                  </Item>
                  <Item>
                    <strong>Search + AI discovery:</strong> ChatGPT, Claude,
                    Perplexity, Gemini, Google AIO
                  </Item>
                </List>
              </Section>

              <Section id="commercial" number="08" title="Commercial">
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

              <Section id="contact" number="09" title="Contact">
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

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] md:text-[16px] leading-[1.7] text-[var(--2pt-black)]/78">
      {children}
    </p>
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
