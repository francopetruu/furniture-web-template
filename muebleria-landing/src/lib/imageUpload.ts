// lib/imageUpload.ts
import { supabase } from './supabase'

export async function uploadProductImage(file: File, productId: string): Promise<string | null> {
  try {
    // Generar nombre único para la imagen
    const fileExt = file.name.split('.').pop()
    const fileName = `${productId}-${Date.now()}.${fileExt}`
    
    // Subir imagen a Supabase Storage
    const { error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file)

    if (error) {
      console.error('Error uploading image:', error)
      return null
    }

    // Obtener URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName)

    return publicUrl
  } catch (error) {
    console.error('Error in uploadProductImage:', error)
    return null
  }
}

export function getOptimizedImageUrl(url: string, options: {
  width?: number
  height?: number
  quality?: number
} = {}) {
  const { width = 400, height = 400, quality = 80 } = options
  
  if (url.includes('supabase')) {
    return `${url}?width=${width}&height=${height}&resize=cover&quality=${quality}`
  }
  
  return url
}