import type { Metadata } from "next";
import HashGenerator from "@/components/HashGenerator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free Hash Generator Online — json2xml.com",
  description:
    "Generate SHA-1, SHA-256, and SHA-512 hashes of any text instantly in your browser. Free, private — nothing is sent to any server.",
  keywords: [
    "hash generator",
    "sha256 hash",
    "sha1 hash",
    "sha512 hash",
    "hash calculator",
    "generate hash",
    "hash tool",
    "sha256 online",
    "hash generator online",
    "text to hash",
    "sha hash",
    "hash generator free",
  ],
  alternates: {
    canonical: "https://json2xml.com/hash-generator",
  },
  openGraph: {
    title: "Free Hash Generator Online — json2xml.com",
    description:
      "Generate SHA-1, SHA-256, and SHA-512 hashes instantly in your browser. Free, private, no sign-up required.",
    url: "https://json2xml.com/hash-generator",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Hash Generator — json2xml.com",
  url: "https://json2xml.com/hash-generator",
  description:
    "Free online hash generator. Generate SHA-1, SHA-256, and SHA-512 hashes of any text instantly. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What hash algorithms are supported?", answer: "This tool supports SHA-1, SHA-256, and SHA-512. All three are computed simultaneously so you can compare outputs side by side." },
  { question: "Is the hashing real-time?", answer: "Yes — hash values update as you type. There is no submit button needed. The output refreshes instantly with every keystroke." },
  { question: "Does it support MD5?", answer: "No — MD5 is deprecated and considered cryptographically insecure. It is vulnerable to collision attacks and should not be used for security purposes. We only include algorithms that are still considered secure." },
  { question: "Are the hash values correct?", answer: "Yes — this tool uses the Web Crypto API (SubtleCrypto.digest) built into your browser, which provides standard-compliant hash implementations." },
  { question: "Is this generator free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All hashing happens locally in your browser using JavaScript. Your text is never uploaded to any server. It's safe to use with sensitive data." },
];

const faqItems: FaqItem[] = [
  {
    question: "What hash algorithms are supported?",
    answer:
      "This tool supports SHA-1, SHA-256, and SHA-512. All three are computed simultaneously so you can compare outputs side by side.",
  },
  {
    question: "Is the hashing real-time?",
    answer:
      "Yes — hash values update as you type. There is no submit button needed. The output refreshes instantly with every keystroke.",
  },
  {
    question: "Does it support MD5?",
    answer:
      "No — MD5 is deprecated and considered cryptographically insecure. It is vulnerable to collision attacks and should not be used for security purposes. We only include algorithms that are still considered secure.",
  },
  {
    question: "Are the hash values correct?",
    answer: (
      <>
        Yes — this tool uses the Web Crypto API (<code className="text-slate-300">SubtleCrypto.digest</code>)
        built into your browser, which provides standard-compliant hash implementations.
      </>
    ),
  },
  {
    question: "Is this generator free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All hashing happens locally in your browser using JavaScript. Your text is never uploaded to any server. It's safe to use with sensitive data.",
  },
];

export default function HashGeneratorPage() {
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

      <Header currentSlug="/hash-generator" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free Hash Generator
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Generate SHA-1, SHA-256, and SHA-512 hashes of any text instantly.
            Runs in your browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <HashGenerator />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔒 100% Private</h3>
            <p>
              All hashing happens in your browser using the Web Crypto API. Nothing is
              uploaded to any server. Safe for sensitive data.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔀 Multiple Algorithms</h3>
            <p>
              SHA-1, SHA-256, and SHA-512 are computed simultaneously. Compare
              outputs side by side without switching tools.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">⚡ Real-time</h3>
            <p>
              Hash values update as you type. No submit button, no waiting —
              instant feedback with every keystroke.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Generate Hash Values
            </h2>
            <p className="leading-relaxed">
              Type or paste any text into the input field and the SHA-1, SHA-256, and SHA-512
              hash values appear instantly below. Copy any hash to your clipboard with one click.
              The hashes update in real-time as you modify the input.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Understanding Hash Algorithms
            </h2>
            <p className="leading-relaxed">
              A cryptographic hash function takes any input and produces a fixed-size output
              (the hash or digest). SHA-256 produces a 256-bit (64 hex character) hash and is
              the most widely used for data integrity, digital signatures, and blockchain.
              SHA-512 produces a 512-bit hash for applications needing longer digests. SHA-1
              produces a 160-bit hash but is considered weak for cryptographic security — it
              remains useful for checksums and non-security applications.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/hash-generator" />

      <Footer />
    </div>
  );
}
