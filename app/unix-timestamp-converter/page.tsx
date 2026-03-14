import type { Metadata } from "next";
import TimestampConverter from "@/components/TimestampConverter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free Unix Timestamp Converter Online — json2xml.com",
  description:
    "Convert between Unix timestamps and human-readable dates instantly in your browser. Supports seconds and milliseconds. Free, private — your data never leaves your machine.",
  keywords: [
    "unix timestamp converter",
    "epoch converter",
    "timestamp to date",
    "date to timestamp",
    "unix time",
    "epoch time",
    "unix timestamp",
    "timestamp converter online",
    "unix to date",
    "epoch to date",
    "timestamp calculator",
    "unix timestamp tool",
  ],
  alternates: {
    canonical: "https://json2xml.com/unix-timestamp-converter",
  },
  openGraph: {
    title: "Free Unix Timestamp Converter Online — json2xml.com",
    description:
      "Convert between Unix timestamps and human-readable dates instantly in your browser. Free, private, no sign-up required.",
    url: "https://json2xml.com/unix-timestamp-converter",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Unix Timestamp Converter — json2xml.com",
  url: "https://json2xml.com/unix-timestamp-converter",
  description:
    "Free online Unix timestamp converter. Convert between Unix timestamps and human-readable dates. Supports seconds and milliseconds. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What is a Unix timestamp?", answer: "A Unix timestamp is the number of seconds that have elapsed since January 1, 1970 00:00:00 UTC (the Unix epoch). It is widely used in programming and databases to represent points in time." },
  { question: "Does it support milliseconds?", answer: "Yes — you can toggle between seconds and milliseconds precision. Millisecond timestamps (13 digits) are common in JavaScript and many APIs." },
  { question: "Can I convert dates to timestamps?", answer: "Yes — the converter is bidirectional. Enter a Unix timestamp to see the date, or enter a date to get the timestamp." },
  { question: "Is this tool free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All conversion happens locally in your browser using JavaScript. Nothing is uploaded to any server. It's safe to use with any data." },
  { question: "What timezone is used?", answer: "The converter shows both your local timezone and UTC. You can see the exact date and time in both formats." },
];

const faqItems: FaqItem[] = [
  {
    question: "What is a Unix timestamp?",
    answer:
      "A Unix timestamp is the number of seconds that have elapsed since January 1, 1970 00:00:00 UTC (the Unix epoch). It is widely used in programming and databases to represent points in time.",
  },
  {
    question: "Does it support milliseconds?",
    answer:
      "Yes — you can toggle between seconds and milliseconds precision. Millisecond timestamps (13 digits) are common in JavaScript and many APIs.",
  },
  {
    question: "Can I convert dates to timestamps?",
    answer:
      "Yes — the converter is bidirectional. Enter a Unix timestamp to see the date, or enter a date to get the timestamp.",
  },
  {
    question: "Is this tool free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All conversion happens locally in your browser using JavaScript. Nothing is uploaded to any server. It's safe to use with any data.",
  },
  {
    question: "What timezone is used?",
    answer:
      "The converter shows both your local timezone and UTC. You can see the exact date and time in both formats.",
  },
];

export default function UnixTimestampConverterPage() {
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

      <Header currentSlug="/unix-timestamp-converter" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free Unix Timestamp Converter
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Convert between Unix timestamps and human-readable dates. Supports seconds and milliseconds.
            Runs in your browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <TimestampConverter />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔄 Bidirectional</h3>
            <p>
              Convert timestamps to dates or dates to timestamps. Both
              directions work instantly as you type.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">⏱️ Seconds & Milliseconds</h3>
            <p>
              Toggle between seconds (10-digit) and milliseconds (13-digit)
              timestamps. Works with both formats used in APIs and databases.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🕐 Relative Time</h3>
            <p>
              See how long ago or in the future a timestamp is, displayed in a
              human-friendly relative format.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Convert Unix Timestamps
            </h2>
            <p className="leading-relaxed">
              Enter a Unix timestamp (seconds or milliseconds since the epoch) and the
              converter instantly displays the corresponding human-readable date and time
              in both your local timezone and UTC. You can also enter a date to get the
              Unix timestamp. Toggle between seconds and milliseconds precision as needed.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Understanding Unix Time
            </h2>
            <p className="leading-relaxed">
              Unix time (also called epoch time or POSIX time) counts the number of seconds
              since January 1, 1970 00:00:00 UTC. It is timezone-independent, making it
              ideal for storing and comparing timestamps across systems. JavaScript uses
              millisecond precision (13 digits), while most Unix systems and databases use
              second precision (10 digits).
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/unix-timestamp-converter" />

      <Footer />
    </div>
  );
}
