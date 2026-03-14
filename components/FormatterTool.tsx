"use client";

import { useState, useCallback, useRef } from "react";
import { formatJson, minifyJson, formatXml, minifyXml, formatYaml, minifyYaml } from "@/lib/formatter";

type Format = "json" | "xml" | "yaml";
type IndentOption = "2" | "4" | "tab";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getIndent(option: IndentOption): number | string {
  if (option === "tab") return "\t";
  return parseInt(option);
}

export default function FormatterTool({
  format,
  defaultMinify = false,
}: {
  format: Format;
  defaultMinify?: boolean;
}) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [indent, setIndent] = useState<IndentOption>("2");
  const [minify, setMinify] = useState(defaultMinify);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const label = format.toUpperCase();

  const doFormat = useCallback(
    (text: string, shouldMinify: boolean, indentOpt: IndentOption) => {
      if (!text.trim()) {
        setOutput("");
        setError(null);
        return;
      }
      try {
        let result: string;
        if (shouldMinify) {
          result = format === "json" ? minifyJson(text) : format === "xml" ? minifyXml(text) : minifyYaml(text);
        } else {
          const ind = getIndent(indentOpt);
          result =
            format === "json"
              ? formatJson(text, ind)
              : format === "xml"
              ? formatXml(text, typeof ind === "number" ? ind : 2)
              : formatYaml(text, typeof ind === "number" ? ind : 2);
        }
        setOutput(result);
        setError(null);
      } catch (e) {
        setError((e as Error).message);
        setOutput("");
      }
    },
    [format]
  );

  const handleInputChange = (text: string) => {
    setInput(text);
    doFormat(text, minify, indent);
  };

  const handleIndentChange = (opt: IndentOption) => {
    setIndent(opt);
    if (!minify) doFormat(input, false, opt);
  };

  const handleMinifyToggle = () => {
    const next = !minify;
    setMinify(next);
    doFormat(input, next, indent);
  };

  const handleFile = (file: File) => {
    setFileName(file.name);
    setFileSize(file.size);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = (e.target?.result as string) ?? "";
      setInput(text);
      doFormat(text, minify, indent);
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
    [minify, indent]
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = format === "json" ? "json" : format === "xml" ? "xml" : "yaml";
    const name = fileName
      ? fileName.replace(/\.[^.]+$/, `.formatted.${ext}`)
      : `formatted.${ext}`;
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
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
        {/* Indent selector */}
        <div className="flex rounded-lg border border-slate-700 overflow-hidden">
          {(["2", "4", "tab"] as IndentOption[]).map((opt) => (
            <button
              key={opt}
              onClick={() => handleIndentChange(opt)}
              className={`px-3 py-2 text-sm font-semibold transition-colors ${
                indent === opt && !minify
                  ? "bg-brand-600 text-white"
                  : "bg-slate-900 text-slate-400 hover:text-slate-100"
              }`}
            >
              {opt === "tab" ? "Tab" : `${opt} spaces`}
            </button>
          ))}
        </div>

        <button
          onClick={handleMinifyToggle}
          className={`px-4 py-2 text-sm font-semibold rounded-lg border transition-colors ${
            minify
              ? "bg-brand-600 text-white border-brand-600"
              : "bg-slate-900 text-slate-400 border-slate-700 hover:text-slate-100"
          }`}
        >
          Minify
        </button>

        {(input || fileName) && (
          <button onClick={handleClear} className="btn-ghost text-red-400 hover:text-red-300">
            Clear
          </button>
        )}
      </div>

      {/* Two-panel editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input panel */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="panel-label">{label} Input</span>
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
                accept={format === "json" ? ".json,.txt" : format === "xml" ? ".xml,.txt" : ".yaml,.yml,.txt"}
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
              placeholder={`Paste your ${label} here, or drag & drop a file…`}
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

        {/* Output panel */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="panel-label">
              {minify ? "Minified" : "Formatted"} {label}
            </span>
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
              placeholder="Output will appear here…"
              value={error ? "" : output}
              readOnly
              spellCheck={false}
            />

            {/* Error overlay */}
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
