"use client";

import { useState, useCallback } from "react";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface ResumeEditorProps {
  resume: any;
}

export default function ResumeEditor({ resume }: ResumeEditorProps) {
  const [content, setContent] = useState({
    name: resume?.name || resume?.title || "",
    title: resume?.title || "",
    email: resume?.email || "",
    phone: resume?.phone || "",
    location: resume?.location || "",
    linkedin: resume?.linkedin || "",
    summary: resume?.summary || "",
    experience: resume?.experience || [],
    education: resume?.education || [],
    skills: resume?.skills || [],
  });
  const [saving, setSaving] = useState(false);

  const handleChange = useCallback((key: string, value: any) => {
    setContent((prev: any) => ({ ...prev, [key]: value }));
  }, []);

  const updateItem = useCallback(
    (section: string, index: number, field: string, value: string) => {
      setContent((prev: any) => {
        const items = [...prev[section]];
        items[index] = { ...items[index], [field]: value };
        return { ...prev, [section]: items };
      });
    },
    []
  );

  const removeItem = useCallback((section: string, index: number) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: prev[section].filter((_: any, i: number) => i !== index),
    }));
  }, []);

  const addItem = useCallback((section: string, template: any) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: [...prev[section], template],
    }));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/resume", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: resume.id,
          content: JSON.stringify(content),
          title: content.name || content.title || "My Resume",
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
            <h1 className="text-sm font-medium">Edit Resume</h1>
          </div>
          <Button onClick={handleSave} disabled={saving} size="sm">
            <Save className="mr-1 h-4 w-4" />
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        <div className="space-y-6">
          {/* Personal Info */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your basic contact details</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  value={content.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Professional Title</label>
                <input
                  type="text"
                  value={content.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  placeholder="Software Engineer"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={content.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  value={content.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <input
                  type="text"
                  value={content.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  placeholder="San Francisco, CA"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">LinkedIn URL</label>
                <input
                  type="url"
                  value={content.linkedin}
                  onChange={(e) => handleChange("linkedin", e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  placeholder="https://linkedin.com/in/johndoe"
                />
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Summary</CardTitle>
              <CardDescription>Brief overview of your career</CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                value={content.summary}
                onChange={(e) => handleChange("summary", e.target.value)}
                rows={4}
                className="w-full rounded-lg border px-3 py-2 text-sm"
                placeholder="Experienced software engineer with..."
              />
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Experience</CardTitle>
                <CardDescription>Your work history</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  addItem("experience", {
                    title: "",
                    company: "",
                    dates: "",
                    description: "",
                  })
                }
              >
                <Plus className="mr-1 h-3 w-3" />
                Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {content.experience.map((exp: any, i: number) => (
                <div key={i} className="rounded-lg border p-4 space-y-3">
                  <div className="flex justify-between">
                    <h4 className="font-medium">Position {i + 1}</h4>
                    <button
                      onClick={() => removeItem("experience", i)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) => updateItem("experience", i, "title", e.target.value)}
                      className="rounded-lg border px-3 py-2 text-sm"
                      placeholder="Job Title"
                    />
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateItem("experience", i, "company", e.target.value)}
                      className="rounded-lg border px-3 py-2 text-sm"
                      placeholder="Company"
                    />
                    <input
                      type="text"
                      value={exp.dates}
                      onChange={(e) => updateItem("experience", i, "dates", e.target.value)}
                      className="rounded-lg border px-3 py-2 text-sm"
                      placeholder="Jan 2020 - Present"
                    />
                  </div>
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateItem("experience", i, "description", e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border px-3 py-2 text-sm"
                    placeholder="Describe your responsibilities..."
                  />
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  addItem("experience", {
                    title: "",
                    company: "",
                    dates: "",
                    description: "",
                  })
                }
              >
                <Plus className="mr-1 h-3 w-3" />
                Add Experience
              </Button>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Education</CardTitle>
                <CardDescription>Your academic background</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {content.education.map((edu: any, i: number) => (
                <div key={i} className="rounded-lg border p-4 space-y-3">
                  <div className="flex justify-between">
                    <h4 className="font-medium">Education {i + 1}</h4>
                    <button
                      onClick={() => removeItem("education", i)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) => updateItem("education", i, "school", e.target.value)}
                      className="rounded-lg border px-3 py-2 text-sm"
                      placeholder="University"
                    />
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateItem("education", i, "degree", e.target.value)}
                      className="rounded-lg border px-3 py-2 text-sm"
                      placeholder="Bachelor's"
                    />
                    <input
                      type="text"
                      value={edu.field}
                      onChange={(e) => updateItem("education", i, "field", e.target.value)}
                      className="rounded-lg border px-3 py-2 text-sm"
                      placeholder="Computer Science"
                    />
                    <input
                      type="text"
                      value={edu.dates}
                      onChange={(e) => updateItem("education", i, "dates", e.target.value)}
                      className="rounded-lg border px-3 py-2 text-sm"
                      placeholder="2016 - 2020"
                    />
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  addItem("education", {
                    school: "",
                    degree: "",
                    field: "",
                    dates: "",
                  })
                }
              >
                <Plus className="mr-1 h-3 w-3" />
                Add Education
              </Button>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>Comma-separated list of your skills</CardDescription>
            </CardHeader>
            <CardContent>
              <input
                type="text"
                value={content.skills?.join(", ")}
                onChange={(e) =>
                  handleChange(
                    "skills",
                    e.target.value
                      .split(",")
                      .map((s: string) => s.trim())
                      .filter(Boolean)
                  )
                }
                className="w-full rounded-lg border px-3 py-2 text-sm"
                placeholder="JavaScript, React, Node.js, Python"
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
