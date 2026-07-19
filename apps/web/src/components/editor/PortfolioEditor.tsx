"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Save, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditorSidebar from "./EditorSidebar";
import LivePreview from "./LivePreview";
import Link from "next/link";

interface PortfolioEditorProps {
  portfolio: any;
}

const SECTIONS = [
  { id: "summary", label: "Summary" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "theme", label: "Theme" },
];

export default function PortfolioEditor({
  portfolio,
}: PortfolioEditorProps) {
  const [content, setContent] = useState<any>({
    name: portfolio?.name || "",
    title: portfolio?.title || "",
    about: portfolio?.about || "",
    experience: portfolio?.experience || [],
    education: portfolio?.education || [],
    skills: portfolio?.skills || [],
  });
  const [theme, setTheme] = useState<string>(
    portfolio?.theme || "minimal-white"
  );
  const [activeSection, setActiveSection] = useState<string>("summary");
  const [saving, setSaving] = useState(false);

  // Sync when portfolio prop changes
  useEffect(() => {
    if (portfolio) {
      setContent({
        name: portfolio.name || "",
        title: portfolio.title || "",
        about: portfolio.about || "",
        experience: portfolio.experience || [],
        education: portfolio.education || [],
        skills: portfolio.skills || [],
      });
      if (portfolio.theme) {
        setTheme(portfolio.theme);
      }
    }
  }, [portfolio]);

  const handleContentChange = useCallback(
    (key: string, value: any) => {
      setContent((prev: any) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const handleThemeChange = useCallback((newTheme: string) => {
    setTheme(newTheme);
  }, []);

  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: portfolio.id,
          content: JSON.stringify(content),
          theme,
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  }, [content, theme, portfolio.id]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="sticky top-0 z-50 border-b bg-white dark:bg-gray-950">
        <div className="flex h-14 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-sm font-medium">Edit Portfolio</h1>
          </div>
          <Button onClick={handleSave} disabled={saving} size="sm">
            <Save className="mr-1 h-4 w-4" />
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </header>

      <main className="px-6 py-8">
        <div className="flex gap-6">
          {/* Left sidebar - Editor */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="w-[400px] flex-shrink-0"
          >
            <EditorSidebar
              sections={SECTIONS}
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              onContentChange={handleContentChange}
              theme={theme}
              onThemeChange={handleThemeChange}
            />
          </motion.div>

          {/* Right side - Live Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex-1 min-w-0"
          >
            <LivePreview content={content} theme={theme} />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
