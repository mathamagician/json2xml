import type { Metadata } from "next";
import Converter from "@/components/Converter";
import FileSizeCallout from "@/components/FileSizeCallout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free XML to JSON Converter Online — json2xml.com",
  description:
    "Convert XML to JSON instantly in your browser. Handles files up to 20 GB (Chrome/Edge) or 5 GB (other browsers). Free, private, no sign-up — your data never leaves your machine.",
  keywords: [
    "xml to json",
    "xml to json converter",
    "xml to json online",
    "convert xml to json",
    "free xml to json converter",
    "xml to json tool",
    "xml to json online free",
    "xml parser",
    "xml to json converter online free",
    "transform xml to json",
    "parse xml to json",
    "xml to json browser",
  ],
  alternates: {
    canonical: "https://json2xml.com/xml-to-json",
  },
  openGraph: {
    title: "Free XML to JSON Converter Online — json2xml.com",
    description:
      "Convert XML to JSON instantly in your browser. Handles files up to 20 GB (Chrome/Edge) or 5 GB (other browsers). Free, private, no sign-up required.",
    url: "https://json2xml.com/xml-to-json",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "XML to JSON Converter — json2xml.com",
  url: "https://json2xml.com/xml-to-json",
  description:
    "Free online tool to convert XML to JSON instantly in your browser. Handles files up to 20 GB (Chrome/Edge) or 5 GB (other browsers). No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "How do I convert XML to JSON?", answer: "Paste your XML into the input panel and the JSON output appears instantly — no button to click. You can also drag and drop an .xml file or use the upload button." },
  { question: "Is this XML to JSON converter free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits. If you find it useful, a coffee is appreciated but never required." },
  { question: "Is my XML data safe?", answer: "All conversion happens locally in your browser using JavaScript. Your XML is never uploaded to any server. It's safe to use with sensitive or proprietary data." },
  { question: "How are XML attributes handled?", answer: "XML attributes are preserved in the JSON output. By default, attributes are prefixed to distinguish them from child elements, keeping your data structure intact." },
  { question: "Can it handle large XML files?", answer: "Yes — the tool handles files up to 20 GB on Chrome/Edge (streams directly to disk, no memory limit) or 5 GB on other browsers. Large files are processed off the main thread using Web Workers, so the page stays fully responsive." },
  { question: "What about XML namespaces?", answer: "Namespace prefixes are preserved in the JSON keys. For example, <soap:Envelope> becomes a key like \"soap:Envelope\" in the output." },
  { question: "Can I convert JSON back to XML?", answer: "Yes — use the direction toggle to switch to JSON → XML mode, or visit the JSON to XML converter at json2xml.com. You can also use the Flip button to swap input and output in one click." },
];

const faqItems: FaqItem[] = [
  {
    question: "How do I convert XML to JSON?",
    answer:
      "Paste your XML into the input panel and the JSON output appears instantly — no button to click. You can also drag and drop an .xml file or use the upload button.",
  },
  {
    question: "Is this XML to JSON converter free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits. If you find it useful, a coffee is appreciated but never required.",
  },
  {
    question: "Is my XML data safe?",
    answer:
      "All conversion happens locally in your browser using JavaScript. Your XML is never uploaded to any server. It's safe to use with sensitive or proprietary data.",
  },
  {
    question: "How are XML attributes handled?",
    answer:
      "XML attributes are preserved in the JSON output. By default, attributes are prefixed to distinguish them from child elements, keeping your data structure intact.",
  },
  {
    question: "Can it handle large XML files?",
    answer:
      "Yes — the tool handles files up to 20 GB on Chrome/Edge (streams directly to disk, no memory limit) or 5 GB on other browsers. Large files are processed off the main thread using Web Workers, so the page stays fully responsive.",
  },
  {
    question: "What about XML namespaces?",
    answer:
      "Namespace prefixes are preserved in the JSON keys. For example, <soap:Envelope> becomes a key like \"soap:Envelope\" in the output.",
  },
  {
    question: "Can I convert JSON back to XML?",
    answer: (
      <>
        Yes — use the direction toggle to switch to JSON → XML mode, or visit the{" "}
        <a href="/" className="text-brand-400 hover:underline">JSON to XML converter</a>.
        You can also use the Flip button to swap input and output in one click.
      </>
    ),
  },
];

export default function XmlToJson() {
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

      <Header currentSlug="/xml-to-json" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free XML to JSON Converter
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Paste, upload, or drag &amp; drop XML files up to 20 GB (Chrome/Edge) or 5 GB. Converts instantly in your
            browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <Converter initialDirection="xml-to-json" />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔒 100% Private</h3>
            <p>
              All conversion happens in your browser using JavaScript. Nothing is
              uploaded to any server. Safe for sensitive business data.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">⚡ Instant</h3>
            <p>
              No waiting for a server round-trip. Results appear as you type or the
              moment you drop a file.
            </p>
          </div>
          <FileSizeCallout />
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Convert XML to JSON Online
            </h2>
            <p className="leading-relaxed">
              Paste your XML into the left panel and your JSON appears instantly on the right — no button
              to click, no waiting. You can also drag and drop an <code className="text-slate-300">.xml</code> file
              directly onto the input panel, or use the upload button to browse your files. Once converted,
              copy the JSON to your clipboard or download it as a <code className="text-slate-300">.json</code> file.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              When to Convert XML to JSON
            </h2>
            <p className="leading-relaxed">
              XML is still widely used in SOAP APIs, configuration files, RSS feeds, and enterprise integrations.
              Converting XML to JSON makes it easier to work with in JavaScript, Python, and modern REST APIs.
              Common use cases include migrating legacy API responses, parsing RSS/Atom feeds, processing
              SOAP web service output, and converting XML config files for use in modern tooling.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/xml-to-json" />

      <Footer />
    </div>
  );
}
