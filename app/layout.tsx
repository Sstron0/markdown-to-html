import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { NetworkStatus } from "@/components/network-status"
import { ErrorBoundary } from "@/components/error-boundary"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "%s | Markdown Converter",
    default: "Markdown Converter - Transform Markdown to HTML Instantly",
  },
  description:
    "Free online tool to convert Markdown to clean HTML with real-time preview. Export to HTML, PDF, DOCX, and TXT formats. No sign-up required.",
  keywords: [
    "markdown converter",
    "markdown to html",
    "markdown editor",
    "html converter",
    "markdown preview",
    "markdown export",
    "free markdown tool",
  ],
  authors: [{ name: "Markdown Converter Team" }],
  creator: "Markdown Converter",
  publisher: "Markdown Converter",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL("https://markdown-converter.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://markdown-converter.vercel.app",
    title: "Markdown Converter - Transform Markdown to HTML Instantly",
    description:
      "Free online tool to convert Markdown to clean HTML with real-time preview. Export to HTML, PDF, DOCX, and TXT formats. No sign-up required.",
    siteName: "Markdown Converter",
  },
  twitter: {
    card: "summary_large_image",
    title: "Markdown Converter - Transform Markdown to HTML Instantly",
    description:
      "Free online tool to convert Markdown to clean HTML with real-time preview. Export to HTML, PDF, DOCX, and TXT formats. No sign-up required.",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  category: "technology",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Content Security Policy */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdnjs.cloudflare.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.google-analytics.com; connect-src 'self' https://cdnjs.cloudflare.com https://www.google-analytics.com; font-src 'self'; object-src 'none'; media-src 'self'; frame-src 'self';"
        />
        {/* XSS Protection */}
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        {/* Prevent MIME type sniffing */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        {/* Referrer Policy */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ErrorBoundary>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <Suspense>
                <main className="flex-1">{children}</main>
              </Suspense>
              <Footer />
            </div>
            <NetworkStatus />
            <Toaster />
            <Suspense fallback={null}>
              <Analytics />
            </Suspense>
          </ErrorBoundary>
        </ThemeProvider>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Markdown Converter",
              url: "https://markdown-converter.vercel.app",
              description:
                "Free online tool to convert Markdown to HTML with real-time preview. Export to HTML, PDF, DOCX, and TXT formats.",
              applicationCategory: "Utility",
              operatingSystem: "Any",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              featureList: [
                "Real-time Markdown to HTML conversion",
                "Multiple export formats (HTML, PDF, DOCX, TXT)",
                "Syntax highlighting for code blocks",
                "Auto-save functionality",
                "Dark mode support",
              ],
            }),
          }}
        />
      </body>
    </html>
  )
}
