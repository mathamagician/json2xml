import type { Metadata } from "next";
import FormatterTool from "@/components/FormatterTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";

export const metadata: Metadata = {
  title: "Free JSON Formatter & Beautifier Online — json2xml.com",
  description:
    "Format, beautify, or minify JSON instantly in your browser. Configurable indentation (2 spaces, 4 spaces, tabs). Free, private — your data never leaves your machine.",
  keywords: [
    "json formatter",
    "json beautifier",
    "json pretty print",
    "format json online",
    "json formatter online",
    "pretty print json",
    "json beautify",
    "json minifier",
    "minify json",
    "json format tool",
    "json indent",
    "json viewer",
  ],
  alternates: {
    canonical: "https://json2xml.com/json-formatter",
  },
  openGraph: {
    title: "Free JSON Formatter & Beautifier Online — json2xml.com",
    description:
      "Format, beautify, or minify JSON instantly in your browser. Configurable indentation. Free, private, no sign-up required.",
    url: "https://json2xml.com/json-formatter",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSON Formatter — json2xml.com",
  url: "https://json2xml.com/json-formatter",
  description:
    "Free online JSON formatter and beautifier. Pretty-print or minify JSON instantly in your browser. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqItems: FaqItem[] = [
  {
    question: "What does a JSON formatter do?",
    answer:
      "A JSON formatter takes raw or minified JSON and adds consistent indentation and line breaks so it's easy to read. It can also minify formatted JSON by removing all whitespace, making it smaller for storage or transmission.",
  },
  {
    question: "Is this JSON formatter free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits. If you find it useful, a coffee is appreciated but never required.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All formatting happens locally in your browser using JavaScript. Your JSON is never uploaded to any server. It's safe to use with sensitive or proprietary data.",
  },
  {
    question: "What indentation options are available?",
    answer:
      "You can choose between 2 spaces, 4 spaces, or tabs. The default is 2 spaces, which is the most common convention in JavaScript and TypeScript projects.",
  },
  {
    question: "What's the difference between format and minify?",
    answer:
      "Formatting (beautifying) adds indentation and line breaks for readability. Minifying removes all unnecessary whitespace to produce the smallest possible output — useful for APIs, config files, or reducing payload size.",
  },
  {
    question: "Does it validate my JSON?",
    answer: (
      <>
        The formatter will show an error if your JSON is invalid, but for detailed validation
        with line numbers, use the{" "}
        <a href="/json-validator" className="text-brand-400 hover:underline">JSON Validator</a>.
      </>
    ),
  },
  {
    question: "Can I also convert JSON to XML?",
    answer: (
      <>
        Yes — use the{" "}
        <a href="/" className="text-brand-400 hover:underline">JSON to XML converter</a>{" "}
        to convert your formatted JSON into XML.
      </>
    ),
  },
];

export default function JsonFormatter() {
  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header currentSlug="/json-formatter" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free JSON Formatter &amp; Beautifier
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Pretty-print or minify JSON with configurable indentation. Runs instantly in your
            browser —{" "}
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
            <h3 className="text-slate-200 font-semibold mb-2">⚡ Instant</h3>
            <p>
              No waiting for a server round-trip. Results appear as you type or the
              moment you drop a file.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🎛️ Configurable</h3>
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
              How to Format JSON Online
            </h2>
            <p className="leading-relaxed">
              Paste your JSON into the left panel and the formatted output appears instantly on the right.
              Use the indent selector to choose 2 spaces, 4 spaces, or tabs. Click the Minify button to
              strip all whitespace for compact output. You can also drag and drop
              a <code className="text-slate-300">.json</code> file or use the upload button to browse your files.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              When to Format or Minify JSON
            </h2>
            <p className="leading-relaxed">
              Pretty-printing JSON makes it easier to read, debug, and review — especially useful when
              inspecting API responses, configuration files, or database exports. Minifying removes all
              whitespace to reduce file size, which is useful for embedding JSON in URLs, reducing API
              payload size, or storing compact data in databases and log files.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/json-formatter" />

      <Footer />
    </div>
  );
}
