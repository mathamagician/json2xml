import type { Metadata } from "next";
import CodeGeneratorTool from "@/components/CodeGeneratorTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free JSON to Go Converter Online — json2xml.com",
  description:
    "Generate Go structs from JSON instantly in your browser. Includes JSON struct tags, nested structs, and proper Go types. Free, private — your data never leaves your machine.",
  keywords: [
    "json to go",
    "json to go struct",
    "json to golang",
    "generate go struct from json",
    "json to go converter",
    "json go struct generator",
    "convert json to go",
    "json to go online",
    "json2go",
    "go struct generator",
    "json to golang struct",
    "json to go types",
  ],
  alternates: {
    canonical: "https://json2xml.com/json-to-go",
  },
  openGraph: {
    title: "Free JSON to Go Converter Online — json2xml.com",
    description:
      "Generate Go structs from JSON instantly in your browser. Free, private, no sign-up required.",
    url: "https://json2xml.com/json-to-go",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSON to Go Converter — json2xml.com",
  url: "https://json2xml.com/json-to-go",
  description:
    "Free online JSON to Go converter. Generate Go structs with JSON tags from JSON instantly in your browser. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What does it generate?", answer: "It generates Go structs with exported fields and JSON struct tags (e.g., `json:\"fieldName\"`) that map directly to your JSON keys." },
  { question: "Does it handle nested objects?", answer: "Yes — each nested JSON object becomes a separate Go struct. The parent struct references the nested struct by type." },
  { question: "Does it handle arrays?", answer: "Yes — JSON arrays are mapped to Go slices ([]T) with the appropriate element type inferred from the array contents." },
  { question: "Can I customize the struct name?", answer: "Yes — you can set a custom name for the root struct. Nested structs are automatically named based on their property keys." },
  { question: "Is this converter free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All conversion happens locally in your browser using JavaScript. Your JSON is never uploaded to any server. It's safe to use with sensitive or proprietary data." },
];

const faqItems: FaqItem[] = [
  {
    question: "What does it generate?",
    answer: (
      <>
        It generates Go structs with exported fields and JSON struct tags (e.g.,{" "}
        <code className="text-slate-300">{"`json:\"fieldName\"`"}</code>) that map directly
        to your JSON keys.
      </>
    ),
  },
  {
    question: "Does it handle nested objects?",
    answer:
      "Yes — each nested JSON object becomes a separate Go struct. The parent struct references the nested struct by type.",
  },
  {
    question: "Does it handle arrays?",
    answer: (
      <>
        Yes — JSON arrays are mapped to Go slices (
        <code className="text-slate-300">[]T</code>) with the appropriate element type
        inferred from the array contents.
      </>
    ),
  },
  {
    question: "Can I customize the struct name?",
    answer:
      "Yes — you can set a custom name for the root struct. Nested structs are automatically named based on their property keys.",
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
];

export default function JsonToGo() {
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

      <Header currentSlug="/json-to-go" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free JSON to Go Converter
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Generate Go structs from JSON instantly. Includes JSON struct tags and handles nested
            objects and arrays. Runs in your browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <CodeGeneratorTool language="go" />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">100% Private</h3>
            <p>
              All conversion happens in your browser using JavaScript. Nothing is
              uploaded to any server. Safe for sensitive business data.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">JSON Tags</h3>
            <p>
              Every field includes a JSON struct tag so your Go structs work seamlessly
              with encoding/json marshal and unmarshal.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">Nested Structs</h3>
            <p>
              Nested JSON objects are automatically extracted into separate Go structs.
              Arrays of objects get their own typed structs too.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Generate Go Structs from JSON
            </h2>
            <p className="leading-relaxed">
              Paste your JSON into the left panel and Go struct code appears instantly on the right.
              The converter maps JSON objects to Go structs with exported fields and{" "}
              <code className="text-slate-300">json:"..."</code> struct tags. Nested objects become
              separate structs, and arrays are typed as slices. You can customize the root struct
              name and copy or download the generated code.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Common JSON to Go Use Cases
            </h2>
            <p className="leading-relaxed">
              Use this tool when building Go APIs or microservices that consume or produce JSON,
              when you need request/response structs for HTTP handlers, or when working with
              JSON configuration files in Go applications. The generated structs include proper
              JSON tags and work directly with Go&apos;s{" "}
              <code className="text-slate-300">encoding/json</code> package for marshaling and
              unmarshaling.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/json-to-go" />

      <Footer />
    </div>
  );
}
