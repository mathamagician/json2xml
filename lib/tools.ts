export type ToolCategory =
  | "converters"
  | "formatters"
  | "validators"
  | "code-gen"
  | "dev-tools"
  | "generators"
  | "utilities";

export const categoryLabels: Record<ToolCategory, string> = {
  converters: "Converters",
  formatters: "Formatters",
  validators: "Validators",
  "code-gen": "Code Gen",
  "dev-tools": "Dev Tools",
  generators: "Generators",
  utilities: "Utilities",
};

export type ToolMeta = {
  slug: string;
  title: string;
  navTitle: string;
  description: string;
  category: ToolCategory;
  relatedSlugs: string[];
};

export const tools: ToolMeta[] = [
  // ─── Converters ──────────────────────────────────────────────────
  {
    slug: "/",
    title: "JSON to XML Converter",
    navTitle: "JSON → XML",
    description: "Convert JSON to XML instantly in your browser. Free, private, handles files up to 500 MB.",
    category: "converters",
    relatedSlugs: ["/xml-to-json", "/json-formatter", "/json-to-yaml"],
  },
  {
    slug: "/xml-to-json",
    title: "XML to JSON Converter",
    navTitle: "XML → JSON",
    description: "Convert XML to JSON instantly in your browser. Free, private, handles files up to 500 MB.",
    category: "converters",
    relatedSlugs: ["/", "/xml-formatter", "/xml-to-yaml"],
  },
  {
    slug: "/json-to-yaml",
    title: "JSON to YAML Converter",
    navTitle: "JSON → YAML",
    description: "Convert JSON to YAML instantly in your browser. Free, private, no sign-up required.",
    category: "converters",
    relatedSlugs: ["/yaml-to-json", "/", "/json-formatter"],
  },
  {
    slug: "/yaml-to-json",
    title: "YAML to JSON Converter",
    navTitle: "YAML → JSON",
    description: "Convert YAML to JSON instantly in your browser. Free, private, no sign-up required.",
    category: "converters",
    relatedSlugs: ["/json-to-yaml", "/json-formatter", "/json-validator"],
  },
  {
    slug: "/json-to-csv",
    title: "JSON to CSV Converter",
    navTitle: "JSON → CSV",
    description: "Convert JSON arrays to CSV instantly in your browser. Free, private, no sign-up required.",
    category: "converters",
    relatedSlugs: ["/csv-to-json", "/json-formatter", "/json-to-html-table"],
  },
  {
    slug: "/csv-to-json",
    title: "CSV to JSON Converter",
    navTitle: "CSV → JSON",
    description: "Convert CSV to JSON instantly in your browser. Free, private, no sign-up required.",
    category: "converters",
    relatedSlugs: ["/json-to-csv", "/csv-to-xml", "/json-validator"],
  },
  {
    slug: "/xml-to-yaml",
    title: "XML to YAML Converter",
    navTitle: "XML → YAML",
    description: "Convert XML to YAML instantly in your browser. Free, private, no sign-up required.",
    category: "converters",
    relatedSlugs: ["/yaml-to-xml", "/xml-to-json", "/xml-formatter"],
  },
  {
    slug: "/yaml-to-xml",
    title: "YAML to XML Converter",
    navTitle: "YAML → XML",
    description: "Convert YAML to XML instantly in your browser. Free, private, no sign-up required.",
    category: "converters",
    relatedSlugs: ["/xml-to-yaml", "/", "/yaml-formatter"],
  },
  {
    slug: "/csv-to-xml",
    title: "CSV to XML Converter",
    navTitle: "CSV → XML",
    description: "Convert CSV to XML instantly in your browser. Free, private, no sign-up required.",
    category: "converters",
    relatedSlugs: ["/xml-to-csv", "/csv-to-json", "/xml-formatter"],
  },
  {
    slug: "/xml-to-csv",
    title: "XML to CSV Converter",
    navTitle: "XML → CSV",
    description: "Convert XML to CSV instantly in your browser. Free, private, no sign-up required.",
    category: "converters",
    relatedSlugs: ["/csv-to-xml", "/xml-to-json", "/json-to-csv"],
  },
  {
    slug: "/markdown-to-html",
    title: "Markdown to HTML Converter",
    navTitle: "MD → HTML",
    description: "Convert Markdown to HTML instantly in your browser. Free, private, no sign-up required.",
    category: "converters",
    relatedSlugs: ["/html-to-markdown", "/json-to-html-table", "/json-formatter"],
  },
  {
    slug: "/html-to-markdown",
    title: "HTML to Markdown Converter",
    navTitle: "HTML → MD",
    description: "Convert HTML to Markdown instantly in your browser. Free, private, no sign-up required.",
    category: "converters",
    relatedSlugs: ["/markdown-to-html", "/xml-formatter", "/json-formatter"],
  },
  {
    slug: "/json-to-html-table",
    title: "JSON to HTML Table",
    navTitle: "JSON → Table",
    description: "Convert a JSON array to an HTML table instantly in your browser. Free and private.",
    category: "converters",
    relatedSlugs: ["/json-to-csv", "/json-viewer", "/json-formatter"],
  },

  // ─── Formatters ──────────────────────────────────────────────────
  {
    slug: "/json-formatter",
    title: "JSON Formatter",
    navTitle: "JSON Formatter",
    description: "Pretty-print or minify JSON with configurable indentation. Free, runs in your browser.",
    category: "formatters",
    relatedSlugs: ["/json-validator", "/json-pretty-print", "/xml-formatter"],
  },
  {
    slug: "/xml-formatter",
    title: "XML Formatter",
    navTitle: "XML Formatter",
    description: "Pretty-print or minify XML with configurable indentation. Free, runs in your browser.",
    category: "formatters",
    relatedSlugs: ["/xml-validator", "/xml-pretty-print", "/json-formatter"],
  },
  {
    slug: "/yaml-formatter",
    title: "YAML Formatter",
    navTitle: "YAML Formatter",
    description: "Format and beautify YAML with configurable indentation. Free, runs in your browser.",
    category: "formatters",
    relatedSlugs: ["/yaml-validator", "/json-formatter", "/json-to-yaml"],
  },
  {
    slug: "/json-pretty-print",
    title: "JSON Pretty Print",
    navTitle: "JSON Pretty Print",
    description: "Pretty-print JSON with syntax highlighting. Free, runs in your browser.",
    category: "formatters",
    relatedSlugs: ["/json-formatter", "/json-minifier", "/json-validator"],
  },
  {
    slug: "/xml-pretty-print",
    title: "XML Pretty Print",
    navTitle: "XML Pretty Print",
    description: "Pretty-print XML with syntax highlighting. Free, runs in your browser.",
    category: "formatters",
    relatedSlugs: ["/xml-formatter", "/xml-minifier", "/xml-validator"],
  },
  {
    slug: "/json-minifier",
    title: "JSON Minifier",
    navTitle: "JSON Minifier",
    description: "Minify JSON by removing all whitespace. Reduce file size instantly in your browser.",
    category: "formatters",
    relatedSlugs: ["/json-formatter", "/json-pretty-print", "/json-validator"],
  },
  {
    slug: "/xml-minifier",
    title: "XML Minifier",
    navTitle: "XML Minifier",
    description: "Minify XML by removing all whitespace. Reduce file size instantly in your browser.",
    category: "formatters",
    relatedSlugs: ["/xml-formatter", "/xml-pretty-print", "/xml-validator"],
  },
  {
    slug: "/sql-formatter",
    title: "SQL Formatter",
    navTitle: "SQL Formatter",
    description: "Format and beautify SQL queries with configurable indentation. Free, runs in your browser.",
    category: "formatters",
    relatedSlugs: ["/json-formatter", "/json-to-csv", "/xml-formatter"],
  },

  // ─── Validators ──────────────────────────────────────────────────
  {
    slug: "/json-validator",
    title: "JSON Validator",
    navTitle: "JSON Validator",
    description: "Validate JSON syntax and see errors with line numbers. Free, runs in your browser.",
    category: "validators",
    relatedSlugs: ["/json-formatter", "/json-editor", "/yaml-validator"],
  },
  {
    slug: "/xml-validator",
    title: "XML Validator",
    navTitle: "XML Validator",
    description: "Validate XML syntax and see errors with line numbers. Free, runs in your browser.",
    category: "validators",
    relatedSlugs: ["/xml-formatter", "/xml-to-json", "/json-validator"],
  },
  {
    slug: "/yaml-validator",
    title: "YAML Validator",
    navTitle: "YAML Validator",
    description: "Validate YAML syntax and see errors with line numbers. Free, runs in your browser.",
    category: "validators",
    relatedSlugs: ["/yaml-formatter", "/json-validator", "/yaml-to-json"],
  },

  // ─── Code Gen ────────────────────────────────────────────────────
  {
    slug: "/json-to-typescript",
    title: "JSON to TypeScript",
    navTitle: "JSON → TS",
    description: "Generate TypeScript interfaces from JSON instantly. Free, runs in your browser.",
    category: "code-gen",
    relatedSlugs: ["/json-to-java", "/json-to-csharp", "/json-editor"],
  },
  {
    slug: "/json-to-java",
    title: "JSON to Java",
    navTitle: "JSON → Java",
    description: "Generate Java classes from JSON instantly. Free, runs in your browser.",
    category: "code-gen",
    relatedSlugs: ["/json-to-typescript", "/json-to-csharp", "/json-to-go"],
  },
  {
    slug: "/json-to-csharp",
    title: "JSON to C#",
    navTitle: "JSON → C#",
    description: "Generate C# classes from JSON instantly. Free, runs in your browser.",
    category: "code-gen",
    relatedSlugs: ["/json-to-typescript", "/json-to-java", "/json-to-go"],
  },
  {
    slug: "/json-to-go",
    title: "JSON to Go",
    navTitle: "JSON → Go",
    description: "Generate Go structs from JSON instantly. Free, runs in your browser.",
    category: "code-gen",
    relatedSlugs: ["/json-to-typescript", "/json-to-java", "/json-to-csharp"],
  },

  // ─── Dev Tools ───────────────────────────────────────────────────
  {
    slug: "/json-editor",
    title: "JSON Editor",
    navTitle: "JSON Editor",
    description: "Edit JSON with a tree view and raw editor. Free, runs in your browser.",
    category: "dev-tools",
    relatedSlugs: ["/json-viewer", "/json-formatter", "/json-validator"],
  },
  {
    slug: "/json-viewer",
    title: "JSON Viewer",
    navTitle: "JSON Viewer",
    description: "View JSON as a collapsible tree with syntax coloring. Free, runs in your browser.",
    category: "dev-tools",
    relatedSlugs: ["/json-editor", "/json-formatter", "/json-path-tester"],
  },
  {
    slug: "/cron-parser",
    title: "Cron Expression Parser",
    navTitle: "Cron Parser",
    description: "Parse cron expressions to human-readable schedules with next run times. Free and private.",
    category: "dev-tools",
    relatedSlugs: ["/json-editor", "/sql-formatter", "/unix-timestamp-converter"],
  },
  {
    slug: "/json-path-tester",
    title: "JSONPath Tester",
    navTitle: "JSONPath Tester",
    description: "Test JSONPath expressions against JSON data. Free, runs in your browser.",
    category: "dev-tools",
    relatedSlugs: ["/json-viewer", "/json-editor", "/xpath-tester"],
  },
  {
    slug: "/xpath-tester",
    title: "XPath Tester",
    navTitle: "XPath Tester",
    description: "Test XPath expressions against XML data. Free, runs in your browser.",
    category: "dev-tools",
    relatedSlugs: ["/json-path-tester", "/xml-formatter", "/xml-validator"],
  },
  {
    slug: "/diff-tool",
    title: "Diff Tool",
    navTitle: "Diff Tool",
    description: "Compare two text inputs side by side and see the differences highlighted. Free and private.",
    category: "dev-tools",
    relatedSlugs: ["/json-formatter", "/json-editor", "/sql-formatter"],
  },

  // ─── Generators ──────────────────────────────────────────────────
  {
    slug: "/lorem-ipsum-generator",
    title: "Lorem Ipsum Generator",
    navTitle: "Lorem Ipsum",
    description: "Generate lorem ipsum placeholder text. Choose paragraphs, sentences, or words. Free.",
    category: "generators",
    relatedSlugs: ["/uuid-generator", "/password-generator", "/hash-generator"],
  },
  {
    slug: "/uuid-generator",
    title: "UUID Generator",
    navTitle: "UUID Generator",
    description: "Generate random UUIDs (v4) instantly. Bulk generate, copy, and download. Free.",
    category: "generators",
    relatedSlugs: ["/password-generator", "/hash-generator", "/lorem-ipsum-generator"],
  },
  {
    slug: "/password-generator",
    title: "Password Generator",
    navTitle: "Password Gen",
    description: "Generate secure random passwords with configurable options. Free, runs in your browser.",
    category: "generators",
    relatedSlugs: ["/uuid-generator", "/hash-generator", "/lorem-ipsum-generator"],
  },
  {
    slug: "/hash-generator",
    title: "Hash Generator",
    navTitle: "Hash Generator",
    description: "Generate SHA-1, SHA-256, and SHA-512 hashes of text. Free, runs in your browser.",
    category: "generators",
    relatedSlugs: ["/uuid-generator", "/password-generator", "/json-formatter"],
  },

  // ─── Utilities ───────────────────────────────────────────────────
  {
    slug: "/color-converter",
    title: "Color Converter",
    navTitle: "Color Converter",
    description: "Convert between HEX, RGB, and HSL color formats with a live preview. Free.",
    category: "utilities",
    relatedSlugs: ["/unix-timestamp-converter", "/json-formatter", "/hash-generator"],
  },
  {
    slug: "/unix-timestamp-converter",
    title: "Unix Timestamp Converter",
    navTitle: "Timestamp",
    description: "Convert between Unix timestamps and human-readable dates. Free, runs in your browser.",
    category: "utilities",
    relatedSlugs: ["/cron-parser", "/color-converter", "/uuid-generator"],
  },
  {
    slug: "/morse-code-translator",
    title: "Morse Code Translator",
    navTitle: "Morse Code",
    description: "Encode text to Morse code or decode Morse to text. Free, runs in your browser.",
    category: "utilities",
    relatedSlugs: ["/hash-generator", "/lorem-ipsum-generator", "/diff-tool"],
  },
  {
    slug: "/base64-encode-decode",
    title: "Base64 Encode / Decode",
    navTitle: "Base64",
    description: "Encode text to Base64 or decode Base64 to text instantly in your browser. Free, private, no sign-up.",
    category: "utilities",
    relatedSlugs: ["/url-encode-decode", "/jwt-decoder", "/hash-generator"],
  },
  {
    slug: "/url-encode-decode",
    title: "URL Encode / Decode",
    navTitle: "URL Encode",
    description: "Encode or decode URL components instantly in your browser. Free, private, no sign-up required.",
    category: "utilities",
    relatedSlugs: ["/base64-encode-decode", "/json-escape-unescape", "/jwt-decoder"],
  },
  {
    slug: "/jwt-decoder",
    title: "JWT Decoder",
    navTitle: "JWT Decoder",
    description: "Decode and inspect JWT tokens — see header, payload, and signature. Free, private, runs in your browser.",
    category: "dev-tools",
    relatedSlugs: ["/base64-encode-decode", "/json-formatter", "/json-viewer"],
  },
  {
    slug: "/html-formatter",
    title: "HTML Formatter",
    navTitle: "HTML Formatter",
    description: "Pretty-print or minify HTML with configurable indentation. Free, runs in your browser.",
    category: "formatters",
    relatedSlugs: ["/json-formatter", "/xml-formatter", "/markdown-to-html"],
  },
  {
    slug: "/json-escape-unescape",
    title: "JSON Escape / Unescape",
    navTitle: "JSON Escape",
    description: "Escape or unescape JSON strings instantly. Handle special characters, quotes, and Unicode. Free.",
    category: "utilities",
    relatedSlugs: ["/xml-escape-unescape", "/json-formatter", "/json-validator"],
  },
  {
    slug: "/xml-escape-unescape",
    title: "XML Escape / Unescape",
    navTitle: "XML Escape",
    description: "Escape or unescape XML entities instantly. Handle &amp; &lt; &gt; &quot; and more. Free.",
    category: "utilities",
    relatedSlugs: ["/json-escape-unescape", "/xml-formatter", "/xml-validator"],
  },
  {
    slug: "/json-diff",
    title: "JSON Diff",
    navTitle: "JSON Diff",
    description: "Compare two JSON documents and see the structural differences highlighted. Free, private, in your browser.",
    category: "dev-tools",
    relatedSlugs: ["/diff-tool", "/json-formatter", "/json-viewer"],
  },
  {
    slug: "/json-schema-generator",
    title: "JSON Schema Generator",
    navTitle: "JSON Schema",
    description: "Generate a JSON Schema from sample JSON data instantly. Free, runs in your browser.",
    category: "code-gen",
    relatedSlugs: ["/json-to-typescript", "/json-validator", "/json-formatter"],
  },
  {
    slug: "/regex-tester",
    title: "Regex Tester",
    navTitle: "Regex Tester",
    description: "Test regular expressions against text with live highlighting of matches. Free, runs in your browser.",
    category: "dev-tools",
    relatedSlugs: ["/diff-tool", "/json-path-tester", "/xpath-tester"],
  },
];

export function getToolBySlug(slug: string): ToolMeta | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getRelatedTools(slug: string): ToolMeta[] {
  const tool = getToolBySlug(slug);
  if (!tool) return [];
  return tool.relatedSlugs
    .map((s) => getToolBySlug(s))
    .filter((t): t is ToolMeta => t !== undefined);
}

export function getToolsByCategory(category: ToolCategory): ToolMeta[] {
  return tools.filter((t) => t.category === category);
}

// Generate FAQPage JSON-LD for rich snippets in Google
export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
