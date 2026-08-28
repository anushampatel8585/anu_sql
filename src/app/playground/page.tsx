import React from "react";
import { TerminalSquare } from "lucide-react";

export default function PlaygroundPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <TerminalSquare className="mx-auto mb-4 h-16 w-16 text-muted-foreground/50" />
      <h1 className="text-3xl font-bold tracking-tight mb-2">SQL Playground</h1>
      <p className="text-muted-foreground max-w-md mx-auto">
        The free SQL sandbox is where you can experiment with full databases without any guided lesson structure.
      </p>
      <div className="mt-8 inline-flex items-center rounded-md bg-muted px-4 py-2 text-sm font-medium text-muted-foreground">
        Coming Soon
      </div>
    </div>
  );
}
