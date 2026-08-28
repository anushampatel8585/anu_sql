import React from "react";
import Link from "next/link";
import { CheckCircle2, Circle, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  isLocked?: boolean;
}

export function ModuleCard({ id, title, description, isCompleted, isLocked }: ModuleCardProps) {
  return (
    <Link
      href={isLocked ? "#" : `/lesson/${id}`}
      className={cn(
        "group relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md",
        isLocked && "opacity-60 cursor-not-allowed hover:shadow-sm"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <h3 className="font-semibold tracking-tight text-foreground group-hover:text-indigo-500 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>
        <div className="ml-4 shrink-0">
          {isCompleted ? (
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          ) : isLocked ? (
            <Circle className="h-6 w-6 text-muted-foreground opacity-50" />
          ) : (
            <PlayCircle className="h-6 w-6 text-indigo-500 opacity-0 transition-opacity group-hover:opacity-100" />
          )}
        </div>
      </div>
    </Link>
  );
}
