"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

// Replace with your Google Analytics ID
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return

    // Load Google Analytics script
    const loadGoogleAnalytics = () => {
      const script = document.createElement("script")
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
      script.async = true
      document.head.appendChild(script)

      window.dataLayer = window.dataLayer || []
      function gtag(...args: any[]) {
        window.dataLayer.push(args)
      }
      gtag("js", new Date())
      gtag("config", GA_MEASUREMENT_ID, {
        page_path: pathname,
      })

      // Make gtag available globally
      window.gtag = gtag
    }

    loadGoogleAnalytics()

    // Track page views
    const handleRouteChange = () => {
      if (!window.gtag) return
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: pathname + (searchParams.toString() ? `?${searchParams.toString()}` : ""),
      })
    }

    // Track initial page load
    handleRouteChange()

    return () => {
      // Clean up if needed
    }
  }, [pathname, searchParams])

  return null
}
