import type { Metadata } from "next";
import CronParser from "@/components/CronParser";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free Cron Expression Parser Online — json2xml.com",
  description:
    "Parse cron expressions to human-readable schedules and see the next 5 run times. Free, private — your data never leaves your machine.",
  keywords: [
    "cron parser",
    "cron expression parser",
    "cron to human",
    "cron schedule",
    "cron expression",
    "parse cron",
    "cron expression explained",
    "cron job parser",
    "cron expression tester",
    "cron parser online",
    "crontab parser",
    "cron schedule parser",
  ],
  alternates: {
    canonical: "https://json2xml.com/cron-parser",
  },
  openGraph: {
    title: "Free Cron Expression Parser Online — json2xml.com",
    description:
      "Parse cron expressions to human-readable schedules and see the next 5 run times. Free, private, no sign-up required.",
    url: "https://json2xml.com/cron-parser",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Cron Expression Parser — json2xml.com",
  url: "https://json2xml.com/cron-parser",
  description:
    "Free online cron expression parser. Parse cron expressions to human-readable schedules and see the next 5 run times. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What cron format is supported?", answer: "The parser supports the standard 5-field cron format: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-6, where 0 is Sunday)." },
  { question: "Does it show next run times?", answer: "Yes — the parser calculates and displays the next 5 scheduled run times based on the cron expression you enter." },
  { question: "What about 6-field cron expressions?", answer: "Only the standard 5-field cron format is supported. 6-field formats (with seconds) and 7-field formats (with years) are not currently supported." },
  { question: "Is this parser free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All parsing happens locally in your browser using JavaScript. Your cron expressions are never uploaded to any server. It's safe to use with any data." },
  { question: "What do the cron fields mean?", answer: "The five fields are: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-6, where 0 is Sunday). Use * for any value, */n for intervals, and commas for lists." },
];

const faqItems: FaqItem[] = [
  {
    question: "What cron format is supported?",
    answer:
      "The parser supports the standard 5-field cron format: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-6, where 0 is Sunday).",
  },
  {
    question: "Does it show next run times?",
    answer:
      "Yes — the parser calculates and displays the next 5 scheduled run times based on the cron expression you enter.",
  },
  {
    question: "What about 6-field cron expressions?",
    answer:
      "Only the standard 5-field cron format is supported. 6-field formats (with seconds) and 7-field formats (with years) are not currently supported.",
  },
  {
    question: "Is this parser free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All parsing happens locally in your browser using JavaScript. Your cron expressions are never uploaded to any server. It's safe to use with any data.",
  },
  {
    question: "What do the cron fields mean?",
    answer: (
      <>
        The five fields are: minute (0–59), hour (0–23), day of month (1–31),
        month (1–12), and day of week (0–6, where 0 is Sunday). Use{" "}
        <code className="text-slate-300">*</code> for any value,{" "}
        <code className="text-slate-300">*/n</code> for intervals, and commas
        for lists.
      </>
    ),
  },
];

export default function CronParserPage() {
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

      <Header currentSlug="/cron-parser" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free Cron Expression Parser
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Parse cron expressions to human-readable schedules and see the next 5 run times. Runs in your
            browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <CronParser />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔒 100% Private</h3>
            <p>
              All parsing happens in your browser using JavaScript. Nothing is
              uploaded to any server. Safe for any environment.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">⏰ Next 5 Runs</h3>
            <p>
              See exactly when your cron job will fire next. The parser calculates
              the next 5 scheduled run times from the current moment.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">📋 Quick Examples</h3>
            <p>
              Common cron patterns are available as one-click examples. Great for
              learning cron syntax or quickly starting from a known schedule.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Parse Cron Expressions
            </h2>
            <p className="leading-relaxed">
              Enter a standard 5-field cron expression and the parser instantly translates it to a
              human-readable description. You&apos;ll also see the next 5 scheduled run times calculated
              from the current moment. Click any of the quick example buttons to load common schedules
              like &quot;every minute,&quot; &quot;daily at midnight,&quot; or &quot;weekdays at 9 AM.&quot;
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Cron Expression Syntax
            </h2>
            <p className="leading-relaxed">
              A cron expression consists of five fields separated by spaces:{" "}
              <code className="text-slate-300">minute hour day-of-month month day-of-week</code>.
              Each field can be a specific value, a range (1-5), a list (1,3,5), an interval (*/15),
              or a wildcard (*). For example, <code className="text-slate-300">0 9 * * 1-5</code>{" "}
              means &quot;at 9:00 AM, Monday through Friday.&quot;
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/cron-parser" />

      <Footer />
    </div>
  );
}
