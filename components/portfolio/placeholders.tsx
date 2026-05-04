// ─── SVG ARCHITECTURAL PLACEHOLDERS ──────────────────────────────────────────
// Compositions used when project.img is null. Each component receives an
// accent color matching its project palette.

import type { ReactElement } from "react"
import type { PlaceholderShape } from "@/lib/portfolio/data"

interface PlaceholderProps {
  color: string
}

const svgStyle = { width: "100%", height: "100%", display: "block" } as const

function PlaceholderCasa({ color }: PlaceholderProps) {
  return (
    <svg viewBox="0 0 800 500" style={svgStyle} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="skyC" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0D0905" />
          <stop offset="100%" stopColor="#2C1E0A" />
        </linearGradient>
        <linearGradient id="mountainC" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A1208" />
          <stop offset="100%" stopColor="#0D0905" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#skyC)" />
      <path
        d="M0 500 L0 320 L120 210 L220 280 L340 160 L460 260 L560 190 L680 240 L800 200 L800 500Z"
        fill="url(#mountainC)"
        opacity="0.7"
      />
      <rect x="180" y="310" width="200" height="100" fill="#1A1208" stroke={color} strokeWidth="0.5" opacity="0.9" />
      <rect x="240" y="250" width="160" height="65" fill="#221A0C" stroke={color} strokeWidth="0.5" opacity="0.95" />
      <rect x="290" y="205" width="100" height="50" fill="#2C2210" stroke={color} strokeWidth="0.5" />
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1={188 + i * 16}
          y1="310"
          x2={188 + i * 16}
          y2="410"
          stroke={color}
          strokeWidth="0.4"
          opacity="0.25"
        />
      ))}
      <rect x="248" y="265" width="140" height="22" fill="none" stroke={color} strokeWidth="0.6" opacity="0.5" />
      <rect x="248" y="265" width="140" height="22" fill={color} opacity="0.04" />
      <line x1="0" y1="340" x2="800" y2="340" stroke={color} strokeWidth="0.3" opacity="0.08" />
      {[
        [60, 40],
        [130, 80],
        [500, 30],
        [620, 60],
        [720, 45],
        [400, 20],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="0.8" fill={color} opacity="0.4" />
      ))}
      <text x="740" y="490" fontSize="8" fill={color} opacity="0.3" fontFamily="Georgia" textAnchor="end">
        Casa Miradores · 2024
      </text>
    </svg>
  )
}

function PlaceholderLoft({ color }: PlaceholderProps) {
  return (
    <svg viewBox="0 0 800 500" style={svgStyle} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="loftBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0A0E14" />
          <stop offset="100%" stopColor="#060810" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#loftBg)" />
      {[0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1.05, 1.2].map((t, i) => {
        const y = 260 + t * 200
        const xL = 400 - t * 400
        const xR = 400 + t * 400
        return (
          <line
            key={i}
            x1={xL}
            y1={y}
            x2={xR}
            y2={y}
            stroke={color}
            strokeWidth="0.4"
            opacity={0.06 + t * 0.04}
          />
        )
      })}
      {[-3, -2, -1, 0, 1, 2, 3].map((n, i) => (
        <line
          key={i}
          x1={400 + n * 130}
          y1="500"
          x2="400"
          y2="260"
          stroke={color}
          strokeWidth="0.3"
          opacity="0.07"
        />
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={60 + i * 120} y="0" width="18" height="260" fill={color} opacity="0.05" />
      ))}
      {[0, 60, 120, 180, 240].map((y, i) => (
        <rect key={i} x="0" y={y} width="800" height="6" fill={color} opacity="0.06" />
      ))}
      <rect x="40" y="80" width="120" height="160" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {[1, 2, 3].map((i) => (
        <line
          key={i}
          x1={40 + i * 30}
          y1="80"
          x2={40 + i * 30}
          y2="240"
          stroke={color}
          strokeWidth="0.4"
          opacity="0.2"
        />
      ))}
      <line x1="40" y1="160" x2="160" y2="160" stroke={color} strokeWidth="0.4" opacity="0.2" />
      <rect x="40" y="80" width="120" height="160" fill={color} opacity="0.02" />
      <rect x="200" y="360" width="350" height="8" fill={color} opacity="0.15" />
      <rect x="200" y="368" width="350" height="60" fill={color} opacity="0.05" />
      <rect x="0" y="0" width="800" height="260" fill={color} opacity="0.02" />
      <line x1="0" y1="260" x2="800" y2="260" stroke={color} strokeWidth="0.5" opacity="0.2" />
      <text x="740" y="490" fontSize="8" fill={color} opacity="0.3" fontFamily="Georgia" textAnchor="end">
        Loft Palermo · 2023
      </text>
    </svg>
  )
}

function PlaceholderPabellon({ color }: PlaceholderProps) {
  return (
    <svg viewBox="0 0 800 500" style={svgStyle} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="pabelBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#040A08" />
          <stop offset="60%" stopColor="#081410" />
          <stop offset="100%" stopColor="#0E1A14" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="url(#pabelBg)" />
      <line x1="0" y1="320" x2="800" y2="320" stroke={color} strokeWidth="0.6" opacity="0.25" />
      {[5, 10, 15, 20, 25, 30].map((t, i) => (
        <line
          key={i}
          x1="0"
          y1={320 + t}
          x2="800"
          y2={320 + t}
          stroke={color}
          strokeWidth="0.2"
          opacity={0.03 + i * 0.01}
        />
      ))}
      {[120, 240, 360, 480, 600].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="160" x2={x} y2="320" stroke={color} strokeWidth="0.7" opacity="0.35" />
          <line x1={x} y1="160" x2={x + 20} y2="120" stroke={color} strokeWidth="0.5" opacity="0.2" />
        </g>
      ))}
      <rect x="120" y="155" width="480" height="12" fill={color} opacity="0.08" />
      <rect x="120" y="155" width="480" height="12" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
      <rect x="120" y="167" width="480" height="153" fill={color} opacity="0.03" stroke={color} strokeWidth="0.3" />
      {[1, 2, 3].map((i) => (
        <line
          key={i}
          x1={120 + i * 120}
          y1="167"
          x2={120 + i * 120}
          y2="320"
          stroke={color}
          strokeWidth="0.4"
          opacity="0.15"
        />
      ))}
      <rect x="120" y="320" width="480" height="80" fill={color} opacity="0.015" />
      {[
        [50, 60, 200],
        [300, 40, 160],
        [560, 70, 180],
        [0, 100, 100],
      ].map(([x, y, w], i) => (
        <line
          key={i}
          x1={x}
          y1={y}
          x2={x + w}
          y2={y}
          stroke={color}
          strokeWidth="0.4"
          opacity="0.08"
        />
      ))}
      <text x="740" y="490" fontSize="8" fill={color} opacity="0.3" fontFamily="Georgia" textAnchor="end">
        Pabellón Valdés · 2023
      </text>
    </svg>
  )
}

function PlaceholderBodega({ color }: PlaceholderProps) {
  return (
    <svg viewBox="0 0 800 500" style={svgStyle} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="bodBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0D0604" />
          <stop offset="100%" stopColor="#160A06" />
        </linearGradient>
        <radialGradient id="bodLight" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.06" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="url(#bodBg)" />
      <rect width="800" height="500" fill="url(#bodLight)" />
      {Array.from({ length: 22 }).map((_, i) => {
        const y = 30 + i * 21
        const segments = [0, 80, 160, 260, 380, 460, 580, 680, 800]
        return segments.slice(0, -1).map((x, j) => (
          <rect
            key={`${i}-${j}`}
            x={x + 1}
            y={y}
            width={segments[j + 1] - x - 2}
            height={18 + Math.sin(i * j) * 3}
            fill={color}
            opacity={0.02 + (i % 3) * 0.008}
            rx="1"
          />
        ))
      })}
      {[0, 1, 2, 3, 4].map((i) => {
        const scale = 1 - i * 0.18
        const cx = 400
        const cy = 280
        const rx = 180 * scale
        const ry = 120 * scale
        return (
          <g key={i}>
            <path
              d={`M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx + rx} ${cy}`}
              fill="none"
              stroke={color}
              strokeWidth={0.8 - i * 0.12}
              opacity={0.3 - i * 0.04}
            />
            <line
              x1={cx - rx}
              y1={cy}
              x2={cx - rx}
              y2={cy + 60 * scale}
              stroke={color}
              strokeWidth={0.6 - i * 0.08}
              opacity={0.25 - i * 0.03}
            />
            <line
              x1={cx + rx}
              y1={cy}
              x2={cx + rx}
              y2={cy + 60 * scale}
              stroke={color}
              strokeWidth={0.6 - i * 0.08}
              opacity={0.25 - i * 0.03}
            />
          </g>
        )
      })}
      <ellipse cx="400" cy="380" rx="200" ry="20" fill={color} opacity="0.05" />
      <ellipse cx="400" cy="160" rx="60" ry="8" fill={color} opacity="0.08" />
      <line x1="400" y1="168" x2="400" y2="340" stroke={color} strokeWidth="6" opacity="0.03" />
      <text x="740" y="490" fontSize="8" fill={color} opacity="0.3" fontFamily="Georgia" textAnchor="end">
        Bodega Altura · 2022
      </text>
    </svg>
  )
}

function PlaceholderClinica({ color }: PlaceholderProps) {
  return (
    <svg viewBox="0 0 800 500" style={svgStyle} preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="clinBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#080C12" />
          <stop offset="100%" stopColor="#141C28" />
        </linearGradient>
        <radialGradient id="clinLight1" cx="30%" cy="0%" r="60%">
          <stop offset="0%" stopColor={color} stopOpacity="0.07" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="clinLight2" cx="70%" cy="0%" r="60%">
          <stop offset="0%" stopColor={color} stopOpacity="0.05" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="url(#clinBg)" />
      <rect width="800" height="500" fill="url(#clinLight1)" />
      <rect width="800" height="500" fill="url(#clinLight2)" />
      <rect x="60" y="80" width="280" height="340" fill="none" stroke={color} strokeWidth="0.7" opacity="0.2" />
      <rect x="60" y="80" width="280" height="340" fill={color} opacity="0.015" />
      <rect x="380" y="120" width="220" height="260" fill="none" stroke={color} strokeWidth="0.7" opacity="0.18" />
      <rect x="380" y="120" width="220" height="260" fill={color} opacity="0.012" />
      <rect x="640" y="160" width="120" height="180" fill="none" stroke={color} strokeWidth="0.5" opacity="0.14" />
      <rect x="100" y="160" width="100" height="120" fill={color} opacity="0.04" stroke={color} strokeWidth="0.4" />
      <line x1="150" y1="0" x2="130" y2="160" stroke={color} strokeWidth="20" opacity="0.025" />
      <line x1="150" y1="0" x2="170" y2="160" stroke={color} strokeWidth="12" opacity="0.02" />
      <rect x="220" y="240" width="80" height="100" fill={color} opacity="0.035" stroke={color} strokeWidth="0.4" />
      <line x1="260" y1="0" x2="250" y2="240" stroke={color} strokeWidth="14" opacity="0.02" />
      <rect x="340" y="80" width="40" height="340" fill={color} opacity="0.03" />
      <line x1="340" y1="80" x2="340" y2="420" stroke={color} strokeWidth="0.5" opacity="0.2" />
      <line x1="380" y1="80" x2="380" y2="420" stroke={color} strokeWidth="0.5" opacity="0.2" />
      {[1, 2, 3].map((i) => (
        <line
          key={i}
          x1="60"
          y1={80 + i * 85}
          x2="340"
          y2={80 + i * 85}
          stroke={color}
          strokeWidth="0.35"
          opacity="0.1"
        />
      ))}
      {Array.from({ length: 16 }).map((_, i) => (
        <line key={i} x1={i * 53} y1="0" x2={i * 53} y2="500" stroke={color} strokeWidth="0.2" opacity="0.03" />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={i} x1="0" y1={i * 56} x2="800" y2={i * 56} stroke={color} strokeWidth="0.2" opacity="0.03" />
      ))}
      <text x="740" y="490" fontSize="8" fill={color} opacity="0.3" fontFamily="Georgia" textAnchor="end">
        Clínica Luz · 2022
      </text>
    </svg>
  )
}

export const PLACEHOLDER_COMPONENTS: Record<PlaceholderShape, (p: PlaceholderProps) => ReactElement> = {
  casa: PlaceholderCasa,
  loft: PlaceholderLoft,
  pabellon: PlaceholderPabellon,
  bodega: PlaceholderBodega,
  clinica: PlaceholderClinica,
}
