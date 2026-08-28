'use client';

import Link from 'next/link';
import { ArrowLeft, Database } from 'lucide-react';
import Module1 from './modules/Module1';
import Module2 from './modules/Module2';
import Module3 from './modules/Module3';
import Module4 from './modules/Module4';
import Module5 from './modules/Module5';
import Module6 from './modules/Module6';
import Module7 from './modules/Module7';
import Module8 from './modules/Module8';
import Module9 from './modules/Module9';
import Module10 from './modules/Module10';

const moduleTitles: Record<string, string> = {
  '1': 'What is a Database?',
  '2': 'Tables, Rows & Columns',
  '3': 'The SELECT Statement',
  '4': 'WHERE Clause',
  '5': 'ORDER BY',
  '6': 'DISTINCT',
  '7': 'INSERT',
  '8': 'UPDATE',
  '9': 'DELETE',
  '10': 'Aggregate Functions',
};

export default function ModuleClient({ id }: { id: string }) {
  const renderModule = () => {
    switch (id) {
      case '1': return <Module1 />;
      case '2': return <Module2 />;
      case '3': return <Module3 />;
      case '4': return <Module4 />;
      case '5': return <Module5 />;
      case '6': return <Module6 />;
      case '7': return <Module7 />;
      case '8': return <Module8 />;
      case '9': return <Module9 />;
      case '10': return <Module10 />;
      default: return (
        <div className="flex items-center justify-center h-full text-[var(--sql-text-muted)]">
          <p>Module {id} is currently under construction.</p>
        </div>
      );
    }
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-[var(--sql-darker)] text-[var(--sql-text)] overflow-hidden">
      {/* Top Navigation */}
      <header className="h-12 border-b border-[var(--sql-border)] flex items-center px-4 shrink-0 bg-[var(--sql-darker)]/95 backdrop-blur-xl z-10">
        <Link href="/" className="flex items-center gap-2 text-[var(--sql-text-muted)] hover:text-[var(--sql-text)] transition-colors">
          <ArrowLeft size={16} />
          <span className="text-xs font-medium hidden sm:inline">Back to Lab</span>
        </Link>
        
        <div className="mx-auto flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
            <Database size={12} className="text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[var(--sql-text)]">
              Module {id}
            </span>
            <span className="hidden sm:inline text-[10px] text-[var(--sql-text-subtle)] font-mono px-1.5 py-0.5 rounded border border-[var(--sql-border)] bg-[var(--sql-surface)]">
              {moduleTitles[id] || 'Unknown'}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-emerald-400 font-medium hidden sm:inline">LIVE</span>
        </div>
      </header>

      {/* Main Split Screen */}
      <main className="flex-1 min-h-0 flex flex-col lg:flex-row">
        {renderModule()}
      </main>
    </div>
  );
}
