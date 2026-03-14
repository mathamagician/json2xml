"use client";

import { useState } from "react";

function hexToRgb(hex: string): [number, number, number] | null {
  const match = hex.replace("#", "").match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!match) return null;
  return [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("");
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, Math.round(l * 100)];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360; s /= 100; l /= 100;
  if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, h) * 255),
    Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  ];
}

export default function ColorConverter() {
  const [hex, setHex] = useState("#0284c7");
  const [rgb, setRgb] = useState("2, 132, 199");
  const [hsl, setHsl] = useState("201, 98%, 39%");
  const [previewColor, setPreviewColor] = useState("#0284c7");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const updateFromHex = (value: string) => {
    setHex(value);
    const clean = value.startsWith("#") ? value : "#" + value;
    const parsed = hexToRgb(clean);
    if (parsed) {
      const [r, g, b] = parsed;
      setRgb(`${r}, ${g}, ${b}`);
      const [h, s, l] = rgbToHsl(r, g, b);
      setHsl(`${h}, ${s}%, ${l}%`);
      setPreviewColor(clean);
    }
  };

  const updateFromRgb = (value: string) => {
    setRgb(value);
    const parts = value.split(",").map((s) => parseInt(s.trim()));
    if (parts.length === 3 && parts.every((n) => !isNaN(n) && n >= 0 && n <= 255)) {
      const [r, g, b] = parts;
      const h = rgbToHex(r, g, b);
      setHex(h);
      const [hh, ss, ll] = rgbToHsl(r, g, b);
      setHsl(`${hh}, ${ss}%, ${ll}%`);
      setPreviewColor(h);
    }
  };

  const updateFromHsl = (value: string) => {
    setHsl(value);
    const parts = value.replace(/%/g, "").split(",").map((s) => parseInt(s.trim()));
    if (parts.length === 3 && !parts.some(isNaN)) {
      const [h, s, l] = parts;
      const [r, g, b] = hslToRgb(h, s, l);
      const hexVal = rgbToHex(r, g, b);
      setHex(hexVal);
      setRgb(`${r}, ${g}, ${b}`);
      setPreviewColor(hexVal);
    }
  };

  const handleCopy = async (field: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      {/* Color preview */}
      <div
        className="w-full h-32 rounded-lg border border-slate-700 transition-colors"
        style={{ backgroundColor: previewColor }}
      />

      {/* Color picker */}
      <div className="flex items-center gap-3">
        <label className="text-xs text-slate-400">Pick:</label>
        <input
          type="color"
          value={previewColor}
          onChange={(e) => updateFromHex(e.target.value)}
          className="w-12 h-10 rounded cursor-pointer bg-transparent border-0"
        />
      </div>

      {/* HEX */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="panel-label">HEX</span>
          <button onClick={() => handleCopy("hex", hex)} className="btn-ghost text-xs">
            {copiedField === "hex" ? "✓ Copied!" : "Copy"}
          </button>
        </div>
        <input
          type="text"
          value={hex}
          onChange={(e) => updateFromHex(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-slate-100 font-mono outline-none focus:border-brand-500"
          placeholder="#000000"
        />
      </div>

      {/* RGB */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="panel-label">RGB</span>
          <button onClick={() => handleCopy("rgb", `rgb(${rgb})`)} className="btn-ghost text-xs">
            {copiedField === "rgb" ? "✓ Copied!" : "Copy"}
          </button>
        </div>
        <input
          type="text"
          value={rgb}
          onChange={(e) => updateFromRgb(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-slate-100 font-mono outline-none focus:border-brand-500"
          placeholder="0, 0, 0"
        />
      </div>

      {/* HSL */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="panel-label">HSL</span>
          <button onClick={() => handleCopy("hsl", `hsl(${hsl})`)} className="btn-ghost text-xs">
            {copiedField === "hsl" ? "✓ Copied!" : "Copy"}
          </button>
        </div>
        <input
          type="text"
          value={hsl}
          onChange={(e) => updateFromHsl(e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-slate-100 font-mono outline-none focus:border-brand-500"
          placeholder="0, 0%, 0%"
        />
      </div>
    </div>
  );
}
