'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import type { Product } from '@/types'

interface ProductModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!isOpen) return null

  const handleWhatsApp = () => {
    const message = `Hola! Me interesa el producto: ${product.name}${
      product.price ? ` - Precio: ${product.price.toLocaleString('es-AR')}` : ''
    }. Me gustaría recibir más información y coordinar una visita.`
    
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/5491123456789?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  const nextImage = () => {
    if (product.images && product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
    }
  }

  const prevImage = () => {
    if (product.images && product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden">
              {product.images && product.images[currentImageIndex] ? (
                <Image
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Sin imagen
                </div>
              )}

              {/* Image navigation */}
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 hover:bg-opacity-100"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail images */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-amber-600' : 'border-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product details */}
          <div className="space-y-6">
            {/* Category */}
            {product.category && (
              <div className="text-amber-600 font-medium">
                {product.category.name}
              </div>
            )}

            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-900">
              {product.name}
            </h2>

            {/* Price */}
            <div>
              {product.discount_price ? (
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-red-600">
                    ${product.discount_price.toLocaleString('es-AR')}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.price?.toLocaleString('es-AR')}
                  </span>
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                    -{Math.round(((product.price! - product.discount_price) / product.price!) * 100)}% OFF
                  </span>
                </div>
              ) : product.price ? (
                <span className="text-3xl font-bold text-amber-600">
                  ${product.price.toLocaleString('es-AR')}
                </span>
              ) : (
                <span className="text-xl text-gray-600">Consultar precio</span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Descripción</h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Especificaciones</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-600 capitalize">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dimensions */}
            {product.dimensions && Object.keys(product.dimensions).length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Dimensiones</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {Object.entries(product.dimensions).map(([key, value]) => (
                    <span key={key} className="inline-block mr-4 text-sm">
                      <strong className="capitalize">{key}:</strong> {value}cm
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Materials and Colors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.materials && product.materials.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Materiales</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.materials.map((material, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product.colors && product.colors.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Colores disponibles</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color, index) => (
                      <span
                        key={index}
                        className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Stock status */}
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                product.is_available ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <span className={`font-medium ${
                product.is_available ? 'text-green-600' : 'text-red-600'
              }`}>
                {product.is_available ? 'Disponible' : 'Sin stock'}
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleWhatsApp}
                className="flex-1"
                size="lg"
              >
                Consultar por WhatsApp
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                size="lg"
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}