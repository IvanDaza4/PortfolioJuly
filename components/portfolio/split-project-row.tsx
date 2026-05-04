"use client"

import Link from "next/link"
import type { Project } from "@/lib/portfolio/data"

interface SplitProjectRowProps {
  project: Project
  index: number
  isActive: boolean
  onHover: () => void
  onLeave: () => void
}

export function SplitProjectRow({ project, isActive, onHover, onLeave }: SplitProjectRowProps) {
  const subCategory = project.category.split("·")[1]?.trim()
  const mainCategory = project.category.split("·")[0]?.trim()

  const galleryCount = project.gallery?.length ?? 0

  return (
    <Link
      href={`/proyecto/${project.id}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      data-hover
      className="focus-visible:outline-none focus-visible:ring-2"
      style={{
        padding: "28px 0",
        borderBottom: "1px solid rgba(242,239,233,0.06)",
        cursor: "pointer",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        ["--tw-ring-color" as string]: project.accent,
      }}
    >
      {/* Accent bar */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: -56,
          top: 0,
          bottom: 0,
          width: 3,
          background: project.accent,
          transform: isActive ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "top",
          transition: "transform 0.45s cubic-bezier(0.76,0,0.24,1)",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 20,
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 20, minWidth: 0 }}>
          <span
            style={{
              fontSize: 11,
              color: isActive ? project.accent : "var(--ghost-deep)",
              fontFamily: "var(--font-serif)",
              letterSpacing: "0.08em",
              transition: "color 0.35s ease",
              minWidth: 24,
            }}
          >
            {project.id}
          </span>

          <h3
            style={{
              fontSize: "clamp(20px, 2.8vw, 38px)",
              fontWeight: 700,
              color: isActive ? "var(--off-white)" : "#4A4A4A",
              fontFamily: "var(--font-sans)",
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              lineHeight: 1,
              transition: "color 0.35s ease",
            }}
          >
            {project.name}
          </h3>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            opacity: isActive ? 1 : 0,
            transform: isActive ? "translateX(0)" : "translateX(-12px)",
            transition: "all 0.4s cubic-bezier(0.76,0,0.24,1)",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.15em",
              color: project.accent,
              textTransform: "uppercase",
            }}
          >
            {subCategory}
          </span>
          <span aria-hidden style={{ color: project.accent, fontSize: 16 }}>
            →
          </span>
        </div>
      </div>

      {/* Description */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: isActive ? 96 : 0,
          opacity: isActive ? 1 : 0,
          paddingLeft: 44,
          marginTop: isActive ? 12 : 0,
          transition:
            "max-height 0.45s cubic-bezier(0.76,0,0.24,1), opacity 0.35s ease, margin-top 0.35s ease",
        }}
      >
        <p
          style={{
            fontSize: 13,
            color: "#8A8A8A",
            lineHeight: 1.7,
            maxWidth: 400,
          }}
        >
          {project.desc}
        </p>
      </div>

      {/* Tags */}
      <div
        style={{
          display: "flex",
          gap: 16,
          paddingLeft: 44,
          marginTop: isActive ? 14 : 0,
          maxHeight: isActive ? 30 : 0,
          overflow: "hidden",
          opacity: isActive ? 0.7 : 0,
          transition: "all 0.4s ease 0.05s",
        }}
      >
        {[mainCategory, project.location].map((tag, i) => (
          <span
            key={i}
            style={{
              fontSize: 9,
              letterSpacing: "0.2em",
              color: project.accent,
              textTransform: "uppercase",
              border: `1px solid ${project.accent}40`,
              padding: "3px 10px",
            }}
          >
            {tag}
          </span>
        ))}
        {/* Gallery indicator */}
        {galleryCount > 0 && (
          <span
            style={{
              fontSize: 9,
              letterSpacing: "0.2em",
              color: "var(--cement)",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
              <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
              <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
              <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            {galleryCount} fotos
          </span>
        )}
      </div>
    </Link>
  )
}
