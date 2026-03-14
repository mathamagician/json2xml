import type { Metadata } from "next";
import JsonSchemaGenerator from "@/components/JsonSchemaGenerator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free JSON Schema Generator Online — json2xml.com",
  description:
    "Generate a JSON Schema from sample JSON data instantly. Infers types, formats, and required fields. Free, private, no sign-up.",
  keywords: [
    "json schema generator",
    "json to json schema",
    "generate json schema",
    "json schema from json",
    "json schema creator",
    "json schema tool",
    "json schema online",
    "create json schema",
    "json schema builder",
    "infer json schema",
    "json schema draft",
    "sample to schema",
  ],
  alternates: {
    canonical: "https://json2xml.com/json-schema-generator",
  },
  openGraph: {
    title: "Free JSON Schema Generator Online — json2xml.com",
    description:
      "Generate a JSON Schema from sample JSON data instantly. Infers types, formats, and required fields. Free, private, no sign-up.",
    url: "https://json2xml.com/json-schema-generator",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSON Schema Generator — json2xml.com",
  url: "https://json2xml.com/json-schema-generator",
  description:
    "Free online JSON Schema generator. Paste sample JSON and get a draft-07 schema with inferred types, formats, and required fields. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What is JSON Schema?", answer: "JSON Schema is a vocabulary that lets you annotate and validate JSON documents. It describes the structure, types, and constraints of your data, making it useful for documentation, validation, and code generation." },
  { question: "Which JSON Schema draft does this tool use?", answer: "This tool generates schemas conforming to JSON Schema draft-07, which is the most widely supported draft across validators and tooling." },
  { question: "Does it detect string formats?", answer: "Yes — the generator automatically detects common formats including date-time, date, email, and URI. These are added as format annotations in the generated schema." },
  { question: "How are required fields determined?", answer: "For a single object, all fields are marked as required by default. When inferring from an array of objects, a field is only marked required if it appears in every object in the array." },
  { question: "Does it handle nested objects and arrays?", answer: "Yes — the schema generator recursively infers types for nested objects and arrays. For arrays with mixed types, it uses anyOf to represent the possible item schemas." },
  { question: "Is my data safe?", answer: "All schema generation happens locally in your browser using JavaScript. Your JSON is never uploaded to any server. It's safe to use with sensitive or proprietary data." },
];

const faqItems: FaqItem[] = [
  {
    question: "What is JSON Schema?",
    answer:
      "JSON Schema is a vocabulary that lets you annotate and validate JSON documents. It describes the structure, types, and constraints of your data, making it useful for documentation, validation, and code generation.",
  },
  {
    question: "Which JSON Schema draft does this tool use?",
    answer:
      "This tool generates schemas conforming to JSON Schema draft-07, which is the most widely supported draft across validators and tooling.",
  },
  {
    question: "Does it detect string formats?",
    answer:
      "Yes — the generator automatically detects common formats including date-time, date, email, and URI. These are added as format annotations in the generated schema.",
  },
  {
    question: "How are required fields determined?",
    answer:
      "For a single object, all fields are marked as required by default. When inferring from an array of objects, a field is only marked required if it appears in every object in the array.",
  },
  {
    question: "Does it handle nested objects and arrays?",
    answer:
      "Yes — the schema generator recursively infers types for nested objects and arrays. For arrays with mixed types, it uses anyOf to represent the possible item schemas.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All schema generation happens locally in your browser using JavaScript. Your JSON is never uploaded to any server. It's safe to use with sensitive or proprietary data.",
  },
];

export default function JsonSchemaGeneratorPage() {
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

      <Header currentSlug="/json-schema-generator" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free JSON Schema Generator
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Paste sample JSON and get a draft-07 schema with inferred types,
            formats, and required fields. Runs in your browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <JsonSchemaGenerator />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔍 Type Inference</h3>
            <p>
              Automatically detects string, number, integer, boolean, null,
              object, and array types from your sample data.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">📧 Format Detection</h3>
            <p>
              Recognizes common string formats like date-time, date, email, and
              URI and adds them as schema annotations.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">📋 Draft-07 Compliant</h3>
            <p>
              Generates schemas conforming to JSON Schema draft-07, the most
              widely supported draft across validators and tooling.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Generate a JSON Schema
            </h2>
            <p className="leading-relaxed">
              Paste your sample JSON into the left panel and the generated JSON Schema
              appears instantly on the right. The tool recursively infers types for every
              field, detects common string formats like dates and emails, and marks all
              fields as required by default. You can also upload
              a <code className="text-slate-300">.json</code> file. Copy the output or
              download it as a <code className="text-slate-300">.schema.json</code> file.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Understanding JSON Schema
            </h2>
            <p className="leading-relaxed">
              JSON Schema provides a contract for what your JSON data should look like.
              It specifies which fields are expected, what types they should be, and
              whether they are required. Schemas are used for API request/response
              validation, form generation, documentation, and code generation. Draft-07
              is the most commonly supported version, compatible with popular validators
              like Ajv, jsonschema (Python), and many others.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/json-schema-generator" />

      <Footer />
    </div>
  );
}
