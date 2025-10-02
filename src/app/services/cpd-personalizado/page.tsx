'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/language-context'
import { Clock, CheckCircle, Calendar, Award, BookOpen, Users, Navigation, Shield, Cloud, Anchor, Map, Waves } from 'lucide-react'
import Link from 'next/link'

interface CPDModule {
  id: string
  title: string
  description: string
  category: string
  badge: string
  duration: string
  price: number
  image: string
  icon: any
}

export default function CPDPersonalizadoPage() {
  const { t } = useLanguage()
  const [selectedModules, setSelectedModules] = useState<string[]>([])

  const modules: CPDModule[] = [
    {
      id: '1',
      title: 'Navegação Costeira',
      description: 'Técnicas avançadas de navegação costeira e instrumental.',
      category: 'Navegação',
      badge: 'Navegação Costeira',
      duration: '5h',
      price: 349,
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
      icon: Navigation
    },
    {
      id: '2',
      title: 'Segurança Marítima',
      description: 'Procedimentos de segurança e prevenção de acidentes em operações marítimas.',
      category: 'Segurança',
      badge: 'Segurança Marítima',
      duration: '4h',
      price: 399,
      image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80',
      icon: Shield
    },
    {
      id: '3',
      title: 'Meteorologia Náutica',
      description: 'Interpretação de condições meteorológicas e impacto nas operações.',
      category: 'Meteorologia',
      badge: 'Meteorologia',
      duration: '3h',
      price: 349,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
      icon: Cloud
    },
    {
      id: '4',
      title: 'Regulamentação Marítima',
      description: 'Leis e regulamentos da navegação e convenções marítimas.',
      category: 'Legislação',
      badge: 'Regulamentação',
      duration: '4h',
      price: 399,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
      icon: BookOpen
    },
    {
      id: '5',
      title: 'Motores e Sistemas',
      description: 'Fundamentos e manutenção de motores e sistemas de propulsão.',
      category: 'Técnico',
      badge: 'Motores',
      duration: '6h',
      price: 499,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      icon: Anchor
    },
    {
      id: '6',
      title: 'Navegação Oceânica',
      description: 'Técnicas especializadas em navegação em alto-mar.',
      category: 'Navegação',
      badge: 'Oceânica',
      duration: '5h',
      price: 599,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
      icon: Waves
    },
    {
      id: '7',
      title: 'Comunicações Marítimas',
      description: 'Sistemas de comunicação e emergências náuticas.',
      category: 'Comunicação',
      badge: 'Comunicações',
      duration: '3h',
      price: 429,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      icon: Users
    },
    {
      id: '8',
      title: 'Primeiros Socorros Náuticos',
      description: 'Atendimento de emergências e primeiros socorros a bordo.',
      category: 'Segurança',
      badge: 'Primeiros Socorros',
      duration: '4h',
      price: 379,
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
      icon: Shield
    }
  ]

  const toggleModule = (moduleId: string) => {
    setSelectedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  const selectedModuleDetails = modules.filter(m => selectedModules.includes(m.id))
  const subtotal = selectedModuleDetails.reduce((sum, m) => sum + m.price, 0)

  // Desconto progressivo: 5% para 3+ módulos, 10% para 5+ módulos, 15% para 7+ módulos
  const getDiscount = () => {
    if (selectedModules.length >= 7) return 0.15
    if (selectedModules.length >= 5) return 0.10
    if (selectedModules.length >= 3) return 0.05
    return 0
  }

  const discount = subtotal * getDiscount()
  const total = subtotal - discount

  return (
    <div className="min-h-screen bg-[#070e2c]">
      {/* Hero Section with Wave Effects */}
      <section className="relative min-h-[450px] bg-gradient-to-br from-[#070e2c] to-[#0a1a4a] flex items-center justify-center overflow-hidden py-16">
        {/* Animated Wave Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4cb7e0]/40 to-transparent"
               style={{ animation: 'pulse-line 6s ease-in-out infinite' }} />

          <svg className="absolute top-0 left-0 w-full h-24 lg:h-32" preserveAspectRatio="none" viewBox="0 0 1440 320" style={{ transform: 'scaleY(-1)', opacity: 0.35, filter: 'drop-shadow(0 0 10px rgba(76, 183, 224, 0.3))' }}>
            <path
              fill="url(#wave-gradient-hero-custom)"
              d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            >
              <animate attributeName="d" dur="15s" repeatCount="indefinite" values="
                M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,213.3C672,224,768,192,864,170.7C960,149,1056,139,1152,144C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,138.7C960,117,1056,107,1152,112C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z
              " />
            </path>
            <defs>
              <linearGradient id="wave-gradient-hero-custom" x1="0%" y1="0%" x2="0%" y2="100%">
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
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <h1 className="font-['Segoe_UI:Bold',_sans-serif] text-white text-3xl lg:text-5xl mb-4 leading-tight">
            CPD Personalizado
          </h1>
          <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-300 text-base lg:text-lg mb-10 max-w-3xl mx-auto">
            Monte seu programa de desenvolvimento profissional contínuo selecionando apenas os módulos que você precisa. Ideal para quem já possui certificações de outras instituições.
          </p>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col items-center gap-3 px-5 py-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/15 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#4cb7e0]/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-[#4cb7e0]" />
              </div>
              <div className="text-center">
                <p className="text-white font-semibold text-base mb-1">Módulos Escolhidos</p>
                <p className="text-gray-400 text-sm">Escolha apenas o que precisa</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 px-5 py-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/15 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#4cb7e0]/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-[#4cb7e0]" />
              </div>
              <div className="text-center">
                <p className="text-white font-semibold text-base mb-1">Flexibilidade</p>
                <p className="text-gray-400 text-sm">Ajustado ao seu cronograma</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 px-5 py-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/15 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#4cb7e0]/20 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#4cb7e0]" />
              </div>
              <div className="text-center">
                <p className="text-white font-semibold text-base mb-1">5 Anos</p>
                <p className="text-gray-400 text-sm">Tempo para completar</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 px-5 py-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/15 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#4cb7e0]/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-[#4cb7e0]" />
              </div>
              <div className="text-center">
                <p className="text-white font-semibold text-base mb-1">Certificado</p>
                <p className="text-gray-400 text-sm">Renovação garantida</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative bg-gradient-to-b from-[#0a1a4a] via-[#0a0e1a] to-[#070e2c] py-12 lg:py-20">
        {/* Vertical Waves */}
        <div className="absolute left-0 top-0 bottom-0 w-20 lg:w-32 pointer-events-none z-10" style={{ opacity: 0.25, filter: 'drop-shadow(0 0 8px rgba(76, 183, 224, 0.4))' }}>
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1000">
            <path fill="url(#wave-vertical-left-custom)" d="M0,0 Q35,120 0,220 T0,420 T0,620 T0,820 T0,1000 L0,1000 L0,0 Z">
              <animate attributeName="d" dur="13s" repeatCount="indefinite" values="M0,0 Q35,120 0,220 T0,420 T0,620 T0,820 T0,1000 L0,1000 L0,0 Z;M0,0 Q45,170 0,270 T0,470 T0,670 T0,870 T0,1000 L0,1000 L0,0 Z;M0,0 Q35,120 0,220 T0,420 T0,620 T0,820 T0,1000 L0,1000 L0,0 Z" />
            </path>
            <defs>
              <linearGradient id="wave-vertical-left-custom" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2d9cdb" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#2d9cdb" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-20 lg:w-32 pointer-events-none z-10" style={{ opacity: 0.25, filter: 'drop-shadow(0 0 8px rgba(76, 183, 224, 0.4))' }}>
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1000">
            <path fill="url(#wave-vertical-right-custom)" d="M100,0 Q65,120 100,220 T100,420 T100,620 T100,820 T100,1000 L100,1000 L100,0 Z">
              <animate attributeName="d" dur="15s" repeatCount="indefinite" values="M100,0 Q65,120 100,220 T100,420 T100,620 T100,820 T100,1000 L100,1000 L100,0 Z;M100,0 Q55,170 100,270 T100,470 T100,670 T100,870 T100,1000 L100,1000 L100,0 Z;M100,0 Q65,120 100,220 T100,420 T100,620 T100,820 T100,1000 L100,1000 L100,0 Z" />
            </path>
            <defs>
              <linearGradient id="wave-vertical-right-custom" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#2d9cdb" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#2d9cdb" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 lg:px-16 relative z-20">
          <div className="mb-8">
            <h2 className="font-['Segoe_UI:Bold',_sans-serif] text-white text-2xl lg:text-3xl mb-3">
              Monte seu CPD Personalizado
            </h2>
            <p className="text-gray-400 text-base">
              Selecione apenas os módulos que você precisa para completar seu desenvolvimento profissional contínuo. Quanto mais módulos você escolher, maior o desconto!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Modules Grid */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-gray-400 text-sm font-medium">Módulos Disponíveis</h3>
                <button className="text-[#4cb7e0] text-sm hover:underline">
                  Filtrar por categoria
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {modules.map((module) => {
                  const isSelected = selectedModules.includes(module.id)
                  const Icon = module.icon

                  return (
                    <div
                      key={module.id}
                      onClick={() => toggleModule(module.id)}
                      className={`relative bg-white/5 backdrop-blur-sm rounded-xl border-2 overflow-hidden cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? 'border-[#4cb7e0] shadow-xl shadow-[#4cb7e0]/30'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      {/* Selected Badge */}
                      {isSelected && (
                        <div className="absolute top-3 right-3 z-10">
                          <div className="w-8 h-8 rounded-full bg-[#4cb7e0] flex items-center justify-center shadow-lg">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      )}

                      {/* Image */}
                      <div className="relative h-32 overflow-hidden">
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 hover:scale-110"
                          style={{ backgroundImage: `url(${module.image})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                        <div className="absolute bottom-3 left-3">
                          <span className="px-3 py-1 bg-[#4cb7e0]/90 text-white text-xs font-semibold rounded-full">
                            {module.badge}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h4 className="font-['Segoe_UI:Semibold',_sans-serif] text-white text-base mb-2 line-clamp-1">
                          {module.title}
                        </h4>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-tight">
                          {module.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>{module.duration}</span>
                          </div>
                          <span className="font-['Segoe_UI:Bold',_sans-serif] text-white text-lg">
                            R$ {module.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Sidebar Summary - Sticky */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6">
                  <h3 className="font-['Segoe_UI:Bold',_sans-serif] text-white text-xl mb-5 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#4cb7e0]" />
                    Seu CPD Personalizado
                  </h3>

                  {selectedModuleDetails.length > 0 ? (
                    <>
                      {/* Selected Modules List */}
                      <div className="space-y-3 mb-5 max-h-64 overflow-y-auto">
                        {selectedModuleDetails.map(module => (
                          <div key={module.id} className="flex items-start justify-between gap-3 text-sm">
                            <span className="text-gray-300 flex-1">{module.title}</span>
                            <span className="text-white font-semibold">R$ {module.price}</span>
                          </div>
                        ))}
                      </div>

                      {/* Divider */}
                      <div className="border-t border-white/20 my-4" />

                      {/* Pricing */}
                      <div className="space-y-2 mb-5">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Subtotal ({selectedModules.length} módulos)</span>
                          <span className="text-gray-300">R$ {subtotal}</span>
                        </div>
                        {discount > 0 && (
                          <div className="flex justify-between text-sm">
                            <span className="text-green-400">Desconto ({getDiscount() * 100}%)</span>
                            <span className="text-green-400">-R$ {discount.toFixed(0)}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center pt-2">
                          <span className="text-white font-bold text-lg">Total</span>
                          <span className="text-[#4cb7e0] font-bold text-2xl">R$ {total.toFixed(0)}</span>
                        </div>
                      </div>

                      {/* Savings Info */}
                      {selectedModules.length >= 3 && (
                        <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3 mb-5">
                          <p className="text-green-400 text-xs">
                            ✓ Você está economizando R$ {discount.toFixed(0)} ao adicionar {selectedModules.length} módulos!
                          </p>
                        </div>
                      )}

                      {/* Action Button */}
                      <button className="w-full bg-[#4cb7e0] hover:bg-[#3da5cc] text-white font-semibold py-3 rounded-lg transition-all hover:shadow-lg hover:shadow-[#4cb7e0]/30">
                        Finalizar CPD Personalizado
                      </button>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-400 text-sm">
                        Nenhum módulo selecionado ainda. Escolha os módulos que deseja incluir no seu CPD.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative bg-[#070e2c] py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-16">
          <h2 className="font-['Segoe_UI:Bold',_sans-serif] text-white text-2xl lg:text-3xl mb-12 text-center">
            Como funciona o CPD Personalizado?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#4cb7e0]/20 flex items-center justify-center mx-auto mb-5">
                <BookOpen className="w-8 h-8 text-[#4cb7e0]" />
              </div>
              <h3 className="font-['Segoe_UI:Semibold',_sans-serif] text-white text-lg mb-3">
                Selecione os Módulos
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Escolha apenas os módulos que você ainda não possui ou deseja reforçar, montando um programa personalizado de acordo com suas necessidades.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#4cb7e0]/20 flex items-center justify-center mx-auto mb-5">
                <Calendar className="w-8 h-8 text-[#4cb7e0]" />
              </div>
              <h3 className="font-['Segoe_UI:Semibold',_sans-serif] text-white text-lg mb-3">
                Estude no seu Ritmo
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Aprenda o conteúdo até 5 anos e estude quando e onde quiser, no tempo que for melhor para você.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#4cb7e0]/20 flex items-center justify-center mx-auto mb-5">
                <Award className="w-8 h-8 text-[#4cb7e0]" />
              </div>
              <h3 className="font-['Segoe_UI:Semibold',_sans-serif] text-white text-lg mb-3">
                Realize o Exame
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Ao chegar no último mês de validade da sua habilitação, você irá realizar o exame online. Sem CPD é necessária inspeção presencial obrigatória.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
