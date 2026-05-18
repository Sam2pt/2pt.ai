"use client"

import React from "react"

import { useRef, useState, ReactNode } from "react"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  href?: string
  strength?: number
  onClick?: (e: React.MouseEvent) => void
}

export function MagneticButton({ children, className = "", href, strength = 0.3, onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null)
  const [transform, setTransform] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength

    setTransform({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 })
  }

  const style = {
    transform: `translate(${transform.x}px, ${transform.y}px)`,
    transition: transform.x === 0 && transform.y === 0
      ? "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
      : "transform 0.1s ease-out",
  }

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={className}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={className}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
