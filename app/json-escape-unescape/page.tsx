import type { Metadata } from "next";
import JsonEscapeTool from "@/components/JsonEscapeTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free JSON Escape / Unescape Online — json2xml.com",
  description:
    "Escape special characters for JSON strings or unescape JSON-encoded text instantly in your browser. Handles quotes, newlines, tabs, backslashes, and Unicode. Free, private — your data never leaves your machine.",
  keywords: [
    "json escape",
    "json unescape",
    "json string escape",
    "json string unescape",
    "escape json online",
    "unescape json online",
    "json escape tool",
    "json special characters",
    "json encode string",
    "json decode string",
    "escape quotes json",
    "json backslash escape",
  ],
  alternates: {
    canonical: "https://json2xml.com/json-escape-unescape",
  },
  openGraph: {
    title: "Free JSON Escape / Unescape Online — json2xml.com",
    description:
      "Escape and unescape JSON strings instantly. Handles quotes, newlines, tabs, and Unicode. Free, private, no sign-up required.",
    url: "https://json2xml.com/json-escape-unescape",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSON Escape / Unescape — json2xml.com",
  url: "https://json2xml.com/json-escape-unescape",
  description:
    "Free online JSON string escape and unescape tool. Escape special characters for valid JSON strings. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What characters need to be escaped in JSON?", answer: "JSON requires escaping double quotes (\\\"), backslashes (\\\\), and control characters including newline (\\n), carriage return (\\r), tab (\\t), backspace (\\b), and form feed (\\f). Unicode characters outside the basic ASCII range may also be escaped as \\uXXXX sequences." },
  { question: "How does JSON string escaping work?", answer: "JSON escaping prepends a backslash before special characters so they can be safely embedded inside a JSON string value. For example, a literal newline becomes the two-character sequence \\n, and a double quote becomes \\\"." },
  { question: "Can I unescape a JSON string?", answer: "Yes — the tool is bidirectional. Paste an escaped JSON string in the right panel and the unescaped text appears instantly in the left panel." },
  { question: "Is this tool free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All escaping and unescaping happens locally in your browser using JavaScript. Nothing is uploaded to any server. It's safe to use with sensitive or proprietary data." },
  { question: "When do I need to escape JSON strings?", answer: "You need JSON escaping whenever you embed user-generated text, file contents, or multi-line strings inside a JSON value. Without proper escaping, characters like quotes and newlines will break the JSON syntax and cause parse errors." },
];

const faqItems: FaqItem[] = [
  {
    question: "What characters need to be escaped in JSON?",
    answer:
      'JSON requires escaping double quotes (\\"), backslashes (\\\\), and control characters including newline (\\n), carriage return (\\r), tab (\\t), backspace (\\b), and form feed (\\f). Unicode characters outside the basic ASCII range may also be escaped as \\uXXXX sequences.',
  },
  {
    question: "How does JSON string escaping work?",
    answer:
      'JSON escaping prepends a backslash before special characters so they can be safely embedded inside a JSON string value. For example, a literal newline becomes the two-character sequence \\n, and a double quote becomes \\".',
  },
  {
    question: "Can I unescape a JSON string?",
    answer:
      "Yes — the tool is bidirectional. Paste an escaped JSON string in the right panel and the unescaped text appears instantly in the left panel.",
  },
  {
    question: "Is this tool free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All escaping and unescaping happens locally in your browser using JavaScript. Nothing is uploaded to any server. It's safe to use with sensitive or proprietary data.",
  },
  {
    question: "When do I need to escape JSON strings?",
    answer:
      "You need JSON escaping whenever you embed user-generated text, file contents, or multi-line strings inside a JSON value. Without proper escaping, characters like quotes and newlines will break the JSON syntax and cause parse errors.",
  },
];

export default function JsonEscapePage() {
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

      <Header currentSlug="/json-escape-unescape" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free JSON Escape / Unescape
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Escape special characters for JSON strings or unescape JSON-encoded text.
            Runs in your browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <JsonEscapeTool />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">Special Characters</h3>
            <p>
              Automatically escapes all JSON-special characters including double quotes,
              backslashes, newlines, tabs, carriage returns, backspaces, and form feeds.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">Quotes & Newlines</h3>
            <p>
              Literal double quotes become \&quot; and newlines become \n, making your
              text safe to embed as a JSON string value without breaking the syntax.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">100% Private</h3>
            <p>
              All escaping and unescaping runs locally in your browser using JavaScript.
              Nothing is sent to a server — safe for sensitive data.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Escape and Unescape JSON Strings
            </h2>
            <p className="leading-relaxed">
              Type or paste plain text in the left panel and the JSON-escaped version
              appears instantly on the right. Special characters like double quotes,
              backslashes, and newlines are automatically escaped with backslash
              sequences. To unescape, paste a JSON-escaped string in the right panel and
              the original text appears on the left.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Understanding JSON String Escaping
            </h2>
            <p className="leading-relaxed">
              The JSON specification requires certain characters to be escaped when they
              appear inside string values. A backslash (\) serves as the escape character,
              followed by a specific letter: n for newline, t for tab, r for carriage
              return, and so on. Double quotes must be escaped as \&quot; since they
              delimit string boundaries. Without proper escaping, these characters would
              break the JSON structure and cause parse errors in any JSON consumer.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/json-escape-unescape" />

      <Footer />
    </div>
  );
}
