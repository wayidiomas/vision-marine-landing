'use client'

export function AboutHeroSection() {
  return (
    <section
      className="bg-[#070e2c] relative px-4 lg:px-[276px] py-16 md:py-20 lg:py-24 overflow-hidden"
      data-name="About Hero Section"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234cb7e0' fill-opacity='0.4'%3E%3Cpath d='M0 30c10-10 20-10 30 0s20 10 30 0v30H0V30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'wave-flow 20s linear infinite'
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

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col items-center text-center gap-6">

          {/* Main Heading */}
          <div>
            <h1 className="font-['Segoe_UI:Bold',_sans-serif] text-white text-[36px] sm:text-[40px] md:text-[44px] lg:text-[48px] leading-[40px] sm:leading-[44px] md:leading-[48px] lg:leading-[52px] font-bold">
              Sobre a Vision Marine
            </h1>
          </div>

          {/* Subtitle */}
          <div className="max-w-[768px] mx-auto px-4 sm:px-0">
            <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-300 text-[18px] sm:text-[20px] leading-[26px] sm:leading-[28px] text-center">
              Somos a principal plataforma de educação marítima e naval do Brasil, comprometidos em formar os profissionais do futuro.
            </p>
          </div>

        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes wave-flow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-60px);
          }
        }

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