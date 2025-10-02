export interface RegisterFormData {
  nome: string
  email: string
  password: string
  confirmPassword: string
  telefone?: string
  nacionalidade?: string
}

export interface LoginFormData {
  email: string
  password: string
}

export interface ResetPasswordFormData {
  email: string
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
}

export interface UserProfile {
  id: string
  email: string
  nome: string
  tipo_usuario: string
  telefone?: string
  nacionalidade?: string
  empresa?: {
    id: string
    razao_social: string
  }
  role?: {
    nome: string
    nivel_acesso: number
    permissoes: any
  }
}