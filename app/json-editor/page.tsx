import type { Metadata } from "next";
import JsonEditor from "@/components/JsonEditor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free JSON Editor Online — json2xml.com",
  description:
    "Edit JSON with a tree preview, format, and minify. Real-time validation with error messages. Free, private — your data never leaves your machine.",
  keywords: [
    "json editor",
    "json editor online",
    "edit json",
    "json editor free",
    "online json editor",
    "json editor tool",
    "json text editor",
    "json editor with tree",
    "json editor with validation",
    "edit json online",
    "json ide",
    "json workspace",
  ],
  alternates: {
    canonical: "https://json2xml.com/json-editor",
  },
  openGraph: {
    title: "Free JSON Editor Online — json2xml.com",
    description:
      "Edit JSON with a tree preview, format, and minify. Free, private, no sign-up required.",
    url: "https://json2xml.com/json-editor",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSON Editor — json2xml.com",
  url: "https://json2xml.com/json-editor",
  description:
    "Free online JSON editor with tree preview. Edit, format, and minify JSON with real-time validation. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What does the JSON Editor do?", answer: "The JSON Editor provides a text editor with real-time validation and a tree preview panel. As you type, the tree updates to show the structure of your JSON. You can also format (pretty-print) or minify your JSON with one click." },
  { question: "Does it validate my JSON?", answer: "Yes — the editor validates your JSON in real-time as you type. A green checkmark indicates valid JSON, while a red X shows the error message with details about what went wrong." },
  { question: "Is this editor free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All editing and validation happens locally in your browser using JavaScript. Your JSON is never uploaded to any server. It's safe to use with sensitive or proprietary data." },
  { question: "Can I format and minify?", answer: "Yes — use the Format button to pretty-print with your choice of indentation (2 spaces, 4 spaces, or tabs), or the Minify button to remove all whitespace." },
  { question: "Can I also view JSON as a tree?", answer: "For a dedicated tree view with copy-path support, use the JSON Viewer at json2xml.com/json-viewer." },
];

const faqItems: FaqItem[] = [
  {
    question: "What does the JSON Editor do?",
    answer:
      "The JSON Editor provides a text editor with real-time validation and a tree preview panel. As you type, the tree updates to show the structure of your JSON. You can also format (pretty-print) or minify your JSON with one click.",
  },
  {
    question: "Does it validate my JSON?",
    answer:
      "Yes — the editor validates your JSON in real-time as you type. A green checkmark indicates valid JSON, while a red X shows the error message with details about what went wrong.",
  },
  {
    question: "Is this editor free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All editing and validation happens locally in your browser using JavaScript. Your JSON is never uploaded to any server. It's safe to use with sensitive or proprietary data.",
  },
  {
    question: "Can I format and minify?",
    answer:
      "Yes — use the Format button to pretty-print with your choice of indentation (2 spaces, 4 spaces, or tabs), or the Minify button to remove all whitespace.",
  },
  {
    question: "Can I also view JSON as a tree?",
    answer: (
      <>
        For a dedicated tree view with copy-path support, use the{" "}
        <a href="/json-viewer" className="text-brand-400 hover:underline">JSON Viewer</a>.
      </>
    ),
  },
];

export default function JsonEditorPage() {
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

      <Header currentSlug="/json-editor" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free JSON Editor
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Edit JSON with real-time validation and a tree preview. Format, minify, copy, and download. Runs in your
            browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <JsonEditor />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔒 100% Private</h3>
            <p>
              All editing and validation happens in your browser using JavaScript. Nothing is
              uploaded to any server. Safe for sensitive API data.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">✅ Real-time Validation</h3>
            <p>
              See validation status as you type. Errors show immediately with descriptive
              messages so you can fix issues fast.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🌳 Tree Preview</h3>
            <p>
              A collapsible tree view updates in real-time as you edit, making it easy to
              understand the structure of complex JSON documents.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Edit JSON Online
            </h2>
            <p className="leading-relaxed">
              Paste your JSON into the editor panel on the left. A tree preview appears on the right,
              updating in real-time as you type. The validation indicator below the editor tells you
              whether your JSON is valid. Use the Format button to pretty-print with your preferred
              indentation, or Minify to strip all whitespace. You can also drag and drop
              a <code className="text-slate-300">.json</code> file or use the upload button.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              When to Use a JSON Editor
            </h2>
            <p className="leading-relaxed">
              A JSON editor is useful for creating or modifying API request bodies, editing configuration
              files, preparing test data, cleaning up JSON exports, or quickly formatting JSON for
              documentation. The tree preview helps you verify the structure is correct before using
              the JSON in your application.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/json-editor" />

      <Footer />
    </div>
  );
}
