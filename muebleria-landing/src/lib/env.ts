/**
 * Configuración de variables de ambiente (SOLO CLIENTE)
 * Este archivo solo expone variables seguras para el cliente
 * Para variables del servidor, usar @/lib/env-server
 */

// Re-exportar configuraciones del cliente
export { envClient as env, supabaseClientConfig as supabaseConfig, whatsappConfig, analyticsConfig, appConfig } from './env-client';

// Exportar por defecto
export { default } from './env-client';
