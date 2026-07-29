import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import ProjectsAdmin from './ProjectsAdmin'
import SkillsAdmin from './SkillsAdmin'
import PostsAdmin from './PostsAdmin'
import './admin.css'
import MessagesAdmin from './MessagesAdmin'

type Tab = 'projects' | 'skills' | 'posts' | 'messages'

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>('projects')
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  return (
    <div>
      <div className="admin-header">
        <h2>Panel de administración</h2>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>

      <div className="admin-tabs">
        <button className={tab === 'projects' ? 'active' : ''} onClick={() => setTab('projects')}>Proyectos</button>
        <button className={tab === 'skills' ? 'active' : ''} onClick={() => setTab('skills')}>Habilidades</button>
        <button className={tab === 'posts' ? 'active' : ''} onClick={() => setTab('posts')}>Blog</button>
        <button className={tab === 'messages' ? 'active' : ''} onClick={() => setTab('messages')}>Mensajes</button>
      </div>

      {tab === 'projects' && <ProjectsAdmin />}
      {tab === 'skills' && <SkillsAdmin />}
      {tab === 'posts' && <PostsAdmin />}
      {tab === 'messages' && <MessagesAdmin />}
    </div>
  )
}

