import { Document, Packer, Paragraph, TextRun } from "docx"
import DOMPurify from "dompurify"
import { loadScript } from "./fetch-utils"

// Helper function to sanitize HTML content
const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "a",
      "ul",
      "ol",
      "li",
      "b",
      "i",
      "strong",
      "em",
      "code",
      "pre",
      "blockquote",
      "img",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "hr",
      "br",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "class"],
  })
}

export const exportToHtml = (htmlContent: string, filename: string) => {
  try {
    // Sanitize the HTML content
    const sanitizedHtml = sanitizeHtml(htmlContent)

    // Create a blob with the HTML content
    const blob = new Blob(
      [
        `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${filename}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            padding: 2em;
            max-width: 800px;
            margin: 0 auto;
          }
          pre {
            background-color: #f5f5f5;
            padding: 1em;
            border-radius: 4px;
            overflow-x: auto;
          }
          code {
            font-family: 'Courier New', Courier, monospace;
          }
          img {
            max-width: 100%;
          }
        </style>
      </head>
      <body>
        ${sanitizedHtml}
      </body>
      </html>
    `,
      ],
      { type: "text/html" },
    )

    // Create a URL for the blob
    const url = URL.createObjectURL(blob)

    // Create a link element
    const link = document.createElement("a")
    link.href = url
    link.download = `${filename}.html`

    // Append the link to the body
    document.body.appendChild(link)

    // Click the link
    link.click()

    // Remove the link
    document.body.removeChild(link)

    // Release the URL
    URL.revokeObjectURL(url)

    return Promise.resolve()
  } catch (error) {
    console.error("HTML export error:", error)
    return Promise.reject(error)
  }
}

// Load jsPDF and html2canvas on demand
const loadPdfLibraries = async () => {
  try {
    // Try to use CDN versions if available
    await Promise.all([
      loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"),
      loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"),
    ])

    // Check if libraries are available in the global scope
    if (typeof window.jspdf !== "undefined" && typeof window.html2canvas !== "undefined") {
      return {
        jsPDF: window.jspdf.jsPDF,
        html2canvas: window.html2canvas,
      }
    }

    // If CDN fails, try to dynamically import the libraries
    const [jsPDFModule, html2canvasModule] = await Promise.all([import("jspdf"), import("html2canvas")])

    return {
      jsPDF: jsPDFModule.default,
      html2canvas: html2canvasModule.default,
    }
  } catch (error) {
    console.error("Failed to load PDF libraries:", error)
    throw new Error("Failed to load PDF export libraries. Please try the fallback method.")
  }
}

export const exportToPdf = async (htmlContent: string, filename: string) => {
  try {
    // Try to load the PDF libraries
    const { jsPDF, html2canvas } = await loadPdfLibraries()

    // Create a temporary container for the HTML content
    const container = document.createElement("div")
    container.innerHTML = sanitizeHtml(htmlContent)
    container.style.width = "794px" // A4 width in pixels at 96 DPI
    container.style.padding = "40px"
    container.style.position = "absolute"
    container.style.left = "-9999px"
    container.style.fontFamily =
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif'

    document.body.appendChild(container)

    // Render the HTML to canvas
    const canvas = await html2canvas(container, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      allowTaint: true,
    })

    // Remove the temporary container
    document.body.removeChild(container)

    // Calculate the PDF dimensions (A4 format)
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const canvasWidth = canvas.width
    const canvasHeight = canvas.height

    // Calculate the number of pages
    const pageCount = Math.ceil(canvasHeight / ((canvasWidth * pdfHeight) / pdfWidth))

    // Add each canvas page to the PDF
    for (let i = 0; i < pageCount; i++) {
      if (i > 0) {
        pdf.addPage()
      }

      // Calculate the slice of the canvas for this page
      const sliceHeight = (canvasWidth * pdfHeight) / pdfWidth
      const sliceY = i * sliceHeight

      // Create a temporary canvas for the slice
      const tmpCanvas = document.createElement("canvas")
      tmpCanvas.width = canvasWidth
      tmpCanvas.height = Math.min(sliceHeight, canvasHeight - sliceY)

      const tmpCtx = tmpCanvas.getContext("2d")
      if (tmpCtx) {
        tmpCtx.drawImage(canvas, 0, sliceY, canvasWidth, tmpCanvas.height, 0, 0, canvasWidth, tmpCanvas.height)

        const pageImgData = tmpCanvas.toDataURL("image/png")
        pdf.addImage(pageImgData, "PNG", 0, 0, pdfWidth, pdfHeight)
      }
    }

    // Save the PDF
    pdf.save(`${filename}.pdf`)

    return Promise.resolve()
  } catch (error) {
    console.error("PDF export error:", error)
    return Promise.reject(error)
  }
}

export const exportToTxt = (markdownContent: string, filename: string) => {
  try {
    // Create a blob with the markdown content
    const blob = new Blob([markdownContent], { type: "text/plain" })

    // Create a URL for the blob
    const url = URL.createObjectURL(blob)

    // Create a link element
    const link = document.createElement("a")
    link.href = url
    link.download = `${filename}.txt`

    // Append the link to the body
    document.body.appendChild(link)

    // Click the link
    link.click()

    // Remove the link
    document.body.removeChild(link)

    // Release the URL
    URL.revokeObjectURL(url)

    return Promise.resolve()
  } catch (error) {
    console.error("TXT export error:", error)
    return Promise.reject(error)
  }
}

export const exportToDocx = async (htmlContent: string, filename: string) => {
  try {
    // This is a simplified version that converts HTML to plain text for DOCX
    // For a more complete solution, you would need a more sophisticated HTML to DOCX converter

    // Create a temporary element to extract text from HTML
    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = sanitizeHtml(htmlContent)
    const textContent = tempDiv.textContent || tempDiv.innerText || ""

    // Create a new document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [new TextRun(textContent)],
            }),
          ],
        },
      ],
    })

    // Generate the document as a blob
    const blob = await Packer.toBlob(doc)

    // Create a URL for the blob
    const url = URL.createObjectURL(blob)

    // Create a link element
    const link = document.createElement("a")
    link.href = url
    link.download = `${filename}.docx`

    // Append the link to the body
    document.body.appendChild(link)

    // Click the link
    link.click()

    // Remove the link
    document.body.removeChild(link)

    // Release the URL
    URL.revokeObjectURL(url)

    return Promise.resolve()
  } catch (error) {
    console.error("DOCX export error:", error)
    return Promise.reject(error)
  }
}
