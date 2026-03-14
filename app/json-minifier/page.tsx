import type { Metadata } from "next";
import FormatterTool from "@/components/FormatterTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free JSON Minifier Online — json2xml.com",
  description:
    "Minify JSON instantly in your browser. Remove all whitespace to reduce file size. Free, private — your data never leaves your machine.",
  keywords: [
    "json minifier",
    "minify json",
    "json minify",
    "json compressor",
    "json minifier online",
    "minify json online",
    "compress json",
    "json whitespace remover",
    "json compact",
    "json minify tool",
    "reduce json size",
    "json minification",
  ],
  alternates: {
    canonical: "https://json2xml.com/json-minifier",
  },
  openGraph: {
    title: "Free JSON Minifier Online — json2xml.com",
    description:
      "Minify JSON instantly in your browser. Remove all whitespace to reduce file size. Free, private, no sign-up required.",
    url: "https://json2xml.com/json-minifier",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSON Minifier — json2xml.com",
  url: "https://json2xml.com/json-minifier",
  description:
    "Free online JSON minifier. Remove all whitespace from JSON to reduce file size. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What does a JSON minifier do?", answer: "A JSON minifier removes all unnecessary whitespace — spaces, tabs, and line breaks — from your JSON, producing the smallest possible output while keeping it valid. This is useful for reducing payload size in APIs, config files, and data storage." },
  { question: "Is this JSON minifier free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All minification happens locally in your browser using JavaScript. Your JSON is never uploaded to any server. It's safe to use with sensitive or proprietary data." },
  { question: "What's the difference between minify and format?", answer: "Minifying removes all whitespace to produce compact output. Formatting (beautifying) adds indentation and line breaks for readability. They are opposite operations — you can switch between them freely." },
  { question: "Does minifying change my data?", answer: "No — minifying only removes whitespace. All keys, values, arrays, and objects remain exactly the same. The output is semantically identical to the input." },
  { question: "Can I also format or pretty-print my JSON?", answer: "Yes — use the JSON Formatter at json2xml.com/json-formatter to pretty-print your JSON with configurable indentation (2 spaces, 4 spaces, or tabs)." },
];

const faqItems: FaqItem[] = [
  {
    question: "What does a JSON minifier do?",
    answer:
      "A JSON minifier removes all unnecessary whitespace — spaces, tabs, and line breaks — from your JSON, producing the smallest possible output while keeping it valid. This is useful for reducing payload size in APIs, config files, and data storage.",
  },
  {
    question: "Is this JSON minifier free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All minification happens locally in your browser using JavaScript. Your JSON is never uploaded to any server. It's safe to use with sensitive or proprietary data.",
  },
  {
    question: "What's the difference between minify and format?",
    answer:
      "Minifying removes all whitespace to produce compact output. Formatting (beautifying) adds indentation and line breaks for readability. They are opposite operations — you can switch between them freely.",
  },
  {
    question: "Does minifying change my data?",
    answer:
      "No — minifying only removes whitespace. All keys, values, arrays, and objects remain exactly the same. The output is semantically identical to the input.",
  },
  {
    question: "Can I also format or pretty-print my JSON?",
    answer: (
      <>
        Yes — use the{" "}
        <a href="/json-formatter" className="text-brand-400 hover:underline">JSON Formatter</a>{" "}
        to pretty-print your JSON with configurable indentation (2 spaces, 4 spaces, or tabs).
      </>
    ),
  },
];

export default function JsonMinifier() {
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

      <Header currentSlug="/json-minifier" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free JSON Minifier
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Remove all whitespace from JSON to reduce file size. Runs instantly in your
            browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <FormatterTool format="json" defaultMinify />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔒 100% Private</h3>
            <p>
              All minification happens in your browser using JavaScript. Nothing is
              uploaded to any server. Safe for sensitive business data.
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
              Remove all unnecessary whitespace to reduce JSON file size — useful for API
              payloads, config files, log data, and embedded JSON.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Minify JSON Online
            </h2>
            <p className="leading-relaxed">
              Paste your JSON into the left panel and the minified output appears instantly on the right.
              The minify toggle is on by default — just paste and go. You can switch to pretty-print mode
              using the indent selector or the Minify toggle button. You can also drag and drop
              a <code className="text-slate-300">.json</code> file or use the upload button.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              When to Minify JSON
            </h2>
            <p className="leading-relaxed">
              Minifying JSON is useful when you need to reduce payload size for REST APIs, embed JSON
              in URLs or query strings, store compact data in databases or log files, or transmit data
              over bandwidth-constrained connections. Minified JSON is semantically identical to
              formatted JSON — only whitespace is removed.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/json-minifier" />

      <Footer />
    </div>
  );
}
