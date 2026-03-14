"use client";

import { useState } from "react";
import { computeDiff, type DiffLine } from "@/lib/diff";

function sortKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(sortKeys);
  if (obj !== null && typeof obj === "object") {
    const sorted: Record<string, unknown> = {};
    for (const key of Object.keys(obj as Record<string, unknown>).sort()) {
      sorted[key] = sortKeys((obj as Record<string, unknown>)[key]);
    }
    return sorted;
  }
  return obj;
}

function normalizeJson(text: string): string {
  const parsed = JSON.parse(text);
  return JSON.stringify(sortKeys(parsed), null, 2);
}

export default function JsonDiffTool() {
  const [leftInput, setLeftInput] = useState("");
  const [rightInput, setRightInput] = useState("");
  const [diff, setDiff] = useState<DiffLine[]>([]);
  const [error, setError] = useState<string | null>(null);

  const compare = () => {
    setError(null);
    if (!leftInput.trim() || !rightInput.trim()) {
      setDiff([]);
      return;
    }
    try {
      const leftNorm = normalizeJson(leftInput);
      const rightNorm = normalizeJson(rightInput);
      setDiff(computeDiff(leftNorm, rightNorm));
    } catch {
      setError(
        "Invalid JSON in one or both inputs. Please check and try again."
      );
      setDiff([]);
    }
  };

  const handleLeftChange = (value: string) => {
    setLeftInput(value);
  };
  const handleRightChange = (value: string) => {
    setRightInput(value);
  };

  const handleClear = () => {
    setLeftInput("");
    setRightInput("");
    setDiff([]);
    setError(null);
  };

  const additions = diff.filter((d) => d.type === "add").length;
  const removals = diff.filter((d) => d.type === "remove").length;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-brand-400">
          JSON Diff
        </div>
        <button
          onClick={compare}
          className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          Compare
        </button>
        {(leftInput || rightInput) && (
          <button
            onClick={handleClear}
            className="btn-ghost text-red-400 hover:text-red-300"
          >
            Clear
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-950/40 border border-red-800 rounded-lg px-4 py-3 text-red-300 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <span className="panel-label">Original JSON</span>
          <textarea
            className="editor-textarea"
            placeholder="Paste original JSON here…"
            value={leftInput}
            onChange={(e) => handleLeftChange(e.target.value)}
            spellCheck={false}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="panel-label">Modified JSON</span>
          <textarea
            className="editor-textarea"
            placeholder="Paste modified JSON here…"
            value={rightInput}
            onChange={(e) => handleRightChange(e.target.value)}
            spellCheck={false}
          />
        </div>
      </div>

      {diff.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <span className="panel-label">Diff Output</span>
            <span className="text-xs text-green-400">+{additions}</span>
            <span className="text-xs text-red-400">-{removals}</span>
            {additions === 0 && removals === 0 && (
              <span className="text-xs text-slate-400">
                No differences found
              </span>
            )}
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-auto max-h-[500px] font-mono text-sm">
            {diff.map((line, i) => (
              <div
                key={i}
                className={`flex px-4 py-0.5 ${
                  line.type === "add"
                    ? "bg-green-950/30 text-green-300"
                    : line.type === "remove"
                      ? "bg-red-950/30 text-red-300"
                      : "text-slate-500"
                }`}
              >
                <span className="w-8 text-right mr-4 text-slate-600 select-none shrink-0">
                  {line.type === "remove"
                    ? line.lineA
                    : line.type === "add"
                      ? line.lineB
                      : line.lineA}
                </span>
                <span className="w-4 shrink-0 select-none">
                  {line.type === "add"
                    ? "+"
                    : line.type === "remove"
                      ? "-"
                      : " "}
                </span>
                <span className="whitespace-pre">{line.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
