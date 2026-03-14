import type { Metadata } from "next";
import SimpleConverter from "@/components/SimpleConverter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free CSV to XML Converter Online — json2xml.com",
  description:
    "Convert CSV to XML instantly in your browser. Headers become element names, rows become XML nodes. Free, private — your data never leaves your machine.",
  keywords: [
    "csv to xml",
    "csv to xml converter",
    "convert csv to xml",
    "csv xml converter",
    "csv to xml online",
    "csv2xml",
    "csv to xml tool",
    "csv to xml free",
    "csv to xml converter online",
    "transform csv to xml",
    "csv xml online",
    "export csv to xml",
  ],
  alternates: {
    canonical: "https://json2xml.com/csv-to-xml",
  },
  openGraph: {
    title: "Free CSV to XML Converter Online — json2xml.com",
    description:
      "Convert CSV to XML instantly in your browser. Free, private, no sign-up required.",
    url: "https://json2xml.com/csv-to-xml",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "CSV to XML Converter — json2xml.com",
  url: "https://json2xml.com/csv-to-xml",
  description:
    "Free online CSV to XML converter. Convert CSV rows into XML elements instantly in your browser. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "How does CSV to XML conversion work?", answer: "The first row of your CSV provides the column headers, which become XML element names. Each subsequent row becomes an XML record element containing child elements named after the headers." },
  { question: "Does it handle nested data?", answer: "CSV is a flat format, so each row maps to a flat XML record. If a cell contains a nested object or JSON string, it will be included as a text value within the XML element." },
  { question: "Can I convert XML back to CSV?", answer: "Yes — use the XML to CSV converter at json2xml.com/xml-to-csv to convert XML back to CSV format." },
  { question: "Is this converter free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All conversion happens locally in your browser using JavaScript. Your CSV is never uploaded to any server. It's safe to use with sensitive or proprietary data." },
  { question: "What about CSV to JSON?", answer: "If you need JSON output instead of XML, use the CSV to JSON converter at json2xml.com/csv-to-json." },
];

const faqItems: FaqItem[] = [
  {
    question: "How does CSV to XML conversion work?",
    answer:
      "The first row of your CSV provides the column headers, which become XML element names. Each subsequent row becomes an XML record element containing child elements named after the headers.",
  },
  {
    question: "Does it handle nested data?",
    answer:
      "CSV is a flat format, so each row maps to a flat XML record. If a cell contains a nested object or JSON string, it will be included as a text value within the XML element.",
  },
  {
    question: "Can I convert XML back to CSV?",
    answer: (
      <>
        Yes — use the{" "}
        <a href="/xml-to-csv" className="text-brand-400 hover:underline">XML to CSV converter</a>{" "}
        to convert XML back to CSV format.
      </>
    ),
  },
  {
    question: "Is this converter free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All conversion happens locally in your browser using JavaScript. Your CSV is never uploaded to any server. It's safe to use with sensitive or proprietary data.",
  },
  {
    question: "What about CSV to JSON?",
    answer: (
      <>
        If you need JSON output instead of XML, use the{" "}
        <a href="/csv-to-json" className="text-brand-400 hover:underline">CSV to JSON converter</a>.
      </>
    ),
  },
];

export default function CsvToXml() {
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

      <Header currentSlug="/csv-to-xml" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free CSV to XML Converter
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Convert CSV to XML instantly. Headers become element names, rows become XML nodes. Runs in your
            browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <SimpleConverter conversion="csv-to-xml" />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔒 100% Private</h3>
            <p>
              All conversion happens in your browser using JavaScript. Nothing is
              uploaded to any server. Safe for sensitive business data.
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
            <h3 className="text-slate-200 font-semibold mb-2">🏗️ Smart Structure</h3>
            <p>
              CSV headers are automatically mapped to XML element names. Each row becomes
              a well-structured XML record with proper nesting.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Convert CSV to XML Online
            </h2>
            <p className="leading-relaxed">
              Paste your CSV data into the left panel and the XML output appears instantly on the right.
              The first row is used as column headers which become XML element names. Each subsequent row
              becomes an XML record. You can also drag and drop a <code className="text-slate-300">.csv</code> file or
              use the upload button. Download the result as an <code className="text-slate-300">.xml</code> file.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Common CSV to XML Use Cases
            </h2>
            <p className="leading-relaxed">
              Converting CSV to XML is useful when importing spreadsheet data into XML-based systems,
              preparing data for SOAP APIs, transforming tabular data for enterprise integration platforms,
              or generating XML feeds from CSV exports for data interchange between legacy and modern systems.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/csv-to-xml" />

      <Footer />
    </div>
  );
}
