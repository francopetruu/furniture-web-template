/**
 * Configuración centralizada de variables de ambiente
 * Este archivo valida y expone todas las variables de ambiente del proyecto
 */

// Función para validar que una variable de ambiente existe
function getEnvVar(name: string, defaultValue?: string): string {
  const value = process.env[name] || defaultValue;
  if (!value) {
    throw new Error(`Variable de ambiente requerida no encontrada: ${name}`);
  }
  return value;
}

// Función para obtener variables de ambiente del lado del cliente (NEXT_PUBLIC_*)
function getClientEnvVar(name: string, defaultValue?: string): string {
  if (typeof window !== 'undefined') {
    // En el cliente, usar las variables expuestas por Next.js
    return (window as any).__NEXT_DATA__?.props?.pageProps?.env?.[name] || 
           process.env[name] || 
           defaultValue || '';
  }
  return getEnvVar(name, defaultValue);
}

// Configuración de Supabase
export const supabaseConfig = {
  url: getClientEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
  anonKey: getClientEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  serviceKey: getEnvVar('SUPABASE_SERVICE_KEY', ''), // Solo servidor
} as const;

// Configuración de Email
export const emailConfig = {
  host: getEnvVar('EMAIL_HOST', 'smtp.gmail.com'),
  port: parseInt(getEnvVar('EMAIL_PORT', '587')),
  user: getEnvVar('EMAIL_USER', ''),
  pass: getEnvVar('EMAIL_PASS', ''),
} as const;

// Configuración de WhatsApp
export const whatsappConfig = {
  phone: getClientEnvVar('NEXT_PUBLIC_WHATSAPP_PHONE', ''),
} as const;

// Configuración de Analytics
export const analyticsConfig = {
  gaId: getClientEnvVar('NEXT_PUBLIC_GA_ID', ''),
} as const;

// Configuración general
export const appConfig = {
  nodeEnv: getEnvVar('NODE_ENV', 'development'),
  isDevelopment: getEnvVar('NODE_ENV', 'development') === 'development',
  isProduction: getEnvVar('NODE_ENV', 'development') === 'production',
} as const;

// Validación de variables críticas en servidor
if (typeof window === 'undefined') {
  // Solo validar en el servidor
  try {
    if (!supabaseConfig.url) {
      console.warn('⚠️  NEXT_PUBLIC_SUPABASE_URL no está configurada');
    }
    if (!supabaseConfig.anonKey) {
      console.warn('⚠️  NEXT_PUBLIC_SUPABASE_ANON_KEY no está configurada');
    }
    if (!emailConfig.user) {
      console.warn('⚠️  EMAIL_USER no está configurada');
    }
    console.log('✅ Variables de ambiente cargadas correctamente');
  } catch (error) {
    console.error('❌ Error cargando variables de ambiente:', error);
  }
}

// Exportar todas las configuraciones
export const env = {
  supabase: supabaseConfig,
  email: emailConfig,
  whatsapp: whatsappConfig,
  analytics: analyticsConfig,
  app: appConfig,
} as const;

export default env;
