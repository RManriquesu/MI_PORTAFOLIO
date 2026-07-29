import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import type { Post } from '../types'
import './BlogPost.css'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()

      if (error || !data) {
        setNotFound(true)
      } else {
        setPost(data as Post)
      }
      setLoading(false)
    }

    fetchPost()
  }, [slug])

  if (loading) return <p>Cargando...</p>
  if (notFound || !post) return <p>Artículo no encontrado. <Link to="/blog">Volver al blog</Link></p>

  return (
    <article className="blog-post">
      {post.cover_image && <img src={post.cover_image} alt={post.title} className="blog-post-img" />}
      <h1>{post.title}</h1>
      <div className="blog-post-content">
        {post.content.split('\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      <Link to="/blog">← Volver al blog</Link>
    </article>
  )
}