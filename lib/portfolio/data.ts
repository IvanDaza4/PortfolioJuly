


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
        desc: "CCP · Centro cultural integrado a la estación ferroviaria.Hormigón, madera y verde como materiales de un espacio público que une movilidad y comunidad.",
        accent: "#B8956A",
        placeholder: { bg: ["#1A1208", "#2C1E0A", "#0D0905"], lines: "#B8956A", shape: "casa" },
        img: "/cc3.png",
        gallery: [
            { src: "/cc1.png", alt: "Taller Teorico", aspect: "portrait", type: "render" },
            { src: "/cc2.png", alt: "Ingreso Semicubierto", aspect: "landscape", type: "render" },
            { src: "/cc3.png", alt: "Hormigon Visto y Celosia de Madera", aspect: "square", type: "render" },
            { src: "/cc4.png", alt: "Fachada", aspect: "landscape", type: "render" },
            { src: "/cc5.png", alt: "Patio Ingles, Expansión de Talleres", aspect: "portrait", type: "render" },
            { src: "/cc6.png", alt: "Ingreso de Doble Altura", aspect: "landscape", type: "render" },
            { src: "/cc7.png", alt: "Espacio de Muestras", aspect: "portrait", type: "render" },
            { src: "/cc8.png", alt: "Rampa y Juego de Terrazas, Conexion con el Anden", aspect: "portrait", type: "render" },
            { src: "/cc9.png", alt: "Patio Central", aspect: "landscape", type: "render" },
            { src: "/cc10.png", alt: "Rampa", aspect: "square", type: "render" },
            { src: "/cc20.jpeg", alt: "Vistas", aspect: "portrait", type: "planta" },
            { src: "/cc12.jpeg", alt: "Planta Subsuelo", aspect: "portrait", type: "planta" },
            { src: "/cc16.jpeg", alt: "Planta Baja", aspect: "portrait", type: "planta" },
            { src: "/cc 14.jpeg", alt: "Planta Alta", aspect: "portrait", type: "planta" },
            { src: "/cc17.jpeg", alt: "Planta de Techos", aspect: "square", type: "planta" },
            { src: "/cc19.jpeg", alt: "Vistas", aspect: "portrait", type: "planta" },
            { src: "/cc13.jpeg", alt: "Cortes", aspect: "landscape", type: "planta" },
            { src: "/cc15.jpeg", alt: "Cortes", aspect: "portrait", type: "planta" },
            { src: "/cc18.jpeg", alt: "Detalles Constructivos", aspect: "landscape", type: "planta" },
            { src: "/cc21.jpeg", alt: "Implantacion", aspect: "portrait", type: "planta" },
            { src: "/cc11.jpeg", alt: "Axo", aspect: "landscape", type: "planta" },

        ]
    },
    {
        id: "02",
        name: "Mercado de Abastecimiento",
        category: "Mercado · 2025",
        location: "Nueva Pompeya, Buenos Aires",
        desc: "Mercado Orgánico · Madera, cubierta verde y doble altura en un mercado barrial que hace del pasaje cotidiano una experiencia espacial.",
        accent: "#8EA4C4",
        placeholder: { bg: ["#0A0E14", "#141C26", "#060810"], lines: "#8EA4C4", shape: "loft" },
        img: '/m5.png',
        gallery: [
            { src: "/m1.jpg", alt: "Axo", aspect: "square", type: "planta" },
            { src: "/m2.jpg", alt: "Planta Baja", aspect: "square", type: "planta" },
            { src: "/m3.jpg", alt: "Planta Entrepiso", aspect: "square", type: "planta" },
            { src: "/m4.jpg", alt: "Planta Techos", aspect: "square", type: "planta" },
            { src: "/m6.jpg", alt: "Esquema Locales", aspect: "square", type: "planta" },
            { src: "/m11.jpg", alt: "Vista Fachada", aspect: "square", type: "planta" },
            { src: "/m9.jpg", alt: "Expansion Patio", aspect: "landscape", type: "planta" },
            { src: "/m10.jpg", alt: "Detalles Constructivos", aspect: "portrait", type: "planta" },
            { src: "/m5.png", alt: "Fachada Locales", aspect: "landscape", type: "render" },
            { src: "/m7.jpg", alt: "Espacio Doble Altura, Paseo Comercial", aspect: "landscape", type: "render" },
            { src: "/m8.jpg", alt: "Locales Bajo Anden", aspect: "portrait", type: "render" },
            { src: "/m12.jpg", alt: "Terraza Gastronomica", aspect: "portrait", type: "render" },
            { src: "/m13.jpg", alt: "Fachada, Acceso Secundario", aspect: "landscape", type: "render" },
            { src: "/m14.jpg", alt: "Acceso Principal", aspect: "square", type: "render" },

        ],
    },
    {
        id: "03",
        name: "Casa Unifamiliar -Madero-",
        category: "Vivienda · 2025",
        location: "Ciudad Madero, Buenos Aires",
        desc: "Piedra, madera y microcemento en una planta que gira sobre su patio: lote urbano resuelto con espacialidad generosa y fuerte vínculo interior–exterior.",
        accent: "#7AB89A",
        placeholder: { bg: ["#081410", "#0E2018", "#040A08"], lines: "#7AB89A", shape: "pabellon" },
        img: '/cu5.png',
        gallery: [
            { src: "/cu1.jpg", alt: "Vista", aspect: "landscape", type: "planta" },
            { src: "/cu2.png", alt: "Comedor", aspect: "portrait", type: "render" },
            { src: "/cu3.png", alt: "Patio", aspect: "landscape", type: "render" },
            { src: "/cu4.png", alt: "Cocina", aspect: "square", type: "render" },
            { src: "/cu5.png", alt: "Fachada", aspect: "portrait", type: "render" },
            { src: "/cu6.jpeg", alt: "Planta Axo", aspect: "landscape", type: "planta" },
            { src: "/cu7.png", alt: "Habitacion", aspect: "landscape", type: "render" },
            { src: "/cu8.png", alt: "Patio", aspect: "square", type: "render" },
            { src: "/cu9.png", alt: "Habitacion", aspect: "portrait", type: "render" },
            { src: "/cu10.png", alt: "Quincho", aspect: "landscape", type: "render" },

        ],
    },
    {
        id: "04",
        name: "Vivienda Unifamiliar -Barracas-",
        category: "Vivienda · 2025",
        location: "Barracas, Buenos Aires",
        desc: "Madera, celosía y piedra vista en una casa de dos plantas que construye su intimidad hacia adentro, con el patio como centro de la vida doméstica.",
        accent: "#C47A5A",
        placeholder: { bg: ["#160A06", "#261410", "#0D0604"], lines: "#C47A5A", shape: "bodega" },
        img: '/cub2.png',
        gallery: [
            { src: "/cub1.png", alt: "Patio Interno", aspect: "landscape", type: "render" },
            { src: "/cub2.png", alt: "Fachada Ingreso", aspect: "portrait", type: "render" },
            { src: "/cub4.jpg", alt: "Axo", aspect: "landscape", type: "planta" },
            { src: "/cub3.jpg", alt: "Planta Alta", aspect: "square", type: "planta" },
            { src: "/cub5.jpeg", alt: "Planta Baja", aspect: "portrait", type: "planta" },

        ],
    },
    {
        id: "05",
        name: "Jardin de Infantes",
        category: "Escolar · 2023",
        location: "Barracas, Buenos Aires",
        desc: "Ladrillo, hormigón y un patio central arbolado: arquitectura escolar que pone el verde y la luz natural en el centro de la experiencia educativa.",
        accent: "#A0B4C8",
        placeholder: { bg: ["#0C1018", "#141C28", "#080C12"], lines: "#A0B4C8", shape: "clinica" },
        img: '/j1.png',
        gallery: [
            { src: "/j1.png", alt: "Fachada Ingreso", aspect: "landscape", type: "render" },
            { src: "/j5.jpg", alt: "Axo", aspect: "portrait", type: "planta" },
            { src: "/j2.jpg", alt: "Planta", aspect: "portrait", type: "planta" },
            { src: "/j3.jpg", alt: "Corte", aspect: "square", type: "planta" },
            { src: "/j4.png", alt: "Patio Central", aspect: "landscape", type: "render" },
            { src: "/j6.png", alt: "Aula", aspect: "portrait", type: "render" },
        ],
    },
]

// Sections meta — usado por el menú overlay y para anchors
export const SECTIONS = [
    { id: "proyectos", label: "Proyectos" },
    { id: "estudio", label: "Estudio" },
    { id: "filosofia", label: "Filosofía" },
    { id: "contacto", label: "Contacto" },
] as const

export type SectionId = (typeof SECTIONS)[number]["id"]

