import type { Metadata } from "next";
import SimpleConverter from "@/components/SimpleConverter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free HTML to Markdown Converter Online — json2xml.com",
  description:
    "Convert HTML to clean Markdown instantly in your browser. Perfect for migrating content from websites to Markdown-based systems. Free, private — your data never leaves your machine.",
  keywords: [
    "html to markdown",
    "html to markdown converter",
    "convert html to markdown",
    "html to md",
    "html markdown",
    "html converter",
    "html to markdown online",
    "html to md converter",
    "html to markdown tool",
    "html to markdown free",
    "convert html to md",
    "html to markdown generator",
  ],
  alternates: {
    canonical: "https://json2xml.com/html-to-markdown",
  },
  openGraph: {
    title: "Free HTML to Markdown Converter Online — json2xml.com",
    description:
      "Convert HTML to clean Markdown instantly in your browser. Free, private, no sign-up required.",
    url: "https://json2xml.com/html-to-markdown",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "HTML to Markdown Converter — json2xml.com",
  url: "https://json2xml.com/html-to-markdown",
  description:
    "Free online HTML to Markdown converter. Convert HTML to clean Markdown syntax instantly in your browser. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What HTML elements are supported?", answer: "The converter handles headings (h1–h6), paragraphs, ordered and unordered lists, links, images, inline code, code blocks, tables, blockquotes, bold, italic, and strikethrough text." },
  { question: "Does it handle inline styles?", answer: "Inline styles are stripped during conversion. The converter preserves the semantic structure of the HTML (headings, lists, emphasis, etc.) while removing presentational styling." },
  { question: "Can I convert Markdown back to HTML?", answer: "Yes — use the Markdown to HTML converter at json2xml.com/markdown-to-html to convert Markdown back to HTML." },
  { question: "Is this converter free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All conversion happens locally in your browser using JavaScript. Your HTML is never uploaded to any server. It's safe to use with sensitive or proprietary data." },
  { question: "Does it preserve code blocks?", answer: "Yes — both inline code (wrapped in <code> tags) and block-level code (wrapped in <pre><code> tags) are converted to Markdown using backticks and fenced code blocks respectively." },
];

const faqItems: FaqItem[] = [
  {
    question: "What HTML elements are supported?",
    answer:
      "The converter handles headings (h1\u2013h6), paragraphs, ordered and unordered lists, links, images, inline code, code blocks, tables, blockquotes, bold, italic, and strikethrough text.",
  },
  {
    question: "Does it handle inline styles?",
    answer:
      "Inline styles are stripped during conversion. The converter preserves the semantic structure of the HTML (headings, lists, emphasis, etc.) while removing presentational styling.",
  },
  {
    question: "Can I convert Markdown back to HTML?",
    answer: (
      <>
        Yes — use the{" "}
        <a href="/markdown-to-html" className="text-brand-400 hover:underline">Markdown to HTML converter</a>{" "}
        to convert Markdown back to HTML.
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
      "All conversion happens locally in your browser using JavaScript. Your HTML is never uploaded to any server. It's safe to use with sensitive or proprietary data.",
  },
  {
    question: "Does it preserve code blocks?",
    answer: (
      <>
        Yes — both inline code (wrapped in <code className="text-slate-300">&lt;code&gt;</code> tags) and
        block-level code (wrapped in <code className="text-slate-300">&lt;pre&gt;&lt;code&gt;</code> tags)
        are converted to Markdown using backticks and fenced code blocks respectively.
      </>
    ),
  },
];

export default function HtmlToMarkdown() {
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

      <Header currentSlug="/html-to-markdown" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free HTML to Markdown Converter
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Convert HTML to clean Markdown instantly. Perfect for migrating content from websites to Markdown-based systems. Runs in your
            browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <SimpleConverter conversion="html-to-markdown" />
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
            <h3 className="text-slate-200 font-semibold mb-2">✨ Clean Output</h3>
            <p>
              Produces clean, readable Markdown with proper spacing. Inline styles and
              unnecessary markup are stripped automatically.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">📑 ATX Headings</h3>
            <p>
              HTML headings are converted to ATX-style Markdown headings using # symbols.
              Clean, standard formatting that works everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Convert HTML to Markdown
            </h2>
            <p className="leading-relaxed">
              Paste your HTML into the left panel and the Markdown output appears instantly on the right.
              All common HTML elements are converted to their Markdown equivalents. You can also drag and
              drop an <code className="text-slate-300">.html</code> file or use the upload button. Download
              the result as a <code className="text-slate-300">.md</code> file.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Common HTML to Markdown Use Cases
            </h2>
            <p className="leading-relaxed">
              Converting HTML to Markdown is useful when migrating website content to static site generators
              like Jekyll, Hugo, or Gatsby, moving blog posts to Markdown-based CMS platforms, creating
              documentation from existing web pages, or cleaning up HTML content for use in GitHub READMEs
              and wikis.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/html-to-markdown" />

      <Footer />
    </div>
  );
}
