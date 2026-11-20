export default function SectionHeading({ eyebrow, title, subtitle, align = 'start' }) {
  return (
    <div style={{ textAlign: align === 'center' ? 'center' : 'start', maxWidth: 720, margin: align === 'center' ? '0 auto 28px' : '0 0 28px' }}>
      {eyebrow && <span className="badge" style={{ color: '#C7B8FF', borderColor: 'rgba(124,92,255,.35)', background: 'rgba(124,92,255,.12)' }}>{eyebrow}</span>}
      <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 900, lineHeight: 1.2, margin: '12px 0 8px' }}>{title}</h2>
      {subtitle && <p className="muted" style={{ fontSize: 15 }}>{subtitle}</p>}
    </div>
  )
}