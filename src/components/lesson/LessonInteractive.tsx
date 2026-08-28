"use client";

import React, { useState } from "react";
import { TutorCard } from "./TutorCard";
import { VisualTable } from "./VisualTable";
import { SqlEditor } from "./SqlEditor";
import { CheckCircle2, AlertCircle } from "lucide-react";
import alasql from "alasql";
import { motion } from "framer-motion";

const initialStudents = [
  { id: 1, name: "Ravi", department: "CSE", year: 2 },
  { id: 2, name: "Priya", department: "ECE", year: 3 },
  { id: 3, name: "Arun", department: "CSE", year: 1 },
];

export function LessonInteractive() {
  const [step, setStep] = useState(1);
  const [queryResult, setQueryResult] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [removedRows, setRemovedRows] = useState<number[]>([]);
  const [highlightedCols, setHighlightedCols] = useState<string[]>([]);
  
  // Initialize db for alasql
  alasql("CREATE TABLE IF NOT EXISTS students (id INT, name STRING, department STRING, year INT)");
  alasql("DELETE FROM students"); // clear old data
  initialStudents.forEach(s => {
    alasql(`INSERT INTO students VALUES (${s.id}, '${s.name}', '${s.department}', ${s.year})`);
  });

  const handleRunQuery = async (query: string) => {
    setError(null);
    setQueryResult(null);
    setIsExecuting(true);
    setRemovedRows([]);
    setHighlightedCols([]);

    try {
      // Simulate execution time & animations
      
      // Step 1: parse query (naive visualization logic for educational purposes)
      const q = query.toLowerCase();
      
      if (!q.includes("select")) {
        throw new Error("You wrote something else, but SQL expects a `SELECT` statement to fetch data.");
      }
      
      if (q.includes("where") && q.includes("department") && (q.includes("cse") || q.includes("'cse'"))) {
        // highlight CSE row removal animation
        setRemovedRows([1]); // ECE row is index 1
      }
      
      if (q.includes("name") && !q.includes("*")) {
        setHighlightedCols(["name"]);
      } else if (q.includes("*")) {
        setHighlightedCols(["id", "name", "department", "year"]);
      }

      await new Promise(r => setTimeout(r, 1000)); // wait for visualization

      // Step 2: execute with real SQL engine
      const res = alasql(query) as any[];
      setQueryResult(res);
      setStep(3); // move to success state
    } catch (err: any) {
      // Make error educational
      let msg = err.message || "An error occurred.";
      if (msg.includes("Parse error")) {
        msg = "Oops! There's a syntax error in your query. Check your spelling and punctuation.";
      }
      setError(msg);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[calc(100vh-64px)] bg-[var(--sql-darker)] text-[var(--sql-text)]">
      {/* Left Panel - Tutor & Info */}
      <div className="w-full lg:w-1/3 border-r border-[var(--sql-border)] bg-[var(--sql-surface)] p-6 flex flex-col gap-6 overflow-y-auto">
        <div>
          <div className="flex items-center gap-2 text-sm font-bold text-[var(--sql-accent)] mb-1 uppercase tracking-widest">
            MODULE 1
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">The SELECT Statement</h2>
        </div>

        <TutorCard>
          <p className="mb-4">
            💡 Think about a college database. Imagine your college has a table called <code className="text-indigo-300 bg-indigo-950/50 px-1 py-0.5 rounded">students</code>.
          </p>
          <p className="mb-4">
            Every row represents one student. Every column represents information about that student.
          </p>
          <p>
            If you ask: <br/><strong className="text-white">"Show me all students"</strong> <br/>
            SQL needs a way to express that request. That's what <code className="text-indigo-300 bg-indigo-950/50 px-1 py-0.5 rounded">SELECT</code> does.
          </p>
        </TutorCard>

        {step >= 3 && queryResult && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5 shadow-sm mt-4">
              <div className="flex gap-4">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div className="text-[var(--sql-text)] text-sm space-y-2">
                  <p className="font-semibold text-emerald-400 mb-2">🎉 Correct!</p>
                  <p className="text-[var(--sql-text-muted)]">
                    You just asked the database to return data. 
                    <br/><br/>
                    <strong className="text-white">What SQL did:</strong><br/>
                    1. SQL looked at the <code className="text-emerald-300">students</code> table.<br/>
                    2. It fetched the columns you requested.<br/>
                    3. It returned the matching rows as a new result set.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Right Panel - Interactive Lab */}
      <div className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-hidden sql-grid-bg relative">
        <div className="p-6 flex-1 overflow-y-auto relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xs font-bold text-[var(--sql-text-subtle)] uppercase tracking-widest">Database Table: students</h3>
          </div>
          <VisualTable 
            tableName="students"
            columns={[
              { header: "id", accessorKey: "id" },
              { header: "name", accessorKey: "name" },
              { header: "department", accessorKey: "department" },
              { header: "year", accessorKey: "year" },
            ]}
            data={initialStudents}
            removedRows={removedRows}
            highlightedColumns={highlightedCols}
          />

          <div className="mt-8">
            <h3 className="text-xs font-bold text-[var(--sql-text-subtle)] mb-4 uppercase tracking-widest">Your Query</h3>
            <SqlEditor 
              initialValue="SELECT * FROM students;" 
              onRun={handleRunQuery}
            />
          </div>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex gap-3 text-red-400 bg-red-500/10 p-4 rounded-lg border border-red-500/20">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <div className="text-sm">
                <p className="font-semibold">Something went wrong</p>
                <p>{error}</p>
              </div>
            </motion.div>
          )}

          {isExecuting && !error && (
            <div className="mt-8 flex justify-center">
              <div className="text-sm text-[var(--sql-accent)] font-mono font-medium animate-pulse">
                [ VISUALIZING_QUERY_EXECUTION ]
              </div>
            </div>
          )}

          {queryResult && !isExecuting && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 pb-12">
              <h3 className="text-xs font-bold text-[var(--sql-text-subtle)] mb-4 uppercase tracking-widest">Result Table</h3>
              <VisualTable 
                tableName="Result"
                columns={Object.keys(queryResult[0] || {}).map(k => ({ header: k, accessorKey: k }))}
                data={queryResult}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
