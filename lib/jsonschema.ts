type JsonSchema = {
  type?: string;
  properties?: Record<string, JsonSchema>;
  items?: JsonSchema;
  required?: string[];
  enum?: unknown[];
  anyOf?: JsonSchema[];
  description?: string;
  [key: string]: unknown;
};

function inferSchema(value: unknown): JsonSchema {
  if (value === null) return { type: "null" };
  if (Array.isArray(value)) {
    if (value.length === 0) return { type: "array", items: {} };
    // Check if all items have same type
    const itemSchemas = value.map(inferSchema);
    const types = new Set(itemSchemas.map((s) => JSON.stringify(s)));
    if (types.size === 1) {
      return { type: "array", items: itemSchemas[0] };
    }
    // Merge object schemas if all objects
    if (
      value.every(
        (v) => typeof v === "object" && v !== null && !Array.isArray(v)
      )
    ) {
      return {
        type: "array",
        items: mergeObjectSchemas(value as Record<string, unknown>[]),
      };
    }
    return {
      type: "array",
      items: {
        anyOf: itemSchemas.filter((s, i) => {
          const str = JSON.stringify(s);
          return itemSchemas.findIndex((s2) => JSON.stringify(s2) === str) === i;
        }),
      },
    };
  }
  if (typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const properties: Record<string, JsonSchema> = {};
    const required: string[] = [];
    for (const [key, val] of Object.entries(obj)) {
      properties[key] = inferSchema(val);
      required.push(key);
    }
    return { type: "object", properties, required };
  }
  if (typeof value === "string") {
    // Detect formats
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(value))
      return { type: "string", format: "date-time" };
    if (/^\d{4}-\d{2}-\d{2}$/.test(value))
      return { type: "string", format: "date" };
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
      return { type: "string", format: "email" };
    if (/^https?:\/\//.test(value)) return { type: "string", format: "uri" };
    return { type: "string" };
  }
  if (typeof value === "number") {
    return Number.isInteger(value) ? { type: "integer" } : { type: "number" };
  }
  if (typeof value === "boolean") return { type: "boolean" };
  return {};
}

function mergeObjectSchemas(
  objects: Record<string, unknown>[]
): JsonSchema {
  const allKeys = new Set<string>();
  for (const obj of objects) {
    for (const key of Object.keys(obj)) allKeys.add(key);
  }
  const properties: Record<string, JsonSchema> = {};
  const required: string[] = [];
  for (const key of allKeys) {
    const values = objects.filter((o) => key in o).map((o) => o[key]);
    if (values.length === 1) {
      properties[key] = inferSchema(values[0]);
    } else {
      const schemas = values.map(inferSchema);
      const types = new Set(schemas.map((s) => JSON.stringify(s)));
      properties[key] =
        types.size === 1
          ? schemas[0]
          : { anyOf: [...types].map((t) => JSON.parse(t)) };
    }
    // Required only if present in ALL objects
    if (objects.every((o) => key in o)) required.push(key);
  }
  return {
    type: "object",
    properties,
    required: required.length > 0 ? required : undefined,
  };
}

export function generateJsonSchema(jsonText: string): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error("Invalid JSON — please check your input.");
  }

  const schema: JsonSchema = {
    $schema: "http://json-schema.org/draft-07/schema#",
    ...inferSchema(parsed),
  };

  return JSON.stringify(schema, null, 2);
}
