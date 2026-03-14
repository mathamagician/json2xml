import type { Metadata } from "next";
import SqlFormatterTool from "@/components/SqlFormatterTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free SQL Formatter Online — json2xml.com",
  description:
    "Format and beautify SQL queries with configurable indentation and dialect support. Free, private — your data never leaves your machine.",
  keywords: [
    "sql formatter",
    "sql format",
    "format sql",
    "sql beautifier",
    "sql pretty print",
    "sql formatter online",
    "sql beautify",
    "sql indent",
    "sql formatter tool",
    "format sql online",
    "sql formatting",
    "sql cleanup",
  ],
  alternates: {
    canonical: "https://json2xml.com/sql-formatter",
  },
  openGraph: {
    title: "Free SQL Formatter Online — json2xml.com",
    description:
      "Format and beautify SQL queries with configurable indentation and dialect support. Free, private, no sign-up required.",
    url: "https://json2xml.com/sql-formatter",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "SQL Formatter — json2xml.com",
  url: "https://json2xml.com/sql-formatter",
  description:
    "Free online SQL formatter. Format and beautify SQL queries with configurable indentation and dialect support. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What SQL dialects are supported?", answer: "The formatter supports Standard SQL, MySQL, PostgreSQL, SQL Server (T-SQL), and SQLite. Select your dialect from the dropdown to get dialect-specific formatting." },
  { question: "Can I uppercase keywords?", answer: "Yes — use the toggle button to convert all SQL keywords (SELECT, FROM, WHERE, etc.) to uppercase for consistent, readable queries." },
  { question: "Can I choose indentation?", answer: "Yes — choose between 2 spaces, 4 spaces, or tab indentation to match your team's coding style." },
  { question: "Is this formatter free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All formatting happens locally in your browser using JavaScript. Your SQL is never uploaded to any server. It's safe to use with sensitive or proprietary queries." },
  { question: "Does it validate SQL?", answer: "No — this tool formats SQL for readability only. It does not check for syntax errors or validate your queries. For syntax checking, use a dedicated SQL validator." },
];

const faqItems: FaqItem[] = [
  {
    question: "What SQL dialects are supported?",
    answer:
      "The formatter supports Standard SQL, MySQL, PostgreSQL, SQL Server (T-SQL), and SQLite. Select your dialect from the dropdown to get dialect-specific formatting.",
  },
  {
    question: "Can I uppercase keywords?",
    answer:
      "Yes — use the toggle button to convert all SQL keywords (SELECT, FROM, WHERE, etc.) to uppercase for consistent, readable queries.",
  },
  {
    question: "Can I choose indentation?",
    answer:
      "Yes — choose between 2 spaces, 4 spaces, or tab indentation to match your team's coding style.",
  },
  {
    question: "Is this formatter free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All formatting happens locally in your browser using JavaScript. Your SQL is never uploaded to any server. It's safe to use with sensitive or proprietary queries.",
  },
  {
    question: "Does it validate SQL?",
    answer:
      "No — this tool formats SQL for readability only. It does not check for syntax errors or validate your queries. For syntax checking, use a dedicated SQL validator.",
  },
];

export default function SqlFormatterPage() {
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

      <Header currentSlug="/sql-formatter" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free SQL Formatter
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Format and beautify SQL queries with configurable indentation and dialect support. Runs in your
            browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <SqlFormatterTool />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔒 100% Private</h3>
            <p>
              All formatting happens in your browser using JavaScript. Nothing is
              uploaded to any server. Safe for sensitive business queries.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🗄️ Multiple Dialects</h3>
            <p>
              Supports Standard SQL, MySQL, PostgreSQL, SQL Server, and SQLite.
              Choose your dialect for accurate formatting.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔠 Uppercase Keywords</h3>
            <p>
              Optionally convert all SQL keywords to uppercase for consistent,
              professional-looking queries.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Format SQL Online
            </h2>
            <p className="leading-relaxed">
              Paste your SQL query into the input panel and click Format. The formatter applies consistent
              indentation, line breaks, and keyword casing to make your query readable. Choose your SQL
              dialect, indentation style, and whether to uppercase keywords. Copy the formatted result or
              download it as a <code className="text-slate-300">.sql</code> file.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Supported SQL Dialects
            </h2>
            <p className="leading-relaxed">
              The formatter supports Standard SQL, MySQL, PostgreSQL, SQL Server (T-SQL), and SQLite.
              Each dialect has its own keyword set and formatting conventions. Selecting the correct dialect
              ensures that dialect-specific syntax like backticks (MySQL), square brackets (SQL Server), or
              double-quoted identifiers (PostgreSQL) is handled properly.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/sql-formatter" />

      <Footer />
    </div>
  );
}
