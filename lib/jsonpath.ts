export function queryJsonPath(data: unknown, path: string): unknown[] {
  if (!path.startsWith("$")) throw new Error("JSONPath must start with $");

  const tokens = tokenize(path.slice(1));
  let current: unknown[] = [data];

  for (const token of tokens) {
    const next: unknown[] = [];
    for (const item of current) {
      if (token === "*") {
        if (Array.isArray(item)) {
          next.push(...item);
        } else if (item && typeof item === "object") {
          next.push(...Object.values(item as Record<string, unknown>));
        }
      } else if (token === "..") {
        next.push(...recursiveDescend(item));
      } else if (token.startsWith("[") && token.endsWith("]")) {
        const inner = token.slice(1, -1);
        if (inner === "*") {
          if (Array.isArray(item)) next.push(...item);
          else if (item && typeof item === "object") next.push(...Object.values(item as Record<string, unknown>));
        } else if (inner.includes(":")) {
          // Array slice [start:end]
          if (Array.isArray(item)) {
            const [start, end] = inner.split(":").map((s) => (s === "" ? undefined : parseInt(s)));
            next.push(...item.slice(start, end));
          }
        } else if (/^\d+$/.test(inner)) {
          const idx = parseInt(inner);
          if (Array.isArray(item) && idx < item.length) next.push(item[idx]);
        } else {
          // Quoted key like ['key']
          const key = inner.replace(/^['"]|['"]$/g, "");
          if (item && typeof item === "object" && !Array.isArray(item)) {
            const obj = item as Record<string, unknown>;
            if (key in obj) next.push(obj[key]);
          }
        }
      } else {
        // Dot notation property
        if (item && typeof item === "object" && !Array.isArray(item)) {
          const obj = item as Record<string, unknown>;
          if (token in obj) next.push(obj[token]);
        }
      }
    }
    current = next;
  }

  return current;
}

function tokenize(path: string): string[] {
  const tokens: string[] = [];
  let i = 0;
  while (i < path.length) {
    if (path[i] === ".") {
      if (path[i + 1] === ".") {
        tokens.push("..");
        i += 2;
      } else {
        i++;
      }
    } else if (path[i] === "[") {
      const end = path.indexOf("]", i);
      if (end === -1) throw new Error("Unclosed bracket at position " + i);
      tokens.push(path.slice(i, end + 1));
      i = end + 1;
    } else {
      let end = i;
      while (end < path.length && path[end] !== "." && path[end] !== "[") end++;
      if (end > i) tokens.push(path.slice(i, end));
      i = end;
    }
  }
  return tokens;
}

function recursiveDescend(item: unknown): unknown[] {
  const result: unknown[] = [];
  if (Array.isArray(item)) {
    for (const child of item) {
      result.push(child);
      result.push(...recursiveDescend(child));
    }
  } else if (item && typeof item === "object") {
    for (const val of Object.values(item as Record<string, unknown>)) {
      result.push(val);
      result.push(...recursiveDescend(val));
    }
  }
  return result;
}
