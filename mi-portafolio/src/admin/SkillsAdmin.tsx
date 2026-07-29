import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import type { Skill } from '../types'
import SkillForm from './SkillForm'

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Skill | null>(null)
  const [showForm, setShowForm] = useState(false)

  async function fetchSkills() {
    setLoading(true)
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('category', { ascending: true })

    if (!error && data) setSkills(data as Skill[])
    setLoading(false)
  }

  useEffect(() => {
    fetchSkills()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('¿Seguro que quieres eliminar esta habilidad?')) return
    await supabase.from('skills').delete().eq('id', id)
    fetchSkills()
  }

  const handleSaved = () => {
    setShowForm(false)
    setEditing(null)
    fetchSkills()
  }

  if (loading) return <p>Cargando...</p>

  if (showForm) {
    return (
      <SkillForm
        initialData={editing || undefined}
        onSaved={handleSaved}
        onCancel={() => { setShowForm(false); setEditing(null) }}
      />
    )
  }

  return (
    <div>
      <div className="admin-header">
        <h3>Habilidades ({skills.length})</h3>
        <button onClick={() => { setEditing(null); setShowForm(true) }}>+ Nueva habilidad</button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Nivel</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr key={skill.id}>
              <td>{skill.name}</td>
              <td>{skill.category}</td>
              <td>{skill.level}/5</td>
              <td>
                <button onClick={() => { setEditing(skill); setShowForm(true) }}>Editar</button>
                <button onClick={() => handleDelete(skill.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}