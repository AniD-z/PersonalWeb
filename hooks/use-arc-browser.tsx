"use client"

import { useState, useEffect } from 'react'

export function useArcBrowser() {
  const [isArcBrowser, setIsArcBrowser] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent.toLowerCase()
      const isArc = userAgent.includes('arc') || 
                   userAgent.includes('company.thebrowser.browser') ||
                   // Additional Arc browser detection patterns
                   userAgent.includes('thebrowser') ||
                   (window as any).chrome?.browserAction !== undefined && 
                   userAgent.includes('chrome') && 
                   !userAgent.includes('edg') && 
                   !userAgent.includes('opr')
      
      setIsArcBrowser(isArc)
    }
  }, [])

  return { isArcBrowser, isClient }
}
