import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Code, Download, Shield } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home | Markdown Converter",
  description:
    "Free online tool to convert Markdown to clean HTML with real-time preview. Export to HTML, PDF, DOCX, and TXT formats. No sign-up required.",
  alternates: {
    canonical: "/",
  },
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)]">
      {/* Hero Section */}
      <section className="py-20 px-4" aria-labelledby="hero-heading">
        <div className="container mx-auto text-center">
          <h1 id="hero-heading" className="text-4xl md:text-6xl font-bold mb-6">
            Convert Markdown to HTML with Ease
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            A simple, fast, and secure tool to transform your Markdown content into clean HTML.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/converter" aria-label="Start converting markdown to HTML">
                <FileText className="h-5 w-5" aria-hidden="true" />
                Start Converting
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/about" aria-label="Learn more about Markdown Converter">
                <Code className="h-5 w-5" aria-hidden="true" />
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50" aria-labelledby="features-heading">
        <div className="container mx-auto">
          <h2 id="features-heading" className="text-3xl font-bold text-center mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <FileText className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Preview</h3>
              <p className="text-muted-foreground">See your HTML output instantly as you type your Markdown.</p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Download className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Export Options</h3>
              <p className="text-muted-foreground">Export your content as HTML, PDF, TXT, or DOCX files.</p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Shield className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">Your content never leaves your browser. No server processing.</p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow-sm">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Code className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Syntax Highlighting</h3>
              <p className="text-muted-foreground">
                Beautiful code blocks with syntax highlighting for various languages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4" aria-labelledby="cta-heading">
        <div className="container mx-auto text-center">
          <h2 id="cta-heading" className="text-3xl font-bold mb-6">
            Ready to Convert Your Markdown?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start using our free Markdown converter today. No sign-up required.
          </p>
          <Button asChild size="lg">
            <Link href="/converter" aria-label="Get started with Markdown Converter">
              Get Started
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
