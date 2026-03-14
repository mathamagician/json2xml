import type { Metadata } from "next";
import XPathTester from "@/components/XPathTester";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free XPath Tester Online — json2xml.com",
  description:
    "Test XPath expressions against XML data and see matched nodes instantly. Full XPath 1.0 support via the browser's built-in evaluator. Free, private — your data never leaves your machine.",
  keywords: [
    "xpath tester",
    "xpath",
    "test xpath",
    "xpath evaluator",
    "xpath online",
    "xpath expression",
    "xpath query",
    "xpath tester online",
    "xpath finder",
    "xpath tool",
    "xpath checker",
    "xpath selector",
  ],
  alternates: {
    canonical: "https://json2xml.com/xpath-tester",
  },
  openGraph: {
    title: "Free XPath Tester Online — json2xml.com",
    description:
      "Test XPath expressions against XML data and see matched nodes instantly. Free, private, no sign-up required.",
    url: "https://json2xml.com/xpath-tester",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "XPath Tester — json2xml.com",
  url: "https://json2xml.com/xpath-tester",
  description:
    "Free online XPath tester. Test XPath expressions against XML data and see matched nodes instantly. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What XPath syntax is supported?", answer: "The tester supports full XPath 1.0 syntax using the browser's built-in XPath evaluator. This includes axes, predicates, functions, and all standard XPath expressions." },
  { question: "Does it evaluate in real-time?", answer: "Yes — the XPath expression is evaluated as you type and matched nodes update instantly." },
  { question: "Can I copy the results?", answer: "Yes — matched results can be copied to your clipboard with a single click." },
  { question: "Is this tool free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All evaluation happens locally in your browser using JavaScript. Nothing is uploaded to any server. It's safe to use with sensitive or proprietary data." },
  { question: "What is XPath?", answer: "XPath (XML Path Language) is a query language for selecting nodes from XML documents. It uses path expressions to navigate through elements and attributes in an XML document tree." },
];

const faqItems: FaqItem[] = [
  {
    question: "What XPath syntax is supported?",
    answer:
      "The tester supports full XPath 1.0 syntax using the browser's built-in XPath evaluator. This includes axes, predicates, functions, and all standard XPath expressions.",
  },
  {
    question: "Does it evaluate in real-time?",
    answer:
      "Yes — the XPath expression is evaluated as you type and matched nodes update instantly.",
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
    question: "What is XPath?",
    answer:
      "XPath (XML Path Language) is a query language for selecting nodes from XML documents. It uses path expressions to navigate through elements and attributes in an XML document tree.",
  },
];

export default function XPathTesterPage() {
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

      <Header currentSlug="/xpath-tester" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free XPath Tester
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Test XPath expressions against XML data and see matched nodes instantly.
            Runs in your browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <XPathTester />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔒 100% Private</h3>
            <p>
              All evaluation happens in your browser using the built-in XPath
              evaluator. Nothing is uploaded to any server. Safe for sensitive data.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">⚡ Real-time Evaluation</h3>
            <p>
              Matched nodes update instantly as you type your XPath expression.
              No need to click a button.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔢 Match Count</h3>
            <p>
              See how many nodes matched your XPath expression at a glance,
              along with the serialized content of each match.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Use XPath
            </h2>
            <p className="leading-relaxed">
              Paste your XML data into the input panel and enter an XPath expression.
              Matched nodes appear instantly in the output panel. Use path expressions
              like <code className="text-slate-300">/bookstore/book/title</code> to select
              specific elements, or <code className="text-slate-300">//title</code> to find
              all title elements anywhere in the document. Predicates like{" "}
              <code className="text-slate-300">[1]</code> or{" "}
              <code className="text-slate-300">[@lang=&apos;en&apos;]</code> let you filter results.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              XPath Syntax Reference
            </h2>
            <p className="leading-relaxed">
              XPath uses <code className="text-slate-300">/</code> to select from the root,{" "}
              <code className="text-slate-300">//</code> to select nodes anywhere,{" "}
              <code className="text-slate-300">.</code> for the current node,{" "}
              <code className="text-slate-300">..</code> for the parent node, and{" "}
              <code className="text-slate-300">@</code> to select attributes. Axes like{" "}
              <code className="text-slate-300">child::</code>,{" "}
              <code className="text-slate-300">descendant::</code>, and{" "}
              <code className="text-slate-300">ancestor::</code> provide fine-grained
              navigation through the XML tree. Functions like{" "}
              <code className="text-slate-300">contains()</code>,{" "}
              <code className="text-slate-300">text()</code>, and{" "}
              <code className="text-slate-300">count()</code> add powerful filtering capabilities.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/xpath-tester" />

      <Footer />
    </div>
  );
}
