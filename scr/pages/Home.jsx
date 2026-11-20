import { Link } from 'react-router-dom'
import { ArrowLeft, MessageCircle, Palette, Code2, ShoppingBag, UtensilsCrossed, GraduationCap, Check, Sparkles, Zap, ShieldCheck } from 'lucide-react'
import { useSite } from '../context/SiteContext.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import ImageWithFallback from '../components/ImageWithFallback.jsx'
import { buildWhatsAppLink } from '../lib/utils.js'
import useReveal from '../hooks/useReveal.js'

export default function Home() {
  const { settings, courses, restaurantProducts, accessoriesProducts } = useSite()
  useReveal()

  const projects = [
    {
      id: 'teacher', title: 'منصة المدرس', type: 'منصة تعليمية', desc: 'منصة كورسات كاملة: كورسات، دروس، أسعار، واشتراك عبر واتساب.', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1000&q=80', link: '/teacher', icon: <GraduationCap size={18} />, features: ['كورسات ديناميكية', 'صفحات تفاصيل', 'إدارة من الأدمن'], count: `${courses.length} كورس`
    },
    {
      id: 'restaurant', title: 'موقع المطعم', type: 'مطعم / كافيه', desc: 'منيو ديناميكية، سلة طلبات حقيقية، وإرسال الطلب واتساب بشكل منظم.', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&q=80', link: '/restaurant', icon: <UtensilsCrossed size={18} />, features: ['منيو + سلة', 'Checkout واتساب', 'عروض مميزة'], count: `${restaurantProducts.length} منتج`
    },
    {
      id: 'accessories', title: 'متجر الإكسسوارات', type: 'متجر إلكتروني', desc: 'متجر Premium: بحث، فلترة، ترتيب، مخزون، خصومات، وسلة كاملة.', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1000&q=80', link: '/accessories', icon: <ShoppingBag size={18} />, features: ['كتالوج ديناميكي', 'خصومات ومخزون', 'Checkout كامل'], count: `${accessoriesProducts.length} منتج`
    }
  ]

  const services = [
    { icon: <Palette size={22} />, title: 'تصميم مواقع', desc: 'تصميم Premium يخلي العميل يثق فيك من أول ثانية.' },
    { icon: <Code2 size={22} />, title: 'تطوير Frontend', desc: 'كود نظيف، أداء سريع، وتجربة استخدام سلسة.' },
    { icon: <ShoppingBag size={22} />, title: 'متاجر إلكترونية', desc: 'متجر كامل: منتجات، سلة، طلبات، وواتساب.' },
    { icon: <Zap size={22} />, title: 'مواقع أعمال', desc: 'مواقع للمدارس والمطاعم والشركات تعرض شغلك صح.' },
    { icon: <ShieldCheck size={22} />, title: 'لوحة تحكم', desc: 'تحكم كامل في المحتوى من غير ما تحتاج مبرمج.' },
    { icon: <Sparkles size={22} />, title: 'تطبيقات مخصصة', desc: 'أي فكرة عندك أحولها لتطبيق ويب شغال فعلاً.' }
  ]

  return (
    <div>
      {/* HERO */}
      <section className="container" style={{ padding: '56px 0 36px', display: 'grid', gridTemplateColumns: '1.15fr .85fr', gap: 28, alignItems: 'center' }} id="hero">
        <Reveal>
          <span className="badge" style={{ background: 'rgba(124,92,255,.14)', borderColor: 'rgba(124,92,255,.4)', color: '#D6CCFF' }}>● متاح لمشاريع جديدة</span>
          <h1 style={{ fontSize: 'clamp(32px, 5.5vw, 56px)', fontWeight: 900, lineHeight: 1.15, margin: '16px 0 12px' }}>{settings.hero_title}</h1>
          <p className="muted" style={{ fontSize: 17, maxWidth: 560 }}>{settings.hero_subtitle}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 22 }}>
            <Link to="#projects" className="btn btn-primary">شوف مشاريعي <ArrowLeft size={17} /></Link>
            <a href={buildWhatsAppLink(settings.whatsapp, 'أهلاً، عايز أطلب موقع')} target="_blank" rel="noreferrer" className="btn btn-whatsapp"><MessageCircle size={17} /> كلمني واتساب</a>
          </div>
          <div style={{ display: 'flex', gap: 18, marginTop: 26, flexWrap: 'wrap' }}>
            <div><b style={{ fontSize: 20 }}>+{courses.length + restaurantProducts.length + accessoriesProducts.length}</b><div className="muted" style={{ fontSize: 12 }}>عنصر ديناميكي</div></div>
            <div><b style={{ fontSize: 20 }}>3</b><div className="muted" style={{ fontSize: 12 }}>مشاريع تفاعلية</div></div>
            <div><b style={{ fontSize: 20 }}>100%</b><div className="muted" style={{ fontSize: 12 }}>قابل للإدارة</div></div>
          </div>
        </Reveal>
        <Reveal>
          <div style={{ position: 'relative' }}>
            <ImageWithFallback src={settings.hero_image} alt="Hero" style={{ width: '100%', height: 420, objectFit: 'cover', borderRadius: 24, border: '1px solid var(--line)' }} />
            <div className="card" style={{ position: 'absolute', bottom: 16, right: 16, left: 16, padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backdropFilter: 'blur(10px)', background: 'rgba(18,24,33,.85)' }}>
              <div><b>جرب الديمو بنفسك</b><div className="muted" style={{ fontSize: 12 }}>اضغط على أي مشروع وجرّب السلة والطلب</div></div>
              <Link to="/restaurant" className="btn btn-primary" style={{ padding: '8px 14px', fontSize: 13 }}>جرّب الآن</Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* PROJECTS */}
      <section className="container" id="projects" style={{ padding: '30px 0' }}>
        <SectionHeading eyebrow="المشاريع" title="مشاريع حقيقية، مش صور" subtitle="كل مشروع هنا تطبيق شغال فعلاً: تقدر تتصفح، تبحث، تضيف للسلة، وتطلب من واتساب." />
        <div className="grid-3">
          {projects.map((p, idx) => (
            <Reveal key={p.id}>
              <article className="card" style={{ overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative' }}>
                  <ImageWithFallback src={p.img} alt={p.title} style={{ width: '100%', height: 210, objectFit: 'cover' }} />
                  <span className="badge" style={{ position: 'absolute', top: 12, right: 12, background: '#0B0F14', border: '1px solid var(--line)' }}>{p.icon} {p.type}</span>
                  <span className="badge" style={{ position: 'absolute', bottom: 12, left: 12, background: '#7C5CFF', border: 'none' }}>{p.count}</span>
                </div>
                <div style={{ padding: 18, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontWeight: 900, fontSize: 20 }}>{idx + 1}. {p.title}</h3>
                  <p className="muted" style={{ fontSize: 14, margin: '8px 0 12px', flex: 1 }}>{p.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                    {p.features.map((f) => <span key={f} className="badge" style={{ fontSize: 11 }}><Check size={12} /> {f}</span>)}
                  </div>
                  <Link to={p.link} className="btn btn-primary" style={{ justifyContent: 'center' }}>عرض الديمو <ArrowLeft size={16} /></Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="container" id="services" style={{ padding: '36px 0' }}>
        <SectionHeading eyebrow="خدماتي" title="أي موقع تحتاجه، أقدر أنفذه" subtitle="من صفحة تعريفية بسيطة لمتجر كامل بلوحة تحكم." />
        <div className="grid-3">
          {services.map((s) => (
            <Reveal key={s.title}>
              <div className="card" style={{ padding: 20, height: '100%' }}>
                <span style={{ width: 48, height: 48, borderRadius: 14, display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg,#7C5CFF22,#00D1B222)', border: '1px solid var(--line)', color: '#C7B8FF' }}>{s.icon}</span>
                <h3 style={{ fontWeight: 800, margin: '14px 0 6px' }}>{s.title}</h3>
                <p className="muted" style={{ fontSize: 14 }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="container" id="about" style={{ padding: '36px 0' }}>
        <div className="card" style={{ padding: 28, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'center' }}>
          <div>
            <span className="badge">عني</span>
            <h2 style={{ fontSize: 28, fontWeight: 900, margin: '12px 0' }}>مين {settings.site_name}؟</h2>
            <p className="muted" style={{ fontSize: 15 }}>{settings.about_text}</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
              <Link to="/teacher" className="btn btn-ghost">منصة المدرس</Link>
              <Link to="/restaurant" className="btn btn-ghost">موقع المطعم</Link>
              <Link to="/accessories" className="btn btn-ghost">المتجر</Link>
            </div>
          </div>
          <ImageWithFallback src={settings.teacher_image} alt="About" style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: 18 }} />
        </div>
      </section>

      {/* CONTACT */}
      <section className="container" id="contact" style={{ padding: '20px 0 40px' }}>
        <div style={{ borderRadius: 24, padding: 32, textAlign: 'center', background: 'linear-gradient(135deg,#7C5CFF,#00D1B2)', color: '#fff' }}>
          <h2 style={{ fontSize: 28, fontWeight: 900 }}>عايز موقع زي ده لشغلك؟</h2>
          <p style={{ opacity: .9, margin: '8px 0 20px' }}>كلمني واتساب، وهنبدأ من فكرتك لموقع كامل شغال.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={buildWhatsAppLink(settings.whatsapp, 'أهلاً، عايز أطلب موقع لشغلي')} target="_blank" rel="noreferrer" className="btn" style={{ background: '#fff', color: '#111' }}><MessageCircle size={17} /> واتساب</a>
            <a href={`mailto:${settings.email}`} className="btn" style={{ background: 'rgba(255,255,255,.18)', color: '#fff', border: '1px solid rgba(255,255,255,.35)' }}>إيميل: {settings.email}</a>
          </div>
        </div>
      </section>
      <style>{`@media(max-width:820px){ #hero{grid-template-columns:1fr!important} #about .card{grid-template-columns:1fr!important} }`}</style>
    </div>
  )
}