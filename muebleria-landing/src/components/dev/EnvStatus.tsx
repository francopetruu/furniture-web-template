/**
 * Componente para mostrar el estado de las variables de ambiente
 * Solo visible en modo desarrollo
 */

'use client'

import { env } from '@/lib/env'
import { useEnv } from '@/hooks/useEnv'

interface EnvStatusProps {
  showInProduction?: boolean
}

export default function EnvStatus({ showInProduction = false }: EnvStatusProps) {
  const envHook = useEnv()

  // Solo mostrar en desarrollo (a menos que se especifique lo contrario)
  if (!showInProduction && env.app.isProduction) {
    return null
  }

  const envVars = [
    {
      name: 'NEXT_PUBLIC_SUPABASE_URL',
      value: envHook.supabase.url,
      status: envHook.supabase.url ? 'ok' : 'missing',
      type: 'public'
    },
    {
      name: 'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      value: envHook.supabase.anonKey ? '***hidden***' : '',
      status: envHook.supabase.anonKey ? 'ok' : 'missing',
      type: 'public'
    },
    {
      name: 'NEXT_PUBLIC_WHATSAPP_PHONE',
      value: envHook.whatsapp.phone,
      status: envHook.whatsapp.phone ? 'ok' : 'missing',
      type: 'public'
    },
    {
      name: 'NEXT_PUBLIC_GA_ID',
      value: envHook.analytics.gaId,
      status: envHook.analytics.gaId && envHook.analytics.gaId !== 'G-XXXXXXXXXX' ? 'ok' : 'missing',
      type: 'public'
    },
  ]

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/90 text-white p-4 rounded-lg max-w-md text-xs font-mono">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-sm">Variables de Ambiente</h3>
        <span className={`px-2 py-1 rounded text-xs ${
          env.app.isDevelopment ? 'bg-yellow-600' : 'bg-green-600'
        }`}>
          {env.app.isDevelopment ? 'DEV' : 'PROD'}
        </span>
      </div>
      
      <div className="space-y-1">
        {envVars.map((envVar) => (
          <div key={envVar.name} className="flex items-center justify-between">
            <span className="text-gray-300">{envVar.name}:</span>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${
                envVar.status === 'ok' ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <span className={`text-xs ${
                envVar.status === 'ok' ? 'text-green-400' : 'text-red-400'
              }`}>
                {envVar.status === 'ok' ? 'OK' : 'Missing'}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-2 pt-2 border-t border-gray-700 text-xs text-gray-400">
        Archivo: env.local
      </div>
    </div>
  )
}
