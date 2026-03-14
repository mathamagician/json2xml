import type { Metadata } from "next";
import CodeGeneratorTool from "@/components/CodeGeneratorTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free JSON to Java Converter Online — json2xml.com",
  description:
    "Generate Java classes (POJOs) from JSON instantly in your browser. Private fields, getters, setters, and List imports. Free, private — your data never leaves your machine.",
  keywords: [
    "json to java",
    "json to java class",
    "json to pojo",
    "generate java from json",
    "json to java converter",
    "json java class generator",
    "json to java object",
    "convert json to java",
    "json to java online",
    "json2java",
    "java class generator",
    "json to pojo converter",
  ],
  alternates: {
    canonical: "https://json2xml.com/json-to-java",
  },
  openGraph: {
    title: "Free JSON to Java Converter Online — json2xml.com",
    description:
      "Generate Java classes from JSON instantly in your browser. Free, private, no sign-up required.",
    url: "https://json2xml.com/json-to-java",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSON to Java Converter — json2xml.com",
  url: "https://json2xml.com/json-to-java",
  description:
    "Free online JSON to Java converter. Generate Java POJOs from JSON instantly in your browser. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What does it generate?", answer: "It generates Java POJOs (Plain Old Java Objects) with private fields, getter methods, and setter methods for each property in your JSON." },
  { question: "Does it handle arrays?", answer: "Yes — JSON arrays are mapped to List<T> in the generated Java code, with the appropriate element type inferred from the array contents." },
  { question: "Does it add imports?", answer: "Yes — when your JSON contains arrays, the generated code automatically includes the java.util.List import statement." },
  { question: "Can I customize the class name?", answer: "Yes — you can set a custom name for the root class. Nested classes are automatically named based on their property keys." },
  { question: "Is this converter free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All conversion happens locally in your browser using JavaScript. Your JSON is never uploaded to any server. It's safe to use with sensitive or proprietary data." },
];

const faqItems: FaqItem[] = [
  {
    question: "What does it generate?",
    answer:
      "It generates Java POJOs (Plain Old Java Objects) with private fields, getter methods, and setter methods for each property in your JSON.",
  },
  {
    question: "Does it handle arrays?",
    answer: (
      <>
        Yes — JSON arrays are mapped to{" "}
        <code className="text-slate-300">List&lt;T&gt;</code> in the generated Java code,
        with the appropriate element type inferred from the array contents.
      </>
    ),
  },
  {
    question: "Does it add imports?",
    answer: (
      <>
        Yes — when your JSON contains arrays, the generated code automatically includes the{" "}
        <code className="text-slate-300">java.util.List</code> import statement.
      </>
    ),
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

export default function JsonToJava() {
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

      <Header currentSlug="/json-to-java" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free JSON to Java Converter
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Generate Java classes (POJOs) from JSON instantly. Includes private fields, getters,
            setters, and List imports. Runs in your browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <CodeGeneratorTool language="java" />
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
            <h3 className="text-slate-200 font-semibold mb-2">POJO Generation</h3>
            <p>
              Generates clean Java POJOs with private fields and proper encapsulation.
              Ready to drop into any Java project.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">Getters & Setters</h3>
            <p>
              Every field gets properly named getter and setter methods following
              standard Java naming conventions.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Generate Java Classes from JSON
            </h2>
            <p className="leading-relaxed">
              Paste your JSON into the left panel and Java class code appears instantly on the right.
              The converter maps JSON objects to Java classes with private fields and public
              getter/setter methods. Nested objects become separate classes, and arrays are typed
              as <code className="text-slate-300">List&lt;T&gt;</code>. You can customize the root
              class name and copy or download the generated code.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Common JSON to Java Use Cases
            </h2>
            <p className="leading-relaxed">
              Use this tool when consuming REST APIs in Java and you need model classes for
              deserialization with Jackson or Gson, when scaffolding data transfer objects (DTOs)
              from API documentation, or when migrating JSON-based configurations to strongly-typed
              Java classes. The generated POJOs follow standard Java conventions and are ready
              to use with popular serialization libraries.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/json-to-java" />

      <Footer />
    </div>
  );
}
