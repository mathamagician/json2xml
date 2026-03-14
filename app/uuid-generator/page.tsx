import type { Metadata } from "next";
import GeneratorTool from "@/components/GeneratorTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free UUID Generator Online — json2xml.com",
  description:
    "Generate random UUIDs (v4) instantly in your browser. Bulk generate up to 100, with or without hyphens, uppercase or lowercase. Free, private — nothing is sent to any server.",
  keywords: [
    "uuid generator",
    "uuid",
    "guid generator",
    "generate uuid",
    "random uuid",
    "uuid online",
    "uuid v4",
    "uuid creator",
    "uuid maker",
    "bulk uuid generator",
    "uuid generator free",
    "unique id generator",
  ],
  alternates: {
    canonical: "https://json2xml.com/uuid-generator",
  },
  openGraph: {
    title: "Free UUID Generator Online — json2xml.com",
    description:
      "Generate random UUIDs (v4) instantly in your browser. Free, private, no sign-up required.",
    url: "https://json2xml.com/uuid-generator",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "UUID Generator — json2xml.com",
  url: "https://json2xml.com/uuid-generator",
  description:
    "Free online UUID generator. Generate cryptographically random v4 UUIDs instantly. Bulk generate, format options. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What version UUIDs are generated?", answer: "This tool generates version 4 (v4) UUIDs, which are randomly generated. V4 UUIDs are the most commonly used version and are suitable for virtually all use cases requiring unique identifiers." },
  { question: "Are the UUIDs cryptographically random?", answer: "Yes — this tool uses crypto.randomUUID() which is backed by the browser's cryptographically secure random number generator (CSPRNG)." },
  { question: "Can I generate multiple UUIDs at once?", answer: "Yes — you can bulk generate up to 100 UUIDs at a time. Each one is independently random." },
  { question: "Can I remove the hyphens?", answer: "Yes — you can toggle hyphens on or off. Without hyphens, UUIDs are 32 hex characters. You can also switch between lowercase and uppercase." },
  { question: "Is this generator free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "Nothing is sent to any server. All UUIDs are generated locally in your browser using JavaScript. There is no data to protect because nothing is uploaded." },
];

const faqItems: FaqItem[] = [
  {
    question: "What version UUIDs are generated?",
    answer:
      "This tool generates version 4 (v4) UUIDs, which are randomly generated. V4 UUIDs are the most commonly used version and are suitable for virtually all use cases requiring unique identifiers.",
  },
  {
    question: "Are the UUIDs cryptographically random?",
    answer: (
      <>
        Yes — this tool uses <code className="text-slate-300">crypto.randomUUID()</code> which
        is backed by the browser&apos;s cryptographically secure random number generator (CSPRNG).
      </>
    ),
  },
  {
    question: "Can I generate multiple UUIDs at once?",
    answer:
      "Yes — you can bulk generate up to 100 UUIDs at a time. Each one is independently random.",
  },
  {
    question: "Can I remove the hyphens?",
    answer:
      "Yes — you can toggle hyphens on or off. Without hyphens, UUIDs are 32 hex characters. You can also switch between lowercase and uppercase.",
  },
  {
    question: "Is this generator free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Nothing is sent to any server. All UUIDs are generated locally in your browser using JavaScript. There is no data to protect because nothing is uploaded.",
  },
];

export default function UuidGenerator() {
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

      <Header currentSlug="/uuid-generator" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free UUID Generator
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Generate random UUIDs (v4) instantly. Bulk generate, uppercase, with or without hyphens.
            Runs in your browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <GeneratorTool type="uuid" />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔐 Cryptographically Random</h3>
            <p>
              Uses the Web Crypto API for true randomness. Every UUID is generated
              using a cryptographically secure random number generator.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">📦 Bulk Generate</h3>
            <p>
              Generate up to 100 UUIDs at once. Perfect for seeding databases,
              generating test data, or creating unique identifiers in bulk.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">⚙️ Format Options</h3>
            <p>
              Toggle hyphens on or off, switch between uppercase and lowercase.
              Copy individual UUIDs or the entire list.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Generate UUIDs
            </h2>
            <p className="leading-relaxed">
              Click the generate button to create a new UUID instantly. Adjust the count to
              bulk generate multiple UUIDs at once. Toggle format options for hyphens and
              case. Copy individual UUIDs or the full list to your clipboard with one click.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              UUID Format and Versions
            </h2>
            <p className="leading-relaxed">
              A UUID (Universally Unique Identifier) is a 128-bit identifier formatted as 32 hex
              digits in five groups separated by hyphens: <code className="text-slate-300">xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code>.
              Version 4 UUIDs are randomly generated and are the most widely used version. They
              provide sufficient uniqueness for virtually all applications — the probability of
              a collision is astronomically low.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/uuid-generator" />

      <Footer />
    </div>
  );
}
