// types/index.ts
export interface Product {
    id: string
    name: string
    description?: string
    short_description?: string
    price?: number
    discount_price?: number
    category_id?: string
    images: string[]
    specifications: Record<string, any>
    dimensions: {
      width?: number
      height?: number
      depth?: number
    }
    materials: string[]
    colors: string[]
    is_featured: boolean
    is_available: boolean
    stock_quantity: number
    created_at: string
    updated_at: string
    category?: Category
  }
  
  export interface Category {
    id: string
    name: string
    slug: string
    description?: string
    image_url?: string
    created_at: string
  }
  
  export interface ContactForm {
    name: string
    email: string
    phone: string
    message: string
    product_id?: string
  }
  
  export interface WhatsAppMessage {
    phone: string
    message: string
    product?: Product
  }