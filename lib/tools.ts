export type ToolMeta = {
  slug: string;
  title: string;
  navTitle: string;
  description: string;
  relatedSlugs: string[];
};

export const tools: ToolMeta[] = [
  {
    slug: "/",
    title: "JSON to XML Converter",
    navTitle: "JSON → XML",
    description: "Convert JSON to XML instantly in your browser. Free, private, handles files up to 500 MB.",
    relatedSlugs: ["/xml-to-json", "/json-formatter", "/json-validator"],
  },
  {
    slug: "/xml-to-json",
    title: "XML to JSON Converter",
    navTitle: "XML → JSON",
    description: "Convert XML to JSON instantly in your browser. Free, private, handles files up to 500 MB.",
    relatedSlugs: ["/", "/xml-formatter", "/xml-validator"],
  },
  {
    slug: "/json-formatter",
    title: "JSON Formatter",
    navTitle: "JSON Formatter",
    description: "Pretty-print or minify JSON with configurable indentation. Free, runs in your browser.",
    relatedSlugs: ["/json-validator", "/", "/xml-formatter"],
  },
  {
    slug: "/xml-formatter",
    title: "XML Formatter",
    navTitle: "XML Formatter",
    description: "Pretty-print or minify XML with configurable indentation. Free, runs in your browser.",
    relatedSlugs: ["/xml-validator", "/xml-to-json", "/json-formatter"],
  },
  {
    slug: "/json-validator",
    title: "JSON Validator",
    navTitle: "JSON Validator",
    description: "Validate JSON syntax and see errors with line numbers. Free, runs in your browser.",
    relatedSlugs: ["/json-formatter", "/", "/xml-validator"],
  },
  {
    slug: "/xml-validator",
    title: "XML Validator",
    navTitle: "XML Validator",
    description: "Validate XML syntax and see errors with line numbers. Free, runs in your browser.",
    relatedSlugs: ["/xml-formatter", "/xml-to-json", "/json-validator"],
  },
  {
    slug: "/json-minifier",
    title: "JSON Minifier",
    navTitle: "JSON Minifier",
    description: "Minify JSON by removing all whitespace. Reduce file size instantly in your browser.",
    relatedSlugs: ["/json-formatter", "/json-validator", "/"],
  },
  {
    slug: "/xml-minifier",
    title: "XML Minifier",
    navTitle: "XML Minifier",
    description: "Minify XML by removing all whitespace. Reduce file size instantly in your browser.",
    relatedSlugs: ["/xml-formatter", "/xml-validator", "/xml-to-json"],
  },
  {
    slug: "/json-to-yaml",
    title: "JSON to YAML Converter",
    navTitle: "JSON → YAML",
    description: "Convert JSON to YAML instantly in your browser. Free, private, no sign-up required.",
    relatedSlugs: ["/yaml-to-json", "/", "/json-formatter"],
  },
  {
    slug: "/yaml-to-json",
    title: "YAML to JSON Converter",
    navTitle: "YAML → JSON",
    description: "Convert YAML to JSON instantly in your browser. Free, private, no sign-up required.",
    relatedSlugs: ["/json-to-yaml", "/json-formatter", "/json-validator"],
  },
  {
    slug: "/json-to-csv",
    title: "JSON to CSV Converter",
    navTitle: "JSON → CSV",
    description: "Convert JSON arrays to CSV instantly in your browser. Free, private, no sign-up required.",
    relatedSlugs: ["/csv-to-json", "/json-formatter", "/"],
  },
  {
    slug: "/csv-to-json",
    title: "CSV to JSON Converter",
    navTitle: "CSV → JSON",
    description: "Convert CSV to JSON instantly in your browser. Free, private, no sign-up required.",
    relatedSlugs: ["/json-to-csv", "/json-validator", "/json-formatter"],
  },
  {
    slug: "/xml-to-yaml",
    title: "XML to YAML Converter",
    navTitle: "XML → YAML",
    description: "Convert XML to YAML instantly in your browser. Free, private, no sign-up required.",
    relatedSlugs: ["/yaml-to-xml", "/xml-to-json", "/xml-formatter"],
  },
  {
    slug: "/yaml-to-xml",
    title: "YAML to XML Converter",
    navTitle: "YAML → XML",
    description: "Convert YAML to XML instantly in your browser. Free, private, no sign-up required.",
    relatedSlugs: ["/xml-to-yaml", "/", "/xml-formatter"],
  },
  {
    slug: "/json-editor",
    title: "JSON Editor",
    navTitle: "JSON Editor",
    description: "Edit JSON with a tree view and raw editor. Free, runs in your browser.",
    relatedSlugs: ["/json-viewer", "/json-formatter", "/json-validator"],
  },
  {
    slug: "/json-viewer",
    title: "JSON Viewer",
    navTitle: "JSON Viewer",
    description: "View JSON as a collapsible tree with syntax coloring. Free, runs in your browser.",
    relatedSlugs: ["/json-editor", "/json-formatter", "/json-validator"],
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
