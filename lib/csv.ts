import Papa from "papaparse";

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

export function jsonToCsv(jsonText: string): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error("Invalid JSON — please check your input.");
  }

  if (!Array.isArray(parsed)) {
    throw new Error(
      "JSON must be an array of objects to convert to CSV. Example: [{\"name\": \"Alice\", \"age\": 30}]"
    );
  }

  if (parsed.length === 0) {
    throw new Error("JSON array is empty — nothing to convert.");
  }

  // Flatten nested objects
  const flattened = parsed.map((item) => {
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
