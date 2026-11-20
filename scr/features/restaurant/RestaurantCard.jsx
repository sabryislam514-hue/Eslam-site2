import { Plus, Flame } from 'lucide-react'
import ImageWithFallback from '../../components/ImageWithFallback.jsx'
import { formatPrice } from '../../lib/utils.js'
import { useCart } from '../../context/CartContext.jsx'
import { useSite } from '../../context/SiteContext.jsx'

export default function RestaurantCard({ product }) {
  const { addToCart, setRestaurantCartOpen } = useCart()
  const { showToast } = useSite()
  const hasDiscount = product.discount_price && Number(product.discount_price) < Number(product.price)
  return (
    <article className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative' }}>
        <ImageWithFallback src={product.image} alt={product.name} style={{ width: '100%', height: 190, objectFit: 'cover' }} />
        {product.is_featured && <span className="badge" style={{ position: 'absolute', top: 12, right: 12, background: '#FF6B35', border: 'none', color: '#fff' }}><Flame size={12} /> مميز</span>}
        {!product.is_available && <span className="badge" style={{ position: 'absolute', top: 12, left: 12, background: '#111', color: '#fff' }}>غير متاح</span>}
      </div>
      <div style={{ padding: 15, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontWeight: 800, fontSize: 17 }}>{product.name}</h3>
        <p className="muted" style={{ fontSize: 13, flex: 1, margin: '6px 0 12px' }}>{product.description}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <b style={{ color: '#FFB020', fontSize: 17 }}>{formatPrice(product.discount_price || product.price)}</b>
            {hasDiscount && <span className="muted" style={{ fontSize: 12, textDecoration: 'line-through', marginRight: 8 }}>{formatPrice(product.price)}</span>}
          </div>
          <button className="btn btn-primary" style={{ padding: '8px 12px', fontSize: 13 }} disabled={!product.is_available} onClick={() => { addToCart('restaurant', product, 1); showToast('تمت الإضافة للسلة'); setRestaurantCartOpen(true) }}>
            <Plus size={15} /> أضف
          </button>
        </div>
      </div>
    </article>
  )
}