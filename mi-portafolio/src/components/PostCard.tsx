import { Link } from 'react-router-dom'
import type { Post } from '../types'
import './PostCard.css'

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="post-card">
      {post.cover_image && (
        <img src={post.cover_image} alt={post.title} className="post-card-img" />
      )}
      <div className="post-card-body">
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
      </div>
    </Link>
  )
}