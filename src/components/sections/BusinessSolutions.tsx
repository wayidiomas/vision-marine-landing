'use client'

// Assets from Figma
const imgEquipeEmTreinamentoCorporativo = "http://localhost:3845/assets/dc4adee40a11709e616dd96804bcc90d81cd1c89.png"
const imgSvg = "http://localhost:3845/assets/55ab9f1d9096d62684e713414181510df0a903ee.svg"
const imgSvg1 = "http://localhost:3845/assets/620d654561bd4cb5bcc129d8f21ae5d8112c718b.svg"
const imgSvg2 = "http://localhost:3845/assets/2f094ba6f82679ff7b99739bda20157712620294.svg"
const imgSvg3 = "http://localhost:3845/assets/383cbf89aab1b130e8cb501022886c0b384a83ed.svg"
const imgVector = "http://localhost:3845/assets/5ade6605a0f5819c6cc1f7c1ba8b0cf2cd9f68d2.svg"
const imgVector1 = "http://localhost:3845/assets/bf55094dc985d65ad569e2228e69066e6bd6fef4.svg"
const imgVector2 = "http://localhost:3845/assets/b19d14a6b160e2b6bff106c88829c249195e66df.svg"

interface ServiceCardProps {
  icon: string
  title: string
  description: string
}

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-center rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-6 relative shrink-0 border border-gray-200">
      {/* Icon */}
      <div className="mb-4">
        <div className="relative size-[32px]">
          <img alt="" className="block max-w-none size-full" src={icon} />
        </div>
      </div>

      {/* Title */}
      <div className="mb-4">
        <h3 className="font-['Segoe_UI:Semibold',_sans-serif] text-[#070e2c] text-[18px] md:text-[20px] text-center tracking-[-0.5px] leading-[26px] md:leading-[28px]">
          {title}
        </h3>
      </div>

      {/* Description */}
      <div className="text-center">
        <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-600 text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] whitespace-pre-line">
          {description}
        </p>
      </div>
    </div>
  )
}

interface StatCardProps {
  number: string
  label: string
}

function StatCard({ number, label }: StatCardProps) {
  return (
    <div className="bg-white box-border content-stretch flex flex-col gap-2 items-center p-6 rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] relative shrink-0">
      <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
        <div className="font-['Segoe_UI:Bold',_sans-serif] text-[#4cb7e0] text-[24px] md:text-[30px] text-center leading-[30px] md:leading-[36px]" style={{ textShadow: '0 2px 8px rgba(76, 183, 224, 0.3)' }}>
          {number}
        </div>
      </div>
      <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
        <div className="font-['Segoe_UI:Regular',_sans-serif] text-gray-600 text-[14px] md:text-[16px] text-center leading-[20px] md:leading-[24px]">
          {label}
        </div>
      </div>
    </div>
  )
}

export function BusinessSolutions() {
  const services = [
    {
      icon: imgSvg,
      title: "Treinamento In-Company",
      description: "Treinamentos customizados para sua\nempresa, adaptados às suas\nnecessidades específicas e realizados\nem suas instalações."
    },
    {
      icon: imgSvg1,
      title: "Capacitação de Equipes",
      description: "Programas completos de\ndesenvolvimento para equipes\ntécnicas, com certificações\nreconhecidas pelo mercado."
    },
    {
      icon: imgSvg2,
      title: "Certificações Corporativas",
      description: "Processos de certificação em lote\npara colaboradores, com\nacompanhamento personalizado e\nrelatórios detalhados."
    },
    {
      icon: imgSvg3,
      title: "Consultoria Especializada",
      description: "Assessoria técnica para projetos\nespecíficos, com profissionais\nexperientes do setor naval e\nmarítimo."
    }
  ]

  const stats = [
    { number: "50+", label: "Empresas Atendidas" },
    { number: "2.000+", label: "Profissionais Capacitados" },
    { number: "98%", label: "Satisfação Corporativa" }
  ]

  return (
    <section className="bg-gray-50 py-16 md:py-20 lg:py-24 px-4 lg:px-[260px]">
      <div className="max-w-[1400px] mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="mb-6 md:mb-8">
            <h2 className="font-['Segoe_UI:Bold',_sans-serif] text-[#070e2c] text-[32px] md:text-[42px] lg:text-[48px] leading-[32px] md:leading-[42px] lg:leading-[48px] mb-2 md:mb-3">
              Soluções para
            </h2>
            <h2 className="font-['Segoe_UI:Bold',_sans-serif] text-[#4cb7e0] text-[32px] md:text-[42px] lg:text-[48px] leading-[32px] md:leading-[42px] lg:leading-[48px]">
              Empresas
            </h2>
          </div>
          <div className="max-w-[768px] mx-auto">
            <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-600 text-[16px] md:text-[18px] lg:text-[20px] leading-[26px] md:leading-[30px] lg:leading-[32.5px] text-center">
              Desenvolvemos pacotes de treinamento customizados para empresas que precisam
              capacitar suas equipes com excelência no setor naval e marítimo.
            </p>
          </div>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-20 lg:mb-24">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-[#070e2c] to-[#0a1a4a] rounded-[12px] md:rounded-[16px] p-6 md:p-12 lg:p-16 mb-16 md:mb-20 lg:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Left Content */}
            <div className="space-y-4 md:space-y-6 order-2 lg:order-1">
              <h3 className="font-['Segoe_UI:Bold',_sans-serif] text-white text-[24px] md:text-[28px] lg:text-[30px] leading-[28px] md:leading-[32px] lg:leading-[36px]">
                Pronto para Capacitar sua Equipe?
              </h3>

              <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-300 text-[16px] md:text-[18px] lg:text-[20px] leading-[26px] md:leading-[30px] lg:leading-[32.5px]">
                Fale com nossos especialistas e descubra como podemos desenvolver
                um programa de treinamento sob medida para sua empresa.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button className="bg-[#4cb7e0] hover:bg-[#3a9bc1] transition-colors rounded-[6px] px-6 md:px-8 py-3 flex items-center gap-2 justify-center w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <div className="relative size-4">
                      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2">
                        <img alt="" className="block max-w-none size-full" src={imgVector} />
                      </div>
                      <div className="absolute bottom-[20.83%] left-1/2 right-[20.83%] top-[20.83%]">
                        <img alt="" className="block max-w-none size-full" src={imgVector1} />
                      </div>
                    </div>
                  </div>
                  <span className="font-['Segoe_UI:Semibold',_sans-serif] text-white text-[16px] md:text-[18px] leading-[24px] md:leading-[28px]">
                    Ver Soluções Completas
                  </span>
                </button>

                <button className="border border-white hover:bg-white transition-colors rounded-[6px] px-6 md:px-8 py-3 flex items-center gap-2 justify-center w-full sm:w-auto group">
                  <div className="flex items-center gap-2">
                    <div className="relative size-4">
                      <div className="absolute inset-[8.33%_8.33%_8.63%_8.8%]">
                        <img alt="" className="block max-w-none size-full" src={imgVector2} />
                      </div>
                    </div>
                  </div>
                  <span className="font-['Segoe_UI:Semibold',_sans-serif] text-white group-hover:text-[#070e2c] transition-colors text-[16px] md:text-[18px] leading-[24px] md:leading-[28px]">
                    Falar com Especialista
                  </span>
                </button>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="relative order-1 lg:order-2">
              <div className="flex items-center justify-center">
                <div className="relative max-w-[448px] w-full h-[250px] md:h-[299px] rounded-[8px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] overflow-hidden">
                  <img
                    alt="Equipe em treinamento corporativo"
                    className="absolute left-0 max-w-none size-full top-0 object-cover"
                    src={imgEquipeEmTreinamentoCorporativo}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              number={stat.number}
              label={stat.label}
            />
          ))}
        </div>

      </div>
    </section>
  )
}