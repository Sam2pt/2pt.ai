"use client"

/**
 * Client marks — bolder geometric ornaments paired with client names.
 *
 * Filled forms, thicker strokes, more presence. Pure abstract geometry —
 * no resemblance to any real brand logo or trade dress. Used as the
 * fallback when a logo image fails to load in the ClientsBanner.
 */

export type ClientMarkVariant = 0 | 1 | 2 | 3 | 4

const INK = "rgba(10,10,10,0.85)"
const INK_FILL = "rgba(10,10,10,0.08)"
const GREEN = "rgba(74,222,128,1)"
const GREEN_DEEP = "rgba(54,200,108,1)"

export function ClientMark({ variant }: { variant: ClientMarkVariant }) {
  return (
    <div className="w-full h-full">
      {variant === 0 && <MarkOne />}
      {variant === 1 && <MarkTwo />}
      {variant === 2 && <MarkThree />}
      {variant === 3 && <MarkFour />}
      {variant === 4 && <MarkFive />}
    </div>
  )
}

/* Mark 1 — bold ringed orb with green core */
function MarkOne() {
  return (
    <svg viewBox="0 0 60 60" className="w-full h-full">
      <circle cx="30" cy="30" r="24" fill={INK_FILL} stroke={INK} strokeWidth="2.25" />
      <circle cx="30" cy="30" r="14" fill="none" stroke={INK} strokeWidth="1.75" />
      <circle cx="30" cy="30" r="6" fill={GREEN} stroke={GREEN_DEEP} strokeWidth="1.5" />
    </svg>
  )
}

/* Mark 2 — filled square with bold diagonal */
function MarkTwo() {
  return (
    <svg viewBox="0 0 60 60" className="w-full h-full">
      <rect x="8" y="8" width="44" height="44" fill={INK_FILL} stroke={INK} strokeWidth="2.25" />
      <line x1="10" y1="50" x2="50" y2="10" stroke={INK} strokeWidth="2.25" strokeLinecap="round" />
      <circle cx="50" cy="10" r="4" fill={GREEN} stroke={GREEN_DEEP} strokeWidth="1.5" />
    </svg>
  )
}

/* Mark 3 — filled triangle with horizon through it */
function MarkThree() {
  return (
    <svg viewBox="0 0 60 60" className="w-full h-full">
      <polygon points="30,7 53,49 7,49" fill={INK_FILL} stroke={INK} strokeWidth="2.25" strokeLinejoin="round" />
      <line x1="4" y1="36" x2="56" y2="36" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <circle cx="30" cy="36" r="4" fill={GREEN} stroke={GREEN_DEEP} strokeWidth="1.5" />
    </svg>
  )
}

/* Mark 4 — two overlapping discs with green intersection */
function MarkFour() {
  return (
    <svg viewBox="0 0 60 60" className="w-full h-full">
      <defs>
        <clipPath id="clip-left">
          <circle cx="22" cy="30" r="17" />
        </clipPath>
      </defs>
      <circle cx="22" cy="30" r="17" fill={INK_FILL} stroke={INK} strokeWidth="2.25" />
      <circle cx="38" cy="30" r="17" fill={INK_FILL} stroke={INK} strokeWidth="2.25" />
      {/* Green intersection — clip a circle to the left disc */}
      <circle cx="38" cy="30" r="17" fill={GREEN} clipPath="url(#clip-left)" opacity="0.85" />
      <circle cx="30" cy="30" r="3" fill={GREEN_DEEP} />
    </svg>
  )
}

/* Mark 5 — filled hexagon with diameter line */
function MarkFive() {
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 6
    return `${30 + Math.cos(angle) * 23},${30 + Math.sin(angle) * 23}`
  }).join(" ")
  return (
    <svg viewBox="0 0 60 60" className="w-full h-full">
      <polygon points={points} fill={INK_FILL} stroke={INK} strokeWidth="2.25" strokeLinejoin="round" />
      <line x1="9" y1="30" x2="51" y2="30" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <circle cx="51" cy="30" r="4" fill={GREEN} stroke={GREEN_DEEP} strokeWidth="1.5" />
    </svg>
  )
}
