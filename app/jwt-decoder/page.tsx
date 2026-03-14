import type { Metadata } from "next";
import JwtDecoder from "@/components/JwtDecoder";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedTools from "@/components/RelatedTools";
import FaqSection, { type FaqItem } from "@/components/FaqSection";
import { faqJsonLd } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Free JWT Decoder Online — json2xml.com",
  description:
    "Decode and inspect JWT tokens instantly. See header, payload, expiration, and algorithm. Free, private — your tokens never leave your browser.",
  keywords: [
    "jwt decoder",
    "jwt decode",
    "jwt token decoder",
    "decode jwt",
    "jwt parser",
    "jwt viewer",
    "jwt debugger",
    "jwt inspector",
    "jwt online",
    "decode jwt token",
    "jwt token viewer",
    "jwt payload",
  ],
  alternates: {
    canonical: "https://json2xml.com/jwt-decoder",
  },
  openGraph: {
    title: "Free JWT Decoder Online — json2xml.com",
    description:
      "Decode and inspect JWT tokens instantly. See header, payload, expiration, and algorithm. Free, private, no sign-up required.",
    url: "https://json2xml.com/jwt-decoder",
    siteName: "JSON2XML",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JWT Decoder — json2xml.com",
  url: "https://json2xml.com/jwt-decoder",
  description:
    "Free online JWT decoder. Decode and inspect JWT tokens — see header, payload, signature, expiration, and algorithm. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

const faqSchemaItems = [
  { question: "What is a JWT token?", answer: "A JSON Web Token (JWT) is a compact, URL-safe token format used for securely transmitting information between parties. It consists of three Base64-encoded parts separated by dots: a header, a payload, and a signature." },
  { question: "Can this tool verify JWT signatures?", answer: "No — this tool only decodes and inspects JWT tokens. Signature verification requires access to the signing key or public certificate, which is a server-side operation. This tool shows you the decoded contents so you can inspect claims, expiration, and algorithm." },
  { question: "Is it safe to paste my JWT token here?", answer: "Yes — all decoding happens locally in your browser using JavaScript. Your token is never sent to any server. However, you should still avoid sharing tokens publicly, as they may contain sensitive claims." },
  { question: "What are the three parts of a JWT?", answer: "The header specifies the signing algorithm and token type. The payload contains the claims — data like user ID, roles, issuer, and expiration time. The signature is a cryptographic hash that verifies the token hasn't been tampered with." },
  { question: "How do I check if a JWT is expired?", answer: "Paste your token into the decoder. If the payload contains an 'exp' (expiration) claim, the tool will display the expiration timestamp and show whether the token is currently EXPIRED or VALID." },
  { question: "What algorithms do JWTs use?", answer: "Common algorithms include HS256 (HMAC with SHA-256), RS256 (RSA with SHA-256), and ES256 (ECDSA with SHA-256). The algorithm is specified in the token header and determines how the signature is generated and verified." },
];

const faqItems: FaqItem[] = [
  {
    question: "What is a JWT token?",
    answer:
      "A JSON Web Token (JWT) is a compact, URL-safe token format used for securely transmitting information between parties. It consists of three Base64-encoded parts separated by dots: a header, a payload, and a signature.",
  },
  {
    question: "Can this tool verify JWT signatures?",
    answer:
      "No — this tool only decodes and inspects JWT tokens. Signature verification requires access to the signing key or public certificate, which is a server-side operation. This tool shows you the decoded contents so you can inspect claims, expiration, and algorithm.",
  },
  {
    question: "Is it safe to paste my JWT token here?",
    answer:
      "Yes — all decoding happens locally in your browser using JavaScript. Your token is never sent to any server. However, you should still avoid sharing tokens publicly, as they may contain sensitive claims.",
  },
  {
    question: "What are the three parts of a JWT?",
    answer:
      "The header specifies the signing algorithm and token type. The payload contains the claims — data like user ID, roles, issuer, and expiration time. The signature is a cryptographic hash that verifies the token hasn't been tampered with.",
  },
  {
    question: "How do I check if a JWT is expired?",
    answer:
      "Paste your token into the decoder. If the payload contains an 'exp' (expiration) claim, the tool will display the expiration timestamp and show whether the token is currently EXPIRED or VALID.",
  },
  {
    question: "What algorithms do JWTs use?",
    answer: (
      <>
        Common algorithms include <code className="text-slate-300">HS256</code> (HMAC with SHA-256),{" "}
        <code className="text-slate-300">RS256</code> (RSA with SHA-256), and{" "}
        <code className="text-slate-300">ES256</code> (ECDSA with SHA-256). The algorithm is specified in the token
        header and determines how the signature is generated and verified.
      </>
    ),
  },
];

export default function JwtDecoderPage() {
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

      <Header currentSlug="/jwt-decoder" />

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free JWT Decoder
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Decode and inspect JWT tokens instantly. See header, payload, expiration, and algorithm.
            Runs in your browser —{" "}
            <strong className="text-slate-300">your tokens never leave your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <JwtDecoder />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔍 Token Inspection</h3>
            <p>
              Instantly decode any JWT and view the header, payload, and signature.
              See the algorithm, token type, and all claims at a glance.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">⏱️ Expiration Check</h3>
            <p>
              Automatically detects issued-at and expiration timestamps.
              Shows whether the token is currently valid or expired.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔒 Privacy & Security</h3>
            <p>
              All decoding happens locally in your browser using JavaScript.
              Your tokens are never sent to any server. Safe for sensitive data.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Decode a JWT
            </h2>
            <p className="leading-relaxed">
              Paste your JWT token into the input field and the decoded header, payload, and signature
              appear instantly below. The header shows the signing algorithm and token type. The payload
              displays all claims including subject, issuer, expiration, and any custom data. Copy the
              decoded header or payload with one click.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Understanding JWT Structure
            </h2>
            <p className="leading-relaxed">
              A JSON Web Token consists of three Base64URL-encoded parts separated by dots. The header
              declares the algorithm (e.g., HS256, RS256) and token type. The payload carries claims —
              standardized fields like <code className="text-slate-300">iss</code> (issuer),{" "}
              <code className="text-slate-300">sub</code> (subject),{" "}
              <code className="text-slate-300">exp</code> (expiration), and{" "}
              <code className="text-slate-300">iat</code> (issued at), plus any custom claims your
              application needs. The signature ensures the token hasn&apos;t been tampered with and is
              verified server-side using the signing key.
            </p>
          </div>

          <FaqSection items={faqItems} />
        </div>
      </section>

      <RelatedTools currentSlug="/jwt-decoder" />

      <Footer />
    </div>
  );
}
