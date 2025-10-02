'use client'

import { useState, useRef, useEffect } from 'react'

export function AboutTeamSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const [gapSize, setGapSize] = useState(24)
  const [slideOffset, setSlideOffset] = useState(0)

  // Update cards per view based on screen size
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(3) // lg: show 3 cards
      } else if (window.innerWidth >= 640) {
        setCardsPerView(2) // sm: show 2 cards
      } else {
        setCardsPerView(1) // mobile: show 1 card
      }
    }

    updateCardsPerView()
    window.addEventListener('resize', updateCardsPerView)
    return () => window.removeEventListener('resize', updateCardsPerView)
  }, [])

  useEffect(() => {
    const updateSlideMetrics = () => {
      const container = containerRef.current
      if (!container) {
        setSlideOffset(0)
        return
      }

      const firstCard = container.children[0] as HTMLElement | undefined
      if (!firstCard) {
        setSlideOffset(0)
        return
      }

      const computedStyles = window.getComputedStyle(container)
      const gapValueRaw = parseFloat(computedStyles.columnGap || computedStyles.gap || '0')
      const normalizedGap = Number.isFinite(gapValueRaw) ? gapValueRaw : 0

      if (normalizedGap !== gapSize) {
        setGapSize(normalizedGap)
      }

      const containerWidth = container.getBoundingClientRect().width
      const measuredCardWidth = firstCard.getBoundingClientRect().width
      const fallbackWidth = containerWidth / Math.max(cardsPerView, 1)
      const effectiveCardWidth = measuredCardWidth || fallbackWidth

      if (effectiveCardWidth > 0) {
        setSlideOffset(effectiveCardWidth + normalizedGap)
      }
    }

    const handleResize = () => {
      updateSlideMetrics()
    }

    updateSlideMetrics()
    const rafId = window.requestAnimationFrame(updateSlideMetrics)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.cancelAnimationFrame(rafId)
    }
  }, [cardsPerView, gapSize])

  const team = [
    {
      id: 1,
      name: "Capitão João Silva",
      role: "Diretor Técnico",
      initials: "JS",
      experience: "20+ anos de experiência",
      speciality: "Navegação oceânica e comercial",
      description: "Especialista em navegação comercial e militar com vasta experiência em operações oceânicas.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      certifications: ["Capitão de Longo Curso", "IMO Certified"]
    },
    {
      id: 2,
      name: "Eng.ª Maria Santos",
      role: "Coordenadora Pedagógica",
      initials: "MS",
      experience: "15+ anos de experiência",
      speciality: "Metodologias de ensino técnico",
      description: "Engenheira Naval com mestrado em Educação, especialista em metodologias de ensino técnico.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&h=300&fit=crop&crop=face",
      certifications: ["Engenheira Naval", "Mestre em Educação"]
    },
    {
      id: 3,
      name: "Piloto Pedro Lima",
      role: "Instrutor Senior",
      initials: "PL",
      experience: "15+ anos de experiência",
      speciality: "Operações portuárias",
      description: "Piloto de Porto especialista em operações portuárias e segurança marítima.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      certifications: ["Piloto de Porto", "Safety Officer"]
    },
    {
      id: 4,
      name: "Cap. Ana Rodrigues",
      role: "Instrutora de Segurança",
      initials: "AR",
      experience: "12+ anos de experiência",
      speciality: "Segurança marítima e STCW",
      description: "Especialista em treinamentos de segurança marítima e certificações internacionais STCW.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      certifications: ["STCW Instructor", "ISM Auditor"]
    }
  ]

  const maxSlides = Math.max(0, team.length - cardsPerView)
  const normalizedCardsPerView = Math.max(cardsPerView, 1)
  const normalizedGapSize = Number.isFinite(gapSize) ? gapSize : 0
  const cardFlexBasis = `calc((100% - ${(normalizedCardsPerView - 1) * normalizedGapSize}px) / ${normalizedCardsPerView})`
  const translateX = slideOffset * currentSlide
  const transformValue = slideOffset ? `translateX(-${translateX}px)` : `translateX(-${currentSlide * 100}%)`

  useEffect(() => {
    if (currentSlide > maxSlides) {
      setCurrentSlide(maxSlides)
    }
  }, [currentSlide, maxSlides])

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const nextIndex = prev + 1
      return nextIndex > maxSlides ? 0 : nextIndex
    })
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const prevIndex = prev - 1
      return prevIndex < 0 ? maxSlides : prevIndex
    })
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(Math.min(index, maxSlides))
  }

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [currentSlide, maxSlides])

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-[260px] bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#4cb7e0] blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-[#3a9bc1] blur-3xl"></div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#4cb7e0]/10 text-[#4cb7e0] px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            Nossa Equipe
          </div>

          <h2 className="font-['Segoe_UI:Bold',_sans-serif] text-[#070e2c] text-[28px] sm:text-[32px] lg:text-[36px] leading-[32px] sm:leading-[36px] lg:leading-[40px] font-bold mb-4">
            Especialistas em Educação Marítima
          </h2>
          <div className="max-w-[672px] mx-auto">
            <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-600 text-base sm:text-lg leading-[24px] sm:leading-[28px] text-center">
              Profissionais experientes e apaixonados pelo ensino marítimo, prontos para compartilhar conhecimento e formar os melhores profissionais.
            </p>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative px-0 sm:px-12">
          {/* Navigation Buttons - Hidden on mobile, visible on tablet+ */}
          <button
            onClick={prevSlide}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full shadow-lg border border-gray-200 items-center justify-center text-[#4cb7e0] hover:bg-[#4cb7e0] hover:text-white transition-all duration-300"
            aria-label="Previous slide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="lg:w-5 lg:h-5">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-full shadow-lg border border-gray-200 items-center justify-center text-[#4cb7e0] hover:bg-[#4cb7e0] hover:text-white transition-all duration-300"
            aria-label="Next slide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="lg:w-5 lg:h-5">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
            </svg>
          </button>

          {/* Carousel Content */}
          <div className="overflow-hidden">
            <div
              ref={containerRef}
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{
                transform: transformValue
              }}
            >
              {team.map((member, index) => (
                <div
                  key={member.id}
                  className="group bg-white rounded-2xl border border-slate-200 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden hover:shadow-[0px_20px_25px_-5px_rgba(76,183,224,0.3),0px_10px_10px_-5px_rgba(76,183,224,0.2)] transition-all duration-300 hover:-translate-y-2 flex-shrink-0"
                  style={{
                    flex: `0 0 ${cardFlexBasis}`
                  }}
                >
                {/* Profile Image */}
                <div className="relative">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback to initials circle if image fails to load
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        const fallback = target.nextElementSibling as HTMLElement
                        if (fallback) fallback.style.display = 'flex'
                      }}
                    />
                    {/* Fallback initials circle */}
                    <div
                      className="hidden w-full h-full bg-[#4cb7e0] items-center justify-center"
                      style={{ display: 'none' }}
                    >
                      <span className="text-white text-2xl sm:text-3xl font-bold">
                        {member.initials}
                      </span>
                    </div>
                  </div>

                  {/* Experience Badge */}
                  <div className="absolute top-3 right-3 bg-[#4cb7e0] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    {member.experience.replace('+ anos de experiência', ' anos')}
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Name & Role */}
                  <div className="text-center mb-4">
                    <h3 className="font-['Segoe_UI:Semibold',_sans-serif] text-[#020817] text-lg sm:text-xl leading-[24px] sm:leading-[28px] mb-2">
                      {member.name}
                    </h3>
                    <p className="font-['Segoe_UI:Regular',_sans-serif] text-[#4cb7e0] text-sm sm:text-base leading-[20px] sm:leading-[24px] font-medium">
                      {member.role}
                    </p>
                  </div>

                  {/* Speciality */}
                  <div className="text-center mb-4">
                    <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-600 text-xs sm:text-sm leading-[16px] sm:leading-[20px]">
                      <span className="font-semibold">Especialidade:</span> {member.speciality}
                    </p>
                  </div>

                  {/* Description */}
                  <div className="text-center mb-4">
                    <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-600 text-xs sm:text-sm leading-[16px] sm:leading-[20px]">
                      {member.description}
                    </p>
                  </div>

                  {/* Certifications */}
                  <div className="space-y-1">
                    {member.certifications.map((cert, certIndex) => (
                      <div key={certIndex} className="flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#4cb7e0] rounded-full"></div>
                        <span className="font-['Segoe_UI:Regular',_sans-serif] text-gray-500 text-xs">
                          {cert}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="h-1 bg-gradient-to-r from-[#4cb7e0] to-[#3a9bc1] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>
      </div>
        </div>

      {/* Mobile Navigation Buttons */}
      <div className="flex sm:hidden justify-center gap-4 mt-6">
        <button
          onClick={prevSlide}
          className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 text-[#4cb7e0] active:bg-[#4cb7e0] active:text-white transition-all duration-200"
          aria-label="Previous slide"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 text-[#4cb7e0] active:bg-[#4cb7e0] active:text-white transition-all duration-200"
          aria-label="Next slide"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
          </svg>
        </button>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center mt-6 sm:mt-8 gap-2">
        {Array.from({ length: maxSlides + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'bg-[#4cb7e0] scale-125'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12 sm:mt-16">
        <div className="inline-flex items-center gap-3 bg-[#4cb7e0]/10 text-[#4cb7e0] px-6 py-3 rounded-full">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span className="font-['Segoe_UI:Semibold',_sans-serif] text-sm sm:text-base">
            Equipe Altamente Qualificada e Experiente
          </span>
        </div>
      </div>

    </div>
    </section>
  )
}