import type { Metadata } from "next";
import JsonDiffTool from "@/components/JsonDiffTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free JSON Diff / Compare Tool Online — json2xml.com",
  description:
    "Compare two JSON documents and see structural differences highlighted. Keys are sorted for semantic comparison. Free, private.",
  keywords: [
    "json diff",
    "json compare",
    "compare json",
    "json difference",
    "json diff tool",
    "json comparison",
    "json diff online",
    "compare json objects",
    "json compare tool",
    "diff json",
    "json structural diff",
    "json diff checker",
  ],
  alternates: {
    canonical: "https://json2xml.com/json-diff",
  },
  openGraph: {
    title: "Free JSON Diff / Compare Tool Online — json2xml.com",
    description:
      "Compare two JSON documents and see structural differences highlighted. Keys are sorted for semantic comparison. Free, private.",
    url: "https://json2xml.com/json-diff",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSON Diff Tool — json2xml.com",
  url: "https://json2xml.com/json-diff",
  description:
    "Free online JSON diff tool. Compare two JSON documents and see structural differences highlighted line by line. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "How does JSON diff compare documents?", answer: "The tool parses both JSON documents, sorts all keys alphabetically, and re-formats them with consistent indentation. It then compares the normalized output line by line using a longest common subsequence algorithm, highlighting additions and removals." },
  { question: "Does it sort keys before comparing?", answer: "Yes — keys are sorted recursively at every level of nesting. This means two JSON documents with the same data but different key ordering will show no differences, which is the correct semantic comparison." },
  { question: "What about formatting differences?", answer: "Formatting differences like extra whitespace, different indentation, or trailing commas are normalized away before comparison. Only structural and value differences are shown." },
  { question: "Can I compare nested objects and arrays?", answer: "Yes — the tool handles deeply nested objects and arrays. All levels are normalized and compared, so differences at any depth are detected and highlighted." },
  { question: "Is this tool free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits. If you find it useful, a coffee is appreciated but never required." },
  { question: "Is my data safe?", answer: "All comparison happens locally in your browser using JavaScript. Your JSON is never uploaded to any server. It's safe to use with sensitive or proprietary data." },
];

const faqItems: FaqItem[] = [
  {
    question: "How does JSON diff compare documents?",
    answer:
      "The tool parses both JSON documents, sorts all keys alphabetically, and re-formats them with consistent indentation. It then compares the normalized output line by line using a longest common subsequence algorithm, highlighting additions and removals.",
  },
  {
    question: "Does it sort keys before comparing?",
    answer:
      "Yes — keys are sorted recursively at every level of nesting. This means two JSON documents with the same data but different key ordering will show no differences, which is the correct semantic comparison.",
  },
  {
    question: "What about formatting differences?",
    answer:
      "Formatting differences like extra whitespace, different indentation, or trailing commas are normalized away before comparison. Only structural and value differences are shown.",
  },
  {
    question: "Can I compare nested objects and arrays?",
    answer:
      "Yes — the tool handles deeply nested objects and arrays. All levels are normalized and compared, so differences at any depth are detected and highlighted.",
  },
  {
    question: "Is this tool free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits. If you find it useful, a coffee is appreciated but never required.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All comparison happens locally in your browser using JavaScript. Your JSON is never uploaded to any server. It's safe to use with sensitive or proprietary data.",
  },
];

export default function JsonDiffPage() {
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

      <Header currentSlug="/json-diff" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free JSON Diff / Compare Tool
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Compare two JSON documents and see structural differences highlighted.
            Keys are sorted for semantic comparison. Runs in your browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <JsonDiffTool />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔍 Semantic Comparison</h3>
            <p>
              Compares JSON by structure and values, not by text formatting.
              Whitespace and key ordering differences are normalized away.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔤 Sorted Keys</h3>
            <p>
              Keys are sorted alphabetically at every nesting level before
              comparison, so reordered keys don&apos;t produce false differences.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🎨 Color-Coded Output</h3>
            <p>
              Added lines are highlighted in green and removed lines in red,
              making structural differences instantly visible.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Compare JSON Documents
            </h2>
            <p className="leading-relaxed">
              Paste your original JSON in the left panel and the modified JSON in the
              right panel, then click Compare. The tool parses both documents, sorts keys
              alphabetically, normalizes formatting, and highlights the differences line
              by line. Green lines are additions and red lines are removals.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Understanding JSON Diff
            </h2>
            <p className="leading-relaxed">
              A JSON diff compares the structure and values of two JSON documents. Unlike
              a plain text diff, a JSON-aware comparison normalizes formatting and key
              ordering so that only meaningful changes are shown. This is especially
              useful when comparing API responses, configuration files, or database
              exports where key order may vary but the data is semantically identical.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/json-diff" />

      <Footer />
    </div>
  );
}
