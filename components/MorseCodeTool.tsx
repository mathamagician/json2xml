"use client";

import { useState } from "react";
import { textToMorse, morseToText } from "@/lib/morse";

const SAMPLE_TEXT = "HELLO WORLD";

export default function MorseCodeTool() {
  const [text, setText] = useState("");
  const [morse, setMorse] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleTextChange = (value: string) => {
    setText(value);
    if (value.trim()) {
      setMorse(textToMorse(value));
    } else {
      setMorse("");
    }
  };

  const handleMorseChange = (value: string) => {
    setMorse(value);
    if (value.trim()) {
      setText(morseToText(value));
    } else {
      setText("");
    }
  };

  const handleCopy = async (field: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleClear = () => {
    setText("");
    setMorse("");
  };

  const handleSample = () => { handleTextChange(SAMPLE_TEXT); };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-brand-400">
          Text ↔ Morse
        </div>
        {!text && !morse && (
          <button onClick={handleSample} className="btn-ghost text-brand-400 hover:text-brand-300">Sample</button>
        )}
        {(text || morse) && (
          <button onClick={handleClear} className="btn-ghost text-red-400 hover:text-red-300">
            Clear
          </button>
        )}
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Text panel */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="panel-label">Text</span>
            {text && (
              <button onClick={() => handleCopy("text", text)} className="btn-ghost text-xs">
                {copiedField === "text" ? "✓ Copied!" : "Copy"}
              </button>
            )}
          </div>
          <textarea
            className="editor-textarea"
            placeholder="Type text to encode to Morse…"
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* Morse panel */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="panel-label">Morse Code</span>
            {morse && (
              <button onClick={() => handleCopy("morse", morse)} className="btn-ghost text-xs">
                {copiedField === "morse" ? "✓ Copied!" : "Copy"}
              </button>
            )}
          </div>
          <textarea
            className="editor-textarea"
            placeholder="Type Morse code to decode (use . and - separated by spaces, / for word break)…"
            value={morse}
            onChange={(e) => handleMorseChange(e.target.value)}
            spellCheck={false}
          />
        </div>
      </div>

      {/* Reference */}
      <details className="text-sm">
        <summary className="text-slate-400 cursor-pointer hover:text-slate-300 select-none">
          Morse Code Reference
        </summary>
        <div className="mt-3 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-9 gap-2 text-xs font-mono">
          {[..."ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"].map((char) => {
            const code = char >= "A" && char <= "Z"
              ? [".-","-...","-.-.","-..",".","..-.","--.","...."
                ,"..",".---","-.-",".-..","--","-.","---",".--.","--.-"
                ,".-.","...","-","..-","...-",".--","-..-","-.--","--.."][char.charCodeAt(0) - 65]
              : ["-----",".----","..---","...--","....-"
                ,".....","-....","--...","---..","----."][parseInt(char)];
            return (
              <div key={char} className="flex items-center gap-2 bg-slate-800 rounded px-2 py-1">
                <span className="text-slate-200 w-4">{char}</span>
                <span className="text-slate-500">{code}</span>
              </div>
            );
          })}
        </div>
      </details>
    </div>
  );
}
