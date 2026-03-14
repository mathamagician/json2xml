import Link from "next/link";
import {
  tools,
  categoryLabels,
  type ToolCategory,
} from "@/lib/tools";

const categoryOrder: ToolCategory[] = [
  "converters",
  "formatters",
  "validators",
  "code-gen",
  "dev-tools",
  "generators",
  "utilities",
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tool links grouped by category */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-8 text-xs">
          {categoryOrder.map((cat) => {
            const catTools = tools.filter((t) => t.category === cat);
            if (catTools.length === 0) return null;
            return (
              <div key={cat}>
                <h4 className="text-slate-400 font-semibold uppercase tracking-wide mb-2">
                  {categoryLabels[cat]}
                </h4>
                <ul className="space-y-1">
                  {catTools.map((tool) => (
                    <li key={tool.slug}>
                      <Link
                        href={tool.slug}
                        className="text-slate-500 hover:text-slate-300 transition-colors"
                      >
                        {tool.navTitle}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom bar */}
        <div className="text-center text-xs text-slate-600 border-t border-slate-800 pt-4">
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
