"use client";

import { useState, useCallback } from "react";

type HashResult = {
  "SHA-1": string;
  "SHA-256": string;
  "SHA-512": string;
};

async function computeHashes(text: string): Promise<HashResult> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  const [sha1, sha256, sha512] = await Promise.all([
    crypto.subtle.digest("SHA-1", data),
    crypto.subtle.digest("SHA-256", data),
    crypto.subtle.digest("SHA-512", data),
  ]);

  const toHex = (buffer: ArrayBuffer) =>
    Array.from(new Uint8Array(buffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

  return {
    "SHA-1": toHex(sha1),
    "SHA-256": toHex(sha256),
    "SHA-512": toHex(sha512),
  };
}

const SAMPLE_TEXT = "Hello, World! This is a sample text for generating hash values.";

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<HashResult | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [uppercase, setUppercase] = useState(false);

  const generate = useCallback(async (text: string) => {
    if (!text) {
      setHashes(null);
      return;
    }
    const result = await computeHashes(text);
    setHashes(result);
  }, []);

  const handleSample = () => {
    setInput(SAMPLE_TEXT);
    generate(SAMPLE_TEXT);
  };

  const handleChange = (text: string) => {
    setInput(text);
    generate(text);
  };

  const handleCopy = async (key: string, value: string) => {
    await navigator.clipboard.writeText(uppercase ? value.toUpperCase() : value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Input */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="panel-label">Input Text</span>
          <div className="flex items-center gap-3">
            {!input && (
              <button onClick={handleSample} className="btn-ghost text-brand-400 hover:text-brand-300">
                Sample
              </button>
            )}
          <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="accent-brand-500"
            />
            Uppercase
          </label>
          </div>
        </div>
        <textarea
          className="editor-textarea !min-h-[150px]"
          placeholder="Type or paste text to hash…"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          spellCheck={false}
        />
      </div>

      {/* Hash outputs */}
      <div className="flex flex-col gap-4">
        {hashes &&
          (Object.entries(hashes) as [string, string][]).map(([algo, hash]) => (
            <div key={algo} className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="panel-label">{algo}</span>
                <button
                  onClick={() => handleCopy(algo, hash)}
                  className="btn-ghost text-xs"
                >
                  {copiedKey === algo ? "✓ Copied!" : "Copy"}
                </button>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 font-mono text-sm text-slate-300 break-all select-all">
                {uppercase ? hash.toUpperCase() : hash}
              </div>
            </div>
          ))}

        {!hashes && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-8 text-center">
            <p className="text-slate-500 text-sm">Type text above to see hash values…</p>
          </div>
        )}
      </div>
    </div>
  );
}
