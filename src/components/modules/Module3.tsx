'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, PlayCircle, X, GripHorizontal } from 'lucide-react';
import SqlTerminal from '../SqlTerminal';
import CompletionBanner from '../CompletionBanner';
import alasql from 'alasql';

const studentsData = [
  { id: 1, name: 'Ravi', department: 'CSE', year: 2 },
  { id: 2, name: 'Priya', department: 'ECE', year: 3 },
  { id: 3, name: 'Arun', department: 'CSE', year: 1 },
  { id: 4, name: 'Meera', department: 'MECH', year: 2 },
];

function initDB() {
  try { alasql('DROP TABLE IF EXISTS students'); } catch {}
  alasql('CREATE TABLE students (id INT, name STRING, department STRING, year INT)');
  studentsData.forEach(s => alasql(`INSERT INTO students VALUES (${s.id}, '${s.name}', '${s.department}', ${s.year})`));
}

export default function Module3() {
  const [output, setOutput] = useState<string[]>(['-- Welcome to Module 3: SELECT', '-- The students table is ready.', '']);
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showTour, setShowTour] = useState(true);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState(false);
  const [resultTable, setResultTable] = useState<any[] | null>(null);

  useEffect(() => { initDB(); }, []);
  useEffect(() => { setHasCopied(false); }, [currentStep]);

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setHasCopied(true);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const steps = [
    {
      content: (
        <>
          <p>SELECT is how you ask a database to show you data. Think of it as saying: <strong className="text-white">"Show me..."</strong></p>
          <p className="mt-1.5">Let&apos;s start with the simplest possible query — show everything from the students table:</p>
          <div className="flex items-center justify-between mt-1.5 bg-[#0d1117] p-1.5 rounded border border-[var(--sql-border)]">
            <code className="text-indigo-400 font-mono text-[10px]">SELECT * FROM students;</code>
            <button onClick={() => handleCopy('SELECT * FROM students;')} className="text-slate-500 hover:text-white transition-colors">
              {copiedCmd === 'SELECT * FROM students;' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            </button>
          </div>
          <AnimatePresence>
            {hasCopied && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="mt-2 p-1.5 bg-indigo-500/20 border border-indigo-500/40 rounded text-[10px] text-indigo-300 font-medium">
                👉 Now paste it in the SQL console on the left and press Enter!
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ),
    },
    {
      content: (
        <>
          <p>The <code className="text-indigo-300">*</code> means &quot;all columns&quot;. But what if you only want names?</p>
          <p className="mt-1.5">You can specify exact columns instead of using *:</p>
          <div className="flex items-center justify-between mt-1.5 bg-[#0d1117] p-1.5 rounded border border-[var(--sql-border)]">
            <code className="text-indigo-400 font-mono text-[10px]">SELECT name FROM students;</code>
            <button onClick={() => handleCopy('SELECT name FROM students;')} className="text-slate-500 hover:text-white transition-colors">
              {copiedCmd === 'SELECT name FROM students;' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            </button>
          </div>
          <AnimatePresence>
            {hasCopied && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="mt-2 p-1.5 bg-indigo-500/20 border border-indigo-500/40 rounded text-[10px] text-indigo-300 font-medium">
                👉 Now paste it in the SQL console on the left and press Enter!
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ),
    },
    {
      content: (
        <>
          <p>You can also select multiple specific columns:</p>
          <div className="flex items-center justify-between mt-1.5 bg-[#0d1117] p-1.5 rounded border border-[var(--sql-border)]">
            <code className="text-indigo-400 font-mono text-[10px]">SELECT name, department FROM students;</code>
            <button onClick={() => handleCopy('SELECT name, department FROM students;')} className="text-slate-500 hover:text-white transition-colors">
              {copiedCmd === 'SELECT name, department FROM students;' ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            </button>
          </div>
          <AnimatePresence>
            {hasCopied && (
              <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="mt-2 p-1.5 bg-indigo-500/20 border border-indigo-500/40 rounded text-[10px] text-indigo-300 font-medium">
                👉 Now paste it in the SQL console on the left and press Enter!
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ),
    },
    {
      content: (
        <>
          <p>🎉 <strong className="text-emerald-400">Great job!</strong> You now know how to use SELECT.</p>
          <p className="mt-1.5">Key takeaways:</p>
          <ul className="mt-1 text-[10px] space-y-1 text-[var(--sql-text-muted)]">
            <li>• <code className="text-indigo-300">SELECT *</code> → all columns</li>
            <li>• <code className="text-indigo-300">SELECT name</code> → one column</li>
            <li>• <code className="text-indigo-300">SELECT name, dept</code> → specific columns</li>
          </ul>
          <p className="mt-1.5">Try writing your own queries in the console!</p>
        </>
      ),
    },
  ];

  const handleCommand = (cmd: string) => {
    setOutput(prev => [...prev, `SQL> ${cmd}`]);
    const trimmed = cmd.trim().replace(/;$/, '');
    
    try {
      initDB();
      const result = alasql(trimmed) as any[];
      
      if (Array.isArray(result) && result.length > 0) {
        const cols = Object.keys(result[0]);
        const header = cols.map(c => c.padEnd(15)).join('');
        const sep = '-'.repeat(header.length);
        const rows = result.map(r => cols.map(c => String(r[c]).padEnd(15)).join(''));
        setOutput(prev => [...prev, '', header, sep, ...rows, '', `${result.length} row(s) returned.`]);
        setResultTable(result);
        
        if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
      } else {
        setOutput(prev => [...prev, 'Query executed. 0 rows returned.']);
      }
    } catch (err: any) {
      let msg = err.message || 'Unknown error';
      if (msg.includes('Parse error')) msg = 'Syntax error — check your SQL statement for typos.';
      setOutput(prev => [...prev, `ERROR: ${msg}`]);
    }
  };

  const nextStep = () => setCurrentStep(p => Math.min(steps.length - 1, p + 1));
  const prevStep = () => setCurrentStep(p => Math.max(0, p - 1));

  return (
    <>
      {/* Left Panel - SQL Console */}
      <div className="w-full lg:w-1/3 flex flex-col lg:border-r border-b lg:border-b-0 border-[var(--sql-border)] bg-[var(--sql-surface)] overflow-hidden relative z-10 h-[50vh] lg:h-full shrink-0">
        <div className="p-3 border-b border-[var(--sql-border)] flex items-center justify-between bg-[var(--sql-surface)] shrink-0">
          <h2 className="text-sm font-bold text-[var(--sql-text)]">SQL Console</h2>
          {!showTour && (
            <button onClick={() => { setCurrentStep(0); setShowTour(true); }} className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] bg-indigo-600/20 text-indigo-400 font-medium rounded border border-indigo-500/30 hover:bg-indigo-600/30 transition-colors">
              <PlayCircle size={14} /> Start Tutor
            </button>
          )}
        </div>
        <div className="flex-1 min-h-0">
          <SqlTerminal onCommand={handleCommand} output={output} />
        </div>
      </div>

      {/* Right Panel - Result Visualizer */}
      <div className="w-full lg:w-2/3 bg-[var(--sql-darker)] p-4 lg:p-8 flex items-start justify-center overflow-auto relative h-[50vh] lg:h-full sql-grid-bg">
        <AnimatePresence>{completed && <CompletionBanner moduleId="3" moduleTitle="The SELECT Statement" />}</AnimatePresence>
        
        {/* Floating Tutor */}
        <AnimatePresence>
          {showTour && (
            <motion.div
              drag dragMomentum={false}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute top-6 right-6 z-50 w-[260px] bg-[var(--sql-surface)]/95 backdrop-blur-md border border-[var(--sql-border)] rounded-lg shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
            >
              <div className="bg-indigo-600 px-3 py-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <GripHorizontal size={12} className="text-indigo-300" />
                  <span className="text-white text-xs font-bold select-none">SQL Tutor</span>
                  <span className="text-[8px] text-indigo-200 uppercase tracking-widest ml-1 select-none hidden sm:inline">(Drag)</span>
                </div>
                <button onClick={() => setShowTour(false)} className="text-indigo-200 hover:text-white transition-colors" onPointerDown={(e) => e.stopPropagation()}>
                  <X size={12} />
                </button>
              </div>
              <div className="p-3 text-xs text-[var(--sql-text-muted)] leading-snug pointer-events-auto select-text" onPointerDown={(e) => e.stopPropagation()}>
                {steps[currentStep].content}
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-[9px] text-[var(--sql-text-subtle)] font-medium">Step {currentStep + 1} of {steps.length}</span>
                  <div className="flex gap-1.5">
                    {currentStep > 0 && (
                      <button onClick={prevStep} className="px-2 py-1 bg-[var(--sql-surface-light)] text-[var(--sql-text-muted)] rounded hover:bg-[var(--sql-border)] transition-colors font-medium text-[10px]">
                        Back
                      </button>
                    )}
                    {currentStep < steps.length - 1 ? (
                      <button onClick={nextStep} className="px-2 py-1 bg-indigo-500 text-white font-bold rounded hover:bg-indigo-400 transition-colors text-[10px]">
                        Next
                      </button>
                    ) : (
                      <button onClick={() => { setShowTour(false); setCompleted(true); }} className="px-2 py-1 bg-emerald-500 text-white font-bold rounded hover:bg-emerald-400 transition-colors text-[10px]">
                        Finish
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result Table Area */}
        <div className="w-full max-w-3xl mt-16">
          <div className="text-xs font-bold text-[var(--sql-text-subtle)] tracking-widest uppercase mb-4">
            Source Table: students
          </div>
          <div className="rounded-lg border border-[var(--sql-border)] bg-[var(--sql-surface)] overflow-hidden mb-8">
            <table className="w-full text-sm text-left">
              <thead className="bg-[var(--sql-surface-light)] text-[var(--sql-text-subtle)] text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-2">id</th><th className="px-4 py-2">name</th><th className="px-4 py-2">department</th><th className="px-4 py-2">year</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--sql-border)]">
                {studentsData.map(row => (
                  <tr key={row.id} className="hover:bg-[var(--sql-surface-light)]">
                    <td className="px-4 py-2 font-mono text-[var(--sql-text)]">{row.id}</td>
                    <td className="px-4 py-2 font-mono text-[var(--sql-text)]">{row.name}</td>
                    <td className="px-4 py-2 font-mono text-[var(--sql-text)]">{row.department}</td>
                    <td className="px-4 py-2 font-mono text-[var(--sql-text)]">{row.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {resultTable && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-xs font-bold text-emerald-400 tracking-widest uppercase mb-4">
                ✓ Query Result
              </div>
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-emerald-500/10 text-emerald-300 text-xs uppercase tracking-wider">
                    <tr>
                      {Object.keys(resultTable[0]).map(col => (
                        <th key={col} className="px-4 py-2">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-500/10">
                    {resultTable.map((row, i) => (
                      <tr key={i} className="hover:bg-emerald-500/5">
                        {Object.values(row).map((val, j) => (
                          <td key={j} className="px-4 py-2 font-mono text-[var(--sql-text)]">{String(val)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}
