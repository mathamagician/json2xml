import type { Metadata } from "next";
import GeneratorTool from "@/components/GeneratorTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free Lorem Ipsum Generator Online — json2xml.com",
  description:
    "Generate lorem ipsum placeholder text instantly in your browser. Choose paragraphs, sentences, or words. Free, private — nothing is sent to any server.",
  keywords: [
    "lorem ipsum generator",
    "lorem ipsum",
    "placeholder text",
    "dummy text",
    "lorem ipsum online",
    "generate lorem ipsum",
    "lorem ipsum text",
    "lipsum generator",
    "random text generator",
    "filler text",
    "sample text",
    "lorem ipsum free",
  ],
  alternates: {
    canonical: "https://json2xml.com/lorem-ipsum-generator",
  },
  openGraph: {
    title: "Free Lorem Ipsum Generator Online — json2xml.com",
    description:
      "Generate lorem ipsum placeholder text instantly in your browser. Free, private, no sign-up required.",
    url: "https://json2xml.com/lorem-ipsum-generator",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Lorem Ipsum Generator — json2xml.com",
  url: "https://json2xml.com/lorem-ipsum-generator",
  description:
    "Free online lorem ipsum generator. Generate placeholder text by paragraphs, sentences, or words. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What is lorem ipsum?", answer: "Lorem ipsum is placeholder text commonly used in design and development to fill layouts before final content is available. It derives from a scrambled passage of Cicero's \"De Finibus Bonorum et Malorum\" written in 45 BC." },
  { question: "Can I choose the amount of text?", answer: "Yes — you can generate a specific number of paragraphs, sentences, or individual words depending on your needs." },
  { question: "Is the generated text random?", answer: "The text is semi-random. It draws from a pool of classical Latin words commonly used in traditional lorem ipsum text, shuffled into natural-looking sequences." },
  { question: "Is this generator free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "Nothing is sent to any server. All text is generated locally in your browser using JavaScript. There is no data to protect because nothing is uploaded." },
];

const faqItems: FaqItem[] = [
  {
    question: "What is lorem ipsum?",
    answer:
      "Lorem ipsum is placeholder text commonly used in design and development to fill layouts before final content is available. It derives from a scrambled passage of Cicero's \"De Finibus Bonorum et Malorum\" written in 45 BC.",
  },
  {
    question: "Can I choose the amount of text?",
    answer:
      "Yes — you can generate a specific number of paragraphs, sentences, or individual words depending on your needs.",
  },
  {
    question: "Is the generated text random?",
    answer:
      "The text is semi-random. It draws from a pool of classical Latin words commonly used in traditional lorem ipsum text, shuffled into natural-looking sequences.",
  },
  {
    question: "Is this generator free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Nothing is sent to any server. All text is generated locally in your browser using JavaScript. There is no data to protect because nothing is uploaded.",
  },
];

export default function LoremIpsumGenerator() {
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

      <Header currentSlug="/lorem-ipsum-generator" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free Lorem Ipsum Generator
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Generate lorem ipsum placeholder text. Choose paragraphs, sentences, or individual words.
            Runs in your browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <GeneratorTool type="lorem-ipsum" />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">📝 Multiple Modes</h3>
            <p>
              Generate text by paragraphs, sentences, or individual words — whatever
              fits your layout or design needs.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔢 Customizable Count</h3>
            <p>
              Choose exactly how many paragraphs, sentences, or words you need.
              Fine-tune the output to match your requirements.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">⚡ Instant</h3>
            <p>
              Text is generated instantly in your browser. No server round-trips,
              no waiting. Click and copy.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Generate Lorem Ipsum
            </h2>
            <p className="leading-relaxed">
              Select your preferred mode — paragraphs, sentences, or words — and set the count.
              Click generate and the placeholder text appears instantly. Copy it to your clipboard
              with one click, or adjust the count and regenerate as needed.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              When to Use Placeholder Text
            </h2>
            <p className="leading-relaxed">
              Lorem ipsum is the industry standard for placeholder text in web design, print
              layouts, mockups, and wireframes. It helps designers and developers visualize
              how content will look without being distracted by readable text. Use it in
              prototypes, presentations, or anywhere you need realistic-looking filler content.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/lorem-ipsum-generator" />

      <Footer />
    </div>
  );
}
