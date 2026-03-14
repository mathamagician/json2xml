"use client";

import { useState } from "react";

const SAMPLE_TEXT = "https://example.com/search?q=hello world&lang=en&sort=relevance&filter=price<100";

export default function UrlEncodeTool() {
  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState("");
  const [fullUrl, setFullUrl] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const encode = (value: string, full: boolean) => full ? encodeURI(value) : encodeURIComponent(value);
  const decode = (value: string, full: boolean) => full ? decodeURI(value) : decodeURIComponent(value);

  const handleTextChange = (value: string) => {
    setText(value);
    setError(null);
    if (!value.trim()) { setEncoded(""); return; }
    try { setEncoded(encode(value, fullUrl)); } catch { setError("Could not encode text."); setEncoded(""); }
  };

  const handleEncodedChange = (value: string) => {
    setEncoded(value);
    setError(null);
    if (!value.trim()) { setText(""); return; }
    try { setText(decode(value, fullUrl)); } catch { setError("Invalid encoded input."); setText(""); }
  };

  const handleModeChange = (full: boolean) => {
    setFullUrl(full);
    setError(null);
    if (text.trim()) {
      try { setEncoded(full ? encodeURI(text) : encodeURIComponent(text)); } catch { setError("Could not encode text."); }
    }
  };

  const handleCopy = async (field: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleClear = () => { setText(""); setEncoded(""); setError(null); };

  const handleSample = () => { handleTextChange(SAMPLE_TEXT); };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-brand-400">
          Text ↔ URL Encoded
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
          <input type="checkbox" checked={fullUrl} onChange={(e) => handleModeChange(e.target.checked)} className="accent-brand-500" />
          Full URL mode
        </label>
        {!text && !encoded && (
          <button onClick={handleSample} className="btn-ghost text-brand-400 hover:text-brand-300">Sample</button>
        )}
        {(text || encoded) && (
          <button onClick={handleClear} className="btn-ghost text-red-400 hover:text-red-300">Clear</button>
        )}
      </div>

      {error && (
        <div className="bg-red-950/40 border border-red-800 rounded-lg px-4 py-3 text-red-300 text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="panel-label">Text</span>
            {text && (
              <button onClick={() => handleCopy("text", text)} className="btn-ghost text-xs">
                {copiedField === "text" ? "✓ Copied!" : "Copy"}
              </button>
            )}
          </div>
          <textarea className="editor-textarea" placeholder="Type or paste text to URL-encode…" value={text} onChange={(e) => handleTextChange(e.target.value)} spellCheck={false} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="panel-label">URL Encoded</span>
            {encoded && (
              <button onClick={() => handleCopy("encoded", encoded)} className="btn-ghost text-xs">
                {copiedField === "encoded" ? "✓ Copied!" : "Copy"}
              </button>
            )}
          </div>
          <textarea className="editor-textarea" placeholder="Type or paste URL-encoded text to decode…" value={encoded} onChange={(e) => handleEncodedChange(e.target.value)} spellCheck={false} />
        </div>
      </div>
    </div>
  );
}
