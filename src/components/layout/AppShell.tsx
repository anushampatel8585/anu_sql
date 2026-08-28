import React from "react";
import { Sidebar } from "./Sidebar";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-background md:rounded-tl-2xl md:border-l md:border-t md:border-border shadow-sm">
        {children}
      </main>
    </div>
  );
}
