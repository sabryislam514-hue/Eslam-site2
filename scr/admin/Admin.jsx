import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { isSupabaseConfigured } from '../lib/supabase.js'
import Overview from './pages/Overview.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'

export default function Admin() {
  const { user, loading, isAdmin, loginWithPhone } = useAuth()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const [demoMode, setDemoMode] = useState(false)

  if (loading) return <LoadingSpinner />

  if (!isSupabaseConfigured) {
    if (!demoMode) {
      return (
        <div style={{ maxWidth: 440, margin: '60px auto' }}>
          <div className="card" style={{ padding: 24 }}>
            <h1 style={{ fontWeight: 900, fontSize: 22 }}>لوحة التحكم — وضع Demo</h1>
            <p className="muted" style={{ fontSize: 14, margin: '8px 0 16px' }}>Supabase غير مفعّل، فالتعديلات هتتحفظ في المتصفح مؤقتاً. فعّل Supabase للحفظ الدائم.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input className="input" placeholder="رقم الهاتف (أي رقم)" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <input className="input" type="password" placeholder="كلمة المرور (أي كلمة)" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button className="btn btn-primary" style={{ justifyContent: 'center' }} onClick={() => setDemoMode(true)}>دخول Demo</button>
              <Link to="/" className="btn btn-ghost" style={{ justifyContent: 'center' }}>رجوع للموقع</Link>
            </div>
          </div>
        </div>
      )
    }
    return <Overview />
  }

  if (!user) {
    return (
      <div style={{ maxWidth: 440, margin: '60px auto' }}>
        <div className="card" style={{ padding: 24 }}>
          <h1 style={{ fontWeight: 900, fontSize: 22 }}>دخول الأدمن</h1>
          <p className="muted" style={{ fontSize: 13, margin: '8px 0 16px' }}>ادخل برقم الهاتف وكلمة المرور المسجلين في Supabase Auth. الإيميل الداخلي بيكون: رقمك@eslam-eg.com</p>
          {err && <div style={{ background: '#ef444422', color: '#fca5a5', padding: 10, borderRadius: 10, fontSize: 13, marginBottom: 12 }}>{err}</div>}
          <form style={{ display: 'flex', flexDirection: 'column', gap: 10 }} onSubmit={async (e) => { e.preventDefault(); setErr(''); setBusy(true); try { await loginWithPhone(phone, password) } catch (er) { setErr('بيانات الدخول غير صحيحة') } finally { setBusy(false) } }}>
            <input className="input" placeholder="رقم الهاتف: 01000000000" value={phone} onChange={(e) => setPhone(e.target.value)} required dir="ltr" style={{ textAlign: 'left' }} />
            <input className="input" type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button className="btn btn-primary" style={{ justifyContent: 'center' }} disabled={busy}>{busy ? 'جارٍ الدخول...' : 'دخول'}</button>
          </form>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return <div className="card" style={{ padding: 24, textAlign: 'center', maxWidth: 520, margin: '60px auto' }}><h2>غير مصرح لك</h2><p className="muted" style={{ fontSize: 14 }}>الحساب ده مش أدمن. ضيف user_id بتاعه في جدول admins من Supabase.</p><p className="muted" style={{ fontSize: 12, direction: 'ltr' }}>User ID: {user.id}</p></div>
  }

  return <Overview />
}