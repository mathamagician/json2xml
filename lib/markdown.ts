import { marked } from "marked";
import TurndownService from "turndown";

export function markdownToHtml(mdText: string): string {
  if (!mdText.trim()) throw new Error("Input is empty.");
  const html = marked.parse(mdText, { async: false }) as string;
  return html.trim();
}

export function htmlToMarkdown(htmlText: string): string {
  if (!htmlText.trim()) throw new Error("Input is empty.");
  const turndown = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
  });
  return turndown.turndown(htmlText).trim();
}
