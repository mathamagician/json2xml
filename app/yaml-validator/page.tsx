import type { Metadata } from "next";
import ValidatorTool from "@/components/ValidatorTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free YAML Validator Online — json2xml.com",
  description:
    "Validate YAML syntax instantly in your browser. See errors with line and column numbers. Free, private — your data never leaves your machine.",
  keywords: [
    "yaml validator",
    "validate yaml",
    "yaml lint",
    "yaml checker",
    "yaml syntax check",
    "yaml validator online",
    "yaml validation",
    "check yaml",
    "yaml lint online",
    "yaml syntax validator",
    "yaml verify",
    "yaml error checker",
  ],
  alternates: {
    canonical: "https://json2xml.com/yaml-validator",
  },
  openGraph: {
    title: "Free YAML Validator Online — json2xml.com",
    description:
      "Validate YAML syntax instantly in your browser. See errors with line and column numbers. Free, private, no sign-up required.",
    url: "https://json2xml.com/yaml-validator",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "YAML Validator — json2xml.com",
  url: "https://json2xml.com/yaml-validator",
  description:
    "Free online YAML validator. Check YAML syntax and see errors with line numbers instantly in your browser. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "How does the YAML validator work?", answer: "The validator parses your YAML using a standards-compliant parser and checks for syntax errors. If the YAML is valid, you'll see a green checkmark. If there are errors, you'll see the exact error message with location details." },
  { question: "Does it show error locations?", answer: "Yes — when your YAML is invalid, the validator shows the error message along with the line and column number where the problem was detected, so you can find and fix it quickly." },
  { question: "Can it fix errors?", answer: "No — the validator identifies and locates errors but does not auto-fix them. It shows you exactly where the problem is so you can correct it yourself. This ensures you understand and control every change." },
  { question: "Is it free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All validation happens locally in your browser using JavaScript. Your YAML is never uploaded to any server. It's safe to use with sensitive or proprietary data." },
  { question: "Can I also format YAML?", answer: "Yes — use the YAML Formatter at json2xml.com/yaml-formatter to format, beautify, or minify your YAML with configurable indentation." },
];

const faqItems: FaqItem[] = [
  {
    question: "How does the YAML validator work?",
    answer:
      "The validator parses your YAML using a standards-compliant parser and checks for syntax errors. If the YAML is valid, you'll see a green checkmark. If there are errors, you'll see the exact error message with location details.",
  },
  {
    question: "Does it show error locations?",
    answer:
      "Yes — when your YAML is invalid, the validator shows the error message along with the line and column number where the problem was detected, so you can find and fix it quickly.",
  },
  {
    question: "Can it fix errors?",
    answer:
      "No — the validator identifies and locates errors but does not auto-fix them. It shows you exactly where the problem is so you can correct it yourself. This ensures you understand and control every change.",
  },
  {
    question: "Is it free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All validation happens locally in your browser using JavaScript. Your YAML is never uploaded to any server. It's safe to use with sensitive or proprietary data.",
  },
  {
    question: "Can I also format YAML?",
    answer: (
      <>
        Yes — use the{" "}
        <a href="/yaml-formatter" className="text-brand-400 hover:underline">YAML Formatter</a>{" "}
        to format, beautify, or minify your YAML with configurable indentation.
      </>
    ),
  },
];

export default function YamlValidator() {
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

      <Header currentSlug="/yaml-validator" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free YAML Validator
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Validate YAML syntax and see errors with line and column numbers. Runs instantly in your
            browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <ValidatorTool format="yaml" />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔒 100% Private</h3>
            <p>
              All validation happens in your browser using JavaScript. Nothing is
              uploaded to any server. Safe for sensitive configuration data.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">📍 Line &amp; Column Errors</h3>
            <p>
              When your YAML is invalid, see the exact line and column number
              where the error was detected, along with a descriptive error message.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">⚡ Real-time Validation</h3>
            <p>
              Validation runs as you type — no button to click. See results instantly
              as you paste or edit your YAML.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Validate YAML Online
            </h2>
            <p className="leading-relaxed">
              Paste your YAML into the left panel and the validation result appears instantly on the right.
              A green checkmark means your YAML is valid. A red error shows the exact problem with line
              and column numbers. You can also drag and drop a <code className="text-slate-300">.yaml</code> or{" "}
              <code className="text-slate-300">.yml</code> file or use the upload button.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Common YAML Syntax Errors
            </h2>
            <p className="leading-relaxed">
              The most frequent YAML errors are: inconsistent indentation (mixing tabs and spaces),
              missing colons after keys, incorrect nesting levels, unquoted strings that look like
              numbers or booleans, duplicate keys in the same mapping, and improperly closed
              multi-line strings or block scalars.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/yaml-validator" />

      <Footer />
    </div>
  );
}
