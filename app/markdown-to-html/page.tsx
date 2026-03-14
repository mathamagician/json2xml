import type { Metadata } from "next";
import SimpleConverter from "@/components/SimpleConverter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free Markdown to HTML Converter Online — json2xml.com",
  description:
    "Convert Markdown to HTML instantly in your browser. Supports headings, lists, code blocks, tables, and more. Free, private — your data never leaves your machine.",
  keywords: [
    "markdown to html",
    "markdown to html converter",
    "convert markdown to html",
    "md to html",
    "markdown html",
    "markdown converter",
    "markdown to html online",
    "md to html converter",
    "markdown to html tool",
    "markdown to html free",
    "convert md to html",
    "markdown renderer",
  ],
  alternates: {
    canonical: "https://json2xml.com/markdown-to-html",
  },
  openGraph: {
    title: "Free Markdown to HTML Converter Online — json2xml.com",
    description:
      "Convert Markdown to HTML instantly in your browser. Free, private, no sign-up required.",
    url: "https://json2xml.com/markdown-to-html",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Markdown to HTML Converter — json2xml.com",
  url: "https://json2xml.com/markdown-to-html",
  description:
    "Free online Markdown to HTML converter. Convert Markdown syntax to clean HTML instantly in your browser. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What Markdown features are supported?", answer: "The converter supports headings, paragraphs, bold and italic text, links, images, ordered and unordered lists, code blocks (fenced and indented), inline code, blockquotes, horizontal rules, and tables." },
  { question: "Does it support GitHub Flavored Markdown (GFM)?", answer: "Yes — the converter supports GFM extensions including tables, task lists, strikethrough, and fenced code blocks with syntax highlighting hints." },
  { question: "Can I convert HTML back to Markdown?", answer: "Yes — use the HTML to Markdown converter at json2xml.com/html-to-markdown to convert HTML back to clean Markdown." },
  { question: "Is this converter free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All conversion happens locally in your browser using JavaScript. Your Markdown is never uploaded to any server. It's safe to use with sensitive or proprietary data." },
  { question: "Can I use it for documentation?", answer: "Yes — this tool is perfect for converting Markdown documentation, README files, or blog posts into HTML for embedding in websites, emails, or CMS platforms." },
];

const faqItems: FaqItem[] = [
  {
    question: "What Markdown features are supported?",
    answer:
      "The converter supports headings, paragraphs, bold and italic text, links, images, ordered and unordered lists, code blocks (fenced and indented), inline code, blockquotes, horizontal rules, and tables.",
  },
  {
    question: "Does it support GitHub Flavored Markdown (GFM)?",
    answer:
      "Yes — the converter supports GFM extensions including tables, task lists, strikethrough, and fenced code blocks with syntax highlighting hints.",
  },
  {
    question: "Can I convert HTML back to Markdown?",
    answer: (
      <>
        Yes — use the{" "}
        <a href="/html-to-markdown" className="text-brand-400 hover:underline">HTML to Markdown converter</a>{" "}
        to convert HTML back to clean Markdown.
      </>
    ),
  },
  {
    question: "Is this converter free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All conversion happens locally in your browser using JavaScript. Your Markdown is never uploaded to any server. It's safe to use with sensitive or proprietary data.",
  },
  {
    question: "Can I use it for documentation?",
    answer:
      "Yes — this tool is perfect for converting Markdown documentation, README files, or blog posts into HTML for embedding in websites, emails, or CMS platforms.",
  },
];

export default function MarkdownToHtml() {
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

      <Header currentSlug="/markdown-to-html" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free Markdown to HTML Converter
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Convert Markdown to HTML instantly. Supports headings, lists, code blocks, tables, and more. Runs in your
            browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <SimpleConverter conversion="markdown-to-html" />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔒 100% Private</h3>
            <p>
              All conversion happens in your browser using JavaScript. Nothing is
              uploaded to any server. Safe for sensitive content.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">📝 Full Markdown Support</h3>
            <p>
              Supports headings, lists, code blocks, tables, links, images, emphasis,
              blockquotes, and GitHub Flavored Markdown extensions.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">👁️ Instant Preview</h3>
            <p>
              HTML output appears as you type. See the generated markup immediately
              with no delay or server round-trip.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Convert Markdown to HTML
            </h2>
            <p className="leading-relaxed">
              Paste your Markdown into the left panel and the HTML output appears instantly on the right.
              All standard Markdown syntax is supported including headings, lists, links, images, code blocks,
              and tables. You can also drag and drop a <code className="text-slate-300">.md</code> file or
              use the upload button. Download the result as an <code className="text-slate-300">.html</code> file.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Markdown Syntax Support
            </h2>
            <p className="leading-relaxed">
              This converter handles the full CommonMark specification plus GitHub Flavored Markdown (GFM)
              extensions. That includes fenced code blocks with language hints, tables with alignment,
              task lists, strikethrough text, and autolinks. Perfect for converting README files,
              documentation, blog posts, or any Markdown content into clean, semantic HTML.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/markdown-to-html" />

      <Footer />
    </div>
  );
}
