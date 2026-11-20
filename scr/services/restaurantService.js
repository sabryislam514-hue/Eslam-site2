import { supabase } from '../lib/supabase.js'

export async function getRestaurantData() {
  const { data: categories, error } = await supabase.from('restaurant_categories').select('*').order('sort_order', { ascending: true })
  if (error) throw error
  const { data: products, error: pErr } = await supabase.from('restaurant_products').select('*').order('sort_order', { ascending: true })
  if (pErr) throw pErr
  return { categories: categories || [], products: products || [] }
}
export async function createRestaurantCategory(payload) {
  const { data, error } = await supabase.from('restaurant_categories').insert(payload).select().single()
  if (error) throw error
  return data
}
export async function updateRestaurantCategory(id, payload) {
  const { data, error } = await supabase.from('restaurant_categories').update(payload).eq('id', id).select().single()
  if (error) throw error
  return data
}
export async function deleteRestaurantCategory(id) {
  const { error } = await supabase.from('restaurant_categories').delete().eq('id', id)
  if (error) throw error
}
export async function createRestaurantProduct(payload) {
  const { data, error } = await supabase.from('restaurant_products').insert(payload).select().single()
  if (error) throw error
  return data
}
export async function updateRestaurantProduct(id, payload) {
  const { data, error } = await supabase.from('restaurant_products').update(payload).eq('id', id).select().single()
  if (error) throw error
  return data
}
export async function deleteRestaurantProduct(id) {
  const { error } = await supabase.from('restaurant_products').delete().eq('id', id)
  if (error) throw error
}