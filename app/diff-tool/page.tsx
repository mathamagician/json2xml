import type { Metadata } from "next";
import DiffTool from "@/components/DiffTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free Diff Tool Online — json2xml.com",
  description:
    "Compare two text inputs and see the differences highlighted line by line. Color-coded additions and removals with line numbers. Free, private — your data never leaves your machine.",
  keywords: [
    "diff tool",
    "text diff",
    "compare text",
    "diff checker",
    "text compare",
    "online diff",
    "diff tool online",
    "text difference",
    "compare files",
    "diff checker online",
    "side by side diff",
    "text diff tool",
  ],
  alternates: {
    canonical: "https://json2xml.com/diff-tool",
  },
  openGraph: {
    title: "Free Diff Tool Online — json2xml.com",
    description:
      "Compare two text inputs and see the differences highlighted line by line. Free, private, no sign-up required.",
    url: "https://json2xml.com/diff-tool",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Diff Tool — json2xml.com",
  url: "https://json2xml.com/diff-tool",
  description:
    "Free online diff tool. Compare two text inputs and see differences highlighted line by line. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "How does the diff tool work?", answer: "The tool uses a longest common subsequence (LCS) algorithm to compare two text inputs line by line. Differences are highlighted with colors — green for added lines and red for removed lines." },
  { question: "Does it show additions and removals?", answer: "Yes — added lines are highlighted in green and removed lines in red, making it easy to see exactly what changed between the two texts." },
  { question: "Can I compare files?", answer: "Yes — paste the contents of any two files into the left and right panels to compare them. The tool works with any plain text content." },
  { question: "Is this tool free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All comparison happens locally in your browser using JavaScript. Nothing is uploaded to any server. It's safe to use with sensitive or proprietary data." },
  { question: "Does it work with code?", answer: "Yes — the diff tool works with any text, including source code in any programming language. Line numbers help you locate changes quickly." },
];

const faqItems: FaqItem[] = [
  {
    question: "How does the diff tool work?",
    answer:
      "The tool uses a longest common subsequence (LCS) algorithm to compare two text inputs line by line. Differences are highlighted with colors — green for added lines and red for removed lines.",
  },
  {
    question: "Does it show additions and removals?",
    answer:
      "Yes — added lines are highlighted in green and removed lines in red, making it easy to see exactly what changed between the two texts.",
  },
  {
    question: "Can I compare files?",
    answer:
      "Yes — paste the contents of any two files into the left and right panels to compare them. The tool works with any plain text content.",
  },
  {
    question: "Is this tool free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All comparison happens locally in your browser using JavaScript. Nothing is uploaded to any server. It's safe to use with sensitive or proprietary data.",
  },
  {
    question: "Does it work with code?",
    answer:
      "Yes — the diff tool works with any text, including source code in any programming language. Line numbers help you locate changes quickly.",
  },
];

export default function DiffToolPage() {
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

      <Header currentSlug="/diff-tool" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free Diff Tool
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Compare two text inputs and see the differences highlighted line by line.
            Runs in your browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <DiffTool />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">📝 Line-level Diff</h3>
            <p>
              Compares text line by line using a longest common subsequence
              algorithm. See exactly which lines were added, removed, or unchanged.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🎨 Color Highlighting</h3>
            <p>
              Added lines are highlighted in green and removed lines in red,
              making differences instantly visible at a glance.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔢 Line Numbers</h3>
            <p>
              Line numbers are displayed alongside the diff output so you can
              quickly locate changes in large texts or code files.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Compare Text Online
            </h2>
            <p className="leading-relaxed">
              Paste your original text in the left panel and the modified text in the right
              panel. The diff output instantly highlights the differences — green for lines
              that were added and red for lines that were removed. Line numbers help you
              pinpoint the exact location of each change.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Understanding Diff Output
            </h2>
            <p className="leading-relaxed">
              A diff (short for difference) compares two texts and shows what changed
              between them. Lines prefixed with a plus sign (+) are additions — they exist
              in the new text but not the original. Lines prefixed with a minus sign (-)
              are removals — they existed in the original but not the new text. Unchanged
              lines provide context around the changes.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/diff-tool" />

      <Footer />
    </div>
  );
}
