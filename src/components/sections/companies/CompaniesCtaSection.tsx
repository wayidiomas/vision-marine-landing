'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Assets from Figma
const phoneIcon = "http://localhost:3845/assets/811a991b345bfbb5e3195c895fde4e4207bcf479.svg"
const documentIcon1 = "http://localhost:3845/assets/5c5e1f1fd3dfde8b6ddd7abf7b83f9e4a20251c8.svg"
const documentIcon2 = "http://localhost:3845/assets/783e9fad5cd70f51a37c1bd850ef00755788e8c5.svg"

export function CompaniesCtaSection() {
  return (
    <section className="bg-gradient-to-r from-[#4cb7e0] to-[#3a9bc1] relative py-16 md:py-20 lg:py-24 px-4 lg:px-[260px] overflow-hidden">

      {/* Animated Boat Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Water Waves Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M0 30c10-10 20-10 30 0s20 10 30 0v30H0V30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              animation: 'wave-drift 20s ease-in-out infinite'
            }}
          />
        </div>

        {/* Main Sailing Boat - Larger */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 animate-boat-1"
        >
          {/* Professional Pilot Vessel SVG */}
          <svg
            viewBox="0 0 120 100"
            className="w-full h-full drop-shadow-lg"
            style={{ filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.3))' }}
          >
            <defs>
              {/* Professional vessel gradients */}
              <linearGradient id="pilotHullGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="30%" stopColor="#f8fafc" />
                <stop offset="70%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>

              <linearGradient id="pilotSuperstructure" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#f1f5f9" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>

              <linearGradient id="pilotBridge" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#070e2c" />
                <stop offset="50%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#1e293b" />
              </linearGradient>

              <linearGradient id="smokestackGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4cb7e0" />
                <stop offset="50%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>

            {/* Water effects around pilot vessel */}
            <ellipse
              cx="60" cy="82"
              rx="45" ry="8"
              fill="rgba(255,255,255,0.12)"
              className="animate-ping"
              style={{ animationDuration: '3.5s' }}
            />

            <ellipse
              cx="60" cy="82"
              rx="30" ry="5"
              fill="rgba(255,255,255,0.2)"
              className="animate-ping"
              style={{ animationDuration: '2.5s', animationDelay: '0.7s' }}
            />

            {/* Main Hull - Professional Pilot Vessel */}
            <path
              d="M10 65 Q15 55 60 53 Q105 55 110 65 L108 75 Q60 78 12 75 Z"
              fill="url(#pilotHullGradient)"
              stroke="#cbd5e1"
              strokeWidth="0.5"
            />

            {/* Hull waterline stripe */}
            <path
              d="M12 68 Q60 66 108 68"
              stroke="#4cb7e0"
              strokeWidth="2"
              fill="none"
            />

            {/* Main Deck */}
            <ellipse
              cx="60" cy="63"
              rx="45" ry="10"
              fill="#f8fafc"
              opacity="0.9"
            />

            {/* Forward Superstructure */}
            <rect
              x="25" y="50"
              width="70" height="15"
              rx="2"
              fill="url(#pilotSuperstructure)"
              stroke="#e2e8f0"
              strokeWidth="0.5"
            />

            {/* Bridge/Wheelhouse - Vision Marine Command Center */}
            <rect
              x="35" y="38"
              width="50" height="14"
              rx="1"
              fill="url(#pilotBridge)"
              stroke="#334155"
              strokeWidth="0.3"
            />

            {/* Bridge Windows - Panoramic Navigation */}
            <rect x="38" y="42" width="44" height="6" rx="0.5" fill="#87ceeb" opacity="0.8" />

            {/* Individual window frames */}
            <line x1="45" y1="42" x2="45" y2="48" stroke="#1e293b" strokeWidth="0.3" />
            <line x1="52" y1="42" x2="52" y2="48" stroke="#1e293b" strokeWidth="0.3" />
            <line x1="60" y1="42" x2="60" y2="48" stroke="#1e293b" strokeWidth="0.3" />
            <line x1="68" y1="42" x2="68" y2="48" stroke="#1e293b" strokeWidth="0.3" />
            <line x1="75" y1="42" x2="75" y2="48" stroke="#1e293b" strokeWidth="0.3" />

            {/* Communication/Radar Mast */}
            <rect
              x="58" y="25"
              width="4" height="15"
              fill="#6b7280"
              rx="0.5"
            />

            {/* Radar/Navigation Equipment */}
            <circle cx="60" cy="28" r="3" fill="#1f2937" opacity="0.8" />
            <circle cx="60" cy="28" r="2" fill="#4cb7e0" opacity="0.6" className="animate-spin" style={{ animationDuration: '3s' }} />

            {/* Communication Antennas */}
            <line x1="58" y1="25" x2="58" y2="20" stroke="#6b7280" strokeWidth="0.8" />
            <line x1="62" y1="25" x2="62" y2="18" stroke="#6b7280" strokeWidth="0.8" />
            <circle cx="58" cy="20" r="0.8" fill="#ef4444" />
            <circle cx="62" cy="18" r="0.8" fill="#22c55e" />

            {/* Navigation Lights - Professional Standards */}
            <circle cx="105" cy="58" r="2" fill="#ef4444" opacity="0.9" />
            <circle cx="15" cy="58" r="2" fill="#22c55e" opacity="0.9" />
            <circle cx="60" cy="35" r="1.5" fill="#ffffff" opacity="0.9" />

            {/* Smokestack with Vision Marine Colors */}
            <rect
              x="70" y="42"
              width="8" height="18"
              rx="1"
              fill="url(#smokestackGradient)"
              stroke="#0369a1"
              strokeWidth="0.3"
            />

            {/* Smokestack top */}
            <ellipse cx="74" cy="42" rx="4" ry="1" fill="#0284c7" />

            {/* Vision Marine Logo Area on Hull */}
            <rect
              x="40" y="58"
              width="40" height="8"
              rx="1"
              fill="rgba(76, 183, 224, 0.1)"
              stroke="#4cb7e0"
              strokeWidth="0.5"
            />

            {/* VM Letters Representation */}
            <text x="60" y="64" textAnchor="middle" fontSize="4" fill="#4cb7e0" fontWeight="bold" fontFamily="sans-serif">VM</text>

            {/* Professional Deck Equipment */}
            <rect x="20" y="58" width="6" height="3" rx="0.5" fill="#6b7280" />
            <rect x="94" y="58" width="6" height="3" rx="0.5" fill="#6b7280" />

            {/* Pilot Ladder */}
            <g transform="translate(15, 60)">
              <line x1="0" y1="0" x2="0" y2="12" stroke="#8b5cf6" strokeWidth="1.5" />
              <line x1="0" y1="2" x2="3" y2="2" stroke="#8b5cf6" strokeWidth="0.8" />
              <line x1="0" y1="5" x2="3" y2="5" stroke="#8b5cf6" strokeWidth="0.8" />
              <line x1="0" y1="8" x2="3" y2="8" stroke="#8b5cf6" strokeWidth="0.8" />
              <line x1="0" y1="11" x2="3" y2="11" stroke="#8b5cf6" strokeWidth="0.8" />
            </g>

            {/* Professional Flag - Maritime Authority */}
            <g transform="translate(60, 25)">
              <path
                d="M2 -5 L15 -3 L13 1 L2 -1 Z"
                fill="#4cb7e0"
                className="animate-wave"
                style={{
                  animationDuration: '2.8s',
                  transformOrigin: '2px -2px'
                }}
              />
              <path
                d="M2 -3 L10 -2 L8 0 L2 -1 Z"
                fill="#ffffff"
                className="animate-wave"
                style={{
                  animationDuration: '2.8s',
                  animationDelay: '0.3s',
                  transformOrigin: '2px -1.5px'
                }}
              />
            </g>

            {/* Professional Wake Pattern */}
            <path
              d="M8 70 Q5 72 3 75"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              className="animate-pulse"
              style={{ animationDuration: '2.2s' }}
            />

            <path
              d="M6 73 Q3 74 1 76"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              className="animate-pulse"
              style={{ animationDuration: '2.8s', animationDelay: '0.4s' }}
            />

            {/* Deck Railings */}
            <path
              d="M12 68 Q60 66 108 68"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1"
              fill="none"
            />

            {/* Professional Anchor */}
            <g transform="translate(25, 68) scale(1.2)">
              <path
                d="M0 0 L0 6 M-2 4 L2 4 M-1.5 6 Q-1.5 7.5 0 7.5 Q1.5 7.5 1.5 6"
                stroke="#1f2937"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="0" cy="0" r="1" fill="#1f2937" />
            </g>

            {/* Pilot Vessel Identification Numbers */}
            <text x="95" y="68" fontSize="3" fill="#1f2937" fontFamily="monospace">P-01</text>
          </svg>
        </div>

        {/* Second Pilot Vessel - Navigation Training Ship */}
        <div
          className="absolute top-1/3 w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 animate-boat-2"
        >
          {/* Training Navigation Vessel SVG */}
          <svg
            viewBox="0 0 100 90"
            className="w-full h-full drop-shadow-md opacity-85"
            style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}
          >
            <defs>
              {/* Training vessel gradients */}
              <linearGradient id="trainingHull" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f1f5f9" />
                <stop offset="50%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>

              <linearGradient id="trainingBridge" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>

              <linearGradient id="trainingStack" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>

            {/* Water effects */}
            <ellipse
              cx="50" cy="72"
              rx="32" ry="6"
              fill="rgba(255,255,255,0.1)"
              className="animate-ping"
              style={{ animationDuration: '3.2s' }}
            />

            {/* Training Hull */}
            <path
              d="M8 58 Q12 48 50 46 Q88 48 92 58 L90 67 Q50 70 10 67 Z"
              fill="url(#trainingHull)"
              stroke="#94a3b8"
              strokeWidth="0.4"
            />

            {/* Vision Marine Stripe */}
            <path
              d="M10 60 Q50 58 90 60"
              stroke="#4cb7e0"
              strokeWidth="1.8"
              fill="none"
            />

            {/* Training Deck */}
            <ellipse
              cx="50" cy="56"
              rx="38" ry="8"
              fill="#f8fafc"
              opacity="0.9"
            />

            {/* Navigation Training Superstructure */}
            <rect
              x="20" y="44"
              width="60" height="12"
              rx="1.5"
              fill="url(#trainingHull)"
              stroke="#cbd5e1"
              strokeWidth="0.4"
            />

            {/* Command Bridge */}
            <rect
              x="30" y="35"
              width="40" height="11"
              rx="1"
              fill="url(#trainingBridge)"
              stroke="#475569"
              strokeWidth="0.3"
            />

            {/* Training Bridge Windows */}
            <rect x="32" y="38" width="36" height="5" rx="0.4" fill="#87ceeb" opacity="0.8" />

            {/* Window divisions */}
            <line x1="38" y1="38" x2="38" y2="43" stroke="#1e293b" strokeWidth="0.2" />
            <line x1="44" y1="38" x2="44" y2="43" stroke="#1e293b" strokeWidth="0.2" />
            <line x1="50" y1="38" x2="50" y2="43" stroke="#1e293b" strokeWidth="0.2" />
            <line x1="56" y1="38" x2="56" y2="43" stroke="#1e293b" strokeWidth="0.2" />
            <line x1="62" y1="38" x2="62" y2="43" stroke="#1e293b" strokeWidth="0.2" />

            {/* Radar/Communication Mast */}
            <rect
              x="48" y="22"
              width="4" height="15"
              fill="#64748b"
              rx="0.4"
            />

            {/* Navigation Radar */}
            <circle cx="50" cy="25" r="2.5" fill="#1f2937" opacity="0.8" />
            <circle cx="50" cy="25" r="1.8" fill="#4cb7e0" opacity="0.7" className="animate-spin" style={{ animationDuration: '2.8s' }} />

            {/* Training Antennas */}
            <line x1="47.5" y1="22" x2="47.5" y2="18" stroke="#64748b" strokeWidth="0.6" />
            <line x1="52.5" y1="22" x2="52.5" y2="16" stroke="#64748b" strokeWidth="0.6" />
            <circle cx="47.5" cy="18" r="0.6" fill="#ef4444" />
            <circle cx="52.5" cy="16" r="0.6" fill="#22c55e" />

            {/* Navigation Lights */}
            <circle cx="88" cy="52" r="1.5" fill="#ef4444" opacity="0.9" />
            <circle cx="12" cy="52" r="1.5" fill="#22c55e" opacity="0.9" />
            <circle cx="50" cy="32" r="1.2" fill="#ffffff" opacity="0.9" />

            {/* Training Smokestack */}
            <rect
              x="60" y="38"
              width="7" height="15"
              rx="0.8"
              fill="url(#trainingStack)"
              stroke="#0369a1"
              strokeWidth="0.3"
            />

            <ellipse cx="63.5" cy="38" rx="3.5" ry="0.8" fill="#0284c7" />

            {/* Vision Marine Training Logo */}
            <rect
              x="30" y="52"
              width="40" height="6"
              rx="0.8"
              fill="rgba(76, 183, 224, 0.15)"
              stroke="#4cb7e0"
              strokeWidth="0.4"
            />

            <text x="50" y="56.5" textAnchor="middle" fontSize="3.5" fill="#4cb7e0" fontWeight="bold" fontFamily="sans-serif">VISION MARINE</text>

            {/* Training Equipment */}
            <rect x="15" y="51" width="5" height="2.5" rx="0.4" fill="#64748b" />
            <rect x="80" y="51" width="5" height="2.5" rx="0.4" fill="#64748b" />

            {/* Training Flag */}
            <g transform="translate(50, 22)">
              <path
                d="M2 -4 L12 -2.5 L10.5 1 L2 -0.5 Z"
                fill="#0ea5e9"
                className="animate-wave"
                style={{
                  animationDuration: '2.6s',
                  transformOrigin: '2px -1.5px'
                }}
              />
              <path
                d="M2 -2 L8 -1 L7 1 L2 0 Z"
                fill="#ffffff"
                className="animate-wave"
                style={{
                  animationDuration: '2.6s',
                  animationDelay: '0.2s',
                  transformOrigin: '2px -0.5px'
                }}
              />
            </g>

            {/* Professional Wake */}
            <path
              d="M6 63 Q4 65 2 67"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              className="animate-pulse"
              style={{ animationDuration: '2.5s' }}
            />

            {/* Training Vessel ID */}
            <text x="82" y="62" fontSize="2.5" fill="#1f2937" fontFamily="monospace">T-02</text>

            {/* Training Anchor */}
            <g transform="translate(18, 60) scale(1)">
              <path
                d="M0 0 L0 5 M-1.8 3.5 L1.8 3.5 M-1.2 5 Q-1.2 6.2 0 6.2 Q1.2 6.2 1.2 5"
                stroke="#1f2937"
                strokeWidth="1.2"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx="0" cy="0" r="0.8" fill="#1f2937" />
            </g>
          </svg>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 px-4 sm:px-0">
        <div className="flex flex-col items-center text-center gap-4 sm:gap-6">

          {/* Heading */}
          <div>
            <h2 className="font-['Segoe_UI:Bold',_sans-serif] text-white text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px] leading-[32px] sm:leading-[36px] md:leading-[40px] lg:leading-[44px] px-2 sm:px-0">
              Pronto para Transformar sua Equipe?
            </h2>
          </div>

          {/* Subtitle */}
          <div className="max-w-[672px] px-2 sm:px-0">
            <p className="font-['Segoe_UI:Regular',_sans-serif] text-white text-[16px] sm:text-[18px] md:text-[20px] leading-[24px] sm:leading-[26px] md:leading-[28px]">
              Fale com nossos especialistas e descubra como podemos desenvolver um programa de capacitação personalizado para sua empresa.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 w-full sm:w-auto items-center justify-center">
            {/* Primary Button - Agendar Reunião */}
            <Button
              asChild
              className="h-11 sm:h-12 px-6 sm:px-8 bg-white hover:bg-gray-100 text-[#4cb7e0] font-semibold text-base sm:text-lg rounded-md transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
            >
              <Link href="/contact" className="flex items-center justify-center gap-2">
                <img
                  src={phoneIcon}
                  alt=""
                  className="w-4 h-4 flex-shrink-0"
                />
                <span className="whitespace-nowrap">Agendar Reunião</span>
              </Link>
            </Button>

            {/* Secondary Button - Receber Proposta */}
            <Button
              asChild
              variant="outline"
              className="h-11 sm:h-12 px-6 sm:px-8 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#4cb7e0] font-semibold text-base sm:text-lg rounded-md transition-all duration-300 w-full sm:w-auto"
            >
              <Link href="/contact?tipo=proposta" className="flex items-center justify-center gap-2">
                <div className="relative w-4 h-4 flex-shrink-0">
                  <img
                    src={documentIcon1}
                    alt=""
                    className="absolute inset-0 w-4 h-4"
                  />
                  <img
                    src={documentIcon2}
                    alt=""
                    className="absolute inset-0 w-4 h-4"
                  />
                </div>
                <span className="whitespace-nowrap">Receber Proposta</span>
              </Link>
            </Button>
          </div>

        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        .animate-boat-1 {
          animation: sail-across 30s linear infinite;
        }

        .animate-boat-2 {
          animation: sail-across-reverse 35s linear infinite;
          animation-delay: -15s;
        }

        @keyframes sail-across {
          0% {
            transform: translateX(-120px) translateY(-50%);
          }
          100% {
            transform: translateX(calc(100vw + 120px)) translateY(-50%);
          }
        }

        @keyframes sail-across-reverse {
          0% {
            transform: translateX(calc(100vw + 140px)) scaleX(-1) translateY(0);
          }
          100% {
            transform: translateX(-140px) scaleX(-1) translateY(0);
          }
        }

        @keyframes wave-drift {
          0%, 100% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(-10px) translateY(-5px);
          }
        }

        @keyframes animate-wave {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(15deg);
          }
        }
      `}</style>
    </section>
  )
}