/**
 * Streaming JSON → XML converter for large files (> 512 MB).
 *
 * Key design constraints:
 *  - Input:  reads in 8 MB chunks; never concatenates a growing buffer string.
 *            Chunks spanning a single element are kept in a small array and only
 *            joined when that element is complete (memory = one element at a time).
 *  - Output: flushed to a native Blob every 64 MB so the JS heap never holds the
 *            full output as a string.
 *
 * Supports all common large-file structures:
 *  - Top-level array:                  [item, item, …]
 *  - Top-level object:                 {"key": value, …}   (each value streamed separately)
 *  - Top-level object with array val:  {"key": [item, …]}  (nested array streamed element-by-element)
 *
 * Individual values > 400 MB are skipped (cannot be held as a single JS string).
 */

const INPUT_CHUNK  = 8   * 1024 * 1024; // 8 MB reads
const OUTPUT_FLUSH = 64  * 1024 * 1024; // flush to Blob every 64 MB of output
const ELEMENT_MAX  = 400 * 1024 * 1024; // skip any single value larger than 400 MB

function readChunk(file: File, start: number, end: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target!.result as string);
    reader.onerror = () => reject(new Error("File read error"));
    reader.readAsText(file.slice(start, Math.min(end, file.size)));
  });
}

function sanitizeTag(key: string): string {
  const s = key.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_\-.]/g, "");
  return /^[0-9\-.]/.test(s) ? `_${s}` : s || "item";
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function valueToXml(key: string, value: unknown, depth: number): string {
  const pad = "  ".repeat(depth);
  const tag = sanitizeTag(key);
  if (value === null || value === undefined) return `${pad}<${tag} xsi:nil="true"/>`;
  if (Array.isArray(value)) return value.map((v) => valueToXml(tag, v, depth)).join("\n");
  if (typeof value === "object") {
    const inner = Object.entries(value as Record<string, unknown>)
      .map(([k, v]) => valueToXml(k, v, depth + 1))
      .join("\n");
    return `${pad}<${tag}>\n${inner}\n${pad}</${tag}>`;
  }
  return `${pad}<${tag}>${escapeXml(String(value))}</${tag}>`;
}

export type StreamResult = {
  blob: Blob;
  processed: number;
  skipped: number;
};

export async function streamJsonToXml(
  file: File,
  onProgress: (loaded: number, total: number) => void,
  onFlush?: (batch: Blob) => Promise<void>
): Promise<StreamResult> {

  // ── Output management ────────────────────────────────────────────────────────
  const blobParts: Blob[] = [];
  let outBatch: string[] = [];
  let outBatchBytes = 0;
  let processed = 0;
  let skipped = 0;

  async function flushOutput() {
    if (outBatch.length > 0) {
      const batch = new Blob(outBatch, { type: "text/xml" });
      outBatch = [];
      outBatchBytes = 0;
      if (onFlush) {
        await onFlush(batch);
      } else {
        blobParts.push(batch);
      }
    }
  }

  function emit(s: string) {
    outBatch.push(s);
    outBatchBytes += s.length;
  }

  emit('<?xml version="1.0" encoding="UTF-8"?>\n<root>\n');

  // ── Input scanning state ─────────────────────────────────────────────────────
  let pendingChunks: string[] = [];
  let pendingSize = 0;
  let elementLocalStart = 0;

  let inStr = false;
  let esc = false;
  let elementDepth = 0;   // depth inside current element (0 = between elements)

  let started = false;
  let isArray = false;    // true when root container is [
  let done = false;
  let bytesRead = 0;

  // ── Object-mode state (root is {…}) ──────────────────────────────────────────
  // For a root object we stream each top-level key-value pair independently.
  let inTopLevelKey = false;  // currently reading a top-level key string
  let topLevelKeyBuf = "";    // accumulates key chars
  let topLevelKey = "";       // completed key for the next value
  let afterColon = false;     // seen key + ":", value comes next

  // ── Nested-array mode ────────────────────────────────────────────────────────
  // Activated when a top-level object value is itself an array, e.g. {"records":[…]}.
  // Instead of treating the whole array as one element we emit <records> and stream
  // its sub-elements individually — crucial for patterns like {"records":[1.5 GB]}.
  let nestedArrayMode = false; // scanning inside a top-level value array
  let nestedArrayTag = "";     // XML wrapper tag for the nested array

  // Small buffer for top-level primitive values
  let primBuf = "";
  let inPrimitive = false;

  for (let offset = 0; offset < file.size && !done; offset += INPUT_CHUNK) {
    const chunk = await readChunk(file, offset, offset + INPUT_CHUNK);
    bytesRead += chunk.length;
    onProgress(Math.min(bytesRead, file.size), file.size);

    let scanFrom = 0;

    // Locate root [ or { on first non-empty chunk
    if (!started) {
      let idx = 0;
      while (idx < chunk.length && chunk[idx] !== "[" && chunk[idx] !== "{") idx++;
      if (idx >= chunk.length) continue;
      isArray = chunk[idx] === "[";
      started = true;
      scanFrom = idx + 1;
    }

    // If mid-element, accumulate this chunk into pending set
    if (elementDepth > 0) {
      pendingChunks.push(chunk);
      pendingSize += chunk.length;
    }

    for (let i = scanFrom; i < chunk.length; i++) {
      const c = chunk[i];

      if (esc) { esc = false; continue; }

      // ── String traversal ────────────────────────────────────────────────────
      if (inStr) {
        if (c === "\\") { esc = true; }
        else if (c === '"') {
          inStr = false;
          if (inTopLevelKey) {
            inTopLevelKey = false;
            topLevelKey = topLevelKeyBuf;
          }
        } else if (inTopLevelKey) {
          topLevelKeyBuf += c;
        }
        continue;
      }

      if (c === '"') {
        inStr = true;
        // Capture top-level object key (depth 0, object mode, before the colon)
        if (!isArray && !nestedArrayMode && elementDepth === 0 && !afterColon) {
          inTopLevelKey = true;
          topLevelKeyBuf = "";
        }
        continue;
      }

      // ── Between-element logic (depth 0) ─────────────────────────────────────
      if (elementDepth === 0) {

        if (c === ":") {
          // Object mode: colon after key → value comes next
          if (!isArray && !nestedArrayMode && topLevelKey) {
            afterColon = true;
          }

        } else if (c === "[") {
          if (isArray || nestedArrayMode) {
            // Array/nested-array mode: sub-element starts with [
            startElement(i, chunk);
          } else if (afterColon) {
            // Object mode, value is an array — enter nested-array streaming
            const tag = sanitizeTag(topLevelKey);
            emit(`  <${tag}>\n`);
            nestedArrayMode = true;
            nestedArrayTag = tag;
            afterColon = false;
          }

        } else if (c === "{") {
          if (isArray || nestedArrayMode || afterColon) {
            // Flush any pending primitive first
            if (inPrimitive && primBuf.trim()) {
              emitPrimitive();
            }
            startElement(i, chunk);
            afterColon = false;
          }

        } else if (c === "]") {
          if (nestedArrayMode) {
            // Close the nested array wrapper
            if (inPrimitive && primBuf.trim()) emitPrimitive();
            primBuf = ""; inPrimitive = false;
            emit(`  </${nestedArrayTag}>\n`);
            if (outBatchBytes >= OUTPUT_FLUSH) await flushOutput();
            nestedArrayMode = false;
            nestedArrayTag = "";
            afterColon = false;
          } else {
            // Root array closed
            if (inPrimitive && primBuf.trim()) emitPrimitive();
            done = true;
            break;
          }

        } else if (c === "}") {
          // Root object closed
          if (inPrimitive && primBuf.trim()) emitPrimitive();
          done = true;
          break;

        } else if (c === ",") {
          if (inPrimitive && primBuf.trim()) emitPrimitive();
          primBuf = ""; inPrimitive = false;
          if (!nestedArrayMode) afterColon = false;

        } else if (c !== " " && c !== "\t" && c !== "\n" && c !== "\r") {
          // Primitive value start (number, boolean, null)
          if (isArray || nestedArrayMode || afterColon) {
            inPrimitive = true;
            primBuf += c;
          }
        }

      // ── Inside a complex element (depth > 0) ────────────────────────────────
      } else {
        if (c === "{" || c === "[") {
          elementDepth++;
        } else if (c === "}" || c === "]") {
          elementDepth--;
          if (elementDepth === 0) {
            await finishElement(i, chunk);
          }
        }
      }
    }
  }

  emit("</root>");
  await flushOutput();

  const blob = onFlush
    ? new Blob([], { type: "text/xml" })
    : new Blob(blobParts, { type: "text/xml" });

  return { blob, processed, skipped };

  // ── Helpers (closures so they share state) ───────────────────────────────────

  function currentElementKey(): string {
    return (isArray || nestedArrayMode) ? "item" : topLevelKey;
  }

  function emitPrimitive() {
    const key = currentElementKey();
    try {
      emit(valueToXml(key, JSON.parse(primBuf.trim()), 1) + "\n");
      processed++;
    } catch { skipped++; }
    primBuf = ""; inPrimitive = false;
  }

  function startElement(i: number, chunk: string) {
    elementDepth++;
    elementLocalStart = i;
    pendingChunks = [chunk];
    pendingSize = chunk.length;
  }

  async function finishElement(i: number, chunk: string) {
    if (pendingSize > ELEMENT_MAX) {
      skipped++;
      pendingChunks = [];
      pendingSize = 0;
      elementLocalStart = 0;
      return;
    }

    let elemText: string;
    if (pendingChunks.length === 1) {
      elemText = chunk.substring(elementLocalStart, i + 1);
    } else {
      const first  = pendingChunks[0].substring(elementLocalStart);
      const middle = pendingChunks.slice(1, -1).join("");
      const last   = chunk.substring(0, i + 1);
      elemText = first + middle + last;
    }

    const key = currentElementKey();
    try {
      const parsed = JSON.parse(elemText);
      emit(valueToXml(key, parsed, 1) + "\n");
      processed++;
      if (outBatchBytes >= OUTPUT_FLUSH) await flushOutput();
    } catch { skipped++; }

    pendingChunks = [];
    pendingSize = 0;
    elementLocalStart = 0;
  }
}
