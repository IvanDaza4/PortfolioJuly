const PILLARS = [
  {
    num: "I",
    title: "Materialidad",
    text: "Cada decisión de material es un argumento. El hormigón, la madera, el acero: no son acabados sino protagonistas.",
  },
  {
    num: "II",
    title: "Escala",
    text: "La proporción lo es todo. Diseño desde el cuerpo humano hacia afuera, no desde la planta hacia adentro.",
  },
  {
    num: "III",
    title: "Permanencia",
    text: "Los edificios duran generaciones. Proyectar es un acto de responsabilidad con el tiempo.",
  },
] as const

const STATS = [
  { num: "28", label: "Proyectos\nrealizados" },
  { num: "6", label: "Años de\npráctica" },
  { num: "3", label: "Premios\nnacionales" },
  { num: "∞", label: "Colaboración\ninterdisciplinar" },
] as const

export function PhilosophySection() {
  return (
    <section
      id="filosofia"
      aria-label="Filosofía"
      style={{
        background: "var(--off-white)",
        padding: "140px clamp(24px, 5vw, 48px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
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
          WebkitTextStroke: "1px rgba((0.145 0 0,0.04)",
          fontFamily: "var(--font-sans)",
          letterSpacing: "-0.05em",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        FIL
      </div>

      <div style={{ maxWidth: 1200, position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 80 }}>
          <div style={{ width: 48, height: 1, background: "var(--iron)" }} />
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.3em",
              color: "var(--iron)",
              textTransform: "uppercase",
            }}
          >
            Filosofía
          </span>
        </div>

        <div
          className="philosophy-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "60px 80px",
            alignItems: "start",
          }}
        >
          <div>
            <blockquote
              style={{
                fontSize: "clamp(28px, 4vw, 52px)",
                fontWeight: 700,
                color: "var(--iron)",
                fontFamily: "var(--font-sans)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                textTransform: "uppercase",
                margin: 0,
                padding: 0,
                borderLeft: "3px solid var(--oak)",
                paddingLeft: 32,
              }}
            >
              La arquitectura es el arte de crear silencio habitable.
            </blockquote>
          </div>

          <div
            style={{
              paddingTop: 8,
              display: "flex",
              flexDirection: "column",
              gap: 48,
            }}
          >
            {PILLARS.map((pillar) => (
              <div key={pillar.num} style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--oak)",
                    fontFamily: "var(--font-serif)",
                    minWidth: 24,
                    paddingTop: 4,
                  }}
                >
                  {pillar.num}
                </span>
                <div>
                  <h3
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--iron)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    {pillar.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--ghost)",
                      lineHeight: 1.75,
                    }}
                  >
                    {pillar.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: 100,
            paddingTop: 48,
            borderTop: "1px solid rgba(26,26,26,0.12)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 32,
          }}
        >
          {STATS.map((stat) => (
            <div key={stat.num}>
              <div
                style={{
                  fontSize: "clamp(40px, 5vw, 72px)",
                  fontWeight: 700,
                  color: "var(--iron)",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  marginBottom: 12,
                }}
              >
                {stat.num}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--ghost)",
                  lineHeight: 1.5,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  whiteSpace: "pre-line",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
