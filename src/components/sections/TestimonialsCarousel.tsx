'use client'

import { useState, useEffect, useRef } from 'react'

// Assets from Figma
const imgCarlosMendes = "http://localhost:3845/assets/9bbdfb06a5eae3ca01387e38cee556cb0ba93eb3.png"
const imgRobertoCosta = "http://localhost:3845/assets/0d5da6ab018faf09b0940ac3e0ab4d6d514c431f.png"
const imgSvg = "http://localhost:3845/assets/4b925ba4927f944016ec1e102e0c42ddfd5012fb.svg"
const imgSvg1 = "http://localhost:3845/assets/dd4abcc08f44f451064f61de00065ebf3f13b768.svg"

// Additional placeholder images for more testimonials
const imgAnaRodrigues = imgCarlosMendes // Reusing for demo
const imgJoaoSilva = imgRobertoCosta // Reusing for demo
const imgLuciaMartins = imgCarlosMendes // Reusing for demo

interface Testimonial {
  id: string
  quote: string
  name: string
  position: string
  company: string
  image: string
  rating: number
}

interface TestimonialCardProps {
  testimonial: Testimonial
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-white flex-shrink-0 w-full max-w-[380px] md:max-w-[420px] lg:max-w-[400px] mx-4 group">
      <div
        className="bg-white box-border content-stretch flex flex-col overflow-clip relative rounded-[8px] h-full transition-all duration-500 ease-out"
        style={{
          boxShadow: '0px_10px_15px_-3px_rgba(0,0,0,0.1), 0px_4px_6px_-4px_rgba(0,0,0,0.1), 0 0 20px rgba(76, 183, 224, 0.15)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0px 15px 25px -3px rgba(0,0,0,0.15), 0px 8px 12px -4px rgba(0,0,0,0.1), 0 0 30px rgba(76, 183, 224, 0.4)';
          e.currentTarget.style.transform = 'translateY(-4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1), 0 0 20px rgba(76, 183, 224, 0.15)';
          e.currentTarget.style.transform = 'translateY(0px)';
        }}
      >
        <div className="box-border content-stretch flex flex-col gap-[15px] items-start p-[32px] relative shrink-0 w-full">

          {/* Quote Icon */}
          <div className="box-border content-stretch flex items-center pb-[16px] pt-0 px-0 relative shrink-0 w-full">
            <div
              className="relative shrink-0 size-[32px] transition-all duration-300"
              style={{
                filter: 'drop-shadow(0 2px 8px rgba(76, 183, 224, 0.3))'
              }}
            >
              <img alt="" className="block max-w-none size-full group-hover:scale-110 transition-transform duration-300" src={imgSvg} />
            </div>
          </div>

          {/* Testimonial Text */}
          <div className="box-border content-stretch flex flex-col items-start pb-[0.6px] pt-0 px-0 relative shrink-0 w-full">
            <div className="flex flex-col font-['Segoe_UI:Regular',_sans-serif] justify-center leading-[26px] not-italic relative shrink-0 text-[16px] text-gray-600 w-full">
              <p className="mb-0">{testimonial.quote}</p>
            </div>
          </div>

          {/* Star Rating */}
          <div className="box-border content-stretch flex items-center pb-0 pt-[8.6px] px-0 relative shrink-0 w-full">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="relative shrink-0 size-[16px] transition-all duration-300"
                style={{
                  filter: 'drop-shadow(0 1px 4px rgba(255, 193, 7, 0.4))'
                }}
              >
                <img alt="" className="block max-w-none size-full group-hover:scale-105 transition-transform duration-300" src={imgSvg1} />
              </div>
            ))}
          </div>

          {/* Author Info */}
          <div className="box-border content-stretch flex items-center pb-0 pt-[0.6px] px-0 relative shrink-0 w-full">
            <div className="box-border content-stretch flex flex-col h-[48px] items-start max-w-[386.66px] pl-0 pr-[16px] py-0 relative shrink-0 w-[64px]">
              <div
                className="max-w-[370.66px] relative rounded-[9999px] shrink-0 size-[48px] transition-all duration-300"
                style={{
                  boxShadow: '0 0 0 2px rgba(76, 183, 224, 0.2), 0 2px 8px rgba(76, 183, 224, 0.15)'
                }}
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[9999px]">
                  <img alt="" className="absolute left-0 max-w-none size-full top-0 object-cover group-hover:scale-105 transition-transform duration-300" src={testimonial.image} />
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-start relative shrink-0">
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                <div className="flex flex-col font-['Segoe_UI:Semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#070e2c] text-[16px] text-nowrap">
                  <p className="leading-[24px] whitespace-pre">{testimonial.name}</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                <div className="flex flex-col font-['Segoe_UI:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-500 text-nowrap">
                  <p className="leading-[20px] whitespace-pre">{testimonial.position}</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                <div className="flex flex-col font-['Segoe_UI:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4cb7e0] text-[14px] text-nowrap">
                  <p
                    className="leading-[20px] whitespace-pre group-hover:font-semibold transition-all duration-300"
                    style={{
                      textShadow: '0 1px 3px rgba(76, 183, 224, 0.3)'
                    }}
                  >{testimonial.company}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsCarousel() {
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  // Original testimonials data
  const testimonials: Testimonial[] = [
    {
      id: '1',
      quote: '"Os Treinamentos da Vision Marine foram fundamentais para minha progressão na carreira. A qualidade do conteúdo e a experiência dos instrutores são excepcionais."',
      name: 'Carlos Mendes',
      position: 'Capitão de Longo Curso',
      company: 'Navegação Brasileira',
      image: imgCarlosMendes,
      rating: 5
    },
    {
      id: '2',
      quote: '"Excelente plataforma! Os Treinamentos são práticos e atualizados com as normas internacionais. Recomendo para todos os profissionais da área."',
      name: 'Marina Silva',
      position: 'Engenheira Naval',
      company: 'Estaleiro Atlântico',
      image: imgCarlosMendes, // Placeholder
      rating: 5
    },
    {
      id: '3',
      quote: '"Consegui minha certificação internacional através dos Treinamentos. O suporte e a metodologia de ensino são de primeira qualidade."',
      name: 'Roberto Costa',
      position: 'Oficial de Máquinas',
      company: 'Petrobras Transporte',
      image: imgRobertoCosta,
      rating: 5
    },
    {
      id: '4',
      quote: '"A flexibilidade dos cursos online me permitiu estudar no meu ritmo. Hoje sou certificado em navegação dinâmica graças à Vision Marine."',
      name: 'Ana Rodrigues',
      position: 'Oficial de Náutica',
      company: 'Transpetro',
      image: imgAnaRodrigues,
      rating: 5
    },
    {
      id: '5',
      quote: '"Metodologia excepcional e instrutores altamente qualificados. Os simuladores práticos fizeram toda a diferença na minha formação."',
      name: 'João Silva',
      position: 'Inspetor Naval',
      company: 'Marinha Mercante',
      image: imgJoaoSilva,
      rating: 5
    },
    {
      id: '6',
      quote: '"Plataforma moderna e conteúdo sempre atualizado. Consegui duas certificações importantes que impulsionaram minha carreira no setor naval."',
      name: 'Lúcia Martins',
      position: 'Coordenadora de Segurança',
      company: 'Vale Navegação',
      image: imgLuciaMartins,
      rating: 5
    }
  ]

  // Triple testimonials for seamless infinite scroll in both directions
  const triplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials]

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    // Start at the middle set
    const cardWidth = 420 + 32 // card width + gap
    const middlePosition = testimonials.length * cardWidth
    scrollContainer.scrollLeft = middlePosition

    const animate = () => {
      if (!isPaused && scrollContainer) {
        // Auto-scroll to the left
        scrollContainer.scrollLeft += 1

        // Check if we need to loop
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
        const currentScroll = scrollContainer.scrollLeft

        // If scrolled past the second set, jump back to middle set
        if (currentScroll >= testimonials.length * 2 * cardWidth) {
          scrollContainer.scrollLeft = middlePosition
        }
        // If scrolled before the first set, jump to middle set
        else if (currentScroll <= 0) {
          scrollContainer.scrollLeft = middlePosition
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPaused, testimonials.length])

  return (
    <section className="bg-gray-50 py-16 md:py-20 lg:py-24 overflow-hidden w-full">
      <div className="w-full">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20 px-4">
          <div className="mb-6 md:mb-8">
            <h2 className="font-['Segoe_UI:Bold',_sans-serif] text-[#070e2c] text-[28px] md:text-[32px] lg:text-[36px] leading-[32px] md:leading-[36px] lg:leading-[40px] mb-2 md:mb-4">
              O que Nossos Alunos Dizem
            </h2>
          </div>
          <div className="max-w-[672px] mx-auto px-4">
            <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-600 text-[16px] md:text-[18px] lg:text-[20px] leading-[26px] md:leading-[30px] lg:leading-[32.5px] text-center">
              Depoimentos de profissionais que transformaram suas carreiras conosco
            </p>
          </div>
        </div>

        {/* Infinite Carousel */}
        <div className="relative w-full">
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {triplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.id}-${index}`}
                testimonial={testimonial}
              />
            ))}
          </div>

          {/* Gradient Overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10"></div>
        </div>

      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}