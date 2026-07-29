export interface Project {
  id: string
  title: string
  description: string
  image_url: string | null
  tech_stack: string[]
  project_url: string | null
  github_url: string | null
  featured: boolean
  created_at: string
}

export interface Skill {
  id: string
  name: string
  category: string
  level: number
  created_at: string
}

export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  cover_image: string | null
  published: boolean
  created_at: string
}

export interface Message {
  id: string
  name: string
  email: string
  message: string
  read: boolean
  created_at: string
}