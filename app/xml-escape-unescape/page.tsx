import type { Metadata } from "next";
import XmlEscapeTool from "@/components/XmlEscapeTool";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free XML Escape / Unescape Online — json2xml.com",
  description:
    "Escape XML special characters to entities or unescape XML entities back to text instantly in your browser. Handles &amp; &lt; &gt; &quot; and &apos;. Free, private — your data never leaves your machine.",
  keywords: [
    "xml escape",
    "xml unescape",
    "xml entities",
    "xml entity encode",
    "xml entity decode",
    "xml escape online",
    "xml special characters",
    "escape xml online",
    "unescape xml online",
    "xml amp lt gt quot apos",
    "xml character entities",
    "xml escape tool",
  ],
  alternates: {
    canonical: "https://json2xml.com/xml-escape-unescape",
  },
  openGraph: {
    title: "Free XML Escape / Unescape Online — json2xml.com",
    description:
      "Escape and unescape XML entities instantly. Handles all 5 predefined entities. Free, private, no sign-up required.",
    url: "https://json2xml.com/xml-escape-unescape",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "XML Escape / Unescape — json2xml.com",
  url: "https://json2xml.com/xml-escape-unescape",
  description:
    "Free online XML escape and unescape tool. Convert special characters to XML entities and back. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What are the 5 predefined XML entities?", answer: "XML defines 5 predefined entities: &amp; for &, &lt; for <, &gt; for >, &quot; for \", and &apos; for '. These characters have special meaning in XML syntax and must be escaped when used as literal text content." },
  { question: "Why do XML characters need to be escaped?", answer: "Characters like < and & have special meaning in XML — < starts a tag and & starts an entity reference. If these characters appear in text content without escaping, the XML parser will misinterpret the document structure, causing parse errors or security vulnerabilities." },
  { question: "Can I unescape XML entities back to text?", answer: "Yes — the tool is bidirectional. Paste XML containing entities like &amp; and &lt; in the right panel and the unescaped text with literal characters appears instantly in the left panel." },
  { question: "Is this tool free?", answer: "Yes — completely free, forever. No sign-up, no account, no usage limits." },
  { question: "Is my data safe?", answer: "All escaping and unescaping happens locally in your browser using JavaScript. Nothing is uploaded to any server. It's safe to use with sensitive or proprietary data." },
  { question: "Does this handle numeric character references?", answer: "This tool handles the 5 predefined named entities (&amp;, &lt;, &gt;, &quot;, &apos;). Numeric character references like &#60; or &#x3C; are not currently converted, though these are less common in practice." },
];

const faqItems: FaqItem[] = [
  {
    question: "What are the 5 predefined XML entities?",
    answer:
      "XML defines 5 predefined entities: &amp; for &, &lt; for <, &gt; for >, &quot; for \", and &apos; for '. These characters have special meaning in XML syntax and must be escaped when used as literal text content.",
  },
  {
    question: "Why do XML characters need to be escaped?",
    answer:
      "Characters like < and & have special meaning in XML — < starts a tag and & starts an entity reference. If these characters appear in text content without escaping, the XML parser will misinterpret the document structure, causing parse errors or security vulnerabilities.",
  },
  {
    question: "Can I unescape XML entities back to text?",
    answer:
      "Yes — the tool is bidirectional. Paste XML containing entities like &amp; and &lt; in the right panel and the unescaped text with literal characters appears instantly in the left panel.",
  },
  {
    question: "Is this tool free?",
    answer:
      "Yes — completely free, forever. No sign-up, no account, no usage limits.",
  },
  {
    question: "Is my data safe?",
    answer:
      "All escaping and unescaping happens locally in your browser using JavaScript. Nothing is uploaded to any server. It's safe to use with sensitive or proprietary data.",
  },
  {
    question: "Does this handle numeric character references?",
    answer:
      "This tool handles the 5 predefined named entities (&amp;, &lt;, &gt;, &quot;, &apos;). Numeric character references like &#60; or &#x3C; are not currently converted, though these are less common in practice.",
  },
];

export default function XmlEscapePage() {
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

      <Header currentSlug="/xml-escape-unescape" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free XML Escape / Unescape
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Escape XML special characters to entities or unescape entities back to text.
            Runs in your browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <XmlEscapeTool />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">5 Predefined Entities</h3>
            <p>
              Converts all 5 XML-special characters: &amp; to &amp;amp;, &lt; to &amp;lt;,
              &gt; to &amp;gt;, &quot; to &amp;quot;, and &apos; to &amp;apos;. These cover
              every character that can break XML syntax.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">Bidirectional</h3>
            <p>
              Type in either panel — text on the left escapes to entities on the right,
              and entities on the right unescape to text on the left, all in real time.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">100% Private</h3>
            <p>
              All escaping and unescaping runs locally in your browser using JavaScript.
              Nothing is sent to a server — safe for sensitive data.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Escape and Unescape XML Entities
            </h2>
            <p className="leading-relaxed">
              Type or paste text containing XML-special characters in the left panel and
              the escaped version with entity references appears instantly on the right.
              To unescape, paste XML text with entities like &amp;amp; and &amp;lt; in the
              right panel and the original text with literal characters appears on the
              left. The built-in entity reference table shows all 5 predefined XML
              entities for quick reference.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Understanding XML Entity Escaping
            </h2>
            <p className="leading-relaxed">
              XML uses angle brackets to delimit tags and ampersands to start entity
              references. When these characters appear as literal text content, they must
              be replaced with predefined entity references to avoid ambiguity. The XML
              specification defines exactly 5 such entities. Proper escaping is critical
              for generating well-formed XML and preventing injection attacks when
              constructing XML from user input.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/xml-escape-unescape" />

      <Footer />
    </div>
  );
}
