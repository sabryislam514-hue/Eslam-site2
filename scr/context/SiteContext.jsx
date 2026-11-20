import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase.js'
import { getSettings, saveSettings } from '../services/settingsService.js'
import { seedData } from '../data/seedData.js'

const SiteContext = createContext(null)

export const defaultSettings = {
  site_name: 'Eslam',
  tagline: 'أصمم وأطور مواقع ويب احترافية',
  hero_title: 'أبني مواقع تبيع، مش مجرد صفحات',
  hero_subtitle: 'متخصص في تصميم وتطوير مواقع احترافية للمدارس والمطاعم والمتاجر — تجربة استخدام سريعة، تصميم Premium، ونتائج حقيقية.',
  hero_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
  about_text: 'أنا Eslam، مطور ومصمم مواقع. بساعد أصحاب الأعمال يحولوا فكرتهم لموقع احترافي يجيب عملاء. بشتغل على التصميم، الأداء، وتجربة المستخدم من أول سطر كود لحد النشر.',
  whatsapp: '201000000000',
  email: 'hello@eslam.dev',
  phone: '01000000000',
  facebook: '',
  instagram: '',
  behance: '',
  linkedin: '',
  github: '',
  primary_color: '#7C5CFF',
  accent_color: '#00D1B2',
  teacher_name: 'مستر أحمد',
  teacher_bio: 'مدرس بخبرة أكثر من 10 سنوات، متخصص في تبسيط المناهج ورفع مستوى الطلاب.',
  teacher_image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  restaurant_name: 'مذاق | Mazag',
  restaurant_about: 'مطعم وكافيه بيقدم أطباق طازة كل يوم، بمكونات مختارة بعناية وطعم يخليك ترجع تاني.',
  restaurant_image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
  accessories_name: 'LUMIÈRE',
  accessories_about: 'متجر إكسسوارات مختار بعناية — قطع أنيقة، خامات عالية، وتفاصيل تفرق.',
  accessories_image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1200&q=80',
  seo_title: 'Eslam — تصميم وتطوير مواقع',
  seo_description: 'تصميم وتطوير مواقع احترافية للمدارس والمطاعم والمتاجر.',
  footer_text: '© 2026 Eslam. جميع الحقوق محفوظة.'
}

export function SiteProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState('')
  const [courses, setCourses] = useState(seedData.courses)
  const [lessonsByCourse, setLessonsByCourse] = useState(seedData.lessons)
  const [restaurantCategories, setRestaurantCategories] = useState(seedData.restaurantCategories)
  const [restaurantProducts, setRestaurantProducts] = useState(seedData.restaurantProducts)
  const [accessoriesCategories, setAccessoriesCategories] = useState(seedData.accessoriesCategories)
  const [accessoriesProducts, setAccessoriesProducts] = useState(seedData.accessoriesProducts)
  const [orders, setOrders] = useState([])

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2600)
  }

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      try {
        if (isSupabaseConfigured) {
          const s = await getSettings()
          if (mounted && s) setSettings({ ...defaultSettings, ...s })
          const { getCoursesWithLessons } = await import('../services/teacherService.js')
          const { getRestaurantData } = await import('../services/restaurantService.js')
          const { getAccessoriesData } = await import('../services/accessoriesService.js')
          const { getOrders } = await import('../services/orderService.js')
          try {
            const c = await getCoursesWithLessons()
            if (mounted && c.courses.length) {
              setCourses(c.courses)
              setLessonsByCourse(c.lessonsByCourse)
            }
          } catch {}
          try {
            const r = await getRestaurantData()
            if (mounted && r.products.length) {
              setRestaurantCategories(r.categories)
              setRestaurantProducts(r.products)
            }
          } catch {}
          try {
            const a = await getAccessoriesData()
            if (mounted && a.products.length) {
              setAccessoriesCategories(a.categories)
              setAccessoriesProducts(a.products)
            }
          } catch {}
          try {
            const o = await getOrders()
            if (mounted) setOrders(o)
          } catch {}
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  async function updateSetting(key, value) {
    const next = { ...settings, [key]: value }
    setSettings(next)
    if (isSupabaseConfigured) {
      try { await saveSettings(next) } catch (e) { console.error(e) }
    }
  }

  async function updateSettingsBulk(next) {
    const merged = { ...settings, ...next }
    setSettings(merged)
    if (isSupabaseConfigured) {
      try { await saveSettings(merged) } catch (e) { console.error(e) }
    }
  }

  const value = useMemo(() => ({
    settings, setSettings, updateSetting, updateSettingsBulk,
    loading, toast, showToast, setToast,
    courses, setCourses, lessonsByCourse, setLessonsByCourse,
    restaurantCategories, setRestaurantCategories,
    restaurantProducts, setRestaurantProducts,
    accessoriesCategories, setAccessoriesCategories,
    accessoriesProducts, setAccessoriesProducts,
    orders, setOrders
  }), [settings, loading, toast, courses, lessonsByCourse, restaurantCategories, restaurantProducts, accessoriesCategories, accessoriesProducts, orders])

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite must be used inside SiteProvider')
  return ctx
}