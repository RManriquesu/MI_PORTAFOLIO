// 1. IMPORTACIONES
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export default function Login() {
  // 2. ESTADOS (State)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false) // Estado para alternar ver/ocultar contraseña
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false) // Estado para deshabilitar el botón mientras valida
  
  const navigate = useNavigate()

  // 3. FUNCIÓN DE AUTENTICACIÓN
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true) // Activamos el modo de carga

    // Petición a Supabase
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (error) {
      setError('Credenciales incorrectas. Revisa tu correo o contraseña.')
      setLoading(false) // Desactivamos la carga si falla
    } else {
      navigate('/admin') // Redirigimos si todo está bien
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        
        {/* Cabecera con Badge de Admin */}
        <div className="login-header">
          <span className="admin-badge">Panel Control</span>
          <h2 className="login-title">Bienvenido Sr. Admin</h2>
          <p className="login-subtitle">Ingresa tus credenciales para continuar</p>
        </div>
        
        {/* Formulario */}
        <form onSubmit={handleLogin} className="login-form">
          
          {/* Campo Email */}
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <div className="input-wrapper">
              <input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Campo Contraseña con Ojo Interactivo */}
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-wrapper password-wrapper">
              <input
                id="password"
                // Alterna entre 'text' y 'password' según el estado showPassword
                type={showPassword ? 'text' : 'password'} 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              
              {/* Botón para Mostrar / Ocultar Contraseña */}
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1} // Evita que se enfoque al presionar 'Tab'
                title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? (
                  /* Ícono Ojo Tachado (Ocultar) */
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
                ) : (
                  /* Ícono Ojo (Mostrar) */
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
          </div>

          {/* Mensaje de error estilizado */}
          {error && <div className="login-error">{error}</div>}

          {/* Botón con Estado de Carga (*Spinner*) */}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? (
              <span className="btn-loading">
                <span className="spinner"></span> Validando...
              </span>
            ) : (
              'Entrar al Dashboard'
            )}
          </button>

        </form>
      </div>
    </div>
  )
}