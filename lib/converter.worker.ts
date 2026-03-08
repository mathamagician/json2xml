import { jsonToXml, xmlToJson } from "./converter";

type Direction = "json-to-xml" | "xml-to-json";

onmessage = (
  e: MessageEvent<{ id: number; text: string; direction: Direction }>
) => {
  const { id, text, direction } = e.data;
  try {
    const result =
      direction === "json-to-xml" ? jsonToXml(text) : xmlToJson(text);
    postMessage({ id, result, error: null });
  } catch (err) {
    postMessage({ id, result: null, error: (err as Error).message });
  }
};
