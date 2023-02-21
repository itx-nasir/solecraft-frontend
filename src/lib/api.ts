import axios, { AxiosInstance, AxiosError } from 'axios'
import { getErrorMessage } from './utils'

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

// Create axios instance
export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Clear auth token on unauthorized
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('user_data')
      }
      // Redirect to login if not already there
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/auth')) {
        window.location.href = '/auth/login'
      }
    }
    return Promise.reject(error)
  }
)

// API Helper Functions
export const setAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token)
  }
}

export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_data')
  }
}

export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token')
  }
  return null
}

// Generic API request function
export async function apiRequest<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  data?: any,
  params?: Record<string, any>
): Promise<T> {
  try {
    const response = await api.request({
      method,
      url: endpoint,
      data,
      params,
    })
    return response.data
  } catch (error) {
    const message = getErrorMessage(error)
    throw new Error(message)
  }
}

// Specific API functions based on available endpoints

// Auth API
export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },
  
  register: async (userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    username: string;
    phone?: string;
  }) => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },
  
  createGuest: async (guestData: {
    session_id: string;
    email: string;
    first_name: string;
    last_name: string;
  }) => apiRequest('POST', '/auth/guest', guestData),
  
  verifyEmail: async (token: string) =>
    apiRequest('POST', '/auth/verify-email', { token }),
  
  resendVerification: async (email: string) =>
    apiRequest('POST', '/auth/resend-verification', { email }),
}

// User API
export const userAPI = {
  getProfile: async () => apiRequest('GET', '/users/profile'),
  
  updateProfile: async (profileData: {
    email?: string;
    first_name?: string;
    last_name?: string;
    username?: string;
    phone?: string;
  }) => apiRequest('PUT', '/users/profile', profileData),
  
  getAddresses: async () => apiRequest('GET', '/users/addresses'),
  
  addAddress: async (addressData: {
    label: string;
    first_name: string;
    last_name: string;
    company?: string;
    street_address_1: string;
    street_address_2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone?: string;
    is_default: boolean;
  }) => apiRequest('POST', '/users/addresses', addressData),
  
  updateAddress: async (id: string, addressData: any) =>
    apiRequest('PUT', `/users/addresses/${id}`, addressData),
  
  deleteAddress: async (id: string) =>
    apiRequest('DELETE', `/users/addresses/${id}`),
}

// Product API
export const productAPI = {
  getProducts: async (params?: {
    page?: number;
    page_size?: number;
    category_id?: string;
    is_featured?: boolean;
  }) => {
    const response = await api.get('/products', { params })
    return response.data
  },
  
  getProduct: async (id: string) => apiRequest('GET', `/products/${id}`),
  
  getProductBySlug: async (slug: string) => {
    const response = await api.get(`/products/slug/${slug}`)
    return response.data
  },
  
  createProduct: async (productData: any) =>
    apiRequest('POST', '/products', productData),
  
  updateProduct: async (id: string, productData: any) =>
    apiRequest('PUT', `/products/${id}`, productData),
  
  deleteProduct: async (id: string) =>
    apiRequest('DELETE', `/products/${id}`),
}

// Health API
export const healthAPI = {
  check: async () => apiRequest('GET', '/health'),
  getInfo: async () => apiRequest('GET', '/'),
}

// Mock APIs for not-yet-implemented endpoints
export const cartAPI = {
  getCart: async () => {
    // Mock implementation - replace with real API call when available
    return {
      success: true,
      data: {
        items: [],
        subtotal: 0,
        tax_amount: 0,
        shipping_amount: 0,
        discount_amount: 0,
        total_amount: 0,
      }
    }
  },
  
  addItem: async (item: {
    product_variant_id: string;
    quantity: number;
    customizations?: any;
  }) => {
    // Mock implementation
    return { success: true, message: 'Item added to cart' }
  },
  
  updateItem: async (id: string, updates: { quantity?: number; customizations?: any }) => {
    // Mock implementation
    return { success: true, message: 'Cart item updated' }
  },
  
  removeItem: async (id: string) => {
    // Mock implementation
    return { success: true, message: 'Item removed from cart' }
  },
  
  getSummary: async () => {
    // Mock implementation
    return {
      success: true,
      data: {
        item_count: 0,
        subtotal: 0,
        tax_amount: 0,
        shipping_amount: 0,
        total_amount: 0,
      }
    }
  },
}

export const orderAPI = {
  createOrder: async (orderData: {
    shipping_address_id: string;
    billing_address_id: string;
    shipping_method: string;
    payment_method: string;
    discount_code?: string;
    customer_notes?: string;
  }) => {
    // Mock implementation
    return {
      success: true,
      data: {
        id: 'mock-order-id',
        order_number: 'ORD-001234',
        status: 'confirmed',
      }
    }
  },
  
  getOrders: async (params?: { page?: number; page_size?: number }) => {
    // Mock implementation
    return {
      success: true,
      data: {
        items: [],
        total: 0,
        page: 1,
        page_size: 20,
        total_pages: 0,
        has_next: false,
        has_prev: false,
      }
    }
  },
  
  getOrder: async (id: string) => {
    // Mock implementation
    return {
      success: true,
      data: {
        id,
        order_number: 'ORD-001234',
        status: 'confirmed',
        items: [],
      }
    }
  },
}

export const categoryAPI = {
  getCategories: async () => {
    // Mock implementation
    return {
      success: true,
      data: [
        {
          id: '1',
          name: 'Sneakers',
          slug: 'sneakers',
          description: 'Comfortable and stylish sneakers',
          is_active: true,
          sort_order: 1,
          children: [],
        },
        {
          id: '2',
          name: 'Boots',
          slug: 'boots',
          description: 'Durable and fashionable boots',
          is_active: true,
          sort_order: 2,
          children: [],
        },
        {
          id: '3',
          name: 'Dress Shoes',
          slug: 'dress-shoes',
          description: 'Elegant dress shoes for formal occasions',
          is_active: true,
          sort_order: 3,
          children: [],
        },
      ]
    }
  },
  
  getCategory: async (id: string) => {
    // Mock implementation
    return {
      success: true,
      data: {
        id,
        name: 'Sneakers',
        slug: 'sneakers',
        description: 'Comfortable and stylish sneakers',
        is_active: true,
        sort_order: 1,
        children: [],
      }
    }
  },
} 