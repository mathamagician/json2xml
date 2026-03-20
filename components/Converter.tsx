"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { jsonToXml, xmlToJson, detectFormat, outputFilename, type Format } from "@/lib/converter";
import InputStats from "@/components/InputStats";

type Direction = "json-to-xml" | "xml-to-json";

// Thresholds
const WORKER_THRESHOLD = 512 * 1024;             // 512 KB — use worker for typed/pasted text
const FILE_WORKER_THRESHOLD = 5 * 1024 * 1024;   // 5 MB — read file in worker, don't touch main thread
const TEXTAREA_MAX = 10 * 1024 * 1024;            // 10 MB — don't render output in textarea, show download-only
const SIZE_WARN_BYTES = 200 * 1024 * 1024;        // 200 MB — show advisory banner
const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024;    // 2 GB — hard cap

type Progress = { phase: "reading" | "converting"; percent: number; loaded?: number; total?: number };

const SAMPLE_JSON = `{
  "store": {
    "name": "Book Haven",
    "location": { "city": "Portland", "state": "OR" },
    "books": [
      { "title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "year": 1925, "price": 12.99 },
      { "title": "To Kill a Mockingbird", "author": "Harper Lee", "year": 1960, "price": 14.99 }
    ],
    "open": true
  }
}`;

function formatLabel(f: Format) {
  return f.toUpperCase();
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function Converter({ initialDirection = "json-to-xml" as Direction }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [direction, setDirection] = useState<Direction>(initialDirection);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [hasLargeOutput, setHasLargeOutput] = useState(false);
  const [conversionWarning, setConversionWarning] = useState<string | null>(null);
  const [streamStats, setStreamStats] = useState<{ processed: number; skipped: number } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const workerRef = useRef<Worker | null>(null);
  const requestIdRef = useRef(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const largeOutputRef = useRef<string | null>(null);
  const blobUrlRef = useRef<string | null>(null); // for streaming large-file output
  // Hold File ref for large files so direction-change can re-convert
  const currentFileRef = useRef<File | null>(null);

  const sourceFormat: Format = direction === "json-to-xml" ? "json" : "xml";
  const targetFormat: Format = direction === "json-to-xml" ? "xml" : "json";

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      workerRef.current?.terminate();
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
    };
  }, []);

  const getWorker = useCallback(() => {
    if (!workerRef.current) {
      workerRef.current = new Worker(
        new URL("../lib/converter.worker.ts", import.meta.url)
      );
    }
    return workerRef.current;
  }, []);

  // Apply worker result — shared by both conversion paths
  const applyResult = useCallback((result: string | null, err: string | null) => {
    setProgress(null);
    setConversionWarning(null);
    setStreamStats(null);
    if (err) {
      setError(err);
      setOutput("");
      setHasLargeOutput(false);
      largeOutputRef.current = null;
    } else if (result !== null) {
      setError(null);
      if (result.length > TEXTAREA_MAX) {
        // Too large for textarea — store in ref, show download-only overlay
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

  // Wire up worker message handler with current request id
  const attachWorkerHandler = useCallback((id: number) => {
    const worker = getWorker();
    worker.onmessage = (e: MessageEvent) => {
      const msg = e.data;
      if (msg.id !== id) return; // stale response
      if (msg.type === "progress") {
        setProgress({ phase: msg.phase, percent: msg.percent, loaded: msg.loaded, total: msg.total });
        return;
      }
      if (msg.type === "warning") {
        setConversionWarning(
          msg.dataError
            ? "Data errors detected — attempting partial conversion via streaming…"
            : "Output too large for direct render — switching to streaming download…"
        );
        return;
      }
      if (msg.type === "result-blob-url") {
        // Streaming large-file result — output is a Blob URL for direct download
        if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = msg.url ?? null;
        setProgress(null);
        setConversionWarning(null);
        if (msg.error) {
          setError(msg.error);
          setHasLargeOutput(false);
          setStreamStats(null);
        } else {
          setError(null);
          setHasLargeOutput(true);
          setOutput("");
          largeOutputRef.current = null;
          setStreamStats(
            msg.processed !== undefined
              ? { processed: msg.processed, skipped: msg.skipped ?? 0 }
              : null
          );
        }
        return;
      }
      applyResult(msg.result, msg.error);
    };
    return worker;
  }, [getWorker, applyResult]);

  // Large file: send File object to worker — no main-thread reading, no textarea population
  const convertLargeFile = useCallback((file: File, dir: Direction) => {
    setOutput("");
    setError(null);
    setHasLargeOutput(false);
    largeOutputRef.current = null;
    setProgress({ phase: "reading", percent: 0 });
    const id = ++requestIdRef.current;
    const worker = attachWorkerHandler(id);
    worker.postMessage({ type: "convert-file", id, file, direction: dir });
  }, [attachWorkerHandler]);

  // Text conversion via worker (for large pasted/typed text)
  const convertViaWorker = useCallback((text: string, dir: Direction) => {
    setProgress({ phase: "converting", percent: 0 });
    const id = ++requestIdRef.current;
    const worker = attachWorkerHandler(id);
    worker.postMessage({ type: "convert", id, text, direction: dir });
  }, [attachWorkerHandler]);

  // Sync conversion for small text (instant, no spinner)
  const convertSync = useCallback((text: string, dir: Direction) => {
    setProgress(null);
    try {
      const result = dir === "json-to-xml" ? jsonToXml(text) : xmlToJson(text);
      setOutput(result);
      setError(null);
      setHasLargeOutput(false);
      largeOutputRef.current = null;
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }, []);

  // Main convert dispatcher for text input
  const convert = useCallback((text: string, dir: Direction) => {
    if (!text.trim()) {
      setOutput("");
      setError(null);
      setProgress(null);
      setHasLargeOutput(false);
      largeOutputRef.current = null;
      return;
    }
    if (text.length > WORKER_THRESHOLD) {
      convertViaWorker(text, dir);
    } else {
      convertSync(text, dir);
    }
  }, [convertViaWorker, convertSync]);

  // Re-convert on direction change
  useEffect(() => {
    if (currentFileRef.current && currentFileRef.current.size > FILE_WORKER_THRESHOLD) {
      convertLargeFile(currentFileRef.current, direction);
    } else if (input.trim()) {
      convert(input, direction);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction]);

  const handleInputChange = (text: string) => {
    setInput(text);
    // User is typing — clear any file context
    currentFileRef.current = null;
    setFileSize(null);
    setFileName(null);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    const delay = text.length > WORKER_THRESHOLD ? 300 : 0;
    debounceRef.current = setTimeout(() => convert(text, direction), delay);
  };

  const handleFlip = () => {
    const newDir: Direction = direction === "json-to-xml" ? "xml-to-json" : "json-to-xml";
    setInput(output);
    currentFileRef.current = null;
    setDirection(newDir);
  };

  const handleAutoDetect = () => {
    const detected = detectFormat(input);
    if (!detected) return;
    setDirection(detected === "json" ? "json-to-xml" : "xml-to-json");
  };

  const handleFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      setError("File too large. Maximum supported size is 2 GB.");
      return;
    }
    setFileName(file.name);
    setFileSize(file.size);
    setHasLargeOutput(false);
    largeOutputRef.current = null;
    if (blobUrlRef.current) { URL.revokeObjectURL(blobUrlRef.current); blobUrlRef.current = null; }

    const newDir: Direction = file.name.endsWith(".json")
      ? "json-to-xml"
      : file.name.endsWith(".xml")
      ? "xml-to-json"
      : direction;
    if (newDir !== direction) setDirection(newDir);

    if (file.size > FILE_WORKER_THRESHOLD) {
      // Large file: keep textarea empty, read + convert entirely in worker
      currentFileRef.current = file;
      setInput("");
      convertLargeFile(file, newDir);
    } else {
      currentFileRef.current = null;
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = (e.target?.result as string) ?? "";
        setInput(text);
        convert(text, newDir);
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
    [direction]
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.download = outputFilename(fileName ?? "converted", targetFormat);
    if (blobUrlRef.current) {
      // Streaming output: use existing blob URL directly
      a.href = blobUrlRef.current;
      a.click();
    } else {
      const content = largeOutputRef.current ?? output;
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      a.href = url;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleSample = () => {
    setDirection("json-to-xml");
    setInput(SAMPLE_JSON);
    currentFileRef.current = null;
    setFileSize(null);
    setFileName(null);
    convertSync(SAMPLE_JSON, "json-to-xml");
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
    if (blobUrlRef.current) { URL.revokeObjectURL(blobUrlRef.current); blobUrlRef.current = null; }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setConversionWarning(null);
    setStreamStats(null);
  };

  const isProcessing = progress !== null;
  const hasOutput = output.length > 0 || hasLargeOutput;
  // Show a "file loaded" overlay on input textarea for large files
  const showFileOverlay = fileSize !== null && fileSize > FILE_WORKER_THRESHOLD;

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

        {!input && !fileName && (
          <button onClick={handleSample} className="btn-ghost text-brand-400 hover:text-brand-300">Sample</button>
        )}

        {(input || fileName) && (
          <button onClick={handleClear} className="btn-ghost text-red-400 hover:text-red-300">
            Clear
          </button>
        )}
      </div>

      {/* Data error / fallback warning banner */}
      {conversionWarning && (
        <div className="flex items-center gap-2 rounded-lg border border-orange-700 bg-orange-950/40 px-4 py-2 text-orange-300 text-sm">
          <span>⚠</span>
          <span>{conversionWarning}</span>
        </div>
      )}

      {/* Large file advisory banner */}
      {fileSize !== null && fileSize > SIZE_WARN_BYTES && (
        <div className="flex items-center gap-2 rounded-lg border border-amber-700 bg-amber-950/40 px-4 py-2 text-amber-300 text-sm">
          <span>⚠</span>
          <span>
            Large file ({formatSize(fileSize)}) — streaming conversion runs off the main thread. Output will download automatically when complete.
          </span>
        </div>
      )}

      {/* Two-panel editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input panel */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="panel-label">{formatLabel(sourceFormat)} Input</span>
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
            {/* Large file loaded — don't render content in textarea */}
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
            <span className="panel-label">{formatLabel(targetFormat)} Output</span>
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

            {/* Progress overlay (reading + converting) */}
            {isProcessing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 rounded-lg gap-4 px-8">
                <p className="text-slate-300 text-sm font-medium">
                  {progress.phase === "reading" ? "Reading file…" : "Converting…"}
                </p>
                <div className="w-full max-w-xs flex flex-col gap-2">
                  {(progress.phase === "reading" || progress.loaded !== undefined) ? (
                    <>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-sky-500 h-2 rounded-full transition-all duration-200"
                          style={{ width: `${progress.percent}%` }}
                        />
                      </div>
                      <p className="text-slate-500 text-xs text-center">
                        {progress.loaded !== undefined && progress.total !== undefined
                          ? `${formatSize(progress.loaded)} of ${formatSize(progress.total)} (${progress.percent}%)`
                          : `${progress.percent}%`}
                      </p>
                    </>
                  ) : (
                    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div className="h-2 bg-sky-500 rounded-full w-full animate-pulse" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Large output: download-only mode (too big to render in textarea) */}
            {hasLargeOutput && !isProcessing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 rounded-lg gap-3 px-6">
                <div className={`text-3xl ${streamStats?.skipped ? "text-amber-400" : "text-sky-400"}`}>
                  {streamStats?.skipped ? "⚠" : "✓"}
                </div>
                <p className="text-slate-200 font-semibold text-sm">Conversion complete</p>
                {streamStats ? (
                  <div className="text-center">
                    <p className="text-slate-300 text-xs">
                      {streamStats.processed.toLocaleString()} records converted
                      {streamStats.skipped > 0 && (
                        <span className="text-amber-400">
                          {" "}· {streamStats.skipped.toLocaleString()} skipped (
                          {((streamStats.skipped / (streamStats.processed + streamStats.skipped)) * 100).toFixed(1)}% parse errors)
                        </span>
                      )}
                    </p>
                  </div>
                ) : (
                  <p className="text-slate-400 text-xs">Output is too large to preview</p>
                )}
                <button onClick={handleDownload} className="btn-primary text-sm mt-1">
                  Download {targetFormat.toUpperCase()}
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
