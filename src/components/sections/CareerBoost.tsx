'use client'

import { useState, useEffect } from 'react'
import { AssessmentRadarChart } from '@/components/charts/AssessmentRadarChart'

// Local icons from Figma
const iconAccelerateCareer = "/assets/career-boost/accelerate-career.svg"
const iconCompanyPartners = "/assets/career-boost/company-partners.svg"
const iconAssessment = "/assets/career-boost/assessment.svg"
const iconOpportunities = "/assets/career-boost/opportunities.svg"
const iconCheck = "/assets/career-boost/check-icon.svg"
const iconAssessmentVector1 = "/assets/career-boost/assessment-vector-1.svg"
const iconAssessmentVector2 = "/assets/career-boost/assessment-vector-2.svg"
const iconChartGroup = "/assets/career-boost/chart-group.svg"
const iconNavLeft = "/assets/career-boost/navigation-arrow-left.svg"
const iconNavRight = "/assets/career-boost/navigation-arrow-right.svg"
const iconCtaVector1 = "/assets/career-boost/cta-vector-1.svg"
const iconCtaVector2 = "/assets/career-boost/cta-vector-2.svg"

interface BenefitCardProps {
  icon: string
  title: string
  description: string
}

function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-center rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] p-6 relative shrink-0">
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

function CompanyCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const companies = [
    'Wilson Sons',
    'Libra Group',
    'Stolt Tankers',
    'Petrobras',
    'CMA CGM',
    'Maersk Line',
    'Transpetro',
    'Norsul'
  ]

  const nextCompany = () => {
    setCurrentIndex((prev) => (prev + 1) % companies.length)
  }

  // Auto-play with optimized speed
  useEffect(() => {
    const interval = setInterval(nextCompany, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full max-w-[800px] mx-auto">
      {/* Mobile: Carousel with center card effects */}
      <div className="md:hidden">
        <div className="h-[70px] overflow-hidden relative">
          <div className="flex gap-4 transition-transform duration-700 ease-in-out items-center justify-center"
               style={{ transform: `translateX(-${currentIndex * 200}px)` }}>
            {/* Duplicate companies array to create seamless loop */}
            {[...companies, ...companies].map((company, index) => {
              const isCenterCard = Math.floor((index - currentIndex + companies.length * 2) % companies.length) === 1

              return (
                <div key={`${company}-${index}`} className="flex-shrink-0 w-[180px]">
                  <div className={`
                    bg-white rounded-[8px] p-4 h-[62px] flex items-center justify-center
                    transition-all duration-700 ease-in-out border border-gray-100
                    ${isCenterCard
                      ? 'shadow-[0px_6px_20px_-3px_rgba(76,183,224,0.25),0px_0px_0px_1px_rgba(76,183,224,0.1)] scale-105 border-blue-100'
                      : 'shadow-[0px_2px_8px_-2px_rgba(0,0,0,0.1)]'
                    }
                  `}>
                    <div className={`
                      font-['Segoe_UI:Semibold',_sans-serif] text-center leading-[20px]
                      ${isCenterCard
                        ? 'text-[#070e2c] text-[16px] font-bold'
                        : 'text-[#374151] text-[15px]'
                      }
                    `}>
                      {company}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Desktop: Enhanced carousel with center card effect */}
      <div className="hidden md:block">
        <div className="h-[90px] overflow-hidden relative">
          <div className="flex gap-6 transition-transform duration-700 ease-in-out items-center"
               style={{ transform: `translateX(-${currentIndex * 280}px)` }}>
            {/* Duplicate companies array to create seamless loop */}
            {[...companies, ...companies].map((company, index) => {
              const isCenterCard = Math.floor((index - currentIndex + companies.length * 2) % companies.length) === 1

              return (
                <div key={`${company}-${index}`} className="flex-shrink-0 w-[260px]">
                  <div className={`
                    bg-white rounded-[12px] p-6 h-[78px] flex items-center justify-center
                    transition-all duration-700 ease-in-out border border-gray-100
                    ${isCenterCard
                      ? 'shadow-[0px_8px_25px_-5px_rgba(76,183,224,0.3),0px_0px_0px_1px_rgba(76,183,224,0.1)] scale-105 border-blue-100'
                      : 'shadow-[0px_4px_15px_-3px_rgba(0,0,0,0.1)] hover:shadow-[0px_6px_20px_-3px_rgba(0,0,0,0.15)]'
                    }
                  `}>
                    <div className={`
                      font-['Segoe_UI:Semibold',_sans-serif] text-center leading-[24px]
                      ${isCenterCard
                        ? 'text-[#070e2c] text-[19px] font-bold'
                        : 'text-[#374151] text-[17px]'
                      }
                    `}>
                      {company}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export function CareerBoost() {
  const benefits = [
    {
      icon: iconAccelerateCareer,
      title: "Acelere sua Carreira",
      description: "Treinamentos especializados que posicionam\nvocê à frente no mercado marítimo e\nnaval."
    },
    {
      icon: iconCompanyPartners,
      title: "Empresas Parceiras",
      description: "Rede exclusiva de empresas do setor\nque valorizam nossos certificados."
    },
    {
      icon: iconAssessment,
      title: "Assessment Profissional",
      description: "Avaliação completa das suas\ncompetências para direcionamento\nde carreira."
    },
    {
      icon: iconOpportunities,
      title: "Oportunidades Exclusivas",
      description: "Em breve, parcerias para conectar\nvocê às melhores vagas do mercado."
    }
  ]

  return (
    <section className="bg-white py-16 md:py-20 lg:py-24 px-4 lg:px-[260px]">
      <div className="max-w-[1400px] mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="mb-6 md:mb-8">
            <h2 className="font-['Segoe_UI:Bold',_sans-serif] text-[#070e2c] text-[32px] md:text-[42px] lg:text-[52px] leading-[32px] md:leading-[42px] lg:leading-[52px] mb-2 md:mb-3">
              Impulsione sua
            </h2>
            <h2 className="font-['Segoe_UI:Bold',_sans-serif] text-[#4cb7e0] text-[32px] md:text-[42px] lg:text-[52px] leading-[32px] md:leading-[42px] lg:leading-[52px]">
              Carreira Marítima
            </h2>
          </div>
          <div className="max-w-[800px] mx-auto">
            <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-600 text-[18px] md:text-[20px] lg:text-[22px] leading-[28px] md:leading-[32px] lg:leading-[34px] text-center">
              Na Vision Marine, não apenas ensinamos - nós transformamos profissionais em líderes
              do setor naval e marítimo, conectando você às melhores oportunidades do mercado.
            </p>
          </div>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-20 lg:mb-24">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>

        {/* Assessment Section */}
        <div className="bg-gray-50 rounded-[16px] md:rounded-[20px] p-6 md:p-12 lg:p-16 mb-16 md:mb-20 lg:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center">

            {/* Left Content */}
            <div className="space-y-4 md:space-y-6 order-2 lg:order-1">
              <h3 className="font-['Segoe_UI:Bold',_sans-serif] text-[#070e2c] text-[24px] md:text-[28px] lg:text-[30px] leading-[28px] md:leading-[32px] lg:leading-[36px]">
                Assessment Profissional Personalizado
              </h3>

              <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-600 text-[16px] md:text-[17px] lg:text-[18px] leading-[26px] md:leading-[28px] lg:leading-[29.25px]">
                Receba uma avaliação completa das suas competências técnicas e
                comportamentais. Nosso Assessment identifica seus pontos fortes e áreas de
                desenvolvimento, criando um plano personalizado para sua evolução
                profissional.
              </p>

              {/* Assessment Features */}
              <div className="flex flex-wrap gap-x-3 md:gap-x-4 gap-y-3">
                <div className="flex items-center gap-2 md:gap-3 bg-[rgba(76,183,224,0.1)] rounded-full px-3 py-2 w-fit">
                  <img alt="" className="size-4" src={iconCheck} />
                  <span className="font-['Segoe_UI:Semibold',_sans-serif] text-[#070e2c] text-[13px] md:text-[14px] leading-[18px] md:leading-[20px]">
                    Competências Técnicas
                  </span>
                </div>

                <div className="flex items-center gap-2 md:gap-3 bg-[rgba(76,183,224,0.1)] rounded-full px-3 py-2 w-fit">
                  <img alt="" className="size-4" src={iconCheck} />
                  <span className="font-['Segoe_UI:Semibold',_sans-serif] text-[#070e2c] text-[13px] md:text-[14px] leading-[18px] md:leading-[20px]">
                    Perfil Comportamental
                  </span>
                </div>

                <div className="flex items-center gap-2 md:gap-3 bg-[rgba(76,183,224,0.1)] rounded-full px-3 py-2 w-fit">
                  <img alt="" className="size-4" src={iconCheck} />
                  <span className="font-['Segoe_UI:Semibold',_sans-serif] text-[#070e2c] text-[13px] md:text-[14px] leading-[18px] md:leading-[20px]">
                    Plano de Desenvolvimento
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <button className="bg-[#4cb7e0] hover:bg-[#3a9bc1] transition-colors rounded-[6px] px-6 md:px-8 py-3 flex items-center gap-2 w-full md:w-auto justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <div className="relative size-4">
                    <div className="absolute inset-[53.71%_29.17%_8.34%_29.18%]">
                      <img alt="" className="block max-w-none size-full" src={iconAssessmentVector1} />
                    </div>
                    <div className="absolute bottom-[41.67%] left-1/4 right-1/4 top-[8.33%]">
                      <img alt="" className="block max-w-none size-full" src={iconAssessmentVector2} />
                    </div>
                  </div>
                </div>
                <span className="font-['Segoe_UI:Semibold',_sans-serif] text-white text-[16px] md:text-[18px] leading-[24px] md:leading-[28px]">
                  Fazer meu Assessment
                </span>
              </button>
            </div>

            {/* Right Content - Chart */}
            <div className="relative order-1 lg:order-2">
              <div className="text-center mb-3 md:mb-4">
                <h4 className="font-['Segoe_UI:Semibold',_sans-serif] text-[#070e2c] text-[16px] md:text-[18px] leading-[24px] md:leading-[28px]">
                  Exemplo de Assessment
                </h4>
              </div>

              {/* Chart Container */}
              <div className="flex items-center justify-center mb-4 md:mb-6">
                <div className="relative w-[280px] md:w-[320px] lg:w-[360px] h-[280px] md:h-[320px] lg:h-[360px] border-2 border-[#4cb7e0] border-opacity-20 rounded-xl p-2 shadow-[0px_4px_20px_-2px_rgba(76,183,224,0.15)] flex items-center justify-center">
                  <div className="w-full h-full">
                    <AssessmentRadarChart />
                  </div>
                </div>
              </div>

              {/* Score Badge */}
              <div className="flex justify-center">
                <div className="bg-[#070e2c] text-white px-3 md:px-4 py-2 rounded-full">
                  <span className="font-['Segoe_UI:Semibold',_sans-serif] text-[13px] md:text-[14px] leading-[18px] md:leading-[20px]">
                    Pontuação Média: 82%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Companies Section */}
        <div className="text-center mb-16 md:mb-20">
          <div className="mb-4 md:mb-6">
            <h3 className="font-['Segoe_UI:Bold',_sans-serif] text-[#070e2c] text-[24px] md:text-[28px] lg:text-[32px] leading-[28px] md:leading-[32px] lg:leading-[40px] mb-3 md:mb-4">
              Empresas que Confiam na Vision Marine
            </h3>
            <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-600 text-[16px] md:text-[17px] lg:text-[18px] leading-[24px] md:leading-[26px] lg:leading-[28px] max-w-[600px] mx-auto px-4">
              Nossos alunos são reconhecidos e valorizados pelas principais empresas do setor marítimo
            </p>
          </div>

          <div className="mt-8 md:mt-12">
            <CompanyCarousel />
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-[#070e2c] to-[#0a1a4a] rounded-[12px] md:rounded-[16px] p-8 md:p-12 text-center">
          <div className="mb-4 md:mb-6">
            <h3 className="font-['Segoe_UI:Bold',_sans-serif] text-white text-[24px] md:text-[28px] lg:text-[30px] leading-[28px] md:leading-[32px] lg:leading-[36px]">
              Pronto para Decolar sua Carreira?
            </h3>
          </div>

          <div className="mb-6 md:mb-8 max-w-[672px] mx-auto px-4">
            <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-300 text-[16px] md:text-[18px] lg:text-[20px] leading-[26px] md:leading-[30px] lg:leading-[32.5px]">
              Junte-se aos profissionais que escolheram a Vision Marine para transformar
              suas carreiras e alcançar novos patamares no setor marítimo.
            </p>
          </div>

          <button className="bg-[#4cb7e0] hover:bg-[#3a9bc1] transition-colors rounded-[6px] px-6 md:px-8 py-3 flex items-center gap-2 mx-auto w-full md:w-auto justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 8H14M14 8L10 4M14 8L10 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-['Segoe_UI:Semibold',_sans-serif] text-white text-[16px] md:text-[18px] leading-[24px] md:leading-[28px]">
              Começar Agora
            </span>
          </button>
        </div>

      </div>
    </section>
  )
}