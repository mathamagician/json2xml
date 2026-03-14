import type { Metadata } from "next";
import SimpleConverter from "@/components/SimpleConverter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free XML to YAML Converter Online — json2xml.com",
  description:
    "Convert XML to YAML instantly in your browser. Free, private — your data never leaves your machine. No sign-up required.",
  keywords: [
    "xml to yaml",
    "xml to yaml converter",
    "convert xml to yaml",
    "xml to yaml online",
    "xml to yml",
    "convert xml to yml",
    "xml to yaml tool",
    "xml2yaml",
    "xml to yaml free",
    "xml to yaml online converter",
    "transform xml to yaml",
    "xml yaml converter",
  ],
  alternates: {
    canonical: "https://json2xml.com/xml-to-yaml",
  },
  openGraph: {
    title: "Free XML to YAML Converter Online — json2xml.com",
    description:
      "Convert XML to YAML instantly in your browser. Free, private, no sign-up required.",
    url: "https://json2xml.com/xml-to-yaml",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "XML to YAML Converter — json2xml.com",
  url: "https://json2xml.com/xml-to-yaml",
  description:
    "Free online XML to YAML converter. Convert XML to YAML instantly in your browser. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "Why convert XML to YAML?", answer: "YAML is more human-readable than XML — no closing tags, no angle brackets, and support for comments. Converting XML configs to YAML makes them easier to read and maintain, especially for DevOps workflows." },
  { question: "How does the conversion work?", answer: "The converter first parses XML into a structured object (preserving attributes with the @_ prefix), then serializes that object as YAML. Attributes, nested elements, and text content are all preserved." },
  { question: "Is this converter free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All conversion happens locally in your browser using JavaScript. Your XML is never uploaded to any server. It's safe to use with sensitive or proprietary data." },
  { question: "How are XML attributes handled?", answer: "XML attributes are preserved with an @_ prefix in the YAML output. For example, <book id=\"1\"> becomes a YAML mapping with @_id: 1 as a property." },
  { question: "Can I convert YAML back to XML?", answer: "Yes — use the YAML to XML converter at json2xml.com/yaml-to-xml to convert YAML back to XML." },
];

const faqItems: FaqItem[] = [
  {
    question: "Why convert XML to YAML?",
    answer:
      "YAML is more human-readable than XML — no closing tags, no angle brackets, and support for comments. Converting XML configs to YAML makes them easier to read and maintain, especially for DevOps workflows.",
  },
  {
    question: "How does the conversion work?",
    answer:
      "The converter first parses XML into a structured object (preserving attributes with the @_ prefix), then serializes that object as YAML. Attributes, nested elements, and text content are all preserved.",
  },
  {
    question: "Is this converter free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All conversion happens locally in your browser using JavaScript. Your XML is never uploaded to any server. It's safe to use with sensitive or proprietary data.",
  },
  {
    question: "How are XML attributes handled?",
    answer: (
      <>
        XML attributes are preserved with an <code className="text-slate-300">@_</code> prefix in the YAML output.
        For example, <code className="text-slate-300">&lt;book id=&quot;1&quot;&gt;</code> becomes a YAML mapping
        with <code className="text-slate-300">@_id: 1</code> as a property.
      </>
    ),
  },
  {
    question: "Can I convert YAML back to XML?",
    answer: (
      <>
        Yes — use the{" "}
        <a href="/yaml-to-xml" className="text-brand-400 hover:underline">YAML to XML converter</a>{" "}
        to convert YAML back to XML.
      </>
    ),
  },
];

export default function XmlToYaml() {
  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqSchemaItems)) }}
      />

      <Header currentSlug="/xml-to-yaml" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free XML to YAML Converter
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Convert XML to YAML instantly. Preserves attributes, nested elements, and structure. Runs in your
            browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <SimpleConverter conversion="xml-to-yaml" />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔒 100% Private</h3>
            <p>
              All conversion happens in your browser using JavaScript. Nothing is
              uploaded to any server. Safe for SOAP messages and config files.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">⚡ Instant</h3>
            <p>
              No waiting for a server round-trip. YAML output appears as you type or the
              moment you drop a file.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">📋 Attributes Preserved</h3>
            <p>
              XML attributes are preserved in the YAML output with an @_ prefix,
              so no data is lost during conversion.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Convert XML to YAML Online
            </h2>
            <p className="leading-relaxed">
              Paste your XML into the left panel and the YAML output appears instantly on the right.
              You can also drag and drop an <code className="text-slate-300">.xml</code> file or use the
              upload button. Once converted, copy the YAML to your clipboard or download it as
              a <code className="text-slate-300">.yaml</code> file.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              XML vs YAML — Format Comparison
            </h2>
            <p className="leading-relaxed">
              XML uses opening and closing tags with angle brackets, making it verbose but precise.
              YAML uses indentation to represent structure, making it compact and easy to read.
              Both formats support nested data, but YAML is increasingly preferred for configuration
              files in modern DevOps tooling while XML remains dominant in enterprise systems, SOAP
              services, and document markup.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/xml-to-yaml" />

      <Footer />
    </div>
  );
}
