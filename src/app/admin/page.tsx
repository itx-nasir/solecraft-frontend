'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Package, Users, ShoppingCart, TrendingUp, Settings } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'

export default function AdminPage() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
    } else if (user && !user.is_staff) {
      // Non-admin users shouldn't access this page
      router.push('/')
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || !user || !user.is_staff) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Access Restricted</h2>
          <p className="mt-2 text-gray-600">You need admin privileges to access this page.</p>
        </div>
      </div>
    )
  }

  const adminStats = [
    {
      name: 'Total Products',
      value: '150',
      icon: Package,
      change: '+12%',
      changeType: 'increase'
    },
    {
      name: 'Total Users',
      value: '1,234',
      icon: Users,
      change: '+5%',
      changeType: 'increase'
    },
    {
      name: 'Total Orders',
      value: '856',
      icon: ShoppingCart,
      change: '+8%',
      changeType: 'increase'
    },
    {
      name: 'Revenue',
      value: '$12,345',
      icon: TrendingUp,
      change: '+15%',
      changeType: 'increase'
    }
  ]

  const quickActions = [
    {
      name: 'Manage Products',
      description: 'Add, edit, or remove products',
      icon: Package,
      href: '/admin/products',
      color: 'bg-blue-500'
    },
    {
      name: 'Manage Users',
      description: 'View and manage user accounts',
      icon: Users,
      href: '/admin/users',
      color: 'bg-green-500'
    },
    {
      name: 'View Orders',
      description: 'Process and track orders',
      icon: ShoppingCart,
      href: '/admin/orders',
      color: 'bg-yellow-500'
    },
    {
      name: 'Settings',
      description: 'System configuration',
      icon: Settings,
      href: '/admin/settings',
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back, {user.first_name}! Here's your store overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminStats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="bg-indigo-100 rounded-lg p-3">
                  <stat.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action) => (
                <button
                  key={action.name}
                  onClick={() => alert(`${action.name} coming soon!`)}
                  className="text-left p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className={`${action.color} rounded-lg p-3 w-fit mb-4`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">{action.name}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow mt-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 rounded-full p-2">
                  <ShoppingCart className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New order #ORD-001234</p>
                  <p className="text-sm text-gray-600">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 rounded-full p-2">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">New user registration</p>
                  <p className="text-sm text-gray-600">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-yellow-100 rounded-full p-2">
                  <Package className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Product inventory low</p>
                  <p className="text-sm text-gray-600">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 