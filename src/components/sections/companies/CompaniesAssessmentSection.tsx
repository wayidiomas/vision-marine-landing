'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface CheckItemProps {
  text: string
  delay?: number
}

function CheckItem({ text, delay = 0 }: CheckItemProps) {
  return (
    <div
      className="flex items-start gap-4 p-4 rounded-lg bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-[#4cb7e0]/20"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex-shrink-0 w-6 h-6 mt-0.5">
        <div className="w-6 h-6 bg-gradient-to-br from-[#4cb7e0] to-[#3a9bc1] rounded-full flex items-center justify-center shadow-lg">
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-700 text-base leading-[26px] flex-1">
        {text}
      </p>
    </div>
  )
}

function RadarChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const competencies = [
    { label: 'Navegação', value: 85, angle: 0, color: '#4cb7e0' },
    { label: 'Segurança', value: 92, angle: 60, color: '#3a9bc1' },
    { label: 'Máquinas', value: 78, angle: 120, color: '#4cb7e0' },
    { label: 'Comunicação', value: 88, angle: 180, color: '#3a9bc1' },
    { label: 'Liderança', value: 75, angle: 240, color: '#4cb7e0' },
    { label: 'Regulamentação', value: 90, angle: 300, color: '#3a9bc1' }
  ]

  const centerX = 160
  const centerY = 160
  const maxRadius = 130

  const getCoordinates = (angle: number, radius: number) => {
    const radians = (angle - 90) * (Math.PI / 180)
    return {
      x: centerX + radius * Math.cos(radians),
      y: centerY + radius * Math.sin(radians)
    }
  }

  const dataPoints = competencies.map(comp => {
    const radius = (comp.value / 100) * maxRadius
    return getCoordinates(comp.angle, radius)
  })

  const dataPath = dataPoints.map((point, index) =>
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ') + ' Z'

  const gridLevels = [20, 40, 60, 80, 100]

  return (
    <div className="relative w-[320px] h-[320px] mx-auto">
      <svg width="320" height="320" className="absolute inset-0 drop-shadow-sm">
        {/* Background circles */}
        {gridLevels.map((level, index) => {
          const radius = (level / 100) * maxRadius
          return (
            <circle
              key={level}
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke={index === gridLevels.length - 1 ? "#d1d5db" : "#f3f4f6"}
              strokeWidth={index === gridLevels.length - 1 ? "2" : "1"}
              opacity="0.8"
            />
          )
        })}

        {/* Grid lines from center */}
        {competencies.map((comp, index) => {
          const endPoint = getCoordinates(comp.angle, maxRadius)
          return (
            <line
              key={index}
              x1={centerX}
              y1={centerY}
              x2={endPoint.x}
              y2={endPoint.y}
              stroke="#e5e7eb"
              strokeWidth="1"
              opacity="0.6"
            />
          )
        })}

        {/* Data area with gradient */}
        <defs>
          <radialGradient id="chartGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(76, 183, 224, 0.4)" />
            <stop offset="100%" stopColor="rgba(76, 183, 224, 0.1)" />
          </radialGradient>
        </defs>

        <path
          d={dataPath}
          fill="url(#chartGradient)"
          stroke="#4cb7e0"
          strokeWidth="3"
          className="drop-shadow-sm"
        />

        {/* Data points with hover effect */}
        {dataPoints.map((point, index) => (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r={hoveredIndex === index ? "8" : "6"}
              fill="white"
              stroke={competencies[index].color}
              strokeWidth="3"
              className="transition-all duration-200 cursor-pointer drop-shadow-sm"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
            {hoveredIndex === index && (
              <circle
                cx={point.x}
                cy={point.y}
                r="12"
                fill="none"
                stroke={competencies[index].color}
                strokeWidth="2"
                opacity="0.3"
                className="animate-pulse"
              />
            )}
          </g>
        ))}

        {/* Center point */}
        <circle
          cx={centerX}
          cy={centerY}
          r="4"
          fill="#070e2c"
          className="drop-shadow-sm"
        />
      </svg>

      {/* Enhanced Labels */}
      {competencies.map((comp, index) => {
        const labelRadius = maxRadius + 35
        const labelCoords = getCoordinates(comp.angle, labelRadius)
        const isHovered = hoveredIndex === index

        return (
          <div
            key={index}
            className={`absolute text-center transition-all duration-200 ${
              isHovered ? 'scale-110 font-semibold' : ''
            }`}
            style={{
              left: `${labelCoords.x - 40}px`,
              top: `${labelCoords.y - 12}px`,
              width: '80px'
            }}
          >
            <div className={`text-xs font-medium text-gray-700 mb-1 ${isHovered ? 'text-[#4cb7e0]' : ''}`}>
              {comp.label}
            </div>
            <div className={`text-lg font-bold ${isHovered ? 'text-[#4cb7e0]' : 'text-gray-800'}`}>
              {comp.value}%
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function CompaniesAssessmentSection() {
  const checkItems = [
    "Avaliação completa das competências técnicas e comportamentais",
    "Identificação de gaps de conhecimento e oportunidades de melhoria",
    "Relatório personalizado com recomendações específicas de desenvolvimento",
    "Acompanhamento contínuo do progresso e evolução profissional"
  ]

  return (
    <section className="py-16 md:py-20 lg:py-24 px-4 lg:px-[260px] bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#4cb7e0] blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-[#3a9bc1] blur-3xl"></div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#4cb7e0]/10 text-[#4cb7e0] px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Assessment Profissional
          </div>
          <h2 className="font-['Segoe_UI:Bold',_sans-serif] text-[#070e2c] text-[32px] md:text-[40px] lg:text-[48px] leading-[36px] md:leading-[44px] lg:leading-[52px] mb-4">
            Avalie e Desenvolva Talentos
          </h2>
          <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-600 text-lg md:text-xl leading-7 md:leading-[28px] max-w-[700px] mx-auto">
            Sistema completo de avaliação de competências que identifica potenciais e oportunidades de crescimento profissional
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">

          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            <div>
              <h3 className="font-['Segoe_UI:Semibold',_sans-serif] text-[#070e2c] text-xl sm:text-2xl mb-4 sm:mb-6">
                O que está incluído:
              </h3>

              {/* Check Items */}
              <div className="space-y-3 sm:space-y-4">
                {checkItems.map((item, index) => (
                  <CheckItem key={index} text={item} delay={index * 100} />
                ))}
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="text-center py-2 sm:py-0">
                <div className="font-['Segoe_UI:Bold',_sans-serif] text-xl sm:text-2xl text-[#4cb7e0] mb-1">500+</div>
                <div className="font-['Segoe_UI:Regular',_sans-serif] text-xs sm:text-xs text-gray-600">Profissionais Avaliados</div>
              </div>
              <div className="text-center py-2 sm:py-0 sm:border-l border-gray-200">
                <div className="font-['Segoe_UI:Bold',_sans-serif] text-xl sm:text-2xl text-[#4cb7e0] mb-1">95%</div>
                <div className="font-['Segoe_UI:Regular',_sans-serif] text-xs sm:text-xs text-gray-600">Precisão nas Avaliações</div>
              </div>
              <div className="text-center py-2 sm:py-0 sm:border-l border-gray-200">
                <div className="font-['Segoe_UI:Bold',_sans-serif] text-xl sm:text-2xl text-[#4cb7e0] mb-1">24h</div>
                <div className="font-['Segoe_UI:Regular',_sans-serif] text-xs sm:text-xs text-gray-600">Entrega de Resultados</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6">
              <Button className="h-11 sm:h-12 px-6 sm:px-8 lg:px-10 bg-[#4cb7e0] hover:bg-[#3a9bc1] text-white font-semibold text-base sm:text-lg rounded-md transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto lg:min-w-[200px] flex-shrink-0">
                Solicitar Assessment
              </Button>
              <Button
                variant="outline"
                className="h-11 sm:h-12 px-6 sm:px-8 lg:px-10 border-[#4cb7e0] text-[#4cb7e0] hover:bg-[#4cb7e0] hover:text-white font-semibold text-base sm:text-lg rounded-md transition-all duration-300 w-full sm:w-auto lg:min-w-[200px] flex-shrink-0"
              >
                Ver Exemplo Completo
              </Button>
            </div>
          </div>

          {/* Right Content - Enhanced Chart */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8 relative order-1 lg:order-2">
            {/* Floating badge */}
            <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#4cb7e0] to-[#3a9bc1] text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
              Resultado Interativo
            </div>

            <div className="text-center mb-6 sm:mb-8 mt-2 sm:mt-4">
              <h3 className="font-['Segoe_UI:Semibold',_sans-serif] text-[#070e2c] text-lg sm:text-xl mb-1 sm:mb-2">
                Assessment - João Silva
              </h3>
              <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-600 text-xs sm:text-sm">
                Oficial de Máquinas • 8 anos de experiência
              </p>
            </div>

            <div className="flex justify-center">
              <div className="scale-75 sm:scale-90 lg:scale-100">
                <RadarChart />
              </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-['Segoe_UI:Regular',_sans-serif] text-gray-500">
                  Pontuação Geral:
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-16 sm:w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-[86%] h-full bg-gradient-to-r from-[#4cb7e0] to-[#3a9bc1] rounded-full"></div>
                  </div>
                  <span className="font-['Segoe_UI:Semibold',_sans-serif] text-[#4cb7e0] text-base sm:text-lg">86%</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}