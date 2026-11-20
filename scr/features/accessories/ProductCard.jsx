import { Link } from 'react-router-dom'
import { Plus, Star } from 'lucide-react'
import ImageWithFallback from '../../components/ImageWithFallback.jsx'
import { formatPrice } from '../../lib/utils.js'
import { useCart } from '../../context/CartContext.jsx'
import { useSite } from '../../context/SiteContext.jsx'

export default function ProductCard({ product }) {
  const { addToCart, setAccessoriesCartOpen } = useCart()
  const { showToast } = useSite()
  const hasDiscount = product.discount_price && Number(product.discount_price) < Number(product.price)
  const out = !product.is_available || Number(product.stock) === 0
  return (
    <article className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <Link to={`/accessories/${product.id}`} style={{ position: 'relative', display: 'block' }}>
        <ImageWithFallback src={product.image} alt={product.name} style={{ width: '100%', height: 230, objectFit: 'cover' }} />
        {hasDiscount && <span className="badge" style={{ position: 'absolute', top: 12, right: 12, background: '#111', color: '#fff' }}>خصم {Math.round((1 - Number(product.discount_price) / Number(product.price)) * 100)}%</span>}
        {out && <span className="badge" style={{ position: 'absolute', bottom: 12, right: 12, background: '#ef4444', color: '#fff', border: 'none' }}>نفذت الكمية</span>}
      </Link>
      <div style={{ padding: 15, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <span className="muted" style={{ fontSize: 12 }}>{product.category_name}</span>
        <Link to={`/accessories/${product.id}`}><h3 style={{ fontWeight: 800, fontSize: 16, margin: '4px 0 6px' }}>{product.name}</h3></Link>
        <div style={{ display: 'flex', gap: 4, color: '#FFB020', fontSize: 13, marginBottom: 6 }}><Star size={14} fill="#FFB020" /> 4.8 <span className="muted" style={{ color: 'var(--muted)' }}>(120 تقييم)</span></div>
        <p className="muted" style={{ fontSize: 13, flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
          <div><b style={{ fontSize: 17 }}>{formatPrice(product.discount_price || product.price)}</b>{hasDiscount && <span className="muted" style={{ fontSize: 12, textDecoration: 'line-through', marginRight: 6 }}>{formatPrice(product.price)}</span>}</div>
          <button className="btn btn-primary" style={{ padding: '8px 12px', fontSize: 13 }} disabled={out} onClick={() => { addToCart('accessories', product, 1); showToast('تمت الإضافة للسلة'); setAccessoriesCartOpen(true) }}><Plus size={15} /> أضف</button>
        </div>
      </div>
    </article>
  )
}