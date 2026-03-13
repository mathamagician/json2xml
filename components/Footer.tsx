import Link from "next/link";
import { tools } from "@/lib/tools";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tool links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-500 mb-6">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.slug}
              className="hover:text-slate-300 transition-colors"
            >
              {tool.navTitle}
            </Link>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="text-center text-xs text-slate-600">
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
        </div>
      </div>
    </footer>
  );
}
