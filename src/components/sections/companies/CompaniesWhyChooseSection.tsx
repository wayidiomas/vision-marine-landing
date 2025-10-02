'use client'

// Assets from Figma
const customTrainingIcon = "http://localhost:3845/assets/543f62422d49fcf64113bbf61bb494bb197f7a7f.svg"
const largeScaleIcon = "http://localhost:3845/assets/c89d91769d846257e3c8b94dcc3ce970d9ab7f80.svg"
const certificationIcon = "http://localhost:3845/assets/ae7e987f5e308c7e130d27c49a62678081324bae.svg"
const roiIcon = "http://localhost:3845/assets/383cbf89aab1b130e8cb501022886c0b384a83ed.svg"
const assessmentIcon = "http://localhost:3845/assets/2c0f14fd6d435b16cd5f12838166e112f8d49d28.svg"
const reportsIcon = "http://localhost:3845/assets/89bbf97087f236a0511cf8ffd3e8d0fa8917aadd.svg"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 text-center">
      {/* Icon Container */}
      <div className="flex justify-center mb-4">
        <div className="w-8 h-8">
          <img alt="" className="w-full h-full" src={icon} />
        </div>
      </div>

      {/* Title */}
      <h3 className="font-['Segoe_UI:Semibold',_sans-serif] text-[#070e2c] text-xl leading-7 tracking-[-0.5px] mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-600 text-base leading-[26px]">
        {description}
      </p>
    </div>
  )
}

export function CompaniesWhyChooseSection() {
  const features = [
    {
      icon: customTrainingIcon,
      title: "Treinamento Customizado",
      description: "Programas de capacitação desenvolvidos especificamente para as necessidades da sua empresa e setor de atuação."
    },
    {
      icon: largeScaleIcon,
      title: "Capacitação em Larga Escala",
      description: "Treine equipes inteiras com nossa plataforma escalável e acompanhamento personalizado de progresso."
    },
    {
      icon: certificationIcon,
      title: "Certificações Reconhecidas",
      description: "Certificados com validade internacional, reconhecidos pelos principais órgãos reguladores do setor naval."
    },
    {
      icon: roiIcon,
      title: "ROI Comprovado",
      description: "Aumento mensurável na produtividade e redução de custos operacionais através da capacitação adequada."
    },
    {
      icon: assessmentIcon,
      title: "Assessment Profissional",
      description: "Avaliação completa das competências técnicas com relatórios detalhados e planos de desenvolvimento."
    },
    {
      icon: reportsIcon,
      title: "Relatórios Detalhados",
      description: "Acompanhe o progresso da sua equipe com relatórios completos de desempenho e evolução."
    }
  ]

  return (
    <section className="bg-gray-50 py-16 md:py-20 lg:py-24 px-4 lg:px-[260px]">
      <div className="max-w-[1400px] mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-['Segoe_UI:Bold',_sans-serif] text-[#070e2c] text-[28px] md:text-[32px] lg:text-[36px] leading-[32px] md:leading-[36px] lg:leading-[40px] mb-4">
            Por que Escolher a Vision Marine?
          </h2>

          <div className="max-w-[768px] mx-auto">
            <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-600 text-lg md:text-xl leading-7 md:leading-[28px]">
              Oferecemos soluções completas de capacitação profissional com metodologia comprovada e resultados mensuráveis
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

      </div>
    </section>
  )
}