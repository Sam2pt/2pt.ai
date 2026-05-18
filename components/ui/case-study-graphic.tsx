"use client"

/**
 * Case-study abstract imagery — outline-arty mode (see BRAND.md §9).
 *
 * Horizontally distributed compositions that work cleanly at both
 * 4:3 (homepage card) and 21:9 (case-study hero) aspect ratios.
 * Layered hairlines for visual richness. One green focal element each.
 * Subtle slow motion on at least one element.
 *
 * Shared underlying pattern: a faint horizontal axis line + a subtle
 * dotted grid background, so every graphic feels like an engineering
 * diagram across the site.
 */

export type CaseId = "decamarx" | "barker-beds" | "harken" | "yamaha" | "dreamies"

const INK = "rgba(10,10,10,0.45)"
const INK_FAINT = "rgba(10,10,10,0.15)"
const INK_GHOST = "rgba(10,10,10,0.06)"
const GREEN = "rgba(74,222,128,1)"
const GREEN_LINE = "rgba(74,222,128,0.75)"
const GREEN_SOFT = "rgba(74,222,128,0.15)"

export function CaseStudyGraphic({ caseId }: { caseId: CaseId }) {
  return (
    <div className="relative w-full h-full bg-[var(--2pt-white)] overflow-hidden">
      {/* Shared faint dotted grid background */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(rgba(10,10,10,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Universal live-dot top-right */}
      <span className="absolute top-[5%] right-[5%] z-10 w-[clamp(5px,0.9cqi,9px)] h-[clamp(5px,0.9cqi,9px)] rounded-full bg-[var(--2pt-black)] animate-pulse" />

      <div className="absolute inset-0">
        {caseId === "decamarx" && <DecamarxComposition />}
        {caseId === "barker-beds" && <BarkerBedsComposition />}
        {caseId === "harken" && <HarkenComposition />}
        {caseId === "yamaha" && <YamahaComposition />}
        {caseId === "dreamies" && <DreamiesComposition />}
      </div>
    </div>
  )
}

/* ---------------------- Barker Beds — concentric retention system ---------------------- */

function BarkerBedsComposition() {
  return (
    <svg
      viewBox="0 0 600 300"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
    >
      <defs>
        <radialGradient id="barker-orb" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(170,250,205,1)" />
          <stop offset="55%" stopColor={GREEN_LINE} />
          <stop offset="100%" stopColor={GREEN_SOFT} />
        </radialGradient>
      </defs>

      {/* Faint horizontal axis */}
      <line x1="20" y1="150" x2="580" y2="150" stroke={INK_FAINT} strokeWidth="1" strokeDasharray="2 5" />

      {/* Concentric retention rings — left third */}
      <g className="animate-rotate-slow" style={{ transformOrigin: "200px 150px", animationDuration: "60s" }}>
        <circle cx="200" cy="150" r="100" fill="none" stroke={INK_GHOST} strokeWidth="1" />
        <circle cx="200" cy="150" r="78" fill="none" stroke={INK_FAINT} strokeWidth="1" />
        <circle cx="200" cy="150" r="56" fill="none" stroke={INK} strokeWidth="1" />
        <circle cx="200" cy="150" r="34" fill="none" stroke={GREEN_LINE} strokeWidth="1.5" />
      </g>

      {/* Center grey orb */}
      <circle cx="200" cy="150" r="14" fill="rgba(10,10,10,0.08)" stroke={INK} strokeWidth="1" />

      {/* Connecting hairline + small node markers */}
      <line x1="300" y1="150" x2="440" y2="150" stroke={INK_FAINT} strokeWidth="1" />
      <circle cx="340" cy="150" r="2" fill="rgba(10,10,10,0.45)" />
      <circle cx="380" cy="150" r="2" fill="rgba(10,10,10,0.45)" />
      <circle cx="420" cy="150" r="2" fill="rgba(10,10,10,0.45)" />

      {/* Right-side green orb (focal) */}
      <circle cx="490" cy="150" r="40" fill="url(#barker-orb)" />
      <circle cx="490" cy="150" r="3.5" fill={GREEN} />

      {/* Bottom-corner satellite ticks */}
      <line x1="60" y1="240" x2="100" y2="240" stroke={INK_FAINT} strokeWidth="1" />
      <line x1="60" y1="60" x2="100" y2="60" stroke={INK_FAINT} strokeWidth="1" />
    </svg>
  )
}

/* ---------------------- Harken — launch trajectory ---------------------- */

function HarkenComposition() {
  const cols = [
    { x: 70, h: 20 },
    { x: 140, h: 40 },
    { x: 210, h: 68 },
    { x: 280, h: 102 },
    { x: 350, h: 140 },
    { x: 420, h: 178 },
    { x: 490, h: 212 },
  ]
  const baseY = 260
  return (
    <svg
      viewBox="0 0 600 300"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
    >
      <defs>
        <linearGradient id="harken-arc" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor={INK_FAINT} />
          <stop offset="100%" stopColor={GREEN_LINE} />
        </linearGradient>
      </defs>

      {/* Y-axis ticks */}
      {[60, 120, 180, 240].map((y) => (
        <g key={y}>
          <line x1="40" y1={y} x2="44" y2={y} stroke={INK_FAINT} strokeWidth="0.75" />
          <line x1="50" y1={y} x2="560" y2={y} stroke={INK_GHOST} strokeWidth="0.75" strokeDasharray="1 5" />
        </g>
      ))}

      {/* Baseline */}
      <line x1="40" y1={baseY} x2="560" y2={baseY} stroke={INK} strokeWidth="1" />

      {/* Trajectory arc — dotted */}
      <path
        d="M 70 240 Q 280 200 530 50"
        fill="none"
        stroke="url(#harken-arc)"
        strokeWidth="1.25"
        strokeDasharray="3 4"
      />

      {/* Columns */}
      {cols.map((c, i) => {
        const isPeak = i === cols.length - 1
        return (
          <g key={i}>
            <line
              x1={c.x}
              y1={baseY}
              x2={c.x}
              y2={baseY - c.h}
              stroke={isPeak ? GREEN_LINE : INK_FAINT}
              strokeWidth={isPeak ? "1.5" : "1"}
            />
            <circle
              cx={c.x}
              cy={baseY - c.h}
              r={isPeak ? "5" : "2"}
              fill={isPeak ? GREEN : "rgba(10,10,10,0.4)"}
            />
          </g>
        )
      })}

      {/* Faint focal halo around peak — slow pulse */}
      <circle
        cx="490"
        cy={baseY - 212}
        r="14"
        fill="none"
        stroke={GREEN_LINE}
        strokeWidth="1"
        className="animate-pulse"
        style={{ animationDuration: "3s" }}
      />
    </svg>
  )
}

/* ---------------------- Yamaha — network map ---------------------- */

function YamahaComposition() {
  // Seven nodes scattered across a wide horizontal layout.
  // One central HQ node in green, six market nodes in grey.
  const nodes = [
    { x: 80,  y: 90,  r: 6, key: "us" },
    { x: 180, y: 70,  r: 7, key: "uk" },
    { x: 280, y: 100, r: 6, key: "de" },
    { x: 300, y: 170, r: 14, key: "hq", green: true },
    { x: 420, y: 80,  r: 7, key: "fr" },
    { x: 490, y: 130, r: 6, key: "es" },
    { x: 530, y: 210, r: 8, key: "jp" },
    { x: 130, y: 220, r: 7, key: "br" },
  ]

  // Connections from HQ to everyone, plus a couple between markets
  const hqIndex = 3
  const links: [number, number][] = [
    [hqIndex, 0], [hqIndex, 1], [hqIndex, 2], [hqIndex, 4],
    [hqIndex, 5], [hqIndex, 6], [hqIndex, 7],
    [0, 1], [4, 5], [7, 0],
  ]

  return (
    <svg
      viewBox="0 0 600 300"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
    >
      <defs>
        <radialGradient id="yamaha-hq" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(170,250,205,1)" />
          <stop offset="60%" stopColor={GREEN_LINE} />
          <stop offset="100%" stopColor={GREEN_SOFT} />
        </radialGradient>
      </defs>

      {/* Faint horizontal axis */}
      <line x1="20" y1="150" x2="580" y2="150" stroke={INK_FAINT} strokeWidth="1" strokeDasharray="2 5" />

      {/* Connections */}
      {links.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={a === hqIndex || b === hqIndex ? "rgba(10,10,10,0.22)" : INK_GHOST}
          strokeWidth="1"
        />
      ))}

      {/* Market nodes */}
      {nodes.map((n, i) => {
        if (n.green) return null
        return (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill="rgba(245,245,245,1)"
            stroke="rgba(10,10,10,0.40)"
            strokeWidth="1"
          />
        )
      })}

      {/* HQ — green focal orb with halo */}
      <circle
        cx={nodes[hqIndex].x}
        cy={nodes[hqIndex].y}
        r="24"
        fill="none"
        stroke={GREEN_LINE}
        strokeWidth="1"
        className="animate-pulse"
        style={{ animationDuration: "3s" }}
      />
      <circle
        cx={nodes[hqIndex].x}
        cy={nodes[hqIndex].y}
        r={nodes[hqIndex].r}
        fill="url(#yamaha-hq)"
      />
      <circle
        cx={nodes[hqIndex].x}
        cy={nodes[hqIndex].y}
        r="3"
        fill="white"
      />
    </svg>
  )
}

/* ---------------------- Dreamies — category landscape ---------------------- */

function DreamiesComposition() {
  return (
    <svg
      viewBox="0 0 600 300"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
    >
      <defs>
        <radialGradient id="dreamies-peak" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={GREEN_SOFT} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Faint horizontal baseline */}
      <line x1="20" y1="250" x2="580" y2="250" stroke={INK_FAINT} strokeWidth="1" />

      {/* Background peak wash */}
      <ellipse cx="300" cy="170" rx="240" ry="120" fill="url(#dreamies-peak)" />

      {/* Stacked horizontal contour ellipses — topographic landscape */}
      <ellipse cx="300" cy="220" rx="260" ry="60" fill="none" stroke={INK_GHOST} strokeWidth="1" />
      <ellipse cx="300" cy="200" rx="220" ry="60" fill="none" stroke={INK_FAINT} strokeWidth="1" />
      <ellipse cx="300" cy="175" rx="170" ry="55" fill="none" stroke={INK_FAINT} strokeWidth="1" />
      {/* The peak ring — green */}
      <ellipse cx="300" cy="145" rx="110" ry="48" fill="none" stroke={GREEN_LINE} strokeWidth="1.5" />
      <ellipse cx="300" cy="120" rx="58" ry="36" fill="none" stroke={INK} strokeWidth="1" />

      {/* Central peak marker */}
      <circle cx="300" cy="100" r="5" fill={GREEN} />
      <circle
        cx="300"
        cy="100"
        r="14"
        fill="none"
        stroke={GREEN_LINE}
        strokeWidth="1"
        className="animate-pulse"
        style={{ animationDuration: "3s" }}
      />

      {/* Vertical axis ticks left + right (suggesting elevation) */}
      {[80, 130, 180, 230].map((y, i) => (
        <g key={i}>
          <line x1="30" y1={y} x2="36" y2={y} stroke={INK_FAINT} strokeWidth="0.75" />
          <line x1="564" y1={y} x2="570" y2={y} stroke={INK_FAINT} strokeWidth="0.75" />
        </g>
      ))}
    </svg>
  )
}

/* ---------------------- DECAMARX — portfolio diagnostic orbit ---------------------- */

function DecamarxComposition() {
  // 8 satellite orbs arranged around a central green hub.
  // Suggests "one productised system applied across many portfolio brands."
  const cx = 300
  const cy = 150
  const orbitRadius = 105
  const satellites = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * Math.PI * 2) / 8 - Math.PI / 2
    return {
      x: cx + Math.cos(angle) * orbitRadius,
      y: cy + Math.sin(angle) * orbitRadius,
      angle,
    }
  })

  return (
    <svg
      viewBox="0 0 600 300"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
    >
      <defs>
        <radialGradient id="decamarx-hub" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(170,250,205,1)" />
          <stop offset="55%" stopColor={GREEN_LINE} />
          <stop offset="100%" stopColor={GREEN_SOFT} />
        </radialGradient>
        <radialGradient id="decamarx-wash" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={GREEN_SOFT} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Soft background wash */}
      <circle cx={cx} cy={cy} r="140" fill="url(#decamarx-wash)" />

      {/* Outer cycle rings — suggesting the four-decade pattern library */}
      <circle cx={cx} cy={cy} r="135" fill="none" stroke={INK_GHOST} strokeWidth="1" strokeDasharray="2 6" />
      <circle cx={cx} cy={cy} r="155" fill="none" stroke={INK_GHOST} strokeWidth="1" strokeDasharray="1 8" />

      {/* Orbit ring */}
      <circle cx={cx} cy={cy} r={orbitRadius} fill="none" stroke={INK_FAINT} strokeWidth="1" />

      {/* Spokes from hub to each satellite */}
      {satellites.map((s, i) => (
        <line
          key={`spoke-${i}`}
          x1={cx}
          y1={cy}
          x2={s.x}
          y2={s.y}
          stroke="rgba(10,10,10,0.18)"
          strokeWidth="1"
        />
      ))}

      {/* Satellite orbs */}
      {satellites.map((s, i) => (
        <circle
          key={`sat-${i}`}
          cx={s.x}
          cy={s.y}
          r="7"
          fill="rgba(245,245,245,1)"
          stroke="rgba(10,10,10,0.4)"
          strokeWidth="1"
        />
      ))}

      {/* Central hub — green focal orb with pulse halo */}
      <circle
        cx={cx}
        cy={cy}
        r="32"
        fill="none"
        stroke={GREEN_LINE}
        strokeWidth="1"
        className="animate-pulse"
        style={{ animationDuration: "3s" }}
      />
      <circle cx={cx} cy={cy} r="22" fill="url(#decamarx-hub)" />
      <circle cx={cx} cy={cy} r="4" fill="white" />

      {/* Edge index ticks left + right (suggesting framework scale) */}
      {[80, 150, 220].map((y, i) => (
        <g key={`tick-${i}`}>
          <line x1="30" y1={y} x2="40" y2={y} stroke={INK_FAINT} strokeWidth="0.75" />
          <line x1="560" y1={y} x2="570" y2={y} stroke={INK_FAINT} strokeWidth="0.75" />
        </g>
      ))}
    </svg>
  )
}
