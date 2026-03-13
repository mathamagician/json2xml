import Link from "next/link";
import Converter from "@/components/Converter";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "JSON2XML — Free JSON ↔ XML Converter",
  url: "https://json2xml.com",
  description:
    "Free online tool to convert JSON to XML or XML to JSON instantly in your browser. Handles files up to 500 MB. No sign-up, no uploads — 100% private.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-tight">
              <span className="text-brand-500">JSON</span>
              <span className="text-slate-500 mx-1">⇄</span>
              <span className="text-slate-100">XML</span>
            </span>
            <span className="hidden sm:inline text-xs text-slate-500 border border-slate-700 rounded px-2 py-0.5">
              Free forever
            </span>
          </div>

          <a
            href="https://buymeacoffee.com/mathamagician"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-semibold text-sm px-3 py-1.5 rounded-lg transition-colors"
          >
            <span>☕</span>
            <span className="hidden sm:inline">Buy me a coffee</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            Free JSON ↔ XML Converter
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Paste, upload, or drag &amp; drop files up to 500 MB. Converts instantly in your
            browser —{" "}
            <strong className="text-slate-300">your data never leaves your machine.</strong>
          </p>
        </div>
      </section>

      {/* Main tool */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        <Converter />
      </main>

      {/* Info section */}
      <section className="border-t border-slate-800 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-12 grid sm:grid-cols-3 gap-8 text-sm text-slate-400">
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">🔒 100% Private</h3>
            <p>
              All conversion happens in your browser using JavaScript. Nothing is
              uploaded to any server. Safe for sensitive business data.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">⚡ Instant</h3>
            <p>
              No waiting for a server round-trip. Results appear as you type or the
              moment you drop a file.
            </p>
          </div>
          <div>
            <h3 className="text-slate-200 font-semibold mb-2">📁 Files up to 500 MB</h3>
            <p>
              Drag and drop <code className="text-slate-300">.json</code> or{" "}
              <code className="text-slate-300">.xml</code> files up to 500 MB. Large files convert
              off the main thread so the page stays responsive. Download the result with one click.
            </p>
          </div>
        </div>
      </section>

      {/* SEO content — how to use / FAQ */}
      <section className="border-t border-slate-800 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 py-12 space-y-10 text-sm text-slate-400">
          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Convert JSON to XML Online
            </h2>
            <p className="leading-relaxed">
              Paste your JSON into the left panel and your XML appears instantly on the right — no button to click,
              no waiting. You can also drag and drop a <code className="text-slate-300">.json</code> file directly
              onto the input panel, or use the upload button to browse your files. Once converted, copy the XML to
              your clipboard or download it as an <code className="text-slate-300">.xml</code> file.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              How to Convert XML to JSON Online
            </h2>
            <p className="leading-relaxed">
              Click the <strong className="text-slate-300">⇄ direction toggle</strong> to switch to XML → JSON mode,
              then paste your XML. The tool auto-detects your input format too — just paste and it figures out
              whether you&apos;re working with JSON or XML. You can also use the flip button to swap the panels and
              reverse direction in one click.
            </p>
          </div>

          <div>
            <h2 className="text-slate-200 text-lg font-semibold mb-3">
              Frequently Asked Questions
            </h2>
            <dl className="space-y-5">
              <div>
                <dt className="text-slate-300 font-medium mb-1">Is this JSON to XML converter free?</dt>
                <dd>
                  Yes — completely free, forever. There&apos;s no sign-up, no account, and no usage limits.
                  If you find it useful, a coffee is appreciated but never required.
                </dd>
              </div>
              <div>
                <dt className="text-slate-300 font-medium mb-1">Is my data safe?</dt>
                <dd>
                  All conversion happens locally in your browser using JavaScript. Your JSON or XML is never
                  uploaded to any server. It&apos;s safe to use with sensitive or proprietary data.
                </dd>
              </div>
              <div>
                <dt className="text-slate-300 font-medium mb-1">What file types are supported?</dt>
                <dd>
                  You can upload or drag and drop <code className="text-slate-300">.json</code>,{" "}
                  <code className="text-slate-300">.xml</code>, and <code className="text-slate-300">.txt</code> files.
                  Output can be downloaded as <code className="text-slate-300">.json</code> or{" "}
                  <code className="text-slate-300">.xml</code>.
                </dd>
              </div>
              <div>
                <dt className="text-slate-300 font-medium mb-1">Can it handle large files?</dt>
                <dd>
                  Yes — the tool handles files up to 500 MB. Large files are processed off the main thread
                  using Web Workers, so the page stays fully responsive. A progress bar shows reading and
                  conversion status, and very large outputs are delivered as a direct download.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 text-center py-4 text-xs text-slate-600">
        <p>
          json2xml.com — built with ☕ |{" "}
          <a
            href="https://buymeacoffee.com/mathamagician"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-400 underline"
          >
            Support this tool
          </a>
          {" "}|{" "}
          <Link href="/privacy" className="hover:text-slate-400 underline">
            Privacy Policy
          </Link>
        </p>
      </footer>
    </div>
  );
}
