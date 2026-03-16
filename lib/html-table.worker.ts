import { jsonToHtmlTable, jsonToPreviewTable } from "./html-table";

type InMessage =
  | { type: "convert"; id: number; text: string }
  | { type: "convert-file"; id: number; file: File };

onmessage = (e: MessageEvent<InMessage>) => {
  const msg = e.data;

  const doConvert = (id: number, text: string) => {
    try {
      const { html, totalRows } = jsonToHtmlTable(text);
      const { preview } = jsonToPreviewTable(text, 100);
      postMessage({ type: "result", id, html, preview, totalRows, error: null });
    } catch (err) {
      postMessage({ type: "result", id, html: null, preview: null, totalRows: 0, error: (err as Error).message });
    }
  };

  if (msg.type === "convert") {
    doConvert(msg.id, msg.text);
  } else {
    const { id, file } = msg;
    const reader = new FileReader();

    reader.onprogress = (ev) => {
      if (ev.lengthComputable) {
        postMessage({ type: "progress", id, phase: "reading", percent: Math.round((ev.loaded / ev.total) * 100) });
      }
    };

    reader.onload = (ev) => {
      postMessage({ type: "progress", id, phase: "converting", percent: 0 });
      doConvert(id, ev.target!.result as string);
    };

    reader.onerror = () => {
      postMessage({ type: "result", id, html: null, preview: null, totalRows: 0, error: "Failed to read file" });
    };

    reader.readAsText(file);
  }
};
