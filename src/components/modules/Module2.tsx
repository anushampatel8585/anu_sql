'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CompletionBanner from '../CompletionBanner';
import { Table2, Rows3, Columns3 } from 'lucide-react';

const steps = [
  {
    title: "Tables — The Foundation",
    content: "A table is like a spreadsheet. It has a name (like 'students') and it holds data in a structured grid format. Every database is made up of one or more tables.",
  },
  {
    title: "Rows — Individual Records",
    content: "Each row represents one complete record. In a 'students' table, one row = one student. Row 1 might be Ravi from CSE, Row 2 might be Priya from ECE. Each row is unique.",
  },
  {
    title: "Columns — Attributes",
    content: "Columns define what kind of information each row stores. The 'name' column stores names, 'department' stores departments, 'year' stores which year. Every row has a value for each column.",
  },
  {
    title: "Putting It Together",
    content: "A table = rows × columns. The column names form the 'schema' (structure), and the rows contain the actual data. SQL lets you create these tables, fill them with data, and query exactly what you need.",
  },
];

const tableData = [
  { id: 1, name: 'Ravi', department: 'CSE', year: 2 },
  { id: 2, name: 'Priya', department: 'ECE', year: 3 },
  { id: 3, name: 'Arun', department: 'CSE', year: 1 },
  { id: 4, name: 'Meera', department: 'MECH', year: 2 },
];

export default function Module2() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [highlightRow, setHighlightRow] = useState<number | null>(null);
  const [highlightCol, setHighlightCol] = useState<string | null>(null);

  const nextStep = () => {
    const next = Math.min(steps.length - 1, currentStep + 1);
    setCurrentStep(next);
    if (next === 1) { setHighlightRow(0); setHighlightCol(null); }
    else if (next === 2) { setHighlightRow(null); setHighlightCol('name'); }
    else if (next === 3) { setHighlightRow(null); setHighlightCol(null); }
    else { setHighlightRow(null); setHighlightCol(null); }
  };
  const prevStep = () => {
    setCurrentStep(p => Math.max(0, p - 1));
    setHighlightRow(null);
    setHighlightCol(null);
  };

  const columns = ['id', 'name', 'department', 'year'];

  return (
    <>
      {/* Left Panel - Tutor */}
      <div className="w-full lg:w-1/3 flex flex-col lg:border-r border-b lg:border-b-0 border-[var(--sql-border)] bg-[var(--sql-surface)] overflow-hidden h-[50vh] lg:h-full shrink-0">
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Table2 size={20} />
            </div>
            <h2 className="text-xl font-bold text-[var(--sql-text)]">The Tutor</h2>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-[var(--sql-surface-light)] p-6 rounded-xl border border-[var(--sql-border)] shadow-lg"
            >
              <h3 className="text-lg font-bold text-indigo-400 mb-3">{steps[currentStep].title}</h3>
              <p className="text-[var(--sql-text-muted)] leading-relaxed text-sm">{steps[currentStep].content}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="p-4 border-t border-[var(--sql-border)] bg-[var(--sql-surface)] flex justify-between shrink-0">
          <button onClick={prevStep} disabled={currentStep === 0} className="px-4 py-2 rounded bg-[var(--sql-surface-light)] text-[var(--sql-text-muted)] disabled:opacity-50 hover:bg-[var(--sql-border)] transition-colors text-sm">
            Previous
          </button>
          <div className="flex gap-1 items-center">
            {steps.map((_, i) => (
              <div key={i} className={`h-2 rounded-full transition-all ${i === currentStep ? 'w-6 bg-indigo-500' : 'w-2 bg-[var(--sql-border)]'}`} />
            ))}
          </div>
          <button onClick={() => currentStep === steps.length - 1 ? setCompleted(true) : nextStep()} className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-500 transition-colors text-sm disabled:opacity-50">
            {currentStep === steps.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>

      {/* Right Panel - Visual Table */}
      <div className="w-full lg:w-2/3 bg-[var(--sql-darker)] p-4 lg:p-8 flex items-center justify-center overflow-auto relative h-[50vh] lg:h-full sql-grid-bg">
        <AnimatePresence>{completed && <CompletionBanner moduleId="2" moduleTitle="Tables, Rows & Columns" />}</AnimatePresence>
        <div className="w-full max-w-2xl">
          <div className="text-xs font-bold text-[var(--sql-text-subtle)] tracking-widest uppercase mb-4">
            Table: students
          </div>

          <div className="rounded-xl border border-[var(--sql-border)] bg-[var(--sql-surface)] overflow-hidden shadow-2xl">
            {/* Column headers */}
            <div className="grid grid-cols-4 bg-[var(--sql-surface-light)] border-b border-[var(--sql-border)]">
              {columns.map(col => (
                <motion.div 
                  key={col}
                  animate={{ 
                    backgroundColor: highlightCol === col ? 'rgba(79,70,229,0.2)' : 'transparent',
                    color: highlightCol === col ? '#818CF8' : '#8B949E'
                  }}
                  className="px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider border-r border-[var(--sql-border)] last:border-r-0 flex items-center gap-2"
                >
                  <Columns3 size={12} className="opacity-50" />
                  {col}
                </motion.div>
              ))}
            </div>

            {/* Data rows */}
            {tableData.map((row, rowIdx) => (
              <motion.div 
                key={row.id}
                animate={{ 
                  backgroundColor: highlightRow === rowIdx ? 'rgba(79,70,229,0.1)' : 'transparent',
                  borderColor: highlightRow === rowIdx ? '#4F46E5' : 'transparent'
                }}
                className="grid grid-cols-4 border-b border-[var(--sql-border)] last:border-b-0"
              >
                {columns.map(col => (
                  <motion.div
                    key={col}
                    animate={{
                      backgroundColor: highlightCol === col ? 'rgba(79,70,229,0.08)' : 'transparent',
                      color: highlightCol === col || highlightRow === rowIdx ? '#E6EDF3' : '#8B949E'
                    }}
                    className="px-4 py-3 text-sm font-mono border-r border-[var(--sql-border)] last:border-r-0"
                  >
                    {row[col as keyof typeof row]}
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Visual labels */}
          <div className="flex items-center justify-between mt-6 text-xs text-[var(--sql-text-subtle)]">
            <div className="flex items-center gap-2">
              <Rows3 size={14} />
              <span className="font-mono">{tableData.length} rows (records)</span>
            </div>
            <div className="flex items-center gap-2">
              <Columns3 size={14} />
              <span className="font-mono">{columns.length} columns (fields)</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
