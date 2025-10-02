'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'

interface AnimatedNumberProps {
  value: string
  className?: string
  delay?: number
}

export function AnimatedNumber({ value, className = '', delay = 0 }: AnimatedNumberProps) {
  const [animatedNumber, setAnimatedNumber] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  // Memoize parsed values to avoid re-computation
  const { targetNumber, suffix } = useMemo(() => {
    const numMatch = value.match(/[\d,]+/)
    const suffixMatch = value.match(/[^\d,]+/)

    return {
      targetNumber: numMatch ? parseInt(numMatch[0].replace(/,/g, '')) : 0,
      suffix: suffixMatch ? suffixMatch[0] : ''
    }
  }, [value])

  // Optimized intersection observer callback
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true)
      }
    })
  }, [isVisible])

  // Intersection Observer for scroll trigger
  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
      rootMargin: '0px 0px -50px 0px'
    })

    observer.observe(element)
    return () => observer.unobserve(element)
  }, [handleIntersection])

  // Optimized animation with useCallback
  const startAnimation = useCallback(() => {
    if (!isVisible || hasAnimated || targetNumber <= 0) return

    setHasAnimated(true)
    const startTime = Date.now() + delay
    const duration = 800

    const animate = () => {
      const elapsed = Date.now() - startTime

      if (elapsed < 0) {
        requestAnimationFrame(animate)
        return
      }

      if (elapsed < duration) {
        const progress = elapsed / duration
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentValue = Math.floor(targetNumber * easeOutQuart)
        setAnimatedNumber(currentValue)
        requestAnimationFrame(animate)
      } else {
        setAnimatedNumber(targetNumber)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, hasAnimated, targetNumber, delay])

  useEffect(() => {
    startAnimation()
  }, [startAnimation])

  // Memoize display value to avoid re-computation
  const displayValue = useMemo(() => {
    return targetNumber > 0 ? `${animatedNumber}${suffix}` : value
  }, [animatedNumber, suffix, targetNumber, value])

  return (
    <div
      ref={elementRef}
      className={`${className} transition-all duration-500 ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-70 transform translate-y-2'
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        willChange: 'transform, opacity'
      }}
    >
      {displayValue}
    </div>
  )
}