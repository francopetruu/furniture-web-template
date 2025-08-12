'use client'

import { useState } from 'react'

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('todos')

  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'living', name: 'Living' },
    { id: 'dormitorio', name: 'Dormitorio' },
    { id: 'cocina', name: 'Cocina' },
    { id: 'oficina', name: 'Oficina' }
  ]

  const galleryItems = [
    {
      id: 1,
      category: 'living',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
      title: 'Sofá Moderno'
    },
    {
      id: 2,
      category: 'dormitorio',
      image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80',
      title: 'Cama Matrimonial'
    },
    {
      id: 3,
      category: 'cocina',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
      title: 'Muebles de Cocina'
    },
    {
      id: 4,
      category: 'oficina',
      image: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=400&q=80',
      title: 'Escritorio Ejecutivo'
    },
    {
      id: 5,
      category: 'living',
      image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&q=80',
      title: 'Mesa de Centro'
    },
    {
      id: 6,
      category: 'dormitorio',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&q=80',
      title: 'Placard Moderno'
    }
  ]

  const filteredItems = selectedCategory === 'todos' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory)

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nuestra Galería
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Explora algunos de nuestros trabajos más destacados
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-amber-50 border border-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg bg-white shadow-md">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.title}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}