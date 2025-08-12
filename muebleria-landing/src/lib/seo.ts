// lib/seo.ts
import type { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
}

export function generateSEO({
  title = 'Mueblería Familiar',
  description = 'Especializados en muebles de living, dormitorio, cocina y oficina. Calidad, diseño y precios accesibles.',
  keywords = 'muebles, sofás, sillas, mesas, dormitorio, cocina, oficina, Argentina',
  image = '/images/og-image.jpg',
  url = 'https://muebleria-familiar.vercel.app'
}: SEOProps): Metadata {
  return {
    title,
    description,
    keywords,
    authors: [{ name: 'Mueblería Familiar' }],
    creator: 'Mueblería Familiar',
    publisher: 'Mueblería Familiar',
    
    openGraph: {
      type: 'website',
      locale: 'es_AR',
      url,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      siteName: 'Mueblería Familiar',
    },
    
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    alternates: {
      canonical: url,
    },
  }
}

// Structured Data para productos
export function generateProductJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images[0],
    brand: {
      '@type': 'Brand',
      name: 'Mueblería Familiar'
    },
    offers: product.price ? {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'ARS',
      availability: product.is_available 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock'
    } : undefined
  }
}