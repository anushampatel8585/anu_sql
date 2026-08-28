import React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface ColumnDef {
  header: string;
  accessorKey: string;
}

export interface VisualTableProps {
  tableName: string;
  columns: ColumnDef[];
  data: any[];
  highlightedRows?: number[]; // indices of rows to highlight
  highlightedColumns?: string[]; // accessor keys of columns to highlight
  removedRows?: number[]; // indices of rows that are filtering out
}

export function VisualTable({
  tableName,
  columns,
  data,
  highlightedRows = [],
  highlightedColumns = [],
  removedRows = [],
}: VisualTableProps) {
  return (
    <div className="flex flex-col rounded-lg border border-[var(--sql-border)] bg-[var(--sql-surface)] shadow-sm overflow-hidden">
      <div className="bg-[var(--sql-surface-light)] px-4 py-2 border-b border-[var(--sql-border)] font-mono text-xs font-semibold text-[var(--sql-text-muted)] tracking-wider">
        {tableName}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-[var(--sql-darker)] text-[var(--sql-text-subtle)] font-medium text-xs uppercase tracking-wider">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.accessorKey}
                  className={cn(
                    "px-4 py-3 transition-colors",
                    highlightedColumns.includes(col.accessorKey) && "bg-[var(--sql-accent)]/20 text-[var(--sql-accent)]"
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--sql-border)] relative">
            <AnimatePresence>
              {data.map((row, rowIndex) => {
                const isRemoved = removedRows.includes(rowIndex);
                const isHighlighted = highlightedRows.includes(rowIndex);

                if (isRemoved) return null;

                return (
                  <motion.tr
                    key={row.id || rowIndex}
                    initial={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "transition-colors hover:bg-[var(--sql-surface-light)]",
                      isHighlighted && "bg-[var(--sql-accent)]/10"
                    )}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.accessorKey}
                        className={cn(
                          "px-4 py-3 text-[var(--sql-text)] font-mono",
                          highlightedColumns.includes(col.accessorKey) && "font-bold text-[var(--sql-accent-light)]"
                        )}
                      >
                        {row[col.accessorKey]}
                      </td>
                    ))}
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
