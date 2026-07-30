import { Download } from 'lucide-react'
import './About.css'

const timeline = [
  {
    year: '2025 - Presente',
    title: 'Desarrollador Full Stack',
    place: 'Universidad Nacional de San Agustin de Arequipa',
    description: 'Actualmente, siendo un estudiante de Ingenieria de Sistemas e Informatica',
  },
  {
    year: '2017 - 2021',
    title: 'Estudios Secundarios',
    place: 'I.E SEBASTIAN BARRANCA',
    description: 'Se aprendio lo basico para poder desempeñarse en mis estudios superiores',
  },
  {
    year: '2005 - 2016',
    title: 'Teniendo la vida de un inocente niño ',
    place: 'Mi ciudad natal: Camaná',
    description: 'La vida de un niño como ya todo el mundo sabe, es completamente deiferente en cada uno...',
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