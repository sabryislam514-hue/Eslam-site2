import { useState } from 'react'
import { useSite } from '../../context/SiteContext.jsx'
import DataTable from '../components/DataTable.jsx'
import Modal from '../../components/Modal.jsx'
import ConfirmDialog from '../../components/ConfirmDialog.jsx'
import ImageField from '../components/ImageField.jsx'
import { isSupabaseConfigured } from '../../lib/supabase.js'
import { createAccessoriesProduct, updateAccessoriesProduct, deleteAccessoriesProduct, createAccessoriesCategory, deleteAccessoriesCategory } from '../../services/accessoriesService.js'

const empty = { name: '', description: '', image: '', price: '', discount_price: '', category_id: '', stock: 1, is_available: true, is_featured: false, sort_order: 1 }

export default function AccessoriesAdmin() {
  const { accessoriesProducts, setAccessoriesProducts, accessoriesCategories, setAccessoriesCategories, showToast } = useSite()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)
  const [delTarget, setDelTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [newCat, setNewCat] = useState('')
  const [q, setQ] = useState('')

  function set(k, v) { setForm((p) => ({ ...p, [k]: v })) }
  function startAdd() { setEditing(null); setForm({ ...empty, category_id: accessoriesCategories[0]?.id || '' }); setOpen(true) }
  function startEdit(p) { setEditing(p); setForm({ ...p, discount_price: p.discount_price || '' }); setOpen(true) }

  async function save(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.price) { showToast('اكتب الاسم والسعر'); return }
    setSaving(true)
    try {
      const cat = accessoriesCategories.find((c) => c.id === form.category_id)
      const payload = { name: form.name, description: form.description, image: form.image, price: Number(form.price), discount_price: form.discount_price ? Number(form.discount_price) : null, category_id: form.category_id, category_name: cat?.name || '', stock: Number(form.stock || 0), is_available: Boolean(form.is_available), is_featured: Boolean(form.is_featured), sort_order: Number(form.sort_order || 1) }
      if (editing) {
        if (isSupabaseConfigured) { const u = await updateAccessoriesProduct(editing.id, payload); setAccessoriesProducts(accessoriesProducts.map((x) => x.id === editing.id ? u : x)) }
        else setAccessoriesProducts(accessoriesProducts.map((x) => x.id === editing.id ? { ...x, ...payload } : x))
        showToast('تم تعديل المنتج')
      } else {
        if (isSupabaseConfigured) { const c = await createAccessoriesProduct(payload); setAccessoriesProducts([...accessoriesProducts, c]) }
        else setAccessoriesProducts([...accessoriesProducts, { ...payload, id: 'ap' + Date.now() }])
        showToast('تمت إضافة المنتج')
      }
      setOpen(false)
    } catch (err) { showToast('خطأ: ' + err.message) } finally { setSaving(false) }
  }

  async function confirmDelete() {
    if (!delTarget) return
    setDeleting(true)
    try { if (isSupabaseConfigured) await deleteAccessoriesProduct(delTarget.id); setAccessoriesProducts(accessoriesProducts.filter((x) => x.id !== delTarget.id)); showToast('تم الحذف'); setDelTarget(null) } catch (e) { showToast(e.message) } finally { setDeleting(false) }
  }

  async function addCategory(e) {
    e.preventDefault()
    if (!newCat.trim()) return
    const payload = { name: newCat, sort_order: accessoriesCategories.length + 1 }
    if (isSupabaseConfigured) { const c = await createAccessoriesCategory(payload); setAccessoriesCategories([...accessoriesCategories, c]) }
    else setAccessoriesCategories([...accessoriesCategories, { ...payload, id: 'ac' + Date.now() }])
    setNewCat(''); showToast('تمت إضافة التصنيف')
  }

  const filtered = accessoriesProducts.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
        <div><h1 style={{ fontSize: 24, fontWeight: 900 }}>إدارة المتجر</h1><p className="muted" style={{ fontSize: 14 }}>{accessoriesProducts.length} منتج — {accessoriesCategories.length} تصنيف</p></div>
        <button className="btn btn-primary" onClick={startAdd}>+ إضافة منتج</button>
      </div>
      <div className="card" style={{ padding: 14, marginTop: 16, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <input className="input" style={{ flex: 1, minWidth: 200 }} value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="اسم تصنيف جديد" />
        <button className="btn btn-ghost" onClick={addCategory}>إضافة تصنيف</button>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{accessoriesCategories.map((c) => <span key={c.id} className="badge">{c.name} <button onClick={async () => { if (isSupabaseConfigured) await deleteAccessoriesCategory(c.id); setAccessoriesCategories(accessoriesCategories.filter((x) => x.id !== c.id)) }} style={{ background: 'none', border: 'none', color: '#fca5a5', cursor: 'pointer' }}>×</button></span>)}</div>
      </div>
      <input className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث في المنتجات..." style={{ margin: '14px 0 12px' }} />
      <DataTable
        columns={[
          { key: 'name', label: 'المنتج', render: (r) => <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}><img src={r.image} alt="" style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 8 }} /> <b>{r.name}</b></span> },
          { key: 'category_name', label: 'التصنيف' },
          { key: 'price', label: 'السعر', render: (r) => `${r.discount_price || r.price} ج.م` },
          { key: 'stock', label: 'المخزون' },
          { key: 'is_featured', label: 'مميز', render: (r) => r.is_featured ? '⭐' : '—' }
        ]}
        rows={filtered}
        onEdit={startEdit}
        onDelete={setDelTarget}
      />
      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'تعديل منتج' : 'إضافة منتج'} wide>
        <form style={{ display: 'flex', flexDirection: 'column', gap: 12 }} onSubmit={save}>
          <div><label className="label">الاسم *</label><input className="input" value={form.name} onChange={(e) => set('name', e.target.value)} required /></div>
          <div><label className="label">الوصف</label><textarea className="input" rows={2} value={form.description} onChange={(e) => set('description', e.target.value)} /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div><label className="label">السعر *</label><input className="input" type="number" value={form.price} onChange={(e) => set('price', e.target.value)} required /></div>
            <div><label className="label">سعر بعد الخصم</label><input className="input" type="number" value={form.discount_price} onChange={(e) => set('discount_price', e.target.value)} /></div>
            <div><label className="label">المخزون</label><input className="input" type="number" value={form.stock} onChange={(e) => set('stock', e.target.value)} /></div>
            <div><label className="label">التصنيف</label><select className="input" value={form.category_id} onChange={(e) => set('category_id', e.target.value)}><option value="">— اختار —</option>{accessoriesCategories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
            <div><label className="label">الترتيب</label><input className="input" type="number" value={form.sort_order} onChange={(e) => set('sort_order', e.target.value)} /></div>
          </div>
          <ImageField value={form.image} onChange={(v) => set('image', v)} />
          <div style={{ display: 'flex', gap: 18 }}>
            <label style={{ display: 'flex', gap: 8 }}><input type="checkbox" checked={Boolean(form.is_available)} onChange={(e) => set('is_available', e.target.checked)} /> متاح</label>
            <label style={{ display: 'flex', gap: 8 }}><input type="checkbox" checked={Boolean(form.is_featured)} onChange={(e) => set('is_featured', e.target.checked)} /> مميز</label>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}><button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>إلغاء</button><button className="btn btn-primary" disabled={saving}>{saving ? 'جارٍ الحفظ...' : 'حفظ'}</button></div>
        </form>
      </Modal>
      <ConfirmDialog open={Boolean(delTarget)} onClose={() => setDelTarget(null)} onConfirm={confirmDelete} loading={deleting} message={`هيتم حذف "${delTarget?.name}" نهائياً.`} />
    </div>
  )
}