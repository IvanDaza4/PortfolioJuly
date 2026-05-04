"use client"

import { useState } from "react"
import { Cursor } from "@/components/portfolio/cursor"
import { Noise } from "@/components/portfolio/noise"
import { MenuOverlay } from "@/components/portfolio/menu-overlay"
import { Header } from "@/components/portfolio/header"
import { HeroSection } from "@/components/portfolio/hero-section"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { AboutSection } from "@/components/portfolio/about-section"
import { PhilosophySection } from "@/components/portfolio/philosophy-section"
import { ContactSection } from "@/components/portfolio/contact-section"
import { Footer } from "@/components/portfolio/footer"
import { FeaturedGallery } from "@/components/portfolio/featured-gallery"

export default function JulietaPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div
      className="portfolio-shell"
      style={{
        fontFamily: "var(--font-sans)",
        background: "var(--iron-deep)",
        minHeight: "100vh",
      }}
    >
      <Noise />
      <Cursor />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main>
        <HeroSection />
        <ProjectsSection />
        <FeaturedGallery />
        <AboutSection />
        <PhilosophySection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}
