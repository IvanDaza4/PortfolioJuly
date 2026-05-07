"use client"

import { useEffect, useRef, useState } from "react"
import { PROJECTS } from "@/lib/portfolio/data"
import { SplitProjectRow } from "./split-project-row"
import { SplitVisualPanel } from "./split-visual-panel"

export function ProjectsSection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const [prevIdx, setPrevIdx] = useState<number | null>(null)
  const [transitioning, setTransitioning] = useState(false)
  const transitionRef = useRef<number | null>(null)

  const handleHover = (idx: number) => {
    if (idx === activeIdx) return
    setPrevIdx(activeIdx)
    setTransitioning(true)
    if (transitionRef.current) window.clearTimeout(transitionRef.current)
    setActiveIdx(idx)
    transitionRef.current = window.setTimeout(() => {
      setTransitioning(false)
    }, 60)
  }

  const handleLeave = () => {
    setPrevIdx(activeIdx)
    setTransitioning(true)
    if (transitionRef.current) window.clearTimeout(transitionRef.current)
    transitionRef.current = window.setTimeout(() => {
      setActiveIdx(null)
      setPrevIdx(null)
      setTransitioning(false)
    }, 400)
  }

  useEffect(() => {
    return () => {
      if (transitionRef.current) window.clearTimeout(transitionRef.current)
    }
  }, [])

  const activeProject = activeIdx !== null ? PROJECTS[activeIdx] : null
  const prevProject = prevIdx !== null ? PROJECTS[prevIdx] : null

  return (
    <section
      id="proyectos"
      aria-label="Proyectos seleccionados"
      style={{ position: "relative", background: "var(--iron-deep)", overflow: "hidden" }}
    >
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          alignItems: "stretch",
          flexWrap: "wrap",
        }}
      >
        {/* LEFT — text */}
        <div
          style={{
            flex: "1 1 480px",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "100px clamp(28px, 5vw, 56px) 80px",
            position: "relative",
            zIndex: 10,
          }}
        >
          <header style={{ marginBottom: 72 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 36, height: 1, background: "var(--oak)" }} />
              <span
                style={{
                  fontSize: 10,
                  letterSpacing: "0.32em",
                  color: "var(--oak)",
                  textTransform: "uppercase",
                }}
              >
                Obra Seleccionada
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <h2
                style={{
                  fontSize: "clamp(36px, 4.5vw, 60px)",
                  fontWeight: 700,
                  color: "var(--off-white)",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                Proyectos
              </h2>
              
            </div>
          </header>

          <div style={{ height: 1, background: "rgba(242,239,233,0.06)" }} />

          <div>
            {PROJECTS.map((project, i) => (
              <SplitProjectRow
                key={project.id}
                project={project}
                index={i}
                isActive={activeIdx === i}
                onHover={() => handleHover(i)}
                onLeave={handleLeave}
              />
            ))}
          </div>

          <div
            style={{
              marginTop: 48,
              display: "flex",
              alignItems: "center",
              gap: 12,
              opacity: activeIdx !== null ? 0 : 0.35,
              transition: "opacity 0.5s ease",
            }}
          >
            <div
              aria-hidden
              style={{
                width: 20,
                height: 1,
                background: "linear-gradient(90deg, var(--oak), transparent)",
              }}
            />
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.22em",
                color: "var(--cement)",
                textTransform: "uppercase",
              }}
            >
              Pasá el cursor sobre cada proyecto
            </span>
          </div>
        </div>

        {/* DIVIDER */}
        <div
          aria-hidden
          style={{
            width: 1,
            background: activeProject ? activeProject.accent : "rgba(242,239,233,0.06)",
            transition: "background 0.6s ease",
            flexShrink: 0,
            position: "relative",
            zIndex: 10,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: activeIdx !== null ? `${(activeIdx / (PROJECTS.length - 1)) * 70 + 15}%` : "50%",
              transform: "translate(-50%, -50%)",
              width: activeProject ? 6 : 4,
              height: activeProject ? 6 : 4,
              borderRadius: "50%",
              background: activeProject ? activeProject.accent : "rgba(242,239,233,0.2)",
              transition: "all 0.55s cubic-bezier(0.76,0,0.24,1)",
              boxShadow: activeProject ? `0 0 12px ${activeProject.accent}60` : "none",
            }}
          />
        </div>

        {/* RIGHT — visual */}
        <div
          style={{
            flex: "1 1 480px",
            minWidth: 0,
            position: "relative",
            overflow: "hidden",
            minHeight: "60vh",
          }}
        >
          <SplitVisualPanel
            activeProject={activeProject}
            prevProject={prevProject}
            transitioning={transitioning}
          />

          {/* Project name overlay */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              transform: "translateY(-50%)",
              padding: "0 48px",
              textAlign: "center",
              pointerEvents: "none",
              zIndex: 5,
            }}
          >
            {PROJECTS.map((p, i) => (
              <div
                key={p.id}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: activeIdx === i && !transitioning ? 1 : 0,
                  transform:
                    activeIdx === i && !transitioning ? "translateY(0)" : "translateY(16px)",
                  transition:
                    "opacity 0.55s ease 0.1s, transform 0.55s cubic-bezier(0.76,0,0.24,1) 0.1s",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(28px, 4vw, 52px)",
                    fontWeight: 700,
                    color: "rgba(242,239,233,0.08)",
                    fontFamily: "var(--font-sans)",
                    letterSpacing: "-0.04em",
                    textTransform: "uppercase",
                    textAlign: "center",
                    WebkitTextStroke: `1px ${p.accent}30`,
                  }}
                >
                  {p.name}
                </span>
              </div>
            ))}
          </div>

          {/* Empty state */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: activeProject ? 0 : 1,
              transition: "opacity 0.5s ease",
              pointerEvents: "none",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "clamp(60px, 8vw, 100px)",
                  fontWeight: 800,
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(200,196,188,0.06)",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "-0.05em",
                  lineHeight: 1,
                  marginBottom: 20,
                }}
              >
                OBRA
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div style={{ width: 1, height: 40, background: "rgba(242,239,233,0.08)" }} />
                <span
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.3em",
                    color: "rgba(242,239,233,0.15)",
                    textTransform: "uppercase",
                  }}
                >
                  Explorar
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
