import { notFound } from "next/navigation"
import { PROJECTS } from "@/lib/portfolio/data"
import { ProjectDetail } from "@/components/portfolio/project-detail"
import type { Metadata } from "next"

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({ id: project.id }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params
  const project = PROJECTS.find((p) => p.id === id)

  if (!project) {
    return { title: "Proyecto no encontrado" }
  }

  return {
    title: `${project.name} | Julieta Ramos Arquitectura`,
    description: project.desc,
    openGraph: {
      title: project.name,
      description: project.desc,
      type: "article",
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const project = PROJECTS.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  const projectIndex = PROJECTS.findIndex((p) => p.id === id)
  const prevProject = projectIndex > 0 ? PROJECTS[projectIndex - 1] : null
  const nextProject = projectIndex < PROJECTS.length - 1 ? PROJECTS[projectIndex + 1] : null

  return (
    <ProjectDetail
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
    />
  )
}
