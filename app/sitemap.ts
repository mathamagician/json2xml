import { MetadataRoute } from "next";
import { tools } from "@/lib/tools";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://json2xml.com";
  const now = new Date();

  const toolEntries: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: tool.slug === "/" ? baseUrl : `${baseUrl}${tool.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: tool.slug === "/" ? 1 : 0.8,
  }));

  return [
    ...toolEntries,
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
