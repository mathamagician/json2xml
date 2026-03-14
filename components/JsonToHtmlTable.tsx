"use client";

import { useState, useCallback, useRef } from "react";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function jsonToHtmlTable(jsonText: string): { html: string; preview: string } {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error("Invalid JSON — please check your input.");
  }

  if (!Array.isArray(parsed)) {
    throw new Error("JSON must be an array of objects. Example: [{\"name\": \"Alice\", \"age\": 30}]");
  }

  if (parsed.length === 0) {
    throw new Error("JSON array is empty — nothing to convert.");
  }

  // Collect all keys across all objects
  const keys = new Set<string>();
  for (const item of parsed) {
    if (item && typeof item === "object" && !Array.isArray(item)) {
      Object.keys(item as Record<string, unknown>).forEach((k) => keys.add(k));
    }
  }

  if (keys.size === 0) {
    throw new Error("No object keys found — array items must be objects.");
  }

  const headers = Array.from(keys);

  const headerHtml = headers.map((h) => `    <th>${escapeHtml(h)}</th>`).join("\n");
  const rowsHtml = parsed.map((item) => {
    const obj = (item && typeof item === "object" ? item : {}) as Record<string, unknown>;
    const cells = headers.map((h) => {
      const val = obj[h];
      const display = val === null || val === undefined
        ? ""
        : typeof val === "object"
        ? escapeHtml(JSON.stringify(val))
        : escapeHtml(String(val));
      return `    <td>${display}</td>`;
    });
    return `  <tr>\n${cells.join("\n")}\n  </tr>`;
  });

  const html = `<table>\n  <thead>\n  <tr>\n${headerHtml}\n  </tr>\n  </thead>\n  <tbody>\n${rowsHtml.join("\n")}\n  </tbody>\n</table>`;

  // Preview with basic styling
  const preview = `<table style="border-collapse:collapse;width:100%;font-size:14px;font-family:monospace;">
  <thead>
  <tr style="background:#1e293b;">
${headers.map((h) => `    <th style="border:1px solid #334155;padding:8px 12px;text-align:left;color:#e2e8f0;">${escapeHtml(h)}</th>`).join("\n")}
  </tr>
  </thead>
  <tbody>
${parsed.map((item, i) => {
    const obj = (item && typeof item === "object" ? item : {}) as Record<string, unknown>;
    const bg = i % 2 === 0 ? "#0f172a" : "#1e293b";
    return `  <tr style="background:${bg};">
${headers.map((h) => {
      const val = obj[h];
      const display = val === null || val === undefined ? "" : typeof val === "object" ? escapeHtml(JSON.stringify(val)) : escapeHtml(String(val));
      return `    <td style="border:1px solid #334155;padding:8px 12px;color:#94a3b8;">${display}</td>`;
    }).join("\n")}
  </tr>`;
  }).join("\n")}
  </tbody>
</table>`;

  return { html, preview };
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export default function JsonToHtmlTable() {
  const [input, setInput] = useState("");
  const [html, setHtml] = useState("");
  const [preview, setPreview] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [showRaw, setShowRaw] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const convert = useCallback((text: string) => {
    if (!text.trim()) {
      setHtml("");
      setPreview("");
      setError(null);
      return;
    }
    try {
      const result = jsonToHtmlTable(text);
      setHtml(result.html);
      setPreview(result.preview);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setHtml("");
      setPreview("");
    }
  }, []);

  const handleInputChange = (text: string) => {
    setInput(text);
    convert(text);
  };

  const handleFile = (file: File) => {
    setFileName(file.name);
    setFileSize(file.size);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = (e.target?.result as string) ?? "";
      setInput(text);
      convert(text);
    };
    reader.readAsText(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const name = fileName ? fileName.replace(/\.[^.]+$/, ".html") : "table.html";
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput("");
    setHtml("");
    setPreview("");
    setError(null);
    setFileName(null);
    setFileSize(null);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-brand-400">
          JSON → HTML Table
        </div>

        {html && (
          <div className="flex rounded-lg border border-slate-700 overflow-hidden">
            <button
              onClick={() => setShowRaw(false)}
              className={`px-3 py-2 text-sm font-semibold transition-colors ${
                !showRaw ? "bg-brand-600 text-white" : "bg-slate-900 text-slate-400 hover:text-slate-100"
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setShowRaw(true)}
              className={`px-3 py-2 text-sm font-semibold transition-colors ${
                showRaw ? "bg-brand-600 text-white" : "bg-slate-900 text-slate-400 hover:text-slate-100"
              }`}
            >
              Raw HTML
            </button>
          </div>
        )}

        {(input || fileName) && (
          <button onClick={handleClear} className="btn-ghost text-red-400 hover:text-red-300">
            Clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="panel-label">JSON Input</span>
            <div className="flex items-center gap-2">
              {fileName && (
                <span className="text-xs text-slate-500 truncate max-w-[200px]">
                  {fileName}
                  {fileSize !== null && ` · ${formatSize(fileSize)}`}
                </span>
              )}
              <button onClick={() => fileInputRef.current?.click()} className="btn-ghost text-xs">
                Upload file
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,.txt"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
              />
            </div>
          </div>
          <div
            className={`relative rounded-lg transition-colors ${isDragging ? "ring-2 ring-brand-500 bg-brand-50/5" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <textarea
              className="editor-textarea"
              placeholder='Paste a JSON array of objects here, e.g. [{"name": "Alice", "age": 30}]'
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              spellCheck={false}
            />
            {isDragging && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 rounded-lg pointer-events-none">
                <p className="text-brand-400 font-semibold">Drop file here</p>
              </div>
            )}
          </div>
        </div>

        {/* Output */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="panel-label">{showRaw ? "Raw HTML" : "Table Preview"}</span>
            {html && (
              <div className="flex items-center gap-2">
                <button onClick={handleCopy} className="btn-ghost text-xs">
                  {copied ? "✓ Copied!" : "Copy HTML"}
                </button>
                <button onClick={handleDownload} className="btn-ghost text-xs">
                  Download
                </button>
              </div>
            )}
          </div>

          {showRaw ? (
            <div className="relative">
              <textarea
                className="editor-textarea"
                placeholder="HTML output will appear here…"
                value={error ? "" : html}
                readOnly
                spellCheck={false}
              />
              {error && (
                <div className="absolute inset-0 flex items-start p-4 bg-red-950/40 rounded-lg border border-red-800">
                  <div>
                    <p className="text-red-400 font-semibold text-sm mb-1">Conversion error</p>
                    <p className="text-red-300 text-sm font-mono">{error}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-900 rounded-lg border border-slate-800 min-h-[400px] max-h-[600px] overflow-auto p-4">
              {!html && !error && (
                <p className="text-slate-500 text-sm">Paste a JSON array to see the table preview…</p>
              )}
              {error && (
                <div className="flex items-start gap-2">
                  <span className="text-red-400 text-lg">✗</span>
                  <div>
                    <p className="text-red-400 font-semibold text-sm mb-1">Conversion error</p>
                    <p className="text-red-300 text-sm font-mono">{error}</p>
                  </div>
                </div>
              )}
              {html && !error && (
                <div dangerouslySetInnerHTML={{ __html: preview }} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
