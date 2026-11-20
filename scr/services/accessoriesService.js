import { supabase } from '../lib/supabase.js'

export async function getAccessoriesData() {
  const { data: categories, error } = await supabase.from('accessories_categories').select('*').order('sort_order', { ascending: true })
  if (error) throw error
  const { data: products, error: pErr } = await supabase.from('accessories_products').select('*').order('sort_order', { ascending: true })
  if (pErr) throw pErr
  return { categories: categories || [], products: products || [] }
}
export async function createAccessoriesCategory(payload) {
  const { data, error } = await supabase.from('accessories_categories').insert(payload).select().single()
  if (error) throw error
  return data
}
export async function updateAccessoriesCategory(id, payload) {
  const { data, error } = await supabase.from('accessories_categories').update(payload).eq('id', id).select().single()
  if (error) throw error
  return data
}
export async function deleteAccessoriesCategory(id) {
  const { error } = await supabase.from('accessories_categories').delete().eq('id', id)
  if (error) throw error
}
export async function createAccessoriesProduct(payload) {
  const { data, error } = await supabase.from('accessories_products').insert(payload).select().single()
  if (error) throw error
  return data
}
export async function updateAccessoriesProduct(id, payload) {
  const { data, error } = await supabase.from('accessories_products').update(payload).eq('id', id).select().single()
  if (error) throw error
  return data
}
export async function deleteAccessoriesProduct(id) {
  const { error } = await supabase.from('accessories_products').delete().eq('id', id)
  if (error) throw error
}