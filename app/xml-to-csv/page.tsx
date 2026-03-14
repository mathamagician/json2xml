import type { Metadata } from "next";
import SimpleConverter from "@/components/SimpleConverter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free XML to CSV Converter Online — json2xml.com",
  description:
    "Convert XML to CSV instantly in your browser. XML elements become columns, records become rows. Free, private — your data never leaves your machine.",
  keywords: [
    "xml to csv",
    "xml to csv converter",
    "convert xml to csv",
    "xml csv converter",
    "xml to csv online",
    "xml2csv",
    "xml to csv tool",
    "xml to csv free",
    "xml to csv converter online",
    "transform xml to csv",
    "xml csv online",
    "export xml to csv",
  ],
  alternates: {
    canonical: "https://json2xml.com/xml-to-csv",
  },
  openGraph: {
    title: "Free XML to CSV Converter Online — json2xml.com",
    description:
      "Convert XML to CSV instantly in your browser. Free, private, no sign-up required.",
    url: "https://json2xml.com/xml-to-csv",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "XML to CSV Converter — json2xml.com",
  url: "https://json2xml.com/xml-to-csv",
  description:
    "Free online XML to CSV converter. Convert XML elements into CSV columns instantly in your browser. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "How does XML to CSV conversion work?", answer: "XML child elements of each record are used as column headers. Each record element becomes a CSV row with values mapped to the corresponding columns." },
  { question: "Does it handle XML attributes?", answer: "Yes — XML attributes are included as additional columns in the CSV output, prefixed with an @ symbol to distinguish them from element values." },
  { question: "Can I convert CSV back to XML?", answer: "Yes — use the CSV to XML converter at json2xml.com/csv-to-xml to convert CSV back to XML format." },
  { question: "Is this converter free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All conversion happens locally in your browser using JavaScript. Your XML is never uploaded to any server. It's safe to use with sensitive or proprietary data." },
  { question: "What about XML to JSON?", answer: "If you need JSON output instead of CSV, use the XML to JSON converter at json2xml.com/xml-to-json." },
];

const faqItems: FaqItem[] = [
  {
    question: "How does XML to CSV conversion work?",
    answer:
      "XML child elements of each record are used as column headers. Each record element becomes a CSV row with values mapped to the corresponding columns.",
  },
  {
    question: "Does it handle XML attributes?",
    answer:
      "Yes — XML attributes are included as additional columns in the CSV output, prefixed with an @ symbol to distinguish them from element values.",
  },
  {
    question: "Can I convert CSV back to XML?",
    answer: (
      <>
        Yes — use the{" "}
        <a href="/csv-to-xml" className="text-brand-400 hover:underline">CSV to XML converter</a>{" "}
        to convert CSV back to XML format.
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
      "All conversion happens locally in your browser using JavaScript. Your XML is never uploaded to any server. It's safe to use with sensitive or proprietary data.",
  },
  {
    question: "What about XML to JSON?",
    answer: (
      <>
        If you need JSON output instead of CSV, use the{" "}
        <a href="/xml-to-json" className="text-brand-400 hover:underline">XML to JSON converter</a>.
      </>
    ),
  },
];

export default function XmlToCsv() {
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

      <Header currentSlug="/xml-to-csv" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free XML to CSV Converter
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Convert XML to CSV instantly. XML elements become columns, records become rows. Runs in your
            browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <SimpleConverter conversion="xml-to-csv" />
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
              No waiting for a server round-trip. CSV output appears as you type or the
              moment you drop a file.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">📋 Flat Output</h3>
            <p>
              XML hierarchies are flattened into clean CSV rows and columns. Ready for
              spreadsheets, databases, or further data processing.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Convert XML to CSV Online
            </h2>
            <p className="leading-relaxed">
              Paste your XML data into the left panel and the CSV output appears instantly on the right.
              XML element names become column headers and each record element becomes a CSV row.
              You can also drag and drop an <code className="text-slate-300">.xml</code> file or
              use the upload button. Download the result as a <code className="text-slate-300">.csv</code> file.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Common XML to CSV Use Cases
            </h2>
            <p className="leading-relaxed">
              Converting XML to CSV is useful when importing XML data into spreadsheets or databases,
              extracting tabular data from SOAP API responses, preparing XML feeds for analysis in
              Excel or Google Sheets, or flattening hierarchical XML data for reporting and data processing.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/xml-to-csv" />

      <Footer />
    </div>
  );
}
