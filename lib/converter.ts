import { XMLParser, XMLBuilder } from "fast-xml-parser";

// ─── JSON → XML ────────────────────────────────────────────────────────────────

function jsonValueToXml(key: string, value: unknown, indent: number): string {
  const pad = "  ".repeat(indent);

  // Sanitize key: XML tag names can't start with digits or contain spaces
  const tag = /^[0-9]/.test(key) ? `_${key}` : key.replace(/\s+/g, "_") || "item";

  if (value === null || value === undefined) {
    return `${pad}<${tag} xsi:nil="true"/>`;
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => jsonValueToXml(tag, item, indent))
      .join("\n");
  }

  if (typeof value === "object") {
    const children = Object.entries(value as Record<string, unknown>)
      .map(([k, v]) => jsonValueToXml(k, v, indent + 1))
      .join("\n");
    return `${pad}<${tag}>\n${children}\n${pad}</${tag}>`;
  }

  // Primitive — escape XML special chars
  const escaped = String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

  return `${pad}<${tag}>${escaped}</${tag}>`;
}

export function jsonToXml(jsonText: string): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error("Invalid JSON — please check your input.");
  }

  const lines: string[] = ['<?xml version="1.0" encoding="UTF-8"?>'];

  if (Array.isArray(parsed)) {
    lines.push("<root>");
    parsed.forEach((item) => {
      lines.push(jsonValueToXml("item", item, 1));
    });
    lines.push("</root>");
  } else if (typeof parsed === "object" && parsed !== null) {
    const entries = Object.entries(parsed as Record<string, unknown>);
    if (entries.length === 1) {
      // Single root key — use it as the root element
      const [rootKey, rootVal] = entries[0];
      lines.push(jsonValueToXml(rootKey, rootVal, 0));
    } else {
      lines.push("<root>");
      entries.forEach(([k, v]) => {
        lines.push(jsonValueToXml(k, v, 1));
      });
      lines.push("</root>");
    }
  } else {
    lines.push(`<root>${String(parsed)}</root>`);
  }

  return lines.join("\n");
}

// ─── XML → JSON ────────────────────────────────────────────────────────────────

export function xmlToJson(xmlText: string): string {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    allowBooleanAttributes: true,
    parseAttributeValue: true,
    parseTagValue: true,
    trimValues: true,
    // Preserve arrays when a tag appears multiple times
    isArray: (_name, _jpath, isLeaf, isAttribute) => {
      return !isLeaf && !isAttribute;
    },
  });

  let parsed: unknown;
  try {
    parsed = parser.parse(xmlText);
  } catch (e) {
    throw new Error(`Invalid XML — ${(e as Error).message}`);
  }

  // fast-xml-parser wraps everything; unwrap single root if clean
  if (
    parsed &&
    typeof parsed === "object" &&
    !Array.isArray(parsed)
  ) {
    const keys = Object.keys(parsed as object).filter((k) => k !== "?xml");
    if (keys.length === 1) {
      const inner = (parsed as Record<string, unknown>)[keys[0]];
      // If the root has exactly one child array, unwrap it nicely
      if (Array.isArray(inner) && inner.length === 1) {
        parsed = { [keys[0]]: inner[0] };
      } else {
        parsed = { [keys[0]]: inner };
      }
    }
  }

  return JSON.stringify(parsed, null, 2);
}

// ─── Auto-detect format ────────────────────────────────────────────────────────

export type Format = "json" | "xml";

export function detectFormat(text: string): Format | null {
  const trimmed = text.trimStart();
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) return "json";
  if (trimmed.startsWith("<")) return "xml";
  return null;
}

// ─── File extension helper ─────────────────────────────────────────────────────

export function outputFilename(inputName: string, targetFormat: Format): string {
  const base = inputName.replace(/\.(json|xml)$/i, "");
  return `${base}.${targetFormat}`;
}
