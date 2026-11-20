import { Link } from 'react-router-dom'
import { Clock, Users, Star, ArrowLeft } from 'lucide-react'
import ImageWithFallback from '../../components/ImageWithFallback.jsx'
import { formatPrice } from '../../lib/utils.js'

export default function CourseCard({ course, lessonsCount = 0 }) {
  const hasDiscount = course.discount_price && Number(course.discount_price) < Number(course.price)
  return (
    <article className="card" style={{ overflow: 'hidden', transition: '.25s' }}>
      <Link to={`/teacher/${course.id}`} style={{ display: 'block', position: 'relative' }}>
        <ImageWithFallback src={course.image} alt={course.title} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
        {course.is_featured && <span className="badge" style={{ position: 'absolute', top: 12, right: 12, background: '#FFB020', color: '#111', border: 'none' }}>⭐ مميز</span>}
        {hasDiscount && <span className="badge" style={{ position: 'absolute', top: 12, left: 12, background: '#ef4444', color: '#fff', border: 'none' }}>خصم {Math.round((1 - Number(course.discount_price) / Number(course.price)) * 100)}%</span>}
      </Link>
      <div style={{ padding: 16 }}>
        <span className="badge">{course.category || 'عام'}</span>
        <Link to={`/teacher/${course.id}`}><h3 style={{ fontWeight: 800, fontSize: 17, margin: '10px 0 6px', lineHeight: 1.5 }}>{course.title}</h3></Link>
        <p className="muted" style={{ fontSize: 13, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: 40 }}>{course.description}</p>
        <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--muted)', margin: '12px 0' }}>
          <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}><Clock size={14} /> {course.sessions_count || lessonsCount} حصة</span>
          <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}><Users size={14} /> {lessonsCount} درس</span>
          <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}><Star size={14} /> 4.9</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18, color: '#00D1B2' }}>{formatPrice(course.discount_price || course.price)}</div>
            {hasDiscount && <div style={{ fontSize: 12, color: 'var(--muted)', textDecoration: 'line-through' }}>{formatPrice(course.price)}</div>}
          </div>
          <Link to={`/teacher/${course.id}`} className="btn btn-primary" style={{ padding: '9px 14px', fontSize: 13 }}>التفاصيل <ArrowLeft size={15} /></Link>
        </div>
      </div>
    </article>
  )
}