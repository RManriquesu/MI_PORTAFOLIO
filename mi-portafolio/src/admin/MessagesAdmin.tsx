import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import type { Message } from '../types'

export default function MessagesAdmin() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchMessages() {
    setLoading(true)
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) setMessages(data as Message[])
    setLoading(false)
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const markAsRead = async (id: string) => {
    await supabase.from('messages').update({ read: true }).eq('id', id)
    fetchMessages()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este mensaje?')) return
    await supabase.from('messages').delete().eq('id', id)
    fetchMessages()
  }

  if (loading) return <p>Cargando...</p>

  return (
    <div>
      <h3>Mensajes ({messages.length})</h3>
      {messages.length === 0 ? (
        <p>No hay mensajes todavía.</p>
      ) : (
        <div className="messages-list">
          {messages.map((msg) => (
            <div key={msg.id} className="message-item" style={{ opacity: msg.read ? 0.6 : 1 }}>
              <strong>{msg.name}</strong> ({msg.email})
              <p>{msg.message}</p>
              <small>{new Date(msg.created_at).toLocaleString()}</small>
              <div className="form-actions">
                {!msg.read && <button onClick={() => markAsRead(msg.id)}>Marcar leído</button>}
                <button onClick={() => handleDelete(msg.id)}>Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}