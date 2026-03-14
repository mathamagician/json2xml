"use client";

import { useState } from "react";

function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  const binary = Array.from(bytes, (b) => String.fromCharCode(b)).join("");
  return btoa(binary);
}

function base64ToUtf8(b64: string): string {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

export default function Base64Tool() {
  const [text, setText] = useState("");
  const [base64, setBase64] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleTextChange = (value: string) => {
    setText(value);
    setError(null);
    if (!value.trim()) { setBase64(""); return; }
    try { setBase64(utf8ToBase64(value)); } catch { setError("Could not encode text."); setBase64(""); }
  };

  const handleBase64Change = (value: string) => {
    setBase64(value);
    setError(null);
    if (!value.trim()) { setText(""); return; }
    try { setText(base64ToUtf8(value)); } catch { setError("Invalid Base64 input."); setText(""); }
  };

  const handleCopy = async (field: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleClear = () => { setText(""); setBase64(""); setError(null); };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-brand-400">
          Text ↔ Base64
        </div>
        {(text || base64) && (
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
          <textarea className="editor-textarea" placeholder="Type or paste text to encode…" value={text} onChange={(e) => handleTextChange(e.target.value)} spellCheck={false} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="panel-label">Base64</span>
            {base64 && (
              <button onClick={() => handleCopy("base64", base64)} className="btn-ghost text-xs">
                {copiedField === "base64" ? "✓ Copied!" : "Copy"}
              </button>
            )}
          </div>
          <textarea className="editor-textarea" placeholder="Type or paste Base64 to decode…" value={base64} onChange={(e) => handleBase64Change(e.target.value)} spellCheck={false} />
        </div>
      </div>
    </div>
  );
}
