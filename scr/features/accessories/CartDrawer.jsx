import { X, Minus, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { formatPrice } from '../../lib/utils.js'

export default function CartDrawer() {
  const { accessoriesCart, updateQty, removeFromCart, accessoriesTotal, isAccessoriesCartOpen, setAccessoriesCartOpen, clearCart } = useCart()
  if (!isAccessoriesCartOpen) return null
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', zIndex: 100, display: 'flex', justifyContent: 'flex-end' }} onClick={() => setAccessoriesCartOpen(false)}>
      <div style={{ width: 'min(420px,100%)', background: '#11161D', height: '100%', padding: 18, overflow: 'auto' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontWeight: 900 }}>سلة المتجر ({accessoriesCart.length})</h3>
          <button className="btn btn-ghost" style={{ padding: 8 }} onClick={() => setAccessoriesCartOpen(false)}><X size={18} /></button>
        </div>
        {accessoriesCart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 30 }}><p className="muted">السلة فارغة</p><button className="btn btn-primary" style={{ marginTop: 12 }} onClick={() => setAccessoriesCartOpen(false)}>تصفح المتجر</button></div>
        ) : (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 16 }}>
              {accessoriesCart.map((it) => (
                <div key={it.id} className="card" style={{ padding: 12, display: 'flex', gap: 10, alignItems: 'center' }}>
                  <img src={it.image} alt={it.name} style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 10 }} />
                  <div style={{ flex: 1 }}><b style={{ fontSize: 14 }}>{it.name}</b><div className="muted" style={{ fontSize: 12 }}>{formatPrice(it.price)}</div></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <button className="btn btn-ghost" style={{ padding: 5 }} onClick={() => updateQty('accessories', it.id, it.qty - 1)}><Minus size={14} /></button>
                    <b>{it.qty}</b>
                    <button className="btn btn-ghost" style={{ padding: 5 }} onClick={() => updateQty('accessories', it.id, it.qty + 1)}><Plus size={14} /></button>
                  </div>
                  <button className="btn btn-ghost" style={{ padding: 6 }} onClick={() => removeFromCart('accessories', it.id)}><Trash2 size={15} /></button>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '18px 0', fontWeight: 800 }}>الإجمالي <b>{formatPrice(accessoriesTotal)}</b></div>
            <Link to="/checkout?type=accessories" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setAccessoriesCartOpen(false)}>إتمام الطلب</Link>
            <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }} onClick={() => clearCart('accessories')}>مسح السلة</button>
          </>
        )}
      </div>
    </div>
  )
}