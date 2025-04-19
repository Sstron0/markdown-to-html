/**
 * Enhanced fetch utility with better error handling and retry capability
 */
export async function enhancedFetch(url: string, options?: RequestInit, retries = 3): Promise<Response> {
  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`)
    }

    return response
  } catch (error) {
    if (retries > 0) {
      console.warn(`Fetch failed, retrying... (${retries} attempts left)`)
      // Exponential backoff - wait longer between each retry
      await new Promise((resolve) => setTimeout(resolve, (4 - retries) * 1000))
      return enhancedFetch(url, options, retries - 1)
    }

    console.error("Fetch failed after retries:", error)
    throw new Error(error instanceof Error ? `Failed to fetch resource: ${error.message}` : "Failed to fetch resource")
  }
}

/**
 * Safely load an external script with error handling
 */
export function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if script already exists
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve()
      return
    }

    const script = document.createElement("script")
    script.src = src
    script.async = true

    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`))

    document.head.appendChild(script)
  })
}

/**
 * Safely load an external stylesheet with error handling
 */
export function loadStylesheet(href: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if stylesheet already exists
    if (document.querySelector(`link[href="${href}"]`)) {
      resolve()
      return
    }

    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = href

    link.onload = () => resolve()
    link.onerror = () => reject(new Error(`Failed to load stylesheet: ${href}`))

    document.head.appendChild(link)
  })
}
