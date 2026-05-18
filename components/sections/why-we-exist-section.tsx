"use client"

import { useRef, useEffect, useState } from "react"

export function WhyWeExistSection() {
  const ref = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true)
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={ref}
      id="why-we-exist"
      className="relative bg-[var(--2pt-black)] text-[var(--2pt-white)] py-32 md:py-48 px-8 md:px-12 overflow-hidden"
    >
      {/* Ambient drifting orb — slow, blob-shaped, breathes life into the dark canvas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] -translate-x-1/2 -translate-y-1/2 animate-drift animate-morph"
          style={{
            background:
              "radial-gradient(circle at 40% 45%, rgba(74,222,128,0.20) 0%, rgba(74,222,128,0.06) 50%, transparent 75%)",
            filter: "blur(10px)",
          }}
        />
      </div>

      {/* Mouse-tracking green wash — overlay on top of the drift */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(74,222,128,0.16) 0%, transparent 50%)`,
          transition: "background 0.6s ease-out",
        }}
      />

      {/* Faint dot grid for texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div
          className={`flex items-center gap-2.5 mb-12 transition-opacity duration-1000 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full" />
          <span className="text-[10px] tracking-[0.3em] text-[var(--2pt-white)]/55 font-mono uppercase">
            <span className="text-[var(--2pt-white)]/35 mr-2">V.</span>Why 2PT exists
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-medium tracking-[-0.025em] leading-[1.05] max-w-5xl mb-12">
          <span
            className={`block text-[var(--2pt-white)] transition-all duration-[1200ms] ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            Marketing&rsquo;s next era is built on systems.
          </span>
          <span
            className={`block text-[var(--2pt-white)]/55 transition-all duration-[1200ms] ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "350ms" }}
          >
            Capability that compounds.
          </span>
        </h2>

        {/* Body */}
        <p
          className={`text-lg md:text-xl text-[var(--2pt-white)]/70 max-w-2xl leading-relaxed transition-all duration-[1200ms] ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "550ms" }}
        >
          SaaS won the 2010s because software was cheaper than headcount. AI is now cheaper than both. The next chapter belongs to companies that deploy systems{" "}
          <span className="text-[var(--2pt-white)]">and own the capability that compounds.</span>
        </p>
      </div>
    </section>
  )
}
