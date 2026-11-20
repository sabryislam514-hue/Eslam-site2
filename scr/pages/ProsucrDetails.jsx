import { useParams, Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, Plus, Minus, Check, Package } from 'lucide-react'
import { useState } from 'react'
import { useSite } from '../context/SiteContext.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ImageWithFallback from '../components/ImageWithFallback.jsx'
import { formatPrice } from '../lib/utils.js'
import { useCart } from '../context/CartContext.jsx'

export default function ProductDetails() {
  const { id } = useParams()
  const { accessoriesProducts, showToast } = useSite()
  const { addToCart, setAccessoriesCartOpen } = useCart()
  const [qty, setQty] = useState(1)
  const product = accessoriesProducts.find((p) => String(p.id) === String(id))
  if (!product) return <div className="container" style={{ padding: '40px 0' }}><EmptyState title="المنتج غير موجود" action={<Link to="/accessories" className="btn btn-primary">رجوع للمتجر</Link>} /></div>
  const hasDiscount = product.discount_price && Number(product.discount_price) < Number(product.price)
  const out = !product.is_available || Number(product.stock) === 0
  return (
    <div className="container" style={{ padding: '32px 0' }}>
      <Link to="/accessories" className="btn btn-ghost" style={{ padding: '8px 14px' }}><ArrowRight size={16} /> رجوع</Link>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginTop: 16 }}>
        <ImageWithFallback src={product.image} alt={product.name} style={{ width: '100%', height: 440, objectFit: 'cover', borderRadius: 20 }} />
        <div>
          <span className="badge">{product.category_name}</span>
          <h1 style={{ fontSize: 30, fontWeight: 900, margin: '12px 0 8px' }}>{product.name}</h1>
          <p className="muted">{product.description}</p>
          <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', margin: '16px 0' }}>
            <b style={{ fontSize: 26 }}>{formatPrice(product.discount_price || product.price)}</b>
            {hasDiscount && <span className="muted" style={{ textDecoration: 'line-through' }}>{formatPrice(product.price)}</span>}
            {hasDiscount && <span className="badge" style={{ background: '#22c55e', color: '#fff', border: 'none' }}>وفّر {Number(product.price) - Number(product.discount_price)} ج.م</span>}
          </div>
          <div style={{ display: 'flex', gap: 8, fontSize: 13 }} className="muted">
            <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Package size={15} /> المخزون: <b style={{ color: '#fff' }}>{out ? 'نفذت الكمية' : `${product.stock} قطعة`}</b></span>
            <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Check size={15} /> شحن سريع</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 18 }}>
            <span className="label" style={{ margin: 0 }}>الكمية:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,.06)', borderRadius: 999, padding: '6px 10px' }}>
              <button className="btn btn-ghost" style={{ padding: 6 }} onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={15} /></button>
              <b>{qty}</b>
              <button className="btn btn-ghost" style={{ padding: 6 }} onClick={() => setQty(qty + 1)}><Plus size={15} /></button>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
            <button className="btn btn-primary" disabled={out} onClick={() => { addToCart('accessories', product, qty); showToast('تمت الإضافة للسلة'); setAccessoriesCartOpen(true) }}>أضف للسلة</button>
            <Link to="/checkout?type=accessories" className="btn btn-ghost">إتمام الطلب</Link>
          </div>
          <p className="muted" style={{ fontSize: 12, marginTop: 12 }}>الدفع عند الاستلام — الطلب بيتبعت واتساب بشكل منظم.</p>
        </div>
      </div>
      <style>{`@media(max-width:820px){ .container > div{grid-template-columns:1fr!important} }`}</style>
    </div>
  )
}