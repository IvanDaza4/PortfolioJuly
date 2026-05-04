"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { PROJECTS } from "@/lib/portfolio/data"

// Collect featured images from all projects
const FEATURED_IMAGES = PROJECTS.flatMap((project) =>
  (project.gallery?.slice(0, 2) ?? []).map((img) => ({
    ...img,
    projectId: project.id,
    projectName: project.name,
    accent: project.accent,
  }))
)

export function FeaturedGallery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const autoScrollRef = useRef<number | null>(null)

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoScrolling || !containerRef.current) return

    const scroll = () => {
      if (containerRef.current && !isDragging) {
        containerRef.current.scrollLeft += 0.5
        
        // Loop back when reaching end
        if (
          containerRef.current.scrollLeft >=
          containerRef.current.scrollWidth - containerRef.current.clientWidth
        ) {
          containerRef.current.scrollLeft = 0
        }
      }
      autoScrollRef.current = requestAnimationFrame(scroll)
    }

    autoScrollRef.current = requestAnimationFrame(scroll)

    return () => {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current)
      }
    }
  }, [isAutoScrolling, isDragging])

  // Pause auto-scroll on hover
  const handleMouseEnter = useCallback(() => {
    setIsAutoScrolling(false)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsAutoScrolling(true)
    setHoveredIndex(null)
  }, [])

  // Drag to scroll
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !containerRef.current) return
      e.preventDefault()
      const x = e.pageX - containerRef.current.offsetLeft
      const walk = (x - startX) * 1.5
      containerRef.current.scrollLeft = scrollLeft - walk
    },
    [isDragging, startX, scrollLeft]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!containerRef.current) return
    setIsDragging(true)
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft)
    setScrollLeft(containerRef.current.scrollLeft)
    setIsAutoScrolling(false)
  }, [])

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || !containerRef.current) return
      const x = e.touches[0].pageX - containerRef.current.offsetLeft
      const walk = (x - startX) * 1.5
      containerRef.current.scrollLeft = scrollLeft - walk
    },
    [isDragging, startX, scrollLeft]
  )

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
    // Resume auto-scroll after a delay
    setTimeout(() => setIsAutoScrolling(true), 3000)
  }, [])

  if (FEATURED_IMAGES.length === 0) return null

  return (
    <section
      className="py-16 md:py-24 overflow-hidden"
      style={{ background: "var(--iron-deep)" }}
    >
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-24 mb-10">
        <div className="max-w-6xl mx-auto flex items-end justify-between">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[1px]" style={{ background: "var(--oak)" }} />
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: "var(--oak)" }}
              >
                Galería destacada
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{
                color: "var(--off-white)",
                fontFamily: "var(--font-sans)",
                letterSpacing: "-0.03em",
              }}
            >
              Momentos de obra
            </h2>
          </div>
          <p
            className="hidden md:block text-sm max-w-xs text-right"
            style={{ color: "var(--cement)" }}
          >
            Arrastra para explorar o pasa el cursor para pausar
          </p>
        </div>
      </div>

      {/* Horizontal scroll gallery */}
      <div
        ref={containerRef}
        className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide px-6 md:px-12 lg:px-24 pb-4"
        style={{
          cursor: isDragging ? "grabbing" : "grab",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Duplicate images for infinite scroll effect */}
        {[...FEATURED_IMAGES, ...FEATURED_IMAGES].map((image, index) => {
          const isHovered = hoveredIndex === index
          const aspectWidth =
            image.aspect === "portrait" ? 280 : image.aspect === "landscape" ? 420 : 320
          const aspectHeight =
            image.aspect === "portrait" ? 380 : image.aspect === "landscape" ? 280 : 320

          return (
            <Link
              key={`${image.src}-${index}`}
              href={`/proyecto/${image.projectId}`}
              className="relative flex-shrink-0 overflow-hidden rounded-sm group"
              style={{
                width: aspectWidth,
                height: aspectHeight,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={(e) => {
                if (isDragging) {
                  e.preventDefault()
                }
              }}
            >
              {/* Image */}
              <div
                className="absolute inset-0 motion-safe:transition-transform motion-safe:duration-700"
                style={{
                  transform: isHovered ? "scale(1.1)" : "scale(1)",
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 280px, 420px"
                  draggable={false}
                />
              </div>

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 motion-safe:transition-opacity motion-safe:duration-500"
                style={{
                  background: `linear-gradient(to top, ${image.accent}DD 0%, transparent 70%)`,
                  opacity: isHovered ? 1 : 0,
                }}
              />

              {/* Project info on hover */}
              <div
                className="absolute bottom-0 left-0 right-0 p-5 motion-safe:transition-all motion-safe:duration-500"
                style={{
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <p
                  className="text-xs tracking-widest uppercase mb-2"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {image.projectId}
                </p>
                <p className="text-base font-semibold text-white">{image.projectName}</p>
                <p className="text-xs text-white/70 mt-1 line-clamp-1">{image.alt}</p>
              </div>

              {/* View project indicator */}
              <div
                className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center motion-safe:transition-all motion-safe:duration-500"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(8px)",
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "scale(1)" : "scale(0.5)",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Scroll indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            className="w-8 h-1 rounded-full motion-safe:transition-colors"
            style={{
              background: `${project.accent}40`,
            }}
          />
        ))}
      </div>

      {/* Mobile hint */}
      <p
        className="md:hidden text-center text-xs mt-6 px-6"
        style={{ color: "var(--cement)" }}
      >
        Desliza para explorar la galería
      </p>
    </section>
  )
}
