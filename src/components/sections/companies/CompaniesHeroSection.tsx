'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/contexts/language-context'

// Assets from Figma
const phoneIcon = "/assets/figma/companies/phone-icon.svg"
const documentIcon1 = "/assets/figma/companies/document-icon-1.svg"
const documentIcon2 = "/assets/figma/companies/document-icon-2.svg"

export function CompaniesHeroSection() {
  const { t } = useLanguage()

  return (
    <section
      className="relative px-4 lg:px-8 xl:px-16 2xl:px-24 py-20 lg:py-24 bg-[#070e2c]"
      data-name="Companies Hero Section"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234cb7e0' fill-opacity='0.4'%3E%3Cpath d='M0 30c10-10 20-10 30 0s20 10 30 0v30H0V30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-10 top-20 w-32 h-32 rounded-full border border-[#4cb7e0] hidden lg:block"></div>
        <div className="absolute right-10 bottom-20 w-24 h-24 rounded-full border border-[#4cb7e0] hidden lg:block"></div>
        <div className="absolute right-20 top-40 w-16 h-16 rounded-full bg-[#4cb7e0] blur hidden lg:block"></div>
      </div>

      {/* Subtle floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating dots */}
        <div
          className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-[#4cb7e0] opacity-20"
          style={{ animation: 'float-slow 8s ease-in-out infinite' }}
        />
        <div
          className="absolute top-3/4 right-1/3 w-1 h-1 rounded-full bg-[#4cb7e0] opacity-30"
          style={{ animation: 'float-slow 12s ease-in-out infinite reverse' }}
        />
        <div
          className="absolute top-1/2 left-3/4 w-1.5 h-1.5 rounded-full bg-[#4cb7e0] opacity-25"
          style={{ animation: 'float-slow 10s ease-in-out infinite', animationDelay: '2s' }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full bg-white opacity-15"
          style={{ animation: 'float-slow 14s ease-in-out infinite', animationDelay: '1s' }}
        />
        <div
          className="absolute bottom-1/4 left-1/6 w-1.5 h-1.5 rounded-full bg-[#4cb7e0] opacity-20"
          style={{ animation: 'float-slow 9s ease-in-out infinite reverse', animationDelay: '3s' }}
        />
        <div
          className="absolute top-2/3 left-1/2 w-1 h-1 rounded-full bg-white opacity-10"
          style={{ animation: 'float-slow 11s ease-in-out infinite', animationDelay: '4s' }}
        />
      </div>

      <div className="max-w-[896px] mx-auto relative z-10">
        <div className="flex flex-col gap-6 items-center text-center">

          {/* Main Heading */}
          <div className="flex flex-col gap-1">
            <h1 className="font-['Segoe_UI:Bold',_sans-serif] text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[45px] md:leading-[55px] lg:leading-[60px]">
              Soluções
            </h1>
            <h1 className="font-['Segoe_UI:Bold',_sans-serif] text-4xl md:text-5xl lg:text-6xl font-bold text-[#4cb7e0] leading-[45px] md:leading-[55px] lg:leading-[60px]">
              Para Empresas
            </h1>
          </div>

          {/* Subtitle */}
          <div className="max-w-[768px] mx-auto">
            <p className="font-['Segoe_UI:Regular',_sans-serif] text-lg md:text-xl text-gray-300 leading-[28px] md:leading-[32.5px] text-center">
              Capacite sua equipe com os melhores programas de treinamento naval e marítimo. Oferecemos
              soluções completas para empresas que buscam excelência operacional.
            </p>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center mt-6 w-full px-4 sm:px-0">
            {/* Primary Button - Falar com Especialista */}
            <Button
              asChild
              className="h-12 sm:h-12 px-6 sm:px-8 bg-[#4cb7e0] hover:bg-[#3a9bc1] text-white font-semibold text-base sm:text-lg rounded-md transition-all duration-300 w-full sm:w-auto min-w-[200px] shadow-lg hover:shadow-xl"
            >
              <Link href="/contact" className="flex items-center justify-center gap-2">
                <img
                  src={phoneIcon}
                  alt=""
                  className="w-4 h-4 flex-shrink-0"
                />
                <span className="whitespace-nowrap">Falar com Especialista</span>
              </Link>
            </Button>

            {/* Secondary Button - Solicitar Proposta */}
            <Button
              asChild
              variant="outline"
              className="h-12 sm:h-12 px-6 sm:px-8 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#070e2c] font-semibold text-base sm:text-lg rounded-md transition-all duration-300 w-full sm:w-auto min-w-[200px]"
            >
              <Link href="/contact?tipo=proposta" className="flex items-center justify-center gap-2">
                <div className="relative w-4 h-4 flex-shrink-0">
                  <img
                    src={documentIcon1}
                    alt=""
                    className="absolute inset-0 w-4 h-4"
                  />
                  <img
                    src={documentIcon2}
                    alt=""
                    className="absolute inset-0 w-4 h-4"
                  />
                </div>
                <span className="whitespace-nowrap">Solicitar Proposta</span>
              </Link>
            </Button>
          </div>

        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-15px) translateX(5px);
          }
        }
      `}</style>
    </section>
  )
}