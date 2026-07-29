import { Link } from 'react-router-dom'
import './Home.css'

export default function Home() {
  return (
    <section className="hero">
      <h1>Hola, soy Ronald Manrique</h1>
      <p>Estudiante de Ingenieria de Sistemas</p>
      <h2>Desarrollador de Sotware Jr</h2>
      <div className="hero-cta">
        <Link to="/proyectos" className="btn btn-primary btn-glow">Ver proyectos</Link>
        <Link to="/contacto" className="btn btn-outline">Contáctame</Link>
      </div>
    </section>
  )
}