import { jsonToXml, xmlToJson } from "./converter";

type Direction = "json-to-xml" | "xml-to-json";

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
    // Large file path: read the file here in the worker (not on the main thread)
    const { id, file, direction } = msg;
    const reader = new FileReader();

    reader.onprogress = (ev) => {
      if (ev.lengthComputable) {
        const percent = Math.round((ev.loaded / ev.total) * 100);
        postMessage({ type: "progress", id, phase: "reading", percent });
      }
    };

    reader.onload = (ev) => {
      // Signal transition to conversion phase
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
};
