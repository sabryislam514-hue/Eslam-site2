export function formatPrice(n, currency = 'ج.م') {
  if (n === null || n === undefined || n === '') return '—'
  const num = Number(n)
  if (Number.isNaN(num)) return String(n)
  return `${num.toLocaleString('ar-EG')} ${currency}`
}

export function slugify(text = '') {
  return String(text).trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-ء-ي]/g, '')
}

export function cleanPhone(phone = '') {
  return String(phone).replace(/\D/g, '')
}

export function toWhatsAppNumber(phone = '') {
  let p = cleanPhone(phone)
  if (p.startsWith('0')) p = '20' + p.slice(1)
  return p
}

export function buildWhatsAppLink(phone, message) {
  const num = toWhatsAppNumber(phone)
  if (!num) return '#'
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`
}

export function timeAgo(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  const diff = Date.now() - d.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'الآن'
  if (mins < 60) return `منذ ${mins} دقيقة`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `منذ ${hours} ساعة`
  const days = Math.floor(hours / 24)
  return `منذ ${days} يوم`
}