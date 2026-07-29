import { Download } from 'lucide-react'
import './About.css'

const timeline = [
  {
    year: '2026 - Presente',
    title: 'Desarrollador Full Stack',
    place: 'New project',
    description: 'Descripción breve de tus responsabilidades y logros.',
  },
  {
    year: '2022 - 2024',
    title: 'Estudios en Desarrollo de Software',
    place: 'Nombre de la institución',
    description: 'Lo que aprendiste, proyectos destacados, etc.',
  },
  {
    year: '2021',
    title: 'Primer proyecto / trabajo',
    place: 'Nombre de la empresa o proyecto',
    description: 'Breve descripción.',
  },
]

export default function About() {
  return (
    <section className="about-section">
      <h2>Sobre mí</h2>
      <p className="about-intro">
        Aquí va tu párrafo de presentación: quién eres, qué te apasiona del desarrollo,
        qué tipo de proyectos te gusta construir, y qué te hace diferente.
      </p>

      <a href="/cv.pdf" download className="cv-download">
        <Download size={18} />
        Descargar CV
      </a>

      <h3 className="timeline-heading">Experiencia y estudios</h3>
      <div className="timeline">
        {timeline.map((item, i) => (
          <div key={i} className="timeline-item">
            <span className="timeline-year">{item.year}</span>
            <h4>{item.title}</h4>
            <span className="timeline-place">{item.place}</span>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}