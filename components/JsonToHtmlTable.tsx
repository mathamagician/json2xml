"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { jsonToHtmlTable, jsonToPreviewTable } from "@/lib/html-table";

const WORKER_THRESHOLD = 512 * 1024;
const FILE_WORKER_THRESHOLD = 5 * 1024 * 1024;
const TEXTAREA_MAX = 10 * 1024 * 1024;

type Progress = { phase: "reading" | "converting"; percent: number };

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const SAMPLE_JSON = `[
  { "name": "Alice", "role": "Engineer", "department": "Engineering", "salary": 95000 },
  { "name": "Bob", "role": "Designer", "department": "Design", "salary": 85000 },
  { "name": "Carol", "role": "Manager", "department": "Engineering", "salary": 110000 },
  { "name": "Dave", "role": "Analyst", "department": "Data", "salary": 78000 }
]`;

export default function JsonToHtmlTable() {
  const [input, setInput] = useState("");
  const [html, setHtml] = useState("");
  const [preview, setPreview] = useState("");
  const [totalRows, setTotalRows] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [showRaw, setShowRaw] = useState(false);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [hasLargeOutput, setHasLargeOutput] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const workerRef = useRef<Worker | null>(null);
  const requestIdRef = useRef(0);
  const largeHtmlRef = useRef<string | null>(null);
  const currentFileRef = useRef<File | null>(null);

  useEffect(() => {
    return () => { workerRef.current?.terminate(); };
  }, []);

  const getWorker = useCallback(() => {
    if (!workerRef.current) {
      workerRef.current = new Worker(
        new URL("../lib/html-table.worker.ts", import.meta.url)
      );
    }
    return workerRef.current;
  }, []);

  const applyResult = useCallback((resultHtml: string | null, resultPreview: string | null, rows: number, err: string | null) => {
    setProgress(null);
    if (err) {
      setError(err);
      setHtml("");
      setPreview("");
      setTotalRows(0);
      setHasLargeOutput(false);
      largeHtmlRef.current = null;
    } else if (resultHtml !== null) {
      setError(null);
      setTotalRows(rows);
      setPreview(resultPreview ?? "");
      if (resultHtml.length > TEXTAREA_MAX) {
        largeHtmlRef.current = resultHtml;
        setHasLargeOutput(true);
        setHtml("");
      } else {
        setHtml(resultHtml);
        setHasLargeOutput(false);
        largeHtmlRef.current = null;
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
      applyResult(msg.html, msg.preview, msg.totalRows, msg.error);
    };
    return worker;
  }, [getWorker, applyResult]);

  const convertViaWorker = useCallback((text: string) => {
    setProgress({ phase: "converting", percent: 0 });
    const id = ++requestIdRef.current;
    const worker = attachWorkerHandler(id);
    worker.postMessage({ type: "convert", id, text });
  }, [attachWorkerHandler]);

  const convertLargeFile = useCallback((file: File) => {
    setHtml("");
    setPreview("");
    setError(null);
    setHasLargeOutput(false);
    largeHtmlRef.current = null;
    setProgress({ phase: "reading", percent: 0 });
    const id = ++requestIdRef.current;
    const worker = attachWorkerHandler(id);
    worker.postMessage({ type: "convert-file", id, file });
  }, [attachWorkerHandler]);

  const convertSync = useCallback((text: string) => {
    setProgress(null);
    try {
      const result = jsonToHtmlTable(text);
      const previewResult = jsonToPreviewTable(text, 100);
      setHtml(result.html);
      setPreview(previewResult.preview);
      setTotalRows(result.totalRows);
      setError(null);
      setHasLargeOutput(false);
      largeHtmlRef.current = null;
    } catch (e) {
      setError((e as Error).message);
      setHtml("");
      setPreview("");
      setTotalRows(0);
    }
  }, []);

  const convert = useCallback((text: string) => {
    if (!text.trim()) {
      setHtml("");
      setPreview("");
      setError(null);
      setProgress(null);
      setTotalRows(0);
      setHasLargeOutput(false);
      largeHtmlRef.current = null;
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
    convert(text);
  };

  const handleFile = (file: File) => {
    setFileName(file.name);
    setFileSize(file.size);
    setHasLargeOutput(false);
    largeHtmlRef.current = null;

    if (file.size > FILE_WORKER_THRESHOLD) {
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

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = async () => {
    const content = largeHtmlRef.current ?? html;
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = largeHtmlRef.current ?? html;
    const name = fileName ? fileName.replace(/\.[^.]+$/, ".html") : "table.html";
    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSample = () => {
    setInput(SAMPLE_JSON);
    convertSync(SAMPLE_JSON);
  };

  const handleClear = () => {
    setInput("");
    setHtml("");
    setPreview("");
    setError(null);
    setFileName(null);
    setFileSize(null);
    setProgress(null);
    setTotalRows(0);
    setHasLargeOutput(false);
    largeHtmlRef.current = null;
    currentFileRef.current = null;
  };

  const isProcessing = progress !== null;
  const hasOutput = html.length > 0 || hasLargeOutput;
  const showFileOverlay = fileSize !== null && fileSize > FILE_WORKER_THRESHOLD;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-brand-400">
          JSON → HTML Table
        </div>

        {hasOutput && !isProcessing && (
          <div className="flex rounded-lg border border-slate-700 overflow-hidden">
            <button
              onClick={() => setShowRaw(false)}
              className={`px-3 py-2 text-sm font-semibold transition-colors ${
                !showRaw ? "bg-brand-600 text-white" : "bg-slate-900 text-slate-400 hover:text-slate-100"
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setShowRaw(true)}
              className={`px-3 py-2 text-sm font-semibold transition-colors ${
                showRaw ? "bg-brand-600 text-white" : "bg-slate-900 text-slate-400 hover:text-slate-100"
              }`}
            >
              Raw HTML
            </button>
          </div>
        )}

        {!input && !fileName && (
          <button onClick={handleSample} className="btn-ghost text-brand-400 hover:text-brand-300">Sample</button>
        )}

        {(input || fileName) && (
          <button onClick={handleClear} className="btn-ghost text-red-400 hover:text-red-300">
            Clear
          </button>
        )}
      </div>

      {/* Large file advisory */}
      {fileSize !== null && fileSize > 50 * 1024 * 1024 && (
        <div className="flex items-center gap-2 rounded-lg border border-amber-700 bg-amber-950/40 px-4 py-2 text-amber-300 text-sm">
          <span>⚠</span>
          <span>Large file ({formatSize(fileSize)}) — conversion runs off the main thread so the page stays responsive.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
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
              <button onClick={() => fileInputRef.current?.click()} className="btn-ghost text-xs">
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
            className={`relative rounded-lg transition-colors ${isDragging ? "ring-2 ring-brand-500 bg-brand-50/5" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <textarea
              className="editor-textarea"
              placeholder='Paste a JSON array here, or an object containing an array…'
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              spellCheck={false}
            />
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
        </div>

        {/* Output */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="panel-label">
              {showRaw ? "Raw HTML" : "Table Preview"}
              {totalRows > 0 && !isProcessing && (
                <span className="text-slate-500 text-xs font-normal ml-2">
                  {totalRows > 100 && !showRaw ? `showing 100 of ${totalRows.toLocaleString()} rows` : `${totalRows.toLocaleString()} rows`}
                </span>
              )}
            </span>
            {hasOutput && !isProcessing && (
              <div className="flex items-center gap-2">
                {html && (
                  <button onClick={handleCopy} className="btn-ghost text-xs">
                    {copied ? "✓ Copied!" : "Copy HTML"}
                  </button>
                )}
                <button onClick={handleDownload} className="btn-ghost text-xs">
                  Download
                </button>
              </div>
            )}
          </div>

          {showRaw ? (
            <div className="relative">
              <textarea
                className="editor-textarea"
                placeholder="HTML output will appear here…"
                value={error ? "" : html}
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
                          <div className="bg-sky-500 h-2 rounded-full transition-all duration-200" style={{ width: `${progress.percent}%` }} />
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
              {/* Large output download-only */}
              {hasLargeOutput && !isProcessing && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 rounded-lg gap-3">
                  <div className="text-sky-400 text-3xl">✓</div>
                  <p className="text-slate-200 font-semibold text-sm">Conversion complete — {totalRows.toLocaleString()} rows</p>
                  <p className="text-slate-400 text-xs">Output is too large to preview as raw HTML</p>
                  <button onClick={handleDownload} className="btn-primary text-sm mt-1">Download HTML</button>
                </div>
              )}
              {!isProcessing && error && (
                <div className="absolute inset-0 flex items-start p-4 bg-red-950/40 rounded-lg border border-red-800">
                  <div>
                    <p className="text-red-400 font-semibold text-sm mb-1">Conversion error</p>
                    <p className="text-red-300 text-sm font-mono">{error}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-900 rounded-lg border border-slate-800 min-h-[400px] max-h-[600px] overflow-auto p-4 relative">
              {!hasOutput && !error && !isProcessing && (
                <p className="text-slate-500 text-sm">Paste a JSON array to see the table preview…</p>
              )}
              {/* Progress overlay for preview mode */}
              {isProcessing && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 rounded-lg gap-4 px-8 z-10">
                  <p className="text-slate-300 text-sm font-medium">
                    {progress.phase === "reading" ? "Reading file…" : "Converting…"}
                  </p>
                  <div className="w-full max-w-xs flex flex-col gap-2">
                    {progress.phase === "reading" ? (
                      <>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-sky-500 h-2 rounded-full transition-all duration-200" style={{ width: `${progress.percent}%` }} />
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
              {error && !isProcessing && (
                <div className="flex items-start gap-2">
                  <span className="text-red-400 text-lg">✗</span>
                  <div>
                    <p className="text-red-400 font-semibold text-sm mb-1">Conversion error</p>
                    <p className="text-red-300 text-sm font-mono">{error}</p>
                  </div>
                </div>
              )}
              {preview && !error && !isProcessing && (
                <div dangerouslySetInnerHTML={{ __html: preview }} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
