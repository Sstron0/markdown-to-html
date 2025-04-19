import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Markdown Converter | Free Markdown to HTML Tool",
  description:
    "Learn about our free Markdown to HTML converter tool. Discover features, privacy policy, and how we help you transform Markdown content into clean HTML.",
  keywords: [
    "about markdown converter",
    "markdown to html tool",
    "markdown converter features",
    "free markdown editor",
    "markdown privacy",
  ],
  alternates: {
    canonical: "/about",
  },
}

export default function AboutPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Markdown Converter</h1>

        <div className="prose dark:prose-invert max-w-none">
          <p>
            Markdown Converter is a free, open-source tool designed to help you convert Markdown text into clean,
            formatted HTML. Our goal is to provide a simple, fast, and secure way to transform your content without any
            hassle.
          </p>

          <h2>Our Mission</h2>
          <p>
            We believe that content creation should be simple and accessible to everyone. Markdown provides an easy way
            to format text, but sometimes you need HTML output for various purposes. Our tool bridges this gap, allowing
            you to write in Markdown and export to multiple formats including HTML, PDF, TXT, and DOCX.
          </p>

          <h2>Key Features</h2>
          <ul>
            <li>
              <strong>Real-time Preview:</strong> See your HTML output instantly as you type
            </li>
            <li>
              <strong>Multiple Export Options:</strong> Export to HTML, PDF, TXT, or DOCX
            </li>
            <li>
              <strong>Syntax Highlighting:</strong> Beautiful code blocks with syntax highlighting
            </li>
            <li>
              <strong>Local Storage:</strong> Your content is automatically saved in your browser
            </li>
            <li>
              <strong>Privacy-Focused:</strong> Your data never leaves your browser
            </li>
            <li>
              <strong>Dark Mode:</strong> Choose between light and dark themes
            </li>
            <li>
              <strong>Responsive Design:</strong> Works on desktop and mobile devices
            </li>
          </ul>

          <h2>Privacy & Security</h2>
          <p>
            We take your privacy seriously. All processing happens directly in your browser - your content is never sent
            to any server. We use local storage to save your work, but this data remains on your device only.
          </p>
          <p>Our application implements several security measures including:</p>
          <ul>
            <li>Content Security Policy (CSP) to prevent XSS attacks</li>
            <li>HTML sanitization to ensure safe output</li>
            <li>Secure input handling to prevent injection attacks</li>
          </ul>

          <h2>Get Started</h2>
          <p>Ready to try it out? Head over to our converter and start transforming your Markdown content today!</p>
        </div>

        <div className="mt-8 flex justify-center">
          <Button asChild size="lg">
            <Link href="/converter" aria-label="Go to the Markdown Converter tool">
              Go to Converter
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
