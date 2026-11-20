import { useState } from 'react'
import { useSite } from '../../context/SiteContext.jsx'

export default function GeneralSettings() {
  const { settings, updateSettingsBulk, showToast } = useSite()
  const [form, setForm] = useState({ whatsapp: settings.whatsapp, email: settings.email, phone: settings.phone, facebook: settings.facebook, instagram: settings.instagram, linkedin: settings.linkedin, github: settings.github, seo_title: settings.seo_title, seo_description: settings.seo_description, primary_color: settings.primary_color, accent_color: settings.accent_color })
  const [saving, setSaving] = useState(false)
  function set(k, v) { setForm((p) => ({ ...p, [k]: v })) }
  async function save(e) { e.preventDefault(); setSaving(true); await updateSettingsBulk(form); document.documentElement.style.setProperty('--primary', form.primary_color); showToast('تم حفظ الإعدادات العامة'); setSaving(false) }
  const fields = [
    ['whatsapp', 'رقم الواتساب (بكود الدولة: 2010...)'], ['email', 'الإيميل'], ['phone', 'الهاتف'],
    ['facebook', 'رابط فيسبوك'], ['instagram', 'رابط انستجرام'], ['linkedin', 'رابط لينكدإن'], ['github', 'رابط جيت هاب'],
    ['seo_title', 'SEO Title'], ['seo_description', 'SEO Description']
  ]
  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 900 }}>إعدادات عامة</h1>
      <p className="muted" style={{ fontSize: 14 }}>التواصل، السوشيال، الـ SEO، والألوان.</p>
      <form className="card" style={{ padding: 20, marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }} onSubmit={save}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {fields.map(([k, label]) => <div key={k}><label className="label">{label}</label><input className="input" value={form[k] || ''} onChange={(e) => set(k, e.target.value)} dir={k.includes('http') || k === 'whatsapp' ? 'ltr' : undefined} style={{ textAlign: k === 'whatsapp' ? 'left' : undefined }} /></div>)}
        </div>
        <div style={{ display: 'flex', gap: 14 }}>
          <div><label className="label">اللون الأساسي</label><input type="color" value={form.primary_color || '#7C5CFF'} onChange={(e) => set('primary_color', e.target.value)} style={{ width: 60, height: 40, border: 'none', background: 'none' }} /></div>
          <div><label className="label">اللون الثانوي</label><input type="color" value={form.accent_color || '#00D1B2'} onChange={(e) => set('accent_color', e.target.value)} style={{ width: 60, height: 40, border: 'none', background: 'none' }} /></div>
        </div>
        <div style={{ background: '#fffbe622', border: '1px solid #FFB02044', padding: 12, borderRadius: 12, fontSize: 13 }} className="muted">
          <b style={{ color: '#FFB020' }}>تنبيه أمان:</b> متكتبش أي Secret أو Service Role Key هنا. الـ Anon Key بس هو اللي في الـ .env، وده آمن للـ Frontend.
        </div>
        <button className="btn btn-primary" style={{ alignSelf: 'flex-start' }} disabled={saving}>{saving ? 'جارٍ الحفظ...' : 'حفظ'}</button>
      </form>
      <style>{`@media(max-width:700px){ form > div{grid-template-columns:1fr!important} }`}</style>
    </div>
  )
}