'use client'

import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-[#070e2c] px-4 lg:px-8 xl:px-16 2xl:px-24 py-0">
      <div className="max-w-[1400px] mx-auto px-4 py-16">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 mb-12">

          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Link href="/" className="inline-block">
                <Image
                  src="/vision-marine-logo.png"
                  alt="Vision Marine"
                  width={80}
                  height={40}
                  className="object-contain"
                />
              </Link>
            </div>

            <div className="mb-6">
              <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-300 text-[16px] leading-[26px]">
                A principal plataforma de educação marítima
                e naval do Brasil. Formando profissionais
                qualificados para o mercado marítimo.
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              <Link href="#" className="text-gray-300 hover:text-[#4cb7e0] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </Link>

              <Link href="#" className="text-gray-300 hover:text-[#4cb7e0] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>

              <Link href="#" className="text-gray-300 hover:text-[#4cb7e0] transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Links Rápidos */}
          <div className="lg:col-span-1">
            <h3 className="font-['Segoe_UI:Semibold',_sans-serif] text-white text-[18px] leading-[28px] mb-4">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="font-['Segoe_UI:Regular',_sans-serif] text-gray-300 text-[16px] leading-[24px] hover:text-[#4cb7e0] transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/courses" className="font-['Segoe_UI:Regular',_sans-serif] text-gray-300 text-[16px] leading-[24px] hover:text-[#4cb7e0] transition-colors">
                  Treinamentos
                </Link>
              </li>
              <li>
                <Link href="/about" className="font-['Segoe_UI:Regular',_sans-serif] text-gray-300 text-[16px] leading-[24px] hover:text-[#4cb7e0] transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contact" className="font-['Segoe_UI:Regular',_sans-serif] text-gray-300 text-[16px] leading-[24px] hover:text-[#4cb7e0] transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/blog" className="font-['Segoe_UI:Regular',_sans-serif] text-gray-300 text-[16px] leading-[24px] hover:text-[#4cb7e0] transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-1">
            <h3 className="font-['Segoe_UI:Semibold',_sans-serif] text-white text-[18px] leading-[28px] mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="font-['Segoe_UI:Regular',_sans-serif] text-gray-300 text-[16px] leading-[24px] hover:text-[#4cb7e0] transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/terms" className="font-['Segoe_UI:Regular',_sans-serif] text-gray-300 text-[16px] leading-[24px] hover:text-[#4cb7e0] transition-colors">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="font-['Segoe_UI:Regular',_sans-serif] text-gray-300 text-[16px] leading-[24px] hover:text-[#4cb7e0] transition-colors">
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link href="/lgpd" className="font-['Segoe_UI:Regular',_sans-serif] text-gray-300 text-[16px] leading-[24px] hover:text-[#4cb7e0] transition-colors">
                  LGPD
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="lg:col-span-1">
            <h3 className="font-['Segoe_UI:Semibold',_sans-serif] text-white text-[18px] leading-[28px] mb-4">
              Contato
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4cb7e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span className="font-['Segoe_UI:Regular',_sans-serif] text-gray-300 text-[16px] leading-[24px]">
                  contato@visionmarine.com.br
                </span>
              </div>

              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4cb7e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span className="font-['Segoe_UI:Regular',_sans-serif] text-gray-300 text-[16px] leading-[24px]">
                  (11) 99999-9999
                </span>
              </div>

              <div className="flex items-start gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4cb7e0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <div className="font-['Segoe_UI:Regular',_sans-serif] text-gray-300 text-[16px] leading-[24px]">
                  Av. Atlântica, 1000<br />
                  Santos, SP - Brasil
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8">
          <div className="text-center">
            <p className="font-['Segoe_UI:Regular',_sans-serif] text-gray-300 text-[16px] leading-[24px]">
              © 2024 Vision Marine. Todos os direitos reservados.
            </p>
          </div>
        </div>

      </div>
    </footer>
  )
}