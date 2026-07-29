import type { Skill } from '../types'
import './SkillBar.css'

export default function SkillBar({ skill }: { skill: Skill }) {
  return (
    <div className="skill-bar">
      <div className="skill-bar-header">
        <span>{skill.name}</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{ width: `${(skill.level / 5) * 100}%` }}
        />
      </div>
    </div>
  )
}