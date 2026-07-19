"use client";

import { useState, useCallback } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface CoverLetterEditorProps {
  coverLetter: any;
}

export default function CoverLetterEditor({
  coverLetter,
}: CoverLetterEditorProps) {
  const [content, setContent] = useState({
    content: coverLetter?.content || "",
    targetCompany: coverLetter?.targetCompany || "",
    targetRole: coverLetter?.targetRole || "",
    jobDescription: coverLetter?.jobDescription || "",
    writingStyle: coverLetter?.writingStyle || "professional",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (key: string, value: any) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/cover-letter", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: coverLetter.id,
          content: content.content,
          targetCompany: content.targetCompany,
          targetRole: content.targetRole,
          jobDescription: content.jobDescription,
          writingStyle: content.writingStyle,
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  };

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
            <h1 className="text-sm font-medium">Edit Cover Letter</h1>
          </div>
          <Button onClick={handleSave} disabled={saving} size="sm">
            <Save className="mr-1 h-4 w-4" />
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        <div className="space-y-6">
          {/* Target Info */}
          <Card>
            <CardHeader>
              <CardTitle>Target Information</CardTitle>
              <CardDescription>The role and company you&apos;re applying to</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Company</label>
                <input
                  type="text"
                  value={content.targetCompany}
                  onChange={(e) => handleChange("targetCompany", e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  placeholder="Acme Corp"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Role</label>
                <input
                  type="text"
                  value={content.targetRole}
                  onChange={(e) => handleChange("targetRole", e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  placeholder="Senior Software Engineer"
                />
              </div>
            </CardContent>
          </Card>

          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
              <CardDescription>Paste the job description to tailor your cover letter</CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                value={content.jobDescription}
                onChange={(e) => handleChange("jobDescription", e.target.value)}
                rows={8}
                className="w-full rounded-lg border px-3 py-2 text-sm font-mono"
                placeholder="Paste the job description here..."
              />
            </CardContent>
          </Card>

          {/* Writing Style */}
          <Card>
            <CardHeader>
              <CardTitle>Writing Style</CardTitle>
              <CardDescription>Choose the tone of your cover letter</CardDescription>
            </CardHeader>
            <CardContent>
              <select
                value={content.writingStyle}
                onChange={(e) => handleChange("writingStyle", e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm"
              >
                <option value="professional">Professional</option>
                <option value="enthusiastic">Enthusiastic</option>
                <option value="concise">Concise</option>
                <option value="detailed">Detailed</option>
              </select>
            </CardContent>
          </Card>

          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle>Cover Letter Content</CardTitle>
              <CardDescription>Edit the generated cover letter</CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                value={content.content}
                onChange={(e) => handleChange("content", e.target.value)}
                rows={20}
                className="w-full rounded-lg border px-3 py-2 text-sm"
                placeholder="Dear Hiring Manager,..."
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
