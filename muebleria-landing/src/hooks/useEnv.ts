/**
 * Hook personalizado para acceder a variables de ambiente en componentes React
 */

import { useMemo } from 'react';
import { env } from '@/lib/env';

export function useEnv() {
  return useMemo(() => ({
    // Configuración de Supabase (disponible en cliente y servidor)
    supabase: {
      url: env.supabase.url,
      anonKey: env.supabase.anonKey,
    },
    
    // Configuración de WhatsApp (disponible en cliente)
    whatsapp: {
      phone: env.whatsapp.phone,
    },
    
    // Configuración de Analytics (disponible en cliente)
    analytics: {
      gaId: env.analytics.gaId,
    },
    
    // Configuración de la aplicación
    app: {
      isDevelopment: env.app.isDevelopment,
      isProduction: env.app.isProduction,
    },
  }), []);
}

// Hook específico para Supabase
export function useSupabaseEnv() {
  return useMemo(() => ({
    url: env.supabase.url,
    anonKey: env.supabase.anonKey,
  }), []);
}

// Hook específico para WhatsApp
export function useWhatsAppEnv() {
  return useMemo(() => ({
    phone: env.whatsapp.phone,
    formatPhone: (phone: string) => phone.replace(/\D/g, ''),
    getWhatsAppUrl: (message: string = '') => {
      const formattedPhone = env.whatsapp.phone.replace(/\D/g, '');
      const encodedMessage = encodeURIComponent(message);
      return `https://wa.me/${formattedPhone}${message ? `?text=${encodedMessage}` : ''}`;
    },
  }), []);
}

// Hook específico para Analytics
export function useAnalyticsEnv() {
  return useMemo(() => ({
    gaId: env.analytics.gaId,
    isEnabled: Boolean(env.analytics.gaId && env.analytics.gaId !== 'G-XXXXXXXXXX'),
  }), []);
}
