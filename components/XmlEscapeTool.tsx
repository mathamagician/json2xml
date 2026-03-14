"use client";

import { useState } from "react";

const xmlEntities: [RegExp, string][] = [
  [/&/g, "&amp;"],
  [/</g, "&lt;"],
  [/>/g, "&gt;"],
  [/"/g, "&quot;"],
  [/'/g, "&apos;"],
];

const xmlUnentities: [RegExp, string][] = [
  [/&apos;/g, "'"],
  [/&quot;/g, '"'],
  [/&gt;/g, ">"],
  [/&lt;/g, "<"],
  [/&amp;/g, "&"],
];

function xmlEscape(str: string): string {
  let result = str;
  for (const [re, rep] of xmlEntities) result = result.replace(re, rep);
  return result;
}

function xmlUnescape(str: string): string {
  let result = str;
  for (const [re, rep] of xmlUnentities) result = result.replace(re, rep);
  return result;
}

const SAMPLE_TEXT = `The formula is: x < 10 && y > 5
Price: $29.99 (use "code" for 10% off)
Company: AT&T's "New" <Premium> Plan
HTML example: <div class="test">Hello & welcome</div>`;

export default function XmlEscapeTool() {
  const [text, setText] = useState("");
  const [escaped, setEscaped] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleTextChange = (value: string) => {
    setText(value);
    if (!value) { setEscaped(""); return; }
    setEscaped(xmlEscape(value));
  };

  const handleEscapedChange = (value: string) => {
    setEscaped(value);
    if (!value) { setText(""); return; }
    setText(xmlUnescape(value));
  };

  const handleCopy = async (field: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleClear = () => { setText(""); setEscaped(""); };

  const handleSample = () => { handleTextChange(SAMPLE_TEXT); };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-brand-400">
          Text ↔ XML Escaped
        </div>
        {!text && !escaped && (
          <button onClick={handleSample} className="btn-ghost text-brand-400 hover:text-brand-300">Sample</button>
        )}
        {(text || escaped) && (
          <button onClick={handleClear} className="btn-ghost text-red-400 hover:text-red-300">Clear</button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="panel-label">Unescaped Text</span>
            {text && (
              <button onClick={() => handleCopy("text", text)} className="btn-ghost text-xs">
                {copiedField === "text" ? "✓ Copied!" : "Copy"}
              </button>
            )}
          </div>
          <textarea className="editor-textarea" placeholder="Type or paste text with XML special characters…" value={text} onChange={(e) => handleTextChange(e.target.value)} spellCheck={false} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="panel-label">XML Escaped</span>
            {escaped && (
              <button onClick={() => handleCopy("escaped", escaped)} className="btn-ghost text-xs">
                {copiedField === "escaped" ? "✓ Copied!" : "Copy"}
              </button>
            )}
          </div>
          <textarea className="editor-textarea" placeholder="Type or paste XML with entities to unescape…" value={escaped} onChange={(e) => handleEscapedChange(e.target.value)} spellCheck={false} />
        </div>
      </div>

      <details className="text-sm">
        <summary className="text-slate-400 cursor-pointer hover:text-slate-300 select-none">XML Entity Reference</summary>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs font-mono">
          {([["&", "&amp;"], ["<", "&lt;"], [">", "&gt;"], ['"', "&quot;"], ["'", "&apos;"]] as const).map(([char, entity]) => (
            <div key={entity} className="flex items-center gap-2 bg-slate-800 rounded px-3 py-2">
              <span className="text-slate-200 w-4">{char}</span>
              <span className="text-slate-500">{entity}</span>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
