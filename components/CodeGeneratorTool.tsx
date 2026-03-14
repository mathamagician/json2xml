"use client";

import { useState, useCallback, useRef } from "react";
import { generateCode, type CodeLanguage } from "@/lib/codegen";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const languageLabels: Record<CodeLanguage, string> = {
  typescript: "TypeScript",
  java: "Java",
  csharp: "C#",
  go: "Go",
};

export default function CodeGeneratorTool({ language }: { language: CodeLanguage }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [rootName, setRootName] = useState("Root");
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const label = languageLabels[language];

  const generate = useCallback(
    (text: string, name: string) => {
      if (!text.trim()) {
        setOutput("");
        setError(null);
        return;
      }
      try {
        setOutput(generateCode(text, language, name));
        setError(null);
      } catch (e) {
        setError((e as Error).message);
        setOutput("");
      }
    },
    [language]
  );

  const handleInputChange = (text: string) => {
    setInput(text);
    generate(text, rootName);
  };

  const handleRootNameChange = (name: string) => {
    setRootName(name);
    if (input.trim()) generate(input, name);
  };

  const handleFile = (file: File) => {
    setFileName(file.name);
    setFileSize(file.size);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = (e.target?.result as string) ?? "";
      setInput(text);
      generate(text, rootName);
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
    [rootName]
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const ext = language === "typescript" ? "ts" : language === "java" ? "java" : language === "csharp" ? "cs" : "go";

  const handleDownload = () => {
    const name = fileName
      ? fileName.replace(/\.[^.]+$/, `.${ext}`)
      : `generated.${ext}`;
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
        <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-brand-400">
          JSON → {label}
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400">Root name:</label>
          <input
            type="text"
            value={rootName}
            onChange={(e) => handleRootNameChange(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-md px-3 py-1.5 text-sm text-slate-100 font-mono w-32 outline-none focus:border-brand-500"
            placeholder="Root"
          />
        </div>

        {(input || fileName) && (
          <button onClick={handleClear} className="btn-ghost text-red-400 hover:text-red-300">
            Clear
          </button>
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

        {/* Output panel */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="panel-label">{label} Output</span>
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
              placeholder={`${label} code will appear here…`}
              value={error ? "" : output}
              readOnly
              spellCheck={false}
            />

            {error && (
              <div className="absolute inset-0 flex items-start p-4 bg-red-950/40 rounded-lg border border-red-800">
                <div>
                  <p className="text-red-400 font-semibold text-sm mb-1">Generation error</p>
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
