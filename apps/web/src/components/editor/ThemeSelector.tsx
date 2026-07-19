"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ThemeSelectorProps {
  selected: string;
  onSelect: (theme: string) => void;
}

const PRESET_THEMES = [
  {
    id: "minimal-white",
    name: "Minimal White",
    colors: {
      primary: "#3b82f6",
      secondary: "#6b7280",
      background: "#ffffff",
      text: "#111827",
    },
  },
  {
    id: "dark-professional",
    name: "Dark Professional",
    colors: {
      primary: "#60a5fa",
      secondary: "#a78bfa",
      background: "#0f172a",
      text: "#f1f5f9",
    },
  },
  {
    id: "blue-modern",
    name: "Blue Modern",
    colors: {
      primary: "#0ea5e9",
      secondary: "#06b6d4",
      background: "#f0f9ff",
      text: "#0c4a6e",
    },
  },
  {
    id: "green-nature",
    name: "Green Nature",
    colors: {
      primary: "#16a34a",
      secondary: "#15803d",
      background: "#f0fdf4",
      text: "#14532d",
    },
  },
  {
    id: "purple-creative",
    name: "Purple Creative",
    colors: {
      primary: "#7c3aed",
      secondary: "#a855f7",
      background: "#faf5ff",
      text: "#3b0764",
    },
  },
  {
    id: "sunset-warm",
    name: "Sunset Warm",
    colors: {
      primary: "#f97316",
      secondary: "#ec4899",
      background: "#fff7ed",
      text: "#431407",
    },
  },
];

export default function ThemeSelector({
  selected,
  onSelect,
}: ThemeSelectorProps) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Color Theme
      </label>
      <div className="grid grid-cols-2 gap-3">
        {PRESET_THEMES.map((preset) => {
          const isSelected = selected === preset.id;
          return (
            <motion.button
              key={preset.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(preset.id)}
              className={`relative p-3 rounded-xl border-2 transition-all ${
                isSelected
                  ? "border-blue-500 ring-2 ring-blue-500/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              {isSelected && (
                <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
              <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
                {preset.name}
              </div>
              <div className="flex gap-1.5">
                <div
                  className="w-5 h-5 rounded-full"
                  style={{ background: preset.colors.primary }}
                />
                <div
                  className="w-5 h-5 rounded-full"
                  style={{ background: preset.colors.secondary }}
                />
                <div
                  className="w-5 h-5 rounded-full border border-gray-300 dark:border-gray-600"
                  style={{ background: preset.colors.background }}
                />
                <div
                  className="w-5 h-5 rounded-full"
                  style={{ background: preset.colors.text }}
                />
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
