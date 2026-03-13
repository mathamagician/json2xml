import type { Metadata } from "next";
import FormatterTool from "@/components/FormatterTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";

export const metadata: Metadata = {
  title: "Free XML Formatter & Beautifier Online — json2xml.com",
  description:
    "Format, beautify, or minify XML instantly in your browser. Configurable indentation (2 spaces, 4 spaces, tabs). Free, private — your data never leaves your machine.",
  keywords: [
    "xml formatter",
    "xml beautifier",
    "xml pretty print",
    "format xml online",
    "xml formatter online",
    "pretty print xml",
    "xml beautify",
    "xml minifier",
    "minify xml",
    "xml format tool",
    "xml indent",
    "xml viewer",
  ],
  alternates: {
    canonical: "https://json2xml.com/xml-formatter",
  },
  openGraph: {
    title: "Free XML Formatter & Beautifier Online — json2xml.com",
    description:
      "Format, beautify, or minify XML instantly in your browser. Configurable indentation. Free, private, no sign-up required.",
    url: "https://json2xml.com/xml-formatter",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "XML Formatter — json2xml.com",
  url: "https://json2xml.com/xml-formatter",
  description:
    "Free online XML formatter and beautifier. Pretty-print or minify XML instantly in your browser. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqItems: FaqItem[] = [
  {
    question: "What does an XML formatter do?",
    answer:
      "An XML formatter takes raw or minified XML and adds consistent indentation and line breaks so it's easy to read. It can also minify formatted XML by removing all unnecessary whitespace.",
  },
  {
    question: "Is this XML formatter free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All formatting happens locally in your browser using JavaScript. Your XML is never uploaded to any server. It's safe to use with sensitive or proprietary data.",
  },
  {
    question: "Does it preserve XML attributes?",
    answer:
      "Yes — all attributes, namespaces, and comments are preserved during formatting and minification. The structure of your XML is never altered.",
  },
  {
    question: "What indentation options are available?",
    answer:
      "You can choose between 2 spaces, 4 spaces, or tabs. The default is 2 spaces.",
  },
  {
    question: "What's the difference between format and minify?",
    answer:
      "Formatting adds indentation and line breaks for readability. Minifying removes all unnecessary whitespace to produce the smallest possible output — useful for SOAP messages, config files, or reducing payload size.",
  },
  {
    question: "Does it validate my XML?",
    answer: (
      <>
        The formatter will show an error if your XML is malformed, but for detailed validation
        with line numbers, use the{" "}
        <a href="/xml-validator" className="text-brand-400 hover:underline">XML Validator</a>.
      </>
    ),
  },
  {
    question: "Can I also convert XML to JSON?",
    answer: (
      <>
        Yes — use the{" "}
        <a href="/xml-to-json" className="text-brand-400 hover:underline">XML to JSON converter</a>{" "}
        to transform your XML into JSON format.
      </>
    ),
  },
];

export default function XmlFormatter() {
  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header currentSlug="/xml-formatter" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free XML Formatter &amp; Beautifier
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Pretty-print or minify XML with configurable indentation. Runs instantly in your
            browser —{" "}
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
            <h3 className="text-slate-200 font-semibold mb-2">⚡ Instant</h3>
            <p>
              No waiting for a server round-trip. Results appear as you type or the
              moment you drop a file.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🎛️ Configurable</h3>
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
              How to Format XML Online
            </h2>
            <p className="leading-relaxed">
              Paste your XML into the left panel and the formatted output appears instantly on the right.
              Use the indent selector to choose 2 spaces, 4 spaces, or tabs. Click the Minify button to
              strip all whitespace for compact output. You can also drag and drop
              an <code className="text-slate-300">.xml</code> file or use the upload button.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              When to Format or Minify XML
            </h2>
            <p className="leading-relaxed">
              Pretty-printing XML makes it easier to read and debug — essential when working with
              SOAP responses, Maven POM files, Spring configuration, or RSS feeds. Minifying removes
              all whitespace to reduce file size, which is useful for SOAP requests, embedded XML
              in databases, or reducing network payload in API integrations.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/xml-formatter" />

      <Footer />
    </div>
  );
}
