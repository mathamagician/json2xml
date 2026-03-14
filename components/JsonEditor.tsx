"use client";

import { useState, useCallback, useRef } from "react";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ─── Tree Node (read-only preview) ──────────────────────────────────────────────

type TreeNodeProps = {
  label: string;
  value: unknown;
  depth: number;
  defaultExpanded: boolean;
};

function TreeNode({ label, value, depth, defaultExpanded }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  if (value === null) {
    return (
      <div className="flex items-baseline gap-1 py-0.5" style={{ paddingLeft: depth * 20 }}>
        <span className="text-slate-300 text-sm font-mono">{label}:</span>
        <span className="text-slate-500 text-sm font-mono italic">null</span>
      </div>
    );
  }

  if (typeof value === "string") {
    return (
      <div className="flex items-baseline gap-1 py-0.5" style={{ paddingLeft: depth * 20 }}>
        <span className="text-slate-300 text-sm font-mono">{label}:</span>
        <span className="text-green-400 text-sm font-mono break-all">&quot;{value}&quot;</span>
      </div>
    );
  }

  if (typeof value === "number") {
    return (
      <div className="flex items-baseline gap-1 py-0.5" style={{ paddingLeft: depth * 20 }}>
        <span className="text-slate-300 text-sm font-mono">{label}:</span>
        <span className="text-amber-400 text-sm font-mono">{String(value)}</span>
      </div>
    );
  }

  if (typeof value === "boolean") {
    return (
      <div className="flex items-baseline gap-1 py-0.5" style={{ paddingLeft: depth * 20 }}>
        <span className="text-slate-300 text-sm font-mono">{label}:</span>
        <span className="text-purple-400 text-sm font-mono">{String(value)}</span>
      </div>
    );
  }

  if (Array.isArray(value)) {
    return (
      <div>
        <div className="flex items-baseline gap-1 py-0.5" style={{ paddingLeft: depth * 20 }}>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-slate-500 hover:text-slate-300 text-xs w-4 flex-shrink-0"
          >
            {expanded ? "▼" : "▶"}
          </button>
          <span className="text-slate-300 text-sm font-mono">{label}:</span>
          <span className="text-slate-500 text-xs font-mono">[{value.length}]</span>
        </div>
        {expanded &&
          value.map((item, i) => (
            <TreeNode key={i} label={String(i)} value={item} depth={depth + 1} defaultExpanded={depth < 1} />
          ))}
      </div>
    );
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    return (
      <div>
        <div className="flex items-baseline gap-1 py-0.5" style={{ paddingLeft: depth * 20 }}>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-slate-500 hover:text-slate-300 text-xs w-4 flex-shrink-0"
          >
            {expanded ? "▼" : "▶"}
          </button>
          <span className="text-slate-300 text-sm font-mono">{label}:</span>
          <span className="text-slate-500 text-xs font-mono">{`{${entries.length}}`}</span>
        </div>
        {expanded &&
          entries.map(([key, val]) => (
            <TreeNode key={key} label={key} value={val} depth={depth + 1} defaultExpanded={depth < 1} />
          ))}
      </div>
    );
  }

  return (
    <div className="flex items-baseline gap-1 py-0.5" style={{ paddingLeft: depth * 20 }}>
      <span className="text-slate-300 text-sm font-mono">{label}:</span>
      <span className="text-slate-400 text-sm font-mono">{String(value)}</span>
    </div>
  );
}

const SAMPLE_JSON = `{
  "company": "Acme Corp",
  "employees": [
    {
      "name": "Alice",
      "role": "Engineer",
      "skills": ["TypeScript", "React", "Node.js"]
    },
    {
      "name": "Bob",
      "role": "Designer",
      "skills": ["Figma", "CSS", "Illustration"]
    }
  ],
  "address": {
    "street": "123 Main St",
    "city": "Portland",
    "state": "OR"
  },
  "founded": 2020,
  "public": false
}`;

// ─── JSON Editor Component ──────────────────────────────────────────────────────

type IndentOption = "2" | "4" | "tab";

export default function JsonEditor() {
  const [input, setInput] = useState("");
  const [parsed, setParsed] = useState<unknown>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [indent, setIndent] = useState<IndentOption>("2");
  const [treeKey, setTreeKey] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const parse = useCallback((text: string) => {
    if (!text.trim()) {
      setParsed(undefined);
      setError(null);
      return;
    }
    try {
      setParsed(JSON.parse(text));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    }
  }, []);

  const handleInputChange = (text: string) => {
    setInput(text);
    parse(text);
  };

  const handleFormat = () => {
    if (parsed === undefined) return;
    const ind = indent === "tab" ? "\t" : parseInt(indent);
    const formatted = JSON.stringify(parsed, null, ind);
    setInput(formatted);
    setTreeKey((k) => k + 1);
  };

  const handleMinify = () => {
    if (parsed === undefined) return;
    const minified = JSON.stringify(parsed);
    setInput(minified);
    setTreeKey((k) => k + 1);
  };

  const handleFile = (file: File) => {
    setFileName(file.name);
    setFileSize(file.size);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = (e.target?.result as string) ?? "";
      setInput(text);
      parse(text);
    };
    reader.readAsText(file);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const name = fileName
      ? fileName.replace(/\.[^.]+$/, ".edited.json")
      : "edited.json";
    const blob = new Blob([input], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSample = () => {
    setInput(SAMPLE_JSON);
    parse(SAMPLE_JSON);
  };

  const handleClear = () => {
    setInput("");
    setParsed(undefined);
    setError(null);
    setFileName(null);
    setFileSize(null);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Indent selector */}
        <div className="flex rounded-lg border border-slate-700 overflow-hidden">
          {(["2", "4", "tab"] as IndentOption[]).map((opt) => (
            <button
              key={opt}
              onClick={() => setIndent(opt)}
              className={`px-3 py-2 text-sm font-semibold transition-colors ${
                indent === opt
                  ? "bg-brand-600 text-white"
                  : "bg-slate-900 text-slate-400 hover:text-slate-100"
              }`}
            >
              {opt === "tab" ? "Tab" : `${opt} spaces`}
            </button>
          ))}
        </div>

        <button
          onClick={handleFormat}
          disabled={parsed === undefined}
          className="btn-ghost text-xs disabled:opacity-40"
        >
          Format
        </button>

        <button
          onClick={handleMinify}
          disabled={parsed === undefined}
          className="btn-ghost text-xs disabled:opacity-40"
        >
          Minify
        </button>

        {input && (
          <>
            <button onClick={handleCopy} className="btn-ghost text-xs">
              {copied ? "✓ Copied!" : "Copy"}
            </button>
            <button onClick={handleDownload} className="btn-ghost text-xs">
              Download
            </button>
          </>
        )}

        {!input && !fileName && (
          <button onClick={handleSample} className="btn-ghost text-brand-400 hover:text-brand-300">
            Sample
          </button>
        )}

        {(input || fileName) && (
          <button onClick={handleClear} className="btn-ghost text-red-400 hover:text-red-300">
            Clear
          </button>
        )}
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Editor panel */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="panel-label">JSON Editor</span>
            <div className="flex items-center gap-2">
              {fileName && (
                <span className="text-xs text-slate-500 truncate max-w-[200px]">
                  {fileName}
                  {fileSize !== null && ` · ${formatSize(fileSize)}`}
                </span>
              )}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-ghost text-xs"
              >
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
            className={`relative rounded-lg transition-colors ${
              isDragging ? "ring-2 ring-brand-500 bg-brand-50/5" : ""
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <textarea
              className="editor-textarea"
              placeholder="Paste or type your JSON here, or drag & drop a file…"
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

          {/* Validation status */}
          {input.trim() && (
            <div className="flex items-center gap-2 text-xs">
              {error ? (
                <>
                  <span className="text-red-400">✗</span>
                  <span className="text-red-300 font-mono">{error}</span>
                </>
              ) : (
                <>
                  <span className="text-green-400">✓</span>
                  <span className="text-green-300">Valid JSON</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Tree preview panel */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="panel-label">Tree Preview</span>
          </div>

          <div className="bg-slate-900 rounded-lg border border-slate-800 min-h-[400px] max-h-[600px] overflow-auto p-4">
            {parsed === undefined && !error && (
              <p className="text-slate-500 text-sm">Paste or upload JSON to see the tree preview…</p>
            )}

            {parsed === undefined && error && (
              <div className="flex items-start gap-2">
                <span className="text-red-400 text-lg">✗</span>
                <div>
                  <p className="text-red-400 font-semibold text-sm mb-1">Invalid JSON</p>
                  <p className="text-red-300 text-sm font-mono">Fix the error in the editor to see the tree.</p>
                </div>
              </div>
            )}

            {parsed !== undefined && (
              <div key={treeKey}>
                {Array.isArray(parsed) ? (
                  <TreeNode label="root" value={parsed} depth={0} defaultExpanded={true} />
                ) : typeof parsed === "object" && parsed !== null ? (
                  Object.entries(parsed as Record<string, unknown>).map(([key, val]) => (
                    <TreeNode key={key} label={key} value={val} depth={0} defaultExpanded={true} />
                  ))
                ) : (
                  <TreeNode label="value" value={parsed} depth={0} defaultExpanded={true} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
