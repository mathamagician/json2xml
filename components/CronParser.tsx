"use client";

import { useState } from "react";
import { cronToHuman, getNextRuns } from "@/lib/cron";

const EXAMPLES = [
  { label: "Every minute", value: "* * * * *" },
  { label: "Every hour", value: "0 * * * *" },
  { label: "Every day at midnight", value: "0 0 * * *" },
  { label: "Every Monday at 9am", value: "0 9 * * 1" },
  { label: "Every 15 minutes", value: "*/15 * * * *" },
  { label: "Weekdays at 8:30am", value: "30 8 * * 1-5" },
  { label: "1st of every month", value: "0 0 1 * *" },
];

export default function CronParser() {
  const [expression, setExpression] = useState("");
  const [human, setHuman] = useState<string | null>(null);
  const [nextRuns, setNextRuns] = useState<Date[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const parse = (expr: string) => {
    setExpression(expr);
    if (!expr.trim()) {
      setHuman(null);
      setNextRuns([]);
      setError(null);
      return;
    }
    try {
      setHuman(cronToHuman(expr));
      setNextRuns(getNextRuns(expr, 5));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setHuman(null);
      setNextRuns([]);
    }
  };

  const handleCopy = async () => {
    if (human) {
      await navigator.clipboard.writeText(human);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Input */}
      <div className="flex flex-col gap-3">
        <label className="panel-label">Cron Expression</label>
        <div className="flex gap-3 flex-wrap">
          <input
            type="text"
            value={expression}
            onChange={(e) => parse(e.target.value)}
            placeholder="* * * * *"
            className="flex-1 min-w-[200px] bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-lg text-slate-100 font-mono outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 placeholder:text-slate-600"
          />
          {expression && (
            <button
              onClick={() => parse("")}
              className="btn-ghost text-red-400 hover:text-red-300"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-1 text-xs text-slate-500 font-mono">
          <span className="px-2 py-0.5 bg-slate-800 rounded">minute</span>
          <span className="px-2 py-0.5 bg-slate-800 rounded">hour</span>
          <span className="px-2 py-0.5 bg-slate-800 rounded">day</span>
          <span className="px-2 py-0.5 bg-slate-800 rounded">month</span>
          <span className="px-2 py-0.5 bg-slate-800 rounded">weekday</span>
        </div>
      </div>

      {/* Examples */}
      <div className="flex flex-wrap gap-2">
        {EXAMPLES.map((ex) => (
          <button
            key={ex.value}
            onClick={() => parse(ex.value)}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-md transition-colors"
          >
            {ex.label}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Human readable */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="panel-label">Human Readable</span>
            {human && (
              <button onClick={handleCopy} className="btn-ghost text-xs">
                {copied ? "✓ Copied!" : "Copy"}
              </button>
            )}
          </div>
          <div className="bg-slate-900 rounded-lg border border-slate-800 min-h-[120px] flex items-center justify-center p-6">
            {!human && !error && (
              <p className="text-slate-500 text-sm">Enter a cron expression above…</p>
            )}
            {error && (
              <div className="text-center">
                <p className="text-red-400 font-semibold text-sm mb-1">Invalid Expression</p>
                <p className="text-red-300 text-sm font-mono">{error}</p>
              </div>
            )}
            {human && (
              <p className="text-slate-100 text-lg font-medium text-center">{human}</p>
            )}
          </div>
        </div>

        {/* Next runs */}
        <div className="flex flex-col gap-2">
          <span className="panel-label">Next 5 Runs</span>
          <div className="bg-slate-900 rounded-lg border border-slate-800 min-h-[120px] p-4">
            {nextRuns.length === 0 && (
              <p className="text-slate-500 text-sm text-center pt-6">No upcoming runs to show…</p>
            )}
            {nextRuns.length > 0 && (
              <ul className="space-y-2">
                {nextRuns.map((run, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    <span className="text-brand-400 font-mono text-xs w-5">{i + 1}.</span>
                    <span className="text-slate-200 font-mono">
                      {run.toLocaleString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
