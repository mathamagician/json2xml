/**
 * Streaming XML → JSON converter for large files (> 50 MB).
 * Uses sax-js in push mode: reads the file in 8 MB chunks and feeds each chunk
 * to the SAX parser. Peak memory is reduced because the full XML text is never
 * loaded at once — only the JSON object tree accumulates (unavoidable for JSON output).
 *
 * Output: a Blob containing the JSON string.
 */

import sax from "sax";

const CHUNK_SIZE = 8 * 1024 * 1024; // 8 MB

function readChunk(file: File, start: number, end: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target!.result as string);
    reader.onerror = () => reject(new Error("File read error"));
    reader.readAsText(file.slice(start, Math.min(end, file.size)));
  });
}

type XmlNode = {
  name: string;
  attrs: Record<string, string>;
  children: XmlNode[];
  text: string;
};

function xmlNodeToJson(node: XmlNode): unknown {
  const result: Record<string, unknown> = {};

  // Attributes with @_ prefix (matches fast-xml-parser convention)
  for (const [k, v] of Object.entries(node.attrs)) {
    result[`@_${k}`] = v;
  }

  // Group repeated child tags into arrays
  const childGroups: Record<string, XmlNode[]> = {};
  for (const child of node.children) {
    if (!childGroups[child.name]) childGroups[child.name] = [];
    childGroups[child.name].push(child);
  }

  for (const [name, children] of Object.entries(childGroups)) {
    const values = children.map(xmlNodeToJson);
    result[name] = values.length === 1 ? values[0] : values;
  }

  const text = node.text.trim();
  const hasChildren = Object.keys(childGroups).length > 0;
  const hasAttrs = Object.keys(node.attrs).length > 0;

  if (!hasChildren && !hasAttrs) {
    // Leaf node: return text value directly (or null if empty)
    return text || null;
  }

  if (text && !hasChildren) {
    result["#text"] = text;
  }

  return result;
}

export function streamXmlToJson(
  file: File,
  onProgress: (loaded: number, total: number) => void
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const parser = sax.parser(true, { trim: false, normalize: false });

    const stack: XmlNode[] = [];
    let rootName = "";
    let rootValue: unknown = null;
    let hasRoot = false;

    parser.onopentag = (node: sax.Tag) => {
      stack.push({
        name: node.name,
        attrs: node.attributes as Record<string, string>,
        children: [],
        text: "",
      });
    };

    parser.ontext = (text: string) => {
      if (stack.length > 0) stack[stack.length - 1].text += text;
    };

    parser.oncdata = (text: string) => {
      if (stack.length > 0) stack[stack.length - 1].text += text;
    };

    parser.onclosetag = (_name: string) => {
      const node = stack.pop()!;
      if (stack.length === 0) {
        // Root element closed
        rootName = node.name;
        rootValue = xmlNodeToJson(node);
        hasRoot = true;
      } else {
        stack[stack.length - 1].children.push(node);
      }
    };

    parser.onerror = (e: Error) => {
      // SAX errors on malformed XML — resume to handle as best-effort
      parser.resume();
      // Only reject on fatal / unrecoverable if needed
      if (e.message.includes("Unexpected end")) {
        reject(new Error(`Invalid XML: ${e.message}`));
      }
    };

    // Feed file in chunks asynchronously
    (async () => {
      let bytesRead = 0;
      for (let offset = 0; offset < file.size; offset += CHUNK_SIZE) {
        try {
          const chunk = await readChunk(file, offset, offset + CHUNK_SIZE);
          bytesRead += chunk.length;
          onProgress(Math.min(bytesRead, file.size), file.size);
          parser.write(chunk);
        } catch (e) {
          reject(e);
          return;
        }
      }

      try {
        parser.close();
      } catch (e) {
        reject(new Error(`XML parse error: ${(e as Error).message}`));
        return;
      }

      if (!hasRoot) {
        reject(new Error("No XML root element found"));
        return;
      }

      const output = { [rootName]: rootValue };
      resolve(new Blob([JSON.stringify(output, null, 2)], { type: "application/json" }));
    })();
  });
}
