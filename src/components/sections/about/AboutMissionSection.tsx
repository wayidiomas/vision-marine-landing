'use client'

// Asset from Figma
const imgPortoMaritimo = "http://localhost:3845/assets/da331f6f1f93224bb02d6f187fbe747be3719910.png"

export function AboutMissionSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-[260px] bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#4cb7e0] blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-[#3a9bc1] blur-3xl"></div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">

          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6 order-2 lg:order-1 text-center sm:text-left">

            {/* Section Badge */}
            <div className="inline-flex items-center gap-2 bg-[#4cb7e0]/10 text-[#4cb7e0] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="sm:w-4 sm:h-4">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Nossa Missão
            </div>

            {/* Heading */}
            <div>
              <h2 className="font-['Segoe_UI:Bold',_sans-serif] text-[#070e2c] text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] leading-[28px] sm:leading-[32px] md:leading-[36px] lg:leading-[40px] font-bold">
                Democratizar a Educação Marítima
              </h2>
            </div>

            {/* Mission Statement */}
            <div className="space-y-3 sm:space-y-4">
              <div className="font-['Segoe_UI:Regular',_sans-serif] text-gray-600 text-sm sm:text-base lg:text-lg leading-[22px] sm:leading-[26px] lg:leading-[29px]">
                <p className="mb-3 sm:mb-4">
                  Democratizar o acesso à educação marítima de qualidade, oferecendo
                  treinamentos especializados que preparam profissionais para os desafios
                  do mercado naval moderno. Acreditamos que o conhecimento é o motor do
                  progresso e da segurança nos mares.
                </p>
              </div>

              <div className="font-['Segoe_UI:Regular',_sans-serif] text-gray-600 text-sm sm:text-base lg:text-lg leading-[22px] sm:leading-[26px] lg:leading-[29px]">
                <p>
                  Nossos treinamentos são desenvolvidos por especialistas com décadas de
                  experiência prática, combinando teoria sólida com aplicações reais do
                  dia a dia marítimo.
                </p>
              </div>
            </div>

          </div>

          {/* Right Content - Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-full max-w-[500px] lg:max-w-[600px]">
              <div
                className="relative w-full h-[280px] sm:h-[350px] lg:h-[400px] rounded-2xl shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden"
                style={{
                  backgroundImage: `url(${imgPortoMaritimo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {/* Overlay for better image contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}