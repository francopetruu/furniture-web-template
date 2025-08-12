// components/ui/OptimizedImage.tsx
'use client'

import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
}

export function OptimizedImage({
  src,
  alt,
  width = 400,
  height = 400,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const getSupabaseImageUrl = (url: string, width: number, height: number) => {
    if (url.includes('supabase')) {
      return `${url}?width=${width}&height=${height}&resize=cover&quality=80`
    }
    return url
  }

  if (hasError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-400 text-sm">Imagen no disponible</span>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={getSupabaseImageUrl(src, width, height)}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        className={`
          object-cover transition-opacity duration-300
          ${isLoading ? 'opacity-0' : 'opacity-100'}
        `}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true)
          setIsLoading(false)
        }}
      />
      
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  )
}