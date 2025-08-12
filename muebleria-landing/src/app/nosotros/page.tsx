import Image from 'next/image'
import { env } from '@/lib/env'

export const metadata = {
  title: 'Nosotros - Muebleria Familiar',
  description: 'Conoce la historia de Muebleria Familiar. Mas de 20 anos creando muebles de calidad con pasion y dedicacion.',
}

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nuestra Historia
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Mas de 20 anos creando muebles que transforman hogares con calidad, diseno y dedicacion.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Una tradicion familiar
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Muebleria Familiar nacio en el ano 2003 con una vision clara: crear muebles de calidad 
                que no solo sean funcionales, sino que tambien aporten belleza y calidez a cada hogar.
              </p>
              <p>
                Lo que comenzo como un pequeno taller familiar ha crecido hasta convertirse en una 
                empresa reconocida por su compromiso con la excelencia, la innovacion en diseno y 
                el servicio personalizado.
              </p>
              <p>
                Cada mueble que creamos lleva consigo la pasion y el cuidado de tres generaciones 
                de artesanos, combinando tecnicas tradicionales con tecnologia moderna para 
                garantizar la maxima calidad.
              </p>
            </div>
          </div>
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80"
              alt="Taller de muebleria"
              width={600}
              height={384}
              className="rounded-lg shadow-lg w-full h-96 object-cover"
            />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Nuestros Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Calidad</h3>
              <p className="text-gray-600">
                Utilizamos unicamente materiales de primera calidad y aplicamos 
                rigurosos controles en cada etapa del proceso.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Diseno</h3>
              <p className="text-gray-600">
                Combinamos funcionalidad y estetica para crear muebles que se 
                adapten perfectamente a tu estilo de vida.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Servicio</h3>
              <p className="text-gray-600">
                Ofrecemos atencion personalizada desde el diseno hasta la entrega 
                e instalacion en tu hogar.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Nuestro Equipo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&q=80&fit=crop&crop=face"
                alt="Director"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Carlos Rodriguez
              </h3>
              <p className="text-amber-600 font-medium mb-2">Director General</p>
              <p className="text-gray-600 text-sm">
                Fundador y alma de la empresa. Mas de 25 anos de experiencia en el sector.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <Image
                src="https://images.unsplash.com/photo-1494790108755-2616b332c738?w=150&h=150&q=80&fit=crop&crop=face"
                alt="Diseñadora"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ana Garcia
              </h3>
              <p className="text-amber-600 font-medium mb-2">Directora de Diseno</p>
              <p className="text-gray-600 text-sm">
                Especialista en diseno de interiores con vision innovadora y practica.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&q=80&fit=crop&crop=face"
                alt="Maestro carpintero"
                width={96}
                height={96}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Miguel Torres
              </h3>
              <p className="text-amber-600 font-medium mb-2">Maestro Carpintero</p>
              <p className="text-gray-600 text-sm">
                Artesano con tecnicas tradicionales y conocimiento de materiales nobles.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Listo para crear tu espacio ideal?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Contactanos y descubre como podemos ayudarte a transformar tu hogar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contacto"
              className="bg-white text-amber-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contactanos
            </a>
            <a
              href={`https://wa.me/${env.whatsapp.phone}?text=${encodeURIComponent('Hola! Me gustaria conocer mas sobre Muebleria Familiar.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}