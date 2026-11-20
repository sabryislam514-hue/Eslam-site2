import { X, Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '../../context/CartContext.jsx'
import { formatPrice } from '../../lib/utils.js'
import { Link } from 'react-router-dom'

export default function CartDrawer() {
  const { restaurantCart, updateQty, removeFromCart, restaurantTotal, isRestaurantCartOpen, setRestaurantCartOpen, clearCart } = useCart()
  if (!isRestaurantCartOpen) return null
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', zIndex: 100, display: 'flex', justifyContent: 'flex-end' }} onClick={() => setRestaurantCartOpen(false)}>
      <div style={{ width: 'min(420px,100%)', background: '#11161D', height: '100%', padding: 18, overflow: 'auto' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontWeight: 900 }}>سلة المطعم ({restaurantCart.length})</h3>
          <button className="btn btn-ghost" style={{ padding: 8 }} onClick={() => setRestaurantCartOpen(false)}><X size={18} /></button>
        </div>
        {restaurantCart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 30 }}><p className="muted">السلة فارغة</p><button className="btn btn-primary" style={{ marginTop: 12 }} onClick={() => setRestaurantCartOpen(false)}>تصفح المنيو</button></div>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
              {restaurantCart.map((it) => (
                <div key={it.id} className="card" style={{ padding: 12, display: 'flex', gap: 10, alignItems: 'center' }}>
                  <img src={it.image} alt={it.name} style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 10 }} />
                  <div style={{ flex: 1 }}>
                    <b style={{ fontSize: 14 }}>{it.name}</b>
                    <div className="muted" style={{ fontSize: 12 }}>{formatPrice(it.price)}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <button className="btn btn-ghost" style={{ padding: 5 }} onClick={() => updateQty('restaurant', it.id, it.qty - 1)}><Minus size={14} /></button>
                    <b>{it.qty}</b>
                    <button className="btn btn-ghost" style={{ padding: 5 }} onClick={() => updateQty('restaurant', it.id, it.qty + 1)}><Plus size={14} /></button>
                  </div>
                  <button className="btn btn-ghost" style={{ padding: 6 }} onClick={() => removeFromCart('restaurant', it.id)}><Trash2 size={15} /></button>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '18px 0', fontWeight: 800 }}>الإجمالي <b>{formatPrice(restaurantTotal)}</b></div>
            <Link to="/checkout?type=restaurant" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setRestaurantCartOpen(false)}>إتمام الطلب</Link>
            <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }} onClick={clearCart.bind(null, 'restaurant')}>مسح السلة</button>
          </>
        )}
      </div>
    </div>
  )
}