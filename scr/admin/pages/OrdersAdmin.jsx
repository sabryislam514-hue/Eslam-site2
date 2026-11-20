import { useState } from 'react'
import { useSite } from '../../context/SiteContext.jsx'
import EmptyState from '../../components/EmptyState.jsx'
import { formatPrice } from '../../lib/utils.js'
import { updateOrderStatus } from '../../services/orderService.js'
import { isSupabaseConfigured } from '../../lib/supabase.js'
import { timeAgo } from '../../lib/utils.js'

export default function OrdersAdmin() {
  const { orders, setOrders, showToast } = useSite()
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('all')

  const filtered = orders.filter((o) => {
    if (status !== 'all' && o.status !== status) return false
    if (q && !(o.customer_name + ' ' + o.customer_phone).toLowerCase().includes(q.toLowerCase())) return false
    return true
  })

  async function changeStatus(order, newStatus) {
    if (isSupabaseConfigured) {
      try { await updateOrderStatus(order.id, newStatus) } catch (e) { showToast(e.message); return }
    }
    setOrders(orders.map((o) => o.id === order.id ? { ...o, status: newStatus } : o))
    showToast('تم تحديث حالة الطلب')
  }

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 900 }}>الطلبات</h1>
      <p className="muted" style={{ fontSize: 14 }}>الطلبات اللي بتتبعت من الـ Checkout بتتسجل هنا لو Supabase مفعّل.</p>
      <div style={{ display: 'flex', gap: 10, margin: '16px 0 12px', flexWrap: 'wrap' }}>
        <input className="input" style={{ flex: 1, minWidth: 200 }} value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث بالاسم أو الهاتف..." />
        <select className="input" style={{ width: 170 }} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">كل الحالات</option>
          <option value="pending">قيد الانتظار</option>
          <option value="confirmed">مؤكد</option>
          <option value="delivered">تم التوصيل</option>
          <option value="cancelled">ملغي</option>
        </select>
      </div>
      {filtered.length === 0 ? <EmptyState title="لا توجد طلبات" subtitle="لسه مفيش طلبات، أو جرّب تغيير الفلتر." /> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map((o) => (
            <div key={o.id} className="card" style={{ padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <div><b>{o.customer_name}</b> <span className="muted" style={{ fontSize: 13 }}>— {o.customer_phone}</span> <span className="badge">{o.type === 'restaurant' ? 'مطعم' : 'متجر'}</span></div>
                <span className="muted" style={{ fontSize: 12 }}>{timeAgo(o.created_at)}</span>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '10px 0' }}>
                <span className="muted" style={{ fontSize: 13 }}>العنوان: {o.address || '—'}</span>
                <span className="muted" style={{ fontSize: 13 }}>ملاحظات: {o.notes || '—'}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {(o.order_items || []).map((it, i) => <span key={i} className="badge">{it.product_name} × {it.qty} = {Number(it.price) * it.qty} ج.م</span>)}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, flexWrap: 'wrap', gap: 8 }}>
                <b>الإجمالي: {formatPrice(o.total)}</b>
                <select className="input" style={{ width: 160 }} value={o.status} onChange={(e) => changeStatus(o, e.target.value)}>
                  <option value="pending">قيد الانتظار</option>
                  <option value="confirmed">مؤكد</option>
                  <option value="delivered">تم التوصيل</option>
                  <option value="cancelled">ملغي</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}