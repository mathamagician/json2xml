"use client";

import { useState, useRef, useEffect } from "react";
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
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isSearching = search.trim().length > 0;

  // Show search results across all categories when searching
  const searchResults = isSearching
    ? tools.filter(
        (t) =>
          t.navTitle.toLowerCase().includes(search.toLowerCase()) ||
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.description.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  const filteredTools = isSearching
    ? searchResults
    : tools.filter((t) => t.category === activeCategory);

  // Keyboard shortcut: Ctrl+K or / to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 0);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSearchToggle = () => {
    if (searchOpen) {
      setSearchOpen(false);
      setSearch("");
    } else {
      setSearchOpen(true);
      setTimeout(() => searchInputRef.current?.focus(), 0);
    }
  };

  return (
    <nav className="border-t border-slate-800/50">
      {/* Category tabs + search */}
      <div className="overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1">
          {!isSearching &&
            categoryOrder.map((cat) => (
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
          <div className="ml-auto flex items-center gap-1 shrink-0">
            {searchOpen && (
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tools…"
                className="bg-slate-900 border border-slate-700 rounded-md px-2.5 py-1 text-xs text-slate-200 placeholder:text-slate-600 outline-none focus:border-brand-500 w-36 sm:w-48"
                spellCheck={false}
              />
            )}
            <button
              onClick={handleSearchToggle}
              className="text-slate-500 hover:text-slate-300 px-2 py-1.5 text-xs transition-colors"
              title="Search tools (Ctrl+K)"
            >
              {searchOpen ? "✕" : "🔍"}
            </button>
          </div>
        </div>
      </div>

      {/* Tools within selected category (or search results) */}
      <div className="border-t border-slate-800/30 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 flex gap-1">
          {isSearching && filteredTools.length === 0 && (
            <span className="text-xs text-slate-600 py-2 px-3">No tools found</span>
          )}
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
