'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { Clock, Star, ChevronDown } from 'lucide-react'
import Link from 'next/link'

interface ElearningCourse {
  id: string
  title: string
  description: string
  category: string
  language: string
  duration: string
  rating: number
  price: number
  originalPrice?: number
  image: string
  tags: string[]
}

export default function ElearningPage() {
  const { t } = useLanguage()
  const [categoryFilter, setCategoryFilter] = useState('Todas')
  const [languageFilter, setLanguageFilter] = useState('Todos')

  // Mock data - E-learning courses
  const courses: ElearningCourse[] = [
    {
      id: '1',
      title: 'Regras de Ouro DP',
      description: 'Domine as técnicas de navegação costeira com instrumentos modernos e tradicionais.',
      category: 'DP',
      language: 'PT-BR',
      duration: '40h',
      rating: 4.8,
      price: 1299,
      originalPrice: 1599,
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
      tags: ['DP', 'PT-BR', 'E-learning']
    },
    {
      id: '2',
      title: 'Fundamentos de DP',
      description: 'Aprenda os conceitos fundamentais de Dynamic Positioning para iniciantes.',
      category: 'DP',
      language: 'PT-BR',
      duration: '30h',
      rating: 4.9,
      price: 999,
      originalPrice: 1299,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
      tags: ['DP', 'PT-BR', 'E-learning']
    },
    {
      id: '3',
      title: 'Operações DP Avançadas',
      description: 'Curso avançado para operadores experientes em sistemas de posicionamento dinâmico.',
      category: 'DP',
      language: 'EN',
      duration: '50h',
      rating: 4.7,
      price: 1599,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
      tags: ['DP', 'EN', 'E-learning']
    },
    {
      id: '4',
      title: 'Segurança em DP',
      description: 'Aprenda as melhores práticas de segurança em operações de posicionamento dinâmico.',
      category: 'Segurança',
      language: 'PT-BR',
      duration: '25h',
      rating: 4.8,
      price: 899,
      image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80',
      tags: ['Segurança', 'PT-BR', 'E-learning']
    },
    {
      id: '5',
      title: 'CPD Personalizado - Básico',
      description: 'Desenvolvimento profissional contínuo adaptado às suas necessidades específicas.',
      category: 'CPD',
      language: 'PT-BR',
      duration: '20h',
      rating: 4.9,
      price: 799,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
      tags: ['CPD', 'PT-BR', 'E-learning']
    },
    {
      id: '6',
      title: 'CPD Personalizado - Avançado',
      description: 'Treinamento avançado para profissionais que buscam excelência operacional.',
      category: 'CPD',
      language: 'EN',
      duration: '40h',
      rating: 5.0,
      price: 1799,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      tags: ['CPD', 'EN', 'E-learning']
    }
  ]

  const filteredCourses = courses.filter(course => {
    if (categoryFilter !== 'Todas' && course.category !== categoryFilter) return false
    if (languageFilter !== 'Todos' && course.language !== languageFilter) return false
    return true
  })

  const categories = ['Todas', 'DP', 'CPD', 'Segurança', 'Náutica']
  const languages = ['Todos', 'PT-BR', 'EN', 'ES']

  return (
    <div className="min-h-screen bg-[#070e2c]">
      {/* Hero Section with Wave Effects */}
      <section className="relative h-[280px] bg-gradient-to-br from-[#070e2c] to-[#0a1a4a] flex items-center justify-center overflow-hidden">
        {/* Animated Wave Effects - Same as services page */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {/* Shimmer Effect - Top */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4cb7e0]/40 to-transparent"
               style={{ animation: 'pulse-line 6s ease-in-out infinite' }} />

          {/* Wave Top */}
          <svg className="absolute top-0 left-0 w-full h-24 lg:h-32" preserveAspectRatio="none" viewBox="0 0 1440 320" style={{ transform: 'scaleY(-1)', opacity: 0.35, filter: 'drop-shadow(0 0 10px rgba(76, 183, 224, 0.3))' }}>
            <path
              fill="url(#wave-gradient-hero-1)"
              d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            >
              <animate attributeName="d" dur="15s" repeatCount="indefinite" values="
                M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,213.3C672,224,768,192,864,170.7C960,149,1056,139,1152,144C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
              " />
            </path>
            <defs>
              <linearGradient id="wave-gradient-hero-1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4cb7e0" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#2d9cdb" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#0a0e1a" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>

          {/* Floating Particles */}
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
        <div className="relative z-20 text-center px-4 max-w-3xl mx-auto">
          <h1 className="font-['Segoe_UI:Bold',_sans-serif] text-white text-4xl lg:text-5xl mb-4 leading-tight">
            E-learning
          </h1>
          <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-300 text-lg lg:text-xl">
            Todos os cursos online e CPD
          </p>
        </div>
      </section>

      {/* Courses Section */}
      <section className="relative bg-gradient-to-b from-[#0a1a4a] via-[#0a0e1a] to-[#070e2c] py-8 lg:py-16">
        {/* Vertical Wave - Left Side */}
        <div className="absolute left-0 top-0 bottom-0 w-20 lg:w-32 pointer-events-none z-10" style={{ opacity: 0.25, filter: 'drop-shadow(0 0 8px rgba(76, 183, 224, 0.4))' }}>
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1000">
            <path
              fill="url(#wave-vertical-left-elearning)"
              d="M0,0 Q35,120 0,220 T0,420 T0,620 T0,820 T0,1000 L0,1000 L0,0 Z"
            >
              <animate attributeName="d" dur="13s" repeatCount="indefinite" values="
                M0,0 Q35,120 0,220 T0,420 T0,620 T0,820 T0,1000 L0,1000 L0,0 Z;
                M0,0 Q45,170 0,270 T0,470 T0,670 T0,870 T0,1000 L0,1000 L0,0 Z;
                M0,0 Q35,120 0,220 T0,420 T0,620 T0,820 T0,1000 L0,1000 L0,0 Z
              " />
            </path>
            <defs>
              <linearGradient id="wave-vertical-left-elearning" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2d9cdb" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#2d9cdb" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Vertical Wave - Right Side */}
        <div className="absolute right-0 top-0 bottom-0 w-20 lg:w-32 pointer-events-none z-10" style={{ opacity: 0.25, filter: 'drop-shadow(0 0 8px rgba(76, 183, 224, 0.4))' }}>
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1000">
            <path
              fill="url(#wave-vertical-right-elearning)"
              d="M100,0 Q65,120 100,220 T100,420 T100,620 T100,820 T100,1000 L100,1000 L100,0 Z"
            >
              <animate attributeName="d" dur="15s" repeatCount="indefinite" values="
                M100,0 Q65,120 100,220 T100,420 T100,620 T100,820 T100,1000 L100,1000 L100,0 Z;
                M100,0 Q55,170 100,270 T100,470 T100,670 T100,870 T100,1000 L100,1000 L100,0 Z;
                M100,0 Q65,120 100,220 T100,420 T100,620 T100,820 T100,1000 L100,1000 L100,0 Z
              " />
            </path>
            <defs>
              <linearGradient id="wave-vertical-right-elearning" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#2d9cdb" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#2d9cdb" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 lg:px-16 relative z-20">
          {/* Filters */}
          <div className="mb-8 lg:mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              {/* Category Filter */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400 font-['Segoe_UI:Regular',_sans-serif]">
                  Categoria
                </label>
                <div className="relative">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full h-11 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white text-sm font-['Segoe_UI:Regular',_sans-serif] appearance-none cursor-pointer hover:bg-white/15 transition-colors"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat} className="bg-[#0a0e1a] text-white">{cat}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Language Filter */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400 font-['Segoe_UI:Regular',_sans-serif]">
                  Idioma
                </label>
                <div className="relative">
                  <select
                    value={languageFilter}
                    onChange={(e) => setLanguageFilter(e.target.value)}
                    className="w-full h-11 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white text-sm font-['Segoe_UI:Regular',_sans-serif] appearance-none cursor-pointer hover:bg-white/15 transition-colors"
                  >
                    {languages.map(lang => (
                      <option key={lang} value={lang} className="bg-[#0a0e1a] text-white">{lang}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:border-[#4cb7e0]/50 hover:shadow-xl hover:shadow-[#4cb7e0]/20 transition-all duration-300 group">
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${course.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-[#4cb7e0] text-white text-xs font-semibold rounded-full shadow-lg">
                    {course.category}
                  </span>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <h3 className="font-['Segoe_UI:Semibold',_sans-serif] text-white text-lg mb-2 line-clamp-1 group-hover:text-[#4cb7e0] transition-colors">
                  {course.title}
                </h3>

                <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-300 text-sm mb-4 line-clamp-2 leading-5">
                  {course.description}
                </p>

                {/* Tags */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  {course.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        tag === 'E-learning'
                          ? 'bg-[#2cb0ed]/20 text-[#4cb7e0] border border-[#4cb7e0]/30'
                          : tag.includes('PT') || tag.includes('EN') || tag.includes('ES')
                          ? 'bg-white/10 text-gray-300 border border-white/20'
                          : 'bg-white/5 text-gray-400 border border-white/10'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                    <span className="text-gray-300">{course.rating}</span>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="font-['Segoe_UI:Bold',_sans-serif] text-white text-2xl">
                      R$ {course.price}
                    </span>
                    {course.originalPrice && (
                      <span className="font-['Segoe_UI:Regular',_sans-serif] text-gray-500 text-sm line-through">
                        R$ {course.originalPrice}
                      </span>
                    )}
                  </div>
                  <Link href={`/services/elearning/${course.id}`}>
                    <button className="bg-[#4cb7e0] hover:bg-[#3da5cc] text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all hover:shadow-lg hover:shadow-[#4cb7e0]/30 hover:scale-105">
                      Ver Detalhes
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

          {/* No results */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-12 col-span-full">
              <p className="text-gray-400 text-lg">Nenhum curso encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
