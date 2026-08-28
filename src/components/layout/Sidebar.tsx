import React from "react";
import Link from "next/link";
import { Database, Home, LayoutDashboard, Settings, TerminalSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("flex h-full w-16 md:w-64 flex-col border-r border-border bg-background transition-all", className)}>
      <div className="flex h-14 items-center justify-center md:justify-start border-b border-border px-4">
        <Link href="/" className="flex items-center gap-2 text-primary">
          <Database className="h-6 w-6 text-indigo-500" />
          <span className="hidden font-bold tracking-tight md:inline-block">SQL Lab</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="flex flex-col gap-2 px-2">
          <li>
            <Link
              href="/"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <LayoutDashboard className="h-5 w-5 shrink-0" />
              <span className="hidden md:inline-block text-sm font-medium">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/playground"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <TerminalSquare className="h-5 w-5 shrink-0" />
              <span className="hidden md:inline-block text-sm font-medium">SQL Playground</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="border-t border-border p-4">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Settings className="h-5 w-5 shrink-0" />
          <span className="hidden md:inline-block text-sm font-medium">Settings</span>
        </Link>
      </div>
    </div>
  );
}
