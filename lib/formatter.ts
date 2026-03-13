import { XMLParser, XMLBuilder } from "fast-xml-parser";

// ─── JSON ────────────────────────────────────────────────────────────────────

export function formatJson(input: string, indent: number | string = 2): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(input);
  } catch {
    throw new Error("Invalid JSON — please check your input.");
  }
  return JSON.stringify(parsed, null, indent);
}

export function minifyJson(input: string): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(input);
  } catch {
    throw new Error("Invalid JSON — please check your input.");
  }
  return JSON.stringify(parsed);
}

// ─── XML ─────────────────────────────────────────────────────────────────────

const parserOptions = {
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  allowBooleanAttributes: true,
  preserveOrder: true,
  commentPropName: "#comment",
  trimValues: false,
};

export function formatXml(input: string, indent: number = 2): string {
  const parser = new XMLParser(parserOptions);
  let parsed: unknown;
  try {
    parsed = parser.parse(input);
  } catch (e) {
    throw new Error(`Invalid XML — ${(e as Error).message}`);
  }

  const builder = new XMLBuilder({
    ...parserOptions,
    format: true,
    indentBy: " ".repeat(indent),
    suppressEmptyNode: false,
  });

  return (builder.build(parsed) as string).trim();
}

export function minifyXml(input: string): string {
  const parser = new XMLParser(parserOptions);
  let parsed: unknown;
  try {
    parsed = parser.parse(input);
  } catch (e) {
    throw new Error(`Invalid XML — ${(e as Error).message}`);
  }

  const builder = new XMLBuilder({
    ...parserOptions,
    format: false,
    suppressEmptyNode: false,
  });

  return (builder.build(parsed) as string).trim();
}
