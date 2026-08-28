import React from "react";
import Link from "next/link";
import { Database } from "lucide-react";

export function TopNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--sql-border)] bg-[var(--sql-darker)]/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Database size={18} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[var(--sql-text)] tracking-tight leading-none">Anusha&apos;s SQL Lab</span>
            <span className="text-[10px] text-[var(--sql-text-subtle)] tracking-widest uppercase">Interactive SQL Playground</span>
          </div>
        </Link>
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-[11px] font-mono text-[var(--sql-text-subtle)] px-2.5 py-1 rounded-md border border-[var(--sql-border)] bg-[var(--sql-surface)]">
            SQLite Engine
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] text-emerald-400 font-medium">ONLINE</span>
        </div>
      </div>
    </nav>
  );
}
