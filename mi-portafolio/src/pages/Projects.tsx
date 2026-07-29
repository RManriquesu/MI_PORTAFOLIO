import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import type { Project } from '../types'
import ProjectCard from '../components/ProjectCard'
import './Projects.css'

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        setError(error.message)
      } else {
        setProjects(data as Project[])
      }
      setLoading(false)
    }

    fetchProjects()
  }, [])

  if (loading) return <p>Cargando proyectos...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <section>
      <h2>Proyectos</h2>
      {projects.length === 0 ? (
        <p>Todavía no hay proyectos publicados.</p>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </section>
  )
}