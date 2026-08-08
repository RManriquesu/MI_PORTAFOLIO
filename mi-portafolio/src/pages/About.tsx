import { Download } from 'lucide-react'
import './About.css'

const timeline = [
  {
    year: '2025 - Presente',
    title: 'Desarrollador Full Stack',
    place: 'Universidad Nacional de San Agustin de Arequipa',
    description: 'Actualmente, siendo un estudiante de Ingenieria de Sistemas e Informatica en la Universidad Nacionald de San Agustin de Arequipa.',
  },
  {
    year: '2017 - 2021',
    title: 'Estudios Secundarios',
    place: 'I.E SEBASTIAN BARRANCA',
    description: 'Se aprendio lo basico para poder desempeñarse en mis estudios superiores.',
  },
  {
    year: '2005 - 2016',
    title: 'Teniendo la vida de un inocente niño ',
    place: 'Mi ciudad natal: Camaná',
    description: 'La vida de un niño como ya todo el mundo sabe, es completamente diferente en cada uno...',
  },
]

export default function About() {
  return (
    <section className="about-section">
      <h2>Sobre mí</h2>
      <p className="about-intro">
        ¡Hola! Soy Ronald Manrique, desarrollador Full Stack y estudiante de Ingeniería de Sistemas e Informática en la Universidad Nacional de San Agustín de Arequipa.

         Me apasiona transformar ideas complejas en productos digitales ágiles, escalables y visualmente atractivos. Mi enfoque combina la lógica del backend con experiencias de usuario fluidas en el frontend, utilizando tecnologías modernas como React, TypeScript y Supabase. Orgullosamente originario de Camaná, busco constantemente nuevos retos tecnológicos que me permitan seguir aprendiendo, creando software de alto impacto y aportando soluciones reales.
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