import { Outlet } from 'react-router-dom'
import AdminSidebar from '../admin/components/AdminSidebar.jsx'
import Toast from '../components/Toast.jsx'
import { useSite } from '../context/SiteContext.jsx'

export default function AdminLayout() {
  const { toast } = useSite()
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0B0F14' }}>
      <AdminSidebar />
      <div style={{ flex: 1, minWidth: 0, padding: 20 }}>
        <Outlet />
      </div>
      <Toast message={toast} />
      <style>{`@media(max-width:820px){ main{padding:0} }`}</style>
    </div>
  )
}