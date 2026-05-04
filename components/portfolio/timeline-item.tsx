"use client"

import { useState } from "react"

export interface TimelineEntry {
  year: string
  text: string
}

interface TimelineItemProps {
  item: TimelineEntry
  index: number
  visible: boolean
  isLast: boolean
}

export function TimelineItem({ item, index, visible, isLast }: TimelineItemProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "56px 1px 1fr",
        gap: "0 24px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: `all 0.7s ease ${0.4 + index * 0.1}s`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ paddingTop: 2, textAlign: "right" }}>
        <span
          style={{
            fontSize: 11,
            color: hovered ? "var(--oak)" : "var(--ghost)",
            fontFamily: "var(--font-serif)",
            letterSpacing: "0.05em",
            transition: "color 0.3s ease",
          }}
        >
          {item.year}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          aria-hidden
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: hovered ? "var(--oak)" : "var(--ghost)",
            marginTop: 4,
            flexShrink: 0,
            transition: "background 0.3s ease, transform 0.3s ease",
            transform: hovered ? "scale(1.4)" : "scale(1)",
          }}
        />
        {!isLast && (
          <div
            aria-hidden
            style={{
              flex: 1,
              width: 1,
              background:
                "linear-gradient(180deg, rgba(58,58,58,0.6) 0%, rgba(58,58,58,0.1) 100%)",
              marginTop: 4,
              minHeight: 32,
            }}
          />
        )}
      </div>

      <div style={{ paddingBottom: isLast ? 0 : 28 }}>
        <p
          style={{
            fontSize: 13,
            color: hovered ? "var(--off-white)" : "var(--cement)",
            lineHeight: 1.7,
            transition: "color 0.3s ease",
          }}
        >
          {item.text}
        </p>
      </div>
    </div>
  )
}
