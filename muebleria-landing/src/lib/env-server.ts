/**
 * Configuración de variables de ambiente para el servidor
 * Incluye variables privadas y públicas
 */

// Función para validar que una variable de ambiente existe (solo servidor)
function getEnvVar(name: string, defaultValue?: string): string {
  const value = process.env[name] || defaultValue;
  if (!value) {
    throw new Error(`Variable de ambiente requerida no encontrada: ${name}`);
  }
  return value;
}

// Función para obtener variables opcionales
function getOptionalEnvVar(name: string, defaultValue?: string): string {
  return process.env[name] || defaultValue || '';
}

// Configuración de Supabase (servidor)
export const supabaseServerConfig = {
  url: getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
  anonKey: getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  serviceKey: getEnvVar('SUPABASE_SERVICE_KEY'),
} as const;

// Configuración de Email (solo servidor)
export const emailConfig = {
  host: getEnvVar('EMAIL_HOST', 'smtp.gmail.com'),
  port: parseInt(getEnvVar('EMAIL_PORT', '587')),
  user: getEnvVar('EMAIL_USER'),
  pass: getEnvVar('EMAIL_PASS'),
} as const;

// Configuración de WhatsApp (servidor)
export const whatsappServerConfig = {
  phone: getOptionalEnvVar('NEXT_PUBLIC_WHATSAPP_PHONE', ''),
} as const;

// Configuración de Analytics (servidor)
export const analyticsServerConfig = {
  gaId: getOptionalEnvVar('NEXT_PUBLIC_GA_ID', ''),
} as const;

// Configuración general (servidor)
export const appServerConfig = {
  nodeEnv: getOptionalEnvVar('NODE_ENV', 'development'),
  isDevelopment: getOptionalEnvVar('NODE_ENV', 'development') === 'development',
  isProduction: getOptionalEnvVar('NODE_ENV', 'development') === 'production',
} as const;

// Validación de variables críticas en servidor
try {
  if (!supabaseServerConfig.url) {
    console.warn('⚠️  NEXT_PUBLIC_SUPABASE_URL no está configurada');
  }
  if (!supabaseServerConfig.anonKey) {
    console.warn('⚠️  NEXT_PUBLIC_SUPABASE_ANON_KEY no está configurada');
  }
  if (!emailConfig.user) {
    console.warn('⚠️  EMAIL_USER no está configurada');
  }
  console.log('✅ Variables de ambiente del servidor cargadas correctamente');
} catch (error) {
  console.error('❌ Error cargando variables de ambiente del servidor:', error);
}

// Exportar todas las configuraciones del servidor
export const envServer = {
  supabase: supabaseServerConfig,
  email: emailConfig,
  whatsapp: whatsappServerConfig,
  analytics: analyticsServerConfig,
  app: appServerConfig,
} as const;

export default envServer;
