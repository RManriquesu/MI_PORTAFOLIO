import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <section className="hero">
      <h1>Hola, soy Ronald Manrique</h1>
      <p>Desarrollador de software</p>
      <div className="hero-cta">
        <Link to="/proyectos" className="primary">Ver proyectos</Link>
        <Link to="/contacto" className="secondary">Contáctame</Link>
      </div>
    </section>
  )
}