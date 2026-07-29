import type { Project } from '../types'
import './ProjectCard.css'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      {project.image_url && (
        <img src={project.image_url} alt={project.title} className="project-card-img" />
      )}
      <div className="project-card-body">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-card-tags">
          {project.tech_stack?.map((tech) => (
            <span key={tech} className="tag">{tech}</span>
          ))}
        </div>
        <div className="project-card-links">
          {project.project_url && (
            <a href={project.project_url} target="_blank" rel="noreferrer">Ver sitio</a>
          )}
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noreferrer">GitHub</a>
          )}
        </div>
      </div>
    </article>
  )
}