import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Markdown Converter - Transform Markdown to HTML Instantly"
export const contentType = "image/png"
export const size = {
  width: 1200,
  height: 630,
}

export default async function OGImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#f8fafc",
        padding: 40,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0284c7"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 3v4a1 1 0 0 0 1 1h4" />
          <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
          <path d="M9 9h1" />
          <path d="M9 13h6" />
          <path d="M9 17h6" />
        </svg>
        <span
          style={{
            fontSize: 48,
            fontWeight: "bold",
            marginLeft: 16,
            color: "#0f172a",
          }}
        >
          Markdown Converter
        </span>
      </div>
      <div
        style={{
          fontSize: 28,
          color: "#64748b",
          textAlign: "center",
          maxWidth: 800,
        }}
      >
        Transform Markdown to HTML instantly with real-time preview and multiple export options
      </div>
    </div>,
    {
      ...size,
    },
  )
}
