'use client'

import { useState, useEffect } from 'react'
import { ChatWindow } from './ChatWindow'

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [hasNewMessage, setHasNewMessage] = useState(false)
  const [pulseAnimation, setPulseAnimation] = useState(true)

  // Show button after user scrolls a bit (better UX)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsVisible(scrollY > 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Stop pulse animation after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setPulseAnimation(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setHasNewMessage(false)
  }

  if (!isVisible) return null

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <ChatWindow
          onClose={() => setIsOpen(false)}
          onNewMessage={() => setHasNewMessage(true)}
        />
      )}

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Support Banner - extensão do botão (apenas desktop) */}
        {!isOpen && isVisible && (
          <div className="absolute bottom-full right-0 mb-3 group hidden md:block">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 px-4 py-2 flex items-center space-x-2 animate-fade-in-out">
              {/* Mãozinha */}
              <div className="text-xl">👋</div>
              <span className="text-sm text-gray-700 font-medium whitespace-nowrap">
                Fale com nosso suporte
              </span>
              {/* Arrow pointing down to button */}
              <div className="absolute top-full right-4 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white" />
            </div>
          </div>
        )}

        <button
          onClick={toggleChat}
          className={`
            relative group
            bg-gradient-to-r from-[#4cb7e0] to-[#3a9bc1]
            hover:from-[#3a9bc1] hover:to-[#2891a6]
            text-white
            w-14 h-14 md:w-16 md:h-16
            rounded-full
            shadow-lg hover:shadow-xl
            transition-all duration-300 ease-out
            transform hover:scale-110
            ${pulseAnimation ? 'animate-pulse' : ''}
            ${isOpen ? 'rotate-45' : 'hover:rotate-12'}
          `}
          style={{
            boxShadow: '0 8px 25px rgba(76, 183, 224, 0.4), 0 0 0 0 rgba(76, 183, 224, 0.1)',
            animation: pulseAnimation ? 'chat-pulse 2s infinite' : 'none'
          }}
          aria-label={isOpen ? 'Fechar chat' : 'Abrir chat de suporte'}
        >
          {/* Background Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#4cb7e0] to-[#3a9bc1] opacity-20 blur-xl scale-150 group-hover:opacity-40 transition-opacity duration-300" />

          {/* New Message Indicator */}
          {hasNewMessage && !isOpen && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-bounce">
              <div className="absolute inset-0 bg-red-500 rounded-full animate-ping" />
            </div>
          )}

          {/* Icon Container */}
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            {isOpen ? (
              // Close Icon
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform duration-300"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              // Chat Icon
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform duration-300 group-hover:scale-110"
              >
                <path
                  d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.60608 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>

          {/* Ripple Effect on Click */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-0 group-active:opacity-20 transition-opacity duration-150 rounded-full" />
          </div>
        </button>

      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes chat-pulse {
          0%, 100% {
            box-shadow: 0 8px 25px rgba(76, 183, 224, 0.4), 0 0 0 0 rgba(76, 183, 224, 0.1);
          }
          50% {
            box-shadow: 0 8px 25px rgba(76, 183, 224, 0.6), 0 0 0 10px rgba(76, 183, 224, 0);
          }
        }

        @keyframes fade-in-out {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          20%, 80% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }

        .animate-fade-in-out {
          animation: fade-in-out 4s ease-in-out;
        }
      `}</style>
    </>
  )
}