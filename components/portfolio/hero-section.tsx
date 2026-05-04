"use client"

import { useEffect, useState } from "react"

export function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 100)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <section
      id="top"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 700,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        overflow: "hidden",
        background: "var(--iron-deep)",
      }}
    >
      {/* Geometric background */}
      <div aria-hidden style={{ position: "absolute", inset: 0 }}>
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "-5%",
            width: "55vw",
            height: "80vh",
            background: "linear-gradient(135deg, rgba(184,149,106,0.06) 0%, rgba(184,149,106,0.01) 100%)",
            border: "1px solid rgba(184,149,106,0.08)",
            transform: loaded ? "translateX(0) rotate(-2deg)" : "translateX(60px) rotate(-2deg)",
            transition: "transform 1.4s cubic-bezier(0.76,0,0.24,1) 0.3s",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "22%",
            right: "8%",
            width: "38vw",
            height: "55vh",
            background: "linear-gradient(135deg, rgba(200,196,188,0.04) 0%, transparent 100%)",
            border: "1px solid rgba(200,196,188,0.06)",
            transform: loaded ? "translateX(0) rotate(1deg)" : "translateX(40px) rotate(1deg)",
            transition: "transform 1.6s cubic-bezier(0.76,0,0.24,1) 0.5s",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: 1,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(184,149,106,0.15) 30%, rgba(184,149,106,0.05) 70%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "62%",
            width: 1,
            background:
              "linear-gradient(180deg, transparent 0%, rgba(200,196,188,0.08) 30%, rgba(200,196,188,0.04) 70%, transparent 100%)",
          }}
        />
      </div>

      {/* Large background monogram */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          right: "6%",
          transform: "translateY(-50%)",
          fontSize: "clamp(180px, 22vw, 320px)",
          fontWeight: 800,
          color: "transparent",
          WebkitTextStroke: "1px rgba(200,196,188,0.06)",
          fontFamily: "var(--font-sans)",
          letterSpacing: "-0.05em",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1.2s ease 0.8s",
        }}
      >
        JM
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "0 clamp(24px, 5vw, 48px) 80px",
          maxWidth: 680,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 0.4s",
          }}
        >
          <div style={{ width: 32, height: 1, background: "var(--oak)" }} />
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.25em",
              color: "var(--oak)",
              textTransform: "uppercase",
            }}
          >
            Portfolio 2024
          </span>
        </div>

        <h1
          style={{
            fontSize: "clamp(52px, 8vw, 112px)",
            fontWeight: 700,
            color: "var(--off-white)",
            fontFamily: "var(--font-sans)",
            letterSpacing: "-0.04em",
            lineHeight: 0.92,
            textTransform: "uppercase",
            marginBottom: 40,
          }}
        >
          {["Julieta", "Méndez"].map((word, wi) => (
            <span key={word} style={{ overflow: "hidden", display: "block" }}>
              <span
                style={{
                  display: "block",
                  transform: loaded ? "translateY(0)" : "translateY(110%)",
                  transition: `transform 0.9s cubic-bezier(0.76,0,0.24,1) ${0.5 + wi * 0.12}s`,
                }}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        <p
          style={{
            fontSize: 15,
            color: "var(--cement)",
            lineHeight: 1.7,
            maxWidth: 420,
            marginBottom: 48,
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.8s ease 0.9s",
          }}
        >
          Arquitectura de precisión material. Espacios que articulan silencio, escala y emoción.
        </p>

        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.8s ease 1.1s",
          }}
        >
          <a
            href="#proyectos"
            data-hover
            style={{
              display: "inline-block",
              background: "none",
              border: "1px solid rgba(242,239,233,0.2)",
              color: "var(--off-white)",
              padding: "16px 40px",
              fontSize: 11,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "inherit",
              textDecoration: "none",
              position: "relative",
              overflow: "hidden",
              transition: "border-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--oak)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(242,239,233,0.2)")}
          >
            Explorar obra
          </a>
        </div>
      </div>

      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 40,
          right: "clamp(24px, 5vw, 48px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          opacity: loaded ? 0.5 : 0,
          transition: "opacity 0.8s ease 1.4s",
        }}
      >
        <span
          style={{
            fontSize: 9,
            letterSpacing: "0.25em",
            color: "var(--cement)",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 48,
            background: "linear-gradient(180deg, var(--oak) 0%, transparent 100%)",
            animation: "scrollPulse 2s ease infinite",
          }}
        />
      </div>
    </section>
  )
}
