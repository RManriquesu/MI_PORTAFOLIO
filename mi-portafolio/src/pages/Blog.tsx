import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import type { Post } from '../types'
import PostCard from '../components/PostCard'
import './Blog.css'

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })

      if (!error && data) setPosts(data as Post[])
      setLoading(false)
    }

    fetchPosts()
  }, [])

  if (loading) return <p>Cargando artículos...</p>

  return (
    <section>
      <h2>Blog</h2>
      {posts.length === 0 ? (
        <p>Todavía no hay artículos publicados.</p>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  )
}