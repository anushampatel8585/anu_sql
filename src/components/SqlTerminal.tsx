'use client';

import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';
import 'prismjs/themes/prism-tomorrow.css';
import { Terminal as TermIcon, Play } from 'lucide-react';
import alasql from 'alasql';

interface SqlTerminalProps {
  onCommand: (cmd: string) => void;
  output: string[];
}

export default function SqlTerminal({ onCommand, output }: SqlTerminalProps) {
  const [input, setInput] = useState('');

  const handleExecute = () => {
    if (!input.trim()) return;
    onCommand(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleExecute();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0d1117] border-t border-[var(--sql-border)]">
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--sql-surface-light)] border-b border-[var(--sql-border)] shadow-sm z-10 shrink-0">
        <div className="flex items-center gap-2 text-[var(--sql-text-muted)]">
          <TermIcon size={16} />
          <span className="text-xs font-mono uppercase tracking-wider font-bold">SQL Console</span>
        </div>
        <button
          onClick={handleExecute}
          className="flex items-center gap-1 px-3 py-1 bg-[var(--sql-accent)] hover:bg-[var(--sql-accent-light)] text-white rounded text-xs font-medium transition-colors shadow-[0_0_15px_rgba(79,70,229,0.3)]"
        >
          <Play size={12} />
          Execute (Enter)
        </button>
      </div>
      
      <div className="flex-1 overflow-auto p-4 font-mono text-sm">
        {/* Terminal Output */}
        <div className="mb-4 space-y-1">
          {output.map((line, i) => (
            <div key={i} className="text-slate-300 whitespace-pre-wrap text-xs">{line}</div>
          ))}
        </div>
        
        {/* Terminal Input */}
        <div className="flex">
          <span className="text-indigo-400 mr-2 mt-[2px] text-xs font-bold">SQL&gt;</span>
          <div className="flex-1">
            <Editor
              value={input}
              onValueChange={setInput}
              highlight={code => Prism.highlight(code, Prism.languages.sql, 'sql')}
              padding={0}
              onKeyDown={handleKeyDown}
              style={{
                fontFamily: '"Geist Mono", "Fira Code", monospace',
                fontSize: 13,
                backgroundColor: 'transparent',
                outline: 'none',
              }}
              textareaClassName="focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
