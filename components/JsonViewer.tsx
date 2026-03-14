"use client";

import { useState, useCallback, useRef } from "react";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ─── Tree Node ──────────────────────────────────────────────────────────────────

type TreeNodeProps = {
  label: string;
  value: unknown;
  path: string;
  depth: number;
  defaultExpanded: boolean;
  onCopyPath: (path: string) => void;
};

function TreeNode({ label, value, path, depth, defaultExpanded, onCopyPath }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  if (value === null) {
    return (
      <div className="flex items-baseline gap-1 py-0.5" style={{ paddingLeft: depth * 20 }}>
        <button onClick={() => onCopyPath(path)} className="text-slate-300 hover:text-brand-400 text-sm font-mono" title={`Copy path: ${path}`}>
          {label}:
        </button>
        <span className="text-slate-500 text-sm font-mono italic">null</span>
      </div>
    );
  }

  if (typeof value === "string") {
    return (
      <div className="flex items-baseline gap-1 py-0.5" style={{ paddingLeft: depth * 20 }}>
        <button onClick={() => onCopyPath(path)} className="text-slate-300 hover:text-brand-400 text-sm font-mono" title={`Copy path: ${path}`}>
          {label}:
        </button>
        <span className="text-green-400 text-sm font-mono break-all">&quot;{value}&quot;</span>
      </div>
    );
  }

  if (typeof value === "number") {
    return (
      <div className="flex items-baseline gap-1 py-0.5" style={{ paddingLeft: depth * 20 }}>
        <button onClick={() => onCopyPath(path)} className="text-slate-300 hover:text-brand-400 text-sm font-mono" title={`Copy path: ${path}`}>
          {label}:
        </button>
        <span className="text-amber-400 text-sm font-mono">{String(value)}</span>
      </div>
    );
  }

  if (typeof value === "boolean") {
    return (
      <div className="flex items-baseline gap-1 py-0.5" style={{ paddingLeft: depth * 20 }}>
        <button onClick={() => onCopyPath(path)} className="text-slate-300 hover:text-brand-400 text-sm font-mono" title={`Copy path: ${path}`}>
          {label}:
        </button>
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
          <button onClick={() => onCopyPath(path)} className="text-slate-300 hover:text-brand-400 text-sm font-mono" title={`Copy path: ${path}`}>
            {label}:
          </button>
          <span className="text-slate-500 text-xs font-mono">[{value.length}]</span>
        </div>
        {expanded &&
          value.map((item, i) => (
            <TreeNode
              key={i}
              label={String(i)}
              value={item}
              path={`${path}[${i}]`}
              depth={depth + 1}
              defaultExpanded={depth < 1}
              onCopyPath={onCopyPath}
            />
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
          <button onClick={() => onCopyPath(path)} className="text-slate-300 hover:text-brand-400 text-sm font-mono" title={`Copy path: ${path}`}>
            {label}:
          </button>
          <span className="text-slate-500 text-xs font-mono">{`{${entries.length}}`}</span>
        </div>
        {expanded &&
          entries.map(([key, val]) => (
            <TreeNode
              key={key}
              label={key}
              value={val}
              path={path ? `${path}.${key}` : key}
              depth={depth + 1}
              defaultExpanded={depth < 1}
              onCopyPath={onCopyPath}
            />
          ))}
      </div>
    );
  }

  // Fallback for unexpected types
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

// ─── JSON Viewer Component ──────────────────────────────────────────────────────

export default function JsonViewer() {
  const [input, setInput] = useState("");
  const [parsed, setParsed] = useState<unknown>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
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
      setParsed(undefined);
    }
  }, []);

  const handleInputChange = (text: string) => {
    setInput(text);
    parse(text);
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

  const handleCopyPath = async (path: string) => {
    await navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 1500);
  };

  const handleExpandAll = () => {
    // Force re-render tree with all nodes expanded
    setTreeKey((k) => k + 1);
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
        <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-brand-400">
          JSON Viewer
        </div>

        {parsed !== undefined && (
          <button
            onClick={handleExpandAll}
            className="btn-ghost text-xs"
          >
            Reset tree
          </button>
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

        {copiedPath && (
          <span className="text-xs text-green-400">✓ Copied: {copiedPath}</span>
        )}
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input panel */}
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
              placeholder="Paste your JSON here, or drag & drop a file…"
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

        {/* Tree panel */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="panel-label">Tree View</span>
          </div>

          <div className="bg-slate-900 rounded-lg border border-slate-800 min-h-[400px] max-h-[600px] overflow-auto p-4">
            {parsed === undefined && !error && (
              <p className="text-slate-500 text-sm">Paste or upload JSON to see the tree view…</p>
            )}

            {error && (
              <div className="flex items-start gap-2">
                <span className="text-red-400 text-lg">✗</span>
                <div>
                  <p className="text-red-400 font-semibold text-sm mb-1">Invalid JSON</p>
                  <p className="text-red-300 text-sm font-mono">{error}</p>
                </div>
              </div>
            )}

            {parsed !== undefined && !error && (
              <div key={treeKey}>
                {Array.isArray(parsed) ? (
                  <TreeNode
                    label="root"
                    value={parsed}
                    path=""
                    depth={0}
                    defaultExpanded={true}
                    onCopyPath={handleCopyPath}
                  />
                ) : typeof parsed === "object" && parsed !== null ? (
                  Object.entries(parsed as Record<string, unknown>).map(([key, val]) => (
                    <TreeNode
                      key={key}
                      label={key}
                      value={val}
                      path={key}
                      depth={0}
                      defaultExpanded={true}
                      onCopyPath={handleCopyPath}
                    />
                  ))
                ) : (
                  <TreeNode
                    label="value"
                    value={parsed}
                    path=""
                    depth={0}
                    defaultExpanded={true}
                    onCopyPath={handleCopyPath}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
