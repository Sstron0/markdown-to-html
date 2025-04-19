import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms and Conditions | Markdown Converter",
  description:
    "Read the terms and conditions for using Markdown Converter, our free online tool for converting Markdown to HTML.",
  keywords: ["terms and conditions", "markdown converter terms", "usage terms", "legal", "user agreement"],
  alternates: {
    canonical: "/terms",
  },
}

export default function TermsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

        <div className="prose dark:prose-invert max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h2>1. Introduction</h2>
          <p>
            Welcome to Markdown Converter. These Terms and Conditions govern your use of our website and services. By
            accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of the
            terms, you may not access the website.
          </p>

          <h2>2. Intellectual Property Rights</h2>
          <p>
            Other than the content you own, under these Terms, Markdown Converter and/or its licensors own all the
            intellectual property rights and materials contained in this Website. You are granted a limited license only
            for purposes of viewing the material contained on this Website.
          </p>

          <h2>3. Restrictions</h2>
          <p>You are specifically restricted from all of the following:</p>
          <ul>
            <li>Publishing any Website material in any other media</li>
            <li>Selling, sublicensing and/or otherwise commercializing any Website material</li>
            <li>Publicly performing and/or showing any Website material</li>
            <li>Using this Website in any way that is or may be damaging to this Website</li>
            <li>Using this Website in any way that impacts user access to this Website</li>
            <li>
              Using this Website contrary to applicable laws and regulations, or in any way may cause harm to the
              Website, or to any person or business entity
            </li>
            <li>
              Engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to
              this Website
            </li>
          </ul>

          <h2>4. Your Content</h2>
          <p>
            In these Terms and Conditions, "Your Content" shall mean any text, images or other material you choose to
            process using our service. By using our service, you grant us the right to process Your Content solely for
            the purpose of providing the service to you.
          </p>
          <p>
            You are responsible for Your Content, and you are responsible for ensuring that it does not violate any
            applicable laws or regulations.
          </p>

          <h2>5. No Warranties</h2>
          <p>
            This Website is provided "as is," with all faults, and Markdown Converter express no representations or
            warranties, of any kind related to this Website or the materials contained on this Website.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            In no event shall Markdown Converter, nor any of its officers, directors and employees, be held liable for
            anything arising out of or in any way connected with your use of this Website.
          </p>

          <h2>7. Privacy</h2>
          <p>
            Please review our Privacy Policy, which also governs your visit to our website, to understand our practices.
          </p>

          <h2>8. Changes to Terms</h2>
          <p>
            Markdown Converter reserves the right to modify these terms from time to time at our sole discretion.
            Therefore, you should review these pages periodically.
          </p>

          <h2>9. Governing Law & Jurisdiction</h2>
          <p>
            These Terms will be governed by and interpreted in accordance with the laws, and you submit to the
            non-exclusive jurisdiction of the courts located in your jurisdiction for the resolution of any disputes.
          </p>
        </div>
      </div>
    </div>
  )
}
