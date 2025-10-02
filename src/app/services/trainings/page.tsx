'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Clock, Users, Star, Filter, X, TrendingUp, Award, BookOpen, Check, ChevronRight, PlayCircle, ClipboardList, ShoppingCart, Mail, Calendar, Target, Flag, ChevronLeft } from 'lucide-react'

interface Training {
  id: string
  title: string
  description: string
  image: string
  duration: string
  participants: number
  rating: number
  price: number
  oldPrice?: number
  category: string
  isNew?: boolean
  isPopular?: boolean
  videoPreview?: string
}

const trainings: Training[] = [
  {
    id: 'navegacao-costeira',
    title: 'Navegação Costeira Avançada',
    description: 'Domine as técnicas de navegação costeira com instrumentos modernos e tradicionais.',
    image: '/assets/course-images/dp-induction-bg.png',
    duration: '40h',
    participants: 245,
    rating: 4.8,
    price: 1299,
    oldPrice: 1699,
    category: 'Navegação',
    isNew: true,
    videoPreview: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  {
    id: 'seguranca-maritima',
    title: 'Segurança Marítima Internacional',
    description: 'Aprenda normas e protocolos de segurança marítima internacional.',
    image: '/assets/course-images/dp-induction-bg.png',
    duration: '32h',
    participants: 189,
    rating: 4.9,
    price: 899,
    oldPrice: 1199,
    category: 'Segurança',
    isPopular: true
  },
  {
    id: 'operacoes-portuarias',
    title: 'Operações Portuárias',
    description: 'Compreenda as operações e logística portuária moderna.',
    image: '/assets/course-images/dp-induction-bg.png',
    duration: '56h',
    participants: 156,
    rating: 4.7,
    price: 1599,
    category: 'Operações',
    isNew: true
  },
  {
    id: 'meteorologia-naval',
    title: 'Meteorologia Naval',
    description: 'Estude como interpretar e aplicar informações meteorológicas na navegação.',
    image: '/assets/course-images/dp-induction-bg.png',
    duration: '24h',
    participants: 203,
    rating: 4.6,
    price: 799,
    category: 'Navegação'
  },
  {
    id: 'direito-maritimo',
    title: 'Direito Marítimo',
    description: 'Conheça as leis e a regulamentação das águas e transporte marítimo.',
    image: '/assets/course-images/dp-induction-bg.png',
    duration: '48h',
    participants: 134,
    rating: 4.8,
    price: 1099,
    category: 'Legislação',
    isPopular: true
  },
  {
    id: 'soldagem-naval',
    title: 'Soldagem Naval',
    description: 'Técnicas especializadas de soldagem para embarcações e estruturas navais.',
    image: '/assets/course-images/dp-induction-bg.png',
    duration: '64h',
    participants: 87,
    rating: 4.9,
    price: 1799,
    oldPrice: 2199,
    category: 'Manutenção',
    isNew: true
  },
  {
    id: 'motores-maritimos',
    title: 'Motores Marítimos',
    description: 'Manutenção e operação de motores de embarcações comerciais.',
    image: '/assets/course-images/dp-induction-bg.png',
    duration: '56h',
    participants: 112,
    rating: 4.9,
    price: 1499,
    category: 'Manutenção',
    isNew: true
  },
  {
    id: 'sistemas-eletricos',
    title: 'Sistemas Elétricos Navais',
    description: 'Instalação e manutenção de sistemas elétricos em embarcações.',
    image: '/assets/course-images/dp-induction-bg.png',
    duration: '48h',
    participants: 98,
    rating: 4.7,
    price: 1299,
    oldPrice: 1599,
    category: 'Manutenção'
  },
  {
    id: 'navegacao-radar',
    title: 'Navegação por Radar',
    description: 'Técnicas avançadas de navegação e identificação de alvos utilizando sistemas de radar.',
    image: '/assets/course-images/dp-induction-bg.png',
    duration: '32h',
    participants: 178,
    rating: 4.8,
    price: 1199,
    oldPrice: 1499,
    category: 'Navegação'
  },
  {
    id: 'navegacao-astronomica',
    title: 'Navegação Astronômica',
    description: 'Domine a arte tradicional de navegar pelas estrelas e corpos celestes.',
    image: '/assets/course-images/dp-induction-bg.png',
    duration: '40h',
    participants: 142,
    rating: 4.9,
    price: 1399,
    category: 'Navegação',
    isPopular: true
  },
  {
    id: 'cartografia-nautica',
    title: 'Cartografia Náutica',
    description: 'Interpretação avançada de cartas náuticas e planejamento de rotas seguras.',
    image: '/assets/course-images/dp-induction-bg.png',
    duration: '28h',
    participants: 201,
    rating: 4.7,
    price: 899,
    oldPrice: 1199,
    category: 'Navegação'
  },
  {
    id: 'navegacao-eletronica',
    title: 'Navegação Eletrônica (ECDIS)',
    description: 'Operação e gerenciamento de sistemas eletrônicos de cartas náuticas.',
    image: '/assets/course-images/dp-induction-bg.png',
    duration: '36h',
    participants: 167,
    rating: 4.8,
    price: 1299,
    oldPrice: 1599,
    category: 'Navegação',
    isNew: true
  },
  {
    id: 'navegacao-aguas-restritas',
    title: 'Navegação em Águas Restritas',
    description: 'Manobras e técnicas para navegação segura em canais, portos e áreas confinadas.',
    image: '/assets/course-images/dp-induction-bg.png',
    duration: '30h',
    participants: 156,
    rating: 4.7,
    price: 999,
    category: 'Navegação'
  }
]

const categories = ['Todas', 'Navegação', 'Segurança', 'Operações', 'Legislação', 'Manutenção']
const priceRanges = [
  { label: 'Todos os preços', min: 0, max: Infinity },
  { label: 'Até R$ 1000', min: 0, max: 1000 },
  { label: 'R$ 1000 - R$ 1500', min: 1000, max: 1500 },
  { label: 'Acima de R$ 1500', min: 1500, max: Infinity }
]
const durations = ['Todas', 'Até 30h', '30h - 50h', 'Acima de 50h']

export default function TrainingsPage() {
  const searchParams = useSearchParams()
  const courseTrainingId = searchParams?.get('course_training')

  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [selectedPriceRange, setSelectedPriceRange] = useState(0)
  const [selectedDuration, setSelectedDuration] = useState('Todas')
  const [showFilters, setShowFilters] = useState(true)

  // Se houver um ID no query param, mostrar página de detalhes
  if (courseTrainingId) {
    const training = trainings.find(t => t.id === courseTrainingId)
    if (training) {
      return <TrainingDetailsPage training={training} />
    }
  }

  const filteredTrainings = trainings.filter(training => {
    // Category filter
    if (selectedCategory !== 'Todas' && training.category !== selectedCategory) {
      return false
    }

    // Price filter
    const priceRange = priceRanges[selectedPriceRange]
    if (training.price < priceRange.min || training.price > priceRange.max) {
      return false
    }

    // Duration filter
    if (selectedDuration !== 'Todas') {
      const hours = parseInt(training.duration)
      if (selectedDuration === 'Até 30h' && hours > 30) return false
      if (selectedDuration === '30h - 50h' && (hours < 30 || hours > 50)) return false
      if (selectedDuration === 'Acima de 50h' && hours <= 50) return false
    }

    return true
  })

  const clearFilters = () => {
    setSelectedCategory('Todas')
    setSelectedPriceRange(0)
    setSelectedDuration('Todas')
  }

  const hasActiveFilters = selectedCategory !== 'Todas' || selectedPriceRange !== 0 || selectedDuration !== 'Todas'

  return (
    <div className="min-h-screen bg-[#070e2c]">
      {/* Hero Section with Wave Effects */}
      <section className="relative min-h-[400px] md:min-h-[500px] bg-gradient-to-br from-[#070e2c] to-[#0a1a4a] flex items-center justify-center overflow-hidden py-12 md:py-16">
        {/* Animated Wave Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4cb7e0]/40 to-transparent"
               style={{ animation: 'pulse-line 6s ease-in-out infinite' }} />

          <svg className="absolute top-0 left-0 w-full h-24 lg:h-32" preserveAspectRatio="none" viewBox="0 0 1440 320" style={{ transform: 'scaleY(-1)', opacity: 0.35, filter: 'drop-shadow(0 0 10px rgba(76, 183, 224, 0.3))' }}>
            <path
              fill="url(#wave-gradient-trainings)"
              d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            >
              <animate attributeName="d" dur="15s" repeatCount="indefinite" values="
                M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,213.3C672,224,768,192,864,170.7C960,149,1056,139,1152,144C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
              " />
            </path>
            <defs>
              <linearGradient id="wave-gradient-trainings" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4cb7e0" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#2d9cdb" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0a0e1a" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: i % 3 === 0 ? '4px' : '2px',
                  height: i % 3 === 0 ? '4px' : '2px',
                  background: i % 2 === 0 ? 'rgba(76, 183, 224, 0.6)' : 'rgba(86, 204, 242, 0.5)',
                  boxShadow: i % 3 === 0 ? '0 0 8px rgba(76, 183, 224, 0.8)' : '0 0 4px rgba(76, 183, 224, 0.8)',
                  filter: 'blur(1px)',
                  left: `${10 + (i * 10)}%`,
                  top: `${40 + (i % 3) * 15}%`,
                  animation: `float-particle ${6 + i * 1.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
          <h1 className="font-bold text-white text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-4 leading-tight">
            Nossos Treinamentos
          </h1>
          <p className="text-gray-300 text-sm md:text-base lg:text-lg mb-6 md:mb-10 max-w-3xl mx-auto px-2">
            Descubra nossa ampla seleção de Treinamentos especializados em área marítima e naval,
            desenvolvidos por profissionais experientes do setor.
          </p>

          {/* Info Cards */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col items-center gap-3 px-5 py-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/15 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#4cb7e0]/20 flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#4cb7e0]" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{trainings.length}</div>
                <div className="text-sm text-gray-400">Treinamentos</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 px-5 py-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/15 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#4cb7e0]/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-[#4cb7e0]" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">1200+</div>
                <div className="text-sm text-gray-400">Alunos</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 px-5 py-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/15 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#4cb7e0]/20 flex items-center justify-center">
                <Star className="w-6 h-6 text-[#4cb7e0]" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.8</div>
                <div className="text-sm text-gray-400">Avaliação</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 px-5 py-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/15 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#4cb7e0]/20 flex items-center justify-center">
                <Filter className="w-6 h-6 text-[#4cb7e0]" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{categories.length - 1}</div>
                <div className="text-sm text-gray-400">Categorias</div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes pulse-line {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
          }
          @keyframes float-particle {
            0%, 100% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(-10px) translateX(-10px); }
            75% { transform: translateY(-30px) translateX(5px); }
          }
        `}</style>
      </section>

      {/* Filters Section */}
      <section className="px-4 md:px-6 pb-6 md:pb-8 -mt-8 md:-mt-16 relative z-30">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-2xl">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-white font-medium text-sm"
              >
                <Filter className="w-4 h-4" />
                {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
              </button>
            </div>

            {/* Filters */}
            <div className={`grid grid-cols-1 lg:grid-cols-4 gap-4 ${showFilters ? 'block' : 'hidden lg:grid'}`}>
              {/* Category Filter */}
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">
                  Área de Atuação
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 md:px-4 py-2 text-sm md:text-base text-white focus:outline-none focus:ring-2 focus:ring-[#4cb7e0]"
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-[#070e2c]">
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">
                  Faixa de Preço
                </label>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(Number(e.target.value))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 md:px-4 py-2 text-sm md:text-base text-white focus:outline-none focus:ring-2 focus:ring-[#4cb7e0]"
                >
                  {priceRanges.map((range, index) => (
                    <option key={index} value={index} className="bg-[#070e2c]">
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration Filter */}
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">
                  Duração
                </label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 md:px-4 py-2 text-sm md:text-base text-white focus:outline-none focus:ring-2 focus:ring-[#4cb7e0]"
                >
                  {durations.map(duration => (
                    <option key={duration} value={duration} className="bg-[#070e2c]">
                      {duration}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  disabled={!hasActiveFilters}
                  className={`w-full px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                    hasActiveFilters
                      ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                      : 'bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed'
                  }`}
                >
                  <X className="w-3 md:w-4 h-3 md:h-4" />
                  Limpar Filtros
                </button>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-3 md:mt-4 text-xs md:text-sm text-gray-400">
              Mostrando {filteredTrainings.length} de {trainings.length} Treinamentos
            </div>
          </div>
        </div>
      </section>

      {/* Trainings Grid */}
      <section className="px-4 md:px-6 pb-12 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {filteredTrainings.map(training => (
              <div
                key={training.id}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-[#4cb7e0] hover:shadow-2xl hover:shadow-[#4cb7e0]/30 hover:scale-105 transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-44 md:h-52 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4cb7e0]/30 to-[#070e2c]/60 z-10 group-hover:from-[#4cb7e0]/20 group-hover:to-[#070e2c]/40 transition-all duration-300" />
                  <Image
                    src={training.image}
                    alt={training.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {training.isNew && (
                    <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-green-500 to-green-600 text-white text-[10px] md:text-xs font-bold px-2.5 md:px-4 py-1 md:py-1.5 rounded-full shadow-lg animate-pulse">
                      Novo
                    </div>
                  )}
                  {training.isPopular && (
                    <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-red-600 to-red-700 text-white text-[10px] md:text-xs font-bold px-2.5 md:px-4 py-1 md:py-1.5 rounded-full shadow-lg flex items-center gap-1">
                      <TrendingUp className="w-3 md:w-3.5 h-3 md:h-3.5" />
                      Popular
                    </div>
                  )}
                  <div className="absolute top-3 right-3 z-20 bg-[#070e2c]/80 backdrop-blur-sm text-white text-[10px] md:text-xs font-semibold px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-white/20">
                    {training.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                  <div>
                    <h3 className="text-base md:text-xl font-bold text-white mb-1.5 md:mb-2 group-hover:text-[#4cb7e0] transition-colors leading-tight">
                      {training.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-400 line-clamp-2 leading-relaxed">
                      {training.description}
                    </p>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-400">
                    <div className="flex items-center gap-1 md:gap-1.5 bg-white/5 px-2 md:px-3 py-1 md:py-1.5 rounded-lg">
                      <Clock className="w-3 md:w-4 h-3 md:h-4 text-[#4cb7e0]" />
                      <span>{training.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-1.5 bg-white/5 px-2 md:px-3 py-1 md:py-1.5 rounded-lg">
                      <Users className="w-3 md:w-4 h-3 md:h-4 text-[#4cb7e0]" />
                      <span>{training.participants}</span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-1.5 bg-white/5 px-2 md:px-3 py-1 md:py-1.5 rounded-lg">
                      <Star className="w-3 md:w-4 h-3 md:h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-white font-semibold">{training.rating}</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/10"></div>

                  {/* Price and CTA */}
                  <div className="flex items-end justify-between gap-3">
                    <div className="flex flex-col">
                      {training.oldPrice ? (
                        <>
                          <div className="text-[10px] md:text-xs text-gray-500 line-through mb-0.5">
                            De R$ {training.oldPrice}
                          </div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xl md:text-3xl font-bold text-white">
                              R$ {training.price}
                            </span>
                            <span className="text-xs md:text-sm text-green-400 font-semibold">
                              -{Math.round(((training.oldPrice - training.price) / training.oldPrice) * 100)}%
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xl md:text-3xl font-bold text-white">
                            R$ {training.price}
                          </span>
                        </div>
                      )}
                    </div>
                    <Link href={`/services/trainings?course_training=${training.id}`}>
                      <button className="bg-gradient-to-r from-[#4cb7e0] to-[#3da5cc] hover:from-[#3da5cc] hover:to-[#2d8fb5] text-white px-3 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-semibold transition-all shadow-lg hover:shadow-[#4cb7e0]/50 hover:scale-105 whitespace-nowrap">
                        Ver Detalhes
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredTrainings.length === 0 && (
            <div className="text-center py-12 md:py-20 px-4">
              <div className="text-gray-400 text-sm md:text-lg mb-4">
                Nenhum treinamento encontrado com os filtros selecionados.
              </div>
              <button
                onClick={clearFilters}
                className="bg-[#4cb7e0] hover:bg-[#3da5cc] text-white px-5 md:px-6 py-2.5 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all"
              >
                Limpar Filtros
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

// Training Details Page Component
function TrainingDetailsPage({ training }: { training: Training }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Ler aba da URL ou usar 'visao-geral' como padrão
  const tabFromUrl = searchParams?.get('aba') || 'visao-geral'
  const [activeTab, setActiveTab] = useState(tabFromUrl)
  const [expandedModule, setExpandedModule] = useState<number | null>(null)
  const [couponCode, setCouponCode] = useState('')
  const [hasCoupon, setHasCoupon] = useState(false)
  const [showVideoPreview, setShowVideoPreview] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [desktopStep, setDesktopStep] = useState(0)

  // Função para mudar de aba e atualizar URL
  const changeTab = (tab: string) => {
    setActiveTab(tab)
    const params = new URLSearchParams(searchParams?.toString())
    params.set('aba', tab)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  useEffect(() => {
    const handleScroll = () => {
      const steps = document.querySelectorAll('.roadmap-step-container')
      const windowHeight = window.innerHeight
      const scrollTop = window.scrollY

      let closestIndex = 0
      let closestDistance = Infinity

      steps.forEach((step, index) => {
        const rect = step.getBoundingClientRect()
        const elementCenter = rect.top + rect.height / 2
        const viewportCenter = windowHeight / 2
        const distance = Math.abs(elementCenter - viewportCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      setActiveStep(closestIndex)
    }

    // Initial check
    setTimeout(handleScroll, 100)

    // Listen to scroll
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-play for desktop carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setDesktopStep((prev) => {
        if (prev >= howItWorks.length - 1) {
          return 0 // Loop back to start
        }
        return prev + 1
      })
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [])

  const learningPoints = [
    'Planejamento de rota náutica completa',
    'Interpretação de cartas náuticas complexas',
    'Planejamento de rota náutica avançada',
    'Uso eficiente de GPS e sistemas ECDIS',
    'Navegação de segurança em navegação',
    'Gestão de situações de emergência',
    'Acesso vitalício ao curso',
    'Certificado Internacional após Curso',
    'Suporte via chat ou e-mail',
    'Atualizações constantes',
    'Material complementar em PDF',
    'Exercícios práticos interativos',
    'Simulação de navegação 3D',
    'Consultoria individual de até 2h'
  ]

  const courseIncludes = [
    'Acesso vitalício',
    'Atualizações gratuitas',
    'Material complementar',
    'Certificado de conclusão',
    'Suporte técnico',
    'Acesso mobile'
  ]

  const howItWorks = [
    {
      step: 1,
      title: 'Etapa 1',
      description: 'Escolha o treinamento e veja as datas, horários, conteúdo e requisitos.',
      icon: <ClipboardList className="w-8 h-8 text-white" />
    },
    {
      step: 2,
      title: 'Etapa 2',
      description: 'Selecione a turma no painel de inscrição e confirme o pagamento.',
      icon: <ShoppingCart className="w-8 h-8 text-white" />
    },
    {
      step: 3,
      title: 'Etapa 3',
      description: 'Receba por e-mail as instruções (presencial/online) e materiais.',
      icon: <Mail className="w-8 h-8 text-white" />
    },
    {
      step: 4,
      title: 'Etapa 4',
      description: 'Participe das aulas e atividades na plataforma e conclua a turma.',
      icon: <Calendar className="w-8 h-8 text-white" />
    },
    {
      step: 5,
      title: 'Etapa 5',
      description: 'Conclua o treinamento e receba certificado quando aplicável. Nosso time apoia-á disponível.',
      icon: <Target className="w-8 h-8 text-white" />
    }
  ]

  const relatedTrainings = trainings.filter(t =>
    t.id !== training.id && t.category === training.category
  ).slice(0, 3)

  const curriculum = [
    {
      id: 1,
      title: 'Fundamentos da Navegação Costeira',
      lessons: [
        { title: 'Bem-vindo ao curso de Navegação Costeira', duration: '05:30' },
        { title: 'Princípios básicos de navegação marítima', duration: '18:45' },
        { title: 'História e evolução da navegação costeira', duration: '22:15' },
        { title: 'Terminologia náutica essencial - Parte 1', duration: '15:20' },
        { title: 'Terminologia náutica essencial - Parte 2', duration: '16:40' },
        { title: 'Introdução às cartas náuticas', duration: '25:30' },
        { title: 'Tipos de embarcações e suas características', duration: '19:10' },
        { title: 'Quiz: Fundamentos da Navegação', duration: '08:00' }
      ]
    },
    {
      id: 2,
      title: 'Instrumentos de Navegação Modernos',
      lessons: [
        { title: 'GPS: Funcionamento e aplicações', duration: '20:45' },
        { title: 'Sistemas de posicionamento global avançados', duration: '18:30' },
        { title: 'Radar marítimo: Princípios básicos', duration: '22:15' },
        { title: 'Operação do radar em navegação costeira', duration: '25:40' },
        { title: 'Plotadores eletrônicos de navegação', duration: '19:20' },
        { title: 'Integração de sistemas de navegação', duration: '17:55' },
        { title: 'Sistema AIS (Automatic Identification System)', duration: '16:30' },
        { title: 'Comunicação VHF e DSC', duration: '14:45' },
        { title: 'Ecosonda e profundímetros', duration: '12:20' },
        { title: 'Bússola eletrônica vs magnética', duration: '15:10' },
        { title: 'Manutenção preventiva de equipamentos', duration: '18:00' },
        { title: 'Exercício prático: Configuração de GPS', duration: '10:30' }
      ]
    },
    {
      id: 3,
      title: 'Cartas Náuticas e Plotagem',
      lessons: [
        { title: 'Introdução às cartas náuticas eletrônicas', duration: '16:20' },
        { title: 'Leitura e interpretação de cartas náuticas', duration: '28:45' },
        { title: 'Símbolos e abreviaturas náuticas', duration: '22:30' },
        { title: 'Notações de profundidade e sondagens', duration: '19:15' },
        { title: 'Escalas e projeções cartográficas', duration: '20:40' },
        { title: 'Técnicas de plotagem manual', duration: '24:20' },
        { title: 'Plotagem eletrônica de rotas', duration: '18:55' },
        { title: 'Marcação de waypoints estratégicos', duration: '15:30' },
        { title: 'Correção de rumos magnéticos', duration: '21:10' },
        { title: 'Cálculo de distâncias e ETAs', duration: '17:25' },
        { title: 'Identificação de perigos à navegação', duration: '19:40' },
        { title: 'Atualizações de cartas náuticas', duration: '14:15' },
        { title: 'Prática: Plotagem de rota completa', duration: '25:00' },
        { title: 'Prática: Identificação de símbolos', duration: '12:30' },
        { title: 'Quiz: Cartas e Plotagem', duration: '08:00' }
      ]
    },
    {
      id: 4,
      title: 'Navegação por GPS e ECDIS',
      lessons: [
        { title: 'Introdução ao sistema ECDIS', duration: '18:30' },
        { title: 'Interface e funcionalidades do ECDIS', duration: '24:45' },
        { title: 'Configuração inicial do ECDIS', duration: '16:20' },
        { title: 'Criação e edição de waypoints', duration: '19:40' },
        { title: 'Planejamento de rotas no ECDIS', duration: '26:15' },
        { title: 'Monitoramento de navegação em tempo real', duration: '22:30' },
        { title: 'Alarmes e alertas de segurança', duration: '17:50' },
        { title: 'Configuração de zonas de perigo', duration: '15:25' },
        { title: 'Backup e redundância de navegação', duration: '20:10' },
        { title: 'Integração GPS-ECDIS-Piloto automático', duration: '23:40' },
        { title: 'Atualizações de cartas eletrônicas', duration: '14:30' },
        { title: 'Troubleshooting comum em ECDIS', duration: '18:55' },
        { title: 'Navegação em águas restritas com ECDIS', duration: '21:20' },
        { title: 'Registro de dados de viagem', duration: '16:45' },
        { title: 'Conformidade com regulamentações SOLAS', duration: '19:15' },
        { title: 'Prática: Simulação completa ECDIS', duration: '28:30' },
        { title: 'Prática: Configuração de alarmes', duration: '12:00' },
        { title: 'Avaliação: Módulo ECDIS', duration: '10:00' }
      ]
    },
    {
      id: 5,
      title: 'Técnicas de Navegação Costeira',
      lessons: [
        { title: 'Fundamentos da navegação visual', duration: '22:30' },
        { title: 'Identificação de pontos de referência', duration: '20:15' },
        { title: 'Técnica de marcações simultâneas', duration: '24:40' },
        { title: 'Navegação por alinhamentos', duration: '18:50' },
        { title: 'Método das distâncias medidas', duration: '21:25' },
        { title: 'Navegação por enfiamentos', duration: '19:30' },
        { title: 'Pilotagem em canais estreitos', duration: '26:15' },
        { title: 'Navegação em águas rasas', duration: '23:10' },
        { title: 'Técnicas de ancoragem segura', duration: '25:45' },
        { title: 'Aproximação e atracação em marinas', duration: '22:20' },
        { title: 'Navegação noturna costeira', duration: '20:55' },
        { title: 'Interpretação de faróis e balizamento', duration: '18:40' },
        { title: 'Navegação com correntes e marés', duration: '24:30' },
        { title: 'Cálculo de deriva e abatimento', duration: '21:15' },
        { title: 'Manobras de homem ao mar', duration: '19:25' },
        { title: 'Navegação em condições de visibilidade reduzida', duration: '23:50' },
        { title: 'Prática: Navegação por marcações', duration: '28:00' },
        { title: 'Prática: Pilotagem em canal', duration: '25:30' },
        { title: 'Simulação: Ancoragem de emergência', duration: '16:40' },
        { title: 'Simulação: Aproximação noturna', duration: '18:20' },
        { title: 'Quiz: Técnicas de Navegação', duration: '10:00' },
        { title: 'Revisão do módulo', duration: '15:00' }
      ]
    },
    {
      id: 6,
      title: 'Situações de Emergência',
      lessons: [
        { title: 'Plano de emergência a bordo', duration: '20:30' },
        { title: 'Procedimentos de abandono de embarcação', duration: '24:15' },
        { title: 'Navegação em condições adversas de tempo', duration: '26:40' },
        { title: 'Navegação em tempestades', duration: '22:50' },
        { title: 'Falha de motor: Procedimentos', duration: '18:25' },
        { title: 'Falha de leme: Navegação de emergência', duration: '21:10' },
        { title: 'Perda de sistemas de navegação', duration: '19:35' },
        { title: 'Navegação apenas com bússola magnética', duration: '23:20' },
        { title: 'Comunicação de emergência VHF', duration: '17:45' },
        { title: 'Sinais de socorro e chamadas Mayday', duration: '16:30' },
        { title: 'Uso de EPIRBs e PLBs', duration: '15:55' },
        { title: 'Primeiros socorros a bordo', duration: '25:40' },
        { title: 'Combate a incêndio em embarcações', duration: '22:15' },
        { title: 'Controle de avarias e vazamentos', duration: '20:50' },
        { title: 'Simulação: Falha múltipla de sistemas', duration: '28:30' },
        { title: 'Avaliação: Resposta a emergências', duration: '12:00' }
      ]
    },
    {
      id: 7,
      title: 'Regulamentações e Segurança',
      lessons: [
        { title: 'Introdução ao RIPEAM (COLREG)', duration: '18:30' },
        { title: 'Regras de governo e navegação', duration: '24:45' },
        { title: 'Luzes e marcas de navegação', duration: '22:15' },
        { title: 'Sinais sonoros e luminosos', duration: '19:40' },
        { title: 'Balizamento marítimo internacional', duration: '26:20' },
        { title: 'Sistema IALA de balizamento', duration: '21:30' },
        { title: 'Equipamentos de segurança obrigatórios', duration: '20:15' },
        { title: 'Documentação náutica exigida', duration: '17:50' },
        { title: 'Inspeções e certificações', duration: '16:25' },
        { title: 'Avaliação: Regulamentações', duration: '10:00' }
      ]
    },
    {
      id: 8,
      title: 'Simulações Práticas',
      lessons: [
        { title: 'Introdução ao simulador de navegação', duration: '15:20' },
        { title: 'Simulação 1: Navegação costeira diurna', duration: '35:40' },
        { title: 'Simulação 2: Navegação noturna', duration: '32:15' },
        { title: 'Simulação 3: Navegação em mau tempo', duration: '38:20' },
        { title: 'Caso prático: Entrada em porto comercial', duration: '28:45' },
        { title: 'Caso prático: Ancoragem de emergência', duration: '26:30' },
        { title: 'Exercício final: Navegação completa', duration: '45:00' },
        { title: 'Avaliação final do curso', duration: '20:00' }
      ]
    }
  ]

  const totalModules = curriculum.length
  const totalLessons = curriculum.reduce((acc, mod) => acc + mod.lessons.length, 0)

  // Calculate total duration in minutes
  const totalMinutes = curriculum.reduce((acc, mod) => {
    const moduleMins = mod.lessons.reduce((sum, lesson) => {
      const [mins, secs] = lesson.duration.split(':').map(Number)
      return sum + mins + (secs / 60)
    }, 0)
    return acc + moduleMins
  }, 0)
  const totalHours = Math.floor(totalMinutes / 60)

  return (
    <div className="min-h-screen bg-[#070e2c]">
      {/* Hero Section with Wave Effects */}
      <section className="relative min-h-[600px] md:min-h-[700px] bg-gradient-to-br from-[#070e2c] to-[#0a1a4a] flex items-center overflow-hidden">
        {/* Animated Wave Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4cb7e0]/40 to-transparent"
               style={{ animation: 'pulse-line 6s ease-in-out infinite' }} />

          <svg className="absolute top-0 left-0 w-full h-24 lg:h-32" preserveAspectRatio="none" viewBox="0 0 1440 320" style={{ transform: 'scaleY(-1)', opacity: 0.35, filter: 'drop-shadow(0 0 10px rgba(76, 183, 224, 0.3))' }}>
            <path
              fill="url(#wave-gradient-details)"
              d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            >
              <animate attributeName="d" dur="15s" repeatCount="indefinite" values="
                M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,213.3C672,224,768,192,864,170.7C960,149,1056,139,1152,144C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
              " />
            </path>
            <defs>
              <linearGradient id="wave-gradient-details" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4cb7e0" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#2d9cdb" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0a0e1a" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: i % 3 === 0 ? '4px' : '2px',
                  height: i % 3 === 0 ? '4px' : '2px',
                  background: i % 2 === 0 ? 'rgba(76, 183, 224, 0.6)' : 'rgba(86, 204, 242, 0.5)',
                  boxShadow: i % 3 === 0 ? '0 0 8px rgba(76, 183, 224, 0.8)' : '0 0 4px rgba(76, 183, 224, 0.8)',
                  filter: 'blur(1px)',
                  left: `${5 + (i * 8)}%`,
                  top: `${30 + (i % 4) * 12}%`,
                  animation: `float-particle ${6 + i * 1.2}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  Treinamento
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(training.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
                  ))}
                  <span className="text-sm ml-2 text-gray-300">{training.rating} ({training.participants} avaliações)</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                {training.title}
              </h1>

              <p className="text-lg md:text-xl text-[#4cb7e0] mb-4 font-medium">
                Domine as técnicas modernas de navegação marítima
              </p>

              <p className="text-sm md:text-base text-gray-400 mb-8 leading-relaxed">
                {training.description} Este treinamento abrange desde conceitos básicos até técnicas avançadas, preparando você para situações reais de navegação costeira e oceânica.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <div className="text-center bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 hover:border-[#4cb7e0]/50 transition-all">
                  <Clock className="w-6 h-6 text-[#4cb7e0] mx-auto mb-2" />
                  <div className="text-2xl font-bold">{training.duration}</div>
                  <div className="text-xs text-gray-400">Duração</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 hover:border-[#4cb7e0]/50 transition-all">
                  <Users className="w-6 h-6 text-[#4cb7e0] mx-auto mb-2" />
                  <div className="text-2xl font-bold">{training.participants}</div>
                  <div className="text-xs text-gray-400">Alunos</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 hover:border-[#4cb7e0]/50 transition-all">
                  <BookOpen className="w-6 h-6 text-[#4cb7e0] mx-auto mb-2" />
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-xs text-gray-400">Módulos</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 hover:border-[#4cb7e0]/50 transition-all">
                  <Award className="w-6 h-6 text-[#4cb7e0] mx-auto mb-2" />
                  <div className="text-2xl font-bold">Sim</div>
                  <div className="text-xs text-gray-400">Certificado</div>
                </div>
              </div>
            </div>

            {/* Right Video Preview */}
            <div className="relative">
              <div className="relative h-72 md:h-96 lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl shadow-[#4cb7e0]/20 border border-white/10 group">
                <Image
                  src={training.image}
                  alt={training.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#070e2c]/40 to-[#4cb7e0]/20" />

                {/* Play Button */}
                <button
                  onClick={() => setShowVideoPreview(true)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-md border-4 border-white rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all group shadow-2xl"
                >
                  <PlayCircle className="w-12 h-12 md:w-16 md:h-16 text-white" />
                </button>

                {/* Badge */}
                <div className="absolute top-4 right-4 bg-[#4cb7e0] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-white/20">
                  📹 Prévia do Curso
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes pulse-line {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
          }
          @keyframes float-particle {
            0%, 100% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(-10px) translateX(-10px); }
            75% { transform: translateY(-30px) translateX(5px); }
          }
        `}</style>
      </section>

      {/* Tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex overflow-x-auto gap-6 md:gap-8 scrollbar-hide">
            {[
              { id: 'visao-geral', label: 'Visão Geral' },
              { id: 'curriculo', label: 'Currículo' },
              { id: 'instrutor', label: 'Instrutor' },
              { id: 'requisitos', label: 'Requisitos' },
              { id: 'avaliacoes', label: 'Avaliações' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => changeTab(tab.id)}
                className={`py-4 px-2 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'border-[#4cb7e0] text-[#4cb7e0]'
                    : 'border-transparent text-gray-700 hover:text-[#070e2c] hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2">
              {/* Visão Geral Tab */}
              {activeTab === 'visao-geral' && (
                <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-sm">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#070e2c] mb-4">Sobre o Treinamento</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed text-base">
                    Neste treinamento aprofundado, você desenvolverá suas habilidades de navegação costeira com instrumentos modernos e tradicionais, incluindo uso de GPS, radar e equipamentos básicos de emergência. O curso aborda estratégias práticas de planejamento de rota, navegação visual, interpretação de cartas náuticas e muito mais.
                  </p>

                  <h3 className="text-xl font-bold text-[#070e2c] mb-4 mt-8">O que você aprenderá:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {learningPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                        <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-800 font-medium">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Currículo Tab */}
              {activeTab === 'curriculo' && (
                <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-sm">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#070e2c] mb-2">Conteúdo do Curso</h2>
                  <p className="text-gray-600 mb-8">
                    {totalModules} módulos • {totalLessons} aulas • {totalHours}h de conteúdo
                  </p>

                  <div className="space-y-4">
                    {curriculum.map((module) => (
                      <div
                        key={module.id}
                        className="border border-gray-200 rounded-xl overflow-hidden hover:border-[#4cb7e0] transition-all"
                      >
                        {/* Module Header */}
                        <button
                          onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                          className="w-full flex items-center gap-4 p-5 bg-white hover:bg-gray-50 transition-colors"
                        >
                          {/* Module Number Circle */}
                          <div className="w-12 h-12 bg-gradient-to-br from-[#4cb7e0] to-[#3da5cc] rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                            {module.id}
                          </div>

                          {/* Module Info */}
                          <div className="flex-1 text-left">
                            <h3 className="font-bold text-[#070e2c] mb-1 text-base">{module.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4 text-[#4cb7e0]" />
                                <span>{(() => {
                                  const totalMins = module.lessons.reduce((sum, lesson) => {
                                    const [mins, secs] = lesson.duration.split(':').map(Number)
                                    return sum + mins + (secs / 60)
                                  }, 0)
                                  const hours = Math.floor(totalMins / 60)
                                  const mins = Math.round(totalMins % 60)
                                  return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`
                                })()}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <BookOpen className="w-4 h-4 text-[#4cb7e0]" />
                                <span>{module.lessons.length} aulas</span>
                              </div>
                            </div>
                          </div>

                          {/* Expand Icon */}
                          <ChevronRight
                            className={`w-5 h-5 text-gray-400 transition-transform ${
                              expandedModule === module.id ? 'rotate-90' : ''
                            }`}
                          />
                        </button>

                        {/* Module Content (Expanded) */}
                        {expandedModule === module.id && (
                          <div className="px-5 pb-5 bg-gray-50 border-t border-gray-200">
                            <div className="pt-4 space-y-1">
                              {module.lessons.map((lesson, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between py-3 hover:bg-white rounded-lg px-3 transition-colors group"
                                >
                                  <div className="flex items-center gap-3 flex-1">
                                    <div className="w-6 h-6 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center shrink-0 group-hover:border-[#4cb7e0] transition-colors">
                                      <div className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-[#4cb7e0] transition-colors" />
                                    </div>
                                    <span className="text-sm text-gray-700 group-hover:text-[#4cb7e0] transition-colors font-medium">{lesson.title}</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>{lesson.duration}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instrutor Tab */}
              {activeTab === 'instrutor' && (
                <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-sm">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#070e2c] mb-8">Sobre o Instrutor</h2>

                  {/* Instrutor Card */}
                  <div className="flex items-start gap-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
                    {/* Foto do Instrutor */}
                    <div className="relative w-24 h-24 rounded-full shrink-0 border-4 border-white shadow-lg bg-gradient-to-br from-[#4cb7e0] to-[#3da5cc] flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">JS</span>
                    </div>

                    {/* Info do Instrutor */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#070e2c] mb-2">Capitão João Silva</h3>
                      <p className="text-gray-700 leading-relaxed">
                        Mais de 20 anos de experiência em navegação comercial e militar. Formado pela Escola Naval, com especialização em navegação oceânica e instrução marítima.
                      </p>

                      {/* Stats do Instrutor */}
                      <div className="grid grid-cols-3 gap-6 mt-6 pt-6 border-t border-gray-200">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#4cb7e0]">20+</div>
                          <div className="text-xs text-gray-600 mt-1">Anos de Experiência</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#4cb7e0]">3.500+</div>
                          <div className="text-xs text-gray-600 mt-1">Alunos Treinados</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#4cb7e0]">4.9</div>
                          <div className="text-xs text-gray-600 mt-1">Avaliação Média</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Qualificações */}
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-[#070e2c] mb-4">Qualificações e Certificações</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { title: 'Escola Naval do Brasil', subtitle: 'Bacharel em Ciências Navais' },
                        { title: 'IMO - Model Course', subtitle: 'Dynamic Positioning Operator' },
                        { title: 'STCW Advanced Training', subtitle: 'Bridge Resource Management' },
                        { title: 'Certificação ECDIS', subtitle: 'Generic & Type Specific' }
                      ].map((qual, index) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:border-[#4cb7e0] transition-colors">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#4cb7e0] to-[#3da5cc] rounded-lg flex items-center justify-center shrink-0">
                            <Award className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-[#070e2c] text-sm">{qual.title}</h4>
                            <p className="text-xs text-gray-600 mt-0.5">{qual.subtitle}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Experiência Profissional */}
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-[#070e2c] mb-4">Experiência Profissional</h3>
                    <div className="space-y-4">
                      {[
                        {
                          role: 'Instrutor Sênior de Navegação',
                          company: 'Vision Marine Academy',
                          period: '2018 - Presente',
                          description: 'Responsável pelo desenvolvimento e ministração de cursos de navegação costeira e oceânica.'
                        },
                        {
                          role: 'Comandante de Navio Mercante',
                          company: 'Companhia de Navegação Internacional',
                          period: '2010 - 2018',
                          description: 'Comando de navios petroleiros e porta-contêineres em rotas internacionais.'
                        },
                        {
                          role: 'Oficial de Navegação',
                          company: 'Marinha do Brasil',
                          period: '2003 - 2010',
                          description: 'Atuação em operações navais e missões de patrulha costeira.'
                        }
                      ].map((exp, index) => (
                        <div key={index} className="pl-6 border-l-2 border-[#4cb7e0]">
                          <h4 className="font-bold text-[#070e2c]">{exp.role}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                            <span className="font-medium">{exp.company}</span>
                            <span>•</span>
                            <span>{exp.period}</span>
                          </div>
                          <p className="text-sm text-gray-700 mt-2">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Requisitos Tab */}
              {activeTab === 'requisitos' && (
                <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-sm">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#070e2c] mb-8">Requisitos</h2>

                  {/* Pré-requisitos */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-[#070e2c]">Pré-requisitos:</h3>
                    <div className="space-y-3">
                      {[
                        'Conhecimento básico de navegação',
                        'Experiência mínima de 6 meses no mar',
                        'Certificado de Marinheiro Auxiliar'
                      ].map((req, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#4cb7e0]/10 flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 text-[#4cb7e0]" />
                          </div>
                          <span className="text-gray-700">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Avaliações Tab */}
              {activeTab === 'avaliacoes' && (
                <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-sm">
                  {/* Header com Rating Geral */}
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#070e2c] mb-3">Avaliações dos Alunos</h2>
                    <div className="flex items-center gap-2">
                      {/* Estrelas */}
                      <div className="flex items-center">
                        {[1, 2, 3, 4].map((star) => (
                          <Star key={star} className="w-5 h-5 fill-[#fbbf24] text-[#fbbf24]" />
                        ))}
                        <Star className="w-5 h-5 fill-[#fbbf24] text-[#fbbf24]" style={{ clipPath: 'inset(0 20% 0 0)' }} />
                      </div>
                      <span className="text-lg font-semibold text-[#070e2c] ml-2">4.8</span>
                      <span className="text-gray-500">(89 avaliações)</span>
                    </div>
                  </div>

                  {/* Lista de Avaliações */}
                  <div className="space-y-6">
                    {/* Review 1 - Carlos Silva */}
                    <div className="pb-6 border-b border-gray-200">
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4cb7e0] to-[#3da5cc] flex items-center justify-center shrink-0">
                          <span className="text-lg font-bold text-white">CS</span>
                        </div>

                        {/* Review Content */}
                        <div className="flex-1">
                          <div className="mb-2">
                            <h4 className="font-semibold text-gray-900">Carlos Silva</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star key={star} className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">15/01/2024</span>
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed">
                            Excelente curso! As explicações são muito claras e os exercícios práticos ajudam muito na fixação do conteúdo.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Review 2 - Maria Santos */}
                    <div className="pb-6 border-b border-gray-200">
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shrink-0">
                          <span className="text-lg font-bold text-white">MS</span>
                        </div>

                        {/* Review Content */}
                        <div className="flex-1">
                          <div className="mb-2">
                            <h4 className="font-semibold text-gray-900">Maria Santos</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex">
                                {[1, 2, 3, 4].map((star) => (
                                  <Star key={star} className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                                ))}
                                <Star className="w-4 h-4 text-gray-300" />
                              </div>
                              <span className="text-sm text-gray-500">10/01/2024</span>
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed">
                            Muito bom curso, instrutor experiente. Única sugestão seria ter mais simulações práticas.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Review 3 - João Oliveira */}
                    <div>
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shrink-0">
                          <span className="text-lg font-bold text-white">JO</span>
                        </div>

                        {/* Review Content */}
                        <div className="flex-1">
                          <div className="mb-2">
                            <h4 className="font-semibold text-gray-900">João Oliveira</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star key={star} className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">08/01/2024</span>
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed">
                            Superou minhas expectativas! Conteúdo atualizado e muito relevante para a prática profissional.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 md:p-8 sticky top-32 shadow-lg">
                {/* Price */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  {training.oldPrice ? (
                    <>
                      <div className="text-sm text-gray-500 line-through mb-2">
                        R$ {training.oldPrice}
                      </div>
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-5xl font-extrabold text-[#070e2c]">
                          R$ {training.price}
                        </span>
                        <span className="bg-green-100 text-green-700 font-bold text-sm px-3 py-1 rounded-full">
                          -{Math.round(((training.oldPrice - training.price) / training.oldPrice) * 100)}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                        <span className="text-amber-600 text-xs font-medium">⚡ Oferta por tempo limitado!</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-5xl font-extrabold text-[#070e2c]">
                      R$ {training.price}
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <button className="w-full bg-gradient-to-r from-[#4cb7e0] to-[#3da5cc] hover:from-[#3da5cc] hover:to-[#2d8fb5] text-white py-4 rounded-xl font-bold text-lg mb-3 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all">
                  Comprar Agora
                </button>

                <div className="text-center text-sm text-gray-600 mb-6">
                  💼 Descontos para grupos de 4+ pessoas
                </div>

                {/* Coupon */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <button
                    onClick={() => setHasCoupon(!hasCoupon)}
                    className="flex items-center gap-2 text-sm font-medium text-[#4cb7e0] hover:text-[#3da5cc] transition-colors"
                  >
                    <span>🎫</span>
                    Tem um cupom de desconto?
                  </button>
                  {hasCoupon && (
                    <div className="flex gap-2 mt-3">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Código do cupom"
                        className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#4cb7e0] transition-colors"
                      />
                      <button className="px-5 py-2 bg-[#4cb7e0] text-white rounded-lg text-sm font-bold hover:bg-[#3da5cc] transition-all">
                        Aplicar
                      </button>
                    </div>
                  )}
                </div>

                {/* Course Includes */}
                <div>
                  <h4 className="font-bold text-[#070e2c] mb-4 text-lg">Este curso inclui:</h4>
                  <div className="space-y-3">
                    {courseIncludes.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-sm text-gray-800 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#070e2c] mb-4">Como funciona</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comece sua jornada de aprendizado em 5 etapas simples
            </p>
          </div>

          {/* Desktop: Interactive Carousel */}
          <div className="hidden md:block relative">
            {/* Progress Line */}
            <div className="absolute top-32 left-0 right-0 h-1 bg-gray-200 z-0">
              <div
                className="h-full bg-gradient-to-r from-[#4cb7e0] to-[#3da5cc] transition-all duration-500"
                style={{ width: `${((desktopStep + 1) / howItWorks.length) * 100}%` }}
              />
            </div>

            {/* Steps Container */}
            <div className="relative overflow-hidden px-20">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(calc(-${desktopStep * 100}% + ${desktopStep * 2}rem))`
                }}
              >
                {howItWorks.map((step, index) => (
                  <div
                    key={step.step}
                    className="flex-shrink-0 w-full px-2"
                  >
                    <div
                      className={`mx-auto max-w-md transition-all duration-500 ${
                        index === desktopStep
                          ? 'scale-100 opacity-100'
                          : 'scale-90 opacity-40'
                      }`}
                    >
                      {/* Icon Circle on Line */}
                      <div className="flex justify-center mb-6">
                        <div className={`w-24 h-24 bg-gradient-to-br from-[#4cb7e0] to-[#3da5cc] rounded-full flex items-center justify-center shadow-2xl border-4 border-white transition-all ${
                          index === desktopStep ? 'scale-110' : 'scale-100'
                        }`}>
                          {index === howItWorks.length - 1 ? (
                            <Flag className="w-12 h-12 text-white" />
                          ) : (
                            step.icon
                          )}
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-xl text-center">
                        <div className="inline-block px-4 py-1 bg-[#4cb7e0]/10 rounded-full mb-4">
                          <span className="text-sm font-bold text-[#4cb7e0]">{step.title}</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-base">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={() => setDesktopStep(Math.max(0, desktopStep - 1))}
              disabled={desktopStep === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#4cb7e0] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed group z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => setDesktopStep(Math.min(howItWorks.length - 1, desktopStep + 1))}
              disabled={desktopStep === howItWorks.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#4cb7e0] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed group z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-3 mt-8">
              {howItWorks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setDesktopStep(index)}
                  className={`transition-all ${
                    index === desktopStep
                      ? 'w-12 h-3 bg-[#4cb7e0]'
                      : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                  } rounded-full`}
                />
              ))}
            </div>
          </div>

          {/* Mobile: Roadmap Zig-Zag */}
          <div className="md:hidden relative bg-gradient-to-br from-gray-50 to-white py-8">
            {/* Central Road Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#4cb7e0] to-[#3da5cc] -translate-x-1/2" />

            <div className="space-y-6 px-4">
              {howItWorks.map((step, index) => (
                <div
                  key={step.step}
                  className={`roadmap-step-container relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                  data-step-index={index}
                >
                  {/* Circular Card */}
                  <div
                    className={`relative transition-all duration-500 ${index % 2 === 0 ? 'mr-auto' : 'ml-auto'} w-[75%]`}
                    style={{
                      opacity: activeStep === index ? 1 : 0.7,
                      transform: activeStep === index ? 'scale(1.02)' : 'scale(1)'
                    }}
                  >
                    <div className="bg-white rounded-3xl p-6 border-3 border-[#4cb7e0]/20 shadow-lg hover:shadow-2xl transition-all relative">
                      {/* Icon Circle */}
                      <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-[#4cb7e0] to-[#3da5cc] rounded-full flex items-center justify-center shadow-xl border-4 border-white z-20">
                        {index === howItWorks.length - 1 ? (
                          <Flag className="w-10 h-10 text-white" />
                        ) : (
                          step.icon
                        )}
                      </div>

                      {/* Content */}
                      <div className="pl-20">
                        <h3 className="font-bold text-[#070e2c] mb-2 text-base">{step.title}</h3>
                        <p className="text-xs text-gray-600 leading-relaxed">{step.description}</p>
                      </div>

                      {/* Connector to road */}
                      <div
                        className={`absolute top-1/2 -translate-y-1/2 w-8 h-0.5 bg-[#4cb7e0] ${index % 2 === 0 ? '-right-8' : '-left-8'}`}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Finish Flag at bottom */}
              <div className="flex justify-center pt-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#4cb7e0] to-[#3da5cc] rounded-full flex items-center justify-center shadow-xl animate-bounce">
                  <Flag className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>

          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </div>
      </section>

      {/* Related Trainings */}
      {relatedTrainings.length > 0 && (
        <section className="py-16 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[#070e2c] mb-3">Treinamentos Relacionados</h2>
              <p className="text-gray-600 text-lg">Outros treinamentos que podem interessar você</p>
            </div>

            {/* Infinite Carousel */}
            <div className="relative">
              <div className="overflow-hidden">
                <div className="flex gap-8 animate-scroll-slow">
                  {/* Duplicate items for infinite scroll effect */}
                  {[...relatedTrainings, ...relatedTrainings, ...relatedTrainings].map((related, index) => (
                    <Link
                      key={`${related.id}-${index}`}
                      href={`/services/trainings?course_training=${related.id}`}
                      className="flex-shrink-0 w-[350px]"
                    >
                      <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#4cb7e0] hover:shadow-2xl transition-all group">
                        <div className="relative h-52">
                          <Image
                            src={related.image}
                            alt={related.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>
                        <div className="p-6">
                          <h3 className="font-bold text-[#070e2c] text-lg mb-2 group-hover:text-[#4cb7e0] transition-colors leading-tight">
                            {related.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{related.description}</p>

                          <div className="flex items-center gap-4 mb-5 text-xs text-gray-600">
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4 text-[#4cb7e0]" />
                              <span className="font-medium">{related.duration}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Users className="w-4 h-4 text-[#4cb7e0]" />
                              <span className="font-medium">{related.participants}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{related.rating}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <div className="text-3xl font-extrabold text-[#070e2c]">
                              R$ {related.price}
                            </div>
                            <button className="bg-gradient-to-r from-[#4cb7e0] to-[#3da5cc] hover:from-[#3da5cc] hover:to-[#2d8fb5] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg hover:shadow-xl transition-all">
                              Ver Curso
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <style jsx>{`
            @keyframes scroll-slow {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(calc(-350px * ${relatedTrainings.length} - 2rem * ${relatedTrainings.length}));
              }
            }
            .animate-scroll-slow {
              animation: scroll-slow 30s linear infinite;
            }
            .animate-scroll-slow:hover {
              animation-play-state: paused;
            }
          `}</style>
        </section>
      )}

      {/* Video Preview Modal */}
      {showVideoPreview && training.videoPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={() => setShowVideoPreview(false)}>
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setShowVideoPreview(false)}
              className="absolute -top-12 right-0 text-white hover:text-[#4cb7e0] transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Video Player */}
            <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
              <video
                className="w-full"
                controls
                autoPlay
                src={training.videoPreview}
              >
                Seu navegador não suporta reprodução de vídeo.
              </video>
            </div>

            {/* Video Info */}
            <div className="mt-4 text-white">
              <h3 className="text-xl font-bold mb-2">{training.title} - Prévia</h3>
              <p className="text-gray-300 text-sm">{training.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
