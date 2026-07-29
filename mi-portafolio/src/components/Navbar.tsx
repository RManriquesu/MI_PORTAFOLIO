import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import './Navbar.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="navbar">
      <button className="navbar-toggle" onClick={() => setOpen(!open)}>
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div className={`navbar-links ${open ? 'open' : ''}`}>
        <NavLink to="/" onClick={() => setOpen(false)}>Inicio</NavLink>
        <NavLink to="/sobre-mi" onClick={() => setOpen(false)}>Sobre mí</NavLink>
        <NavLink to="/proyectos" onClick={() => setOpen(false)}>Proyectos</NavLink>
        <NavLink to="/habilidades" onClick={() => setOpen(false)}>Habilidades</NavLink>
        <NavLink to="/blog" onClick={() => setOpen(false)}>Blog</NavLink>
        <NavLink to="/contacto" onClick={() => setOpen(false)}>Contacto</NavLink>
      </div>
    </nav>
  )
}