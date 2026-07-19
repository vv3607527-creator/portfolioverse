"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Linkedin, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { validateLinkedInUrl } from "@/lib/linkedin";
import { cn } from "@/lib/utils";

interface LinkedInUrlInputProps {
  onUrlParsed: (data: any) => void;
}

export function LinkedInUrlInput({ onUrlParsed }: LinkedInUrlInputProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!url.trim()) {
      setError("Please enter a LinkedIn profile URL.");
      return;
    }

    if (!validateLinkedInUrl(url)) {
      setError(
        "Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)."
      );
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/linkedin/parse-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to parse LinkedIn profile.");
      }

      const data = await res.json();
      setSuccess(true);
      setTimeout(() => onUrlParsed(data), 600);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="linkedin-url">LinkedIn Profile URL</Label>
          <div className="relative">
            <Linkedin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              id="linkedin-url"
              type="text"
              placeholder="https://linkedin.com/in/your-profile"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError("");
                if (success) setSuccess(false);
              }}
              className={cn(
                "flex h-12 w-full rounded-lg border bg-background pl-10 pr-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                error
                  ? "border-destructive"
                  : success
                    ? "border-emerald-500"
                    : "border-input"
              )}
              disabled={loading || success}
            />
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-start gap-2 rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-2 rounded-lg border border-emerald-500/50 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Profile parsed successfully! Redirecting...</span>
            </motion.div>
          )}
        </AnimatePresence>

        <Button type="submit" loading={loading} className="w-full" disabled={success}>
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Parsing Profile...
            </span>
          ) : success ? (
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Imported Successfully
            </span>
          ) : (
            "Import from LinkedIn"
          )}
        </Button>
      </form>
    </div>
  );
}
