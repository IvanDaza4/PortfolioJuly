"use client"

import { useEffect } from "react"
import { SECTIONS } from "@/lib/portfolio/data"

interface MenuOverlayProps {
  open: boolean
  onClose: () => void
}

export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  // Lock body scroll while open + close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menú principal"
      aria-hidden={!open}
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--iron-deep)",
        zIndex: 800,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 8vw",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "all" : "none",
        transition: "opacity 0.6s cubic-bezier(0.76,0,0.24,1)",
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 40,
          right: 48,
          background: "none",
          border: "none",
          color: "var(--off-white)",
          cursor: "pointer",
          fontSize: 13,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontFamily: "inherit",
          opacity: 0.6,
        }}
      >
        Cerrar
      </button>

      <nav aria-label="Navegación principal">
        {SECTIONS.map((item, i) => (
          <a
            key={item.id}
            href={`/#${item.id}`}
            onClick={onClose}
            data-hover
            style={{
              display: "block",
              overflow: "hidden",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 24,
                borderBottom: "1px solid rgba(242,239,233,0.08)",
                padding: "28px 0",
                transform: open ? "translateY(0)" : "translateY(100%)",
                transition: `transform 0.7s cubic-bezier(0.76,0,0.24,1) ${i * 0.08 + 0.1}s`,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  color: "var(--oak)",
                  fontFamily: "var(--font-serif)",
                  minWidth: 28,
                }}
              >
                0{i + 1}
              </span>
              <span
                style={{
                  fontSize: "clamp(36px, 7vw, 88px)",
                  fontWeight: 700,
                  color: "var(--off-white)",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  textTransform: "uppercase",
                }}
              >
                {item.label}
              </span>
            </div>
          </a>
        ))}
      </nav>

      <div
        style={{
          position: "absolute",
          bottom: 48,
          right: 48,
          textAlign: "right",
          opacity: open ? 1 : 0,
          transition: "opacity 0.6s 0.5s",
        }}
      >
        <p style={{ color: "var(--cement)", fontSize: 12, letterSpacing: "0.12em", marginBottom: 6 }}>
          BUENOS AIRES · AR
        </p>
        <a
          href="mailto:hola@julietaarq.com"
          data-hover
          style={{
            color: "var(--oak)",
            fontSize: 12,
            letterSpacing: "0.12em",
            textDecoration: "none",
          }}
        >
          julybruzz@gmail.com
        </a>
      </div>
    </div>
  )
}
