export type CodeLanguage = "typescript" | "java" | "csharp" | "go";

type TypeInfo = { name: string; isArray: boolean; isPrimitive: boolean };

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function sanitizeName(s: string): string {
  return s.replace(/[^a-zA-Z0-9_]/g, "_").replace(/^(\d)/, "_$1");
}

function camelCase(s: string): string {
  return s.replace(/[-_](.)/g, (_, c) => c.toUpperCase());
}

function pascalCase(s: string): string {
  return capitalize(camelCase(s));
}

function inferType(value: unknown, key: string, lang: CodeLanguage, classes: Map<string, string>): TypeInfo {
  if (value === null || value === undefined) {
    const types: Record<CodeLanguage, string> = { typescript: "unknown", java: "Object", csharp: "object", go: "interface{}" };
    return { name: types[lang], isArray: false, isPrimitive: true };
  }

  if (typeof value === "string") {
    const types: Record<CodeLanguage, string> = { typescript: "string", java: "String", csharp: "string", go: "string" };
    return { name: types[lang], isArray: false, isPrimitive: true };
  }

  if (typeof value === "number") {
    const isInt = Number.isInteger(value);
    const types: Record<CodeLanguage, string> = {
      typescript: "number",
      java: isInt ? "int" : "double",
      csharp: isInt ? "int" : "double",
      go: isInt ? "int" : "float64",
    };
    return { name: types[lang], isArray: false, isPrimitive: true };
  }

  if (typeof value === "boolean") {
    const types: Record<CodeLanguage, string> = { typescript: "boolean", java: "boolean", csharp: "bool", go: "bool" };
    return { name: types[lang], isArray: false, isPrimitive: true };
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      const types: Record<CodeLanguage, string> = { typescript: "unknown[]", java: "List<Object>", csharp: "List<object>", go: "[]interface{}" };
      return { name: types[lang], isArray: true, isPrimitive: true };
    }
    const itemType = inferType(value[0], key, lang, classes);
    const arrayTypes: Record<CodeLanguage, string> = {
      typescript: `${itemType.name}[]`,
      java: `List<${wrapPrimitive(itemType.name, "java")}>`,
      csharp: `List<${itemType.name}>`,
      go: `[]${itemType.name}`,
    };
    return { name: arrayTypes[lang], isArray: true, isPrimitive: false };
  }

  if (typeof value === "object") {
    const className = pascalCase(key);
    generateClass(value as Record<string, unknown>, className, lang, classes);
    return { name: className, isArray: false, isPrimitive: false };
  }

  return { name: "unknown", isArray: false, isPrimitive: true };
}

function wrapPrimitive(type: string, lang: string): string {
  if (lang === "java") {
    const map: Record<string, string> = { int: "Integer", double: "Double", boolean: "Boolean" };
    return map[type] ?? type;
  }
  return type;
}

function generateClass(obj: Record<string, unknown>, name: string, lang: CodeLanguage, classes: Map<string, string>): void {
  if (classes.has(name)) return;
  classes.set(name, ""); // placeholder to prevent recursion

  const entries = Object.entries(obj);

  switch (lang) {
    case "typescript": {
      const fields = entries.map(([k, v]) => {
        const t = inferType(v, k, lang, classes);
        return `  ${camelCase(sanitizeName(k))}: ${t.name};`;
      });
      classes.set(name, `interface ${name} {\n${fields.join("\n")}\n}`);
      break;
    }
    case "java": {
      const fields = entries.map(([k, v]) => {
        const t = inferType(v, k, lang, classes);
        const fieldName = camelCase(sanitizeName(k));
        return `    private ${t.name} ${fieldName};`;
      });
      const gettersSetters = entries.map(([k, v]) => {
        const t = inferType(v, k, lang, classes);
        const fieldName = camelCase(sanitizeName(k));
        const methodName = capitalize(fieldName);
        return `    public ${t.name} get${methodName}() { return ${fieldName}; }\n    public void set${methodName}(${t.name} ${fieldName}) { this.${fieldName} = ${fieldName}; }`;
      });
      classes.set(name, `public class ${name} {\n${fields.join("\n")}\n\n${gettersSetters.join("\n\n")}\n}`);
      break;
    }
    case "csharp": {
      const props = entries.map(([k, v]) => {
        const t = inferType(v, k, lang, classes);
        return `    public ${t.name} ${pascalCase(sanitizeName(k))} { get; set; }`;
      });
      classes.set(name, `public class ${name}\n{\n${props.join("\n")}\n}`);
      break;
    }
    case "go": {
      const fields = entries.map(([k, v]) => {
        const t = inferType(v, k, lang, classes);
        const goFieldName = pascalCase(sanitizeName(k));
        return `\t${goFieldName} ${t.name} \`json:"${k}"\``;
      });
      classes.set(name, `type ${name} struct {\n${fields.join("\n")}\n}`);
      break;
    }
  }
}

export function generateCode(jsonText: string, language: CodeLanguage, rootName: string = "Root"): string {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error("Invalid JSON — please check your input.");
  }

  const classes = new Map<string, string>();
  const safeName = pascalCase(sanitizeName(rootName));

  if (Array.isArray(parsed)) {
    if (parsed.length > 0 && typeof parsed[0] === "object" && parsed[0] !== null) {
      generateClass(parsed[0] as Record<string, unknown>, safeName, language, classes);
    } else {
      const itemType = parsed.length > 0 ? inferType(parsed[0], "item", language, classes) : { name: "unknown" };
      const note = language === "typescript"
        ? `type ${safeName} = ${itemType.name}[];`
        : `// Root type: array of ${itemType.name}`;
      return note;
    }
  } else if (typeof parsed === "object" && parsed !== null) {
    generateClass(parsed as Record<string, unknown>, safeName, language, classes);
  } else {
    throw new Error("JSON must be an object or array of objects to generate code.");
  }

  // Output classes in dependency order (deepest first)
  const output = Array.from(classes.values()).reverse().join("\n\n");

  // Add language-specific imports if needed
  if (language === "java" && output.includes("List<")) {
    return `import java.util.List;\n\n${output}`;
  }

  return output;
}
