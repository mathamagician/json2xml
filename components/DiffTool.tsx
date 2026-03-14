"use client";

import { useState, useCallback } from "react";
import { computeDiff, type DiffLine } from "@/lib/diff";

export default function DiffTool() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [diff, setDiff] = useState<DiffLine[]>([]);
  const [hasCompared, setHasCompared] = useState(false);

  const compare = useCallback(() => {
    setDiff(computeDiff(textA, textB));
    setHasCompared(true);
  }, [textA, textB]);

  const handleClear = () => {
    setTextA("");
    setTextB("");
    setDiff([]);
    setHasCompared(false);
  };

  const additions = diff.filter((d) => d.type === "add").length;
  const removals = diff.filter((d) => d.type === "remove").length;

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        <button onClick={compare} className="btn-primary" disabled={!textA && !textB}>
          Compare
        </button>
        {hasCompared && (
          <div className="flex items-center gap-3 text-sm">
            <span className="text-green-400">+{additions} added</span>
            <span className="text-red-400">-{removals} removed</span>
          </div>
        )}
        {(textA || textB) && (
          <button onClick={handleClear} className="btn-ghost text-red-400 hover:text-red-300">
            Clear
          </button>
        )}
      </div>

      {/* Input panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <span className="panel-label">Original</span>
          <textarea
            className="editor-textarea"
            placeholder="Paste original text here…"
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            spellCheck={false}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="panel-label">Modified</span>
          <textarea
            className="editor-textarea"
            placeholder="Paste modified text here…"
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            spellCheck={false}
          />
        </div>
      </div>

      {/* Diff output */}
      {hasCompared && (
        <div className="flex flex-col gap-2">
          <span className="panel-label">Diff Result</span>
          <div className="bg-slate-900 rounded-lg border border-slate-800 max-h-[500px] overflow-auto font-mono text-sm">
            {diff.length === 0 && (
              <p className="text-slate-500 p-4">Both inputs are empty.</p>
            )}
            {diff.map((line, i) => (
              <div
                key={i}
                className={`flex px-4 py-0.5 ${
                  line.type === "add"
                    ? "bg-green-950/40 text-green-300"
                    : line.type === "remove"
                    ? "bg-red-950/40 text-red-300"
                    : "text-slate-400"
                }`}
              >
                <span className="w-8 text-right mr-3 text-slate-600 select-none flex-shrink-0">
                  {line.lineA ?? ""}
                </span>
                <span className="w-8 text-right mr-3 text-slate-600 select-none flex-shrink-0">
                  {line.lineB ?? ""}
                </span>
                <span className="w-4 flex-shrink-0 text-center select-none">
                  {line.type === "add" ? "+" : line.type === "remove" ? "-" : " "}
                </span>
                <span className="break-all">{line.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
