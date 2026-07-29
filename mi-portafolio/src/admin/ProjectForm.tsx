import { useState } from 'react'
import type { Project } from '../types'
import { supabase } from '../lib/supabaseClient'

interface ProjectFormProps {
  initialData?: Project
  onSaved: () => void
  onCancel: () => void
}

export default function ProjectForm({ initialData, onSaved, onCancel }: ProjectFormProps) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [description, setDescription] = useState(initialData?.description || '')
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || '')
  const [techStack, setTechStack] = useState(initialData?.tech_stack?.join(', ') || '')
  const [projectUrl, setProjectUrl] = useState(initialData?.project_url || '')
  const [githubUrl, setGithubUrl] = useState(initialData?.github_url || '')
  const [featured, setFeatured] = useState(initialData?.featured || false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = {
      title,
      description,
      image_url: imageUrl || null,
      tech_stack: techStack.split(',').map((t) => t.trim()).filter(Boolean),
      project_url: projectUrl || null,
      github_url: githubUrl || null,
      featured,
    }

    const { error } = initialData
      ? await supabase.from('projects').update(payload).eq('id', initialData.id)
      : await supabase.from('projects').insert(payload)

    setSaving(false)

    if (error) {
      setError(error.message)
    } else {
      onSaved()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="admin-form">
      <label>
        Título
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>

      <label>
        Descripción
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
      </label>

      <label>
        URL de imagen
        <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </label>

      <label>
        Tecnologías (separadas por coma)
        <input value={techStack} onChange={(e) => setTechStack(e.target.value)} placeholder="React, TypeScript, Supabase" />
      </label>

      <label>
        URL del proyecto en vivo
        <input value={projectUrl} onChange={(e) => setProjectUrl(e.target.value)} />
      </label>

      <label>
        URL de GitHub
        <input value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
      </label>

      <label className="checkbox-label">
        <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
        Destacado
      </label>

      {error && <p className="form-error">{error}</p>}

      <div className="form-actions">
        <button type="submit" disabled={saving}>
          {saving ? 'Guardando...' : initialData ? 'Actualizar' : 'Crear'}
        </button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  )
}