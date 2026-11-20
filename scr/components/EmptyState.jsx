import { Inbox } from 'lucide-react'

export default function EmptyState({ title = 'لا توجد بيانات', subtitle = 'جرب تعديل البحث أو الفلتر، أو أضف عنصر جديد من لوحة التحكم.', action = null }) {
  return (
    <div className="card" style={{ padding: 36, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      <span style={{ width: 56, height: 56, borderRadius: 16, display: 'grid', placeItems: 'center', background: 'rgba(255,255,255,.06)' }}><Inbox size={26} /></span>
      <h3 style={{ fontWeight: 800 }}>{title}</h3>
      <p className="muted" style={{ fontSize: 14, maxWidth: 420 }}>{subtitle}</p>
      {action}
    </div>
  )
}