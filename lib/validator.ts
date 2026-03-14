import { XMLValidator } from "fast-xml-parser";
import jsYaml from "js-yaml";

export type ValidationResult = {
  valid: boolean;
  error?: {
    message: string;
    line?: number;
    column?: number;
  };
};

// ─── JSON ────────────────────────────────────────────────────────────────────

export function validateJson(input: string): ValidationResult {
  try {
    JSON.parse(input);
    return { valid: true };
  } catch (e) {
    const msg = (e as Error).message;
    // Try to extract position from error message (e.g., "at position 42")
    const posMatch = msg.match(/position\s+(\d+)/i);
    if (posMatch) {
      const pos = parseInt(posMatch[1]);
      const { line, column } = offsetToLineCol(input, pos);
      return {
        valid: false,
        error: { message: msg, line, column },
      };
    }
    // Try to extract line number (e.g., "at line 5 column 3")
    const lineMatch = msg.match(/line\s+(\d+)/i);
    const colMatch = msg.match(/column\s+(\d+)/i);
    return {
      valid: false,
      error: {
        message: msg,
        line: lineMatch ? parseInt(lineMatch[1]) : undefined,
        column: colMatch ? parseInt(colMatch[1]) : undefined,
      },
    };
  }
}

function offsetToLineCol(text: string, offset: number): { line: number; column: number } {
  let line = 1;
  let lastNewline = -1;
  for (let i = 0; i < offset && i < text.length; i++) {
    if (text[i] === "\n") {
      line++;
      lastNewline = i;
    }
  }
  return { line, column: offset - lastNewline };
}

// ─── XML ─────────────────────────────────────────────────────────────────────

export function validateXml(input: string): ValidationResult {
  const result = XMLValidator.validate(input, {
    allowBooleanAttributes: true,
  });

  if (result === true) {
    return { valid: true };
  }

  return {
    valid: false,
    error: {
      message: result.err?.msg ?? "Invalid XML",
      line: result.err?.line,
      column: result.err?.col,
    },
  };
}

// ─── YAML ───────────────────────────────────────────────────────────────────

export function validateYaml(input: string): ValidationResult {
  try {
    jsYaml.load(input);
    return { valid: true };
  } catch (e) {
    const err = e as jsYaml.YAMLException;
    return {
      valid: false,
      error: {
        message: err.reason ?? err.message,
        line: err.mark?.line !== undefined ? err.mark.line + 1 : undefined,
        column: err.mark?.column !== undefined ? err.mark.column + 1 : undefined,
      },
    };
  }
}
