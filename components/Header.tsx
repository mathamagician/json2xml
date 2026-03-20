import Link from "next/link";
import ToolNav from "./ToolNav";

export default function Header({ currentSlug }: { currentSlug?: string }) {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-brand-500">JSON</span>
            <span className="text-slate-500 mx-1">⇄</span>
            <span className="text-slate-100">XML</span>
          </Link>
          <span className="hidden sm:inline text-xs text-slate-500 border border-slate-700 rounded px-2 py-0.5">
            Free forever
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div id="google_translate_element" className="text-sm" />
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
      </div>
      <ToolNav currentSlug={currentSlug} />
    </header>
  );
}
