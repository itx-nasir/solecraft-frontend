'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { User, Package, MapPin, Settings, CreditCard } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'next/navigation'

export default function AccountPage() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Please log in</h2>
          <p className="mt-2 text-gray-600">You need to be logged in to view this page.</p>
          <Link
            href="/auth/login"
            className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  const accountStats = [
    {
      name: 'Total Orders',
      value: '12',
      icon: Package,
      href: '/account/orders',
    },
    {
      name: 'Saved Addresses',
      value: user.addresses?.length.toString() || '0',
      icon: MapPin,
      href: '/account/addresses',
    },
    {
      name: 'Account Status',
      value: user.is_verified ? 'Verified' : 'Pending',
      icon: user.is_verified ? User : Settings,
      href: '/account/profile',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-6 py-8">
            <div className="flex items-center">
              <div className="bg-indigo-600 rounded-full p-3">
                <User className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {user.first_name}!
                </h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {accountStats.map((stat) => (
            <Link
              key={stat.name}
              href={stat.href}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className="bg-indigo-100 rounded-lg p-3">
                  <stat.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6 space-y-4">
                <Link
                  href="/account/orders"
                  className="flex items-center p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <Package className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-sm font-medium text-gray-900">View Orders</span>
                </Link>
                <Link
                  href="/account/profile"
                  className="flex items-center p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <User className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Edit Profile</span>
                </Link>
                <Link
                  href="/account/addresses"
                  className="flex items-center p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Manage Addresses</span>
                </Link>
                <Link
                  href="/account/settings"
                  className="flex items-center p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                >
                  <Settings className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-sm font-medium text-gray-900">Account Settings</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
                <Link
                  href="/account/orders"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  View all
                </Link>
              </div>
              <div className="p-6">
                {/* Mock recent orders */}
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">Order #ORD-001234</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Classic White Sneakers • Size 9
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Placed on December 15, 2024
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">$129.99</p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                          Delivered
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">Order #ORD-001233</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Sport Running Shoes • Size 9
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Placed on December 10, 2024
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">$89.99</p>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                          Shipped
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center py-4">
                    <p className="text-gray-500">No more recent orders</p>
                    <Link
                      href="/products"
                      className="mt-2 inline-block text-indigo-600 hover:text-indigo-500"
                    >
                      Start shopping →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 