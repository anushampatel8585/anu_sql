'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, PlayCircle, X, GripHorizontal, Plus } from 'lucide-react';
import SqlTerminal from '../SqlTerminal';
import CompletionBanner from '../CompletionBanner';
import alasql from 'alasql';

function initDB() {
  try { alasql('DROP TABLE IF EXISTS students'); } catch {}
  alasql('CREATE TABLE students (id INT, name STRING, department STRING, year INT)');
  alasql("INSERT INTO students VALUES (1, 'Ravi', 'CSE', 2)");
  alasql("INSERT INTO students VALUES (2, 'Priya', 'ECE', 3)");
  alasql("INSERT INTO students VALUES (3, 'Arun', 'CSE', 1)");
}

export default function Module7() {
  const [output, setOutput] = useState<string[]>(['-- Module 7: INSERT', '-- Add new rows to a table.', '']);
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showTour, setShowTour] = useState(true);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState(false);
  const [liveData, setLiveData] = useState<any[]>([]);
  const [newRowId, setNewRowId] = useState<number | null>(null);

  useEffect(() => { initDB(); refreshData(); }, []);
  useEffect(() => { setHasCopied(false); }, [currentStep]);

  const refreshData = () => {
    const data = alasql('SELECT * FROM students') as any[];
    setLiveData(data);
  };

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
    { content: (<><p>INSERT adds new rows to a table. It&apos;s like filling in a new row on a spreadsheet.</p><p className="mt-1.5">Add a new student:</p><CopyBlock cmd="INSERT INTO students VALUES (4, 'Meera', 'MECH', 2);" /></>) },
    { content: (<><p>You can also specify which columns to fill (others get NULL):</p><CopyBlock cmd="INSERT INTO students (id, name, department, year) VALUES (5, 'Kiran', 'CSE', 3);" /></>) },
    { content: (<><p>Now check your work — view all students:</p><CopyBlock cmd="SELECT * FROM students;" /></>) },
    { content: (<><p>🎉 <strong className="text-emerald-400">INSERT mastered!</strong></p><p className="mt-1.5">Watch the table on the right — new rows appear with a green highlight when you insert them!</p><p className="mt-1.5">Try inserting your own data!</p></>) },
  ];

  const handleCommand = (cmd: string) => {
    setOutput(prev => [...prev, `SQL> ${cmd}`]);
    try {
      const trimmed = cmd.trim().replace(/;$/, '');
      const result = alasql(trimmed);
      
      if (trimmed.toLowerCase().startsWith('insert')) {
        setOutput(prev => [...prev, '1 row inserted.']);
        refreshData();
        // Find the newly inserted row
        const newData = alasql('SELECT * FROM students') as any[];
        if (newData.length > liveData.length) {
          setNewRowId(newData[newData.length - 1].id);
          setTimeout(() => setNewRowId(null), 3000);
        }
        if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
      } else if (Array.isArray(result) && result.length > 0) {
        const cols = Object.keys(result[0]);
        const header = cols.map(c => c.padEnd(15)).join('');
        const sep = '-'.repeat(header.length);
        const rows = result.map((r: any) => cols.map(c => String(r[c]).padEnd(15)).join(''));
        setOutput(prev => [...prev, '', header, sep, ...rows, '', `${result.length} row(s) returned.`]);
        refreshData();
        if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
      } else {
        setOutput(prev => [...prev, 'Query executed.']);
        refreshData();
      }
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
        <AnimatePresence>{completed && <CompletionBanner moduleId="7" moduleTitle="INSERT" />}</AnimatePresence>
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
          <div className="text-xs font-bold text-[var(--sql-text-subtle)] tracking-widest uppercase mb-4 flex items-center gap-2"><Plus size={14} /> Live Table: students ({liveData.length} rows)</div>
          <div className="rounded-lg border border-[var(--sql-border)] bg-[var(--sql-surface)] overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-[var(--sql-surface-light)] text-[var(--sql-text-subtle)] text-xs uppercase tracking-wider"><tr><th className="px-4 py-2">id</th><th className="px-4 py-2">name</th><th className="px-4 py-2">department</th><th className="px-4 py-2">year</th></tr></thead>
              <tbody className="divide-y divide-[var(--sql-border)]">
                <AnimatePresence>
                  {liveData.map(row => (
                    <motion.tr key={row.id} initial={{ opacity: 0, backgroundColor: 'rgba(16,185,129,0.2)' }} animate={{ opacity: 1, backgroundColor: newRowId === row.id ? 'rgba(16,185,129,0.15)' : 'transparent' }} transition={{ duration: 0.5 }} className="hover:bg-[var(--sql-surface-light)]">
                      <td className="px-4 py-2 font-mono text-[var(--sql-text)]">{row.id}</td><td className="px-4 py-2 font-mono text-[var(--sql-text)]">{row.name}</td><td className="px-4 py-2 font-mono text-[var(--sql-text)]">{row.department}</td><td className="px-4 py-2 font-mono text-[var(--sql-text)]">{row.year}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
