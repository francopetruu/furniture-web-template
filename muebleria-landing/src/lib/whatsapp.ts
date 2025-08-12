// lib/whatsapp.ts
import type { Product } from '@/types'

export interface WhatsAppConfig {
  phoneNumber: string
  defaultMessage?: string
}

export function generateWhatsAppURL(
  phone: string, 
  message: string, 
  product?: Product
): string {
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

export function openWhatsAppChat(phone: string, message: string, product?: Product) {
  const url = generateWhatsAppURL(phone, message, product)
  window.open(url, '_blank')
}
