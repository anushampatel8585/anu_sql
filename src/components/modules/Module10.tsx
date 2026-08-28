'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, PlayCircle, X, GripHorizontal, Calculator } from 'lucide-react';
import SqlTerminal from '../SqlTerminal';
import CompletionBanner from '../CompletionBanner';
import alasql from 'alasql';

const ordersData = [
  { id: 1, customer: 'Ravi', city: 'Mysore', amount: 500 },
  { id: 2, customer: 'Priya', city: 'Mysore', amount: 700 },
  { id: 3, customer: 'Arun', city: 'Bengaluru', amount: 900 },
  { id: 4, customer: 'Kiran', city: 'Mysore', amount: 300 },
  { id: 5, customer: 'Meera', city: 'Bengaluru', amount: 400 },
  { id: 6, customer: 'Deepa', city: 'Chennai', amount: 600 },
  { id: 7, customer: 'Raj', city: 'Chennai', amount: 800 },
];

function initDB() {
  try { alasql('DROP TABLE IF EXISTS orders'); } catch {}
  alasql('CREATE TABLE orders (id INT, customer STRING, city STRING, amount INT)');
  ordersData.forEach(o => alasql(`INSERT INTO orders VALUES (${o.id}, '${o.customer}', '${o.city}', ${o.amount})`));
}

export default function Module10() {
  const [output, setOutput] = useState<string[]>(['-- Module 10: Aggregate Functions', '-- COUNT, SUM, AVG, MIN, MAX + GROUP BY', '']);
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showTour, setShowTour] = useState(true);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState(false);
  const [resultTable, setResultTable] = useState<any[] | null>(null);

  useEffect(() => { initDB(); }, []);
  useEffect(() => { setHasCopied(false); }, [currentStep]);
  const handleCopy = (cmd: string) => { navigator.clipboard.writeText(cmd); setCopiedCmd(cmd); setHasCopied(true); setTimeout(() => setCopiedCmd(null), 2000); };

  const CopyBlock = ({ cmd }: { cmd: string }) => (
    <>
      <div className="flex items-center justify-between mt-1.5 bg-[#0d1117] p-1.5 rounded border border-[var(--sql-border)]">
        <code className="text-indigo-400 font-mono text-[10px]">{cmd}</code>
        <button onClick={() => handleCopy(cmd)} className="text-slate-500 hover:text-white transition-colors">{copiedCmd === cmd ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}</button>
      </div>
      <AnimatePresence>{hasCopied && copiedCmd === cmd && (<motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="mt-2 p-1.5 bg-indigo-500/20 border border-indigo-500/40 rounded text-[10px] text-indigo-300 font-medium">👉 Paste in console and press Enter!</motion.div>)}</AnimatePresence>
    </>
  );

  const steps = [
    { content: (<><p>Aggregate functions perform calculations on a set of values and return a single result.</p><p className="mt-1.5">Count how many orders exist:</p><CopyBlock cmd="SELECT COUNT(*) AS total_orders FROM orders;" /></>) },
    { content: (<><p>SUM adds up values. Calculate total revenue:</p><CopyBlock cmd="SELECT SUM(amount) AS total_revenue FROM orders;" /></>) },
    { content: (<><p>AVG, MIN, MAX work similarly:</p><CopyBlock cmd="SELECT AVG(amount) AS avg_order, MIN(amount) AS smallest, MAX(amount) AS largest FROM orders;" /></>) },
    { content: (<><p>GROUP BY splits rows into groups and applies aggregates per group. Revenue per city:</p><CopyBlock cmd="SELECT city, SUM(amount) AS revenue, COUNT(*) AS orders FROM orders GROUP BY city;" /><p className="mt-1.5 text-[var(--sql-text-subtle)]">Watch the visualization — rows gather into groups!</p></>) },
    { content: (<><p>HAVING filters groups (like WHERE, but for groups):</p><CopyBlock cmd="SELECT city, SUM(amount) AS revenue FROM orders GROUP BY city HAVING SUM(amount) > 1000;" /></>) },
    { content: (<><p>🎉 <strong className="text-emerald-400">Aggregates mastered!</strong></p><p className="mt-1">Summary:</p><ul className="mt-1 text-[10px] space-y-0.5 text-[var(--sql-text-muted)]"><li>• <code className="text-indigo-300">COUNT</code> → number of rows</li><li>• <code className="text-indigo-300">SUM</code> → total</li><li>• <code className="text-indigo-300">AVG</code> → average</li><li>• <code className="text-indigo-300">GROUP BY</code> → per-group calculations</li><li>• <code className="text-indigo-300">HAVING</code> → filter groups</li></ul></>) },
  ];

  const handleCommand = (cmd: string) => {
    setOutput(prev => [...prev, `SQL> ${cmd}`]);
    try {
      initDB();
      const result = alasql(cmd.replace(/;$/, '')) as any[];
      if (Array.isArray(result) && result.length > 0) {
        const cols = Object.keys(result[0]);
        const header = cols.map(c => c.padEnd(15)).join('');
        const sep = '-'.repeat(header.length);
        const rows = result.map((r: any) => cols.map(c => String(r[c]).padEnd(15)).join(''));
        setOutput(prev => [...prev, '', header, sep, ...rows, '', `${result.length} row(s) returned.`]);
        setResultTable(result);
        if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
      } else { setOutput(prev => [...prev, '0 rows returned.']); }
    } catch (err: any) { setOutput(prev => [...prev, `ERROR: ${err.message}`]); }
  };

  const nextStep = () => setCurrentStep(p => Math.min(steps.length - 1, p + 1));
  const prevStep = () => setCurrentStep(p => Math.max(0, p - 1));

  // Group visualization data
  const groups: Record<string, typeof ordersData> = {};
  ordersData.forEach(o => { if (!groups[o.city]) groups[o.city] = []; groups[o.city].push(o); });
  const groupColors: Record<string, string> = { 'Mysore': 'indigo', 'Bengaluru': 'emerald', 'Chennai': 'amber' };

  return (
    <>
      <div className="w-full lg:w-1/3 flex flex-col lg:border-r border-b lg:border-b-0 border-[var(--sql-border)] bg-[var(--sql-surface)] overflow-hidden relative z-10 h-[50vh] lg:h-full shrink-0">
        <div className="p-3 border-b border-[var(--sql-border)] flex items-center justify-between bg-[var(--sql-surface)] shrink-0">
          <h2 className="text-sm font-bold text-[var(--sql-text)]">SQL Console</h2>
          {!showTour && <button onClick={() => { setCurrentStep(0); setShowTour(true); }} className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] bg-indigo-600/20 text-indigo-400 font-medium rounded border border-indigo-500/30"><PlayCircle size={14} /> Start Tutor</button>}
        </div>
        <div className="flex-1 min-h-0"><SqlTerminal onCommand={handleCommand} output={output} /></div>
      </div>
      <div className="w-full lg:w-2/3 bg-[var(--sql-darker)] p-4 lg:p-8 flex items-start justify-center overflow-auto relative h-[50vh] lg:h-full sql-grid-bg">
        <AnimatePresence>{completed && <CompletionBanner moduleId="10" moduleTitle="Aggregate Functions" />}</AnimatePresence>
        <AnimatePresence>
          {showTour && (
            <motion.div drag dragMomentum={false} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="absolute top-6 right-6 z-50 w-[260px] bg-[var(--sql-surface)]/95 backdrop-blur-md border border-[var(--sql-border)] rounded-lg shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing">
              <div className="bg-indigo-600 px-3 py-2 flex items-center justify-between"><div className="flex items-center gap-1.5"><GripHorizontal size={12} className="text-indigo-300" /><span className="text-white text-xs font-bold select-none">SQL Tutor</span></div><button onClick={() => setShowTour(false)} className="text-indigo-200 hover:text-white" onPointerDown={(e) => e.stopPropagation()}><X size={12} /></button></div>
              <div className="p-3 text-xs text-[var(--sql-text-muted)] leading-snug pointer-events-auto select-text" onPointerDown={(e) => e.stopPropagation()}>
                {steps[currentStep].content}
                <div className="mt-4 flex justify-between items-center"><span className="text-[9px] text-[var(--sql-text-subtle)]">Step {currentStep + 1}/{steps.length}</span><div className="flex gap-1.5">{currentStep > 0 && <button onClick={prevStep} className="px-2 py-1 bg-[var(--sql-surface-light)] text-[var(--sql-text-muted)] rounded text-[10px]">Back</button>}{currentStep < steps.length - 1 ? <button onClick={nextStep} className="px-2 py-1 bg-indigo-500 text-white font-bold rounded text-[10px]">Next</button> : <button onClick={() => { setShowTour(false); setCompleted(true); }} className="px-2 py-1 bg-emerald-500 text-white font-bold rounded text-[10px]">Finish</button>}</div></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="w-full max-w-3xl mt-16">
          <div className="text-xs font-bold text-[var(--sql-text-subtle)] tracking-widest uppercase mb-4 flex items-center gap-2"><Calculator size={14} /> Source Table: orders — Grouped by City</div>
          
          {/* Group visualization */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {Object.entries(groups).map(([city, rows]) => {
              const color = groupColors[city] || 'slate';
              const total = rows.reduce((s, r) => s + r.amount, 0);
              return (
                <motion.div key={city} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`rounded-lg border border-${color}-500/30 bg-${color}-500/5 p-4`}>
                  <div className={`text-xs font-bold text-${color}-400 mb-2 uppercase tracking-wider`}>{city}</div>
                  <div className="space-y-1">
                    {rows.map(r => (
                      <div key={r.id} className="flex justify-between text-[11px] font-mono text-[var(--sql-text-muted)]">
                        <span>{r.customer}</span><span>₹{r.amount}</span>
                      </div>
                    ))}
                  </div>
                  <div className={`mt-3 pt-2 border-t border-${color}-500/20 flex justify-between text-xs font-bold`}>
                    <span className={`text-${color}-300`}>SUM</span><span className={`text-${color}-300`}>₹{total}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-[var(--sql-text-subtle)]">
                    <span>COUNT</span><span>{rows.length}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {resultTable && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><div className="text-xs font-bold text-emerald-400 tracking-widest uppercase mb-4">✓ Query Result</div><div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 overflow-hidden"><table className="w-full text-sm text-left"><thead className="bg-emerald-500/10 text-emerald-300 text-xs uppercase tracking-wider"><tr>{Object.keys(resultTable[0]).map(col => <th key={col} className="px-4 py-2">{col}</th>)}</tr></thead><tbody className="divide-y divide-emerald-500/10">{resultTable.map((row, i) => <tr key={i}>{Object.values(row).map((val, j) => <td key={j} className="px-4 py-2 font-mono text-[var(--sql-text)]">{String(val)}</td>)}</tr>)}</tbody></table></div></motion.div>)}
        </div>
      </div>
    </>
  );
}
