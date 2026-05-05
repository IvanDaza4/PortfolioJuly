"use client"

import { useEffect, useState } from "react"

interface HeaderProps {
  menuOpen?: boolean
  setMenuOpen?: (open: boolean) => void
}

export function Header({ menuOpen = false, setMenuOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 700,
        padding: "32px clamp(24px, 5vw, 48px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: scrolled ? "rgba(13,13,13,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(242,239,233,0.06)" : "1px solid transparent",
        transition: "all 0.4s ease",
      }}
    >
      <a
        href="/"
        data-hover
        aria-label="Inicio · Julieta Arquitectura"
        style={{
          display: "flex",
          flexDirection: "column",
          lineHeight: 1,
          textDecoration: "none",
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "var(--off-white)",
            letterSpacing: "0.08em",
            fontFamily: "var(--font-sans)",
            textTransform: "uppercase",
          }}
        >
          Julieta
        </span>
        <span
          style={{
            fontSize: 9,
            letterSpacing: "0.38em",
            color: "var(--oak)",
            textTransform: "uppercase",
            marginTop: 2,
          }}
        >
          Arquitectura
        </span>
      </a>

      <button
        onClick={() => setMenuOpen?.(!menuOpen)}
        data-hover
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          gap: 5,
          padding: 8,
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            aria-hidden
            style={{
              display: "block",
              width: i === 1 ? 24 : 32,
              height: 1,
              background: "var(--off-white)",
              transition: "width 0.3s ease",
            }}
          />
        ))}
      </button>
    </header>
  )
}
