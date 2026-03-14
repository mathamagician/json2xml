import type { Metadata } from "next";
import SimpleConverter from "@/components/SimpleConverter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free CSV to JSON Converter Online — json2xml.com",
  description:
    "Convert CSV to JSON instantly in your browser. Headers become keys, rows become objects. Free, private — your data never leaves your machine.",
  keywords: [
    "csv to json",
    "csv to json converter",
    "convert csv to json",
    "csv to json online",
    "csv json converter",
    "csv to json tool",
    "csv2json",
    "csv to json free",
    "csv to json online converter",
    "csv to json array",
    "import csv to json",
    "csv to json objects",
  ],
  alternates: {
    canonical: "https://json2xml.com/csv-to-json",
  },
  openGraph: {
    title: "Free CSV to JSON Converter Online — json2xml.com",
    description:
      "Convert CSV to JSON instantly in your browser. Free, private, no sign-up required.",
    url: "https://json2xml.com/csv-to-json",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "CSV to JSON Converter — json2xml.com",
  url: "https://json2xml.com/csv-to-json",
  description:
    "Free online CSV to JSON converter. Convert CSV to a JSON array of objects instantly in your browser. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "How does CSV to JSON conversion work?", answer: "The first row of your CSV is used as column headers (keys). Each subsequent row becomes a JSON object with those keys. The result is a JSON array of objects." },
  { question: "Does it handle quoted values?", answer: "Yes — values containing commas, quotes, or newlines are handled correctly per RFC 4180. Quoted fields are unquoted automatically." },
  { question: "Does it auto-detect types?", answer: "Yes — numbers and booleans are automatically converted to their JSON types. For example, \"42\" becomes 42 (number) and \"true\" becomes true (boolean). Strings remain as strings." },
  { question: "Is this converter free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All conversion happens locally in your browser using JavaScript. Your CSV is never uploaded to any server. It's safe to use with sensitive or proprietary data." },
  { question: "Can I convert JSON back to CSV?", answer: "Yes — use the JSON to CSV converter at json2xml.com/json-to-csv to convert a JSON array back to CSV." },
];

const faqItems: FaqItem[] = [
  {
    question: "How does CSV to JSON conversion work?",
    answer:
      "The first row of your CSV is used as column headers (keys). Each subsequent row becomes a JSON object with those keys. The result is a JSON array of objects.",
  },
  {
    question: "Does it handle quoted values?",
    answer:
      "Yes — values containing commas, quotes, or newlines are handled correctly per RFC 4180. Quoted fields are unquoted automatically.",
  },
  {
    question: "Does it auto-detect types?",
    answer: (
      <>
        Yes — numbers and booleans are automatically converted to their JSON types. For example,{" "}
        <code className="text-slate-300">&quot;42&quot;</code> becomes{" "}
        <code className="text-slate-300">42</code> (number) and{" "}
        <code className="text-slate-300">&quot;true&quot;</code> becomes{" "}
        <code className="text-slate-300">true</code> (boolean). Strings remain as strings.
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
    question: "Can I convert JSON back to CSV?",
    answer: (
      <>
        Yes — use the{" "}
        <a href="/json-to-csv" className="text-brand-400 hover:underline">JSON to CSV converter</a>{" "}
        to convert a JSON array back to CSV.
      </>
    ),
  },
];

export default function CsvToJson() {
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

      <Header currentSlug="/csv-to-json" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free CSV to JSON Converter
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Convert CSV to a JSON array of objects instantly. Auto-detects types for numbers and booleans. Runs in your
            browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <SimpleConverter conversion="csv-to-json" />
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
              No waiting for a server round-trip. JSON output appears as you type or the
              moment you drop a file.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔢 Smart Types</h3>
            <p>
              Numbers, booleans, and null values are automatically converted to their
              proper JSON types. No manual cleanup needed.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Convert CSV to JSON Online
            </h2>
            <p className="leading-relaxed">
              Paste your CSV data into the left panel and the JSON output appears instantly on the right.
              The first row is used as column headers (object keys). Each subsequent row becomes a JSON
              object. You can also drag and drop a <code className="text-slate-300">.csv</code> file or
              use the upload button. Download the result as a <code className="text-slate-300">.json</code> file.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Common CSV to JSON Use Cases
            </h2>
            <p className="leading-relaxed">
              Converting CSV to JSON is useful when importing spreadsheet data into web applications,
              preparing data for REST APIs, loading CSV exports into NoSQL databases, or transforming
              tabular data for use in JavaScript, Python, or other programming languages that work
              natively with JSON.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/csv-to-json" />

      <Footer />
    </div>
  );
}
