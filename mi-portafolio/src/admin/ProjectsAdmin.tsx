import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import type { Project } from '../types'
import ProjectForm from './ProjectForm'

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Project | null>(null)
  const [showForm, setShowForm] = useState(false)

  async function fetchProjects() {
    setLoading(true)
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) setProjects(data as Project[])
    setLoading(false)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('¿Seguro que quieres eliminar este proyecto?')) return
    await supabase.from('projects').delete().eq('id', id)
    fetchProjects()
  }

  const handleSaved = () => {
    setShowForm(false)
    setEditing(null)
    fetchProjects()
  }

  if (loading) return <p>Cargando...</p>

  if (showForm) {
    return (
      <ProjectForm
        initialData={editing || undefined}
        onSaved={handleSaved}
        onCancel={() => { setShowForm(false); setEditing(null) }}
      />
    )
  }

  return (
    <div>
      <div className="admin-header">
        <h3>Proyectos ({projects.length})</h3>
        <button onClick={() => { setEditing(null); setShowForm(true) }}>+ Nuevo proyecto</button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Destacado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.title}</td>
              <td>{project.featured ? '⭐⭐⭐⭐' : '-'}</td>
              <td>
                <button onClick={() => { setEditing(project); setShowForm(true) }}>Editar</button>
                <button onClick={() => handleDelete(project.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}