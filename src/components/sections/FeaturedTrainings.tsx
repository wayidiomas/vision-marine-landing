'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useCourses } from '@/hooks/useCourses'
import { useGeolocation } from '@/hooks/useGeolocation'

// Course images configuration - can easily switch between local and Supabase Storage
const USE_LOCAL_IMAGES = true // Set to false to use Supabase Storage
const SUPABASE_URL = "https://dkyqibicypnpeejhxuct.supabase.co"
const STORAGE_URL = `${SUPABASE_URL}/storage/v1/object/public/course-images`

const getImageUrl = (filename: string) => {
  return USE_LOCAL_IMAGES ? `/assets/course-images/${filename}` : `${STORAGE_URL}/${filename}`
}

const imgDpInduction = getImageUrl("dp-induction-bg.png")
const imgDpInduction1 = getImageUrl("dp-induction-overlay.png")
const imgDpSimulator = getImageUrl("dp-simulator-overlay.png")
const imgDpRefresher = getImageUrl("dp-refresher-overlay.png")

// Local UI icons from Figma
const imgSvg = "/assets/icons/star.svg"
const imgVector = "/assets/icons/clock-1.svg"
const imgVector1 = "/assets/icons/clock-2.svg"
const imgVector2 = "/assets/icons/users-1.svg"
const imgVector3 = "/assets/icons/users-2.svg"
const imgVector4 = "/assets/icons/users-3.svg"
const imgVector5 = "/assets/icons/users-4.svg"
const imgVector6 = "/assets/icons/calendar-1.svg"
const imgVector7 = "/assets/icons/calendar-2.svg"
const imgVector8 = "/assets/icons/calendar-3.svg"

interface Course {
  curso_id: string
  curso_nome: string
  descricao: string
  nivel: string
  carga_horaria: number
  preco: string
  categoria: string
  instrutor: string
  turma_id: string
  turma_nome: string | null
  data_inicio: string
  data_fim: string
  horario_inicio: string | null
  horario_fim: string | null
  vagas_total: number
  vagas_ocupadas: number
  vagas_disponiveis: number
  status: string
  modalidade: string
  local: string | null
  data_formatada: string
  dias_para_inicio: number
}

interface CourseCardProps {
  course: Course
  imageAssets: {
    backgroundImage: string
    overlayImage?: string
  }
  rating: number
  isCenter?: boolean
  className?: string
}

function CourseCard({ course, imageAssets, rating, isCenter = false, className = "" }: CourseCardProps) {
  // Get level color based on course level
  const getLevelColor = (nivel: string) => {
    const normalizedLevel = nivel.toLowerCase()
    if (normalizedLevel.includes('básico') || normalizedLevel.includes('basic')) return 'bg-[#4cb7e0]'
    if (normalizedLevel.includes('intermediário') || normalizedLevel.includes('intermediate')) return 'bg-[#4cb7e0]'
    if (normalizedLevel.includes('avançado') || normalizedLevel.includes('advanced')) return 'bg-[#4cb7e0]'
    if (normalizedLevel.includes('reciclagem') || normalizedLevel.includes('refresher')) return 'bg-[#4cb7e0]'
    return 'bg-[#4cb7e0]'
  }

  // Format price based on user location (BRL for Brazil, USD for others)
  const formatPrice = (preco: string | number, isBrazil: boolean = true) => {
    // Convert to string if it's a number
    const precoStr = typeof preco === 'number' ? preco.toString() : preco
    const numericPrice = parseFloat(precoStr.replace(/[^\d,.-]/g, '').replace(',', '.'))
    if (isNaN(numericPrice)) return precoStr

    if (isBrazil) {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(numericPrice)
    } else {
      // Convert BRL to USD (approximate rate: 1 USD = 5 BRL)
      const usdPrice = numericPrice / 5
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(usdPrice)
    }
  }

  // Calculate days from hours
  const calculateDays = (hours: number) => Math.ceil(hours / 8)

  const cardClasses = `
    bg-white box-border content-stretch flex flex-col items-start overflow-clip relative rounded-[8px]
    carousel-card-transition
    ${isCenter
      ? 'carousel-center-shadow scale-105 z-10'
      : 'shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]'
    }
    shrink-0 w-full max-w-[434.66px]
    ${className}
  `.trim()

  return (
    <div className={cardClasses}>
      {/* Course Image Container */}
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full">
        <div className="h-[192px] relative shrink-0 w-full">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 overflow-hidden">
              <img alt="" className="absolute h-full left-[-1.53%] max-w-none top-0 w-[103.07%]" src={imageAssets.backgroundImage} />
            </div>
            {imageAssets.overlayImage && (
              <img alt="" className="absolute max-w-none object-50%-50% object-cover size-full" src={imageAssets.overlayImage} />
            )}
          </div>
        </div>

        {/* Level Badge */}
        <div className={`absolute ${getLevelColor(course.nivel)} box-border content-stretch flex items-center left-[16px] px-[11px] py-[3px] rounded-[9999px] top-[18px]`}>
          <div className="flex flex-col font-['Segoe_UI:Semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-nowrap text-white">
            <p className="leading-[16px] whitespace-pre">{course.nivel}</p>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute content-stretch flex flex-col items-start right-[16px] top-[16px] w-[63.27px]">
          <div className="backdrop-blur-[2px] backdrop-filter bg-[rgba(255,255,255,0.9)] box-border content-stretch flex items-center px-[12px] py-[4px] relative rounded-[8px] shrink-0 w-full">
            <div className="relative shrink-0 size-[16px]">
              <img alt="" className="block max-w-none size-full" src={imgSvg} />
            </div>
            <div className="box-border content-stretch flex flex-col items-start pl-[4px] pr-0 py-0 relative shrink-0">
              <div className="flex flex-col font-['Segoe_UI:Semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#020817] text-[14px] text-nowrap">
                <p className="leading-[20px] whitespace-pre">{rating}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="box-border content-stretch flex flex-col gap-[12px] items-start pb-[40px] pt-[24px] px-[24px] relative shrink-0 w-full">
        {/* Course Title */}
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
          <div className="flex flex-col font-['Segoe_UI:Semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#070e2c] text-[20px] text-nowrap tracking-[-0.5px]">
            <p className="leading-[28px] whitespace-pre">{course.curso_nome}</p>
          </div>
        </div>

        {/* Course Description */}
        <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full">
          <div className="flex flex-col font-['Segoe_UI:Regular',_sans-serif] justify-center leading-[24px] not-italic relative shrink-0 text-[16px] text-gray-600 w-full">
            <p className="mb-0 line-clamp-2">{course.descricao}</p>
          </div>
        </div>

        {/* Course Info */}
        <div className="box-border content-stretch flex gap-[16px] items-start justify-center pb-0 pt-[4px] px-0 relative shrink-0 w-full">
          {/* Duration */}
          <div className="basis-0 box-border content-stretch flex grow items-center min-h-px min-w-px pb-px pt-0 px-0 relative self-stretch shrink-0">
            <div className="box-border content-stretch flex flex-col h-[16px] items-start pl-0 pr-[8px] py-0 relative shrink-0 w-[24px]">
              <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0 size-[16px]">
                <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[16px]">
                  <div className="absolute inset-[8.333%]">
                    <div className="absolute inset-[-5%]">
                      <img alt="" className="block max-w-none size-full" src={imgVector} />
                    </div>
                  </div>
                  <div className="absolute bottom-[41.67%] left-1/2 right-[33.33%] top-1/4">
                    <div className="absolute inset-[-12.5%_-25.01%_-12.5%_-25%]">
                      <img alt="" className="block max-w-none size-full" src={imgVector1} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col font-['Segoe_UI:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-500 text-nowrap">
              <p className="leading-[20px] whitespace-pre">{course.carga_horaria}h ({calculateDays(course.carga_horaria)} dias)</p>
            </div>
          </div>

          {/* Students */}
          <div className="basis-0 box-border content-stretch flex grow items-center min-h-px min-w-px pb-px pt-0 px-0 relative self-stretch shrink-0">
            <div className="box-border content-stretch flex flex-col h-[16px] items-start pl-0 pr-[8px] py-0 relative shrink-0 w-[24px]">
              <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0 size-[16px]">
                <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[16px]">
                  <div className="absolute inset-[62.5%_33.33%_12.5%_8.33%]">
                    <div className="absolute inset-[-16.67%_-7.14%]">
                      <img alt="" className="block max-w-none size-full" src={imgVector2} />
                    </div>
                  </div>
                  <div className="absolute inset-[12.5%_45.83%_54.17%_20.83%]">
                    <div className="absolute inset-[-12.5%]">
                      <img alt="" className="block max-w-none size-full" src={imgVector3} />
                    </div>
                  </div>
                  <div className="absolute inset-[63.04%_8.33%_12.5%_79.17%]">
                    <div className="absolute inset-[-17.04%_-33.33%_-17.04%_-33.34%]">
                      <img alt="" className="block max-w-none size-full" src={imgVector4} />
                    </div>
                  </div>
                  <div className="absolute inset-[13.04%_20.8%_54.67%_66.67%]">
                    <div className="absolute inset-[-12.91%_-33.25%]">
                      <img alt="" className="block max-w-none size-full" src={imgVector5} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col font-['Segoe_UI:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-500 text-nowrap">
              <p className="leading-[20px] whitespace-pre">{course.vagas_ocupadas} alunos</p>
            </div>
          </div>
        </div>

        {/* Next Class Date */}
        <div className="box-border content-stretch flex items-center pb-0 pt-[3.5px] px-0 relative shrink-0 w-full">
          <div className="box-border content-stretch flex flex-col h-[16px] items-start pl-0 pr-[8px] py-0 relative shrink-0 w-[24px]">
            <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0 size-[16px]">
              <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[16px]">
                <div className="absolute bottom-3/4 left-[33.33%] right-[66.67%] top-[8.33%]">
                  <div className="absolute inset-[-25%_-0.67px]">
                    <img alt="" className="block max-w-none size-full" src={imgVector6} />
                  </div>
                </div>
                <div className="absolute bottom-3/4 left-[66.67%] right-[33.33%] top-[8.33%]">
                  <div className="absolute inset-[-25%_-0.67px]">
                    <img alt="" className="block max-w-none size-full" src={imgVector6} />
                  </div>
                </div>
                <div className="absolute inset-[16.67%_12.5%_8.33%_12.5%]">
                  <div className="absolute inset-[-5.556%]">
                    <img alt="" className="block max-w-none size-full" src={imgVector7} />
                  </div>
                </div>
                <div className="absolute inset-[41.67%_12.5%_58.33%_12.5%]">
                  <div className="absolute inset-[-0.67px_-5.56%]">
                    <img alt="" className="block max-w-none size-full" src={imgVector8} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col font-['Segoe_UI:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4cb7e0] text-[14px] text-nowrap">
            <p className="leading-[20px] whitespace-pre">Próxima turma: {course.data_formatada}</p>
          </div>
        </div>
      </div>

      {/* Price and CTA */}
      <div className="box-border content-stretch flex items-center justify-center pb-[24px] pt-0 px-[24px] relative shrink-0 w-full">
        <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0">
          <div className="content-stretch flex flex-col items-start relative shrink-0">
            <div className="flex flex-col font-['Segoe_UI:Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#070e2c] text-[24px] text-nowrap">
              <p className="leading-[32px] whitespace-pre">{formatPrice(course.preco)}</p>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-start relative shrink-0">
            <div className="bg-[#4cb7e0] box-border content-stretch flex h-[40px] items-center justify-center pb-[10.5px] pt-[9.5px] px-[16px] relative rounded-[6px] shrink-0 cursor-pointer hover:bg-[#3a9bc1] transition-colors">
              <div className="flex flex-col font-['Segoe_UI:Semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white">
                <p className="leading-[20px] whitespace-pre">Ver Detalhes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Loading skeleton component
function CourseCardSkeleton() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col items-start overflow-clip relative rounded-[8px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 w-full max-w-[434.66px] animate-pulse">
      <div className="h-[192px] bg-gray-200 relative shrink-0 w-full rounded-tl-[8px] rounded-tr-[8px]"></div>
      <div className="box-border content-stretch flex flex-col gap-[12px] items-start pb-[40px] pt-[24px] px-[24px] relative shrink-0 w-full">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="flex gap-4 w-full">
          <div className="h-4 bg-gray-200 rounded flex-1"></div>
          <div className="h-4 bg-gray-200 rounded flex-1"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="flex justify-between items-center w-full">
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-8 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </div>
  )
}

export function FeaturedTrainings() {
  const [hasIntersected, setHasIntersected] = useState(false)
  const { courses, loading, error } = useCourses({ limit: 5, autoFetch: hasIntersected }) // Only fetch when visible
  const { isBrazil, loading: geoLoading } = useGeolocation()
  const [currentIndex, setCurrentIndex] = useState(1) // Start with middle card highlighted
  const [isDesktop, setIsDesktop] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Drag and animation states
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [dragVelocity, setDragVelocity] = useState(0)

  // Refs
  const containerRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout>()
  const lastDragTimeRef = useRef(0)
  const lastDragXRef = useRef(0)

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasIntersected) {
            setHasIntersected(true)
          }
        })
      },
      {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '100px 0px' // Start loading 100px before it's visible
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
  }, [hasIntersected])

  // Check if it's desktop size
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }

    checkIsDesktop()
    window.addEventListener('resize', checkIsDesktop)
    return () => window.removeEventListener('resize', checkIsDesktop)
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (!isDesktop || !isAutoPlaying || courses.length === 0) return

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % courses.length)
    }, 4000) // Change slide every 4 seconds

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isDesktop, isAutoPlaying, courses.length])

  // Drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!isDesktop) return

    setIsDragging(true)
    setIsAutoPlaying(false)
    setDragStart(e.clientX)
    setDragOffset(0)
    lastDragTimeRef.current = Date.now()
    lastDragXRef.current = e.clientX

    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing'
    }
  }, [isDesktop])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !isDesktop) return

    const currentOffset = e.clientX - dragStart
    setDragOffset(currentOffset)

    // Calculate velocity
    const currentTime = Date.now()
    const timeDiff = currentTime - lastDragTimeRef.current
    const xDiff = e.clientX - lastDragXRef.current

    if (timeDiff > 16) { // Throttle to ~60fps
      const velocity = Math.abs(xDiff) / timeDiff
      setDragVelocity(velocity)
      lastDragTimeRef.current = currentTime
      lastDragXRef.current = e.clientX
    }
  }, [isDragging, isDesktop, dragStart])

  const handleMouseUp = useCallback(() => {
    if (!isDragging || !isDesktop) return

    const threshold = 100
    const velocityThreshold = 0.5

    if (Math.abs(dragOffset) > threshold || dragVelocity > velocityThreshold) {
      if (dragOffset < 0) {
        // Dragged left - next slide
        setCurrentIndex((prev) => (prev + 1) % courses.length)
      } else {
        // Dragged right - previous slide
        setCurrentIndex((prev) => (prev - 1 + courses.length) % courses.length)
      }
    }

    setIsDragging(false)
    setDragOffset(0)
    setDragVelocity(0)

    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab'
    }

    // Resume auto-play after a short delay
    setTimeout(() => {
      setIsAutoPlaying(true)
    }, 2000)
  }, [isDragging, isDesktop, dragOffset, dragVelocity, courses.length])

  // Mouse leave handler
  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      handleMouseUp()
    }
  }, [isDragging, handleMouseUp])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 3000)
  }

  // Get visible courses for desktop carousel (3 courses: prev, current, next)
  const getVisibleCourses = () => {
    if (!isDesktop || courses.length === 0) return courses

    const visibleCourses = []
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + courses.length) % courses.length
      visibleCourses.push({
        ...courses[index],
        position: i, // -1: left, 0: center, 1: right
        originalIndex: index
      })
    }
    return visibleCourses
  }

  // Calculate transform based on drag offset
  const getCarouselTransform = () => {
    if (!isDragging) return 'translateX(0px)'

    // Smooth drag with some resistance
    const resistance = 0.6
    const clampedOffset = Math.max(-300, Math.min(300, dragOffset * resistance))
    return `translateX(${clampedOffset}px)`
  }

  // Map course names to their corresponding images
  const getImageAssets = (courseName: string, index: number) => {
    const courseNameLower = courseName.toLowerCase()

    if (courseNameLower.includes('dp induction')) {
      return {
        backgroundImage: imgDpInduction,
        overlayImage: imgDpInduction1
      }
    }
    if (courseNameLower.includes('simulator')) {
      return {
        backgroundImage: imgDpInduction,
        overlayImage: imgDpSimulator
      }
    }
    if (courseNameLower.includes('refresher')) {
      return {
        backgroundImage: imgDpInduction,
        overlayImage: imgDpRefresher
      }
    }

    // Default fallback based on index
    const fallbackImages = [
      { backgroundImage: imgDpInduction, overlayImage: imgDpInduction1 },
      { backgroundImage: imgDpInduction, overlayImage: imgDpSimulator },
      { backgroundImage: imgDpInduction, overlayImage: imgDpRefresher }
    ]

    return fallbackImages[index % fallbackImages.length]
  }

  // Mock ratings for demo
  const getRating = (index: number) => {
    const ratings = [4.9, 4.8, 4.7]
    return ratings[index] || 4.8
  }

  return (
    <div ref={sectionRef} className="bg-gray-50 box-border content-stretch flex flex-col items-start px-4 lg:px-[260px] py-[80px] relative w-full">
      <div className="max-w-[1400px] relative w-full mx-auto">
        {/* Section Header */}
        <div className="content-stretch flex flex-col gap-[16px] items-center mb-[60px]">
          <div className="content-stretch flex flex-col items-center relative shrink-0 w-full">
            <div className="flex flex-col font-['Segoe_UI:Bold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#070e2c] text-[36px] text-center w-full">
              <p className="leading-[40px]">Treinamentos em Destaque</p>
            </div>
          </div>
          <div className="content-stretch flex flex-col items-center max-w-[672px] relative shrink-0 w-full lg:w-[672px]">
            <div className="flex flex-col font-['Segoe_UI:Regular',_sans-serif] justify-center leading-[28px] not-italic relative shrink-0 text-[20px] text-center text-gray-600">
              <p className="mb-0">Explore nossa seleção de treinamentos mais procurados e comece sua</p>
              <p>jornada no mundo marítimo e naval hoje mesmo.</p>
            </div>
          </div>
        </div>

        {/* Course Cards - Desktop Carousel / Mobile Grid */}
        <div className="relative mb-[50px]">
          {!hasIntersected ? (
            // Show skeletons before intersection
            <div className="content-stretch flex flex-col lg:flex-row gap-[32px] items-start justify-center">
              {Array.from({ length: isDesktop ? 3 : 3 }).map((_, index) => (
                <CourseCardSkeleton key={index} />
              ))}
            </div>
          ) : loading ? (
            // Loading skeletons
            <div className="content-stretch flex flex-col lg:flex-row gap-[32px] items-start justify-center">
              {Array.from({ length: isDesktop ? 3 : 3 }).map((_, index) => (
                <CourseCardSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            // Error state
            <div className="w-full text-center py-12">
              <div className="text-red-600 text-lg mb-4">
                Erro ao carregar treinamentos
              </div>
              <p className="text-gray-600">
                Tente novamente mais tarde ou entre em contato conosco.
              </p>
            </div>
          ) : courses.length > 0 ? (
            <>
              {/* Desktop Carousel */}
              {isDesktop ? (
                <div className="relative overflow-hidden">

                  {/* Carousel Container */}
                  <div
                    ref={containerRef}
                    className={`
                      flex items-center justify-center gap-8 px-16 py-8 select-none
                      ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}
                      transition-transform duration-300 ease-out
                    `}
                    style={{
                      transform: getCarouselTransform(),
                      transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                  >
                    {getVisibleCourses().map((course: any) => (
                      <CourseCard
                        key={`${course.curso_id}-${course.position}`}
                        course={course}
                        imageAssets={getImageAssets(course.curso_nome, course.originalIndex)}
                        rating={getRating(course.originalIndex)}
                        isCenter={course.position === 0}
                        className={`
                          ${course.position !== 0 ? 'opacity-70 hover:opacity-90' : ''}
                          ${isDragging ? 'pointer-events-none' : ''}
                          transition-all duration-500 ease-out
                        `}
                      />
                    ))}
                  </div>

                  {/* Enhanced Dots Indicator */}
                  <div className="flex justify-center gap-3 mt-6">
                    {courses.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`
                          relative transition-all duration-400 ease-out
                          ${index === currentIndex
                            ? 'w-8 h-3 bg-[#4cb7e0] rounded-full scale-110'
                            : 'w-3 h-3 bg-gray-300 rounded-full hover:bg-[#4cb7e0] hover:scale-105'
                          }
                        `}
                        aria-label={`Ir para curso ${index + 1}`}
                      >
                        {/* Auto-play progress indicator */}
                        {index === currentIndex && isAutoPlaying && (
                          <div
                            className="absolute inset-0 bg-white rounded-full origin-left"
                            style={{
                              animation: 'shrink 4s linear infinite'
                            }}
                          />
                        )}
                      </button>
                    ))}
                  </div>

                </div>
              ) : (
                // Mobile/Tablet Grid
                <div className="content-stretch flex flex-col lg:flex-row gap-[32px] items-start justify-center">
                  {courses.slice(0, 3).map((course, index) => (
                    <CourseCard
                      key={course.curso_id}
                      course={course}
                      imageAssets={getImageAssets(course.curso_nome, index)}
                      rating={getRating(index)}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            // No courses available
            <div className="w-full text-center py-12">
              <div className="text-gray-600 text-lg mb-4">
                Nenhum treinamento disponível no momento
              </div>
              <p className="text-gray-500">
                Novos treinamentos serão adicionados em breve.
              </p>
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="content-stretch flex flex-col items-center">
          <div className="bg-white box-border content-stretch flex h-[50px] items-center justify-center px-[33px] py-[25px] relative rounded-[6px] shrink-0 cursor-pointer hover:bg-gray-50 transition-colors">
            <div aria-hidden="true" className="absolute border border-[#4cb7e0] border-solid inset-0 pointer-events-none rounded-[6px]" />
            <div className="flex flex-col font-['Segoe_UI:Semibold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4cb7e0] text-[18px] text-center text-nowrap">
              <p className="leading-[28px] whitespace-pre">Ver Todos os Treinamentos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}