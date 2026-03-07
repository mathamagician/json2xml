"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { jsonToXml, xmlToJson, detectFormat, outputFilename, type Format } from "@/lib/converter";

type Direction = "json-to-xml" | "xml-to-json";

function formatLabel(f: Format) {
  return f.toUpperCase();
}

export default function Converter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [direction, setDirection] = useState<Direction>("json-to-xml");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sourceFormat: Format = direction === "json-to-xml" ? "json" : "xml";
  const targetFormat: Format = direction === "json-to-xml" ? "xml" : "json";

  const convert = useCallback(
    (text: string, dir: Direction) => {
      if (!text.trim()) {
        setOutput("");
        setError(null);
        return;
      }
      try {
        const result =
          dir === "json-to-xml" ? jsonToXml(text) : xmlToJson(text);
        setOutput(result);
        setError(null);
      } catch (e) {
        setError((e as Error).message);
        setOutput("");
      }
    },
    []
  );

  // Re-convert whenever direction changes (if there's input)
  useEffect(() => {
    if (input.trim()) convert(input, direction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction]);

  const handleInputChange = (text: string) => {
    setInput(text);
    convert(text, direction);
  };

  const handleFlip = () => {
    // Swap input/output and reverse direction
    const newDir: Direction =
      direction === "json-to-xml" ? "xml-to-json" : "json-to-xml";
    setInput(output);
    setDirection(newDir);
    // convert will fire via useEffect
  };

  const handleAutoDetect = () => {
    const detected = detectFormat(input);
    if (!detected) return;
    const newDir: Direction =
      detected === "json" ? "json-to-xml" : "xml-to-json";
    setDirection(newDir);
  };

  const handleFile = (file: File) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = (e.target?.result as string) ?? "";
      // Auto-detect direction from file extension
      if (file.name.endsWith(".json")) setDirection("json-to-xml");
      else if (file.name.endsWith(".xml")) setDirection("xml-to-json");
      setInput(text);
      convert(text, direction);
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
    [direction]
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = outputFilename(fileName ?? "converted", targetFormat);
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
    setFileName(null);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Direction controls */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex rounded-lg border border-slate-700 overflow-hidden">
          <button
            onClick={() => setDirection("json-to-xml")}
            className={`px-4 py-2 text-sm font-semibold transition-colors ${
              direction === "json-to-xml"
                ? "bg-brand-600 text-white"
                : "bg-slate-900 text-slate-400 hover:text-slate-100"
            }`}
          >
            JSON → XML
          </button>
          <button
            onClick={() => setDirection("xml-to-json")}
            className={`px-4 py-2 text-sm font-semibold transition-colors ${
              direction === "xml-to-json"
                ? "bg-brand-600 text-white"
                : "bg-slate-900 text-slate-400 hover:text-slate-100"
            }`}
          >
            XML → JSON
          </button>
        </div>

        <button
          onClick={handleAutoDetect}
          disabled={!input.trim()}
          className="btn-ghost"
          title="Auto-detect format from your input"
        >
          Auto-detect
        </button>

        <button
          onClick={handleFlip}
          disabled={!output.trim()}
          className="btn-ghost"
          title="Swap input and output"
        >
          ⇄ Flip
        </button>

        {input && (
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
            <span className="panel-label">{formatLabel(sourceFormat)} Input</span>
            <div className="flex items-center gap-2">
              {fileName && (
                <span className="text-xs text-slate-500 truncate max-w-[160px]">{fileName}</span>
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
                accept=".json,.xml,.txt"
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
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <textarea
              className="editor-textarea"
              placeholder={`Paste your ${formatLabel(sourceFormat)} here, or drag & drop a file…`}
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
            <span className="panel-label">{formatLabel(targetFormat)} Output</span>
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
              placeholder="Output will appear here…"
              value={error ? "" : output}
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
        </div>
      </div>
    </div>
  );
}
