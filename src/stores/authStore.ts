import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, LoginData, RegisterData } from '@/types'
import { authAPI } from '@/lib/api'

interface AuthStore {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (credentials: LoginData) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  clearError: () => void
  setUser: (user: User, token: string) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        try {
          set({ isLoading: true, error: null })
          const response = await authAPI.login(credentials)
          
          if (response.success) {
            const { user, access_token } = response.data
            set({
              user,
              token: access_token,
              isAuthenticated: true,
              isLoading: false,
              error: null
            })
            
            // Store in localStorage for persistence
            localStorage.setItem('auth_token', access_token)
            localStorage.setItem('user_data', JSON.stringify(user))
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Login failed'
          })
          throw error
        }
      },

      register: async (userData) => {
        try {
          set({ isLoading: true, error: null })
          const response = await authAPI.register(userData)
          
          if (response.success) {
            const { user, access_token } = response.data
            set({
              user,
              token: access_token,
              isAuthenticated: true,
              isLoading: false,
              error: null
            })
            
            // Store in localStorage for persistence
            localStorage.setItem('auth_token', access_token)
            localStorage.setItem('user_data', JSON.stringify(user))
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Registration failed'
          })
          throw error
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null
        })
        
        // Clear localStorage
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user_data')
      },

      clearError: () => {
        set({ error: null })
      },

      setUser: (user, token) => {
        set({
          user,
          token,
          isAuthenticated: true,
          error: null
        })
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
) 