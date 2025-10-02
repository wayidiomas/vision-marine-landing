'use client'

// Assets from Figma
const imgSalaDeAulaModerna = "http://localhost:3845/assets/04ed5fa7def09453699ee8b4ad66c64c86e35ce2.png"
const imgLaboratorioDeSimulacao = "http://localhost:3845/assets/a23604c60f9e6270453ebb75e8f5b6d343e1a59f.png"
const imgCentroDeEstudos = "http://localhost:3845/assets/5406bb3ddeff5c339fa60bed9e15e299c4cab9fc.png"

export function AboutFacilitiesSection() {
  const facilities = [
    {
      id: 1,
      title: "Salas de Aula Modernas",
      description: "Tecnologia de ponta para o melhor aprendizado",
      image: imgSalaDeAulaModerna
    },
    {
      id: 2,
      title: "Laboratório de Simulação",
      description: "Simuladores navais para prática realística",
      image: imgLaboratorioDeSimulacao
    },
    {
      id: 3,
      title: "Centro de Estudos",
      description: "Ambiente ideal para estudos e pesquisas",
      image: imgCentroDeEstudos
    }
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-[260px] bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          {/* Section Badge - Mobile on top, hidden on desktop */}
          <div className="inline-flex items-center gap-3 bg-[#4cb7e0]/10 text-[#4cb7e0] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-6 lg:hidden">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span>Infraestrutura Completa para Sua Formação</span>
          </div>

          <h2 className="font-['Segoe_UI:Bold',_sans-serif] text-[#070e2c] text-[28px] sm:text-[32px] lg:text-[36px] leading-[32px] sm:leading-[36px] lg:leading-[40px] font-bold mb-4">
            Nossa Estrutura
          </h2>
          <div className="max-w-[672px] mx-auto">
            <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-600 text-base sm:text-lg leading-[24px] sm:leading-[28px] text-center">
              Conheça as instalações e o ambiente onde formamos os melhores profissionais marítimos.
            </p>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {facilities.map((facility, index) => (
            <div
              key={facility.id}
              className="group relative bg-white rounded-2xl shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] overflow-hidden hover:shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_10px_10px_-5px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${facility.image})`,
                  }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <h3 className="font-['Segoe_UI:Semibold',_sans-serif] text-white text-lg sm:text-xl leading-[24px] sm:leading-[28px] mb-2">
                    {facility.title}
                  </h3>
                  <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-200 text-sm sm:text-base leading-[18px] sm:leading-[20px]">
                    {facility.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-[#4cb7e0]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA - Desktop only */}
        <div className="text-center mt-12 sm:mt-16 hidden lg:block">
          <div className="inline-flex items-center gap-3 bg-[#4cb7e0]/10 text-[#4cb7e0] px-6 py-3 rounded-full">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="font-['Segoe_UI:Semibold',_sans-serif] text-sm sm:text-base">
              Infraestrutura Completa para Sua Formação
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}