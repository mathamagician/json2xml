import type { Metadata } from "next";
import UrlEncodeTool from "@/components/UrlEncodeTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free URL Encode / Decode Online — json2xml.com",
  description:
    "URL-encode or decode text instantly in your browser. Supports component encoding and full URL encoding with percent-encoding. Free, private — your data never leaves your machine.",
  keywords: [
    "url encode",
    "url decode",
    "urlencode",
    "urldecode",
    "percent encoding",
    "url encoder",
    "url decoder",
    "encodeURIComponent",
    "encode url online",
    "decode url online",
    "url escape",
    "percent decode",
  ],
  alternates: {
    canonical: "https://json2xml.com/url-encode-decode",
  },
  openGraph: {
    title: "Free URL Encode / Decode Online — json2xml.com",
    description:
      "URL-encode or decode text instantly. Component and full URL modes. Free, private, no sign-up required.",
    url: "https://json2xml.com/url-encode-decode",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "URL Encode / Decode — json2xml.com",
  url: "https://json2xml.com/url-encode-decode",
  description:
    "Free online URL encoder and decoder. Encode and decode URLs with percent-encoding. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What is URL encoding?", answer: "URL encoding (also called percent-encoding) replaces unsafe characters in a URL with a percent sign followed by two hex digits representing the character's byte value. For example, a space becomes %20 and an ampersand becomes %26." },
  { question: "What is the difference between component and full URL mode?", answer: "Component mode (encodeURIComponent) encodes all special characters including /, ?, &, and =. Full URL mode (encodeURI) preserves URL structure characters like ://, /, ?, #, and & while encoding everything else. Use component mode for query parameter values and full URL mode for complete URLs." },
  { question: "Can I decode a URL-encoded string?", answer: "Yes — the tool is bidirectional. Paste a percent-encoded string in the right panel and the decoded text appears instantly in the left panel." },
  { question: "Is this tool free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All encoding and decoding happens locally in your browser using JavaScript. Nothing is uploaded to any server. It's safe to use with sensitive or proprietary data." },
  { question: "Why do URLs need encoding?", answer: "URLs can only contain a limited set of ASCII characters. Characters like spaces, quotes, angle brackets, and non-ASCII characters must be percent-encoded to be safely included in a URL without breaking its structure or being misinterpreted by servers and browsers." },
];

const faqItems: FaqItem[] = [
  {
    question: "What is URL encoding?",
    answer:
      "URL encoding (also called percent-encoding) replaces unsafe characters in a URL with a percent sign followed by two hex digits representing the character's byte value. For example, a space becomes %20 and an ampersand becomes %26.",
  },
  {
    question: "What is the difference between component and full URL mode?",
    answer:
      "Component mode (encodeURIComponent) encodes all special characters including /, ?, &, and =. Full URL mode (encodeURI) preserves URL structure characters like ://, /, ?, #, and & while encoding everything else. Use component mode for query parameter values and full URL mode for complete URLs.",
  },
  {
    question: "Can I decode a URL-encoded string?",
    answer:
      "Yes — the tool is bidirectional. Paste a percent-encoded string in the right panel and the decoded text appears instantly in the left panel.",
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
    question: "Why do URLs need encoding?",
    answer:
      "URLs can only contain a limited set of ASCII characters. Characters like spaces, quotes, angle brackets, and non-ASCII characters must be percent-encoded to be safely included in a URL without breaking its structure or being misinterpreted by servers and browsers.",
  },
];

export default function UrlEncodePage() {
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

      <Header currentSlug="/url-encode-decode" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free URL Encode / Decode
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Encode and decode URLs with percent-encoding instantly.
            Runs in your browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <UrlEncodeTool />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">Component vs Full URL</h3>
            <p>
              Toggle between component mode (encodes everything including /, ?, &) and
              full URL mode (preserves URL structure characters). Component mode is the
              default and safest choice for encoding query parameter values.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">Percent Encoding</h3>
            <p>
              Unsafe characters are replaced with a % sign followed by their hex byte
              values. Spaces become %20, ampersands become %26, and non-ASCII characters
              are encoded as multi-byte UTF-8 sequences.
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
              How to URL Encode and Decode Text
            </h2>
            <p className="leading-relaxed">
              Type or paste text in the left panel and the URL-encoded output appears
              instantly on the right. To decode, paste a percent-encoded string in the
              right panel and the original text appears on the left. Use the &quot;Full URL
              mode&quot; checkbox to switch between encoding a URL component (default) and
              encoding a complete URL while preserving its structure.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              When to Use URL Encoding
            </h2>
            <p className="leading-relaxed">
              URL encoding is essential whenever you include user input, special
              characters, or non-ASCII text in a URL. Common use cases include building
              query strings for API requests, encoding form data for HTTP POST bodies,
              constructing redirect URLs with parameters, and safely embedding file paths
              or search terms in URLs. Without proper encoding, characters like &amp;, =,
              and spaces can break URL parsing.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/url-encode-decode" />

      <Footer />
    </div>
  );
}
