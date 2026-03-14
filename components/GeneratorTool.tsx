"use client";

import { useState } from "react";

type GeneratorType = "lorem-ipsum" | "uuid" | "password";

// ─── Lorem Ipsum ────────────────────────────────────────────────

const LOREM_WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" ");

function generateLoremWords(count: number): string {
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    words.push(LOREM_WORDS[i % LOREM_WORDS.length]);
  }
  return words.join(" ");
}

function generateLoremSentence(): string {
  const len = 8 + Math.floor(Math.random() * 12);
  const words: string[] = [];
  for (let i = 0; i < len; i++) {
    words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
  }
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function generateLoremParagraph(): string {
  const sentences = 3 + Math.floor(Math.random() * 4);
  return Array.from({ length: sentences }, generateLoremSentence).join(" ");
}

function generateLorem(mode: "paragraphs" | "sentences" | "words", count: number): string {
  if (mode === "words") return generateLoremWords(count);
  if (mode === "sentences") return Array.from({ length: count }, generateLoremSentence).join(" ");
  return Array.from({ length: count }, generateLoremParagraph).join("\n\n");
}

// ─── UUID ───────────────────────────────────────────────────────

function generateUuid(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generateUuids(count: number, uppercase: boolean, noHyphens: boolean): string {
  return Array.from({ length: count }, () => {
    let uuid = generateUuid();
    if (noHyphens) uuid = uuid.replace(/-/g, "");
    if (uppercase) uuid = uuid.toUpperCase();
    return uuid;
  }).join("\n");
}

// ─── Password ───────────────────────────────────────────────────

const CHAR_SETS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}|;:,.<>?",
};

function generatePassword(length: number, options: { lowercase: boolean; uppercase: boolean; digits: boolean; symbols: boolean }): string {
  let chars = "";
  if (options.lowercase) chars += CHAR_SETS.lowercase;
  if (options.uppercase) chars += CHAR_SETS.uppercase;
  if (options.digits) chars += CHAR_SETS.digits;
  if (options.symbols) chars += CHAR_SETS.symbols;
  if (!chars) chars = CHAR_SETS.lowercase + CHAR_SETS.uppercase + CHAR_SETS.digits;

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (v) => chars[v % chars.length]).join("");
}

// ─── Component ──────────────────────────────────────────────────

export default function GeneratorTool({ type }: { type: GeneratorType }) {
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  // Lorem options
  const [loremMode, setLoremMode] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [loremCount, setLoremCount] = useState(3);

  // UUID options
  const [uuidCount, setUuidCount] = useState(1);
  const [uuidUppercase, setUuidUppercase] = useState(false);
  const [uuidNoHyphens, setUuidNoHyphens] = useState(false);

  // Password options
  const [pwLength, setPwLength] = useState(16);
  const [pwLower, setPwLower] = useState(true);
  const [pwUpper, setPwUpper] = useState(true);
  const [pwDigits, setPwDigits] = useState(true);
  const [pwSymbols, setPwSymbols] = useState(true);
  const [pwCount, setPwCount] = useState(1);

  const generate = () => {
    if (type === "lorem-ipsum") {
      setOutput(generateLorem(loremMode, loremCount));
    } else if (type === "uuid") {
      setOutput(generateUuids(uuidCount, uuidUppercase, uuidNoHyphens));
    } else if (type === "password") {
      setOutput(
        Array.from({ length: pwCount }, () =>
          generatePassword(pwLength, { lowercase: pwLower, uppercase: pwUpper, digits: pwDigits, symbols: pwSymbols })
        ).join("\n")
      );
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}-output.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Options */}
      <div className="flex flex-wrap items-end gap-4">
        {type === "lorem-ipsum" && (
          <>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Mode</label>
              <div className="flex rounded-lg border border-slate-700 overflow-hidden">
                {(["paragraphs", "sentences", "words"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setLoremMode(m)}
                    className={`px-3 py-2 text-sm font-semibold transition-colors ${
                      loremMode === m ? "bg-brand-600 text-white" : "bg-slate-900 text-slate-400 hover:text-slate-100"
                    }`}
                  >
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Count</label>
              <input
                type="number"
                min={1}
                max={100}
                value={loremCount}
                onChange={(e) => setLoremCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 w-20 outline-none focus:border-brand-500"
              />
            </div>
          </>
        )}

        {type === "uuid" && (
          <>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Count</label>
              <input
                type="number"
                min={1}
                max={100}
                value={uuidCount}
                onChange={(e) => setUuidCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 w-20 outline-none focus:border-brand-500"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
              <input type="checkbox" checked={uuidUppercase} onChange={(e) => setUuidUppercase(e.target.checked)} className="accent-brand-500" />
              Uppercase
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
              <input type="checkbox" checked={uuidNoHyphens} onChange={(e) => setUuidNoHyphens(e.target.checked)} className="accent-brand-500" />
              No hyphens
            </label>
          </>
        )}

        {type === "password" && (
          <>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Length</label>
              <input
                type="number"
                min={4}
                max={128}
                value={pwLength}
                onChange={(e) => setPwLength(Math.max(4, parseInt(e.target.value) || 16))}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 w-20 outline-none focus:border-brand-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-400">Count</label>
              <input
                type="number"
                min={1}
                max={50}
                value={pwCount}
                onChange={(e) => setPwCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 w-20 outline-none focus:border-brand-500"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
              <input type="checkbox" checked={pwLower} onChange={(e) => setPwLower(e.target.checked)} className="accent-brand-500" />
              a-z
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
              <input type="checkbox" checked={pwUpper} onChange={(e) => setPwUpper(e.target.checked)} className="accent-brand-500" />
              A-Z
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
              <input type="checkbox" checked={pwDigits} onChange={(e) => setPwDigits(e.target.checked)} className="accent-brand-500" />
              0-9
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
              <input type="checkbox" checked={pwSymbols} onChange={(e) => setPwSymbols(e.target.checked)} className="accent-brand-500" />
              !@#$
            </label>
          </>
        )}

        <button onClick={generate} className="btn-primary">
          Generate
        </button>
      </div>

      {/* Output */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="panel-label">Output</span>
          {output && (
            <div className="flex items-center gap-2">
              <button onClick={handleCopy} className="btn-ghost text-xs">
                {copied ? "✓ Copied!" : "Copy"}
              </button>
              <button onClick={handleDownload} className="btn-ghost text-xs">
                Download
              </button>
            </div>
          )}
        </div>
        <textarea
          className="editor-textarea"
          placeholder="Click Generate to create output…"
          value={output}
          readOnly
          spellCheck={false}
        />
      </div>
    </div>
  );
}
