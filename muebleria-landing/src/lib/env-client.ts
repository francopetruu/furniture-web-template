/**
 * Configuración de variables de ambiente para el cliente
 * Solo incluye variables públicas (NEXT_PUBLIC_*)
 */

// Función para obtener variables del cliente
function getClientEnvVar(name: string, defaultValue?: string): string {
  if (typeof window !== 'undefined') {
    // En el cliente, usar process.env directamente
    return process.env[name] || defaultValue || '';
  }
  // En el servidor durante SSR, también usar process.env
  return process.env[name] || defaultValue || '';
}

// Configuración de Supabase (solo cliente)
export const supabaseClientConfig = {
  url: getClientEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
  anonKey: getClientEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
} as const;

// Configuración de WhatsApp (cliente)
export const whatsappConfig = {
  phone: getClientEnvVar('NEXT_PUBLIC_WHATSAPP_PHONE', ''),
} as const;

// Configuración de Analytics (cliente)
export const analyticsConfig = {
  gaId: getClientEnvVar('NEXT_PUBLIC_GA_ID', ''),
} as const;

// Configuración general
export const appConfig = {
  nodeEnv: getClientEnvVar('NODE_ENV', 'development'),
  isDevelopment: getClientEnvVar('NODE_ENV', 'development') === 'development',
  isProduction: getClientEnvVar('NODE_ENV', 'development') === 'production',
} as const;

// Validación de variables críticas (solo para desarrollo)
if (typeof window !== 'undefined' && appConfig.isDevelopment) {
  if (!supabaseClientConfig.url) {
    console.warn('⚠️  NEXT_PUBLIC_SUPABASE_URL no está configurada');
  }
  if (!supabaseClientConfig.anonKey) {
    console.warn('⚠️  NEXT_PUBLIC_SUPABASE_ANON_KEY no está configurada');
  }
}

// Exportar configuraciones del cliente
export const envClient = {
  supabase: supabaseClientConfig,
  whatsapp: whatsappConfig,
  analytics: analyticsConfig,
  app: appConfig,
} as const;

export default envClient;
