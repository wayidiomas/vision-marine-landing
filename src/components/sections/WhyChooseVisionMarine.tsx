'use client'

// Assets from Figma
const imgTreinamentoNaval = "http://localhost:3845/assets/dc4adee40a11709e616dd96804bcc90d81cd1c89.png"
const imgSvg = "http://localhost:3845/assets/90c3062d3b6c3fd51741d8dcca749adcbaa1ae4a.svg"
const imgSvg1 = "http://localhost:3845/assets/99d011682e0511fb81a660ad2140a71496b4591e.svg"
const imgSvg2 = "http://localhost:3845/assets/5915d9f2f8b925ca4f49d431c83e043ed554dd40.svg"
const imgSvg3 = "http://localhost:3845/assets/3f47c8d5c630d6dc54572e89be3e89b15a9ea31d.svg"

interface FeatureItemProps {
  icon: string
  title: string
  description: string
}

function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="bg-[rgba(76,183,224,0.1)] flex items-center justify-center rounded-[8px] shrink-0 size-[48px]">
        <div className="relative shrink-0 size-[24px]">
          <img alt="" className="block max-w-none size-full" src={icon} />
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="font-['Segoe_UI:Semibold',_sans-serif] text-[#070e2c] text-[14px] md:text-[16px] leading-[20px] md:leading-[24px]">
          {title}
        </h3>
        <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-600 text-[12px] md:text-[14px] leading-[18px] md:leading-[20px] whitespace-pre-line">
          {description}
        </p>
      </div>
    </div>
  )
}

export function WhyChooseVisionMarine() {
  const features = [
    {
      icon: imgSvg,
      title: "Certificação Reconhecida",
      description: "Todos os nossos Treinamentos oferecem\ncertificados reconhecidos pela Marinha\ndo Brasil e órgãos internacionais."
    },
    {
      icon: imgSvg1,
      title: "Instrutores Experientes",
      description: "Aprenda com profissionais ativos no\nmercado marítimo com décadas de\nexperiência prática."
    },
    {
      icon: imgSvg2,
      title: "Comunidade Ativa",
      description: "Faça parte de uma comunidade de mais\nde 500 profissionais e estudantes da\nárea naval."
    },
    {
      icon: imgSvg3,
      title: "Metodologia Prática",
      description: "Treinamentos desenvolvidos com foco na\naplicação prática e situações reais da\nnavegação."
    }
  ]

  return (
    <section className="bg-white py-16 md:py-20 lg:py-24 px-4 lg:px-[276px]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left Content */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="space-y-4">
              <h2 className="font-['Segoe_UI:Bold',_sans-serif] text-[#070e2c] text-[28px] md:text-[32px] lg:text-[36px] leading-[32px] md:leading-[36px] lg:leading-[40px]">
                Por que Escolher a Vision Marine?
              </h2>

              <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-600 text-[16px] md:text-[17px] lg:text-[18px] leading-[26px] md:leading-[28px] lg:leading-[29.25px]">
                Somos a principal plataforma de educação marítima e naval do Brasil, oferecendo
                Treinamentos de alta qualidade para formar os profissionais do futuro.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-4">
              {features.map((feature, index) => (
                <FeatureItem
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>

          {/* Right Content - Image with floating badges */}
          <div className="relative order-1 lg:order-2">
            <div className="flex items-center justify-center">
              <div className="relative max-w-[600px] w-full h-[300px] md:h-[350px] lg:h-[400px] rounded-[12px] md:rounded-[16px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden">
                <img
                  alt="Treinamento Naval"
                  className="absolute left-0 max-w-none size-full top-0 object-cover"
                  src={imgTreinamentoNaval}
                />
              </div>
            </div>

            {/* Floating Badge - Anos de Experiência */}
            <div className="absolute -bottom-8 md:-bottom-11 -left-4 md:-left-6 bg-[#4cb7e0] rounded-[12px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] p-4 md:p-6 z-10">
              <div className="text-center">
                <div className="font-['Segoe_UI:Bold',_sans-serif] text-white text-[24px] md:text-[30px] leading-[30px] md:leading-[36px]">
                  10+
                </div>
                <div className="font-['Segoe_UI:Regular',_sans-serif] text-white text-[12px] md:text-[14px] leading-[16px] md:leading-[20px]">
                  Anos de Experiência
                </div>
              </div>
            </div>

            {/* Floating Badge - Treinamentos Online */}
            <div className="absolute -top-4 md:-top-6 -right-6 md:-right-10 bg-[#070e2c] rounded-[12px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] p-4 md:p-6 z-10">
              <div className="text-center">
                <div className="font-['Segoe_UI:Bold',_sans-serif] text-white text-[16px] md:text-[18px] lg:text-[20px] leading-[20px] md:leading-[24px] lg:leading-[26px] whitespace-nowrap">
                  Treinamentos
                </div>
                <div className="font-['Segoe_UI:Regular',_sans-serif] text-white text-[12px] md:text-[14px] leading-[16px] md:leading-[20px]">
                  Online
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}