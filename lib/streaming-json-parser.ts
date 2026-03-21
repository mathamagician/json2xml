/**
 * Streaming JSON → XML converter for large files (> 512 MB).
 *
 * Key design constraints:
 *  - Input:  reads in 8 MB chunks; never concatenates a growing buffer string.
 *            Chunks that span a single element are kept in a small array and only
 *            joined when that element is complete (so memory = one element at a time).
 *  - Output: flushed to a native Blob every 64 MB so the JS heap never holds the
 *            full output as strings.
 *
 * Supports top-level JSON arrays (each element → <item>) and top-level objects
 * (each key → a root element). Single-object files > ~512 MB will still fail
 * because the whole object must be parsed at once — arrays are the efficient case.
 */

const INPUT_CHUNK  = 8  * 1024 * 1024; // 8 MB reads
const OUTPUT_FLUSH = 64 * 1024 * 1024; // flush to Blob every 64 MB of output

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
  // Optional: when provided, each output batch is written via this callback
  // instead of accumulated in memory (used by File System Access API path).
  onFlush?: (batch: Blob) => Promise<void>
): Promise<StreamResult> {

  // ── Output management ───────────────────────────────────────────────────────
  const blobParts: Blob[] = []; // only used when onFlush is not provided
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

  // ── Input scanning state ────────────────────────────────────────────────────
  // pendingChunks holds the raw chunks that contain the current in-progress
  // element. Between elements it is empty — no growing buffer string.
  let pendingChunks: string[] = [];
  let elementLocalStart = 0; // index in pendingChunks[0] where the element begins

  let inStr = false;
  let esc = false;
  let elementDepth = 0; // 0 = between elements

  let started = false;
  let isArray = false;
  let done = false;
  let bytesRead = 0;

  // Small string for top-level primitives (rare, always tiny)
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
    }

    for (let i = scanFrom; i < chunk.length; i++) {
      const c = chunk[i];

      if (esc) { esc = false; continue; }
      if (inStr) {
        if (c === "\\") esc = true;
        else if (c === '"') inStr = false;
        continue;
      }
      if (c === '"') { inStr = true; continue; }

      if (elementDepth === 0) {
        // ── Between elements ──────────────────────────────────────────────
        if (c === "{" || c === "[") {
          // Flush any pending primitive
          if (inPrimitive && primBuf.trim()) {
            try { emit(valueToXml("item", JSON.parse(primBuf.trim()), 1) + "\n"); processed++; }
            catch { skipped++; }
          }
          primBuf = ""; inPrimitive = false;

          elementDepth++;
          elementLocalStart = i;
          pendingChunks = [chunk]; // start fresh — only this chunk so far

        } else if (c === "]" || c === "}") {
          // Root container closed
          if (inPrimitive && primBuf.trim()) {
            try { emit(valueToXml("item", JSON.parse(primBuf.trim()), 1) + "\n"); processed++; }
            catch { skipped++; }
          }
          done = true;
          break;

        } else if (c === ",") {
          if (inPrimitive && primBuf.trim()) {
            try { emit(valueToXml("item", JSON.parse(primBuf.trim()), 1) + "\n"); processed++; }
            catch { skipped++; }
          }
          primBuf = ""; inPrimitive = false;

        } else if (c !== " " && c !== "\t" && c !== "\n" && c !== "\r") {
          inPrimitive = true;
          primBuf += c;
        }

      } else {
        // ── Inside an element ─────────────────────────────────────────────
        if (c === "{" || c === "[") {
          elementDepth++;
        } else if (c === "}" || c === "]") {
          elementDepth--;
          if (elementDepth === 0) {
            // Element complete — assemble text from pending chunks
            let elemText: string;
            if (pendingChunks.length === 1) {
              // Entirely within one chunk — substring only, no concat
              elemText = chunk.substring(elementLocalStart, i + 1);
            } else {
              // Spans multiple chunks — join only what's needed
              const first  = pendingChunks[0].substring(elementLocalStart);
              const middle = pendingChunks.slice(1, -1).join(""); // chunks fully inside
              const last   = chunk.substring(0, i + 1);           // tail of final chunk
              elemText = first + middle + last;
            }

            try {
              const parsed = JSON.parse(elemText);
              // Non-array root: emit each top-level key then stop
              if (!isArray && typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
                for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
                  emit(valueToXml(k, v, 1) + "\n");
                }
                processed++;
                if (outBatchBytes >= OUTPUT_FLUSH) await flushOutput();
                done = true;
                break;
              }
              emit(valueToXml("item", parsed, 1) + "\n");
              processed++;
              if (outBatchBytes >= OUTPUT_FLUSH) await flushOutput();
            } catch { skipped++; }

            pendingChunks = [];
            elementLocalStart = 0;
          }
        }
      }
    }
  }

  emit("</root>");
  await flushOutput();

  const blob = onFlush
    ? new Blob([], { type: "text/xml" }) // output already written via onFlush
    : new Blob(blobParts, { type: "text/xml" });

  return { blob, processed, skipped };
}
