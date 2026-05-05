"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import type { Project, ImageType } from "@/lib/portfolio/data"
import { ProjectGallery } from "./project-gallery"
import { PLACEHOLDER_COMPONENTS } from "./placeholders"
import { Header } from "./header"
import { Footer } from "./footer"
import { Cursor } from "./cursor"
import { Noise } from "./noise"

interface ProjectDetailProps {
  project: Project
  prevProject: Project | null
  nextProject: Project | null
}

type FilterOption = "render" | "planta"

const FILTER_OPTIONS: { value: FilterOption; label: string }[] = [
  { value: "render", label: "Render" },
  { value: "planta", label: "Planos" },
]

export function ProjectDetail({ project, prevProject, nextProject }: ProjectDetailProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeFilter, setActiveFilter] = useState<FilterOption>("render")

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const progress = Math.min(1, Math.max(0, -rect.top / rect.height))
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const hasGallery = project.gallery && project.gallery.length > 0

  // Filtered images based on active filter
  const filteredImages = hasGallery
    ? project.gallery!.filter((img) => img.type === activeFilter)
    : []

  // Count images by type for filter badges
  const imageCounts = hasGallery
    ? {
      render: project.gallery!.filter((img) => img.type === "render").length,
      planta: project.gallery!.filter((img) => img.type === "planta").length,
    }
    : { render: 0, planta: 0 }

  return (
    <>
      <Cursor />
      <Noise />
      <Header />

      <main style={{ background: "var(--iron-deep)", minHeight: "100vh" }}>
        {/* Cinematic Hero */}
        <div
          ref={heroRef}
          className="relative h-[70vh] md:h-[85vh] overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.placeholder.bg[0]}, ${project.placeholder.bg[1]}, ${project.placeholder.bg[2]})`,
          }}
        >
          {/* Parallax background visual */}
          <div
            className="absolute inset-0 motion-safe:transition-transform"
            style={{
              transform: `translateY(${scrollProgress * 100}px) scale(${1 + scrollProgress * 0.1})`,
              opacity: 1 - scrollProgress * 0.5,
            }}
          >
            {/* Main visual */}
            {project.img ? (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${project.img})` }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="w-2/3 max-w-lg">
                  {PLACEHOLDER_COMPONENTS[project.placeholder.shape]({
                    color: project.accent,
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, transparent 0%, transparent 40%, ${project.placeholder.bg[0]}EE 100%)`,
            }}
          />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 lg:p-24">
            <div className="max-w-6xl mx-auto">
              {/* Back link */}
              <Link
                href="/#proyectos"
                className="inline-flex items-center gap-3 mb-8 group motion-safe:transition-colors"
                style={{ color: "var(--cement)" }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="motion-safe:transition-transform motion-safe:group-hover:-translate-x-1"
                >
                  <path
                    d="M19 12H5M5 12L12 19M5 12L12 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-xs tracking-widest uppercase">Volver a proyectos</span>
              </Link>

              {/* Project ID */}
              <div
                className="text-8xl md:text-9xl font-bold mb-4"
                style={{
                  color: "transparent",
                  WebkitTextStroke: `1px ${project.accent}40`,
                  fontFamily: "var(--font-sans)",
                }}
              >
                {project.id}
              </div>

              {/* Project name */}
              <h1
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
                style={{
                  color: "var(--off-white)",
                  fontFamily: "var(--font-sans)",
                  letterSpacing: "-0.03em",
                }}
              >
                {project.name}
              </h1>

              {/* Meta info */}
              <div className="flex flex-wrap gap-6 md:gap-12">
                <div>
                  <p
                    className="text-xs tracking-widest uppercase mb-1"
                    style={{ color: "var(--cement)" }}
                  >
                    Categoría
                  </p>
                  <p className="text-sm md:text-base" style={{ color: project.accent }}>
                    {project.category}
                  </p>
                </div>
                <div>
                  <p
                    className="text-xs tracking-widest uppercase mb-1"
                    style={{ color: "var(--cement)" }}
                  >
                    Ubicación
                  </p>
                  <p className="text-sm md:text-base" style={{ color: "var(--off-white)" }}>
                    {project.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 motion-safe:animate-bounce"
            style={{ opacity: 1 - scrollProgress * 3 }}
          >
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "var(--cement)" }}
            >
              Explorar
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              style={{ color: project.accent }}
            >
              <path
                d="M12 5v14M12 19l-7-7M12 19l7-7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Content Section */}
        <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-6xl mx-auto">
            {/* Description */}
            <div className="grid md:grid-cols-3 gap-8 md:gap-16 mb-20">
              <div className="md:col-span-2">
                <h2
                  className="text-2xl md:text-3xl font-semibold mb-6"
                  style={{
                    color: "var(--off-white)",
                    fontFamily: "var(--font-serif)",
                  }}
                >
                  Sobre el proyecto
                </h2>
                <p
                  className="text-base md:text-lg leading-relaxed"
                  style={{ color: "var(--cement)" }}
                >
                  {project.desc}
                </p>
              </div>
              <div>
                <div className="sticky top-32">
                  <div
                    className="w-12 h-1 mb-6"
                    style={{ background: project.accent }}
                  />
                  <p
                    className="text-sm italic"
                    style={{
                      color: "var(--ghost-deep)",
                      fontFamily: "var(--font-serif)",
                    }}
                  >
                    Cada proyecto nace del diálogo entre el programa, el lugar y las personas que lo habitarán.
                  </p>
                </div>
              </div>
            </div>

            {/* Gallery Section */}
            {hasGallery && (
              <div>
                {/* Gallery Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-8 h-[1px]"
                      style={{ background: project.accent }}
                    />
                    <h2
                      className="text-xs tracking-widest uppercase"
                      style={{ color: project.accent }}
                    >
                      Galería del proyecto
                    </h2>
                  </div>

                  {/* Filter Buttons - Below title */}
                  <div
                    className="flex gap-6"
                    role="group"
                    aria-label="Filtrar imágenes por tipo"
                  >
                    {FILTER_OPTIONS.map(({ value, label }) => {
                      const count = imageCounts[value]
                      const isActive = activeFilter === value
                      const isDisabled = count === 0

                      return (
                        <button
                          key={value}
                          onClick={() => !isDisabled && setActiveFilter(value)}
                          disabled={isDisabled}
                          aria-pressed={isActive}
                          className="relative pb-2 text-xs tracking-widest uppercase motion-safe:transition-all focus-visible:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                          style={{
                            color: isActive ? "var(--off-white)" : "var(--cement)",
                            borderBottom: isActive ? `2px solid ${project.accent}` : "2px solid transparent",
                          }}
                        >
                          <span className="flex items-center gap-2">
                            {label}
                            <span
                              className="text-[9px] tabular-nums"
                              style={{
                                color: project.accent,
                              }}
                            >
                              {count}
                            </span>
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Gallery Grid with transition */}
                <div
                  key={activeFilter}
                  className="motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300"
                >
                  {filteredImages.length > 0 ? (
                    <ProjectGallery
                      images={filteredImages}
                      projectName={project.name}
                      accent={project.accent}
                    />
                  ) : (
                    <div
                      className="py-16 text-center"
                      style={{ color: "var(--cement)" }}
                    >
                      <p className="text-sm">No hay imágenes de este tipo en el proyecto.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Project Navigation */}
        <section
          className="border-t"
          style={{ borderColor: "rgba(242,239,233,0.06)" }}
        >
          <div className="grid md:grid-cols-2">
            {/* Previous */}
            {prevProject ? (
              <Link
                href={`/proyecto/${prevProject.id}`}
                className="group p-8 md:p-12 lg:p-16 motion-safe:transition-colors hover:bg-white/[0.02]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="motion-safe:transition-transform motion-safe:group-hover:-translate-x-2"
                    style={{ color: "var(--cement)" }}
                  >
                    <path
                      d="M19 12H5M5 12L12 19M5 12L12 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    className="text-xs tracking-widest uppercase"
                    style={{ color: "var(--cement)" }}
                  >
                    Proyecto anterior
                  </span>
                </div>
                <p
                  className="text-xl md:text-2xl font-semibold motion-safe:transition-colors"
                  style={{ color: "var(--off-white)" }}
                >
                  {prevProject.name}
                </p>
                <p
                  className="text-sm mt-1"
                  style={{ color: prevProject.accent }}
                >
                  {prevProject.category}
                </p>
              </Link>
            ) : (
              <div className="hidden md:block" />
            )}

            {/* Next */}
            {nextProject ? (
              <Link
                href={`/proyecto/${nextProject.id}`}
                className="group p-8 md:p-12 lg:p-16 text-right border-t md:border-t-0 md:border-l motion-safe:transition-colors hover:bg-white/[0.02]"
                style={{ borderColor: "rgba(242,239,233,0.06)" }}
              >
                <div className="flex items-center justify-end gap-4 mb-4">
                  <span
                    className="text-xs tracking-widest uppercase"
                    style={{ color: "var(--cement)" }}
                  >
                    Siguiente proyecto
                  </span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="motion-safe:transition-transform motion-safe:group-hover:translate-x-2"
                    style={{ color: "var(--cement)" }}
                  >
                    <path
                      d="M5 12h14M19 12l-7-7M19 12l-7 7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p
                  className="text-xl md:text-2xl font-semibold motion-safe:transition-colors"
                  style={{ color: "var(--off-white)" }}
                >
                  {nextProject.name}
                </p>
                <p
                  className="text-sm mt-1"
                  style={{ color: nextProject.accent }}
                >
                  {nextProject.category}
                </p>
              </Link>
            ) : (
              <div className="hidden md:block" />
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
