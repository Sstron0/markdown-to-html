import MarkdownConverter from "@/components/markdown-converter"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Markdown to HTML Converter | Free Online Tool",
  description:
    "Convert Markdown to HTML with our free online converter. Real-time preview, syntax highlighting, and multiple export formats including HTML, PDF, DOCX, and TXT.",
  keywords: [
    "markdown converter",
    "markdown to html",
    "html converter",
    "markdown editor",
    "markdown preview",
    "markdown export",
    "free markdown tool",
  ],
  alternates: {
    canonical: "/converter",
  },
}

export default function ConverterPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="sr-only">Markdown to HTML Converter</h1>
      <MarkdownConverter />
    </div>
  )
}
