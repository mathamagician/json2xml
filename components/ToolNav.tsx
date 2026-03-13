"use client";

import Link from "next/link";
import { tools } from "@/lib/tools";

export default function ToolNav({ currentSlug }: { currentSlug?: string }) {
  return (
    <nav className="border-t border-slate-800/50 overflow-x-auto">
      <div className="max-w-7xl mx-auto px-4 flex gap-1">
        {tools.map((tool) => {
          const isActive = tool.slug === currentSlug;
          return (
            <Link
              key={tool.slug}
              href={tool.slug}
              className={`whitespace-nowrap px-3 py-2 text-xs font-medium transition-colors ${
                isActive
                  ? "text-brand-400 border-b-2 border-brand-500"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {tool.navTitle}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
