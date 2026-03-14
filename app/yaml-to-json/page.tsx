import type { Metadata } from "next";
import SimpleConverter from "@/components/SimpleConverter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free YAML to JSON Converter Online — json2xml.com",
  description:
    "Convert YAML to JSON instantly in your browser. Free, private — your data never leaves your machine. No sign-up required.",
  keywords: [
    "yaml to json",
    "yaml to json converter",
    "convert yaml to json",
    "yaml to json online",
    "yml to json",
    "convert yml to json",
    "yaml to json tool",
    "yaml2json",
    "yaml to json free",
    "yaml to json online converter",
    "yaml parser",
    "parse yaml to json",
  ],
  alternates: {
    canonical: "https://json2xml.com/yaml-to-json",
  },
  openGraph: {
    title: "Free YAML to JSON Converter Online — json2xml.com",
    description:
      "Convert YAML to JSON instantly in your browser. Free, private, no sign-up required.",
    url: "https://json2xml.com/yaml-to-json",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "YAML to JSON Converter — json2xml.com",
  url: "https://json2xml.com/yaml-to-json",
  description:
    "Free online YAML to JSON converter. Convert YAML to JSON instantly in your browser. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "Why convert YAML to JSON?", answer: "JSON is the standard format for APIs, data interchange, and most programming languages. Converting YAML configs to JSON lets you use them in API requests, pass them to JSON-based tools, or validate them with JSON Schema." },
  { question: "Is this converter free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All conversion happens locally in your browser using JavaScript. Your YAML is never uploaded to any server. It's safe to use with sensitive or proprietary data." },
  { question: "Does it handle YAML comments?", answer: "YAML comments (lines starting with #) are stripped during conversion because JSON does not support comments. All data values are preserved." },
  { question: "Does it handle YAML anchors and aliases?", answer: "Yes — YAML anchors (&) and aliases (*) are resolved during parsing. The resulting JSON contains the fully expanded data without references." },
  { question: "Can I convert JSON back to YAML?", answer: "Yes — use the JSON to YAML converter at json2xml.com/json-to-yaml to convert JSON back to YAML." },
];

const faqItems: FaqItem[] = [
  {
    question: "Why convert YAML to JSON?",
    answer:
      "JSON is the standard format for APIs, data interchange, and most programming languages. Converting YAML configs to JSON lets you use them in API requests, pass them to JSON-based tools, or validate them with JSON Schema.",
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
    question: "Does it handle YAML comments?",
    answer:
      "YAML comments (lines starting with #) are stripped during conversion because JSON does not support comments. All data values are preserved.",
  },
  {
    question: "Does it handle YAML anchors and aliases?",
    answer:
      "Yes — YAML anchors (&) and aliases (*) are resolved during parsing. The resulting JSON contains the fully expanded data without references.",
  },
  {
    question: "Can I convert JSON back to YAML?",
    answer: (
      <>
        Yes — use the{" "}
        <a href="/json-to-yaml" className="text-brand-400 hover:underline">JSON to YAML converter</a>{" "}
        to convert JSON back to YAML.
      </>
    ),
  },
];

export default function YamlToJson() {
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

      <Header currentSlug="/yaml-to-json" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free YAML to JSON Converter
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Convert YAML to JSON instantly. Handles anchors, aliases, and multi-document YAML. Runs in your
            browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <SimpleConverter conversion="yaml-to-json" />
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
              No waiting for a server round-trip. JSON output appears as you type or the
              moment you drop a file.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔗 Anchors &amp; Aliases</h3>
            <p>
              YAML anchors (&amp;) and aliases (*) are fully resolved during conversion. The
              resulting JSON contains expanded data with no references.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Convert YAML to JSON Online
            </h2>
            <p className="leading-relaxed">
              Paste your YAML into the left panel and the JSON output appears instantly on the right.
              You can also drag and drop a <code className="text-slate-300">.yaml</code> or{" "}
              <code className="text-slate-300">.yml</code> file or use the upload button. Once converted,
              copy the JSON to your clipboard or download it as a <code className="text-slate-300">.json</code> file.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Common YAML to JSON Use Cases
            </h2>
            <p className="leading-relaxed">
              Converting YAML to JSON is useful when you need to pass configuration data to REST APIs,
              validate YAML configs against JSON Schema, import Kubernetes or Docker Compose definitions
              into JSON-based tools, or debug YAML parsing issues by viewing the structured data as JSON.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/yaml-to-json" />

      <Footer />
    </div>
  );
}
