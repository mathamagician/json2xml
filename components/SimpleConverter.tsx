"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import { jsonToYaml, yamlToJson, xmlToYaml, yamlToXml } from "@/lib/yaml";
import { jsonToCsv, csvToJson, csvToXml, xmlToCsv } from "@/lib/csv";
import { markdownToHtml, htmlToMarkdown } from "@/lib/markdown";

export type ConversionType =
  | "json-to-yaml"
  | "yaml-to-json"
  | "xml-to-yaml"
  | "yaml-to-xml"
  | "json-to-csv"
  | "csv-to-json"
  | "csv-to-xml"
  | "xml-to-csv"
  | "markdown-to-html"
  | "html-to-markdown";

type ConversionConfig = {
  fn: (input: string) => string;
  inputLabel: string;
  outputLabel: string;
  inputAccept: string;
  outputExtension: string;
};

const conversions: Record<ConversionType, ConversionConfig> = {
  "json-to-yaml": { fn: jsonToYaml, inputLabel: "JSON", outputLabel: "YAML", inputAccept: ".json,.txt", outputExtension: "yaml" },
  "yaml-to-json": { fn: yamlToJson, inputLabel: "YAML", outputLabel: "JSON", inputAccept: ".yaml,.yml,.txt", outputExtension: "json" },
  "xml-to-yaml": { fn: xmlToYaml, inputLabel: "XML", outputLabel: "YAML", inputAccept: ".xml,.txt", outputExtension: "yaml" },
  "yaml-to-xml": { fn: yamlToXml, inputLabel: "YAML", outputLabel: "XML", inputAccept: ".yaml,.yml,.txt", outputExtension: "xml" },
  "json-to-csv": { fn: jsonToCsv, inputLabel: "JSON", outputLabel: "CSV", inputAccept: ".json,.txt", outputExtension: "csv" },
  "csv-to-json": { fn: csvToJson, inputLabel: "CSV", outputLabel: "JSON", inputAccept: ".csv,.tsv,.txt", outputExtension: "json" },
  "csv-to-xml": { fn: csvToXml, inputLabel: "CSV", outputLabel: "XML", inputAccept: ".csv,.tsv,.txt", outputExtension: "xml" },
  "xml-to-csv": { fn: xmlToCsv, inputLabel: "XML", outputLabel: "CSV", inputAccept: ".xml,.txt", outputExtension: "csv" },
  "markdown-to-html": { fn: markdownToHtml, inputLabel: "Markdown", outputLabel: "HTML", inputAccept: ".md,.markdown,.txt", outputExtension: "html" },
  "html-to-markdown": { fn: htmlToMarkdown, inputLabel: "HTML", outputLabel: "Markdown", inputAccept: ".html,.htm,.txt", outputExtension: "md" },
};

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function SimpleConverter({ conversion }: { conversion: ConversionType }) {
  const config = useMemo(() => conversions[conversion], [conversion]);
  const { fn: convertFn, inputLabel, outputLabel, inputAccept, outputExtension } = config;

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const convert = useCallback(
    (text: string) => {
      if (!text.trim()) {
        setOutput("");
        setError(null);
        return;
      }
      try {
        setOutput(convertFn(text));
        setError(null);
      } catch (e) {
        setError((e as Error).message);
        setOutput("");
      }
    },
    [convertFn]
  );

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

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [convertFn]
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const name = fileName
      ? fileName.replace(/\.[^.]+$/, `.${outputExtension}`)
      : `converted.${outputExtension}`;
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
          {inputLabel} → {outputLabel}
        </div>

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
            <span className="panel-label">{inputLabel} Input</span>
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
                accept={inputAccept}
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
              placeholder={`Paste your ${inputLabel} here, or drag & drop a file…`}
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
            <span className="panel-label">{outputLabel} Output</span>
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
