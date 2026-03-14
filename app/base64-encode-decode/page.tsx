import type { Metadata } from "next";
import Base64Tool from "@/components/Base64Tool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free Base64 Encode / Decode Online — json2xml.com",
  description:
    "Encode text to Base64 or decode Base64 back to text instantly in your browser. Full Unicode support via UTF-8. Free, private — your data never leaves your machine.",
  keywords: [
    "base64 encode",
    "base64 decode",
    "base64 encoder",
    "base64 decoder",
    "base64 converter",
    "base64 online",
    "encode base64",
    "decode base64",
    "base64 to text",
    "text to base64",
    "base64 utf8",
    "base64 tool",
  ],
  alternates: {
    canonical: "https://json2xml.com/base64-encode-decode",
  },
  openGraph: {
    title: "Free Base64 Encode / Decode Online — json2xml.com",
    description:
      "Encode text to Base64 or decode Base64 back to text. Full Unicode support. Free, private, no sign-up required.",
    url: "https://json2xml.com/base64-encode-decode",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Base64 Encode / Decode — json2xml.com",
  url: "https://json2xml.com/base64-encode-decode",
  description:
    "Free online Base64 encoder and decoder. Convert text to Base64 and back with full Unicode support. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What is Base64 encoding?", answer: "Base64 is a binary-to-text encoding scheme that represents binary data as an ASCII string. It uses 64 characters (A-Z, a-z, 0-9, +, /) plus = for padding. It's commonly used to embed binary data in text-based formats like JSON, XML, HTML, and email." },
  { question: "Does this tool support Unicode and emoji?", answer: "Yes — the tool encodes text to UTF-8 first using the TextEncoder API, then Base64-encodes the resulting bytes. This means Unicode characters, accented letters, CJK characters, and emoji all encode and decode correctly." },
  { question: "Can I decode Base64 back to text?", answer: "Yes — the tool is bidirectional. Type or paste Base64 in the right panel and the decoded text appears instantly in the left panel." },
  { question: "Is this tool free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All encoding and decoding happens locally in your browser using JavaScript. Nothing is uploaded to any server. It's safe to use with sensitive or proprietary data." },
  { question: "Why does Base64 make strings longer?", answer: "Base64 encodes every 3 bytes of input into 4 ASCII characters, resulting in roughly 33% size overhead. This tradeoff is accepted because the output is guaranteed to be safe for text-based transport protocols." },
];

const faqItems: FaqItem[] = [
  {
    question: "What is Base64 encoding?",
    answer:
      "Base64 is a binary-to-text encoding scheme that represents binary data as an ASCII string. It uses 64 characters (A-Z, a-z, 0-9, +, /) plus = for padding. It's commonly used to embed binary data in text-based formats like JSON, XML, HTML, and email.",
  },
  {
    question: "Does this tool support Unicode and emoji?",
    answer:
      "Yes — the tool encodes text to UTF-8 first using the TextEncoder API, then Base64-encodes the resulting bytes. This means Unicode characters, accented letters, CJK characters, and emoji all encode and decode correctly.",
  },
  {
    question: "Can I decode Base64 back to text?",
    answer:
      "Yes — the tool is bidirectional. Type or paste Base64 in the right panel and the decoded text appears instantly in the left panel.",
  },
  {
    question: "Is this tool free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All encoding and decoding happens locally in your browser using JavaScript. Nothing is uploaded to any server. It's safe to use with sensitive or proprietary data.",
  },
  {
    question: "Why does Base64 make strings longer?",
    answer:
      "Base64 encodes every 3 bytes of input into 4 ASCII characters, resulting in roughly 33% size overhead. This tradeoff is accepted because the output is guaranteed to be safe for text-based transport protocols.",
  },
];

export default function Base64Page() {
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

      <Header currentSlug="/base64-encode-decode" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free Base64 Encode / Decode
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Convert text to Base64 and back with full Unicode support.
            Runs in your browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <Base64Tool />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">Unicode Support</h3>
            <p>
              Handles the full Unicode range including emoji, CJK characters, and
              accented letters by encoding to UTF-8 before Base64 conversion.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">Bidirectional</h3>
            <p>
              Type in either panel — text on the left encodes to Base64 on the right,
              and Base64 on the right decodes to text on the left, all in real time.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">100% Private</h3>
            <p>
              All encoding and decoding runs locally in your browser using JavaScript.
              Nothing is sent to a server — safe for sensitive data.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Encode and Decode Base64
            </h2>
            <p className="leading-relaxed">
              Type or paste plain text in the left panel and the Base64-encoded output
              appears instantly on the right. To decode, paste a Base64 string in the
              right panel and the original text appears on the left. The tool handles
              Unicode by first encoding text to UTF-8 bytes, ensuring characters outside
              the ASCII range round-trip correctly.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              When to Use Base64
            </h2>
            <p className="leading-relaxed">
              Base64 is used whenever binary data needs to travel through a text-only
              channel. Common use cases include embedding images in CSS or HTML via data
              URIs, encoding authentication credentials in HTTP headers, transmitting
              binary payloads in JSON or XML, and encoding email attachments in MIME
              format. Because the output uses only safe ASCII characters, it avoids
              corruption from text-processing systems that might alter raw bytes.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/base64-encode-decode" />

      <Footer />
    </div>
  );
}
