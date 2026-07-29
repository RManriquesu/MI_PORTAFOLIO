import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import './Contact.css'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { Mail } from 'lucide-react'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError('')

    const { error } = await supabase.from('messages').insert({ name, email, message })

    setSending(false)

    if (error) {
      setError('Hubo un problema al enviar tu mensaje. Intenta de nuevo.')
    } else {
      setSent(true)
      setName('')
      setEmail('')
      setMessage('')
    }
  }

  if (sent) {
    return (
      <section className="contact-section">
        <h2>¡Gracias por escribirme!</h2>
        <p>Te responderé lo antes posible.</p>
      </section>
    )
  }

  return (
    <section className="contact-section">
      <h2>Contacto</h2>
      <p>¿Tienes un proyecto en mente? Escríbeme.</p>

      <form onSubmit={handleSubmit} className="contact-form">
        <label>
          Nombre
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>

        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>

        <label>
          Mensaje
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} required />
        </label>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" disabled={sending}>
          {sending ? 'Enviando...' : 'Enviar mensaje'}
        </button>
      </form>
      <div className="social-links">
  <a href="https://github.com/RManriquesu" target="_blank" rel="noreferrer"><FaGithub size={20} /></a>
  <a href="https://linkedin.com/in/tuusuario" target="_blank" rel="noreferrer"><FaLinkedin size={20} /></a>
  <a href="ronaldms376@gmail.com"><Mail size={20} /></a>
      </div>
    </section>
  )
}