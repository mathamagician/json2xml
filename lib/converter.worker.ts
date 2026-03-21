import { jsonToXml, xmlToJson } from "./converter";
import { streamJsonToXml } from "./streaming-json-parser";
import { streamXmlToJson } from "./streaming-xml-parser";

type Direction = "json-to-xml" | "xml-to-json";

const STREAM_THRESHOLD = 512 * 1024 * 1024; // 512 MB

type InMessage =
  | { type: "convert"; id: number; text: string; direction: Direction }
  | { type: "convert-file"; id: number; file: File; direction: Direction }
  | { type: "convert-file-fsapi"; id: number; file: File; direction: Direction; fileHandle: FileSystemFileHandle };

onmessage = (e: MessageEvent<InMessage>) => {
  const msg = e.data;

  if (msg.type === "convert") {
    const { id, text, direction } = msg;
    try {
      const result = direction === "json-to-xml" ? jsonToXml(text) : xmlToJson(text);
      postMessage({ type: "result", id, result, error: null });
    } catch (err) {
      postMessage({ type: "result", id, result: null, error: (err as Error).message });
    }

  } else if (msg.type === "convert-file-fsapi") {
    fsapiConvert(msg.id, msg.file, msg.direction, msg.fileHandle);

  } else {
    const { id, file, direction } = msg;
    if (file.size > STREAM_THRESHOLD) {
      streamingConvert(id, file, direction);
    } else {
      bulkConvert(id, file, direction);
    }
  }
};

// ── FSAPI path: stream directly to a user-chosen file on disk ─────────────────
async function fsapiConvert(
  id: number,
  file: File,
  direction: Direction,
  fileHandle: FileSystemFileHandle
) {
  let writable: FileSystemWritableFileStream;
  try {
    writable = await fileHandle.createWritable();
  } catch {
    postMessage({ type: "result-fsapi", id, error: "Could not open file for writing." });
    return;
  }

  const onProgress = (loaded: number, total: number) => {
    const percent = Math.round((loaded / total) * 100);
    postMessage({ type: "progress", id, phase: "converting", percent, loaded, total });
  };

  const onFlush = async (batch: Blob) => {
    await writable.write(batch);
  };

  try {
    if (direction === "json-to-xml") {
      const { processed, skipped } = await streamJsonToXml(file, onProgress, onFlush);
      await writable.close();
      postMessage({ type: "result-fsapi", id, error: null, processed, skipped });
    } else {
      await streamXmlToJson(file, onProgress, onFlush);
      await writable.close();
      postMessage({ type: "result-fsapi", id, error: null });
    }
  } catch (err) {
    try { await writable.abort(); } catch { /* ignore */ }
    postMessage({ type: "result-fsapi", id, error: (err as Error).message });
  }
}

// ── Blob streaming path: output accumulates in memory as Blob parts ───────────
function streamingConvert(id: number, file: File, direction: Direction) {
  const onProgress = (loaded: number, total: number) => {
    const percent = Math.round((loaded / total) * 100);
    postMessage({ type: "progress", id, phase: "converting", percent, loaded, total });
  };

  const streamFn =
    direction === "json-to-xml"
      ? streamJsonToXml(file, onProgress)
      : streamXmlToJson(file, onProgress);

  streamFn
    .then((result) => {
      const isStreamResult = result && typeof result === "object" && "blob" in result;
      const blob = isStreamResult ? (result as { blob: Blob }).blob : (result as Blob);
      const processed = isStreamResult ? (result as { processed: number }).processed : undefined;
      const skipped = isStreamResult ? (result as { skipped: number }).skipped : undefined;

      const url = URL.createObjectURL(blob);
      const ext = direction === "json-to-xml" ? "xml" : "json";
      postMessage({ type: "result-blob-url", id, url, ext, error: null, processed, skipped });
    })
    .catch((err) => {
      const msg = (err as Error).message;
      if (msg === "FALLBACK_TO_BULK") {
        bulkConvert(id, file, direction);
      } else {
        postMessage({ type: "result-blob-url", id, url: null, ext: null, error: msg });
      }
    });
}

// ── Bulk path: fast for files < 512 MB ───────────────────────────────────────
function bulkConvert(id: number, file: File, direction: Direction) {
  const reader = new FileReader();

  reader.onprogress = (ev) => {
    if (ev.lengthComputable) {
      const percent = Math.round((ev.loaded / ev.total) * 100);
      postMessage({ type: "progress", id, phase: "reading", percent });
    }
  };

  reader.onload = (ev) => {
    postMessage({ type: "progress", id, phase: "converting", percent: 0 });
    const text = ev.target!.result as string;
    try {
      const result = direction === "json-to-xml" ? jsonToXml(text) : xmlToJson(text);
      postMessage({ type: "result", id, result, error: null });
    } catch (err) {
      const errMsg = (err as Error).message;
      const isDataError = errMsg !== "Invalid string length";
      postMessage({ type: "warning", id, dataError: isDataError });
      streamingConvert(id, file, direction);
    }
  };

  reader.onerror = () => {
    postMessage({ type: "result", id, result: null, error: "Failed to read file" });
  };

  reader.readAsText(file);
}
