import type { Metadata } from "next";
import SimpleConverter from "@/components/SimpleConverter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free JSON to YAML Converter Online — json2xml.com",
  description:
    "Convert JSON to YAML instantly in your browser. Free, private — your data never leaves your machine. No sign-up required.",
  keywords: [
    "json to yaml",
    "json to yaml converter",
    "convert json to yaml",
    "json to yaml online",
    "json yaml converter",
    "json to yml",
    "convert json to yml",
    "json to yaml tool",
    "json2yaml",
    "json to yaml free",
    "json to yaml online converter",
    "transform json to yaml",
  ],
  alternates: {
    canonical: "https://json2xml.com/json-to-yaml",
  },
  openGraph: {
    title: "Free JSON to YAML Converter Online — json2xml.com",
    description:
      "Convert JSON to YAML instantly in your browser. Free, private, no sign-up required.",
    url: "https://json2xml.com/json-to-yaml",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSON to YAML Converter — json2xml.com",
  url: "https://json2xml.com/json-to-yaml",
  description:
    "Free online JSON to YAML converter. Convert JSON to YAML instantly in your browser. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What is YAML?", answer: "YAML (YAML Ain't Markup Language) is a human-readable data serialization format commonly used for configuration files (Docker Compose, Kubernetes, GitHub Actions, Ansible) and data exchange. It uses indentation instead of braces and brackets." },
  { question: "Why convert JSON to YAML?", answer: "YAML is more readable than JSON for configuration files because it eliminates braces, brackets, and most quotes. Many DevOps tools (Kubernetes, Docker Compose, GitHub Actions) use YAML as their native config format." },
  { question: "Is this converter free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All conversion happens locally in your browser using JavaScript. Your JSON is never uploaded to any server. It's safe to use with sensitive or proprietary data." },
  { question: "Does YAML preserve JSON types?", answer: "Yes — YAML supports all JSON types: strings, numbers, booleans, null, objects (mappings), and arrays (sequences). The conversion is lossless." },
  { question: "Can I convert YAML back to JSON?", answer: "Yes — use the YAML to JSON converter at json2xml.com/yaml-to-json to convert YAML back to JSON." },
];

const faqItems: FaqItem[] = [
  {
    question: "What is YAML?",
    answer:
      "YAML (YAML Ain't Markup Language) is a human-readable data serialization format commonly used for configuration files (Docker Compose, Kubernetes, GitHub Actions, Ansible) and data exchange. It uses indentation instead of braces and brackets.",
  },
  {
    question: "Why convert JSON to YAML?",
    answer:
      "YAML is more readable than JSON for configuration files because it eliminates braces, brackets, and most quotes. Many DevOps tools (Kubernetes, Docker Compose, GitHub Actions) use YAML as their native config format.",
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
    question: "Does YAML preserve JSON types?",
    answer:
      "Yes — YAML supports all JSON types: strings, numbers, booleans, null, objects (mappings), and arrays (sequences). The conversion is lossless.",
  },
  {
    question: "Can I convert YAML back to JSON?",
    answer: (
      <>
        Yes — use the{" "}
        <a href="/yaml-to-json" className="text-brand-400 hover:underline">YAML to JSON converter</a>{" "}
        to convert YAML back to JSON.
      </>
    ),
  },
];

export default function JsonToYaml() {
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

      <Header currentSlug="/json-to-yaml" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free JSON to YAML Converter
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Convert JSON to YAML instantly. Perfect for Kubernetes, Docker Compose, and CI/CD configs. Runs in your
            browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <SimpleConverter conversion="json-to-yaml" />
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
              No waiting for a server round-trip. YAML output appears as you type or the
              moment you drop a file.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔄 Lossless</h3>
            <p>
              All JSON types (strings, numbers, booleans, null, objects, arrays) map
              directly to YAML equivalents. No data is lost in conversion.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Convert JSON to YAML Online
            </h2>
            <p className="leading-relaxed">
              Paste your JSON into the left panel and the YAML output appears instantly on the right.
              You can also drag and drop a <code className="text-slate-300">.json</code> file or use the
              upload button. Once converted, copy the YAML to your clipboard or download it as
              a <code className="text-slate-300">.yaml</code> file.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              JSON vs YAML — When to Use Which
            </h2>
            <p className="leading-relaxed">
              JSON is the standard for APIs, data exchange, and programmatic access — it&apos;s strict,
              unambiguous, and every language has a parser. YAML is preferred for configuration files
              because it&apos;s more readable: no braces, no brackets, optional quotes, and support for
              comments. Tools like Kubernetes, Docker Compose, GitHub Actions, Ansible, and Helm all
              use YAML natively.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/json-to-yaml" />

      <Footer />
    </div>
  );
}
