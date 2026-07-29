import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import type { Skill } from '../types'
import SkillBar from '../components/SkillBar'
import './Skills.css'

const CATEGORY_LABELS: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Herramientas',
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSkills() {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('level', { ascending: false })

      if (!error && data) {
        setSkills(data as Skill[])
      }
      setLoading(false)
    }

    fetchSkills()
  }, [])

  if (loading) return <p>Cargando habilidades...</p>

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category || 'otros'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(skill)
    return acc
  }, {})

  return (
    <section>
      <h2>Habilidades</h2>
      <div className="skills-groups">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="skills-group">
            <h3>{CATEGORY_LABELS[category] || category}</h3>
            {items.map((skill) => (
              <SkillBar key={skill.id} skill={skill} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}