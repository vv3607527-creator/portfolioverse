"use client";

import { motion } from "framer-motion";

interface PortfolioSkillsProps {
  skills: string[];
}

export function PortfolioSkills({ skills }: PortfolioSkillsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {skills.map((skill, index) => (
        <motion.span
          key={skill}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ scale: 1.05, y: -2 }}
          className="inline-block rounded-full px-4 py-2 text-sm font-medium shadow-sm transition-shadow hover:shadow-md"
          style={{
            backgroundColor: "rgba(255,255,255,0.08)",
            color: "var(--color-text)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          {skill}
        </motion.span>
      ))}
    </div>
  );
}