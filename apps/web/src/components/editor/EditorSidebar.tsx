"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Briefcase,
  GraduationCap,
  Code2,
  Palette,
  Plus,
  Trash2,
} from "lucide-react";
import ThemeSelector from "./ThemeSelector";

interface EditorSidebarProps {
  sections: { id: string; label: string; content?: any }[];
  activeSection: string;
  onSectionChange: (section: string) => void;
  onContentChange: (key: string, value: any) => void;
  theme: string;
  onThemeChange: (theme: string) => void;
}

export default function EditorSidebar({
  sections,
  activeSection,
  onSectionChange,
  onContentChange,
  theme,
  onThemeChange,
}: EditorSidebarProps) {
  const [newSkill, setNewSkill] = useState("");

  const sectionIcons: Record<string, any> = {
    summary: User,
    experience: Briefcase,
    education: GraduationCap,
    skills: Code2,
    theme: Palette,
  };

  // --- Summary Section ---
  const renderSummaryEditor = () => (
    <motion.div
      key="summary"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="space-y-5"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Full Name
        </label>
        <input
          type="text"
          onChange={(e) => onContentChange("name", e.target.value)}
          placeholder="e.g. John Doe"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Professional Title
        </label>
        <input
          type="text"
          onChange={(e) => onContentChange("title", e.target.value)}
          placeholder="e.g. Full-Stack Developer"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          About / Summary
        </label>
        <textarea
          onChange={(e) => onContentChange("about", e.target.value)}
          placeholder="Write a brief summary about yourself..."
          rows={5}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm resize-none"
        />
      </div>
    </motion.div>
  );

  // --- Experience Section ---
  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      company: "",
      role: "",
      duration: "",
      description: "",
    };
    onContentChange("experience", [
      ...(sections.find((s) => s.id === "experience")?.content || []),
      newExp,
    ]);
  };

  const removeExperience = (index: number) => {
    const current = sections.find((s) => s.id === "experience")?.content || [];
    const updated = current.filter((_: any, i: number) => i !== index);
    onContentChange("experience", updated);
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const current = sections.find((s) => s.id === "experience")?.content || [];
    const updated = current.map((exp: any, i: number) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    onContentChange("experience", updated);
  };

  const renderExperienceEditor = () => {
    const experience = sections.find((s) => s.id === "experience")?.content || [];
    return (
      <motion.div
        key="experience"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        className="space-y-4"
      >
        {experience.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-6">
            No experience entries yet. Add one below.
          </p>
        )}
        {experience.map((exp: any, index: number) => (
          <motion.div
            key={exp.id || index}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 space-y-3 relative"
          >
            <button
              onClick={() => {
                const current = sections.find((s) => s.id === "experience")?.content || [];
                const updated = current.filter((_: any, i: number) => i !== index);
                onContentChange("experience", updated);
              }}
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
              title="Remove experience"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={exp.company || ""}
                  onChange={(e) => updateExperience(index, "company", e.target.value)}
                  placeholder="Company name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  value={exp.role || ""}
                  onChange={(e) => updateExperience(index, "role", e.target.value)}
                  placeholder="Job title"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                Duration
              </label>
              <input
                type="text"
                value={exp.duration || ""}
                onChange={(e) => updateExperience(index, "duration", e.target.value)}
                placeholder="e.g. Jan 2020 - Present"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                Description
              </label>
              <textarea
                value={exp.description || ""}
                onChange={(e) => updateExperience(index, "description", e.target.value)}
                placeholder="Describe your role and achievements..."
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm resize-none"
              />
            </div>
          </motion.div>
        ))}
        <button
          onClick={addExperience}
          className="flex items-center gap-2 w-full px-4 py-2.5 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </motion.div>
    );
  };

  // --- Education Section ---
  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      school: "",
      degree: "",
      field: "",
      startYear: "",
      endYear: "",
    };
    const current = sections.find((s) => s.id === "education")?.content || [];
    onContentChange("education", [...current, newEdu]);
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const current = sections.find((s) => s.id === "education")?.content || [];
    const updated = current.map((edu: any, i: number) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    onContentChange("education", updated);
  };

  const renderEducationEditor = () => {
    const education = sections.find((s) => s.id === "education")?.content || [];
    return (
      <motion.div
        key="education"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        className="space-y-4"
      >
        {education.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-6">
            No education entries yet. Add one below.
          </p>
        )}
        {education.map((edu: any, index: number) => (
          <motion.div
            key={edu.id || index}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 space-y-3 relative"
          >
            <button
              onClick={() => {
                const current = sections.find((s) => s.id === "education")?.content || [];
                const updated = current.filter((_: any, i: number) => i !== index);
                onContentChange("education", updated);
              }}
              className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
              title="Remove education"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  School
                </label>
                <input
                  type="text"
                  value={edu.school || ""}
                  onChange={(e) => updateEducation(index, "school", e.target.value)}
                  placeholder="University name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Degree
                </label>
                <input
                  type="text"
                  value={edu.degree || ""}
                  onChange={(e) => updateEducation(index, "degree", e.target.value)}
                  placeholder="e.g. Bachelor's"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Field of Study
                </label>
                <input
                  type="text"
                  value={edu.field || ""}
                  onChange={(e) => updateEducation(index, "field", e.target.value)}
                  placeholder="e.g. Computer Science"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  Start Year
                </label>
                <input
                  type="text"
                  value={edu.startYear || ""}
                  onChange={(e) => updateEducation(index, "startYear", e.target.value)}
                  placeholder="e.g. 2018"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                  End Year
                </label>
                <input
                  type="text"
                  value={edu.endYear || ""}
                  onChange={(e) => updateEducation(index, "endYear", e.target.value)}
                  placeholder="e.g. 2022"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
                />
              </div>
            </div>
          </motion.div>
        ))}
        <button
          onClick={addEducation}
          className="flex items-center gap-2 w-full px-4 py-2.5 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </motion.div>
    );
  };

  // --- Skills Section ---
  const addSkill = () => {
    if (newSkill.trim()) {
      const current = sections.find((s) => s.id === "skills")?.content || [];
      onContentChange("skills", [...current, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    const current = sections.find((s) => s.id === "skills")?.content || [];
    const updated = current.filter((_: any, i: number) => i !== index);
    onContentChange("skills", updated);
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const renderSkillsEditor = () => {
    const skills = sections.find((s) => s.id === "skills")?.content || [];
    return (
      <motion.div
        key="skills"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
        className="space-y-4"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleSkillKeyDown}
            placeholder="Type a skill and press Enter..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm"
          />
          <button
            onClick={addSkill}
            disabled={!newSkill.trim()}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 w-full text-center py-4">
              No skills added yet.
            </p>
          )}
          {skills.map((skill: string, index: number) => (
            <motion.span
              key={`${skill}-${index}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
            >
              {skill}
              <button
                onClick={() => removeSkill(index)}
                className="hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </motion.span>
          ))}
        </div>
      </motion.div>
    );
  };

  // --- Theme Section ---
  const renderThemeEditor = () => (
    <motion.div
      key="theme"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <ThemeSelector selected={theme} onSelect={onThemeChange} />
    </motion.div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case "summary":
        return renderSummaryEditor();
      case "experience":
        return renderExperienceEditor();
      case "education":
        return renderEducationEditor();
      case "skills":
        return renderSkillsEditor();
      case "theme":
        return renderThemeEditor();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Section tabs */}
      <div className="flex gap-1 bg-white dark:bg-gray-800 rounded-xl p-1.5 border border-gray-200 dark:border-gray-700 shadow-sm">
        {sections.map((section) => {
          const Icon = sectionIcons[section.id] || User;
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              {section.label}
            </button>
          );
        })}
      </div>

      {/* Editor content area */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
        <AnimatePresence mode="wait">
          {renderActiveSection()}
        </AnimatePresence>
      </div>
    </div>
  );
}
