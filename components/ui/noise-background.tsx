"use client"

export function NoiseBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      <svg className="w-full h-full opacity-[0.03]">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  )
}
