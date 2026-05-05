


// ─── DATA & TYPES ─────────────────────────────────────────────────────────────
// Cambiar `img: null` por `img: "/fotos/nombre.jpg"` para reemplazar por foto real.

export type PlaceholderShape = "casa" | "loft" | "pabellon" | "bodega" | "clinica"

export type ImageType = "render" | "planta" | "foto"

export interface ProjectImage {
    src: string
    alt: string
    aspect: "portrait" | "landscape" | "square"
    type: ImageType
}

export interface Project {
    id: string
    name: string
    category: string
    location: string
    desc: string
    accent: string
    placeholder: {
        bg: [string, string, string]
        lines: string
        shape: PlaceholderShape
    }
    img: string | null
    gallery?: ProjectImage[]
}

export const PROJECTS: Project[] = [
    {
        id: "01",
        name: "Centro Cultural Pompeya",
        category: "Centro Cultural · 2025",
        location: "Nueva Pompeya, Buenos Aires",
        desc: "Vivienda unifamiliar implantada sobre ladera. Estructura de hormigón expuesto, celosías de madera y doble altura central.",
        accent: "#B8956A",
        placeholder: { bg: ["#1A1208", "#2C1E0A", "#0D0905"], lines: "#B8956A", shape: "casa" },
        img: "/cc3.jpeg",
        gallery: [
            { src: "/cc1.jpeg", alt: "Fachada principal Casa Miradores", aspect: "portrait", type: "render" },
            { src: "/cc2.jpeg", alt: "Vista interior doble altura", aspect: "landscape", type: "render" },
            { src: "/cc3.jpeg", alt: "Planta baja arquitectónica", aspect: "square", type: "render" },
            { src: "/cc4.jpeg", alt: "Terraza con vista a montañas", aspect: "landscape", type: "render" },
            { src: "/cc5.jpeg", alt: "Escalera de hormigón", aspect: "portrait", type: "render" },
            { src: "/cc6.jpeg", alt: "Planta alta con distribución", aspect: "landscape", type: "render" },
            { src: "/cc7.jpeg", alt: "Render exterior atardecer", aspect: "portrait", type: "render" },
            { src: "/cc8.jpeg", alt: "Fachada principal Casa Miradores", aspect: "portrait", type: "render" },
            { src: "/cc9.jpeg", alt: "Vista interior doble altura", aspect: "landscape", type: "render" },
            { src: "/cc10.jpeg", alt: "Planta baja arquitectónica", aspect: "square", type: "render" },
            { src: "/cc11.jpeg", alt: "Terraza con vista a montañas", aspect: "landscape", type: "render" },
            { src: "/cc12.jpeg", alt: "Escalera de hormigón", aspect: "portrait", type: "planta" },
            { src: "/cc13.jpeg", alt: "Planta alta con distribución", aspect: "landscape", type: "planta" },
            { src: "/cc14.jpeg", alt: "Render exterior atardecer", aspect: "portrait", type: "planta" },
            { src: "/cc15.jpeg", alt: "Fachada principal Casa Miradores", aspect: "portrait", type: "planta" },
            { src: "/cc16.jpeg", alt: "Vista interior doble altura", aspect: "landscape", type: "planta" },
            { src: "/cc17.jpeg", alt: "Planta baja arquitectónica", aspect: "square", type: "planta" },
            { src: "/cc18.jpeg", alt: "Terraza con vista a montañas", aspect: "landscape", type: "planta" },
            { src: "/cc19.jpeg", alt: "Escalera de hormigón", aspect: "portrait", type: "planta" },
            { src: "/cc20.jpeg", alt: "Planta alta con distribución", aspect: "landscape", type: "planta" },
            { src: "/cc21.jpeg", alt: "Render exterior atardecer", aspect: "portrait", type: "planta" },

        ]
    },
    {
        id: "02",
        name: "Vivienda Unifamiliar",
        category: "Vivienda · 2025",
        location: "Buenos Aires, AR",
        desc: "Reconversión industrial de 180m². Vigas de acero a la vista, pavimento de microcemento continuo y mueblería de encargo.",
        accent: "#8EA4C4",
        placeholder: { bg: ["#0A0E14", "#141C26", "#060810"], lines: "#8EA4C4", shape: "loft" },
        img: null,
        gallery: [
            { src: "/placeholder.svg?height=600&width=900", alt: "Espacio principal del loft", aspect: "landscape", type: "foto" },
            { src: "/placeholder.svg?height=800&width=600", alt: "Vigas de acero expuestas", aspect: "portrait", type: "foto" },
            { src: "/placeholder.svg?height=700&width=700", alt: "Planta de distribución loft", aspect: "square", type: "planta" },
            { src: "/placeholder.svg?height=800&width=600", alt: "Render cocina integrada", aspect: "portrait", type: "render" },
            { src: "/placeholder.svg?height=600&width=900", alt: "Detalle mueblería de encargo", aspect: "landscape", type: "foto" },
            { src: "/placeholder.svg?height=700&width=700", alt: "Baño con microcemento", aspect: "square", type: "foto" },
            { src: "/placeholder.svg?height=600&width=900", alt: "Render dormitorio principal", aspect: "landscape", type: "render" },
            { src: "/placeholder.svg?height=800&width=600", alt: "Planta técnica instalaciones", aspect: "portrait", type: "planta" },
        ],
    },
    {
        id: "03",
        name: "Pabellón Valdés",
        category: "Espacio Cultural · 2023",
        location: "Patagonia, AR",
        desc: "Galería de arte efímera. Estructura metálica liviana, cubierta translúcida y relación directa con el paisaje estepario.",
        accent: "#7AB89A",
        placeholder: { bg: ["#081410", "#0E2018", "#040A08"], lines: "#7AB89A", shape: "pabellon" },
        img: null,
        gallery: [
            { src: "/placeholder.svg?height=600&width=900", alt: "Vista exterior del pabellón", aspect: "landscape", type: "foto" },
            { src: "/placeholder.svg?height=800&width=600", alt: "Interior con cubierta translúcida", aspect: "portrait", type: "foto" },
            { src: "/placeholder.svg?height=600&width=900", alt: "Render relación con paisaje", aspect: "landscape", type: "render" },
            { src: "/placeholder.svg?height=700&width=700", alt: "Planta general pabellón", aspect: "square", type: "planta" },
            { src: "/placeholder.svg?height=800&width=600", alt: "Detalle estructura metálica", aspect: "portrait", type: "foto" },
            { src: "/placeholder.svg?height=600&width=900", alt: "Render vista nocturna", aspect: "landscape", type: "render" },
        ],
    },
    {
        id: "04",
        name: "Bodega Altura",
        category: "Comercial · 2022",
        location: "San Juan, AR",
        desc: "Programa de producción y enoturismo a 1.800 msnm. Muro de piedra laja local, cubierta verde y cava subterránea.",
        accent: "#C47A5A",
        placeholder: { bg: ["#160A06", "#261410", "#0D0604"], lines: "#C47A5A", shape: "bodega" },
        img: null,
        gallery: [
            { src: "/placeholder.svg?height=600&width=900", alt: "Fachada con muro de piedra", aspect: "landscape", type: "foto" },
            { src: "/placeholder.svg?height=800&width=600", alt: "Cava subterránea", aspect: "portrait", type: "foto" },
            { src: "/placeholder.svg?height=700&width=700", alt: "Planta bodega nivel 0", aspect: "square", type: "planta" },
            { src: "/placeholder.svg?height=600&width=900", alt: "Render sala de degustación", aspect: "landscape", type: "render" },
            { src: "/placeholder.svg?height=800&width=600", alt: "Detalle piedra laja local", aspect: "portrait", type: "foto" },
            { src: "/placeholder.svg?height=600&width=900", alt: "Cubierta verde y viñedos", aspect: "landscape", type: "foto" },
            { src: "/placeholder.svg?height=700&width=700", alt: "Planta cava subterránea", aspect: "square", type: "planta" },
            { src: "/placeholder.svg?height=800&width=600", alt: "Render exterior atardecer", aspect: "portrait", type: "render" },
        ],
    },
    {
        id: "05",
        name: "Clínica Luz",
        category: "Salud · 2022",
        location: "Córdoba, AR",
        desc: "Centro médico ambulatorio. Circulaciones diferenciadas por color, iluminación cenital y patios interiores para bienestar del paciente.",
        accent: "#A0B4C8",
        placeholder: { bg: ["#0C1018", "#141C28", "#080C12"], lines: "#A0B4C8", shape: "clinica" },
        img: null,
        gallery: [
            { src: "/placeholder.svg?height=600&width=900", alt: "Render recepción con iluminación cenital", aspect: "landscape", type: "render" },
            { src: "/placeholder.svg?height=800&width=600", alt: "Patio interior", aspect: "portrait", type: "foto" },
            { src: "/placeholder.svg?height=700&width=700", alt: "Planta general clínica", aspect: "square", type: "planta" },
            { src: "/placeholder.svg?height=600&width=900", alt: "Sala de espera", aspect: "landscape", type: "foto" },
            { src: "/placeholder.svg?height=800&width=600", alt: "Render circulaciones color", aspect: "portrait", type: "render" },
            { src: "/placeholder.svg?height=600&width=900", alt: "Planta circulaciones técnicas", aspect: "landscape", type: "planta" },
        ],
    },
]

// Sections meta — usado por el menú overlay y para anchors
export const SECTIONS = [
    { id: "proyectos", label: "Proyectos" },
    { id: "filosofia", label: "Filosofía" },
    { id: "estudio", label: "Estudio" },
    { id: "contacto", label: "Contacto" },
] as const

export type SectionId = (typeof SECTIONS)[number]["id"]

