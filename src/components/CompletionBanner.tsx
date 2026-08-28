'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Database } from 'lucide-react';

export default function CompletionBanner({ moduleId, moduleTitle }: { moduleId: string; moduleTitle: string }) {
  const nextModuleId = parseInt(moduleId) < 10 ? parseInt(moduleId) + 1 : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute inset-0 z-[60] bg-[var(--sql-darker)]/90 backdrop-blur-md flex items-center justify-center"
    >
      <div className="text-center px-6">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.3)]"
        >
          <CheckCircle2 size={40} className="text-emerald-400" />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-white mb-2"
        >
          Module Complete!
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-[var(--sql-text-muted)] mb-8"
        >
          You&apos;ve finished <span className="text-emerald-400 font-semibold">Module {moduleId}: {moduleTitle}</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center justify-center gap-6"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-sm text-[var(--sql-text-muted)]"
          >
            Click <span className="text-white font-medium">Back to Lab</span> to continue your journey.
          </motion.p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Back to Lab - Secondary CTA */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--sql-surface-light)] border border-[var(--sql-border)] text-[var(--sql-text-muted)] font-medium text-sm hover:bg-[var(--sql-surface)] hover:text-white hover:border-[var(--sql-border-light)] transition-all duration-200"
            >
              <ArrowLeft size={16} />
              Back to Lab
            </Link>

            {/* Next Module - Primary CTA */}
            {nextModuleId && (
              <Link
                href={`/lesson/${nextModuleId}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:bg-indigo-500 transition-all duration-200"
              >
                <Database size={14} />
                Next Module →
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
