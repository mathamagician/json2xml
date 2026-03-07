import Converter from "@/components/Converter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
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
            href="https://buymeacoffee.com/REPLACE_ME"
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
            Paste, upload, or drag &amp; drop your data. Converts instantly in your
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
            <h3 className="text-slate-200 font-semibold mb-2">📁 File support</h3>
            <p>
              Drag and drop <code className="text-slate-300">.json</code> or{" "}
              <code className="text-slate-300">.xml</code> files directly onto the
              input panel. Download the result with one click.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 text-center py-4 text-xs text-slate-600">
        <p>
          json2xml.com — built with ☕ |{" "}
          <a
            href="https://buymeacoffee.com/REPLACE_ME"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-400 underline"
          >
            Support this tool
          </a>
        </p>
      </footer>
    </div>
  );
}
