import Link from 'next/link';
import { Database, Search, ArrowDownAZ, Key, Filter, GitMerge, Calculator, LayoutTemplate, BoxSelect, Rows3, Plus, Pencil, Trash2, Sparkles } from 'lucide-react';

const modules = [
  { id: 1, title: 'What is a Database?', description: 'Understand the core concept of storing data effectively.', icon: Database, tier: 'Foundation' },
  { id: 2, title: 'Tables, Rows & Columns', description: 'The fundamental structure of a relational database.', icon: LayoutTemplate, tier: 'Foundation' },
  { id: 3, title: 'The SELECT Statement', description: 'Learn how to fetch exactly what you need from a table.', icon: BoxSelect, tier: 'Foundation' },
  { id: 4, title: 'WHERE Clause', description: 'Filter records and conditionally retrieve data.', icon: Filter, tier: 'Querying' },
  { id: 5, title: 'ORDER BY', description: 'Sort your result set in ascending or descending order.', icon: ArrowDownAZ, tier: 'Querying' },
  { id: 6, title: 'DISTINCT', description: 'Remove duplicate values from query results.', icon: Sparkles, tier: 'Querying' },
  { id: 7, title: 'INSERT', description: 'Add new rows of data into a table.', icon: Plus, tier: 'Data Modification' },
  { id: 8, title: 'UPDATE', description: 'Modify existing data in a table.', icon: Pencil, tier: 'Data Modification' },
  { id: 9, title: 'DELETE', description: 'Remove rows from a table permanently.', icon: Trash2, tier: 'Data Modification' },
  { id: 10, title: 'Aggregate Functions', description: 'COUNT, SUM, AVG, MIN, MAX and GROUP BY.', icon: Calculator, tier: 'Advanced Querying' },
];

const tierColors: Record<string, string> = {
  'Foundation': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  'Querying': 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  'Data Modification': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  'Advanced Querying': 'text-violet-400 bg-violet-500/10 border-violet-500/20',
};

export default function Home() {
  return (
    <div className="flex-1 bg-[var(--sql-darker)] text-[var(--sql-text)] sql-grid-bg relative w-full">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 rounded-full bg-gradient-to-b from-indigo-500 to-indigo-700" />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-[var(--sql-text)]">SQL Lab Modules</h1>
              <p className="text-xs text-[var(--sql-text-subtle)] mt-0.5">10 interactive modules · Foundation → Advanced</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[var(--sql-text-subtle)] font-mono bg-[var(--sql-surface)] px-3 py-1.5 rounded-lg border border-[var(--sql-border)] w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            All Modules Unlocked
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <Link
                key={mod.id}
                href={`/lesson/${mod.id}`}
                className="sql-card group p-5 flex flex-col relative overflow-hidden"
              >
                {/* Shimmer on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 sql-shimmer pointer-events-none" />
                
                {/* Header */}
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div className="w-10 h-10 rounded-lg bg-[var(--sql-surface-light)] border border-[var(--sql-border)] flex items-center justify-center group-hover:border-[var(--sql-accent)]/30 group-hover:bg-indigo-500/5 transition-all duration-300">
                    <Icon size={18} className="text-[var(--sql-text-muted)] group-hover:text-[var(--sql-accent)] transition-colors duration-300" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-mono text-[var(--sql-text-subtle)] font-bold tabular-nums">
                      {String(mod.id).padStart(2, '0')}
                    </span>
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${tierColors[mod.tier]}`}>
                      {mod.tier}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-1">
                  <h3 className="text-base font-bold text-[var(--sql-text)] mb-1.5">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-[var(--sql-text-muted)] leading-relaxed">{mod.description}</p>
                </div>

                {/* Bottom */}
                <div className="mt-4 pt-3 border-t border-[var(--sql-border)] flex items-center justify-between relative z-10">
                  <span className="text-[11px] text-[var(--sql-text-subtle)] font-medium group-hover:text-[var(--sql-accent)] transition-colors">Start Lesson →</span>
                  <div className="flex gap-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--sql-border-light)] group-hover:bg-[var(--sql-accent)] transition-colors duration-300" style={{ transitionDelay: `${i * 75}ms` }} />
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-[var(--sql-border-light)] to-transparent" />
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center">
              <Database size={14} className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[var(--sql-text-muted)]">Anusha&apos;s SQL Lab</span>
              <span className="text-[10px] text-[var(--sql-text-subtle)]">Interactive SQL Database Simulator</span>
            </div>
          </div>
          
          <div className="text-center sm:text-right">
            <p className="text-xs text-[var(--sql-text-muted)]">
              Designed & Built by <span className="font-semibold text-[var(--sql-text)]">Anusha M Patel</span>
            </p>
            <p className="text-[10px] text-[var(--sql-text-subtle)] mt-0.5">
              Interactive Visual SQL Learning Platform
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
