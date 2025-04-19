"use client"

import { useState, useEffect, useRef } from "react"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import remarkGfm from "remark-gfm"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, FileText, FileType, Download, FileDown, FileCode, AlertCircle, RefreshCw } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { exportToHtml, exportToPdf, exportToTxt, exportToDocx } from "@/lib/export-utils"
import { fallbackPdfExport } from "@/lib/fallback-export"
import { useMobile } from "@/hooks/use-mobile"
import { ErrorBoundary } from "@/components/error-boundary"

const DEFAULT_MARKDOWN = `# Hello, Markdown!

This is a **bold** text, and this is an *italic* text.

## Lists

### Unordered List
- Item 1
- Item 2
- Item 3

### Ordered List
1. First item
2. Second item
3. Third item

## Code

\`\`\`javascript
function greet() {
  console.log("Hello, world!");
}
\`\`\`

## Links and Images

[Visit GitHub](https://github.com)

![Markdown Converter Logo](/placeholder.svg?height=200&width=400)
`

export default function MarkdownConverter() {
  const { toast } = useToast()
  const isMobile = useMobile()
  const previewRef = useRef<HTMLDivElement>(null)

  // Initialize state from localStorage or defaults
  const [markdown, setMarkdown] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("markdown-content") || DEFAULT_MARKDOWN
    }
    return DEFAULT_MARKDOWN
  })

  const [htmlOutput, setHtmlOutput] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("active-tab") || "preview"
    }
    return "preview"
  })

  const [isExporting, setIsExporting] = useState(false)
  const [currentExportFormat, setCurrentExportFormat] = useState<string | null>(null)

  // Save markdown to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem("markdown-content", markdown)
    } catch (error) {
      console.error("Failed to save to localStorage:", error)
      // Don't show an error to the user for this, just log it
    }
  }, [markdown])

  // Save active tab to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem("active-tab", activeTab)
    } catch (error) {
      console.error("Failed to save active tab to localStorage:", error)
    }
  }, [activeTab])

  // Update HTML output when markdown changes
  useEffect(() => {
    setIsLoading(true)
    setError(null)

    // We need to wait for the next render cycle to capture the rendered HTML
    const timer = setTimeout(() => {
      try {
        if (previewRef.current) {
          const tempDiv = document.createElement("div")
          tempDiv.innerHTML = previewRef.current.innerHTML || ""

          // Clean up the HTML (remove data attributes, etc.)
          const cleanHtml = tempDiv.innerHTML
          setHtmlOutput(cleanHtml)
        }
        setIsLoading(false)
      } catch (err) {
        console.error("Failed to update HTML output:", err)
        setError("Failed to render markdown. Please try again.")
        setIsLoading(false)
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [markdown])

  const copyHtmlToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(htmlOutput)
      toast({
        title: "Copied!",
        description: "HTML copied to clipboard",
      })
    } catch (err) {
      console.error("Failed to copy HTML: ", err)
      toast({
        title: "Error",
        description: "Failed to copy HTML to clipboard. Your browser may not support this feature.",
        variant: "destructive",
      })
    }
  }

  const handleExport = async (format: "html" | "pdf" | "txt" | "docx") => {
    setIsExporting(true)
    setCurrentExportFormat(format)
    setError(null)

    try {
      const filename = "markdown-export"

      switch (format) {
        case "html":
          await exportToHtml(htmlOutput, filename)
          break
        case "pdf":
          try {
            await exportToPdf(htmlOutput, filename)
          } catch (error) {
            console.error("Primary PDF export failed, trying fallback method:", error)
            // If the primary method fails, try the fallback method
            await fallbackPdfExport(htmlOutput, filename)
            toast({
              title: "Using alternative PDF method",
              description: "We're using your browser's print function to create the PDF",
            })
          }
          break
        case "txt":
          await exportToTxt(markdown, filename)
          break
        case "docx":
          await exportToDocx(htmlOutput, filename)
          break
      }

      toast({
        title: "Export successful",
        description: `Your file has been exported as ${format.toUpperCase()}`,
      })
    } catch (error) {
      console.error(`Failed to export as ${format}:`, error)
      setError(
        `Export to ${format.toUpperCase()} failed. ${error instanceof Error ? error.message : "Please try again."}`,
      )
      toast({
        title: "Export failed",
        description: `There was an error exporting to ${format.toUpperCase()}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
      setCurrentExportFormat(null)
    }
  }

  return (
    <ErrorBoundary>
      <div className="flex flex-col space-y-4">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4 mr-2" aria-hidden="true" />
            <AlertDescription>{error}</AlertDescription>
            <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setError(null)}>
              Dismiss
            </Button>
          </Alert>
        )}

        <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-4 flex-1`}>
          {/* Markdown Input */}
          <Card className="p-4 flex flex-col h-[calc(50vh-100px)] md:h-[calc(100vh-180px)]">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Markdown</h2>
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (confirm("Are you sure you want to reset to the default markdown?")) {
                            setMarkdown(DEFAULT_MARKDOWN)
                          }
                        }}
                        aria-label="Reset to default markdown"
                      >
                        Reset
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Reset to default markdown</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <textarea
              className="flex-1 p-2 border rounded-md font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Type or paste your Markdown here..."
              aria-label="Markdown input"
            />
          </Card>

          {/* HTML Preview */}
          <Card className="p-4 flex flex-col h-[calc(50vh-100px)] md:h-[calc(100vh-180px)]">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">HTML</h2>
              <div className="flex space-x-2">
                <div className="w-[200px]">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                      <TabsTrigger value="source">Source</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-auto border rounded-md p-4 dark:bg-gray-800 relative">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                  <div className="flex flex-col items-center">
                    <RefreshCw className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
                    <p className="mt-2 text-sm text-muted-foreground">Loading preview...</p>
                  </div>
                </div>
              )}

              <Tabs value={activeTab} className="h-full">
                <TabsContent value="preview" className="h-full mt-0">
                  <div id="markdown-preview" ref={previewRef} className="prose max-w-none dark:prose-invert">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({ node, inline, className, children, ...props }: any) {
                          const match = /language-(\w+)/.exec(className || "")
                          return !inline && match ? (
                            <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          )
                        },
                        img({ src, alt, ...props }) {
                          // Enhance image alt text for SEO
                          const enhancedAlt = alt || "Markdown image"
                          return <img src={src || "/placeholder.svg"} alt={enhancedAlt} {...props} />
                        },
                        a({ href, children, ...props }) {
                          // Add rel attributes for external links
                          const isExternal = href?.startsWith("http")
                          const rel = isExternal ? "noopener noreferrer" : undefined
                          return (
                            <a href={href} rel={rel} {...props}>
                              {children}
                            </a>
                          )
                        },
                      }}
                    >
                      {markdown}
                    </ReactMarkdown>
                  </div>
                </TabsContent>

                <TabsContent value="source" className="h-full mt-0">
                  <pre className="h-full overflow-auto text-sm font-mono p-2 dark:text-gray-100">{htmlOutput}</pre>
                </TabsContent>
              </Tabs>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-end gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={copyHtmlToClipboard}
                disabled={isExporting || isLoading}
                aria-label="Copy HTML to clipboard"
              >
                <Copy className="h-4 w-4 mr-2" aria-hidden="true" />
                Copy HTML
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" disabled={isExporting || isLoading} aria-label="Export options">
                    <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                    {isExporting ? `Exporting ${currentExportFormat?.toUpperCase() || ""}...` : "Export As"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => handleExport("html")}
                    disabled={isExporting || isLoading}
                    aria-label="Export as HTML"
                  >
                    <FileCode className="h-4 w-4 mr-2" aria-hidden="true" />
                    HTML (.html)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleExport("pdf")}
                    disabled={isExporting || isLoading}
                    aria-label="Export as PDF"
                  >
                    <FileType className="h-4 w-4 mr-2" aria-hidden="true" />
                    PDF (.pdf)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleExport("txt")}
                    disabled={isExporting || isLoading}
                    aria-label="Export as TXT"
                  >
                    <FileText className="h-4 w-4 mr-2" aria-hidden="true" />
                    Text (.txt)
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleExport("docx")}
                    disabled={isExporting || isLoading}
                    aria-label="Export as DOCX"
                  >
                    <FileDown className="h-4 w-4 mr-2" aria-hidden="true" />
                    Word (.docx)
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
        </div>

        {/* Features Section */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <FileCode className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-medium">Multiple Export Formats</h3>
                <p className="text-sm text-muted-foreground">Export to HTML, PDF, TXT, and DOCX formats</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Copy className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-medium">One-Click Copy</h3>
                <p className="text-sm text-muted-foreground">Copy HTML with a single click</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <AlertCircle className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-medium">Syntax Highlighting</h3>
                <p className="text-sm text-muted-foreground">Code blocks with syntax highlighting</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Download className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-medium">Auto-Save</h3>
                <p className="text-sm text-muted-foreground">Your content is automatically saved</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </ErrorBoundary>
  )
}
