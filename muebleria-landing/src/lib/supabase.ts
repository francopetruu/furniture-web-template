// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

// Cliente de Supabase para operaciones del lado del cliente
// Usar variables de ambiente directamente para el cliente
export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Cliente de Supabase para operaciones del lado del servidor (admin)
// Solo crear en el servidor
let supabaseAdmin: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseAdmin() {
  if (typeof window !== 'undefined') {
    throw new Error('supabaseAdmin solo puede ser usado en el servidor');
  }
  
  if (!supabaseAdmin) {
    supabaseAdmin = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );
  }
  
  return supabaseAdmin;
}

// Función helper para obtener el cliente adecuado según el contexto
export function getSupabaseClient(isAdmin: boolean = false) {
  if (isAdmin) {
    return getSupabaseAdmin();
  }
  return supabase;
}