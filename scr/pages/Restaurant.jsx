import { useMemo, useState } from 'react'
import { Search, Flame, ShoppingBag } from 'lucide-react'
import { useSite } from '../context/SiteContext.jsx'
import RestaurantCard from '../features/restaurant/RestaurantCard.jsx'
import CartDrawer from '../features/restaurant/CartDrawer.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Reveal from '../components/Reveal.jsx'
import ImageWithFallback from '../components/ImageWithFallback.jsx'
import { useCart } from '../context/CartContext.jsx'
import useReveal from '../hooks/useReveal.js'

export default function Restaurant() {
  const { settings, restaurantCategories, restaurantProducts } = useSite()
  const { setRestaurantCartOpen, restaurantCount } = useCart()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('الكل')
  const [onlyFeatured, setOnlyFeatured] = useState(false)
  useReveal()

  const cats = useMemo(() => ['الكل', ...restaurantCategories.map((c) => c.name)], [restaurantCategories])
  const filtered = useMemo(() => {
    let list = restaurantProducts
    if (cat !== 'الكل') list = list.filter((p) => p.category_name === cat || restaurantCategories.find((c) => c.id === p.category_id)?.name === cat)
    if (onlyFeatured) list = list.filter((p) => p.is_featured)
    if (q.trim()) list = list.filter((p) => (p.name + ' ' + p.description).toLowerCase().includes(q.toLowerCase()))
    return list
  }, [restaurantProducts, cat, q, onlyFeatured, restaurantCategories])

  const featured = restaurantProducts.filter((p) => p.is_featured).slice(0, 3)

  return (
    <div>
      <section style={{ background: 'linear-gradient(135deg,#1A0F0A,#2A1408)', borderBottom: '1px solid var(--line)' }}>
        <div className="container" style={{ padding: '48px 0', display: 'grid', gridTemplateColumns: '1.2fr .8fr', gap: 24, alignItems: 'center' }}>
          <div>
            <span className="badge" style={{ background: '#FF6B35', border: 'none', color: '#fff' }}><Flame size={14} /> مطعم وكافيه</span>
            <h1 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, margin: '12px 0' }}>{settings.restaurant_name}</h1>
            <p className="muted" style={{ maxWidth: 560 }}>{settings.restaurant_about}</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
              <a href="#menu" className="btn btn-primary">شوف المنيو</a>
              <button className="btn btn-ghost" onClick={() => setRestaurantCartOpen(true)}><ShoppingBag size={16} /> السلة ({restaurantCount})</button>
            </div>
          </div>
          <ImageWithFallback src={settings.restaurant_image} alt="Restaurant" style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 20 }} />
        </div>
      </section>

      {featured.length > 0 && (
        <section className="container" style={{ padding: '28px 0 0' }}>
          <SectionHeading eyebrow="الأكثر طلباً" title="أطباقنا المميزة" />
          <div className="grid-3">
            {featured.map((p) => <Reveal key={p.id}><RestaurantCard product={p} /></Reveal>)}
          </div>
        </section>
      )}

      <section className="container" id="menu" style={{ padding: '32px 0' }}>
        <SectionHeading eyebrow="المنيو" title="اطلب اللي يعجبك" subtitle="كل حاجة طازة، والطلب بيوصل واتساب بشكل منظم." />
        <div className="card" style={{ padding: 14, display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
          <div style={{ flex: 1, minWidth: 220, display: 'flex', gap: 8, alignItems: 'center', background: 'rgba(255,255,255,.05)', border: '1px solid var(--line)', borderRadius: 12, padding: '0 12px' }}>
            <Search size={18} className="muted" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث في المنيو..." style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', padding: '12px 0', width: '100%' }} />
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}><input type="checkbox" checked={onlyFeatured} onChange={(e) => setOnlyFeatured(e.target.checked)} /> المميز فقط</label>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
          {cats.map((c) => <button key={c} onClick={() => setCat(c)} className="btn" style={{ padding: '7px 14px', fontSize: 13, background: cat === c ? '#FF6B35' : 'rgba(255,255,255,.06)', color: '#fff' }}>{c}</button>)}
        </div>
        {filtered.length === 0 ? <EmptyState title="لا توجد منتجات مطابقة" /> : (
          <div className="grid-3">{filtered.map((p) => <Reveal key={p.id}><RestaurantCard product={p} /></Reveal>)}</div>
        )}
      </section>
      <CartDrawer />
      <style>{`@media(max-width:820px){ section .container{grid-template-columns:1fr!important} }`}</style>
    </div>
  )
}