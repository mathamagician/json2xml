"use client";

import { useState, useCallback, useRef } from "react";
import { formatSql, dialectLabels, type SqlDialect } from "@/lib/sql";
import InputStats from "@/components/InputStats";

const SAMPLE_SQL = `SELECT u.id, u.name, u.email, o.total FROM users u INNER JOIN orders o ON u.id = o.user_id WHERE u.created_at > '2024-01-01' AND o.status = 'completed' GROUP BY u.id, u.name, u.email, o.total HAVING o.total > 100 ORDER BY o.total DESC LIMIT 50;`;

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type IndentOption = "2" | "4" | "tab";
const dialects: SqlDialect[] = ["sql", "mysql", "postgresql", "tsql", "sqlite"];

export default function SqlFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [indent, setIndent] = useState<IndentOption>("2");
  const [dialect, setDialect] = useState<SqlDialect>("sql");
  const [uppercase, setUppercase] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const doFormat = useCallback(
    (text: string, d: SqlDialect, ind: IndentOption, uc: boolean) => {
      if (!text.trim()) {
        setOutput("");
        setError(null);
        return;
      }
      try {
        const indNum = ind === "tab" ? 4 : parseInt(ind);
        setOutput(formatSql(text, d, indNum, uc));
        setError(null);
      } catch (e) {
        setError((e as Error).message);
        setOutput("");
      }
    },
    []
  );

  const handleInputChange = (text: string) => {
    setInput(text);
    doFormat(text, dialect, indent, uppercase);
  };

  const handleDialectChange = (d: SqlDialect) => {
    setDialect(d);
    doFormat(input, d, indent, uppercase);
  };

  const handleIndentChange = (ind: IndentOption) => {
    setIndent(ind);
    doFormat(input, dialect, ind, uppercase);
  };

  const handleUppercaseToggle = () => {
    const next = !uppercase;
    setUppercase(next);
    doFormat(input, dialect, indent, next);
  };

  const handleFile = (file: File) => {
    setFileName(file.name);
    setFileSize(file.size);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = (e.target?.result as string) ?? "";
      setInput(text);
      doFormat(text, dialect, indent, uppercase);
    };
    reader.readAsText(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialect, indent, uppercase]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const name = fileName ? fileName.replace(/\.[^.]+$/, ".formatted.sql") : "formatted.sql";
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSample = () => {
    setInput(SAMPLE_SQL);
    doFormat(SAMPLE_SQL, dialect, indent, uppercase);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
    setFileName(null);
    setFileSize(null);
  };

  const hasOutput = output.length > 0;

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Dialect selector */}
        <select
          value={dialect}
          onChange={(e) => handleDialectChange(e.target.value as SqlDialect)}
          className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 outline-none focus:border-brand-500"
        >
          {dialects.map((d) => (
            <option key={d} value={d}>
              {dialectLabels[d]}
            </option>
          ))}
        </select>

        {/* Indent selector */}
        <div className="flex rounded-lg border border-slate-700 overflow-hidden">
          {(["2", "4", "tab"] as IndentOption[]).map((opt) => (
            <button
              key={opt}
              onClick={() => handleIndentChange(opt)}
              className={`px-3 py-2 text-sm font-semibold transition-colors ${
                indent === opt
                  ? "bg-brand-600 text-white"
                  : "bg-slate-900 text-slate-400 hover:text-slate-100"
              }`}
            >
              {opt === "tab" ? "Tab" : `${opt} sp`}
            </button>
          ))}
        </div>

        <button
          onClick={handleUppercaseToggle}
          className={`px-4 py-2 text-sm font-semibold rounded-lg border transition-colors ${
            uppercase
              ? "bg-brand-600 text-white border-brand-600"
              : "bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-100"
          }`}
        >
          UPPERCASE
        </button>

        {!input && !fileName && (
          <button onClick={handleSample} className="btn-ghost text-brand-400 hover:text-brand-300">Sample</button>
        )}

        {(input || fileName) && (
          <button onClick={handleClear} className="btn-ghost text-red-400 hover:text-red-300">
            Clear
          </button>
        )}
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="panel-label">SQL Input</span>
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
                accept=".sql,.txt"
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
              placeholder="Paste your SQL here, or drag & drop a file…"
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
          <InputStats text={input} />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="panel-label">Formatted SQL</span>
            {hasOutput && (
              <div className="flex items-center gap-2">
                <button onClick={handleCopy} className="btn-ghost text-xs">
                  {copied ? "✓ Copied!" : "Copy"}
                </button>
                <button onClick={handleDownload} className="btn-ghost text-xs">
                  Download
                </button>
              </div>
            )}
          </div>
          <div className="relative">
            <textarea
              className="editor-textarea"
              placeholder="Formatted SQL will appear here…"
              value={error ? "" : output}
              readOnly
              spellCheck={false}
            />
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
