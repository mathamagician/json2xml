/**
 * JSON → HTML Table conversion logic.
 * Extracted to a shared module so it can be used from both the component and a worker.
 */

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function extractArray(parsed: unknown): unknown[] {
  if (Array.isArray(parsed)) {
    if (parsed.length === 0) throw new Error("JSON array is empty — nothing to convert.");
    return parsed;
  }
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
        `Found multiple arrays: ${arrayKeys.map((k) => `"${k}"`).join(", ")}. Pass just the array you want.`
      );
    }
    return [obj];
  }
  throw new Error("JSON must be an array of objects or an object containing an array.");
}

function getHeaders(items: unknown[]): string[] {
  const keys = new Set<string>();
  for (const item of items) {
    if (item && typeof item === "object" && !Array.isArray(item)) {
      Object.keys(item as Record<string, unknown>).forEach((k) => keys.add(k));
    }
  }
  if (keys.size === 0) throw new Error("No object keys found — array items must be objects.");
  return Array.from(keys);
}

function cellValue(obj: Record<string, unknown>, key: string): string {
  const val = obj[key];
  if (val === null || val === undefined) return "";
  if (typeof val === "object") return escapeHtml(JSON.stringify(val));
  return escapeHtml(String(val));
}

/** Generate clean HTML table (no inline styles). */
export function jsonToHtmlTable(jsonText: string): { html: string; totalRows: number; headers: string[] } {
  const parsed = JSON.parse(jsonText);
  const items = extractArray(parsed);
  const headers = getHeaders(items);

  const headerHtml = headers.map((h) => `    <th>${escapeHtml(h)}</th>`).join("\n");
  const rowsHtml = items.map((item) => {
    const obj = (item && typeof item === "object" ? item : {}) as Record<string, unknown>;
    const cells = headers.map((h) => `    <td>${cellValue(obj, h)}</td>`);
    return `  <tr>\n${cells.join("\n")}\n  </tr>`;
  });

  const html = `<table>\n  <thead>\n  <tr>\n${headerHtml}\n  </tr>\n  </thead>\n  <tbody>\n${rowsHtml.join("\n")}\n  </tbody>\n</table>`;
  return { html, totalRows: items.length, headers };
}

/** Generate styled preview HTML, limited to maxRows for performance. */
export function jsonToPreviewTable(jsonText: string, maxRows: number = 100): { preview: string; totalRows: number } {
  const parsed = JSON.parse(jsonText);
  const items = extractArray(parsed);
  const headers = getHeaders(items);
  const totalRows = items.length;
  const displayItems = items.slice(0, maxRows);

  const preview = `<table style="border-collapse:collapse;width:100%;font-size:14px;font-family:monospace;">
  <thead>
  <tr style="background:#1e293b;">
${headers.map((h) => `    <th style="border:1px solid #334155;padding:8px 12px;text-align:left;color:#e2e8f0;">${escapeHtml(h)}</th>`).join("\n")}
  </tr>
  </thead>
  <tbody>
${displayItems.map((item, i) => {
    const obj = (item && typeof item === "object" ? item : {}) as Record<string, unknown>;
    const bg = i % 2 === 0 ? "#0f172a" : "#1e293b";
    return `  <tr style="background:${bg};">
${headers.map((h) => `    <td style="border:1px solid #334155;padding:8px 12px;color:#94a3b8;">${cellValue(obj, h)}</td>`).join("\n")}
  </tr>`;
  }).join("\n")}
  </tbody>
</table>`;

  return { preview, totalRows };
}
