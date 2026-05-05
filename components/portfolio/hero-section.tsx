"use client"

import { useEffect, useState } from "react"

/**
 * HeroSection — Julieta Méndez · Arquitecta
 * ─────────────────────────────────────────
 * Fuentes requeridas (agregar en <head> o globals.css):
 *
 * @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
 *
 * Variables CSS requeridas (agregar en :root o globals.css):
 *   --font-serif: 'Cormorant Garamond', Georgia, serif;
 *   --font-sans:  'DM Sans', system-ui, sans-serif;
 */

const styles = {
  // ── Tokens ──────────────────────────────────────────────────────────────
  ink: "#0d0c0a",
  paper: "#f4f1ec",
  gold: "#b89566",
  goldLight: "#c9a87c",
  stone: "#8c8880",
  dust: "#d4cfc8",
  linen: "#ece8e1",
}

/** Animación de entrada staggered */
function useEntrance(delay = 0) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setReady(true), delay)
    return () => clearTimeout(t)
  }, [delay])
  return ready
}

// ── Sub-componentes ────────────────────────────────────────────────────────

function Nav({ visible }) {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: "clamp(28px, 4vh, 44px)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-12px)",
        transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
      }}
    >

      <ul style={{ display: "flex", gap: 36, listStyle: "none", margin: 0, padding: 0 }}>
        {["proyectos", "Proceso", "Estudio", "Contacto"].map((item) => (
          <li key={item}>
            <NavLink href={`#${item.toLowerCase()}`}>{item}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function NavLink({ href, children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-sans, 'DM Sans', sans-serif)",
        fontSize: 10.5,
        fontWeight: 400,
        letterSpacing: "0.2em",
        color: hovered ? styles.dust : styles.stone,
        textDecoration: "none",
        textTransform: "uppercase",
        transition: "color 0.3s ease",
      }}
    >
      {children}
    </a>
  )
}

function BackgroundPanel() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0, right: 0,
        width: "52%",
        height: "100%",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {/* Gradiente de integración izquierda */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(90deg, ${styles.ink} 0%, rgba(13,12,10,0.55) 35%, rgba(13,12,10,0.1) 100%)`,
          zIndex: 2,
        }}
      />
      {/* Imagen — reemplazar con tu foto de obra */}
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: "url('/cc3.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(15%) contrast(1.05)",
          // Pan sutil: agregar keyframe en globals.css si se desea
        }}
      />
    </div>
  )
}

function AnimatedName({ visible }) {
  const words = [
    { text: "Julieta", italic: true, weight: 300, transform: "none" },
    { text: "Bruzzese", italic: false, weight: 600, transform: "uppercase" },
  ]

  return (
    <div style={{ marginBottom: 0 }}>
      {words.map((w, i) => (
        <div key={w.text} style={{ overflow: "hidden", lineHeight: 1 }}>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-serif, 'Cormorant Garamond', serif)",
              fontWeight: w.weight,
              fontStyle: w.italic ? "italic" : "normal",
              fontSize: "clamp(66px, 10vw, 128px)",
              color: styles.paper,
              letterSpacing: w.italic ? "-0.01em" : "-0.03em",
              lineHeight: w.italic ? 0.9 : 0.95,
              textTransform: w.transform,
              transform: visible ? "translateY(0)" : "translateY(110%)",
              transition: `transform 1.1s cubic-bezier(0.76,0,0.24,1) ${0.6 + i * 0.12}s`,
            }}
          >
            {w.text}
          </span>
        </div>
      ))}
    </div>
  )
}

function ScrollIndicator({ visible }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        opacity: visible ? 1 : 0,
        transition: "opacity 1s ease 1.5s",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-sans, 'DM Sans', sans-serif)",
          fontSize: 9,
          letterSpacing: "0.3em",
          color: styles.stone,
          textTransform: "uppercase",
          writingMode: "vertical-rl",
        }}
      >
        Scroll
      </span>
      {/* Agrega en globals.css: @keyframes scrollFill { 0%{height:0%;top:0} 50%{height:100%;top:0} 51%{height:100%;top:0} 100%{height:0%;top:100%} } */}
      <div
        style={{
          width: 1,
          height: 44,
          background: "rgba(140,136,128,0.25)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0, left: 0,
            width: "100%",
            background: styles.gold,
            animation: "scrollFill 2.4s cubic-bezier(0.4,0,0.2,1) infinite",
          }}
        />
      </div>
    </div>
  )
}

// ── Componente principal ───────────────────────────────────────────────────

export function HeroSection() {
  const loaded = useEntrance(80)

  return (
    <section
      id="top"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 640,
        background: styles.ink,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Imagen de fondo ── */}
      <BackgroundPanel />

      {/* ── Textura grain (requiere keyframe o imagen) ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 2,
          opacity: 0.028,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />

      {/* ── Monograma watermark ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-serif, 'Cormorant Garamond', serif)",
          fontWeight: 600,
          fontSize: "clamp(160px, 22vw, 300px)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(180,160,130,0.05)",
          letterSpacing: "-0.04em",
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 2,
          lineHeight: 1,
          opacity: loaded ? 1 : 0,
          transition: "opacity 2s ease 1.2s",
        }}
      >
        JB
      </div>

      {/* ── Corner accent (top-left) ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "clamp(28px, 4vh, 44px)",
          left: "clamp(32px, 6vw, 80px)",
          width: 32, height: 32,
          borderTop: "1px solid rgba(180,160,130,0.2)",
          borderLeft: "1px solid rgba(180,160,130,0.2)",
          zIndex: 3,
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 0.8s",
        }}
      />

      {/* ── Corner accent (bottom-right) ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "clamp(24px, 3.5vh, 36px)",
          right: "clamp(20px, 3vw, 40px)",
          width: 28, height: 28,
          borderBottom: "1px solid rgba(180,160,130,0.15)",
          borderRight: "1px solid rgba(180,160,130,0.15)",
          zIndex: 3,
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 1.2s",
        }}
      />

      {/* ── Contador de proyectos (top-right) ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "clamp(28px, 4vh, 44px)",
          right: "clamp(20px, 3vw, 40px)",
          zIndex: 11,
          textAlign: "right",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 1s",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-serif, 'Cormorant Garamond', serif)",
            fontSize: 42,
            fontWeight: 300,
            color: "rgba(180,160,130,0.12)",
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          24
        </div>
        <div
          style={{
            fontFamily: "var(--font-sans, 'DM Sans', sans-serif)",
            fontSize: 9,
            letterSpacing: "0.2em",
            color: styles.stone,
            textTransform: "uppercase",
            opacity: 0.5,
            marginTop: 2,
          }}
        >
          Proyectos
        </div>
      </div>

      {/* ── Contenido principal ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          padding: "0 clamp(32px, 6vw, 80px)",
          justifyContent: "space-between",
        }}
      >
        <Nav visible={loaded} />

        {/* ── Bloque de texto principal ── */}
        <div style={{ paddingBottom: "clamp(48px, 8vh, 88px)", maxWidth: 620 }}>

          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: "clamp(24px, 3.5vh, 36px)",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s",
            }}
          >
            <div style={{ width: 28, height: 1, background: styles.gold, flexShrink: 0 }} />
            <span
              style={{
                fontFamily: "var(--font-sans, 'DM Sans', sans-serif)",
                fontSize: 10,
                fontWeight: 400,
                letterSpacing: "0.3em",
                color: styles.gold,
                textTransform: "uppercase",
              }}
            >
              Arquitecta · Buenos Aires, AR
            </span>
          </div>

          {/* Nombre animado */}
          <AnimatedName visible={loaded} />

          {/* Disciplina (italic, color gold) */}
          <div style={{ overflow: "hidden", marginTop: "clamp(10px, 1.5vh, 18px)" }}>
            <span
              style={{
                display: "block",
                fontFamily: "var(--font-serif, 'Cormorant Garamond', serif)",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(18px, 2.5vw, 28px)",
                color: styles.goldLight,
                letterSpacing: "0.04em",
                transform: loaded ? "translateY(0)" : "translateY(110%)",
                transition: "transform 1s cubic-bezier(0.76,0,0.24,1) 0.88s",
              }}
            >
              Arquitectura · Interiorismo · Espacio
            </span>
          </div>

          {/* Descripción */}
          <p
            style={{
              fontFamily: "var(--font-sans, 'DM Sans', sans-serif)",
              fontSize: "clamp(13px, 1.2vw, 15px)",
              fontWeight: 300,
              lineHeight: 1.8,
              color: styles.stone,
              maxWidth: 380,
              marginTop: "clamp(24px, 3.5vh, 40px)",
              marginBottom: "clamp(32px, 4.5vh, 52px)",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.9s ease 1.1s, transform 0.9s ease 1.1s",
            }}
          >
            Cada proyecto es una conversación entre materia y silencio.
            Diseño espacios que perduran — precisos en su estructura, honestos en su materialidad.
          </p>

          {/* CTAs */}
          <CTARow visible={loaded} />
        </div>
      </div>

      {/* ── Info vertical (right edge) ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "clamp(20px, 3vw, 40px)",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          opacity: loaded ? 0.7 : 0,
          transition: "opacity 1s ease 1.6s",
          pointerEvents: "none",
        }}
      >
        {["Buenos Aires — AR", "2009 — 2024"].map((t) => (
          <span
            key={t}
            style={{
              writingMode: "vertical-rl",
              fontFamily: "var(--font-sans, 'DM Sans', sans-serif)",
              fontSize: 9,
              fontWeight: 400,
              letterSpacing: "0.25em",
              color: styles.stone,
              textTransform: "uppercase",
            }}
          >
            {t}
          </span>
        ))}
        <div
          style={{
            width: 1, height: 52,
            background: `linear-gradient(180deg, ${styles.stone} 0%, transparent 100%)`,
            opacity: 0.4,
          }}
        />
      </div>

      {/* ── Barra inferior ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          padding: "0 clamp(32px, 6vw, 80px) clamp(24px, 3.5vh, 36px)",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 1.5s",
          pointerEvents: "none",
        }}
      >
        <ScrollIndicator visible={loaded} />

        {/* Dots de paginación */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: 4, height: 4,
                borderRadius: "50%",
                background: i === 0 ? styles.gold : styles.stone,
                opacity: i === 0 ? 1 : 0.3,
              }}
            />
          ))}
        </div>


      </div>

    </section>
  )
}

// ── CTA Row ───────────────────────────────────────────────────────────────

function CTARow({ visible }) {
  const [primaryHovered, setPrimaryHovered] = useState(false)
  const [secondaryHovered, setSecondaryHovered] = useState(false)

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 32,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.9s ease 1.3s, transform 0.9s ease 1.3s",
      }}
    >
      <a
        href="#proyectos"
        onMouseEnter={() => setPrimaryHovered(true)}
        onMouseLeave={() => setPrimaryHovered(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 14,
          fontFamily: "var(--font-sans, 'DM Sans', sans-serif)",
          fontSize: 10.5,
          fontWeight: 500,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#0d0c0a",
          background: primaryHovered ? "#c9a87c" : "#b89566",
          padding: "15px 32px",
          textDecoration: "none",
          cursor: "pointer",
          transition: "background 0.35s ease",
        }}
      >
        Ver Proyectos Realizados
        <span
          style={{
            display: "inline-block",
            fontSize: 13,
            transform: primaryHovered ? "translateX(4px)" : "translateX(0)",
            transition: "transform 0.3s ease",
          }}
        >
          →
        </span>
      </a>

      <a
        href="#estudio"
        onMouseEnter={() => setSecondaryHovered(true)}
        onMouseLeave={() => setSecondaryHovered(false)}
        style={{
          fontFamily: "var(--font-sans, 'DM Sans', sans-serif)",
          fontSize: 10.5,
          fontWeight: 400,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: secondaryHovered ? "#d4cfc8" : "#8c8880",
          textDecoration: "none",
          cursor: "pointer",
          borderBottom: secondaryHovered ? "1px solid #b89566" : "1px solid transparent",
          paddingBottom: 2,
          transition: "color 0.3s, border-color 0.3s",
        }}
      >
        Sobre Mi
      </a>
    </div>
  )
}

/**
 * globals.css — agregar estos keyframes:
 *
 * @keyframes scrollFill {
 *   0%   { height: 0%;   top: 0;    }
 *   50%  { height: 100%; top: 0;    }
 *   51%  { height: 100%; top: 0;    }
 *   100% { height: 0%;   top: 100%; }
 * }
 */