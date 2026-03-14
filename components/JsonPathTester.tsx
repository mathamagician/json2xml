"use client";

import { useState, useCallback } from "react";
import { queryJsonPath } from "@/lib/jsonpath";

const SAMPLE_JSON = `{
  "store": {
    "books": [
      { "title": "The Great Gatsby", "author": "Fitzgerald", "price": 12.99 },
      { "title": "1984", "author": "Orwell", "price": 9.99 },
      { "title": "Brave New World", "author": "Huxley", "price": 11.99 }
    ],
    "name": "Book Haven"
  }
}`;
const SAMPLE_PATH = "$.store.books[*].title";

export default function JsonPathTester() {
  const [json, setJson] = useState("");
  const [path, setPath] = useState("$");
  const [results, setResults] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [matchCount, setMatchCount] = useState<number | null>(null);

  const evaluate = useCallback((jsonText: string, pathExpr: string) => {
    if (!jsonText.trim() || !pathExpr.trim()) {
      setResults("");
      setError(null);
      setMatchCount(null);
      return;
    }
    try {
      const parsed = JSON.parse(jsonText);
      const matches = queryJsonPath(parsed, pathExpr);
      setMatchCount(matches.length);
      setResults(JSON.stringify(matches.length === 1 ? matches[0] : matches, null, 2));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setResults("");
      setMatchCount(null);
    }
  }, []);

  const handleJsonChange = (text: string) => {
    setJson(text);
    evaluate(text, path);
  };

  const handlePathChange = (text: string) => {
    setPath(text);
    evaluate(json, text);
  };

  const handleSample = () => {
    setJson(SAMPLE_JSON);
    setPath(SAMPLE_PATH);
    evaluate(SAMPLE_JSON, SAMPLE_PATH);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(results);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        {!json && (
          <button onClick={handleSample} className="btn-ghost text-brand-400 hover:text-brand-300">
            Sample
          </button>
        )}
      </div>

      {/* Path input */}
      <div className="flex flex-col gap-2">
        <span className="panel-label">JSONPath Expression</span>
        <div className="flex gap-3">
          <input
            type="text"
            value={path}
            onChange={(e) => handlePathChange(e.target.value)}
            placeholder="$.store.book[0].title"
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-slate-100 font-mono outline-none focus:border-brand-500"
          />
          {matchCount !== null && (
            <div className="flex items-center px-3 text-sm text-brand-400 font-semibold">
              {matchCount} match{matchCount !== 1 ? "es" : ""}
            </div>
          )}
        </div>
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <span className="panel-label">JSON Input</span>
          <textarea
            className="editor-textarea"
            placeholder="Paste your JSON here…"
            value={json}
            onChange={(e) => handleJsonChange(e.target.value)}
            spellCheck={false}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="panel-label">Results</span>
            {results && (
              <button onClick={handleCopy} className="btn-ghost text-xs">
                {copied ? "✓ Copied!" : "Copy"}
              </button>
            )}
          </div>
          <div className="relative">
            <textarea
              className="editor-textarea"
              placeholder="Matched results will appear here…"
              value={error ? "" : results}
              readOnly
              spellCheck={false}
            />
            {error && (
              <div className="absolute inset-0 flex items-start p-4 bg-red-950/40 rounded-lg border border-red-800">
                <div>
                  <p className="text-red-400 font-semibold text-sm mb-1">Error</p>
                  <p className="text-red-300 text-sm font-mono">{error}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
