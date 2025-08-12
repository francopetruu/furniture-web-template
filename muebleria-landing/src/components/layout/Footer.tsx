import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-amber-600 mb-4">
              Mueblería Familiar
            </h3>
            <p className="text-gray-300 mb-4">
              Más de 20 años creando espacios únicos con muebles de calidad. 
              Especializados en living, dormitorio, cocina y oficina.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://wa.me/5491123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="text-gray-300 hover:text-white transition-colors">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-gray-300 hover:text-white transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-300 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center">
                <span className="mr-2">📞</span>
                +54 11 1234-5678
              </p>
              <p className="flex items-center">
                <span className="mr-2">📧</span>
                info@muebleriafamiliar.com
              </p>
              <p className="flex items-center">
                <span className="mr-2">📍</span>
                Buenos Aires, Argentina
              </p>
              <p className="flex items-center">
                <span className="mr-2">🕒</span>
                Lun-Vie: 9:00-18:00
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {currentYear} Mueblería Familiar. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}