// components/catalog/ProductGrid.tsx
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { ProductCard } from './ProductCard'
import type { Product, Category } from '@/types'

interface ProductGridProps {
  categorySlug?: string
  featured?: boolean
  limit?: number
}

export function ProductGrid({ categorySlug, featured = false, limit }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        let query = supabase
          .from('products')
          .select(`
            *,
            category:categories(*)
          `)
          .eq('is_available', true)

        if (featured) {
          query = query.eq('is_featured', true)
        }

        if (categorySlug) {
          query = query.eq('categories.slug', categorySlug)
        }

        if (limit) {
          query = query.limit(limit)
        }

        query = query.order('created_at', { ascending: false })

        const { data, error } = await query

        if (error) throw error

        setProducts(data || [])
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Error al cargar los productos')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [categorySlug, featured, limit])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: limit || 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No se encontraron productos.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}