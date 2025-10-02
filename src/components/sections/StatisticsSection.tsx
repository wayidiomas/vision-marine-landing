'use client'

import { useState, useEffect, useRef } from 'react'

// Assets from Figma
const imgSvg = "http://localhost:3845/assets/c89d91769d846257e3c8b94dcc3ce970d9ab7f80.svg"
const imgSvg1 = "http://localhost:3845/assets/537135f79c9e23f7320a9785b5f58e4886273585.svg"
const imgSvg2 = "http://localhost:3845/assets/ae7e987f5e308c7e130d27c49a62678081324bae.svg"
const imgSvg3 = "http://localhost:3845/assets/a0457e5fe91da5061387fcedcdab415684b7914a.svg"

interface StatisticCardProps {
  icon: string
  number: string
  title: string
  description: string
  delay: number
  isVisible: boolean
}

function StatisticCard({ icon, number, title, description, delay, isVisible }: StatisticCardProps) {
  const [animatedNumber, setAnimatedNumber] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Extract numeric value from number string
  const getNumericValue = (numStr: string) => {
    const match = numStr.match(/[\d,]+/)
    if (!match) return 0
    return parseInt(match[0].replace(/,/g, ''))
  }

  // Get suffix (%, +, etc.)
  const getSuffix = (numStr: string) => {
    const match = numStr.match(/[^\d,]+/)
    return match ? match[0] : ''
  }

  const targetNumber = getNumericValue(number)
  const suffix = getSuffix(number)

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString('pt-BR')
  }

  // Animate number when visible
  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true)

      if (targetNumber > 0) {
        const startTime = Date.now() + delay
        const duration = 800 // 0.8 seconds animation

        const animate = () => {
          const now = Date.now()
          const elapsed = now - startTime

          if (elapsed < 0) {
            requestAnimationFrame(animate)
            return
          }

          if (elapsed < duration) {
            const progress = elapsed / duration
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            const currentValue = Math.floor(targetNumber * easeOutQuart)
            setAnimatedNumber(currentValue)
            requestAnimationFrame(animate)
          } else {
            setAnimatedNumber(targetNumber)
          }
        }

        requestAnimationFrame(animate)
      } else {
        // If no numeric value, show original string immediately
        setAnimatedNumber(0)
      }
    }
  }, [isVisible, hasAnimated, targetNumber, delay])

  // Display logic - show original number if no numeric value found
  const displayValue = targetNumber > 0 ? `${formatNumber(animatedNumber)}${suffix}` : number
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-[rgba(76,183,224,0.1)] flex items-center justify-center rounded-full mb-6 size-[80px] md:size-[96px]">
        <div className="relative size-[32px] md:size-[40px]">
          <img alt="" className="block max-w-none size-full" src={icon} />
        </div>
      </div>

      <div className="mb-3">
        <div
          className={`font-['Segoe_UI:Bold',_sans-serif] text-[#4cb7e0] text-[30px] md:text-[36px] lg:text-[40px] leading-[34px] md:leading-[40px] lg:leading-[44px] transition-all duration-500 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
          }`}
          style={{
            textShadow: '0 2px 8px rgba(76, 183, 224, 0.3)',
            transitionDelay: `${delay}ms`
          }}
        >
          {displayValue}
        </div>
      </div>

      <div className="mb-2">
        <h3 className={`font-['Segoe_UI:Semibold',_sans-serif] text-white text-[16px] md:text-[18px] lg:text-[20px] leading-[22px] md:leading-[24px] lg:leading-[26px] transition-all duration-500 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
        }`}
        style={{ transitionDelay: `${delay + 200}ms` }}
        >
          {title}
        </h3>
      </div>

      <div>
        <p className={`font-['Segoe_UI:Regular',_sans-serif] text-gray-400 text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] max-w-[200px] transition-all duration-500 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
        }`}
        style={{ transitionDelay: `${delay + 400}ms` }}
        >
          {description}
        </p>
      </div>
    </div>
  )
}

export function StatisticsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Intersection Observer for scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
          }
        })
      },
      {
        threshold: 0.3, // Trigger when 30% of section is visible
        rootMargin: '-50px 0px'
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [isVisible])

  const statistics = [
    {
      icon: imgSvg,
      number: "2.500+",
      title: "Alunos Formados",
      description: "Profissionais capacitados e certificados em nossa plataforma"
    },
    {
      icon: imgSvg1,
      number: "50+",
      title: "Treinamentos Disponíveis",
      description: "Cursos especializados para diferentes áreas do setor naval"
    },
    {
      icon: imgSvg2,
      number: "98%",
      title: "Taxa de Aprovação",
      description: "Índice de sucesso dos nossos alunos nas certificações"
    },
    {
      icon: imgSvg3,
      number: "15+",
      title: "Anos de Experiência",
      description: "Tradição e excelência na formação marítima nacional"
    }
  ]

  return (
    <section
      ref={sectionRef}
      className="bg-[#070e2c] relative py-16 md:py-20 lg:py-24 px-4 lg:px-[276px] overflow-hidden"
    >

      {/* Ocean Wave Background Pattern - Moving */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234cb7e0' fill-opacity='0.4'%3E%3Cpath d='M0 30c10-10 20-10 30 0s20 10 30 0v30H0V30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'wave-flow 20s linear infinite'
          }}
        />
      </div>

      {/* Second layer of waves for depth */}
      <div className="absolute inset-0 opacity-3">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='40' viewBox='0 0 80 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20c20-10 40 10 80 0v20H0V20z' fill='%234cb7e0' fill-opacity='0.2'/%3E%3C/svg%3E")`,
            animation: 'wave-flow-reverse 25s linear infinite'
          }}
        />
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
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="mb-6 md:mb-8">
            <h2 className="font-['Segoe_UI:Bold',_sans-serif] text-white text-[28px] md:text-[32px] lg:text-[36px] leading-[32px] md:leading-[36px] lg:leading-[40px] mb-2 md:mb-4">
              Números que Falam por Si
            </h2>
          </div>
          <div className="max-w-[768px] mx-auto">
            <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-300 text-[16px] md:text-[18px] lg:text-[20px] leading-[26px] md:leading-[30px] lg:leading-[32.5px] text-center">
              Nossa trajetória de sucesso na formação de profissionais marítimos
            </p>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {statistics.map((stat, index) => (
            <StatisticCard
              key={index}
              icon={stat.icon}
              number={stat.number}
              title={stat.title}
              description={stat.description}
              delay={index * 100} // Faster staggered animation
              isVisible={isVisible}
            />
          ))}
        </div>

      </div>

      {/* CSS Animations for Ocean Effects */}
      <style jsx>{`
        @keyframes wave-flow {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-60px);
          }
        }

        @keyframes wave-flow-reverse {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(80px);
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