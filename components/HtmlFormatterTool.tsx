"use client";

import { useState, useCallback, useRef } from "react";
import InputStats from "@/components/InputStats";

function formatHtml(input: string, indent: number = 2): string {
  const tab = " ".repeat(indent);
  let level = 0;

  // Void elements that don't have closing tags
  const voidElements = new Set(["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"]);
  // Inline elements that shouldn't add newlines
  const inlineElements = new Set(["a","abbr","b","bdi","bdo","br","cite","code","data","dfn","em","i","kbd","mark","q","rp","rt","ruby","s","samp","small","span","strong","sub","sup","time","u","var","wbr"]);

  // Normalize input
  const html = input.trim();

  // Tokenize: split into tags and text
  const tokens: string[] = [];
  let current = "";
  let inTag = false;

  for (let i = 0; i < html.length; i++) {
    const ch = html[i];
    if (ch === "<" && !inTag) {
      if (current.trim()) tokens.push(current);
      current = "<";
      inTag = true;
    } else if (ch === ">" && inTag) {
      current += ">";
      tokens.push(current);
      current = "";
      inTag = false;
    } else {
      current += ch;
    }
  }
  if (current.trim()) tokens.push(current);

  const lines: string[] = [];

  for (const token of tokens) {
    if (token.startsWith("</")) {
      // Closing tag
      level = Math.max(0, level - 1);
      lines.push(tab.repeat(level) + token);
    } else if (token.startsWith("<!--")) {
      // Comment
      lines.push(tab.repeat(level) + token);
    } else if (token.startsWith("<!") || token.startsWith("<?")) {
      // Doctype or processing instruction
      lines.push(tab.repeat(level) + token);
    } else if (token.startsWith("<")) {
      // Opening or self-closing tag
      const tagMatch = token.match(/^<\/?([a-zA-Z][a-zA-Z0-9-]*)/);
      const tagName = tagMatch ? tagMatch[1].toLowerCase() : "";
      const isSelfClosing = token.endsWith("/>") || voidElements.has(tagName);

      lines.push(tab.repeat(level) + token);

      if (!isSelfClosing && !inlineElements.has(tagName)) {
        level++;
      }
    } else {
      // Text content
      lines.push(tab.repeat(level) + token.trim());
    }
  }

  return lines.filter(l => l.trim()).join("\n");
}

function minifyHtml(input: string): string {
  return input
    .replace(/\n/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/>\s+</g, "><")
    .trim();
}

const SAMPLE_HTML = `<!DOCTYPE html><html><head><title>Hello</title></head><body><div class="container"><h1>Hello World</h1><p>This is a <strong>sample</strong> HTML document.</p><ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul></div></body></html>`;

export default function HtmlFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [indent, setIndent] = useState(2);
  const [mode, setMode] = useState<"format" | "minify">("format");
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const doFormat = useCallback((text: string, m: "format" | "minify", ind: number) => {
    if (!text.trim()) { setOutput(""); setError(null); return; }
    try {
      setOutput(m === "format" ? formatHtml(text, ind) : minifyHtml(text));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }, []);

  const handleInputChange = (text: string) => {
    setInput(text);
    doFormat(text, mode, indent);
  };

  const handleModeChange = (m: "format" | "minify") => {
    setMode(m);
    doFormat(input, m, indent);
  };

  const handleIndentChange = (ind: number) => {
    setIndent(ind);
    doFormat(input, mode, ind);
  };

  const handleFile = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = (e.target?.result as string) ?? "";
      setInput(text);
      doFormat(text, mode, indent);
    };
    reader.readAsText(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, indent]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const name = fileName ? fileName.replace(/\.[^.]+$/, ".html") : "formatted.html";
    const blob = new Blob([output], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = name; a.click();
    URL.revokeObjectURL(url);
  };

  const handleSample = () => {
    setInput(SAMPLE_HTML);
    doFormat(SAMPLE_HTML, mode, indent);
  };

  const handleClear = () => { setInput(""); setOutput(""); setError(null); setFileName(null); };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-brand-400">
          HTML {mode === "format" ? "Format" : "Minify"}
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900 p-0.5">
          <button onClick={() => handleModeChange("format")} className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${mode === "format" ? "bg-brand-600 text-white" : "text-slate-400 hover:text-slate-200"}`}>Format</button>
          <button onClick={() => handleModeChange("minify")} className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${mode === "minify" ? "bg-brand-600 text-white" : "text-slate-400 hover:text-slate-200"}`}>Minify</button>
        </div>
        {mode === "format" && (
          <select value={indent} onChange={(e) => handleIndentChange(Number(e.target.value))} className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-300">
            <option value={2}>2 spaces</option>
            <option value={4}>4 spaces</option>
            <option value={1}>1 tab</option>
          </select>
        )}
        {!input && !fileName && (
          <button onClick={handleSample} className="btn-ghost text-brand-400 hover:text-brand-300">Sample</button>
        )}
        {(input || fileName) && (
          <button onClick={handleClear} className="btn-ghost text-red-400 hover:text-red-300">Clear</button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="panel-label">HTML Input</span>
            <div className="flex items-center gap-2">
              {fileName && <span className="text-xs text-slate-500 truncate max-w-[200px]">{fileName}</span>}
              <button onClick={() => fileInputRef.current?.click()} className="btn-ghost text-xs">Upload file</button>
              <input ref={fileInputRef} type="file" accept=".html,.htm,.txt" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
            </div>
          </div>
          <div className={`relative rounded-lg transition-colors ${isDragging ? "ring-2 ring-brand-500 bg-brand-50/5" : ""}`} onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onDrop={handleDrop}>
            <textarea className="editor-textarea" placeholder="Paste your HTML here, or drag & drop a file…" value={input} onChange={(e) => handleInputChange(e.target.value)} spellCheck={false} />
            {isDragging && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 rounded-lg pointer-events-none">
                <p className="text-brand-400 font-semibold">Drop file here</p>
              </div>
            )}
          </div>
          <InputStats text={input} />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="panel-label">Output</span>
            {output && (
              <div className="flex items-center gap-2">
                <button onClick={handleCopy} className="btn-ghost text-xs">{copied ? "✓ Copied!" : "Copy"}</button>
                <button onClick={handleDownload} className="btn-ghost text-xs">Download</button>
              </div>
            )}
          </div>
          <div className="relative">
            <textarea className="editor-textarea" placeholder="Output will appear here…" value={error ? "" : output} readOnly spellCheck={false} />
            {error && (
              <div className="absolute inset-0 flex items-start p-4 bg-red-950/40 rounded-lg border border-red-800">
                <div>
                  <p className="text-red-400 font-semibold text-sm mb-1">Format error</p>
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
