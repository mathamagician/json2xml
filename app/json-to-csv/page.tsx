import type { Metadata } from "next";
import SimpleConverter from "@/components/SimpleConverter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free JSON to CSV Converter Online — json2xml.com",
  description:
    "Convert JSON arrays to CSV instantly in your browser. Handles nested objects with dot-notation flattening. Free, private — your data never leaves your machine.",
  keywords: [
    "json to csv",
    "json to csv converter",
    "convert json to csv",
    "json to csv online",
    "json csv converter",
    "json to csv tool",
    "json2csv",
    "json to csv free",
    "json to csv online converter",
    "json array to csv",
    "export json to csv",
    "json to spreadsheet",
  ],
  alternates: {
    canonical: "https://json2xml.com/json-to-csv",
  },
  openGraph: {
    title: "Free JSON to CSV Converter Online — json2xml.com",
    description:
      "Convert JSON arrays to CSV instantly in your browser. Free, private, no sign-up required.",
    url: "https://json2xml.com/json-to-csv",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSON to CSV Converter — json2xml.com",
  url: "https://json2xml.com/json-to-csv",
  description:
    "Free online JSON to CSV converter. Convert JSON arrays to CSV instantly in your browser. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What JSON structure works with CSV?", answer: "The converter expects a JSON array of objects, like [{\"name\": \"Alice\", \"age\": 30}, {\"name\": \"Bob\", \"age\": 25}]. Each object becomes a row, and each key becomes a column header." },
  { question: "How are nested objects handled?", answer: "Nested objects are flattened using dot notation. For example, {\"address\": {\"city\": \"NYC\"}} becomes a column called \"address.city\". Arrays within objects are stringified as JSON." },
  { question: "Is this converter free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All conversion happens locally in your browser using JavaScript. Your JSON is never uploaded to any server. It's safe to use with sensitive or proprietary data." },
  { question: "What delimiter is used?", answer: "The output uses commas as the delimiter (standard CSV). Values containing commas, quotes, or newlines are automatically quoted per RFC 4180." },
  { question: "Can I convert CSV back to JSON?", answer: "Yes — use the CSV to JSON converter at json2xml.com/csv-to-json to convert CSV data back to a JSON array of objects." },
];

const faqItems: FaqItem[] = [
  {
    question: "What JSON structure works with CSV?",
    answer: (
      <>
        The converter expects a JSON array of objects, like{" "}
        <code className="text-slate-300">[{`{"name": "Alice", "age": 30}`}]</code>. Each object
        becomes a row, and each key becomes a column header.
      </>
    ),
  },
  {
    question: "How are nested objects handled?",
    answer: (
      <>
        Nested objects are flattened using dot notation. For example,{" "}
        <code className="text-slate-300">{`{"address": {"city": "NYC"}}`}</code> becomes a column
        called <code className="text-slate-300">address.city</code>. Arrays within objects are
        stringified as JSON.
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
      "All conversion happens locally in your browser using JavaScript. Your JSON is never uploaded to any server. It's safe to use with sensitive or proprietary data.",
  },
  {
    question: "What delimiter is used?",
    answer:
      "The output uses commas as the delimiter (standard CSV). Values containing commas, quotes, or newlines are automatically quoted per RFC 4180.",
  },
  {
    question: "Can I convert CSV back to JSON?",
    answer: (
      <>
        Yes — use the{" "}
        <a href="/csv-to-json" className="text-brand-400 hover:underline">CSV to JSON converter</a>{" "}
        to convert CSV data back to a JSON array of objects.
      </>
    ),
  },
];

export default function JsonToCsv() {
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

      <Header currentSlug="/json-to-csv" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free JSON to CSV Converter
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Convert JSON arrays to CSV instantly. Nested objects are flattened automatically. Runs in your
            browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <SimpleConverter conversion="json-to-csv" />
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
            <h3 className="text-slate-200 font-semibold mb-2">🔀 Smart Flattening</h3>
            <p>
              Nested JSON objects are automatically flattened using dot notation
              (e.g., address.city). No data is lost in conversion.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Convert JSON to CSV Online
            </h2>
            <p className="leading-relaxed">
              Paste a JSON array of objects into the left panel and the CSV output appears instantly on the
              right. Each object in the array becomes a row, and each unique key becomes a column header.
              You can also drag and drop a <code className="text-slate-300">.json</code> file or use the
              upload button. Download the result as a <code className="text-slate-300">.csv</code> file
              that opens in Excel, Google Sheets, or any spreadsheet tool.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              JSON vs CSV — When to Use Which
            </h2>
            <p className="leading-relaxed">
              JSON is ideal for nested, hierarchical data and API communication. CSV is ideal for
              flat, tabular data that needs to be opened in spreadsheets, imported into databases,
              or processed by data analysis tools. Converting JSON to CSV bridges the gap between
              developer-friendly data formats and analyst-friendly spreadsheet formats.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/json-to-csv" />

      <Footer />
    </div>
  );
}
