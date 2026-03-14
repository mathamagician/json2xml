import type { Metadata } from "next";
import JsonViewer from "@/components/JsonViewer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free JSON Viewer Online — json2xml.com",
  description:
    "View JSON as a collapsible tree with syntax coloring. Click to expand/collapse nodes and copy paths. Free, private — your data never leaves your machine.",
  keywords: [
    "json viewer",
    "json tree viewer",
    "json viewer online",
    "view json",
    "json tree",
    "json explorer",
    "json browser",
    "json visualizer",
    "json viewer free",
    "json tree view",
    "collapsible json",
    "json structure viewer",
  ],
  alternates: {
    canonical: "https://json2xml.com/json-viewer",
  },
  openGraph: {
    title: "Free JSON Viewer Online — json2xml.com",
    description:
      "View JSON as a collapsible tree with syntax coloring. Free, private, no sign-up required.",
    url: "https://json2xml.com/json-viewer",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSON Viewer — json2xml.com",
  url: "https://json2xml.com/json-viewer",
  description:
    "Free online JSON viewer. View JSON as a collapsible tree with syntax coloring. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What does the JSON Viewer do?", answer: "The JSON Viewer parses your JSON and displays it as an interactive, collapsible tree. Objects and arrays can be expanded or collapsed, and values are color-coded by type (strings in green, numbers in amber, booleans in purple, null in gray)." },
  { question: "Can I copy a JSON path?", answer: "Yes — click any key name in the tree to copy its dot-notation path to your clipboard (e.g., data.users[0].name). This is useful for referencing specific values in code or APIs." },
  { question: "Is this viewer free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All parsing happens locally in your browser using JavaScript. Your JSON is never uploaded to any server. It's safe to use with sensitive or proprietary data." },
  { question: "How deep does the tree expand?", answer: "The tree starts expanded to 2 levels deep. You can click any node to expand or collapse it, or use the Reset button to restore the default view." },
  { question: "Can I also edit JSON?", answer: "For editing, use the JSON Editor at json2xml.com/json-editor which provides a tree preview alongside an editable raw JSON panel." },
];

const faqItems: FaqItem[] = [
  {
    question: "What does the JSON Viewer do?",
    answer:
      "The JSON Viewer parses your JSON and displays it as an interactive, collapsible tree. Objects and arrays can be expanded or collapsed, and values are color-coded by type (strings in green, numbers in amber, booleans in purple, null in gray).",
  },
  {
    question: "Can I copy a JSON path?",
    answer: (
      <>
        Yes — click any key name in the tree to copy its dot-notation path to your clipboard
        (e.g., <code className="text-slate-300">data.users[0].name</code>). This is useful for
        referencing specific values in code or APIs.
      </>
    ),
  },
  {
    question: "Is this viewer free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All parsing happens locally in your browser using JavaScript. Your JSON is never uploaded to any server. It's safe to use with sensitive or proprietary data.",
  },
  {
    question: "How deep does the tree expand?",
    answer:
      "The tree starts expanded to 2 levels deep. You can click any node to expand or collapse it, or use the Reset button to restore the default view.",
  },
  {
    question: "Can I also edit JSON?",
    answer: (
      <>
        For editing, use the{" "}
        <a href="/json-editor" className="text-brand-400 hover:underline">JSON Editor</a>{" "}
        which provides a tree preview alongside an editable raw JSON panel.
      </>
    ),
  },
];

export default function JsonViewerPage() {
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

      <Header currentSlug="/json-viewer" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free JSON Viewer
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            View JSON as a collapsible tree with syntax coloring. Click keys to copy paths. Runs in your
            browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <JsonViewer />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔒 100% Private</h3>
            <p>
              All parsing happens in your browser using JavaScript. Nothing is
              uploaded to any server. Safe for sensitive API responses.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🎨 Syntax Coloring</h3>
            <p>
              Values are color-coded by type: strings in green, numbers in amber,
              booleans in purple, and null in gray. Spot types at a glance.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">📋 Copy Paths</h3>
            <p>
              Click any key name to copy its dot-notation path (e.g., data.users[0].name)
              to your clipboard. Great for API debugging.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to View JSON Online
            </h2>
            <p className="leading-relaxed">
              Paste your JSON into the left panel and an interactive tree view appears on the right.
              Click the ▶ arrows to expand or collapse objects and arrays. Click any key name to copy
              its dot-notation path. You can also drag and drop a <code className="text-slate-300">.json</code> file
              or use the upload button.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              When to Use a JSON Viewer
            </h2>
            <p className="leading-relaxed">
              A JSON viewer is essential for debugging API responses, exploring large configuration
              files, inspecting database exports, and understanding complex nested data structures.
              The tree view makes it easy to navigate deeply nested JSON that would be hard to read
              as raw text.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/json-viewer" />

      <Footer />
    </div>
  );
}
