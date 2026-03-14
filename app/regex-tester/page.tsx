import type { Metadata } from "next";
import RegexTester from "@/components/RegexTester";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free Regex Tester Online — json2xml.com",
  description:
    "Test regular expressions with live highlighting of matches. Supports global, case-insensitive, multiline, and dotall flags. Free, private.",
  keywords: [
    "regex tester",
    "regex test",
    "regular expression tester",
    "regex checker",
    "regex online",
    "test regex",
    "regex matcher",
    "regex validator",
    "regex debugger",
    "regular expression test",
    "regex pattern tester",
    "regex tool",
  ],
  alternates: {
    canonical: "https://json2xml.com/regex-tester",
  },
  openGraph: {
    title: "Free Regex Tester Online — json2xml.com",
    description:
      "Test regular expressions with live highlighting of matches. Supports global, case-insensitive, multiline, and dotall flags. Free, private.",
    url: "https://json2xml.com/regex-tester",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Regex Tester — json2xml.com",
  url: "https://json2xml.com/regex-tester",
  description:
    "Free online regex tester. Test regular expressions with live highlighting, flag controls, and match details. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What regex flags are supported?", answer: "The tool supports four flags: g (global — find all matches), i (case-insensitive), m (multiline — ^ and $ match line boundaries), and s (dotall — . matches newlines). You can toggle them with the flag buttons or type them directly." },
  { question: "Does it support capture groups?", answer: "Yes — the tool supports both numbered and named capture groups. Named groups (using ?<name> syntax) are shown in the match details when present." },
  { question: "Is this JavaScript regex?", answer: "Yes — the tool uses JavaScript's built-in RegExp engine, so the syntax and behavior match what you'd get in any JavaScript or TypeScript environment. This includes features like lookahead, lookbehind, and Unicode property escapes." },
  { question: "Does it update in real time?", answer: "Yes — matches are highlighted and the match details table updates instantly as you type your pattern or test string. No button click needed." },
  { question: "Is this tool free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All regex testing happens locally in your browser using JavaScript. Nothing is uploaded to any server. It's safe to use with sensitive or proprietary data." },
];

const faqItems: FaqItem[] = [
  {
    question: "What regex flags are supported?",
    answer:
      "The tool supports four flags: g (global — find all matches), i (case-insensitive), m (multiline — ^ and $ match line boundaries), and s (dotall — . matches newlines). You can toggle them with the flag buttons or type them directly.",
  },
  {
    question: "Does it support capture groups?",
    answer:
      "Yes — the tool supports both numbered and named capture groups. Named groups (using ?<name> syntax) are shown in the match details when present.",
  },
  {
    question: "Is this JavaScript regex?",
    answer:
      "Yes — the tool uses JavaScript's built-in RegExp engine, so the syntax and behavior match what you'd get in any JavaScript or TypeScript environment. This includes features like lookahead, lookbehind, and Unicode property escapes.",
  },
  {
    question: "Does it update in real time?",
    answer:
      "Yes — matches are highlighted and the match details table updates instantly as you type your pattern or test string. No button click needed.",
  },
  {
    question: "Is this tool free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All regex testing happens locally in your browser using JavaScript. Nothing is uploaded to any server. It's safe to use with sensitive or proprietary data.",
  },
];

export default function RegexTesterPage() {
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

      <Header currentSlug="/regex-tester" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free Regex Tester
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Test regular expressions with live highlighting of matches. Supports
            global, case-insensitive, multiline, and dotall flags. Runs in your browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <RegexTester />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">⚡ Live Matching</h3>
            <p>
              Matches update instantly as you type your pattern or test string.
              No button click needed — see results in real time.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🎛️ Flag Controls</h3>
            <p>
              Toggle global, case-insensitive, multiline, and dotall flags with
              one click. Or type them directly in the flags field.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">📊 Match Details</h3>
            <p>
              See every match with its index position, length, and content in a
              clear table. Named capture groups are shown when present.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Test Regular Expressions
            </h2>
            <p className="leading-relaxed">
              Enter your regex pattern in the pattern field and your test string in the
              text area below. Matches are highlighted in real time as you type. Use the
              flag buttons to toggle global, case-insensitive, multiline, and dotall
              modes. The match details table shows the index, length, and content of
              every match.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Understanding Regex Flags
            </h2>
            <p className="leading-relaxed">
              Regex flags modify how the pattern is applied. The <strong className="text-slate-300">g</strong> (global)
              flag finds all matches instead of stopping at the first.
              The <strong className="text-slate-300">i</strong> flag makes the match case-insensitive.
              The <strong className="text-slate-300">m</strong> (multiline) flag
              makes <code className="text-slate-300">^</code> and <code className="text-slate-300">$</code> match
              the start and end of each line, not just the whole string.
              The <strong className="text-slate-300">s</strong> (dotall) flag
              makes <code className="text-slate-300">.</code> match newline characters as well.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/regex-tester" />

      <Footer />
    </div>
  );
}
