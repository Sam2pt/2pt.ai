"use client"

import { useEffect, useRef, useState } from "react"

/**
 * useInView — for the mobile DeployConsole, flips to `true` on mount.
 *
 * The cards live inside a scroll-snap container; the IntersectionObserver
 * approach turned out to be inconsistent across browsers when the cards
 * are h-[100dvh] and the snap mechanic snaps the next card into view.
 * Since each card only renders once, "in view" is effectively "mounted"
 * — we just flip the flag right after first paint to kick off the
 * card's reveal animations.
 */
export function useInView<T extends HTMLElement>(
  _threshold = 0.6,
  delayMs = 60
) {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delayMs)
    return () => clearTimeout(t)
  }, [delayMs])

  return { ref, visible }
}
