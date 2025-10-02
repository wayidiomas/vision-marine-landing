// API client for Vision Marine backend integration

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
const API_KEY = process.env.NEXT_PUBLIC_VISION_MARINE_API_KEY

// Base API client with Vision Marine API key
class ApiClient {
  private baseURL: string
  private apiKey: string

  constructor() {
    this.baseURL = API_BASE_URL
    this.apiKey = API_KEY || ''
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    requiresAuth = false
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'vision-marine-api-key': this.apiKey,
      ...options.headers,
    }

    // Add user token for authenticated requests
    if (requiresAuth) {
      const userToken = localStorage.getItem('supabase-auth-token')
      if (userToken) {
        headers['supabase-key-user'] = userToken
      }
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: `HTTP ${response.status}: ${response.statusText}`
      }))
      throw new Error(error.message || 'API request failed')
    }

    return response.json()
  }

  // Public endpoints (no auth required)
  async requestPasswordReset(email: string, redirectTo?: string) {
    return this.request('/api/v1/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, redirectTo }),
    })
  }

  // Authenticated endpoints
  async getUserProfile() {
    return this.request('/api/v1/auth/profile', {}, true)
  }

  async checkAuth() {
    return this.request('/api/v1/auth/check', {}, true)
  }

  async updateProfile(data: any) {
    return this.request('/api/v1/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }, true)
  }

  // Contact form (public endpoint - to be implemented)
  async submitContactForm(data: {
    name: string
    email: string
    message: string
    phone?: string
  }) {
    return this.request('/api/v1/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

export const apiClient = new ApiClient()