"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Custom cursor with a follower ring. Auto-disabled on touch / coarse pointers.
 * Listens for `[data-hover]`, `a`, `button` to enlarge the follower.
 */
export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse / trackpad)
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)")
    setEnabled(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (!enabled) return

    let x = 0
    let y = 0
    let fx = 0
    let fy = 0
    let raf = 0

    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
    }

    const loop = () => {
      fx += (x - fx) * 0.12
      fy += (y - fy) * 0.12
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${x}px, ${y}px)`
      }
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${fx}px, ${fy}px)`
      }
      raf = requestAnimationFrame(loop)
    }

    const onEnter = () => setHovered(true)
    const onLeave = () => setHovered(false)

    const targets = document.querySelectorAll<HTMLElement>("a, button, [data-hover]")
    targets.forEach((el) => {
      el.addEventListener("mouseenter", onEnter)
      el.addEventListener("mouseleave", onLeave)
    })

    window.addEventListener("mousemove", onMove)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter)
        el.removeEventListener("mouseleave", onLeave)
      })
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={cursorRef}
        aria-hidden
        style={{
          position: "fixed",
          top: -4,
          left: -4,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--off-white)",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          transition: "opacity 0.2s",
        }}
      />
      <div
        ref={followerRef}
        aria-hidden
        style={{
          position: "fixed",
          top: -20,
          left: -20,
          width: hovered ? 56 : 40,
          height: hovered ? 56 : 40,
          borderRadius: "50%",
          border: "1px solid rgba(242,239,233,0.4)",
          pointerEvents: "none",
          zIndex: 9998,
          transition: "width 0.3s ease, height 0.3s ease",
          mixBlendMode: "difference",
        }}
      />
    </>
  )
}
