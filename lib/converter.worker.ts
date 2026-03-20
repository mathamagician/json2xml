import { jsonToXml, xmlToJson } from "./converter";
import { streamJsonToXml } from "./streaming-json-parser";
import { streamXmlToJson } from "./streaming-xml-parser";

type Direction = "json-to-xml" | "xml-to-json";

// Files above this threshold use the streaming path (chunked read + streaming conversion)
const STREAM_THRESHOLD = 50 * 1024 * 1024; // 50 MB

type InMessage =
  | { type: "convert"; id: number; text: string; direction: Direction }
  | { type: "convert-file"; id: number; file: File; direction: Direction };

onmessage = (e: MessageEvent<InMessage>) => {
  const msg = e.data;

  if (msg.type === "convert") {
    // Small/medium text path (already in memory)
    const { id, text, direction } = msg;
    try {
      const result = direction === "json-to-xml" ? jsonToXml(text) : xmlToJson(text);
      postMessage({ type: "result", id, result, error: null });
    } catch (err) {
      postMessage({ type: "result", id, result: null, error: (err as Error).message });
    }
  } else {
    const { id, file, direction } = msg;

    if (file.size > STREAM_THRESHOLD) {
      // Large file: stream in chunks to avoid full in-memory load
      const onProgress = (loaded: number, total: number) => {
        const percent = Math.round((loaded / total) * 100);
        postMessage({ type: "progress", id, phase: "converting", percent, loaded, total });
      };

      const streamFn =
        direction === "json-to-xml"
          ? streamJsonToXml(file, onProgress)
          : streamXmlToJson(file, onProgress);

      streamFn
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const ext = direction === "json-to-xml" ? "xml" : "json";
          postMessage({ type: "result-blob-url", id, url, ext, error: null });
        })
        .catch((err) => {
          const msg = (err as Error).message;
          if (msg === "FALLBACK_TO_BULK") {
            // Non-array/non-object JSON or other edge case — fall back to bulk
            bulkConvert(id, file, direction);
          } else {
            postMessage({ type: "result-blob-url", id, url: null, ext: null, error: msg });
          }
        });
    } else {
      bulkConvert(id, file, direction);
    }
  }
};

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
      postMessage({ type: "result", id, result: null, error: (err as Error).message });
    }
  };

  reader.onerror = () => {
    postMessage({ type: "result", id, result: null, error: "Failed to read file" });
  };

  reader.readAsText(file);
}
