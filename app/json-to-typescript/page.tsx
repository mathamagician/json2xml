import type { Metadata } from "next";
import CodeGeneratorTool from "@/components/CodeGeneratorTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free JSON to TypeScript Converter Online — json2xml.com",
  description:
    "Generate TypeScript interfaces from JSON instantly in your browser. Handles nested objects, arrays, and type inference. Free, private — your data never leaves your machine.",
  keywords: [
    "json to typescript",
    "json to ts",
    "json to typescript interface",
    "generate typescript from json",
    "json to typescript converter",
    "json to ts interface",
    "json typescript generator",
    "convert json to typescript",
    "json to ts online",
    "json to interface",
    "json2ts",
    "typescript interface generator",
  ],
  alternates: {
    canonical: "https://json2xml.com/json-to-typescript",
  },
  openGraph: {
    title: "Free JSON to TypeScript Converter Online — json2xml.com",
    description:
      "Generate TypeScript interfaces from JSON instantly in your browser. Free, private, no sign-up required.",
    url: "https://json2xml.com/json-to-typescript",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSON to TypeScript Converter — json2xml.com",
  url: "https://json2xml.com/json-to-typescript",
  description:
    "Free online JSON to TypeScript converter. Generate TypeScript interfaces from JSON instantly in your browser. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What does it generate?", answer: "It generates TypeScript interfaces that match the shape of your JSON data, with properly typed fields for strings, numbers, booleans, and arrays." },
  { question: "Does it handle nested objects?", answer: "Yes — each nested object gets its own separate interface. This keeps the output clean and reusable across your codebase." },
  { question: "Can I customize the root name?", answer: "Yes — you can set a custom name for the root interface. Nested interfaces are automatically named based on their property keys." },
  { question: "Does it infer types?", answer: "Yes — the converter automatically infers string, number, boolean, and array types from your JSON values. Arrays of objects get their own typed interfaces." },
  { question: "Is this converter free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All conversion happens locally in your browser using JavaScript. Your JSON is never uploaded to any server. It's safe to use with sensitive or proprietary data." },
];

const faqItems: FaqItem[] = [
  {
    question: "What does it generate?",
    answer:
      "It generates TypeScript interfaces that match the shape of your JSON data, with properly typed fields for strings, numbers, booleans, and arrays.",
  },
  {
    question: "Does it handle nested objects?",
    answer:
      "Yes — each nested object gets its own separate interface. This keeps the output clean and reusable across your codebase.",
  },
  {
    question: "Can I customize the root name?",
    answer:
      "Yes — you can set a custom name for the root interface. Nested interfaces are automatically named based on their property keys.",
  },
  {
    question: "Does it infer types?",
    answer: (
      <>
        Yes — the converter automatically infers{" "}
        <code className="text-slate-300">string</code>,{" "}
        <code className="text-slate-300">number</code>,{" "}
        <code className="text-slate-300">boolean</code>, and array types from your JSON values.
        Arrays of objects get their own typed interfaces.
      </>
    ),
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

export default function JsonToTypescript() {
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

      <Header currentSlug="/json-to-typescript" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free JSON to TypeScript Converter
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Generate TypeScript interfaces from JSON instantly. Handles nested objects and arrays
            with full type inference. Runs in your browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <CodeGeneratorTool language="typescript" />
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
            <h3 className="text-slate-200 font-semibold mb-2">Nested Types</h3>
            <p>
              Nested objects are extracted into separate interfaces automatically.
              Arrays of objects get their own typed interfaces too.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">Custom Root Name</h3>
            <p>
              Set a custom name for the root interface to match your project conventions.
              Nested interfaces are named based on their property keys.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Generate TypeScript from JSON
            </h2>
            <p className="leading-relaxed">
              Paste your JSON into the left panel and TypeScript interfaces appear instantly on the right.
              The converter analyzes the structure of your JSON — objects become interfaces, arrays are typed
              with their element types, and primitives are mapped to{" "}
              <code className="text-slate-300">string</code>,{" "}
              <code className="text-slate-300">number</code>, or{" "}
              <code className="text-slate-300">boolean</code>. You can customize the root interface name
              and copy or download the generated code.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              When to Use JSON to TypeScript
            </h2>
            <p className="leading-relaxed">
              Use this tool when consuming REST APIs and you need type-safe interfaces for the response data,
              when migrating JavaScript projects to TypeScript, or when you want to quickly scaffold types
              from sample JSON payloads. TypeScript interfaces help catch bugs at compile time and improve
              editor autocompletion.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/json-to-typescript" />

      <Footer />
    </div>
  );
}
