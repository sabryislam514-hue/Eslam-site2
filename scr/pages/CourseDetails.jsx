import { useParams, Link } from 'react-router-dom'
import { ArrowRight, Clock, Check, MessageCircle, BookOpen } from 'lucide-react'
import { useSite } from '../context/SiteContext.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ImageWithFallback from '../components/ImageWithFallback.jsx'
import { formatPrice, buildWhatsAppLink } from '../lib/utils.js'
import { courseOrderMessage } from '../lib/whatsapp.js'

export default function CourseDetails() {
  const { id } = useParams()
  const { settings, courses, lessonsByCourse } = useSite()
  const course = courses.find((c) => String(c.id) === String(id))
  if (!course) return <div className="container" style={{ padding: '40px 0' }}><EmptyState title="الكورس غير موجود" action={<Link to="/teacher" className="btn btn-primary">رجوع للكورسات</Link>} /></div>

  const lessons = lessonsByCourse[course.id] || []
  const msg = courseOrderMessage({ course, name: '', phone: '', settings })
  const wa = buildWhatsAppLink(settings.whatsapp, msg)

  return (
    <div className="container" style={{ padding: '32px 0' }}>
      <Link to="/teacher" className="btn btn-ghost" style={{ padding: '8px 14px' }}><ArrowRight size={16} /> رجوع</Link>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr .8fr', gap: 24, marginTop: 16 }}>
        <div>
          <ImageWithFallback src={course.image} alt={course.title} style={{ width: '100%', height: 360, objectFit: 'cover', borderRadius: 20 }} />
          <h1 style={{ fontSize: 30, fontWeight: 900, margin: '18px 0 8px' }}>{course.title}</h1>
          <p className="muted">{course.description}</p>
          <div className="card" style={{ padding: 18, marginTop: 18 }}>
            <h3 style={{ fontWeight: 800, display: 'flex', gap: 8, alignItems: 'center' }}><BookOpen size={18} /> محتوى الكورس</h3>
            <p className="muted" style={{ fontSize: 14, margin: '8px 0 14px' }}>{course.content}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {lessons.length === 0 && <p className="muted" style={{ fontSize: 14 }}>الدروس هتتضاف قريب من لوحة التحكم.</p>}
              {lessons.map((l, i) => (
                <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', background: 'rgba(255,255,255,.04)', borderRadius: 12 }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}><span className="muted">{i + 1}.</span> {l.title}</span>
                  <span className="muted" style={{ fontSize: 12, display: 'flex', gap: 4, alignItems: 'center' }}><Clock size={13} /> {l.duration_minutes || 45} دقيقة</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="card" style={{ padding: 20, position: 'sticky', top: 90 }}>
            <span className="badge">{course.category}</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, margin: '14px 0' }}>
              <b style={{ fontSize: 28, color: '#00D1B2' }}>{formatPrice(course.discount_price || course.price)}</b>
              {course.discount_price && <span style={{ textDecoration: 'line-through' }} className="muted">{formatPrice(course.price)}</span>}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14 }} className="muted">
              <span style={{ display: 'flex', gap: 8 }}><Check size={16} /> عدد الحصص: <b style={{ color: '#fff' }}>{course.sessions_count}</b></span>
              <span style={{ display: 'flex', gap: 8 }}><Check size={16} /> عدد الدروس: <b style={{ color: '#fff' }}>{lessons.length}</b></span>
              <span style={{ display: 'flex', gap: 8 }}><Check size={16} /> متابعة ومراجعات</span>
              <span style={{ display: 'flex', gap: 8 }}><Check size={16} /> امتحانات وتدريبات</span>
            </div>
            <a href={wa} target="_blank" rel="noreferrer" className="btn btn-whatsapp" style={{ width: '100%', justifyContent: 'center', marginTop: 18 }}><MessageCircle size={17} /> اشترك الآن واتساب</a>
            <p className="muted" style={{ fontSize: 12, textAlign: 'center', marginTop: 10 }}>بالضغط على الزر هيتفتح واتساب برسالة جاهزة فيها بيانات الكورس</p>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:820px){ .container > div{grid-template-columns:1fr!important} }`}</style>
    </div>
  )
}