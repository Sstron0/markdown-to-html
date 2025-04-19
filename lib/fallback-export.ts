/**
 * Fallback PDF export method that uses browser print functionality
 * This is used as a last resort if the jsPDF method fails
 */
export const fallbackPdfExport = (htmlContent: string, filename: string) => {
  try {
    // Create a new window
    const printWindow = window.open("", "_blank")

    if (!printWindow) {
      throw new Error("Could not open print window. Please check your popup blocker settings.")
    }

    // Write the HTML content to the new window
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${filename}</title>
        <meta charset="utf-8">
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
          @media print {
            body {
              padding: 0;
            }
            .no-print {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom: 20px; text-align: center;">
          <p>Use your browser's print function to save as PDF</p>
          <button onclick="window.print()" style="padding: 8px 16px; background: #0070f3; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Print / Save as PDF
          </button>
        </div>
        ${htmlContent}
      </body>
      </html>
    `)

    // Close the document
    printWindow.document.close()

    return Promise.resolve()
  } catch (error) {
    console.error("Fallback PDF export error:", error)
    return Promise.reject(error)
  }
}
