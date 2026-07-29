import { useState } from 'react'
import type { Skill } from '../types'
import { supabase } from '../lib/supabaseClient'

interface SkillFormProps {
  initialData?: Skill
  onSaved: () => void
  onCancel: () => void
}

export default function SkillForm({ initialData, onSaved, onCancel }: SkillFormProps) {
  const [name, setName] = useState(initialData?.name || '')
  const [category, setCategory] = useState(initialData?.category || 'frontend')
  const [level, setLevel] = useState(initialData?.level || 3)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = { name, category, level }

    const { error } = initialData
      ? await supabase.from('skills').update(payload).eq('id', initialData.id)
      : await supabase.from('skills').insert(payload)

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
        Nombre
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </label>

      <label>
        Categoría
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="tools">Herramientas</option>
        </select>
      </label>

      <label>
        Nivel (1-5)
        <input
          type="number"
          min={1}
          max={5}
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
        />
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