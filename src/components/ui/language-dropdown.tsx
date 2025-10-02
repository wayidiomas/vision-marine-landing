'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useLanguage, languages } from '@/contexts/language-context'

interface LanguageDropdownProps {
  variant?: 'header' | 'hero'
  className?: string
}

export function LanguageDropdown({ variant = 'header', className = '' }: LanguageDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { currentLanguage, setLanguage } = useLanguage()

  const handleLanguageChange = (language: any) => {
    setLanguage(language)
    setIsOpen(false)
  }

  const baseClasses = variant === 'header'
    ? "text-white hover:text-gray-200"
    : "text-gray-300 hover:text-white"

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 transition-colors ${baseClasses}`}
        aria-label="Selecionar idioma"
      >
        <Image
          src={currentLanguage.flag}
          alt={`${currentLanguage.name} flag`}
          width={20}
          height={15}
          className="rounded-sm"
        />
        <span className="text-sm font-medium">{currentLanguage.displayName}</span>
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 z-50 min-w-[120px]">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              className={`w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-md last:rounded-b-md transition-colors ${
                currentLanguage.code === language.code ? 'bg-blue-50 text-blue-700' : ''
              }`}
            >
              <Image
                src={language.flag}
                alt={`${language.name} flag`}
                width={20}
                height={15}
                className="rounded-sm"
              />
              <span className="font-medium">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}