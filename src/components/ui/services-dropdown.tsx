'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/language-context'
import { BookOpen, Monitor, Users, ChevronRight, Compass } from 'lucide-react'

interface ServiceItem {
  icon: React.ReactNode
  title: string
  href: string
}

interface ServicesDropdownProps {
  isOpen: boolean
  onClose: () => void
}

export function ServicesDropdown({ isOpen, onClose }: ServicesDropdownProps) {
  const { t } = useLanguage()

  const trainings: ServiceItem[] = [
    {
      icon: <BookOpen className="w-5 h-5 text-[#4cb7e0]" />,
      title: t('services.trainings.dp_induction'),
      href: '/services/dp-induction',
    },
    {
      icon: <BookOpen className="w-5 h-5 text-[#4cb7e0]" />,
      title: t('services.trainings.dp_simulator'),
      href: '/services/dp-simulator',
    },
    {
      icon: <BookOpen className="w-5 h-5 text-[#4cb7e0]" />,
      title: t('services.trainings.dp_refresher'),
      href: '/services/dp-refresher',
    },
    {
      icon: <Compass className="w-5 h-5 text-[#4cb7e0]" />,
      title: t('services.trainings.all_trainings'),
      href: '/services/trainings',
    },
  ]

  const elearning: ServiceItem[] = [
    {
      icon: <Monitor className="w-5 h-5 text-[#4cb7e0]" />,
      title: t('services.elearning.cpd'),
      href: '/services/cpd',
    },
    {
      icon: <Monitor className="w-5 h-5 text-[#4cb7e0]" />,
      title: t('services.elearning.gold_rules'),
      href: '/services/gold-rules',
    },
    {
      icon: <Monitor className="w-5 h-5 text-[#4cb7e0]" />,
      title: 'CPD Personalizado',
      href: '/services/cpd-personalizado',
    },
    {
      icon: <Monitor className="w-5 h-5 text-[#4cb7e0]" />,
      title: t('services.elearning.all_elearning'),
      href: '/services/elearning',
    },
  ]

  const consulting: ServiceItem[] = [
    {
      icon: <Users className="w-5 h-5 text-[#4cb7e0]" />,
      title: t('services.consulting.competence_assessment'),
      href: '/services/competence-assessment',
    },
    {
      icon: <Users className="w-5 h-5 text-[#4cb7e0]" />,
      title: t('services.consulting.onboard_services'),
      href: '/services/onboard-services',
    },
    {
      icon: <Users className="w-5 h-5 text-[#4cb7e0]" />,
      title: t('services.consulting.dp_documentation'),
      href: '/services/dp-documentation',
    },
    {
      icon: <Users className="w-5 h-5 text-[#4cb7e0]" />,
      title: t('services.consulting.all_consulting'),
      href: '/services/consulting',
    },
  ]

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Dropdown Card Menu */}
      <div className="fixed left-1/2 -translate-x-1/2 top-[88px] z-50 w-[90%] max-w-[1200px]" data-services-dropdown="true">
        <div className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3),0_0_0_1px_rgba(0,0,0,0.05)] overflow-hidden relative">
          {/* Animated Wave Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-full h-full">
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#4cb7e0] rounded-full blur-[140px] opacity-8 animate-wave-1" />
              <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-[#4cb7e0] rounded-full blur-[160px] opacity-6 animate-wave-2" />
              <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#4cb7e0] rounded-full blur-[130px] opacity-7 animate-wave-3" />
              <div className="absolute top-10 right-20 w-72 h-72 bg-[#4cb7e0] rounded-full blur-[150px] opacity-5 animate-wave-1" style={{ animationDelay: '5s' }} />
            </div>
          </div>

          <div className="px-8 py-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Featured Section */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200">
              <h3 className="font-['Segoe_UI:Semibold',_sans-serif] text-[#070e2c] text-lg mb-2">
                {t('services.featured.title')}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {t('services.featured.description')}
              </p>
              <Link
                href="/services"
                onClick={onClose}
                className="inline-flex items-center gap-2 text-[#4cb7e0] hover:text-[#3a9bc1] font-semibold text-sm transition-colors group"
              >
                <Compass className="w-4 h-4" />
                {t('services.featured.cta')}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Treinamentos Column */}
            <div className="flex flex-col">
              <h3 className="font-['Segoe_UI:Semibold',_sans-serif] text-[#070e2c] text-base mb-4 pb-2 border-b border-gray-200">
                {t('services.trainings.title')}
              </h3>
              <div className="flex flex-col gap-2">
                {trainings.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex-shrink-0">{item.icon}</div>
                    <span className="text-gray-700 text-sm group-hover:text-[#4cb7e0] transition-colors">
                      {item.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* E-learning Column */}
            <div className="flex flex-col">
              <h3 className="font-['Segoe_UI:Semibold',_sans-serif] text-[#070e2c] text-base mb-4 pb-2 border-b border-gray-200">
                {t('services.elearning.title')}
              </h3>
              <div className="flex flex-col gap-2">
                {elearning.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex-shrink-0">{item.icon}</div>
                    <span className="text-gray-700 text-sm group-hover:text-[#4cb7e0] transition-colors">
                      {item.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Consultoria Column */}
            <div className="flex flex-col">
              <h3 className="font-['Segoe_UI:Semibold',_sans-serif] text-[#070e2c] text-base mb-4 pb-2 border-b border-gray-200">
                {t('services.consulting.title')}
              </h3>
              <div className="flex flex-col gap-2">
                {consulting.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex-shrink-0">{item.icon}</div>
                    <span className="text-gray-700 text-sm group-hover:text-[#4cb7e0] transition-colors">
                      {item.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}