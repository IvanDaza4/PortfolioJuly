"use client"


export function Footer() {
  return (
    <footer
      style={{
        background: "var(--iron-deep)",
        padding: "32px clamp(24px, 5vw, 48px)",
        display: "flex",
        flexWrap: "wrap",
        gap: 16,
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: "1px solid rgba(242,239,233,0.04)",
      }}
    >
      <span
        style={{
          fontSize: 11,
          color: "var(--ghost)",
          letterSpacing: "0.1em",
        }}
      >
        © {new Date().getFullYear()} Julieta Bruzzese Estraviz
      </span>

    </footer>
  )
}
