'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  onQuickView?: (product: Product) => void
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const handleWhatsApp = () => {
    const message = `Hola! Me interesa el producto: ${product.name}${
      product.price ? ` - Precio: ${product.price.toLocaleString('es-AR')}` : ''
    }. Me gustaría recibir más información.`
    
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/5491123456789?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-200">
        {product.images && product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span>Sin imagen</span>
          </div>
        )}
        
        {/* Badge de destacado */}
        {product.is_featured && (
          <div className="absolute top-3 left-3 bg-amber-600 text-white px-2 py-1 rounded-lg text-xs font-semibold">
            Destacado
          </div>
        )}

        {/* Precio con descuento */}
        {product.discount_price && product.price && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
            -{Math.round(((product.price - product.discount_price) / product.price) * 100)}%
          </div>
        )}

        {/* Quick view button */}
        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium">
              Vista rápida
            </span>
          </button>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="mb-2">
          {product.category && (
            <span className="text-sm text-amber-600 font-medium">
              {product.category.name}
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {product.short_description && (
          <p className="text-gray-600 mb-4 line-clamp-2">
            {product.short_description}
          </p>
        )}

        {/* Price */}
        <div className="mb-4">
          {product.discount_price ? (
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-red-600">
                ${product.discount_price.toLocaleString('es-AR')}
              </span>
              <span className="text-lg text-gray-500 line-through">
                ${product.price?.toLocaleString('es-AR')}
              </span>
            </div>
          ) : product.price ? (
            <span className="text-2xl font-bold text-amber-600">
              ${product.price.toLocaleString('es-AR')}
            </span>
          ) : (
            <span className="text-lg text-gray-600">Consultar precio</span>
          )}
        </div>

        {/* Specifications preview */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {Object.entries(product.specifications).slice(0, 2).map(([key, value]) => (
                <span
                  key={key}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                >
                  {key}: {value}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={handleWhatsApp}
            className="flex-1"
          >
            Consultar
          </Button>
          {onQuickView && (
            <Button
              variant="outline"
              onClick={() => onQuickView(product)}
              className="px-3"
            >
              👁️
            </Button>
          )}
        </div>

        {/* Stock status */}
        <div className="mt-3 flex items-center">
          <div className={`w-2 h-2 rounded-full mr-2 ${
            product.is_available ? 'bg-green-500' : 'bg-red-500'
          }`} />
          <span className={`text-sm ${
            product.is_available ? 'text-green-600' : 'text-red-600'
          }`}>
            {product.is_available ? 'Disponible' : 'Sin stock'}
          </span>
        </div>
      </div>
    </div>
  )
}