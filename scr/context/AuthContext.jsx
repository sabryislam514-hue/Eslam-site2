import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    let mounted = true
    async function init() {
      if (!isSupabaseConfigured) { setLoading(false); return }
      const { data } = await supabase.auth.getSession()
      if (mounted) {
        setUser(data?.session?.user || null)
        if (data?.session?.user) await checkAdmin(data.session.user.id)
        setLoading(false)
      }
    }
    init()
    if (!isSupabaseConfigured) return
    const { data: listener } = supabase.auth.onAuthStateChange(async (_e, session) => {
      setUser(session?.user || null)
      if (session?.user) await checkAdmin(session.user.id)
      else setIsAdmin(false)
      setLoading(false)
    })
    return () => { mounted = false; listener?.subscription?.unsubscribe() }
  }, [])

  async function checkAdmin(userId) {
    try {
      const { data } = await supabase.from('admins').select('user_id').eq('user_id', userId).maybeSingle()
      setIsAdmin(Boolean(data))
    } catch { setIsAdmin(false) }
  }

  async function loginWithPhone(phone, password) {
    const clean = String(phone).replace(/\D/g, '')
    const email = `${clean}@eslam-eg.com`
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    setUser(data.user)
    await checkAdmin(data.user.id)
    return data
  }

  async function logout() {
    await supabase.auth.signOut()
    setUser(null); setIsAdmin(false)
  }

  const value = useMemo(() => ({ user, loading, isAdmin, loginWithPhone, logout }), [user, loading, isAdmin])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}