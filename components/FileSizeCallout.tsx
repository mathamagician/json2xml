"use client";

import { useEffect, useState } from "react";

export default function FileSizeCallout() {
  const [supportsFSAPI, setSupportsFSAPI] = useState<boolean | null>(null);

  useEffect(() => {
    setSupportsFSAPI(typeof window !== "undefined" && "showSaveFilePicker" in window);
  }, []);

  // Before hydration — show neutral copy to avoid layout shift
  if (supportsFSAPI === null) {
    return (
      <div>
        <h3 className="text-slate-200 font-semibold mb-2">📁 Large File Support</h3>
        <p>
          Drag and drop <code className="text-slate-300">.json</code> or{" "}
          <code className="text-slate-300">.xml</code> files up to 5 GB. Large files convert
          off the main thread so the page stays responsive.
        </p>
      </div>
    );
  }

  if (supportsFSAPI) {
    return (
      <div>
        <h3 className="text-slate-200 font-semibold mb-2">📁 Files up to 5 GB</h3>
        <p>
          Your browser supports direct-to-disk streaming. Files over 512 MB are written
          straight to a file you choose — no output size limit, no download wait.
          Files up to 5 GB supported.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-slate-200 font-semibold mb-2">📁 Files up to 3 GB</h3>
      <p>
        Drag and drop <code className="text-slate-300">.json</code> or{" "}
        <code className="text-slate-300">.xml</code> files up to 3 GB. Large files stream
        off the main thread and download automatically when done. For 5 GB support,
        use Chrome or Edge.
      </p>
    </div>
  );
}
