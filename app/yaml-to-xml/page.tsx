import type { Metadata } from "next";
import SimpleConverter from "@/components/SimpleConverter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free YAML to XML Converter Online — json2xml.com",
  description:
    "Convert YAML to XML instantly in your browser. Free, private — your data never leaves your machine. No sign-up required.",
  keywords: [
    "yaml to xml",
    "yaml to xml converter",
    "convert yaml to xml",
    "yaml to xml online",
    "yml to xml",
    "convert yml to xml",
    "yaml to xml tool",
    "yaml2xml",
    "yaml to xml free",
    "yaml to xml online converter",
    "transform yaml to xml",
    "yaml xml converter",
  ],
  alternates: {
    canonical: "https://json2xml.com/yaml-to-xml",
  },
  openGraph: {
    title: "Free YAML to XML Converter Online — json2xml.com",
    description:
      "Convert YAML to XML instantly in your browser. Free, private, no sign-up required.",
    url: "https://json2xml.com/yaml-to-xml",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "YAML to XML Converter — json2xml.com",
  url: "https://json2xml.com/yaml-to-xml",
  description:
    "Free online YAML to XML converter. Convert YAML to XML instantly in your browser. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "Why convert YAML to XML?", answer: "XML is required by many enterprise systems, SOAP web services, and legacy applications. Converting YAML configuration to XML lets you integrate modern DevOps configs with systems that expect XML input." },
  { question: "How does the conversion work?", answer: "The converter first parses YAML into a JavaScript object, then converts that object to well-formed XML with proper nesting, tags, and an XML declaration." },
  { question: "Is this converter free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All conversion happens locally in your browser using JavaScript. Your YAML is never uploaded to any server. It's safe to use with sensitive or proprietary data." },
  { question: "What YAML features are supported?", answer: "The converter supports all standard YAML features: mappings, sequences, scalars, multi-line strings, anchors, aliases, and nested structures. YAML comments are stripped since XML doesn't have an equivalent in this conversion." },
  { question: "Can I convert XML back to YAML?", answer: "Yes — use the XML to YAML converter at json2xml.com/xml-to-yaml to convert XML back to YAML." },
];

const faqItems: FaqItem[] = [
  {
    question: "Why convert YAML to XML?",
    answer:
      "XML is required by many enterprise systems, SOAP web services, and legacy applications. Converting YAML configuration to XML lets you integrate modern DevOps configs with systems that expect XML input.",
  },
  {
    question: "How does the conversion work?",
    answer:
      "The converter first parses YAML into a JavaScript object, then converts that object to well-formed XML with proper nesting, tags, and an XML declaration.",
  },
  {
    question: "Is this converter free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All conversion happens locally in your browser using JavaScript. Your YAML is never uploaded to any server. It's safe to use with sensitive or proprietary data.",
  },
  {
    question: "What YAML features are supported?",
    answer:
      "The converter supports all standard YAML features: mappings, sequences, scalars, multi-line strings, anchors, aliases, and nested structures. YAML comments are stripped since XML doesn't have an equivalent in this conversion.",
  },
  {
    question: "Can I convert XML back to YAML?",
    answer: (
      <>
        Yes — use the{" "}
        <a href="/xml-to-yaml" className="text-brand-400 hover:underline">XML to YAML converter</a>{" "}
        to convert XML back to YAML.
      </>
    ),
  },
];

export default function YamlToXml() {
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

      <Header currentSlug="/yaml-to-xml" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free YAML to XML Converter
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Convert YAML to well-formed XML instantly. Bridge modern configs with enterprise systems. Runs in your
            browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <SimpleConverter conversion="yaml-to-xml" />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔒 100% Private</h3>
            <p>
              All conversion happens in your browser using JavaScript. Nothing is
              uploaded to any server. Safe for sensitive configuration data.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">⚡ Instant</h3>
            <p>
              No waiting for a server round-trip. XML output appears as you type or the
              moment you drop a file.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">📝 Well-Formed XML</h3>
            <p>
              Output includes an XML declaration, properly nested tags, and escaped
              special characters. Ready to use in any XML-compatible system.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Convert YAML to XML Online
            </h2>
            <p className="leading-relaxed">
              Paste your YAML into the left panel and the XML output appears instantly on the right.
              You can also drag and drop a <code className="text-slate-300">.yaml</code> or{" "}
              <code className="text-slate-300">.yml</code> file or use the upload button. Once converted,
              copy the XML to your clipboard or download it as an <code className="text-slate-300">.xml</code> file.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              When to Convert YAML to XML
            </h2>
            <p className="leading-relaxed">
              Converting YAML to XML is useful when you need to feed configuration data into XML-based
              systems like SOAP web services, Maven builds, Spring frameworks, or legacy enterprise
              applications. It&apos;s also helpful when generating XML documents from YAML templates or
              integrating modern CI/CD pipeline configs with XML-dependent tools.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/yaml-to-xml" />

      <Footer />
    </div>
  );
}
