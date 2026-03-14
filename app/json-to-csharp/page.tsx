import type { Metadata } from "next";
import CodeGeneratorTool from "@/components/CodeGeneratorTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free JSON to C# Converter Online — json2xml.com",
  description:
    "Generate C# classes from JSON instantly in your browser. Auto-properties, nested classes, and List<T> support. Free, private — your data never leaves your machine.",
  keywords: [
    "json to csharp",
    "json to c#",
    "json to c# class",
    "generate csharp from json",
    "json to csharp converter",
    "json c# class generator",
    "convert json to csharp",
    "json to c# online",
    "json2csharp",
    "csharp class generator",
    "json to c# converter",
    "json to dotnet",
  ],
  alternates: {
    canonical: "https://json2xml.com/json-to-csharp",
  },
  openGraph: {
    title: "Free JSON to C# Converter Online — json2xml.com",
    description:
      "Generate C# classes from JSON instantly in your browser. Free, private, no sign-up required.",
    url: "https://json2xml.com/json-to-csharp",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSON to C# Converter — json2xml.com",
  url: "https://json2xml.com/json-to-csharp",
  description:
    "Free online JSON to C# converter. Generate C# classes from JSON instantly in your browser. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What does it generate?", answer: "It generates C# classes with auto-properties (public type Name { get; set; }) for each property in your JSON data." },
  { question: "Does it handle arrays?", answer: "Yes — JSON arrays are mapped to List<T> in the generated C# code, with the appropriate element type inferred from the array contents." },
  { question: "Does it handle nested objects?", answer: "Yes — each nested object in your JSON becomes a separate C# class. The parent class references the nested class by type." },
  { question: "Can I customize the class name?", answer: "Yes — you can set a custom name for the root class. Nested classes are automatically named based on their property keys." },
  { question: "Is this converter free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All conversion happens locally in your browser using JavaScript. Your JSON is never uploaded to any server. It's safe to use with sensitive or proprietary data." },
];

const faqItems: FaqItem[] = [
  {
    question: "What does it generate?",
    answer: (
      <>
        It generates C# classes with auto-properties (
        <code className="text-slate-300">{"public type Name { get; set; }"}</code>
        ) for each property in your JSON data.
      </>
    ),
  },
  {
    question: "Does it handle arrays?",
    answer: (
      <>
        Yes — JSON arrays are mapped to{" "}
        <code className="text-slate-300">List&lt;T&gt;</code> in the generated C# code,
        with the appropriate element type inferred from the array contents.
      </>
    ),
  },
  {
    question: "Does it handle nested objects?",
    answer:
      "Yes — each nested object in your JSON becomes a separate C# class. The parent class references the nested class by type.",
  },
  {
    question: "Can I customize the class name?",
    answer:
      "Yes — you can set a custom name for the root class. Nested classes are automatically named based on their property keys.",
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

export default function JsonToCsharp() {
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

      <Header currentSlug="/json-to-csharp" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free JSON to C# Converter
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Generate C# classes from JSON instantly. Auto-properties, nested classes, and List&lt;T&gt;
            support included. Runs in your browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <CodeGeneratorTool language="csharp" />
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
            <h3 className="text-slate-200 font-semibold mb-2">Auto Properties</h3>
            <p>
              Every property uses C# auto-property syntax with public getters and setters.
              Clean, idiomatic C# code ready for your project.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">Nested Classes</h3>
            <p>
              Nested JSON objects are automatically extracted into separate C# classes.
              Arrays of objects get their own typed classes too.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Generate C# Classes from JSON
            </h2>
            <p className="leading-relaxed">
              Paste your JSON into the left panel and C# class code appears instantly on the right.
              The converter maps JSON objects to C# classes with auto-properties. Nested objects
              become separate classes, and arrays are typed as{" "}
              <code className="text-slate-300">List&lt;T&gt;</code>. You can customize the root
              class name and copy or download the generated code.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Common JSON to C# Use Cases
            </h2>
            <p className="leading-relaxed">
              Use this tool when building .NET applications that consume REST APIs and you need
              model classes for deserialization with System.Text.Json or Newtonsoft.Json, when
              scaffolding DTOs from API responses, or when converting JSON configuration files
              into strongly-typed C# options classes. The generated code follows standard C#
              conventions and works with all major .NET serialization libraries.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/json-to-csharp" />

      <Footer />
    </div>
  );
}
