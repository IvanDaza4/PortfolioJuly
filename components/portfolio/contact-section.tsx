"use client"

import { useState, type CSSProperties, type FormEvent } from "react"

// ─────────────────────────────────────────────
// CONFIGURACIÓN — reemplazá este valor por el
// endpoint real de tu formulario en Formspree.
// Pasos:
//   1. Registrarse en https://formspree.io
//   2. Crear un nuevo formulario ("New Form")
//   3. Copiar el endpoint con el formato:
//      https://formspree.io/f/XXXXXXXX
// ─────────────────────────────────────────────
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mjgloonz"

const CONTACT_DETAILS = [
  { label: "Email", value: "julybruzz@gmail.com", href: "mailto:julybruzz@gmail.com" },
  { label: "Teléfono", value: "+54 11 2817-0350", href: "tel:+541128170350" },
  { label: "Estudio", value: "Buenos Aires, AR", href: null },
] as const

type Status = "idle" | "loading" | "sent" | "error"
type FieldName = "name" | "topic"

export function ContactSection() {
  const [fields, setFields] = useState({ name: "", topic: "" })
  const [status, setStatus] = useState<Status>("idle")
  const [focused, setFocused] = useState<FieldName | null>(null)

  const canSend =
    fields.name.trim().length > 0 &&
    fields.topic.trim().length > 0 &&
    status !== "loading"

  // ─── Envío real a Formspree ───────────────
  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!canSend) return

    setStatus("loading")

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: fields.name.trim(),
          topic: fields.topic.trim(),
          // Si en el futuro agregás un campo de email al form,
          // mapealo así para que Formspree lo use como Reply-To:
          // _replyto: fields.email,
        }),
      })

      if (res.ok) {
        setStatus("sent")
      } else {
        const data = await res.json().catch(() => null)
        console.error("Formspree error:", data)
        setStatus("error")
      }
    } catch (err) {
      console.error("Network error:", err)
      setStatus("error")
    }
  }

  // ─── Estilos de inputs ────────────────────
  const inputStyle = (field: FieldName): CSSProperties => ({
    background: "none",
    border: "none",
    borderBottom: `1px solid ${focused === field ? "var(--oak)" : "rgba(242,239,233,0.2)"}`,
    color: "var(--off-white)",
    fontSize: "clamp(18px, 2.5vw, 32px)",
    fontFamily: "var(--font-sans)",
    padding: "8px 4px",
    outline: "none",
    width: field === "name" ? "clamp(140px,20vw,260px)" : "clamp(180px,26vw,340px)",
    transition: "border-color 0.3s ease",
    letterSpacing: "-0.02em",
    display: "inline-block",
    textAlign: "center",
    opacity: status === "loading" ? 0.5 : 1,
    pointerEvents: status === "loading" ? "none" : "auto",
  })

  const buttonEnabled = canSend && status !== "loading"
  const buttonLabel = status === "loading" ? "Enviando…" : "Enviar consulta"

  return (
    <section
      id="contacto"
      aria-label="Contacto"
      style={{
        background: "var(--iron)",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px clamp(24px, 5vw, 48px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Círculo decorativo de fondo */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: -80,
          left: -40,
          width: "40vw",
          height: "40vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(184,149,106,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Texto decorativo "CON" */}
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
        CON
      </div>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 900 }}>

        {/* Eyebrow label */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 64 }}>
          <div style={{ width: 48, height: 1, background: "var(--oak)" }} />
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.3em",
              color: "var(--oak)",
              textTransform: "uppercase",
            }}
          >
            Contacto
          </span>
        </div>

        {/* Título principal */}
        <h2
          style={{
            fontSize: "clamp(32px, 4.5vw, 64px)",
            fontWeight: 700,
            color: "var(--off-white)",
            fontFamily: "var(--font-sans)",
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
            marginBottom: 72,
          }}
        >
          Hablemos de tu proyecto
        </h2>

        {/* ────── ESTADO: ENVIADO ────── */}
        {status === "sent" && (
          <div
            role="status"
            aria-live="polite"
            style={{
              fontSize: "clamp(18px, 2.5vw, 32px)",
              color: "var(--oak)",
              fontFamily: "var(--font-sans)",
              letterSpacing: "-0.02em",
              lineHeight: 1.6,
            }}
          >
            Gracias, {fields.name}.{" "}
            <br />
            <span style={{ color: "var(--cement)" }}>
              Estaremos en contacto pronto.
            </span>
          </div>
        )}

        {/* ────── ESTADO: ERROR ────── */}
        {status === "error" && (
          <div
            role="alert"
            aria-live="assertive"
            style={{
              fontSize: "clamp(14px, 1.8vw, 22px)",
              color: "rgba(242,239,233,0.7)",
              fontFamily: "var(--font-sans)",
              letterSpacing: "-0.02em",
              lineHeight: 1.7,
              marginBottom: 40,
              borderLeft: "2px solid var(--oak)",
              paddingLeft: 20,
            }}
          >
            Hubo un problema al enviar el mensaje.
            <br />
            <span style={{ color: "var(--cement)", fontSize: "0.85em" }}>
              Por favor escribinos directamente a{" "}
              <a
                href="mailto:hola@julietaarq.com"
                style={{
                  color: "var(--oak)",
                  textDecoration: "underline",
                  textUnderlineOffset: 4,
                }}
              >
                hola@julietaarq.com
              </a>
            </span>
          </div>
        )}

        {/* ────── FORMULARIO (idle | loading | error) ────── */}
        {status !== "sent" && (
          <form onSubmit={handleSend} noValidate>
            <div
              style={{
                fontSize: "clamp(18px, 2.5vw, 32px)",
                color: "var(--cement)",
                fontFamily: "var(--font-sans)",
                letterSpacing: "-0.02em",
                lineHeight: 2.2,
                flexWrap: "wrap",
                display: "flex",
                alignItems: "baseline",
                gap: "0 12px",
                opacity: status === "loading" ? 0.6 : 1,
                transition: "opacity 0.3s ease",
              }}
            >
              <span>Hola, mi nombre es</span>

              <label htmlFor="contact-name" className="sr-only">
                Tu nombre
              </label>
              <input
                id="contact-name"
                value={fields.name}
                onChange={(e) => setFields({ ...fields, name: e.target.value })}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                placeholder="Nombre"
                style={inputStyle("name")}
                autoComplete="name"
                required
                disabled={status === "loading"}
              />

              <span>y quiero hablar sobre</span>

              <label htmlFor="contact-topic" className="sr-only">
                Tema o proyecto
              </label>
              <input
                id="contact-topic"
                value={fields.topic}
                onChange={(e) => setFields({ ...fields, topic: e.target.value })}
                onFocus={() => setFocused("topic")}
                onBlur={() => setFocused(null)}
                placeholder="tu proyecto"
                style={inputStyle("topic")}
                required
                disabled={status === "loading"}
              />

              <span>.</span>
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              disabled={!buttonEnabled}
              data-hover
              aria-busy={status === "loading"}
              style={{
                marginTop: 64,
                background: buttonEnabled ? "var(--oak)" : "transparent",
                border: `1px solid ${buttonEnabled ? "var(--oak)" : "rgba(242,239,233,0.15)"}`,
                color: buttonEnabled ? "var(--iron-deep)" : "var(--ghost)",
                padding: "18px 48px",
                fontSize: 11,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                cursor: buttonEnabled ? "pointer" : "default",
                fontFamily: "inherit",
                fontWeight: 700,
                transition: "all 0.4s ease",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {buttonLabel}

              {/* Barra de progreso sutil durante el loading */}
              {status === "loading" && (
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: 2,
                    width: "100%",
                    background: "var(--iron-deep)",
                    opacity: 0.35,
                    animation: "jq_loadingBar 1.2s ease-in-out infinite",
                  }}
                />
              )}
            </button>

            {/* Keyframe inline — prefijo "jq_" para evitar colisiones */}
            <style>{`
              @keyframes jq_loadingBar {
                0%   { transform: translateX(-100%); }
                50%  { transform: translateX(0%); }
                100% { transform: translateX(100%); }
              }
            `}</style>
          </form>
        )}

        {/* ────── DATOS DE CONTACTO ────── */}
        <div
          style={{
            marginTop: 100,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 40,
            paddingTop: 48,
            borderTop: "1px solid rgba(242,239,233,0.06)",
          }}
        >
          {CONTACT_DETAILS.map((info) => (
            <div key={info.label}>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.25em",
                  color: "var(--ghost)",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                {info.label}
              </div>

              {info.href ? (
                <a
                  href={info.href}
                  data-hover
                  style={{
                    fontSize: 14,
                    color: "var(--cement)",
                    letterSpacing: "0.02em",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--oak)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--cement)")}
                >
                  {info.value}
                </a>
              ) : (
                <div
                  style={{
                    fontSize: 14,
                    color: "var(--cement)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {info.value}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}