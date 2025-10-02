'use client'

// Assets from Figma
const iconQualidade = "http://localhost:3845/assets/1d6f58639b6f04a6cf5c40eb40e1a13a6eca6406.svg"
const iconExperiencia = "http://localhost:3845/assets/ae7e987f5e308c7e130d27c49a62678081324bae.svg"
const iconComunidade = "http://localhost:3845/assets/c89d91769d846257e3c8b94dcc3ce970d9ab7f80.svg"
const iconInovacao = "http://localhost:3845/assets/799494d827f127f86c5e57007d86aea469da3089.svg"

export function AboutValuesSection() {
  const values = [
    {
      id: 1,
      icon: iconQualidade,
      title: "Qualidade e Excelência",
      description: "Comprometidos em oferecer treinamentos de alta qualidade com certificações reconhecidas."
    },
    {
      id: 2,
      icon: iconExperiencia,
      title: "Experiência Comprovada",
      description: "Mais de 10 anos formando profissionais qualificados para o mercado marítimo."
    },
    {
      id: 3,
      icon: iconComunidade,
      title: "Comunidade Forte",
      description: "Uma rede de mais de 500 profissionais conectados e em constante crescimento."
    },
    {
      id: 4,
      icon: iconInovacao,
      title: "Inovação Constante",
      description: "Sempre atualizados com as últimas tecnologias e metodologias do setor."
    }
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-[260px] bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#4cb7e0] blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-[#3a9bc1] blur-3xl"></div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-['Segoe_UI:Bold',_sans-serif] text-[#070e2c] text-[28px] sm:text-[32px] lg:text-[36px] leading-[32px] sm:leading-[36px] lg:leading-[40px] font-bold mb-4">
            Nossos Valores
          </h2>
          <div className="max-w-[672px] mx-auto">
            <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-600 text-base sm:text-lg leading-[24px] sm:leading-[28px] text-center">
              Os princípios que nos guiam na missão de formar profissionais de excelência para o setor marítimo.
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {values.map((value, index) => (
            <div
              key={value.id}
              className="group bg-white rounded-lg border border-slate-200 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-6 hover:shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-[rgba(76,183,224,0.1)] rounded-full flex items-center justify-center group-hover:bg-[rgba(76,183,224,0.15)] transition-colors duration-300">
                  <img
                    src={value.icon}
                    alt=""
                    className="w-8 h-8"
                  />
                </div>
              </div>

              {/* Title */}
              <div className="text-center mb-4">
                <h3 className="font-['Segoe_UI:Semibold',_sans-serif] text-[#020817] text-lg leading-[28px] tracking-[-0.45px]">
                  {value.title}
                </h3>
              </div>

              {/* Description */}
              <div className="text-center">
                <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-600 text-sm sm:text-base leading-[20px] sm:leading-[24px]">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}