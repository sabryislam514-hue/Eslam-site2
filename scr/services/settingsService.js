import { supabase } from '../lib/supabase.js'

export async function getSettings() {
  const { data, error } = await supabase.from('site_settings').select('*').eq('id', 1).maybeSingle()
  if (error) throw error
  return data?.data || null
}

export async function saveSettings(settingsObj) {
  const { error } = await supabase.from('site_settings').upsert({ id: 1, data: settingsObj, updated_at: new Date().toISOString() }, { onConflict: 'id' })
  if (error) throw error
  return true
}