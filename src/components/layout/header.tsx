'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LanguageDropdown } from '@/components/ui/language-dropdown'
import { ServicesDropdown } from '@/components/ui/services-dropdown'
import { useLanguage } from '@/contexts/language-context'

export function Header() {
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { t } = useLanguage()
  const servicesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement

      // Check if click is inside the services button or dropdown
      const isInsideServicesButton = servicesRef.current?.contains(target)
      const isInsideDropdown = target.closest('[data-services-dropdown="true"]')

      if (!isInsideServicesButton && !isInsideDropdown) {
        setIsServicesOpen(false)
      }
    }

    if (isServicesOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isServicesOpen])

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 w-full px-6 lg:px-[276px] py-4 z-50 transition-all duration-300"
        style={{
          backgroundColor: isScrolled ? 'rgba(7, 14, 44, 0.9)' : 'rgba(7, 14, 44, 1)',
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none'
        }}
      >
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/vision-marine-logo.png"
              alt="Vision Marine"
              width={96}
              height={48}
              className="object-contain"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-white">
            <Link
              href="/"
              className="text-base font-normal hover:text-[#4cb7e0] transition-colors"
            >
              {t('header.home')}
            </Link>

            {/* Services Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={`flex items-center space-x-1 text-base font-semibold transition-colors ${
                  isServicesOpen ? 'text-[#4cb7e0]' : 'hover:text-[#4cb7e0]'
                }`}
              >
                <span>{t('header.services')}</span>
                <Image
                  src="/chevron-down.svg"
                  alt=""
                  width={12}
                  height={12}
                  className={`text-white transition-transform ${
                    isServicesOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            <Link
              href="/empresas"
              className="text-base font-normal hover:text-[#4cb7e0] transition-colors"
            >
              {t('header.companies')}
            </Link>

            <Link
              href="/about"
              className="text-base font-normal hover:text-[#4cb7e0] transition-colors"
            >
              {t('header.about')}
            </Link>

            <Link
              href="/contact"
              className="text-base font-normal hover:text-[#4cb7e0] transition-colors"
            >
              {t('header.contact')}
            </Link>
          </nav>

          {/* Right Side - Search, Language, Login */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Search Input - Hidden on mobile */}
            <div className="relative hidden md:block">
              <Input
                type="text"
                placeholder={t('header.search_placeholder')}
                className="w-48 lg:w-64 h-10 bg-white border-gray-200 text-gray-600 placeholder:text-gray-500 pr-10"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2">
                <Image
                  src="/search-icon.svg"
                  alt=""
                  width={16}
                  height={16}
                />
              </button>
            </div>

            {/* Language Selector - Hidden on mobile */}
            <div className="hidden lg:block">
              <LanguageDropdown variant="header" />
            </div>

            {/* Login Button */}
            <Button
              asChild
              className="h-10 px-3 lg:px-4 text-sm lg:text-base font-semibold text-white border-0 rounded-md bg-gradient-to-r from-[#4cb7e0] to-[#4cb7e0] hover:from-[#4cb7e0] hover:to-[#3a9bc1] transition-all duration-300"
            >
              <Link href="/auth/login">{t('header.login')}</Link>
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Services Dropdown - Desktop */}
      <ServicesDropdown isOpen={isServicesOpen} onClose={() => setIsServicesOpen(false)} />

      {/* Mobile Side Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-80 z-[60] transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          backgroundColor: '#070e2c',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 border-opacity-30">
          <div className="flex items-center">
            <Image
              src="/vision-marine-logo.png"
              alt="Vision Marine"
              width={80}
              height={40}
              className="object-contain"
            />
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white p-2"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu Content */}
        <div className="p-6 flex flex-col h-[calc(100%-100px)]">
          {/* Navigation Links */}
          <nav className="flex flex-col space-y-6 mb-8">
            <Link
              href="/"
              className="text-white text-lg font-normal hover:text-[#4cb7e0] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('header.home')}
            </Link>

            <div className="flex flex-col">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center justify-between text-white text-lg font-semibold hover:text-[#4cb7e0] transition-colors"
              >
                <span>{t('header.services')}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Services Mobile Dropdown */}
              {isServicesOpen && (
                <div className="mt-4 ml-4 flex flex-col space-y-4">
                  {/* Trainings */}
                  <div>
                    <div className="text-[#4cb7e0] text-sm font-semibold mb-2">
                      {t('services.trainings.title')}
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Link
                        href="/services/dp-induction"
                        className="text-gray-300 text-sm hover:text-[#4cb7e0] transition-colors"
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                          setIsServicesOpen(false)
                        }}
                      >
                        {t('services.trainings.dp_induction')}
                      </Link>
                      <Link
                        href="/services/dp-simulator"
                        className="text-gray-300 text-sm hover:text-[#4cb7e0] transition-colors"
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                          setIsServicesOpen(false)
                        }}
                      >
                        {t('services.trainings.dp_simulator')}
                      </Link>
                      <Link
                        href="/services/dp-refresher"
                        className="text-gray-300 text-sm hover:text-[#4cb7e0] transition-colors"
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                          setIsServicesOpen(false)
                        }}
                      >
                        {t('services.trainings.dp_refresher')}
                      </Link>
                      <Link
                        href="/services/trainings"
                        className="text-[#4cb7e0] text-sm font-medium hover:underline transition-colors"
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                          setIsServicesOpen(false)
                        }}
                      >
                        {t('services.trainings.all_trainings')} →
                      </Link>
                    </div>
                  </div>

                  {/* E-learning */}
                  <div>
                    <div className="text-[#4cb7e0] text-sm font-semibold mb-2">
                      {t('services.elearning.title')}
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Link
                        href="/services/cpd"
                        className="text-gray-300 text-sm hover:text-[#4cb7e0] transition-colors"
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                          setIsServicesOpen(false)
                        }}
                      >
                        {t('services.elearning.cpd')}
                      </Link>
                      <Link
                        href="/services/gold-rules"
                        className="text-gray-300 text-sm hover:text-[#4cb7e0] transition-colors"
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                          setIsServicesOpen(false)
                        }}
                      >
                        {t('services.elearning.gold_rules')}
                      </Link>
                      <Link
                        href="/services/cpd-personalizado"
                        className="text-gray-300 text-sm hover:text-[#4cb7e0] transition-colors"
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                          setIsServicesOpen(false)
                        }}
                      >
                        CPD Personalizado
                      </Link>
                      <Link
                        href="/services/elearning"
                        className="text-[#4cb7e0] text-sm font-medium hover:underline transition-colors"
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                          setIsServicesOpen(false)
                        }}
                      >
                        {t('services.elearning.all_elearning')} →
                      </Link>
                    </div>
                  </div>

                  {/* Consulting */}
                  <div>
                    <div className="text-[#4cb7e0] text-sm font-semibold mb-2">
                      {t('services.consulting.title')}
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Link
                        href="/services/competence-assessment"
                        className="text-gray-300 text-sm hover:text-[#4cb7e0] transition-colors"
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                          setIsServicesOpen(false)
                        }}
                      >
                        {t('services.consulting.competence_assessment')}
                      </Link>
                      <Link
                        href="/services/onboard-services"
                        className="text-gray-300 text-sm hover:text-[#4cb7e0] transition-colors"
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                          setIsServicesOpen(false)
                        }}
                      >
                        {t('services.consulting.onboard_services')}
                      </Link>
                      <Link
                        href="/services/dp-documentation"
                        className="text-gray-300 text-sm hover:text-[#4cb7e0] transition-colors"
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                          setIsServicesOpen(false)
                        }}
                      >
                        {t('services.consulting.dp_documentation')}
                      </Link>
                      <Link
                        href="/services/consulting"
                        className="text-[#4cb7e0] text-sm font-medium hover:underline transition-colors"
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                          setIsServicesOpen(false)
                        }}
                      >
                        {t('services.consulting.all_consulting')} →
                      </Link>
                    </div>
                  </div>

                  {/* Explore All Services Button */}
                  <div className="pt-3 border-t border-gray-700 border-opacity-30">
                    <Link
                      href="/services"
                      className="flex items-center justify-center gap-2 text-[#4cb7e0] hover:text-[#3a9bc1] font-semibold text-sm transition-colors"
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        setIsServicesOpen(false)
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                      </svg>
                      <span>{t('services.featured.cta')}</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/empresas"
              className="text-white text-lg font-normal hover:text-[#4cb7e0] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('header.companies')}
            </Link>

            <Link
              href="/about"
              className="text-white text-lg font-normal hover:text-[#4cb7e0] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('header.about')}
            </Link>

            <Link
              href="/contact"
              className="text-white text-lg font-normal hover:text-[#4cb7e0] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('header.contact')}
            </Link>
          </nav>

          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Input
                type="text"
                placeholder={t('header.search_placeholder')}
                className="w-full h-12 bg-white border-gray-200 text-gray-600 placeholder:text-gray-500 pr-10"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <Image
                  src="/search-icon.svg"
                  alt=""
                  width={16}
                  height={16}
                />
              </button>
            </div>
          </div>

          {/* Language Selector */}
          <div className="mb-8">
            <div className="text-white text-sm font-medium mb-3">{t('header.language')}</div>
            <LanguageDropdown variant="hero" />
          </div>

          {/* Login Button */}
          <div className="mt-auto">
            <Button
              asChild
              className="w-full h-12 bg-gradient-to-r from-[#4cb7e0] to-[#4cb7e0] hover:from-[#4cb7e0] hover:to-[#3a9bc1] text-white font-semibold text-lg rounded-md transition-all duration-300"
            >
              <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                {t('header.login')}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            background: 'rgba(0, 0, 0, 0.3)'
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}