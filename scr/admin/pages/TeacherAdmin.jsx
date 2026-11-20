import { useState } from 'react'
import { useSite } from '../../context/SiteContext.jsx'
import DataTable from '../components/DataTable.jsx'
import Modal from '../../components/Modal.jsx'
import ConfirmDialog from '../../components/ConfirmDialog.jsx'
import ImageField from '../components/ImageField.jsx'
import { isSupabaseConfigured } from '../../lib/supabase.js'
import { createCourse, updateCourse, deleteCourse, createLesson, deleteLesson } from '../../services/teacherService.js'

const empty = { title: '', description: '', image: '', price: '', discount_price: '', sessions_count: '', category: '', status: 'active', is_featured: false, sort_order: 1, content: '' }

export default function TeacherAdmin() {
  const { courses, setCourses, lessonsByCourse, setLessonsByCourse, showToast } = useSite()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)
  const [delTarget, setDelTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [q, setQ] = useState('')
  const [lessonForm, setLessonForm] = useState({ course_id: '', title: '', duration_minutes: 45 })

  function startAdd() { setEditing(null); setForm(empty); setOpen(true) }
  function startEdit(c) { setEditing(c); setForm({ ...c, discount_price: c.discount_price || '', price: c.price || '' }); setOpen(true) }
  function set(k, v) { setForm((p) => ({ ...p, [k]: v })) }

  async function save(e) {
    e.preventDefault()
    if (!form.title.trim() || !form.price) { showToast('اكتب العنوان والسعر'); return }
    setSaving(true)
    try {
      const payload = { title: form.title, description: form.description, image: form.image, price: Number(form.price), discount_price: form.discount_price ? Number(form.discount_price) : null, sessions_count: Number(form.sessions_count || 0), category: form.category, status: form.status, is_featured: Boolean(form.is_featured), sort_order: Number(form.sort_order || 1), content: form.content }
      if (editing) {
        if (isSupabaseConfigured) { const updated = await updateCourse(editing.id, payload); setCourses(courses.map((c) => c.id === editing.id ? updated : c)) }
        else setCourses(courses.map((c) => c.id === editing.id ? { ...c, ...payload } : c))
        showToast('تم تعديل الكورس')
      } else {
        if (isSupabaseConfigured) { const created = await createCourse(payload); setCourses([...courses, created]) }
        else setCourses([...courses, { ...payload, id: 'c' + Date.now() }])
        showToast('تمت إضافة الكورس')
      }
      setOpen(false)
    } catch (err) { showToast('حدث خطأ: ' + err.message) } finally { setSaving(false) }
  }

  async function confirmDelete() {
    if (!delTarget) return
    setDeleting(true)
    try {
      if (isSupabaseConfigured) await deleteCourse(delTarget.id)
      setCourses(courses.filter((c) => c.id !== delTarget.id))
      showToast('تم حذف الكورس')
      setDelTarget(null)
    } catch (e) { showToast('فشل الحذف: ' + e.message) } finally { setDeleting(false) }
  }

  async function addLesson(e) {
    e.preventDefault()
    if (!lessonForm.course_id || !lessonForm.title.trim()) { showToast('اختار الكورس واكتب عنوان الدرس'); return }
    const payload = { course_id: lessonForm.course_id, title: lessonForm.title, duration_minutes: Number(lessonForm.duration_minutes), sort_order: (lessonsByCourse[lessonForm.course_id] || []).length + 1 }
    if (isSupabaseConfigured) { const created = await createLesson(payload); setLessonsByCourse({ ...lessonsByCourse, [payload.course_id]: [...(lessonsByCourse[payload.course_id] || []), created] }) }
    else setLessonsByCourse({ ...lessonsByCourse, [payload.course_id]: [...(lessonsByCourse[payload.course_id] || []), { ...payload, id: 'l' + Date.now() }] })
    setLessonForm({ course_id: '', title: '', duration_minutes: 45 })
    showToast('تمت إضافة الدرس')
  }

  const filtered = courses.filter((c) => c.title.toLowerCase().includes(q.toLowerCase()))

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <div><h1 style={{ fontSize: 24, fontWeight: 900 }}>إدارة المدرس</h1><p className="muted" style={{ fontSize: 14 }}>كورسات ودروس — {courses.length} كورس</p></div>
        <button className="btn btn-primary" onClick={startAdd}>+ إضافة كورس</button>
      </div>
      <input className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث في الكورسات..." style={{ margin: '16px 0 12px' }} />
      <DataTable
        columns={[
          { key: 'title', label: 'العنوان', render: (r) => <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}><img src={r.image} alt="" style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 8 }} /> <b>{r.title}</b></span> },
          { key: 'category', label: 'التصنيف' },
          { key: 'price', label: 'السعر', render: (r) => `${r.discount_price || r.price} ج.م` },
          { key: 'sessions_count', label: 'الحصص' },
          { key: 'is_featured', label: 'مميز', render: (r) => r.is_featured ? '⭐ نعم' : '—' }
        ]}
        rows={filtered}
        onEdit={startEdit}
        onDelete={setDelTarget}
      />
      <div className="card" style={{ padding: 18, marginTop: 18 }}>
        <h3 style={{ fontWeight: 800 }}>إضافة درس لكورس</h3>
        <form style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }} onSubmit={addLesson}>
          <select className="input" style={{ width: 220 }} value={lessonForm.course_id} onChange={(e) => setLessonForm({ ...lessonForm, course_id: e.target.value })} required>
            <option value="">اختار الكورس</option>
            {courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
          <input className="input" style={{ flex: 1, minWidth: 200 }} value={lessonForm.title} onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })} placeholder="عنوان الدرس" required />
          <input className="input" style={{ width: 130 }} type="number" value={lessonForm.duration_minutes} onChange={(e) => setLessonForm({ ...lessonForm, duration_minutes: e.target.value })} placeholder="المدة" />
          <button className="btn btn-primary">إضافة درس</button>
        </form>
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {courses.map((c) => (
            <div key={c.id} style={{ padding: '10px 12px', background: 'rgba(255,255,255,.04)', borderRadius: 10 }}>
              <b style={{ fontSize: 14 }}>{c.title} — {(lessonsByCourse[c.id] || []).length} درس</b>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                {(lessonsByCourse[c.id] || []).map((l) => (
                  <span key={l.id} className="badge">{l.title} <button onClick={async () => { if (isSupabaseConfigured) await deleteLesson(l.id); setLessonsByCourse({ ...lessonsByCourse, [c.id]: (lessonsByCourse[c.id] || []).filter((x) => x.id !== l.id) }); showToast('تم حذف الدرس') }} style={{ background: 'none', border: 'none', color: '#fca5a5', cursor: 'pointer' }}>×</button></span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'تعديل كورس' : 'إضافة كورس'} wide>
        <form style={{ display: 'flex', flexDirection: 'column', gap: 12 }} onSubmit={save}>
          <div><label className="label">العنوان *</label><input className="input" value={form.title} onChange={(e) => set('title', e.target.value)} required /></div>
          <div><label className="label">الوصف</label><textarea className="input" rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div><label className="label">السعر *</label><input className="input" type="number" value={form.price} onChange={(e) => set('price', e.target.value)} required /></div>
            <div><label className="label">سعر بعد الخصم</label><input className="input" type="number" value={form.discount_price} onChange={(e) => set('discount_price', e.target.value)} /></div>
            <div><label className="label">عدد الحصص</label><input className="input" type="number" value={form.sessions_count} onChange={(e) => set('sessions_count', e.target.value)} /></div>
            <div><label className="label">التصنيف</label><input className="input" value={form.category} onChange={(e) => set('category', e.target.value)} placeholder="فيزياء / رياضيات..." /></div>
            <div><label className="label">الحالة</label><select className="input" value={form.status} onChange={(e) => set('status', e.target.value)}><option value="active">نشط</option><option value="hidden">مخفي</option><option value="coming_soon">قريباً</option></select></div>
            <div><label className="label">الترتيب</label><input className="input" type="number" value={form.sort_order} onChange={(e) => set('sort_order', e.target.value)} /></div>
          </div>
          <div><label className="label">محتوى الكورس</label><textarea className="input" rows={2} value={form.content} onChange={(e) => set('content', e.target.value)} /></div>
          <ImageField value={form.image} onChange={(v) => set('image', v)} />
          <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14 }}><input type="checkbox" checked={Boolean(form.is_featured)} onChange={(e) => set('is_featured', e.target.checked)} /> كورس مميز</label>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>إلغاء</button>
            <button className="btn btn-primary" disabled={saving}>{saving ? 'جارٍ الحفظ...' : 'حفظ'}</button>
          </div>
        </form>
      </Modal>
      <ConfirmDialog open={Boolean(delTarget)} onClose={() => setDelTarget(null)} onConfirm={confirmDelete} loading={deleting} message={`هيتم حذف كورس "${delTarget?.title}" نهائياً.`} />
    </div>
  )
}