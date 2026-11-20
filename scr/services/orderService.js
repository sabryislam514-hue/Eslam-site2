import { supabase } from '../lib/supabase.js'

export async function getOrders() {
  const { data, error } = await supabase.from('orders').select('*, order_items(*)').order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}
export async function createOrder(order, items) {
  const { data, error } = await supabase.from('orders').insert(order).select().single()
  if (error) throw error
  if (items?.length) {
    const rows = items.map((i) => ({ order_id: data.id, product_name: i.name, product_id: i.id, qty: i.qty, price: i.price }))
    const { error: iErr } = await supabase.from('order_items').insert(rows)
    if (iErr) throw iErr
  }
  return data
}
export async function updateOrderStatus(id, status) {
  const { data, error } = await supabase.from('orders').update({ status }).eq('id', id).select().single()
  if (error) throw error
  return data
}