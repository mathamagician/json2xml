import type { Metadata } from "next";
import FormatterTool from "@/components/FormatterTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free JSON Pretty Print Online — json2xml.com",
  description:
    "Pretty-print JSON with configurable indentation (2 spaces, 4 spaces, tabs). Free, private — your data never leaves your machine. No sign-up required.",
  keywords: [
    "json pretty print",
    "json beautifier",
    "json beautify",
    "pretty print json",
    "json pretty printer",
    "json indenter",
    "json format pretty",
    "beautify json online",
    "pretty json",
    "json pretty print online",
    "format json pretty",
    "json indent tool",
  ],
  alternates: {
    canonical: "https://json2xml.com/json-pretty-print",
  },
  openGraph: {
    title: "Free JSON Pretty Print Online — json2xml.com",
    description:
      "Pretty-print JSON with configurable indentation. Free, private, no sign-up required.",
    url: "https://json2xml.com/json-pretty-print",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSON Pretty Print — json2xml.com",
  url: "https://json2xml.com/json-pretty-print",
  description:
    "Free online JSON pretty printer. Format JSON with configurable indentation instantly in your browser. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What is JSON pretty printing?", answer: "JSON pretty printing formats raw or minified JSON by adding consistent indentation and line breaks, making it easy to read and understand the data structure at a glance." },
  { question: "Can I choose the indentation?", answer: "Yes — you can choose between 2 spaces, 4 spaces, or tabs. The default is 2 spaces, which is the most common convention in JavaScript and TypeScript projects." },
  { question: "Is it the same as JSON formatting?", answer: "Yes — pretty printing and formatting are the same thing. Both add indentation and line breaks to make JSON readable. You can also use the JSON Formatter at json2xml.com/json-formatter." },
  { question: "Is it free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All formatting happens locally in your browser using JavaScript. Your JSON is never uploaded to any server. It's safe to use with sensitive or proprietary data." },
  { question: "Can I minify instead?", answer: "Yes — use the JSON Minifier at json2xml.com/json-minifier to remove all whitespace and produce the smallest possible output." },
];

const faqItems: FaqItem[] = [
  {
    question: "What is JSON pretty printing?",
    answer:
      "JSON pretty printing formats raw or minified JSON by adding consistent indentation and line breaks, making it easy to read and understand the data structure at a glance.",
  },
  {
    question: "Can I choose the indentation?",
    answer:
      "Yes — you can choose between 2 spaces, 4 spaces, or tabs. The default is 2 spaces, which is the most common convention in JavaScript and TypeScript projects.",
  },
  {
    question: "Is it the same as JSON formatting?",
    answer: (
      <>
        Yes — pretty printing and formatting are the same thing. Both add indentation and line
        breaks to make JSON readable. You can also use the{" "}
        <a href="/json-formatter" className="text-brand-400 hover:underline">JSON Formatter</a>.
      </>
    ),
  },
  {
    question: "Is it free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All formatting happens locally in your browser using JavaScript. Your JSON is never uploaded to any server. It's safe to use with sensitive or proprietary data.",
  },
  {
    question: "Can I minify instead?",
    answer: (
      <>
        Yes — use the{" "}
        <a href="/json-minifier" className="text-brand-400 hover:underline">JSON Minifier</a>{" "}
        to remove all whitespace and produce the smallest possible output.
      </>
    ),
  },
];

export default function JsonPrettyPrint() {
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

      <Header currentSlug="/json-pretty-print" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free JSON Pretty Print
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Pretty-print JSON with configurable indentation. Choose 2 spaces, 4 spaces, or tabs. Runs
            instantly in your browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <FormatterTool format="json" />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔒 100% Private</h3>
            <p>
              All formatting happens in your browser using JavaScript. Nothing is
              uploaded to any server. Safe for sensitive business data.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">⚡ Instant Formatting</h3>
            <p>
              No waiting for a server round-trip. Results appear as you type or the
              moment you drop a file.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🎛️ Configurable Indentation</h3>
            <p>
              Choose 2 spaces, 4 spaces, or tabs for indentation. Toggle between
              pretty-print and minified output with one click.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Pretty Print JSON Online
            </h2>
            <p className="leading-relaxed">
              Paste your JSON into the left panel and the pretty-printed output appears instantly on the right.
              Use the indent selector to choose 2 spaces, 4 spaces, or tabs. Click the Minify button to
              strip all whitespace for compact output. You can also drag and drop
              a <code className="text-slate-300">.json</code> file or use the upload button.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              When to Use JSON Pretty Print
            </h2>
            <p className="leading-relaxed">
              Pretty-printing JSON makes it easier to read, debug, and review — especially useful when
              inspecting API responses, configuration files, or database exports. Readable JSON helps
              teams collaborate, code reviewers spot issues, and developers quickly understand nested
              data structures without guessing where objects and arrays begin and end.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/json-pretty-print" />

      <Footer />
    </div>
  );
}
