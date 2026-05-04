"use client"

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Behance", href: "https://behance.net" },
] as const

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
        © {new Date().getFullYear()} Julieta Arquitectura
      </span>
      <nav aria-label="Redes sociales" style={{ display: "flex", gap: 32 }}>
        {SOCIALS.map((net) => (
          <a
            key={net.label}
            href={net.href}
            target="_blank"
            rel="noreferrer noopener"
            data-hover
            style={{
              fontSize: 11,
              color: "var(--ghost)",
              letterSpacing: "0.12em",
              textDecoration: "none",
              textTransform: "uppercase",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--oak)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ghost)")}
          >
            {net.label}
          </a>
        ))}
      </nav>
    </footer>
  )
}
