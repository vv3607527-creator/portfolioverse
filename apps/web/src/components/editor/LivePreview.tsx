"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, ExternalLink } from "lucide-react";

interface LivePreviewProps {
  content: any;
  theme: string;
}

const THEME_COLORS: Record<string, any> = {
  "minimal-white": {
    primary: "#3b82f6",
    secondary: "#6b7280",
    background: "#ffffff",
    text: "#111827",
  },
  "dark-professional": {
    primary: "#60a5fa",
    secondary: "#a78bfa",
    background: "#0f172a",
    text: "#f1f5f9",
  },
  "blue-modern": {
    primary: "#0ea5e9",
    secondary: "#06b6d4",
    background: "#f0f9ff",
    text: "#0c4a6e",
  },
  "green-nature": {
    primary: "#16a34a",
    secondary: "#15803d",
    background: "#f0fdf4",
    text: "#14532d",
  },
  "purple-creative": {
    primary: "#7c3aed",
    secondary: "#a855f7",
    background: "#faf5ff",
    text: "#3b0764",
  },
  "sunset-warm": {
    primary: "#f97316",
    secondary: "#ec4899",
    background: "#fff7ed",
    text: "#431407",
  },
};

export default function LivePreview({ content, theme }: LivePreviewProps) {
  const styles = THEME_COLORS[theme] || THEME_COLORS["minimal-white"];

  const name = content?.name || "";
  const title = content?.title || "";
  const about = content?.about || "";
  const experience = content?.experience || [];
  const skills = content?.skills || [];
  const education = content?.education || [];

  return (
    <div className="space-y-4">
      {/* Preview header */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span>Live Preview</span>
      </div>

      {/* Preview frame */}
      <div
        className="rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden transition-colors duration-300"
        style={{ background: styles.background }}
      >
        {/* Mock browser chrome */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 max-w-md mx-auto">
            <div className="bg-white dark:bg-gray-600 rounded-md px-3 py-1 text-xs text-gray-500 dark:text-gray-300 text-center truncate">
              portfolio-preview.local
            </div>
          </div>
        </div>

        {/* Preview content */}
        <div
          className="p-8 space-y-10"
          style={{ background: styles.background, color: styles.text }}
        >
          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: styles.text }}
            >
              {name || "Your Name"}
            </h1>
            {title && (
              <p
                className="text-lg mb-2"
                style={{ color: styles.primary }}
              >
                {title}
              </p>
            )}
          </motion.section>

          {/* About Section */}
          {about && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h2
                className="text-xl font-bold mb-3 text-center"
                style={{ color: styles.text }}
              >
                About
              </h2>
              <p
                className="text-base max-w-lg mx-auto text-center leading-relaxed"
                style={{ color: styles.text + "cc" }}
              >
                {about}
              </p>
            </motion.section>
          )}

          {/* Experience Section */}
          {experience.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h2
                className="text-xl font-bold mb-6 text-center"
                style={{ color: styles.text }}
              >
                Experience
              </h2>
              <div className="space-y-6 max-w-lg mx-auto">
                {experience.map((exp: any, index: number) => (
                  <motion.div
                    key={exp.id || index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative pl-6 border-l-2"
                    style={{ borderColor: styles.primary + "40" }}
                  >
                    <div
                      className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full border-2"
                      style={{
                        background: styles.background,
                        borderColor: styles.primary,
                      }}
                    />
                    <h3 className="font-semibold text-base">
                      {exp.role || "Job Title"}
                    </h3>
                    <p
                      className="text-sm font-medium"
                      style={{ color: styles.primary }}
                    >
                      {exp.company || "Company Name"}
                    </p>
                    {exp.duration && (
                      <p
                        className="text-xs mt-1 flex items-center gap-1"
                        style={{ color: styles.text + "99" }}
                      >
                        <Calendar className="w-3 h-3" />
                        {exp.duration}
                      </p>
                    )}
                    {exp.description && (
                      <p
                        className="text-sm mt-1.5"
                        style={{ color: styles.text + "cc" }}
                      >
                        {exp.description}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Skills Section */}
          {skills.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2
                className="text-xl font-bold mb-4 text-center"
                style={{ color: styles.text }}
              >
                Skills
              </h2>
              <div className="flex flex-wrap justify-center gap-3 max-w-lg mx-auto">
                {skills.map((skill: string, index: number) => (
                  <motion.span
                    key={`${skill}-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03 }}
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{
                      background: styles.primary + "15",
                      color: styles.primary,
                      border: `1px solid ${styles.primary}30`,
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.section>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h2
                className="text-xl font-bold mb-6 text-center"
                style={{ color: styles.text }}
              >
                Education
              </h2>
              <div className="space-y-6 max-w-lg mx-auto">
                {education.map((edu: any, index: number) => (
                  <motion.div
                    key={edu.id || index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="relative pl-6 border-l-2"
                    style={{ borderColor: styles.primary + "40" }}
                  >
                    <div
                      className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full border-2"
                      style={{
                        background: styles.background,
                        borderColor: styles.primary,
                      }}
                    />
                    <h3 className="font-semibold text-base">
                      {edu.degree || "Degree"}
                    </h3>
                    <p
                      className="text-sm font-medium"
                      style={{ color: styles.primary }}
                    >
                      {edu.school || "School Name"}
                    </p>
                    {edu.field && (
                      <p
                        className="text-sm mt-0.5"
                        style={{ color: styles.text + "cc" }}
                      >
                        {edu.field}
                      </p>
                    )}
                    {(edu.startYear || edu.endYear) && (
                      <p
                        className="text-xs mt-1 flex items-center gap-1"
                        style={{ color: styles.text + "99" }}
                      >
                        <Calendar className="w-3 h-3" />
                        {edu.startYear && edu.endYear
                          ? `${edu.startYear} - ${edu.endYear}`
                          : edu.startYear || edu.endYear}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Empty state when no data */}
          {!name && !about && experience.length === 0 && skills.length === 0 && education.length === 0 && (
            <div className="text-center py-16">
              <p
                className="text-lg"
                style={{ color: styles.text + "60" }}
              >
                Start editing your portfolio from the sidebar
              </p>
              <p
                className="text-sm mt-2"
                style={{ color: styles.text + "40" }}
              >
                Changes will appear here in real-time
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
