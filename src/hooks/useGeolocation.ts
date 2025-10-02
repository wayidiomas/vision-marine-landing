'use client'

import { useState, useEffect } from 'react'

interface GeolocationData {
  country: string
  isBrazil: boolean
  loading: boolean
  error: string | null
  hasPermission: boolean | null
  requestPermission: () => void
  showConsentModal: boolean
}

export function useGeolocation(): GeolocationData {
  const [geolocation, setGeolocation] = useState<GeolocationData>({
    country: 'BR', // Default to Brazil
    isBrazil: true,
    loading: false,
    error: null,
    hasPermission: null, // null = not asked, true = granted, false = denied
    requestPermission: () => {},
    showConsentModal: false
  })

  const detectLocation = async () => {
    try {
      setGeolocation(prev => ({ ...prev, loading: true }))

      // Try to get user's location via IP
      const response = await fetch('https://ipapi.co/json/')

      if (!response.ok) {
        throw new Error('Failed to fetch location data')
      }

      const data = await response.json()
      const country = data.country_code || 'BR'
      const isBrazil = country === 'BR'

      setGeolocation(prev => ({
        ...prev,
        country,
        isBrazil,
        loading: false,
        error: null,
        hasPermission: true,
        showConsentModal: false
      }))

      // Store permission in localStorage
      localStorage.setItem('geolocation-permission', 'granted')
    } catch (error) {
      console.warn('Failed to detect location, defaulting to Brazil:', error)
      // Default to Brazil if detection fails
      setGeolocation(prev => ({
        ...prev,
        country: 'BR',
        isBrazil: true,
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        hasPermission: false
      }))
    }
  }

  const requestPermission = () => {
    setGeolocation(prev => ({ ...prev, showConsentModal: true }))
  }

  const handlePermissionResponse = (granted: boolean) => {
    if (granted) {
      detectLocation()
    } else {
      setGeolocation(prev => ({
        ...prev,
        hasPermission: false,
        showConsentModal: false,
        country: 'BR',
        isBrazil: true
      }))
      localStorage.setItem('geolocation-permission', 'denied')
    }
  }

  useEffect(() => {
    // Check if user has already given permission
    const storedPermission = localStorage.getItem('geolocation-permission')

    if (storedPermission === 'granted') {
      detectLocation()
    } else if (storedPermission === 'denied') {
      setGeolocation(prev => ({
        ...prev,
        hasPermission: false,
        country: 'BR',
        isBrazil: true
      }))
    } else {
      // First time - show consent modal
      setGeolocation(prev => ({
        ...prev,
        showConsentModal: true,
        requestPermission: () => handlePermissionResponse(true)
      }))
    }
  }, [])

  // Update requestPermission function
  useEffect(() => {
    setGeolocation(prev => ({
      ...prev,
      requestPermission: () => handlePermissionResponse(true)
    }))
  }, [])

  return {
    ...geolocation,
    requestPermission: () => handlePermissionResponse(true)
  }
}