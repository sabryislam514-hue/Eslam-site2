import { Link } from 'react-router-dom'
import { GraduationCap, UtensilsCrossed, ShoppingBag, ClipboardList, ArrowLeft } from 'lucide-react'
import { useSite } from '../../context/SiteContext.jsx'
import StatCard from '../components/StatCard.jsx'

export default function Overview() {
  const { courses, restaurantProducts, accessoriesProducts, restaurantCategories, accessoriesCategories, orders, settings } = useSite()
  return (
    <div>
      <h1 style={{ fontSize: 26, fontWeight: 900 }}>أهلاً بيك في لوحة التحكم 👋</h1>
      <p className="muted" style={{ fontSize: 14 }}>تحكم كامل في {settings.site_name} — كل تعديل هنا بيظهر على الموقع فوراً.</p>
      <div className="grid-3" style={{ marginTop: 18 }}>
        <StatCard label="الكورسات" value={courses.length} sub={`${courses.filter((c) => c.is_featured).length} مميز`} color="#FFB020" icon={<GraduationCap size={20} />} />
        <StatCard label="منتجات المطعم" value={restaurantProducts.length} sub={`${restaurantCategories.length} تصنيف`} color="#FF6B35" icon={<UtensilsCrossed size={20} />} />
        <StatCard label="منتجات المتجر" value={accessoriesProducts.length} sub={`${accessoriesCategories.length} تصنيف`} color="#7C5CFF" icon={<ShoppingBag size={20} />} />
      </div>
      <div className="grid-3" style={{ marginTop: 14 }}>
        <StatCard label="الطلبات" value={orders.length} sub="من Supabase لو مفعّل" color="#00D1B2" icon={<ClipboardList size={20} />} />
        <StatCard label="الواتساب" value={settings.whatsapp || '—'} sub="رقم استقبال الطلبات" color="#22c55e" icon={<ClipboardList size={20} />} />
        <StatCard label="الموقع" value={settings.site_name} sub={settings.tagline} color="#4F7CFF" icon={<GraduationCap size={20} />} />
      </div>
      <div className="card" style={{ padding: 20, marginTop: 18 }}>
        <h3 style={{ fontWeight: 800, marginBottom: 12 }}>إجراءات سريعة</h3>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link to="/admin/teacher" className="btn btn-primary">إضافة كورس <ArrowLeft size={15} /></Link>
          <Link to="/admin/restaurant" className="btn btn-ghost">إضافة منتج مطعم</Link>
          <Link to="/admin/accessories" className="btn btn-ghost">إضافة منتج متجر</Link>
          <Link to="/admin/home" className="btn btn-ghost">تعديل الرئيسية</Link>
          <Link to="/admin/orders" className="btn btn-ghost">عرض الطلبات</Link>
        </div>
      </div>
      <div className="card" style={{ padding: 20, marginTop: 14 }}>
        <h3 style={{ fontWeight: 800, marginBottom: 10 }}>أحدث الكورسات</h3>
        {courses.slice(0, 3).map((c) => <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderTop: '1px solid var(--line)', fontSize: 14 }}><span>{c.title}</span><span className="muted">{c.price} ج.م</span></div>)}
      </div>
    </div>
  )
}