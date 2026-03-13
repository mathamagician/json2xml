import type { Metadata } from "next";
import ValidatorTool from "@/components/ValidatorTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free JSON Validator Online — json2xml.com",
  description:
    "Validate JSON syntax instantly in your browser. See errors with line and column numbers. Free, private — your data never leaves your machine.",
  keywords: [
    "json validator",
    "validate json",
    "json lint",
    "json checker",
    "json syntax checker",
    "json validator online",
    "validate json online",
    "json lint online",
    "check json",
    "is my json valid",
    "json error checker",
    "json parse error",
  ],
  alternates: {
    canonical: "https://json2xml.com/json-validator",
  },
  openGraph: {
    title: "Free JSON Validator Online — json2xml.com",
    description:
      "Validate JSON syntax instantly in your browser. See errors with line and column numbers. Free, private, no sign-up required.",
    url: "https://json2xml.com/json-validator",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSON Validator — json2xml.com",
  url: "https://json2xml.com/json-validator",
  description:
    "Free online JSON validator. Check JSON syntax and see errors with line numbers instantly in your browser. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What does a JSON validator do?", answer: "A JSON validator checks whether your JSON is syntactically correct according to the JSON specification (RFC 8259). It catches missing commas, unclosed brackets, trailing commas, single quotes, and other common mistakes." },
  { question: "Is this JSON validator free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All validation happens locally in your browser using JavaScript. Your JSON is never uploaded to any server. It's safe to use with sensitive or proprietary data." },
  { question: "Does it show where the error is?", answer: "Yes — when your JSON is invalid, the validator shows the error message along with the line and column number where the problem was detected, so you can find and fix it quickly." },
  { question: "What are common JSON errors?", answer: "The most common JSON errors are: trailing commas after the last item, single quotes instead of double quotes, missing quotes around keys, unescaped special characters in strings, and comments (JSON doesn't support comments)." },
  { question: "What's the difference between a validator and a linter?", answer: "A validator checks whether JSON is syntactically valid. A linter goes further and checks for style issues like inconsistent formatting. This tool is a validator — for formatting, use the JSON Formatter." },
  { question: "Can I also format my JSON?", answer: "Yes — use the JSON Formatter at json2xml.com/json-formatter to pretty-print or minify your JSON with configurable indentation." },
];

const faqItems: FaqItem[] = [
  {
    question: "What does a JSON validator do?",
    answer:
      "A JSON validator checks whether your JSON is syntactically correct according to the JSON specification (RFC 8259). It catches missing commas, unclosed brackets, trailing commas, single quotes, and other common mistakes.",
  },
  {
    question: "Is this JSON validator free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All validation happens locally in your browser using JavaScript. Your JSON is never uploaded to any server. It's safe to use with sensitive or proprietary data.",
  },
  {
    question: "Does it show where the error is?",
    answer:
      "Yes — when your JSON is invalid, the validator shows the error message along with the line and column number where the problem was detected, so you can find and fix it quickly.",
  },
  {
    question: "What are common JSON errors?",
    answer:
      "The most common JSON errors are: trailing commas after the last item, single quotes instead of double quotes, missing quotes around keys, unescaped special characters in strings, and comments (JSON doesn't support comments).",
  },
  {
    question: "What's the difference between a validator and a linter?",
    answer:
      "A validator checks whether JSON is syntactically valid. A linter goes further and checks for style issues like inconsistent formatting. This tool is a validator — for formatting, use the JSON Formatter.",
  },
  {
    question: "Can I also format my JSON?",
    answer: (
      <>
        Yes — use the{" "}
        <a href="/json-formatter" className="text-brand-400 hover:underline">JSON Formatter</a>{" "}
        to pretty-print or minify your JSON with configurable indentation.
      </>
    ),
  },
];

export default function JsonValidator() {
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

      <Header currentSlug="/json-validator" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free JSON Validator
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Check JSON syntax instantly with error line and column numbers. Runs in your
            browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <ValidatorTool format="json" />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔒 100% Private</h3>
            <p>
              All validation happens in your browser using JavaScript. Nothing is
              uploaded to any server. Safe for sensitive business data.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">⚡ Real-time</h3>
            <p>
              Validation runs as you type — no button to click. See results instantly
              as you paste or edit your JSON.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">📍 Error Location</h3>
            <p>
              When your JSON is invalid, see the exact line and column number
              where the error was detected, along with a descriptive error message.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Validate JSON Online
            </h2>
            <p className="leading-relaxed">
              Paste your JSON into the left panel and the validation result appears instantly on the right.
              A green checkmark means your JSON is valid. A red error shows the exact problem with line
              and column numbers. You can also drag and drop a <code className="text-slate-300">.json</code> file
              or use the upload button.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Common JSON Syntax Errors
            </h2>
            <p className="leading-relaxed">
              The most frequent JSON errors developers encounter are: trailing commas after the last
              element in an array or object, using single quotes instead of double quotes, forgetting
              to quote object keys, including comments (not allowed in JSON), and unescaped special
              characters like backslashes or newlines in strings.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/json-validator" />

      <Footer />
    </div>
  );
}
