'use client'

import { useRef, useEffect } from 'react'

export function ScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isExpanded = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      const mobileCard = document.querySelector('[data-scroll-card]') as HTMLElement
      const courseContent = document.querySelector('[data-course-content]') as HTMLElement

      if (!mobileCard || !courseContent) return

      const cardRect = mobileCard.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Progresso simples: quando card está visível
      const cardVisible = cardRect.top < windowHeight && cardRect.bottom > 0
      const cardTopPosition = cardRect.top

      console.log('CardTop:', cardTopPosition.toFixed(0), 'Visible:', cardVisible, 'Expanded:', isExpanded.current)

      // ROTAÇÃO: Sempre que o card estiver na parte superior da tela
      if (cardTopPosition <= 100) {
        mobileCard.style.transform = 'rotate(0deg)'
      } else {
        const rotation = Math.min(3, (cardTopPosition - 100) / 50)
        mobileCard.style.transform = `rotate(${rotation}deg)`
      }

      // EXPANSÃO: Lógica super simples
      if (!isExpanded.current && cardTopPosition <= 50) {
        // ABRE quando card chega perto do topo
        courseContent.style.maxHeight = '800px'
        courseContent.style.opacity = '1'
        isExpanded.current = true
        console.log('OPENED!')
      } else if (isExpanded.current && cardTopPosition >= 300) {
        // FECHA quando card volta para baixo
        courseContent.style.maxHeight = '0px'
        courseContent.style.opacity = '0'
        isExpanded.current = false
        console.log('CLOSED!')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative h-0 bg-transparent"
    />
  )
}