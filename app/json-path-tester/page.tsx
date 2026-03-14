import type { Metadata } from "next";
import JsonPathTester from "@/components/JsonPathTester";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free JSONPath Tester Online — json2xml.com",
  description:
    "Test JSONPath expressions against JSON data and see matched results instantly. Supports dot notation, wildcards, array slicing, and recursive descent. Free, private — your data never leaves your machine.",
  keywords: [
    "jsonpath tester",
    "jsonpath",
    "json path",
    "jsonpath online",
    "test jsonpath",
    "jsonpath evaluator",
    "jsonpath expression",
    "jsonpath query",
    "jsonpath tester online",
    "json path finder",
    "jsonpath tool",
    "jsonpath checker",
  ],
  alternates: {
    canonical: "https://json2xml.com/json-path-tester",
  },
  openGraph: {
    title: "Free JSONPath Tester Online — json2xml.com",
    description:
      "Test JSONPath expressions against JSON data and see matched results instantly. Free, private, no sign-up required.",
    url: "https://json2xml.com/json-path-tester",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSONPath Tester — json2xml.com",
  url: "https://json2xml.com/json-path-tester",
  description:
    "Free online JSONPath tester. Test JSONPath expressions against JSON data and see matched results instantly. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What JSONPath syntax is supported?", answer: "The tester supports standard JSONPath syntax including dot notation, bracket notation, wildcards (*), array slicing, recursive descent (..), and filter expressions." },
  { question: "Does it evaluate in real-time?", answer: "Yes — the JSONPath expression is evaluated as you type and matched results update instantly." },
  { question: "Can I copy the results?", answer: "Yes — matched results can be copied to your clipboard with a single click." },
  { question: "Is this tool free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All evaluation happens locally in your browser using JavaScript. Nothing is uploaded to any server. It's safe to use with sensitive or proprietary data." },
  { question: "What is JSONPath?", answer: "JSONPath is a query language for JSON, similar to XPath for XML. It allows you to navigate and extract data from JSON documents using path expressions like $.store.book[0].title." },
];

const faqItems: FaqItem[] = [
  {
    question: "What JSONPath syntax is supported?",
    answer:
      "The tester supports standard JSONPath syntax including dot notation, bracket notation, wildcards (*), array slicing, recursive descent (..), and filter expressions.",
  },
  {
    question: "Does it evaluate in real-time?",
    answer:
      "Yes — the JSONPath expression is evaluated as you type and matched results update instantly.",
  },
  {
    question: "Can I copy the results?",
    answer:
      "Yes — matched results can be copied to your clipboard with a single click.",
  },
  {
    question: "Is this tool free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All evaluation happens locally in your browser using JavaScript. Nothing is uploaded to any server. It's safe to use with sensitive or proprietary data.",
  },
  {
    question: "What is JSONPath?",
    answer: (
      <>
        JSONPath is a query language for JSON, similar to XPath for XML. It allows you to
        navigate and extract data from JSON documents using path expressions like{" "}
        <code className="text-slate-300">$.store.book[0].title</code>.
      </>
    ),
  },
];

export default function JsonPathTesterPage() {
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

      <Header currentSlug="/json-path-tester" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free JSONPath Tester
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Test JSONPath expressions against JSON data and see matched results instantly.
            Runs in your browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <JsonPathTester />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔒 100% Private</h3>
            <p>
              All evaluation happens in your browser using JavaScript. Nothing
              is uploaded to any server. Safe for sensitive data.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">⚡ Real-time Evaluation</h3>
            <p>
              Matched results update instantly as you type your JSONPath
              expression. No need to click a button.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔢 Match Count</h3>
            <p>
              See how many nodes matched your JSONPath expression at a glance,
              along with the full matched results.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Use JSONPath
            </h2>
            <p className="leading-relaxed">
              Paste your JSON data into the input panel and enter a JSONPath expression.
              Matched results appear instantly in the output panel. Use dot notation
              (e.g., <code className="text-slate-300">$.store.book</code>) or bracket
              notation (e.g., <code className="text-slate-300">$[&apos;store&apos;][&apos;book&apos;]</code>)
              to navigate the JSON structure. Wildcards (<code className="text-slate-300">*</code>)
              and recursive descent (<code className="text-slate-300">..</code>) help you search
              across nested structures.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              JSONPath Syntax Reference
            </h2>
            <p className="leading-relaxed">
              JSONPath uses <code className="text-slate-300">$</code> as the root element.
              Use <code className="text-slate-300">.key</code> for child access,{" "}
              <code className="text-slate-300">[0]</code> for array indexing,{" "}
              <code className="text-slate-300">[0:3]</code> for array slicing,{" "}
              <code className="text-slate-300">*</code> for wildcards, and{" "}
              <code className="text-slate-300">..</code> for recursive descent. Filter
              expressions like <code className="text-slate-300">[?(@.price &lt; 10)]</code> let
              you select nodes matching a condition.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/json-path-tester" />

      <Footer />
    </div>
  );
}
