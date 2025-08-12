// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'
import { env } from './env'

// Cliente de Supabase para operaciones del lado del cliente
export const supabase = createClient<Database>(
  env.supabase.url,
  env.supabase.anonKey
)

// Cliente de Supabase para operaciones del lado del servidor (admin)
export const supabaseAdmin = createClient<Database>(
  env.supabase.url,
  env.supabase.serviceKey
)

// Función helper para obtener el cliente adecuado según el contexto
export function getSupabaseClient(isAdmin: boolean = false) {
  return isAdmin ? supabaseAdmin : supabase
}