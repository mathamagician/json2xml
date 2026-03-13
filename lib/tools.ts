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
