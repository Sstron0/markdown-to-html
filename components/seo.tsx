"use client"

import Head from "next/head"
import { useRouter } from "next/router"

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  ogType?: "website" | "article"
  keywords?: string
  noIndex?: boolean
}

export function SEO({
  title = "Markdown Converter - Transform Markdown to HTML Instantly",
  description = "Free online tool to convert Markdown to clean HTML with real-time preview. Export to HTML, PDF, DOCX, and TXT formats. No sign-up required.",
  canonical,
  ogImage = "/og-image.jpg",
  ogType = "website",
  keywords = "markdown converter, markdown to html, markdown editor, html converter, markdown preview, markdown export",
  noIndex = false,
}: SEOProps) {
  const router = useRouter()
  const siteUrl = "https://markdown-converter.vercel.app"
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : `${siteUrl}${router.asPath}`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
    </Head>
  )
}
