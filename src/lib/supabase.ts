import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

// Auth helper functions
export const auth = {
  // B2C Self-service registration
  async signUp(data: {
    email: string
    password: string
    nome: string
    telefone?: string
    nacionalidade?: string
  }) {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          nome: data.nome,
          telefone: data.telefone,
          nacionalidade: data.nacionalidade || 'Brasileira',
          tipo_usuario: 'aluno', // Default for B2C
        },
      },
    })

    if (error) {
      throw new Error(error.message)
    }

    return authData
  },

  // Login
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      throw new Error(error.message)
    }

    // Store token for API client
    if (data.session?.access_token) {
      localStorage.setItem('supabase-auth-token', data.session.access_token)
    }

    return data
  },

  // Password reset request
  async requestPasswordReset(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) {
      throw new Error(error.message)
    }

    return { message: 'Email de recuperação enviado!' }
  },

  // Update password
  async updatePassword(newPassword: string) {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      throw new Error(error.message)
    }

    return { message: 'Senha atualizada com sucesso!' }
  },

  // Logout
  async signOut() {
    const { error } = await supabase.auth.signOut()

    // Clear stored token
    localStorage.removeItem('supabase-auth-token')

    if (error) {
      throw new Error(error.message)
    }
  },

  // Get current session
  async getSession() {
    const { data, error } = await supabase.auth.getSession()

    if (error) {
      throw new Error(error.message)
    }

    return data.session
  },

  // Get current user
  async getUser() {
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      throw new Error(error.message)
    }

    return data.user
  },
}