import { ProductGrid } from '@/components/catalog/ProductGrid'
import { supabase } from '@/lib/supabase'
import type { Category } from '@/types'

export const metadata = {
  title: 'Catálogo - Mueblería Familiar',
  description: 'Explora nuestro catálogo completo de muebles para living, dormitorio, cocina y oficina.',
}

async function getCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export default async function CatalogoPage() {
  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nuestro Catálogo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra amplia selección de muebles de calidad para cada espacio de tu hogar.
          </p>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Categorías
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow text-center"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-sm text-gray-600">
                      {category.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Products */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Todos los Productos
          </h2>
        </div>

        {/* Products Grid */}
        <ProductGrid />
      </div>
    </div>
  )
}