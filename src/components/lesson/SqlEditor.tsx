"use client";

import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism-tomorrow.css"; // Dark theme
import { Play } from "lucide-react";

interface SqlEditorProps {
  initialValue?: string;
  onRun?: (query: string) => void;
}

export function SqlEditor({ initialValue = "", onRun }: SqlEditorProps) {
  const [code, setCode] = useState(initialValue);

  return (
    <div className="flex flex-col rounded-lg border border-[var(--sql-border)] bg-[#050505] shadow-sm overflow-hidden font-mono text-sm relative group">
      <div className="flex items-center justify-between bg-[var(--sql-surface-light)] px-4 py-2 border-b border-[var(--sql-border)]">
        <span className="text-[var(--sql-text-muted)] font-semibold text-xs tracking-wider uppercase">SQL_QUERY</span>
        <button
          onClick={() => onRun?.(code)}
          className="flex items-center gap-2 rounded bg-[var(--sql-accent)] px-3 py-1.5 text-xs font-bold text-white hover:bg-[var(--sql-accent-light)] transition-colors shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)]"
        >
          <Play className="h-3 w-3" /> EXECUTE
        </button>
      </div>
      <div className="p-4 overflow-auto min-h-[120px] focus-within:ring-1 focus-within:ring-[var(--sql-accent)] focus-within:ring-inset transition-shadow">
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => Prism.highlight(code, Prism.languages.sql, "sql")}
          padding={0}
          style={{
            fontFamily: '"Geist Mono", "Fira Code", monospace',
            fontSize: 14,
            backgroundColor: "transparent",
            color: "var(--sql-text)",
          }}
          className="editor-container focus:outline-none selection:bg-[var(--sql-accent)]/30"
        />
      </div>
    </div>
  );
}
