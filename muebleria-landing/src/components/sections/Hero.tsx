// components/sections/Hero.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { WhatsAppButton } from './WhatsAppButton'

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-amber-50 to-orange-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
              >
                <span className="block xl:inline">Muebles que</span>{' '}
                <span className="block text-amber-600 xl:inline">transforman hogares</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
              >
                Especializados en muebles de living, dormitorio, cocina y oficina. 
                Más de 20 años creando espacios únicos con calidad, diseño y precios accesibles.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"
              >
                <div className="rounded-md shadow">
                  <Link
                    href="/catalogo"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 md:py-4 md:text-lg md:px-10 transition-colors"
                  >
                    Ver Catálogo
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <WhatsAppButton 
                    message="¡Hola! Me gustaría conocer más sobre sus muebles."
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-amber-700 bg-amber-100 hover:bg-amber-200 md:py-4 md:text-lg md:px-10"
                  />
                </div>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
      
      {/* Hero Image */}
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <OptimizedImage
          src="/images/hero-furniture.jpg"
          alt="Sala de estar con muebles elegantes"
          width={800}
          height={600}
          priority
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
        />
      </div>
    </section>
  )
}