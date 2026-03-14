import type { Metadata } from "next";
import JsonToHtmlTable from "@/components/JsonToHtmlTable";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free JSON to HTML Table Converter Online — json2xml.com",
  description:
    "Convert a JSON array of objects to a styled HTML table instantly in your browser. Preview the table or copy the raw HTML. Free, private — your data never leaves your machine.",
  keywords: [
    "json to html table",
    "json to table",
    "json table converter",
    "convert json to html table",
    "json to html",
    "json table generator",
    "json to table online",
    "json array to table",
    "json to html table converter",
    "json to table tool",
    "json table online",
    "json to html table free",
  ],
  alternates: {
    canonical: "https://json2xml.com/json-to-html-table",
  },
  openGraph: {
    title: "Free JSON to HTML Table Converter Online — json2xml.com",
    description:
      "Convert a JSON array of objects to a styled HTML table instantly in your browser. Free, private, no sign-up required.",
    url: "https://json2xml.com/json-to-html-table",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSON to HTML Table Converter — json2xml.com",
  url: "https://json2xml.com/json-to-html-table",
  description:
    "Free online JSON to HTML table converter. Convert a JSON array of objects to a styled HTML table instantly in your browser. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "How does the JSON to HTML table converter work?", answer: "Paste a JSON array of objects and the converter extracts the keys as table column headers, then renders each object as a row. The result is a clean HTML <table> you can copy or preview." },
  { question: "Does it handle nested objects?", answer: "Yes — nested objects and arrays are JSON-stringified and displayed in their table cells. The converter handles any valid JSON structure." },
  { question: "Can I preview the table?", answer: "Yes — toggle between a live rendered table preview and the raw HTML source code. You can copy either view." },
  { question: "Is this converter free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All conversion happens locally in your browser using JavaScript. Your JSON is never uploaded to any server. It's safe to use with sensitive or proprietary data." },
  { question: "Can I download the HTML?", answer: "Yes — download the generated HTML table as a .html file with one click." },
];

const faqItems: FaqItem[] = [
  {
    question: "How does the JSON to HTML table converter work?",
    answer:
      "Paste a JSON array of objects and the converter extracts the keys as table column headers, then renders each object as a row. The result is a clean HTML <table> you can copy or preview.",
  },
  {
    question: "Does it handle nested objects?",
    answer:
      "Yes — nested objects and arrays are JSON-stringified and displayed in their table cells. The converter handles any valid JSON structure.",
  },
  {
    question: "Can I preview the table?",
    answer:
      "Yes — toggle between a live rendered table preview and the raw HTML source code. You can copy either view.",
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
    question: "Can I download the HTML?",
    answer:
      "Yes — download the generated HTML table as a .html file with one click.",
  },
];

export default function JsonToHtmlTablePage() {
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

      <Header currentSlug="/json-to-html-table" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free JSON to HTML Table Converter
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Convert a JSON array of objects to a styled HTML table instantly. Preview the table or copy the raw HTML. Runs in your
            browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <JsonToHtmlTable />
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
            <h3 className="text-slate-200 font-semibold mb-2">👁️ Live Preview</h3>
            <p>
              See your HTML table rendered in real time. Toggle between the styled
              preview and the raw HTML source code.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">✨ Clean HTML</h3>
            <p>
              Generates well-structured, semantic HTML tables that are easy to embed
              in any webpage, email, or documentation.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Convert JSON to an HTML Table
            </h2>
            <p className="leading-relaxed">
              Paste your JSON array into the input panel and the HTML table output appears instantly.
              The converter extracts keys from the first object to build column headers, then fills each
              row with the corresponding values. You can toggle between a live table preview and the raw
              HTML source. Copy the HTML or download it as a <code className="text-slate-300">.html</code> file.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Common Use Cases
            </h2>
            <p className="leading-relaxed">
              Converting JSON to an HTML table is useful for embedding API response data in documentation,
              creating quick data reports from JSON exports, displaying database query results in a web page,
              generating email-friendly tables from JSON data, and building static dashboards from JSON feeds.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/json-to-html-table" />

      <Footer />
    </div>
  );
}
