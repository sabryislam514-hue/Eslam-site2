import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children, wide = false }) {
  if (!open) return null
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.65)', backdropFilter: 'blur(4px)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={onClose}>
      <div className="card" style={{ width: wide ? 'min(860px,100%)' : 'min(560px,100%)', maxHeight: '88vh', overflow: 'auto', padding: 20 }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h3 style={{ fontWeight: 900, fontSize: 18 }}>{title}</h3>
          <button className="btn btn-ghost" style={{ padding: 8 }} onClick={onClose} aria-label="إغلاق"><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  )
}