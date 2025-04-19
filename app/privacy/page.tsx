import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Markdown Converter",
  description:
    "Read our privacy policy to understand how Markdown Converter handles your data when you use our free online Markdown to HTML conversion tool.",
  keywords: ["privacy policy", "markdown converter privacy", "data privacy", "user privacy", "privacy terms"],
  alternates: {
    canonical: "/privacy",
  },
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <div className="prose dark:prose-invert max-w-none">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <h2>1. Introduction</h2>
          <p>
            At Markdown Converter, we respect your privacy and are committed to protecting it through our compliance
            with this policy. This Privacy Policy describes the types of information we may collect from you or that you
            may provide when you use our website and our practices for collecting, using, maintaining, protecting, and
            disclosing that information.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We collect several types of information from and about users of our website, including:</p>
          <ul>
            <li>
              <strong>Local Storage Data:</strong> We use browser local storage to save your Markdown content and
              preferences (such as theme choice) to improve your user experience. This data is stored only on your
              device and is not transmitted to our servers.
            </li>
            <li>
              <strong>Usage Details:</strong> When you visit our website, we may automatically collect certain
              information about your equipment, browsing actions, and patterns. This information is collected using
              cookies and similar technologies.
            </li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>
            We use information that we collect about you or that you provide to us, including any personal information:
          </p>
          <ul>
            <li>To present our website and its contents to you.</li>
            <li>To provide you with information, products, or services that you request from us.</li>
            <li>To improve our website and user experience.</li>
            <li>To fulfill any other purpose for which you provide it.</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We have implemented measures designed to secure your information from accidental loss and from unauthorized
            access, use, alteration, and disclosure. All processing of your content happens directly in your browser -
            your content is never sent to our servers.
          </p>

          <h2>5. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We have no control over the content, privacy
            policies, or practices of any third-party website. You are subject to the policies of those third-party
            websites where applicable. We encourage you to review the privacy policies of these third-party websites
            before providing any personal information.
          </p>

          <h2>6. Children's Privacy</h2>
          <p>
            Our website is not intended for children under 13 years of age. We do not knowingly collect personal
            information from children under 13.
          </p>

          <h2>7. Changes to Our Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. If we make material changes to how we treat our users'
            information, we will post the new Privacy Policy on this page.
          </p>

          <h2>8. Contact Information</h2>
          <p>
            To ask questions or comment about this Privacy Policy and our privacy practices, contact us at:
            privacy@markdownconverter.com
          </p>
        </div>
      </div>
    </div>
  )
}
