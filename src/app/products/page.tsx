'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Filter, Grid, List, Search } from 'lucide-react'
import { Product, ProductFilters } from '@/types'
import { productAPI } from '@/lib/api'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<ProductFilters>({
    page: 1,
    page_size: 20,
  })

  // Mock product data for demonstration
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Classic Canvas Sneaker',
      slug: 'classic-canvas-sneaker',
      description: 'A timeless canvas sneaker perfect for everyday wear.',
      short_description: 'Comfortable canvas sneaker',
      base_price: 89.99,
      is_active: true,
      is_featured: true,
      is_customizable: true,
      specifications: { material: 'Canvas', sole: 'Rubber' },
      images: ['/placeholder-shoe-1.jpg'],
      category: {
        id: '1',
        name: 'Sneakers',
        slug: 'sneakers',
        is_active: true,
        sort_order: 1,
      },
      variants: [],
      customizations: [],
    },
    {
      id: '2',
      name: 'Leather High-Top Boot',
      slug: 'leather-high-top-boot',
      description: 'Premium leather boot with superior durability.',
      short_description: 'Premium leather boot',
      base_price: 159.99,
      is_active: true,
      is_featured: false,
      is_customizable: true,
      specifications: { material: 'Leather', sole: 'Rubber' },
      images: ['/placeholder-shoe-2.jpg'],
      category: {
        id: '2',
        name: 'Boots',
        slug: 'boots',
        is_active: true,
        sort_order: 2,
      },
      variants: [],
      customizations: [],
    },
    {
      id: '3',
      name: 'Elegant Dress Shoe',
      slug: 'elegant-dress-shoe',
      description: 'Sophisticated dress shoe for formal occasions.',
      short_description: 'Elegant formal shoe',
      base_price: 199.99,
      is_active: true,
      is_featured: true,
      is_customizable: true,
      specifications: { material: 'Leather', sole: 'Leather' },
      images: ['/placeholder-shoe-3.jpg'],
      category: {
        id: '3',
        name: 'Dress Shoes',
        slug: 'dress-shoes',
        is_active: true,
        sort_order: 3,
      },
      variants: [],
      customizations: [],
    },
  ]

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        // For now, use mock data since the API might not be available
        // const response = await productAPI.getProducts(filters)
        // setProducts(response.data.items)
        setProducts(mockProducts)
      } catch (error) {
        console.error('Failed to fetch products:', error)
        setProducts(mockProducts) // Fallback to mock data
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [filters])

  const handleFilterChange = (newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">All Products</h1>
        <p className="text-gray-600">
          Discover our complete collection of customizable shoes
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
              <div className="w-full h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Custom Sneaker {item}
                </h3>
                <p className="text-gray-600 text-sm mb-2">Premium comfort and style</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">
                    $99.99
                  </span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Product Card Component
function ProductCard({ product, viewMode }: { product: Product; viewMode: 'grid' | 'list' }) {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
        <div className="flex">
          <div className="w-32 h-32 bg-gray-200 flex-shrink-0"></div>
          <div className="flex-1 p-6">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  <Link href={`/products/${product.slug}`} className="hover:text-blue-600">
                    {product.name}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-2">{product.short_description}</p>
                <span className="text-sm text-gray-500">{product.category.name}</span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900 mb-4">
                  ${product.base_price.toFixed(2)}
                </p>
                <Link
                  href={`/products/${product.slug}`}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
      <div className="w-full h-48 bg-gray-200"></div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">
          <Link href={`/products/${product.slug}`} className="hover:text-blue-600">
            {product.name}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm mb-2">{product.short_description}</p>
        <p className="text-xs text-gray-500 mb-3">{product.category.name}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">
            ${product.base_price.toFixed(2)}
          </span>
          <Link
            href={`/products/${product.slug}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
} 