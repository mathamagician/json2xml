import type { Metadata } from "next";
import FormatterTool from "@/components/FormatterTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free XML Pretty Print Online — json2xml.com",
  description:
    "Pretty-print XML with configurable indentation (2 spaces, 4 spaces, tabs). Free, private — your data never leaves your machine. No sign-up required.",
  keywords: [
    "xml pretty print",
    "xml beautifier",
    "xml beautify",
    "pretty print xml",
    "xml pretty printer",
    "xml indenter",
    "xml format pretty",
    "beautify xml online",
    "pretty xml",
    "xml pretty print online",
    "format xml pretty",
    "xml indent tool",
  ],
  alternates: {
    canonical: "https://json2xml.com/xml-pretty-print",
  },
  openGraph: {
    title: "Free XML Pretty Print Online — json2xml.com",
    description:
      "Pretty-print XML with configurable indentation. Free, private, no sign-up required.",
    url: "https://json2xml.com/xml-pretty-print",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "XML Pretty Print — json2xml.com",
  url: "https://json2xml.com/xml-pretty-print",
  description:
    "Free online XML pretty printer. Format XML with configurable indentation instantly in your browser. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What is XML pretty printing?", answer: "XML pretty printing formats raw or minified XML by adding consistent indentation and line breaks, making it easy to read and understand the element hierarchy at a glance." },
  { question: "Can I choose the indentation?", answer: "Yes — you can choose between 2 spaces, 4 spaces, or tabs. The default is 2 spaces." },
  { question: "Is it the same as XML formatting?", answer: "Yes — pretty printing and formatting are the same thing. Both add indentation and line breaks to make XML readable. You can also use the XML Formatter at json2xml.com/xml-formatter." },
  { question: "Is it free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All formatting happens locally in your browser using JavaScript. Your XML is never uploaded to any server. It's safe to use with sensitive or proprietary data." },
  { question: "Can I minify instead?", answer: "Yes — use the XML Minifier at json2xml.com/xml-minifier to remove all whitespace and produce the smallest possible output." },
];

const faqItems: FaqItem[] = [
  {
    question: "What is XML pretty printing?",
    answer:
      "XML pretty printing formats raw or minified XML by adding consistent indentation and line breaks, making it easy to read and understand the element hierarchy at a glance.",
  },
  {
    question: "Can I choose the indentation?",
    answer:
      "Yes — you can choose between 2 spaces, 4 spaces, or tabs. The default is 2 spaces.",
  },
  {
    question: "Is it the same as XML formatting?",
    answer: (
      <>
        Yes — pretty printing and formatting are the same thing. Both add indentation and line
        breaks to make XML readable. You can also use the{" "}
        <a href="/xml-formatter" className="text-brand-400 hover:underline">XML Formatter</a>.
      </>
    ),
  },
  {
    question: "Is it free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All formatting happens locally in your browser using JavaScript. Your XML is never uploaded to any server. It's safe to use with sensitive or proprietary data.",
  },
  {
    question: "Can I minify instead?",
    answer: (
      <>
        Yes — use the{" "}
        <a href="/xml-minifier" className="text-brand-400 hover:underline">XML Minifier</a>{" "}
        to remove all whitespace and produce the smallest possible output.
      </>
    ),
  },
];

export default function XmlPrettyPrint() {
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

      <Header currentSlug="/xml-pretty-print" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free XML Pretty Print
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Pretty-print XML with configurable indentation. Choose 2 spaces, 4 spaces, or tabs. Runs
            instantly in your browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <FormatterTool format="xml" />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔒 100% Private</h3>
            <p>
              All formatting happens in your browser using JavaScript. Nothing is
              uploaded to any server. Safe for SOAP messages and config files.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">⚡ Instant Formatting</h3>
            <p>
              No waiting for a server round-trip. Results appear as you type or the
              moment you drop a file.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🎛️ Configurable Indentation</h3>
            <p>
              Choose 2 spaces, 4 spaces, or tabs for indentation. Toggle between
              pretty-print and minified output with one click.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Pretty Print XML Online
            </h2>
            <p className="leading-relaxed">
              Paste your XML into the left panel and the pretty-printed output appears instantly on the right.
              Use the indent selector to choose 2 spaces, 4 spaces, or tabs. Click the Minify button to
              strip all whitespace for compact output. You can also drag and drop
              an <code className="text-slate-300">.xml</code> file or use the upload button.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              When to Use XML Pretty Print
            </h2>
            <p className="leading-relaxed">
              Pretty-printing XML makes it easier to read and debug — essential when working with
              SOAP responses, Maven POM files, Spring configuration, RSS feeds, or SVG files.
              Readable XML helps teams review configuration changes, trace nested element
              hierarchies, and quickly identify mismatched tags or missing attributes.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/xml-pretty-print" />

      <Footer />
    </div>
  );
}
