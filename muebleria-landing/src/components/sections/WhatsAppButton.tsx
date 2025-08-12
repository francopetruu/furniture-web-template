// Componente WhatsApp Button
// components/sections/WhatsAppButton.tsx
'use client'

import { useState } from 'react'
import { PhoneIcon } from '@heroicons/react/24/solid'
import { openWhatsAppChat } from '@/lib/whatsapp'
import type { Product } from '@/types'

interface WhatsAppButtonProps {
  product?: Product
  message?: string
  className?: string
}

export function WhatsAppButton({ 
  product, 
  message = "Hola! Me gustaría recibir más información.", 
  className = "" 
}: WhatsAppButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    setIsLoading(true)
    openWhatsAppChat(message, product)
    // Reset loading state after a brief moment
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`
        inline-flex items-center gap-2 px-6 py-3 
        bg-green-500 hover:bg-green-600 
        text-white font-medium rounded-lg
        transition-colors duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      <PhoneIcon className="w-5 h-5" />
      {isLoading ? 'Abriendo WhatsApp...' : 'Consultar por WhatsApp'}
    </button>
  )
}