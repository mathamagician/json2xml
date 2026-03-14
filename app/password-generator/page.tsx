import type { Metadata } from "next";
import GeneratorTool from "@/components/GeneratorTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free Password Generator Online — json2xml.com",
  description:
    "Generate secure random passwords with configurable length and character sets. Free, private — nothing is sent to any server. All passwords generated locally in your browser.",
  keywords: [
    "password generator",
    "random password",
    "password generator online",
    "secure password",
    "strong password generator",
    "generate password",
    "password creator",
    "password maker",
    "random password generator",
    "password generator free",
    "secure password generator",
    "password tool",
  ],
  alternates: {
    canonical: "https://json2xml.com/password-generator",
  },
  openGraph: {
    title: "Free Password Generator Online — json2xml.com",
    description:
      "Generate secure random passwords instantly in your browser. Free, private, no sign-up required.",
    url: "https://json2xml.com/password-generator",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Password Generator — json2xml.com",
  url: "https://json2xml.com/password-generator",
  description:
    "Free online password generator. Generate cryptographically secure random passwords with configurable length and character sets. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "Are the passwords secure?", answer: "Yes — passwords are generated using crypto.getRandomValues(), a cryptographically secure random number generator built into your browser. The randomness is suitable for security-sensitive applications." },
  { question: "Can I choose which character sets to include?", answer: "Yes — you can toggle lowercase letters, uppercase letters, digits, and symbols independently. You can also set a custom password length." },
  { question: "Can I generate multiple passwords at once?", answer: "Yes — you can generate up to 50 passwords at a time. Each one is independently random." },
  { question: "What password length should I use?", answer: "We recommend 16 characters or more for strong security. For high-security accounts, consider 20+ characters. Longer passwords with mixed character sets are exponentially harder to crack." },
  { question: "Is this generator free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "Nothing is sent to any server. All passwords are generated locally in your browser using JavaScript. Your passwords are never transmitted or stored anywhere." },
];

const faqItems: FaqItem[] = [
  {
    question: "Are the passwords secure?",
    answer: (
      <>
        Yes — passwords are generated using <code className="text-slate-300">crypto.getRandomValues()</code>,
        a cryptographically secure random number generator built into your browser. The randomness
        is suitable for security-sensitive applications.
      </>
    ),
  },
  {
    question: "Can I choose which character sets to include?",
    answer:
      "Yes — you can toggle lowercase letters, uppercase letters, digits, and symbols independently. You can also set a custom password length.",
  },
  {
    question: "Can I generate multiple passwords at once?",
    answer:
      "Yes — you can generate up to 50 passwords at a time. Each one is independently random.",
  },
  {
    question: "What password length should I use?",
    answer:
      "We recommend 16 characters or more for strong security. For high-security accounts, consider 20+ characters. Longer passwords with mixed character sets are exponentially harder to crack.",
  },
  {
    question: "Is this generator free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Nothing is sent to any server. All passwords are generated locally in your browser using JavaScript. Your passwords are never transmitted or stored anywhere.",
  },
];

export default function PasswordGenerator() {
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

      <Header currentSlug="/password-generator" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free Password Generator
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Generate secure random passwords with configurable length and character sets.
            Runs in your browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <GeneratorTool type="password" />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔐 Cryptographically Secure</h3>
            <p>
              Uses the Web Crypto API for true randomness. Every password is generated
              using a cryptographically secure random number generator.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">⚙️ Configurable</h3>
            <p>
              Choose your password length and toggle character sets: lowercase,
              uppercase, digits, and symbols. Full control over complexity.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">📦 Multiple Passwords</h3>
            <p>
              Generate up to 50 passwords at once. Perfect for setting up multiple
              accounts or rotating credentials in bulk.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Generate Secure Passwords
            </h2>
            <p className="leading-relaxed">
              Set your desired password length and select which character sets to include —
              lowercase letters, uppercase letters, digits, and symbols. Click generate to
              create a new password instantly. Adjust the count to generate multiple passwords
              at once. Copy any password to your clipboard with one click.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Password Security Best Practices
            </h2>
            <p className="leading-relaxed">
              Use a unique password for every account. Longer passwords are exponentially
              more secure — aim for 16+ characters. Include a mix of character types
              (uppercase, lowercase, digits, symbols) to maximize entropy. Use a password
              manager to store your passwords securely. Never reuse passwords across
              different sites or services.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/password-generator" />

      <Footer />
    </div>
  );
}
