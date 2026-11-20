import { Link } from 'react-router-dom'
import { MessageCircle, Mail, Phone } from 'lucide-react'
import { useSite } from '../context/SiteContext.jsx'
import { buildWhatsAppLink } from '../lib/utils.js'

export default function Footer() {
  const { settings } = useSite()
  return (
    <footer style={{ borderTop: '1px solid var(--line)', marginTop: 60, background: '#0A0E13' }}>
      <div className="container" style={{ padding: '44px 0', display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 24 }}>
        <div>
          <h3 style={{ fontSize: 22, fontWeight: 900 }}>{settings.site_name}</h3>
          <p className="muted" style={{ fontSize: 14, maxWidth: 360 }}>{settings.tagline}</p>
          <p className="muted" style={{ fontSize: 13, marginTop: 12 }}>{settings.footer_text}</p>
        </div>
        <div>
          <h4 style={{ fontWeight: 800, marginBottom: 12 }}>روابط سريعة</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }} className="muted">
            <Link to="/">الرئيسية</Link>
            <Link to="/teacher">منصة المدرس</Link>
            <Link to="/restaurant">موقع المطعم</Link>
            <Link to="/accessories">متجر الإكسسوارات</Link>
            <Link to="/admin">لوحة التحكم</Link>
          </div>
        </div>
        <div>
          <h4 style={{ fontWeight: 800, marginBottom: 12 }}>تواصل</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }} className="muted">
            <a href={buildWhatsAppLink(settings.whatsapp, 'أهلاً، عايز أطلب موقع')} target="_blank" rel="noreferrer" style={{ display: 'flex', gap: 8, alignItems: 'center' }}><MessageCircle size={16} /> واتساب</a>
            <a href={`mailto:${settings.email}`} style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Mail size={16} /> {settings.email}</a>
            <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Phone size={16} /> {settings.phone}</span>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:700px){ footer .container{grid-template-columns:1fr!important} }`}</style>
    </footer>
  )
}