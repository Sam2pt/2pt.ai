# 2PT — Brand & Design Language

Working document. Tweak as we go.

This is the design system the site operates within. Codified after the hero pivot from dark/bold to light/delicate. The goal: a brand that looks more like a foundation-model lab than a marketing agency. Specific. Confident. Quiet.

---

## 1. Principles

1. **White space is the primary tool.** Don't pack. Let one idea breathe at a time. If two things share a row, ask why.
2. **Hierarchy through opacity, not weight.** A second line at 55% black opacity carries more elegance than a second line in a different size or weight. Opacity is the new bold.
3. **One emphasis per moment.** Per section: one word in green, one word at full ink, one CTA. The rest is grey.
4. **Slow is sophisticated.** Transitions over 1 second with `ease-out` feel intentional. Snappy = startup. Slow = considered.
5. **Specific words, fewer of them.** "Forward-deployed pods" beats "small AI teams that we send in." Five precise words beat fifteen approximate ones.
6. **No marketing voice.** No "transformation," "synergy," "best-in-class," "powered by." No exclamation marks. No em-dashes.
7. **Periods do the heavy lifting.** Short sentences. Periods over commas where it works. Three-word sentences are fine.

---

## 2. Colour

Tokens already defined in `app/globals.css`:

| Token | Hex | Use |
|---|---|---|
| `--2pt-offwhite` | `#F5F5F5` | Primary canvas. The default background. |
| `--2pt-white` | `#FAFAFA` | Alternate canvas. Cards. Modals. |
| `--2pt-black` | `#0A0A0A` | Primary ink. Headlines. |
| `--2pt-green` | `#4ADE80` | Accent. Used sparingly — see below. |
| `--2pt-gray` | `#71717A` | Reserved. Prefer `black/65` opacity. |
| `--2pt-dark-gray` | `#27272A` | Reserved for rare dark-mode moments. |

### Ink hierarchy via opacity

| Use | Token |
|---|---|
| Display headline (primary) | `var(--2pt-black)` |
| Display headline (secondary line) | `var(--2pt-black)` at `55%` |
| Body / subhead | `var(--2pt-black)` at `65%` |
| Meta / labels / mono | `var(--2pt-black)` at `50%` |
| Dividers / hairlines | `var(--2pt-black)` at `8%–20%` |

### Green rules

Green is for one of three things, never more:

1. **One keyword highlight per section.** E.g. "**Anthropic**" in the partnership line, or "**Not pilots.**" in the hero subhead.
2. **Status dots** (1.5–2px pulsing dots, not 8px blobs).
3. **Hover state transitions** (text colour shift, underline colour shift).

Never use green as a background fill block. Never use green for chunky CTA buttons. Never use it twice in the same vertical fold.

---

## 3. Typography

Geist Sans + Geist Mono. Already loaded.

### Display

- **Weight:** `font-medium` (500). Sometimes `font-semibold` (600) for the very largest hero.
- **Tracking:** `tracking-[-0.025em]`. Looser than the old `-0.04em`.
- **Line-height:** `leading-[1.02]` to `leading-[1.05]`. Generous.
- **Max size:** `text-[96px]` at `lg:` breakpoint. We don't go bigger.
- **Scale:** `text-[42px] sm:text-[56px] md:text-[80px] lg:text-[96px]`

### Body

- **Weight:** regular (400).
- **Size:** `text-base` (16px) to `text-xl` (20px) for subheads.
- **Line-height:** `leading-relaxed` (1.625). Never tighter.
- **Max width:** `max-w-xl` to `max-w-2xl` for paragraphs. Long-line prose is for blogs, not landing pages.

### Mono / meta

- **Font:** Geist Mono.
- **Size:** `text-[10px]` to `text-xs` (10–12px).
- **Tracking:** `tracking-[0.18em]` to `tracking-[0.30em]`.
- **Case:** `uppercase`.
- **Colour:** `text-[var(--2pt-black)]/50`.
- **Use:** eyebrows, section labels, meta strips, status indicators, footer info.

### Banned

- `font-black` (900). Anywhere.
- `font-bold` (700). Use medium or semibold.
- `tracking-[-0.04em]` or tighter. Too aggressive.
- All-caps body text.
- Italic. Reserved for the legacy `2pt` wordmark only.

---

## 4. Layout & spacing

- **Section vertical padding:** `py-32 md:py-48`. Section-to-section separation is the most important rhythm on the page.
- **Container max-width:** `max-w-6xl` (1152px) for most. `max-w-7xl` (1280px) for grids that need it.
- **Container horizontal padding:** `px-8 md:px-12`. Generous.
- **Element-to-element vertical rhythm:** `mb-12` to `mb-20` between major elements (headline → subhead → CTA, etc.).
- **Dividers:** `h-px bg-[var(--2pt-black)]/10`. Hairline. Never thicker than 1px.

### Asymmetry

Prefer single-column with controlled max-widths over two-column "headline | description" splits. The old site leaned heavily on that pattern; the new site lets one idea hold the space.

### Cards

- **Border:** `border border-[var(--2pt-black)]/8`. Hairline.
- **Background:** `var(--2pt-white)` (slightly lighter than canvas) — gives subtle lift without shadows.
- **No box-shadow.** Use border + bg contrast for depth.
- **Internal padding:** `p-6 md:p-8`.

---

## 5. Motion

- **Default duration:** `duration-1000` to `duration-1200` (1.0–1.2s).
- **Default easing:** `ease-out` or `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Stagger interval:** 200ms between sibling reveals (not 100ms — too snappy).
- **Fade-up distance:** `translate-y-4` to `translate-y-6` (16–24px). Never larger.
- **Hover transforms:** `translate-x-1` for arrows, `scale-[1.03]` max for images.
- **Mouse-driven backgrounds:** `transition: background 0.6s ease-out`. Slow and watery, not reactive.

### Banned motion

- Bouncy / spring easings.
- `transition-duration` under 300ms for anything decorative.
- Anything that scales by more than 1.05.
- Parallax on body text.
- `animate-ping` rings unless deliberately marking a live status.

---

## 6. Components

### Eyebrow

```
[green dot 1.5–2px, pulsing] [mono 10px / 0.25em tracking / black 50%]
```

Example: `· TWO POINT TECHNOLOGIES`

### CTA

Text-only, no button background, no chunky shape.

```
[text — underlined, hover changes border colour] [arrow icon, translates 1px right on hover]
```

Example: `See how a pod works  →`

Use buttons only for primary conversion actions (contact form submit). Never for navigation.

### Stat / metric

```
[number — text-2xl to text-5xl, font-medium, black]
[label — mono 10–12px, 0.18em tracking, black 50%, uppercase]
```

Numbers may be green only when they represent a category outcome (rare).

### Section header pattern

```
[eyebrow]
[headline — display, with secondary line at 55% black opacity]
[subhead — body, max-w-xl, one inline emphasis word at full ink]
```

Optional: a thin divider below the subhead. Never both a subhead and a "read more" link in the same header.

---

## 7. Copy voice

Lifted from the original PRD and tightened.

### Do

- Short sentences. Periods over commas.
- Specific nouns. "Pods" not "teams." "Klaviyo retention engine" not "marketing automation."
- One emphasis word per paragraph in full-ink.
- Numbers when they exist. "$270 AOV" not "premium pricing."
- Verbs over abstractions. "We ship" not "delivery of solutions."

### Don't

- Em-dashes. Period the sentence instead.
- Marketing verbs: transform, empower, unlock, ignite, supercharge.
- Hedged claims: "leading," "best-in-class," "world-class."
- "Powered by" anything.
- "We help [our partners] [achieve]…" The site is about us doing, not helping.

### Sentence-length test

If a sentence has more than 14 words, try to break it into two. If it has more than 22, it's a paragraph and shouldn't be on the homepage.

---

## 8. What we kept from the old site

- The italic `2pt` wordmark. Iconic, doesn't need refreshing.
- The green accent colour (`#4ADE80`). Just used more sparingly.
- The pulsing green-dot motif for live status.
- The mono "eyebrow" pattern. Refined, not replaced.
- The "Two cities · One firm" New York / London framing.

## 9. Imagery — abstract shape architecture

We do not use stock photography. We do not use product shots. We do not use client logos as decoration. All imagery in editorial slots (case studies, hero ambient, future blog headers) is built from a shared **shape vocabulary** rendered as inline SVG. Think Palantir / Linear / Vercel — atmospheric geometry, not literal illustration.

### The vocabulary

Five primitives, used in every composition:

| Primitive | What it is | What it suggests |
|---|---|---|
| **Orb** | Filled circle with optional radial-gradient fill | A node. A point. A focus. |
| **Hairline** | 1px stroke, straight or curved | Structure. Connection. Trajectory. |
| **Contour** | Concentric outlined circles / ellipses | A field. Depth. Layers. |
| **Dot** | Small filled marker (3–6px) | A live indicator. A peak. A satellite. |
| **Wash** | Soft radial-gradient backdrop | Atmosphere. Surrounding context. |

### The palette inside a composition

```
Ink hairlines:         rgba(10, 10, 10, 0.15)
Soft ink fill:         rgba(10, 10, 10, 0.04)
Accent green stroke:   rgba(74, 222, 128, 0.65)
Soft green fill:       rgba(74, 222, 128, 0.12)
Live green dot:        var(--2pt-green) (full opacity)
Canvas:                var(--2pt-white)
```

### Composition rules — bold less is more

- **One bold move per composition.** A single dominant shape, sized large, doing the work. Never a busy collage of small elements.
- Each composition uses **two or three primitives**, not all five.
- **Exactly one big green statement.** Green leads each composition as a solid or gradient fill — not as a thin highlight on an otherwise grey scene. The rest is ink.
- Shapes fill the canvas. Use `preserveAspectRatio="xMidYMid slice"` so the composition extends edge-to-edge in any container rather than letterboxing.
- Always centred or symmetric in some way. We don't do organic chaos.
- Pure abstract. No labels, no numbers, no chart legends inside the SVG. Captions live outside in the section header or card.
- Static is the default. Optional motion: slow rotation > 60s, or a pulse on a single small marker.
- Stripe-bold, not Palantir-intricate. If you can describe the composition in one short sentence, it's right. If you need a list, cut elements.

### Current implementations (case studies)

See [`components/ui/case-study-graphic.tsx`](components/ui/case-study-graphic.tsx).

| Case | Form | Primitives | One-line description |
|---|---|---|---|
| Barker Beds | Bold green orb | Orb + Contour + Wash | A single big green orb inside one outer halo ring. |
| Harken | Bold ascending wedge | Hairline + Wash | One large green wedge climbing from the baseline. |
| Yamaha | Bold triad | Orb + Hairline + Wash | Three orbs forming a triangle, the top one big and green. |
| Dreamies | Bold peak field | Contour + Wash | One large green peak inside one outer contour. |

### How to add a new composition

1. Pick two or three primitives from the vocabulary.
2. Use the SVG viewBox `0 0 400 300` (4:3) with `preserveAspectRatio="xMidYMid meet"` so it scales into any container.
3. Use the defined palette constants. Don't introduce new colours.
4. Exactly one green element. Choose deliberately.
5. No text inside the SVG.

### Two execution modes

Compositions render in one of two modes depending on context:

- **Filled bold** — case-study graphics. The dominant shape is filled (gradient or solid). High visual weight. Used in standalone editorial slots where the image is the moment.
- **Outline arty** — product graphics and ornamental marks (e.g. client logos in the banner). Hairline strokes only. The dominant shape is rendered as a 1.5–2px stroke rather than a fill. The single green element is usually a small filled dot at a meaningful intersection. Used where the imagery sits alongside other content and needs to recede slightly.

Same vocabulary either way. Same one-green-statement rule. Mode is a choice based on adjacent content, not a different design system.

### Client marks

See [`components/ui/client-mark.tsx`](components/ui/client-mark.tsx). Five abstract outline marks in the outline-arty mode. Pure geometry — circle, square + diagonal, triangle, vesica, hexagon. Assigned to clients by index, not by brand interpretation. They are decorative ornaments paired with the client name, not logo substitutes.

---

## 10. What we threw out

- Big green-block highlights on headlines (the "the system." treatment).
- Strikethrough animations.
- `font-black` (900) display type.
- Bouncy/quick scroll-in animations.
- Two-column "headline | description" splits in section headers.
- Dark-canvas-by-default. We're a light-canvas site now.
- Em-dashes.

---

## 11. Open questions

- **A second accent colour** for product / GEO branding? Currently green carries everything. Long-term, a secondary accent (warm? cool?) for Products may earn its place.
- **Photography treatment.** Case-study hero images currently sit at full saturation. The light/delicate aesthetic might want them desaturated or treated.
- **Logo lockup variations.** We have `2pt` italic wordmark. Do we need a stacked version? A monochrome white-on-green for partner badges?
- **The Anthropic badge.** Currently a text line. When Anthropic publishes the official Claude Partner badge asset, it slots in here.

---

*Last updated: this build. Tweak in place; this is a working spec.*
