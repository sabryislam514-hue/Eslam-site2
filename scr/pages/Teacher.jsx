import { useMemo, useState } from 'react'
import { Search, GraduationCap, MessageCircle } from 'lucide-react'
import { useSite } from '../context/SiteContext.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import CourseCard from '../features/teacher/CourseCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Reveal from '../components/Reveal.jsx'
import ImageWithFallback from '../components/ImageWithFallback.jsx'
import { buildWhatsAppLink } from '../lib/utils.js'
import useReveal from '../hooks/useReveal.js'

export default function Teacher() {
  const { settings, courses, lessonsByCourse } = useSite()
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('الكل')
  const [sort, setSort] = useState('featured')
  useReveal()

  const cats = useMemo(() => ['الكل', ...new Set(courses.map((c) => c.category).filter(Boolean))], [courses])
  const filtered = useMemo(() => {
    let list = courses.filter((c) => c.status !== 'hidden')
    if (cat !== 'الكل') list = list.filter((c) => c.category === cat)
    if (q.trim()) list = list.filter((c) => (c.title + ' ' + c.description).toLowerCase().includes(q.toLowerCase()))
    if (sort === 'price-low') list = [...list].sort((a, b) => Number(a.discount_price || a.price) - Number(b.discount_price || b.price))
    if (sort === 'price-high') list = [...list].sort((a, b) => Number(b.discount_price || b.price) - Number(a.discount_price || a.price))
    if (sort === 'featured') list = [...list].sort((a, b) => Number(b.is_featured || 0) - Number(a.is_featured || 0))
    return list
  }, [courses, cat, q, sort])

  return (
    <div>
      <section style={{ background: 'linear-gradient(135deg,#0F1A2E,#1A2E1F)', borderBottom: '1px solid var(--line)' }}>
        <div className="container" style={{ padding: '48px 0', display: 'grid', gridTemplateColumns: '1.2fr .8fr', gap: 24, alignItems: 'center' }}>
          <div>
            <span className="badge" style={{ background: '#FFB020', color: '#111', border: 'none' }}><GraduationCap size={14} /> منصة تعليمية</span>
            <h1 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 900, margin: '12px 0' }}>{settings.teacher_name} — اتعلم صح</h1>
            <p className="muted" style={{ fontSize: 15, maxWidth: 560 }}>{settings.teacher_bio}</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
              <a href="#courses" className="btn btn-primary">تصفح الكورسات</a>
              <a href={buildWhatsAppLink(settings.whatsapp, 'أهلاً، عايز أشترك في كورس')} target="_blank" rel="noreferrer" className="btn btn-whatsapp"><MessageCircle size={16} /> استفسر واتساب</a>
            </div>
          </div>
          <ImageWithFallback src={settings.teacher_image} alt={settings.teacher_name} style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 20 }} />
        </div>
      </section>

      <section className="container" id="courses" style={{ padding: '32px 0' }}>
        <SectionHeading eyebrow="الكورسات" title="اختار كورسك وابدأ" subtitle="كل كورس فيه محتوى منظم، عدد حصص واضح، وسعر شفاف." />
        <div className="card" style={{ padding: 14, display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
          <div style={{ flex: 1, minWidth: 220, display: 'flex', gap: 8, alignItems: 'center', background: 'rgba(255,255,255,.05)', border: '1px solid var(--line)', borderRadius: 12, padding: '0 12px' }}>
            <Search size={18} className="muted" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث عن كورس..." style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', padding: '12px 0', width: '100%' }} />
          </div>
          <select value={cat} onChange={(e) => setCat(e.target.value)} className="input" style={{ width: 160 }}><option>الكل</option>{cats.filter((c) => c !== 'الكل').map((c) => <option key={c}>{c}</option>)}</select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="input" style={{ width: 180 }}>
            <option value="featured">المميزة أولاً</option>
            <option value="price-low">السعر: من الأقل</option>
            <option value="price-high">السعر: من الأعلى</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
          {cats.map((c) => <button key={c} onClick={() => setCat(c)} className="btn" style={{ padding: '7px 14px', fontSize: 13, background: cat === c ? '#7C5CFF' : 'rgba(255,255,255,.06)', color: '#fff' }}>{c}</button>)}
        </div>
        {filtered.length === 0 ? <EmptyState title="لا توجد كورسات مطابقة" subtitle="جرّب كلمة بحث مختلفة أو غيّر التصنيف." /> : (
          <div className="grid-3">
            {filtered.map((c) => <Reveal key={c.id}><CourseCard course={c} lessonsCount={(lessonsByCourse[c.id] || []).length} /></Reveal>)}
          </div>
        )}
      </section>
      <style>{`@media(max-width:820px){ section .container{grid-template-columns:1fr!important} }`}</style>
    </div>
  )
}