'use client'

import { useLanguage } from "@/contexts/language-context"

export function ContactHeroSection() {
  const { t } = useLanguage()

  return (
    <section className="bg-[#070e2c] px-4 lg:px-[268.5px] py-16">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-6 items-center">
        {/* Title */}
        <h1 className="font-['Segoe_UI:Bold',_sans-serif] text-white text-4xl lg:text-[48px] leading-[48px] text-center">
          {t('contact.hero.title')}
        </h1>

        {/* Subtitle */}
        <div className="max-w-[768px] w-full">
          <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-300 text-lg lg:text-[20px] leading-7 text-center">
            {t('contact.hero.subtitle')}
          </p>
        </div>
      </div>
    </section>
  )
}