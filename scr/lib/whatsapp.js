import { buildWhatsAppLink } from './utils.js'

export function courseOrderMessage({ course, name, phone, settings }) {
  const lines = [
    `أهلاً، أنا ${name || ''}`,
    `عايز أشترك في كورس: ${course?.title || ''}`,
    `السعر: ${course?.discount_price || course?.price || ''} ج.م`,
    `عدد الحصص: ${course?.sessions_count || ''}`,
    phone ? `رقم هاتفي: ${phone}` : '',
    '',
    `من موقع: ${settings?.site_name || 'Eslam'}`
  ]
  return lines.filter(Boolean).join('\n')
}

export function restaurantOrderMessage({ items, total, customer, settings }) {
  const lines = []
  lines.push('طلب جديد من المطعم 🍽️')
  lines.push('----------------')
  lines.push(`الاسم: ${customer?.name || ''}`)
  lines.push(`الهاتف: ${customer?.phone || ''}`)
  lines.push(`نوع الطلب: ${customer?.orderType === 'delivery' ? 'توصيل' : 'استلام من المطعم'}`)
  if (customer?.address) lines.push(`العنوان: ${customer.address}`)
  if (customer?.notes) lines.push(`ملاحظات: ${customer.notes}`)
  lines.push('----------------')
  lines.push('الطلبات:')
  items.forEach((it) => {
    lines.push(`- ${it.name} × ${it.qty} = ${Number(it.price) * Number(it.qty)} ج.م`)
  })
  lines.push('----------------')
  lines.push(`الإجمالي: ${total} ج.م`)
  return lines.join('\n')
}

export function accessoriesOrderMessage({ items, total, customer, settings }) {
  const lines = []
  lines.push('طلب جديد من المتجر 🛍️')
  lines.push('----------------')
  lines.push(`الاسم: ${customer?.name || ''}`)
  lines.push(`الهاتف: ${customer?.phone || ''}`)
  if (customer?.address) lines.push(`العنوان: ${customer.address}`)
  if (customer?.notes) lines.push(`ملاحظات: ${customer.notes}`)
  lines.push('----------------')
  items.forEach((it) => {
    lines.push(`- ${it.name} × ${it.qty} = ${Number(it.price) * Number(it.qty)} ج.م`)
  })
  lines.push('----------------')
  lines.push(`الإجمالي: ${total} ج.م`)
  return lines.join('\n')
}

export function getWhatsAppLink(phone, message) {
  return buildWhatsAppLink(phone, message)
}