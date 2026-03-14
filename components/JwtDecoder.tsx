"use client";

import { useState } from "react";

const SAMPLE_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIEpvaG5zb24iLCJlbWFpbCI6ImFsaWNlQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzE2MjM5MDIyLCJleHAiOjE3MTYyNDI2MjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

type DecodedJwt = {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
};

function decodeJwt(token: string): DecodedJwt {
  const parts = token.trim().split(".");
  if (parts.length !== 3) throw new Error("Invalid JWT — must have 3 parts separated by dots.");

  const decodeBase64Url = (str: string): string => {
    let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4) base64 += "=";
    return atob(base64);
  };

  let header: Record<string, unknown>;
  let payload: Record<string, unknown>;

  try { header = JSON.parse(decodeBase64Url(parts[0])); } catch { throw new Error("Invalid JWT header — could not decode."); }
  try { payload = JSON.parse(decodeBase64Url(parts[1])); } catch { throw new Error("Invalid JWT payload — could not decode."); }

  return { header, payload, signature: parts[2] };
}

function formatTimestamp(ts: number): string {
  return new Date(ts * 1000).toLocaleString();
}

export default function JwtDecoder() {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState<DecodedJwt | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleChange = (value: string) => {
    setToken(value);
    setError(null);
    setDecoded(null);
    if (!value.trim()) return;
    try {
      setDecoded(decodeJwt(value));
    } catch (e) {
      setError((e as Error).message);
    }
  };

  const handleCopy = async (field: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleClear = () => { setToken(""); setDecoded(null); setError(null); };

  const handleSample = () => { handleChange(SAMPLE_JWT); };

  const isExpired = decoded?.payload?.exp ? (decoded.payload.exp as number) * 1000 < Date.now() : null;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-brand-400">
          JWT Decoder
        </div>
        {!token && (
          <button onClick={handleSample} className="btn-ghost text-brand-400 hover:text-brand-300">Sample</button>
        )}
        {token && (
          <button onClick={handleClear} className="btn-ghost text-red-400 hover:text-red-300">Clear</button>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <span className="panel-label">JWT Token</span>
        <textarea
          className="editor-textarea !min-h-[120px]"
          placeholder="Paste your JWT token here (eyJhbG...)…"
          value={token}
          onChange={(e) => handleChange(e.target.value)}
          spellCheck={false}
        />
      </div>

      {error && (
        <div className="bg-red-950/40 border border-red-800 rounded-lg px-4 py-3 text-red-300 text-sm">{error}</div>
      )}

      {decoded && (
        <div className="flex flex-col gap-4">
          {/* Token metadata */}
          <div className="flex flex-wrap gap-3">
            {decoded.header.alg != null && (
              <span className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-300">
                Algorithm: <span className="text-brand-400">{String(decoded.header.alg)}</span>
              </span>
            )}
            {decoded.header.typ != null && (
              <span className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-300">
                Type: <span className="text-brand-400">{String(decoded.header.typ)}</span>
              </span>
            )}
            {decoded.payload.iat != null && (
              <span className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-300">
                Issued: <span className="text-slate-400">{formatTimestamp(decoded.payload.iat as number)}</span>
              </span>
            )}
            {decoded.payload.exp != null && (
              <span className={`bg-slate-800 border rounded-lg px-3 py-1.5 text-xs font-mono text-slate-300 ${isExpired ? "border-red-700" : "border-slate-700"}`}>
                Expires: <span className={isExpired ? "text-red-400" : "text-slate-400"}>{formatTimestamp(decoded.payload.exp as number)}</span>
                {isExpired !== null && (
                  <span className={`ml-2 font-semibold ${isExpired ? "text-red-400" : "text-green-400"}`}>
                    {isExpired ? "EXPIRED" : "VALID"}
                  </span>
                )}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Header */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="panel-label text-red-400">Header</span>
                <button onClick={() => handleCopy("header", JSON.stringify(decoded.header, null, 2))} className="btn-ghost text-xs">
                  {copiedField === "header" ? "✓ Copied!" : "Copy"}
                </button>
              </div>
              <pre className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 font-mono text-sm text-slate-300 overflow-auto max-h-[300px]">
                {JSON.stringify(decoded.header, null, 2)}
              </pre>
            </div>

            {/* Payload */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="panel-label text-purple-400">Payload</span>
                <button onClick={() => handleCopy("payload", JSON.stringify(decoded.payload, null, 2))} className="btn-ghost text-xs">
                  {copiedField === "payload" ? "✓ Copied!" : "Copy"}
                </button>
              </div>
              <pre className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 font-mono text-sm text-slate-300 overflow-auto max-h-[300px]">
                {JSON.stringify(decoded.payload, null, 2)}
              </pre>
            </div>
          </div>

          {/* Signature */}
          <div className="flex flex-col gap-2">
            <span className="panel-label text-green-400">Signature</span>
            <div className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 font-mono text-sm text-slate-500 break-all">
              {decoded.signature}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
