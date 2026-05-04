/**
 * Subtle film grain overlay. Renders a static SVG turbulence filter
 * that sits over the entire viewport at very low opacity.
 */
export function Noise() {
  return (
    <svg
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0.03,
      }}
    >
      <filter id="portfolio-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#portfolio-noise)" />
    </svg>
  )
}
