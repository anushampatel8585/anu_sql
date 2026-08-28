import React from "react";
import { Lightbulb } from "lucide-react";

interface TutorCardProps {
  children: React.ReactNode;
}

export function TutorCard({ children }: TutorCardProps) {
  return (
    <div className="rounded-xl border border-[var(--sql-border)] bg-[var(--sql-surface-light)] p-6 shadow-sm hover:border-[var(--sql-accent)]/30 transition-colors">
      <div className="flex gap-4">
        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--sql-accent)]/10 text-[var(--sql-accent)]">
          <Lightbulb className="h-5 w-5" />
        </div>
        <div className="text-[var(--sql-text-muted)] leading-relaxed text-sm md:text-base space-y-4 font-medium">
          {children}
        </div>
      </div>
    </div>
  );
}
