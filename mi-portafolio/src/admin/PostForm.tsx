import { useState } from 'react'
import type { Post } from '../types'
import { supabase } from '../lib/supabaseClient'

interface PostFormProps {
  initialData?: Post
  onSaved: () => void
  onCancel: () => void
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

export default function PostForm({ initialData, onSaved, onCancel }: PostFormProps) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '')
  const [content, setContent] = useState(initialData?.content || '')
  const [coverImage, setCoverImage] = useState(initialData?.cover_image || '')
  const [published, setPublished] = useState(initialData?.published || false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = {
      title,
      slug: initialData?.slug || slugify(title),
      excerpt,
      content,
      cover_image: coverImage || null,
      published,
    }

    const { error } = initialData
      ? await supabase.from('posts').update(payload).eq('id', initialData.id)
      : await supabase.from('posts').insert(payload)

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
        Resumen (excerpt)
        <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} />
      </label>

      <label>
        Contenido
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} />
      </label>

      <label>
        URL de imagen de portada
        <input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
      </label>

      <label className="checkbox-label">
        <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
        Publicado
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