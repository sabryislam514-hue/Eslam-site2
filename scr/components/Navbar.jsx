import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Sparkles, ShoppingBag, UtensilsCrossed } from 'lucide-react'
import { useSite } from '../context/SiteContext.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function Navbar() {
  const { settings } = useSite()
  const { restaurantCount, accessoriesCount, setRestaurantCartOpen, setAccessoriesCartOpen } = useCart()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isDemo = location.pathname.startsWith('/teacher') || location.pathname.startsWith('/restaurant') || location.pathname.startsWith('/accessories')

  const links = [
    { to: '/', label: 'الرئيسية' },
    { to: '/#projects', label: 'المشاريع' },
    { to: '/#services', label: 'خدماتي' },
    { to: '/#about', label: 'عني' },
    { to: '/#contact', label: 'تواصل' }
  ]

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(14px)', background: 'rgba(11,15,20,.82)', borderBottom: '1px solid var(--line)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68, gap: 12 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 900, fontSize: 20 }}>
          <span style={{ width: 38, height: 38, borderRadius: 12, display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg,#7C5CFF,#00D1B2)', color: '#fff' }}><Sparkles size={20} /></span>
          {settings.site_name || 'Eslam'}
          <span style={{ fontSize: 11, background: 'rgba(255,255,255,.08)', border: '1px solid var(--line)', padding: '3px 8px', borderRadius: 999 }}>.dev</span>
        </Link>

        <nav style={{ display: 'flex', gap: 4 }} className="nav-desktop">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} style={{ padding: '8px 14px', borderRadius: 999, fontWeight: 700, fontSize: 14, color: 'var(--muted)' }}>{l.label}</NavLink>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {location.pathname.startsWith('/restaurant') && (
            <button className="btn btn-ghost" style={{ padding: '8px 14px' }} onClick={() => setRestaurantCartOpen(true)}>
              <UtensilsCrossed size={18} /> السلة ({restaurantCount})
            </button>
          )}
          {location.pathname.startsWith('/accessories') && (
            <button className="btn btn-ghost" style={{ padding: '8px 14px' }} onClick={() => setAccessoriesCartOpen(true)}>
              <ShoppingBag size={18} /> السلة ({accessoriesCount})
            </button>
          )}
          <Link to="/#contact" className="btn btn-primary" style={{ padding: '9px 16px', fontSize: 14 }}>اطلب موقعك</Link>
          <button className="btn btn-ghost" style={{ padding: 9, display: 'none' }} onClick={() => setOpen(!open)} aria-label="القائمة" id="mobile-menu-btn">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="container" style={{ paddingBottom: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} style={{ padding: '10px 12px', borderRadius: 12, background: 'rgba(255,255,255,.05)', fontWeight: 700 }}>{l.label}</Link>
          ))}
        </div>
      )}
      <style>{`@media(max-width:820px){ .nav-desktop{display:none!important} #mobile-menu-btn{display:inline-flex!important} }`}</style>
    </header>
  )
}