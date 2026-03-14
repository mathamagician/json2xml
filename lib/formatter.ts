import { XMLParser, XMLBuilder } from "fast-xml-parser";
import jsYaml from "js-yaml";

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

// ─── YAML ───────────────────────────────────────────────────────────────────

export function formatYaml(input: string, indent: number = 2): string {
  let parsed: unknown;
  try {
    parsed = jsYaml.load(input);
  } catch (e) {
    throw new Error(`Invalid YAML — ${(e as Error).message}`);
  }
  return jsYaml.dump(parsed, { indent, lineWidth: -1, noRefs: true }).trimEnd();
}

export function minifyYaml(input: string): string {
  let parsed: unknown;
  try {
    parsed = jsYaml.load(input);
  } catch (e) {
    throw new Error(`Invalid YAML — ${(e as Error).message}`);
  }
  // YAML doesn't truly "minify" like JSON, but we can use flow style (inline)
  return jsYaml.dump(parsed, { flowLevel: 0, lineWidth: -1, noRefs: true }).trimEnd();
}
