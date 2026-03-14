"use client";

import { useState } from "react";

const SAMPLE_TIMESTAMP = "1000000000";

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [isMillis, setIsMillis] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateFromTimestamp = (value: string, millis: boolean) => {
    setTimestamp(value);
    setError(null);
    if (!value.trim()) { setDateStr(""); return; }
    const num = parseInt(value);
    if (isNaN(num)) { setError("Invalid timestamp"); setDateStr(""); return; }
    const ms = millis ? num : num * 1000;
    const d = new Date(ms);
    if (isNaN(d.getTime())) { setError("Invalid timestamp"); setDateStr(""); return; }
    setDateStr(d.toISOString());
  };

  const updateFromDate = (value: string) => {
    setDateStr(value);
    setError(null);
    if (!value.trim()) { setTimestamp(""); return; }
    const d = new Date(value);
    if (isNaN(d.getTime())) { setError("Invalid date"); setTimestamp(""); return; }
    setTimestamp(String(isMillis ? d.getTime() : Math.floor(d.getTime() / 1000)));
  };

  const setNow = () => {
    const now = new Date();
    setTimestamp(String(isMillis ? now.getTime() : Math.floor(now.getTime() / 1000)));
    setDateStr(now.toISOString());
    setError(null);
  };

  const handleMillisToggle = (millis: boolean) => {
    setIsMillis(millis);
    if (timestamp) updateFromTimestamp(timestamp, millis);
  };

  const handleCopy = async (field: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const parsedDate = dateStr ? new Date(dateStr) : null;
  const isValid = parsedDate && !isNaN(parsedDate.getTime());

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex rounded-lg border border-slate-700 overflow-hidden">
          <button
            onClick={() => handleMillisToggle(false)}
            className={`px-3 py-2 text-sm font-semibold transition-colors ${
              !isMillis ? "bg-brand-600 text-white" : "bg-slate-900 text-slate-400 hover:text-slate-100"
            }`}
          >
            Seconds
          </button>
          <button
            onClick={() => handleMillisToggle(true)}
            className={`px-3 py-2 text-sm font-semibold transition-colors ${
              isMillis ? "bg-brand-600 text-white" : "bg-slate-900 text-slate-400 hover:text-slate-100"
            }`}
          >
            Milliseconds
          </button>
        </div>
        <button onClick={setNow} className="btn-ghost">
          Now
        </button>
        {!timestamp && !dateStr && (
          <button onClick={() => updateFromTimestamp(SAMPLE_TIMESTAMP, isMillis)} className="btn-ghost text-brand-400 hover:text-brand-300">Sample</button>
        )}
        {(timestamp || dateStr) && (
          <button onClick={() => { setTimestamp(""); setDateStr(""); setError(null); }} className="btn-ghost text-red-400 hover:text-red-300">Clear</button>
        )}
      </div>

      {/* Timestamp input */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="panel-label">Unix Timestamp</span>
          {timestamp && (
            <button onClick={() => handleCopy("ts", timestamp)} className="btn-ghost text-xs">
              {copiedField === "ts" ? "✓ Copied!" : "Copy"}
            </button>
          )}
        </div>
        <input
          type="text"
          value={timestamp}
          onChange={(e) => updateFromTimestamp(e.target.value, isMillis)}
          placeholder={isMillis ? "1710000000000" : "1710000000"}
          className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-lg text-slate-100 font-mono outline-none focus:border-brand-500"
        />
      </div>

      {/* Date input */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="panel-label">ISO 8601 Date</span>
          {dateStr && (
            <button onClick={() => handleCopy("date", dateStr)} className="btn-ghost text-xs">
              {copiedField === "date" ? "✓ Copied!" : "Copy"}
            </button>
          )}
        </div>
        <input
          type="text"
          value={dateStr}
          onChange={(e) => updateFromDate(e.target.value)}
          placeholder="2024-03-09T16:00:00.000Z"
          className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-lg text-slate-100 font-mono outline-none focus:border-brand-500"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-400 text-sm font-mono">{error}</p>
      )}

      {/* Parsed details */}
      {isValid && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Local:</span>
            <span className="text-slate-200 font-mono">{parsedDate.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">UTC:</span>
            <span className="text-slate-200 font-mono">{parsedDate.toUTCString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Day of week:</span>
            <span className="text-slate-200 font-mono">
              {parsedDate.toLocaleDateString("en-US", { weekday: "long" })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Relative:</span>
            <span className="text-slate-200 font-mono">
              {Math.abs(Date.now() - parsedDate.getTime()) < 60000
                ? "just now"
                : parsedDate.getTime() > Date.now()
                ? `in ${formatRelative(parsedDate.getTime() - Date.now())}`
                : `${formatRelative(Date.now() - parsedDate.getTime())} ago`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function formatRelative(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 365) return `${days}d`;
  return `${Math.floor(days / 365)}y`;
}
