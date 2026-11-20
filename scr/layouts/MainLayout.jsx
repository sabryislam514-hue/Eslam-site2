import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Toast from '../components/Toast.jsx'
import { useSite } from '../context/SiteContext.jsx'

export default function MainLayout() {
  const { toast } = useSite()
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
      <Toast message={toast} />
    </div>
  )
}