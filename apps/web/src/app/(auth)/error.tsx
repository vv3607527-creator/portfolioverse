"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="rounded-full bg-destructive/10 p-4 mb-6">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Authentication Error</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Something went wrong during authentication. Please try again.
        </p>
        <Button onClick={reset} variant="default">
          Try Again
        </Button>
      </div>
    </div>
  );
}
