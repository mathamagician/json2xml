"use client";

import { useState, useRef } from "react";
import { generateJsonSchema } from "@/lib/jsonschema";

const SAMPLE_JSON = `{
  "id": 1,
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00Z",
  "address": {
    "street": "123 Main St",
    "city": "Portland",
    "zip": "97201"
  },
  "tags": ["admin", "user"],
  "score": 95.5
}`;

export default function JsonSchemaGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const generate = (text: string) => {
    if (!text.trim()) {
      setOutput("");
      setError(null);
      return;
    }
    try {
      setOutput(generateJsonSchema(text));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const handleInputChange = (text: string) => {
    setInput(text);
    generate(text);
  };

  const handleFile = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = (e.target?.result as string) ?? "";
      setInput(text);
      generate(text);
    };
    reader.readAsText(file);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const name = fileName
      ? fileName.replace(/\.[^.]+$/, ".schema.json")
      : "schema.json";
    const blob = new Blob([output], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSample = () => {
    setInput(SAMPLE_JSON);
    generate(SAMPLE_JSON);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
    setFileName(null);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-brand-400">
          JSON &rarr; JSON Schema
        </div>
        {!input && !fileName && (
          <button
            onClick={handleSample}
            className="btn-ghost text-brand-400 hover:text-brand-300"
          >
            Sample
          </button>
        )}
        {(input || fileName) && (
          <button
            onClick={handleClear}
            className="btn-ghost text-red-400 hover:text-red-300"
          >
            Clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="panel-label">JSON Input</span>
            <div className="flex items-center gap-2">
              {fileName && (
                <span className="text-xs text-slate-500 truncate max-w-[200px]">
                  {fileName}
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
          <textarea
            className="editor-textarea"
            placeholder="Paste sample JSON here…"
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            spellCheck={false}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="panel-label">JSON Schema</span>
            {output && (
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
              placeholder="Generated JSON Schema will appear here…"
              value={error ? "" : output}
              readOnly
              spellCheck={false}
            />
            {error && (
              <div className="absolute inset-0 flex items-start p-4 bg-red-950/40 rounded-lg border border-red-800">
                <div>
                  <p className="text-red-400 font-semibold text-sm mb-1">
                    Error
                  </p>
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
