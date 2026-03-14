import type { Metadata } from "next";
import MorseCodeTool from "@/components/MorseCodeTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free Morse Code Translator Online — json2xml.com",
  description:
    "Encode text to Morse code or decode Morse to text instantly. Bidirectional conversion with a full reference chart. Free, private — your data never leaves your machine.",
  keywords: [
    "morse code translator",
    "morse code",
    "text to morse",
    "morse to text",
    "morse code converter",
    "morse code decoder",
    "morse code encoder",
    "morse translator",
    "morse code online",
    "translate morse code",
    "morse code tool",
    "morse code free",
  ],
  alternates: {
    canonical: "https://json2xml.com/morse-code-translator",
  },
  openGraph: {
    title: "Free Morse Code Translator Online — json2xml.com",
    description:
      "Encode text to Morse code or decode Morse to text instantly. Free, private, no sign-up required.",
    url: "https://json2xml.com/morse-code-translator",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Morse Code Translator — json2xml.com",
  url: "https://json2xml.com/morse-code-translator",
  description:
    "Free online Morse code translator. Encode text to Morse code or decode Morse to text instantly. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "How does the Morse code translator work?", answer: "Type text to encode it into Morse code (dots and dashes), or type dots and dashes to decode them back to text. The conversion happens instantly as you type." },
  { question: "What characters are supported?", answer: "The translator supports letters A–Z, digits 0–9, and common punctuation marks including period, comma, question mark, exclamation mark, and more." },
  { question: "How are words separated in Morse code?", answer: "In Morse code, letters are separated by spaces and words are separated by a forward slash (/) or three spaces. The translator handles both conventions." },
  { question: "Is this tool free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All translation happens locally in your browser using JavaScript. Nothing is uploaded to any server. It's safe to use with any data." },
  { question: "Does it include a reference chart?", answer: "Yes — an expandable Morse code reference chart shows the dot-dash pattern for every supported character, including letters, numbers, and punctuation." },
];

const faqItems: FaqItem[] = [
  {
    question: "How does the Morse code translator work?",
    answer:
      "Type text to encode it into Morse code (dots and dashes), or type dots and dashes to decode them back to text. The conversion happens instantly as you type.",
  },
  {
    question: "What characters are supported?",
    answer:
      "The translator supports letters A–Z, digits 0–9, and common punctuation marks including period, comma, question mark, exclamation mark, and more.",
  },
  {
    question: "How are words separated in Morse code?",
    answer:
      "In Morse code, letters are separated by spaces and words are separated by a forward slash (/) or three spaces. The translator handles both conventions.",
  },
  {
    question: "Is this tool free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All translation happens locally in your browser using JavaScript. Nothing is uploaded to any server. It's safe to use with any data.",
  },
  {
    question: "Does it include a reference chart?",
    answer:
      "Yes — an expandable Morse code reference chart shows the dot-dash pattern for every supported character, including letters, numbers, and punctuation.",
  },
];

export default function MorseCodeTranslatorPage() {
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

      <Header currentSlug="/morse-code-translator" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free Morse Code Translator
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Encode text to Morse code or decode Morse to text instantly. Bidirectional conversion
            with a full reference chart. Runs in your browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <MorseCodeTool />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔄 Bidirectional</h3>
            <p>
              Encode text to Morse code or decode Morse back to text. Both
              directions work instantly as you type.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">📖 Full Reference</h3>
            <p>
              An expandable reference chart shows the Morse code pattern for
              every supported letter, number, and punctuation mark.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">⚡ Instant</h3>
            <p>
              No waiting for a server round-trip. Morse code output appears
              instantly as you type your text.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Translate Morse Code
            </h2>
            <p className="leading-relaxed">
              To encode text, type your message in the text input and the Morse code output
              appears instantly. Each letter is represented by a unique combination of dots
              (.) and dashes (-). Letters are separated by spaces and words by a forward
              slash (/). To decode Morse, enter dots and dashes in the Morse input and the
              translated text appears automatically.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Morse Code Reference
            </h2>
            <p className="leading-relaxed">
              Morse code was developed in the 1830s by Samuel Morse for use with the
              telegraph. Each character is represented by a unique sequence of short signals
              (dots) and long signals (dashes). For example, SOS is{" "}
              <code className="text-slate-300">... --- ...</code>. The International Morse
              Code standard covers the Latin alphabet (A–Z), digits (0–9), and common
              punctuation marks. The reference chart built into this tool shows every
              supported character.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/morse-code-translator" />

      <Footer />
    </div>
  );
}
