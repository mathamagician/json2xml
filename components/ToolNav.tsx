"use client";

import { useState } from "react";
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

function getCategoryForSlug(slug?: string): ToolCategory {
  if (!slug) return "converters";
  const tool = tools.find((t) => t.slug === slug);
  return tool?.category ?? "converters";
}

export default function ToolNav({ currentSlug }: { currentSlug?: string }) {
  const [activeCategory, setActiveCategory] = useState<ToolCategory>(
    getCategoryForSlug(currentSlug)
  );

  const filteredTools = tools.filter((t) => t.category === activeCategory);

  return (
    <nav className="border-t border-slate-800/50">
      {/* Category tabs */}
      <div className="overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 flex gap-1">
          {categoryOrder.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
                activeCategory === cat
                  ? "text-brand-400 border-b-2 border-brand-500"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Tools within selected category */}
      <div className="border-t border-slate-800/30 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 flex gap-1">
          {filteredTools.map((tool) => {
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
      </div>
    </nav>
  );
}
