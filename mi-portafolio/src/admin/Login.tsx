// 1. IMPORTACIONES: Librerías y herramientas necesarias
import { useState } from 'react' // Hook de React para manejar variables de estado
import { useNavigate } from 'react-router-dom' // Hook para redirigir entre páginas de la app
import { supabase } from '../lib/supabaseClient' // Tu cliente de Supabase ya configurado

export default function Login() {
  // 2. ESTADOS (State): Variables que React vigila y vuelve a renderizar cuando cambian
  const [email, setEmail] = useState('')       // Almacena el correo que escribe el usuario
  const [password, setPassword] = useState('') // Almacena la contraseña escrita
  const [error, setError] = useState('')       // Almacena mensajes de error (si fallan las credenciales)
  
  const navigate = useNavigate() // Función para redirigir al usuario (ej: enviarlo a /admin)

  // 3. FUNCIÓN DE AUTENTICACIÓN: Se ejecuta al presionar "Entrar" o presionar Enter
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault() // Evita que la página recargue completamente al enviar el formulario
    
    // Petición asíncrona a Supabase para verificar email y contraseña
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    
    if (error) {
      // Si Supabase devuelve un error (ej: contraseña incorrecta), guardamos el mensaje en el estado
      setError(error.message)
    } else {
      // Si el login es exitoso, redirigimos al usuario a la vista /admin
      navigate('/admin')
    }
  }

  // 4. INTERFAZ VISUAL (JSX/TSX): Lo que se muestra en la pantalla
  return (
    /* Contenedor principal: Centra la tarjeta en pantalla (usa la clase del CSS global) */
    <div className="login-container">
      {/* Tarjeta flotante con fondo oscuro y bordes redondeados */}
      <div className="login-card">
        
        {/* Título principal de la tarjeta */}
        <h2 className="login-title">Bienvenido Sr. Admin</h2>
        
        {/* Formulario que activa handleLogin al enviarse */}
        <form onSubmit={handleLogin} className="login-form">
          
          {/* Campo: Correo electrónico */}
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email} // Conecta el valor del input con el estado 'email'
              onChange={(e) => setEmail(e.target.value)} // Actualiza el estado cuando el usuario escribe
              required
            />
          </div>

          {/* Campo: Contraseña */}
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password} // Conecta el valor del input con el estado 'password'
              onChange={(e) => setPassword(e.target.value)} // Actualiza el estado al escribir
              required
            />
          </div>

          {/* Renderizado condicional: Solo muestra este div si existe un mensaje de error */}
          {error && <div className="login-error">{error}</div>}

          {/* Botón de envío que hereda el estilo azul del botón '+ Nuevo proyecto' */}
          <button type="submit" className="login-btn">
            Entrar
          </button>

        </form>
      </div>
    </div>
  )
}