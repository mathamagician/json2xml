"use client";

import { useState, useCallback, useRef } from "react";
import { validateJson, validateXml, validateYaml, type ValidationResult } from "@/lib/validator";

type Format = "json" | "xml" | "yaml";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ValidatorTool({ format }: { format: Format }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const label = format.toUpperCase();

  const doValidate = useCallback(
    (text: string) => {
      if (!text.trim()) {
        setResult(null);
        return;
      }
      const res = format === "json" ? validateJson(text) : format === "xml" ? validateXml(text) : validateYaml(text);
      setResult(res);
    },
    [format]
  );

  const handleInputChange = (text: string) => {
    setInput(text);
    doValidate(text);
  };

  const handleFile = (file: File) => {
    setFileName(file.name);
    setFileSize(file.size);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = (e.target?.result as string) ?? "";
      setInput(text);
      doValidate(text);
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

  const handleClear = () => {
    setInput("");
    setResult(null);
    setFileName(null);
    setFileSize(null);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Validation status badge */}
        {result && (
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${
              result.valid
                ? "bg-green-950/50 border border-green-700 text-green-400"
                : "bg-red-950/50 border border-red-700 text-red-400"
            }`}
          >
            <span className="text-lg">{result.valid ? "✓" : "✗"}</span>
            <span>{result.valid ? `Valid ${label}` : `Invalid ${label}`}</span>
          </div>
        )}

        {(input || fileName) && (
          <button onClick={handleClear} className="btn-ghost text-red-400 hover:text-red-300">
            Clear
          </button>
        )}
      </div>

      {/* Editor + result panel */}
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

        {/* Result panel */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="panel-label">Validation Result</span>
          </div>

          <div className="editor-textarea flex items-center justify-center">
            {!result && (
              <p className="text-slate-600 text-sm">
                Paste or upload {label} to validate…
              </p>
            )}

            {result?.valid && (
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="text-green-400 text-5xl">✓</div>
                <p className="text-green-400 font-semibold text-lg">Valid {label}</p>
                <p className="text-slate-500 text-sm">
                  Your {label} is well-formed and syntactically correct.
                </p>
              </div>
            )}

            {result && !result.valid && result.error && (
              <div className="flex flex-col items-center gap-3 text-center px-6">
                <div className="text-red-400 text-5xl">✗</div>
                <p className="text-red-400 font-semibold text-lg">Invalid {label}</p>
                <p className="text-red-300 text-sm font-mono leading-relaxed">
                  {result.error.message}
                </p>
                {(result.error.line || result.error.column) && (
                  <p className="text-slate-500 text-xs">
                    {result.error.line && `Line ${result.error.line}`}
                    {result.error.line && result.error.column && ", "}
                    {result.error.column && `Column ${result.error.column}`}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
