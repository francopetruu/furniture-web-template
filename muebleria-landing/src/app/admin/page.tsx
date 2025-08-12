// app/admin/page.tsx (protegida con auth)
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface DashboardStats {
  totalProducts: number
  totalInquiries: number
  recentInquiries: Array<{
    id: string
    name: string
    email: string
    phone: string
    message: string
    created_at: string
  }>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        // Obtener estadísticas
        const [productsResult, inquiriesResult, recentInquiriesResult] = await Promise.all([
          supabase.from('products').select('id', { count: 'exact' }),
          supabase.from('inquiries').select('id', { count: 'exact' }),
          supabase
            .from('inquiries')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5)
        ])

        setStats({
          totalProducts: productsResult.count || 0,
          totalInquiries: inquiriesResult.count || 0,
          recentInquiries: recentInquiriesResult.data || []
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) return <div>Cargando...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Total Productos</h3>
          <p className="text-3xl font-bold text-amber-600">{stats?.totalProducts}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Total Consultas</h3>
          <p className="text-3xl font-bold text-green-600">{stats?.totalInquiries}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900">Consultas Hoy</h3>
          <p className="text-3xl font-bold text-blue-600">
            {stats?.recentInquiries.filter(
              inquiry => new Date(inquiry.created_at).toDateString() === new Date().toDateString()
            ).length}
          </p>
        </div>
      </div>

      {/* Recent Inquiries */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Consultas Recientes</h2>
        </div>
        <div className="p-6">
          {stats?.recentInquiries.length === 0 ? (
            <p className="text-gray-500">No hay consultas recientes.</p>
          ) : (
            <div className="space-y-4">
              {stats?.recentInquiries.map((inquiry) => (
                <div key={inquiry.id} className="border-l-4 border-amber-500 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{inquiry.name}</h4>
                      <p className="text-sm text-gray-600">{inquiry.email}</p>
                      <p className="text-sm text-gray-800 mt-1">{inquiry.message}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(inquiry.created_at).toLocaleString('es-AR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}