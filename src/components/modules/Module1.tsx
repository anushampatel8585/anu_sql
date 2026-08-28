'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CompletionBanner from '../CompletionBanner';
import { Database, HardDrive, Server, Table2 } from 'lucide-react';

const steps = [
  {
    title: "What is a Database?",
    content: "Think about your phone's contact list. Every contact has a name, number, and maybe an email. That's essentially a database — an organized collection of related data, stored so you can easily find, update, and manage it.",
  },
  {
    title: "Real-World Example",
    content: "Your college maintains records: student names, roll numbers, departments, grades. Without a database, this data would be scattered across papers and spreadsheets. A database keeps it all structured, searchable, and reliable.",
  },
  {
    title: "Why Not Just Use Excel?",
    content: "Excel works for small data. But imagine 50,000 students, 200 courses, and 10,000 enrollments. Excel can't enforce rules like 'every student must have a unique roll number' or let 100 people query it simultaneously. That's where a database management system (DBMS) comes in.",
  },
  {
    title: "How Databases Store Data",
    content: "Relational databases store data in tables. Each table has rows (individual records) and columns (fields/attributes). Tables can reference each other through keys. This structure is what SQL was designed to work with.",
  },
];

export default function Module1() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const nextStep = () => setCurrentStep(p => Math.min(steps.length - 1, p + 1));
  const prevStep = () => setCurrentStep(p => Math.max(0, p - 1));

  return (
    <>
      {/* Left Panel - Tutor */}
      <div className="w-full lg:w-1/3 flex flex-col lg:border-r border-b lg:border-b-0 border-[var(--sql-border)] bg-[var(--sql-surface)] overflow-hidden h-[50vh] lg:h-full shrink-0">
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Database size={20} />
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
          <button 
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-4 py-2 rounded bg-[var(--sql-surface-light)] text-[var(--sql-text-muted)] disabled:opacity-50 hover:bg-[var(--sql-border)] transition-colors text-sm"
          >
            Previous
          </button>
          <div className="flex gap-1 items-center">
            {steps.map((_, i) => (
              <div key={i} className={`h-2 rounded-full transition-all ${i === currentStep ? 'w-6 bg-indigo-500' : 'w-2 bg-[var(--sql-border)]'}`} />
            ))}
          </div>
          <button 
            onClick={() => currentStep === steps.length - 1 ? setCompleted(true) : nextStep()} className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-500 transition-colors text-sm disabled:opacity-50">
            {currentStep === steps.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>

      {/* Right Panel - Visualizer */}
      <div className="w-full lg:w-2/3 bg-[var(--sql-darker)] p-4 lg:p-8 flex items-center justify-center overflow-auto relative h-[50vh] lg:h-full sql-grid-bg">
        <AnimatePresence>{completed && <CompletionBanner moduleId="1" moduleTitle="What is a Database?" />}</AnimatePresence>
        <div className="w-full max-w-3xl bg-[var(--sql-surface)]/50 rounded-2xl border border-[var(--sql-border)] p-8 shadow-2xl">
          
          <div className="text-xs font-bold text-[var(--sql-text-subtle)] tracking-widest uppercase mb-6">
            Database Architecture
          </div>

          <div className="flex flex-col gap-6">
            {/* Database Server */}
            <motion.div 
              animate={{ borderColor: currentStep >= 3 ? '#4F46E5' : '#252D3A', backgroundColor: currentStep >= 3 ? 'rgba(79,70,229,0.05)' : 'transparent' }}
              className="rounded-xl border-2 border-dashed p-6 transition-all duration-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <Server size={20} className={currentStep >= 3 ? 'text-indigo-400' : 'text-[var(--sql-text-subtle)]'} />
                <span className="text-sm font-bold text-[var(--sql-text)]">Database Server (DBMS)</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Table 1 */}
                <motion.div 
                  animate={{ opacity: currentStep >= 1 ? 1 : 0.3, scale: currentStep >= 1 ? 1 : 0.95 }}
                  className="bg-[var(--sql-darker)] rounded-lg border border-[var(--sql-border)] overflow-hidden"
                >
                  <div className="bg-indigo-500/10 px-3 py-2 border-b border-[var(--sql-border)]">
                    <div className="flex items-center gap-2">
                      <Table2 size={12} className="text-indigo-400" />
                      <span className="text-xs font-mono font-bold text-indigo-300">students</span>
                    </div>
                  </div>
                  <div className="p-3 space-y-1">
                    <div className="text-[10px] font-mono text-[var(--sql-text-muted)]">id, name, dept</div>
                    <div className="text-[10px] font-mono text-[var(--sql-text-subtle)]">3 rows</div>
                  </div>
                </motion.div>

                {/* Table 2 */}
                <motion.div 
                  animate={{ opacity: currentStep >= 2 ? 1 : 0.3, scale: currentStep >= 2 ? 1 : 0.95 }}
                  className="bg-[var(--sql-darker)] rounded-lg border border-[var(--sql-border)] overflow-hidden"
                >
                  <div className="bg-emerald-500/10 px-3 py-2 border-b border-[var(--sql-border)]">
                    <div className="flex items-center gap-2">
                      <Table2 size={12} className="text-emerald-400" />
                      <span className="text-xs font-mono font-bold text-emerald-300">courses</span>
                    </div>
                  </div>
                  <div className="p-3 space-y-1">
                    <div className="text-[10px] font-mono text-[var(--sql-text-muted)]">id, name, credits</div>
                    <div className="text-[10px] font-mono text-[var(--sql-text-subtle)]">5 rows</div>
                  </div>
                </motion.div>

                {/* Table 3 */}
                <motion.div 
                  animate={{ opacity: currentStep >= 2 ? 1 : 0.3, scale: currentStep >= 2 ? 1 : 0.95 }}
                  className="bg-[var(--sql-darker)] rounded-lg border border-[var(--sql-border)] overflow-hidden"
                >
                  <div className="bg-amber-500/10 px-3 py-2 border-b border-[var(--sql-border)]">
                    <div className="flex items-center gap-2">
                      <Table2 size={12} className="text-amber-400" />
                      <span className="text-xs font-mono font-bold text-amber-300">grades</span>
                    </div>
                  </div>
                  <div className="p-3 space-y-1">
                    <div className="text-[10px] font-mono text-[var(--sql-text-muted)]">student_id, course_id, grade</div>
                    <div className="text-[10px] font-mono text-[var(--sql-text-subtle)]">12 rows</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Storage */}
            <motion.div 
              animate={{ opacity: currentStep >= 3 ? 1 : 0.3 }}
              className="flex items-center gap-4 justify-center"
            >
              <HardDrive size={24} className="text-[var(--sql-text-subtle)]" />
              <span className="text-xs font-mono text-[var(--sql-text-subtle)]">Persistent Storage (Disk)</span>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
