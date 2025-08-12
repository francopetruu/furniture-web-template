import { ContactForm } from '@/components/forms/ContactForm'

export const metadata = {
  title: 'Contacto - Mueblería Familiar',
  description: 'Ponte en contacto con nosotros. Estamos aquí para ayudarte a encontrar el mueble perfecto para tu hogar.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contactanos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Estamos aquí para ayudarte a encontrar el mueble perfecto. 
            Déjanos tus datos y nos comunicaremos contigo a la brevedad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Envíanos un mensaje
            </h2>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Business Info */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Información de contacto
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-amber-600 text-white">
                      📞
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-900">Teléfono</p>
                    <p className="text-gray-600">+54 11 1234-5678</p>
                    <p className="text-sm text-gray-500">Lunes a Viernes: 9:00 - 18:00</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-amber-600 text-white">
                      📧
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">info@muebleriafamiliar.com</p>
                    <p className="text-sm text-gray-500">Respuesta en 24 horas</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-amber-600 text-white">
                      📍
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-900">Ubicación</p>
                    <p className="text-gray-600">Buenos Aires, Argentina</p>
                    <p className="text-sm text-gray-500">Showroom con cita previa</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-md bg-green-500 text-white">
                      💬
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-medium text-gray-900">WhatsApp</p>
                    <a
                      href="https://wa.me/5491123456789"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      +54 11 1234-5678
                    </a>
                    <p className="text-sm text-gray-500">Respuesta inmediata</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Preguntas frecuentes
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">¿Hacen entregas?</h3>
                  <p className="text-gray-600">Sí, realizamos entregas en CABA y GBA. El costo varía según la zona.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">¿Tienen financiación?</h3>
                  <p className="text-gray-600">Ofrecemos diferentes planes de financiación. Consultanos por las opciones disponibles.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">¿Hacen muebles a medida?</h3>
                  <p className="text-gray-600">Sí, trabajamos con diseños personalizados adaptados a tu espacio y necesidades.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">¿Cuál es el tiempo de entrega?</h3>
                  <p className="text-gray-600">Para muebles en stock: 7-10 días. Para muebles a medida: 3-4 semanas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}