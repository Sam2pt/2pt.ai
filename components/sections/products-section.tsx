"use client"

import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { useRef, useEffect, useState } from "react"
import { ProductGraphic, type ProductId } from "@/components/ui/product-graphic"

type Product = {
  id: ProductId
  name: string
  tagline: string
  description: string
  status: string
  cta: { label: string; href: string; external?: boolean }
}

const products: Product[] = [
  {
    id: "cheddar",
    name: "Cheddar",
    tagline: "Brand visibility, inside AI search.",
    description:
      "Monitor how your brand shows up across ChatGPT, Claude, Perplexity and Gemini. Map your presence. Catch the gaps. Own what gets cited when buyers ask.",
    status: "Live",
    cta: {
      label: "Visit cheddar.2pt.ai",
      href: "https://cheddar.2pt.ai",
      external: true,
    },
  },
  {
    id: "slice",
    name: "Slice",
    tagline: "Marketing data, made legible.",
    description:
      "One view across your retail media, owned channels, attribution, and AI workflows. The agent dashboard your team will actually use.",
    status: "In build · 2026",
    cta: {
      label: "Request early access",
      href: "mailto:info@twopointtechnologies.com?subject=Slice%20early%20access",
    },
  },
  {
    id: "whisk",
    name: "Whisk",
    tagline: "Production creative on autopilot.",
    description:
      "Generative creative pipelines tied to retail media platforms. Ship variants at the pace the algorithms reward. Built for enterprise brand voice compliance.",
    status: "In build · 2026",
    cta: {
      label: "Request early access",
      href: "mailto:info@twopointtechnologies.com?subject=Whisk%20early%20access",
    },
  },
]

export function ProductsSection() {
  const ref = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true)
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="products"
      className="relative bg-[var(--2pt-offwhite)] text-[var(--2pt-black)] py-32 md:py-48 px-8 md:px-12"
    >
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div
          className={`flex items-center gap-2.5 mb-12 transition-opacity duration-1000 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="w-1.5 h-1.5 bg-[var(--2pt-green)] rounded-full" />
          <span className="text-[10px] tracking-[0.3em] text-[var(--2pt-black)]/50 font-mono uppercase">
            <span className="text-[var(--2pt-black)]/30 mr-2">III.</span>Products
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-medium tracking-[-0.025em] leading-[1.05] max-w-5xl mb-12">
          <span
            className={`block text-[var(--2pt-black)] transition-all duration-[1200ms] ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            We build the systems.
          </span>
          <span
            className={`block text-[var(--2pt-black)]/55 transition-all duration-[1200ms] ease-out ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "350ms" }}
          >
            We also build the platform.
          </span>
        </h2>

        {/* Subhead */}
        <p
          className={`text-lg md:text-xl text-[var(--2pt-black)]/65 max-w-2xl leading-relaxed mb-20 md:mb-24 transition-all duration-[1200ms] ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "550ms" }}
        >
          Pod engagements produce IP.{" "}
          <span className="text-[var(--2pt-black)]">The strongest of it becomes productised.</span>
        </p>

        {/* Product grid — 3 cards, hairline grid */}
        <div className="grid md:grid-cols-3 border-t border-[var(--2pt-black)]/10">
          {products.map((product, index) => {
            const isLast = index === products.length - 1
            const CTA = product.cta.external ? "a" : Link

            return (
              <div
                key={product.id}
                className={`flex flex-col py-12 md:py-16 ${
                  index > 0 ? "md:border-l border-t md:border-t-0 border-[var(--2pt-black)]/10 md:pl-10" : "md:pr-10"
                } ${!isLast && index > 0 ? "md:pr-10" : ""} transition-all duration-[1200ms] ease-out ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${750 + index * 200}ms` }}
              >
                {/* Graphic */}
                <div className="relative aspect-[4/3] overflow-hidden mb-8 border border-[var(--2pt-black)]/8">
                  <ProductGraphic productId={product.id} />
                </div>

                {/* Status */}
                <div className="flex items-center gap-2.5 mb-4">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      product.status === "Live"
                        ? "bg-[var(--2pt-green)] animate-pulse"
                        : "bg-[var(--2pt-black)]/30"
                    }`}
                  />
                  <span className="text-[10px] tracking-[0.25em] text-[var(--2pt-black)]/50 font-mono uppercase">
                    {product.status}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-[var(--2pt-black)] mb-3">
                  {product.name}
                </h3>

                {/* Tagline */}
                <p className="text-base md:text-lg text-[var(--2pt-black)]/65 leading-relaxed mb-4">
                  {product.tagline}
                </p>

                {/* Description */}
                <p className="text-[14px] text-[var(--2pt-black)]/55 leading-relaxed mb-8 flex-1">
                  {product.description}
                </p>

                {/* CTA */}
                {product.cta.external ? (
                  <a
                    href={product.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 text-[11px] font-mono tracking-[0.18em] uppercase text-[var(--2pt-black)] hover:text-[var(--2pt-green)] transition-colors duration-500 self-start"
                  >
                    <span className="border-b border-[var(--2pt-black)] group-hover:border-[var(--2pt-green)] pb-0.5 transition-colors duration-500">
                      {product.cta.label}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500" />
                  </a>
                ) : (
                  <a
                    href={product.cta.href}
                    className="group inline-flex items-center gap-2.5 text-[11px] font-mono tracking-[0.18em] uppercase text-[var(--2pt-black)] hover:text-[var(--2pt-green)] transition-colors duration-500 self-start"
                  >
                    <span className="border-b border-[var(--2pt-black)] group-hover:border-[var(--2pt-green)] pb-0.5 transition-colors duration-500">
                      {product.cta.label}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-500" />
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
