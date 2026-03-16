import Papa from "papaparse";
import { jsonToXml, xmlToJson } from "./converter";

/**
 * Flatten a nested object using dot notation for keys.
 * { a: { b: 1 } } → { "a.b": 1 }
 */
function flattenObject(
  obj: Record<string, unknown>,
  prefix = "",
  result: Record<string, unknown> = {}
): Record<string, unknown> {
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (
      value !== null &&
      typeof value === "object" &&
      !Array.isArray(value)
    ) {
      flattenObject(value as Record<string, unknown>, fullKey, result);
    } else if (Array.isArray(value)) {
      // Stringify arrays rather than losing data
      result[fullKey] = JSON.stringify(value);
    } else {
      result[fullKey] = value;
    }
  }
  return result;
}

/**
 * Extract a usable array from parsed JSON.
 * Handles: direct array, object with one array property, object with nested arrays.
 * Returns the array or throws a descriptive error.
 */
function extractArray(parsed: unknown): unknown[] {
  // Direct array
  if (Array.isArray(parsed)) {
    if (parsed.length === 0) throw new Error("JSON array is empty — nothing to convert.");
    return parsed;
  }

  // Single object — look for array properties
  if (parsed !== null && typeof parsed === "object") {
    const obj = parsed as Record<string, unknown>;
    const arrayKeys = Object.keys(obj).filter((k) => Array.isArray(obj[k]));

    if (arrayKeys.length === 1) {
      const arr = obj[arrayKeys[0]] as unknown[];
      if (arr.length === 0) throw new Error(`Found array "${arrayKeys[0]}" but it is empty.`);
      return arr;
    }

    if (arrayKeys.length > 1) {
      throw new Error(
        `Found multiple arrays in your JSON: ${arrayKeys.map((k) => `"${k}"`).join(", ")}. ` +
        `Please pass just the array you want to convert, e.g. extract the "${arrayKeys[0]}" property.`
      );
    }

    // No array properties — wrap the single object as a one-row table
    return [obj];
  }

  throw new Error(
    "JSON must be an array of objects or an object containing an array. " +
    'Example: [{"name": "Alice", "age": 30}]'
  );
}

export function jsonToCsv(jsonText: string): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error("Invalid JSON — please check your input.");
  }

  const items = extractArray(parsed);

  // Flatten nested objects
  const flattened = items.map((item) => {
    if (item !== null && typeof item === "object" && !Array.isArray(item)) {
      return flattenObject(item as Record<string, unknown>);
    }
    // Primitive array items — wrap in a value column
    return { value: item };
  });

  return Papa.unparse(flattened);
}

export function csvToJson(csvText: string): string {
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  });

  if (result.errors.length > 0) {
    const first = result.errors[0];
    throw new Error(
      `CSV parse error (row ${first.row ?? "?"}): ${first.message}`
    );
  }

  if (result.data.length === 0) {
    throw new Error("CSV is empty — nothing to convert.");
  }

  return JSON.stringify(result.data, null, 2);
}

// ─── CSV ↔ XML (chain through JSON) ──────────────────────────────────────────

export function csvToXml(csvText: string): string {
  const jsonText = csvToJson(csvText);
  return jsonToXml(jsonText);
}

export function xmlToCsv(xmlText: string): string {
  const jsonText = xmlToJson(xmlText);
  return jsonToCsv(jsonText);
}
