"use client";

import { useState, useCallback, useRef, useMemo, useEffect } from "react";
import { jsonToYaml, yamlToJson, xmlToYaml, yamlToXml } from "@/lib/yaml";
import { jsonToCsv, csvToJson, csvToXml, xmlToCsv } from "@/lib/csv";
import { markdownToHtml, htmlToMarkdown } from "@/lib/markdown";
import InputStats from "@/components/InputStats";

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

const sampleData: Record<ConversionType, string> = {
  "json-to-yaml": '{\n  "name": "Alice",\n  "age": 30,\n  "hobbies": ["reading", "hiking"],\n  "address": {\n    "city": "Portland",\n    "state": "OR"\n  }\n}',
  "yaml-to-json": 'name: Alice\nage: 30\nhobbies:\n  - reading\n  - hiking\naddress:\n  city: Portland\n  state: OR',
  "xml-to-yaml": '<person>\n  <name>Alice</name>\n  <age>30</age>\n  <city>Portland</city>\n</person>',
  "yaml-to-xml": 'person:\n  name: Alice\n  age: 30\n  city: Portland',
  "json-to-csv": '[{"name":"Alice","age":30,"city":"Portland"},{"name":"Bob","age":25,"city":"Seattle"},{"name":"Carol","age":35,"city":"Denver"}]',
  "csv-to-json": 'name,age,city\nAlice,30,Portland\nBob,25,Seattle\nCarol,35,Denver',
  "csv-to-xml": 'name,age,city\nAlice,30,Portland\nBob,25,Seattle',
  "xml-to-csv": '<people>\n  <person><name>Alice</name><age>30</age><city>Portland</city></person>\n  <person><name>Bob</name><age>25</age><city>Seattle</city></person>\n</people>',
  "markdown-to-html": '# Hello World\n\nThis is a **bold** and *italic* paragraph.\n\n## Features\n\n- Item one\n- Item two\n- Item three\n\n```javascript\nconsole.log("Hello!");\n```',
  "html-to-markdown": '<h1>Hello World</h1>\n<p>This is a <strong>bold</strong> and <em>italic</em> paragraph.</p>\n<h2>Features</h2>\n<ul>\n<li>Item one</li>\n<li>Item two</li>\n</ul>',
};

// Thresholds — same as Converter.tsx
const WORKER_THRESHOLD = 512 * 1024;       // 512 KB — use worker
const FILE_WORKER_THRESHOLD = 5 * 1024 * 1024;  // 5 MB — read file in worker
const TEXTAREA_MAX = 10 * 1024 * 1024;     // 10 MB — download-only output
const SIZE_WARN_BYTES = 50 * 1024 * 1024;  // 50 MB — advisory banner

type Progress = { phase: "reading" | "converting"; percent: number };

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
  const [progress, setProgress] = useState<Progress | null>(null);
  const [hasLargeOutput, setHasLargeOutput] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const workerRef = useRef<Worker | null>(null);
  const requestIdRef = useRef(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const largeOutputRef = useRef<string | null>(null);
  const currentFileRef = useRef<File | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      workerRef.current?.terminate();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const getWorker = useCallback(() => {
    if (!workerRef.current) {
      workerRef.current = new Worker(
        new URL("../lib/simple-converter.worker.ts", import.meta.url)
      );
    }
    return workerRef.current;
  }, []);

  const applyResult = useCallback((result: string | null, err: string | null) => {
    setProgress(null);
    if (err) {
      setError(err);
      setOutput("");
      setHasLargeOutput(false);
      largeOutputRef.current = null;
    } else if (result !== null) {
      setError(null);
      if (result.length > TEXTAREA_MAX) {
        largeOutputRef.current = result;
        setHasLargeOutput(true);
        setOutput("");
      } else {
        setOutput(result);
        setHasLargeOutput(false);
        largeOutputRef.current = null;
      }
    }
  }, []);

  const attachWorkerHandler = useCallback((id: number) => {
    const worker = getWorker();
    worker.onmessage = (e: MessageEvent) => {
      const msg = e.data;
      if (msg.id !== id) return;
      if (msg.type === "progress") {
        setProgress({ phase: msg.phase, percent: msg.percent });
        return;
      }
      applyResult(msg.result, msg.error);
    };
    return worker;
  }, [getWorker, applyResult]);

  // Large file: send File to worker — no main-thread reading
  const convertLargeFile = useCallback((file: File) => {
    setOutput("");
    setError(null);
    setHasLargeOutput(false);
    largeOutputRef.current = null;
    setProgress({ phase: "reading", percent: 0 });
    const id = ++requestIdRef.current;
    const worker = attachWorkerHandler(id);
    worker.postMessage({ type: "convert-file", id, file, conversion });
  }, [attachWorkerHandler, conversion]);

  // Text conversion via worker (for large pasted/typed text)
  const convertViaWorker = useCallback((text: string) => {
    setProgress({ phase: "converting", percent: 0 });
    const id = ++requestIdRef.current;
    const worker = attachWorkerHandler(id);
    worker.postMessage({ type: "convert", id, text, conversion });
  }, [attachWorkerHandler, conversion]);

  // Sync conversion for small text (instant)
  const convertSync = useCallback((text: string) => {
    setProgress(null);
    try {
      const result = convertFn(text);
      setOutput(result);
      setError(null);
      setHasLargeOutput(false);
      largeOutputRef.current = null;
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }, [convertFn]);

  // Main convert dispatcher
  const convert = useCallback((text: string) => {
    if (!text.trim()) {
      setOutput("");
      setError(null);
      setProgress(null);
      setHasLargeOutput(false);
      largeOutputRef.current = null;
      return;
    }
    if (text.length > WORKER_THRESHOLD) {
      convertViaWorker(text);
    } else {
      convertSync(text);
    }
  }, [convertViaWorker, convertSync]);

  const handleInputChange = (text: string) => {
    setInput(text);
    currentFileRef.current = null;
    setFileSize(null);
    setFileName(null);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const delay = text.length > WORKER_THRESHOLD ? 300 : 0;
    debounceRef.current = setTimeout(() => convert(text), delay);
  };

  const handleFile = (file: File) => {
    setFileName(file.name);
    setFileSize(file.size);
    setHasLargeOutput(false);
    largeOutputRef.current = null;

    if (file.size > FILE_WORKER_THRESHOLD) {
      // Large file: read + convert entirely in worker
      currentFileRef.current = file;
      setInput("");
      convertLargeFile(file);
    } else {
      currentFileRef.current = null;
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = (e.target?.result as string) ?? "";
        setInput(text);
        convert(text);
      };
      reader.readAsText(file);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [conversion]
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = largeOutputRef.current ?? output;
    const name = fileName
      ? fileName.replace(/\.[^.]+$/, `.${outputExtension}`)
      : `converted.${outputExtension}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSample = () => {
    handleInputChange(sampleData[conversion]);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
    setFileName(null);
    setFileSize(null);
    setProgress(null);
    setHasLargeOutput(false);
    largeOutputRef.current = null;
    currentFileRef.current = null;
    if (debounceRef.current) clearTimeout(debounceRef.current);
  };

  const isProcessing = progress !== null;
  const hasOutput = output.length > 0 || hasLargeOutput;
  const showFileOverlay = fileSize !== null && fileSize > FILE_WORKER_THRESHOLD;

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-brand-400">
          {inputLabel} → {outputLabel}
        </div>

        {!input && !fileName && (
          <button onClick={handleSample} className="btn-ghost text-brand-400 hover:text-brand-300">Sample</button>
        )}

        {(input || fileName) && (
          <button onClick={handleClear} className="btn-ghost text-red-400 hover:text-red-300">
            Clear
          </button>
        )}
      </div>

      {/* Large file advisory banner */}
      {fileSize !== null && fileSize > SIZE_WARN_BYTES && (
        <div className="flex items-center gap-2 rounded-lg border border-amber-700 bg-amber-950/40 px-4 py-2 text-amber-300 text-sm">
          <span>⚠</span>
          <span>
            Large file ({formatSize(fileSize)}) — conversion runs off the main thread so the page stays responsive.
          </span>
        </div>
      )}

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
            {/* Large file loaded overlay */}
            {showFileOverlay && !isDragging && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 rounded-lg pointer-events-none gap-1">
                <p className="text-slate-300 font-medium text-sm">{fileName}</p>
                <p className="text-slate-500 text-xs">{formatSize(fileSize!)} loaded</p>
              </div>
            )}
            {isDragging && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 rounded-lg pointer-events-none">
                <p className="text-brand-400 font-semibold">Drop file here</p>
              </div>
            )}
          </div>
          <InputStats text={input} />
        </div>

        {/* Output panel */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="panel-label">{outputLabel} Output</span>
            {hasOutput && !isProcessing && (
              <div className="flex items-center gap-2">
                {output && (
                  <button onClick={handleCopy} className="btn-ghost text-xs">
                    {copied ? "✓ Copied!" : "Copy"}
                  </button>
                )}
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

            {/* Progress overlay */}
            {isProcessing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 rounded-lg gap-4 px-8">
                <p className="text-slate-300 text-sm font-medium">
                  {progress.phase === "reading" ? "Reading file…" : "Converting…"}
                </p>
                <div className="w-full max-w-xs flex flex-col gap-2">
                  {progress.phase === "reading" ? (
                    <>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-sky-500 h-2 rounded-full transition-all duration-200"
                          style={{ width: `${progress.percent}%` }}
                        />
                      </div>
                      <p className="text-slate-500 text-xs text-center">{progress.percent}%</p>
                    </>
                  ) : (
                    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div className="h-2 bg-sky-500 rounded-full w-full animate-pulse" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Large output: download-only */}
            {hasLargeOutput && !isProcessing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 rounded-lg gap-3">
                <div className="text-sky-400 text-3xl">✓</div>
                <p className="text-slate-200 font-semibold text-sm">Conversion complete</p>
                <p className="text-slate-400 text-xs">Output is too large to preview</p>
                <button onClick={handleDownload} className="btn-primary text-sm mt-1">
                  Download {outputLabel}
                </button>
              </div>
            )}

            {/* Error overlay */}
            {!isProcessing && error && (
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
