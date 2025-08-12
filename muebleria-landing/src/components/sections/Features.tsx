export function Features() {
    const features = [
      {
        icon: "🏆",
        title: "Calidad Premium",
        description: "Materiales de primera calidad y acabados perfectos en cada mueble."
      },
      {
        icon: "🎨",
        title: "Diseño Personalizado",
        description: "Adaptamos cada mueble a tu espacio y estilo personal."
      },
      {
        icon: "🚚",
        title: "Entrega e Instalación",
        description: "Servicio completo de entrega e instalación en tu hogar."
      },
      {
        icon: "💰",
        title: "Precios Accesibles",
        description: "La mejor relación calidad-precio del mercado argentino."
      },
      {
        icon: "🛠️",
        title: "Garantía Extendida",
        description: "2 años de garantía en todos nuestros muebles."
      },
      {
        icon: "📞",
        title: "Atención Personalizada",
        description: "Asesoramiento experto para encontrar el mueble perfecto."
      }
    ]
  
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Más de 20 años de experiencia nos respaldan. Conoce las ventajas de trabajar con nosotros.
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }