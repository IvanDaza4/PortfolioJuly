"use client"

import { useEffect, useRef, useState } from "react"
import { TimelineItem, type TimelineEntry } from "./timeline-item"

const TIMELINE: TimelineEntry[] = [
  {
    year: "2018",
    text: "Licenciatura en Arquitectura — Universidad de Buenos Aires (UBA). Tesis con distinción: «Interfaces materiales entre lo construido y el paisaje».",
  },
  {
    year: "2019",
    text: "Ingresa al estudio RCR Arquitectes, Olot (España). Trabaja en proyectos de espacio público y paisajismo de escala urbana.",
  },
  {
    year: "2020",
    text: "Regresa a Buenos Aires y funda su práctica independiente. Primer proyecto propio: Loft Palermo, distinguido por el CAD.",
  },
  {
    year: "2022",
    text: "Premio Nacional de Arquitectura · Categoría Obra Nueva. Bodega Altura es seleccionada para la Bienal Iberoamericana.",
  },
  {
    year: "2024",
    text: "Docente invitada en FADU-UBA. Estudio activo con cinco proyectos en curso entre arquitectura residencial y cultural.",
  },
]

const SKILLS = [
  "Diseño Arquitectónico",
  "Interiorismo",
  "Paisajismo",
  "Dirección de Obra",
  "BIM / Revit",
  "Render fotorrealista",
  "Espacio Cultural",
  "Docencia",
] as const



export function AboutSection() {
  const [visible, setVisible] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [cvHovered, setCvHovered] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.15 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="estudio"
      ref={sectionRef}
      aria-label="Sobre el estudio"
      style={{
        background: "var(--iron-soft)",
        padding: "140px clamp(24px, 5vw, 48px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 48,
          right: 48,
          height: 1,
          background:
            "linear-gradient(90deg, var(--oak) 0%, rgba(184,149,106,0.1) 60%, transparent 100%)",
        }}
      />

      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          right: "-4%",
          transform: "translateY(-50%)",
          fontSize: "clamp(120px, 18vw, 260px)",
          fontWeight: 800,
          color: "transparent",
          WebkitTextStroke: "1px rgba(200,196,188,0.04)",
          fontFamily: "var(--font-sans)",
          letterSpacing: "-0.05em",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        BIO
      </div>

      <div style={{ maxWidth: 1200, position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 80,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.8s ease",
          }}
        >
          <div style={{ width: 48, height: 1, background: "var(--oak)" }} />
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.3em",
              color: "var(--oak)",
              textTransform: "uppercase",
            }}
          >
            Sobre mí
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "60px 80px",
            alignItems: "start",
          }}
        >
          {/* Photo */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-32px)",
              transition: "all 1s cubic-bezier(0.76,0,0.24,1) 0.1s",
            }}
          >
            <div
              style={{
                position: "relative",
                aspectRatio: "3 / 4",
                maxHeight: 600,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(160deg, #2A2520 0%, #1A1510 40%, #0D0A07 100%)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src="/fotoperfil.jpeg"
                  alt="Julieta Bruzzese — Arquitecta"
                  onError={() => setImgError(true)}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    display: imgError ? "none" : "block",
                    filter: "grayscale(8%) contrast(1.04)",
                  }}
                />

                <svg
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0.06,
                  }}
                >
                  <filter id="photoGrain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
                    <feColorMatrix type="saturate" values="0" />
                  </filter>
                  <rect width="100%" height="100%" filter="url('/fotoperfil.jpeg')" />
                </svg>

                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "20px 24px",
                    background: "linear-gradient(0deg, rgba(13,10,7,0.9) 0%, transparent 100%)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.2em",
                      color: "var(--oak)",
                      textTransform: "uppercase",
                    }}
                  >
                    Estudio · CABA
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.15em",
                      color: "rgba(242,239,233,0.3)",
                    }}
                  >
                    2026
                  </span>
                </div>
              </div>

              <div
                aria-hidden
                style={{
                  position: "absolute",
                  top: -1,
                  left: -1,
                  width: 32,
                  height: 32,
                  borderTop: "2px solid var(--oak)",
                  borderLeft: "2px solid var(--oak)",
                  pointerEvents: "none",
                }}
              />
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  bottom: -1,
                  right: -1,
                  width: 32,
                  height: 32,
                  borderBottom: "2px solid var(--oak)",
                  borderRight: "2px solid var(--oak)",
                  pointerEvents: "none",
                }}
              />
            </div>

            <figure
              style={{
                marginTop: 32,
                paddingLeft: 20,
                borderLeft: "2px solid rgba(184,149,106,0.3)",
              }}
            >
              <blockquote
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: "var(--cement)",
                  lineHeight: 1.75,
                  fontStyle: "italic",
                }}
              >
                &ldquo;Proyecto desde la convicción de que la arquitectura tiene el poder de
                transformar la experiencia cotidiana en algo digno de ser recordado.&rdquo;
              </blockquote>
              <figcaption
                style={{
                  display: "block",
                  marginTop: 12,
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  color: "var(--oak)",
                  textTransform: "uppercase",
                }}
              >
                — Julieta, 2026
              </figcaption>
            </figure>

            {/* ─── CV Download Button ─────────────────────────────────────── */}
            <a
              href="/Julieta Bruzzese Estraviz - CV.pdf"
              download
              aria-label="Descargar CV de Julieta Bruzzese en PDF"
              onMouseEnter={() => setCvHovered(true)}
              onMouseLeave={() => setCvHovered(false)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                marginTop: 32,
                padding: "14px 24px",
                border: `1px solid ${cvHovered ? "var(--oak)" : "rgba(200,196,188,0.15)"}`,
                color: cvHovered ? "var(--oak)" : "var(--cement)",
                textDecoration: "none",
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                transition: "all 0.3s ease",
                background: cvHovered ? "rgba(184,149,106,0.06)" : "transparent",
                cursor: "pointer",
              }}
            >
              {/* Download icon */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                style={{
                  color: cvHovered ? "var(--oak)" : "var(--cement)",
                  transition: "transform 0.3s ease",
                  transform: cvHovered ? "translateY(2px)" : "translateY(0)",
                  flexShrink: 0,
                }}
              >
                <path
                  d="M12 3v13M12 16l-4-4M12 16l4-4M3 20h18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Descargar CV
              {/* Right accent line */}
              <span
                style={{
                  display: "inline-block",
                  width: cvHovered ? 24 : 12,
                  height: 1,
                  background: cvHovered ? "var(--oak)" : "rgba(200,196,188,0.3)",
                  transition: "all 0.3s ease",
                  marginLeft: 4,
                }}
              />
            </a>
            {/* ──────────────────────────────────────────────────────────────── */}

          </div>

          {/* Content */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(32px)",
              transition: "all 1s cubic-bezier(0.76,0,0.24,1) 0.25s",
            }}
          >
            <div style={{ marginBottom: 40 }}>
              <h2
                style={{
                  fontSize: "clamp(36px, 5vw, 72px)",
                  fontWeight: 700,
                  color: "var(--off-white)",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                  lineHeight: 0.95,
                  marginBottom: 16,
                }}
              >
                Julieta
                <br />
                <span style={{ color: "var(--oak)" }}>Bruzzese</span>
              </h2>
              <p
                style={{
                  fontSize: 12,
                  letterSpacing: "0.22em",
                  color: "var(--ghost)",
                  textTransform: "uppercase",
                }}
              >
                Arquitecta · Buenos Aires
              </p>
            </div>

            <div style={{ marginBottom: 56 }}>
              <p style={{ fontSize: 15, color: "var(--cement)", lineHeight: 1.85, marginBottom: 20 }}>
                Soy estudiante de cuarto año de la carrera de Arquitectura en la Universidad de Buenos Aires (FADU),
                y complemento mi perfil académico con formación especializada en Diseño de Interiores, cursada en DFA
                Design durante el período 2022-2023. Cuento con un sólido manejo de herramientas digitales y una
                comprensión integral de todo el proceso constructivo.
              </p>
              <p style={{ fontSize: 15, color: "var(--cement)", lineHeight: 1.85, marginBottom: 20 }}>
                A lo largo de mis más de dos años de experiencia profesional en un estudio de arquitectura, me he
                desempeñado principalmente como dibujante. Mi trabajo diario abarca el desarrollo detallado de planos
                técnicos y ejecutivos, así como el dibujo y la coordinación de instalaciones eléctricas, sanitarias
                y afines. Además, tengo a mi cargo el armado y la actualización constante de la documentación de obra.
              </p>
              <p style={{ fontSize: 15, color: "var(--cement)", lineHeight: 1.85 }}>
                Más allá del trabajo técnico, brindo apoyo activo en tareas de proyecto, realizando los ajustes
                necesarios según los requerimientos específicos del estudio. Esta experiencia de gabinete se completa
                con mi participación en visitas y seguimiento de obra, lo que me permite conectar la precisión
                de la planimetría con la realidad material de la ejecución.
              </p>
            </div>

            <div
              aria-hidden
              style={{
                height: 1,
                background:
                  "linear-gradient(90deg, rgba(184,149,106,0.4) 0%, rgba(184,149,106,0.05) 100%)",
                marginBottom: 48,
              }}
            />

            <div
              style={{
                marginTop: 56,
                paddingTop: 40,
                borderTop: "1px solid rgba(242,239,233,0.06)",
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              {SKILLS.map((skill) => (
                <span
                  key={skill}
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--cement)",
                    border: "1px solid rgba(200,196,188,0.12)",
                    padding: "7px 14px",
                    transition: "all 0.25s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--oak)"
                    e.currentTarget.style.color = "var(--oak)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(200,196,188,0.12)"
                    e.currentTarget.style.color = "var(--cement)"
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}