import Modal from './Modal.jsx'

export default function ConfirmDialog({ open, onClose, onConfirm, title = 'تأكيد الحذف', message = 'هل أنت متأكد؟ لا يمكن التراجع عن هذا الإجراء.', loading = false }) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="muted" style={{ fontSize: 14 }}>{message}</p>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 18 }}>
        <button className="btn btn-ghost" onClick={onClose} disabled={loading}>إلغاء</button>
        <button className="btn" style={{ background: '#ef4444', color: '#fff' }} onClick={onConfirm} disabled={loading}>{loading ? 'جارٍ الحذف...' : 'حذف'}</button>
      </div>
    </Modal>
  )
}