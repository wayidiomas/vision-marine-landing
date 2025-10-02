'use client'

import { ContactHeroSection } from '@/components/sections/contact/ContactHeroSection'
import { ContactFormSection } from '@/components/sections/contact/ContactFormSection'
import { ContactInfoSection } from '@/components/sections/contact/ContactInfoSection'
import { Footer } from '@/components/sections/Footer'

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <ContactHeroSection />

      {/* Main Content - Form + Info */}
      <section className="bg-gray-50 px-4 lg:px-[268.5px] py-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="w-full">
            <ContactFormSection />
          </div>

          {/* Contact Info + FAQ */}
          <div className="w-full">
            <ContactInfoSection />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}