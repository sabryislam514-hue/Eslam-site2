import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { CheckCircle2, MessageCircle } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { useSite } from '../context/SiteContext.jsx'
import { formatPrice, buildWhatsAppLink } from '../lib/utils.js'
import { restaurantOrderMessage, accessoriesOrderMessage } from '../lib/whatsapp.js'
import { createOrder } from '../services/orderService.js'
import { isSupabaseConfigured } from '../lib/supabase.js'

export default function Checkout() {
  const [params] = useSearchParams()
  const type = params.get('type') || 'restaurant'
  const isRestaurant = type === 'restaurant'
  const { restaurantCart, accessoriesCart, restaurantTotal, accessoriesTotal, clearCart } = useCart()
  const { settings, showToast } = useSite()
  const items = isRestaurant ? restaurantCart : accessoriesCart
  const total = isRestaurant ? restaurantTotal : accessoriesTotal
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [orderType, setOrderType] = useState('delivery')
  const [sent, setSent] = useState(false)
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) { showToast('اكتب الاسم ورقم الهاتف'); return }
    if (items.length === 0) { showToast('السلة فارغة'); return }
    setSaving(true)
    try {
      const customer = { name, phone, address, notes, orderType }
      const msg = isRestaurant ? restaurantOrderMessage({ items, total, customer, settings }) : accessoriesOrderMessage({ items, total, customer, settings })
      if (isSupabaseConfigured) {
        try {
          await createOrder({ type, customer_name: name, customer_phone: phone, address, notes, total, status: 'pending' }, items)
        } catch (err) { console.error('order save failed', err) }
      }
      window.open(buildWhatsAppLink(settings.whatsapp, msg), '_blank')
      clearCart(isRestaurant ? 'restaurant' : 'accessories')
      setSent(true)
    } finally { setSaving(false) }
  }

  if (sent) {
    return (
      <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <CheckCircle2 size={56} color="#22c55e" style={{ margin: '0 auto' }} />
        <h1 style={{ fontSize: 28, fontWeight: 900, margin: '16px 0 8px' }}>تم إرسال طلبك بنجاح ✅</h1>
        <p className="muted">تم فتح واتساب برسالة الطلب. هنكلمك للتأكيد في أقرب وقت.</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 18 }}>
          <Link to={isRestaurant ? '/restaurant' : '/accessories'} className="btn btn-primary">رجوع</Link>
          <Link to="/" className="btn btn-ghost">الرئيسية</Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <h2>السلة فارغة</h2>
        <p className="muted">أضف منتجات الأول وبعدين كمّل الطلب.</p>
        <Link to={isRestaurant ? '/restaurant' : '/accessories'} className="btn btn-primary" style={{ marginTop: 14 }}>تصفح المنتجات</Link>
      </div>
    )
  }

  return (
    <div className="container" style={{ padding: '32px 0' }}>
      <h1 style={{ fontSize: 28, fontWeight: 900 }}>إتمام الطلب — {isRestaurant ? 'المطعم' : 'المتجر'}</h1>
      <p className="muted" style={{ fontSize: 14 }}>املأ بياناتك، والطلب هيتبعت واتساب بشكل منظم.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 20, marginTop: 18 }}>
        <form className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }} onSubmit={handleSubmit}>
          <div><label className="label">الاسم *</label><input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="مثال: أحمد محمد" required /></div>
          <div><label className="label">رقم الهاتف *</label><input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="01xxxxxxxxx" required dir="ltr" style={{ textAlign: 'left' }} /></div>
          {isRestaurant && (
            <div><label className="label">نوع الطلب</label><div style={{ display: 'flex', gap: 8 }}><button type="button" className="btn" style={{ background: orderType === 'delivery' ? '#7C5CFF' : 'rgba(255,255,255,.06)', color: '#fff' }} onClick={() => setOrderType('delivery')}>توصيل</button><button type="button" className="btn" style={{ background: orderType === 'pickup' ? '#7C5CFF' : 'rgba(255,255,255,.06)', color: '#fff' }} onClick={() => setOrderType('pickup')}>استلام من المطعم</button></div></div>
          )}
          <div><label className="label">العنوان {isRestaurant && orderType === 'delivery' ? '*' : ''}</label><input className="input" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="المنطقة - الشارع - رقم العمارة" /></div>
          <div><label className="label">ملاحظات</label><textarea className="input" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="أي ملاحظات للطلب..." /></div>
          <button className="btn btn-whatsapp" style={{ justifyContent: 'center', padding: '14px' }} disabled={saving}><MessageCircle size={17} /> {saving ? 'جارٍ الإرسال...' : `إرسال الطلب واتساب — ${formatPrice(total)}`}</button>
          <p className="muted" style={{ fontSize: 12, textAlign: 'center' }}>لا يوجد دفع أونلاين — الدفع عند الاستلام / حسب الاتفاق.</p>
        </form>
        <div className="card" style={{ padding: 20, height: 'fit-content' }}>
          <h3 style={{ fontWeight: 800, marginBottom: 12 }}>ملخص الطلب</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {items.map((it) => (
              <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span>{it.name} × {it.qty}</span><b>{formatPrice(Number(it.price) * it.qty)}</b>
              </div>
            ))}
          </div>
          <hr style={{ borderColor: 'var(--line)', margin: '14px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 900 }}>الإجمالي <b>{formatPrice(total)}</b></div>
        </div>
      </div>
      <style>{`@media(max-width:820px){ .container > div{grid-template-columns:1fr!important} }`}</style>
    </div>
  )
}