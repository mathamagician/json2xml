import type { Metadata } from "next";
import ColorConverter from "@/components/ColorConverter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free Color Converter Online — json2xml.com",
  description:
    "Convert between HEX, RGB, and HSL color formats instantly in your browser. Live preview swatch, color picker, and bidirectional conversion. Free, private — your data never leaves your machine.",
  keywords: [
    "color converter",
    "hex to rgb",
    "rgb to hex",
    "hsl converter",
    "color picker",
    "hex to hsl",
    "rgb to hsl",
    "color format converter",
    "color converter online",
    "hex rgb converter",
    "color code converter",
    "color converter free",
  ],
  alternates: {
    canonical: "https://json2xml.com/color-converter",
  },
  openGraph: {
    title: "Free Color Converter Online — json2xml.com",
    description:
      "Convert between HEX, RGB, and HSL color formats instantly in your browser. Free, private, no sign-up required.",
    url: "https://json2xml.com/color-converter",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Color Converter — json2xml.com",
  url: "https://json2xml.com/color-converter",
  description:
    "Free online color converter. Convert between HEX, RGB, and HSL color formats with a live preview swatch. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What color formats are supported?", answer: "The converter supports HEX, RGB, and HSL color formats. Enter a value in any format and the other formats update automatically." },
  { question: "Is the conversion real-time?", answer: "Yes — all conversions happen instantly as you type. The preview swatch and all output values update in real-time." },
  { question: "Can I use a color picker?", answer: "Yes — a built-in color picker lets you visually select any color and see the HEX, RGB, and HSL values instantly." },
  { question: "Is this tool free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All conversion happens locally in your browser using JavaScript. Nothing is uploaded to any server. It's safe to use with any data." },
  { question: "Can I copy the color values?", answer: "Yes — each color format output has a copy button so you can quickly copy values to your clipboard." },
];

const faqItems: FaqItem[] = [
  {
    question: "What color formats are supported?",
    answer:
      "The converter supports HEX, RGB, and HSL color formats. Enter a value in any format and the other formats update automatically.",
  },
  {
    question: "Is the conversion real-time?",
    answer:
      "Yes — all conversions happen instantly as you type. The preview swatch and all output values update in real-time.",
  },
  {
    question: "Can I use a color picker?",
    answer:
      "Yes — a built-in color picker lets you visually select any color and see the HEX, RGB, and HSL values instantly.",
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
    question: "Can I copy the color values?",
    answer:
      "Yes — each color format output has a copy button so you can quickly copy values to your clipboard.",
  },
];

export default function ColorConverterPage() {
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

      <Header currentSlug="/color-converter" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free Color Converter
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Convert between HEX, RGB, and HSL color formats with a live preview swatch.
            Runs in your browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <ColorConverter />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🎨 Live Preview</h3>
            <p>
              See a real-time color swatch that updates as you type or pick a
              color. Instantly visualize any color value.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔄 Bidirectional</h3>
            <p>
              Edit any format — HEX, RGB, or HSL — and the others update
              automatically. No need to choose a direction.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🖌️ Color Picker</h3>
            <p>
              Use the built-in color picker to visually select a color and get
              the HEX, RGB, and HSL values instantly.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Convert Color Formats
            </h2>
            <p className="leading-relaxed">
              Enter a color value in any supported format — HEX, RGB, or HSL — and the
              converter instantly displays the equivalent values in all other formats. You
              can also use the color picker to visually select a color. Copy any value to
              your clipboard with a single click.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Understanding HEX, RGB, and HSL
            </h2>
            <p className="leading-relaxed">
              HEX represents colors as a six-digit hexadecimal string (e.g., #0284C7). RGB
              defines colors by their red, green, and blue components (0–255). HSL uses hue
              (0–360°), saturation (0–100%), and lightness (0–100%) for a more intuitive
              color model. Each format is widely used in CSS, design tools, and
              programming.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/color-converter" />

      <Footer />
    </div>
  );
}
