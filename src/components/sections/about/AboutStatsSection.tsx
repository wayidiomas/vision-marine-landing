'use client'

import { AnimatedNumber } from '@/components/ui/AnimatedNumber'

export function AboutStatsSection() {
  const stats = [
    {
      id: 1,
      value: "500+",
      label: "Alunos Formados"
    },
    {
      id: 2,
      value: "15+",
      label: "Treinamentos Disponíveis"
    },
    {
      id: 3,
      value: "10+",
      label: "Anos de Experiência"
    },
    {
      id: 4,
      value: "98%",
      label: "Taxa de Satisfação"
    }
  ]

  return (
    <section className="relative py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 xl:px-16 2xl:px-24 bg-[#4cb7e0] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M0 30c10-10 20-10 30 0s20 10 30 0v30H0V30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'wave-flow 20s linear infinite'
          }}
        />
      </div>

      {/* Subtle floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating dots */}
        <div
          className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-white opacity-20"
          style={{ animation: 'float-slow 8s ease-in-out infinite' }}
        />
        <div
          className="absolute top-3/4 right-1/3 w-1 h-1 rounded-full bg-white opacity-30"
          style={{ animation: 'float-slow 12s ease-in-out infinite reverse' }}
        />
        <div
          className="absolute top-1/2 left-3/4 w-1.5 h-1.5 rounded-full bg-white opacity-25"
          style={{ animation: 'float-slow 10s ease-in-out infinite', animationDelay: '2s' }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full bg-white opacity-15"
          style={{ animation: 'float-slow 14s ease-in-out infinite', animationDelay: '1s' }}
        />
        <div
          className="absolute bottom-1/4 left-1/6 w-1.5 h-1.5 rounded-full bg-white opacity-20"
          style={{ animation: 'float-slow 9s ease-in-out infinite reverse', animationDelay: '3s' }}
        />
        <div
          className="absolute top-2/3 left-1/2 w-1 h-1 rounded-full bg-white opacity-10"
          style={{ animation: 'float-slow 11s ease-in-out infinite', animationDelay: '4s' }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className="text-center"
            >
              {/* Number */}
              <div className="mb-2">
                <AnimatedNumber
                  value={stat.value}
                  delay={index * 200}
                  className="font-['Segoe_UI:Bold',_sans-serif] text-white text-[32px] sm:text-[40px] lg:text-[48px] leading-[36px] sm:leading-[44px] lg:leading-[48px] font-bold"
                />
              </div>

              {/* Label */}
              <div className="opacity-90">
                <p className="font-['Segoe_UI:Regular',_sans-serif] text-white text-sm sm:text-base lg:text-lg leading-[20px] sm:leading-[24px] lg:leading-[28px]">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
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