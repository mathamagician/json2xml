/**
 * Streaming JSON → XML converter for large files (> 50 MB).
 * Reads the file in 8 MB chunks so the full document is never in memory at once.
 *
 * Supports:
 *   - Top-level JSON arrays  → each element becomes <item>...</item>
 *   - Top-level JSON objects → each key becomes a root-level element
 *
 * Output: a Blob (assembled via string array, not concatenation) for memory efficiency.
 */

const CHUNK_SIZE = 8 * 1024 * 1024; // 8 MB

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
  processed: number; // elements successfully converted
  skipped: number;   // elements that failed to parse and were dropped
};

/**
 * Stream a large JSON file to XML.
 * Throws Error("FALLBACK_TO_BULK") if the file doesn't start with [ or { (unexpected format).
 */
export async function streamJsonToXml(
  file: File,
  onProgress: (loaded: number, total: number) => void
): Promise<StreamResult> {
  const out: string[] = ['<?xml version="1.0" encoding="UTF-8"?>\n<root>\n'];
  let processed = 0;
  let skipped = 0;

  let buf = "";        // unprocessed text carried between chunks
  let started = false; // true once we've found the root [ or {
  let isArray = false;
  let done = false;
  let bytesRead = 0;

  for (let offset = 0; offset < file.size && !done; offset += CHUNK_SIZE) {
    const chunk = await readChunk(file, offset, offset + CHUNK_SIZE);
    bytesRead += chunk.length;
    onProgress(Math.min(bytesRead, file.size), file.size);
    buf += chunk;

    // Locate root opener on first chunk
    if (!started) {
      let idx = 0;
      while (idx < buf.length && buf[idx] !== "[" && buf[idx] !== "{") idx++;
      if (idx >= buf.length) { buf = ""; continue; }
      isArray = buf[idx] === "[";
      started = true;
      buf = buf.substring(idx + 1); // strip root opener
    }

    // State machine: scan buf for complete top-level elements
    let i = 0;
    let elementDepth = 0;  // depth inside current element (0 = between elements)
    let elementStart = -1; // index of current element's opening char
    let inStr = false;
    let esc = false;
    let primitiveStart = -1; // for top-level primitive values

    while (i < buf.length) {
      const c = buf[i];

      // Escape sequence inside string
      if (esc) { esc = false; i++; continue; }
      if (inStr) {
        if (c === "\\") esc = true;
        else if (c === '"') inStr = false;
        i++; continue;
      }
      if (c === '"') { inStr = true; i++; continue; }

      if (elementDepth === 0) {
        // Between elements
        if (c === "{" || c === "[") {
          primitiveStart = -1;
          elementStart = i;
          elementDepth++;
        } else if (c === "]" || c === "}") {
          // Flush any pending primitive before root close
          if (primitiveStart !== -1) {
            const prim = buf.substring(primitiveStart, i).trimEnd();
            if (prim) {
              try { out.push(valueToXml("item", JSON.parse(prim), 1) + "\n"); processed++; } catch { skipped++; }
            }
            primitiveStart = -1;
          }
          done = true; // root container closed
          break;
        } else if (c === ",") {
          // Flush pending primitive
          if (primitiveStart !== -1) {
            const prim = buf.substring(primitiveStart, i).trimEnd();
            if (prim) {
              try { out.push(valueToXml("item", JSON.parse(prim), 1) + "\n"); processed++; } catch { skipped++; }
            }
            primitiveStart = -1;
          }
        } else if (c !== " " && c !== "\t" && c !== "\n" && c !== "\r") {
          if (primitiveStart === -1) primitiveStart = i;
        }
      } else {
        // Inside an element
        if (c === "{" || c === "[") {
          elementDepth++;
        } else if (c === "}" || c === "]") {
          elementDepth--;
          if (elementDepth === 0 && elementStart !== -1) {
            const elemText = buf.substring(elementStart, i + 1);
            try {
              const parsed = JSON.parse(elemText);
              // Top-level object (non-array root): emit each key directly
              if (!isArray && typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
                for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
                  out.push(valueToXml(k, v, 1) + "\n");
                }
                processed++;
                done = true;
                i++;
                break;
              }
              out.push(valueToXml("item", parsed, 1) + "\n");
              processed++;
            } catch { skipped++; }
            elementStart = -1;
          }
        }
      }
      i++;
    }

    // Carry unprocessed remainder to next iteration
    if (!done) {
      buf = elementStart !== -1 ? buf.substring(elementStart) : buf.substring(i);
    } else {
      buf = "";
    }
  }

  out.push("</root>");
  return { blob: new Blob(out, { type: "text/xml" }), processed, skipped };
}
