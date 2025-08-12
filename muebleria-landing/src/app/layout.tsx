// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFloat } from '@/components/sections/WhatsAppFloat'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mueblería Familiar - Muebles de Calidad',
  description: 'Especializados en muebles de living, dormitorio, cocina y oficina. Calidad, diseño y precios accesibles.',
  keywords: 'muebles, sofás, sillas, mesas, dormitorio, cocina, oficina, Argentina',
  openGraph: {
    title: 'Mueblería Familiar - Muebles de Calidad',
    description: 'Especializados en muebles de living, dormitorio, cocina y oficina.',
    images: ['/images/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <WhatsAppFloat />
        </div>
      </body>
    </html>
  )
}