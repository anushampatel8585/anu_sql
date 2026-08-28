'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, PlayCircle, X, GripHorizontal, Sparkles } from 'lucide-react';
import SqlTerminal from '../SqlTerminal';
import CompletionBanner from '../CompletionBanner';
import alasql from 'alasql';

const ordersData = [
  { id: 1, customer: 'Ravi', city: 'Mysore', amount: 500 },
  { id: 2, customer: 'Priya', city: 'Mysore', amount: 700 },
  { id: 3, customer: 'Arun', city: 'Bengaluru', amount: 900 },
  { id: 4, customer: 'Kiran', city: 'Mysore', amount: 300 },
  { id: 5, customer: 'Meera', city: 'Bengaluru', amount: 400 },
  { id: 6, customer: 'Ravi', city: 'Chennai', amount: 600 },
];

function initDB() {
  try { alasql('DROP TABLE IF EXISTS orders'); } catch {}
  alasql('CREATE TABLE orders (id INT, customer STRING, city STRING, amount INT)');
  ordersData.forEach(o => alasql(`INSERT INTO orders VALUES (${o.id}, '${o.customer}', '${o.city}', ${o.amount})`));
}

export default function Module6() {
  const [output, setOutput] = useState<string[]>(['-- Module 6: DISTINCT', '-- Remove duplicate values from results.', '']);
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
    { content: (<><p>Without DISTINCT, you see duplicates. Try selecting all cities:</p><CopyBlock cmd="SELECT city FROM orders;" /><p className="mt-1.5 text-[var(--sql-text-subtle)]">Notice &quot;Mysore&quot; appears 3 times!</p></>) },
    { content: (<><p>Now add DISTINCT to remove duplicates:</p><CopyBlock cmd="SELECT DISTINCT city FROM orders;" /><p className="mt-1.5 text-[var(--sql-text-subtle)]">Now each city appears only once.</p></>) },
    { content: (<><p>DISTINCT works with multiple columns too. It removes rows where the combination of ALL selected columns is the same:</p><CopyBlock cmd="SELECT DISTINCT city, customer FROM orders;" /></>) },
    { content: (<><p>🎉 <strong className="text-emerald-400">DISTINCT mastered!</strong></p><p className="mt-1.5">DISTINCT removes duplicate rows from your result set. It&apos;s useful when you want to see unique values (like unique cities, unique departments, etc).</p></>) },
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
        const rows = result.map(r => cols.map(c => String(r[c]).padEnd(15)).join(''));
        setOutput(prev => [...prev, '', header, sep, ...rows, '', `${result.length} row(s) returned.`]);
        setResultTable(result);
        if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
      } else { setOutput(prev => [...prev, '0 rows returned.']); }
    } catch (err: any) { setOutput(prev => [...prev, `ERROR: ${err.message}`]); }
  };

  const nextStep = () => setCurrentStep(p => Math.min(steps.length - 1, p + 1));
  const prevStep = () => setCurrentStep(p => Math.max(0, p - 1));

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
        <AnimatePresence>{completed && <CompletionBanner moduleId="6" moduleTitle="DISTINCT" />}</AnimatePresence>
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
          <div className="text-xs font-bold text-[var(--sql-text-subtle)] tracking-widest uppercase mb-4 flex items-center gap-2"><Sparkles size={14} /> Source Table: orders</div>
          <div className="rounded-lg border border-[var(--sql-border)] bg-[var(--sql-surface)] overflow-hidden mb-8">
            <table className="w-full text-sm text-left">
              <thead className="bg-[var(--sql-surface-light)] text-[var(--sql-text-subtle)] text-xs uppercase tracking-wider"><tr><th className="px-4 py-2">id</th><th className="px-4 py-2">customer</th><th className="px-4 py-2">city</th><th className="px-4 py-2">amount</th></tr></thead>
              <tbody className="divide-y divide-[var(--sql-border)]">{ordersData.map(row => <tr key={row.id} className="hover:bg-[var(--sql-surface-light)]"><td className="px-4 py-2 font-mono text-[var(--sql-text)]">{row.id}</td><td className="px-4 py-2 font-mono text-[var(--sql-text)]">{row.customer}</td><td className="px-4 py-2 font-mono text-[var(--sql-text)]">{row.city}</td><td className="px-4 py-2 font-mono text-[var(--sql-text)]">{row.amount}</td></tr>)}</tbody>
            </table>
          </div>
          {resultTable && (<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><div className="text-xs font-bold text-emerald-400 tracking-widest uppercase mb-4">✓ Query Result</div><div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 overflow-hidden"><table className="w-full text-sm text-left"><thead className="bg-emerald-500/10 text-emerald-300 text-xs uppercase tracking-wider"><tr>{Object.keys(resultTable[0]).map(col => <th key={col} className="px-4 py-2">{col}</th>)}</tr></thead><tbody className="divide-y divide-emerald-500/10">{resultTable.map((row, i) => <tr key={i}>{Object.values(row).map((val, j) => <td key={j} className="px-4 py-2 font-mono text-[var(--sql-text)]">{String(val)}</td>)}</tr>)}</tbody></table></div></motion.div>)}
        </div>
      </div>
    </>
  );
}
