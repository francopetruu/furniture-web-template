// lib/whatsapp.ts
import type { Product } from '@/types'
import { env } from './env'

export interface WhatsAppConfig {
  phoneNumber: string
  defaultMessage?: string
}

// Obtener el número de teléfono desde las variables de ambiente
export function getWhatsAppPhone(): string {
  return env.whatsapp.phone.replace(/\D/g, '') // Remover caracteres no numéricos
}

export function generateWhatsAppURL(
  message: string, 
  product?: Product,
  customPhone?: string
): string {
  const phone = customPhone || getWhatsAppPhone()
  let finalMessage = message

  if (product) {
    finalMessage = `Hola! Me interesa el producto: *${product.name}*\n\n`
    
    if (product.price) {
      finalMessage += `Precio: $${product.price.toLocaleString('es-AR')}\n`
    }
    
    finalMessage += `\n${message || 'Me gustaría recibir más información.'}`
  }

  const encodedMessage = encodeURIComponent(finalMessage)
  return `https://wa.me/${phone}?text=${encodedMessage}`
}

export function openWhatsAppChat(message: string, product?: Product, customPhone?: string) {
  const url = generateWhatsAppURL(message, product, customPhone)
  window.open(url, '_blank')
}

// Función helper para validar si WhatsApp está configurado
export function isWhatsAppConfigured(): boolean {
  const phone = getWhatsAppPhone()
  return Boolean(phone && phone.length > 0)
}
