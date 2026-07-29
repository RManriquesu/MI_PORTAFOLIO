import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <p>© {year} Ronald Manrique. Hecho con Amor, React, TypeScript y Supabase.</p>
    </footer>
  )
}