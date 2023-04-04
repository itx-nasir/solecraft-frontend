'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, MapPin, Plus, Edit, Trash2 } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'next/navigation'

export default function AddressesPage() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [isAddingAddress, setIsAddingAddress] = useState(false)

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
        </div>
      </div>
    )
  }

  const mockAddresses = [
    {
      id: '1',
      label: 'Home',
      first_name: 'John',
      last_name: 'Doe',
      company: '',
      street_address_1: '123 Main Street',
      street_address_2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postal_code: '10001',
      country: 'US',
      phone: '+1 (555) 123-4567',
      is_default: true
    },
    {
      id: '2',
      label: 'Work',
      first_name: 'John',
      last_name: 'Doe',
      company: 'Tech Corp',
      street_address_1: '456 Tech Avenue',
      street_address_2: 'Suite 100',
      city: 'San Francisco',
      state: 'CA',
      postal_code: '94105',
      country: 'US',
      phone: '+1 (555) 987-6543',
      is_default: false
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/account"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Account
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Addresses</h1>
              <p className="mt-2 text-gray-600">Add and manage your delivery addresses</p>
            </div>
            <button
              onClick={() => setIsAddingAddress(true)}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Address
            </button>
          </div>
        </div>

        {/* Addresses List */}
        <div className="space-y-6">
          {mockAddresses.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses found</h3>
              <p className="text-gray-600 mb-6">
                Add your first address to get started with faster checkout.
              </p>
              <button
                onClick={() => setIsAddingAddress(true)}
                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Address
              </button>
            </div>
          ) : (
            mockAddresses.map((address) => (
              <div key={address.id} className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="bg-indigo-100 rounded-lg p-2">
                          <MapPin className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{address.label}</h3>
                          {address.is_default && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600 space-y-1">
                        <p className="font-medium text-gray-900">
                          {address.first_name} {address.last_name}
                        </p>
                        {address.company && (
                          <p>{address.company}</p>
                        )}
                        <p>{address.street_address_1}</p>
                        {address.street_address_2 && (
                          <p>{address.street_address_2}</p>
                        )}
                        <p>
                          {address.city}, {address.state} {address.postal_code}
                        </p>
                        <p>{address.country}</p>
                        {address.phone && (
                          <p>{address.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-6">
                      <button
                        onClick={() => alert('Edit address coming soon!')}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => alert('Delete address coming soon!')}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {!address.is_default && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => alert('Set as default coming soon!')}
                        className="text-sm text-indigo-600 hover:text-indigo-500"
                      >
                        Set as default address
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Address Modal Placeholder */}
        {isAddingAddress && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Address</h3>
              <p className="text-gray-600 mb-6">
                The add address form will be implemented when the backend API is available.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsAddingAddress(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Address functionality coming soon!')
                    setIsAddingAddress(false)
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Add Address
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 