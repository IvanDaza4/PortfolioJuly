"use client"

import { useCallback, useEffect, useRef, useState } from "react"
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
  const lightboxRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // Keyboard navigation
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

  // Touch gestures for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    const threshold = 50

    if (Math.abs(diff) > threshold) {
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

  // Determine grid layout based on image count and aspects
  const getGridConfig = () => {
    const gridItems: { span: string; order: number }[] = []

    images.forEach((img, i) => {
      let colSpan = "1"
      let rowSpan = "1"

      // Create asymmetric layout
      if (i === 0) {
        // First image is always large
        colSpan = img.aspect === "portrait" ? "1" : "2"
        rowSpan = "2"
      } else if (img.aspect === "portrait") {
        rowSpan = "2"
      } else if (img.aspect === "landscape" && i % 3 === 0) {
        colSpan = "2"
      }

      gridItems.push({
        span: `col-span-${colSpan} row-span-${rowSpan}`,
        order: i,
      })
    })

    return gridItems
  }

  const gridConfig = getGridConfig()

  return (
    <>
      {/* Asymmetric Grid Gallery */}
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
          const config = gridConfig[index]

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
                gridRow: index === 0 || image.aspect === "portrait" ? "span 2" : "span 1",
                focusRing: accent,
                ["--tw-ring-color" as string]: accent,
              }}
              aria-label={`Ver ${image.alt} en pantalla completa`}
            >
              {/* Image */}
              <div
                className="absolute inset-0 motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out"
                style={{
                  transform: isHovered ? "scale(1.08)" : "scale(1)",
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Gradient overlay on hover */}
              <div
                className="absolute inset-0 motion-safe:transition-opacity motion-safe:duration-500"
                style={{
                  background: `linear-gradient(to top, ${accent}CC 0%, transparent 60%)`,
                  opacity: isHovered ? 1 : 0,
                }}
              />

              {/* Info reveal on hover */}
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
                  {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </p>
                <p className="text-sm md:text-base font-medium text-white line-clamp-2">
                  {image.alt}
                </p>
              </div>

              {/* Corner accent on hover */}
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

      {/* Immersive Lightbox */}
      {lightboxOpen && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(10, 10, 10, 0.97)" }}
          role="dialog"
          aria-modal="true"
          aria-label={`Galería de imágenes de ${projectName}`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 z-10 p-3 rounded-full motion-safe:transition-all motion-safe:duration-300 hover:bg-white/10"
            aria-label="Cerrar galería"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
            >
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Project name */}
          <div className="absolute top-6 left-6 z-10">
            <p
              className="text-xs tracking-widest uppercase mb-1"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {projectName}
            </p>
            <p className="text-sm font-medium" style={{ color: accent }}>
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </p>
          </div>

          {/* Main image */}
          <div className="relative w-full h-full max-w-6xl max-h-[80vh] mx-auto px-16">
            {images.map((image, index) => (
              <div
                key={`lightbox-${image.src}-${index}`}
                className="absolute inset-0 flex items-center justify-center motion-safe:transition-all motion-safe:duration-500"
                style={{
                  opacity: activeIndex === index ? 1 : 0,
                  transform:
                    activeIndex === index
                      ? "scale(1) translateX(0)"
                      : index < activeIndex
                        ? "scale(0.95) translateX(-50px)"
                        : "scale(0.95) translateX(50px)",
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

          {/* Image caption */}
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="text-white/80 text-sm md:text-base px-6">
              {images[activeIndex].alt}
            </p>
          </div>

          {/* Navigation arrows */}
          <button
            type="button"
            onClick={() => setActiveIndex((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 rounded-full motion-safe:transition-all motion-safe:duration-300 hover:bg-white/10 group"
            aria-label="Imagen anterior"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              className="motion-safe:transition-transform motion-safe:group-hover:-translate-x-1"
            >
              <path
                d="M15 18l-6-6 6-6"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setActiveIndex((prev) => (prev + 1) % images.length)}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 rounded-full motion-safe:transition-all motion-safe:duration-300 hover:bg-white/10 group"
            aria-label="Siguiente imagen"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              className="motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
            >
              <path
                d="M9 18l6-6-6-6"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Thumbnail strip */}
          <div className="absolute bottom-20 left-0 right-0 px-4 overflow-x-auto">
            <div className="flex justify-center gap-2 md:gap-3">
              {images.map((image, index) => (
                <button
                  key={`thumb-${image.src}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className="relative flex-shrink-0 overflow-hidden rounded-sm motion-safe:transition-all motion-safe:duration-300"
                  style={{
                    width: activeIndex === index ? 72 : 48,
                    height: activeIndex === index ? 48 : 32,
                    opacity: activeIndex === index ? 1 : 0.5,
                    border: activeIndex === index ? `2px solid ${accent}` : "2px solid transparent",
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

          {/* Swipe hint (mobile) */}
          <div className="absolute bottom-4 left-0 right-0 text-center md:hidden">
            <p className="text-xs text-white/30 tracking-wider uppercase">
              Desliza para navegar
            </p>
          </div>
        </div>
      )}
    </>
  )
}
