"use client";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function InputStats({ text }: { text: string }) {
  if (!text) return null;

  const chars = text.length;
  const lines = text.split("\n").length;
  const bytes = new TextEncoder().encode(text).byteLength;

  return (
    <div className="flex items-center gap-3 text-[10px] text-slate-600 px-1 pt-1 select-none">
      <span>{chars.toLocaleString()} chars</span>
      <span>{lines.toLocaleString()} lines</span>
      <span>{formatBytes(bytes)}</span>
    </div>
  );
}
