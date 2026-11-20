import { Link, NavLink, useLocation } from 'react-router-dom'
import { LayoutDashboard, Home, GraduationCap, UtensilsCrossed, ShoppingBag, ClipboardList, Settings, LogOut, Eye } from 'lucide-react'
import { useSite } from '../../context/SiteContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { isSupabaseConfigured } from '../../lib/supabase.js'

export default function AdminSidebar() {
  const { settings } = useSite()
  const { logout } = useAuth()
  const loc = useLocation()
  const links = [
    { to: '/admin', label: 'لوحة التحكم', icon: <LayoutDashboard size={17} /> },
    { to: '/admin/overview', label: 'نظرة عامة', icon: <LayoutDashboard size={17} /> },
    { to: '/admin/home', label: 'إعدادات الرئيسية', icon: <Home size={17} /> },
    { to: '/admin/teacher', label: 'المدرس', icon: <GraduationCap size={17} /> },
    { to: '/admin/restaurant', label: 'المطعم', icon: <UtensilsCrossed size={17} /> },
    { to: '/admin/accessories', label: 'المتجر', icon: <ShoppingBag size={17} /> },
    { to: '/admin/orders', label: 'الطلبات', icon: <ClipboardList size={17} /> },
    { to: '/admin/settings', label: 'إعدادات عامة', icon: <Settings size={17} /> },
  ]
  return (
    <aside style={{ width: 260, background: '#0F141B', borderLeft: '1px solid var(--line)', padding: 18, position: 'sticky', top: 0, height: '100vh', overflow: 'auto', flexShrink: 0 }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 900, fontSize: 18 }}>
        <span style={{ width: 36, height: 36, borderRadius: 10, display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg,#7C5CFF,#00D1B2)' }}>E</span>
        {settings.site_name} <span className="badge" style={{ fontSize: 10 }}>ADMIN</span>
      </Link>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 22 }}>
        {links.map((l) => {
          const active = loc.pathname === l.to || (l.to === '/admin' && loc.pathname === '/admin')
          return <NavLink key={l.to} to={l.to} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 12px', borderRadius: 12, background: active ? '#7C5CFF' : 'transparent', color: active ? '#fff' : 'var(--muted)', fontWeight: 700, fontSize: 14 }}>{l.icon} {l.label}</NavLink>
        })}
      </div>
      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Link to="/" className="btn btn-ghost" style={{ justifyContent: 'center' }}><Eye size={16} /> عرض الموقع</Link>
        {isSupabaseConfigured && <button className="btn btn-ghost" style={{ justifyContent: 'center' }} onClick={logout}><LogOut size={16} /> خروج</button>}
        {!isSupabaseConfigured && <span className="badge" style={{ justifyContent: 'center' }}>وضع Demo — بدون Supabase</span>}
      </div>
      <style>{`@media(max-width:820px){ aside{width:72px!important;padding:12px 8px!important} aside a span:not(.badge){display:none} aside a{justify-content:center} }`}</style>
    </aside>
  )
}