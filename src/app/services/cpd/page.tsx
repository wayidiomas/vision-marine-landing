'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { Clock, Star, ChevronDown, CheckCircle, BookOpen } from 'lucide-react'
import Link from 'next/link'

interface CPDProgram {
  id: string
  title: string
  description: string
  category: string
  type: string // 'Programa Completo' | 'Módulo'
  badge?: string // 'Arrais Amador', 'Meteorologia', etc
  duration: string
  modules: number
  rating: number
  price: number
  originalPrice?: number
  image: string
  tags: string[]
}

export default function CPDPage() {
  const { t } = useLanguage()
  const [categoryFilter, setCategoryFilter] = useState('Todas')
  const [typeFilter, setTypeFilter] = useState('Todos')
  const [priceFilter, setPriceFilter] = useState('Todos')

  // Mock data - CPD programs
  const programs: CPDProgram[] = [
    {
      id: '1',
      title: 'CPD Completo - Arrais Amador',
      description: 'Programa completo de desenvolvimento profissional contínuo para renovação da habilitação de Arrais Amador.',
      category: 'Náutica',
      type: 'Programa Completo',
      badge: 'Arrais Amador',
      duration: '12h',
      modules: 8,
      rating: 4.9,
      price: 2499,
      originalPrice: 2999,
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
      tags: ['Programa Completo', 'Arrais Amador']
    },
    {
      id: '2',
      title: 'CPD Módulo - Navegação',
      description: 'Módulo especializado em técnicas de navegação costeira e oceânica.',
      category: 'Náutica',
      type: 'Módulo',
      badge: 'Módulo',
      duration: '3h',
      modules: 2,
      rating: 4.8,
      price: 399,
      originalPrice: 499,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
      tags: ['Módulo', 'Navegação']
    },
    {
      id: '3',
      title: 'CPD Módulo - Segurança',
      description: 'Módulo focado em procedimentos de segurança marítima e prevenção de acidentes.',
      category: 'Segurança',
      type: 'Módulo',
      badge: 'Módulo',
      duration: '2h',
      modules: 2,
      rating: 4.7,
      price: 349,
      originalPrice: 449,
      image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80',
      tags: ['Módulo', 'Segurança']
    },
    {
      id: '4',
      title: 'CPD Completo - Motonauta',
      description: 'Programa completo para renovação da habilitação de Motonauta.',
      category: 'Náutica',
      type: 'Programa Completo',
      badge: 'Motonauta',
      duration: '8h',
      modules: 6,
      rating: 4.8,
      price: 1899,
      originalPrice: 2199,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
      tags: ['Programa Completo', 'Motonauta']
    },
    {
      id: '5',
      title: 'CPD Módulo - Meteorologia',
      description: 'Módulo especializado em meteorologia náutica e interpretação de condições marítimas.',
      category: 'Náutica',
      type: 'Módulo',
      badge: 'Meteorologia',
      duration: '4h',
      modules: 3,
      rating: 4.6,
      price: 299,
      originalPrice: 379,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
      tags: ['Módulo', 'Meteorologia']
    },
    {
      id: '6',
      title: 'CPD Completo - Capitão Amador',
      description: 'Programa completo de desenvolvimento profissional para Capitão Amador.',
      category: 'Náutica',
      type: 'Programa Completo',
      badge: 'Capitão Amador',
      duration: '16h',
      modules: 10,
      rating: 4.9,
      price: 3299,
      originalPrice: 3999,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      tags: ['Programa Completo', 'Capitão Amador']
    }
  ]

  const filteredPrograms = programs.filter(program => {
    if (categoryFilter !== 'Todas' && program.category !== categoryFilter) return false
    if (typeFilter !== 'Todos' && program.type !== typeFilter) return false
    if (priceFilter !== 'Todos') {
      if (priceFilter === 'Até R$ 500' && program.price > 500) return false
      if (priceFilter === 'R$ 500 - R$ 2000' && (program.price < 500 || program.price > 2000)) return false
      if (priceFilter === 'Acima de R$ 2000' && program.price <= 2000) return false
    }
    return true
  })

  const categories = ['Todas', 'Náutica', 'Segurança', 'DP']
  const types = ['Todos', 'Programa Completo', 'Módulo']
  const priceRanges = ['Todos', 'Até R$ 500', 'R$ 500 - R$ 2000', 'Acima de R$ 2000']

  const clearFilters = () => {
    setCategoryFilter('Todas')
    setTypeFilter('Todos')
    setPriceFilter('Todos')
  }

  return (
    <div className="min-h-screen bg-[#070e2c]">
      {/* Hero Section with Wave Effects */}
      <section className="relative min-h-[400px] bg-gradient-to-br from-[#070e2c] to-[#0a1a4a] flex items-center justify-center overflow-hidden py-16">
        {/* Animated Wave Effects - Same as services page */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {/* Shimmer Effect - Top */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4cb7e0]/40 to-transparent"
               style={{ animation: 'pulse-line 6s ease-in-out infinite' }} />

          {/* Wave Top */}
          <svg className="absolute top-0 left-0 w-full h-24 lg:h-32" preserveAspectRatio="none" viewBox="0 0 1440 320" style={{ transform: 'scaleY(-1)', opacity: 0.35, filter: 'drop-shadow(0 0 10px rgba(76, 183, 224, 0.3))' }}>
            <path
              fill="url(#wave-gradient-hero-cpd)"
              d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            >
              <animate attributeName="d" dur="15s" repeatCount="indefinite" values="
                M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,213.3C672,224,768,192,864,170.7C960,149,1056,139,1152,144C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
              " />
            </path>
            <defs>
              <linearGradient id="wave-gradient-hero-cpd" x1="0%" y1="0%" x2="0%" y2="100%">
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
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-['Segoe_UI:Bold',_sans-serif] text-white text-3xl lg:text-5xl mb-4 leading-tight">
            CPD - Desenvolvimento Profissional Contínuo
          </h1>
          <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-300 text-base lg:text-lg mb-8 max-w-2xl mx-auto">
            Mantenha sua habilitação atualizada com nossos programas de desenvolvimento profissional contínuo. Uma alternativa conveniente à inspeção presencial para renovação de habilitações náuticas.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="px-6 py-3 bg-[#4cb7e0] hover:bg-[#3da5cc] text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-[#4cb7e0]/30">
              Monte seu CPD Personalizado
            </button>
            <button className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/30 transition-all">
              Ver Programas Completos
            </button>
          </div>

          {/* Info Card */}
          <div className="inline-flex items-start gap-3 px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg max-w-2xl">
            <CheckCircle className="w-5 h-5 text-[#4cb7e0] flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="text-white font-semibold mb-1">Válido por 5 anos</p>
              <p className="text-gray-300 text-sm">
                Complete o programa CPD até 5 anos e realize o exame no último mês de validade da sua habilitação. Sem CPD? Inspeção presencial obrigatória.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="relative bg-gradient-to-b from-[#0a1a4a] via-[#0a0e1a] to-[#070e2c] py-8 lg:py-16">
        {/* Vertical Wave - Left Side */}
        <div className="absolute left-0 top-0 bottom-0 w-20 lg:w-32 pointer-events-none z-10" style={{ opacity: 0.25, filter: 'drop-shadow(0 0 8px rgba(76, 183, 224, 0.4))' }}>
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1000">
            <path
              fill="url(#wave-vertical-left-cpd)"
              d="M0,0 Q35,120 0,220 T0,420 T0,620 T0,820 T0,1000 L0,1000 L0,0 Z"
            >
              <animate attributeName="d" dur="13s" repeatCount="indefinite" values="
                M0,0 Q35,120 0,220 T0,420 T0,620 T0,820 T0,1000 L0,1000 L0,0 Z;
                M0,0 Q45,170 0,270 T0,470 T0,670 T0,870 T0,1000 L0,1000 L0,0 Z;
                M0,0 Q35,120 0,220 T0,420 T0,620 T0,820 T0,1000 L0,1000 L0,0 Z
              " />
            </path>
            <defs>
              <linearGradient id="wave-vertical-left-cpd" x1="0%" y1="0%" x2="100%" y2="0%">
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
              fill="url(#wave-vertical-right-cpd)"
              d="M100,0 Q65,120 100,220 T100,420 T100,620 T100,820 T100,1000 L100,1000 L100,0 Z"
            >
              <animate attributeName="d" dur="15s" repeatCount="indefinite" values="
                M100,0 Q65,120 100,220 T100,420 T100,620 T100,820 T100,1000 L100,1000 L100,0 Z;
                M100,0 Q55,170 100,270 T100,470 T100,670 T100,870 T100,1000 L100,1000 L100,0 Z;
                M100,0 Q65,120 100,220 T100,420 T100,620 T100,820 T100,1000 L100,1000 L100,0 Z
              " />
            </path>
            <defs>
              <linearGradient id="wave-vertical-right-cpd" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#2d9cdb" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#2d9cdb" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 lg:px-16 relative z-20">
          {/* Filters */}
          <div className="mb-8 lg:mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span className="text-sm font-medium">Filtros:</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Category Filter */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400 font-['Segoe_UI:Regular',_sans-serif]">
                  Categoria de
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

              {/* Type Filter */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400 font-['Segoe_UI:Regular',_sans-serif]">
                  Tipo de Programa
                </label>
                <div className="relative">
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full h-11 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white text-sm font-['Segoe_UI:Regular',_sans-serif] appearance-none cursor-pointer hover:bg-white/15 transition-colors"
                  >
                    {types.map(type => (
                      <option key={type} value={type} className="bg-[#0a0e1a] text-white">{type}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Price Filter */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-400 font-['Segoe_UI:Regular',_sans-serif]">
                  Faixa de Preço
                </label>
                <div className="relative">
                  <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className="w-full h-11 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white text-sm font-['Segoe_UI:Regular',_sans-serif] appearance-none cursor-pointer hover:bg-white/15 transition-colors"
                  >
                    {priceRanges.map(range => (
                      <option key={range} value={range} className="bg-[#0a0e1a] text-white">{range}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm">
                Mostrando {filteredPrograms.length} de {programs.length} programas CPD
              </p>
              <button
                onClick={clearFilters}
                className="text-[#4cb7e0] text-sm font-medium hover:underline"
              >
                Limpar Filtros
              </button>
            </div>
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map(program => (
            <div key={program.id} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden hover:border-[#4cb7e0]/50 hover:shadow-xl hover:shadow-[#4cb7e0]/20 transition-all duration-300 group">
              {/* Program Image */}
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${program.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`px-3 py-1.5 text-white text-xs font-semibold rounded-full shadow-lg ${
                    program.type === 'Programa Completo' ? 'bg-green-600' : 'bg-blue-600'
                  }`}>
                    {program.type}
                  </span>
                  {program.badge && program.badge !== 'Módulo' && (
                    <span className="px-3 py-1.5 bg-[#4cb7e0] text-white text-xs font-semibold rounded-full shadow-lg">
                      {program.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Program Content */}
              <div className="p-6">
                <h3 className="font-['Segoe_UI:Semibold',_sans-serif] text-white text-lg mb-2 line-clamp-1 group-hover:text-[#4cb7e0] transition-colors">
                  {program.title}
                </h3>

                <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-300 text-sm mb-4 line-clamp-2 leading-5">
                  {program.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{program.modules} módulos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                    <span className="text-gray-300">{program.rating}</span>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="font-['Segoe_UI:Bold',_sans-serif] text-white text-2xl">
                      R$ {program.price}
                    </span>
                    {program.originalPrice && (
                      <span className="font-['Segoe_UI:Regular',_sans-serif] text-gray-500 text-sm line-through">
                        R$ {program.originalPrice}
                      </span>
                    )}
                  </div>
                  <Link href={`/services/cpd/${program.id}`}>
                    <button className="bg-[#4cb7e0] hover:bg-[#3da5cc] text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-all hover:shadow-lg hover:shadow-[#4cb7e0]/30 hover:scale-105">
                      Ver Detalhes
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* No results */}
          {filteredPrograms.length === 0 && (
            <div className="text-center py-12 col-span-full">
              <p className="text-gray-400 text-lg">Nenhum programa encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>
        </div>
      </section>
    </div>
  )
}
