"use client";

import { useState, useMemo } from "react";

type MatchResult = {
  match: string;
  index: number;
  groups: Record<string, string> | null;
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { matches, highlightedHtml } = useMemo(() => {
    if (!pattern || !testString)
      return { matches: [] as MatchResult[], highlightedHtml: "" };

    try {
      const regex = new RegExp(pattern, flags);
      const results: MatchResult[] = [];
      let m: RegExpExecArray | null;

      if (flags.includes("g")) {
        while ((m = regex.exec(testString)) !== null) {
          results.push({
            match: m[0],
            index: m.index,
            groups: m.groups ?? null,
          });
          if (m[0].length === 0) regex.lastIndex++;
        }
      } else {
        m = regex.exec(testString);
        if (m)
          results.push({
            match: m[0],
            index: m.index,
            groups: m.groups ?? null,
          });
      }

      // Build highlighted HTML
      let html = "";
      let lastIndex = 0;
      for (const result of results) {
        const before = testString.slice(lastIndex, result.index);
        html += escapeHtml(before);
        html += `<mark class="bg-brand-500/30 text-brand-300 rounded px-0.5">${escapeHtml(result.match)}</mark>`;
        lastIndex = result.index + result.match.length;
      }
      html += escapeHtml(testString.slice(lastIndex));

      setError(null);
      return { matches: results, highlightedHtml: html };
    } catch (e) {
      setError((e as Error).message);
      return { matches: [] as MatchResult[], highlightedHtml: "" };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pattern, flags, testString]);

  const handleClear = () => {
    setPattern("");
    setFlags("g");
    setTestString("");
    setError(null);
  };

  const flagOptions = [
    { flag: "g", label: "Global", desc: "Find all matches" },
    { flag: "i", label: "Case Insensitive", desc: "Ignore case" },
    { flag: "m", label: "Multiline", desc: "^ and $ match line boundaries" },
    { flag: "s", label: "Dotall", desc: ". matches newlines" },
  ];

  const toggleFlag = (f: string) => {
    setFlags((prev) =>
      prev.includes(f) ? prev.replace(f, "") : prev + f
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-brand-400">
          Regex Tester
        </div>
        {(pattern || testString) && (
          <button
            onClick={handleClear}
            className="btn-ghost text-red-400 hover:text-red-300"
          >
            Clear
          </button>
        )}
      </div>

      {/* Pattern input */}
      <div className="flex flex-col gap-2">
        <span className="panel-label">Regular Expression</span>
        <div className="flex items-center gap-2">
          <span className="text-slate-500 text-lg font-mono">/</span>
          <input
            type="text"
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 font-mono text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            placeholder="Enter regex pattern…"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            spellCheck={false}
          />
          <span className="text-slate-500 text-lg font-mono">/</span>
          <input
            type="text"
            className="w-16 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 font-mono text-sm text-slate-200 text-center focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            spellCheck={false}
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {flagOptions.map(({ flag, label }) => (
            <button
              key={flag}
              onClick={() => toggleFlag(flag)}
              className={`px-2.5 py-1 text-xs rounded-md border transition-colors ${
                flags.includes(flag)
                  ? "bg-brand-600/20 border-brand-500 text-brand-300"
                  : "border-slate-700 text-slate-500 hover:text-slate-300"
              }`}
            >
              {flag} — {label}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-950/40 border border-red-800 rounded-lg px-4 py-3 text-red-300 text-sm font-mono">
          {error}
        </div>
      )}

      {/* Test string */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="panel-label">Test String</span>
          {matches.length > 0 && (
            <span className="text-xs text-brand-400">
              {matches.length} match{matches.length !== 1 ? "es" : ""}
            </span>
          )}
        </div>
        <textarea
          className="editor-textarea"
          placeholder="Enter test string…"
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          spellCheck={false}
        />
      </div>

      {/* Highlighted result */}
      {highlightedHtml && (
        <div className="flex flex-col gap-2">
          <span className="panel-label">Highlighted Matches</span>
          <div
            className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 font-mono text-sm text-slate-300 whitespace-pre-wrap break-all"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        </div>
      )}

      {/* Match details */}
      {matches.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="panel-label">Match Details</span>
          <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-auto max-h-[300px]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="px-4 py-2 text-left font-medium">#</th>
                  <th className="px-4 py-2 text-left font-medium">Match</th>
                  <th className="px-4 py-2 text-left font-medium">Index</th>
                  <th className="px-4 py-2 text-left font-medium">Length</th>
                </tr>
              </thead>
              <tbody>
                {matches.map((m, i) => (
                  <tr key={i} className="border-b border-slate-800/50">
                    <td className="px-4 py-1.5 text-slate-500">{i + 1}</td>
                    <td className="px-4 py-1.5 font-mono text-brand-300">
                      {m.match || "(empty)"}
                    </td>
                    <td className="px-4 py-1.5 text-slate-400">{m.index}</td>
                    <td className="px-4 py-1.5 text-slate-400">
                      {m.match.length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
