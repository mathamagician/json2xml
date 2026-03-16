import { jsonToYaml, yamlToJson, xmlToYaml, yamlToXml } from "./yaml";
import { jsonToCsv, csvToJson, csvToXml, xmlToCsv } from "./csv";
import { markdownToHtml, htmlToMarkdown } from "./markdown";

type ConversionType =
  | "json-to-yaml" | "yaml-to-json"
  | "xml-to-yaml" | "yaml-to-xml"
  | "json-to-csv" | "csv-to-json"
  | "csv-to-xml" | "xml-to-csv"
  | "markdown-to-html" | "html-to-markdown";

const fns: Record<ConversionType, (input: string) => string> = {
  "json-to-yaml": jsonToYaml,
  "yaml-to-json": yamlToJson,
  "xml-to-yaml": xmlToYaml,
  "yaml-to-xml": yamlToXml,
  "json-to-csv": jsonToCsv,
  "csv-to-json": csvToJson,
  "csv-to-xml": csvToXml,
  "xml-to-csv": xmlToCsv,
  "markdown-to-html": markdownToHtml,
  "html-to-markdown": htmlToMarkdown,
};

type InMessage =
  | { type: "convert"; id: number; text: string; conversion: ConversionType }
  | { type: "convert-file"; id: number; file: File; conversion: ConversionType };

onmessage = (e: MessageEvent<InMessage>) => {
  const msg = e.data;

  if (msg.type === "convert") {
    const { id, text, conversion } = msg;
    try {
      const result = fns[conversion](text);
      postMessage({ type: "result", id, result, error: null });
    } catch (err) {
      postMessage({ type: "result", id, result: null, error: (err as Error).message });
    }
  } else {
    const { id, file, conversion } = msg;
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
        const result = fns[conversion](text);
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
