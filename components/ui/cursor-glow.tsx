"use client"

import { useEffect, useState, useCallback } from "react"

export function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(true)
  const [isClicking, setIsClicking] = useState(false)

  const updatePosition = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
    setIsHidden(false)

    const target = e.target as HTMLElement
    const isPointerElement =
      window.getComputedStyle(target).cursor === "pointer" ||
      target.tagName === "A" ||
      target.tagName === "BUTTON" ||
      target.closest("a") ||
      target.closest("button")
    setIsPointer(!!isPointerElement)
  }, [])

  useEffect(() => {
    const onDown = () => setIsClicking(true)
    const onUp = () => setIsClicking(false)
    const onLeave = () => setIsHidden(true)
    const onEnter = () => setIsHidden(false)

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mousedown", onDown)
    window.addEventListener("mouseup", onUp)
    window.addEventListener("mouseleave", onLeave)
    window.addEventListener("mouseenter", onEnter)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousedown", onDown)
      window.removeEventListener("mouseup", onUp)
      window.removeEventListener("mouseleave", onLeave)
      window.removeEventListener("mouseenter", onEnter)
    }
  }, [updatePosition])

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null
  }

  return (
    <>
      {/* Main dot — black, small, slightly bigger over interactive elements */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${
            isClicking ? 0.75 : isPointer ? 1.6 : 1
          })`,
          opacity: isHidden ? 0 : 1,
          transition:
            "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
        }}
      >
        <div
          className="w-2.5 h-2.5 rounded-full bg-[var(--2pt-black)]"
          style={{
            boxShadow: isPointer
              ? "0 0 18px 4px rgba(10, 10, 10, 0.18)"
              : "0 0 10px 2px rgba(10, 10, 10, 0.1)",
          }}
        />
      </div>

      {/* Trailing halo — green brand glow with smooth lerp damping.
          The dot leads sharp, the halo trails soft. Reads as a deliberate
          brand moment, not generic cursor decoration. */}
      <div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
          opacity: isHidden ? 0 : isPointer ? 0.9 : 0.6,
          transition:
            "left 0.55s cubic-bezier(0.16, 1, 0.3, 1), top 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease",
        }}
      >
        <div
          className="rounded-full"
          style={{
            width: isPointer ? 120 : 80,
            height: isPointer ? 120 : 80,
            transition: "width 0.4s ease, height 0.4s ease",
            background:
              "radial-gradient(circle, rgba(74, 222, 128, 0.22) 0%, rgba(74, 222, 128, 0.08) 35%, transparent 70%)",
            filter: "blur(2px)",
          }}
        />
      </div>
    </>
  )
}
