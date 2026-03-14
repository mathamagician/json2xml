import type { Metadata } from "next";
import FormatterTool from "@/components/FormatterTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free XML Minifier Online — json2xml.com",
  description:
    "Minify XML instantly in your browser. Remove all whitespace to reduce file size. Free, private — your data never leaves your machine.",
  keywords: [
    "xml minifier",
    "minify xml",
    "xml minify",
    "xml compressor",
    "xml minifier online",
    "minify xml online",
    "compress xml",
    "xml whitespace remover",
    "xml compact",
    "xml minify tool",
    "reduce xml size",
    "xml minification",
  ],
  alternates: {
    canonical: "https://json2xml.com/xml-minifier",
  },
  openGraph: {
    title: "Free XML Minifier Online — json2xml.com",
    description:
      "Minify XML instantly in your browser. Remove all whitespace to reduce file size. Free, private, no sign-up required.",
    url: "https://json2xml.com/xml-minifier",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "XML Minifier — json2xml.com",
  url: "https://json2xml.com/xml-minifier",
  description:
    "Free online XML minifier. Remove all whitespace from XML to reduce file size. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What does an XML minifier do?", answer: "An XML minifier removes all unnecessary whitespace — indentation, extra spaces, and line breaks between tags — from your XML, producing the smallest possible output while keeping it valid and well-formed." },
  { question: "Is this XML minifier free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All minification happens locally in your browser using JavaScript. Your XML is never uploaded to any server. It's safe to use with SOAP messages, config files, and proprietary data." },
  { question: "Does minifying change my XML data?", answer: "No — minifying only removes insignificant whitespace between tags. All elements, attributes, text content, and structure remain exactly the same. The output is semantically identical to the input." },
  { question: "When should I minify XML?", answer: "Minify XML when you need to reduce file size for SOAP payloads, RSS feeds, Maven POMs, Spring configurations, or any XML transmitted over the network. Smaller XML means faster transfers and lower bandwidth costs." },
  { question: "Can I also format or pretty-print my XML?", answer: "Yes — use the XML Formatter at json2xml.com/xml-formatter to pretty-print your XML with configurable indentation." },
];

const faqItems: FaqItem[] = [
  {
    question: "What does an XML minifier do?",
    answer:
      "An XML minifier removes all unnecessary whitespace — indentation, extra spaces, and line breaks between tags — from your XML, producing the smallest possible output while keeping it valid and well-formed.",
  },
  {
    question: "Is this XML minifier free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All minification happens locally in your browser using JavaScript. Your XML is never uploaded to any server. It's safe to use with SOAP messages, config files, and proprietary data.",
  },
  {
    question: "Does minifying change my XML data?",
    answer:
      "No — minifying only removes insignificant whitespace between tags. All elements, attributes, text content, and structure remain exactly the same. The output is semantically identical to the input.",
  },
  {
    question: "When should I minify XML?",
    answer:
      "Minify XML when you need to reduce file size for SOAP payloads, RSS feeds, Maven POMs, Spring configurations, or any XML transmitted over the network. Smaller XML means faster transfers and lower bandwidth costs.",
  },
  {
    question: "Can I also format or pretty-print my XML?",
    answer: (
      <>
        Yes — use the{" "}
        <a href="/xml-formatter" className="text-brand-400 hover:underline">XML Formatter</a>{" "}
        to pretty-print your XML with configurable indentation.
      </>
    ),
  },
];

export default function XmlMinifier() {
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

      <Header currentSlug="/xml-minifier" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free XML Minifier
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Remove all whitespace from XML to reduce file size. Runs instantly in your
            browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <FormatterTool format="xml" defaultMinify />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔒 100% Private</h3>
            <p>
              All minification happens in your browser using JavaScript. Nothing is
              uploaded to any server. Safe for SOAP messages and config files.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">⚡ Instant</h3>
            <p>
              No waiting for a server round-trip. Minified output appears as you type or the
              moment you drop a file.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">📦 Smaller Files</h3>
            <p>
              Remove all unnecessary whitespace to reduce XML file size — useful for SOAP
              payloads, RSS feeds, Maven POMs, and Spring configurations.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Minify XML Online
            </h2>
            <p className="leading-relaxed">
              Paste your XML into the left panel and the minified output appears instantly on the right.
              The minify toggle is on by default — just paste and go. You can switch to pretty-print mode
              using the indent selector or the Minify toggle button. You can also drag and drop
              an <code className="text-slate-300">.xml</code> file or use the upload button.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              When to Minify XML
            </h2>
            <p className="leading-relaxed">
              Minifying XML is useful when you need to reduce payload size for SOAP web services,
              compress RSS or Atom feeds, shrink Maven POM or Spring configuration files, or
              transmit XML over bandwidth-constrained connections. Minified XML is semantically
              identical to formatted XML — only insignificant whitespace is removed.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/xml-minifier" />

      <Footer />
    </div>
  );
}
