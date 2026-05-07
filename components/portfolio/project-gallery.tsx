"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import type { ProjectImage } from "@/lib/portfolio/data"

interface ProjectGalleryProps {
  images: ProjectImage[]
  projectName: string
  accent: string
}

export function ProjectGallery({ images, projectName, accent }: ProjectGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)
  const lightboxRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxOpen(false)
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % images.length)
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [lightboxOpen, images.length])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setActiveIndex((prev) => (prev + 1) % images.length)
      } else {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
      }
    }
  }

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index)
    setLightboxOpen(true)
  }, [])

  // ─── Lightbox ─────────────────────────────────────────────────────────────
  // CRÍTICO: z-index altísimo (2147483647 = max safe int) y position fixed
  // explícito por inline style para garantizar que esté SOBRE el navbar del sitio.
  const lightboxMarkup = (
    <div
      ref={lightboxRef}
      className="flex flex-col"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(8, 8, 8, 0.98)",
        zIndex: 2147483647,
        isolation: "isolate",
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Galería de imágenes de ${projectName}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── TOP BAR ── */}
      <div
        className="relative flex items-center justify-between flex-shrink-0"
        style={{
          padding: "1rem 1.5rem",
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          zIndex: 2,
        }}
      >
        {/* Botón Volver */}
        <button
          type="button"
          onClick={() => setLightboxOpen(false)}
          className="flex items-center gap-3 group cursor-pointer"
          style={{ position: "relative", zIndex: 3 }}
          aria-label="Volver a la galería"
        >
          <span
            className="flex items-center justify-center motion-safe:transition-all motion-safe:duration-300 group-hover:bg-white/10"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.3)",
              backgroundColor: "rgba(255,255,255,0.05)",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:-translate-x-0.5"
            >
              <path
                d="M19 12H5M5 12l7 7M5 12l7-7"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span
            className="hidden sm:block opacity-70 group-hover:opacity-100 motion-safe:transition-opacity motion-safe:duration-300"
            style={{
              color: "white",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Volver
          </span>
        </button>

        {/* Nombre del proyecto */}
        <p
          className="absolute inset-x-0 text-center pointer-events-none"
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          {projectName}
        </p>

        {/* Contador + cerrar */}
        <div
          className="flex items-center"
          style={{ gap: "1rem", position: "relative", zIndex: 3 }}
        >
          <span
            className="tabular-nums"
            style={{ color: accent, fontSize: "14px", fontWeight: 500 }}
          >
            {String(activeIndex + 1).padStart(2, "0")}
            <span style={{ color: "rgba(255,255,255,0.3)" }}>
              {" / "}
              {String(images.length).padStart(2, "0")}
            </span>
          </span>

          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="flex items-center justify-center motion-safe:transition-all motion-safe:duration-300 hover:bg-white/10 cursor-pointer"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.3)",
              backgroundColor: "rgba(255,255,255,0.05)",
            }}
            aria-label="Cerrar galería"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
            >
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── MAIN IMAGE AREA ── */}
      <div
        className="relative flex items-center"
        style={{ flex: 1, overflow: "hidden", minHeight: 0 }}
      >
        {/* Flecha izquierda */}
        <button
          type="button"
          onClick={() =>
            setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
          }
          className="motion-safe:transition-all motion-safe:duration-300 hover:bg-white/10 group cursor-pointer"
          style={{
            position: "absolute",
            left: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 5,
            width: "44px",
            height: "44px",
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.25)",
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Imagen anterior"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Imágenes */}
        <div
          className="relative mx-auto"
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "1280px",
            paddingLeft: "5rem",
            paddingRight: "5rem",
          }}
        >
          {images.map((image, index) => (
            <div
              key={`lightbox-${image.src}-${index}`}
              className="motion-safe:transition-all motion-safe:duration-500"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: activeIndex === index ? 1 : 0,
                transform:
                  activeIndex === index
                    ? "scale(1) translateX(0)"
                    : index < activeIndex
                      ? "scale(0.95) translateX(-40px)"
                      : "scale(0.95) translateX(40px)",
                pointerEvents: activeIndex === index ? "auto" : "none",
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority={activeIndex === index}
              />
            </div>
          ))}
        </div>

        {/* Flecha derecha */}
        <button
          type="button"
          onClick={() => setActiveIndex((prev) => (prev + 1) % images.length)}
          className="motion-safe:transition-all motion-safe:duration-300 hover:bg-white/10 group cursor-pointer"
          style={{
            position: "absolute",
            right: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 5,
            width: "44px",
            height: "44px",
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.25)",
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label="Siguiente imagen"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18l6-6-6-6"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div
        className="flex-shrink-0"
        style={{
          padding: "0.75rem 0 1rem",
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(8px)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          zIndex: 2,
        }}
      >
        <p
          className="text-center px-6 mb-3 truncate"
          style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}
        >
          {images[activeIndex].alt}
        </p>

        <div className="overflow-x-auto px-4">
          <div className="flex justify-center" style={{ gap: "0.5rem" }}>
            {images.map((image, index) => (
              <button
                key={`thumb-${image.src}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="relative flex-shrink-0 overflow-hidden motion-safe:transition-all motion-safe:duration-300 cursor-pointer"
                style={{
                  width: activeIndex === index ? 72 : 48,
                  height: activeIndex === index ? 48 : 32,
                  opacity: activeIndex === index ? 1 : 0.45,
                  border:
                    activeIndex === index
                      ? `2px solid ${accent}`
                      : "2px solid transparent",
                  borderRadius: "2px",
                }}
                aria-label={`Ver imagen ${index + 1}`}
                aria-current={activeIndex === index ? "true" : undefined}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="72px"
                />
              </button>
            ))}
          </div>
        </div>

        <p
          className="text-center md:hidden"
          style={{
            color: "rgba(255,255,255,0.25)",
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginTop: "0.5rem",
          }}
        >
          Desliza para navegar
        </p>
      </div>
    </div>
  )

  return (
    <>
      <div
        className="grid gap-3 md:gap-4"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gridAutoRows: "minmax(180px, 1fr)",
          gridAutoFlow: "dense",
        }}
      >
        {images.map((image, index) => {
          const isHovered = hoveredIndex === index

          return (
            <button
              key={`${image.src}-${index}`}
              type="button"
              onClick={() => openLightbox(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative overflow-hidden rounded-sm focus-visible:outline-none focus-visible:ring-2 motion-safe:transition-all motion-safe:duration-500"
              style={{
                gridColumn:
                  index === 0
                    ? image.aspect === "portrait"
                      ? "span 1"
                      : "span 2"
                    : image.aspect === "landscape" && index % 3 === 0
                      ? "span 2"
                      : "span 1",
                gridRow:
                  index === 0 || image.aspect === "portrait" ? "span 2" : "span 1",
                ["--tw-ring-color" as string]: accent,
              }}
              aria-label={`Ver ${image.alt} en pantalla completa`}
            >
              <div
                className="absolute inset-0 motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out"
                style={{ transform: isHovered ? "scale(1.08)" : "scale(1)" }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              <div
                className="absolute inset-0 motion-safe:transition-opacity motion-safe:duration-500"
                style={{
                  background: `linear-gradient(to top, ${accent}CC 0%, transparent 60%)`,
                  opacity: isHovered ? 1 : 0,
                }}
              />

              <div
                className="absolute bottom-0 left-0 right-0 p-4 md:p-6 motion-safe:transition-all motion-safe:duration-500"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "translateY(0)" : "translateY(16px)",
                }}
              >
                <p
                  className="text-xs tracking-widest uppercase mb-1"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(images.length).padStart(2, "0")}
                </p>
                <p className="text-sm md:text-base font-medium text-white line-clamp-2">
                  {image.alt}
                </p>
              </div>

              <div
                className="absolute top-4 right-4 w-8 h-8 motion-safe:transition-all motion-safe:duration-500"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "scale(1)" : "scale(0.5)",
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                  <path
                    d="M15 3h6v6M21 3L12 12M9 21H3v-6M3 21l9-9"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>
          )
        })}
      </div>

      {lightboxOpen && mounted && createPortal(lightboxMarkup, document.body)}
    </>
  )
}