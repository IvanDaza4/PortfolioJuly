


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
        img: "/cc3.png",
        gallery: [
            { src: "/cc1.png", alt: "Fachada principal Casa Miradores", aspect: "portrait", type: "render" },
            { src: "/cc2.png", alt: "Vista interior doble altura", aspect: "landscape", type: "render" },
            { src: "/cc3.png", alt: "Planta baja arquitectónica", aspect: "square", type: "render" },
            { src: "/cc4.png", alt: "Terraza con vista a montañas", aspect: "landscape", type: "render" },
            { src: "/cc5.png", alt: "Escalera de hormigón", aspect: "portrait", type: "render" },
            { src: "/cc6.png", alt: "Planta alta con distribución", aspect: "landscape", type: "render" },
            { src: "/cc7.png", alt: "Render exterior atardecer", aspect: "portrait", type: "render" },
            { src: "/cc8.png", alt: "Fachada principal Casa Miradores", aspect: "portrait", type: "render" },
            { src: "/cc9.png", alt: "Vista interior doble altura", aspect: "landscape", type: "render" },
            { src: "/cc10.png", alt: "Planta baja arquitectónica", aspect: "square", type: "render" },
            { src: "/cc11.jpeg", alt: "Terraza con vista a montañas", aspect: "landscape", type: "planta" },
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
        name: "Mercado de Abastecimiento",
        category: "Mercado · 2025",
        location: "Nueva Pompeya, Buenos Aires",
        desc: "Reconversión industrial de 180m². Vigas de acero a la vista, pavimento de microcemento continuo y mueblería de encargo.",
        accent: "#8EA4C4",
        placeholder: { bg: ["#0A0E14", "#141C26", "#060810"], lines: "#8EA4C4", shape: "loft" },
        img: '/m5.png',
        gallery: [
            { src: "/m5.png", alt: "Detalle mueblería de encargo", aspect: "landscape", type: "render" },
            { src: "/m6.jpg", alt: "Baño con microcemento", aspect: "square", type: "planta" },
            { src: "/m7.jpg", alt: "Render dormitorio principal", aspect: "landscape", type: "render" },
            { src: "/m8.jpg", alt: "Planta técnica instalaciones", aspect: "portrait", type: "render" },
            { src: "/m9.jpg", alt: "Espacio principal del loft", aspect: "landscape", type: "planta" },
            { src: "/m10.jpg", alt: "Vigas de acero expuestas", aspect: "portrait", type: "planta" },
            { src: "/m11.jpg", alt: "Planta de distribución loft", aspect: "square", type: "planta" },
            { src: "/m12.jpg", alt: "Render cocina integrada", aspect: "portrait", type: "render" },
            { src: "/m13.jpg", alt: "Detalle mueblería de encargo", aspect: "landscape", type: "render" },
            { src: "/m14.jpg", alt: "Baño con microcemento", aspect: "square", type: "render" },

        ],
    },
    {
        id: "03",
        name: "Casa Unifamiliar -Madero-",
        category: "Vivienda · 2025",
        location: "Ciudad Madero, Buenos Aires",
        desc: "Galería de arte efímera. Estructura metálica liviana, cubierta translúcida y relación directa con el paisaje estepario.",
        accent: "#7AB89A",
        placeholder: { bg: ["#081410", "#0E2018", "#040A08"], lines: "#7AB89A", shape: "pabellon" },
        img: '/cu5.png',
        gallery: [
            { src: "/cu1.jpg", alt: "Vista exterior del pabellón", aspect: "landscape", type: "planta" },
            { src: "/cu2.png", alt: "Interior con cubierta translúcida", aspect: "portrait", type: "render" },
            { src: "/cu3.png", alt: "Render relación con paisaje", aspect: "landscape", type: "render" },
            { src: "/cu4.png", alt: "Planta general pabellón", aspect: "square", type: "render" },
            { src: "/cu5.png", alt: "Detalle estructura metálica", aspect: "portrait", type: "render" },
            { src: "/cu6.jpeg", alt: "Render vista nocturna", aspect: "landscape", type: "planta" },
            { src: "/cu7.png", alt: "Render relación con paisaje", aspect: "landscape", type: "render" },
            { src: "/cu8.png", alt: "Planta general pabellón", aspect: "square", type: "render" },
            { src: "/cu9.png", alt: "Detalle estructura metálica", aspect: "portrait", type: "render" },
            { src: "/cu10.png", alt: "Render vista nocturna", aspect: "landscape", type: "render" },

        ],
    },
    {
        id: "04",
        name: "Vivienda Unifamiliar -Barracas-",
        category: "Vivienda · 2025",
        location: "Barracas, Buenos Aires",
        desc: "Programa de producción y enoturismo a 1.800 msnm. Muro de piedra laja local, cubierta verde y cava subterránea.",
        accent: "#C47A5A",
        placeholder: { bg: ["#160A06", "#261410", "#0D0604"], lines: "#C47A5A", shape: "bodega" },
        img: '/cub2.png',
        gallery: [
            { src: "/cub1.png", alt: "Fachada con muro de piedra", aspect: "landscape", type: "render" },
            { src: "/cub2.png", alt: "Cava subterránea", aspect: "portrait", type: "render" },
            { src: "/cub3.jpg", alt: "Planta bodega nivel 0", aspect: "square", type: "planta" },
            { src: "/cub4.jpg", alt: "Render sala de degustación", aspect: "landscape", type: "planta" },
            { src: "/cub5.jpeg", alt: "Detalle piedra laja local", aspect: "portrait", type: "planta" },

        ],
    },
    {
        id: "05",
        name: "Jardin de Infantes",
        category: "Escolar · 2023",
        location: "Barracas, Buenos Aires",
        desc: "Establecimiento pre-escolar con capacidad para 100 chicos, ubicado en relación con una plaza y un antiguo galpón intervenido.Se dispone de aproximadamente 2.500 m",
        accent: "#A0B4C8",
        placeholder: { bg: ["#0C1018", "#141C28", "#080C12"], lines: "#A0B4C8", shape: "clinica" },
        img: '/j1.png',
        gallery: [
            { src: "/j1.png", alt: "Render recepción con iluminación cenital", aspect: "landscape", type: "render" },
            { src: "/j2.jpg", alt: "Patio interior", aspect: "portrait", type: "planta" },
            { src: "/j3.jpg", alt: "Planta general clínica", aspect: "square", type: "planta" },
            { src: "/j4.jpg", alt: "Sala de espera", aspect: "landscape", type: "render" },
            { src: "/j5.jpg", alt: "Render circulaciones color", aspect: "portrait", type: "planta" },
            { src: "/j6.png", alt: "Render circulaciones color", aspect: "portrait", type: "render" },
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

