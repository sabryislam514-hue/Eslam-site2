export default function ImageField({ label = 'صورة (رابط)', value, onChange }) {
  return (
    <div>
      <label className="label">{label}</label>
      <input className="input" value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="https://..." dir="ltr" style={{ textAlign: 'left' }} />
      {value && <img src={value} alt="preview" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 12, marginTop: 8, border: '1px solid var(--line)' }} onError={(e) => { e.currentTarget.style.display = 'none' }} />}
      <p className="muted" style={{ fontSize: 11, marginTop: 6 }}>الصق رابط صورة من Unsplash أو أي رابط مباشر. رفع الملفات متاح عبر Supabase Storage في الإصدار الكامل.</p>
    </div>
  )
}