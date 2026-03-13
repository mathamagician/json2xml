import type { Metadata } from "next";
import ValidatorTool from "@/components/ValidatorTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";

export const metadata: Metadata = {
  title: "Free XML Validator Online — json2xml.com",
  description:
    "Validate XML syntax instantly in your browser. See errors with line and column numbers. Free, private — your data never leaves your machine.",
  keywords: [
    "xml validator",
    "validate xml",
    "xml checker",
    "xml syntax checker",
    "xml validator online",
    "validate xml online",
    "check xml",
    "xml lint",
    "is my xml valid",
    "xml well formed",
    "xml error checker",
    "xml parse error",
  ],
  alternates: {
    canonical: "https://json2xml.com/xml-validator",
  },
  openGraph: {
    title: "Free XML Validator Online — json2xml.com",
    description:
      "Validate XML syntax instantly in your browser. See errors with line and column numbers. Free, private, no sign-up required.",
    url: "https://json2xml.com/xml-validator",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "XML Validator — json2xml.com",
  url: "https://json2xml.com/xml-validator",
  description:
    "Free online XML validator. Check XML syntax and see errors with line numbers instantly in your browser. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqItems: FaqItem[] = [
  {
    question: "What does an XML validator do?",
    answer:
      "An XML validator checks whether your XML is well-formed according to the XML specification. It catches unclosed tags, mismatched tag names, missing attributes, and other structural errors.",
  },
  {
    question: "Is this XML validator free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All validation happens locally in your browser using JavaScript. Your XML is never uploaded to any server. It's safe to use with sensitive or proprietary data.",
  },
  {
    question: "Does it show where the error is?",
    answer:
      "Yes — when your XML is invalid, the validator shows the error message along with the line and column number where the problem was detected.",
  },
  {
    question: "What does 'well-formed' mean?",
    answer:
      "Well-formed XML follows basic syntax rules: every opening tag has a closing tag, tags are properly nested, attribute values are quoted, and special characters are escaped. This is different from schema validation, which checks whether the XML matches a specific schema (XSD).",
  },
  {
    question: "Does it validate against an XSD schema?",
    answer:
      "No — this tool checks whether your XML is well-formed (syntactically correct). Schema validation against XSD or DTD requires server-side processing and is not supported in this privacy-first browser tool.",
  },
  {
    question: "What are common XML errors?",
    answer:
      "The most common XML errors are: unclosed tags, mismatched opening and closing tag names, unescaped ampersands (&) or less-than signs (<) in text content, missing quotes around attribute values, and duplicate attributes on the same element.",
  },
  {
    question: "Can I also format my XML?",
    answer: (
      <>
        Yes — use the{" "}
        <a href="/xml-formatter" className="text-brand-400 hover:underline">XML Formatter</a>{" "}
        to pretty-print or minify your XML with configurable indentation.
      </>
    ),
  },
];

export default function XmlValidator() {
  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header currentSlug="/xml-validator" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free XML Validator
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Check XML syntax instantly with error line and column numbers. Runs in your
            browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <ValidatorTool format="xml" />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔒 100% Private</h3>
            <p>
              All validation happens in your browser using JavaScript. Nothing is
              uploaded to any server. Safe for SOAP messages and config files.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">⚡ Real-time</h3>
            <p>
              Validation runs as you type — no button to click. See results instantly
              as you paste or edit your XML.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">📍 Error Location</h3>
            <p>
              When your XML is malformed, see the exact line and column number
              where the error was detected, along with a descriptive error message.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Validate XML Online
            </h2>
            <p className="leading-relaxed">
              Paste your XML into the left panel and the validation result appears instantly on the right.
              A green checkmark means your XML is well-formed. A red error shows the exact problem with line
              and column numbers. You can also drag and drop an <code className="text-slate-300">.xml</code> file
              or use the upload button.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Common XML Syntax Errors
            </h2>
            <p className="leading-relaxed">
              The most frequent XML errors are: unclosed or mismatched tags (e.g., &lt;div&gt; closed
              with &lt;/span&gt;), unescaped ampersands in text content (use &amp;amp; instead of &amp;),
              unescaped less-than signs (use &amp;lt;), missing quotes around attribute values,
              duplicate attributes on the same element, and invalid characters in tag names.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/xml-validator" />

      <Footer />
    </div>
  );
}
