import { supabase } from '../lib/supabase.js'

export async function getCoursesWithLessons() {
  const { data: courses, error } = await supabase.from('courses').select('*').order('sort_order', { ascending: true })
  if (error) throw error
  const { data: lessons, error: lErr } = await supabase.from('lessons').select('*').order('sort_order', { ascending: true })
  if (lErr) throw lErr
  const map = {}
  ;(lessons || []).forEach((l) => {
    if (!map[l.course_id]) map[l.course_id] = []
    map[l.course_id].push(l)
  })
  return { courses: courses || [], lessonsByCourse: map }
}

export async function createCourse(payload) {
  const { data, error } = await supabase.from('courses').insert(payload).select().single()
  if (error) throw error
  return data
}
export async function updateCourse(id, payload) {
  const { data, error } = await supabase.from('courses').update(payload).eq('id', id).select().single()
  if (error) throw error
  return data
}
export async function deleteCourse(id) {
  const { error } = await supabase.from('courses').delete().eq('id', id)
  if (error) throw error
}
export async function createLesson(payload) {
  const { data, error } = await supabase.from('lessons').insert(payload).select().single()
  if (error) throw error
  return data
}
export async function updateLesson(id, payload) {
  const { data, error } = await supabase.from('lessons').update(payload).eq('id', id).select().single()
  if (error) throw error
  return data
}
export async function deleteLesson(id) {
  const { error } = await supabase.from('lessons').delete().eq('id', id)
  if (error) throw error
}