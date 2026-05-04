"use client"

import type { CSSProperties } from "react"
import { PROJECTS, type Project } from "@/lib/portfolio/data"
import { PLACEHOLDER_COMPONENTS } from "./placeholders"

interface SplitVisualPanelProps {
  activeProject: Project | null
  prevProject: Project | null
  transitioning: boolean
}

export function SplitVisualPanel({ activeProject, prevProject, transitioning }: SplitVisualPanelProps) {
  const renderVisual = (project: Project, layerStyle: CSSProperties) => {
    const PlaceholderComp = PLACEHOLDER_COMPONENTS[project.placeholder.shape]
    return (
      <div style={{ position: "absolute", inset: 0, ...layerStyle }}>
        {project.img ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.img || "/placeholder.svg"}
              alt={project.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
            />
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(160deg, rgba(13,13,13,0.55) 0%, rgba(13,13,13,0.25) 100%)",
              }}
            />
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background: project.placeholder.bg[0],
                opacity: 0.35,
                mixBlendMode: "color",
              }}
            />
          </>
        ) : (
          <>
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(ellipse at 55% 45%, ${project.placeholder.bg[1]} 0%, ${project.placeholder.bg[0]} 55%, ${project.placeholder.bg[2]} 100%)`,
              }}
            />
            <div style={{ position: "absolute", inset: 0 }}>
              <PlaceholderComp color={project.accent} />
            </div>
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(90deg, rgba(13,13,13,0.5) 0%, transparent 30%)",
              }}
            />
          </>
        )}
      </div>
    )
  }

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Base layer */}
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "#0A0A0A" }} />

      {/* Outgoing */}
      {prevProject &&
        renderVisual(prevProject, {
          transition:
            "opacity 0.65s cubic-bezier(0.76,0,0.24,1), transform 0.75s cubic-bezier(0.76,0,0.24,1)",
          opacity: 0,
          transform: transitioning ? "scale(1.04)" : "scale(1)",
        })}

      {/* Incoming */}
      {activeProject &&
        renderVisual(activeProject, {
          transition:
            "opacity 0.65s cubic-bezier(0.76,0,0.24,1), transform 0.75s cubic-bezier(0.76,0,0.24,1)",
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? "scale(1.06)" : "scale(1)",
        })}

      {/* Metadata badge */}
      {activeProject && (
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 40,
            right: 40,
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? "translateY(10px)" : "translateY(0)",
            transition: "all 0.5s ease 0.15s",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 9,
                letterSpacing: "0.28em",
                color: activeProject.accent,
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              {activeProject.category}
            </div>
            <div style={{ fontSize: 12, color: "rgba(242,239,233,0.5)", letterSpacing: "0.1em" }}>
              {activeProject.location}
            </div>
          </div>
          <div
            style={{
              fontSize: 9,
              letterSpacing: "0.2em",
              color: "rgba(242,239,233,0.25)",
              textTransform: "uppercase",
            }}
          >
            {activeProject.img ? "foto real" : "render conceptual"}
          </div>
        </div>
      )}

      {/* Indicator bars */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "50%",
          right: 24,
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {PROJECTS.map((p) => (
          <div
            key={p.id}
            style={{
              width: 2,
              height: activeProject?.id === p.id ? 28 : 10,
              background: activeProject?.id === p.id ? p.accent : "rgba(242,239,233,0.15)",
              transition: "all 0.4s cubic-bezier(0.76,0,0.24,1)",
              borderRadius: 1,
            }}
          />
        ))}
      </div>
    </div>
  )
}
