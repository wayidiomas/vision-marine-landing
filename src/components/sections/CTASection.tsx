'use client'

import Link from 'next/link'

// Assets from Figma
const imgVector = "/assets/figma/cta/cta-vector-1.svg"
const imgVector1 = "/assets/figma/cta/cta-vector-2.svg"
const imgVector2 = "/assets/figma/cta/cta-vector-3.svg"
const imgVector3 = "/assets/figma/cta/cta-vector-4.svg"

export function CTASection() {
  return (
    <section className="relative py-16 md:py-20 lg:py-24 px-4 lg:px-8 xl:px-16 2xl:px-24 overflow-hidden">
      {/* Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #070e2c 0%, #0a1a4a 100%)'
        }}
      />

      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-10 top-20 w-32 h-32 rounded-full border border-[#4cb7e0] hidden lg:block"></div>
        <div className="absolute right-10 bottom-20 w-24 h-24 rounded-full border border-[#4cb7e0] hidden lg:block"></div>
        <div className="absolute right-20 top-40 w-16 h-16 rounded-full bg-[#4cb7e0] blur hidden lg:block"></div>
        {/* Mobile decorative elements */}
        <div className="absolute left-10 top-20 w-32 h-32 rounded-full border border-[#4cb7e0] lg:hidden"></div>
        <div className="absolute right-10 bottom-80 w-24 h-24 rounded-full border border-[#4cb7e0] lg:hidden"></div>
        <div className="absolute right-20 top-40 w-16 h-16 rounded-full bg-[#4cb7e0] blur lg:hidden"></div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Main Content */}
        <div className="text-center mb-12 md:mb-16">
          {/* Heading */}
          <div className="mb-6 md:mb-8">
            <h2 className="font-['Segoe_UI:Bold',_sans-serif] text-white text-[28px] md:text-[32px] lg:text-[48px] leading-[32px] md:leading-[36px] lg:leading-[52px] mb-2 md:mb-4">
              Pronto para Navegar Rumo ao
            </h2>
            <h2 className="font-['Segoe_UI:Bold',_sans-serif] text-[#4cb7e0] text-[28px] md:text-[32px] lg:text-[48px] leading-[32px] md:leading-[36px] lg:leading-[52px]">
              Seu Futuro Profissional?
            </h2>
          </div>

          {/* Subtitle */}
          <div className="max-w-[672px] mx-auto mb-8 md:mb-12">
            <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-300 text-[16px] md:text-[18px] lg:text-[20px] leading-[26px] md:leading-[30px] lg:leading-[32.5px]">
              Transforme seu conhecimento em oportunidades reais no mercado naval.
              Comece sua jornada hoje mesmo com nossos treinamentos especializados.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 md:mb-16">
            {/* Primary Button */}
            <Link
              href="/courses"
              className="w-full sm:w-auto h-12 px-6 md:px-8 bg-gradient-to-r from-[#4cb7e0] to-[#4cb7e0] hover:from-[#4cb7e0] hover:to-[#3a9bc1] text-white font-semibold text-base md:text-lg rounded-md transition-all duration-300 flex items-center gap-2 justify-center min-w-[280px] sm:min-w-[260px] hover:scale-105 hover:shadow-lg"
              style={{
                boxShadow: '0 4px 15px rgba(76, 183, 224, 0.3)'
              }}
            >
              <span>Ver Todos os Treinamentos</span>
              {/* Arrow Icon */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 2H14V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.66669 9.33333L14 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            {/* Secondary Button */}
            <Link
              href="/contact"
              className="w-full sm:w-auto h-12 px-6 md:px-8 border-2 border-[#4cb7e0] text-[#4cb7e0] hover:bg-[#4cb7e0] hover:text-white font-semibold text-base md:text-lg rounded-md transition-all duration-300 flex items-center gap-2 justify-center min-w-[280px] sm:min-w-[240px] hover:scale-105 group"
              style={{
                backdropFilter: 'blur(10px)',
                background: 'rgba(255, 255, 255, 0.05)'
              }}
            >
              <span>Falar com Consultor</span>
              {/* Phone Icon */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:scale-110">
                <path d="M14.6667 11.28V13.28C14.6675 13.4657 14.6295 13.6494 14.555 13.8195C14.4805 13.9895 14.3708 14.1421 14.2330 14.2679C14.0952 14.3937 13.9321 14.4898 13.7543 14.5507C13.5765 14.6116 13.3878 14.6359 13.2000 14.6221C11.1588 14.3888 9.2134 13.6444 7.53335 12.4554C5.98741 11.3799 4.70433 9.9634 3.78001 8.3221C2.66668 6.64203 1.92226 4.69671 1.68001 2.65544C1.66621 2.46769 1.6905 2.27900 1.75139 2.10120C1.81228 1.92341 1.90838 1.76029 2.03416 1.62251C2.15994 1.48472 2.31255 1.37502 2.48260 1.30052C2.65265 1.22603 2.83635 1.18801 3.02201 1.18877H5.02201C5.35869 1.18544 5.68438 1.30377 5.94381 1.51543C6.20324 1.72710 6.37873 2.01822 6.43335 2.34210C6.53401 2.99544 6.71202 3.63210 6.96668 4.23877C7.05335 4.47210 7.06935 4.72877 7.01202 4.97210C6.95468 5.21544 6.82668 5.43544 6.64668 5.60210L5.78668 6.46210C6.76002 8.08877 8.17335 9.50210 9.80001 10.4754L10.6600 9.61544C10.8267 9.43544 11.0467 9.30744 11.2900 9.25010C11.5334 9.19277 11.7900 9.20877 12.0234 9.29544C12.6300 9.55010 13.2667 9.72810 13.9200 9.82877C14.2481 9.88418 14.5427 10.0632 14.7554 10.3284C14.9682 10.5936 15.0838 10.9265 15.0767 11.2688" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Feature Indicators */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center">
          {/* Suporte 24/7 */}
          <div className="flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#4cb7e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-['Segoe_UI:Semibold',_sans-serif] text-white text-[14px] md:text-[16px] leading-[20px] md:leading-[24px]">
              Suporte 24/7
            </span>
          </div>

          {/* Separator */}
          <div className="hidden md:block w-px h-6 bg-gray-600"></div>

          {/* Certificação Garantida */}
          <div className="flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#10b981" stroke="#10b981" strokeWidth="2"/>
              <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-['Segoe_UI:Semibold',_sans-serif] text-white text-[14px] md:text-[16px] leading-[20px] md:leading-[24px]">
              Certificação Garantida
            </span>
          </div>

          {/* Separator */}
          <div className="hidden md:block w-px h-6 bg-gray-600"></div>

          {/* Aulas 100% Online */}
          <div className="flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#4cb7e0" stroke="#4cb7e0" strokeWidth="2"/>
              <path d="M8 14S9.5 16 12 16S16 14 16 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="9" r="1" fill="white"/>
              <circle cx="15" cy="9" r="1" fill="white"/>
            </svg>
            <span className="font-['Segoe_UI:Semibold',_sans-serif] text-white text-[14px] md:text-[16px] leading-[20px] md:leading-[24px]">
              Aulas 100% Online
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}