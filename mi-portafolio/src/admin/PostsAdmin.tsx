import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import type { Post } from '../types'
import PostForm from './PostForm'

export default function PostsAdmin() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Post | null>(null)
  const [showForm, setShowForm] = useState(false)

  async function fetchPosts() {
    setLoading(true)
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) setPosts(data as Post[])
    setLoading(false)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('¿Seguro que quieres eliminar este post?')) return
    await supabase.from('posts').delete().eq('id', id)
    fetchPosts()
  }

  const handleSaved = () => {
    setShowForm(false)
    setEditing(null)
    fetchPosts()
  }

  if (loading) return <p>Cargando...</p>

  if (showForm) {
    return (
      <PostForm
        initialData={editing || undefined}
        onSaved={handleSaved}
        onCancel={() => { setShowForm(false); setEditing(null) }}
      />
    )
  }

  return (
    <div>
      <div className="admin-header">
        <h3>Blog ({posts.length})</h3>
        <button onClick={() => { setEditing(null); setShowForm(true) }}>+ Nuevo post</button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Publicado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.published ? '✅' : '📝 Borrador'}</td>
              <td>
                <button onClick={() => { setEditing(post); setShowForm(true) }}>Editar</button>
                <button onClick={() => handleDelete(post.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}