'use client'

import { useState, useEffect, useRef } from 'react'

interface StatisticItemProps {
  number: string
  title: string
  delay: number
  isVisible: boolean
}

function StatisticItem({ number, title, delay, isVisible }: StatisticItemProps) {
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
    <div className="flex flex-col items-center text-center px-2 sm:px-0">
      {/* Number */}
      <div className="mb-1 sm:mb-2">
        <div
          className={`font-['Segoe_UI:Bold',_sans-serif] text-[#4cb7e0] text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-[28px] sm:leading-[36px] md:leading-[40px] lg:leading-[44px] transition-all duration-500 ${
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

      {/* Title */}
      <div>
        <h3 className={`font-['Segoe_UI:Regular',_sans-serif] text-gray-300 text-[12px] sm:text-[14px] md:text-[16px] leading-[16px] sm:leading-[20px] md:leading-[24px] transition-all duration-500 text-center ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
        }`}
        style={{ transitionDelay: `${delay + 200}ms` }}
        >
          {title}
        </h3>
      </div>
    </div>
  )
}

export function CompaniesStatisticsSection() {
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
      number: "150+",
      title: "Empresas Atendidas"
    },
    {
      number: "5.000+",
      title: "Profissionais Capacitados"
    },
    {
      number: "98%",
      title: "Satisfação Cliente"
    },
    {
      number: "25%",
      title: "Aumento Produtividade"
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

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          {statistics.map((stat, index) => (
            <StatisticItem
              key={index}
              number={stat.number}
              title={stat.title}
              delay={index * 100} // Staggered animation
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