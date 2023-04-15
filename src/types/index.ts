import React from 'react';

// API Response Types
export interface StandardResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface ErrorResponse {
  message: string;
  error_code: string;
  timestamp: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  phone?: string;
  is_guest: boolean;
  is_active: boolean;
  is_verified: boolean;
  is_admin: boolean;
  last_login?: string;
  created_at: string;
  addresses: Address[];
  roles: string[];
}

export interface Address {
  id: string;
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
}

// Product Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  base_price: number;
  is_active: boolean;
  is_featured: boolean;
  is_customizable: boolean;
  meta_title?: string;
  meta_description?: string;
  specifications: Record<string, string>;
  images: string[];
}

// Cart Types
export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Cart {
  id?: string;
  items: CartItem[];
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  discount_amount: number;
  total_amount: number;
  created_at?: string;
  updated_at?: string;
}

// Order Types
export interface Order {
  id: string;
  order_number: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  discount_amount: number;
  total_amount: number;
  shipping_address: Address;
  billing_address: Address;
  shipping_method: string;
  tracking_number?: string;
  payment_method: string;
  confirmed_at?: string;
  shipped_at?: string;
  delivered_at?: string;
  customer_notes?: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus = 
  | 'pending'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'refunded';

// Auth Types
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  username: string;
  phone?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

export interface GuestData {
  session_id: string;
  email: string;
  first_name: string;
  last_name: string;
}

// Filter Types
export interface ProductFilters {
  page?: number;
  page_size?: number;
  is_featured?: boolean;
  min_price?: number;
  max_price?: number;
  size?: string;
  color?: string;
  search?: string;
  sort?: 'price_asc' | 'price_desc' | 'name' | 'newest';
}

// Discount Types
export interface DiscountCode {
  code: string;
  valid: boolean;
  discount_amount: number;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  message: string;
}

// UI Types
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface MenuItem {
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: MenuItem[];
}

export interface Breadcrumb {
  name: string;
  href: string;
  current: boolean;
} 