# JSON2XML v4.0 — Plan

**Codename:** Titan
**Goal:** Push file processing limits to 1–2GB via streaming, add Google Translate, remove Morse Code.
**Estimated scope:** Medium-large. Streaming is the heaviest lift; translate and cleanup are quick.

---

## Summary of Changes

| # | Change | Effort |
|---|--------|--------|
| 1 | Remove Morse Code Translator | Low |
| 2 | Add Google Translate widget | Low |
| 3 | Streaming JSON parser (stream-json) | High |
| 4 | Streaming XML parser (sax-based) | High |
| 5 | Update Web Worker thresholds + UX | Medium |

---

## 1. Remove Morse Code Translator

**Files to delete:**
- `app/morse-code-translator/` (entire directory)
- `components/MorseCodeTool.tsx`
- `lib/morse.ts`

**Files to update:**
- `lib/tools.ts` — remove entry
- Any RelatedTools references

No other tools reference Morse Code. Safe to delete outright.

---

## 2. Google Translate Widget

**Approach:** Add the Google Translate script + init function to `app/layout.tsx`. Place the `#google_translate_element` div in the Header component so it appears on every page.

**Files to update:**
- `app/layout.tsx` — add translate script tags
- `components/Header.tsx` — add translate div, style to fit nav

**Notes:**
- Use direct `<script>` tags (same pattern as AdSense — NOT next/script)
- Style the dropdown to match dark theme as much as possible (limited control over Google's widget)
- Place in header right side, near the existing nav

---

## 3. Streaming JSON Parser

**Problem:** Current approach loads entire file into memory. A 500MB JSON file can use 2–4GB of heap during parsing, crashing the tab on files approaching 1GB.

**Solution:** Replace bulk `JSON.parse()` for large files with a streaming parser that processes the file in chunks without materializing the full object tree in memory.

**Library:** `stream-json` — streaming JSON parser that works in browsers via a Web Worker + ReadableStream pipeline.

**Architecture:**

```
File input
  → FileReader (ReadableStream / chunked)
  → Web Worker
    → stream-json parser (streaming, chunk by chunk)
    → output emitter (streaming XML/YAML/CSV writer)
  → Main thread receives output chunks
  → Output assembled or streamed to download
```

**New thresholds (proposed):**

| File size | Strategy |
|-----------|----------|
| < 512 KB | Sync on main thread (unchanged) |
| 512 KB – 50 MB | Web Worker, bulk parse (unchanged) |
| 50 MB – 2 GB | Web Worker, streaming parse (NEW) |
| > 2 GB | Reject with clear error message |

**New files:**
- `lib/streaming-json-parser.ts` — streaming JSON→XML/YAML/CSV converter logic
- `lib/streaming-converter.worker.ts` — Web Worker that runs the streaming pipeline

**Output handling for large files:**
- No textarea preview for files > 50MB (already the case for >5MB)
- Output streamed directly to a Blob → download link
- Progress bar showing bytes processed / total

**Supported conversions in streaming mode:**
- JSON → XML (primary use case)
- JSON → YAML
- JSON → CSV (flat arrays only — nested streaming is too complex for v4)

**Not in streaming mode (v4):**
- XML → JSON (requires different streaming approach — phase 2)
- Any formatter/validator (these need the full document)

---

## 4. Streaming XML Parser

**Library:** `sax` (sax-js) — event-driven SAX parser, designed for streaming, works in browsers.

**Use case:** XML → JSON for files > 50MB.

**Architecture:**
```
File input (chunked)
  → Web Worker
    → sax parser (event-driven: startElement, endElement, text)
    → JSON object builder (streaming)
  → Output as JSON download
```

**New files:**
- `lib/streaming-xml-parser.ts` — SAX-based XML→JSON streaming logic
- Integrated into `lib/streaming-converter.worker.ts`

**Limitations:**
- Output is always a download (no preview for large XML)
- Namespace handling kept simple (same as current fast-xml-parser behavior)

---

## 5. UX Updates

**Progress indicator:**
- Current: simple spinner
- New: `X MB of Y MB processed (Z%)` for streaming conversions
- Estimated time remaining (rolling average of throughput MB/s)

**File size messaging:**
- Update all "500 MB" references → "Up to 2 GB"
- Update hero copy and tool descriptions

**Error handling:**
- Clear message if file > 2GB: "File too large. Maximum supported size is 2 GB."
- Clear message if streaming parse fails mid-file (corrupted data)
- Memory pressure detection: if Worker reports OOM, surface actionable error

---

## Implementation Order

1. **Remove Morse Code** (15 min) — quick win, no risk
2. **Google Translate** (30 min) — quick win, isolated change
3. **Install dependencies** — `stream-json`, `sax`
4. **Streaming JSON → XML** — build and test with large files
5. **Streaming XML → JSON** — build and test
6. **Update thresholds + UX copy** — wire everything together
7. **Test with real large files** (100MB, 500MB, 1GB)
8. **Deploy**

---

## Dependencies to Add

```bash
npm install stream-json sax
npm install --save-dev @types/sax
```

Note: `stream-json` is designed for Node but has browser-compatible builds. Verify bundle behavior in Web Worker context before committing.

---

## Risks

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| stream-json doesn't work in browser Web Worker | Medium | Test early; fallback to alternative (oboe.js or manual chunked parser) |
| SAX output quality worse than fast-xml-parser | Low | Keep fast-xml-parser for <50MB files |
| Memory still blows up despite streaming | Low | Test with real 1GB files; set hard 2GB cap |
| Google Translate banner looks bad on dark theme | High | Accept it or use CSS to minimize visual impact |

---

## Version

This plan targets **v4.0**. Ship as a single release after all 5 changes are complete and tested.
