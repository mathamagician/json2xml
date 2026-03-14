import type { Metadata } from "next";
import FormatterTool from "@/components/FormatterTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free YAML Formatter Online — json2xml.com",
  description:
    "Format and beautify YAML with configurable indentation. Free, private — your data never leaves your machine. No sign-up required.",
  keywords: [
    "yaml formatter",
    "yaml format",
    "format yaml",
    "yaml beautifier",
    "yaml pretty print",
    "yaml formatter online",
    "yaml beautify",
    "yaml indent",
    "yaml lint",
    "yaml format online",
    "yaml formatting tool",
    "yaml cleanup",
  ],
  alternates: {
    canonical: "https://json2xml.com/yaml-formatter",
  },
  openGraph: {
    title: "Free YAML Formatter Online — json2xml.com",
    description:
      "Format and beautify YAML with configurable indentation. Free, private, no sign-up required.",
    url: "https://json2xml.com/yaml-formatter",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "YAML Formatter — json2xml.com",
  url: "https://json2xml.com/yaml-formatter",
  description:
    "Free online YAML formatter and beautifier. Format YAML with configurable indentation instantly in your browser. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What does the YAML formatter do?", answer: "The YAML formatter parses your YAML and re-serializes it with consistent indentation and clean structure. It normalizes spacing, removes redundant quotes, and produces well-formatted, readable YAML." },
  { question: "Does it validate YAML syntax?", answer: "Yes — the formatter will show an error if your YAML has syntax issues. For detailed validation with line and column numbers, use the YAML Validator at json2xml.com/yaml-validator." },
  { question: "Can I minify YAML?", answer: "Yes — use the Minify button to convert YAML to flow style, which produces compact single-line output similar to JSON. This is useful for embedding YAML in scripts or reducing file size." },
  { question: "Is it free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All formatting happens locally in your browser using JavaScript. Your YAML is never uploaded to any server. It's safe to use with sensitive or proprietary data." },
  { question: "What about YAML to JSON?", answer: "Use the YAML to JSON converter at json2xml.com/yaml-to-json to convert your YAML into JSON format." },
];

const faqItems: FaqItem[] = [
  {
    question: "What does the YAML formatter do?",
    answer:
      "The YAML formatter parses your YAML and re-serializes it with consistent indentation and clean structure. It normalizes spacing, removes redundant quotes, and produces well-formatted, readable YAML.",
  },
  {
    question: "Does it validate YAML syntax?",
    answer: (
      <>
        Yes — the formatter will show an error if your YAML has syntax issues. For detailed
        validation with line and column numbers, use the{" "}
        <a href="/yaml-validator" className="text-brand-400 hover:underline">YAML Validator</a>.
      </>
    ),
  },
  {
    question: "Can I minify YAML?",
    answer:
      "Yes — use the Minify button to convert YAML to flow style, which produces compact single-line output similar to JSON. This is useful for embedding YAML in scripts or reducing file size.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All formatting happens locally in your browser using JavaScript. Your YAML is never uploaded to any server. It's safe to use with sensitive or proprietary data.",
  },
  {
    question: "What about YAML to JSON?",
    answer: (
      <>
        Use the{" "}
        <a href="/yaml-to-json" className="text-brand-400 hover:underline">YAML to JSON converter</a>{" "}
        to convert your YAML into JSON format.
      </>
    ),
  },
];

export default function YamlFormatter() {
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

      <Header currentSlug="/yaml-formatter" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free YAML Formatter
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Format and beautify YAML with configurable indentation. Supports flow-style minification. Runs
            instantly in your browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <FormatterTool format="yaml" />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔒 100% Private</h3>
            <p>
              All formatting happens in your browser using JavaScript. Nothing is
              uploaded to any server. Safe for sensitive configuration data.
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
            <h3 className="text-slate-200 font-semibold mb-2">📦 Flow Style Minify</h3>
            <p>
              Minify YAML to compact flow style with one click. Useful for embedding
              YAML in scripts, environment variables, or CI/CD pipelines.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Format YAML Online
            </h2>
            <p className="leading-relaxed">
              Paste your YAML into the left panel and the formatted output appears instantly on the right.
              Use the indent selector to choose 2 spaces, 4 spaces, or tabs. Click the Minify button to
              convert to compact flow style. You can also drag and drop
              a <code className="text-slate-300">.yaml</code> or{" "}
              <code className="text-slate-300">.yml</code> file or use the upload button.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Common YAML Formatting Use Cases
            </h2>
            <p className="leading-relaxed">
              Formatting YAML is essential when working with Kubernetes manifests, Docker Compose files,
              Ansible playbooks, GitHub Actions workflows, or any configuration that uses YAML. Consistent
              indentation prevents subtle bugs caused by misaligned keys, and clean formatting makes
              code reviews and diffs easier to read.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/yaml-formatter" />

      <Footer />
    </div>
  );
}
