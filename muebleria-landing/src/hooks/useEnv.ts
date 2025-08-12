/**
 * Hook personalizado para acceder a variables de ambiente en componentes React
 * Solo incluye variables seguras para el cliente
 */

import { useMemo } from 'react';
import { envClient } from '@/lib/env-client';

export function useEnv() {
  return useMemo(() => ({
    // Configuración de Supabase (disponible en cliente)
    supabase: {
      url: envClient.supabase.url,
      anonKey: envClient.supabase.anonKey,
    },
    
    // Configuración de WhatsApp (disponible en cliente)
    whatsapp: {
      phone: envClient.whatsapp.phone,
    },
    
    // Configuración de Analytics (disponible en cliente)
    analytics: {
      gaId: envClient.analytics.gaId,
    },
    
    // Configuración de la aplicación
    app: {
      isDevelopment: envClient.app.isDevelopment,
      isProduction: envClient.app.isProduction,
    },
  }), []);
}

// Hook específico para Supabase
export function useSupabaseEnv() {
  return useMemo(() => ({
    url: envClient.supabase.url,
    anonKey: envClient.supabase.anonKey,
  }), []);
}

// Hook específico para WhatsApp
export function useWhatsAppEnv() {
  return useMemo(() => ({
    phone: envClient.whatsapp.phone,
    formatPhone: (phone: string) => phone.replace(/\D/g, ''),
    getWhatsAppUrl: (message: string = '') => {
      const formattedPhone = envClient.whatsapp.phone.replace(/\D/g, '');
      const encodedMessage = encodeURIComponent(message);
      return `https://wa.me/${formattedPhone}${message ? `?text=${encodedMessage}` : ''}`;
    },
  }), []);
}

// Hook específico para Analytics
export function useAnalyticsEnv() {
  return useMemo(() => ({
    gaId: envClient.analytics.gaId,
    isEnabled: Boolean(envClient.analytics.gaId && envClient.analytics.gaId !== 'G-XXXXXXXXXX'),
  }), []);
}
