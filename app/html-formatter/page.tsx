import type { Metadata } from "next";
import HtmlFormatterTool from "@/components/HtmlFormatterTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free HTML Formatter / Beautifier Online — json2xml.com",
  description:
    "Pretty-print or minify HTML with configurable indentation. Free, private, runs entirely in your browser.",
  keywords: [
    "html formatter",
    "html beautifier",
    "html pretty print",
    "format html",
    "html beautify",
    "html minifier",
    "html minify",
    "html indent",
    "html formatter online",
    "beautify html",
    "html tidy",
    "format html online",
  ],
  alternates: {
    canonical: "https://json2xml.com/html-formatter",
  },
  openGraph: {
    title: "Free HTML Formatter / Beautifier Online — json2xml.com",
    description:
      "Pretty-print or minify HTML with configurable indentation. Free, private, no sign-up required.",
    url: "https://json2xml.com/html-formatter",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "HTML Formatter — json2xml.com",
  url: "https://json2xml.com/html-formatter",
  description:
    "Free online HTML formatter and beautifier. Pretty-print or minify HTML with configurable indentation. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What does this HTML formatter do?", answer: "It takes unformatted or minified HTML and adds proper indentation and line breaks so the markup is easy to read. You can also switch to minify mode to remove all whitespace and reduce file size." },
  { question: "Can I choose the indentation size?", answer: "Yes — you can choose between 2 spaces, 4 spaces, or tab-based indentation. The default is 2 spaces." },
  { question: "Does it fix broken HTML?", answer: "No — this tool formats the structure of valid HTML. It does not fix missing closing tags, invalid nesting, or syntax errors. For that, use a dedicated HTML validator." },
  { question: "Can I upload an HTML file?", answer: "Yes — you can drag and drop an HTML file onto the input area or click the Upload File button. The formatted output can be downloaded as a file." },
  { question: "Is my HTML sent to a server?", answer: "No — all formatting happens locally in your browser using JavaScript. Your HTML is never uploaded or stored anywhere. It's safe to use with proprietary or sensitive markup." },
  { question: "What is HTML minification?", answer: "Minification removes unnecessary whitespace, line breaks, and indentation from HTML to reduce file size. This is useful for production deployment where smaller file sizes improve page load times." },
];

const faqItems: FaqItem[] = [
  {
    question: "What does this HTML formatter do?",
    answer:
      "It takes unformatted or minified HTML and adds proper indentation and line breaks so the markup is easy to read. You can also switch to minify mode to remove all whitespace and reduce file size.",
  },
  {
    question: "Can I choose the indentation size?",
    answer:
      "Yes — you can choose between 2 spaces, 4 spaces, or tab-based indentation. The default is 2 spaces.",
  },
  {
    question: "Does it fix broken HTML?",
    answer:
      "No — this tool formats the structure of valid HTML. It does not fix missing closing tags, invalid nesting, or syntax errors. For that, use a dedicated HTML validator.",
  },
  {
    question: "Can I upload an HTML file?",
    answer:
      "Yes — you can drag and drop an HTML file onto the input area or click the Upload File button. The formatted output can be downloaded as a file.",
  },
  {
    question: "Is my HTML sent to a server?",
    answer:
      "No — all formatting happens locally in your browser using JavaScript. Your HTML is never uploaded or stored anywhere. It's safe to use with proprietary or sensitive markup.",
  },
  {
    question: "What is HTML minification?",
    answer:
      "Minification removes unnecessary whitespace, line breaks, and indentation from HTML to reduce file size. This is useful for production deployment where smaller file sizes improve page load times.",
  },
];

export default function HtmlFormatterPage() {
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

      <Header currentSlug="/html-formatter" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free HTML Formatter / Beautifier
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Pretty-print or minify HTML with configurable indentation.
            Runs in your browser —{" "}
            <strong className="text-slate-300">your code never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <HtmlFormatterTool />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">✨ Pretty Print & Minify</h3>
            <p>
              Switch between beautified output with proper indentation and minified
              output with all whitespace removed. One click to toggle modes.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">📐 Configurable Indent</h3>
            <p>
              Choose 2 spaces, 4 spaces, or tab-based indentation. The formatter
              respects void elements and handles nested tags correctly.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">📁 File Upload</h3>
            <p>
              Drag and drop HTML files or use the upload button. Download
              the formatted result as a file with one click.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Format HTML
            </h2>
            <p className="leading-relaxed">
              Paste your HTML into the input panel and the formatted output appears instantly on the
              right. Use the Format/Minify toggle to switch between pretty-printed and compressed
              output. Choose your preferred indentation size from the dropdown. You can also drag and
              drop an HTML file, then download the formatted result.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Why Format HTML
            </h2>
            <p className="leading-relaxed">
              Well-formatted HTML is easier to read, debug, and maintain. Proper indentation makes
              the document structure visible at a glance — you can quickly identify nesting errors,
              unclosed tags, and structural issues. For production, minified HTML reduces file size
              and improves page load performance by removing unnecessary whitespace and line breaks.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/html-formatter" />

      <Footer />
    </div>
  );
}
