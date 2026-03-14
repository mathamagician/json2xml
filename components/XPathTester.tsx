"use client";

import { useState, useCallback } from "react";

function evaluateXPath(xmlText: string, xpathExpr: string): string[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, "application/xml");

  const errorNode = doc.querySelector("parsererror");
  if (errorNode) {
    throw new Error("Invalid XML — " + (errorNode.textContent?.split("\n")[0] ?? "parse error"));
  }

  const result = doc.evaluate(xpathExpr, doc, null, XPathResult.ANY_TYPE, null);
  const nodes: string[] = [];

  switch (result.resultType) {
    case XPathResult.NUMBER_TYPE:
      nodes.push(String(result.numberValue));
      break;
    case XPathResult.STRING_TYPE:
      nodes.push(result.stringValue);
      break;
    case XPathResult.BOOLEAN_TYPE:
      nodes.push(String(result.booleanValue));
      break;
    default: {
      let node = result.iterateNext();
      while (node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const serializer = new XMLSerializer();
          nodes.push(serializer.serializeToString(node));
        } else if (node.nodeType === Node.ATTRIBUTE_NODE) {
          nodes.push(`${(node as Attr).name}="${(node as Attr).value}"`);
        } else {
          nodes.push(node.textContent ?? "");
        }
        node = result.iterateNext();
      }
    }
  }

  return nodes;
}

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
  <book category="fiction">
    <title>The Great Gatsby</title>
    <author>Fitzgerald</author>
    <price>12.99</price>
  </book>
  <book category="fiction">
    <title>1984</title>
    <author>Orwell</author>
    <price>9.99</price>
  </book>
  <book category="science">
    <title>A Brief History of Time</title>
    <author>Hawking</author>
    <price>15.99</price>
  </book>
</bookstore>`;
const SAMPLE_XPATH = "//book[@category='fiction']/title";

export default function XPathTester() {
  const [xml, setXml] = useState("");
  const [xpath, setXpath] = useState("/");
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const evaluate = useCallback((xmlText: string, xpathExpr: string) => {
    if (!xmlText.trim() || !xpathExpr.trim()) {
      setResults([]);
      setError(null);
      return;
    }
    try {
      setResults(evaluateXPath(xmlText, xpathExpr));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
      setResults([]);
    }
  }, []);

  const handleXmlChange = (text: string) => {
    setXml(text);
    evaluate(text, xpath);
  };

  const handleXpathChange = (text: string) => {
    setXpath(text);
    evaluate(xml, text);
  };

  const handleSample = () => {
    setXml(SAMPLE_XML);
    setXpath(SAMPLE_XPATH);
    evaluate(SAMPLE_XML, SAMPLE_XPATH);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(results.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        {!xml && (
          <button onClick={handleSample} className="btn-ghost text-brand-400 hover:text-brand-300">
            Sample
          </button>
        )}
      </div>

      {/* XPath input */}
      <div className="flex flex-col gap-2">
        <span className="panel-label">XPath Expression</span>
        <div className="flex gap-3">
          <input
            type="text"
            value={xpath}
            onChange={(e) => handleXpathChange(e.target.value)}
            placeholder="//book/title"
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-slate-100 font-mono outline-none focus:border-brand-500"
          />
          {results.length > 0 && (
            <div className="flex items-center px-3 text-sm text-brand-400 font-semibold">
              {results.length} match{results.length !== 1 ? "es" : ""}
            </div>
          )}
        </div>
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <span className="panel-label">XML Input</span>
          <textarea
            className="editor-textarea"
            placeholder="Paste your XML here…"
            value={xml}
            onChange={(e) => handleXmlChange(e.target.value)}
            spellCheck={false}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="panel-label">Results</span>
            {results.length > 0 && (
              <button onClick={handleCopy} className="btn-ghost text-xs">
                {copied ? "✓ Copied!" : "Copy"}
              </button>
            )}
          </div>
          <div className="relative">
            <textarea
              className="editor-textarea"
              placeholder="Matched nodes will appear here…"
              value={error ? "" : results.join("\n\n")}
              readOnly
              spellCheck={false}
            />
            {error && (
              <div className="absolute inset-0 flex items-start p-4 bg-red-950/40 rounded-lg border border-red-800">
                <div>
                  <p className="text-red-400 font-semibold text-sm mb-1">Error</p>
                  <p className="text-red-300 text-sm font-mono">{error}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
