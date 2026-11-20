import { useState } from 'react'
import { useSite } from '../../context/SiteContext.jsx'
import ImageField from '../components/ImageField.jsx'

export default function HomeSettings() {
  const { settings, updateSettingsBulk, showToast } = useSite()
  const [form, setForm] = useState(settings)
  const [saving, setSaving] = useState(false)
  function set(k, v) { setForm((p) => ({ ...p, [k]: v })) }
  async function save(e) { e.preventDefault(); setSaving(true); await updateSettingsBulk(form); showToast('تم حفظ إعدادات الرئيسية'); setSaving(false) }
  const fields = [
    ['site_name', 'اسم الموقع'], ['tagline', 'الشعار المختصر'], ['hero_title', 'عنوان Hero'], ['hero_subtitle', 'وصف Hero'],
    ['about_text', 'نص عني'], ['teacher_name', 'اسم المدرس'], ['teacher_bio', 'نبذة المدرس'],
    ['restaurant_name', 'اسم المطعم'], ['restaurant_about', 'نبذة المطعم'],
    ['accessories_name', 'اسم المتجر'], ['accessories_about', 'نبذة المتجر'],
    ['whatsapp', 'رقم الواتساب'], ['email', 'الإيميل'], ['phone', 'الهاتف'],
    ['facebook', 'فيسبوك'], ['instagram', 'انستجرام'], ['linkedin', 'لينكدإن'], ['github', 'جيت هاب'],
    ['seo_title', 'SEO Title'], ['seo_description', 'SEO Description'], ['footer_text', 'نص الفوتر']
  ]
  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 900 }}>إعدادات الرئيسية</h1>
      <p className="muted" style={{ fontSize: 14 }}>عدّل أي نص في الموقع، وهيتغير فوراً.</p>
      <form className="card" style={{ padding: 20, marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14 }} onSubmit={save}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {fields.map(([key, label]) => (
            <div key={key}><label className="label">{label}</label><input className="input" value={form[key] || ''} onChange={(e) => set(key, e.target.value)} /></div>
          ))}
        </div>
        <ImageField label="صورة Hero" value={form.hero_image} onChange={(v) => set('hero_image', v)} />
        <ImageField label="صورة المدرس" value={form.teacher_image} onChange={(v) => set('teacher_image', v)} />
        <ImageField label="صورة المطعم" value={form.restaurant_image} onChange={(v) => set('restaurant_image', v)} />
        <ImageField label="صورة المتجر" value={form.accessories_image} onChange={(v) => set('accessories_image', v)} />
        <button className="btn btn-primary" style={{ justifyContent: 'center', alignSelf: 'flex-start' }} disabled={saving}>{saving ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}</button>
      </form>
      <style>{`@media(max-width:700px){ form > div{grid-template-columns:1fr!important} }`}</style>
    </div>
  )
}