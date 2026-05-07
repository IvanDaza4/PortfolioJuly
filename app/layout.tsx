import type { Metadata, Viewport } from "next"
import { Inter, Cormorant_Garamond } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Julieta Méndez · Arquitectura",
  description:
    "Estudio de arquitectura especializado en obra residencial, cultural y de paisaje. Proyectos que articulan silencio, escala y emoción desde Buenos Aires, Argentina.",
  keywords: [
    "arquitectura",
    "estudio de arquitectura",
    "Buenos Aires",
    "Argentina",
    "diseño residencial",
    "interiorismo",
    "Julieta Méndez",
  ],
  authors: [{ name: "Julieta Bruzzese" }],
  creator: "Julieta Bruzzese",
  openGraph: {
    title: "Julieta Bruzzese · Arquitectura",
    description:
      "Arquitectura de precisión material. Espacios que articulan silencio, escala y emoción.",
    locale: "es_AR",
    type: "website",
  },
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${cormorant.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
